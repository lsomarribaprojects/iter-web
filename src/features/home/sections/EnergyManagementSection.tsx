'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { CheckCircle, TrendingDown, Award, BarChart3 } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function EnergyManagementSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  return (
    <section ref={ref} className="bg-gradient-to-br from-green-50 to-emerald-50 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center space-x-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 mb-6">
              <Award className="h-4 w-4" />
              <span>ISO 50001:2018 Certified Consulting</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              {t.energyManagementSection.title}{' '}
              <span className="text-green-600">{t.energyManagementSection.titleHighlight}</span>
            </h2>

            <p className="mb-8 text-lg text-slate-600">
              {t.energyManagementSection.description}
            </p>

            <ul className="mb-8 space-y-4">
              {t.energyManagementSection.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="text-slate-700">{highlight}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <MagneticButton href="/contacto" variant="primary" size="lg" className="bg-green-600 hover:bg-green-700">
                {t.energyManagementSection.learnMore}
              </MagneticButton>
              <MagneticButton href="/servicios/gestion-energetica" variant="outline" size="lg">
                Ver Detalles
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
                alt="Dashboard de gestión energética ISO 50001"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay with stats */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center">
                    <TrendingDown className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-slate-900">20%</p>
                    <p className="text-xs text-slate-600">Ahorro</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center">
                    <Award className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-slate-900">15+</p>
                    <p className="text-xs text-slate-600">Empresas</p>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center">
                    <BarChart3 className="h-6 w-6 text-green-600 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-slate-900">12M</p>
                    <p className="text-xs text-slate-600">ROI</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
