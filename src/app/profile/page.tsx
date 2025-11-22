'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Calendar, LogOut, Lock, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const { user, logout, isAuthenticated, loading, updatePassword } = useAuth()

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  const handleLogout = async () => {
    await logout()
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(false)

    if (passwordData.password !== passwordData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden')
      return
    }

    if (passwordData.password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    const success = await updatePassword(passwordData)

    if (success) {
      setPasswordSuccess(true)
      setPasswordData({ password: '', confirmPassword: '' })
      setTimeout(() => {
        setIsChangingPassword(false)
        setPasswordSuccess(false)
      }, 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-20">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold text-white">Mi Perfil</h1>
          <p className="text-white/70">Gestiona tu información personal</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Información del usuario */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md">
              <h2 className="mb-6 text-xl font-bold text-white">
                Información Personal
              </h2>

              <div className="space-y-6">
                {/* Nombre */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-electric-500/10 p-3">
                    <User className="h-6 w-6 text-electric-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/60">Nombre</p>
                    <p className="text-lg font-semibold text-white">
                      {user.name || 'No especificado'}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-electric-500/10 p-3">
                    <Mail className="h-6 w-6 text-electric-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/60">Email</p>
                    <p className="text-lg font-semibold text-white">{user.email}</p>
                  </div>
                </div>

                {/* Fecha de registro */}
                <div className="flex items-start space-x-4">
                  <div className="rounded-lg bg-electric-500/10 p-3">
                    <Calendar className="h-6 w-6 text-electric-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/60">Miembro desde</p>
                    <p className="text-lg font-semibold text-white">
                      {new Date(user.created_at).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Acciones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Cambiar contraseña */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-lg font-bold text-white">Seguridad</h3>
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-electric-500/20 px-4 py-3 font-semibold text-electric-400 transition-colors hover:bg-electric-500/30"
              >
                <Lock className="h-5 w-5" />
                <span>Cambiar Contraseña</span>
              </button>
            </div>

            {/* Cerrar sesión */}
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center space-x-2 rounded-lg bg-red-500/20 px-4 py-3 font-semibold text-red-400 transition-colors hover:bg-red-500/30"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Modal de cambio de contraseña */}
        {isChangingPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsChangingPassword(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-md rounded-2xl bg-white/10 p-8 backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="mb-6 text-2xl font-bold text-white">
                Cambiar Contraseña
              </h2>

              {/* Mensajes */}
              {passwordError && (
                <div className="mb-4 flex items-start space-x-3 rounded-lg bg-red-500/10 border border-red-500/20 p-4">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200">{passwordError}</p>
                </div>
              )}

              {passwordSuccess && (
                <div className="mb-4 flex items-start space-x-3 rounded-lg bg-green-500/10 border border-green-500/20 p-4">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-green-200">
                    Contraseña actualizada correctamente
                  </p>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/90">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordData.password}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, password: e.target.value })
                    }
                    className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/90">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(false)}
                    className="flex-1 rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-4 py-3 font-semibold text-white transition-all hover:from-electric-600 hover:to-electric-700"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
