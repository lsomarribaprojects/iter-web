/**
 * Hook personalizado para autenticación
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '../services/authService'
import { useAuthStore } from '../store/authStore'
import type {
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  UpdatePasswordData,
} from '../types'

export function useAuth() {
  const router = useRouter()
  const { user, session, loading, setUser, setSession, logout: storeLogout } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Inicia sesión
   */
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await AuthService.login(credentials)

      if (!result.success) {
        setError(result.error?.message || 'Error al iniciar sesión')
        return false
      }

      if (result.user) {
        setUser(result.user)
      }

      return true
    } catch (error: any) {
      setError(error.message || 'Error inesperado')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Registra un nuevo usuario
   */
  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await AuthService.register(credentials)

      if (!result.success) {
        setError(result.error?.message || 'Error al registrarse')
        return false
      }

      if (result.user) {
        setUser(result.user)
      }

      return true
    } catch (error: any) {
      setError(error.message || 'Error inesperado')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Cierra sesión
   */
  const logout = async () => {
    try {
      setIsSubmitting(true)
      await storeLogout()
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Solicita recuperación de contraseña
   */
  const resetPassword = async (data: ResetPasswordData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await AuthService.resetPassword(data)

      if (!result.success) {
        setError(result.error?.message || 'Error al solicitar recuperación')
        return false
      }

      return true
    } catch (error: any) {
      setError(error.message || 'Error inesperado')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Actualiza la contraseña
   */
  const updatePassword = async (data: UpdatePasswordData) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const result = await AuthService.updatePassword(data)

      if (!result.success) {
        setError(result.error?.message || 'Error al actualizar contraseña')
        return false
      }

      return true
    } catch (error: any) {
      setError(error.message || 'Error inesperado')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    // Estado
    user,
    session,
    loading,
    isSubmitting,
    error,
    isAuthenticated: !!user,

    // Acciones
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    clearError: () => setError(null),
  }
}
