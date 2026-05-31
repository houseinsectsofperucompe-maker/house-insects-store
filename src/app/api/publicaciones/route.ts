import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'public', 'data', 'publicaciones.json')

type Publicacion = {
  id: string
  titulo: string
  cuerpo: string
  imagen?: string
  video?: string
  hashtags: string[]
  cta: string
  url: string
  plataformas: string[]
  estado: 'pendiente' | 'publicado' | 'error' | 'programado'
  fechaProgramada?: string
  fechaPublicado?: string
  rubroId: string
  paisId: string
  idioma: string
  formato: string
  resultados: Record<string, any>
  creado: string
}

function leer(): Publicacion[] {
  try {
    if (!fs.existsSync(FILE)) return []
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  } catch { return [] }
}

function guardar(data: Publicacion[]) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
}

// ── GET — listar publicaciones ─────────────────────────────────
export async function GET(req: NextRequest) {
  const estado = req.nextUrl.searchParams.get('estado')
  const pubs = leer()
  const filtradas = estado ? pubs.filter(p => p.estado === estado) : pubs
  return NextResponse.json({ publicaciones: filtradas.sort((a,b) => b.creado.localeCompare(a.creado)) })
}

// ── POST — crear/publicar ──────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { accion } = body
  const pubs = leer()

  // Guardar publicación
  if (accion === 'guardar') {
    const nueva: Publicacion = {
      id:              `pub-${Date.now()}`,
      titulo:          body.titular || '',
      cuerpo:          body.cuerpo || '',
      imagen:          body.imagen || '',
      video:           body.video || '',
      hashtags:        body.hashtags || [],
      cta:             body.cta || '',
      url:             body.url || 'https://houseinsectsofperu.com',
      plataformas:     body.plataformas || [],
      estado:          body.fechaProgramada ? 'programado' : 'pendiente',
      fechaProgramada: body.fechaProgramada || '',
      rubroId:         body.rubroId || '',
      paisId:          body.paisId || '',
      idioma:          body.idioma || 'es',
      formato:         body.formato || 'post',
      resultados:      {},
      creado:          new Date().toISOString(),
    }
    pubs.push(nueva)
    guardar(pubs)
    return NextResponse.json({ ok: true, id: nueva.id })
  }

  // Publicar en website (guardar en JSON de avisos del sitio)
  if (accion === 'publicar-website') {
    const { id } = body
    const idx = pubs.findIndex(p => p.id === id)
    if (idx === -1) return NextResponse.json({ ok: false, error: 'No encontrado' })

    // Guardar en avisos del sitio web
    const avisosFile = path.join(process.cwd(), 'public', 'data', 'avisos-web.json')
    let avisos: any[] = []
    try { avisos = JSON.parse(fs.readFileSync(avisosFile, 'utf-8')) } catch {}
    
    avisos.push({
      id:       pubs[idx].id,
      titulo:   pubs[idx].titulo,
      cuerpo:   pubs[idx].cuerpo,
      imagen:   pubs[idx].imagen,
      hashtags: pubs[idx].hashtags,
      cta:      pubs[idx].cta,
      url:      pubs[idx].url,
      idioma:   pubs[idx].idioma,
      rubroId:  pubs[idx].rubroId,
      fechaPublicado: new Date().toISOString(),
    })
    fs.writeFileSync(avisosFile, JSON.stringify(avisos, null, 2))

    pubs[idx].estado = 'publicado'
    pubs[idx].fechaPublicado = new Date().toISOString()
    pubs[idx].resultados.website = { ok: true, fecha: new Date().toISOString() }
    guardar(pubs)
    return NextResponse.json({ ok: true, mensaje: 'Publicado en website' })
  }

  // Publicar en Facebook (cuando Meta apruebe)
  if (accion === 'publicar-facebook') {
    const token = process.env.META_ACCESS_TOKEN
    const pageId = process.env.META_PAGE_ID
    if (!token || !pageId) {
      return NextResponse.json({ ok: false, error: 'Meta API no configurada. Agrega META_ACCESS_TOKEN y META_PAGE_ID en .env.local' })
    }
    const { id } = body
    const idx = pubs.findIndex(p => p.id === id)
    if (idx === -1) return NextResponse.json({ ok: false, error: 'No encontrado' })

    try {
      const pub = pubs[idx]
      const texto = `${pub.titulo}\n\n${pub.cuerpo}\n\n${pub.hashtags.join(' ')}\n\n${pub.url}`
      
      const fbRes = await fetch(`https://graph.facebook.com/v18.0/${pageId}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: texto,
          link: pub.url,
          access_token: token,
        })
      })
      const fbData = await fbRes.json()
      
      if (fbData.id) {
        pubs[idx].resultados.facebook = { ok: true, postId: fbData.id }
        pubs[idx].estado = 'publicado'
        pubs[idx].fechaPublicado = new Date().toISOString()
        guardar(pubs)
        return NextResponse.json({ ok: true, postId: fbData.id })
      } else {
        return NextResponse.json({ ok: false, error: fbData.error?.message || 'Error en Facebook API' })
      }
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: e.message })
    }
  }

  // Publicar en Instagram (cuando Meta apruebe)
  if (accion === 'publicar-instagram') {
    const token = process.env.META_ACCESS_TOKEN
    const igId  = process.env.INSTAGRAM_ACCOUNT_ID
    if (!token || !igId) {
      return NextResponse.json({ ok: false, error: 'Instagram API no configurada. Agrega INSTAGRAM_ACCOUNT_ID en .env.local' })
    }
    const { id } = body
    const idx = pubs.findIndex(p => p.id === id)
    if (idx === -1) return NextResponse.json({ ok: false, error: 'No encontrado' })

    try {
      const pub = pubs[idx]
      const caption = `${pub.titulo}\n\n${pub.cuerpo}\n\n${pub.hashtags.join(' ')}`

      // Paso 1: crear container
      const containerRes = await fetch(`https://graph.facebook.com/v18.0/${igId}/media`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_url: pub.imagen,
          caption,
          access_token: token,
        })
      })
      const container = await containerRes.json()

      if (!container.id) return NextResponse.json({ ok: false, error: 'Error creando container Instagram' })

      // Paso 2: publicar
      const pubRes = await fetch(`https://graph.facebook.com/v18.0/${igId}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creation_id: container.id, access_token: token })
      })
      const pubData = await pubRes.json()

      if (pubData.id) {
        pubs[idx].resultados.instagram = { ok: true, postId: pubData.id }
        guardar(pubs)
        return NextResponse.json({ ok: true, postId: pubData.id })
      } else {
        return NextResponse.json({ ok: false, error: pubData.error?.message })
      }
    } catch (e: any) {
      return NextResponse.json({ ok: false, error: e.message })
    }
  }

  // Eliminar publicación
  if (accion === 'eliminar') {
    const nuevas = pubs.filter(p => p.id !== body.id)
    guardar(nuevas)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: false, error: 'Acción no reconocida' })
}
