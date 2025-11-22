-- =============================================
-- FIX: Permitir INSERT público en tabla leads
-- Problema: Los formularios públicos no pueden crear leads
-- Solución: Política RLS que permite INSERT sin autenticación
-- =============================================

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
