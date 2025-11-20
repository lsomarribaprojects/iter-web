import { Metadata } from 'next'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { generateMetadata as genMeta } from '@/shared/lib/metadata'
import { ContactForm } from '@/features/contact/components/ContactForm'
import { SITE_CONFIG } from '@/shared/constants/site'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Contacto',
  description:
    'Contacta con ITER para consultas sobre servicios de consultoría solar, gestión energética ISO 50001 y formación profesional. Estamos aquí para ayudarte.',
  keywords: [
    'contacto ITER',
    'consulta servicios solares',
    'presupuesto energía renovable',
  ],
})

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: SITE_CONFIG.links.email,
    href: `mailto:${SITE_CONFIG.links.email}`,
  },
  {
    icon: Phone,
    title: 'Teléfono',
    value: SITE_CONFIG.links.phone,
    href: `tel:${SITE_CONFIG.links.phone}`,
  },
  {
    icon: MapPin,
    title: 'Dirección',
    value: `${SITE_CONFIG.address.street}, ${SITE_CONFIG.address.city}`,
    href: null,
  },
  {
    icon: Clock,
    title: 'Horario',
    value: 'Lun - Vie: 9:00 - 18:00',
    href: null,
  },
]

export default function ContactPage() {
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
                <span className="text-electric-500">Contáctanos</span>
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                Estamos aquí para ayudarte con tu proyecto energético
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
                Información de{' '}
                <span className="text-electric-500">Contacto</span>
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
                  ¿Necesitas ayuda inmediata?
                </h3>
                <p className="mb-4 text-slate-700">
                  Nuestro equipo de expertos está disponible para responder tus
                  consultas sobre proyectos solares y gestión energética.
                </p>
                <a
                  href={`tel:${SITE_CONFIG.links.phone}`}
                  className="inline-flex items-center font-semibold text-electric-600 hover:text-electric-700"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar Ahora
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl bg-slate-50 p-8 lg:p-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Envíanos un Mensaje
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
                  Mapa interactivo - {SITE_CONFIG.address.city}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
