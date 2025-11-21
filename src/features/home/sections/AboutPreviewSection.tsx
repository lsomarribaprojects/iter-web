'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { CheckCircle } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function AboutPreviewSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop"
                alt="Auditoría técnica de planta solar fotovoltaica"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              {t.about.title}{' '}
              <span className="text-electric-500">{t.about.titleHighlight}</span>
            </h2>
            <p className="mb-8 text-lg text-slate-600">
              {t.about.description}
            </p>

            <ul className="mb-8 space-y-4">
              {t.about.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
                  <span className="text-slate-700">{highlight}</span>
                </motion.li>
              ))}
            </ul>

            <MagneticButton href="/nosotros" variant="primary" size="lg">
              {t.about.learnMore}
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
