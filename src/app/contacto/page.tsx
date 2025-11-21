'use client'

import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { SITE_CONFIG } from '@/shared/constants/site'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

const translations = {
  es: {
    heroTitle: 'Contáctanos',
    heroSubtitle: 'Estamos aquí para ayudarte con tu proyecto energético',
    infoTitle: 'Información de',
    infoHighlight: 'Contacto',
    phone: 'Teléfono',
    address: 'Dirección',
    schedule: 'Horario',
    scheduleValue: 'Lun - Vie: 9:00 - 18:00',
    helpTitle: '¿Necesitas ayuda inmediata?',
    helpDescription: 'Nuestro equipo de expertos está disponible para responder tus consultas sobre proyectos solares y gestión energética.',
    callNow: 'Llamar Ahora',
    formTitle: 'Envíanos un Mensaje',
    mapLabel: 'Mapa interactivo',
  },
  en: {
    heroTitle: 'Contact Us',
    heroSubtitle: 'We are here to help with your energy project',
    infoTitle: 'Contact',
    infoHighlight: 'Information',
    phone: 'Phone',
    address: 'Address',
    schedule: 'Hours',
    scheduleValue: 'Mon - Fri: 9:00 AM - 6:00 PM',
    helpTitle: 'Need immediate help?',
    helpDescription: 'Our team of experts is available to answer your questions about solar projects and energy management.',
    callNow: 'Call Now',
    formTitle: 'Send Us a Message',
    mapLabel: 'Interactive map',
  },
}

export default function ContactPage() {
  const { language } = useLanguage()
  const t = translations[language as 'es' | 'en']

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: SITE_CONFIG.links.email,
      href: `mailto:${SITE_CONFIG.links.email}`,
    },
    {
      icon: Phone,
      title: t.phone,
      value: SITE_CONFIG.links.phone,
      href: `tel:${SITE_CONFIG.links.phone}`,
    },
    {
      icon: MapPin,
      title: t.address,
      value: `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}`,
      href: null,
    },
    {
      icon: Clock,
      title: t.schedule,
      value: t.scheduleValue,
      href: null,
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
          alt="Contacto ITER"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                <span className="text-electric-500">{t.heroTitle}</span>
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
                {t.infoTitle}{' '}
                <span className="text-electric-500">{t.infoHighlight}</span>
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                      <info.icon className="h-6 w-6 text-electric-600" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-slate-900">
                        {info.title}
                      </h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-slate-600 hover:text-electric-500 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-slate-600">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 p-8">
                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  {t.helpTitle}
                </h3>
                <p className="mb-4 text-slate-700">
                  {t.helpDescription}
                </p>
                <a
                  href={`tel:${SITE_CONFIG.links.phone}`}
                  className="inline-flex items-center font-semibold text-electric-600 hover:text-electric-700"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {t.callNow}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-slate-50 p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                {t.formTitle}
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-2xl">
            <div className="h-[400px] bg-slate-300 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-slate-500" />
                <p className="text-slate-600">
                  {t.mapLabel} - {SITE_CONFIG.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
