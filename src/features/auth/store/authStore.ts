/**
 * Store global de autenticación con Zustand
 */

import { create } from 'zustand'
import { AuthService } from '../services/authService'
import type { AuthState, User } from '../types'
import { supabase } from '@/shared/lib/supabase'

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void
  setSession: (session: any) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  initialize: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  /**
   * Inicializa el estado de autenticación
   * Se debe llamar al montar la app
   */
  initialize: async () => {
    try {
      set({ loading: true })

      // Obtener sesión actual
      const session = await AuthService.getSession()
      const user = await AuthService.getCurrentUser()

      set({
        user,
        session,
        loading: false,
      })

      // Escuchar cambios de autenticación
      supabase.auth.onAuthStateChange(async (_event, session) => {
        const user = session ? await AuthService.getCurrentUser() : null

        set({
          user,
          session,
        })
      })
    } catch (error) {
      console.error('Error initializing auth:', error)
      set({
        user: null,
        session: null,
        loading: false,
      })
    }
  },

  /**
   * Cierra sesión
   */
  logout: async () => {
    const result = await AuthService.logout()

    if (result.success) {
      set({
        user: null,
        session: null,
        error: null,
      })
    }
  },
}))
