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
    const body = await req.json()
    const { slug, title, content, excerpt, meta_title, meta_description } = body

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    // Intentar actualizar usando RPC
    const { data, error } = await supabase.rpc('update_blog_post', {
      p_slug: slug,
      p_title: title,
      p_content: content,
      p_excerpt: excerpt,
      p_meta_title: meta_title,
      p_meta_description: meta_description
    })

    if (error) {
      console.error('Error updating article:', error)
      return NextResponse.json(
        { error: 'Update failed', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully',
      data
    })

  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Request failed', details: error.message },
      { status: 500 }
    )
  }
}
