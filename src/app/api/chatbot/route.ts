import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { KNOWLEDGE_BASE, AGENT_PERSONALITY } from '@/features/chatbot/constants/knowledge-base'

// Inicializar OpenAI con API key del usuario
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// System prompt para el consultor experto
const SYSTEM_PROMPT = `Eres Marcus, asesor de ITER especializado en consultoría solar y gestión energética ISO 50001.

IMPORTANTE:
- Nunca te presentes como "asistente virtual" o "bot"
- Usa solo tu nombre "Marcus", nunca apellido
- Sé amigable, directo y profesional
- No menciones años de experiencia a menos que te pregunten

FORMATO DE RESPUESTA: Escribe como un humano en conversación natural. NUNCA uses formato markdown (asteriscos **, negritas, o símbolos especiales). Escribe en texto plano. Respuestas cortas y claras.

**PERSONALIDAD Y TONO:**
- ${AGENT_PERSONALITY.tone}
- ${AGENT_PERSONALITY.approach}
- ${AGENT_PERSONALITY.language}

**TU OBJETIVO:**
${AGENT_PERSONALITY.goal}

**INFORMACIÓN DE LA EMPRESA:**
- Nombre: ${KNOWLEDGE_BASE.company.name}
- Descripción: ${KNOWLEDGE_BASE.company.description}
- Experiencia: ${KNOWLEDGE_BASE.company.experience}
- Países: ${KNOWLEDGE_BASE.company.countries}
- Proyectos: ${KNOWLEDGE_BASE.company.projects}
- Clientes destacados: ${KNOWLEDGE_BASE.company.clients.join(', ')}
- Certificaciones: ${KNOWLEDGE_BASE.company.certifications.join(', ')}

**CONOCIMIENTO TÉCNICO:**

ISO 50001:
- Es la norma internacional ${KNOWLEDGE_BASE.iso50001.overview.name} para Sistemas de Gestión de la Energía
- Beneficios principales: ${KNOWLEDGE_BASE.iso50001.overview.benefits.join(', ')}
- Ahorro típico: ${KNOWLEDGE_BASE.services.energyManagement.benefits}
- Duración implementación: ${KNOWLEDGE_BASE.iso50001.implementation.duration}
- ROI: ${KNOWLEDGE_BASE.iso50001.implementation.investment}

Sistemas Fotovoltaicos:
- Tipos: On-Grid (conectado a red), Off-Grid (aislado), Híbrido
- Componentes: Paneles solares, Inversores, Estructuras, Protecciones
- Eficiencia de paneles: 15-22% según tecnología
- CAPEX típico: ${KNOWLEDGE_BASE.photovoltaic.economics.capex}
- Payback: ${KNOWLEDGE_BASE.photovoltaic.economics.payback}

**SERVICIOS DE ITER:**

1. Gestión Energética ISO 50001:
   - Duración: ${KNOWLEDGE_BASE.services.energyManagement.duration}
   - Inversión: ${KNOWLEDGE_BASE.services.energyManagement.investment}
   - Entregables: ${KNOWLEDGE_BASE.services.energyManagement.deliverables.slice(0, 5).join(', ')}

2. Consultoría Solar:
   - ${KNOWLEDGE_BASE.services.solarConsulting.description}
   - Expertise: ${KNOWLEDGE_BASE.services.solarConsulting.expertise}

3. Formación:
   - Cursos: Auditor ISO 50001, Diseño Fotovoltaico, Gestión Energética
   - Modalidades: ${KNOWLEDGE_BASE.services.training.modality}

**MANEJO DE OBJECIONES:**

Si mencionan que es caro:
"${KNOWLEDGE_BASE.sales.common_objections.price.response}"

Si dicen que no tienen tiempo:
"${KNOWLEDGE_BASE.sales.common_objections.time.response}"

Si no es prioritario:
"${KNOWLEDGE_BASE.sales.common_objections.priority.response}"

**PROCESO DE VENTA:**

1. Escucha activa: Entiende sus necesidades y dolor
2. Califica el lead con preguntas:
   ${KNOWLEDGE_BASE.sales.qualifying_questions.slice(0, 4).join('\n   ')}

3. Presenta valor alineado a sus necesidades
4. Maneja objeciones con empatía y datos
5. Cierra con call-to-action: Agendar diagnóstico gratuito o llamada

**CAPTURA DE LEADS:**
Cuando el prospecto muestre interés genuino, solicita amablemente:
- Nombre completo
- Empresa
- Email
- Teléfono
- (Opcional) Cargo, gasto energético mensual, fecha preferida

**IMPORTANTE:**
- Nunca inventes datos técnicos
- Sé honesto si no sabes algo
- Enfócate en beneficios, no solo características
- Usa casos de éxito cuando sea relevante
- Genera urgencia de forma consultiva, no agresiva
- Guía hacia agendar una reunión o diagnóstico

**IDIOMAS:**
Responde en el mismo idioma que el usuario (español o inglés).`

