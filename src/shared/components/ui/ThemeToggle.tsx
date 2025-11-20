'use client'

import { useTheme } from '@/shared/providers/ThemeProvider'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-lg border border-electric-500/20 bg-white/5 p-2 text-white backdrop-blur-sm transition-all hover:border-electric-500/40 hover:bg-white/10"
      aria-label={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-electric-500" />
        ) : (
          <Sun className="h-5 w-5 text-energy-500" />
        )}
      </motion.div>
    </button>
  )
}
