'use client'

import { notFound } from 'next/navigation'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { servicesData } from '@/features/services/data/servicesData'
import { servicesDataEn } from '@/features/services/data/servicesDataEn'
import { ServiceBenefits } from './ServiceBenefits'
import { ServiceProcess } from './ServiceProcess'
import { ServiceFAQs } from './ServiceFAQs'
import { useLanguage } from '@/shared/i18n/LanguageContext'

interface ServicePageContentProps {
  slug: string
}

export function ServicePageContent({ slug }: ServicePageContentProps) {
  const { language } = useLanguage()
  const data = language === 'en' ? servicesDataEn : servicesData
  const service = data[slug]

  if (!service) {
    notFound()
  }

  const heroImages: Record<string, string> = {
    'consultoria-solar':
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&h=1080&fit=crop',
    'gestion-energetica':
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
    formacion:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&h=1080&fit=crop',
  }

  const ctaText = {
    es: {
      title: `¿Listo para empezar con ${service.name}?`,
      description: 'Contacta con nuestro equipo de expertos para más información',
      button: 'Solicitar Consulta',
    },
    en: {
      title: `Ready to get started with ${service.name}?`,
      description: 'Contact our team of experts for more information',
      button: 'Request Consultation',
    },
  }

  const t = ctaText[language as 'es' | 'en']

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxImage
          src={heroImages[service.slug]}
          alt={service.name}
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                {service.name}
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <p className="text-lg leading-relaxed text-slate-700">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {service.benefits && <ServiceBenefits benefits={service.benefits} />}

      {/* Process Section */}
      {service.process && <ServiceProcess steps={service.process} />}

      {/* FAQs Section */}
      {service.faqs && <ServiceFAQs faqs={service.faqs} />}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-electric-500 to-electric-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            {t.title}
          </h2>
          <p className="mb-8 text-lg text-white/90">
            {t.description}
          </p>
          <MagneticButton href="/contacto" variant="outline" size="lg">
            {t.button}
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
