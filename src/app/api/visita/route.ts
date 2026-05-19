import { NextRequest, NextResponse } from 'next/server'

const PAISES_VIP = ['AE','JP','US','DE','GB','FR','CH','SG','HK','QA','SA','KW','MC','LU','AU']

export async function POST(req: NextRequest) {
  try {
    const { pais, pagina, producto } = await req.json()
    const country = req.headers.get('x-vercel-ip-country') || pais || 'XX'
    const esVIP = PAISES_VIP.includes(country)

    if (esVIP) {
      // Enviar alerta por email via HubSpot
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            firstname: `Visitante VIP`,
            lastname: country,
            email: `vip-${Date.now()}@lead.houseinsectsofperu.com`,
            company: `Visitante de ${country}`,
            website: pagina || 'houseinsectsofperu.com',
            hs_lead_status: 'NEW',
            lifecyclestage: 'lead',
          }
        })
      })
    }

    return NextResponse.json({ ok: true, vip: esVIP, country })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
