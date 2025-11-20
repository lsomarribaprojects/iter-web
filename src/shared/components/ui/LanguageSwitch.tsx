'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as const, name: 'English', flag: '🇬🇧' },
  ]

  const handleLanguageChange = (lang: 'es' | 'en') => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative mr-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg bg-white/10 px-3 py-2 text-white transition-colors hover:bg-white/20"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium uppercase">{language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg bg-slate-800 shadow-xl"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex w-full items-center space-x-3 px-4 py-3 transition-colors hover:bg-slate-700 ${
                    language === lang.code ? 'bg-slate-700 text-electric-500' : 'text-white'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-sm font-medium">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
