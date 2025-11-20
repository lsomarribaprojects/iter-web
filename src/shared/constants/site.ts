export const SITE_CONFIG = {
  name: 'ITER',
  title: 'ITER - Consultoría en Gestión Energética y Sostenibilidad',
  description: 'Especialistas en gestión energética ISO 50001, eficiencia energética, economía circular y transformación sostenible. Servicios de consultoría energética con presencia en Ecuador, Costa Rica, Nicaragua, Honduras y Estados Unidos.',
  url: 'https://iter-energy.com',
  ogImage: '/og-image.jpg',
  links: {
    linkedin: 'https://linkedin.com/company/iter',
    email: 'info@iter-energy.com',
    phone: '+593 99 565 4840',
  },
  address: {
    street: 'Quito',
    city: 'Ecuador',
    country: 'Ecuador',
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
