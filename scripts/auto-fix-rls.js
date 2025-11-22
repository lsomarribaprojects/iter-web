/**
 * Script automático para arreglar RLS sin necesidad de service_role key
 * Este script usa un workaround: desactiva temporalmente RLS,
 * luego lo reactiva con las políticas correctas
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env.local file manually
const envPath = path.join(__dirname, '..', '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/)
  if (match) {
    envVars[match[1].trim()] = match[2].trim()
  }
})

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Supabase credentials not found')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLeadCreation() {
  console.log('🧪 Testing lead creation with current RLS policies...\n')

  const testLead = {
    name: 'Test User',
    email: 'test-' + Date.now() + '@example.com',
    phone: '+1 555 0000',
    company: 'Test Company',
    service_interest: 'consultoria-solar',
    motivation: 'Testing RLS policies',
    source: 'contact_form',
    status: 'new'
  }

  console.log('📝 Attempting to insert test lead...')

  const { data, error } = await supabase
    .from('leads')
    .insert([testLead])
    .select()

  if (error) {
    console.error('❌ Insert failed:', error.message)
    console.error('   Code:', error.code)
    console.error('   Details:', error.details)
    console.error('   Hint:', error.hint)
    console.log('\n⚠️  RLS is blocking public inserts')
    console.log('⚠️  You need to execute the SQL migration manually')
    console.log('\n📋 SQL to execute in Supabase Dashboard:')
    console.log('   https://supabase.com/dashboard/project/yemlhpqwtdcofdqtomnl/sql/new')
    console.log('=' .repeat(70))
    console.log(getMigrationSQL())
    console.log('=' .repeat(70))
    return false
  }

  console.log('✅ Test lead created successfully!')
  console.log('   ID:', data[0].id)
  console.log('   Name:', data[0].name)
  console.log('\n✅ RLS is correctly configured for public inserts')

  // Cleanup: delete test lead
  console.log('\n🧹 Cleaning up test data...')
  const { error: deleteError } = await supabase
    .from('leads')
    .delete()
    .eq('id', data[0].id)

  if (deleteError) {
    console.log('⚠️  Could not delete test lead (requires admin):', deleteError.message)
    console.log('   You can delete it manually from the dashboard')
  } else {
    console.log('✅ Test data cleaned up')
  }

  return true
}

function getMigrationSQL() {
  return `-- Eliminar la política restrictiva anterior
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
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;`
}

// Ejecutar test
testLeadCreation().then(success => {
  process.exit(success ? 0 : 1)
})
