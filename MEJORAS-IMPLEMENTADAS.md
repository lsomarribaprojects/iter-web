# 🎉 Mejoras Implementadas en el Agente Conversacional

## ✅ Sistema Completo de Gestión de Leads

### 1. Guardado de Leads

**Archivo:** `src/app/api/leads/route.ts`

**Características:**
- ✅ Guardado en Supabase (si está configurado)
- ✅ Fallback a archivo JSON local en desarrollo
- ✅ API REST completa (GET y POST)
- ✅ Validación de datos requeridos
- ✅ Manejo robusto de errores

**Uso:**
```typescript
// El LeadService se encarga automáticamente
await LeadService.saveLead(leadData)
```

### 2. Notificaciones por Email

**Archivo:** `src/app/api/notifications/lead/route.ts`

**Características:**
- ✅ Soporte para Resend (servicio de email profesional)
- ✅ Fallback a console.log en desarrollo
- ✅ Email formateado profesionalmente
- ✅ Incluye resumen de conversación
- ✅ Configuración fácil con variables de entorno

**Email incluye:**
- Información completa del lead
- Datos de contacto
- Motivación e intereses
- Resumen de conversación
- Timestamp de captura

### 3. Formulario de Captura de Leads

**Archivo:** `src/features/chatbot/components/LeadForm.tsx`

**Características:**
- ✅ UI moderna y profesional
- ✅ Multiidioma (ES/EN)
- ✅ Validación en tiempo real
- ✅ Estados de carga y éxito
- ✅ Animaciones suaves
- ✅ Campos requeridos y opcionales
- ✅ Feedback visual al usuario

**Campos del formulario:**
- Nombre completo * (requerido)
- Empresa (opcional)
- Email * (requerido)
- Teléfono * (requerido)
- Cargo (opcional)
- Gasto energético mensual (opcional)
- Fecha preferida para reunión (opcional)
- Motivación / Interés (opcional)

### 4. Servicio de Leads

**Archivo:** `src/features/chatbot/services/leadService.ts`

**Métodos disponibles:**
- `saveLead(lead)` - Guarda un nuevo lead
- `getLeads()` - Obtiene todos los leads
- `validateLead(lead)` - Valida datos del lead
- `formatLead(lead)` - Formatea para mostrar

---

## 📊 Configuración de Supabase

### Tabla de Leads

Crea esta tabla en Supabase:

```sql
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  company text,
  email text not null,
  phone text not null,
  position text,
  monthly_energy_cost text,
  preferred_date text,
  motivation text,
  conversation_history jsonb,
  source text default 'chatbot',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices para mejor performance
create index leads_email_idx on leads(email);
create index leads_created_at_idx on leads(created_at desc);
create index leads_source_idx on leads(source);

-- RLS (Row Level Security) - ajustar según necesidades
alter table leads enable row level security;

-- Política para permitir inserts desde la API
create policy "Allow API inserts" on leads
  for insert
  with check (true);

-- Política para leer (solo autenticados)
create policy "Allow authenticated reads" on leads
  for select
  using (auth.role() = 'authenticated');
```

---

## 📧 Configuración de Email (Opcional)

### Opción 1: Resend (Recomendado)

1. **Crear cuenta en Resend:** https://resend.com
2. **Obtener API key**
3. **Instalar dependencia:**
   ```bash
   npm install resend
   ```
4. **Configurar en .env.local:**
   ```env
   RESEND_API_KEY=re_tu_api_key
   SALES_TEAM_EMAIL=ventas@iter-energy.com
   ```

5. **Descomentar código en** `src/app/api/notifications/lead/route.ts` (líneas 57-67)

### Opción 2: Sin Email (Desarrollo)

Los leads se guardan pero las notificaciones solo aparecen en console.log

---

## 🔧 Variables de Entorno Completas

Actualiza tu `.env.local`:

```env
# OpenAI (Requerido)
OPENAI_API_KEY=sk-tu-api-key

# Supabase (Recomendado para producción)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key

# Email (Opcional - Sin esto, se usa console.log)
RESEND_API_KEY=re_tu_api_key
SALES_TEAM_EMAIL=ventas@iter-energy.com

# Configuración del chatbot
CHAT_MODEL=gpt-4-turbo-preview
CHAT_MAX_TOKENS=500
CHAT_TEMPERATURE=0.7
```

---

## 🎯 Flujo del Usuario

### 1. Usuario abre el chat
- Ve mensaje de bienvenida automático
- Comienza conversación natural

### 2. Conversación con el agente
- IA responde preguntas técnicas sobre ISO 50001 y fotovoltaica
- Califica el lead con preguntas estratégicas
- Maneja objeciones profesionalmente

### 3. Momento óptimo para capturar lead
**El agente detecta cuando el prospecto:**
- Muestra interés genuino
- Hace preguntas específicas sobre servicios
- Menciona presupuesto o timeline
- Solicita más información

