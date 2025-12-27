const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog-articles');
const outputFile = path.join(__dirname, 'blog_17_articles_completed.sql');

// Artículos con metadata
const articles = [
  {
    file: '01-iso-50001-requisitos.md',
    title: 'Requisitos Clave de la Norma ISO 50001:2018 para Sistemas de Gestión Energética',
    slug: 'iso-50001-requisitos-implementacion',
    excerpt: 'Guía completa sobre los requisitos esenciales de la norma ISO 50001:2018, incluyendo estructura de alto nivel, indicadores de desempeño y mejora continua del desempeño energético.',
    category: 'energia',
    tags: ['ISO 50001', 'gestión energética', 'eficiencia energética', 'certificación', 'EnMS'],
    date: '2024-11-01'
  },
  {
    file: '02-indicadores-desempeno-energetico.md',
    title: 'Indicadores de Desempeño Energético (EnPI): Medición y Optimización',
    slug: 'indicadores-desempeno-energetico-enpi',
    excerpt: 'Metodología completa para establecer y monitorear indicadores de desempeño energético (EnPI) según ISO 50001, con casos prácticos de implementación.',
    category: 'energia',
    tags: ['EnPI', 'ISO 50001', 'indicadores energéticos', 'monitorización', 'eficiencia'],
    date: '2024-11-06'
  },
  {
    file: '03-auditorias-energeticas-metodologia.md',
    title: 'Auditorías Energéticas: Metodología y Mejores Prácticas según ISO 50002',
    slug: 'auditorias-energeticas-metodologia-iso-50002',
    excerpt: 'Guía completa de auditorías energéticas según ISO 50002, incluyendo metodología de evaluación, identificación de oportunidades de ahorro y casos prácticos.',
    category: 'energia',
    tags: ['auditoría energética', 'ISO 50002', 'eficiencia energética', 'ahorro energético', 'diagnóstico'],
    date: '2024-11-11'
  },
  {
    file: '04-integracion-sistemas-gestion.md',
    title: 'Integración de Sistemas de Gestión: ISO 50001, ISO 9001 e ISO 14001',
    slug: 'integracion-sistemas-gestion-iso-50001-9001-14001',
    excerpt: 'Estrategias para integrar eficazmente ISO 50001 con otros sistemas de gestión (ISO 9001, ISO 14001), aprovechando sinergias y reduciendo duplicaciones.',
    category: 'energia',
    tags: ['sistemas integrados', 'ISO 50001', 'ISO 9001', 'ISO 14001', 'gestión', 'HLS'],
    date: '2024-11-16'
  },
  {
    file: '05-tecnologias-digitales-gestion-energetica.md',
    title: 'Tecnologías Digitales para la Gestión Energética: IoT, IA y Big Data',
    slug: 'tecnologias-digitales-gestion-energetica-iot-ia-big-data',
    excerpt: 'Aplicaciones de tecnologías digitales (IoT, IA, Big Data) en gestión energética moderna, con casos de uso y ROI real en industria y edificación.',
    category: 'energia',
    tags: ['IoT', 'inteligencia artificial', 'Big Data', 'digitalización', 'gestión energética', 'Industria 4.0'],
    date: '2024-11-21'
  },
  {
    file: '06-casos-exito-iso-50001.md',
    title: 'Casos de Éxito ISO 50001: Ahorros Reales en Industria y Servicios',
    slug: 'casos-exito-iso-50001-ahorros-reales',
    excerpt: 'Análisis de implementaciones exitosas de ISO 50001 con ahorros energéticos cuantificados, ROI y lecciones aprendidas en diversos sectores.',
    category: 'energia',
    tags: ['casos de éxito', 'ISO 50001', 'ahorro energético', 'ROI', 'industria', 'certificación'],
    date: '2024-11-26'
  },
  {
    file: '07-dimensionamiento-pvsyst.md',
    title: 'Dimensionamiento de Instalaciones Fotovoltaicas con PVsyst',
    slug: 'dimensionamiento-instalaciones-fotovoltaicas-pvsyst',
    excerpt: 'Guía completa de diseño y dimensionamiento de sistemas fotovoltaicos usando PVsyst, desde la evaluación del recurso solar hasta el cálculo de PR y producción.',
    category: 'solar',
    tags: ['PVsyst', 'dimensionamiento fotovoltaico', 'diseño solar', 'performance ratio', 'simulación'],
    date: '2024-12-01'
  },
  {
    file: '08-calculo-sombras-perdidas.md',
    title: 'Cálculo de Sombras y Pérdidas en Sistemas Fotovoltaicos',
    slug: 'calculo-sombras-perdidas-sistemas-fotovoltaicos',
    excerpt: 'Metodología de análisis de sombreado en instalaciones fotovoltaicas, cálculo de pérdidas, herramientas de simulación y estrategias de mitigación.',
    category: 'solar',
    tags: ['sombreado fotovoltaico', 'pérdidas solares', 'análisis sombras', 'PVsyst', 'HelioScope'],
    date: '2024-12-06'
  },
  {
    file: '09-seleccion-inversores-string-micro.md',
    title: 'Selección de Inversores Fotovoltaicos: String vs Microinversores',
    slug: 'seleccion-inversores-fotovoltaicos-string-vs-microinversores',
    excerpt: 'Comparativa técnica y económica entre inversores string y microinversores para instalaciones fotovoltaicas, con análisis de LCOE y casos de aplicación.',
    category: 'solar',
    tags: ['inversores fotovoltaicos', 'string inverter', 'microinversor', 'LCOE', 'diseño FV'],
    date: '2024-12-11'
  },
  {
    file: '10-diseno-electrico-cableado-protecciones.md',
    title: 'Diseño Eléctrico en Instalaciones Fotovoltaicas: Cableado y Protecciones',
    slug: 'diseno-electrico-instalaciones-fotovoltaicas-cableado-protecciones',
    excerpt: 'Guía completa del diseño eléctrico en sistemas fotovoltaicos: cálculo de secciones DC/AC, protecciones, puesta a tierra y cumplimiento normativo IEC/REBT.',
    category: 'solar',
    tags: ['diseño eléctrico FV', 'cableado fotovoltaico', 'protecciones DC', 'IEC 62548', 'REBT'],
    date: '2024-12-16'
  },
  {
    file: '11-estructuras-soporte-orientacion.md',
    title: 'Estructuras de Soporte y Orientación en Instalaciones Fotovoltaicas',
    slug: 'estructuras-soporte-orientacion-instalaciones-fotovoltaicas',
    excerpt: 'Guía técnica de estructuras fotovoltaicas: tipos, cálculo de cargas según Eurocódigos, orientación óptima y sistemas de seguimiento solar.',
    category: 'solar',
    tags: ['estructuras fotovoltaicas', 'orientación solar', 'Eurocódigos', 'tracker solar', 'diseño estructural'],
    date: '2024-12-21'
  },
  {
    file: '12-software-diseno-pvsyst-sam-helioscope.md',
    title: 'Software de Diseño Fotovoltaico: PVsyst vs SAM vs HelioScope',
    slug: 'software-diseno-fotovoltaico-pvsyst-sam-helioscope-comparativa',
    excerpt: 'Comparativa exhaustiva de los principales software de diseño fotovoltaico (PVsyst, SAM, HelioScope): funcionalidades, precisión, precios y casos de uso.',
    category: 'solar',
    tags: ['PVsyst', 'SAM', 'HelioScope', 'software fotovoltaico', 'diseño FV'],
    date: '2024-12-26'
  },
  {
    file: '13-instalacion-paso-paso-fotovoltaica.md',
    title: 'Instalación Paso a Paso de Sistemas Fotovoltaicos: Guía Completa 2024',
    slug: 'instalacion-paso-paso-sistemas-fotovoltaicos-guia-completa',
    excerpt: 'Guía técnica detallada del proceso de instalación de sistemas fotovoltaicos, desde la planificación hasta la puesta en marcha. Incluye procedimientos, herramientas, seguridad y checklist de calidad según normativas IEC y OSHA.',
    category: 'solar',
    tags: ['instalación fotovoltaica', 'montaje solar', 'procedimientos FV', 'seguridad instalación', 'comisionamiento', 'OSHA', 'IEC 62548'],
    date: '2025-01-01'
  },
  {
    file: '14-normativas-permisos-instalaciones-solares-espana.md',
    title: 'Normativas y Permisos para Instalaciones Solares en España 2024: Guía Completa',
    slug: 'normativas-permisos-instalaciones-solares-espana-guia-completa',
    excerpt: 'Guía exhaustiva del marco regulatorio español para instalaciones fotovoltaicas: REBT, RD 244/2019, procedimientos de legalización, permisos autonómicos y municipales, inspecciones obligatorias y plazos administrativos actualizados 2024.',
    category: 'solar',
    tags: ['normativa fotovoltaica', 'permisos instalación solar', 'RD 244/2019', 'REBT', 'legalización solar', 'autoconsumo España', 'trámites administrativos', 'inspección OCA'],
    date: '2025-01-06'
  },
  {
    file: '15-inspecciones-tecnicas-certificaciones-fotovoltaicas.md',
    title: 'Inspecciones Técnicas y Certificaciones Obligatorias en Instalaciones Fotovoltaicas',
    slug: 'inspecciones-tecnicas-certificaciones-obligatorias-fotovoltaicas',
    excerpt: 'Guía completa de inspecciones OCA, certificaciones CE, pruebas IEC obligatorias y procedimientos de verificación técnica para instalaciones fotovoltaicas. Normativa, procedimientos, costes y casos prácticos según REBT e IEC 62446.',
    category: 'solar',
    tags: ['inspección OCA', 'IEC 62446', 'certificación fotovoltaica', 'pruebas FV', 'calidad instalación', 'REBT', 'termografía', 'megger test'],
    date: '2025-01-11'
  },
  {
    file: '16-seguridad-instalacion-fotovoltaica-osha-prevencion-riesgos.md',
    title: 'Seguridad en Instalación Fotovoltaica: OSHA, Prevención de Riesgos y Protocolos',
    slug: 'seguridad-instalacion-fotovoltaica-osha-prevencion-riesgos',
    excerpt: 'Guía completa de seguridad en instalaciones fotovoltaicas: normativa OSHA/INSST, riesgos eléctricos y caídas, equipos de protección individual, procedimientos de trabajo seguro, emergencias y primeros auxilios. Protocolos con casos prácticos.',
    category: 'solar',
    tags: ['seguridad fotovoltaica', 'OSHA', 'prevención riesgos', 'EPIs instalación solar', 'riesgo eléctrico', 'trabajo en altura', 'seguridad y salud'],
    date: '2025-01-16'
  },
  {
    file: '17-mantenimiento-preventivo-sistemas-fotovoltaicos.md',
    title: 'Mantenimiento Preventivo de Sistemas Fotovoltaicos: Guía Completa O&M 2024',
    slug: 'mantenimiento-preventivo-sistemas-fotovoltaicos-guia-completa',
    excerpt: 'Plan completo de mantenimiento preventivo para instalaciones fotovoltaicas: protocolos de inspección, limpieza de módulos, verificaciones eléctricas, calendario de tareas y optimización de producción según normativa IEC 62446 y NREL.',
    category: 'solar',
    tags: ['mantenimiento fotovoltaico', 'O&M solar', 'limpieza paneles', 'IEC 62446', 'performance ratio', 'degradación fotovoltaica', 'plan mantenimiento'],
    date: '2025-01-21'
  }
];

