import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const cache: Record<string,string> = {}

export async function POST(req: NextRequest) {
  try {
    const { textos, idioma } = await req.json()
    if (!textos?.length || idioma==='es') return NextResponse.json({ traducciones: textos })
    
    const pendientes = textos.filter((t:string) => !cache[idioma+':'+t])
    
    if (pendientes.length > 0) {
      const lista = pendientes.map((t:string,i:number) => (i+1)+'. '+t).join('\n')
      const response = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: 'Traduce al idioma "'+idioma+'". Responde SOLO con el mismo formato numerado, sin explicaciones:\n\n'+lista }]
      })
      const result = response.content[0].type==='text' ? response.content[0].text : ''
      const lines = result.split('\n').filter((l:string)=>l.trim())
      pendientes.forEach((t:string,i:number)=>{
        const line = lines[i]||t
        const translation = line.replace(/^\d+\.\s*/,'').trim()
        cache[idioma+':'+t] = translation
      })
    }
    
    const traducciones = textos.map((t:string) => cache[idioma+':'+t]||t)
    return NextResponse.json({ traducciones })
  } catch(e) {
    console.error(e)
    return NextResponse.json({ traducciones: [] })
  }
}
