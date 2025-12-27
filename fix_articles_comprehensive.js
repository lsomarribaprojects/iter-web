// Script comprehensivo para corregir todos los artículos del blog
// 1. Convertir € a US$ (tasa 1.10)
// 2. Adaptar contenido al mercado americano
// 3. Mejorar formato de bloques de código
// 4. Actualizar CTAs

const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

// Tasa de conversión EUR a USD
const EUR_TO_USD = 1.10;

// Información de contacto para CTAs
const CONTACT_INFO = {
  phone: '+1 (609) 222 0687',
  email: 'engineering@iterge.com'
};

// Mapeo de normativas europeas a americanas
const NORMATIVE_REPLACEMENTS = {
  // Reglamentos eléctricos
  'REBT': 'NEC (National Electrical Code)',
  'Reglamento Electrotécnico de Baja Tensión': 'National Electrical Code (NEC)',
  'UNE-EN': 'ANSI/IEEE',
  'UNE ': 'ANSI ',
  'IEC 60364': 'NEC Article 690',

  // Normativas ambientales y energéticas
  'EMAS': 'EPA Environmental Management',
  'Directiva 2012/27/UE': 'EISA 2007 (Energy Independence and Security Act)',
  'Directiva 2014/24/UE': 'Federal Acquisition Regulation (FAR)',
  'Directiva 2010/31/UE': 'ASHRAE 90.1 Energy Standard',
  'Real Decreto': 'Federal Regulation',

  // Geográficos
  'España': 'the United States',
  'española': 'American',
  'español': 'American',
  'Madrid': 'New York',
  'Barcelona': 'Los Angeles',
  'en España': 'in the US',
  'de España': 'in the US',

  // Organizaciones
  'IDAE': 'DOE (Department of Energy)',
  'CNMC': 'FERC (Federal Energy Regulatory Commission)',
  'Red Eléctrica de España': 'PJM Interconnection',
  'REE': 'regional grid operator',
  'Ministerio de Transición Ecológica': 'Department of Energy (DOE)',

  // Tarifas y mercado
  'PVPC': 'utility rate structure',
  'peaje de acceso': 'transmission charges',
  'término de potencia': 'demand charges',
  'término de energía': 'energy charges',
  'mercado mayorista español': 'US wholesale energy market',
  'OMIE': 'ISO/RTO market',
};

// Conversión de moneda
function convertCurrency(content) {
  let result = content;

  // Patrones de euros a convertir
  const euroPatterns = [
    // €X,XXX o €X.XXX o €XXX
    { regex: /€\s*(\d{1,3}(?:[,\.]\d{3})*(?:[,\.]\d{1,2})?)/g, type: 'amount' },
    // X,XXX€ o X.XXX€
    { regex: /(\d{1,3}(?:[,\.]\d{3})*(?:[,\.]\d{1,2})?)\s*€/g, type: 'amount_suffix' },
    // €/kW, €/MWh, €/año, etc.
    { regex: /€\/(kW[hp]?|MW[hp]?|año|year|mes|month|hora|hour|m2|m²)/gi, type: 'unit' },
  ];

  // Convertir montos con € prefijo
  result = result.replace(/€\s*(\d{1,3}(?:[,\.]\d{3})*(?:[,\.]\d{1,2})?)/g, (match, amount) => {
    // Limpiar y convertir
    const cleanAmount = amount.replace(/\./g, '').replace(',', '.');
    const numValue = parseFloat(cleanAmount);
    if (isNaN(numValue)) return match;

    const usdValue = Math.round(numValue * EUR_TO_USD);
    // Formatear con comas para miles
    const formatted = usdValue.toLocaleString('en-US');
    return `US$${formatted}`;
  });

  // Convertir montos con € sufijo
  result = result.replace(/(\d{1,3}(?:[,\.]\d{3})*(?:[,\.]\d{1,2})?)\s*€/g, (match, amount) => {
    const cleanAmount = amount.replace(/\./g, '').replace(',', '.');
    const numValue = parseFloat(cleanAmount);
    if (isNaN(numValue)) return match;

    const usdValue = Math.round(numValue * EUR_TO_USD);
    const formatted = usdValue.toLocaleString('en-US');
    return `US$${formatted}`;
  });

  // Convertir unidades €/X
  result = result.replace(/€\/(kW[hp]?|MW[hp]?|año|year|mes|month|hora|hour|m2|m²)/gi, (match, unit) => {
    const unitMap = {
      'año': 'year',
      'mes': 'month',
      'hora': 'hour',
      'm2': 'sqft',
      'm²': 'sqft'
    };
    const newUnit = unitMap[unit.toLowerCase()] || unit;
    return `US$/${newUnit}`;
  });

  // Limpiar cualquier € restante
  result = result.replace(/€/g, 'US$');

  return result;
}

