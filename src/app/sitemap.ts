import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/shared/constants/site'
import { servicesData } from '@/features/services/data/servicesData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url

  // Static pages
  const staticPages = [
    '',
    '/servicios',
    '/nosotros',
    '/blog',
    '/contacto',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Service pages
  const servicePages = Object.keys(servicesData).map((slug) => ({
    url: `${baseUrl}/servicios/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...servicePages]
}
