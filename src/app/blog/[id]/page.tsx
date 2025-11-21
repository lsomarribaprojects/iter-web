'use client'

import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { blogPostsEs, blogPostsEn } from '@/features/blog/data/blogPosts'
import ReactMarkdown from 'react-markdown'

export default function BlogPostPage() {
  const params = useParams()
  const { language } = useLanguage()
  const posts = language === 'en' ? blogPostsEn : blogPostsEs

  const post = posts.find(p => p.id === params.id)

  if (!post) {
    notFound()
  }

  const translations = {
    es: {
      backToBlog: 'Volver al Blog',
      relatedTitle: '¿Listo para dar el siguiente paso?',
      relatedDescription: 'Nuestro equipo de ingenieros expertos está listo para ayudarte a transformar los desafíos energéticos de tu organización en oportunidades de ahorro y crecimiento.',
      expertText: 'Más de 10 años de experiencia en consultoría energética, auditoría solar y formación profesional en 5 países.',
      contactButton: 'Hablar con un Experto',
    },
    en: {
      backToBlog: 'Back to Blog',
      relatedTitle: 'Ready to take the next step?',
      relatedDescription: 'Our team of expert engineers is ready to help you transform your organization\'s energy challenges into opportunities for savings and growth.',
      expertText: 'More than 10 years of experience in energy consulting, solar auditing, and professional training in 5 countries.',
      contactButton: 'Talk to an Expert',
    },
  }

  const t = translations[language as 'es' | 'en']

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <ParallaxImage
          src={post.image}
          alt={post.title}
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-end pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <Link
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t.backToBlog}
              </Link>
              <span className="inline-block rounded-full bg-electric-500 px-3 py-1 text-xs font-semibold text-white mb-4">
                {post.category}
              </span>
              <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <div className="flex items-center space-x-6 mt-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl prose prose-lg prose-slate prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-ul:my-4 prose-ol:my-4">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-500/20 mb-6">
              <svg className="w-8 h-8 text-electric-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {t.relatedTitle}
            </h2>
            <p className="mb-6 text-lg text-slate-300 leading-relaxed">
              {t.relatedDescription}
            </p>
            <p className="mb-8 text-slate-400">
              {t.expertText}
            </p>
            <MagneticButton href="/contacto" variant="primary" size="lg" className="bg-electric-500 text-white hover:bg-electric-600">
              {t.contactButton}
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  )
}
