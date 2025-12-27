import { Metadata } from 'next'
import { servicesData } from '@/features/services/data/servicesData'
import { generateMetadata as genMeta } from '@/shared/lib/metadata'
import { ServicePageContent } from '@/features/services/components/ServicePageContent'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    return genMeta({})
  }

  return genMeta({
    title: service.name,
    description: service.description,
    keywords: [
      service.name.toLowerCase(),
      'consultoría energética',
      'servicios solares',
      'energía renovable',
    ],
  })
}

export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }))
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  return <ServicePageContent slug={slug} />
}
