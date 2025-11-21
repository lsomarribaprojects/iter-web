'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { SERVICES } from '@/shared/constants/site'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { useLanguage } from '@/shared/i18n/LanguageContext'

export default function ServicesPage() {
  const { t } = useLanguage()

  const serviceImages: Record<string, string> = {
    'consultoria-solar':
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
    'gestion-energetica':
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    formacion:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
  }

  // Get service names from translations
  const serviceNames: Record<string, string> = {
    'gestion-energetica': t.services.energyManagement.title,
    'consultoria-solar': t.services.energyAudit.title,
    'formacion': t.services.training.title,
  }

  const serviceDescriptions: Record<string, string> = {
    'gestion-energetica': t.services.energyManagement.description,
    'consultoria-solar': t.services.energyAudit.description,
    'formacion': t.services.training.description,
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1920&h=1080&fit=crop"
          alt="Servicios ITER"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                {t.servicesPage.heroTitle} <span className="text-electric-500">{t.servicesPage.heroTitleHighlight}</span>
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                {t.servicesPage.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:gap-16">
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={serviceImages[service.slug]}
                      alt={serviceNames[service.slug] || service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
                    {serviceNames[service.slug] || service.name}
                  </h2>
                  <p className="mb-6 text-lg text-slate-600">
                    {serviceDescriptions[service.slug] || service.shortDescription}
                  </p>
                  <MagneticButton
                    href={`/servicios/${service.slug}`}
                    variant="primary"
                  >
                    {t.servicesPage.viewDetails}
                  </MagneticButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            {t.servicesPage.ctaTitle}
          </h2>
          <p className="mb-8 text-lg text-white/90">
            {t.servicesPage.ctaDescription}
          </p>
          <MagneticButton href="/contacto" variant="cta" size="lg">
            {t.servicesPage.ctaButton}
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
