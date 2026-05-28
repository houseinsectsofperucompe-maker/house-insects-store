import { NextResponse, NextRequest } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

function getFAM() {
  const file = readFileSync(join(process.cwd(), 'src/data/catalogo.json'), 'utf-8')
  return JSON.parse(file)
}

export async function GET(req: NextRequest) {
  const familia = req.nextUrl.searchParams.get('familia')
  const tipo = req.nextUrl.searchParams.get('tipo')
  const data = getFAM()
  if (familia) {
    const fam = data.find((f: any) => f.id === familia)
    return NextResponse.json(fam || null)
  }
  if (tipo === 'resumen') {
    return NextResponse.json(data.map((f: any) => ({ id: f.id, nm: f.nm, count: f.e.length })))
  }
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ ok: false, error: 'Use Upstash para escritura' })
}
