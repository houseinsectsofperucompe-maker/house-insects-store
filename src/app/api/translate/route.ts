import { NextRequest, NextResponse } from 'next/server'
import { traducirTodo } from '@/lib/translate'

export async function POST(req: NextRequest) {
  try {
    const { texto } = await req.json()
    if (!texto) return NextResponse.json({ error: 'No texto' }, { status: 400 })
    const traducciones = await traducirTodo(texto)
    return NextResponse.json(traducciones, {
      headers: { 'Cache-Control': 'public, max-age=86400' }
    })
  } catch {
    return NextResponse.json({ error: 'Error traduciendo' }, { status: 500 })
  }
}
