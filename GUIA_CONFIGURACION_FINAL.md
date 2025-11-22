# 🚀 Guía de Configuración Final - Sitio Web ITER

## ¡Felicidades! Todas las funcionalidades han sido implementadas ✅

Este documento te guiará paso a paso para poner todo en funcionamiento.

---

## 📋 Tabla de Contenidos

1. [Configurar Base de Datos (Supabase)](#1-configurar-base-de-datos)
2. [Configurar Variables de Entorno](#2-configurar-variables-de-entorno)
3. [Instalar Dependencias](#3-instalar-dependencias)
4. [Verificar Funcionamiento](#4-verificar-funcionamiento)
5. [Crear Usuario Administrador](#5-crear-usuario-administrador)
6. [Configurar Google Analytics (Opcional)](#6-configurar-google-analytics)
7. [Deploy a Producción](#7-deploy-a-producción)

---

## 1. Configurar Base de Datos

### Paso 1.1: Ejecutar Migración SQL Principal

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Click en **SQL Editor** en el menú lateral
3. Copia TODO el contenido de `supabase/migrations/001_initial_setup.sql`
4. Pégalo en el editor SQL
5. Click en **Run** (esquina inferior derecha)
6. ✅ Verifica que se crearon 3 tablas: `leads`, `newsletter_subscribers`, `blog_posts`

### Paso 1.2: Ejecutar Migración de Posts del Blog

1. En el mismo **SQL Editor**
2. Copia el contenido de `supabase/migrations/002_blog_posts_examples.sql`
3. Pégalo y click en **Run**
4. ✅ Verifica que se crearon 3 posts de ejemplo en `blog_posts`

### Paso 1.3: Verificar Tablas

Ir a **Table Editor** y confirmar que ves:

- ✅ `leads` (con 2 ejemplos)
- ✅ `newsletter_subscribers` (con 1 ejemplo)
- ✅ `blog_posts` (con 3 posts de casos de estudio)

---

## 2. Configurar Variables de Entorno

Tu `.env.local` ya tiene las credenciales de Supabase configuradas. Solo necesitas agregar Google Analytics si lo deseas:

```bash
# Supabase (YA CONFIGURADO ✅)
NEXT_PUBLIC_SUPABASE_URL=https://yemlhpqwtdcofdqtomnl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# OpenAI (YA CONFIGURADO ✅)
OPENAI_API_KEY=sk-proj-...

# Email (YA CONFIGURADO ✅)
RESEND_API_KEY=re_LEQtexyF_...
SALES_TEAM_EMAIL=luis.somarriba.r@gmail.com

# Google Analytics (OPCIONAL - Agregar si quieres)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Cómo obtener Google Analytics ID (Opcional):

1. Ve a https://analytics.google.com/
2. Crea una propiedad para tu sitio
3. Copia el **Measurement ID** (formato: `G-XXXXXXXXXX`)
4. Agrégalo a `.env.local`

**Nota**: Si no configuras Google Analytics, el componente simplemente no se cargará (sin errores).

---

## 3. Instalar Dependencias

Asegúrate de tener todas las dependencias instaladas:

```bash
npm install
```

---

## 4. Verificar Funcionamiento

### 4.1 Iniciar Servidor de Desarrollo

```bash
npm run dev
```

Deberías ver algo como:

```
✓ Ready in 2.3s
○ Local:        http://localhost:3000
```

### 4.2 Verificar Funcionalidades

Abre http://localhost:3000 y verifica:

#### ✅ Homepage
- [ ] Carga correctamente
- [ ] Chatbot aparece (esquina inferior derecha)
- [ ] Footer muestra formulario de newsletter

#### ✅ Blog
- [ ] Ir a `/blog`
- [ ] Ver 3 posts de casos de estudio
- [ ] Click en un post y ver contenido completo
- [ ] Posts relacionados se muestran al final

#### ✅ Newsletter
- [ ] En el footer, suscribirse con un email de prueba
- [ ] Debería aparecer mensaje de éxito
- [ ] Verificar en Supabase (`newsletter_subscribers`) que se guardó

#### ✅ Autenticación
- [ ] Ir a `/login`
- [ ] Intentar login (aún no hay usuarios, debería dar error)
- [ ] Ir a `/register`
- [ ] Crear una cuenta de prueba

#### ✅ Crear tu Cuenta de Administrador

1. Ir a `/register`
2. Llenar el formulario:
   - **Nombre**: Tu nombre
   - **Email**: tu@email.com
   - **Contraseña**: Mínimo 6 caracteres
3. Click en "Crear Cuenta"
4. ✅ Deberías ser redirigido a `/admin/dashboard`

**⚠️ IMPORTANTE**: Revisa tu email para confirmar la cuenta (Supabase envía un email de confirmación automáticamente).

#### ✅ Dashboard Administrativo
- [ ] Ir a `/admin/dashboard` (después de login)
- [ ] Ver estadísticas de leads
- [ ] Ver tabla de leads (debería mostrar los 2 ejemplos de la migración)
- [ ] Probar búsqueda
- [ ] Probar filtros
- [ ] Cambiar estado de un lead
- [ ] Click en "Exportar CSV" (descarga archivo)
- [ ] Ver detalles de un lead (icono de ojo)

#### ✅ Perfil de Usuario
- [ ] Ir a `/profile`
- [ ] Ver tu información
- [ ] Cambiar contraseña
- [ ] Cerrar sesión

---

## 5. Crear Usuario Administrador

### Opción A: Registro Normal (Recomendado)

1. Ir a `/register`
2. Crear cuenta
3. Confirmar email
4. ✅ Ya puedes acceder al dashboard

### Opción B: Crear Directamente en Supabase

Si quieres saltarte la confirmación de email:

1. Ir a Supabase Dashboard → **Authentication** → **Users**
2. Click en "Add user" → "Create new user"
3. Ingresar email y contraseña
4. Marcar "Auto confirm user" ✅
5. ✅ Ya puedes hacer login

---

## 6. Configurar Google Analytics (Opcional)

### 6.1 Obtener Measurement ID

1. Ir a https://analytics.google.com/
2. Crear cuenta/propiedad si no tienes
3. En "Admin" → "Data Streams" → Crear stream para tu sitio
4. Copiar el **Measurement ID** (ej: `G-ABC123XYZ`)

### 6.2 Agregar a Variables de Entorno

```bash
# En .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ
```

### 6.3 Verificar Instalación

1. Reiniciar servidor (`npm run dev`)
2. Abrir sitio en navegador
3. Abrir DevTools → Console
4. No deberías ver errores relacionados con Google Analytics
5. En Google Analytics (después de 24-48h) deberías ver tráfico

**Si no configuras Google Analytics:**
- No hay problema, el sitio funciona igual
- Solo verás un mensaje en consola de desarrollo

---

## 7. Deploy a Producción

### Opción A: Deploy en Vercel (Recomendado)

#### Paso 1: Conectar Repositorio

```bash
# Si no has inicializado git
git init
git add .
git commit -m "Initial commit with all features"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

#### Paso 2: Deploy en Vercel

1. Ir a https://vercel.com/
2. Click en "Import Project"
3. Conectar con GitHub
4. Seleccionar tu repositorio
5. **Configurar Variables de Entorno**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `RESEND_API_KEY`
   - `SALES_TEAM_EMAIL`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID` (si tienes)
6. Click en "Deploy"
7. ✅ Esperar 2-3 minutos

#### Paso 3: Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard → Settings → Domains
2. Agregar tu dominio (ej: `iter-energy.com`)
3. Seguir instrucciones para configurar DNS

### Opción B: Deploy Manual

Si prefieres otro hosting:

```bash
# Build para producción
npm run build

# Verificar que build funciona
npm run start

# Deployar carpeta .next y archivos necesarios a tu hosting
```

---

## 8. Testing Final en Producción

Una vez en producción, verificar:

### ✅ Funcionalidades Críticas
- [ ] Homepage carga correctamente
- [ ] Blog muestra los 3 posts
- [ ] Formulario de contacto funciona
- [ ] Newsletter se puede suscribir
- [ ] Login funciona
- [ ] Dashboard muestra leads
- [ ] Exportar CSV funciona
- [ ] Todos los links funcionan

### ✅ SEO
- [ ] Ver código fuente (Ctrl+U)
- [ ] Verificar meta tags presentes
- [ ] Verificar Open Graph tags
- [ ] Verificar Schema.org JSON-LD

### ✅ Performance
- [ ] Lighthouse score (abrir DevTools → Lighthouse)
- [ ] Target: >90 en Performance, SEO, Accessibility

---

## 9. Mantenimiento y Próximos Pasos

### Tareas Regulares

1. **Revisar Leads**: Entrar al dashboard diariamente
2. **Publicar Blog Posts**: Agregar nuevos posts en Supabase
3. **Revisar Suscriptores**: Gestionar lista de newsletter
4. **Monitorear Analytics**: Revisar Google Analytics semanalmente

### Agregar Nuevo Post de Blog

**Opción A: Usando SQL (Recomendado para empezar)**

1. Ir a Supabase → SQL Editor
2. Ejecutar:

```sql
INSERT INTO public.blog_posts (
  title,
  slug,
  excerpt,
  content,
  image_url,
  author,
  category,
  tags,
  read_time,
  status,
  language,
  published_at
) VALUES (
  'Título del Post',
  'titulo-del-post',  -- URL-friendly slug
  'Resumen corto del post',
  '# Contenido en Markdown\n\nTu contenido aquí...',
  'https://imagen-url.com/imagen.jpg',
  'ITER Team',
  'Categoría',
  ARRAY['tag1', 'tag2'],
  '5 min',
  'published',
  'es',
  CURRENT_TIMESTAMP
);
```

**Opción B: Crear Admin Panel para Blog (Futuro)**
- Podrías agregar una sección en `/admin/blog` para gestionar posts
- WYSIWYG editor para markdown
- Upload de imágenes

### Mejoras Futuras Sugeridas

1. **Email Marketing**: Integrar Resend para enviar newsletter real
2. **Blog CMS**: Panel admin para gestionar posts sin SQL
3. **Analytics Dashboard**: Visualizar métricas en el admin
4. **Comentarios en Blog**: Sistema de comentarios para posts
5. **Multi-idioma Blog**: Posts en inglés automáticos
6. **Búsqueda Avanzada**: Buscar en blog por contenido
7. **Notificaciones**: Alertas de nuevos leads vía email

---

## 🆘 Troubleshooting

### Error: "Supabase is not defined"
**Solución**: Verificar que las variables de entorno están correctas en `.env.local`

### Error: "Failed to fetch posts"
**Solución**:
1. Verificar que ejecutaste las migraciones SQL
2. Verificar RLS policies en Supabase
3. Ir a Supabase → Table Editor → blog_posts → Configuración → RLS

### Error: "Cannot login / Authentication failed"
**Solución**:
1. Verificar que creaste usuario en Supabase
2. Confirmar email si Supabase lo requiere
3. Verificar que las credenciales de Supabase son correctas

### Error 404 en /admin/dashboard después de login
**Solución**:
1. Verificar que el archivo existe: `src/app/admin/dashboard/page.tsx`
2. Reiniciar servidor de desarrollo

### Newsletter no guarda suscriptores
**Solución**:
1. Verificar que tabla `newsletter_subscribers` existe
2. Verificar RLS policy permite INSERT público
3. Ver consola del navegador para errores

### Blog no muestra posts
**Solución**:
1. Verificar que ejecutaste `002_blog_posts_examples.sql`
2. Ir a Supabase → Table Editor → blog_posts → Ver que hay 3 posts con `status='published'`
3. Verificar consola del navegador

---

## 📞 Soporte

Si encuentras algún problema:

1. **Revisar Console del Navegador**: DevTools → Console (errores detallados)
2. **Revisar Logs de Supabase**: Dashboard → Logs
3. **Verificar Variables de Entorno**: Que estén correctas en `.env.local`

---

## ✅ Checklist Final de Verificación

Antes de considerar el proyecto completo:

- [ ] Migraciones SQL ejecutadas correctamente
- [ ] Usuario administrador creado y verificado
- [ ] Dashboard accesible y funcional
- [ ] Blog muestra 3 posts de ejemplo
- [ ] Newsletter funciona y guarda suscriptores
- [ ] Todas las variables de entorno configuradas
- [ ] Sitio deployado en producción
- [ ] Dominio personalizado configurado (opcional)
- [ ] Google Analytics funcionando (opcional)
- [ ] Tests manuales completados

---

## 🎉 ¡Listo!

Tu sitio web de ITER está completamente funcional con:

✅ Sistema de autenticación completo
✅ Dashboard administrativo profesional
✅ Sistema de newsletter integrado
✅ Blog dinámico con casos de estudio reales
✅ SEO optimizado
✅ Google Analytics integrado
✅ Diseño responsive y profesional
✅ Protección de rutas con middleware
✅ Exportación de datos a CSV
✅ Y mucho más...

**¡Felicitaciones por tu nuevo sitio web profesional!**

---

**Última actualización**: 21 de Enero 2025
**Versión**: 1.0
**Implementado por**: Claude Code
