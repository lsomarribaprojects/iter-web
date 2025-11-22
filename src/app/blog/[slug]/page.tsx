'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react'
import { ParallaxImage } from '@/shared/components/animations/ParallaxImage'
import { CTA } from '@/shared/components/ui/CTA'
import { useLanguage } from '@/shared/i18n/LanguageContext'
import { BlogService } from '@/shared/services/blogService'
import type { BlogPost, BlogPostPreview } from '@/shared/types/blog'
import ReactMarkdown from 'react-markdown'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPostPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      loadPost()
    }
  }, [slug])

  const loadPost = async () => {
    setIsLoading(true)

    const postData = await BlogService.getPostBySlug(slug)

    if (!postData) {
      router.push('/blog')
      return
    }

    setPost(postData)

    // Cargar posts relacionados
    const related = await BlogService.getRelatedPosts(slug, postData.category, 3)
    setRelatedPosts(related)

    setIsLoading(false)
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-slate-600">Cargando artículo...</div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <ParallaxImage
          src={post.image_url}
          alt={post.image_alt || post.title}
          className="absolute inset-0"
        />

        <div className="relative z-10 flex h-full items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              {/* Back Button */}
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Volver al Blog</span>
              </Link>

              {/* Category */}
              <div className="mb-4">
                <span className="rounded-full bg-electric-500 px-4 py-1.5 text-sm font-semibold text-white">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {new Date(post.published_at || post.created_at).toLocaleDateString(
                      language === 'en' ? 'en-US' : 'es-ES',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{post.read_time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Tags */}
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Excerpt */}
            <div className="mb-12 rounded-2xl bg-slate-50 p-8">
              <p className="text-xl leading-relaxed text-slate-700">{post.excerpt}</p>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-lg prose-slate max-w-none">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Share Button */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <button
                onClick={handleShare}
                className="inline-flex items-center space-x-2 rounded-lg bg-electric-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-electric-600"
              >
                <Share2 className="h-5 w-5" />
                <span>Compartir Artículo</span>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Artículos Relacionados
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>

                    <div className="p-6">
                      <span className="mb-2 inline-block text-xs font-semibold text-electric-500">
                        {relatedPost.category}
                      </span>
                      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-electric-500">
                        {relatedPost.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-slate-600">
                        {relatedPost.excerpt}
                      </p>

                      <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{relatedPost.read_time}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        title="¿Necesitas Asesoría Experta?"
        description="Contacta con nuestro equipo de especialistas en energías renovables"
        primaryButtonText="Contactar Ahora"
        primaryButtonHref="/contacto"
        secondaryButtonText="Ver Servicios"
        secondaryButtonHref="/servicios"
        variant="dark"
      />
    </>
  )
}
