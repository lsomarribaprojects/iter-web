'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { CTA } from '@/shared/components/ui/CTA'
import { Calendar, Clock, User } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { BlogService } from '@/shared/services/blogService'
import type { BlogPostPreview } from '@/shared/types/blog'

const translations = {
  es: {
    heroTitle: 'Blog',
    heroSubtitle: 'Conocimiento y tendencias en energías renovables',
    ctaTitle: '¿Quieres Mantenerte Actualizado?',
    ctaDescription:
      'Suscríbete a nuestro newsletter para recibir los últimos artículos sobre energías renovables y gestión energética',
    ctaPrimary: 'Contactar con Expertos',
    ctaSecondary: 'Ver Todos los Servicios',
    loading: 'Cargando artículos...',
    noPosts: 'No hay artículos disponibles',
  },
  en: {
    heroTitle: 'Blog',
    heroSubtitle: 'Knowledge and trends in renewable energy',
    ctaTitle: 'Want to Stay Updated?',
    ctaDescription:
      'Subscribe to our newsletter to receive the latest articles on renewable energy and energy management',
    ctaPrimary: 'Contact Experts',
    ctaSecondary: 'View All Services',
    loading: 'Loading articles...',
    noPosts: 'No articles available',
  },
}

export default function BlogPage() {
  const { language } = useLanguage()
  const t = translations[language as 'es' | 'en']

  const [posts, setPosts] = useState<BlogPostPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [language])

  const loadPosts = async () => {
    setIsLoading(true)
    // Intentar cargar artículos en el idioma seleccionado
    let data = await BlogService.getPosts({ language })

    // Si no hay artículos en el idioma seleccionado, cargar todos
    // (fallback mientras se crean traducciones)
    if (data.length === 0) {
      data = await BlogService.getPosts()
    }

    setPosts(data)
    setIsLoading(false)
  }

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
              <p className="text-xl text-white/90 md:text-2xl">{t.heroSubtitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-slate-600">{t.loading}</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-slate-600">{t.noPosts}</div>
            </div>
          ) : (
            <div className="grid gap-8 lg:gap-12 md:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
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
                            {post.published_at &&
                              new Date(post.published_at).toLocaleDateString(
                                language === 'en' ? 'en-US' : 'es-ES'
                              )}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
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
