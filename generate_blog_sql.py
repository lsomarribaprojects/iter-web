#!/usr/bin/env python3
"""
Script para generar archivo SQL con artículos de blog desde archivos markdown.
Extrae frontmatter YAML y contenido markdown.
"""

import os
import re
from datetime import datetime, timedelta

def parse_markdown_file(filepath):
    """Extrae frontmatter y contenido de archivo markdown."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extraer frontmatter (entre --- y ---)
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n(.*)', content, re.DOTALL)

    if not frontmatter_match:
        return None

    frontmatter_text = frontmatter_match.group(1)
    markdown_content = frontmatter_match.group(2).strip()

    # Parsear frontmatter YAML manualmente
    metadata = {}
    for line in frontmatter_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")

            # Manejar arrays (tags)
            if key == 'tags' and '[' in value:
                # Extraer tags del formato [tag1, tag2, tag3]
                tags_match = re.findall(r'"([^"]+)"|\'([^\']+)\'|([^,\[\]]+)', value)
                metadata[key] = [t[0] or t[1] or t[2].strip() for t in tags_match if any(t)]
            else:
                metadata[key] = value

    metadata['content'] = markdown_content

    return metadata

def escape_sql_string(text):
    """Escapa comillas simples para SQL."""
    if text is None:
        return ''
    return text.replace("'", "''")

def generate_sql_insert(article, index):
    """Genera INSERT statement para un artículo."""

    # Fechas distribuidas en los últimos 3 meses
    days_ago = (index * 5)  # Un artículo cada 5 días aproximadamente
    published_date = datetime.now() - timedelta(days=days_ago)
    published_at = published_date.strftime('%Y-%m-%d %H:%M:%S')
    created_at = published_at

    # Extraer datos
    title = escape_sql_string(article.get('title', ''))
    slug = article.get('slug', '')
    excerpt = escape_sql_string(article.get('excerpt', ''))
    content_md = escape_sql_string(article.get('content', ''))
    category = article.get('category', 'solar')
    tags = article.get('tags', [])
    author = 'Equipo ITER'
    image_url = f"/blog/{slug}.jpg"

    # Formatear tags para PostgreSQL array
    tags_formatted = "{" + ",".join([f'"{escape_sql_string(tag)}"' for tag in tags]) + "}"

    # Generar INSERT
    sql = f"""
INSERT INTO public.blog_posts (
    title,
    slug,
    excerpt,
    content,
    image_url,
    category,
    tags,
    author,
    published,
    published_at,
    created_at,
    updated_at
) VALUES (
    '{title}',
    '{slug}',
    '{excerpt}',
    '{content_md}',
    '{image_url}',
    '{category}',
    ARRAY[{','.join([f"'{escape_sql_string(tag)}'" for tag in tags])}]::text[],
    '{author}',
    true,
    '{published_at}'::timestamp,
    '{created_at}'::timestamp,
    '{created_at}'::timestamp
);
"""

    return sql

def main():
    blog_dir = r'c:\Users\Bimma\Apps\Web ITER\blog-articles'
    output_file = r'c:\Users\Bimma\Apps\Web ITER\blog_17_articles_completed.sql'

    # Obtener archivos markdown ordenados
    md_files = sorted([f for f in os.listdir(blog_dir) if f.endswith('.md')])

    print(f"📁 Encontrados {len(md_files)} archivos markdown")

    # Generar SQL
    sql_statements = []
    sql_statements.append("-- ================================================")
    sql_statements.append("-- ITER Energy Solutions - Blog Articles Import")
    sql_statements.append(f"-- Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    sql_statements.append(f"-- Total articles: {len(md_files)}")
    sql_statements.append("-- ================================================\n")
    sql_statements.append("-- Truncate existing data (optional, comment out if you want to keep existing)")
    sql_statements.append("-- TRUNCATE TABLE public.blog_posts RESTART IDENTITY CASCADE;\n")

    successful = 0
    failed = []

    for index, md_file in enumerate(md_files, 1):
        filepath = os.path.join(blog_dir, md_file)
        print(f"📄 Procesando {index}/{len(md_files)}: {md_file}")

        try:
            article = parse_markdown_file(filepath)
            if article:
                sql = generate_sql_insert(article, index)
                sql_statements.append(f"-- Article {index}: {article.get('title', 'Untitled')}")
                sql_statements.append(sql)
                successful += 1
            else:
                failed.append(md_file)
                print(f"  ⚠️  No se pudo parsear frontmatter")
        except Exception as e:
            failed.append(md_file)
            print(f"  ❌ Error: {e}")

    # Escribir archivo SQL
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(sql_statements))

    print(f"\n{'='*60}")
    print(f"✅ SQL generado exitosamente")
    print(f"📊 Artículos procesados: {successful}/{len(md_files)}")
    if failed:
        print(f"❌ Fallidos: {len(failed)}")
        for f in failed:
            print(f"  - {f}")
    print(f"📝 Archivo: {output_file}")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    main()
