/**
 * Knowledge Base para el Agente de Ventas de ITER
 * Contiene información técnica sobre ISO 50001, sistemas fotovoltaicos,
 * servicios, y estrategias de venta
 */

export const KNOWLEDGE_BASE = {
  // Información sobre la empresa
  company: {
    name: 'ITER',
    description: 'Empresa líder en consultoría solar, gestión energética y formación profesional',
    experience: 'Más de 10 años de experiencia',
    countries: '5 países de operación (Ecuador, Costa Rica, Nicaragua, Honduras, EE.UU.)',
    projects: 'Más de 50 proyectos completados en 5 países',
    certifications: ['ISO 50001 Consulting', 'SEI', 'NABCEP'],
    clients: ['Pronaca', 'Ferrero Ecuador', 'EEQ'],
  },

  // ISO 50001 - Sistema de Gestión de Energía
  iso50001: {
    overview: {
      name: 'ISO 50001:2018',
      description: 'Norma internacional para Sistemas de Gestión de la Energía (SGEn)',
      purpose: 'Ayuda a las organizaciones a establecer sistemas y procesos para mejorar continuamente el desempeño energético',
      benefits: [
        'Reducción de costos energéticos hasta 20% anual',
        'Mejora en la eficiencia energética',
        'Cumplimiento de requisitos legales y reglamentarios',
        'Reducción de emisiones de gases de efecto invernadero',
        'Mejora en la competitividad empresarial',
        'Demostración de liderazgo en sostenibilidad',
      ],
    },
    structure: {
      clauses: [
        { number: '4', name: 'Contexto de la organización', description: 'Entender la organización y su contexto' },
        { number: '5', name: 'Liderazgo', description: 'Compromiso de la alta dirección y política energética' },
        { number: '6', name: 'Planificación', description: 'Planificación energética y objetivos' },
        { number: '7', name: 'Soporte', description: 'Recursos, competencia, concienciación y comunicación' },
        { number: '8', name: 'Operación', description: 'Control operacional y diseño' },
        { number: '9', name: 'Evaluación del desempeño', description: 'Seguimiento, medición, análisis y evaluación' },
        { number: '10', name: 'Mejora', description: 'No conformidades y mejora continua' },
      ],
      pdca: {
        plan: 'Realizar revisión energética, establecer baseline, indicadores y objetivos',
        do: 'Implementar planes de acción de energía',
        check: 'Monitorear y medir procesos, reportar resultados',
        act: 'Tomar acciones para mejorar continuamente el desempeño energético',
      },
    },
    implementation: {
      phases: [
        'Diagnóstico inicial y compromiso de la dirección',
        'Formación del equipo de energía',
        'Revisión energética y determinación del baseline',
        'Identificación de usos significativos de energía (USEs)',
        'Establecimiento de indicadores de desempeño energético (IDEns)',
        'Definición de objetivos y metas energéticas',
        'Implementación de planes de acción',
        'Auditoría interna',
        'Revisión por la dirección',
        'Certificación externa',
      ],
      duration: '6-12 meses dependiendo del tamaño y complejidad de la organización',
      investment: 'Retorno de inversión típico: 1-3 años',
    },
    technical: {
      uses: 'Usos Significativos de Energía - Actividades que consumen cantidades significativas de energía',
      idens: 'Indicadores de Desempeño Energético - Métricas cuantitativas del desempeño energético',
      baseline: 'Línea Base Energética - Referencia cuantitativa para comparar el desempeño energético',
      enpi: 'Energy Performance Indicator - Ratio de consumo energético vs variable relevante',
      variables: ['Producción', 'Área', 'Ocupación', 'Grados-día', 'Horas de operación'],
    },
  },

  // Sistemas Fotovoltaicos
  photovoltaic: {
    overview: {
      description: 'Sistemas que convierten la radiación solar directamente en electricidad mediante el efecto fotovoltaico',
      types: [
        {
          name: 'On-Grid (Conectado a red)',
          description: 'Sistema conectado a la red eléctrica, sin baterías',
          advantages: ['Menor inversión inicial', 'No requiere baterías', 'Permite venta de excedentes'],
          applications: 'Industrias, comercios, residencias con conexión a red',
        },
        {
          name: 'Off-Grid (Aislado)',
          description: 'Sistema autónomo con banco de baterías',
          advantages: ['Independencia energética', 'Funciona sin red eléctrica'],
          applications: 'Zonas rurales, telecomunicaciones, bombeo solar',
        },
        {
          name: 'Híbrido',
          description: 'Combina conexión a red con respaldo de baterías',
          advantages: ['Respaldo ante cortes', 'Optimización de autoconsumo', 'Gestión inteligente'],
          applications: 'Instalaciones críticas, hospitales, data centers',
        },
      ],
    },
    components: {
      panels: {
        types: ['Monocristalinos (20-22% eficiencia)', 'Policristalinos (15-18% eficiencia)', 'Capa fina (10-12% eficiencia)'],
        degradation: '0.5-0.7% anual',
        warranty: '25-30 años rendimiento, 10-12 años producto',
        standards: ['IEC 61215', 'IEC 61730', 'UL 1703'],
      },
      inverters: {
        types: ['String inverters', 'Microinverters', 'Power optimizers', 'Central inverters'],
        efficiency: '95-98%',
        warranty: '5-15 años',
        functions: ['Conversión DC/AC', 'MPPT', 'Monitoreo', 'Protección'],
      },
      structure: {
        types: ['Montaje en techo', 'Montaje en suelo', 'Carport solar', 'Integrado (BIPV)'],
        materials: ['Aluminio (costa)', 'Acero galvanizado (interior)', 'Acero inoxidable (alta corrosión)'],
        standards: ['ASCE 7', 'IBC', 'Eurocode 1'],
      },
      protection: {
        devices: ['String fuses', 'DC/AC disconnect', 'Surge protection', 'Ground fault detection'],
        earthing: 'Sistema de puesta a tierra según NEC Article 690',
      },
    },
    design: {
      sizing: {
        factors: ['Consumo energético', 'Radiación solar local', 'Ángulo e inclinación', 'Sombreado'],
        tools: ['PVsyst', 'SAM', 'Helioscope', 'SketchUp + plugin solar'],
        performance_ratio: '75-85% típico para sistemas bien diseñados',
      },
      regulations: {
        international: ['IEC 61724', 'IEC 62446', 'IEC 60364'],
        usa: ['NEC Article 690', 'IEEE 1547', 'UL 1741'],
        simulation: 'Usar datos de radiación de NASA SSE, Meteonorm o estaciones locales',
      },
    },
    economics: {
      capex: '$800-1200/kWp instalado (varía por país y escala)',
      opex: '1-2% del CAPEX anual',
      lcoe: '$0.03-0.08/kWh dependiendo de la radiación y financiamiento',
      payback: '4-8 años típico',
      irr: '12-20% dependiendo del precio de electricidad',
    },
  },

  // Servicios de ITER
  services: {
    energyManagement: {
      name: 'Gestión Energética ISO 50001',
      description: 'Implementación y certificación completa del Sistema de Gestión de Energía',
      deliverables: [
        'Diagnóstico energético inicial',
        'Política y objetivos energéticos',
        'Revisión energética completa',
        'Identificación de USEs e IDEns',
        'Planes de acción energética',
        'Procedimientos y registros del SGEn',
        'Formación al equipo',
        'Auditoría interna',
        'Acompañamiento en auditoría de certificación',
      ],
      benefits: 'Ahorro energético promedio de 15-20% en los primeros 3 años',
      duration: '6-9 meses',
      investment: 'Desde $8,000 USD dependiendo del tamaño de la organización',
    },
    solarConsulting: {
      name: 'Consultoría Solar',
      description: 'Asesoría técnica integral para proyectos fotovoltaicos',
      services: [
        'Evaluación de viabilidad técnica y económica',
        'Diseño conceptual y de detalle',
        'Ingeniería básica y de detalle',
        'Due diligence técnico',
        'Supervisión de construcción',
        'Puesta en marcha y comisionamiento',
        'O&M consultancy',
      ],
      expertise: 'Proyectos desde 10kWp residencial hasta 50MWp utility-scale',
      track_record: 'Más de 100MW en proyectos asesorados',
    },
    training: {
      name: 'Formación y Capacitación',
      courses: [
        {
          name: 'Auditor Interno ISO 50001',
          duration: '16 horas',
          certification: 'Certificado de auditor interno',
          content: 'Requisitos de la norma, técnicas de auditoría, casos prácticos',
        },
        {
          name: 'Diseño de Sistemas Fotovoltaicos',
          duration: '24 horas',
          certification: 'Certificado de diseñador fotovoltaico',
          content: 'Radiación solar, sizing, diseño eléctrico, software de simulación',
        },
        {
          name: 'Gestión Energética Práctica',
          duration: '12 horas',
          content: 'Revisión energética, IDEns, planes de acción, monitoring & targeting',
        },
      ],
      modality: 'Presencial, virtual o híbrido',
      customization: 'Cursos personalizados según necesidades del cliente',
    },
  },

  // Estrategia de ventas y objeciones
  sales: {
    value_proposition: {
      differentiators: [
        'Experiencia internacional comprobada',
        'Equipo técnico altamente calificado',
        'Enfoque en resultados medibles',
        'Acompañamiento completo desde diagnóstico hasta certificación',
        'Casos de éxito con empresas líderes',
        'Metodología probada',
      ],
      guarantees: 'Garantizamos ahorro energético medible o devolvemos la inversión',
    },
    common_objections: {
      price: {
        objection: 'Es muy caro / No tengo presupuesto',
        response: 'Entiendo su preocupación. Sin embargo, la implementación de ISO 50001 no es un gasto, sino una inversión. Nuestros clientes recuperan la inversión en 12-18 meses a través del ahorro energético. Por ejemplo, Pronaca logró un ahorro del 18% anual, lo que representa más de $150,000 USD al año. ¿Le gustaría que calculemos el potencial de ahorro en su organización?',
      },
      time: {
        objection: 'No tenemos tiempo / Estamos muy ocupados',
        response: 'Precisamente por eso diseñamos nuestro servicio para minimizar el impacto en sus operaciones. Nosotros hacemos el trabajo pesado y solo necesitamos de 2-3 horas semanales de su equipo. Además, el tiempo invertido se recupera con creces mediante procesos más eficientes. ¿Qué tal si comenzamos con un diagnóstico rápido de 2 horas para identificar quick wins?',
      },
      priority: {
        objection: 'No es prioritario ahora / Tal vez el próximo año',
        response: 'Comprendo que tienen otras prioridades. Sin embargo, cada mes que pasa sin optimizar su energía está perdiendo dinero. Si su potencial de ahorro es del 15%, y su factura energética es de $10,000 mensuales, está perdiendo $1,500 cada mes que no actúa. ¿No sería mejor empezar ahora con un diagnóstico sin compromiso para conocer su potencial real de ahorro?',
      },
      certification: {
        objection: 'No necesitamos la certificación',
        response: 'La certificación ISO 50001 es más que un papel. Es la demostración objetiva ante clientes, reguladores y stakeholders de su compromiso con la sostenibilidad. Muchos clientes internacionales ahora requieren ISO 50001 de sus proveedores. Además, la certificación le da acceso a incentivos fiscales y financiamiento verde. Sin embargo, si prefiere, podemos comenzar solo con la implementación del sistema para obtener los ahorros, y certificar más adelante.',
      },
      inhouse: {
        objection: 'Podemos hacerlo internamente',
        response: 'Es excelente que tengan un equipo capacitado. Sin embargo, la implementación de ISO 50001 requiere expertise específico en metodologías de gestión energética que puede tomar años desarrollar internamente. Nosotros ya hemos recorrido este camino con más de 15 organizaciones certificadas. Podemos transferir ese conocimiento a su equipo en meses, evitando errores costosos y asegurando el éxito desde el principio. ¿Qué tal si trabajamos juntos y fortalecemos a su equipo en el proceso?',
      },
    },
    qualifying_questions: [
      '¿Cuál es su gasto energético mensual aproximado?',
      '¿Ha realizado alguna evaluación energética previamente?',
      '¿Cuál es el principal motivador: ahorro de costos, sostenibilidad o cumplimiento?',
      '¿Tienen requisitos de clientes o reguladores para ISO 50001?',
      '¿Cuándo les gustaría ver resultados?',
      '¿Quién toma la decisión final sobre este tipo de proyectos?',
      '¿Cuál es su presupuesto aproximado para este proyecto?',
    ],
  },

  // Respuestas frecuentes
  faq: {
    '¿Cuánto tiempo toma la implementación de ISO 50001?':
      'Típicamente 6-9 meses desde el inicio hasta la auditoría de certificación. El tiempo exacto depende del tamaño de la organización, complejidad de los procesos y disponibilidad del equipo. Podemos ofrecerle un cronograma detallado después del diagnóstico inicial.',

    '¿Qué ahorro energético puedo esperar?':
      'Nuestros clientes logran en promedio un 15-20% de ahorro energético en los primeros 3 años. Sin embargo, el ahorro específico depende del estado actual de eficiencia energética. Empresas que nunca han trabajado en eficiencia pueden ver ahorros de hasta 30-40%, mientras que organizaciones con programas previos pueden lograr 10-15%.',

    '¿Necesito contratar personal adicional?':
      'No necesariamente. La norma requiere designar un responsable del SGEn, pero puede ser alguien de su equipo actual con dedicación parcial. Nosotros proveemos la capacitación necesaria. Para organizaciones grandes puede ser beneficioso tener un equipo dedicado, pero lo evaluamos caso por caso.',

    '¿Cuál es la diferencia entre ISO 50001 y una auditoría energética?':
      'Una auditoría energética es un diagnóstico puntual que identifica oportunidades de ahorro. ISO 50001 es un sistema de gestión continuo que asegura mejora constante del desempeño energético. La auditoría es parte de ISO 50001, pero el sistema va mucho más allá al institucionalizar la gestión energética en la cultura organizacional.',

    '¿Puedo implementar ISO 50001 si ya tengo ISO 9001 o ISO 14001?':
      '¡Excelente! Si ya tienen otros sistemas ISO, la implementación de ISO 50001 será más rápida. Las normas tienen estructura similar (High Level Structure) y muchos elementos comunes. Podemos integrar los sistemas para mayor eficiencia.',

    '¿Ofrecen financiamiento?':
      'Trabajamos con varios bancos y entidades de desarrollo que ofrecen financiamiento verde para proyectos de eficiencia energética. Podemos ayudarle a acceder a estas líneas de crédito preferenciales. En algunos casos, el ahorro energético puede financiar las cuotas del crédito.',
  },

  // Contacto y siguiente paso
  contact: {
    scheduling: {
      options: [
        'Diagnóstico energético gratuito (2 horas)',
        'Llamada de evaluación (30 minutos)',
        'Visita técnica a sus instalaciones',
        'Presentación ejecutiva (1 hora)',
      ],
      process: 'Para agendar, necesitamos: Nombre completo, Empresa, Cargo, Email, Teléfono, Fecha y hora preferida',
    },
    lead_capture: {
      required_fields: ['name', 'company', 'email', 'phone'],
      optional_fields: ['position', 'monthly_energy_cost', 'motivation', 'preferred_date'],
      followup: 'Nos comunicaremos en menos de 24 horas para confirmar la cita',
    },
  },
}

export const AGENT_PERSONALITY = {
  tone: 'profesional, consultivo, entusiasta pero no agresivo',
  approach: 'escuchar primero, entender necesidades, ofrecer valor',
  language: 'técnico cuando sea necesario, pero siempre claro y accesible',
  goal: 'construir confianza, educar, y guiar al prospecto hacia una consulta',
  values: ['honestidad', 'transparencia', 'enfoque en resultados', 'excelencia técnica'],
}
