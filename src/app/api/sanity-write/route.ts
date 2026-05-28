import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skhMd82U9n5Vf5FwJed24DkdCWUoLvffGbV6nfc0bDhPvjgj34v4n2lRPt5q1xJGqEQsr1UxOJt3TLPtmC2gh6UBtPjyKL343jEHOVbOqVfxGTAfuQ8qOEdywdn8xvzGF0U1Za907rHfhWzI8mzrq9SpPNhhpJnDx8CZT1Hi6sSHgv1Toofr',
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const { action, data } = await req.json()

    if (action === 'update') {
      const result = await client.patch(data._id).set({ precio: data.precio, stock: data.stock, fotoFrente: data.fotoFrente, fotoLado: data.fotoLado, fotoReverso: data.fotoReverso, activo: data.activo, calidad: data.calidad, sexo: data.sexo }).commit()
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'create') {
      const result = await client.create({ _type:'especie', nombre:data.nombre, familia:data.familia, subfamilia:data.subfamilia, ordenCategoria:data.ordenCategoria||'Lepidoptera Diurnae', precio:data.precio||0, stock:data.stock||0, activo:true })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'delete') {
      await client.delete(data._id)
      return NextResponse.json({ ok: true })
    }
    if (action === 'createFamilia') {
      const result = await client.create({ _type:'familia', nombre:data.nombre, orden:data.orden||'Lepidoptera Diurnae', activo:true })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'createOrden') {
      const result = await client.create({ _type:'orden', nombre:data.nombre, icono:data.icono||'🦋', activo:true })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'createPedido') {
      const result = await client.create({ _type:'pedido', ...data })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'updatePedido') {
      const {_id,...rest} = data
      const result = await client.patch(_id).set(rest).commit()
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'updateEstadoPedido') {
      const result = await client.patch(data._id).set({ estado: data.estado }).commit()
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'createCliente') {
      const result = await client.create({ _type:'cliente', ...data })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'updateCliente') {
      const {_id,...rest} = data
      const result = await client.patch(_id).set(rest).commit()
      return NextResponse.json({ ok: true, result })
    }
        if (action === 'createCatalogo') {
      const result = await client.create({ ...data })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'updateCatalogo') {
      const {_id,...rest} = data
      const result = await client.patch(_id).set(rest).commit()
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'createSeo') {
      const result = await client.create({ _type:'seoConfig', ...data })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'updateSeo') {
      const {_id,...rest} = data
      const result = await client.patch(_id).set(rest).commit()
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'createLogistica') {
      const result = await client.create({ ...data })
      return NextResponse.json({ ok: true, result })
    }
    if (action === 'updateLogistica') {
      const {_id,...rest} = data
      const result = await client.patch(_id).set(rest).commit()
      return NextResponse.json({ ok: true, result })
    }
    return NextResponse.json({ ok: false, error: 'Accion no reconocida' })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
