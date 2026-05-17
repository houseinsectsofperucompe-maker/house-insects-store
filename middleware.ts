import { NextRequest, NextResponse } from 'next/server'

const COUNTRY_LOCALE: Record<string, string> = {
  CN:'zh', TW:'zh', HK:'zh', JP:'ja', KR:'ko',
  AE:'ar', SA:'ar', QA:'ar', EG:'ar', MA:'ar',
  US:'en', CA:'en', AU:'en', GB:'en', NZ:'en', SG:'en',
  DE:'de', FR:'fr', IT:'it', BR:'pt', PT:'pt',
  RU:'ru', TR:'tr',
  PE:'es', MX:'es', CO:'es', AR:'es', CL:'es',
}

const LOCALES = ['es','en','zh','ja','ko','ar','de','fr','it','pt','ru','tr']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/studio') || pathname.includes('.')) return NextResponse.next()
  const hasLocale = LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()
  const country = req.geo?.country || req.headers.get('x-vercel-ip-country') || 'PE'
  const locale = COUNTRY_LOCALE[country] || 'es'
  const res = NextResponse.redirect(new URL(`/${locale}${pathname === '/' ? '' : pathname}`, req.url))
  res.headers.set('x-visitor-country', country)
  if (['CN','HK','TW'].includes(country)) res.headers.set('x-china-visitor', '1')
  return res
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico|api|studio).*)'] }
