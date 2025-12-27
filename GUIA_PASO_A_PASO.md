# 🎯 GUÍA PASO A PASO - ACTIVAR TU WEB ITER

**Sigue estos pasos EN ORDEN. Son solo 4 pasos muy simples.**

**Tiempo total: 12 minutos** ⏱️

---

## ✅ PASO 1: COPIAR SQL DE ARTÍCULOS DEL BLOG (3 minutos)

### 1.1 Abrir el archivo SQL en Cursor:

**En el panel izquierdo de Cursor** (donde ves la lista de archivos):
- Busca el archivo llamado: **`blog_17_articles_completed.sql`**
- Está en la raíz del proyecto (al mismo nivel que `package.json`)
- Haz **DOBLE CLIC** en ese archivo
- Se abrirá en el editor (verás MUCHO código SQL)

### 1.2 Seleccionar TODO el contenido:

**Con el archivo abierto en el editor:**
- Presiona **`Ctrl + A`** (en Windows) o **`Cmd + A`** (en Mac)
- Todo el texto se pondrá azul/seleccionado (732 KB de código)

### 1.3 Copiar el contenido:

- Presiona **`Ctrl + C`** (en Windows) o **`Cmd + C`** (en Mac)
- ¡Listo! Ya está copiado en el portapapeles

### 1.4 Abrir Supabase SQL Editor:

**Haz clic en este enlace** (se abrirá en tu navegador):

👉 **https://supabase.com/dashboard/project/yemlhpqwtdcofdqtomnl/sql/new**

- Si te pide login, inicia sesión con tu cuenta de Supabase
- Verás una página con un área grande de texto (SQL Editor)
- El título dirá "SQL Editor" o "New query"

### 1.5 Pegar el código SQL:

- Haz **clic dentro** del área de texto grande (donde dice "Write your SQL here")
- Presiona **`Ctrl + V`** (Windows) o **`Cmd + V`** (Mac)
- Verás aparecer MUCHO texto (17 bloques INSERT INTO)
- **Esto es normal** - son los 17 artículos del blog

### 1.6 Ejecutar el código:

- Busca el botón verde que dice **"RUN"** (arriba a la derecha del editor)
- Haz **CLIC** en ese botón
- Espera **10-30 segundos** (puede tomar tiempo porque son 17 artículos grandes)
- Verás un spinner/loading mientras se ejecuta

**✅ RESULTADO ESPERADO:**
- Aparecerá un mensaje verde: **"Success"** o **"Success. No rows returned"**
- Esto significa que los 17 artículos se insertaron correctamente

**❌ SI VES ERROR:**
- Si dice "duplicate key" o "already exists" → **Ignóralo** (significa que ya están insertados)
- Si dice otro error → Toma screenshot y pídeme ayuda

---

## ✅ PASO 2: COPIAR SQL DE PERMISOS (2 minutos)

### 2.1 Abrir el archivo de permisos en Cursor:

**En el panel izquierdo de Cursor:**
1. Busca la carpeta llamada: **`supabase`**
2. Haz clic en ella para expandirla
3. Dentro verás la carpeta: **`migrations`**
4. Haz clic en migrations para expandirla
5. Busca el archivo: **`003_fix_leads_rls_public_insert.sql`**
6. Haz **DOBLE CLIC** en ese archivo

### 2.2 Seleccionar y copiar:

- Presiona **`Ctrl + A`** para seleccionar todo el código
- Presiona **`Ctrl + C`** para copiarlo

### 2.3 Volver a Supabase SQL Editor:

**En la misma pestaña de Supabase que tenías abierta:**
- Haz clic dentro del área de texto (donde está el código del PASO 1)
- Presiona **`Ctrl + A`** para seleccionar todo lo viejo
- Presiona **`Delete`** o **`Backspace`** para borrarlo
- Ahora presiona **`Ctrl + V`** para pegar el nuevo código (RLS policies)

### 2.4 Ejecutar el código de permisos:

- Click en el botón verde **"RUN"**
- Espera el mensaje **"Success"**

**✅ RESULTADO ESPERADO:**
- Mensaje verde: **"Success"**
- Esto significa que ahora los formularios públicos pueden guardar leads

**❌ SI VES ERROR:**
- Si dice "policy already exists" → **Ignóralo** (ya están configurados)
- Si dice otro error → Screenshot y pídeme ayuda

---

## ✅ PASO 3: SUBIR CAMBIOS A INTERNET (2 minutos)

### 3.1 Abrir Terminal en Cursor:

**En el menú superior de Cursor:**
- Click en **"Terminal"** (en la barra de menú)
- Luego click en **"New Terminal"**
- Se abrirá una ventana negra/oscura en la parte de abajo de Cursor

