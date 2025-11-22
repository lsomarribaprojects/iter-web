/**
 * API endpoint para suscripciones al newsletter
 * POST /api/newsletter - Suscribir email
 */

import { NextResponse } from 'next/server'
import { NewsletterService } from '@/features/newsletter/services/newsletterService'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, language } = body

    // Validar datos requeridos
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email es requerido',
          error: 'MISSING_EMAIL',
        },
        { status: 400 }
      )
    }

    // Suscribir
    const result = await NewsletterService.subscribe({
      email,
      name,
      language: language || 'es',
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    console.error('Error in newsletter API:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

// DELETE /api/newsletter - Cancelar suscripción
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email es requerido',
        },
        { status: 400 }
      )
    }

    const result = await NewsletterService.unsubscribe(email)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error in unsubscribe API:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
      },
      { status: 500 }
    )
  }
}
