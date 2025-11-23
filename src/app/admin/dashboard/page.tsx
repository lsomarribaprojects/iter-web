'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  TrendingUp,
  Download,
  Search,
  Filter,
  Calendar,
  Mail,
  Phone,
  Building2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Trash2,
  Eye,
} from 'lucide-react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { AdminLeadService } from '@/features/admin/services/leadService'
import type { Lead, LeadFilters, LeadStats } from '@/features/admin/types'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const { isAuthenticated, loading, user } = useAuth()

  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
    thisMonth: 0,
    lastMonth: 0,
  })

  const [filters, setFilters] = useState<LeadFilters>({})
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const pageSize = 10

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, loading, router])

  // Cargar leads y stats
  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, filters, currentPage])

  const loadData = async () => {
    setIsLoading(true)

    const [leadsData, statsData] = await Promise.all([
      AdminLeadService.getLeads(filters, currentPage, pageSize),
      AdminLeadService.getStats(),
    ])

    setLeads(leadsData.leads)
    setTotalPages(leadsData.totalPages)
    setStats(statsData)
    setIsLoading(false)
  }

  const handleExport = () => {
    AdminLeadService.exportToCSV(leads)
  }

  const handleStatusChange = async (leadId: string, newStatus: Lead['status']) => {
    await AdminLeadService.updateLeadStatus(leadId, newStatus)
    loadData()
  }

  const handleDelete = async (leadId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este lead?')) {
      await AdminLeadService.deleteLead(leadId)
      loadData()
    }
  }

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      contacted: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      qualified: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      converted: 'bg-green-500/10 text-green-400 border-green-500/20',
      lost: 'bg-red-500/10 text-red-400 border-red-500/20',
    }
    return colors[status] || colors.new
  }

  const getStatusLabel = (status: Lead['status']) => {
    const labels = {
      new: 'Nuevo',
      contacted: 'Contactado',
      qualified: 'Calificado',
      converted: 'Convertido',
      lost: 'Perdido',
    }
    return labels[status] || status
  }

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-20">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-white/70">
              Bienvenido, {user?.name || user?.email}
            </p>
          </div>

          <Link
            href="/profile"
            className="rounded-lg bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Mi Perfil
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white/10 p-6 backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Total Leads</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="rounded-lg bg-electric-500/10 p-3">
                <Users className="h-6 w-6 text-electric-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/10 p-6 backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Este Mes</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.thisMonth}
                </p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-2 text-sm">
              {stats.thisMonth > stats.lastMonth ? (
                <span className="text-green-400">
                  +{stats.thisMonth - stats.lastMonth} vs mes anterior
                </span>
              ) : (
                <span className="text-red-400">
                  {stats.thisMonth - stats.lastMonth} vs mes anterior
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white/10 p-6 backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Nuevos</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.new}</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-white/10 p-6 backdrop-blur-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">Convertidos</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stats.converted}
                </p>
              </div>
              <div className="rounded-lg bg-green-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 rounded-2xl bg-white/10 p-6 backdrop-blur-md">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o empresa..."
                value={filters.search || ''}
                onChange={(e) => {
                  setFilters({ ...filters, search: e.target.value })
                  setCurrentPage(1)
                }}
                className="w-full rounded-lg bg-white/10 px-12 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </button>

              <button
                onClick={loadData}
                className="flex items-center space-x-2 rounded-lg bg-white/10 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/20"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Actualizar</span>
              </button>

              <button
                onClick={handleExport}
                className="flex items-center space-x-2 rounded-lg bg-electric-500 px-4 py-3 font-semibold text-white transition-colors hover:bg-electric-600"
              >
                <Download className="h-5 w-5" />
                <span>Exportar CSV</span>
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 grid gap-4 border-t border-white/10 pt-4 md:grid-cols-3"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Estado
                </label>
                <select
                  value={filters.status || ''}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      status: e.target.value as Lead['status'] | undefined,
                    })
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                >
                  <option value="">Todos</option>
                  <option value="new">Nuevo</option>
                  <option value="contacted">Contactado</option>
                  <option value="qualified">Calificado</option>
                  <option value="converted">Convertido</option>
                  <option value="lost">Perdido</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Fuente
                </label>
                <select
                  value={filters.source || ''}
                  onChange={(e) => {
                    setFilters({
                      ...filters,
                      source: e.target.value as Lead['source'] | undefined,
                    })
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                >
                  <option value="">Todas</option>
                  <option value="chatbot">Chatbot</option>
                  <option value="contact_form">Formulario</option>
                  <option value="newsletter">Newsletter</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/90">
                  Desde
                </label>
                <input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) => {
                    setFilters({ ...filters, dateFrom: e.target.value })
                    setCurrentPage(1)
                  }}
                  className="w-full rounded-lg bg-white/10 px-4 py-3 text-white backdrop-blur-sm transition-colors focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-electric-500/50"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Leads Table */}
        <div className="rounded-2xl bg-white/10 backdrop-blur-md overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-white">Cargando leads...</div>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Users className="mb-4 h-16 w-16 text-white/30" />
              <p className="text-xl text-white/70">No se encontraron leads</p>
              <p className="text-sm text-white/50">
                Prueba ajustando los filtros de búsqueda
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Contacto
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Empresa
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Fuente
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white/90">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="transition-colors hover:bg-white/5"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-white">{lead.name}</p>
                            <p className="text-sm text-white/60">{lead.email}</p>
                            {lead.phone && (
                              <p className="text-sm text-white/60">{lead.phone}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            {lead.company && (
                              <p className="font-semibold text-white">
                                {lead.company}
                              </p>
                            )}
                            {lead.position && (
                              <p className="text-sm text-white/60">{lead.position}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleStatusChange(
                                lead.id,
                                e.target.value as Lead['status']
                              )
                            }
                            className={`rounded-lg border px-3 py-1 text-xs font-semibold ${getStatusColor(
                              lead.status
                            )}`}
                          >
                            <option value="new">Nuevo</option>
                            <option value="contacted">Contactado</option>
                            <option value="qualified">Calificado</option>
                            <option value="converted">Convertido</option>
                            <option value="lost">Perdido</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-white/70">
                            {new Date(lead.created_at).toLocaleDateString('es-ES')}
                          </p>
                          <p className="text-xs text-white/50">
                            {new Date(lead.created_at).toLocaleTimeString('es-ES', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-lg bg-electric-500/10 p-2 text-electric-400 transition-colors hover:bg-electric-500/20"
                              title="Ver detalles"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(lead.id)}
                              className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-white/10">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-4">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">{lead.name}</p>
                        <p className="text-sm text-white/60">{lead.email}</p>
                      </div>
                      <span
                        className={`rounded-lg border px-3 py-1 text-xs font-semibold ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {getStatusLabel(lead.status)}
                      </span>
                    </div>

                    {lead.company && (
                      <p className="mb-2 text-sm text-white/70">
                        <Building2 className="mr-1 inline h-4 w-4" />
                        {lead.company}
                      </p>
                    )}

                    <div className="mb-3 flex items-center space-x-4 text-xs text-white/50">
                      <span>{lead.source}</span>
                      <span>
                        {new Date(lead.created_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="flex-1 rounded-lg bg-electric-500/10 px-3 py-2 text-xs font-semibold text-electric-400 transition-colors hover:bg-electric-500/20"
                      >
                        Ver Detalles
                      </button>
                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
                <p className="text-sm text-white/70">
                  Página {currentPage} de {totalPages}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedLead(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-2xl rounded-2xl bg-white/10 p-8 backdrop-blur-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedLead.name}
                  </h2>
                  <p className="text-white/70">{selectedLead.email}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {selectedLead.phone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-electric-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Teléfono</p>
                      <p className="text-white">{selectedLead.phone}</p>
                    </div>
                  </div>
                )}

                {selectedLead.company && (
                  <div className="flex items-start space-x-3">
                    <Building2 className="h-5 w-5 text-electric-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-white/60">Empresa</p>
                      <p className="text-white">{selectedLead.company}</p>
                      {selectedLead.position && (
                        <p className="text-sm text-white/70">
                          {selectedLead.position}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedLead.service_interest && (
                  <div className="flex items-start space-x-3">
                    <div>
                      <p className="text-sm text-white/60">Servicio de Interés</p>
                      <p className="text-white">{selectedLead.service_interest}</p>
                    </div>
                  </div>
                )}

                {selectedLead.motivation && (
                  <div className="rounded-lg bg-white/5 p-4">
                    <p className="mb-2 text-sm font-semibold text-white/90">
                      Motivación
                    </p>
                    <p className="text-white/70">{selectedLead.motivation}</p>
                  </div>
                )}

                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span>Fuente: {selectedLead.source}</span>
                  <span>•</span>
                  <span>
                    {new Date(selectedLead.created_at).toLocaleString('es-ES')}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
