import { NextRequest, NextResponse } from 'next/server'

const PAISES_VIP: Record<string,string> = {
  'AE':'🇦🇪 Dubai/Emiratos',
  'JP':'🇯🇵 Japón',
  'US':'🇺🇸 USA',
  'DE':'🇩🇪 Alemania',
  'GB':'🇬🇧 Reino Unido',
  'FR':'🇫🇷 Francia',
  'CH':'🇨🇭 Suiza',
  'SG':'🇸🇬 Singapur',
  'HK':'🇭🇰 Hong Kong',
  'QA':'🇶🇦 Qatar',
  'SA':'🇸🇦 Arabia Saudita',
  'KW':'🇰🇼 Kuwait',
  'AU':'🇦🇺 Australia',
  'CN':'🇨🇳 China',
  'JP':'🇯🇵 Japón',
  'KR':'🇰🇷 Corea',
  'IT':'🇮🇹 Italia',
  'NL':'🇳🇱 Holanda',
  'SE':'🇸🇪 Suecia',
  'NO':'🇳🇴 Noruega',
  'MC':'🇲🇨 Mónaco',
  'LU':'🇱🇺 Luxemburgo',
}

export async function POST(req: NextRequest) {
  try {
    const { pagina, producto } = await req.json()
    const country = req.headers.get('x-vercel-ip-country') || 'XX'
    const ip = req.headers.get('x-forwarded-for') || 'desconocida'
    const paisNombre = PAISES_VIP[country]
    
    if (!paisNombre) return NextResponse.json({ ok: true, vip: false })

    // Enviar email alerta VIP via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'alertas@houseinsectsofperu.com',
        to: ['houseinsectsofperu.com.pe@gmail.com', 'jzalopez02@gmail.com'],
        subject: `🚨 CLIENTE VIP DETECTADO — ${paisNombre}`,
        html: `
          <div style="font-family:Georgia,serif;background:#1A1209;color:#E8C97A;padding:32px;border-radius:12px">
            <h1 style="color:#C9A84C;font-size:1.5rem;margin-bottom:16px">🚨 Cliente VIP en tu Web</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">País:</td><td style="padding:8px;color:#E8C97A">${paisNombre}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">Página visitada:</td><td style="padding:8px;color:#E8C97A">${pagina || 'Inicio'}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">Producto de interés:</td><td style="padding:8px;color:#E8C97A">${producto || 'General'}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">IP:</td><td style="padding:8px;color:#E8C97A">${ip}</td></tr>
              <tr><td style="padding:8px;color:#C9A84C;font-weight:bold">Hora:</td><td style="padding:8px;color:#E8C97A">${new Date().toLocaleString('es-PE', {timeZone:'America/Lima'})}</td></tr>
            </table>
            <div style="margin-top:24px;padding:16px;background:rgba(201,168,76,0.1);border-radius:8px">
              <p style="color:#C9A84C;font-weight:bold;margin-bottom:8px">Contacta ahora:</p>
              <a href="https://wa.me/51940699405" style="background:#25D366;color:white;padding:10px 20px;border-radius:4px;text-decoration:none;font-weight:bold">💬 WhatsApp</a>
            </div>
            <p style="color:rgba(201,168,76,0.4);font-size:.7rem;margin-top:16px">House Insects of Peru · RUC 20447397804 · houseinsectsofperu.com</p>
          </div>
        `
      })
    })

    return NextResponse.json({ ok: true, vip: true, country: paisNombre })
  } catch(e) {
    return NextResponse.json({ ok: false })
  }
}
