# 🤖 Agente Conversacional de Ventas ITER

Chatbot inteligente con IA para ventas y captación de leads, especializado en:
- ✅ Gestión Energética ISO 50001
- ✅ Sistemas Fotovoltaicos
- ✅ Consultoría técnica especializada
- ✅ Captura de leads calificados
- ✅ Agendamiento de llamadas y visitas

## 🚀 Configuración Rápida

### 1. Obtener API Key de OpenAI

1. Visita [OpenAI Platform](https://platform.openai.com/api-keys)
2. Inicia sesión o crea una cuenta
3. Ve a "API Keys"
4. Crea una nueva API key
5. Copia la key (empieza con `sk-...`)

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.local.example .env.local
```

Edita `.env.local` y agrega tu API key:

```env
OPENAI_API_KEY=sk-tu-api-key-aqui
```

### 3. Reiniciar el Servidor

```bash
npm run dev
```

¡El chatbot ya debería estar funcionando! 🎉

---

## 📁 Arquitectura

```
src/features/chatbot/
├── components/
│   └── ChatWidget.tsx          # UI del chatbot (botón + ventana)
├── constants/
│   └── knowledge-base.ts       # Base de conocimientos técnicos
├── types/
│   └── index.ts                # Tipos TypeScript
└── services/                   # (Futuro) Servicios adicionales

src/app/api/chatbot/
└── route.ts                    # API endpoint que conecta con OpenAI
```

## 🧠 Knowledge Base

El agente tiene conocimiento profundo sobre:

### ISO 50001
- Estructura de la norma (cláusulas 4-10)
- Ciclo PDCA
- Implementación paso a paso
- Beneficios y ROI
- Casos de uso y ejemplos

### Sistemas Fotovoltaicos
- Tipos: On-Grid, Off-Grid, Híbrido
- Componentes: Paneles, Inversores, Estructuras
- Diseño y dimensionamiento
- Economía: CAPEX, OPEX, LCOE, Payback
- Normativas: IEC, NEC, IEEE

### Estrategias de Venta
- Manejo de objeciones comunes
- Preguntas de calificación de leads
- Value proposition de ITER
- Casos de éxito

Ubicación: `src/features/chatbot/constants/knowledge-base.ts`

## 🎯 Personalización del Agente

### Cambiar el Modelo de IA

En `src/app/api/chatbot/route.ts`, línea 151:

```typescript
model: 'gpt-4-turbo-preview',  // Cambia aquí
```

Opciones:
- `gpt-4-turbo-preview` - Mejor calidad, más caro (~$0.01 per 1K tokens)
- `gpt-4` - Alta calidad
- `gpt-3.5-turbo` - Más económico (~$0.0015 per 1K tokens)

### Ajustar Personalidad

En `src/app/api/chatbot/route.ts`, modifica el `SYSTEM_PROMPT`:

```typescript
const SYSTEM_PROMPT = `
Eres un agente de ventas experto...
// Ajusta el tono, enfoque, y comportamiento aquí
`
```

### Agregar Más Conocimiento

Edita `src/features/chatbot/constants/knowledge-base.ts` y agrega:
- Nuevos servicios
- Respuestas a preguntas frecuentes
- Casos de éxito adicionales
- Información técnica específica

## 💰 Costos Estimados

### GPT-4 Turbo
- Input: $0.01 / 1K tokens
- Output: $0.03 / 1K tokens
- Conversación típica (10 mensajes): ~$0.10 USD

### GPT-3.5 Turbo
- Input: $0.0015 / 1K tokens
- Output: $0.002 / 1K tokens
- Conversación típica (10 mensajes): ~$0.02 USD

**Recomendación:** Empieza con GPT-4 Turbo para mejor calidad. Si el volumen es alto, considera GPT-3.5 Turbo.

## 📊 Captura de Leads

El agente automáticamente:
1. Califica el prospecto con preguntas estratégicas
2. Identifica momento óptimo para solicitar datos
3. Guía hacia agendar una consulta

### Datos que Captura
- Nombre completo
- Empresa
- Email
- Teléfono
- Cargo (opcional)
- Gasto energético mensual (opcional)
- Fecha preferida (opcional)

### Próximos Pasos (Implementación Futura)
- [ ] Guardar leads en Supabase
- [ ] Enviar notificación por email al equipo de ventas
- [ ] Integración con CRM
- [ ] Dashboard de leads

## 🔧 Troubleshooting

### Error: "OpenAI API key not configured"
**Solución:** Verifica que `.env.local` existe y contiene `OPENAI_API_KEY=sk-...`

### Error: "Invalid OpenAI API key"
**Solución:**
1. Verifica que la API key es correcta
2. Asegúrate de que no tiene espacios al inicio/final
3. Confirma que la key está activa en OpenAI Platform

### Error: "Rate limit exceeded"
**Solución:**
1. Has excedido el límite de requests
2. Espera unos minutos y prueba de nuevo
3. Considera aumentar tu plan en OpenAI

### El bot responde en inglés cuando debería responder en español
**Causa:** El sistema detecta el idioma del usuario automáticamente
**Solución:** Asegúrate de escribir en español claramente en tus primeros mensajes

## 🌐 Multiidioma

El chatbot detecta automáticamente el idioma del usuario y responde en:
- Español
- Inglés

Soporta el cambio de idioma usando el selector de idioma del sitio.

## 🎨 Personalizar UI

### Cambiar Colores

En `src/features/chatbot/components/ChatWidget.tsx`:

```tsx
// Botón flotante
className="... bg-gradient-to-r from-electric-500 to-energy-500"

// Mensajes del usuario
className="... bg-electric-500 text-white"

// Mensajes del asistente
className="... bg-white text-slate-800"
```

### Cambiar Posición

```tsx
// Esquina inferior derecha (default)
className="fixed bottom-6 right-6"

// Esquina inferior izquierda
className="fixed bottom-6 left-6"
```

### Cambiar Tamaño

```tsx
// Ventana de chat
className="... h-[600px] w-[400px]"
```

## 📈 Mejoras Futuras

- [ ] Integración con calendario para agendar citas
- [ ] Persistencia de conversaciones
- [ ] Analytics de conversaciones
- [ ] A/B testing de prompts
- [ ] Training con conversaciones reales
- [ ] Respuestas con documentos adjuntos
- [ ] Video llamada directa desde el chat

## 🔐 Seguridad

- ✅ API key nunca expuesta al cliente
- ✅ Endpoint protegido server-side
- ✅ Rate limiting implementado por OpenAI
- ⚠️ Considera agregar rate limiting adicional en producción
- ⚠️ Implementa autenticación si guardas datos sensibles

## 📞 Soporte

Si necesitas ayuda:
1. Revisa este README
2. Consulta [OpenAI Documentation](https://platform.openai.com/docs)
3. Revisa [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

**Built with ❤️ using:**
- OpenAI GPT-4
- Next.js 14
- TypeScript
- Framer Motion
- Tailwind CSS
