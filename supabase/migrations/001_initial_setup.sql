-- =============================================
-- ITER - Database Setup
-- Migraciones iniciales para todas las tablas
-- =============================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- TABLA: leads
-- Almacena información de contactos capturados
-- =============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

  -- Información personal
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  position VARCHAR(255),

  -- Información del servicio
  service_interest VARCHAR(255),
  monthly_energy_cost VARCHAR(100),
  preferred_date VARCHAR(100),
  motivation TEXT,

  -- Metadata
  source VARCHAR(50) DEFAULT 'chatbot', -- chatbot, contact_form, etc.
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, converted, lost
  conversation_history JSONB,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar búsquedas
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);

-- =============================================
-- TABLA: newsletter_subscribers
-- Almacena suscriptores del newsletter
-- =============================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),

  -- Estado
  active BOOLEAN DEFAULT true,
  confirmed BOOLEAN DEFAULT false,
  confirmation_token VARCHAR(255),

  -- Preferencias
  language VARCHAR(10) DEFAULT 'es',
  tags TEXT[], -- Etiquetas para segmentación

  -- Timestamps
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_active ON public.newsletter_subscribers(active);

-- =============================================
-- TABLA: blog_posts
-- Almacena artículos del blog
-- =============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

  -- Contenido
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,

  -- Media
  image_url TEXT,
  image_alt VARCHAR(255),

  -- Metadata
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  tags TEXT[],
  read_time VARCHAR(50), -- "5 min read"

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Estado
  status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
  language VARCHAR(10) DEFAULT 'es',

  -- Timestamps
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_language ON public.blog_posts(language);

-- =============================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- RLS (Row Level Security) - Seguridad básica
-- =============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Políticas para leads (solo admin puede ver/editar)
CREATE POLICY "Admin can do everything on leads" ON public.leads
  FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para newsletter (insert público, rest admin)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can manage newsletter" ON public.newsletter_subscribers
  FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para blog_posts (lectura pública de publicados, admin todo)
CREATE POLICY "Anyone can read published posts" ON public.blog_posts
  FOR SELECT USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "Admin can manage blog posts" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- DATOS DE EJEMPLO (opcional)
-- =============================================

-- Comentar estas líneas si no quieres datos de ejemplo

-- Lead de ejemplo
INSERT INTO public.leads (name, email, phone, company, service_interest, source, status)
VALUES
  ('Juan Pérez', 'juan@example.com', '+34 600 123 456', 'EcoTech SL', 'Instalación Fotovoltaica', 'contact_form', 'new'),
  ('María García', 'maria@example.com', '+34 611 234 567', 'GreenEnergy SA', 'Consultoría Energética', 'chatbot', 'contacted')
ON CONFLICT DO NOTHING;

-- Suscriptor newsletter de ejemplo
INSERT INTO public.newsletter_subscribers (email, name, active, confirmed)
VALUES
  ('newsletter@example.com', 'Newsletter Test', true, true)
ON CONFLICT DO NOTHING;
