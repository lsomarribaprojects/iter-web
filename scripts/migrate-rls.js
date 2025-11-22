/**
 * Script para aplicar migración de políticas RLS
 * Ejecuta: node scripts/migrate-rls.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase credentials not found in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function runMigration() {
  console.log('🔧 Starting RLS migration...\n')

  try {
    // Nota: Las políticas RLS deben ser ejecutadas con un service_role key
    // o directamente desde el SQL Editor de Supabase
    console.log('⚠️  WARNING: This script requires SUPABASE_SERVICE_ROLE_KEY')
    console.log('⚠️  The anon key cannot modify RLS policies\n')

    console.log('📋 Migration SQL to execute in Supabase SQL Editor:')
    console.log('=' .repeat(60))
    console.log(`
-- Eliminar la política restrictiva anterior
DROP POLICY IF EXISTS "Admin can do everything on leads" ON public.leads;

-- Política 1: Cualquiera puede crear leads (INSERT público)
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Política 2: Solo admin puede leer leads
CREATE POLICY "Admin can read all leads" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política 3: Solo admin puede actualizar leads
CREATE POLICY "Admin can update leads" ON public.leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política 4: Solo admin puede eliminar leads
CREATE POLICY "Admin can delete leads" ON public.leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- Verificar que RLS sigue habilitado
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
`)
    console.log('=' .repeat(60))
    console.log('\n📍 Go to: https://supabase.com/dashboard/project/yemlhpqwtdcofdqtomnl/sql/new')
    console.log('📍 Copy and paste the SQL above')
    console.log('📍 Click "Run" or press Ctrl+Enter\n')

  } catch (error) {
    console.error('❌ Migration error:', error)
    process.exit(1)
  }
}

runMigration()
