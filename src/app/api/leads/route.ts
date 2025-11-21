import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Inicializar Supabase (si está configurado)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

// POST - Guardar nuevo lead
export async function POST(req: NextRequest) {
  try {
    const lead = await req.json()

    // Validar datos requeridos
    if (!lead.name || !lead.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Si Supabase está configurado, guardar ahí
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            name: lead.name,
            company: lead.company,
            email: lead.email,
            phone: lead.phone,
            position: lead.position,
            monthly_energy_cost: lead.monthlyEnergyCost,
            motivation: lead.motivation,
            preferred_date: lead.preferredDate,
            conversation_history: lead.conversationHistory,
            source: lead.source || 'chatbot',
            created_at: lead.createdAt || new Date().toISOString(),
          },
        ])
        .select()

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { error: 'Error saving to database', details: error.message },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        lead: data[0],
        message: 'Lead saved successfully in Supabase',
      })
    }

    // Fallback: Guardar en archivo local (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      const fs = require('fs').promises
      const path = require('path')

      const leadsFile = path.join(process.cwd(), 'leads.json')

      let leads = []
      try {
        const content = await fs.readFile(leadsFile, 'utf-8')
        leads = JSON.parse(content)
      } catch (error) {
        // Archivo no existe, crear nuevo array
      }

      leads.push({
        id: Date.now().toString(),
        ...lead,
        createdAt: new Date().toISOString(),
      })

      await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2))

      return NextResponse.json({
        success: true,
        message: 'Lead saved locally (development mode)',
        note: 'Configure Supabase for production use',
      })
    }

    // Sin Supabase en producción: aceptar el lead de todas formas
    // El email notification contendrá la información
    console.log('Lead received (no database):', lead)

    return NextResponse.json({
      success: true,
      message: 'Lead received successfully',
      note: 'Configure Supabase to store leads in database',
      lead: {
        id: Date.now().toString(),
        ...lead,
        createdAt: new Date().toISOString(),
      }
    })

  } catch (error: any) {
    console.error('Error in leads API:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// GET - Obtener todos los leads (para dashboard)
export async function GET(req: NextRequest) {
  try {
    // Si Supabase está configurado
    if (supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) {
        throw error
      }

      return NextResponse.json({
        success: true,
        leads: data,
        count: data.length,
      })
    }

    // Fallback: Leer de archivo local
    if (process.env.NODE_ENV === 'development') {
      const fs = require('fs').promises
      const path = require('path')

      const leadsFile = path.join(process.cwd(), 'leads.json')

      try {
        const content = await fs.readFile(leadsFile, 'utf-8')
        const leads = JSON.parse(content)

        return NextResponse.json({
          success: true,
          leads: leads.sort((a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
          count: leads.length,
        })
      } catch (error) {
        return NextResponse.json({
          success: true,
          leads: [],
          count: 0,
        })
      }
    }

    return NextResponse.json(
      { error: 'No database configured' },
      { status: 503 }
    )

  } catch (error: any) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Error fetching leads', details: error.message },
      { status: 500 }
    )
  }
}
