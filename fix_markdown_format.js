// Script para reformatear completamente los artículos del blog
// Convierte bloques de código con datos a listas y tablas legibles
// Mantiene solo código real en bloques de código

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

// Imágenes de Unsplash organizadas por tema
const SECTION_IMAGES = {
  solar: [
    { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&h=500&fit=crop', alt: 'Solar panels in a field at sunset' },
    { url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&h=500&fit=crop', alt: 'Residential solar installation' },
    { url: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=900&h=500&fit=crop', alt: 'Large scale solar power plant' },
    { url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=900&h=500&fit=crop', alt: 'Solar technician at work' },
  ],
  energy: [
    { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=500&fit=crop', alt: 'Energy analytics dashboard' },
    { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=500&fit=crop', alt: 'Data analysis and monitoring' },
    { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&h=500&fit=crop', alt: 'Business meeting and planning' },
    { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&h=500&fit=crop', alt: 'Industrial manufacturing facility' },
  ],
  training: [
    { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&h=500&fit=crop', alt: 'Professional training session' },
    { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=500&fit=crop', alt: 'Team workshop and collaboration' },
  ],
  renewable: [
    { url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&h=500&fit=crop', alt: 'Wind turbines at sunrise' },
    { url: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=900&h=500&fit=crop', alt: 'Battery energy storage system' },
  ]
};

function isRealCode(content) {
  // Detectar si es código de programación real
  const codePatterns = [
    /\bfunction\s+\w+\s*\(/,
    /\bconst\s+\w+\s*=/,
    /\blet\s+\w+\s*=/,
    /\bvar\s+\w+\s*=/,
    /\bimport\s+.*\s+from/,
    /\bexport\s+(default\s+)?/,
    /\bclass\s+\w+/,
    /\bdef\s+\w+\s*\(/,
    /\breturn\s+/,
    /\bif\s*\(.+\)\s*{/,
    /\bfor\s*\(.+\)\s*{/,
    /\bwhile\s*\(.+\)/,
    /\bSELECT\s+.+\s+FROM/i,
    /\bINSERT\s+INTO/i,
    /\bUPDATE\s+\w+\s+SET/i,
    /=>\s*{/,
    /\$\{.+\}/,
    /console\.(log|error|warn)/,
    /async\s+function/,
    /await\s+/,
  ];

  return codePatterns.some(pattern => pattern.test(content));
}

function convertCodeBlockToContent(codeContent) {
  const lines = codeContent.trim().split('\n');
  let result = [];
  let currentSection = null;

  for (let line of lines) {
    line = line.trim();
    if (!line) {
      result.push('');
      continue;
    }

    // Detectar títulos de sección (TODO MAYÚSCULAS sin dos puntos al final)
    if (line === line.toUpperCase() && line.length > 3 && !line.endsWith(':') && !/\d/.test(line.slice(0, 3))) {
      currentSection = line;
      result.push(`\n### ${titleCase(line)}\n`);
      continue;
    }

    // Detectar títulos con : al final (ej: "CONSUMO ANUAL:")
    if (line.endsWith(':') && line === line.toUpperCase()) {
      result.push(`\n**${titleCase(line.slice(0, -1))}:**\n`);
      continue;
    }

    // Líneas con formato key: value
    if (line.includes(':') && !line.startsWith('http')) {
      const colonIndex = line.indexOf(':');
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();

      if (key && value) {
        // Si el key tiene ** ya es negrita
        if (key.startsWith('**')) {
          result.push(`- ${key} ${value}`);
        } else {
          result.push(`- **${key}:** ${value}`);
        }
        continue;
      }
    }

    // Líneas que empiezan con - ya son listas
    if (line.startsWith('-') || line.startsWith('*') || line.startsWith('•')) {
      result.push(line.replace(/^[•*]\s*/, '- '));
      continue;
    }

    // Líneas con = son fórmulas (blockquote)
    if (line.includes(' = ') && /\d/.test(line)) {
      result.push(`\n> 📊 **${line}**\n`);
      continue;
    }

    // Números con porcentaje son métricas
    if (/^\d+(\.\d+)?%/.test(line) || /\(\d+(\.\d+)?%\)/.test(line)) {
      result.push(`- ${line}`);
      continue;
    }

    // Líneas que empiezan con número y punto son listas numeradas
    if (/^\d+\.\s/.test(line)) {
      result.push(line);
      continue;
    }

    // Todo lo demás como texto normal
    result.push(line);
  }

  return result.join('\n');
}

function titleCase(str) {
  return str.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function processContent(content, category) {
  let result = content;

  // 1. Procesar todos los bloques de código
  result = result.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, codeContent) => {
    // Si es código real, mantenerlo
    if (isRealCode(codeContent)) {
      return match;
    }

    // Si tiene lenguaje específico y parece código, mantenerlo
    if (lang && ['python', 'javascript', 'typescript', 'sql', 'bash', 'json', 'yaml'].includes(lang.toLowerCase())) {
      if (codeContent.length < 500 && !codeContent.includes(':')) {
        return match;
      }
    }

    // Convertir a contenido normal
    return '\n' + convertCodeBlockToContent(codeContent) + '\n';
  });

  // 2. Limpiar múltiples saltos de línea
  result = result.replace(/\n{4,}/g, '\n\n\n');

  // 3. Mejorar formato de emojis y símbolos
  result = result.replace(/✓/g, '✅');
  result = result.replace(/✗/g, '❌');
  result = result.replace(/→/g, '➔');
  result = result.replace(/←/g, '⬅');

  // 4. Agregar imágenes entre secciones h2
  const images = getImagesForCategory(category);
  let imageIndex = 0;
  let h2Count = 0;

  result = result.replace(/^(## .+)$/gm, (match) => {
    h2Count++;
    // Agregar imagen después de cada 2-3 secciones h2
    if (h2Count === 3 || h2Count === 6 || h2Count === 9) {
      if (imageIndex < images.length) {
        const img = images[imageIndex];
        imageIndex++;
        return `${match}\n\n![${img.alt}](${img.url})\n`;
      }
    }
    return match;
  });

  return result;
}

function getImagesForCategory(category) {
  if (category === 'Consultoria Solar') return SECTION_IMAGES.solar;
  if (category === 'Gestion Energetica') return SECTION_IMAGES.energy;
  if (category === 'Formacion') return SECTION_IMAGES.training;
  if (category === 'Energia Renovable') return SECTION_IMAGES.renewable;
  return SECTION_IMAGES.solar;
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
  console.log('📝 Reformateando Artículos del Blog\n');
  console.log('='.repeat(60));
  console.log('\nEste script:');
  console.log('  1. Convierte bloques de código con datos a listas legibles');
  console.log('  2. Mantiene solo código de programación real en bloques de código');
  console.log('  3. Agrega imágenes de Unsplash entre secciones');
  console.log('  4. Mejora formato general del contenido\n');
  console.log('='.repeat(60) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total: ${articles.length} artículos\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    try {
      console.log(`[${num}/${articles.length}] ${article.title.substring(0, 55)}...`);

      // Contar bloques antes
      const blocksBefore = (article.content.match(/```/g) || []).length / 2;

      // Procesar contenido
      const processed = processContent(article.content, article.category);

      // Contar bloques después
      const blocksAfter = (processed.match(/```/g) || []).length / 2;

      // Contar imágenes agregadas
      const imgsBefore = (article.content.match(/!\[/g) || []).length;
      const imgsAfter = (processed.match(/!\[/g) || []).length;

      // Actualizar
      const success = await updateArticle(article.id, processed);

      if (success) {
        console.log(`   ✅ Bloques código: ${blocksBefore} → ${blocksAfter}`);
        console.log(`   ✅ Imágenes: ${imgsBefore} → ${imgsAfter}`);
        updated++;
      } else {
        console.log(`   ❌ Error al actualizar`);
        errors++;
      }
    } catch (e) {
      console.log(`   ❌ Exception: ${e.message}`);
      errors++;
    }

    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n📊 RESUMEN:\n');
  console.log(`   ✅ Actualizados: ${updated}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log('\n💡 Los artículos ahora tienen:');
  console.log('   - Listas y tablas legibles en lugar de bloques de código');
  console.log('   - Imágenes de alta calidad entre secciones');
  console.log('   - Formato limpio y profesional');
}

main().catch(e => console.error('Fatal:', e.message));
