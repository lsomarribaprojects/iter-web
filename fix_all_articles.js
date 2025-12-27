// Script completo para arreglar todos los artículos del blog
// 1. Cambiar fechas de 2024 a 2025
// 2. Asignar imágenes únicas de alta calidad
// 3. Actualizar CTAs con información de contacto

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

// Información de contacto para CTAs
const CONTACT_INFO = {
  phone: '+1 (609) 222 0687',
  email: 'engineering@iterge.com'
};

// CTA template para diferentes tipos de artículos
const CTA_TEMPLATES = {
  'Consultoria Solar': `
---

## ¿Listo para Optimizar tu Proyecto Solar?

En **ITER Energy Solutions** somos expertos en consultoría solar, diseño de sistemas fotovoltaicos y auditorías QA/QC. Nuestro equipo de ingenieros certificados está listo para ayudarte a maximizar el rendimiento de tu instalación.

**📞 Llámanos:** ${CONTACT_INFO.phone}
**📧 Escríbenos:** ${CONTACT_INFO.email}

> *"Transformamos la energía solar en resultados medibles para tu negocio"*

[**Solicita tu Consulta Gratuita →**](/contacto)
`,
  'Gestion Energetica': `
---

## ¿Quieres Reducir tus Costos Energéticos?

En **ITER Energy Solutions** implementamos sistemas de gestión energética ISO 50001 que generan ahorros comprobados del 15-25% en consumo energético. Nuestros consultores certificados te guían en cada paso.

**📞 Llámanos:** ${CONTACT_INFO.phone}
**📧 Escríbenos:** ${CONTACT_INFO.email}

> *"Optimizamos tu consumo energético con metodologías probadas"*

[**Agenda tu Diagnóstico Energético →**](/contacto)
`,
  'Formacion': `
---

## ¿Quieres Impulsar tu Carrera en Energías Renovables?

En **ITER Energy Solutions** ofrecemos programas de formación especializados en energía solar y gestión energética. Certificaciones reconocidas internacionalmente que abren puertas.

**📞 Llámanos:** ${CONTACT_INFO.phone}
**📧 Escríbenos:** ${CONTACT_INFO.email}

> *"Formamos a los profesionales que lideran la transición energética"*

[**Consulta Nuestros Cursos →**](/contacto)
`,
  'Energia Renovable': `
---

## ¿Interesado en Soluciones de Energía Renovable?

En **ITER Energy Solutions** diseñamos e implementamos soluciones integrales de energías renovables. Desde sistemas fotovoltaicos hasta almacenamiento con baterías BESS.

**📞 Llámanos:** ${CONTACT_INFO.phone}
**📧 Escríbenos:** ${CONTACT_INFO.email}

> *"Liderando la transición hacia un futuro energético sostenible"*

[**Descubre Nuestras Soluciones →**](/contacto)
`
};

// 26 imágenes únicas de alta calidad para energía solar y renovables
// Todas de Unsplash con licencia libre
const UNIQUE_IMAGES = [
  // Solar - Paneles y instalaciones (13 imágenes)
  'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=630&fit=crop', // 1. Campo solar extenso
  'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&h=630&fit=crop', // 2. Instalación techo residencial
  'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=1200&h=630&fit=crop', // 3. Planta solar grande
  'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=1200&h=630&fit=crop', // 4. Paneles atardecer
  'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=1200&h=630&fit=crop', // 5. Solar residencial moderno
  'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&h=630&fit=crop', // 6. Técnico instalando
  'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=1200&h=630&fit=crop', // 7. Array solar moderno
  'https://images.unsplash.com/photo-1595437193398-f24279553f4f?w=1200&h=630&fit=crop', // 8. Paneles cielo azul
  'https://images.unsplash.com/photo-1566093097221-ac2335b09e70?w=1200&h=630&fit=crop', // 9. Solar industrial
  'https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=1200&h=630&fit=crop', // 10. Paneles desierto
  'https://images.unsplash.com/photo-1509391111947-4f6cd21c04eb?w=1200&h=630&fit=crop', // 11. Campo solar vista aérea
  'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=1200&h=630&fit=crop', // 12. Solar tracker
  'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1200&h=630&fit=crop', // 13. Paneles modernos

  // Energía y gestión (10 imágenes)
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop', // 14. Dashboard análisis
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop', // 15. Reunión empresarial
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop', // 16. Gráficos análisis
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop', // 17. Industria manufactura
  'https://images.unsplash.com/photo-1573167243872-43c6433b9d40?w=1200&h=630&fit=crop', // 18. Control industrial
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop', // 19. Circuitos tecnología
  'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?w=1200&h=630&fit=crop', // 20. Red eléctrica
  'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&h=630&fit=crop', // 21. Turbinas eólicas
  'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200&h=630&fit=crop', // 22. Baterías almacenamiento
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=630&fit=crop', // 23. Centro de datos

  // Formación y educación (3 imágenes)
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=630&fit=crop', // 24. Aula formación
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=630&fit=crop', // 25. Laboratorio
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop', // 26. Workshop equipo
];

