'use client'
import { useState, useEffect, useRef } from 'react'

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005', BD = '#2a1f0a'
const btn = (bg: string, color: string, extra?: any) => ({
  background: bg, color, border: 'none', padding: '6px 12px', borderRadius: 6,
  cursor: 'pointer', fontSize: 11, fontFamily: 'Georgia,serif', fontWeight: 700, ...extra
})

const ESPACIOS: Record<string, string> = {
  'hero':             '🎯 Banner Hero (Página principal)',
  'header':           '📌 Banner Header (Todas las páginas)',
  'sidebar-izquierdo':'◀️ Sidebar Izquierdo',
  'sidebar-derecho':  '▶️ Sidebar Derecho',
  'entre-productos':  '🛍️ Entre Productos (Catálogo)',
  'carrito':          '🛒 Banner Carrito',
  'especimen':        '🦋 Banner Espécimen',
  'popup':            '💬 Popup / Modal',
  'flotante':         '🎪 Banner Flotante',
}

const RUBROS = [
  'todos',
  'especimenes','nocturnas','coleoptera','arthropoda',
  'cuadros','joyeria','rarezas','artesanias','herramientas',
  'minerales','semillas','frutas','hongos','textileria',
  'alimentos','pinturas','maderas','esencias',
]

const IDIOMAS_DISP = [
  'todos','es','en','zh','ja','ko','ar','de','fr','pt','it',
  'ru','tr','th','vi','id','nl','pl','sv','da','fi','no',
  'he','hi','fa','ms','uk','cs','ro','hu','el','bg','hr',
  'sk','lt','lv','et','sr','af','sw','tl','bn','ur','ta',
  'ca','is','mt','sl','mk','sq','az',
]

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
  clics?: number
  impresiones?: number
}

const BANNER_VACIO: Omit<Banner,'id'|'orden'|'clics'|'impresiones'> = {
  espacioId: 'hero', empresa: '', titulo: '', subtitulo: '', cta: 'Ver más',
  url: '', imagen: '', video: '', color: '#1a1000', colorTexto: '#d4af37',
  activo: true, rubros: ['todos'], idiomas: ['todos'],
  fechaInicio: '', fechaFin: '',
}

