/**
 * Tipos para el sistema de newsletter
 */

export interface NewsletterSubscriber {
  id: string
  email: string
  name?: string
  active: boolean
  confirmed: boolean
  confirmation_token?: string
  language: 'es' | 'en'
  tags?: string[]
  subscribed_at: string
  confirmed_at?: string
  unsubscribed_at?: string
}

export interface SubscribeData {
  email: string
  name?: string
  language?: 'es' | 'en'
}

export interface SubscribeResponse {
  success: boolean
  message: string
  error?: string
}
