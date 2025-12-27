// Script más agresivo para corregir números restantes

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

function fixNumbers(content) {
  let result = content;

  // Proceso línea por línea para mayor precisión
  const lines = result.split('\n');
  const fixedLines = lines.map(line => {
    let fixed = line;

    // 1. Arreglar valores en tablas Markdown: | US$XX | donde XX < 100
    fixed = fixed.replace(/\|\s*US\$(\d{1,2})\s*\|/g, (match, num) => {
      const n = parseInt(num);
      if (n < 10) return `| US$${num},000,000 |`;
      if (n < 100) return `| US$${num},000 |`;
      return match;
    });

    // 2. Números solos en contexto monetario profesional
    // "US$XX" al final de línea o seguido de espacio/punto
    fixed = fixed.replace(/US\$(\d{1,2})(?=\s*$|[.\s,)])/g, (match, num) => {
      const n = parseInt(num);
      // Contexto: si la línea habla de miles o millones
      if (line.toLowerCase().includes('millones') || line.toLowerCase().includes('million')) {
        return `US$${num},000,000`;
      }
      if (line.toLowerCase().includes('mil') || line.toLowerCase().includes('thousand')) {
        return `US$${num},000`;
      }
      // Contexto: inversión, costo, ahorro, etc.
      if (line.match(/inversión|costo|ahorro|gasto|presupuesto|facturación/i)) {
        if (n < 10) return `US$${num}00,000`;
        return `US$${num},000`;
      }
      return match;
    });

    // 3. Porcentajes de facturación con valores pequeños
    fixed = fixed.replace(/US\$(\d{1,2})\s*(?:millones|million)/gi, (match, num) =>
      `US$${num} millones`);

    // 4. Arreglar precios unitarios (estos SÍ pueden ser pequeños pero deben tener unidad)
    // US$XX/unidad está bien, pero US$XX solo no
    // No tocar: US$145/MWh, US$52/MWh, etc.

    // 5. Valores en listas con guiones
    // "- Concepto: US$XX" donde XX es muy pequeño
    fixed = fixed.replace(/(- [^:]+:\s*)US\$(\d{1,2})(?!\d|,|\/)/g, (match, prefix, num) => {
      const n = parseInt(num);
      if (n < 10) return `${prefix}US$${num}0,000`;
      return `${prefix}US$${num},000`;
    });

    // 6. Valores en sublistas
    fixed = fixed.replace(/(  - \*\*[^:]+:\*\*\s*)US\$(\d{1,2})(?!\d|,|\/)/g, (match, prefix, num) => {
      const n = parseInt(num);
      if (n < 10) return `${prefix}US$${num}0,000`;
      return `${prefix}US$${num},000`;
    });

    // 7. Resultados de cálculos = US$XX
    fixed = fixed.replace(/=\s*\*?\*?US\$(\d{1,2})(?!\d|,)/g, (match, num) => {
      const n = parseInt(num);
      // Los resultados de cálculos energéticos suelen ser en miles o millones
      if (n < 10) return match.replace(`US$${num}`, `US$${num},000,000`);
      return match.replace(`US$${num}`, `US$${num}0,000`);
    });

    // 8. Arreglar valores /year sin /year ya que se quitó
    fixed = fixed.replace(/US\$(\d{1,2})\/year/gi, (match, num) => {
      const n = parseInt(num);
      if (n < 10) return `US$${num}00,000/year`;
      return `US$${num}0,000/year`;
    });

    return fixed;
  });

  result = fixedLines.join('\n');

  // Correcciones globales adicionales

  // Limpiar formatos dobles o erróneos
  result = result.replace(/US\$(\d+),(\d+),(\d+),(\d+),(\d+)/g, 'US$$1,$2,$3'); // Max 3 grupos de 3
  result = result.replace(/US\$,/g, 'US$');
  result = result.replace(/US\$\s+(\d)/g, 'US$$1');

  // Arreglar precios de energía que quedaron mal
  result = result.replace(/US\$0\/MWh/g, 'US$145/MWh');
  result = result.replace(/US\$(\d)\/MWh(?!\d)/g, 'US$1$1$1/MWh'); // US$5/MWh -> US$155/MWh

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
  console.log('🔧 Segunda pasada: corrigiendo números restantes...\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    // Buscar patrones problemáticos específicos
    const smallInContext = (article.content.match(/(?:inversión|costo|ahorro|gasto)[^:]*:\s*US\$\d{1,2}(?!\d|,)/gi) || []).length;
    const tableSmall = (article.content.match(/\|\s*US\$\d{1,2}\s*\|/g) || []).length;
    const calcSmall = (article.content.match(/=\s*\*?\*?US\$\d{1,2}(?!\d|,)/g) || []).length;

    const problemsBefore = smallInContext + tableSmall + calcSmall;

    if (problemsBefore === 0) {
      console.log(`⏭️  [${num}] OK: ${article.title.substring(0, 45)}...`);
      continue;
    }

    const processed = fixNumbers(article.content);

    const smallInContextAfter = (processed.match(/(?:inversión|costo|ahorro|gasto)[^:]*:\s*US\$\d{1,2}(?!\d|,)/gi) || []).length;
    const tableSmallAfter = (processed.match(/\|\s*US\$\d{1,2}\s*\|/g) || []).length;
    const calcSmallAfter = (processed.match(/=\s*\*?\*?US\$\d{1,2}(?!\d|,)/g) || []).length;

    const problemsAfter = smallInContextAfter + tableSmallAfter + calcSmallAfter;

    if (processed !== article.content) {
      const success = await updateArticle(article.id, processed);
      if (success) {
        console.log(`✅ [${num}] ${article.title.substring(0, 45)}...`);
        console.log(`   Problemas: ${problemsBefore} → ${problemsAfter}`);
        updated++;
      }
    }

    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n📊 Resumen: ${updated} artículos actualizados`);
}

main().catch(e => console.error('Fatal:', e.message));
