/**
 * Tipos para el sistema de blog
 */

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string
  image_alt?: string
  author: string
  category: string
  tags: string[]
  read_time: string
  meta_title?: string
  meta_description?: string
  status: 'draft' | 'published' | 'archived'
  language: 'es' | 'en'
  published_at?: string
  created_at: string
  updated_at: string
}

export interface BlogPostPreview {
  id: string
  title: string
  slug: string
  excerpt: string
  image_url: string
  author: string
  category: string
  read_time: string
  published_at?: string
}

export interface BlogFilters {
  category?: string
  tag?: string
  search?: string
  language?: 'es' | 'en'
}
