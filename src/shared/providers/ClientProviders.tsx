'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from '../i18n/LanguageContext'
import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from '@/features/auth/components/AuthProvider'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
