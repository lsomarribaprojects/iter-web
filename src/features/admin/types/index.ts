/**
 * Tipos para el dashboard administrativo
 */

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  service_interest?: string
  monthly_energy_cost?: string
  preferred_date?: string
  motivation?: string
  source: 'chatbot' | 'contact_form' | 'newsletter' | 'other'
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  conversation_history?: any
  created_at: string
  updated_at: string
}

export interface LeadFilters {
  search?: string
  status?: Lead['status']
  source?: Lead['source']
  dateFrom?: string
  dateTo?: string
}

export interface LeadStats {
  total: number
  new: number
  contacted: number
  qualified: number
  converted: number
  thisMonth: number
  lastMonth: number
}

export interface PaginationData {
  page: number
  pageSize: number
  total: number
  totalPages: number
}