// Aplicar reemplazos de normativas
function adaptToUSMarket(content) {
  let result = content;

  for (const [european, american] of Object.entries(NORMATIVE_REPLACEMENTS)) {
    // Crear regex case-insensitive para algunos términos
    const regex = new RegExp(european.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    result = result.replace(regex, american);
  }

  // Conversiones adicionales específicas
  // kWh/m² → kWh/sqft (con factor de conversión aproximado)
  result = result.replace(/(\d+(?:\.\d+)?)\s*kWh\/m²/g, (match, value) => {
    const sqftValue = (parseFloat(value) * 0.0929).toFixed(1); // m² to sqft
    return `${sqftValue} kWh/sqft`;
  });

  // Temperaturas Celsius a Fahrenheit en contextos específicos
  // Solo si está claro que es temperatura ambiente
  result = result.replace(/(\d+)°C\s*\(ambiente\)/gi, (match, temp) => {
    const fahrenheit = Math.round((parseFloat(temp) * 9/5) + 32);
    return `${fahrenheit}°F (ambient)`;
  });

  return result;
}

// Mejorar formato de bloques de código
function improveCodeBlocks(content) {
  let result = content;

  // Remover resaltados accidentales dentro de bloques de código
  // Buscar bloques ``` y limpiarlos
  result = result.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    // Limpiar el código de caracteres extraños
    let cleanCode = code
      .replace(/\u001b\[[0-9;]*m/g, '') // Remover códigos ANSI
      .replace(/\[[\d;]*m/g, '') // Remover más códigos de color
      .trim();

    return '```' + lang + '\n' + cleanCode + '\n```';
  });

  // Convertir pseudo-diagramas a infografías ASCII mejoradas
  result = result.replace(/```\n((?:[\s│├└┌┐┘┬┴├┤─┼\-\|+*><=\[\](){}:]+\n?)+)```/g, (match, diagram) => {
    return '```\n' + diagram.trim() + '\n```';
  });

  return result;
}

// Crear infografías ASCII para secciones clave
function addInfographics(content, category) {
  let result = content;

  // No añadir si ya tiene muchas infografías
  const infographicCount = (result.match(/```[\s\S]*?```/g) || []).length;
  if (infographicCount > 10) return result;

  // Añadir infografía de resumen al inicio si no existe
  if (!result.includes('## Quick Summary') && !result.includes('## Resumen Rápido')) {
    // Buscar la primera sección después de la introducción
    const introEnd = result.indexOf('## ', result.indexOf('## ') + 3);
    if (introEnd > 0) {
      let summaryBox = '';

      if (category === 'Consultoria Solar') {
        summaryBox = `
## 📊 Quick Reference

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  SOLAR PROJECT KEY METRICS                              │
├─────────────────────────────────────────────────────────┤
│  ☀️ Typical System Size:    5-500 kW (Commercial)      │
│  💰 Investment Range:       US$2.50-3.50/W installed   │
│  📈 ROI Timeline:           3-7 years                   │
│  ⚡ Energy Savings:         50-80% of electricity bill  │
│  🔧 System Lifespan:        25-30 years                 │
│  📞 Contact:                +1 (609) 222 0687           │
└─────────────────────────────────────────────────────────┘
\`\`\`

`;
      } else if (category === 'Gestion Energetica') {
        summaryBox = `
## 📊 Quick Reference

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  ISO 50001 IMPLEMENTATION KEY METRICS                   │
├─────────────────────────────────────────────────────────┤
│  💰 Typical Savings:        15-25% energy costs         │
│  📈 ROI Timeline:           12-24 months                │
│  ⏱️ Implementation:         6-12 months                 │
│  ✅ Certification:          3-year cycle                │
│  🏢 Best For:               Manufacturing, Commercial   │
│  📞 Contact:                +1 (609) 222 0687           │
└─────────────────────────────────────────────────────────┘
\`\`\`

`;
      } else if (category === 'Energia Renovable') {
        summaryBox = `
## 📊 Quick Reference

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  RENEWABLE ENERGY KEY METRICS                           │
├─────────────────────────────────────────────────────────┤
│  ☀️ Solar Capacity Factor:  15-25% (US average)        │
│  💨 Wind Capacity Factor:   25-45% (location dependent) │
│  🔋 Storage Costs:          US$150-300/kWh (2025)      │
│  📈 Market Growth:          15-20% annually             │
│  🌍 Carbon Offset:          0.4-0.5 kg CO2/kWh         │
│  📞 Contact:                +1 (609) 222 0687           │
└─────────────────────────────────────────────────────────┘
\`\`\`

`;
      } else if (category === 'Formacion') {
        summaryBox = `
## 📊 Quick Reference

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  SOLAR CERTIFICATION KEY INFO                           │
├─────────────────────────────────────────────────────────┤
│  🎓 NABCEP PV Associate:    Entry-level credential     │
│  🏆 NABCEP Installer:       Professional certification  │
│  💰 Salary Increase:        15-30% with certification   │
│  📈 Job Growth:             52% through 2030 (BLS)      │
│  ⏱️ Study Time:             40-80 hours typical         │
│  📞 Contact:                +1 (609) 222 0687           │
└─────────────────────────────────────────────────────────┘
\`\`\`

`;
      }

      if (summaryBox) {
        result = result.slice(0, introEnd) + summaryBox + result.slice(introEnd);
      }
    }
  }

  return result;
}

// Actualizar CTA al final
function updateCTA(content, category) {
  // Remover CTAs existentes
  let result = content;

  // Patrones de CTAs a eliminar
  const ctaPatterns = [
    /\n---\s*\n\s*##\s*¿[^\n]+\n[\s\S]*$/,
    /\n---\s*\n\s*##\s*CTA[^\n]*\n[\s\S]*$/,
    /\n\nEn \*\*ITER Energy Solutions\*\*[\s\S]*$/,
  ];

  for (const pattern of ctaPatterns) {
    result = result.replace(pattern, '');
  }

  result = result.trim();

  // Nuevo CTA mejorado con infografía
  const ctaTemplates = {
    'Consultoria Solar': `

---

## 🚀 Ready to Start Your Solar Project?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    ITER ENERGY SOLUTIONS                │
│              Your Solar Engineering Partner             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ☀️ Feasibility Studies    ⚡ System Design           │
│   🔧 QA/QC Audits           📊 Performance Analysis    │
│   📋 Permitting Support     🎓 Training Programs       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📞 CALL US: ${CONTACT_INFO.phone}                      │
│  📧 EMAIL:   ${CONTACT_INFO.email}                │
│  🌐 WEB:     iterenergy.com                             │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Our team of certified engineers is ready to help you maximize your solar investment.**

[**Request a Free Consultation →**](/contacto)
`,
    'Gestion Energetica': `

---

## 🚀 Ready to Reduce Your Energy Costs?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    ITER ENERGY SOLUTIONS                │
│            ISO 50001 Implementation Experts             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   📊 Energy Audits          ⚡ EnMS Implementation      │
│   🎯 EnPI Development       📋 ISO 50001 Certification │
│   💰 Cost Reduction         🔧 Continuous Improvement  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📞 CALL US: ${CONTACT_INFO.phone}                      │
│  📧 EMAIL:   ${CONTACT_INFO.email}                │
│  🌐 WEB:     iterenergy.com                             │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Our certified consultants have helped companies save 15-25% on energy costs.**

[**Schedule Your Energy Assessment →**](/contacto)
`,
    'Energia Renovable': `

---

## 🚀 Interested in Renewable Energy Solutions?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    ITER ENERGY SOLUTIONS                │
│           Comprehensive Renewable Energy Services       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ☀️ Solar PV Systems       🔋 Battery Storage (BESS) │
│   💨 Wind Integration       ⚡ Grid Interconnection    │
│   📊 Resource Assessment    📋 Project Development     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📞 CALL US: ${CONTACT_INFO.phone}                      │
│  📧 EMAIL:   ${CONTACT_INFO.email}                │
│  🌐 WEB:     iterenergy.com                             │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Let us help you navigate the renewable energy transition.**

[**Explore Our Solutions →**](/contacto)
`,
    'Formacion': `

---

## 🚀 Ready to Advance Your Career in Renewable Energy?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    ITER ENERGY SOLUTIONS                │
│          Professional Training & Certification          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   🎓 NABCEP Prep Courses    📚 Technical Workshops     │
│   ⚡ Hands-On Training      📋 Certification Support   │
│   🏢 Corporate Programs     🌐 Online Learning         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📞 CALL US: ${CONTACT_INFO.phone}                      │
│  📧 EMAIL:   ${CONTACT_INFO.email}                │
│  🌐 WEB:     iterenergy.com                             │
└─────────────────────────────────────────────────────────┘
\`\`\`

**Join thousands of professionals who have advanced their careers with our training programs.**

[**View Training Programs →**](/contacto)
`
  };

  const cta = ctaTemplates[category] || ctaTemplates['Consultoria Solar'];
  return result + cta;
}

// Función principal para procesar un artículo
function processArticle(content, category) {
  let result = content;

  // 1. Convertir moneda
  result = convertCurrency(result);

  // 2. Adaptar al mercado americano
  result = adaptToUSMarket(result);

  // 3. Mejorar bloques de código
  result = improveCodeBlocks(result);

  // 4. Añadir infografías
  result = addInfographics(result, category);

  // 5. Actualizar CTA
  result = updateCTA(result, category);

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
  console.log('🔧 Corrección Comprehensiva de Artículos del Blog\n');
  console.log('='.repeat(70) + '\n');
  console.log('📋 Cambios a realizar:');
  console.log('   1. Convertir € a US$ (tasa 1.10)');
  console.log('   2. Adaptar contenido al mercado americano');
  console.log('   3. Mejorar formato de bloques de código');
  console.log('   4. Añadir infografías Quick Reference');
  console.log('   5. Actualizar CTAs con información de contacto\n');
  console.log('='.repeat(70) + '\n');

  const articles = await getArticles();
  console.log(`📚 Total de artículos a procesar: ${articles.length}\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const num = i + 1;

    console.log(`\n[${num}/${articles.length}] ${article.title.substring(0, 50)}...`);
    console.log(`   Categoría: ${article.category}`);

    try {
      // Procesar contenido
      const originalLength = article.content.length;
      const processedContent = processArticle(article.content, article.category);
      const newLength = processedContent.length;

      // Contar cambios de moneda
      const eurosBefore = (article.content.match(/€/g) || []).length;
      const eurosAfter = (processedContent.match(/€/g) || []).length;
      const dollarsAdded = (processedContent.match(/US\$/g) || []).length;

      console.log(`   Euros convertidos: ${eurosBefore} → ${eurosAfter} (${dollarsAdded} US$ añadidos)`);
      console.log(`   Tamaño: ${originalLength} → ${newLength} caracteres`);

      // Actualizar en Supabase
      const success = await updateArticle(article.id, processedContent);

      if (success) {
        console.log(`   ✅ Actualizado correctamente`);
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

  console.log('\n' + '='.repeat(70));
  console.log('\n📊 RESUMEN FINAL:\n');
  console.log(`   ✅ Artículos actualizados: ${updated}`);
  console.log(`   ❌ Errores: ${errors}`);
  console.log(`   📚 Total procesados: ${articles.length}`);
  console.log('\n🎯 Cambios aplicados:');
  console.log('   💰 Moneda: € → US$');
  console.log('   🇺🇸 Mercado: Adaptado a USA');
  console.log('   📊 Infografías: Añadidas');
  console.log('   📞 CTAs: Actualizados');
}

main().catch(console.error);
