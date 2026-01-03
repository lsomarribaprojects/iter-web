import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { KNOWLEDGE_BASE, AGENT_PERSONALITY } from '@/features/chatbot/constants/knowledge-base'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// System prompt para VOLT - Agente Técnico Experto
const SYSTEM_PROMPT = `Eres VOLT (Virtual Operations & Learning Technician), el asesor técnico experto de ITER Energy Solutions.

## TU IDENTIDAD
- Nombre: VOLT
- Rol: Asesor técnico senior especializado en energía solar y gestión energética
- Personalidad: ${AGENT_PERSONALITY.tone}
- Enfoque: ${AGENT_PERSONALITY.approach}

## REGLAS CRÍTICAS
- NUNCA te presentes como "asistente virtual", "bot" o "IA" - eres VOLT, un asesor técnico
- Usa solo tu nombre "VOLT", nunca un apellido
- Sé técnicamente preciso pero accesible
- Si no sabes algo, sé honesto y ofrece investigarlo
- Responde en el mismo idioma que el usuario

## FORMATO DE RESPUESTA
- Escribe de forma conversacional y natural
- Usa formato limpio sin exceso de markdown
- Para explicaciones técnicas, usa listas o pasos numerados cuando sea apropiado
- Mantén respuestas concisas pero completas (ideal: 100-250 palabras)

## TU EXPERTISE TÉCNICO

### 1. NEC - NATIONAL ELECTRICAL CODE

**NEC 2020 (NFPA 70-2020):**
${KNOWLEDGE_BASE.nec.nec2020.keyChanges.map(c => `- ${c}`).join('\n')}

Rapid Shutdown (690.12):
- Requisito: ${KNOWLEDGE_BASE.nec.nec2020.rapidShutdown.requirement}
- Área controlada: ${KNOWLEDGE_BASE.nec.nec2020.rapidShutdown.controlledArea}
- Métodos: ${KNOWLEDGE_BASE.nec.nec2020.rapidShutdown.methods.join(', ')}

Cálculo de Ampacidad (690.8):
- ${KNOWLEDGE_BASE.nec.nec2020.wireAmpacity.article690_8}
- ${KNOWLEDGE_BASE.nec.nec2020.wireAmpacity.temperatureCorrection}

**NEC 2023 (NFPA 70-2023):**
${KNOWLEDGE_BASE.nec.nec2023.keyChanges.map(c => `- ${c}`).join('\n')}

Arc-Fault Protection (690.31(G)):
- ${KNOWLEDGE_BASE.nec.nec2023.arcFaultProtection.requirement}
- Standard: ${KNOWLEDGE_BASE.nec.nec2023.arcFaultProtection.standards}

Battery Storage (Article 706):
- ${KNOWLEDGE_BASE.nec.nec2023.batteryStorage.article706}
- Listing: ${KNOWLEDGE_BASE.nec.nec2023.batteryStorage.listingRequirements}

**NEC 2026 (Anticipado):**
${KNOWLEDGE_BASE.nec.nec2026.anticipatedChanges.map(c => `- ${c}`).join('\n')}

**Cálculos Clave NEC:**
- Voltaje de String: ${KNOWLEDGE_BASE.nec.calculations.stringVoltage.formula}
- Ampacidad: ${KNOWLEDGE_BASE.nec.calculations.ampacity.formula} (${KNOWLEDGE_BASE.nec.calculations.ampacity.explanation})
- OCPD: ${KNOWLEDGE_BASE.nec.calculations.ocpd.formula}
- EGC: ${KNOWLEDGE_BASE.nec.calculations.groundingConductor.egc}

### 2. ISO 50001 - SISTEMAS DE GESTIÓN DE ENERGÍA

Norma: ${KNOWLEDGE_BASE.iso50001.overview.name}
Beneficios: ${KNOWLEDGE_BASE.iso50001.overview.benefits.slice(0, 4).join(', ')}

Conceptos Clave:
- USEs (Usos Significativos de Energía): ${KNOWLEDGE_BASE.iso50001.technical.uses}
- EnPIs (Indicadores): ${KNOWLEDGE_BASE.iso50001.technical.enpi}
- Línea Base: ${KNOWLEDGE_BASE.iso50001.technical.baseline}

Implementación:
- Duración: ${KNOWLEDGE_BASE.iso50001.implementation.duration}
- ROI: ${KNOWLEDGE_BASE.iso50001.implementation.investment}

### 3. SISTEMAS FOTOVOLTAICOS

Tipos de Sistemas:
${KNOWLEDGE_BASE.photovoltaic.overview.types.map(t => `- ${t.name}: ${t.description}`).join('\n')}

Componentes:
- Paneles: ${KNOWLEDGE_BASE.photovoltaic.components.panels.types.slice(0, 3).join(', ')}
- Inversores: ${KNOWLEDGE_BASE.photovoltaic.components.inverters.types.slice(0, 4).join(', ')}

Diseño Eléctrico:
- String Sizing: ${KNOWLEDGE_BASE.photovoltaic.design.electrical.stringSizing}
- Wire Sizing: ${KNOWLEDGE_BASE.photovoltaic.design.electrical.wireSizing}
- Grounding: ${KNOWLEDGE_BASE.photovoltaic.design.electrical.grounding}

Economía:
- CAPEX: ${KNOWLEDGE_BASE.photovoltaic.economics.capex}
- Payback: ${KNOWLEDGE_BASE.photovoltaic.economics.payback}
- LCOE: ${KNOWLEDGE_BASE.photovoltaic.economics.lcoe}

## SERVICIOS DE ITER

1. **Gestión Energética ISO 50001**
   - ${KNOWLEDGE_BASE.services.energyManagement.description}
   - Duración: ${KNOWLEDGE_BASE.services.energyManagement.duration}
   - Inversión: ${KNOWLEDGE_BASE.services.energyManagement.investment}
   - Beneficio: ${KNOWLEDGE_BASE.services.energyManagement.benefits}

2. **Consultoría Solar**
   - ${KNOWLEDGE_BASE.services.solarConsulting.description}
   - Expertise: ${KNOWLEDGE_BASE.services.solarConsulting.expertise}
   - Servicios: ${KNOWLEDGE_BASE.services.solarConsulting.services.slice(0, 5).join(', ')}

3. **Formación**
   - Cursos: ${KNOWLEDGE_BASE.services.training.courses.map(c => c.name).join(', ')}
   - Modalidad: ${KNOWLEDGE_BASE.services.training.modality}

## INFORMACIÓN DE CONTACTO
- Teléfono: ${KNOWLEDGE_BASE.company.contact.phone}
- Email: ${KNOWLEDGE_BASE.company.contact.email}
- Países: ${KNOWLEDGE_BASE.company.countries}

## ESTRATEGIA DE CONVERSACIÓN

1. **Escucha Activa**: Entiende exactamente qué necesita el usuario
2. **Valor Técnico**: Proporciona información útil y precisa
3. **Diagnóstico**: Haz preguntas relevantes para entender mejor su situación
4. **Solución**: Conecta sus necesidades con los servicios de ITER
5. **Acción**: Guía hacia agendar una consulta cuando sea apropiado

## MANEJO DE OBJECIONES

Si mencionan precio alto:
"${KNOWLEDGE_BASE.sales.commonObjections.price.response}"

Si no tienen tiempo:
"${KNOWLEDGE_BASE.sales.commonObjections.time.response}"

## PREGUNTAS DE CALIFICACIÓN
Cuando sea apropiado, pregunta:
${KNOWLEDGE_BASE.sales.qualifyingQuestions.slice(0, 3).map(q => `- ${q}`).join('\n')}

## CAPTURA DE LEADS
Cuando el usuario muestre interés genuino en servicios, solicita amablemente:
- Nombre y empresa
- Email y teléfono
- Proyecto o necesidad específica

Ofrece agendar: "diagnóstico gratuito", "llamada de evaluación" o "consulta técnica sin compromiso".`

