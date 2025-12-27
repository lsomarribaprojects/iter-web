// Script para insertar todos los artículos del blog desde archivos markdown
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

// Mapeo de categorías
const categoryMap = {
  'energia': 'Gestion Energetica',
  'solar': 'Consultoria Solar',
  'formacion': 'Formacion',
  'renovables': 'Energia Renovable'
};

// Imágenes por categoría
const categoryImages = {
  'Gestion Energetica': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
  'Consultoria Solar': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
  'Formacion': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop',
  'Energia Renovable': 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop'
};

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Detectar formato: YAML frontmatter o Markdown con **Title:**
  const hasYamlFrontmatter = content.startsWith('---');

  let title, slug, excerpt, category, tags, author, publishedDate, readingTime, articleContent;

  if (hasYamlFrontmatter) {
    // Formato YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      console.log(`Skipping ${filePath} - invalid YAML frontmatter`);
      return null;
    }

    const yaml = frontmatterMatch[1];
    title = yaml.match(/title:\s*"?([^"\n]+)"?/)?.[1];
    slug = yaml.match(/slug:\s*"?([^"\n]+)"?/)?.[1];
    excerpt = yaml.match(/excerpt:\s*"?([^"\n]+)"?/)?.[1];
    category = yaml.match(/category:\s*"?([^"\n]+)"?/)?.[1];
    author = yaml.match(/author:\s*"?([^"\n]+)"?/)?.[1];
    publishedDate = yaml.match(/date:\s*"?([^"\n]+)"?/)?.[1];
    readingTime = yaml.match(/reading_time:\s*"?([^"\n]+)"?/)?.[1];

    // Tags en YAML pueden ser array
    const tagsMatch = yaml.match(/tags:\s*\[([^\]]+)\]/);
    if (tagsMatch) {
      tags = tagsMatch[1].split(',').map(t => t.replace(/"/g, '').trim());
    }

    // Contenido después del frontmatter
    articleContent = content.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
  } else {
    // Formato Markdown con **Title:**
    title = content.match(/\*\*Title:\*\*\s*(.+)/)?.[1];
    slug = content.match(/\*\*Slug:\*\*\s*(.+)/)?.[1];
    excerpt = content.match(/\*\*Excerpt:\*\*\s*(.+)/)?.[1];
    category = content.match(/\*\*Category:\*\*\s*(.+)/)?.[1];
    author = content.match(/\*\*Author:\*\*\s*(.+)/)?.[1];
    publishedDate = content.match(/\*\*PublishedDate:\*\*\s*(.+)/)?.[1];
    readingTime = content.match(/\*\*Reading Time:\*\*\s*(.+)/)?.[1];

    const tagsMatch = content.match(/\*\*Tags:\*\*\s*(.+)/);
    if (tagsMatch) {
      tags = tagsMatch[1].split(',').map(t => t.trim());
    }

    // Contenido después de ---
    const contentParts = content.split('---');
    articleContent = contentParts.length > 1 ? contentParts.slice(1).join('---').trim() : content;
  }

  if (!title || !slug) {
    console.log(`Skipping ${filePath} - missing required fields (title or slug)`);
    return null;
  }

  const rawCategory = category ? category.trim().toLowerCase() : 'energia';
  const mappedCategory = categoryMap[rawCategory] || 'Gestion Energetica';

  return {
    title: title.trim(),
    slug: slug.trim(),
    excerpt: excerpt ? excerpt.trim() : 'Articulo de ITER Energy Solutions',
    content: articleContent,
    image_url: categoryImages[mappedCategory] || categoryImages['Gestion Energetica'],
    category: mappedCategory,
    tags: tags || ['energia', 'eficiencia'],
    author: author ? author.trim() : 'ITER Energy Solutions',
    read_time: readingTime ? readingTime.trim() : '10 min',
    published: true,
    language: 'es',
    published_at: publishedDate
      ? new Date(publishedDate.trim()).toISOString()
      : new Date().toISOString()
  };
}

async function checkExistingArticle(slug) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}&select=id`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });
  const data = await response.json();
  return data && data.length > 0;
}

async function insertArticle(article) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(article)
  });

  return response.ok;
}

async function main() {
  const articlesDir = path.join(__dirname, 'blog-articles');

  if (!fs.existsSync(articlesDir)) {
    console.log('No se encontro el directorio blog-articles');
    return;
  }

  const files = fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.md'))
    .sort();

  console.log(`Encontrados ${files.length} archivos markdown\n`);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const filePath = path.join(articlesDir, file);
    const article = parseMarkdownFile(filePath);

    if (!article) {
      errors++;
      continue;
    }

    // Verificar si ya existe
    const exists = await checkExistingArticle(article.slug);
    if (exists) {
      console.log(`⏭️  Existe: ${article.title.substring(0, 50)}...`);
      skipped++;
      continue;
    }

    // Insertar
    const success = await insertArticle(article);
    if (success) {
      console.log(`✅ Insertado: ${article.title.substring(0, 50)}...`);
      inserted++;
    } else {
      console.log(`❌ Error: ${article.title.substring(0, 50)}...`);
      errors++;
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   Insertados: ${inserted}`);
  console.log(`   Existentes: ${skipped}`);
  console.log(`   Errores: ${errors}`);
  console.log(`   Total procesados: ${files.length}`);
}

main().catch(console.error);
