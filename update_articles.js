// Script para actualizar artículos con fechas e imágenes únicas
// Martes = "Solar Tuesday" (Sistemas Fotovoltaicos)
// Jueves = "Energy Thursday" (Gestión Energética)
// Último artículo: Jueves 25 de Diciembre 2024

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

// Imágenes únicas de alta calidad de Unsplash para energía solar y gestión energética
const solarImages = [
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop', // Paneles solares campo
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop', // Instalación solar techo
  'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=500&fit=crop', // Planta solar grande
  'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=500&fit=crop', // Paneles solares atardecer
  'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&h=500&fit=crop', // Instalación solar residencial
  'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&h=500&fit=crop', // Técnico instalando paneles
  'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&h=500&fit=crop', // Array solar moderno
  'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=800&h=500&fit=crop', // Paneles con cielo azul
  'https://images.unsplash.com/photo-1566093097221-ac2335b09e70?w=800&h=500&fit=crop', // Solar industrial
  'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=800&h=500&fit=crop', // Paneles en desierto
  'https://images.unsplash.com/photo-1509391111947-4f6cd21c04eb?w=800&h=500&fit=crop', // Campo solar extenso
  'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&h=500&fit=crop', // Solar tracker
  'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&h=500&fit=crop', // Paneles modernos
];

const energyImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', // Dashboard análisis
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop', // Reunión empresarial
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop', // Gráficos análisis datos
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop', // Industria manufactura
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop', // Oficina tecnología
  'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=800&h=500&fit=crop', // Control industrial
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop', // Circuitos tecnología
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=800&h=500&fit=crop', // Red eléctrica
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop', // Turbinas eólicas
  'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=500&fit=crop', // Smart meter
  'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=500&fit=crop', // Fábrica eficiente
  'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&h=500&fit=crop', // Baterías almacenamiento
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=500&fit=crop', // Centro de datos
];

const formacionImages = [
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop', // Aula formación
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop', // Estudiantes laboratorio
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop', // Workshop
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=500&fit=crop', // Estudio certificación
];

async function getArticles() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,title,slug,category&published=eq.true&order=created_at.asc`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`
    }
  });
  return await response.json();
}

async function updateArticle(id, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}`, {
    method: 'PATCH',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  });
  return response.ok;
}

// Calcular fecha hacia atrás desde el 25 de diciembre
function calculateDates(articles) {
  // Último jueves: 25 de diciembre 2024
  const lastThursday = new Date('2024-12-25T10:00:00Z');

  // Separar artículos por categoría
  const solarArticles = articles.filter(a =>
    a.category === 'Consultoria Solar' || a.category === 'Formacion'
  );
  const energyArticles = articles.filter(a =>
    a.category === 'Gestion Energetica' || a.category === 'Energia Renovable'
  );

  console.log(`\nArtículos Solar/Formación: ${solarArticles.length}`);
  console.log(`Artículos Energía/Renovable: ${energyArticles.length}`);

  // Asignar fechas en orden inverso (más reciente primero)
  // Martes = Solar (día 2), Jueves = Energía (día 4)

  let currentDate = new Date(lastThursday);
  const assignments = [];

  // Ordenar: intercalar Solar (martes) y Energía (jueves)
  // Empezamos desde el 25 dic (jueves) hacia atrás
  let solarIndex = solarArticles.length - 1;
  let energyIndex = energyArticles.length - 1;

  // El 25 dic es jueves, así que empezamos con energía
  while (solarIndex >= 0 || energyIndex >= 0) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 4 && energyIndex >= 0) { // Jueves - Energy Thursday
      assignments.push({
        id: energyArticles[energyIndex].id,
        title: energyArticles[energyIndex].title,
        date: new Date(currentDate),
        series: 'Energy Thursday'
      });
      energyIndex--;
      // Retroceder al martes anterior (2 días)
      currentDate.setDate(currentDate.getDate() - 2);
    } else if (dayOfWeek === 2 && solarIndex >= 0) { // Martes - Solar Tuesday
      assignments.push({
        id: solarArticles[solarIndex].id,
        title: solarArticles[solarIndex].title,
        date: new Date(currentDate),
        series: 'Solar Tuesday'
      });
      solarIndex--;
      // Retroceder al jueves anterior (5 días)
      currentDate.setDate(currentDate.getDate() - 5);
    } else {
      // Ajustar al día correcto
      if (dayOfWeek === 4) {
        currentDate.setDate(currentDate.getDate() - 2); // Ir a martes
      } else if (dayOfWeek === 2) {
        currentDate.setDate(currentDate.getDate() - 5); // Ir a jueves anterior
      } else if (dayOfWeek > 4) {
        currentDate.setDate(currentDate.getDate() - (dayOfWeek - 4)); // Ir a jueves
      } else if (dayOfWeek > 2) {
        currentDate.setDate(currentDate.getDate() - (dayOfWeek - 2)); // Ir a martes
      } else {
        currentDate.setDate(currentDate.getDate() - (dayOfWeek + 5)); // Ir a jueves anterior
      }
    }
  }

  return assignments;
}

async function main() {
  console.log('🚀 Actualizando artículos del blog...\n');

  const articles = await getArticles();
  console.log(`📚 Total de artículos: ${articles.length}`);

  // Calcular asignaciones de fechas
  const dateAssignments = calculateDates(articles);

  // Crear mapa de artículos con sus nuevas fechas
  const articleUpdates = new Map();
  for (const assignment of dateAssignments) {
    articleUpdates.set(assignment.id, {
      date: assignment.date,
      series: assignment.series
    });
  }

  // Contadores para imágenes
  let solarImageIndex = 0;
  let energyImageIndex = 0;
  let formacionImageIndex = 0;

  let updated = 0;
  let errors = 0;

  for (const article of articles) {
    const updateData = {};

    // Asignar fecha
    const assignment = articleUpdates.get(article.id);
    if (assignment) {
      updateData.published_at = assignment.date.toISOString();
    }

    // Asignar imagen única según categoría
    if (article.category === 'Consultoria Solar') {
      updateData.image_url = solarImages[solarImageIndex % solarImages.length];
      solarImageIndex++;
    } else if (article.category === 'Gestion Energetica') {
      updateData.image_url = energyImages[energyImageIndex % energyImages.length];
      energyImageIndex++;
    } else if (article.category === 'Formacion') {
      updateData.image_url = formacionImages[formacionImageIndex % formacionImages.length];
      formacionImageIndex++;
    } else if (article.category === 'Energia Renovable') {
      updateData.image_url = energyImages[(energyImageIndex + 5) % energyImages.length];
      energyImageIndex++;
    }

    // Actualizar artículo
    if (Object.keys(updateData).length > 0) {
      const success = await updateArticle(article.id, updateData);
      if (success) {
        const dateStr = updateData.published_at
          ? new Date(updateData.published_at).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
          : 'sin fecha';
        console.log(`✅ ${article.title.substring(0, 50)}... | ${dateStr}`);
        updated++;
      } else {
        console.log(`❌ Error: ${article.title.substring(0, 50)}...`);
        errors++;
      }
    }
  }

  console.log(`\n📊 Resumen:`);
  console.log(`   Actualizados: ${updated}`);
  console.log(`   Errores: ${errors}`);
  console.log(`\n🗓️  Series de publicación:`);
  console.log(`   📅 Solar Tuesday (Martes) - Sistemas Fotovoltaicos`);
  console.log(`   📅 Energy Thursday (Jueves) - Gestión Energética`);
}

main().catch(console.error);
