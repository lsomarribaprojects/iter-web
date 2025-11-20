import { Lead } from '../types'

/**
 * Servicio para gestionar leads capturados por el chatbot
 * Soporta guardado en Supabase o fallback a API local
 */

export class LeadService {
  /**
   * Guarda un lead capturado
   */
  static async saveLead(lead: Lead): Promise<{ success: boolean; error?: string }> {
    try {
      // Intentar guardar en la API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...lead,
          source: 'chatbot',
          createdAt: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error saving lead')
      }

      // Enviar notificación por email (si está configurado)
      await this.sendLeadNotification(lead)

      return { success: true }
    } catch (error: any) {
      console.error('Error saving lead:', error)
      return {
        success: false,
        error: error.message || 'Error guardando el lead'
      }
    }
  }

  /**
   * Envía notificación por email al equipo de ventas
   */
  private static async sendLeadNotification(lead: Lead): Promise<void> {
    try {
      await fetch('/api/notifications/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lead),
      })
    } catch (error) {
      console.error('Error sending notification:', error)
      // No fallar si la notificación falla
    }
  }

  /**
   * Obtiene todos los leads (para dashboard)
   */
  static async getLeads(): Promise<Lead[]> {
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      return data.leads || []
    } catch (error) {
      console.error('Error fetching leads:', error)
      return []
    }
  }

  /**
   * Valida que un lead tenga los campos requeridos
   */
  static validateLead(lead: Partial<Lead>): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!lead.name || lead.name.trim().length < 2) {
      errors.push('Nombre es requerido (mínimo 2 caracteres)')
    }

    if (!lead.email || !this.isValidEmail(lead.email)) {
      errors.push('Email válido es requerido')
    }

    if (!lead.phone || lead.phone.trim().length < 7) {
      errors.push('Teléfono válido es requerido')
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  /**
   * Valida formato de email
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Formatea un lead para mostrar
   */
  static formatLead(lead: Lead): string {
    return `
📋 Nuevo Lead Capturado

👤 Nombre: ${lead.name}
🏢 Empresa: ${lead.company || 'No especificado'}
📧 Email: ${lead.email}
📱 Teléfono: ${lead.phone}
💼 Cargo: ${lead.position || 'No especificado'}
💰 Gasto energético mensual: ${lead.monthlyEnergyCost || 'No especificado'}
📅 Fecha preferida: ${lead.preferredDate || 'No especificado'}

💬 Motivación:
${lead.motivation || 'No especificado'}

🗣️ Resumen de conversación:
${lead.conversationHistory.slice(-3).map(m => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n')}
    `.trim()
  }
}
