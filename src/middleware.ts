import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const lang = req.cookies.get('lang')?.value || 'es'
  const res = NextResponse.next()
  res.headers.set('x-lang', lang)
  return res
}

export const config = {
  matcher: ['/((?!api|_next|favicon|images|logo|categorias).*)'],
}
