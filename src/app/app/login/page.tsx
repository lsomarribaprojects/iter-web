'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Login logic here
    console.log('Login:', { email, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-20">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8 text-center">
          <Link href="/" className="text-4xl font-bold text-white">
            ITER
          </Link>
          <p className="mt-2 text-white/70">Acceso al Portal de Clientes</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-8 backdrop-blur-md">
          <h1 className="mb-6 text-2xl font-bold text-white">Iniciar Sesión</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>
            </div>

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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/70">
                <input
                  type="checkbox"
                  className="mr-2 rounded border-white/30 bg-white/10 text-electric-500 focus:ring-2 focus:ring-electric-500/50"
                />
                Recordarme
              </label>
              <a
                href="#"
                className="text-electric-400 hover:text-orange-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:from-electric-600 hover:to-electric-700 hover:shadow-xl"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/70">
            ¿No tienes una cuenta?{' '}
            <Link
              href="/contacto"
              className="font-semibold text-electric-400 hover:text-orange-300 transition-colors"
            >
              Contacta con nosotros
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
