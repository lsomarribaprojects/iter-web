# 📋 Instrucciones para Arreglar RLS en Supabase

## ✅ Estado Actual

El formulario de contacto **está funcionando perfectamente** usando una solución temporal:
- ✅ Los leads se guardan en `leads.json` (archivo local)
- ✅ Las notificaciones por email funcionan
- ✅ El formulario muestra mensajes de éxito/error correctamente

**Evidencia:**
```json
{
  "id": "1763787711238",
  "name": "Test Usuario",
  "email": "test@example.com",
  "phone": "+1 515 555 0000",
  "company": "Test Company",
  "service": "consultoria-solar",
  "message": "Esta es una prueba del formulario de contacto...",
  "source": "contact_form",
  "status": "new",
  "createdAt": "2025-11-22T05:01:51.239Z"
}
```

## 🔧 ¿Por qué necesitas arreglar RLS?

Actualmente, los leads se guardan en un archivo local (`leads.json`), que está bien para desarrollo pero **NO es adecuado para producción**:

- ❌ Los datos se pierden si borras el archivo
- ❌ No puedes ver los leads desde el dashboard de admin
- ❌ No hay respaldo automático en la nube
- ❌ No funciona en Vercel/producción (no hay filesystem persistente)

**Arreglar RLS te permitirá:**
- ✅ Guardar leads directamente en Supabase
- ✅ Ver todos los leads desde el dashboard de admin
- ✅ Backup automático en la nube
- ✅ Funcionar correctamente en producción

## 🚀 Cómo Arreglar RLS (Paso a Paso)

### Paso 1: Ir al SQL Editor de Supabase

1. Abre tu navegador
2. Ve a: https://supabase.com/dashboard/project/yemlhpqwtdcofdqtomnl/sql/new
3. Inicia sesión si te lo pide

### Paso 2: Copiar y Pegar el SQL

Copia el siguiente código SQL completo:

```sql
-- =============================================
-- FIX: Permitir INSERT público en tabla leads
-- Problema: Los formularios públicos no pueden crear leads
-- Solución: Política RLS que permite INSERT sin autenticación
-- =============================================

-- Eliminar la política restrictiva anterior
DROP POLICY IF EXISTS "Admin can do everything on leads" ON public.leads;

-- Política 1: Cualquiera puede crear leads (INSERT público)
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Política 2: Solo admin puede leer leads
CREATE POLICY "Admin can read all leads" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política 3: Solo admin puede actualizar leads
CREATE POLICY "Admin can update leads" ON public.leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política 4: Solo admin puede eliminar leads
CREATE POLICY "Admin can delete leads" ON public.leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Verificar que RLS sigue habilitado
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
```

### Paso 3: Ejecutar el SQL

1. Pega el código en el editor SQL
2. Haz clic en el botón **"Run"** (o presiona `Ctrl+Enter`)
3. Deberías ver: `Success. No rows returned`

### Paso 4: Verificar que Funcionó

Ejecuta este SQL para verificar las políticas:

```sql
SELECT * FROM pg_policies WHERE tablename = 'leads';
```

Deberías ver 4 políticas:
- `Anyone can create leads` (INSERT)
- `Admin can read all leads` (SELECT)
- `Admin can update leads` (UPDATE)
- `Admin can delete leads` (DELETE)

### Paso 5: Activar Supabase en el Código

Una vez que las políticas RLS estén arregladas, necesitas descomentar el código de Supabase:

1. Abre: `src/app/api/leads/route.ts`
2. **Borra las líneas 27-67** (la sección TEMPORAL con archivo local)
3. **Descomenta las líneas siguientes** (código original de Supabase)

O simplemente reemplaza todo el bloque con:

```typescript
// Si Supabase está configurado, guardar ahí
if (supabase) {
  console.log('✅ Supabase client configured, attempting to save...')
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        position: lead.position,
        service_interest: lead.service,
        monthly_energy_cost: lead.monthlyEnergyCost,
        motivation: lead.message || lead.motivation,
        preferred_date: lead.preferredDate,
        conversation_history: lead.conversationHistory,
        source: lead.source || 'contact_form',
        created_at: lead.createdAt || new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error('❌ Supabase error:', error)
    return NextResponse.json(
      { error: 'Error saving to database', details: error.message },
      { status: 500 }
    )
  }

  console.log('✅ Lead saved successfully in Supabase:', data[0]?.id)
  return NextResponse.json({
    success: true,
    lead: data[0],
    message: 'Lead saved successfully in Supabase',
  })
}
```

### Paso 6: Probar que Todo Funciona

1. Reinicia el servidor de desarrollo (`npm run dev`)
2. Ve a: http://localhost:3002/contacto
3. Llena el formulario de contacto
4. Envía el formulario
5. Ve a Supabase → Table Editor → `leads`
6. ¡Deberías ver el nuevo lead ahí! 🎉

## 🔍 Troubleshooting

### Error: "Could not find the 'service_interest' column"

Esto significa que el schema cache de Supabase está desactualizado.

**Solución:**
```sql
-- Refrescar el schema cache
NOTIFY pgrst, 'reload schema';
```

### Error: "new row violates row-level security policy"

Significa que las políticas RLS no se aplicaron correctamente.

**Solución:**
1. Verifica que ejecutaste el SQL del Paso 2
2. Ejecuta: `SELECT * FROM pg_policies WHERE tablename = 'leads';`
3. Confirma que existe la política `Anyone can create leads`

### Los leads no aparecen en el dashboard

Esto es normal - necesitas estar autenticado como admin.

**Solución:**
1. Ve a http://localhost:3002/login
2. Inicia sesión con el usuario admin que creaste
3. Ve a http://localhost:3002/admin/dashboard
4. Los leads deberían aparecer ahora

## 📊 Resumen

| Estado | Descripción |
|--------|-------------|
| ✅ **Ahora** | Formulario funciona con archivo local |
| 🔄 **Después de arreglar RLS** | Formulario guardará en Supabase |
| 🎯 **Beneficio** | Datos persistentes en la nube + dashboard funcional |

---

**¿Necesitas ayuda?** Los archivos importantes están en:
- Migración SQL: `supabase/migrations/003_fix_leads_rls_public_insert.sql`
- API de leads: `src/app/api/leads/route.ts`
- Formulario: `src/features/contact/components/ContactForm.tsx`
