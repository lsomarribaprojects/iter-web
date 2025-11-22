/**
 * Servicio para gestionar leads en el admin dashboard
 */

import { supabase } from '@/shared/lib/supabase'
import type { Lead, LeadFilters, LeadStats } from '../types'

export class AdminLeadService {
  /**
   * Obtiene todos los leads con filtros y paginación
   */
  static async getLeads(filters?: LeadFilters, page = 1, pageSize = 10) {
    try {
      let query = supabase.from('leads').select('*', { count: 'exact' })

      // Aplicar filtros
      if (filters?.search) {
        query = query.or(
          `name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
        )
      }

      if (filters?.status) {
        query = query.eq('status', filters.status)
      }

      if (filters?.source) {
        query = query.eq('source', filters.source)
      }

      if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom)
      }

      if (filters?.dateTo) {
        query = query.lte('created_at', filters.dateTo)
      }

      // Paginación
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      query = query.order('created_at', { ascending: false }).range(from, to)

      const { data, error, count } = await query

      if (error) {
        console.error('Error fetching leads:', error)
        return {
          leads: [],
          total: 0,
          page,
          pageSize,
          totalPages: 0,
        }
      }

      return {
        leads: (data as Lead[]) || [],
        total: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
      }
    } catch (error) {
      console.error('Error in getLeads:', error)
      return {
        leads: [],
        total: 0,
        page,
        pageSize,
        totalPages: 0,
      }
    }
  }

  /**
   * Obtiene estadísticas de leads
   */
  static async getStats(): Promise<LeadStats> {
    try {
      // Total de leads
      const { count: total } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })

      // Leads por estado
      const { data: statusData } = await supabase
        .from('leads')
        .select('status')

      const statusCounts = {
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
      }

      statusData?.forEach((lead) => {
        if (lead.status in statusCounts) {
          statusCounts[lead.status as keyof typeof statusCounts]++
        }
      })

      // Leads del mes actual
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { count: thisMonth } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth.toISOString())

      // Leads del mes anterior
      const startOfLastMonth = new Date(startOfMonth)
      startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1)

      const { count: lastMonth } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfLastMonth.toISOString())
        .lt('created_at', startOfMonth.toISOString())

      return {
        total: total || 0,
        ...statusCounts,
        thisMonth: thisMonth || 0,
        lastMonth: lastMonth || 0,
      }
    } catch (error) {
      console.error('Error getting stats:', error)
      return {
        total: 0,
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        thisMonth: 0,
        lastMonth: 0,
      }
    }
  }

  /**
   * Actualiza el estado de un lead
   */
  static async updateLeadStatus(leadId: string, status: Lead['status']) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', leadId)

      if (error) {
        console.error('Error updating lead status:', error)
        return { success: false }
      }

      return { success: true }
    } catch (error) {
      console.error('Error in updateLeadStatus:', error)
      return { success: false }
    }
  }

  /**
   * Elimina un lead
   */
  static async deleteLead(leadId: string) {
    try {
      const { error } = await supabase.from('leads').delete().eq('id', leadId)

      if (error) {
        console.error('Error deleting lead:', error)
        return { success: false }
      }

      return { success: true }
    } catch (error) {
      console.error('Error in deleteLead:', error)
      return { success: false }
    }
  }

  /**
   * Exporta leads a CSV
   */
  static exportToCSV(leads: Lead[]): void {
    const headers = [
      'ID',
      'Nombre',
      'Email',
      'Teléfono',
      'Empresa',
      'Cargo',
      'Servicio',
      'Gasto Mensual',
      'Fuente',
      'Estado',
      'Fecha Creación',
    ]

    const rows = leads.map((lead) => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone || '',
      lead.company || '',
      lead.position || '',
      lead.service_interest || '',
      lead.monthly_energy_cost || '',
      lead.source,
      lead.status,
      new Date(lead.created_at).toLocaleString('es-ES'),
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n')

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute(
      'download',
      `leads_${new Date().toISOString().split('T')[0]}.csv`
    )
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
