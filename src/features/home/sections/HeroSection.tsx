'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { ScrollIndicator } from '@/shared/components/ui/ScrollIndicator'
import { EnergyAnimation } from './EnergyAnimation'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { Zap } from 'lucide-react'

export function HeroSection() {
  const { t, language } = useLanguage()

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20">
      {/* Video Background - Solar panels in nature */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
          poster="https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1920&h=1080&fit=crop"
        >
          <source
            src="https://videos.pexels.com/video-files/6590699/6590699-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
        </video>
        {/* Lighter overlay gradients - permite ver mejor la imagen de fondo */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <EnergyAnimation />

      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] items-center py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="mb-6 text-4xl font-bold leading-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl"
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t.hero.title}
                <br />
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-electric-500 to-energy-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.6)] sm:gap-3">
                  <Zap className="inline h-8 w-8 text-electric-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.9)] sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" />
                  {t.hero.subtitle}
                </span>
              </motion.h1>

              <motion.p
                className="mb-8 text-base text-white backdrop-blur-sm sm:text-lg md:text-xl lg:text-xl lg:max-w-2xl"
                style={{
                  textShadow: '0 2px 15px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.5)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                className="flex flex-col gap-3 sm:flex-row sm:gap-4"
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
