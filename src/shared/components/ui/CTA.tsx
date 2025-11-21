'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from './MagneticButton'
import { ArrowRight, Zap } from 'lucide-react'

interface CTAProps {
  title: string
  description: string
  primaryButtonText: string
  primaryButtonHref: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  variant?: 'gradient' | 'dark' | 'light'
}

export function CTA({
  title,
  description,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  variant = 'gradient',
}: CTAProps) {
  const backgrounds = {
    gradient: 'bg-gradient-to-r from-electric-500 via-energy-500 to-electric-600 animate-gradient',
    dark: 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900',
    light: 'bg-gradient-to-br from-electric-50 to-energy-50',
  }

  const textColors = {
    gradient: 'text-white',
    dark: 'text-white',
    light: 'text-slate-900',
  }

  return (
    <section className={`relative overflow-hidden py-20 ${backgrounds[variant]}`}>
      {/* Animated background elements */}
      {variant === 'gradient' && (
        <>
          <motion.div
            className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2">
              <Zap className={`h-8 w-8 ${variant === 'light' ? 'text-electric-500' : 'text-white'}`} />
              <h2 className={`text-3xl font-bold md:text-4xl lg:text-5xl ${textColors[variant]}`}>
                {title}
              </h2>
            </div>

            <p className={`mb-8 text-lg md:text-xl ${variant === 'light' ? 'text-slate-600' : 'text-white/90'}`}>
              {description}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton
                href={primaryButtonHref}
                variant={variant === 'light' ? 'primary' : 'cta'}
                size="lg"
                className="group"
              >
                {primaryButtonText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              {secondaryButtonText && secondaryButtonHref && (
                <MagneticButton
                  href={secondaryButtonHref}
                  variant="secondary"
                  size="lg"
                >
                  {secondaryButtonText}
                </MagneticButton>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
