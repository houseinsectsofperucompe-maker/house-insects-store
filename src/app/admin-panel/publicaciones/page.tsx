'use client'
import { useState, useEffect } from 'react'

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005', BD = '#2a1f0a'
const btn = (bg: string, color: string, extra?: any) => ({
  background: bg, color, border: 'none', padding: '6px 12px', borderRadius: 6,
  cursor: 'pointer', fontSize: 11, fontFamily: 'Georgia,serif', fontWeight: 700, ...extra
})

const PLATAFORMAS = [
  { id: 'website',    nombre: 'Website',          icono: '🌐', estado: 'activo',   color: '#4caf50' },
  { id: 'facebook',   nombre: 'Facebook',          icono: '📘', estado: 'revision', color: '#1877f2' },
  { id: 'instagram',  nombre: 'Instagram',         icono: '📸', estado: 'revision', color: '#e1306c' },
  { id: 'tiktok',     nombre: 'TikTok',            icono: '🎬', estado: 'revision', color: '#010101' },
  { id: 'whatsapp',   nombre: 'WhatsApp Business', icono: '💬', estado: 'pendiente', color: '#25d366' },
  { id: 'wechat',     nombre: 'WeChat',            icono: '💚', estado: 'pendiente', color: '#07c160' },
  { id: 'youtube',    nombre: 'YouTube',           icono: '▶️', estado: 'pendiente', color: '#ff0000' },
  { id: '1688',       nombre: '1688 (Alibaba)',    icono: '🏪', estado: 'pendiente', color: '#ff6600' },
  { id: 'pinterest',  nombre: 'Pinterest',         icono: '📌', estado: 'pendiente', color: '#e60023' },
  { id: 'linkedin',   nombre: 'LinkedIn',          icono: '💼', estado: 'pendiente', color: '#0a66c2' },
  { id: 'twitter',    nombre: 'Twitter/X',         icono: '🐦', estado: 'pendiente', color: '#000000' },
  { id: 'blog',       nombre: 'Blog/WordPress',    icono: '✍️', estado: 'pendiente', color: '#21759b' },
]

type Publicacion = {
  id: string
  titulo: string
  cuerpo: string
  imagen?: string
  hashtags: string[]
  cta: string
  plataformas: string[]
  estado: string
  fechaProgramada?: string
  fechaPublicado?: string
  rubroId: string
  paisId: string
  idioma: string
  resultados: Record<string, any>
  creado: string
}

