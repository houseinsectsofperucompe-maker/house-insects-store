import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export const revalidate = 0

export async function GET(req: NextRequest) {
  const tipo = req.nextUrl.searchParams.get('tipo')
  const familia = req.nextUrl.searchParams.get('familia')

  if (tipo === 'rubros') {
    const data = await redis.get('catalogo:rubros') as any[]
    return NextResponse.json(data || [])
  }
  if (tipo === 'ordenes') {
    const data = await redis.get('catalogo:ordenes') as any[]
    return NextResponse.json(data || [])
  }
  if (tipo === 'rubros') {
    const data = await redis.get('catalogo:rubros') as any[]
    return NextResponse.json(data || [])
  }
  if (tipo === 'resumen') {
    const data = await redis.get('catalogo:familias') as any[]
    return NextResponse.json((data||[]).map((f:any)=>({id:f.id,nm:f.nm,count:f.e?.length||0,orden:f.orden})))
  }
  if (familia) {
    const data = await redis.get('catalogo:familias') as any[]
    const fam = (data||[]).find((f:any)=>f.id===familia)
    return NextResponse.json(fam||null)
  }
  const data = await redis.get('catalogo:familias') as any[]
  return NextResponse.json(data||[])
}

export async function POST(req: NextRequest) {
  try {
    const { action, data: payload } = await req.json()

    if (action === 'updateEspecie'||action === 'addEspecie'||action === 'deleteEspecie'||action === 'addFamilia'||action === 'deleteFamilia'||action === 'updateFamilia') {
      const data = await redis.get('catalogo:familias') as any[]
      if (action === 'updateEspecie') {
        const fam = data.find((f:any)=>f.id===payload.familia)
        if (fam) {
          const idx = fam.e.findIndex((e:any)=>e.n===payload.nOriginal||e.n===payload.n)
          if (idx>=0) fam.e[idx]={...fam.e[idx],n:payload.n,p:payload.p||0,s:payload.s||0,foto:payload.foto||fam.e[idx].foto||'',fotoLado:payload.fotoLado||fam.e[idx].fotoLado||'',fotoReverso:payload.fotoReverso||fam.e[idx].fotoReverso||'',video:payload.video||fam.e[idx].video||'',calidad:payload.calidad||'A1',sexo:payload.sexo||'M or F',tamano:payload.tamano||'',activo:payload.activo!==false,descripcion:payload.descripcion||'',metaTitulo:payload.metaTitulo||'',descripcionEN:payload.descripcionEN||'',descripcionZH:payload.descripcionZH||''}
          else fam.e.push({n:payload.n,p:payload.p||0,s:payload.s||0,foto:payload.foto})
          await redis.set('catalogo:familias',data)
        }
      }
      if (action === 'addEspecie') {
        const fam = data.find((f:any)=>f.id===payload.familia)
        if (fam) { fam.e.push({n:payload.n,p:payload.p||0,s:payload.s||0}); await redis.set('catalogo:familias',data) }
      }
      if (action === 'deleteEspecie') {
        const fam = data.find((f:any)=>f.id===payload.familia)
        if (fam) { fam.e=fam.e.filter((e:any)=>e.n!==payload.n); await redis.set('catalogo:familias',data) }
      }
      if (action === 'addFamilia') {
        if (!data.find((f:any)=>f.id===payload.id)) {
          data.push({id:payload.id,nm:payload.nm,orden:payload.orden||'Lepidoptera Diurnae',e:[],activo:true})
          await redis.set('catalogo:familias',data)
        }
      }
      if (action === 'deleteFamilia') {
        const idx=data.findIndex((f:any)=>f.id===payload.id)
        if (idx>=0) { data.splice(idx,1); await redis.set('catalogo:familias',data) }
      }
      if (action === 'updateFamilia') {
        const idx=data.findIndex((f:any)=>f.id===payload.idOriginal||f.id===payload.id)
        if (idx>=0) { data[idx]={...data[idx],id:payload.id,nm:payload.nm}; await redis.set('catalogo:familias',data) }
      }
      return NextResponse.json({ ok: true })
    }

    if (action === 'addOrden') {
      const data = await redis.get('catalogo:ordenes') as any[]
      data.push({id:payload.nombre,nombre:payload.nombre,icono:payload.icono||'📦',activo:true})
      await redis.set('catalogo:ordenes',data)
      return NextResponse.json({ ok: true })
    }

    return NextResponse.json({ ok: false, error: 'Accion no reconocida' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
