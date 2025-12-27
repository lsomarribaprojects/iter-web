// Verificar el contenido del artículo ISO 50001

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

async function main() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.casos-exito-iso-50001-implementaciones-reales&select=title,content`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });

  const articles = await response.json();
  if (articles.length === 0) {
    console.log('Artículo no encontrado');
    return;
  }

  const article = articles[0];
  console.log(`📄 ${article.title}\n`);
  console.log('='.repeat(60));
  console.log('\n');

  // Mostrar las primeras 150 líneas para revisar los números
  const lines = article.content.split('\n').slice(0, 150);
  lines.forEach((line, i) => {
    // Resaltar líneas con valores monetarios
    if (line.includes('US$') || line.includes('€')) {
      console.log(`>>> ${i + 1}: ${line}`);
    } else {
      console.log(`    ${i + 1}: ${line}`);
    }
  });
}

main().catch(e => console.error('Fatal:', e.message));
