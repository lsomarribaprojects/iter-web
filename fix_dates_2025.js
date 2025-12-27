// Script para corregir las fechas con los días correctos
// Martes = Solar Tuesday (Sistemas Fotovoltaicos, Formación)
// Jueves = Energy Thursday (Gestión Energética, Energía Renovable)
// Último artículo: Jueves 25 de Diciembre 2025

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

async function getArticles() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,category&published=eq.true&order=created_at.asc`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });
  return await response.json();
}

async function updateArticleDate(id, published_at) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ published_at })
  });
  return response.ok;
}

function isSolarCategory(category) {
  return category === 'Consultoria Solar' || category === 'Formacion';
}

function isEnergyCategory(category) {
  return category === 'Gestion Energetica' || category === 'Energia Renovable';
}

async function main() {
  console.log('🗓️  Corrigiendo fechas de publicación...\n');
  console.log('📅 Solar Tuesday (Martes) - Sistemas Fotovoltaicos, Formación');
  console.log('📅 Energy Thursday (Jueves) - Gestión Energética, Energía Renovable\n');
  console.log('🎯 Último artículo: Jueves 25 de Diciembre 2025\n');
  console.log('='.repeat(80) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total de artículos: ${articles.length}\n`);

  // Separar artículos por tipo de día
  const solarArticles = articles.filter(a => isSolarCategory(a.category));
  const energyArticles = articles.filter(a => isEnergyCategory(a.category));

  console.log(`☀️  Artículos Solar (Martes): ${solarArticles.length}`);
  console.log(`⚡ Artículos Energía (Jueves): ${energyArticles.length}\n`);

  // Último jueves es 25 de diciembre 2025
  // 25 de diciembre 2025 ES jueves ✓
  const lastThursday = new Date('2025-12-25T10:00:00Z');

  // Verificar que es jueves
  console.log(`Verificación: 25 Dic 2025 es día ${lastThursday.getDay()} (4=Jueves) ✓\n`);

  // Calcular fechas hacia atrás
  // Los artículos de energía van en jueves, solar en martes
  // Intercalamos: jueves(energía) -> martes(solar) -> jueves(energía) -> martes(solar)...

  const assignments = [];
  let currentDate = new Date(lastThursday);

  // Invertimos los arrays para asignar desde el más reciente hacia atrás
  const solarReversed = [...solarArticles].reverse();
  const energyReversed = [...energyArticles].reverse();

  let solarIdx = 0;
  let energyIdx = 0;

  // Empezamos con jueves 25 dic (energía)
  while (solarIdx < solarReversed.length || energyIdx < energyReversed.length) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 4 && energyIdx < energyReversed.length) {
      // Jueves - Energy Thursday
      assignments.push({
        id: energyReversed[energyIdx].id,
        title: energyReversed[energyIdx].title,
        category: energyReversed[energyIdx].category,
        date: new Date(currentDate),
        series: 'Energy Thursday'
      });
      energyIdx++;
      // Retroceder al martes anterior (2 días atrás)
      currentDate.setDate(currentDate.getDate() - 2);
    } else if (dayOfWeek === 2 && solarIdx < solarReversed.length) {
      // Martes - Solar Tuesday
      assignments.push({
        id: solarReversed[solarIdx].id,
        title: solarReversed[solarIdx].title,
        category: solarReversed[solarIdx].category,
        date: new Date(currentDate),
        series: 'Solar Tuesday'
      });
      solarIdx++;
      // Retroceder al jueves anterior (5 días atrás)
      currentDate.setDate(currentDate.getDate() - 5);
    } else {
      // Ajustar al día correcto
      if (dayOfWeek === 4) {
        // Es jueves pero no hay más artículos de energía, ir a martes
        currentDate.setDate(currentDate.getDate() - 2);
      } else if (dayOfWeek === 2) {
        // Es martes pero no hay más artículos solar, ir a jueves anterior
        currentDate.setDate(currentDate.getDate() - 5);
      } else {
        // Encontrar el jueves o martes más cercano hacia atrás
        while (currentDate.getDay() !== 4 && currentDate.getDay() !== 2) {
          currentDate.setDate(currentDate.getDate() - 1);
        }
      }
    }
  }

  // Aplicar las actualizaciones
  console.log('Aplicando fechas corregidas:\n');

  let updated = 0;
  let errors = 0;

  // Ordenar por fecha descendente para mostrar en orden cronológico inverso
  assignments.sort((a, b) => b.date - a.date);

  for (const assignment of assignments) {
    const dateStr = assignment.date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const success = await updateArticleDate(assignment.id, assignment.date.toISOString());

    if (success) {
      const icon = assignment.series === 'Solar Tuesday' ? '☀️' : '⚡';
      console.log(`${icon} [${assignment.series}] ${dateStr}`);
      console.log(`   ${assignment.title.substring(0, 55)}...`);
      updated++;
    } else {
      console.log(`❌ Error: ${assignment.title.substring(0, 50)}...`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESUMEN:\n');
  console.log(`   ✅ Actualizados: ${updated}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log('\n📅 Calendario de publicación 2025:');
  console.log('   ☀️  Solar Tuesday (Martes) - Sistemas Fotovoltaicos');
  console.log('   ⚡ Energy Thursday (Jueves) - Gestión Energética');
}

main().catch(console.error);
