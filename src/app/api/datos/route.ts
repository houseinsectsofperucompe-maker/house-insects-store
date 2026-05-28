import { NextResponse, NextRequest } from 'next/server'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const DATA_PATH = join(process.cwd(), 'src/data/catalogo.json')
const getData = () => JSON.parse(readFileSync(DATA_PATH, 'utf-8'))
const saveData = (data: any) => writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))

export async function GET(req: NextRequest) {
  const familia = req.nextUrl.searchParams.get('familia')
  const tipo = req.nextUrl.searchParams.get('tipo')
  const data = getData()
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
  try {
    const { action, data: payload } = await req.json()
    const data = getData()
    if (action === 'updateEspecie') {
      const fam = data.find((f: any) => f.id === payload.familia)
      if (fam) {
        const idx = fam.e.findIndex((e: any) => e.n === payload.nOriginal || e.n === payload.n)
        if (idx >= 0) fam.e[idx] = {n:payload.n,p:payload.p,s:payload.s,foto:payload.foto}
        else fam.e.push({n:payload.n,p:payload.p,s:payload.s,foto:payload.foto})
        saveData(data)
        return NextResponse.json({ ok: true })
      }
    }
    if (action === 'addEspecie') {
      const fam = data.find((f: any) => f.id === payload.familia)
      if (fam) { fam.e.push({n:payload.n,p:payload.p||0,s:payload.s||0}); saveData(data) }
      return NextResponse.json({ ok: true })
    }
    if (action === 'deleteEspecie') {
      const fam = data.find((f: any) => f.id === payload.familia)
      if (fam) { fam.e = fam.e.filter((e: any) => e.n !== payload.n); saveData(data) }
      return NextResponse.json({ ok: true })
    }
    if (action === 'addFamilia') {
      if (!data.find((f: any) => f.id === payload.id)) {
        data.push({ id: payload.id, nm: payload.nm, e: [] })
        saveData(data)
      }
      return NextResponse.json({ ok: true })
    }
    if (action === 'deleteFamilia') {
      const idx = data.findIndex((f: any) => f.id === payload.id)
      if (idx >= 0) { data.splice(idx, 1); saveData(data) }
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, error: 'Accion no reconocida' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