// Respuestas de fallback cuando no hay API key
function getFallbackResponse(userMessage: string, language: string): string {
  const msg = userMessage.toLowerCase()

  const responses = {
    es: {
      greeting: '¡Hola! Soy Marcus de ITER. Estamos especializados en consultoría solar, gestión energética ISO 50001 y formación profesional. ¿En qué área puedo ayudarte?',
      iso: `ISO 50001 es la norma internacional para Sistemas de Gestión de Energía. Con ITER, nuestros clientes logran:\n\n- Ahorro energético del 15-20%\n- Implementación en 6-9 meses\n- ROI típico de 1-3 años\n\n¿Te gustaría agendar un diagnóstico gratuito?`,
      solar: `Ofrecemos consultoría solar integral:\n\n- Evaluación de viabilidad técnica y económica\n- Diseño de sistemas desde 10kWp hasta 50MWp\n- Due diligence y supervisión\n- Payback típico: 4-8 años\n\n¿Tienes un proyecto en mente?`,
      training: `Nuestros programas de formación incluyen:\n\n- Auditor Interno ISO 50001 (16h)\n- Diseño de Sistemas Fotovoltaicos (24h)\n- Gestión Energética Práctica (12h)\n\nModalidad presencial, virtual o híbrida. ¿Cuál te interesa?`,
      contact: `¡Excelente! Para agendar una consulta gratuita, puedes:\n\n1. Llamarnos directamente\n2. Escribirnos a info@iter-energy.com\n3. Usar el formulario de contacto en nuestra web\n\n¿Prefieres que te contactemos nosotros?`,
      default: `Gracias por tu interés. En ITER ofrecemos:\n\n1. Gestión Energética ISO 50001\n2. Consultoría Solar\n3. Formación Profesional\n\n¿Sobre cuál servicio te gustaría más información?`,
    },
    en: {
      greeting: 'Hi! I\'m Marcus from ITER. We specialize in solar consulting, ISO 50001 energy management, and professional training. How can I help you?',
      iso: `ISO 50001 is the international standard for Energy Management Systems. With ITER, our clients achieve:\n\n- 15-20% energy savings\n- Implementation in 6-9 months\n- Typical ROI of 1-3 years\n\nWould you like to schedule a free diagnosis?`,
      solar: `We offer comprehensive solar consulting:\n\n- Technical and economic feasibility assessment\n- System design from 10kWp to 50MWp\n- Due diligence and supervision\n- Typical payback: 4-8 years\n\nDo you have a project in mind?`,
      training: `Our training programs include:\n\n- ISO 50001 Internal Auditor (16h)\n- Photovoltaic Systems Design (24h)\n- Practical Energy Management (12h)\n\nIn-person, virtual, or hybrid. Which interests you?`,
      contact: `Great! To schedule a free consultation, you can:\n\n1. Call us directly\n2. Email us at info@iter-energy.com\n3. Use the contact form on our website\n\nWould you like us to contact you?`,
      default: `Thanks for your interest. At ITER we offer:\n\n1. ISO 50001 Energy Management\n2. Solar Consulting\n3. Professional Training\n\nWhich service would you like more information about?`,
    }
  }

  const r = responses[language as 'es' | 'en'] || responses.es

  if (msg.includes('hola') || msg.includes('hi') || msg.includes('hello')) return r.greeting
  if (msg.includes('iso') || msg.includes('50001') || msg.includes('energét') || msg.includes('energy management')) return r.iso
  if (msg.includes('solar') || msg.includes('fotovoltaic') || msg.includes('panel')) return r.solar
  if (msg.includes('curso') || msg.includes('formación') || msg.includes('training') || msg.includes('capacitación')) return r.training
  if (msg.includes('contact') || msg.includes('agendar') || msg.includes('llamar') || msg.includes('cita') || msg.includes('schedule')) return r.contact

  return r.default
}

export async function POST(req: NextRequest) {
  try {
    const { messages, language = 'es' } = await req.json()
    const lastUserMessage = messages[messages.length - 1]?.content || ''

    // Si no hay API key, usar fallback inteligente
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        message: getFallbackResponse(lastUserMessage, language),
        fallback: true,
      })
    }

    // Llamar a OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    })

    const responseMessage = completion.choices[0]?.message

    return NextResponse.json({
      message: responseMessage?.content || 'Lo siento, no pude generar una respuesta.',
      usage: completion.usage,
    })
  } catch (error: any) {
    console.error('Chatbot API Error:', error)

    // Fallback en caso de error
    const { messages, language = 'es' } = await req.json().catch(() => ({ messages: [], language: 'es' }))
    const lastUserMessage = messages[messages.length - 1]?.content || ''

    if (error?.status === 401 || error?.status === 429) {
      return NextResponse.json({
        message: getFallbackResponse(lastUserMessage, language),
        fallback: true,
      })
    }

    return NextResponse.json(
      { error: 'Error processing your message. Please try again.' },
      { status: 500 }
    )
  }
}
