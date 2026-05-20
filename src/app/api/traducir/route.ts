import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { texto, idioma } = await req.json()
  
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Traduce este texto al idioma con código "${idioma}". Responde SOLO con el texto traducido, sin explicaciones ni comillas:

${texto}`
    }]
  })
  
  const traduccion = response.content[0].type === 'text' ? response.content[0].text : texto
  return NextResponse.json({ traduccion })
}
