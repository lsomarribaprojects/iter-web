'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { CheckCircle, GraduationCap, Award, BookOpen } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function TrainingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="bg-gradient-to-br from-amber-50 to-orange-50 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop"
                alt="Capacitación profesional en sistemas fotovoltaicos"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Certification badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-slate-900">SEI Licensed</span>
                  </div>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-slate-900">NABCEP Credits</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 mb-6">
              <BookOpen className="h-4 w-4" />
              <span>Solar Energy International (SEI)</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              {t.trainingSection.title}{' '}
              <span className="text-amber-600">{t.trainingSection.titleHighlight}</span>
            </h2>

            <p className="mb-8 text-lg text-slate-600">
              {t.trainingSection.description}
            </p>

            <ul className="mb-8 space-y-4">
              {t.trainingSection.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-amber-600" />
                  <span className="text-slate-700">{highlight}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <MagneticButton href="/servicios/formacion" variant="primary" size="lg" className="bg-amber-600 hover:bg-amber-700">
                {t.trainingSection.learnMore}
              </MagneticButton>
              <MagneticButton href="/contacto" variant="outline" size="lg">
                Contactar
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
