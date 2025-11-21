import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json()

    const salesEmail = process.env.SALES_TEAM_EMAIL || 'luis.somarriba.r@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    const emailContent = `
Nuevo Lead Capturado

INFORMACIÓN DEL LEAD
- Nombre: ${lead.name}
- Empresa: ${lead.company || 'No especificado'}
- Cargo: ${lead.position || 'No especificado'}

CONTACTO
- Email: ${lead.email}
- Teléfono: ${lead.phone || 'No especificado'}

INFORMACIÓN COMERCIAL
- Servicio de interés: ${lead.service || 'No especificado'}
- Gasto energético mensual: ${lead.monthlyEnergyCost || 'No especificado'}
- Fecha preferida: ${lead.preferredDate || 'No especificado'}

MENSAJE/MOTIVACIÓN
${lead.motivation || lead.message || 'No especificado'}

${lead.conversationHistory ? `
RESUMEN CONVERSACIÓN
${lead.conversationHistory.slice(-5).map((msg: any, i: number) =>
  `${i + 1}. ${msg.role === 'user' ? 'Usuario' : 'Asistente'}: ${msg.content.substring(0, 200)}${msg.content.length > 200 ? '...' : ''}`
).join('\n')}
` : ''}

Fecha de captura: ${new Date().toLocaleString('es-ES')}
Fuente: ${lead.source || 'web'}
    `.trim()

    const htmlContent = `
<!DOCTYPE html>
<html>
<head><style>
  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { background: linear-gradient(135deg, #0ea5e9, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
  .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
  .section { margin-bottom: 20px; }
  .label { font-weight: bold; color: #64748b; font-size: 12px; text-transform: uppercase; }
  .value { font-size: 16px; margin-top: 4px; }
  .cta { background: #0ea5e9; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 20px; }
</style></head>
<body>
<div class="container">
  <div class="header">
    <h1 style="margin:0;">Nuevo Lead Capturado</h1>
    <p style="margin:8px 0 0 0;opacity:0.9;">${lead.source === 'chatbot' ? 'Desde el Chatbot' : 'Desde el Formulario de Contacto'}</p>
  </div>
  <div class="content">
    <div class="section">
      <div class="label">Contacto</div>
      <div class="value"><strong>${lead.name}</strong></div>
      <div class="value">${lead.company || ''} ${lead.position ? `- ${lead.position}` : ''}</div>
      <div class="value">📧 ${lead.email}</div>
      <div class="value">📱 ${lead.phone || 'No especificado'}</div>
    </div>
    <div class="section">
      <div class="label">Servicio de Interés</div>
      <div class="value">${lead.service || 'No especificado'}</div>
    </div>
    <div class="section">
      <div class="label">Mensaje</div>
      <div class="value">${lead.motivation || lead.message || 'No especificado'}</div>
    </div>
    <div class="section">
      <div class="label">Fecha de captura</div>
      <div class="value">${new Date().toLocaleString('es-ES')}</div>
    </div>
    <a href="mailto:${lead.email}" class="cta">Contactar Lead</a>
  </div>
</div>
</body>
</html>`

    // Enviar email con Resend si está configurado
    if (resend) {
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: salesEmail,
        subject: `Nuevo Lead: ${lead.name} - ${lead.company || 'Sin empresa'}`,
        text: emailContent,
        html: htmlContent,
      })

      if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, emailId: data?.id })
    }

    // Fallback: log en desarrollo
    console.log('\n' + '='.repeat(60))
    console.log('EMAIL NOTIFICATION (Configure RESEND_API_KEY for real emails)')
    console.log('='.repeat(60))
    console.log(`To: ${salesEmail}`)
    console.log(`Subject: Nuevo Lead: ${lead.name}`)
    console.log(emailContent)
    console.log('='.repeat(60) + '\n')

    return NextResponse.json({
      success: true,
      message: 'Notification logged (add RESEND_API_KEY for real emails)',
    })

  } catch (error: any) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Error sending notification', details: error.message },
      { status: 500 }
    )
  }
}
