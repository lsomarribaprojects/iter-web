'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/shared/components/ui/MagneticButton'
import { Send } from 'lucide-react'

export function ContactForm() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset form after 3 seconds
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
          ¡Mensaje Enviado!
        </h3>
        <p className="text-green-700">
          Nos pondremos en contacto contigo pronto.
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
            Nombre Completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder="+34 600 000 000"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Empresa
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
            placeholder="Tu empresa"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Servicio de Interés
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
        >
          <option value="">Selecciona un servicio</option>
          <option value="consultoria-solar">Consultoría Solar</option>
          <option value="gestion-energetica">Gestión Energética ISO 50001</option>
          <option value="formacion">Formación Profesional</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Mensaje *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-electric-500 focus:outline-none focus:ring-2 focus:ring-electric-500/20"
          placeholder="Cuéntanos sobre tu proyecto..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-electric-500 to-electric-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-electric-600 hover:to-electric-700 hover:shadow-xl disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          'Enviando...'
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Enviar Mensaje
          </>
        )}
      </button>
    </form>
  )
}
