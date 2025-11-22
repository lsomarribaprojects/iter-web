/**
 * Tipos para el feature de autenticación
 */

import { User as SupabaseUser } from '@supabase/supabase-js'

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
}

export interface AuthState {
  user: User | null
  session: any | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterCredentials {
  email: string
  password: string
  name?: string
}

export interface ResetPasswordData {
  email: string
}

export interface UpdatePasswordData {
  password: string
  confirmPassword: string
}

export interface AuthError {
  message: string
  code?: string
}

export interface AuthResponse {
  success: boolean
  error?: AuthError
  user?: User
}
