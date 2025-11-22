'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function RecoverPasswordPage() {
  const { resetPassword, isSubmitting, error, clearError } = useAuth()

  const [email, setEmail] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()

    const success = await resetPassword({ email })

    if (success) {
      setShowSuccess(true)
      setEmail('')
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
          <p className="mt-2 text-white/70">Recuperar Contraseña</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md">
          {!showSuccess ? (
            <>
              <h1 className="mb-2 text-2xl font-bold text-white">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="mb-6 text-sm text-white/70">
                No te preocupes, te enviaremos instrucciones para restablecerla.
              </p>

              {/* Mensaje de error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-start space-x-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4"
                >
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                      placeholder="tu@email.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Botón de submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-electric-600 hover:to-electric-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Instrucciones'}
                </button>
              </form>
            </>
          ) : (
            // Mensaje de éxito
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-500/10 p-4">
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
              </div>

              <h2 className="mb-3 text-2xl font-bold text-white">
                ¡Revisa tu correo!
              </h2>

              <p className="mb-6 text-white/70">
                Te hemos enviado un email con instrucciones para restablecer tu
                contraseña. El enlace expirará en 1 hora.
              </p>

              <div className="rounded-lg bg-white/5 p-4 mb-6">
                <p className="text-sm text-white/60">
                  Si no recibes el email en unos minutos, revisa tu carpeta de spam
                  o intenta nuevamente.
                </p>
              </div>

              <button
                onClick={() => setShowSuccess(false)}
                className="text-electric-400 hover:text-orange-300 transition-colors text-sm font-semibold"
              >
                Enviar de nuevo
              </button>
            </motion.div>
          )}

          {/* Link a login */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 text-sm text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al login</span>
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
