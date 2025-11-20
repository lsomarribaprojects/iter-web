'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

interface ServiceBenefitsProps {
  benefits: string[]
}

export function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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
            Beneficios <span className="text-electric-500">Clave</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 rounded-lg bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
              <p className="text-slate-700">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
