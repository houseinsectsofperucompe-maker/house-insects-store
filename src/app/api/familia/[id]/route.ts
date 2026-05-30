import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export const revalidate = 3600

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  let data = await redis.get(`catalogo:familia:${id}`) as any[]
  if (!data) {
    let todas = await redis.get('catalogo:familias') as any
    if (typeof todas === 'string') todas = JSON.parse(todas)
    if (typeof todas === 'string') todas = JSON.parse(todas)
    const fam = todas?.find((f: any) => f.id === id)
    data = fam?.e || []
  }
  return NextResponse.json(data || [], {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    }
  })
}
