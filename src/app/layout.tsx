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

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = genMeta({})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
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
