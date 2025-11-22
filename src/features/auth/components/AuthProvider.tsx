/**
 * Provider de autenticación
 * Inicializa el auth store al montar la app
 */

'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}
