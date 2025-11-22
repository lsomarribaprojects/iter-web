import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function POST(req: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: 'Supabase not configured' },
      { status: 500 }
    )
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('🔧 Executing migration: fix_leads_rls_public_insert')

    // Paso 1: Eliminar política anterior
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: 'DROP POLICY IF EXISTS "Admin can do everything on leads" ON public.leads;'
    })

    if (dropError && !dropError.message.includes('does not exist')) {
      console.error('Error dropping old policy:', dropError)
    }

    // Paso 2: Crear políticas nuevas
    const policies = [
      {
        name: 'Anyone can create leads',
        sql: 'CREATE POLICY "Anyone can create leads" ON public.leads FOR INSERT WITH CHECK (true);'
      },
      {
        name: 'Admin can read all leads',
        sql: 'CREATE POLICY "Admin can read all leads" ON public.leads FOR SELECT USING (auth.role() = \'authenticated\');'
      },
      {
        name: 'Admin can update leads',
        sql: 'CREATE POLICY "Admin can update leads" ON public.leads FOR UPDATE USING (auth.role() = \'authenticated\');'
      },
      {
        name: 'Admin can delete leads',
        sql: 'CREATE POLICY "Admin can delete leads" ON public.leads FOR DELETE USING (auth.role() = \'authenticated\');'
      }
    ]

    const results = []
    for (const policy of policies) {
      console.log(`Creating policy: ${policy.name}`)
      const { error } = await supabase.rpc('exec_sql', { sql: policy.sql })

      if (error && !error.message.includes('already exists')) {
        console.error(`Error creating ${policy.name}:`, error)
        results.push({ policy: policy.name, status: 'error', error: error.message })
      } else {
        results.push({ policy: policy.name, status: 'success' })
      }
    }

    // Paso 3: Verificar RLS habilitado
    const { error: rlsError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;'
    })

    if (rlsError) {
      console.error('Error enabling RLS:', rlsError)
    }

    console.log('✅ Migration completed')

    return NextResponse.json({
      success: true,
      message: 'Migration executed successfully',
      results,
    })

  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Migration failed', details: error.message },
      { status: 500 }
    )
  }
}
