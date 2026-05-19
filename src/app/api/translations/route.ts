import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get('lang') || 'es'
  try {
    const t = await import(`../../../../messages/${lang}.json`)
    return NextResponse.json(t.default, {
      headers: { 'Cache-Control': 'public, max-age=86400' }
    })
  } catch {
    const t = await import(`../../../../messages/es.json`)
    return NextResponse.json(t.default)
  }
}
