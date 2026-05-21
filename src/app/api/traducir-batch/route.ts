import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { textos, idioma } = await req.json()
    if (!textos?.length || idioma==='es') return NextResponse.json({ traducciones: textos })
    const traducciones = await Promise.all(
      textos.map(async (texto: string) => {
        try {
          const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|${idioma}&de=houseinsectsofperu.com.pe@gmail.com`
          const res = await fetch(url)
          const data = await res.json()
          return data.responseStatus===200 ? data.responseData.translatedText : texto
        } catch { return texto }
      })
    )
    return NextResponse.json({ traducciones })
  } catch {
    return NextResponse.json({ traducciones: [] })
  }
}
