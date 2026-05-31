import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'public', 'data', 'banners.json')

type Banner = {
  id: string
  espacioId: string
  empresa: string
  titulo: string
  subtitulo: string
  cta: string
  url: string
  imagen: string
  video?: string
  color: string
  colorTexto: string
  activo: boolean
  orden: number
  rubros: string[]
  idiomas: string[]
  fechaInicio: string
  fechaFin: string
}

function leer(): Banner[] {
  try {
    if (!fs.existsSync(FILE)) return []
    return JSON.parse(fs.readFileSync(FILE, 'utf-8'))
  } catch { return [] }
}

function guardar(data: Banner[]) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true })
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET(req: NextRequest) {
  const espacio = req.nextUrl.searchParams.get('espacio') || ''
  const rubro   = req.nextUrl.searchParams.get('rubro')   || 'todos'
  const banners = leer()

  if (espacio === 'all') return NextResponse.json({ todos: banners })

  const candidatos = banners
    .filter(b => b.activo && b.espacioId === espacio)
    .filter(b => b.rubros?.includes('todos') || b.rubros?.includes(rubro))
    .sort((a, b) => (a.orden||0) - (b.orden||0))

  const todosEspacio = req.nextUrl.searchParams.get('todos')
  if (todosEspacio) return NextResponse.json({ banners: candidatos })

  return NextResponse.json({ banner: candidatos[0]||null, banners: candidatos })
}

export async function POST(req: NextRequest) {
  const body    = await req.json()
  const accion  = body.accion
  const id      = body.id
  const valor   = body.valor
  const campo   = body.campo
  let banners   = leer()

  if (accion === 'crear') {
    const nuevo: Banner = {
      id:          `banner-${Date.now()}`,
      espacioId:   body.espacioId || 'hero',
      empresa:     body.empresa   || '',
      titulo:      body.titulo    || '',
      subtitulo:   body.subtitulo || '',
      cta:         body.cta       || '',
      url:         body.url       || '',
      imagen:      body.imagen    || '',
      video:       body.video     || '',
      color:       body.color     || '#1a1000',
      colorTexto:  body.colorTexto|| '#d4af37',
      activo:      true,
      orden:       banners.length,
      rubros:      body.rubros    || ['todos'],
      idiomas:     body.idiomas   || ['todos'],
      fechaInicio: body.fechaInicio || '',
      fechaFin:    body.fechaFin    || '',
    }
    banners.push(nuevo)
    guardar(banners)
    return NextResponse.json({ ok: true, id: nuevo.id })
  }

  if (accion === 'eliminar') {
    banners = banners.filter(b => b.id !== id)
    guardar(banners)
    return NextResponse.json({ ok: true })
  }

  if (accion === 'toggleActivo') {
    banners = banners.map(b => b.id === id ? {...b, activo: !b.activo} : b)
    guardar(banners)
    return NextResponse.json({ ok: true })
  }

  if (accion === 'reordenar') {
    const ids: string[] = body.ids || []
    banners = ids.map((bid, i) => {
      const b = banners.find(x => x.id === bid)
      return b ? {...b, orden: i} : null
    }).filter(Boolean) as Banner[]
    guardar(banners)
    return NextResponse.json({ ok: true })
  }

  if (accion === 'moverEspacio') {
    banners = banners.map(b => b.id === id ? {...b, espacioId: valor} : b)
    guardar(banners)
    return NextResponse.json({ ok: true })
  }

  if (accion === 'cambiarRubros') {
    banners = banners.map(b => b.id === id ? {...b, rubros: valor} : b)
    guardar(banners)
    return NextResponse.json({ ok: true })
  }

  if (accion === 'actualizar') {
    banners = banners.map(b => b.id === id ? {...b, [campo]: valor} : b)
    guardar(banners)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ ok: false, error: 'Acción no reconocida' })
}
