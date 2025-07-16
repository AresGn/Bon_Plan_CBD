import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'votre-secret-jwt-temporaire'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Optimisations de cache
  // Cache pour les assets statiques
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Cache pour les images
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, must-revalidate')
  }
  
  // Cache pour les fonts
  if (request.nextUrl.pathname.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Cache pour les fichiers CSS
  if (request.nextUrl.pathname.match(/\.css$/)) {
    response.headers.set('Cache-Control', 'public, max-age=86400, must-revalidate')
  }
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Protéger les routes admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/compte', request.url))
    }

    try {
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      // Vérifier si l'utilisateur est admin
      if (payload.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/compte', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/compte', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/image (image optimization)
     */
    '/((?!api|_next/image).*)',
  ],
}
