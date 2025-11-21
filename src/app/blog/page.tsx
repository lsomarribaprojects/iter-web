'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { CTA } from '@/shared/components/ui/CTA'
import { Calendar, Clock, User } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

const blogPosts = {
  es: [
    {
      id: 1,
      title: 'Guía Completa para Auditorías QA/QC en Proyectos Solares Fotovoltaicos',
      excerpt: 'Descubre los aspectos críticos de las auditorías de calidad en plantas solares y cómo asegurar el máximo rendimiento de tu inversión.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
      author: 'Carlos Mendoza',
      date: '2024-01-15',
      readTime: '8 min',
      category: 'Consultoría Solar',
    },
    {
      id: 2,
      title: 'ISO 50001:2018 - Claves para una Implementación Exitosa',
      excerpt: 'Todo lo que necesitas saber sobre la implementación de sistemas de gestión energética bajo el estándar ISO 50001.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      author: 'María González',
      date: '2024-01-10',
      readTime: '10 min',
      category: 'Gestión Energética',
    },
    {
      id: 3,
      title: 'Tendencias en Formación Profesional para Energías Renovables 2024',
      excerpt: 'Las certificaciones y habilidades más demandadas en el sector de energías renovables este año.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop',
      author: 'Juan Pérez',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Formación',
    },
  ],
  en: [
    {
      id: 1,
      title: 'Complete Guide to QA/QC Audits in Solar Photovoltaic Projects',
      excerpt: 'Discover the critical aspects of quality audits in solar plants and how to ensure maximum return on your investment.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
      author: 'Carlos Mendoza',
      date: '2024-01-15',
      readTime: '8 min',
      category: 'Solar Consulting',
    },
    {
      id: 2,
      title: 'ISO 50001:2018 - Keys to Successful Implementation',
      excerpt: 'Everything you need to know about implementing energy management systems under the ISO 50001 standard.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      author: 'María González',
      date: '2024-01-10',
      readTime: '10 min',
      category: 'Energy Management',
    },
    {
      id: 3,
      title: 'Professional Training Trends for Renewable Energy 2024',
      excerpt: 'The most in-demand certifications and skills in the renewable energy sector this year.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop',
      author: 'Juan Pérez',
      date: '2024-01-05',
      readTime: '6 min',
      category: 'Training',
    },
  ],
}

const translations = {
  es: {
    heroTitle: 'Blog',
    heroSubtitle: 'Conocimiento y tendencias en energías renovables',
    ctaTitle: '¿Quieres Mantenerte Actualizado?',
    ctaDescription: 'Suscríbete a nuestro newsletter para recibir los últimos artículos sobre energías renovables y gestión energética',
    ctaPrimary: 'Contactar con Expertos',
    ctaSecondary: 'Ver Todos los Servicios',
  },
  en: {
    heroTitle: 'Blog',
    heroSubtitle: 'Knowledge and trends in renewable energy',
    ctaTitle: 'Want to Stay Updated?',
    ctaDescription: 'Subscribe to our newsletter to receive the latest articles on renewable energy and energy management',
    ctaPrimary: 'Contact Experts',
    ctaSecondary: 'View All Services',
  },
}

export default function BlogPage() {
  const { language } = useLanguage()
  const t = translations[language as 'es' | 'en']
  const posts = blogPosts[language as 'es' | 'en']

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop"
          alt="Blog ITER"
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                {t.heroTitle} <span className="text-electric-500">ITER</span>
              </h1>
              <p className="text-xl text-white/90 md:text-2xl">
                {t.heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl"
              >
                <Link href={`/blog/${post.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-electric-500 px-3 py-1 text-xs font-semibold text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-electric-500">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-slate-600">{post.excerpt}</p>

                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={t.ctaTitle}
        description={t.ctaDescription}
        primaryButtonText={t.ctaPrimary}
        primaryButtonHref="/contacto"
        secondaryButtonText={t.ctaSecondary}
        secondaryButtonHref="/servicios"
        variant="dark"
      />
    </>
  )
}
