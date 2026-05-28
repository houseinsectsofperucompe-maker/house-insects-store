import { NextResponse, NextRequest } from 'next/server'
import catalogoData from '@/data/catalogo.json'

export const revalidate = 300

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const fam = (catalogoData as any[]).find((f:any) => f.id === id)
  if (!fam) return NextResponse.json(null, {status:404})
  return NextResponse.json(fam, {
    headers: {'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'}
  })
}
