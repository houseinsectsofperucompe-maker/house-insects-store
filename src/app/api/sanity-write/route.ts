import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json()

    if (action === 'update') {
      const result = await client.patch(data._id)
        .set({ precio: data.precio, stock: data.stock, fotoFrente: data.fotoFrente, fotoLado: data.fotoLado, fotoReverso: data.fotoReverso, activo: data.activo })
        .commit()
      return NextResponse.json({ ok: true, result })
    }

    if (action === 'create') {
      const result = await client.create({
        _type: 'especie',
        nombre: data.nombre,
        familia: data.familia,
        ordenCategoria: data.ordenCategoria || 'Lepidoptera Diurnae',
        precio: data.precio || 0,
        stock: data.stock || 0,
        activo: true,
      })
      return NextResponse.json({ ok: true, result })
    }

    if (action === 'delete') {
      await client.delete(data._id)
      return NextResponse.json({ ok: true })
    }

    if (action === 'createFamilia') {
      const result = await client.create({
        _type: 'familia',
        nombre: data.nombre,
        orden: data.orden || 'Lepidoptera Diurnae',
        activo: true,
      })
      return NextResponse.json({ ok: true, result })
    }

    return NextResponse.json({ ok: false, error: 'Acción no reconocida' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
