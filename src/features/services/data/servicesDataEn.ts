import { Service } from '@/shared/types'

export const servicesDataEn: Record<string, Service> = {
  'consultoria-solar': {
    id: 'consultoria-solar',
    name: 'Solar Consulting',
    slug: 'consultoria-solar',
    shortDescription:
      'Comprehensive support across all phases of photovoltaic plant development.',
    description:
      'ITER provides comprehensive solar consulting through specialized services, supporting clients across all phases of solar plant development. We combine global experience with specialized technical knowledge in photovoltaic technology to ensure proper risk management and maximum profitability of your solar assets.',
    icon: 'sun',
    color: 'orange',
    benefits: [
      'Specialized and independent advisory tailored to specific needs',
      'Comprehensive technical review of solar plants and key suppliers',
      'Component manufacturer reliability assessment',
      'Risk management and profitability maximization',
      'Experience in over 5 countries with completed projects',
      'ISO 9001 certified processes',
    ],
    process: [
      {
        title: 'Bankability Studies',
        description:
          'Detailed reports to assess component manufacturer reliability and project viability.',
        icon: 'FileText',
      },
      {
        title: 'Technical Due Diligence',
        description:
          'Complete technical evaluations for project financing, providing comprehensive review of solar plants and contractors.',
        icon: 'Search',
      },
      {
        title: 'Permit Support',
        description:
          'Assistance in obtaining necessary authorizations for construction, commissioning, and operation phases.',
        icon: 'FileCheck',
      },
      {
        title: 'QA/QC Audit',
        description:
          'Inspections and testing during construction and commissioning to ensure quality and specification compliance.',
        icon: 'CheckCircle',
      },
    ],
    faqs: [
      {
        question: 'What does ITER solar consulting include?',
        answer:
          'Our consulting includes bankability studies, technical due diligence, permit support, QA/QC audits, component inspections, and specialized advisory across all project phases.',
      },
      {
        question: 'In which countries do you have experience?',
        answer:
          'We have worked on photovoltaic projects in 5 countries, combining global experience with specialized technical knowledge in photovoltaic technology.',
      },
      {
        question: 'What certifications support your services?',
        answer:
          'Our processes are ISO 9001 certified, supporting high-level services with international quality standards.',
      },
    ],
  },
  'gestion-energetica': {
    id: 'gestion-energetica',
    name: 'ISO 50001 Energy Management',
    slug: 'gestion-energetica',
    shortDescription:
      'Energy management system implementation to optimize consumption and reduce costs.',
    description:
      'We implement energy management systems under ISO 50001:2018 methodology to optimize your organization\'s energy consumption. Our energy efficiency programs focus on economic and energy savings with payback periods of less than one year, through identification of improvement opportunities and specialized training.',
    icon: 'gauge',
    color: 'green',
    benefits: [
      'Energy cost reduction with payback period under 1 year',
      'Continuous improvement of energy performance',
      'Production process optimization',
      'Compliance with ISO 50001:2018 standards',
      'Identification of improvement opportunities through audits',
      'Contribution to Sustainable Development Goals (SDGs)',
    ],
    process: [
      {
        title: 'Initial Energy Review',
        description:
          'Complete analysis of energy consumption and significant uses according to ISO 50001:2018 requirements.',
        icon: 'Search',
      },
      {
        title: 'Energy Audits',
        description:
          'Identification of energy performance improvement opportunities through detailed analysis.',
        icon: 'FileSearch',
      },
      {
        title: 'EnMS Implementation',
        description:
          'Documentation and implementation of the energy management system over 12 months.',
        icon: 'Settings',
      },
      {
        title: 'ISO 50001 Certification',
        description:
          'Support until obtaining international ISO 50001:2018 certification.',
        icon: 'Award',
      },
    ],
    faqs: [
      {
        question: 'How long does ISO 50001 implementation take?',
        answer:
          'Complete implementation of the ISO 50001 energy management system takes 12 months, including audits, documentation, and certification preparation.',
      },
      {
        question: 'What is the investment payback period?',
        answer:
          'Our energy efficiency programs are designed to achieve economic savings with payback periods under one year through process optimization and consumption reduction.',
      },
      {
        question: 'What do energy audits include?',
        answer:
          'Audits are based on ISO 50001:2018 section 6.3 requirements and identify energy performance improvement opportunities through consumption, process, and equipment analysis.',
      },
    ],
  },
  formacion: {
    id: 'formacion',
    name: 'Professional Training',
    slug: 'formacion',
    shortDescription:
      'SEI certification programs and NABCEP credits for industry professionals.',
    description:
      'We offer professional training programs accredited by Solar Energy International (SEI) with valid credits for NABCEP certification. Our specialized courses prepare professionals in design, installation, and maintenance of photovoltaic systems with the highest industry standards.',
    icon: 'graduation-cap',
    color: 'blue',
    benefits: [
      'Internationally recognized SEI certification',
      'Valid credits for NABCEP certification',
      'Hands-on training with real equipment',
      'Instructors with international experience',
      'Updated materials with latest technologies',
      'Networking with industry professionals',
    ],
    process: [
      {
        title: 'Needs Assessment',
        description:
          'Analysis of participant profile and training objectives to recommend the appropriate program.',
        icon: 'ClipboardList',
      },
      {
        title: 'Theoretical Training',
        description:
          'Specialized courses covering design, installation, maintenance, and regulations for photovoltaic systems.',
        icon: 'BookOpen',
      },
      {
        title: 'Hands-on Practice',
        description:
          'Practical sessions with real components and systems to apply acquired knowledge.',
        icon: 'Wrench',
      },
      {
        title: 'SEI Certification',
        description:
          'Certification exam and NABCEP credits upon successful program completion.',
        icon: 'Award',
      },
    ],
    faqs: [
      {
        question: 'What is SEI certification?',
        answer:
          'Solar Energy International (SEI) certification is an international recognition that validates knowledge in solar energy systems and provides credits for NABCEP certification.',
      },
      {
        question: 'Do courses provide NABCEP credits?',
        answer:
          'Yes, our training programs are accredited and provide valid credits to obtain NABCEP (North American Board of Certified Energy Practitioners) certification.',
      },
      {
        question: 'What topics do the courses cover?',
        answer:
          'Courses cover photovoltaic system design, installation, maintenance, regulations, site analysis, sizing, component selection, and industry best practices.',
      },
    ],
  },
}
