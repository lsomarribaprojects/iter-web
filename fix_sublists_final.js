// Script final para arreglar sublistas con formato "  - Texto:**"

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

function fixContent(content) {
  let result = content;

  // Patrón: línea que empieza con 2 espacios, guión, espacio, palabra(s), y termina con **:
  // "  - Producción:** 8.2 GWh" -> "  - **Producción:** 8.2 GWh"

  // Usar un regex más específico con lookahead
  result = result.replace(/(  - )([A-Za-záéíóúñÁÉÍÓÚÑ][A-Za-záéíóúñÁÉÍÓÚÑ\s]*)\*\*: /g, '$1**$2:** ');

  // También arreglar cuando hay más caracteres después del **:
  result = result.replace(/(  - )([A-Za-záéíóúñÁÉÍÓÚÑ][A-Za-záéíóúñÁÉÍÓÚÑ\s]*)\*\*:(\d)/g, '$1**$2:** $3');

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
  console.log('🔧 Arreglando sublistas finales\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    // Detectar patrón específico
    const patternMatch = article.content.match(/  - [A-Z][a-z]+\*\*:/g);
    const issuesBefore = patternMatch ? patternMatch.length : 0;

    const processed = fixContent(article.content);

    const patternMatchAfter = processed.match(/  - [A-Z][a-z]+\*\*:/g);
    const issuesAfter = patternMatchAfter ? patternMatchAfter.length : 0;

    if (processed !== article.content) {
      const success = await updateArticle(article.id, processed);
      if (success) {
        console.log(`✅ [${num}] ${article.title.substring(0, 45)}... (${issuesBefore} → ${issuesAfter})`);
        updated++;
      }
    } else if (issuesBefore > 0) {
      console.log(`⚠️  [${num}] Tiene ${issuesBefore} issues sin arreglar: ${patternMatch[0]}`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n📊 Resumen: ${updated} actualizados`);
}

main().catch(e => console.error('Fatal:', e.message));
