import { NextResponse } from 'next/server'
import catalogoData from '@/data/catalogo.json'

export const revalidate = 300

export async function GET() {
  return NextResponse.json(catalogoData, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    }
  })
}

export async function POST() {
  return NextResponse.json({ ok: false })
}