**Alternativa:** Presiona **`` Ctrl + ` ``** (tecla al lado del 1)

### 3.2 Ejecutar comando git push:

**En esa ventana negra que se abrió (Terminal):**

1. Haz clic dentro de la terminal para activarla
2. Copia este comando **EXACTAMENTE** (selecciónalo y Ctrl+C):
   ```bash
   git push
   ```
3. Pega en la terminal (clic derecho → Paste, o Ctrl+V)
4. Presiona **ENTER**

### 3.3 Esperar a que termine:

- Verás texto apareciendo en la terminal
- Puede decir cosas como:
  - "Enumerating objects..."
  - "Counting objects..."
  - "Compressing objects..."
  - "Writing objects..."
- Espera hasta que **pare de escribir** (30 segundos - 1 minuto)

**✅ RESULTADO ESPERADO:**
Al final deberías ver algo como:
```
To https://github.com/sinsajocreators/iter-web.git
   1138e03..a457b1c  main -> main
```

Esto significa: ✅ Cambios subidos exitosamente a GitHub

**❌ SI VES ERROR:**
- Si pide usuario/contraseña → Usa tu token de GitHub
- Si dice "rejected" → Copia TODO el error y envíamelo

---

## ✅ PASO 4: VERIFICAR QUE TODO FUNCIONA (5 minutos)

### 4.1 Esperar a que Vercel despliegue:

**Importante:** Después de hacer `git push`, Vercel necesita tiempo para actualizar tu web.

- Espera **2-3 minutos** antes de verificar
- Vercel detecta automáticamente los cambios en GitHub y redespliega

**Opcional:** Puedes ver el progreso en:
- https://vercel.com/dashboard
- Busca tu proyecto "iter-web"
- Verás un deployment "Building..." que luego dirá "Ready"

### 4.2 Verificar el blog - ¡LO MÁS IMPORTANTE!:

**Abre este enlace en tu navegador:**

👉 **https://iter-web-iota.vercel.app/blog**

**✅ DEBERÍAS VER:**
- Una página con título **"Blog ITER"**
- **17 artículos listados** en una cuadrícula
- Títulos como:
  - "Requisitos Clave de la Norma ISO 50001:2018..."
  - "Indicadores de Desempeño Energético (EnPI)..."
  - "Dimensionamiento de Instalaciones Fotovoltaicas..."
  - etc.
- Cada artículo con imagen, extracto, autor, fecha

**❌ SI TODAVÍA DICE "No articles available" o "Loading...":**
- **Espera 2 minutos más** (Vercel puede tardar)
- **Refresca la página** con F5
- Si después de 5 minutos sigue vacío:
  - Vuelve a Supabase y verifica que el PASO 1 haya dicho "Success"
  - Si no estás seguro, repite el PASO 1

### 4.3 Verificar formulario de contacto:

**Vuelve a la página principal:**

👉 **https://iter-web-iota.vercel.app/**

1. **Baja hasta la sección "Contáctanos"** (scroll down)
2. Llena los campos:
   - Nombre: `Prueba Test`
   - Email: `prueba@test.com`
   - Mensaje: `Probando formulario`
3. Click en **"Enviar Mensaje"** o **"Send Message"**

**✅ DEBERÍAS VER:**
- Mensaje de éxito: "Message sent successfully" o similar
- El formulario se limpia

**❌ SI VES ERROR:**
- Verifica que el PASO 2 haya dicho "Success" en Supabase
- Si no, repite el PASO 2

### 4.4 Verificar páginas legales:

**Abre estos enlaces** (uno por uno):

1. 👉 **https://iter-web-iota.vercel.app/privacidad**
   - Deberías ver: Política de Privacidad completa

2. 👉 **https://iter-web-iota.vercel.app/terminos**
   - Deberías ver: Términos y Condiciones

3. 👉 **https://iter-web-iota.vercel.app/cookies**
   - Deberías ver: Política de Cookies

**✅ TODAS** deberían mostrar contenido (no error 404)

### 4.5 Probar otras funcionalidades (Opcional):

**Chatbot:**
- Busca el botón azul abajo a la derecha (ícono de chat)
- Haz clic en él
- Debería abrirse el chatbot Marcus
- Escribe "Hola" y verifica que responda

**Navegación:**
- Click en "Servicios" en el menú → Debería mostrar los servicios
- Click en "Nosotros" → Debería mostrar la página About
- Click en un artículo del blog → Debería abrir el artículo completo

---

## 🎉 ¡FELICITACIONES! TU WEB ESTÁ 100% COMPLETA

### ✅ Tu sitio web ITER ahora tiene:

**Contenido:**
- ✅ **17 artículos técnicos profesionales** en el blog (ISO 50001, Solar, Instalación, Mantenimiento)
- ✅ **3 páginas de servicios** detalladas
- ✅ **Página About** con información de la empresa
- ✅ **3 páginas legales** (Privacidad, Términos, Cookies)

**Funcionalidades:**
- ✅ **Formulario de contacto** funcionando (guarda leads en Supabase)
- ✅ **Newsletter** subscription
- ✅ **Chatbot IA** con OpenAI
- ✅ **Dashboard administrativo** (/admin/dashboard - con login)
- ✅ **Sistema de autenticación** completo
- ✅ **Responsive design** (móvil, tablet, desktop)
- ✅ **SEO optimizado** (sitemap, robots.txt, meta tags, JSON-LD)

**Créditos:**
- ✅ **Footer con créditos Sinsajo Creators** (https://sinsajocreators.com)

---

## 🆘 SI ALGO SALE MAL:

### ❌ Error en PASO 1 o 2 (Supabase):

**Mensaje de error común:**
- "duplicate key value violates unique constraint"
  - ✅ **Solución:** Ignora este error - significa que ya está insertado

- "permission denied for table"
  - ❌ **Solución:** Verifica que estés usando el proyecto correcto (yemlhpqwtdcofdqtomnl)

- Otro error:
  - 📸 Toma screenshot del error
  - 📧 Compártelo conmigo
  - Te diré exactamente qué hacer

### ❌ Error en PASO 3 (Git push):

**Mensaje de error común:**
- "Permission denied (publickey)"
  - **Solución:** Necesitas configurar SSH o usar HTTPS con token

- "Updates were rejected"
  - **Solución:** Copia el error completo y envíamelo

- Otro error:
  - Copia **TODO** el texto de error de la terminal
  - Pégalo en un mensaje
  - Te daré comandos alternativos

### ❌ Blog sigue vacío después de 5 minutos:

**Checklist de verificación:**
1. ¿El PASO 1 dijo "Success" en Supabase?
   - Si no → Repite el PASO 1
2. ¿Esperaste al menos 3 minutos después del git push?
   - Si no → Espera un poco más
3. ¿Refrescaste la página del blog (F5)?
   - Si no → Refresca
4. ¿Estás viendo la URL correcta? (https://iter-web-iota.vercel.app/blog)
   - Si no → Verifica la URL

**Si nada de eso funciona:**
- Abre Supabase: https://supabase.com/dashboard/project/yemlhpqwtdcofdqtomnl/editor
- Ejecuta esta consulta para verificar:
  ```sql
  SELECT count(*) FROM blog_posts;
  ```
- Debería devolver: `count: 17`
- Si devuelve `0` → Repite el PASO 1

---

## 📊 ESTADÍSTICAS DEL PROYECTO:

**Archivos totales:** 200+ archivos
**Líneas de código:** 15,000+ líneas
**Páginas:** 12 páginas funcionales
**Artículos de blog:** 17 artículos (70,000+ palabras)
**Build size:** 87.3 KB shared JS
**Performance:** Optimizado con Next.js 14

**Tecnologías usadas:**
- Next.js 14 + TypeScript
- React 18 + Framer Motion
- Tailwind CSS
- Supabase (PostgreSQL)
- OpenAI API (chatbot)
- Resend (emails)
- Vercel (hosting)

---

## 📞 SOPORTE:

### ¿Necesitas ayuda?

**Desarrollado por:** Sinsajo Creators
**Web:** https://sinsajocreators.com
**Email:** contacto@sinsajocreators.com

---

## 🎯 PRÓXIMOS PASOS OPCIONALES:

Una vez que todo funcione, puedes:

### 1. Configurar dominio personalizado:
- Compra un dominio (ej: iterenergy.com)
- En Vercel → Settings → Domains
- Agrega el dominio y sigue instrucciones DNS

### 2. Configurar Google Analytics:
- Crea cuenta en Google Analytics
- Obtén tu Measurement ID (G-XXXXXXXXXX)
- Agrégalo en `.env.local`:
  ```
  NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
  ```

### 3. Completar el blog:
- Actualmente tienes 17/24 artículos
- Puedes crear 7 artículos más:
  - 3 de Mantenimiento y O&M
  - 4 de Inversión y Finanzas

### 4. Personalizar contenido:
- Reemplaza imágenes de placeholder
- Ajusta textos a tu marca
- Agrega casos de estudio reales

### 5. Marketing:
- Comparte artículos en LinkedIn
- Configura email marketing
- SEO: envía sitemap a Google Search Console

---

**⏱️ TIEMPO TOTAL ESTIMADO: 10-12 minutos**

**¡Éxito con tu proyecto ITER!** 🚀

---

*Última actualización: 2025-11-23*
*Versión: 1.0*
