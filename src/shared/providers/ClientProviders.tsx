'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from '../i18n/LanguageContext'
import { ThemeProvider } from './ThemeProvider'

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
