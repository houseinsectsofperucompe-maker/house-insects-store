'use client'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCarrito, ItemCarrito } from '@/components/CarritoContext'

// ══════════════════════════════════════════════════════════════════
// TIPOS
// ══════════════════════════════════════════════════════════════════
interface Especie {
  id:          string
  nombre:      string
  familia:     string
  precio:      number
  stock:       number
  imagenes:    string[]
  videos?:     string[]
  orden?:      string
  suborden?:   string
  subfamilia?: string
  subespecie?: string
}

type TabFoto = 'Frente' | 'Lado' | 'Reverso' | 'Video'

const CALIDADES = [
  { codigo: 'A1', label: 'A1 — Perfecta', desc: 'Sin defecto alguno. Alas completas, antenas intactas.' },
  { codigo: 'A2', label: 'A2 — Casi perfecta', desc: 'Muy pequeñas imperfecciones apenas visibles.' },
  { codigo: 'A3', label: 'A3 — Buena', desc: 'Pequeños defectos en alas o antenas.' },
  { codigo: 'B',  label: 'B  — Regular', desc: 'Defectos visibles. Apta para estudio.' },
]

const ABREVIACIONES: Record<string, string> = {
  'sp.':   'Especie (sin determinar al nivel de especie)',
  'ssp.':  'Subespecie',
  'cf.':   'Confer — posiblemente esta especie',
  'aff.':  'Affinis — relacionada o similar a',
  'n.sp.': 'Nueva especie (no descrita aún)',
  'CITES': 'Convención sobre Comercio Internacional de Especies',
  'SERFOR':'Servicio Nacional Forestal y de Fauna Silvestre — Perú',
}

