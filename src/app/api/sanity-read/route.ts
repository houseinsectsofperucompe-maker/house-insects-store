import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function GET() {
  try {
    const data = await client.fetch(`*[_type=="especie"]{
      _id,
      "n": nombre,
      "p": precio,
      "s": stock,
      "foto": fotoFrente,
      "fotoLado": fotoLado,
      "fotoReverso": fotoReverso,
      familia,
      activo
    } | order(familia asc, nombre asc)`)
    return NextResponse.json(data)
  } catch(e: any) {
    return NextResponse.json([], { status: 500 })
  }
}
