'use client'

import { motion } from 'framer-motion'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { ScrollIndicator } from '@/shared/components/ui/ScrollIndicator'
import { EnergyAnimation } from './EnergyAnimation'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { Zap } from 'lucide-react'

export function HeroSection() {
  const { t, language } = useLanguage()
  console.log('HeroSection renderizando con idioma:', language)
  console.log('Título:', t.hero.title)

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&h=1080&fit=crop"
        alt="Ingenieros revisando instalación solar fotovoltaica"
        className="absolute inset-0"
      />

      <EnergyAnimation />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="mb-6 text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t.hero.title}
                <br />
                <span className="inline-flex items-center gap-3 bg-gradient-to-r from-electric-500 to-energy-500 bg-clip-text text-transparent">
                  <Zap className="inline h-12 w-12 text-electric-500 md:h-16 md:w-16 lg:h-20 lg:w-20" />
                  {t.hero.subtitle}
                </span>
              </motion.h1>

              <motion.p
                className="mb-10 text-xl text-white/90 md:text-2xl lg:max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <MagneticButton href="/servicios" variant="primary" size="lg">
                  {t.hero.exploreServices}
                </MagneticButton>
                <MagneticButton href="/contacto" variant="outline" size="lg">
                  {t.hero.contactNow}
                </MagneticButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
