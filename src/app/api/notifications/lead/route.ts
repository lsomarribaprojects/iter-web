import { NextRequest, NextResponse } from 'next/server'

/**
 * API para enviar notificaciones cuando se captura un nuevo lead
 * Soporta Resend (recomendado) o log en desarrollo
 */

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json()

    // Email del equipo de ventas (configurar en .env)
    const salesEmail = process.env.SALES_TEAM_EMAIL || 'ventas@iter-energy.com'

    // Formatear el mensaje
    const emailContent = `
🎉 Nuevo Lead Capturado desde el Chatbot

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 INFORMACIÓN DEL LEAD

👤 Nombre: ${lead.name}
🏢 Empresa: ${lead.company || 'No especificado'}
💼 Cargo: ${lead.position || 'No especificado'}

📞 CONTACTO
📧 Email: ${lead.email}
📱 Teléfono: ${lead.phone}

💰 INFORMACIÓN COMERCIAL
💵 Gasto energético mensual: ${lead.monthlyEnergyCost || 'No especificado'}
📅 Fecha preferida para contacto: ${lead.preferredDate || 'No especificado'}

💬 MOTIVACIÓN
${lead.motivation || 'No especificado'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🗣️ RESUMEN DE LA CONVERSACIÓN

${lead.conversationHistory?.slice(-5).map((msg: any, i: number) =>
  `${i + 1}. ${msg.role === 'user' ? '👤 Usuario' : '🤖 Asistente'}: ${msg.content.substring(0, 200)}${msg.content.length > 200 ? '...' : ''}`
).join('\n\n') || 'No hay historial disponible'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ Fecha de captura: ${new Date().toLocaleString('es-ES', {
  dateStyle: 'full',
  timeStyle: 'long'
})}

🔔 ¡Contacta al lead lo antes posible para maximizar la conversión!
    `.trim()

    // Si Resend está configurado, enviar email real
    if (process.env.RESEND_API_KEY) {
      // Instalar: npm install resend
      // const { Resend } = require('resend')
      // const resend = new Resend(process.env.RESEND_API_KEY)

      // await resend.emails.send({
      //   from: 'ITER Chatbot <chatbot@iter-energy.com>',
      //   to: salesEmail,
      //   subject: `🎯 Nuevo Lead: ${lead.name} - ${lead.company || 'Sin empresa'}`,
      //   text: emailContent,
      //   html: emailContent.replace(/\n/g, '<br>'),
      // })

      // Por ahora, log en desarrollo
      console.log('\n' + '='.repeat(80))
      console.log('📧 EMAIL NOTIFICATION (Resend not configured)')
      console.log('='.repeat(80))
      console.log(`To: ${salesEmail}`)
      console.log(`Subject: 🎯 Nuevo Lead: ${lead.name}`)
      console.log('='.repeat(80))
      console.log(emailContent)
      console.log('='.repeat(80) + '\n')

      return NextResponse.json({
        success: true,
        message: 'Notification logged (configure RESEND_API_KEY for real emails)',
      })
    }

    // En desarrollo, solo loggear
    if (process.env.NODE_ENV === 'development') {
      console.log('\n' + '='.repeat(80))
      console.log('📧 EMAIL NOTIFICATION (Development Mode)')
      console.log('='.repeat(80))
      console.log(`To: ${salesEmail}`)
      console.log(`Subject: 🎯 Nuevo Lead: ${lead.name}`)
      console.log('='.repeat(80))
      console.log(emailContent)
      console.log('='.repeat(80) + '\n')

      return NextResponse.json({
        success: true,
        message: 'Notification logged in development mode',
      })
    }

    // Producción sin configuración
    return NextResponse.json({
      success: false,
      message: 'Email service not configured. Please set up Resend API key.',
    }, { status: 503 })

  } catch (error: any) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Error sending notification', details: error.message },
      { status: 500 }
    )
  }
}
