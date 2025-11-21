'use client'

import { HeroSection } from '@/features/home/sections/HeroSection'
import { StatsSection } from '@/features/home/sections/StatsSection'
import { ServicesSection } from '@/features/home/sections/ServicesSection'
import { AboutPreviewSection } from '@/features/home/sections/AboutPreviewSection'
import { EnergyManagementSection } from '@/features/home/sections/EnergyManagementSection'
import { TrainingSection } from '@/features/home/sections/TrainingSection'
import { CTA } from '@/shared/components/ui/CTA'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutPreviewSection />
      <EnergyManagementSection />
      <TrainingSection />
      <CTA
        title={t.homeCta.title}
        description={t.homeCta.description}
        primaryButtonText={t.homeCta.primaryButton}
        primaryButtonHref="/contacto"
        secondaryButtonText={t.homeCta.secondaryButton}
        secondaryButtonHref="/servicios"
        variant="gradient"
      />
    </>
  )
}
