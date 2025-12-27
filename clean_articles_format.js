// Script para limpiar y mejorar el formato de todos los artículos
// Elimina bloques de código innecesarios, convierte a tablas Markdown reales
// y limpia el formato para renderizado profesional

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

// Imágenes de Unsplash por categoría para insertar en artículos
const IMAGES_BY_TOPIC = {
  solar: [
    'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=400&fit=crop',
  ],
  energy: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
  ],
  training: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
  ],
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=800&h=400&fit=crop',
  ]
};

function cleanContent(content) {
  let result = content;

  // 1. Convertir bloques de código con datos tabulares a formato limpio
  // Detectar bloques de código que son realmente tablas de datos
  result = result.replace(/```\n?([\s\S]*?)```/g, (match, codeContent) => {
    // Si contiene patrones de datos tabulares, convertir a formato legible
    const lines = codeContent.trim().split('\n');

    // Detectar si es una tabla de datos (tiene : para separar key:value)
    const isDataBlock = lines.some(line =>
      line.includes(':') && !line.includes('http') && !line.includes('//') && line.length < 100
    );

    // Detectar si es código real (lenguaje de programación)
    const isRealCode = codeContent.includes('function ') ||
                       codeContent.includes('const ') ||
                       codeContent.includes('import ') ||
                       codeContent.includes('export ') ||
                       codeContent.includes('class ') ||
                       codeContent.includes('def ') ||
                       codeContent.includes('return ') ||
                       codeContent.includes('SELECT ') ||
                       codeContent.includes('FROM ');

    if (isRealCode) {
      // Mantener como bloque de código
      return match;
    }

    if (isDataBlock) {
      // Convertir a formato de lista con viñetas
      const formatted = lines.map(line => {
        line = line.trim();
        if (!line) return '';

        // Si es un título/encabezado (todo mayúsculas o termina en :)
        if (line === line.toUpperCase() && line.length > 3 && !line.includes(':')) {
          return `\n**${line}**\n`;
        }

        // Si tiene formato key: value
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(':');
          const value = valueParts.join(':').trim();
          if (key && value) {
            return `- **${key.trim()}:** ${value}`;
          }
        }

        // Si empieza con - o * ya es lista
        if (line.startsWith('-') || line.startsWith('*') || line.startsWith('•')) {
          return line;
        }

        // Si tiene = es una ecuación/fórmula
        if (line.includes(' = ')) {
          return `> ${line}`;
        }

        return line;
      }).filter(line => line).join('\n');

      return '\n' + formatted + '\n';
    }

    // Si tiene formato de tabla ASCII, convertir a Markdown table
    if (codeContent.includes('|') && codeContent.includes('-')) {
      return match; // Mantener tablas ASCII por ahora
    }

    // Mantener el bloque de código para otros casos
    return match;
  });

  // 2. Limpiar múltiples líneas vacías
  result = result.replace(/\n{4,}/g, '\n\n\n');

  // 3. Mejorar formato de secciones de datos
  // Convertir patrones tipo "TÍTULO:" a encabezados
  result = result.replace(/^([A-ZÁÉÍÓÚÑ\s]{5,}):$/gm, '\n### $1\n');

  // 4. Limpiar caracteres especiales problemáticos
  result = result.replace(/✓/g, '✅');
  result = result.replace(/✗/g, '❌');
  result = result.replace(/→/g, '➔');
  result = result.replace(/←/g, '⬅');
  result = result.replace(/•/g, '-');

  // 5. Mejorar formato de listas con flechas
  result = result.replace(/^(\d+)\.\s*/gm, '$1. ');

  // 6. Limpiar espacios antes de puntuación
  result = result.replace(/\s+([,.:;!?])/g, '$1');

  // 7. Convertir bloques de métricas a formato blockquote destacado
  result = result.replace(/(RESULTADO|AHORRO|INVERSIÓN|ROI|BENEFICIO)S?:?\s*([^\n]+)/gi,
    '\n> **$1:** $2\n');

  return result.trim();
}

function convertDataBlocksToTables(content) {
  let result = content;

  // Buscar patrones de datos estructurados y convertir a tablas Markdown
  // Patrón: líneas con "nombre: valor" consecutivas
  const dataBlockPattern = /(?:^|\n)([A-Za-záéíóúñÁÉÍÓÚÑ\s]+:\s*.+\n){3,}/g;

  result = result.replace(dataBlockPattern, (match) => {
    const lines = match.trim().split('\n').filter(l => l.trim());

    if (lines.length >= 3 && lines.length <= 15) {
      // Crear tabla Markdown
      let table = '\n| Concepto | Valor |\n|----------|-------|\n';

      lines.forEach(line => {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        if (key && value) {
          table += `| ${key.trim()} | ${value} |\n`;
        }
      });

      return table + '\n';
    }

    return match;
  });

  return result;
}

function addSectionImages(content, category) {
  // Agregar imágenes entre secciones principales
  let result = content;
  let imageIndex = 0;

  const images = category === 'Consultoria Solar' ? IMAGES_BY_TOPIC.solar :
                 category === 'Gestion Energetica' ? IMAGES_BY_TOPIC.energy :
                 category === 'Formacion' ? IMAGES_BY_TOPIC.training :
                 IMAGES_BY_TOPIC.technology;

  // Agregar imagen después del primer h2 (después de la introducción)
  const h2Pattern = /^## ([^\n]+)\n/gm;
  let h2Count = 0;

  result = result.replace(h2Pattern, (match, title) => {
    h2Count++;

    // Agregar imagen después del 2do, 4to y 6to h2
    if (h2Count === 2 || h2Count === 4 || h2Count === 6) {
      const img = images[imageIndex % images.length];
      imageIndex++;
      return match + `\n![${title}](${img})\n\n`;
    }

    return match;
  });

  return result;
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
  console.log('🧹 Limpieza de Formato de Artículos\n');
  console.log('=' .repeat(60) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    try {
      console.log(`\n[${num}/${articles.length}] ${article.title.substring(0, 50)}...`);

      // Contar bloques de código antes
      const codeBlocksBefore = (article.content.match(/```/g) || []).length / 2;

      // Paso 1: Limpiar contenido
      let processed = cleanContent(article.content);

      // Paso 2: Convertir bloques de datos a tablas
      processed = convertDataBlocksToTables(processed);

      // Paso 3: Agregar imágenes entre secciones
      processed = addSectionImages(processed, article.category);

      // Contar bloques de código después
      const codeBlocksAfter = (processed.match(/```/g) || []).length / 2;

      // Actualizar
      const success = await updateArticle(article.id, processed);

      if (success) {
        console.log(`   ✅ Bloques código: ${codeBlocksBefore} → ${codeBlocksAfter}`);
        console.log(`   ✅ Imágenes agregadas entre secciones`);
        updated++;
      } else {
        console.log(`   ❌ Error al actualizar`);
        errors++;
      }
    } catch (e) {
      console.log(`   ❌ Exception: ${e.message}`);
      errors++;
    }

    // Pausa para no saturar API
    await new Promise(r => setTimeout(r, 150));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Resumen:`);
  console.log(`   ✅ Actualizados: ${updated}`);
  console.log(`   ❌ Errores: ${errors}`);
}

main().catch(e => console.error('Fatal:', e.message));
