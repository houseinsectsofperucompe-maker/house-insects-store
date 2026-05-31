import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// ══════════════════════════════════════════════════════════════════
// HELPERS — leer/escribir JSONs locales
// ══════════════════════════════════════════════════════════════════

const RUBROS_DIR = path.join(process.cwd(), 'public', 'data', 'rubros')

const RUBROS_ESPECIMENES = [
  { id: 'especimenes-biologicos-secos', nm: 'Lepidoptera Diurna',  orden: 'Lepidoptera Diurnae', icono: '🦋' },
  { id: 'especimenes-nocturnas',        nm: 'Moths Nocturnas',     orden: 'Moths Nocturnas',     icono: '🌙' },
  { id: 'especimenes-coleopteros',      nm: 'Coleoptera',          orden: 'Coleoptera',          icono: '🪲' },
  { id: 'especimenes-artropodos',       nm: 'Arthropoda',          orden: 'Arthropoda',          icono: '🕷️' },
]

function leerJSON(archivo: string) {
  try {
    const p = path.join(RUBROS_DIR, archivo)
    if (!fs.existsSync(p)) return null
    return JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch { return null }
}

function escribirJSON(archivo: string, data: any) {
  const p = path.join(RUBROS_DIR, archivo)
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8')
}

function getFamilias() {
  const familias: any[] = []
  for (const rubro of RUBROS_ESPECIMENES) {
    const data = leerJSON(`${rubro.id}.json`)
    if (!data) continue
    const especies = data.especies || []
    for (const fam of (data.familias || [])) {
      const espFam = especies.filter((e: any) => e.familia === fam.id)
      const subfamilias = [...new Set(espFam.map((e: any) => e.subfamilia).filter(Boolean))]
      familias.push({
        id:    fam.id,
        nm:    fam.nombre || fam.id,
        orden: rubro.orden,
        total: espFam.length,
        e:     espFam,
        sub:   subfamilias.map((sf: any) => ({
          id: sf, nm: sf,
          e:  espFam.filter((e: any) => e.subfamilia === sf),
        })),
      })
    }
  }
  return familias
}

function getTodasEspecies() {
  const especies: any[] = []
  for (const rubro of RUBROS_ESPECIMENES) {
    const data = leerJSON(`${rubro.id}.json`)
    if (!data) continue
    for (const e of (data.especies || [])) {
      especies.push({ ...e, _rubroId: rubro.id, _ordenLabel: rubro.orden })
    }
  }
  return especies
}

function getRubroDeEspecie(especieId: string): { rubroId: string; data: any } | null {
  for (const rubro of RUBROS_ESPECIMENES) {
    const data = leerJSON(`${rubro.id}.json`)
    if (!data) continue
    const found = (data.especies || []).find((e: any) => e.id === especieId)
    if (found) return { rubroId: rubro.id, data }
  }
  return null
}

// ══════════════════════════════════════════════════════════════════
// GET
// ══════════════════════════════════════════════════════════════════
export async function GET(req: NextRequest) {
  const tipo    = req.nextUrl.searchParams.get('tipo')
  const familia = req.nextUrl.searchParams.get('familia')

  // Rubros disponibles
  if (tipo === 'rubros') {
    return NextResponse.json(RUBROS_ESPECIMENES)
  }

  // Órdenes disponibles
  if (tipo === 'ordenes') {
    const ordenes = [...new Set(RUBROS_ESPECIMENES.map(r => r.orden))]
      .map(o => ({ id: o, nombre: o, activo: true }))
    return NextResponse.json(ordenes)
  }

  // Resumen de familias (sin especies para no pesar)
  if (tipo === 'resumen') {
    const fams = getFamilias()
    return NextResponse.json(fams.map(f => ({
      id: f.id, nm: f.nm, count: f.e?.length || 0, orden: f.orden
    })))
  }

  // Familia específica con sus especies
  if (familia) {
    const fams = getFamilias()
    const fam = fams.find(f => f.id === familia)
    return NextResponse.json(fam || null)
  }

  // Default: todas las familias con especies (para admin-panel/especimenes)
  const fams = getFamilias()
  return NextResponse.json(fams)
}

// ══════════════════════════════════════════════════════════════════
// POST — acciones del admin
// ══════════════════════════════════════════════════════════════════
export async function POST(req: NextRequest) {
  try {
    const body    = await req.json()
    const action  = body.action
    const payload = body.data || {}

    // ── Guardar/actualizar especie ─────────────────────────────
    if (action === 'save' || action === 'updateEspecie') {
      const result = getRubroDeEspecie(payload._id || payload.id)
      if (!result) return NextResponse.json({ ok: false, error: 'Especie no encontrada' }, { status: 404 })

      const { rubroId, data } = result
      const idx = data.especies.findIndex((e: any) =>
        e.id === (payload._id || payload.id)
      )
      if (idx === -1) return NextResponse.json({ ok: false, error: 'Especie no encontrada' }, { status: 404 })

      // Actualizar campos editables
      data.especies[idx] = {
        ...data.especies[idx],
        ...(payload.precio   !== undefined && { precio:    payload.precio }),
        ...(payload.stock    !== undefined && { stock:     payload.stock }),
        ...(payload.imagenes !== undefined && { imagenes:  payload.imagenes.filter(Boolean) }),
        ...(payload.videos   !== undefined && { videos:    payload.videos.filter(Boolean) }),
        ...(payload.calidad  !== undefined && { calidad:   payload.calidad }),
        ...(payload.talla    !== undefined && { talla:     payload.talla }),
        ...(payload.montaje  !== undefined && { montaje:   payload.montaje }),
        ...(payload.activo   !== undefined && { activo:    payload.activo }),
        ...(payload.desc     !== undefined && { desc:      payload.desc }),
        ...(payload.foto     !== undefined && { foto:      payload.foto }),
        ...(payload.fotoLado !== undefined && { fotoLado:  payload.fotoLado }),
        ...(payload.fotoRev  !== undefined && { fotoRev:   payload.fotoRev }),
        ...(payload.video    !== undefined && { video:     payload.video }),
      }
      escribirJSON(`${rubroId}.json`, data)
      return NextResponse.json({ ok: true })
    }

    // ── Crear nueva especie ────────────────────────────────────
    if (action === 'create') {
      const rubroId = payload._rubroId || 'especimenes-biologicos-secos'
      const data = leerJSON(`${rubroId}.json`)
      if (!data) return NextResponse.json({ ok: false, error: 'Rubro no encontrado' }, { status: 404 })

      const nueva = {
        id:       `${payload.familia}-${Date.now()}`,
        nombre:   payload.n || payload.nombre || 'Nueva especie',
        familia:  payload.familia || '',
        precio:   payload.precio || 0,
        stock:    payload.stock || 0,
        imagenes: [],
        orden:    payload.ordenCategoria || '',
        ...payload,
      }
      data.especies.push(nueva)
      escribirJSON(`${rubroId}.json`, data)
      return NextResponse.json({ ok: true, id: nueva.id })
    }

    // ── Eliminar especie ───────────────────────────────────────
    if (action === 'delete') {
      const result = getRubroDeEspecie(payload._id || payload.id)
      if (!result) return NextResponse.json({ ok: false, error: 'No encontrada' }, { status: 404 })

      const { rubroId, data } = result
      data.especies = data.especies.filter((e: any) =>
        e.id !== (payload._id || payload.id)
      )
      escribirJSON(`${rubroId}.json`, data)
      return NextResponse.json({ ok: true })
    }

    // ── Mover especie a otra familia ───────────────────────────
    if (action === 'moverFamilia' || action === 'moveToFamily') {
      for (const id of (payload.ids || [payload._id])) {
        const result = getRubroDeEspecie(id)
        if (!result) continue
        const { rubroId, data } = result
        const idx = data.especies.findIndex((e: any) => e.id === id)
        if (idx >= 0) {
          data.especies[idx].familia = payload.nuevaFamilia || payload.familia
          if (payload.nuevaOrden) data.especies[idx].orden = payload.nuevaOrden
        }
        escribirJSON(`${rubroId}.json`, data)
      }
      return NextResponse.json({ ok: true })
    }

    // ── Duplicar especie ───────────────────────────────────────
    if (action === 'duplicate') {
      const result = getRubroDeEspecie(payload._id || payload.id)
      if (!result) return NextResponse.json({ ok: false, error: 'No encontrada' }, { status: 404 })

      const { rubroId, data } = result
      const original = data.especies.find((e: any) => e.id === (payload._id || payload.id))
      if (!original) return NextResponse.json({ ok: false }, { status: 404 })

      const copia = { ...original, id: `${original.familia}-${Date.now()}`,
        nombre: `${original.nombre} (copia)` }
      data.especies.push(copia)
      escribirJSON(`${rubroId}.json`, data)
      return NextResponse.json({ ok: true, id: copia.id })
    }

    return NextResponse.json({ ok: false, error: 'Acción no reconocida' })
  } catch (e: any) {
    console.error('API datos error:', e)
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 })
  }
}
