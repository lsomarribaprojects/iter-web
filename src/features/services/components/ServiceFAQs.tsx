'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { FAQ } from '@/shared/types'
import { cn } from '@/shared/utils/cn'
import { useLanguage } from '@/shared/i18n/LanguageContext'

interface ServiceFAQsProps {
  faqs: FAQ[]
}

export function ServiceFAQs({ faqs }: ServiceFAQsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { language } = useLanguage()

  const title = language === 'en' ? { main: 'Frequently Asked', highlight: 'Questions' } : { main: 'Preguntas', highlight: 'Frecuentes' }

  return (
    <section ref={ref} className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {title.main} <span className="text-electric-500">{title.highlight}</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
              >
                <h3 className="pr-4 text-lg font-semibold text-slate-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 flex-shrink-0 text-electric-500 transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-slate-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
