// Script final para arreglar todas las sublistas con formato incorrecto

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

function fixContent(content) {
  let lines = content.split('\n');
  let result = [];
  let inSublist = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Detectar si estamos en una sublista (línea que empieza con 2 espacios y -)
    if (line.match(/^  - /)) {
      inSublist = true;

      // Patrón: "  - Texto:**" -> "  - **Texto:**"
      if (line.match(/^  - ([A-Za-záéíóúñÁÉÍÓÚÑ\s]+)\*\*:/)) {
        line = line.replace(/^  - ([A-Za-záéíóúñÁÉÍÓÚÑ\s]+)\*\*:/, '  - **$1:**');
      }

      // Patrón: "  - texto" sin negrita, convertir a negrita si parece un key
      if (line.match(/^  - ([A-Z][a-záéíóúñ\s]+):/) && !line.includes('**')) {
        line = line.replace(/^  - ([A-Z][a-záéíóúñ\s]+):/, '  - **$1:**');
      }
    } else if (line.match(/^- /)) {
      // Es una lista principal, no sublista
      inSublist = true;
    } else if (line.trim() === '') {
      // Línea vacía puede terminar una lista
      if (lines[i + 1] && !lines[i + 1].match(/^  ?- /)) {
        inSublist = false;
      }
    }

    result.push(line);
  }

  let finalContent = result.join('\n');

  // Arreglar patrones específicos que quedaron
  // Patrón: "  - Producción:**" -> "  - **Producción:**"
  finalContent = finalContent.replace(/^(  - )([A-Za-záéíóúñÁÉÍÓÚÑ][a-záéíóúñ\s]*)\*\*:/gm, '$1**$2:**');

  // Patrón: sublistas sin negrita que deberían tenerla
  finalContent = finalContent.replace(/^  - ([A-Z][a-záéíóúñ\s]+): /gm, '  - **$1:** ');

  // Limpiar negritas dobles
  finalContent = finalContent.replace(/\*\*\*\*/g, '**');

  // Limpiar múltiples líneas vacías
  finalContent = finalContent.replace(/\n{3,}/g, '\n\n');

  return finalContent;
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
  console.log('🔧 Arreglando TODAS las Sublistas\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    // Contar problemas antes
    const issuesBefore = (article.content.match(/  - [A-Z][a-z]+\*\*:/g) || []).length;

    const processed = fixContent(article.content);

    // Contar problemas después
    const issuesAfter = (processed.match(/  - [A-Z][a-z]+\*\*:/g) || []).length;

    if (processed !== article.content) {
      const success = await updateArticle(article.id, processed);
      if (success) {
        console.log(`✅ [${num}] ${article.title.substring(0, 50)}... (${issuesBefore} → ${issuesAfter})`);
        updated++;
      }
    } else {
      console.log(`⏭️  [${num}] Sin cambios`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n📊 Resumen: ${updated} actualizados`);
}

main().catch(e => console.error('Fatal:', e.message));
