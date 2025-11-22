/**
 * Componente de formulario de suscripción al newsletter
 * Diseñado para usarse en el footer
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

const translations = {
  es: {
    title: 'Suscríbete al Newsletter',
    description: 'Recibe las últimas noticias sobre energías renovables',
    placeholder: 'tu@email.com',
    button: 'Suscribirse',
    subscribing: 'Suscribiendo...',
  },
  en: {
    title: 'Subscribe to Newsletter',
    description: 'Get the latest news about renewable energy',
    placeholder: 'your@email.com',
    button: 'Subscribe',
    subscribing: 'Subscribing...',
  },
}

export function NewsletterForm() {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          language,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: data.message })
        setEmail('')

        // Limpiar mensaje después de 5 segundos
        setTimeout(() => setMessage(null), 5000)
      } else {
        setMessage({ type: 'error', text: data.message })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: language === 'es'
          ? 'Error al suscribirse. Por favor intenta de nuevo.'
          : 'Error subscribing. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <h3 className="mb-2 text-lg font-bold text-white">{t.title}</h3>
      <p className="mb-4 text-sm text-white/70">{t.description}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            required
            disabled={isSubmitting}
            className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-electric-600 hover:to-electric-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center space-x-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>{t.subscribing}</span>
            </span>
          ) : (
            t.button
          )}
        </button>
      </form>

      {/* Mensajes de feedback */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-3 flex items-start space-x-2 rounded-lg p-3 ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                message.type === 'success' ? 'text-green-200' : 'text-red-200'
              }`}
            >
              {message.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
