import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

const KEY = 'catalogo:familias'

const getData = async () => {
  const data = await redis.get(KEY)
  return (data as any[]) || []
}

export async function GET(req: NextRequest) {
  const familia = req.nextUrl.searchParams.get('familia')
  const tipo = req.nextUrl.searchParams.get('tipo')
  const data = await getData()
  if (familia) {
    const fam = data.find((f: any) => f.id === familia)
    return NextResponse.json(fam || null)
  }
  if (tipo === 'resumen') {
    return NextResponse.json(data.map((f: any) => ({ id: f.id, nm: f.nm, count: f.e?.length||0, orden: f.orden })))
  }
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  try {
    const { action, data: payload } = await req.json()
    const data = await getData()

    if (action === 'updateEspecie') {
      const fam = data.find((f: any) => f.id === payload.familia)
      if (fam) {
        const idx = fam.e.findIndex((e: any) => e.n === payload.nOriginal || e.n === payload.n)
        if (idx >= 0) fam.e[idx] = {n:payload.n,p:payload.p,s:payload.s,foto:payload.foto}
        else fam.e.push({n:payload.n,p:payload.p||0,s:payload.s||0,foto:payload.foto})
        await redis.set(KEY, data)
        return NextResponse.json({ ok: true })
      }
    }
    if (action === 'addEspecie') {
      const fam = data.find((f: any) => f.id === payload.familia)
      if (fam) { fam.e.push({n:payload.n,p:payload.p||0,s:payload.s||0}); await redis.set(KEY, data) }
      return NextResponse.json({ ok: true })
    }
    if (action === 'deleteEspecie') {
      const fam = data.find((f: any) => f.id === payload.familia)
      if (fam) { fam.e = fam.e.filter((e: any) => e.n !== payload.n); await redis.set(KEY, data) }
      return NextResponse.json({ ok: true })
    }
    if (action === 'addFamilia') {
      if (!data.find((f: any) => f.id === payload.id)) {
        data.push({ id: payload.id, nm: payload.nm, orden: payload.orden||'Lepidoptera Diurnae', e: [] })
        await redis.set(KEY, data)
      }
      return NextResponse.json({ ok: true })
    }
    if (action === 'deleteFamilia') {
      const idx = data.findIndex((f: any) => f.id === payload.id)
      if (idx >= 0) { data.splice(idx, 1); await redis.set(KEY, data) }
      return NextResponse.json({ ok: true })
    }
    if (action === 'updateFamilia') {
      const idx = data.findIndex((f: any) => f.id === payload.idOriginal || f.id === payload.id)
      if (idx >= 0) { data[idx] = {...data[idx], id:payload.id, nm:payload.nm}; await redis.set(KEY, data) }
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, error: 'Accion no reconocida' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
