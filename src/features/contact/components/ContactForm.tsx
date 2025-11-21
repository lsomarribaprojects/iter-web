'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useLanguage } from '@/shared/i18n/LanguageContext'

const translations = {
  es: {
    fullName: 'Nombre Completo *',
    namePlaceholder: 'Tu nombre',
    email: 'Email *',
    emailPlaceholder: 'tu@email.com',
    phone: 'Teléfono',
    phonePlaceholder: '+1 515 000 0000',
    company: 'Empresa',
    companyPlaceholder: 'Tu empresa',
    serviceInterest: 'Servicio de Interés',
    selectService: 'Selecciona un servicio',
    solarConsulting: 'Consultoría Solar',
    energyManagement: 'Gestión Energética ISO 50001',
    training: 'Formación Profesional',
    other: 'Otro',
    message: 'Mensaje *',
    messagePlaceholder: 'Cuéntanos sobre tu proyecto...',
    sending: 'Enviando...',
    sendMessage: 'Enviar Mensaje',
    successTitle: '¡Mensaje Enviado!',
    successMessage: 'Nos pondremos en contacto contigo pronto.',
  },
  en: {
    fullName: 'Full Name *',
    namePlaceholder: 'Your name',
    email: 'Email *',
    emailPlaceholder: 'you@email.com',
    phone: 'Phone',
    phonePlaceholder: '+1 515 000 0000',
    company: 'Company',
    companyPlaceholder: 'Your company',
    serviceInterest: 'Service of Interest',
    selectService: 'Select a service',
    solarConsulting: 'Solar Consulting',
    energyManagement: 'ISO 50001 Energy Management',
    training: 'Professional Training',
    other: 'Other',
    message: 'Message *',
    messagePlaceholder: 'Tell us about your project...',
    sending: 'Sending...',
    sendMessage: 'Send Message',
    successTitle: 'Message Sent!',
    successMessage: 'We will contact you soon.',
  },
}

export function ContactForm() {
  const { language } = useLanguage()
  const t = translations[language as 'es' | 'en']

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Guardar lead en la base de datos
      const leadResponse = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          service: formData.service || null,
          message: formData.message,
          source: 'contact_form',
          createdAt: new Date().toISOString(),
        }),
      })

      if (!leadResponse.ok) {
        const errorData = await leadResponse.json()
        console.error('Lead save error:', errorData)
        throw new Error(errorData.error || 'Error al enviar el mensaje')
      }

      // Enviar notificación al equipo (no falla si esto falla)
      try {
        await fetch('/api/notifications/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            service: formData.service,
            motivation: formData.message,
          }),
        })
      } catch (notificationError) {
        console.error('Notification error (non-blocking):', notificationError)
        // No bloqueamos el flujo si falla la notificación
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        })
      }, 3000)
    } catch (err) {
      setError(language === 'es'
        ? 'Error al enviar. Por favor intenta de nuevo.'
        : 'Error sending. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (submitted) {
    return (
      <motion.div
        className="rounded-2xl bg-green-50 p-12 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="mb-4 text-6xl">✓</div>
        <h3 className="mb-2 text-2xl font-bold text-green-900">
          {t.successTitle}
        </h3>
        <p className="text-green-700">
          {t.successMessage}
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            {t.fullName}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder={t.namePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            {t.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder={t.emailPlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            {t.phone}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder={t.phonePlaceholder}
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            {t.company}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder={t.companyPlaceholder}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {t.serviceInterest}
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
        >
          <option value="">{t.selectService}</option>
          <option value="consultoria-solar">{t.solarConsulting}</option>
          <option value="gestion-energetica">{t.energyManagement}</option>
          <option value="formacion">{t.training}</option>
          <option value="otro">{t.other}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
          placeholder={t.messagePlaceholder}
        />
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-electric-600 hover:to-electric-700 hover:shadow-xl disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          t.sending
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            {t.sendMessage}
          </>
        )}
      </button>
    </form>
  )
}
