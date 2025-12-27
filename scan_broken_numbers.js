// Script para escanear todos los artículos buscando números rotos

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

async function getArticles() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,content&published=eq.true&order=published_at.desc`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });
  return await response.json();
}

async function main() {
  console.log('🔍 Escaneando artículos buscando números sospechosos...\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  // Patrones sospechosos de números rotos
  const suspiciousPatterns = [
    // Números muy pequeños que deberían ser grandes (contexto monetario)
    /US\$\d{1,2}(?![,.\d])/g,  // US$1 a US$99 sin decimales/comas después
    /\bUS\$\d{1,2}\s*(\/|por|year|año|mes|month)/gi,  // US$X/year, etc
    /\bUS\$\d{1,2}\s*mil?l?ones?\b/gi,  // US$X millones (debería ser más)
    /= US\$\d{1,2}(?!\d)/g,  // = US$X (resultado de cálculo muy pequeño)
    /Total:?\s*US\$\d{1,2}(?!\d)/gi,  // Total: US$X
  ];

  const articlesWithIssues = [];

  for (const article of articles) {
    const issues = [];

    for (const pattern of suspiciousPatterns) {
      const matches = article.content.match(pattern);
      if (matches) {
        issues.push(...matches);
      }
    }

    // También buscar contextos específicos sospechosos
    const lines = article.content.split('\n');
    for (const line of lines) {
      // Líneas con cálculos que dan resultados muy pequeños
      if (line.includes('×') && line.includes('=') && line.includes('US$')) {
        const resultMatch = line.match(/=\s*\*?\*?US\$(\d+)/);
        if (resultMatch && parseInt(resultMatch[1]) < 1000) {
          issues.push(`Cálculo sospechoso: ${line.substring(0, 80)}...`);
        }
      }

      // Inversiones/costos muy pequeños en contexto profesional
      if ((line.toLowerCase().includes('inversión') ||
           line.toLowerCase().includes('costo') ||
           line.toLowerCase().includes('ahorro')) &&
          line.match(/US\$\d{1,3}(?!\d)/)) {
        issues.push(`Valor sospechoso: ${line.substring(0, 80)}...`);
      }
    }

    if (issues.length > 0) {
      articlesWithIssues.push({
        title: article.title,
        slug: article.slug,
        issues: [...new Set(issues)].slice(0, 5) // Primeros 5 únicos
      });
    }
  }

  console.log('=' .repeat(60));
  console.log(`\n📊 Artículos con posibles números rotos: ${articlesWithIssues.length}\n`);

  for (const article of articlesWithIssues) {
    console.log(`\n❌ ${article.title}`);
    console.log(`   Slug: ${article.slug}`);
    console.log('   Problemas detectados:');
    article.issues.forEach(issue => {
      console.log(`   - ${issue}`);
    });
  }

  if (articlesWithIssues.length === 0) {
    console.log('✅ No se encontraron números sospechosos');
  }

  return articlesWithIssues;
}

main().catch(e => console.error('Fatal:', e.message));
