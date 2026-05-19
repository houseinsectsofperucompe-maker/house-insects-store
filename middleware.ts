import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['es','en','de','fr','pt','it','ja','zh','ar','th','ko','ru','nl','pl','sv','da','fi','no','tr','vi','id'],
  defaultLocale: 'es',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
