'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Lead } from '../types'
import { LeadService } from '../services/leadService'
import { Message } from '../types'

interface LeadFormProps {
  language: 'es' | 'en'
  conversationHistory: Message[]
  onSuccess: () => void
  onCancel: () => void
}

export function LeadForm({ language, conversationHistory, onSuccess, onCancel }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    position: '',
    monthlyEnergyCost: '',
    preferredDate: '',
    motivation: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const texts = {
    es: {
      title: '📋 Información de Contacto',
      subtitle: 'Para poder ayudarte mejor, necesitamos algunos datos',
      name: 'Nombre completo',
      namePlaceholder: 'Juan Pérez',
      company: 'Empresa (opcional)',
      companyPlaceholder: 'Mi Empresa S.A.',
      email: 'Email',
      emailPlaceholder: 'juan@empresa.com',
      phone: 'Teléfono',
      phonePlaceholder: '+593 99 123 4567',
      position: 'Cargo (opcional)',
      positionPlaceholder: 'Gerente de Operaciones',
      energyCost: 'Gasto energético mensual (opcional)',
      energyCostPlaceholder: '$5,000 USD',
      preferredDate: 'Fecha preferida para reunión (opcional)',
      preferredDatePlaceholder: 'Esta semana',
      motivation: 'Cuéntanos más sobre tu interés (opcional)',
      motivationPlaceholder: 'Queremos reducir costos energéticos...',
      submit: 'Enviar',
      cancel: 'Cancelar',
      submitting: 'Enviando...',
      success: '¡Gracias! Nos contactaremos pronto',
      successMessage: 'Hemos recibido tu información. Un miembro de nuestro equipo se comunicará contigo en menos de 24 horas.',
    },
    en: {
      title: '📋 Contact Information',
      subtitle: 'To better assist you, we need some information',
      name: 'Full name',
      namePlaceholder: 'John Doe',
      company: 'Company (optional)',
      companyPlaceholder: 'My Company Inc.',
      email: 'Email',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone',
      phonePlaceholder: '+1 555 123 4567',
      position: 'Position (optional)',
      positionPlaceholder: 'Operations Manager',
      energyCost: 'Monthly energy cost (optional)',
      energyCostPlaceholder: '$5,000 USD',
      preferredDate: 'Preferred meeting date (optional)',
      preferredDatePlaceholder: 'This week',
      motivation: 'Tell us more about your interest (optional)',
      motivationPlaceholder: 'We want to reduce energy costs...',
      submit: 'Submit',
      cancel: 'Cancel',
      submitting: 'Submitting...',
      success: 'Thank you! We\'ll contact you soon',
      successMessage: 'We have received your information. A team member will contact you within 24 hours.',
    },
  }

  const t = texts[language]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    setIsSubmitting(true)

    // Validar
    const lead: Partial<Lead> = {
      ...formData,
      conversationHistory,
    }

    const validation = LeadService.validateLead(lead)

    if (!validation.valid) {
      setErrors(validation.errors)
      setIsSubmitting(false)
      return
    }

    // Guardar
    const result = await LeadService.saveLead(lead as Lead)

    if (result.success) {
      setIsSuccess(true)
      setTimeout(() => {
        onSuccess()
      }, 3000)
    } else {
      setErrors([result.error || 'Error guardando los datos'])
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-green-50 p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        </motion.div>
        <h3 className="mt-4 text-xl font-bold text-green-900">{t.success}</h3>
        <p className="mt-2 text-sm text-green-700">{t.successMessage}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white p-6 shadow-lg"
    >
      <h3 className="mb-2 text-lg font-bold text-slate-900">{t.title}</h3>
      <p className="mb-4 text-sm text-slate-600">{t.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Nombre */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            {t.name} *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder={t.namePlaceholder}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            required
          />
        </div>

        {/* Empresa */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            {t.company}
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder={t.companyPlaceholder}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            {t.email} *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.emailPlaceholder}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            required
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            {t.phone} *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder={t.phonePlaceholder}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            required
          />
        </div>

        {/* Motivación */}
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-700">
            {t.motivation}
          </label>
          <textarea
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            placeholder={t.motivationPlaceholder}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
          />
        </div>

        {/* Errores */}
        {errors.length > 0 && (
          <div className="rounded-lg bg-red-50 p-3">
            <ul className="space-y-1 text-xs text-red-600">
              {errors.map((error, i) => (
                <li key={i}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Botones */}
        <div className="flex space-x-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            disabled={isSubmitting}
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            className="flex flex-1 items-center justify-center space-x-2 rounded-lg bg-electric-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-electric-600 disabled:bg-slate-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{t.submitting}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{t.submit}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
