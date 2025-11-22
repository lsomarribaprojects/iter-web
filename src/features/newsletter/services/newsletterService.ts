/**
 * Servicio para gestionar suscripciones al newsletter
 */

import { supabase } from '@/shared/lib/supabase'
import type { SubscribeData, SubscribeResponse } from '../types'

export class NewsletterService {
  /**
   * Suscribe un email al newsletter
   */
  static async subscribe(data: SubscribeData): Promise<SubscribeResponse> {
    try {
      // Validar email
      if (!this.isValidEmail(data.email)) {
        return {
          success: false,
          message: 'Email inválido',
          error: 'INVALID_EMAIL',
        }
      }

      // Verificar si ya existe
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id, active')
        .eq('email', data.email)
        .single()

      if (existing) {
        if (existing.active) {
          return {
            success: false,
            message: 'Este email ya está suscrito',
            error: 'ALREADY_SUBSCRIBED',
          }
        } else {
          // Reactivar suscripción
          const { error } = await supabase
            .from('newsletter_subscribers')
            .update({
              active: true,
              name: data.name,
              language: data.language || 'es',
            })
            .eq('id', existing.id)

          if (error) {
            console.error('Error reactivating subscription:', error)
            return {
              success: false,
              message: 'Error al reactivar suscripción',
              error: 'DATABASE_ERROR',
            }
          }

          return {
            success: true,
            message: '¡Bienvenido de nuevo! Tu suscripción ha sido reactivada.',
          }
        }
      }

      // Crear nueva suscripción
      const { error } = await supabase.from('newsletter_subscribers').insert({
        email: data.email,
        name: data.name,
        language: data.language || 'es',
        active: true,
        confirmed: false, // En producción, enviar email de confirmación
      })

      if (error) {
        console.error('Error creating subscription:', error)
        return {
          success: false,
          message: 'Error al procesar tu suscripción',
          error: 'DATABASE_ERROR',
        }
      }

      return {
        success: true,
        message:
          '¡Gracias por suscribirte! Recibirás nuestras últimas noticias en tu email.',
      }
    } catch (error: any) {
      console.error('Error in subscribe:', error)
      return {
        success: false,
        message: 'Error inesperado. Por favor intenta de nuevo.',
        error: 'UNKNOWN_ERROR',
      }
    }
  }

  /**
   * Cancela suscripción al newsletter
   */
  static async unsubscribe(email: string): Promise<SubscribeResponse> {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({
          active: false,
          unsubscribed_at: new Date().toISOString(),
        })
        .eq('email', email)

      if (error) {
        console.error('Error unsubscribing:', error)
        return {
          success: false,
          message: 'Error al cancelar suscripción',
        }
      }

      return {
        success: true,
        message: 'Tu suscripción ha sido cancelada correctamente.',
      }
    } catch (error) {
      console.error('Error in unsubscribe:', error)
      return {
        success: false,
        message: 'Error inesperado.',
      }
    }
  }

  /**
   * Valida formato de email
   */
  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}
