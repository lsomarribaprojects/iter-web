import { Service } from '@/shared/types'

export const servicesData: Record<string, Service> = {
  'consultoria-solar': {
    id: 'consultoria-solar',
    name: 'Consultoría Solar',
    slug: 'consultoria-solar',
    shortDescription:
      'Acompañamiento integral en todas las fases de desarrollo de plantas solares fotovoltaicas.',
    description:
      'ITER ofrece consultoría solar integral a través de servicios especializados, acompañando a clientes en todas las fases de desarrollo de plantas solares. Combinamos experiencia global con conocimiento técnico especializado en tecnología fotovoltaica para asegurar una adecuada gestión del riesgo y la máxima rentabilidad de sus activos solares.',
    icon: 'sun',
    color: 'orange',
    benefits: [
      'Asesoramiento especializado e independiente adaptado a necesidades específicas',
      'Revisión técnica integral de plantas solares y proveedores principales',
      'Evaluación de confiabilidad de fabricantes de componentes',
      'Gestión del riesgo y maximización de rentabilidad',
      'Experiencia en más de 5 países con proyectos completados',
      'Experiencia comprobada en proyectos internacionales',
    ],
    process: [
      {
        title: 'Estudios de Bancabilidad',
        description:
          'Informes detallados para evaluar la confiabilidad de los fabricantes de componentes y viabilidad del proyecto.',
        icon: 'FileText',
      },
      {
        title: 'Due Diligence Técnica',
        description:
          'Evaluaciones técnicas completas para financiación de proyectos, proporcionando revisión integral de plantas solares y contratistas.',
        icon: 'Search',
      },
      {
        title: 'Soporte de Permisos',
        description:
          'Asistencia en obtención de autorizaciones necesarias para fases de construcción, puesta en marcha y operación.',
        icon: 'FileCheck',
      },
      {
        title: 'Auditoría QA/QC',
        description:
          'Inspecciones y ensayos durante construcción y puesta en marcha para asegurar calidad y cumplimiento de especificaciones.',
        icon: 'CheckCircle',
      },
    ],
    faqs: [
      {
        question: '¿Qué incluye la consultoría solar de ITER?',
        answer:
          'Nuestra consultoría incluye estudios de bancabilidad, due diligence técnica, soporte de permisos, auditoría QA/QC, inspecciones de componentes y asesoramiento especializado en todas las fases del proyecto.',
      },
      {
        question: '¿En qué países tienen experiencia?',
        answer:
          'Hemos trabajado en proyectos fotovoltaicos en más de 5 países, combinando experiencia global con conocimiento técnico especializado en tecnología fotovoltaica.',
      },
      {
        question: '¿Qué certificaciones respaldan sus servicios?',
        answer:
          'Nuestros procesos siguen estándares internacionales de calidad, respaldando servicios de alto nivel en consultoría energética.',
      },
    ],
  },
  'gestion-energetica': {
    id: 'gestion-energetica',
    name: 'Gestión Energética ISO 50001',
    slug: 'gestion-energetica',
    shortDescription:
      'Implementación de sistemas de gestión energética para optimizar consumos y reducir costes.',
    description:
      'Implementamos sistemas de gestión energética bajo metodología ISO 50001:2018 para optimizar el consumo energético de su organización. Nuestros programas de eficiencia energética están enfocados en ahorros económicos y energéticos con período de retorno menor a un año, mediante identificación de oportunidades de mejora y capacitación especializada.',
    icon: 'gauge',
    color: 'green',
    benefits: [
      'Reducción de costes energéticos con período de retorno menor a 1 año',
      'Mejora continua del desempeño energético',
      'Optimización de procesos productivos',
      'Cumplimiento con estándares ISO 50001:2018',
      'Identificación de oportunidades de mejora mediante auditorías',
      'Contribución a objetivos de desarrollo sostenible (ODS)',
    ],
    process: [
      {
        title: 'Revisión Energética Inicial',
        description:
          'Análisis completo de consumos energéticos y usos significativos según requisitos ISO 50001:2018.',
        icon: 'Search',
      },
      {
        title: 'Auditorías Energéticas',
        description:
          'Identificación de oportunidades de mejora del desempeño energético mediante análisis detallados.',
        icon: 'FileSearch',
      },
      {
        title: 'Implementación del SGE',
        description:
          'Documentación e implementación del sistema de gestión energética durante 12 meses.',
        icon: 'Settings',
      },
      {
        title: 'Certificación ISO 50001',
        description:
          'Acompañamiento hasta obtención de la certificación internacional ISO 50001:2018.',
        icon: 'Award',
      },
    ],
    faqs: [
      {
        question: '¿Cuánto tiempo toma implementar ISO 50001?',
        answer:
          'La implementación completa del sistema de gestión energética ISO 50001 tiene una duración de 12 meses, incluyendo auditorías, documentación y preparación para certificación.',
      },
      {
        question: '¿Cuál es el período de retorno de la inversión?',
        answer:
          'Nuestros programas de eficiencia energética están diseñados para lograr ahorros económicos con período de retorno menor a un año mediante optimización de procesos y reducción de consumos.',
      },
      {
        question: '¿Qué incluyen las auditorías energéticas?',
        answer:
          'Las auditorías se basan en los requisitos del punto 6.3 de ISO 50001:2018 e identifican oportunidades de mejora del desempeño energético mediante análisis de consumos, procesos y equipos.',
      },
    ],
  },
  formacion: {
    id: 'formacion',
    name: 'Formación Profesional',
    slug: 'formacion',
    shortDescription:
      'Programas de certificación SEI y créditos NABCEP para profesionales del sector.',
    description:
      'Ofrecemos programas de formación profesional acreditados por Solar Energy International (SEI) con créditos válidos para certificación NABCEP. Nuestros cursos especializados preparan a profesionales en diseño, instalación y mantenimiento de sistemas fotovoltaicos con los más altos estándares de la industria.',
    icon: 'graduation-cap',
    color: 'blue',
    benefits: [
      'Certificación SEI reconocida internacionalmente',
      'Créditos válidos para certificación NABCEP',
      'Formación práctica con equipos reales',
      'Instructores con experiencia internacional',
      'Materiales actualizados con últimas tecnologías',
      'Networking con profesionales del sector',
    ],
    process: [
      {
        title: 'Evaluación de Necesidades',
        description:
          'Análisis del perfil del participante y objetivos de formación para recomendar el programa adecuado.',
        icon: 'ClipboardList',
      },
      {
        title: 'Formación Teórica',
        description:
          'Cursos especializados cubriendo diseño, instalación, mantenimiento y normativas de sistemas fotovoltaicos.',
        icon: 'BookOpen',
      },
      {
        title: 'Práctica con Equipos',
        description:
          'Sesiones prácticas con componentes y sistemas reales para aplicar conocimientos adquiridos.',
        icon: 'Wrench',
      },
      {
        title: 'Certificación SEI',
        description:
          'Examen de certificación y obtención de créditos NABCEP al completar exitosamente el programa.',
        icon: 'Award',
      },
    ],
    faqs: [
      {
        question: '¿Qué es la certificación SEI?',
        answer:
          'La certificación de Solar Energy International (SEI) es un reconocimiento internacional que valida conocimientos en sistemas de energía solar y proporciona créditos para la certificación NABCEP.',
      },
      {
        question: '¿Los cursos otorgan créditos NABCEP?',
        answer:
          'Sí, nuestros programas de formación están acreditados y otorgan créditos válidos para obtener la certificación NABCEP (North American Board of Certified Energy Practitioners).',
      },
      {
        question: '¿Qué temas cubren los cursos?',
        answer:
          'Los cursos cubren diseño de sistemas fotovoltaicos, instalación, mantenimiento, normativas, análisis de sitio, dimensionamiento, selección de componentes y mejores prácticas de la industria.',
      },
    ],
  },
}
