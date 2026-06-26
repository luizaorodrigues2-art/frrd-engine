import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const STUDIO_PATHS = ['/studio']
const AUTH_PATHS = ['/studio/login', '/studio/register', '/studio/forgot-password', '/studio/reset-password']

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  const isStudioPath = pathname.startsWith('/studio')
  const isAuthPath = AUTH_PATHS.some(p => pathname.startsWith(p))

  // Redirect unauthenticated users from studio to login
  if (isStudioPath && !isAuthPath && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/studio/login'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/studio/dashboard'
    return NextResponse.redirect(url)
  }

  // Redirect /studio root to dashboard if authenticated
  if (pathname === '/studio' && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/studio/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/studio/:path*'],
}