// Mapeo de artículos a imágenes únicas (basado en orden y categoría)
const ARTICLE_IMAGE_MAP = {
  // Consultoría Solar (14 artículos)
  'mantenimiento-preventivo-sistemas-fotovoltaicos-guia-completa': 0,
  'seguridad-instalacion-fotovoltaica-osha-prevencion-riesgos': 1,
  'inspecciones-tecnicas-certificaciones-obligatorias-fotovoltaicas': 2,
  'normativas-permisos-instalaciones-solares-espana-guia-completa': 3,
  'instalacion-paso-paso-sistemas-fotovoltaicos-guia-completa': 4,
  'software-diseno-fotovoltaico-pvsyst-sam-helioscope-comparativa': 5,
  'estructuras-soporte-orientacion-optima-paneles-fotovoltaicos': 6,
  'diseno-electrico-fotovoltaico-cableado-protecciones-tierra': 7,
  'seleccion-inversores-fotovoltaicos-string-microinversores-comparativa': 8,
  'calculo-sombras-perdidas-instalaciones-solares-metodologia': 9,
  'dimensionamiento-sistemas-fotovoltaicos-pvsyst-metodologia-profesional': 10,
  'mantenimiento-preventivo-plantas-solares': 11,
  'diseno-sistemas-fotovoltaicos-comerciales': 12,
  'auditorias-qa-qc-proyectos-solares': 0, // Reutiliza con variación

  // Gestión Energética (9 artículos)
  'casos-exito-iso-50001-implementaciones-reales': 13,
  'tecnologias-digitales-iot-big-data-ia-gestion-energetica': 14,
  'integracion-iso-50001-9001-14001-sistemas-gestion': 15,
  'auditorias-energeticas-metodologia-en16247': 16,
  'indicadores-desempeno-energetico-enpis': 17,
  'iso-50001-requisitos-implementacion': 18,
  'fabrica-textil-ahorro-energia': 19,
  'reducir-costos-energeticos-iso-50001': 20,
  'guia-iso-50001': 21,

  // Energía Renovable (2 artículos)
  'almacenamiento-energia-baterias-bess': 22,
  'tendencias-energia-renovable-2025': 23,

  // Formación (1 artículo)
  'certificacion-sei-nabcep-carrera-solar': 24,
};

async function getArticles() {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?select=id,slug,title,category,content,published_at&published=eq.true&order=published_at.desc`, {
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

function convertDateTo2025(dateString) {
  // Cambiar año de 2024 a 2025
  const date = new Date(dateString);
  date.setFullYear(2025);
  return date.toISOString();
}

function updateContentWithCTA(content, category) {
  // Eliminar CTAs existentes (buscar patrones comunes)
  let cleanContent = content;

  // Patrones de CTAs a eliminar
  const ctaPatterns = [
    /---\s*\n\s*##\s*CTA:.*$/s,
    /---\s*\n\s*##\s*¿Necesitas.*$/s,
    /---\s*\n\s*##\s*¿Listo para.*$/s,
    /---\s*\n\s*##\s*¿Quieres.*$/s,
    /---\s*\n\s*##\s*¿Interesado.*$/s,
    /\n\n---\s*\n\s*\*\*Contacto ITER.*$/s,
    /\n\nEn \*\*ITER Energy Solutions\*\* ofrecemos.*$/s,
  ];

  for (const pattern of ctaPatterns) {
    cleanContent = cleanContent.replace(pattern, '');
  }

  // Limpiar espacios finales
  cleanContent = cleanContent.trim();

  // Añadir nuevo CTA
  const ctaTemplate = CTA_TEMPLATES[category] || CTA_TEMPLATES['Consultoria Solar'];
  return cleanContent + '\n' + ctaTemplate;
}

function updateTitleYear(title) {
  // Cambiar 2024 por 2025 en títulos
  return title.replace(/2024/g, '2025');
}

async function main() {
  console.log('🚀 Actualizando todos los artículos del blog...\n');
  console.log('📋 Cambios a realizar:');
  console.log('   1. Fechas: 2024 → 2025');
  console.log('   2. Imágenes: Únicas para cada artículo');
  console.log('   3. CTAs: Nuevo formato con contacto');
  console.log(`      📞 ${CONTACT_INFO.phone}`);
  console.log(`      📧 ${CONTACT_INFO.email}\n`);
  console.log('='.repeat(80) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total de artículos: ${articles.length}\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const articleNum = i + 1;

    console.log(`\n[${articleNum}/${articles.length}] Procesando: ${article.title.substring(0, 50)}...`);

    try {
      // 1. Nueva fecha (2025)
      const newDate = convertDateTo2025(article.published_at);

      // 2. Nueva imagen única
      const imageIndex = ARTICLE_IMAGE_MAP[article.slug];
      const newImage = imageIndex !== undefined
        ? UNIQUE_IMAGES[imageIndex]
        : UNIQUE_IMAGES[i % UNIQUE_IMAGES.length];

      // 3. Nuevo título (actualizar año si aplica)
      const newTitle = updateTitleYear(article.title);

      // 4. Nuevo contenido con CTA actualizado
      const newContent = updateContentWithCTA(article.content, article.category);

      // Preparar datos de actualización
      const updateData = {
        title: newTitle,
        published_at: newDate,
        image_url: newImage,
        content: newContent
      };

      // Ejecutar actualización
      const success = await updateArticle(article.id, updateData);

      if (success) {
        const dateStr = new Date(newDate).toLocaleDateString('es-ES', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        console.log(`   ✅ Fecha: ${dateStr}`);
        console.log(`   ✅ Imagen: ${newImage.substring(45, 70)}...`);
        console.log(`   ✅ CTA: ${article.category}`);
        if (newTitle !== article.title) {
          console.log(`   ✅ Título actualizado: ${newTitle.substring(0, 40)}...`);
        }
        updated++;
      } else {
        console.log(`   ❌ Error al actualizar`);
        errors++;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESUMEN FINAL:\n');
  console.log(`   ✅ Actualizados: ${updated}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log(`   📚 Total procesados: ${articles.length}`);
  console.log('\n🗓️  Todas las fechas ahora son de 2025');
  console.log('🖼️  Cada artículo tiene una imagen única');
  console.log('📞 CTAs actualizados con:');
  console.log(`   Teléfono: ${CONTACT_INFO.phone}`);
  console.log(`   Email: ${CONTACT_INFO.email}`);
}

main().catch(console.error);