export default function PanelPublicaciones() {
  const [pubs,       setPubs]       = useState<Publicacion[]>([])
  const [loading,    setLoading]    = useState(true)
  const [publicando, setPublicando] = useState<string>('')
  const [msg,        setMsg]        = useState('')
  const [filtro,     setFiltro]     = useState('todas')

  const mostrar = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 4000) }

  const cargar = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/publicaciones')
      const d = await res.json()
      setPubs(d.publicaciones || [])
    } catch { mostrar('❌ Error cargando') }
    setLoading(false)
  }

  useEffect(() => { cargar() }, [])

  const publicar = async (pub: Publicacion, plataforma: string) => {
    setPublicando(`${pub.id}-${plataforma}`)
    try {
      const res = await fetch('/api/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: `publicar-${plataforma}`, id: pub.id })
      })
      const d = await res.json()
      if (d.ok) mostrar(`✅ Publicado en ${plataforma}`)
      else mostrar(`❌ ${d.error}`)
      await cargar()
    } catch { mostrar('❌ Error') }
    setPublicando('')
  }

  const eliminar = async (id: string) => {
    if (!confirm('¿Eliminar publicación?')) return
    await fetch('/api/publicaciones', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accion: 'eliminar', id })
    })
    await cargar()
  }

  const pubsFiltradas = filtro === 'todas' ? pubs : pubs.filter(p => p.estado === filtro)

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#e8d5a3', fontFamily: 'Georgia,serif' }}>

      {/* HEADER */}
      <div style={{ background: BG2, borderBottom: `1px solid ${BD}`, padding: '14px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: G, fontSize: 20 }}>📡 Panel de Publicaciones</h1>
          <p style={{ margin: 0, color: '#6b5a2e', fontSize: 12 }}>
            {pubs.length} publicaciones · {pubs.filter(p=>p.estado==='publicado').length} publicadas
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/admin-panel/publicidad"
            style={{ ...btn('rgba(201,168,76,0.15)', G), textDecoration: 'none' }}>
            + Crear Aviso
          </a>
          <a href="/admin-panel" style={{ ...btn('#333', '#aaa'), textDecoration: 'none' }}>← Panel</a>
        </div>
      </div>

      {/* ESTADO DE PLATAFORMAS */}
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${BD}` }}>
        <div style={{ fontSize: 11, color: '#4a3a1a', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
          Estado de Plataformas
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PLATAFORMAS.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6,
              background: BG2, border: `1px solid ${BD}`, borderRadius: 8, padding: '6px 12px' }}>
              <span style={{ fontSize: 16 }}>{p.icono}</span>
              <span style={{ fontSize: 11, color: '#e8d5a3' }}>{p.nombre}</span>
              <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4,
                background: p.estado==='activo'?'rgba(76,175,80,0.15)':
                           p.estado==='revision'?'rgba(255,152,0,0.15)':'rgba(100,100,100,0.15)',
                color: p.estado==='activo'?'#4caf50':
                       p.estado==='revision'?'#ff9800':'#666' }}>
                {p.estado==='activo'?'✅ Activo':p.estado==='revision'?'⏳ Revisión':'🔧 Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 24 }}>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[['todas','Todas'],['pendiente','Pendientes'],['programado','Programadas'],
            ['publicado','Publicadas'],['error','Con Error']].map(([id,nm]) => (
            <button key={id} onClick={() => setFiltro(id)}
              style={{ ...btn(filtro===id?G:'transparent', filtro===id?'#0d0800':G,
                { border: `1px solid ${filtro===id?G:BD}` }) }}>
              {nm} ({id==='todas'?pubs.length:pubs.filter(p=>p.estado===id).length})
            </button>
          ))}
        </div>

        {msg && (
          <div style={{ padding: '10px 16px', borderRadius: 8, marginBottom: 16,
            background: msg.startsWith('✅')?'rgba(76,175,80,0.1)':'rgba(229,57,53,0.1)',
            color: msg.startsWith('✅')?'#4caf50':'#e53935', fontSize: 13 }}>
            {msg}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#6b5a2e' }}>⏳ Cargando...</div>
        ) : pubsFiltradas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: '#4a3a1a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📡</div>
            <div>No hay publicaciones todavía</div>
            <a href="/admin-panel/publicidad"
              style={{ ...btn('rgba(201,168,76,0.15)', G, { marginTop: 16, display: 'inline-block', textDecoration: 'none' }) }}>
              + Crear primer aviso
            </a>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pubsFiltradas.map(pub => (
              <div key={pub.id} style={{ background: BG2, border: `1px solid ${BD}`,
                borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 0 }}>

                  {/* Preview imagen */}
                  <div style={{ background: '#000', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', aspectRatio: '1/1' }}>
                    {pub.imagen ? (
                      <img src={pub.imagen} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                    ) : (
                      <span style={{ fontSize: 28 }}>📋</span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: 14 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: G, fontWeight: 700 }}>{pub.titulo}</span>
                      <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4,
                        background: pub.estado==='publicado'?'rgba(76,175,80,0.15)':
                                   pub.estado==='programado'?'rgba(33,150,243,0.15)':
                                   pub.estado==='error'?'rgba(229,57,53,0.15)':'rgba(100,100,100,0.15)',
                        color: pub.estado==='publicado'?'#4caf50':
                               pub.estado==='programado'?'#2196f3':
                               pub.estado==='error'?'#e53935':'#888' }}>
                        {pub.estado}
                      </span>
                      <span style={{ fontSize: 10, color: '#4a3a1a', marginLeft: 'auto' }}>
                        {new Date(pub.creado).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#8a7040', marginBottom: 6,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {pub.cuerpo}
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {pub.hashtags?.slice(0,3).map(h => (
                        <span key={h} style={{ fontSize: 10, color: G, background: 'rgba(201,168,76,0.08)',
                          padding: '2px 6px', borderRadius: 4 }}>{h}</span>
                      ))}
                      <span style={{ fontSize: 10, color: '#4a3a1a' }}>
                        🌍 {pub.idioma?.toUpperCase()} · 📦 {pub.rubroId}
                      </span>
                    </div>

                    {/* Resultados por plataforma */}
                    {Object.keys(pub.resultados||{}).length > 0 && (
                      <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
                        {Object.entries(pub.resultados).map(([plat, res]: [string, any]) => (
                          <span key={plat} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4,
                            background: res.ok?'rgba(76,175,80,0.1)':'rgba(229,57,53,0.1)',
                            color: res.ok?'#4caf50':'#e53935' }}>
                            {PLATAFORMAS.find(p=>p.id===plat)?.icono} {plat} {res.ok?'✓':'✗'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Acciones */}
                  <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 6,
                    borderLeft: `1px solid ${BD}`, minWidth: 180 }}>
                    <div style={{ fontSize: 10, color: '#4a3a1a', marginBottom: 4 }}>Publicar en:</div>

                    {/* Website — siempre disponible */}
                    <button
                      onClick={() => publicar(pub, 'website')}
                      disabled={publicando === `${pub.id}-website` || pub.resultados?.website?.ok}
                      style={btn(
                        pub.resultados?.website?.ok ? 'rgba(76,175,80,0.1)' : 'rgba(0,200,83,0.1)',
                        pub.resultados?.website?.ok ? '#4caf50' : '#00c853',
                        { width: '100%', textAlign: 'left' }
                      )}>
                      {pub.resultados?.website?.ok ? '✅ 🌐 Website' :
                       publicando===`${pub.id}-website` ? '⏳ Publicando...' : '🌐 Publicar en Website'}
                    </button>

                    {/* Facebook — en revisión */}
                    <button
                      onClick={() => publicar(pub, 'facebook')}
                      disabled={publicando === `${pub.id}-facebook`}
                      style={btn('rgba(24,119,242,0.1)', '#1877f2', { width: '100%', textAlign: 'left' })}>
                      {pub.resultados?.facebook?.ok ? '✅ 📘 Facebook' :
                       publicando===`${pub.id}-facebook` ? '⏳...' : '📘 Facebook'}
                      <span style={{ fontSize: 9, color: '#ff9800', marginLeft: 4 }}>⏳ Revisión</span>
                    </button>

                    {/* Instagram — en revisión */}
                    <button
                      onClick={() => publicar(pub, 'instagram')}
                      disabled={publicando === `${pub.id}-instagram`}
                      style={btn('rgba(225,48,108,0.1)', '#e1306c', { width: '100%', textAlign: 'left' })}>
                      {pub.resultados?.instagram?.ok ? '✅ 📸 Instagram' :
                       publicando===`${pub.id}-instagram` ? '⏳...' : '📸 Instagram'}
                      <span style={{ fontSize: 9, color: '#ff9800', marginLeft: 4 }}>⏳ Revisión</span>
                    </button>

                    {/* TikTok — próximamente */}
                    <button disabled style={btn('rgba(1,1,1,0.3)', '#555', { width: '100%', textAlign: 'left' })}>
                      🎬 TikTok <span style={{ fontSize: 9, color: '#555' }}>Próximo</span>
                    </button>

                    <button onClick={() => eliminar(pub.id)}
                      style={btn('rgba(229,57,53,0.1)', '#e53935', { width: '100%', marginTop: 4 })}>
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
