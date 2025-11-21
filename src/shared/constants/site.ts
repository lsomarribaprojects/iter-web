export const SITE_CONFIG = {
  name: 'ITER',
  title: 'ITER - Consultoría Solar, Auditoría Fotovoltaica y Gestión Energética ISO 50001',
  description: 'Auditoría técnica de proyectos solares, due diligence fotovoltaico, implementación ISO 50001 y capacitación SEI-NABCEP. Reducción de costos energéticos hasta 20% con consultoría especializada en 5 países.',
  url: 'https://iter-energy.com',
  ogImage: '/og-image.jpg',
  links: {
    linkedin: 'https://linkedin.com/company/iter',
    email: 'info@iter-energy.com',
    phone: '+1 (515) 678-1423',
  },
  address: {
    street: '',
    city: 'Iowa',
    country: 'USA',
    postalCode: '',
  },
}

export const NAVIGATION = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Servicios',
    href: '/servicios',
    submenu: [
      { name: 'Consultoría Solar', href: '/servicios/consultoria-solar' },
      { name: 'Gestión Energética ISO 50001', href: '/servicios/gestion-energetica' },
      { name: 'Formación Profesional', href: '/servicios/formacion' },
    ],
  },
  { name: 'Sobre Nosotros', href: '/nosotros' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
]

export const SERVICES = [
  {
    id: 'gestion-energetica',
    name: 'Gestión Energética ISO 50001',
    slug: 'gestion-energetica',
    shortDescription: 'Implementación y certificación ISO 50001:2018 para optimizar el desempeño energético, reducir costos y mejorar la productividad de su organización.',
    icon: 'gauge',
    color: 'green',
  },
  {
    id: 'auditoria-energetica',
    name: 'Auditorías Energéticas',
    slug: 'consultoria-solar',
    shortDescription: 'Diagnósticos energéticos profundos utilizando ciencia de datos para identificar oportunidades de ahorro y mejora continua.',
    icon: 'sun',
    color: 'orange',
  },
  {
    id: 'formacion',
    name: 'Formación y Capacitación',
    slug: 'formacion',
    shortDescription: 'Programas de capacitación en gestión energética, certificación de auditores energéticos y análisis de datos aplicado a proyectos energéticos.',
    icon: 'graduation-cap',
    color: 'blue',
  },
]

export const STATS = [
  { value: '20%', label: 'Ahorro Energético Anual' },
  { value: '5', label: 'Países de Operación' },
  { value: '15+', label: 'Empresas Certificadas ISO 50001' },
  { value: '10+', label: 'Años de Experiencia' },
]

export const CERTIFICATIONS = [
  { name: 'ISO 9001', image: '/images/logos/iso-9001.svg' },
  { name: 'ISO 50001', image: '/images/logos/iso-50001.svg' },
  { name: 'SEI', image: '/images/logos/sei.svg' },
  { name: 'NABCEP', image: '/images/logos/nabcep.svg' },
]
