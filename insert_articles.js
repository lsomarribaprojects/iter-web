// Script para insertar artículos del blog en Supabase
const SUPABASE_URL = 'https://vooiilliyoiagunibske.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvb2lpbGxpeW9pYWd1bmlic2tlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg1NDIyNSwiZXhwIjoyMDgyNDMwMjI1fQ.U9D9kc1kzIzquHQVXtb6jvi78i1Ei4t9Sms1GoCWc44';

const articles = [
  {
    title: "Como Reducir un 18% los Costos Energeticos con ISO 50001",
    slug: "reducir-costos-energeticos-iso-50001",
    excerpt: "Descubre la metodologia que utilizamos para ayudar a empresas industriales a implementar sistemas de gestion energetica.",
    content: "# Como Reducir Costos Energeticos\\n\\nLa norma ISO 50001 es el estandar internacional para sistemas de gestion energetica...",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    category: "Gestion Energetica",
    tags: ["ISO 50001", "eficiencia energetica", "ahorro"],
    author: "ITER Energy Solutions",
    read_time: "12 min",
    published: true,
    language: "es",
    published_at: "2024-11-15T10:00:00Z"
  },
  {
    title: "Auditorias QA/QC en Proyectos Solares: Caso de Exito 50MW",
    slug: "auditorias-qa-qc-proyectos-solares",
    excerpt: "La historia de como una auditoria independiente detecto defectos criticos y salvo millones en un proyecto solar.",
    content: "# Auditorias QA/QC en Proyectos Solares\\n\\nRecibimos una llamada urgente de un inversionista preocupado...",
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
    category: "Consultoria Solar",
    tags: ["QA/QC", "solar", "auditoria", "due diligence"],
    author: "ITER Energy Solutions",
    read_time: "10 min",
    published: true,
    language: "es",
    published_at: "2024-10-20T10:00:00Z"
  },
  {
    title: "Certificacion SEI y NABCEP: Transforma tu Carrera en Energia Solar",
    slug: "certificacion-sei-nabcep-carrera-solar",
    excerpt: "Testimonios reales de profesionales que transformaron su carrera con la certificacion de Solar Energy International.",
    content: "# Certificacion SEI y NABCEP\\n\\nLa mejor inversion en mi carrera - asi describe Roberto su decision...",
    image_url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop",
    category: "Formacion",
    tags: ["SEI", "NABCEP", "certificacion", "capacitacion"],
    author: "ITER Energy Solutions",
    read_time: "8 min",
    published: true,
    language: "es",
    published_at: "2024-09-10T10:00:00Z"
  },
  {
    title: "Fabrica Textil Reduce $180,000 USD Anuales en Energia",
    slug: "fabrica-textil-ahorro-energia",
    excerpt: "El paso a paso de un proyecto de eficiencia energetica que transformo una planta industrial.",
    content: "# Caso de Exito: Fabrica Textil\\n\\nNuestros competidores asiaticos nos estan sacando del mercado...",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    category: "Gestion Energetica",
    tags: ["eficiencia", "industrial", "ahorro", "caso de exito"],
    author: "ITER Energy Solutions",
    read_time: "10 min",
    published: true,
    language: "es",
    published_at: "2024-08-05T10:00:00Z"
  },
  {
    title: "Guia de Diseno de Sistemas Fotovoltaicos Comerciales",
    slug: "diseno-sistemas-fotovoltaicos-comerciales",
    excerpt: "Todo lo que necesitas saber para disenar sistemas solares para empresas e industrias.",
    content: "# Diseno de Sistemas Fotovoltaicos Comerciales\\n\\nEl diseno de sistemas fotovoltaicos comerciales requiere...",
    image_url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop",
    category: "Consultoria Solar",
    tags: ["fotovoltaico", "comercial", "diseno", "ingenieria"],
    author: "ITER Energy Solutions",
    read_time: "15 min",
    published: true,
    language: "es",
    published_at: "2024-07-15T10:00:00Z"
  },
  {
    title: "Tendencias en Energia Renovable para 2025",
    slug: "tendencias-energia-renovable-2025",
    excerpt: "Las principales tendencias que marcaran el sector de energias renovables en el proximo ano.",
    content: "# Tendencias en Energia Renovable 2025\\n\\nEl sector de energias renovables continua su crecimiento exponencial...",
    image_url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
    category: "Energia Renovable",
    tags: ["tendencias", "2025", "renovables", "futuro"],
    author: "ITER Energy Solutions",
    read_time: "8 min",
    published: true,
    language: "es",
    published_at: "2024-12-01T10:00:00Z"
  },
  {
    title: "Mantenimiento Preventivo de Plantas Solares",
    slug: "mantenimiento-preventivo-plantas-solares",
    excerpt: "Guia completa para el mantenimiento preventivo de instalaciones fotovoltaicas.",
    content: "# Mantenimiento Preventivo de Plantas Solares\\n\\nUn programa de mantenimiento preventivo adecuado...",
    image_url: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&h=500&fit=crop",
    category: "Consultoria Solar",
    tags: ["mantenimiento", "O&M", "preventivo", "solar"],
    author: "ITER Energy Solutions",
    read_time: "11 min",
    published: true,
    language: "es",
    published_at: "2024-06-20T10:00:00Z"
  },
  {
    title: "Almacenamiento de Energia con Baterias: BESS",
    slug: "almacenamiento-energia-baterias-bess",
    excerpt: "Todo sobre sistemas de almacenamiento de energia con baterias para aplicaciones comerciales.",
    content: "# Almacenamiento de Energia con Baterias\\n\\nLos sistemas de almacenamiento de energia con baterias (BESS)...",
    image_url: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&h=500&fit=crop",
    category: "Energia Renovable",
    tags: ["baterias", "BESS", "almacenamiento", "litio"],
    author: "ITER Energy Solutions",
    read_time: "13 min",
    published: true,
    language: "es",
    published_at: "2024-05-10T10:00:00Z"
  }
];

async function insertArticles() {
  for (const article of articles) {
    try {
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

      if (response.ok) {
        console.log(`✅ Inserted: ${article.title}`);
      } else {
        const error = await response.text();
        console.log(`❌ Error inserting ${article.title}: ${error}`);
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }
  console.log('\\n🎉 Done!');
}

insertArticles();
