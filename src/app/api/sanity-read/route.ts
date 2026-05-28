import { NextResponse, NextRequest } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sklfHrDIKRAM4FzHerAVfprMrhxYUfjuArRwMmhMRtgCb9Bwf6QfSqoLQ2kJwcj1s1awC86sXf6x7DdnZ',
  useCdn: false,
})

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') || 'especie'
  try {
    if (type === 'especie') {
      const data = await client.fetch(`*[_type=="especie"][0..300]{_id,"n":nombre,"p":precio,"s":stock,"foto":fotoFrente,"fotoLado":fotoLado,"fotoReverso":fotoReverso,familia,subfamilia,activo,calidad,sexo,video,descripcion}|order(familia asc,nombre asc)`)
      return NextResponse.json(data)
    }
    if (type === 'familia') {
      const data = await client.fetch(`*[_type=="familia"]{_id,nombre,orden,activo}|order(nombre asc)`)
      return NextResponse.json(data)
    }
    if (type === 'orden') {
      const data = await client.fetch(`*[_type=="orden"]{_id,nombre,icono,activo}|order(nombre asc)`)
      return NextResponse.json(data)
    }
    return NextResponse.json([])
  } catch(e: any) {
    return NextResponse.json({error: e.message}, { status: 500 })
  }
}