function escapeSqlString(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

function generateSql() {
  const lines = [];

  lines.push('-- ================================================');
  lines.push('-- ITER Energy Solutions - Blog Articles Import');
  lines.push(`-- Generated: ${new Date().toISOString().split('T')[0]}`);
  lines.push(`-- Total articles: ${articles.length}`);
  lines.push('-- ================================================\n');
  lines.push('-- NOTE: Adjust published_at dates as needed');
  lines.push('-- NOTE: Ensure blog_posts table exists with correct schema\n');

  articles.forEach((article, index) => {
    const filepath = path.join(blogDir, article.file);
    let content = '';

    try {
      content = fs.readFileSync(filepath, 'utf8');
    } catch (error) {
      console.error(`Error reading ${article.file}:`, error.message);
      content = `# ${article.title}\n\nContent not found.`;
    }

    const escapedContent = escapeSqlString(content);
    const escapedTitle = escapeSqlString(article.title);
    const escapedExcerpt = escapeSqlString(article.excerpt);
    const tagsArray = article.tags.map(t => `'${escapeSqlString(t)}'`).join(',');

    lines.push(`-- Article ${index + 1}: ${article.title}`);
    lines.push('INSERT INTO public.blog_posts (');
    lines.push('    title,');
    lines.push('    slug,');
    lines.push('    excerpt,');
    lines.push('    content,');
    lines.push('    image_url,');
    lines.push('    category,');
    lines.push('    tags,');
    lines.push('    author,');
    lines.push('    published,');
    lines.push('    published_at,');
    lines.push('    created_at,');
    lines.push('    updated_at');
    lines.push(') VALUES (');
    lines.push(`    '${escapedTitle}',`);
    lines.push(`    '${article.slug}',`);
    lines.push(`    '${escapedExcerpt}',`);
    lines.push(`    '${escapedContent}',`);
    lines.push(`    '/blog/${article.slug}.jpg',`);
    lines.push(`    '${article.category}',`);
    lines.push(`    ARRAY[${tagsArray}]::text[],`);
    lines.push(`    'Equipo ITER',`);
    lines.push(`    true,`);
    lines.push(`    '${article.date} 10:00:00'::timestamp,`);
    lines.push(`    '${article.date} 10:00:00'::timestamp,`);
    lines.push(`    '${article.date} 10:00:00'::timestamp`);
    lines.push(');\n');
  });

  fs.writeFileSync(outputFile, lines.join('\n'), 'utf8');

  console.log('\n' + '='.repeat(60));
  console.log('✅ SQL file generated successfully');
  console.log(`📊 Articles processed: ${articles.length}`);
  console.log(`📝 File: ${outputFile}`);
  console.log('='.repeat(60) + '\n');

  // Show first few lines
  const preview = lines.slice(0, 15).join('\n');
  console.log('Preview (first 15 lines):');
  console.log(preview);
}

generateSql();
