import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  let data = await redis.get('catalogo:familias') as any
  if (typeof data === 'string') data = JSON.parse(data)
  const familia = data?.find((f: any) => f.id === params.id)
  if (!familia) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(familia)
}
