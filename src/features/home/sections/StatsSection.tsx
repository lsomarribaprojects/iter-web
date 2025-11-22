'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useLanguage } from '@/shared/i18n/LanguageContext'

function Counter({ value, duration = 2 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (isInView) {
      const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
      if (!isNaN(numericValue)) {
        motionValue.set(numericValue)
      }
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      const suffix = value.replace(/[0-9]/g, '')
      setDisplayValue(Math.floor(latest) + suffix)
    })
    return unsubscribe
  }, [springValue, value])

  return <span ref={ref}>{displayValue}</span>
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const stats = [
    { value: '20%', label: t.stats.energySavings },
    { value: '5', label: t.stats.countries },
    { value: '15+', label: t.stats.certifiedCompanies },
    { value: '10+', label: t.stats.experience },
  ]

  return (
    <section ref={ref} className="bg-gradient-to-br from-cyan-900/20 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-2 text-4xl font-bold text-electric-500 md:text-5xl lg:text-6xl">
                <Counter value={stat.value} />
              </div>
              <div className="text-sm text-white/70 md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
