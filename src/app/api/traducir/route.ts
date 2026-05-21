import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { texto, idioma } = await req.json()
    if (!texto || idioma === 'es') return NextResponse.json({ traduccion: texto })
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|${idioma}&de=houseinsectsofperu.com.pe@gmail.com`
    const res = await fetch(url)
    const data = await res.json()
    if (data.responseStatus === 200) {
      return NextResponse.json({ traduccion: data.responseData.translatedText })
    }
    return NextResponse.json({ traduccion: texto })
  } catch {
    return NextResponse.json({ traduccion: '' })
  }
}
