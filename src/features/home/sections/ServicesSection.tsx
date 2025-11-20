'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ServiceCard } from '../components/ServiceCard'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { t } = useLanguage()

  const services = [
    {
      id: 'gestion-energetica',
      name: t.services.energyManagement.title,
      slug: 'gestion-energetica',
      shortDescription: t.services.energyManagement.description,
      icon: 'gauge',
      color: 'green',
    },
    {
      id: 'auditoria-energetica',
      name: t.services.energyAudit.title,
      slug: 'consultoria-solar',
      shortDescription: t.services.energyAudit.description,
      icon: 'sun',
      color: 'orange',
    },
    {
      id: 'formacion',
      name: t.services.training.title,
      slug: 'formacion',
      shortDescription: t.services.training.description,
      icon: 'graduation-cap',
      color: 'blue',
    },
  ]

  return (
    <section ref={ref} className="bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {t.services.title} <span className="text-electric-500">{t.services.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard
                title={service.name}
                description={service.shortDescription}
                icon={service.icon as any}
                href={`/servicios/${service.slug}`}
                color={service.color as 'orange' | 'green' | 'blue'}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
