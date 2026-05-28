import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export const revalidate = 30

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  const data = await redis.get('catalogo:familias') as any[]
  const fam = (data||[]).find((f:any) => f.id === id)
  if (!fam) return NextResponse.json(null, {status:404})
  return NextResponse.json(fam, {
    headers: {'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60'}
  })
}
