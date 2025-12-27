// Script para arreglar sublistas y negritas sin cerrar

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

function fixContent(content) {
  let result = content;

  // 1. Arreglar sublistas: "  - texto:**" -> "  - **texto:**" (con indentación correcta)
  result = result.replace(/^  - ([A-Za-záéíóúñÁÉÍÓÚÑ\s]+)\*\*:/gm, '  - **$1:**');

  // 2. Arreglar listas sin ** inicial: "- Texto:**" -> "- **Texto:**"
  result = result.replace(/^- ([A-Za-záéíóúñÁÉÍÓÚÑ\s]{3,})\*\*:/gm, '- **$1:**');

  // 3. Arreglar blockquotes sin cerrar: "> **Total: Us$69" -> "> 💰 **Total:** US$69"
  result = result.replace(/> \*\*Total: (Us?\$\d+)/gi, '> 💰 **Total:** $1');

  // 4. Limpiar sublistas que deberían ser items principales
  // Si una línea empieza con 2 espacios + - pero no hay una lista antes, quitar indentación
  const lines = result.split('\n');
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Si es sublista pero la línea anterior no es lista, convertir a lista principal
    if (line.match(/^  - /)) {
      const prevLine = i > 0 ? lines[i - 1] : '';
      if (!prevLine.match(/^- /) && !prevLine.match(/^  - /)) {
        line = line.replace(/^  - /, '- ');
      }
    }

    newLines.push(line);
  }
  result = newLines.join('\n');

  // 5. Convertir sublistas que son realmente continuación a formato consistente
  // "  - Producción:**" debería ser "  - **Producción:**"
  result = result.replace(/^(  - )([A-Za-záéíóúñÁÉÍÓÚÑ\s]+)\*\*:/gm, '$1**$2:**');

  // 6. Arreglar formato de sublistas sin negrita inicial
  result = result.replace(/^  - ([A-Z][a-záéíóúñ]+)\*\*:/gm, '  - **$1:**');

  // 7. Limpiar múltiples líneas vacías consecutivas
  result = result.replace(/\n{4,}/g, '\n\n');

  // 8. Arreglar blockquotes incompletos
  result = result.replace(/> \*\*([^*]+)$/gm, '> **$1**');

  return result;
}

async function getArticles() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,content&published=eq.true&order=published_at.desc`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });
  return await response.json();
}

async function updateArticle(id, content) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ content })
  });
  return response.ok;
}

async function main() {
  console.log('🔧 Arreglando Sublistas y Negritas\n');
  console.log('='.repeat(50) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    try {
      const processed = fixContent(article.content);

      if (processed !== article.content) {
        const success = await updateArticle(article.id, processed);

        if (success) {
          console.log(`✅ [${num}/${articles.length}] ${article.title.substring(0, 50)}...`);
          updated++;
        } else {
          console.log(`❌ [${num}/${articles.length}] Error: ${article.title.substring(0, 45)}...`);
        }
      } else {
        console.log(`⏭️  [${num}/${articles.length}] Sin cambios: ${article.title.substring(0, 40)}...`);
        skipped++;
      }
    } catch (e) {
      console.log(`❌ [${num}/${articles.length}] Exception: ${e.message}`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Resumen: ${updated} actualizados, ${skipped} sin cambios`);
}

main().catch(e => console.error('Fatal:', e.message));