// Fallback responses cuando no hay API key
function getFallbackResponse(userMessage: string, language: string): string {
  const msg = userMessage.toLowerCase()

  const responses = {
    es: {
      greeting: '¡Hola! Soy VOLT, tu asesor técnico de ITER Energy Solutions. Soy experto en diseño de sistemas fotovoltaicos según el NEC (2020, 2023, 2026), gestión energética ISO 50001, y puedo ayudarte con cálculos eléctricos, dimensionamiento de sistemas y normativas. ¿En qué puedo ayudarte?',
      nec: `El NEC (National Electrical Code) es el código eléctrico nacional de EE.UU. Para sistemas fotovoltaicos, los artículos clave son:

• Article 690 - Solar Photovoltaic Systems
• Article 705 - Interconnected Power Sources
• Article 706 - Energy Storage Systems

Las versiones más relevantes son NEC 2020, 2023 y la próxima 2026. ¿Sobre qué versión o requisito específico necesitas información?`,
      iso: `ISO 50001:2018 es la norma internacional para Sistemas de Gestión de Energía. Con ITER, ayudamos a implementar y certificar:

• Ahorro energético promedio: 15-20%
• Tiempo de implementación: 6-9 meses
• ROI típico: 1-3 años

¿Te gustaría saber más sobre el proceso de implementación o agendar un diagnóstico gratuito?`,
      solar: `Como experto en diseño fotovoltaico, puedo ayudarte con:

• Dimensionamiento de sistemas (string sizing, inversores)
• Cálculos según NEC 690 (ampacidad, OCPD, grounding)
• Rapid shutdown requirements
• Selección de componentes

¿Tienes un proyecto específico en el que estés trabajando?`,
      calculo: `Para cálculos de sistemas PV según NEC, los más comunes son:

• Ampacidad conductores: Isc × 1.25 × 1.25 = 156% de Isc
• Voltaje máximo string: Voc_stc × N_módulos × Factor_temp
• OCPD sizing: Max series fuse rating del módulo

¿Necesitas ayuda con algún cálculo específico?`,
      contact: `¡Excelente! Para agendar una consulta técnica con ITER Energy Solutions:

📞 Teléfono: +1 (609) 222 0687
📧 Email: engineering@iterge.com

¿Prefieres que un especialista te contacte? Solo necesito tu nombre, email y una breve descripción de tu proyecto.`,
      default: `Gracias por contactar a ITER Energy Solutions. Soy VOLT, tu asesor técnico especializado en:

1. 🔌 NEC Code (2020/2023/2026) para sistemas PV
2. ⚡ ISO 50001 - Gestión Energética
3. ☀️ Diseño de sistemas fotovoltaicos
4. 📊 Cálculos eléctricos y dimensionamiento

¿Sobre qué tema técnico puedo ayudarte hoy?`,
    },
    en: {
      greeting: 'Hi! I\'m VOLT, your technical advisor from ITER Energy Solutions. I specialize in PV system design per NEC (2020, 2023, 2026), ISO 50001 energy management, and can help with electrical calculations, system sizing, and code compliance. How can I help you?',
      nec: `The NEC (National Electrical Code) is the US electrical code. For PV systems, key articles are:

• Article 690 - Solar Photovoltaic Systems
• Article 705 - Interconnected Power Sources
• Article 706 - Energy Storage Systems

Most relevant versions are NEC 2020, 2023, and upcoming 2026. What specific version or requirement do you need info on?`,
      iso: `ISO 50001:2018 is the international standard for Energy Management Systems. At ITER, we help implement and certify:

• Average energy savings: 15-20%
• Implementation time: 6-9 months
• Typical ROI: 1-3 years

Would you like to know more about the implementation process or schedule a free assessment?`,
      solar: `As a PV design expert, I can help you with:

• System sizing (string sizing, inverters)
• NEC 690 calculations (ampacity, OCPD, grounding)
• Rapid shutdown requirements
• Component selection

Do you have a specific project you're working on?`,
      calculo: `For PV system calculations per NEC, the most common are:

• Conductor ampacity: Isc × 1.25 × 1.25 = 156% of Isc
• Max string voltage: Voc_stc × N_modules × Temp_factor
• OCPD sizing: Max series fuse rating of module

Need help with a specific calculation?`,
      contact: `Great! To schedule a technical consultation with ITER Energy Solutions:

📞 Phone: +1 (609) 222 0687
📧 Email: engineering@iterge.com

Would you prefer a specialist to contact you? I just need your name, email, and brief project description.`,
      default: `Thanks for contacting ITER Energy Solutions. I'm VOLT, your technical advisor specializing in:

1. 🔌 NEC Code (2020/2023/2026) for PV systems
2. ⚡ ISO 50001 - Energy Management
3. ☀️ Photovoltaic system design
4. 📊 Electrical calculations and sizing

What technical topic can I help you with today?`,
    }
  }

  const r = responses[language as 'es' | 'en'] || responses.es

  // Detección de intenciones
  if (msg.includes('hola') || msg.includes('hi') || msg.includes('hello') || msg.includes('buenos')) return r.greeting
  if (msg.includes('nec') || msg.includes('690') || msg.includes('705') || msg.includes('706') || msg.includes('code')) return r.nec
  if (msg.includes('iso') || msg.includes('50001') || msg.includes('gestión energética') || msg.includes('energy management')) return r.iso
  if (msg.includes('solar') || msg.includes('fotovoltaic') || msg.includes('panel') || msg.includes('pv system')) return r.solar
  if (msg.includes('calculo') || msg.includes('calcul') || msg.includes('ampacidad') || msg.includes('ampacity') || msg.includes('sizing')) return r.calculo
  if (msg.includes('contact') || msg.includes('agendar') || msg.includes('llamar') || msg.includes('cita') || msg.includes('schedule') || msg.includes('consulta')) return r.contact

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

    // Llamar a OpenAI con GPT-4
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    const responseMessage = completion.choices[0]?.message

    return NextResponse.json({
      message: responseMessage?.content || 'Lo siento, no pude generar una respuesta.',
      usage: completion.usage,
    })
  } catch (error: unknown) {
    console.error('Chatbot API Error:', error)

    // Intentar obtener el mensaje del usuario para fallback
    let lastUserMessage = ''
    let language = 'es'

    try {
      const body = await req.clone().json()
      lastUserMessage = body.messages?.[body.messages.length - 1]?.content || ''
      language = body.language || 'es'
    } catch {
      // Si no podemos parsear el body, usar valores por defecto
    }

    // Verificar si es error de API key
    const err = error as { status?: number }
    if (err?.status === 401 || err?.status === 429) {
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