### 4. Solicitud de contacto
El agente sugiere:
- "¿Te gustaría que uno de nuestros expertos se comunique contigo?"
- "¿Podemos agendar una consulta gratuita?"
- Usuario puede presionar botón "Solicitar Contacto"

### 5. Formulario de lead
- Aparece formulario integrado en el chat
- Usuario completa sus datos
- Validación en tiempo real

### 6. Confirmación
- ✅ Lead guardado en Supabase
- ✅ Notificación enviada al equipo de ventas
- ✅ Usuario ve mensaje de éxito
- ✅ Chat continúa disponible

---

## 📈 Integración con el ChatWidget

Para activar el formulario de leads en el ChatWidget, agrega un botón:

```tsx
// En ChatWidget.tsx, agregar:
import { LeadForm } from './LeadForm'

// Estado para mostrar formulario
const [showLeadForm, setShowLeadForm] = useState(false)

// Botón en la UI
{!showLeadForm && (
  <button
    onClick={() => setShowLeadForm(true)}
    className="mt-2 w-full rounded-lg bg-electric-500 px-4 py-2 text-sm text-white"
  >
    {language === 'es' ? '📞 Solicitar Contacto' : '📞 Request Contact'}
  </button>
)}

// Mostrar formulario
{showLeadForm && (
  <LeadForm
    language={language as 'es' | 'en'}
    conversationHistory={messages}
    onSuccess={() => {
      setShowLeadForm(false)
      // Agregar mensaje de confirmación
    }}
    onCancel={() => setShowLeadForm(false)}
  />
)}
```

---

## 🚀 Mejoras del Prompt del Agente

El prompt ahora incluye:

### Detección Inteligente de Leads
- Identifica señales de compra (presupuesto, timeline, autoridad)
- Califica automáticamente el interés
- Sugiere siguiente paso apropiado

### Estrategias de Cierre
- "¿Te gustaría recibir una propuesta personalizada?"
- "¿Podemos agendar 30 minutos para revisar tu caso?"
- "¿Quieres que calculemos tu potencial de ahorro?"

### Urgencia Consultiva
- "Cada mes sin optimizar energía estás perdiendo dinero"
- "Empresas similares logran 20% de ahorro en el primer año"
- "La implementación toma 6-9 meses, comenzar hoy es clave"

---

## 📊 Dashboard de Leads (Próximo)

Ubicación sugerida: `/app/admin/leads/page.tsx`

**Características planeadas:**
- [ ] Tabla de todos los leads
- [ ] Filtros por fecha, fuente, estado
- [ ] Vista detallada de conversaciones
- [ ] Exportar a CSV/Excel
- [ ] Estadísticas y gráficos
- [ ] Integración con CRM

**Implementación simple:**

```tsx
'use client'

import { useEffect, useState } from 'react'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    fetch('/api/leads')
      .then(res => res.json())
      .then(data => setLeads(data.leads))
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Leads Capturados</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Nombre</th>
              <th className="p-4 text-left">Empresa</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Teléfono</th>
              <th className="p-4 text-left">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{lead.name}</td>
                <td className="p-4">{lead.company || '-'}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">{lead.phone}</td>
                <td className="p-4">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

---

## 🔐 Seguridad

### Implementado:
- ✅ API keys nunca expuestas al cliente
- ✅ Validación de datos en servidor
- ✅ Sanitización de inputs
- ✅ CORS configurado

### Recomendaciones para Producción:
- [ ] Rate limiting (Upstash Redis)
- [ ] Autenticación para dashboard de admin
- [ ] Encriptación de datos sensibles
- [ ] Logs de auditoría
- [ ] CAPTCHA en formulario (opcional)

---

## 📝 Archivo .gitignore

Asegúrate de ignorar archivos sensibles:

```
.env.local
.env
leads.json
*.log
```

---

## 🎯 Costos Estimados

### OpenAI GPT-4 Turbo
- **Conversación típica (10 mensajes):** ~$0.10 USD
- **100 leads/mes:** ~$10 USD
- **1000 leads/mes:** ~$100 USD

### Supabase
- **Free tier:** 500MB storage, 50,000 rows
- **Suficiente para:** Miles de leads

### Resend
- **Free tier:** 3,000 emails/mes
- **Suficiente para:** 3,000 leads/mes

**Total estimado para 100 leads/mes: ~$10-15 USD**

---

## 🚀 Próximos Pasos

1. ✅ Configurar OpenAI API key
2. ✅ Configurar Supabase (opcional)
3. ✅ Configurar Resend (opcional)
4. ⏳ Integrar LeadForm en ChatWidget
5. ⏳ Crear dashboard de admin
6. ⏳ Testear flujo completo
7. ⏳ Deploy a producción

---

## 📞 Testing

### 1. Test sin configuración
- Leads se guardan en `leads.json`
- Notificaciones aparecen en console

### 2. Test con Supabase
- Leads se guardan en base de datos
- Consulta con `GET /api/leads`

### 3. Test con Email
- Configura Resend
- Recibe emails reales

---

**¡Todo listo para empezar a capturar leads! 🎉**
