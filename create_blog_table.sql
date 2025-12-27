-- ================================================
-- CREAR TABLA BLOG_POSTS PARA ITER
-- ================================================

-- Crear tabla blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    image_alt TEXT,
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    author TEXT DEFAULT 'ITER Energy Solutions',
    read_time TEXT DEFAULT '5 min',
    meta_title TEXT,
    meta_description TEXT,
    published BOOLEAN DEFAULT false,
    language TEXT DEFAULT 'es',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON public.blog_posts(language);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública de posts publicados
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
CREATE POLICY "Public can read published posts" ON public.blog_posts
    FOR SELECT USING (published = true);

-- Política para que usuarios autenticados puedan hacer todo
DROP POLICY IF EXISTS "Authenticated users can do everything" ON public.blog_posts;
CREATE POLICY "Authenticated users can do everything" ON public.blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Política para service_role (para inserciones desde el backend)
DROP POLICY IF EXISTS "Service role can do everything" ON public.blog_posts;
CREATE POLICY "Service role can do everything" ON public.blog_posts
    FOR ALL USING (auth.role() = 'service_role');
