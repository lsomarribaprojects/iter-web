import { Metadata } from 'next'
import Image from 'next/image'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { generateMetadata as genMeta } from '@/shared/lib/metadata'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { CERTIFICATIONS } from '@/shared/constants/site'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = genMeta({
  title: 'Sobre Nosotros',
  description:
    'ITER es líder en consultoría solar y gestión energética con presencia en más de 65 países. Certificados ISO 9001 e ISO 50001, ofrecemos servicios de élite en energías renovables.',
  keywords: [
    'sobre ITER',
    'equipo consultoría solar',
    'certificaciones energéticas',
    'experiencia renovables',
  ],
})

const timeline = [
  {
    year: '2008',
    title: 'Fundación de ITER',
    description:
      'Inicio de operaciones enfocadas en consultoría solar especializada.',
  },
  {
    year: '2012',
    title: 'Certificación ISO 9001',
    description:
      'Obtención de certificación internacional de calidad para servicios.',
  },
  {
    year: '2016',
    title: 'Expansión Internacional',
    description: 'Presencia en más de 30 países con proyectos completados.',
  },
  {
    year: '2020',
    title: 'Certificación ISO 50001',
    description:
      'Acreditación en gestión energética y eficiencia para clientes.',
  },
  {
    year: '2023',
    title: 'Líder del Sector',
    description:
      'Más de 200 proyectos en 65 países y 500+ MW instalados.',
  },
]

const values = [
  {
    title: 'Excelencia Técnica',
    description:
      'Estándares más altos en ingeniería y consultoría solar, respaldados por certificaciones internacionales.',
  },
  {
    title: 'Independencia',
    description:
      'Asesoramiento objetivo sin conflictos de interés, garantizando las mejores decisiones para nuestros clientes.',
  },
  {
    title: 'Innovación',
    description:
      'Adopción de últimas tecnologías y metodologías para optimizar rendimiento de proyectos solares.',
  },
  {
    title: 'Sostenibilidad',
    description:
      'Compromiso con objetivos de desarrollo sostenible y descarbonización global.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
          alt="Equipo ITER"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Excelencia en <span className="text-electric-500">Energía</span>
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                Más de 15 años liderando la consultoría solar y gestión
                energética a nivel internacional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                Nuestra <span className="text-electric-500">Misión</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Proporcionar servicios de consultoría solar y gestión energética
                de élite que maximicen la rentabilidad y minimicen el riesgo de
                proyectos de energías renovables. Acompañamos a nuestros
                clientes en todas las fases del desarrollo, desde la
                planificación hasta la operación, con asesoramiento
                especializado e independiente.
              </p>
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
                Nuestra <span className="text-green-500">Visión</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Ser el referente global en consultoría solar y gestión
                energética, reconocidos por nuestra excelencia técnica,
                independencia y compromiso con la sostenibilidad. Contribuir
                activamente a la transición energética mundial mediante
                servicios de la más alta calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Nuestros <span className="text-electric-500">Valores</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="text-slate-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Nuestra <span className="text-electric-500">Historia</span>
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-orange-100">
                    <span className="text-xl font-bold text-electric-600">
                      {item.year}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Certificaciones y{' '}
              <span className="text-electric-500">Acreditaciones</span>
            </h2>
            <p className="text-lg text-white/70">
              Respaldados por los más altos estándares internacionales
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-6 backdrop-blur-sm"
              >
                <div className="mb-4 text-5xl text-electric-500">
                  <CheckCircle />
                </div>
                <p className="text-center font-semibold text-white">
                  {cert.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-electric-500 to-electric-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            ¿Listo para trabajar con los mejores?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Descubre cómo podemos ayudarte a alcanzar tus objetivos energéticos
          </p>
          <MagneticButton href="/contacto" variant="outline" size="lg">
            Contactar Ahora
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
