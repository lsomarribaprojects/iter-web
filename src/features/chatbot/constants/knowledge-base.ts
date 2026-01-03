/**
 * Knowledge Base para VOLT - Agente de IA de ITER Energy Solutions
 * Experto en ISO 50001, Sistemas Fotovoltaicos y NEC (National Electrical Code)
 */

export const KNOWLEDGE_BASE = {
  // Información sobre la empresa
  company: {
    name: 'ITER Energy Solutions',
    description: 'Consultora líder en energía solar, gestión energética ISO 50001 y formación profesional',
    experience: 'Más de 10 años de experiencia',
    countries: '5 países de operación (Ecuador, Costa Rica, Nicaragua, Honduras, EE.UU.)',
    projects: 'Más de 50 proyectos completados en 5 países',
    certifications: ['ISO 50001 Consulting', 'SEI Accredited', 'NABCEP'],
    clients: ['Pronaca', 'Ferrero Ecuador', 'EEQ'],
    contact: {
      phone: '+1 (609) 222 0687',
      email: 'engineering@iterge.com',
      location: 'Iowa, USA',
    },
  },

  // ISO 50001 - Sistema de Gestión de Energía
  iso50001: {
    overview: {
      name: 'ISO 50001:2018',
      description: 'Norma internacional para Sistemas de Gestión de la Energía (SGEn)',
      purpose: 'Establece sistemas y procesos para mejorar continuamente el desempeño energético',
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
        'Establecimiento de indicadores de desempeño energético (IDEns/EnPIs)',
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

  // NEC - National Electrical Code
  nec: {
    overview: {
      name: 'NFPA 70 - National Electrical Code',
      description: 'Código eléctrico nacional de EE.UU. que establece requisitos de seguridad para instalaciones eléctricas',
      adoption: 'Adoptado por la mayoría de estados de EE.UU. y varios países de Latinoamérica',
      article690: 'Article 690 - Solar Photovoltaic (PV) Systems',
      article705: 'Article 705 - Interconnected Electric Power Production Sources',
      article706: 'Article 706 - Energy Storage Systems',
    },

    // NEC 2020
    nec2020: {
      version: 'NEC 2020 (NFPA 70-2020)',
      effectiveDate: 'Efectivo desde 2020',
      keyChanges: [
        'Article 690.12 - Rapid Shutdown of PV Systems on Buildings: Módulos deben reducir voltaje a 80V o menos en 30 segundos',
        'Article 690.13 - PV System Disconnecting Means: Desconectores accesibles y claramente marcados',
        'Article 690.15 - Disconnection of PV Equipment: Requisitos para desconexión segura',
        'Article 690.41 - System Grounding: Opción de sistema flotante (ungrounded) o grounded',
        'Article 690.47 - Grounding Electrode System: Requisitos de electrodos de tierra',
        'Article 705.12 - Point of Interconnection: Regla del 120% para interconexión en Load Side',
      ],
      rapidShutdown: {
        requirement: 'Los módulos PV en edificios deben poder reducir voltaje a 80V o menos en 30 segundos cuando se activa el rapid shutdown',
        controlledArea: 'Área a 1 pie del arreglo PV o debajo del techo',
        methods: ['Module-Level Power Electronics (MLPE)', 'String inverters con rapid shutdown integrado'],
        exceptions: ['Sistemas ground-mounted', 'Instalaciones en estructuras no habitables'],
      },
      wireAmpacity: {
        article690_8: 'Cálculo de ampacidad: Isc × 1.25 × 1.25 = 156% de Isc',
        temperatureCorrection: 'Aplicar factores de corrección por temperatura según Table 310.15(B)(1)',
        conduitFill: 'Aplicar factores de ajuste por conductores en conduit según Table 310.15(C)(1)',
      },
      ocpd: {
        maxFuseRating: 'El fusible de string no debe exceder el rating del módulo (típicamente 15A o 20A)',
        seriesFuseRating: 'Para strings en paralelo: Rating módulo × número de strings - 1',
        breakerRating: 'AC breaker sizing: Inverter max output current × 1.25',
      },
    },

    // NEC 2023
    nec2023: {
      version: 'NEC 2023 (NFPA 70-2023)',
      effectiveDate: 'Efectivo desde 2023',
      keyChanges: [
        'Article 690.12 - Rapid Shutdown actualizado: Nuevos requisitos para sistemas en edificios',
        'Article 690.31(G) - DC Arc-Fault Protection: Obligatorio para sistemas en edificios residenciales',
        'Article 690.41(B) - System Grounding: Clarificación para sistemas con transformadores',
        'Article 706 - Energy Storage Systems: Requisitos expandidos para baterías',
        'Article 705.12(B)(2) - Supply-Side Connection: Nuevas opciones de interconexión',
        'Article 712 - Direct Current Microgrids: Nuevo artículo para microgrids DC',
      ],
      arcFaultProtection: {
        requirement: 'Sistemas PV en edificios residenciales (dwelling units) requieren protección arc-fault DC',
        detection: 'El sistema debe detectar y interrumpir arcos en el lado DC',
        standards: 'Equipos deben cumplir UL 1699B',
        exceptions: ['Sistemas con MLPE certificados', 'Microinversores con protección integrada'],
      },
      batteryStorage: {
        article706: 'Requisitos ampliados para Energy Storage Systems (ESS)',
        disconnects: 'Desconectores requeridos para cada sistema de baterías',
        ventilation: 'Requisitos de ventilación para baterías en espacios cerrados',
        spacing: 'Requisitos de espaciamiento entre baterías para disipación de calor',
        listingRequirements: 'Baterías y BMS deben estar listados (UL 9540, UL 9540A)',
      },
      interconnection: {
        loadSide: 'Article 705.12(B)(2): Capacidad de backfeed no debe exceder 120% del busbar rating',
        supplySide: 'Article 705.12(A): Conexión supply-side sin límite de capacidad si cumple requisitos',
        microgrids: 'Article 712: Nuevos requisitos para microgrids DC',
      },
    },

    // NEC 2026 (Propuesto/Anticipado)
    nec2026: {
      version: 'NEC 2026 (NFPA 70-2026) - En desarrollo',
      expectedDate: 'Esperado para publicación en 2025, efectivo 2026',
      anticipatedChanges: [
        'Requisitos más estrictos para sistemas de almacenamiento de energía',
        'Actualización de Article 690 para nuevas tecnologías de módulos (bifaciales, HJT)',
        'Expansión de Article 712 para microgrids más complejos',
        'Nuevos requisitos para sistemas V2G (Vehicle-to-Grid)',
        'Integración con estándares de ciberseguridad para sistemas conectados',
        'Requisitos actualizados para rapid shutdown con tecnologías emergentes',
      ],
      batteryExpansion: {
        anticipatedChanges: 'Se esperan requisitos más detallados para diferentes químicas de batería (LFP, NMC, sodium-ion)',
        safetyEnhancements: 'Nuevos requisitos de seguridad basados en incidentes reportados',
        recyclingConsiderations: 'Posibles requisitos relacionados con disposición final',
      },
      emergingTech: {
        bifacialModules: 'Clarificación de requisitos para instalación de módulos bifaciales',
        microinverters: 'Actualizaciones para microinversores de nueva generación',
        powerOptimizers: 'Requisitos actualizados para optimizadores de potencia',
        hybridInverters: 'Nuevos requisitos para inversores híbridos (PV + batería)',
      },
    },

    // Comparación entre versiones
    comparison: {
      rapidShutdown: {
        nec2020: '80V en 30 segundos, área controlada 1 pie del arreglo',
        nec2023: 'Mismo requisito, clarificaciones adicionales',
        nec2026: 'Posibles cambios para nuevas tecnologías',
      },
      arcFault: {
        nec2020: 'Requerido para sistemas en edificios',
        nec2023: 'Obligatorio específicamente para residencias (dwelling units)',
        nec2026: 'Se esperan requisitos expandidos',
      },
      batteryStorage: {
        nec2020: 'Article 706 introducido',
        nec2023: 'Requisitos expandidos significativamente',
        nec2026: 'Se esperan más detalles para diferentes químicas',
      },
    },

    // Cálculos comunes
    calculations: {
      stringVoltage: {
        formula: 'Voc_string = Voc_stc × N_modules × Temp_correction',
        tempCorrection: 'Para temperaturas bajas: Voc aumenta ~0.3%/°C por debajo de 25°C',
        maxVoltage: 'NEC 690.7: Voltaje máximo de string no debe exceder el rating del inversor y del sistema (típicamente 600V o 1000V)',
      },
      ampacity: {
        formula: 'Ampacidad requerida = Isc × 1.25 × 1.25',
        explanation: 'Primer 1.25: Factor de corrección por radiación continua. Segundo 1.25: Factor NEC para cargas continuas',
      },
      ocpd: {
        formula: 'OCPD rating = Max series fuse rating del módulo',
        parallelStrings: 'Para strings en paralelo: (N_strings - 1) × Isc × 1.25',
      },
      groundingConductor: {
        egc: 'Equipment Grounding Conductor: Según Table 250.122 basado en OCPD',
        gec: 'Grounding Electrode Conductor: Según Table 250.66 basado en tamaño de conductores',
      },
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
          advantages: ['Menor inversión inicial', 'No requiere baterías', 'Permite net metering'],
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
        types: [
          'Monocristalinos (20-22% eficiencia) - Premium',
          'Policristalinos (17-19% eficiencia) - Económicos',
          'TOPCon (22-24% eficiencia) - Nueva generación',
          'HJT Heterojunction (23-25% eficiencia) - Alta eficiencia',
          'Bifaciales (ganancia 5-30% adicional)',
        ],
        degradation: '0.4-0.5% anual para módulos Tier 1',
        warranty: '25-30 años rendimiento (≥80%), 12-15 años producto',
        standards: ['IEC 61215', 'IEC 61730', 'UL 1703', 'UL 61730'],
      },
      inverters: {
        types: [
          'String inverters - Para sistemas medianos/grandes',
          'Microinverters - Module-level, ideal para sombras',
          'Power optimizers - DC/DC con inversor central',
          'Central inverters - Para utility-scale',
          'Hybrid inverters - Con gestión de baterías integrada',
        ],
        efficiency: '96-99% (ponderado CEC)',
        warranty: '10-25 años',
        functions: ['Conversión DC/AC', 'MPPT', 'Monitoreo', 'Protección', 'Grid support'],
      },
      structure: {
        types: ['Montaje en techo fijo', 'Montaje en suelo fijo', 'Trackers 1-eje', 'Trackers 2-ejes', 'Carport solar', 'BIPV'],
        materials: ['Aluminio 6005-T5 (costa/alta corrosión)', 'Acero galvanizado (interior)', 'Acero inoxidable 304/316'],
        standards: ['ASCE 7', 'IBC', 'UL 2703'],
      },
    },
    design: {
      sizing: {
        factors: ['Consumo energético anual', 'Radiación solar local (PSH)', 'Ángulo e inclinación óptimos', 'Análisis de sombras', 'Factor de disponibilidad del área'],
        tools: ['PVsyst', 'SAM (System Advisor Model)', 'Helioscope', 'Aurora Solar', 'PV*SOL'],
        performanceRatio: '80-85% para sistemas bien diseñados con string inverters, 82-88% con MLPE',
      },
      electrical: {
        stringSizing: 'Calcular número de módulos por string basado en Vmp, Voc y rangos del inverter',
        wireSizing: 'Dimensionar cables según NEC 690.8 (156% de Isc) con correcciones',
        grounding: 'Diseñar sistema de tierra según NEC 690.41-690.47 y Article 250',
        protection: 'Seleccionar OCPD según NEC 690.9, surge protection según NEC 690.35',
      },
    },
    economics: {
      capex: '$0.80-1.50/Wp instalado (utility-scale) | $1.50-3.00/Wp (comercial) | $2.50-4.00/Wp (residencial)',
      opex: '0.5-1.5% del CAPEX anual',
      lcoe: '$0.02-0.05/kWh utility | $0.04-0.08/kWh comercial | $0.06-0.12/kWh residencial',
      payback: '3-7 años (varía por tarifas y radiación)',
      irr: '10-25% dependiendo del mercado',
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
        'Diseño conceptual y de detalle (NEC compliant)',
        'Ingeniería básica y de detalle',
        'Due diligence técnico',
        'Revisión de diseños según NEC 2020/2023',
        'QA/QC durante construcción',
        'Puesta en marcha y comisionamiento',
        'O&M consultancy',
      ],
      expertise: 'Proyectos desde 10kWp residencial hasta 50MWp utility-scale',
      trackRecord: 'Más de 100MW en proyectos asesorados',
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
          name: 'Diseño de Sistemas Fotovoltaicos según NEC',
          duration: '40 horas',
          certification: 'Certificado de diseñador fotovoltaico',
          content: 'Article 690, 705, 706, cálculos eléctricos, software de simulación',
        },
        {
          name: 'NEC Article 690 Intensive',
          duration: '24 horas',
          content: 'Requisitos detallados del NEC para PV, cálculos, rapid shutdown, grounding',
        },
        {
          name: 'PV Associate (SEI)',
          duration: '40 horas',
          certification: 'Preparación para NABCEP PV Associate',
          content: 'Fundamentos PV, seguridad, diseño básico, instalación',
        },
      ],
      modality: 'Presencial, virtual o híbrido',
      customization: 'Cursos personalizados según necesidades del cliente',
    },
  },

  // FAQ técnico
  technicalFaq: {
    nec: {
      'Cuál es la diferencia entre NEC 2020 y 2023 para PV?':
        'Las principales diferencias incluyen: 1) NEC 2023 hace obligatorio el arc-fault protection para sistemas residenciales, 2) Requisitos expandidos para baterías en Article 706, 3) Clarificaciones en rapid shutdown. Los requisitos fundamentales de Article 690 se mantienen similares.',

      'Cómo calculo el voltaje máximo de string según NEC?':
        'NEC 690.7 requiere calcular Voc máximo a la temperatura más fría del sitio. Fórmula: Voc_max = Voc_stc × N_módulos × Factor_temp. El factor de temperatura se obtiene de la hoja de datos del módulo (~0.3%/°C) o Table 690.7(A). El voltaje máximo no debe exceder el rating del sistema (600V o 1000V típicamente).',

      'Qué es rapid shutdown y cuándo es requerido?':
        'Rapid shutdown (NEC 690.12) requiere que los sistemas PV en edificios puedan reducir el voltaje a 80V o menos en 30 segundos fuera del área controlada. Es requerido para todos los sistemas en edificios según NEC 2020 y 2023. Las opciones incluyen: microinversores, optimizadores con función RS, o string inverters con módulos de rapid shutdown.',

      'Cómo dimensiono los conductores DC según NEC?':
        'NEC 690.8 requiere ampacidad ≥ 156% de Isc (1.25 × 1.25). Pasos: 1) Calcular corriente = Isc × 1.25, 2) Aplicar factor de carga continua × 1.25, 3) Aplicar correcciones por temperatura (Table 310.15), 4) Aplicar correcciones por conductores en conduit. Seleccionar conductor de Table 310.16.',
    },
    iso50001: {
      'Qué es un EnPI y cómo se establece?':
        'Un EnPI (Energy Performance Indicator) es un valor cuantitativo que refleja el desempeño energético. Se establece: 1) Identificar la variable relevante (producción, área, etc.), 2) Recopilar datos históricos, 3) Realizar regresión para encontrar relación, 4) Validar el modelo (R² > 0.75 típicamente). Ejemplo: kWh/tonelada producida.',

      'Cuánto tiempo toma certificar ISO 50001?':
        'Típicamente 6-12 meses dependiendo de: tamaño de la organización, complejidad de procesos, disponibilidad del equipo, si tienen otras certificaciones ISO. Organizaciones con ISO 14001 pueden completar en 6 meses. Organizaciones grandes sin sistemas previos pueden requerir 12+ meses.',
    },
    solar: {
      'String inverter vs Microinverter: cuál elegir?':
        'String inverters: mejor para instalaciones sin sombras, menor costo, típicamente 10+ kW. Microinversores: mejor para techos con sombras parciales, monitoreo a nivel de módulo, mejor para sistemas pequeños (<10kW). Considera también: orientaciones múltiples favorecen microinversores, sistemas utility-scale usan string/central inverters.',

      'Cómo seleccionar la inclinación óptima?':
        'Regla general: inclinación = latitud para máxima producción anual. Para maximizar invierno: latitud + 15°. Para maximizar verano: latitud - 15°. En techos existentes, considerar el ángulo disponible y hacer análisis en software (PVsyst, Helioscope) para cuantificar pérdidas.',
    },
  },

  // Estrategia de ventas
  sales: {
    valueProposition: {
      differentiators: [
        'Expertise técnico profundo en NEC y normativas internacionales',
        'Experiencia internacional comprobada en 5 países',
        'Equipo técnico con certificaciones SEI y NABCEP',
        'Enfoque en resultados medibles y ROI demostrable',
        'Acompañamiento completo desde diagnóstico hasta certificación',
        'Metodología probada con más de 50 proyectos exitosos',
      ],
      guarantees: 'Garantizamos ahorro energético medible o devolvemos la inversión',
    },
    commonObjections: {
      price: {
        objection: 'Es muy caro / No tengo presupuesto',
        response: 'Entiendo tu preocupación. La implementación de ISO 50001 no es un gasto, es una inversión. Nuestros clientes recuperan la inversión en 12-18 meses a través del ahorro energético. Por ejemplo, una fábrica textil logró ahorrar $180,000 USD anuales. ¿Te gustaría que calculemos el potencial de ahorro en tu organización?',
      },
      time: {
        objection: 'No tenemos tiempo',
        response: 'Por eso diseñamos nuestro servicio para minimizar el impacto en tus operaciones. Nosotros hacemos el trabajo técnico pesado y solo necesitamos 2-3 horas semanales de tu equipo. ¿Qué tal si comenzamos con un diagnóstico de 2 horas para identificar quick wins?',
      },
      priority: {
        objection: 'No es prioritario ahora',
        response: 'Lo entiendo. Sin embargo, cada mes sin optimizar tu energía estás perdiendo dinero. Si tu potencial de ahorro es del 15%, y tu factura es de $10,000 mensuales, son $1,500 cada mes que no actúas. ¿No sería mejor hacer un diagnóstico sin compromiso para conocer tu potencial real?',
      },
    },
    qualifyingQuestions: [
      '¿Cuál es tu gasto energético mensual aproximado?',
      '¿Has realizado alguna evaluación energética previamente?',
      '¿Cuál es el principal motivador: ahorro de costos, sostenibilidad o cumplimiento?',
      '¿Tienen requisitos de clientes para certificaciones?',
      '¿Cuándo les gustaría ver resultados?',
    ],
  },
}

