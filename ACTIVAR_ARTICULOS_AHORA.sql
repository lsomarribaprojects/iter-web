-- =============================================
-- ACTIVAR TODOS LOS ARTÍCULOS DEL BLOG
-- =============================================

-- Paso 1: Ver cuántos artículos hay y su estado
SELECT COUNT(*) as total, published
FROM blog_posts
GROUP BY published;

-- Paso 2: ACTIVAR TODOS LOS ARTÍCULOS
UPDATE blog_posts
SET published = true;

-- Paso 3: Verificar que se activaron
SELECT COUNT(*) as articulos_activos
FROM blog_posts
WHERE published = true;

-- Paso 4: Ver los primeros 5 artículos para confirmar
SELECT id, title, slug, published
FROM blog_posts
LIMIT 5;