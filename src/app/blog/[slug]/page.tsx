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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            {/* Markdown Content - Professional Blog Styling */}
            <div className="blog-content">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-12 mb-6 leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-12 mb-6 pb-3 border-b-2 border-electric-500">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-semibold text-slate-800 mt-10 mb-4">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-lg font-semibold text-slate-700 mt-8 mb-3">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-6 ml-4 space-y-3">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-6 ml-4 space-y-3 list-decimal list-outside">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-600 text-lg leading-relaxed pl-2 flex items-start gap-3">
                      <span className="text-electric-500 mt-1.5 flex-shrink-0">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 pl-6 border-l-4 border-electric-500 bg-gradient-to-r from-electric-50 to-transparent py-6 pr-6 rounded-r-xl">
                      <div className="text-slate-700 text-lg italic">
                        {children}
                      </div>
                    </blockquote>
                  ),
                  code: ({ className, children }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <code className="block bg-slate-800 text-slate-200 rounded-xl p-6 my-6 overflow-x-auto font-mono text-sm leading-relaxed">
                          {children}
                        </code>
                      );
                    }
                    // Inline code - subtle styling
                    return (
                      <code className="bg-electric-50 text-electric-700 px-2 py-0.5 rounded font-medium text-[0.9em]">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <div className="my-8 rounded-xl overflow-hidden shadow-lg">
                      <div className="bg-slate-700 px-4 py-2 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-400"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                      </div>
                      <pre className="bg-slate-800 text-slate-200 p-6 overflow-x-auto text-sm">
                        {children}
                      </pre>
                    </div>
                  ),
                  a: ({ href, children }) => {
                    const isInternal = href?.startsWith('/');
                    if (isInternal) {
                      return (
                        <a href={href} className="text-electric-600 font-semibold hover:text-electric-700 underline decoration-2 underline-offset-2 transition-colors">
                          {children}
                        </a>
                      );
                    }
                    return (
                      <a href={href} className="text-electric-600 font-semibold hover:text-electric-700 underline decoration-2 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">
                        {children} ↗
                      </a>
                    );
                  },
                  strong: ({ children }) => (
                    <strong className="font-bold text-slate-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-slate-700">
                      {children}
                    </em>
                  ),
                  hr: () => (
                    <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                  ),
                  img: ({ src, alt }) => (
                    <figure className="my-10">
                      <div className="relative overflow-hidden rounded-2xl shadow-xl">
                        <img
                          src={src}
                          alt={alt || ''}
                          className="w-full h-auto object-cover"
                          loading="lazy"
                        />
                      </div>
                      {alt && (
                        <figcaption className="mt-3 text-center text-sm text-slate-500 italic">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  ),
                  table: ({ children }) => (
                    <div className="my-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full border-collapse bg-white">
                        {children}
                      </table>
                    </div>
                  ),
                  thead: ({ children }) => (
                    <thead className="bg-slate-100">
                      {children}
                    </thead>
                  ),
                  tbody: ({ children }) => (
                    <tbody className="divide-y divide-slate-200">
                      {children}
                    </tbody>
                  ),
                  tr: ({ children }) => (
                    <tr className="hover:bg-slate-50 transition-colors">
                      {children}
                    </tr>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-3 text-left font-semibold text-slate-900 border-b-2 border-electric-500">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-3 text-slate-600">
                      {children}
                    </td>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
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