export const AGENT_PERSONALITY = {
  name: 'VOLT',
  fullName: 'VOLT - Virtual Operations & Learning Technician',
  avatar: 'Zap',
  tone: 'experto, estratégico, amigable pero profesional, apasionado por la energía',
  approach: 'escuchar primero, diagnosticar necesidades, educar con valor técnico, guiar hacia soluciones',
  language: 'técnicamente preciso pero accesible, usa analogías cuando ayuda a explicar',
  goal: 'ser el asesor técnico de confianza que ayuda a tomar decisiones informadas sobre energía',
  values: ['precisión técnica', 'honestidad', 'enfoque en resultados', 'educación continua'],
  expertise: [
    'Diseño de sistemas fotovoltaicos',
    'NEC Article 690, 705, 706 (versiones 2020, 2023, 2026)',
    'ISO 50001 - Sistemas de Gestión de Energía',
    'Cálculos eléctricos para PV',
    'Análisis financiero de proyectos solares',
  ],
  greetings: {
    es: '¡Hola! Soy VOLT, tu asesor técnico de ITER Energy Solutions. Soy experto en diseño de sistemas fotovoltaicos según el NEC, gestión energética ISO 50001, y puedo ayudarte con cualquier duda técnica sobre energía solar. ¿En qué puedo ayudarte hoy?',
    en: 'Hi! I\'m VOLT, your technical advisor from ITER Energy Solutions. I\'m an expert in photovoltaic system design per NEC, ISO 50001 energy management, and can help you with any technical questions about solar energy. How can I help you today?',
  },
}
