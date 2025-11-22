/**
 * Middleware de Next.js para proteger rutas
 * Ejecuta antes de cada request para verificar autenticación
 *
 * NOTA: Este middleware verifica si hay una cookie de sesión de Supabase.
 * Para una verificación más robusta, considera instalar @supabase/auth-helpers-nextjs
 */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas que requieren autenticación
const PROTECTED_ROUTES = ['/admin', '/profile']

// Rutas de autenticación (redirigir si ya está autenticado)
const AUTH_ROUTES = ['/login', '/register']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Verificar si hay cookie de sesión de Supabase
  const supabaseAuthToken = req.cookies.get('sb-yemlhpqwtdcofdqtomnl-auth-token')
  const hasSession = !!supabaseAuthToken

  // Verificar si es una ruta protegida
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  )

  // Verificar si es una ruta de autenticación
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))

  // Si intenta acceder a ruta protegida sin autenticación
  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si intenta acceder a rutas de auth ya estando autenticado
  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
