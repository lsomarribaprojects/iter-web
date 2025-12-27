// Script simplificado para corregir artículos - versión 2
// Procesa artículos uno por uno con manejo robusto de errores

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

const EUR_TO_USD = 1.10;

const CONTACT_INFO = {
  phone: '+1 (609) 222 0687',
  email: 'engineering@iterge.com'
};

// Normativas europeas a americanas
const REPLACEMENTS = [
  ['REBT', 'NEC (National Electrical Code)'],
  ['UNE-EN', 'ANSI/IEEE'],
  ['UNE ', 'ANSI '],
  ['EMAS', 'EPA Environmental Management'],
  ['Directiva 2012/27/UE', 'EISA 2007'],
  ['Directiva 2014/24/UE', 'FAR'],
  ['Directiva 2010/31/UE', 'ASHRAE 90.1'],
  ['Real Decreto', 'Federal Regulation'],
  ['España', 'the United States'],
  ['española', 'American'],
  ['español', 'American'],
  ['en España', 'in the US'],
  ['de España', 'in the US'],
  ['IDAE', 'DOE'],
  ['CNMC', 'FERC'],
  ['Red Eléctrica de España', 'regional grid operator'],
  ['REE', 'grid operator'],
  ['PVPC', 'utility rate'],
  ['OMIE', 'ISO/RTO market'],
  ['€/kWp', 'US$/kWp'],
  ['€/kW', 'US$/kW'],
  ['€/MWh', 'US$/MWh'],
  ['€/año', 'US$/year'],
  ['€/mes', 'US$/month'],
  ['€/m2', 'US$/sqft'],
  ['€/m²', 'US$/sqft'],
];

function convertContent(content) {
  let result = content;

  // Convertir euros a dólares
  // Formato: €X,XXX.XX o €X.XXX,XX
  result = result.replace(/€\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?)/g, (match, amount) => {
    try {
      // Determinar formato (europeo vs americano)
      let cleanAmount = amount;
      if (amount.includes(',') && amount.includes('.')) {
        // Formato europeo: 1.234,56
        if (amount.lastIndexOf(',') > amount.lastIndexOf('.')) {
          cleanAmount = amount.replace(/\./g, '').replace(',', '.');
        } else {
          // Formato americano: 1,234.56
          cleanAmount = amount.replace(/,/g, '');
        }
      } else if (amount.includes(',')) {
        // Solo comas - puede ser separador de miles o decimales
        if (amount.indexOf(',') === amount.length - 3) {
          // Probablemente decimal europeo
          cleanAmount = amount.replace(',', '.');
        } else {
          // Separador de miles
          cleanAmount = amount.replace(/,/g, '');
        }
      } else if (amount.includes('.')) {
        // Solo puntos
        if (amount.indexOf('.') === amount.length - 3 && amount.length > 6) {
          // Separador de miles europeo
          cleanAmount = amount.replace(/\./g, '');
        }
      }

      const numValue = parseFloat(cleanAmount);
      if (isNaN(numValue)) return match;

      const usdValue = Math.round(numValue * EUR_TO_USD);
      return 'US$' + usdValue.toLocaleString('en-US');
    } catch (e) {
      return match;
    }
  });

  // Convertir formato X€
  result = result.replace(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?)\s*€/g, (match, amount) => {
    try {
      let cleanAmount = amount.replace(/\./g, '').replace(',', '.');
      const numValue = parseFloat(cleanAmount);
      if (isNaN(numValue)) return match;
      const usdValue = Math.round(numValue * EUR_TO_USD);
      return 'US$' + usdValue.toLocaleString('en-US');
    } catch (e) {
      return match;
    }
  });

  // Reemplazar cualquier € restante
  result = result.replace(/€/g, 'US$');

  // Aplicar reemplazos de normativas
  for (const [from, to] of REPLACEMENTS) {
    const regex = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    result = result.replace(regex, to);
  }

  return result;
}

function addCTA(content, category) {
  // Remover CTAs existentes
  let result = content
    .replace(/\n---\s*\n\s*##\s*¿[^\n]+[\s\S]*$/, '')
    .replace(/\n---\s*\n\s*##\s*🚀[^\n]+[\s\S]*$/, '')
    .replace(/\n---\s*\n\s*##\s*CTA[^\n]*[\s\S]*$/, '')
    .trim();

  const cta = `

---

## 🚀 Ready to Get Started?

**ITER Energy Solutions** - Your trusted partner for ${category === 'Consultoria Solar' ? 'solar engineering' : category === 'Gestion Energetica' ? 'energy management' : category === 'Formacion' ? 'professional training' : 'renewable energy'} solutions.

📞 **Call us:** ${CONTACT_INFO.phone}
📧 **Email:** ${CONTACT_INFO.email}

[**Request a Free Consultation →**](/contacto)
`;

  return result + cta;
}

async function getArticles() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,category,content&published=eq.true&order=published_at.desc`, {
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
  console.log('🔧 Corrección de Artículos v2\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    try {
      // Contar euros antes
      const eurosBefore = (article.content.match(/€/g) || []).length;

      // Procesar
      let processed = convertContent(article.content);
      processed = addCTA(processed, article.category);

      // Contar euros después
      const eurosAfter = (processed.match(/€/g) || []).length;

      // Actualizar
      const success = await updateArticle(article.id, processed);

      if (success) {
        console.log(`✅ [${num}/${articles.length}] ${article.title.substring(0, 45)}... (€${eurosBefore}→${eurosAfter})`);
        updated++;
      } else {
        console.log(`❌ [${num}/${articles.length}] Error: ${article.title.substring(0, 40)}...`);
        errors++;
      }
    } catch (e) {
      console.log(`❌ [${num}/${articles.length}] Exception: ${e.message}`);
      errors++;
    }

    // Pequeña pausa para no saturar la API
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n📊 Resumen: ${updated} actualizados, ${errors} errores`);
}

main().catch(e => console.error('Fatal:', e.message));
