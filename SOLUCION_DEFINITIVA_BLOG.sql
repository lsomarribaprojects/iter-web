-- =============================================
-- SOLUCIÓN DEFINITIVA PARA EL BLOG
-- =============================================
-- Este script hace TODO lo necesario para que funcione

-- PASO 1: Limpiar tabla (opcional - descomentar si quieres empezar de cero)
-- DELETE FROM blog_posts;

-- PASO 2: Verificar estado actual
SELECT 'ESTADO ACTUAL:' as info;
SELECT COUNT(*) as total_articulos,
       SUM(CASE WHEN published = true THEN 1 ELSE 0 END) as articulos_publicados,
       SUM(CASE WHEN published = false OR published IS NULL THEN 1 ELSE 0 END) as articulos_no_publicados
FROM blog_posts;

-- PASO 3: Si hay artículos, activarlos TODOS
UPDATE blog_posts
SET published = true
WHERE published = false OR published IS NULL;

-- PASO 4: Verificar que funcionó
SELECT 'DESPUÉS DEL UPDATE:' as info;
SELECT COUNT(*) as total_articulos_activos
FROM blog_posts
WHERE published = true;

-- PASO 5: Mostrar los primeros 5 artículos
SELECT 'PRIMEROS 5 ARTÍCULOS:' as info;
SELECT id, title, slug, published, created_at
FROM blog_posts
WHERE published = true
ORDER BY created_at DESC
LIMIT 5;

-- =============================================
-- SI NO HAY ARTÍCULOS, EJECUTA PRIMERO:
-- blog_17_articles_completed.sql
-- Y LUEGO VUELVE A EJECUTAR ESTE SCRIPT
-- =============================================