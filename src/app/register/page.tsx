'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function RegisterPage() {
  const router = useRouter()
  const { register, isSubmitting, error, isAuthenticated, clearError } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    }
  }, [isAuthenticated, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    clearError()
    setPasswordError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setPasswordError(null)

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }

    if (formData.password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      name: formData.name,
    })

    if (success) {
      setShowSuccess(true)
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 2000)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-20">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo y título */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-4xl font-bold text-white">
            ITER
          </Link>
          <p className="mt-2 text-white/70">Crear una Nueva Cuenta</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md">
          <h1 className="mb-6 text-2xl font-bold text-white">Registro</h1>

          {/* Mensaje de error */}
          {(error || passwordError) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start space-x-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4"
            >
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error || passwordError}</p>
            </motion.div>
          )}

          {/* Mensaje de éxito */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-start space-x-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4"
            >
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-200">
                <p className="font-semibold mb-1">¡Cuenta creada exitosamente!</p>
                <p className="text-green-300">
                  Por favor, revisa tu email para confirmar tu cuenta.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-white/90"
              >
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="Tu nombre"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-white/90"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="tu@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-white/90"
              >
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>
              <p className="mt-1 text-xs text-white/50">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-white/90"
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="••••••••"
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>
            </div>

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-electric-600 hover:to-electric-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Link a login */}
          <div className="mt-6 text-center text-sm text-white/70">
            ¿Ya tienes una cuenta?{' '}
            <Link
              href="/login"
              className="font-semibold text-electric-400 hover:text-orange-300 transition-colors"
            >
              Inicia sesión
            </Link>
          </div>
        </div>

        {/* Volver al inicio */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-white/50 hover:text-white/70 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
