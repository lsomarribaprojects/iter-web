# Migraciones de Base de Datos - ITER

## 📋 Instrucciones para ejecutar migraciones

### Opción 1: Usando Supabase Dashboard (Recomendado)

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Click en **SQL Editor** en el menú lateral
3. Copia y pega el contenido de `migrations/001_initial_setup.sql`
4. Click en **Run** para ejecutar
5. Verifica que todo se creó correctamente en la sección **Table Editor**

### Opción 2: Usando Supabase CLI

```bash
# Instalar Supabase CLI si no lo tienes
npm install -g supabase

# Conectar con tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Ejecutar migraciones
supabase db push
```

## 📊 Tablas Creadas

### 1. `leads`
Almacena contactos capturados del chatbot y formularios de contacto.

**Campos principales:**
- `id` (UUID) - Primary key
- `name`, `email`, `phone` - Información de contacto
- `company`, `position` - Información laboral
- `service_interest` - Servicio de interés
- `source` - Origen del lead (chatbot, contact_form, etc.)
- `status` - Estado (new, contacted, qualified, converted, lost)
- `created_at`, `updated_at` - Timestamps

### 2. `newsletter_subscribers`
Almacena suscriptores del newsletter.

**Campos principales:**
- `id` (UUID) - Primary key
- `email` (UNIQUE) - Email del suscriptor
- `name` - Nombre opcional
- `active` - Si está activo
- `confirmed` - Si confirmó su email
- `language` - Idioma preferido
- `subscribed_at` - Fecha de suscripción

### 3. `blog_posts`
Almacena artículos del blog.

**Campos principales:**
- `id` (UUID) - Primary key
- `title`, `slug` (UNIQUE) - Título y URL amigable
- `excerpt`, `content` - Resumen y contenido completo
- `image_url` - URL de imagen destacada
- `author`, `category`, `tags` - Metadata
- `status` - Estado (draft, published, archived)
- `language` - Idioma del post
- `published_at` - Fecha de publicación

## 🔒 Seguridad (RLS)

**Row Level Security está habilitado** en todas las tablas:

- **leads**: Solo usuarios autenticados pueden acceder
- **newsletter_subscribers**: Cualquiera puede suscribirse, solo admins pueden ver/editar
- **blog_posts**: Lectura pública de posts publicados, admins pueden todo

## 🔍 Índices

Se han creado índices en:
- Emails para búsquedas rápidas
- Fechas para ordenamiento
- Slugs para URLs
- Estados y categorías para filtros

## ✅ Verificación

Después de ejecutar las migraciones, verifica:

```sql
-- Ver todas las tablas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';

-- Contar registros
SELECT COUNT(*) FROM leads;
SELECT COUNT(*) FROM newsletter_subscribers;
SELECT COUNT(*) FROM blog_posts;
```

## 🚨 Troubleshooting

**Error: "relation already exists"**
- Las tablas ya existen. Si quieres resetear, usa `DROP TABLE` (⚠️ perderás datos)

**Error: "permission denied"**
- Asegúrate de estar usando el Service Role Key para operaciones de admin

**RLS bloqueando consultas**
- Para testing, puedes deshabilitar temporalmente: `ALTER TABLE tabla DISABLE ROW LEVEL SECURITY;`
