import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const numero = searchParams.get('numero')
  const courier = searchParams.get('courier') || 'dhl'

  if (!numero) return NextResponse.json({ error: 'Número requerido' }, { status: 400 })

  try {
    let resultado = null

    if (courier === 'dhl') {
      const res = await fetch(`https://api-eu.dhl.com/track/shipments?trackingNumber=${numero}`, {
        headers: { 'DHL-API-Key': process.env.DHL_API_KEY || '' }
      })
      resultado = await res.json()
    }

    if (courier === 'fedex') {
      resultado = { tracking: numero, courier: 'fedex', url: `https://www.fedex.com/fedextrack/?trknbr=${numero}` }
    }

    if (courier === 'ups') {
      resultado = { tracking: numero, courier: 'ups', url: `https://www.ups.com/track?tracknum=${numero}` }
    }

    if (courier === 'aramex') {
      resultado = { tracking: numero, courier: 'aramex', url: `https://www.aramex.com/track/results?ShipmentNumber=${numero}` }
    }

    if (courier === 'ems' || courier === 'serpost') {
      resultado = { tracking: numero, courier: 'ems', url: `https://www.serpost.com.pe/tracking?codigo=${numero}` }
    }

    return NextResponse.json({ ok: true, resultado })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