// ══════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ══════════════════════════════════════════════════════════════════
export default function EspecimenPage() {
  const { id }  = useParams<{ id: string }>()
  const router  = useRouter()
  const { agregarItem } = useCarrito()

  const [especie,       setEspecie]       = useState<Especie | null>(null)
  const [cargando,      setCargando]      = useState(true)
  const [tabFoto,       setTabFoto]       = useState<TabFoto>('Frente')
  const [lightbox,      setLightbox]      = useState(false)
  const [calidad,       setCalidad]       = useState('A1')
  const [cantidad,      setCantidad]      = useState(1)
  const [popupCalidad,  setPopupCalidad]  = useState(false)
  const [popupAbrev,    setPopupAbrev]    = useState(false)
  const [abrevActual,   setAbrevActual]   = useState('')
  const [seccionAbierta,setSeccionAbierta]= useState<string | null>(null)
  const [rotacion,      setRotacion]      = useState(0)
  const [arrastrando,   setArrastrando]   = useState(false)
  const arrastrarX = useRef(0)

  // ── Cargar especie desde JSON local ─────────────────────────────
  useEffect(() => {
    async function cargar() {
      try {
        // El id tiene formato "Familia-NNN" ej: "MOR-001", "Brassolidae-1"
        // Buscar en el JSON de especimenes-biologicos-secos
        const res = await fetch('/data/rubros/especimenes-biologicos-secos.json')
        const data = await res.json()
        // Buscar por id exacto O por formato legacy (Brassolidae-2 → BRA-002)
        const found: Especie | undefined = data.especies.find(
          (e: Especie) => {
            if (e.id === id) return true
            // convertir Brassolidae-2 a BRA-002 para compatibilidad
            const parts = id.split('-')
            if (parts.length === 2) {
              const prefix = parts[0].slice(0,3).toUpperCase()
              const num = parts[1].padStart(3,'0')
              return e.id === `${prefix}-${num}`
            }
            return false
          }
        )
        if (found) {
          setEspecie(found)
        }
      } catch (err) {
        console.error('Error cargando espécimen:', err)
      } finally {
        setCargando(false)
      }
    }
    if (id) cargar()
  }, [id])

  // ── Rotación 360° drag ──────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setArrastrando(true)
    arrastrarX.current = e.clientX
  }, [])
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!arrastrando) return
    const diff = e.clientX - arrastrarX.current
    setRotacion(r => r + diff * 0.5)
    arrastrarX.current = e.clientX
  }, [arrastrando])
  const onMouseUp   = useCallback(() => setArrastrando(false), [])
  const onTouchStart= useCallback((e: React.TouchEvent) => {
    setArrastrando(true)
    arrastrarX.current = e.touches[0].clientX
  }, [])
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!arrastrando) return
    const diff = e.touches[0].clientX - arrastrarX.current
    setRotacion(r => r + diff * 0.5)
    arrastrarX.current = e.touches[0].clientX
  }, [arrastrando])

  // ── Agregar al carrito ───────────────────────────────────────────
  const handleAgregar = useCallback(() => {
    if (!especie) return
    const item: Omit<ItemCarrito, 'qty'> = {
      id:         especie.id,
      nombre:     especie.nombre + (especie.subespecie ? ` ${especie.subespecie}` : ''),
      p:          especie.precio,
      foto:       especie.imagenes[0] ?? '',
      familia:    especie.familia,
      rubro:      'especimenes',
      orden:      especie.orden,
      subfamilia: especie.subfamilia,
      subespecie: especie.subespecie,
    }
    for (let i = 0; i < cantidad; i++) agregarItem(item)
  }, [especie, cantidad, agregarItem])

  // ── Foto activa ──────────────────────────────────────────────────
  const fotosPorTab: Record<TabFoto, string | null> = {
    Frente:  especie?.imagenes[0] ?? null,
    Lado:    especie?.imagenes[1] ?? null,
    Reverso: especie?.imagenes[2] ?? null,
    Video:   null,
  }
  const videoURL = especie?.videos?.[0] ?? null
  const LOGO_URL = 'https://res.cloudinary.com/dv3mvukmq/image/upload/specimens/logo-hip-correct.png'

  const toggleSeccion = (s: string) =>
    setSeccionAbierta(prev => prev === s ? null : s)

  // ── Texto nombre científico con abreviaciones clicables ─────────
  function renderNombre(nombre: string) {
    const parts = nombre.split(' ')
    return parts.map((p, i) => {
      if (ABREVIACIONES[p]) {
        return (
          <span
            key={i}
            className="cursor-help underline decoration-dotted"
            style={{ color: '#d4af37' }}
            onClick={() => { setAbrevActual(p); setPopupAbrev(true) }}
          >
            {p}{' '}
          </span>
        )
      }
      return <span key={i}>{p} </span>
    })
  }

  // ══════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════
  if (cargando) return (
    <div style={{ background:'#0d0800', minHeight:'100vh', display:'flex',
      alignItems:'center', justifyContent:'center', color:'#d4af37', fontSize:18 }}>
      Cargando espécimen...
    </div>
  )

  if (!especie) return (
    <div style={{ background:'#0d0800', minHeight:'100vh', display:'flex',
      flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16 }}>
      <p style={{ color:'#d4af37', fontSize:18 }}>Espécimen no encontrado</p>
      <button
        onClick={() => router.push('/catalogo/especimenes-secos')}
        style={{ background:'#d4af37', color:'#0d0800', padding:'10px 24px',
          borderRadius:8, fontWeight:700, cursor:'pointer', border:'none' }}
      >
        ← Volver al catálogo
      </button>
    </div>
  )

  const fotoActiva = tabFoto !== 'Video' ? fotosPorTab[tabFoto] : null

  return (
    <div style={{ background:'#0d0800', minHeight:'100vh', color:'#e8d5a3',
      fontFamily:'Georgia, serif' }}>

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <div style={{ padding:'12px 24px', display:'flex', gap:12, alignItems:'center',
        borderBottom:'1px solid #2a1f0a' }}>
        <button onClick={() => router.back()}
          style={{ background:'none', border:'1px solid #d4af37', color:'#d4af37',
            padding:'6px 14px', borderRadius:6, cursor:'pointer', fontSize:13 }}>
          ← Catálogo
        </button>
        <span style={{ color:'#6b5a2e', fontSize:13 }}>
          {especie.familia} {especie.subfamilia ? `/ ${especie.subfamilia}` : ''}
        </span>
      </div>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'24px 16px',
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>

        {/* ══ COLUMNA IZQUIERDA — VISOR FOTOS ══════════════════════ */}
        <div>
          {/* Tabs foto */}
          <div style={{ display:'flex', gap:8, marginBottom:12 }}>
            {(['Frente','Lado','Reverso','Video'] as TabFoto[]).map(tab => (
              <button key={tab} onClick={() => setTabFoto(tab)}
                style={{
                  padding:'6px 14px', borderRadius:6, fontSize:13, cursor:'pointer',
                  border: tabFoto === tab ? '1px solid #d4af37' : '1px solid #3a2f1a',
                  background: tabFoto === tab ? '#d4af37' : 'transparent',
                  color: tabFoto === tab ? '#0d0800' : '#a08040',
                  fontWeight: tabFoto === tab ? 700 : 400,
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Visor imagen */}
          <div
            style={{ position:'relative', width:'100%', aspectRatio:'1/1',
              background:'#000', borderRadius:12, overflow:'hidden',
              border:'1px solid #2a1f0a', cursor: arrastrando ? 'grabbing' : 'grab' }}
            onMouseDown={onMouseDown} onMouseMove={onMouseMove}
            onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart} onTouchMove={onTouchMove}
            onTouchEnd={onMouseUp}
            onClick={() => tabFoto !== 'Video' && setLightbox(true)}
          >
            {tabFoto === 'Video' ? (
              videoURL ? (
                <video autoPlay loop muted playsInline
                  style={{ width:'100%', height:'100%', objectFit:'contain' }}>
                  <source src={videoURL.replace('.mp4','.webm')} type="video/webm"/>
                  <source src={videoURL} type="video/mp4"/>
                </video>
              ) : (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center',
                  height:'100%', color:'#6b5a2e', fontSize:14 }}>
                  Video próximamente
                </div>
              )
            ) : (
              <div style={{ transform:`rotate(${rotacion}deg)`, transition: arrastrando ? 'none' : 'transform 0.1s',
                width:'100%', height:'100%' }}>
                <Image
                  src={fotoActiva || LOGO_URL}
                  alt={especie.nombre}
                  fill style={{ objectFit:'contain' }}
                  unoptimized={!fotoActiva}
                />
              </div>
            )}

            {/* Badge sin foto */}
            {tabFoto !== 'Video' && !fotoActiva && (
              <div style={{ position:'absolute', bottom:8, left:'50%',
                transform:'translateX(-50%)', background:'rgba(0,0,0,0.7)',
                color:'#6b5a2e', fontSize:11, padding:'3px 10px', borderRadius:4 }}>
                FOTO PRÓXIMAMENTE
              </div>
            )}

            {/* Hint rotación */}
            {tabFoto !== 'Video' && fotoActiva && (
              <div style={{ position:'absolute', bottom:8, right:8,
                color:'#6b5a2e', fontSize:11 }}>
                ↔ Arrastra para rotar
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {especie.imagenes.length > 1 && (
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              {especie.imagenes.slice(0,4).map((img, i) => (
                <div key={i}
                  onClick={() => setTabFoto(['Frente','Lado','Reverso','Video'][i] as TabFoto)}
                  style={{ width:64, height:64, borderRadius:6, overflow:'hidden',
                    border:`1px solid ${tabFoto === ['Frente','Lado','Reverso'][i] ? '#d4af37' : '#2a1f0a'}`,
                    cursor:'pointer', background:'#000', flexShrink:0 }}>
                  <Image src={img} alt="" width={64} height={64}
                    style={{ objectFit:'contain', width:'100%', height:'100%' }} unoptimized/>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══ COLUMNA DERECHA — INFO + CARRITO ═════════════════════ */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

          {/* Nombre científico */}
          <div>
            <h1 style={{ fontSize:26, fontStyle:'italic', color:'#d4af37',
              margin:0, lineHeight:1.3 }}>
              {renderNombre(especie.nombre)}
              {especie.subespecie && (
                <span style={{ fontSize:20 }}> {especie.subespecie}</span>
              )}
            </h1>
            <div style={{ display:'flex', gap:12, marginTop:8, flexWrap:'wrap' }}>
              {especie.orden && (
                <span style={{ fontSize:12, color:'#6b5a2e',
                  border:'1px solid #2a1f0a', padding:'2px 8px', borderRadius:4 }}>
                  {especie.orden}
                </span>
              )}
              {especie.suborden && (
                <span style={{ fontSize:12, color:'#6b5a2e',
                  border:'1px solid #2a1f0a', padding:'2px 8px', borderRadius:4 }}>
                  {especie.suborden}
                </span>
              )}
              <span style={{ fontSize:12, color:'#8a7040',
                border:'1px solid #2a1f0a', padding:'2px 8px', borderRadius:4 }}>
                {especie.familia}
              </span>
              {especie.subfamilia && (
                <span style={{ fontSize:12, color:'#6b5a2e',
                  border:'1px solid #2a1f0a', padding:'2px 8px', borderRadius:4 }}>
                  {especie.subfamilia}
                </span>
              )}
            </div>
          </div>

          {/* Precio */}
          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <span style={{ fontSize:32, fontWeight:700, color:'#d4af37' }}>
              ${especie.precio.toFixed(2)}
            </span>
            <span style={{ fontSize:14, color:'#6b5a2e' }}>USD / unidad</span>
          </div>

          {/* Stock */}
          <div style={{ fontSize:13, color: especie.stock > 0 ? '#4caf50' : '#e53935' }}>
            {especie.stock > 0
              ? `✓ En stock — ${especie.stock} unidades disponibles`
              : '✗ Sin stock — Consultar disponibilidad'}
          </div>

          {/* Calidad */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <span style={{ fontSize:13, color:'#8a7040' }}>Calidad:</span>
              <button onClick={() => setPopupCalidad(true)}
                style={{ background:'none', border:'none', color:'#d4af37',
                  fontSize:12, cursor:'pointer', textDecoration:'underline' }}>
                ¿Qué significa?
              </button>
            </div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {CALIDADES.map(c => (
                <button key={c.codigo} onClick={() => setCalidad(c.codigo)}
                  style={{
                    padding:'6px 12px', borderRadius:6, fontSize:13, cursor:'pointer',
                    border: calidad === c.codigo ? '1px solid #d4af37' : '1px solid #2a1f0a',
                    background: calidad === c.codigo ? 'rgba(212,175,55,0.15)' : 'transparent',
                    color: calidad === c.codigo ? '#d4af37' : '#6b5a2e',
                  }}>
                  {c.codigo}
                </button>
              ))}
            </div>
          </div>

          {/* Cantidad + Carrito */}
          <div style={{ display:'flex', gap:12, alignItems:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:0,
              border:'1px solid #2a1f0a', borderRadius:8, overflow:'hidden' }}>
              <button onClick={() => setCantidad(q => Math.max(1, q - 1))}
                style={{ width:36, height:40, background:'#1a1000', color:'#d4af37',
                  border:'none', fontSize:18, cursor:'pointer' }}>−</button>
              <span style={{ width:44, textAlign:'center', fontSize:16,
                color:'#e8d5a3', lineHeight:'40px', background:'#0d0800' }}>
                {cantidad}
              </span>
              <button onClick={() => setCantidad(q => Math.min(especie.stock, q + 1))}
                style={{ width:36, height:40, background:'#1a1000', color:'#d4af37',
                  border:'none', fontSize:18, cursor:'pointer' }}>+</button>
            </div>

            <button
              onClick={handleAgregar}
              disabled={especie.stock === 0}
              style={{
                flex:1, padding:'10px 0', borderRadius:8, fontSize:15, fontWeight:700,
                cursor: especie.stock > 0 ? 'pointer' : 'not-allowed',
                background: especie.stock > 0 ? '#d4af37' : '#2a1f0a',
                color: especie.stock > 0 ? '#0d0800' : '#6b5a2e',
                border:'none',
              }}>
              🛒 Agregar al Carrito
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/51999999999?text=Hola,%20me%20interesa%20el%20especimen%20*${encodeURIComponent(especie.nombre)}*%20(ID:%20${especie.id})%20-%20$${especie.precio}%20USD`}
            target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', justifyContent:'center',
              gap:8, padding:'10px 0', borderRadius:8, background:'#1a3a1a',
              color:'#4caf50', border:'1px solid #2d5a2d', textDecoration:'none',
              fontSize:14, fontWeight:600 }}>
            <span>💬</span> Consultar por WhatsApp
          </a>

          {/* Secciones colapsables */}
          {[
            {
              key:'especificaciones',
              titulo:'📋 Especificaciones técnicas',
              contenido: (
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
                  fontSize:13, color:'#8a7040' }}>
                  <div><b style={{color:'#d4af37'}}>ID:</b> {especie.id}</div>
                  <div><b style={{color:'#d4af37'}}>Familia:</b> {especie.familia}</div>
                  {especie.subfamilia && <div><b style={{color:'#d4af37'}}>Subfamilia:</b> {especie.subfamilia}</div>}
                  {especie.orden     && <div><b style={{color:'#d4af37'}}>Orden:</b> {especie.orden}</div>}
                  {especie.suborden  && <div><b style={{color:'#d4af37'}}>Suborden:</b> {especie.suborden}</div>}
                  {especie.subespecie&& <div><b style={{color:'#d4af37'}}>Subespecie:</b> {especie.subespecie}</div>}
                  {(especie as any).sexo && <div><b style={{color:'#d4af37'}}>Sexo/Tipo:</b> {(especie as any).sexo}</div>}
                  {(especie as any).diametro && <div><b style={{color:'#d4af37'}}>Diámetro:</b> {(especie as any).diametro} cm</div>}
                  {(especie as any).calidad && <div><b style={{color:'#d4af37'}}>Calidad:</b> {(especie as any).calidad}</div>}
                  <div><b style={{color:'#d4af37'}}>Partida:</b> 9705.21.00.00</div>
                  <div><b style={{color:'#d4af37'}}>CITES:</b> Apéndice II</div>
                  <div><b style={{color:'#d4af37'}}>Permiso:</b> SERFOR</div>
                </div>
              )
            },
            {
              key:'tipo',
              titulo:'🦋 Tipo de espécimen',
              contenido: (
                <div style={{ fontSize:13, color:'#8a7040', lineHeight:1.7 }}>
                  <p>Espécimen seco preparado con técnica de extensión de alas.
                  Presentado en sobre triangular de papel glasina o en caja entomológica.</p>
                  <p>Origen: Tingo María, Huánuco, Perú — Amazonía.</p>
                  <p>Recolectado con permisos SERFOR vigentes. RUC 20447397804.</p>
                </div>
              )
            },
            {
              key:'precios',
              titulo:'💰 Mayorista / Minorista',
              contenido: (
                <div style={{ fontSize:13, color:'#8a7040' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
                    <div style={{ padding:10, border:'1px solid #2a1f0a', borderRadius:6 }}>
                      <div style={{ color:'#d4af37', fontWeight:700, marginBottom:4 }}>Minorista</div>
                      <div>1–9 unidades</div>
                      <div style={{ color:'#d4af37', fontSize:16 }}>${especie.precio.toFixed(2)}/ud</div>
                    </div>
                    <div style={{ padding:10, border:'1px solid #2a1f0a', borderRadius:6 }}>
                      <div style={{ color:'#d4af37', fontWeight:700, marginBottom:4 }}>Mayorista</div>
                      <div>10+ unidades</div>
                      <div style={{ color:'#d4af37', fontSize:16 }}>${(especie.precio * 0.85).toFixed(2)}/ud</div>
                    </div>
                  </div>
                  <p style={{ marginTop:8, fontSize:12 }}>Pedido mínimo: $300 USD</p>
                </div>
              )
            },
            {
              key:'empaque',
              titulo:'📦 Condición y empaque',
              contenido: (
                <div style={{ fontSize:13, color:'#8a7040', lineHeight:1.7 }}>
                  <p>• Sobre triangular de papel glasina — mariposas diurnas</p>
                  <p>• Caja entomológica con alfiler — coleópteros y artrópodos</p>
                  <p>• Empaque hermético anti-humedad con sílica gel</p>
                  <p>• Caja de cartón doble pared para envío internacional</p>
                  <p>• Etiqueta con nombre científico, localidad y fecha</p>
                </div>
              )
            },
            {
              key:'exportacion',
              titulo:'✈️ Exportación mundial',
              contenido: (
                <div style={{ fontSize:13, color:'#8a7040', lineHeight:1.7 }}>
                  <p>• <b style={{color:'#d4af37'}}>Exporta Fácil (Serpost):</b> 15-30 días — desde $25</p>
                  <p>• <b style={{color:'#d4af37'}}>EMS Serpost:</b> 7-15 días — desde $45</p>
                  <p>• <b style={{color:'#d4af37'}}>DHL Express:</b> 3-5 días — desde $85</p>
                  <p>• <b style={{color:'#d4af37'}}>FedEx International:</b> 3-5 días — desde $85</p>
                  <p style={{ marginTop:8 }}>Seguros disponibles: Lloyd's London, Ship Insurance, Insurtech Digital</p>
                  <p>Tracking QR incluido en cada envío.</p>
                </div>
              )
            },
          ].map(sec => (
            <div key={sec.key} style={{ border:'1px solid #2a1f0a', borderRadius:8, overflow:'hidden' }}>
              <button
                onClick={() => toggleSeccion(sec.key)}
                style={{ width:'100%', display:'flex', justifyContent:'space-between',
                  alignItems:'center', padding:'12px 16px', background:'#0f0900',
                  color:'#d4af37', border:'none', cursor:'pointer', fontSize:14, fontWeight:600 }}>
                <span>{sec.titulo}</span>
                <span style={{ fontSize:18, transform: seccionAbierta === sec.key ? 'rotate(180deg)' : 'none',
                  transition:'transform 0.2s' }}>▾</span>
              </button>
              {seccionAbierta === sec.key && (
                <div style={{ padding:'14px 16px', background:'#0d0800' }}>
                  {sec.contenido}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ══ LIGHTBOX 900×900 ═════════════════════════════════════════ */}
      {lightbox && fotoActiva && (
        <div
          onClick={() => setLightbox(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.92)',
            display:'flex', alignItems:'center', justifyContent:'center',
            zIndex:9999, cursor:'zoom-out' }}>
          <div style={{ width:900, height:900, maxWidth:'95vw', maxHeight:'95vh',
            border:'2px solid #d4af37', borderRadius:12, overflow:'hidden',
            background:'#000', position:'relative' }}>
            <Image src={fotoActiva} alt={especie.nombre} fill
              style={{ objectFit:'contain' }} unoptimized/>
            <button onClick={() => setLightbox(false)}
              style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.7)',
                border:'1px solid #d4af37', color:'#d4af37', borderRadius:6,
                padding:'4px 10px', cursor:'pointer', fontSize:16 }}>✕</button>
          </div>
        </div>
      )}

      {/* ══ POPUP CALIDAD ════════════════════════════════════════════ */}
      {popupCalidad && (
        <div onClick={() => setPopupCalidad(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
            display:'flex', alignItems:'center', justifyContent:'center', zIndex:9998 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:'#111005', border:'1px solid #d4af37', borderRadius:12,
              padding:24, maxWidth:400, width:'90%' }}>
            <h3 style={{ color:'#d4af37', marginTop:0 }}>Sistema de Calidad</h3>
            {CALIDADES.map(c => (
              <div key={c.codigo} style={{ marginBottom:12 }}>
                <div style={{ color:'#d4af37', fontWeight:700 }}>{c.label}</div>
                <div style={{ color:'#8a7040', fontSize:13 }}>{c.desc}</div>
              </div>
            ))}
            <button onClick={() => setPopupCalidad(false)}
              style={{ background:'#d4af37', color:'#0d0800', border:'none',
                padding:'8px 20px', borderRadius:6, cursor:'pointer', fontWeight:700 }}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ══ POPUP ABREVIACIÓN ════════════════════════════════════════ */}
      {popupAbrev && abrevActual && (
        <div onClick={() => setPopupAbrev(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)',
            display:'flex', alignItems:'center', justifyContent:'center', zIndex:9998 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:'#111005', border:'1px solid #d4af37', borderRadius:12,
              padding:24, maxWidth:360, width:'90%' }}>
            <h3 style={{ color:'#d4af37', marginTop:0 }}>{abrevActual}</h3>
            <p style={{ color:'#8a7040', fontSize:14 }}>{ABREVIACIONES[abrevActual]}</p>
            <button onClick={() => setPopupAbrev(false)}
              style={{ background:'#d4af37', color:'#0d0800', border:'none',
                padding:'8px 20px', borderRadius:6, cursor:'pointer', fontWeight:700 }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
