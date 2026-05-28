import { NextResponse, NextRequest } from 'next/server'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skhMd82U9n5Vf5FwJed24DkdCWUoLvffGbV6nfc0bDhPvjgj34v4n2lRPt5q1xJGqEQsr1UxOJt3TLPtmC2gh6UBtPjyKL343jEHOVbOqVfxGTAfuQ8qOEdywdn8xvzGF0U1Za907rHfhWzI8mzrq9SpPNhhpJnDx8CZT1Hi6sSHgv1Toofr',
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
    if (type === 'pedido') {
      const data = await client.fetch(`*[_type=="pedido"]{_id,numero,origen,cliente,email,telefono,whatsapp,wechat,pais,ciudad,direccion,items,subtotal,costoEnvio,seguro,descuento,total,drawback,estado,metodoPago,courier,aseguradora,tracking,urlTracking,factura,notas,notasCliente,fecha,fechaEnvio,fechaEntrega}|order(fecha desc)`)
      return NextResponse.json(data)
    }
    if (type === 'cliente') {
      const data = await client.fetch(`*[_type=="cliente"]{_id,nombre,email,telefono,whatsapp,instagram,wechat,pais,ciudad,direccion,grupo,descuento,totalCompras,numeroPedidos,ultimaCompra,notas,activo,fecha}|order(nombre asc)`)
      return NextResponse.json(data)
    }
    return NextResponse.json([])
  } catch(e: any) {
    return NextResponse.json({error: e.message}, { status: 500 })
  }
}
