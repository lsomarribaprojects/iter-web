# 🚀 Guía de Deploy a Vercel - ITER

## Paso 1: Crear cuenta en Vercel

1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Regístrate con tu cuenta de GitHub (recomendado), GitLab, o Bitbucket
4. Si no tienes cuenta de GitHub, créala primero en https://github.com

## Paso 2: Variables de Entorno Requeridas

Cuando hagas el deploy, deberás agregar estas variables de entorno en Vercel:

### ⚠️ CRÍTICO - Requerido para el chatbot
```
OPENAI_API_KEY=tu_api_key_aqui
```

### Opcional - Supabase (si lo usas)
```
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### Opcional - Email notifications
```
RESEND_API_KEY=tu_resend_api_key
SALES_TEAM_EMAIL=ventas@iter-energy.com
```

## Paso 3: Deploy desde Git

### Opción A: Deploy con Vercel CLI (Recomendado)

1. Instalar Vercel CLI globalmente:
   ```bash
   npm install -g vercel
   ```

2. Hacer login:
   ```bash
   vercel login
   ```

3. Deploy desde la carpeta del proyecto:
   ```bash
   vercel
   ```

4. Sigue las instrucciones:
   - Set up and deploy? **Yes**
   - Which scope? Selecciona tu cuenta
   - Link to existing project? **No**
   - Project name? **iter-web** (o el nombre que prefieras)
   - Directory? **./** (presiona Enter)
   - Override settings? **No**

5. Para agregar variables de entorno:
   ```bash
   vercel env add OPENAI_API_KEY
   ```
   Luego pega tu API key cuando te lo pida

6. Deploy a producción:
   ```bash
   vercel --prod
   ```

### Opción B: Deploy desde GitHub (Más fácil para principiantes)

1. **Crear repositorio en GitHub:**
   - Ve a https://github.com/new
   - Nombre: `iter-web` (o el que prefieras)
   - Privado o Público (tu eliges)
   - NO inicialices con README
   - Clic en "Create repository"

2. **Conectar tu proyecto local con GitHub:**
   ```bash
   cd "/mnt/c/Users/Bimma/Apps/Web ITER"
   git init
   git add .
   git commit -m "Initial commit - ITER Web App"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/iter-web.git
   git push -u origin main
   ```

3. **Deploy desde Vercel:**
   - Ve a https://vercel.com/new
   - Clic en "Import Git Repository"
   - Selecciona tu repositorio `iter-web`
   - Clic en "Import"

4. **Configurar variables de entorno:**
   - En la página de configuración, busca "Environment Variables"
   - Agrega cada variable:
     - Name: `OPENAI_API_KEY`
     - Value: (pega tu API key)
     - Environment: Production, Preview, Development (selecciona todos)
   - Clic en "Add" para cada variable

5. **Deploy:**
   - Clic en "Deploy"
   - Espera 1-2 minutos
   - ¡Tu app estará en línea!

## Paso 4: Post-Deploy

1. **Verifica que todo funcione:**
   - Prueba el chatbot
   - Verifica que el cambio de idioma funcione
   - Prueba el formulario de contacto

2. **Dominio personalizado (Opcional):**
   - En tu proyecto en Vercel, ve a "Settings" > "Domains"
   - Agrega tu dominio personalizado (ej: iter-energy.com)
   - Sigue las instrucciones para configurar DNS

3. **Actualizaciones futuras:**
   - Si usaste GitHub: Solo haz `git push` y Vercel actualizará automáticamente
   - Si usaste CLI: Ejecuta `vercel --prod` desde tu carpeta

## 🔒 Seguridad

- ✅ Tu API key está segura (no se expondrá en el código)
- ✅ Variables de entorno están encriptadas en Vercel
- ✅ HTTPS automático
- ✅ .gitignore configurado correctamente

## 💰 Costos

- Vercel Free Tier incluye:
  - 100 GB bandwidth/mes
  - Unlimited deployments
  - Serverless Functions
  - Automatic HTTPS
  - **Suficiente para empezar**

## 📞 Soporte

Si tienes problemas:
1. Vercel Docs: https://vercel.com/docs
2. Next.js Deploy Guide: https://nextjs.org/docs/deployment

---

**¡Tu aplicación estará lista en minutos!** 🎉
