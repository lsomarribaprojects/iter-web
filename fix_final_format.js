// Script final para limpiar problemas de formato restantes
// Arregla listas con ** duplicados y otros problemas menores

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

function cleanFormatting(content) {
  let result = content;

  // 1. Arreglar listas con doble negrita: "- **- texto:**" -> "- **texto:**"
  result = result.replace(/- \*\*- /g, '- **');
  result = result.replace(/- \*\*\* /g, '  - ');

  // 2. Arreglar encabezados mal formateados: "### Total: Us$69" -> formato correcto
  result = result.replace(/### (\*?\s*)(Total|Subtotal|Result)/gi, '\n> **$2');

  // 3. Limpiar líneas que son solo "### * Hvac" etc
  result = result.replace(/### \* ([A-Za-z]+)/g, '  - $1');

  // 4. Convertir sublistas con * a - con indentación
  result = result.replace(/^(\s*)- \*\*/gm, '$1- **');

  // 5. Arreglar formato de porcentajes con paréntesis
  result = result.replace(/\((\d+\.?\d*)%\)/g, '($1%)');

  // 6. Limpiar múltiples líneas vacías
  result = result.replace(/\n{4,}/g, '\n\n\n');

  // 7. Arreglar formato de valores monetarios
  result = result.replace(/US\$(\d+)\/kWh/g, 'US$$1/MWh');
  result = result.replace(/US\$(\d+)\/año/g, 'US$$1/year');

  // 8. Arreglar sublistas que empiezan con "- Por" o similar
  result = result.replace(/^- Por cada/gm, '  - Por cada');
  result = result.replace(/^- Máquinas/gm, '  - Máquinas');
  result = result.replace(/^- Compresores/gm, '  - Compresores');
  result = result.replace(/^- Chillers/gm, '  - Chillers');
  result = result.replace(/^- Caldera/gm, '  - Caldera');
  result = result.replace(/^- Iluminación$/gm, '  - Iluminación');
  result = result.replace(/^- Oficinas$/gm, '  - Oficinas');
  result = result.replace(/^- Almacén$/gm, '  - Almacén');

  // 9. Arreglar encabezados con formato extraño
  result = result.replace(/\*\*Consumo Anual:\*\*\n\n/g, '\n**Consumo Anual:**\n');
  result = result.replace(/\*\*Costo Energético:\*\*\n\n/g, '\n**Costo Energético:**\n');
  result = result.replace(/\*\*Indicadores:\*\*\n\n/g, '\n**Indicadores:**\n');

  // 10. Convertir secciones con datos numéricos a blockquotes destacados
  result = result.replace(/- \*\*CONSUMO TOTAL:\*\* (.+)/g, '\n> 📊 **Consumo Total:** $1\n');
  result = result.replace(/- \*\*TOTAL:\*\* (.+)/g, '\n> 💰 **Total:** $1\n');

  // 11. Limpiar líneas vacías innecesarias antes de listas
  result = result.replace(/\n\n\n(- \*\*)/g, '\n\n$1');

  // 12. Arreglar encoding de caracteres especiales
  result = result.replace(/â€"/g, '—');
  result = result.replace(/â€™/g, "'");
  result = result.replace(/â€œ/g, '"');
  result = result.replace(/â€/g, '"');

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
  console.log('🔧 Limpieza Final de Formato\n');
  console.log('='.repeat(50) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    try {
      // Detectar problemas antes
      const issuesBefore = (article.content.match(/- \*\*- /g) || []).length +
                           (article.content.match(/### \*/g) || []).length;

      // Limpiar
      const processed = cleanFormatting(article.content);

      // Detectar problemas después
      const issuesAfter = (processed.match(/- \*\*- /g) || []).length +
                          (processed.match(/### \*/g) || []).length;

      // Solo actualizar si hubo cambios
      if (processed !== article.content) {
        const success = await updateArticle(article.id, processed);

        if (success) {
          console.log(`✅ [${num}/${articles.length}] ${article.title.substring(0, 50)}... (issues: ${issuesBefore} → ${issuesAfter})`);
          updated++;
        } else {
          console.log(`❌ [${num}/${articles.length}] Error: ${article.title.substring(0, 45)}...`);
          errors++;
        }
      } else {
        console.log(`⏭️  [${num}/${articles.length}] Sin cambios: ${article.title.substring(0, 45)}...`);
      }
    } catch (e) {
      console.log(`❌ [${num}/${articles.length}] Exception: ${e.message}`);
      errors++;
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Resumen: ${updated} actualizados, ${errors} errores`);
}

main().catch(e => console.error('Fatal:', e.message));
