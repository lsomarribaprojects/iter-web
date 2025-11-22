import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/shared/components/layout/Navigation'
import { Footer } from '@/shared/components/layout/Footer'
import { CustomCursor } from '@/shared/components/animations/CustomCursor'
import { SmoothScroll } from '@/shared/components/animations/SmoothScroll'
import { LoadingScreen } from '@/shared/components/animations/LoadingScreen'
import { ChatWidget } from '@/features/chatbot/components/ChatWidget'
import { generateMetadata as genMeta } from '@/shared/lib/metadata'
import { ClientProviders } from '@/shared/providers/ClientProviders'
import { GoogleAnalytics } from '@/shared/components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = genMeta({})

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://iter-energy.com/#organization',
      name: 'ITER',
      url: 'https://iter-energy.com',
      logo: 'https://iter-energy.com/logo.png',
      description: 'Consultoría especializada en auditoría técnica de proyectos solares, due diligence fotovoltaico, implementación ISO 50001 y capacitación SEI-NABCEP.',
      areaServed: ['Ecuador', 'Costa Rica', 'Nicaragua', 'Honduras', 'Estados Unidos'],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+593-99-565-4840',
        contactType: 'customer service',
        email: 'info@iter-energy.com',
        availableLanguage: ['Spanish', 'English'],
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://iter-energy.com/#solar-consulting',
      name: 'Consultoría y Auditoría Solar',
      description: 'Due diligence técnico, revisión de diseño eléctrico, inspección QA/QC, y análisis de rendimiento para plantas solares fotovoltaicas.',
      provider: { '@id': 'https://iter-energy.com/#organization' },
      serviceType: 'Solar Project Consulting',
    },
    {
      '@type': 'Service',
      '@id': 'https://iter-energy.com/#iso50001',
      name: 'Gestión Energética ISO 50001',
      description: 'Implementación de Sistemas de Gestión Energética ISO 50001:2018 con reducción de costos energéticos hasta 20% anual.',
      provider: { '@id': 'https://iter-energy.com/#organization' },
      serviceType: 'Energy Management Consulting',
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://iter-energy.com/#training',
      name: 'ITER Training - Formación Solar',
      description: 'Programas de capacitación fotovoltaica con licencia SEI y créditos NABCEP.',
      provider: { '@id': 'https://iter-energy.com/#organization' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics />
        <ClientProviders>
          <SmoothScroll>
            <LoadingScreen />
            <CustomCursor />
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ChatWidget />
          </SmoothScroll>
        </ClientProviders>
      </body>
    </html>
  )
}
