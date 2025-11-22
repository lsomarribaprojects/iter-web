/**
 * Servicio de autenticación usando Supabase Auth
 */

import { supabase } from '@/shared/lib/supabase'
import type {
  LoginCredentials,
  RegisterCredentials,
  ResetPasswordData,
  UpdatePasswordData,
  AuthResponse,
  User,
} from '../types'

export class AuthService {
  /**
   * Inicia sesión con email y contraseña
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        return {
          success: false,
          error: {
            message: this.getErrorMessage(error.message),
            code: error.status?.toString(),
          },
        }
      }

      if (!data.user) {
        return {
          success: false,
          error: {
            message: 'No se pudo iniciar sesión',
          },
        }
      }

      return {
        success: true,
        user: this.mapSupabaseUser(data.user),
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Error al iniciar sesión',
        },
      }
    }
  }

  /**
   * Registra un nuevo usuario
   */
  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            name: credentials.name,
          },
        },
      })

      if (error) {
        return {
          success: false,
          error: {
            message: this.getErrorMessage(error.message),
            code: error.status?.toString(),
          },
        }
      }

      if (!data.user) {
        return {
          success: false,
          error: {
            message: 'No se pudo crear la cuenta',
          },
        }
      }

      return {
        success: true,
        user: this.mapSupabaseUser(data.user),
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Error al registrarse',
        },
      }
    }
  }

  /**
   * Cierra sesión
   */
  static async logout(): Promise<{ success: boolean }> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Error logging out:', error)
        return { success: false }
      }

      return { success: true }
    } catch (error) {
      console.error('Error logging out:', error)
      return { success: false }
    }
  }

  /**
   * Solicita un email de recuperación de contraseña
   */
  static async resetPassword(data: ResetPasswordData): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        return {
          success: false,
          error: {
            message: this.getErrorMessage(error.message),
          },
        }
      }

      return {
        success: true,
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Error al solicitar recuperación',
        },
      }
    }
  }

  /**
   * Actualiza la contraseña del usuario actual
   */
  static async updatePassword(data: UpdatePasswordData): Promise<AuthResponse> {
    try {
      if (data.password !== data.confirmPassword) {
        return {
          success: false,
          error: {
            message: 'Las contraseñas no coinciden',
          },
        }
      }

      const { error } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (error) {
        return {
          success: false,
          error: {
            message: this.getErrorMessage(error.message),
          },
        }
      }

      return {
        success: true,
      }
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Error al actualizar contraseña',
        },
      }
    }
  }

  /**
   * Obtiene el usuario actual
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        return null
      }

      return this.mapSupabaseUser(data.user)
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  /**
   * Obtiene la sesión actual
   */
  static async getSession() {
    try {
      const { data } = await supabase.auth.getSession()
      return data.session
    } catch (error) {
      console.error('Error getting session:', error)
      return null
    }
  }

  /**
   * Mapea un usuario de Supabase a nuestro tipo User
   */
  private static mapSupabaseUser(supabaseUser: any): User {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: supabaseUser.user_metadata?.name,
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      created_at: supabaseUser.created_at,
    }
  }

  /**
   * Traduce mensajes de error de Supabase al español
   */
  private static getErrorMessage(message: string): string {
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': 'Email o contraseña incorrectos',
      'Email not confirmed': 'Por favor confirma tu email',
      'User already registered': 'Este email ya está registrado',
      'Password should be at least 6 characters':
        'La contraseña debe tener al menos 6 caracteres',
      'Unable to validate email address: invalid format':
        'Formato de email inválido',
      'Signup requires a valid password': 'Debes proporcionar una contraseña válida',
      'User not found': 'Usuario no encontrado',
    }

    return errorMessages[message] || message
  }
}
