import { Metadata } from 'next'
import { SITE_CONFIG } from '@/shared/constants/site'

export function generateMetadata({
  title,
  description,
  image,
  url,
  keywords,
  type = 'website',
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  type?: 'website' | 'article'
}): Metadata {
  const metaTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title
  const metaDescription = description || SITE_CONFIG.description
  const metaImage = image || SITE_CONFIG.ogImage
  const metaUrl = url || SITE_CONFIG.url

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: metaTitle,
    description: metaDescription,
    keywords: keywords || [
      'auditoría técnica proyectos solares',
      'due diligence fotovoltaico',
      'inspección plantas solares',
      'consultoría ingeniería solar',
      'QA/QC proyectos fotovoltaicos',
      'verificación diseño sistemas solares',
      'implementación ISO 50001',
      'gestión energética empresarial',
      'auditoría energética industrial',
      'certificación ISO 50001',
      'ahorro energético empresas',
      'sistema gestión energética',
      'eficiencia energética industrial',
      'capacitación fotovoltaica SEI',
      'curso sistemas solares conectados red',
      'certificación NABCEP',
      'formación energía solar profesional',
      'entrenamiento instalación paneles solares',
      'curso diseño sistemas fotovoltaicos',
      'consultoría solar Ecuador',
      'gestión energética Costa Rica',
    ],
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      type,
      locale: 'es_ES',
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@ITER',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
    },
  }
}
