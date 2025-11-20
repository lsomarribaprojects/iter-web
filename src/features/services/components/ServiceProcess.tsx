'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FileText,
  Search,
  FileCheck,
  CheckCircle,
  FileSearch,
  Settings,
  Award,
  ClipboardList,
  BookOpen,
  Wrench,
} from 'lucide-react'
import { ProcessStep } from '@/shared/types'

const icons = {
  FileText,
  Search,
  FileCheck,
  CheckCircle,
  FileSearch,
  Settings,
  Award,
  ClipboardList,
  BookOpen,
  Wrench,
}

interface ServiceProcessProps {
  steps: ProcessStep[]
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Nuestro <span className="text-electric-500">Proceso</span>
          </h2>
        </motion.div>

        <div className="mx-auto max-w-5xl space-y-8">
          {steps.map((step, index) => {
            const Icon = icons[step.icon as keyof typeof icons]
            return (
              <motion.div
                key={index}
                className="flex items-start space-x-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                  <Icon className="h-8 w-8 text-electric-600" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
