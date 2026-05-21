import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const cache: Record<string, string> = {}

export async function POST(req: NextRequest) {
  const { texto, idioma } = await req.json()
  if (!texto || idioma === 'es') return NextResponse.json({ traduccion: texto })
  const key = idioma + ':' + texto.slice(0, 80)
  if (cache[key]) return NextResponse.json({ traduccion: cache[key] })
  const response = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 200,
    messages: [{ role: 'user', content: 'Traduce al idioma "' + idioma + '". Solo el texto traducido sin explicaciones:\n\n' + texto }]
  })
  const traduccion = response.content[0].type === 'text' ? response.content[0].text.trim() : texto
  cache[key] = traduccion
  return NextResponse.json({ traduccion })
}
