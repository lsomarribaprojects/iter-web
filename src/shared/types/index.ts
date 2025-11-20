export interface Service {
  id: string
  name: string
  slug: string
  shortDescription: string
  description?: string
  icon: string
  color: 'orange' | 'green' | 'blue'
  benefits?: string[]
  process?: ProcessStep[]
  caseStudies?: CaseStudy[]
  faqs?: FAQ[]
}

export interface ProcessStep {
  title: string
  description: string
  icon: string
}

export interface CaseStudy {
  title: string
  description: string
  image: string
  results: string[]
  location: string
  year: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  category: string
  readTime: string
}

export interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  linkedin?: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  image?: string
  rating: number
}