export default function BannersAdmin() {
  const [banners,    setBanners]    = useState<Banner[]>([])
  const [loading,    setLoading]    = useState(true)
  const [tab,        setTab]        = useState<'lista'|'editor'|'espacios'>('lista')
  const [editando,   setEditando]   = useState<Banner | null>(null)
  const [form,       setForm]       = useState<any>({...BANNER_VACIO})
  const [subiendo,   setSubiendo]   = useState(false)
  const [msg,        setMsg]        = useState('')
  const [guardando,  setGuardando]  = useState(false)
  const [filtroEsp,  setFiltroEsp]  = useState('todos')
  const fileRef = useRef<HTMLInputElement>(null)
  const vidRef  = useRef<HTMLInputElement>(null)

  const mostrar = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  // ── Cargar banners ─────────────────────────────────────────────
  const cargar = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/banners?espacio=all')
      const d = await res.json()
      setBanners(d.todos || [])
    } catch { mostrar('❌ Error cargando') }
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  // ── Subir imagen/video a Bunny.net ─────────────────────────────
  const subirArchivo = async (file: File, tipo: 'imagen' | 'video') => {
    setSubiendo(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload-banner', { method: 'POST', body: fd })
      const d = await res.json()
      if (d.ok) {
        setForm((p: any) => ({ ...p, [tipo]: d.url }))
        mostrar(`✅ ${tipo} subido`)
      } else mostrar('❌ ' + d.error)
    } catch { mostrar('❌ Error de conexión') }
    setSubiendo(false)
  }

  // ── Guardar (crear o actualizar) ───────────────────────────────
  const guardar = async () => {
    setGuardando(true)
    try {
      if (editando) {
        // Actualizar campo por campo
        const campos = ['empresa','titulo','subtitulo','cta','url','imagen','video',
                        'color','colorTexto','espacioId','rubros','idiomas','fechaInicio','fechaFin']
        for (const campo of campos) {
          if (form[campo] !== editando[campo as keyof Banner]) {
            await fetch('/api/banners', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ accion: 'actualizar', id: editando.id, campo, valor: form[campo] })
            })
          }
        }
        mostrar('✅ Banner actualizado')
      } else {
        await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accion: 'crear', ...form })
        })
        mostrar('✅ Banner creado')
      }
      await cargar()
      setTab('lista')
      setEditando(null)
      setForm({ ...BANNER_VACIO })
    } catch { mostrar('❌ Error guardando') }
    setGuardando(false)
  }

  // ── Acciones rápidas ───────────────────────────────────────────
  const toggleActivo = async (b: Banner) => {
    await fetch('/api/banners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'toggleActivo', id: b.id })
    })
    await cargar()
  }

  const eliminar = async (b: Banner) => {
    if (!confirm(`¿Eliminar banner "${b.titulo || b.empresa}"?`)) return
    await fetch('/api/banners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'eliminar', id: b.id })
    })
    mostrar('🗑️ Eliminado')
    await cargar()
  }

  const moverEspacio = async (b: Banner, nuevoEspacio: string) => {
    await fetch('/api/banners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'moverEspacio', id: b.id, valor: nuevoEspacio })
    })
    mostrar(`✅ Movido a ${ESPACIOS[nuevoEspacio]}`)
    await cargar()
  }

  const subirOrden = async (b: Banner) => {
    const lista = [...banners].sort((a, b) => a.orden - b.orden)
    const idx = lista.findIndex(x => x.id === b.id)
    if (idx === 0) return
    const ids = lista.map(x => x.id)
    ;[ids[idx-1], ids[idx]] = [ids[idx], ids[idx-1]]
    await fetch('/api/banners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'reordenar', ids })
    })
    await cargar()
  }

  const bajarOrden = async (b: Banner) => {
    const lista = [...banners].sort((a, b) => a.orden - b.orden)
    const idx = lista.findIndex(x => x.id === b.id)
    if (idx === lista.length - 1) return
    const ids = lista.map(x => x.id)
    ;[ids[idx], ids[idx+1]] = [ids[idx+1], ids[idx]]
    await fetch('/api/banners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'reordenar', ids })
    })
    await cargar()
  }

  const duplicar = async (b: Banner) => {
    await fetch('/api/banners', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'crear', ...b, titulo: b.titulo + ' (copia)', id: undefined })
    })
    mostrar('✅ Duplicado')
    await cargar()
  }

  const editarBanner = (b: Banner) => {
    setEditando(b)
    setForm({ ...b })
    setTab('editor')
  }

  const nuevoBanner = (espacioId?: string) => {
    setEditando(null)
    setForm({ ...BANNER_VACIO, espacioId: espacioId || 'hero' })
    setTab('editor')
  }

  // ── Banners filtrados ──────────────────────────────────────────
  const bannersF = filtroEsp === 'todos'
    ? banners
    : banners.filter(b => b.espacioId === filtroEsp)

  const bannersPorEspacio = Object.keys(ESPACIOS).reduce((acc, esp) => {
    acc[esp] = banners.filter(b => b.espacioId === esp).sort((a,b) => a.orden - b.orden)
    return acc
  }, {} as Record<string, Banner[]>)

  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#e8d5a3', fontFamily: 'Georgia,serif' }}>

      {/* HEADER */}
      <div style={{ background: BG2, borderBottom: `1px solid ${BD}`, padding: '12px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: G, fontSize: 18 }}>🎯 Gestor de Banners Publicitarios</h1>
          <p style={{ margin: 0, color: '#6b5a2e', fontSize: 11 }}>
            {banners.length} banners · {banners.filter(b=>b.activo).length} activos · House Insects of Peru
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => nuevoBanner()} style={btn('rgba(201,168,76,0.15)', G, { fontSize: 13 })}>
            + Nuevo Banner
          </button>
          <a href="/admin-panel" style={{ ...btn('#333', '#aaa'), textDecoration: 'none' }}>← Panel</a>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: 8, padding: '10px 24px', borderBottom: `1px solid ${BD}` }}>
        {[['lista','📋 Lista'],['espacios','🗂️ Por Espacio'],['editor', editando?'✏️ Editando':'➕ Nuevo']].map(([t,l]) => (
          <button key={t} onClick={() => { if(t!=='editor') { setEditando(null); setForm({...BANNER_VACIO}) } setTab(t as any) }}
            style={{ padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
              fontFamily: 'Georgia,serif', border: `1px solid ${tab===t?G:BD}`,
              background: tab===t?'rgba(201,168,76,0.12)':'transparent',
              color: tab===t?G:'#8a7040' }}>
            {l}
          </button>
        ))}
      </div>

      {/* ══ TAB LISTA ══════════════════════════════════════════════ */}
      {tab === 'lista' && (
        <div style={{ padding: 24 }}>
          {/* Filtro por espacio */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <button onClick={() => setFiltroEsp('todos')}
              style={{ ...btn(filtroEsp==='todos'?G:'transparent', filtroEsp==='todos'?'#0d0800':G,
                { border: `1px solid ${filtroEsp==='todos'?G:BD}` }) }}>
              Todos ({banners.length})
            </button>
            {Object.entries(ESPACIOS).map(([id, nm]) => (
              <button key={id} onClick={() => setFiltroEsp(id)}
                style={{ ...btn(filtroEsp===id?G:'transparent', filtroEsp===id?'#0d0800':G,
                  { border: `1px solid ${filtroEsp===id?G:BD}`, fontSize:10 }) }}>
                {nm.split(' ').slice(1).join(' ')} ({banners.filter(b=>b.espacioId===id).length})
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#6b5a2e' }}>⏳ Cargando...</div>
          ) : bannersF.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: '#4a3a1a' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎯</div>
              No hay banners. <button onClick={() => nuevoBanner()}
                style={{ ...btn('rgba(201,168,76,0.15)', G), marginLeft: 8 }}>+ Crear primero</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bannersF.sort((a,b) => a.orden-b.orden).map(b => (
                <div key={b.id} style={{ background: BG2, border: `1px solid ${b.activo?BD:'rgba(229,57,53,0.2)'}`,
                  borderRadius: 10, padding: 14, display: 'grid',
                  gridTemplateColumns: '80px 1fr auto', gap: 14, alignItems: 'center' }}>

                  {/* Preview */}
                  <div style={{ width: 80, height: 60, background: b.color||'#000',
                    borderRadius: 6, overflow: 'hidden', border: `1px solid ${BD}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {b.imagen ? (
                      <img src={b.imagen} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    ) : b.video ? (
                      <span style={{ fontSize: 24 }}>🎬</span>
                    ) : (
                      <span style={{ fontSize: 10, color: b.colorTexto||G, textAlign: 'center', padding: 4 }}>
                        {b.titulo||'Sin imagen'}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: G, fontWeight: 700 }}>{b.titulo||'Sin título'}</span>
                      <span style={{ fontSize: 10, background: b.activo?'rgba(76,175,80,0.15)':'rgba(229,57,53,0.15)',
                        color: b.activo?'#4caf50':'#e53935', padding: '2px 6px', borderRadius: 4 }}>
                        {b.activo?'🟢 Activo':'🔴 Inactivo'}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: '#6b5a2e', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span>📍 {ESPACIOS[b.espacioId]||b.espacioId}</span>
                      {b.empresa && <span>🏢 {b.empresa}</span>}
                      {b.url && <span>🔗 {b.url.slice(0,30)}...</span>}
                      {b.fechaInicio && <span>📅 {b.fechaInicio} → {b.fechaFin||'indefinido'}</span>}
                      <span>🎯 {b.rubros?.join(', ')}</span>
                    </div>
                  </div>

                  {/* Acciones */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    <button onClick={() => subirOrden(b)} title="Subir" style={btn(BG2, G, { padding: '4px 8px' })}>↑</button>
                    <button onClick={() => bajarOrden(b)} title="Bajar" style={btn(BG2, G, { padding: '4px 8px' })}>↓</button>
                    <button onClick={() => toggleActivo(b)} style={btn(
                      b.activo?'rgba(229,57,53,0.1)':'rgba(76,175,80,0.1)',
                      b.activo?'#e53935':'#4caf50')}>
                      {b.activo?'Pausar':'Activar'}
                    </button>
                    <button onClick={() => editarBanner(b)} style={btn('rgba(201,168,76,0.1)', G)}>✏️ Editar</button>
                    <button onClick={() => duplicar(b)} style={btn('rgba(33,150,243,0.1)', '#2196f3')}>⧉ Duplicar</button>
                    <button onClick={() => eliminar(b)} style={btn('rgba(229,57,53,0.1)', '#e53935')}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══ TAB ESPACIOS ═══════════════════════════════════════════ */}
      {tab === 'espacios' && (
        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 16 }}>
          {Object.entries(ESPACIOS).map(([espId, espNm]) => (
            <div key={espId} style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ color: G, fontSize: 13, fontWeight: 700 }}>{espNm}</span>
                <span style={{ fontSize: 11, color: '#6b5a2e' }}>
                  {bannersPorEspacio[espId]?.length||0} banners
                </span>
              </div>
              {(bannersPorEspacio[espId]||[]).map(b => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
                  padding: '6px 8px', background: 'rgba(201,168,76,0.05)', borderRadius: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                    background: b.activo?'#4caf50':'#e53935' }}/>
                  <span style={{ flex: 1, fontSize: 11, color: '#e8d5a3', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.titulo||b.empresa||b.id}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button onClick={() => editarBanner(b)} style={btn('transparent', G, { padding: '2px 6px', fontSize: 10 })}>✏️</button>
                    <button onClick={() => eliminar(b)} style={btn('transparent', '#e53935', { padding: '2px 6px', fontSize: 10 })}>🗑️</button>
                  </div>
                </div>
              ))}
              <button onClick={() => nuevoBanner(espId)}
                style={{ ...btn('rgba(201,168,76,0.08)', G), width: '100%', marginTop: 8, padding: '6px' }}>
                + Agregar banner aquí
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ══ TAB EDITOR ═════════════════════════════════════════════ */}
      {tab === 'editor' && (
        <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24 }}>

          {/* Formulario */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Espacio */}
            <div>
              <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                📍 Espacio publicitario
              </label>
              <select value={form.espacioId}
                onChange={e => setForm((p:any) => ({ ...p, espacioId: e.target.value }))}
                style={{ width: '100%', background: BG2, border: `1px solid ${BD}`, color: G,
                  padding: '8px 10px', borderRadius: 6, fontSize: 13, fontFamily: 'Georgia,serif' }}>
                {Object.entries(ESPACIOS).map(([id, nm]) => (
                  <option key={id} value={id}>{nm}</option>
                ))}
              </select>
            </div>

            {/* Empresa y título */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['empresa','🏢 Empresa/Anunciante'],['titulo','📝 Título del banner']].map(([f,l]) => (
                <div key={f}>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>{l}</label>
                  <input value={form[f]||''} onChange={e => setForm((p:any) => ({...p,[f]:e.target.value}))}
                    style={{ width: '100%', background: BG2, border: `1px solid ${BD}`, color: '#e8d5a3',
                      padding: '7px 10px', borderRadius: 6, fontSize: 12, fontFamily: 'Georgia,serif',
                      boxSizing: 'border-box' as any }}/>
                </div>
              ))}
            </div>

            {/* Subtítulo y CTA */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['subtitulo','💬 Subtítulo'],['cta','🔘 Texto del botón CTA']].map(([f,l]) => (
                <div key={f}>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>{l}</label>
                  <input value={form[f]||''} onChange={e => setForm((p:any) => ({...p,[f]:e.target.value}))}
                    style={{ width: '100%', background: BG2, border: `1px solid ${BD}`, color: '#e8d5a3',
                      padding: '7px 10px', borderRadius: 6, fontSize: 12, fontFamily: 'Georgia,serif',
                      boxSizing: 'border-box' as any }}/>
                </div>
              ))}
            </div>

            {/* URL destino */}
            <div>
              <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                🔗 URL de destino (al hacer clic)
              </label>
              <input value={form.url||''} onChange={e => setForm((p:any) => ({...p,url:e.target.value}))}
                placeholder="https://..."
                style={{ width: '100%', background: BG2, border: `1px solid ${BD}`, color: '#e8d5a3',
                  padding: '7px 10px', borderRadius: 6, fontSize: 12, fontFamily: 'monospace',
                  boxSizing: 'border-box' as any }}/>
            </div>

            {/* Imagen */}
            <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: G, fontWeight: 700 }}>📸 Imagen (GIF, PNG, JPG, WebP)</label>
                <button onClick={() => fileRef.current?.click()}
                  style={btn('rgba(201,168,76,0.15)', G)} disabled={subiendo}>
                  {subiendo ? '⏳ Subiendo...' : '⬆️ Subir imagen'}
                </button>
                <input ref={fileRef} type="file" accept=".gif,.png,.jpg,.jpeg,.webp"
                  style={{ display: 'none' }}
                  onChange={e => { const f=e.target.files?.[0]; if(f) subirArchivo(f,'imagen'); e.target.value='' }}
                />
              </div>
              {form.imagen ? (
                <div style={{ position: 'relative' }}>
                  <img src={form.imagen} alt="" style={{ width: '100%', maxHeight: 200,
                    objectFit: 'cover', borderRadius: 6 }}/>
                  <button onClick={() => setForm((p:any) => ({...p,imagen:''}))}
                    style={{ position: 'absolute', top: 6, right: 6, ...btn('rgba(229,57,53,0.8)', '#fff', { padding: '3px 8px' }) }}>
                    ✕
                  </button>
                </div>
              ) : (
                <div onClick={() => fileRef.current?.click()}
                  style={{ height: 120, border: `2px dashed ${BD}`, borderRadius: 6, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a3a1a', fontSize: 12 }}>
                  Click para subir imagen
                </div>
              )}
              <input value={form.imagen||''} onChange={e => setForm((p:any) => ({...p,imagen:e.target.value}))}
                placeholder="O pega URL de Bunny.net..."
                style={{ width: '100%', background: '#0a0600', border: `1px solid ${BD}`, color: '#a08040',
                  padding: '5px 8px', borderRadius: 5, fontSize: 10, fontFamily: 'monospace',
                  marginTop: 8, boxSizing: 'border-box' as any }}/>
            </div>

            {/* Video */}
            <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label style={{ fontSize: 12, color: G, fontWeight: 700 }}>🎬 Video (WebM / MP4)</label>
                <button onClick={() => vidRef.current?.click()}
                  style={btn('rgba(201,168,76,0.15)', G)} disabled={subiendo}>
                  {subiendo ? '⏳ Subiendo...' : '⬆️ Subir video'}
                </button>
                <input ref={vidRef} type="file" accept=".webm,.mp4"
                  style={{ display: 'none' }}
                  onChange={e => { const f=e.target.files?.[0]; if(f) subirArchivo(f,'video'); e.target.value='' }}
                />
              </div>
              {form.video ? (
                <div style={{ position: 'relative' }}>
                  <video src={form.video} controls style={{ width: '100%', borderRadius: 6 }}/>
                  <button onClick={() => setForm((p:any) => ({...p,video:''}))}
                    style={{ position: 'absolute', top: 6, right: 6, ...btn('rgba(229,57,53,0.8)', '#fff', { padding: '3px 8px' }) }}>
                    ✕
                  </button>
                </div>
              ) : (
                <div onClick={() => vidRef.current?.click()}
                  style={{ height: 80, border: `2px dashed ${BD}`, borderRadius: 6, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a3a1a', fontSize: 12 }}>
                  Click para subir video WebM/MP4
                </div>
              )}
              <input value={form.video||''} onChange={e => setForm((p:any) => ({...p,video:e.target.value}))}
                placeholder="O pega URL de Bunny.net..."
                style={{ width: '100%', background: '#0a0600', border: `1px solid ${BD}`, color: '#a08040',
                  padding: '5px 8px', borderRadius: 5, fontSize: 10, fontFamily: 'monospace',
                  marginTop: 8, boxSizing: 'border-box' as any }}/>
            </div>

            {/* Colores */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['color','🎨 Color de fondo'],['colorTexto','✍️ Color de texto']].map(([f,l]) => (
                <div key={f}>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>{l}</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="color" value={form[f]||'#1a1000'}
                      onChange={e => setForm((p:any) => ({...p,[f]:e.target.value}))}
                      style={{ width: 40, height: 36, borderRadius: 6, border: `1px solid ${BD}`,
                        cursor: 'pointer', background: 'none' }}/>
                    <input value={form[f]||''} onChange={e => setForm((p:any) => ({...p,[f]:e.target.value}))}
                      style={{ flex: 1, background: BG2, border: `1px solid ${BD}`, color: '#e8d5a3',
                        padding: '7px 8px', borderRadius: 6, fontSize: 11, fontFamily: 'monospace',
                        boxSizing: 'border-box' as any }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* Fechas */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['fechaInicio','📅 Fecha inicio'],['fechaFin','📅 Fecha fin']].map(([f,l]) => (
                <div key={f}>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>{l}</label>
                  <input type="date" value={form[f]||''} onChange={e => setForm((p:any) => ({...p,[f]:e.target.value}))}
                    style={{ width: '100%', background: BG2, border: `1px solid ${BD}`, color: '#e8d5a3',
                      padding: '7px 10px', borderRadius: 6, fontSize: 12, fontFamily: 'Georgia,serif',
                      boxSizing: 'border-box' as any }}/>
                </div>
              ))}
            </div>

            {/* Rubros */}
            <div>
              <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                🗂️ Rubros donde aparece
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {RUBROS.map(r => {
                  const sel = (form.rubros||[]).includes(r)
                  return (
                    <button key={r} onClick={() => {
                      const rubros = sel
                        ? (form.rubros||[]).filter((x:string)=>x!==r)
                        : [...(form.rubros||[]), r]
                      setForm((p:any) => ({...p, rubros}))
                    }} style={{ padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11,
                      border: `1px solid ${sel?G:BD}`,
                      background: sel?'rgba(201,168,76,0.15)':'transparent',
                      color: sel?G:'#6b5a2e' }}>
                      {r}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Idiomas */}
            <div>
              <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                🌍 Idiomas donde aparece
              </label>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', maxHeight: 120, overflowY: 'auto' }}>
                {IDIOMAS_DISP.map(lang => {
                  const sel = (form.idiomas||[]).includes(lang)
                  return (
                    <button key={lang} onClick={() => {
                      const idiomas = sel
                        ? (form.idiomas||[]).filter((x:string)=>x!==lang)
                        : [...(form.idiomas||[]), lang]
                      setForm((p:any) => ({...p, idiomas}))
                    }} style={{ padding: '3px 8px', borderRadius: 6, cursor: 'pointer', fontSize: 10,
                      border: `1px solid ${sel?G:BD}`,
                      background: sel?'rgba(201,168,76,0.15)':'transparent',
                      color: sel?G:'#6b5a2e' }}>
                      {lang}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Estado activo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <label style={{ fontSize: 12, color: '#6b5a2e' }}>Estado:</label>
              <button onClick={() => setForm((p:any) => ({...p, activo: !p.activo}))}
                style={btn(form.activo?'rgba(76,175,80,0.15)':'rgba(229,57,53,0.15)',
                  form.activo?'#4caf50':'#e53935')}>
                {form.activo ? '🟢 Activo' : '🔴 Inactivo'}
              </button>
            </div>

            {/* Mover espacio (solo en edición) */}
            {editando && (
              <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 8 }}>
                  📦 Mover a otro espacio:
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {Object.entries(ESPACIOS).filter(([id]) => id !== editando.espacioId).map(([id, nm]) => (
                    <button key={id} onClick={() => { moverEspacio(editando, id); setForm((p:any)=>({...p,espacioId:id})) }}
                      style={btn('rgba(201,168,76,0.08)', G, { fontSize: 10 })}>
                      → {nm.split(' ').slice(1).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {msg && (
              <div style={{ padding: '8px 12px', borderRadius: 6,
                background: msg.startsWith('✅')?'rgba(76,175,80,0.1)':'rgba(229,57,53,0.1)',
                color: msg.startsWith('✅')?'#4caf50':'#e53935', fontSize: 12 }}>
                {msg}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={guardar} disabled={guardando}
                style={{ ...btn(G, '#0d0800'), flex: 1, padding: '12px', fontSize: 14 }}>
                {guardando ? 'Guardando...' : editando ? '💾 Actualizar Banner' : '✅ Crear Banner'}
              </button>
              <button onClick={() => { setTab('lista'); setEditando(null); setForm({...BANNER_VACIO}) }}
                style={btn('#333', '#aaa', { padding: '12px 20px' })}>
                Cancelar
              </button>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div style={{ fontSize: 12, color: '#6b5a2e', marginBottom: 10 }}>👁 Preview del banner</div>
            <div style={{ background: form.color||'#1a1000', borderRadius: 10, overflow: 'hidden',
              border: `1px solid ${BD}`, padding: 20, minHeight: 150 }}>
              {form.imagen && (
                <img src={form.imagen} alt="" style={{ width: '100%', maxHeight: 120,
                  objectFit: 'cover', borderRadius: 6, marginBottom: 10 }}/>
              )}
              {form.video && !form.imagen && (
                <video src={form.video} muted loop autoPlay playsInline
                  style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 6, marginBottom: 10 }}/>
              )}
              {form.titulo && (
                <div style={{ color: form.colorTexto||G, fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                  {form.titulo}
                </div>
              )}
              {form.subtitulo && (
                <div style={{ color: form.colorTexto||'#e8d5a3', fontSize: 12, marginBottom: 10, opacity: 0.8 }}>
                  {form.subtitulo}
                </div>
              )}
              {form.cta && (
                <div style={{ display: 'inline-block', background: form.colorTexto||G, color: form.color||'#0d0800',
                  padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  {form.cta}
                </div>
              )}
              {!form.titulo && !form.imagen && !form.video && (
                <div style={{ color: '#4a3a1a', textAlign: 'center', fontSize: 12, padding: 20 }}>
                  Preview del banner aquí
                </div>
              )}
            </div>

            <div style={{ marginTop: 12, background: BG2, border: `1px solid ${BD}`,
              borderRadius: 8, padding: 12, fontSize: 11, color: '#6b5a2e' }}>
              <div style={{ fontWeight: 700, color: G, marginBottom: 6 }}>Resumen</div>
              <div>📍 {ESPACIOS[form.espacioId]||form.espacioId}</div>
              <div>🎯 Rubros: {(form.rubros||[]).join(', ')}</div>
              <div>🌍 Idiomas: {(form.idiomas||[]).slice(0,5).join(', ')}{(form.idiomas||[]).length>5?'...':''}</div>
              {form.fechaInicio && <div>📅 {form.fechaInicio} → {form.fechaFin||'indefinido'}</div>}
              <div>Estado: {form.activo?'🟢 Activo':'🔴 Inactivo'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
