'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { es, Translations } from './locales/es'
import { en } from './locales/en'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations: Record<Language, Translations> = {
  es,
  en,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Siempre iniciar en inglés por defecto - NO leer localStorage al inicio
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    // Solo guardar en localStorage cuando el usuario cambie manualmente
    // NO leer del localStorage para evitar conflictos
  }, [])

  const setLanguage = (lang: Language) => {
    console.log('Cambiando idioma a:', lang)
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const value = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
