import { NextRequest, NextResponse } from 'next/server'

const PAISES_VIP: Record<string,string> = {
  'AE':'🇦🇪 Dubai/Emiratos','JP':'🇯🇵 Japón','US':'🇺🇸 USA',
  'DE':'🇩🇪 Alemania','GB':'🇬🇧 Reino Unido','FR':'🇫🇷 Francia',
  'CH':'🇨🇭 Suiza','SG':'🇸🇬 Singapur','HK':'🇭🇰 Hong Kong',
  'QA':'🇶🇦 Qatar','SA':'🇸🇦 Arabia Saudita','KW':'🇰🇼 Kuwait',
  'AU':'🇦🇺 Australia','CN':'🇨🇳 China','KR':'🇰🇷 Corea',
  'IT':'🇮🇹 Italia','NL':'🇳🇱 Holanda','SE':'🇸🇪 Suecia',
  'NO':'🇳🇴 Noruega','MC':'🇲🇨 Mónaco','LU':'🇱🇺 Luxemburgo',
}

export async function POST(req: NextRequest) {
  try {
    const { pagina, producto } = await req.json()
    const country = req.headers.get('x-vercel-ip-country') || 'XX'
    const ip = req.headers.get('x-forwarded-for') || 'desconocida'
    const paisNombre = PAISES_VIP[country]

    if (!paisNombre) return NextResponse.json({ ok: true, vip: false })

    const timestamp = new Date().toLocaleString('es-PE', {timeZone:'America/Lima'})

    // Guardar en HubSpot CRM
    await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          firstname: `Visitante VIP`,
          lastname: `${paisNombre} — ${timestamp}`,
          email: `vip-${Date.now()}@lead.houseinsectsofperu.com`,
          company: `Lead desde ${paisNombre}`,
          website: `houseinsectsofperu.com/${pagina||''}`,
          phone: ip,
          hs_lead_status: 'NEW',
          lifecyclestage: 'lead',
        }
      })
    })

    // Enviar email alerta via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'alertas@houseinsectsofperu.com',
        to: ['info@houseinsectsofperu.com','houseinsectsofperu.com.pe@gmail.com','jzalopez02@gmail.com'],
        subject: `🚨 CLIENTE VIP — ${paisNombre}`,
        html: `
          <div style="font-family:Georgia,serif;background:#1A1209;color:#E8C97A;padding:32px;border-radius:12px">
            <h1 style="color:#C9A84C;font-size:1.5rem;margin-bottom:16px">🚨 Cliente VIP en tu Web</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">País:</td><td style="padding:8px">${paisNombre}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">Página:</td><td style="padding:8px">${pagina||'Inicio'}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">Producto:</td><td style="padding:8px">${producto||'General'}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">Hora Lima:</td><td style="padding:8px">${timestamp}</td></tr>
            </table>
            <div style="margin-top:24px">
              <a href="https://app.hubspot.com/contacts/51457276" style="background:#FF7A59;color:white;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:bold;margin-right:10px">📊 Ver en HubSpot</a>
              <a href="https://wa.me/51940699405" style="background:#25D366;color:white;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:bold">💬 WhatsApp</a>
            </div>
          </div>
        `
      })
    })

    return NextResponse.json({ ok: true, vip: true, country: paisNombre })
  } catch(e) {
    return NextResponse.json({ ok: false })
  }
}
