'use client'
import { useState, useEffect, useRef } from 'react'

const RUBROS = [
  { id: 'especimenes-biologicos-secos', label: 'Lepidoptera Diurna', icon: '🦋' },
  { id: 'especimenes-nocturnas',        label: 'Moths Nocturnas',    icon: '🌙' },
  { id: 'especimenes-coleopteros',      label: 'Coleoptera',         icon: '🪲' },
  { id: 'especimenes-artropodos',       label: 'Arthropoda',         icon: '🕷️' },
]

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005', BD = '#2a1f0a'
const btn = (bg:string, color:string, extra?:any) => ({
  background:bg, color, border:'none', padding:'6px 12px', borderRadius:6,
  cursor:'pointer', fontSize:11, fontFamily:'Georgia,serif', fontWeight:700, ...extra
})

export default function GestorEspecimenes() {
  const [rubroSel,  setRubroSel]  = useState(RUBROS[0].id)
  const [familias,  setFamilias]  = useState<any[]>([])
  const [especies,  setEspecies]  = useState<any[]>([])
  const [famSel,    setFamSel]    = useState('')
  const [espSel,    setEspSel]    = useState<any>(null)
  const [editando,  setEditando]  = useState<any>({})
  const [busq,      setBusq]      = useState('')
  const [loading,   setLoading]   = useState(false)
  const [msg,       setMsg]       = useState('')
  const [guardando, setGuardando] = useState(false)
  const [subiendo,  setSubiendo]  = useState<Record<string,boolean>>({})
  const [tab,       setTab]       = useState<'fotos'|'videos'|'datos'|'mover'>('fotos')
  const fileRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
                    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const vidRefs  = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]

  useEffect(() => {
    async function cargar() {
      setLoading(true); setEspSel(null); setFamSel(''); setEspecies([]); setFamilias([])
      try {
        const res = await fetch(`/data/rubros/${rubroSel}.json`)
        const data = await res.json()
        setFamilias(data.familias || [])
        setEspecies(data.especies || [])
        if (data.familias?.length > 0) setFamSel(data.familias[0].id)
      } catch { setMsg('❌ Error cargando') }
      setLoading(false)
    }
    cargar()
  }, [rubroSel])

  const espFam = famSel ? especies.filter((e:any) => e.familia === famSel) : especies
  const espFiltradas = busq
    ? espFam.filter((e:any) => (e.nombre||e.id).toLowerCase().includes(busq.toLowerCase()))
    : espFam
  const conFoto = espFiltradas.filter((e:any) => e.imagenes?.[0]).length

  const seleccionar = (e:any) => { setEspSel(e); setEditando({...e}); setTab('fotos') }

  const mostrar = (m:string) => { setMsg(m); setTimeout(()=>setMsg(''),3000) }

  // ── Guardar cambios ────────────────────────────────────────────
  const guardar = async (extra?:any) => {
    if (!espSel) return
    setGuardando(true)
    const payload = {...espSel, ...editando, ...(extra||{})}
    try {
      const res = await fetch('/api/admin/especie', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ rubroId: rubroSel, especie: payload })
      })
      if (res.ok) {
        mostrar('✅ Guardado')
        setEspecies((prev:any[]) => prev.map(e => e.id===espSel.id ? payload : e))
        setEspSel(payload)
        setEditando(payload)
      } else mostrar('❌ Error al guardar')
    } catch { mostrar('❌ Error conexión') }
    setGuardando(false)
  }

  // ── Subir foto a Bunny.net via /api/upload ─────────────────────
  const subirFoto = async (file: File, slot: number) => {
    const key = `foto-${slot}`
    setSubiendo(p => ({...p,[key]:true}))
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('familia', espSel.familia || 'general')
      fd.append('especie', espSel.id)
      fd.append('tipo', `foto${slot}`)
      const res = await fetch('/api/upload', { method:'POST', body:fd })
      const data = await res.json()
      if (data.url) {
        const imgs = [...(editando.imagenes || espSel.imagenes || [])]
        imgs[slot] = data.url
        const updated = {...editando, imagenes: imgs}
        setEditando(updated)
        await guardar(updated)
        mostrar(`✅ Foto ${slot+1} subida`)
      } else mostrar('❌ Error subiendo foto')
    } catch { mostrar('❌ Error de conexión') }
    setSubiendo(p => ({...p,[key]:false}))
  }

  // ── Subir video ────────────────────────────────────────────────
  const subirVideo = async (file: File, slot: number) => {
    const key = `vid-${slot}`
    setSubiendo(p => ({...p,[key]:true}))
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('familia', espSel.familia || 'general')
      fd.append('especie', espSel.id)
      fd.append('tipo', `video${slot}`)
      const res = await fetch('/api/upload', { method:'POST', body:fd })
      const data = await res.json()
      if (data.url) {
        const vids = [...(editando.videos || espSel.videos || [])]
        vids[slot] = data.url
        const updated = {...editando, videos: vids}
        setEditando(updated)
        await guardar(updated)
        mostrar(`✅ Video subido`)
      } else mostrar('❌ Error subiendo video')
    } catch { mostrar('❌ Error de conexión') }
    setSubiendo(p => ({...p,[key]:false}))
  }

  // ── Eliminar foto ──────────────────────────────────────────────
  const eliminarFoto = async (slot: number) => {
    const imgs = [...(editando.imagenes || espSel.imagenes || [])]
    imgs[slot] = ''
    const updated = {...editando, imagenes: imgs}
    setEditando(updated)
    await guardar(updated)
    mostrar('🗑️ Foto eliminada')
  }

  // ── Eliminar video ─────────────────────────────────────────────
  const eliminarVideo = async (slot: number) => {
    const vids = [...(editando.videos || espSel.videos || [])]
    vids[slot] = ''
    const updated = {...editando, videos: vids}
    setEditando(updated)
    await guardar(updated)
    mostrar('🗑️ Video eliminado')
  }

  // ── Mover a otra familia ───────────────────────────────────────
  const moverFamilia = async (nuevaFamilia: string, nuevoRubro?: string) => {
    const rubroDestino = nuevoRubro || rubroSel
    if (rubroDestino !== rubroSel) {
      // Mover a otro rubro
      try {
        await fetch('/api/admin/especie', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ rubroId: rubroSel, especie: {...espSel, _delete: true} })
        })
        await fetch('/api/admin/especie', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ rubroId: rubroDestino, especie: {...espSel, familia: nuevaFamilia, _create: true} })
        })
        setEspecies(prev => prev.filter(e => e.id !== espSel.id))
        setEspSel(null)
        mostrar(`✅ Movida a ${nuevaFamilia} en ${rubroDestino}`)
      } catch { mostrar('❌ Error moviendo') }
    } else {
      await guardar({...editando, familia: nuevaFamilia})
      mostrar(`✅ Movida a ${nuevaFamilia}`)
    }
  }

  // ── Eliminar especie ───────────────────────────────────────────
  const eliminarEspecie = async () => {
    if (!confirm(`¿Eliminar ${espSel.nombre}?`)) return
    try {
      await fetch('/api/admin/especie', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ rubroId: rubroSel, especie: {...espSel, _delete: true} })
      })
      setEspecies(prev => prev.filter(e => e.id !== espSel.id))
      setEspSel(null)
      mostrar('🗑️ Especie eliminada')
    } catch { mostrar('❌ Error eliminando') }
  }

  const TABS_FOTO = ['Frente','Lado','Reverso','Detalle']
  const TABS_VID  = ['WebM','MP4']
  const imagenes = editando.imagenes || espSel?.imagenes || []
  const videos   = editando.videos   || espSel?.videos   || []

  return (
    <div style={{background:BG,minHeight:'100vh',color:'#e8d5a3',fontFamily:'Georgia,serif'}}>

      {/* HEADER */}
      <div style={{background:BG2,borderBottom:`1px solid ${BD}`,padding:'12px 24px',
        display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0,color:G,fontSize:18}}>🔬 Gestor de Especímenes</h1>
          <p style={{margin:0,color:'#6b5a2e',fontSize:11}}>House Insects of Peru · RUC 20447397804</p>
        </div>
        <a href="/admin-panel" style={{color:G,fontSize:12,textDecoration:'none',
          border:`1px solid ${BD}`,padding:'5px 12px',borderRadius:6}}>← Panel</a>
      </div>

      {/* TABS RUBROS */}
      <div style={{display:'flex',gap:8,padding:'10px 24px',borderBottom:`1px solid ${BD}`,flexWrap:'wrap'}}>
        {RUBROS.map(r => (
          <button key={r.id} onClick={() => setRubroSel(r.id)} style={{
            padding:'6px 14px',borderRadius:8,cursor:'pointer',fontSize:12,
            fontFamily:'Georgia,serif',fontWeight:rubroSel===r.id?700:400,
            border:`1px solid ${rubroSel===r.id?G:BD}`,
            background:rubroSel===r.id?'rgba(201,168,76,0.12)':'transparent',
            color:rubroSel===r.id?G:'#8a7040',
          }}>{r.icon} {r.label}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'180px 1fr 420px',height:'calc(100vh - 112px)'}}>

        {/* ══ FAMILIAS ══════════════════════════════════════════ */}
        <div style={{borderRight:`1px solid ${BD}`,overflowY:'auto'}}>
          <div style={{padding:'7px 12px',color:'#4a3a1a',fontSize:10,
            textTransform:'uppercase',letterSpacing:1,borderBottom:`1px solid ${BD}`}}>
            {loading?'⏳':`${familias.length} familias`}
          </div>
          {familias.map((f:any) => (
            <button key={f.id} onClick={() => {setFamSel(f.id);setEspSel(null)}} style={{
              width:'100%',textAlign:'left',padding:'8px 12px',
              background:famSel===f.id?'rgba(201,168,76,0.08)':'transparent',
              borderLeft:`3px solid ${famSel===f.id?G:'transparent'}`,
              border:'none',borderBottom:`1px solid ${BD}`,
              color:famSel===f.id?G:'#8a7040',cursor:'pointer',
              fontSize:11,fontFamily:'Georgia,serif',
              display:'flex',justifyContent:'space-between',
            }}>
              <span style={{fontStyle:'italic'}}>{f.id}</span>
              <span style={{fontSize:10,color:'#4a3a1a'}}>{f.total||0}</span>
            </button>
          ))}
        </div>

        {/* ══ LISTA ESPECIES ════════════════════════════════════ */}
        <div style={{borderRight:`1px solid ${BD}`,overflowY:'auto'}}>
          <div style={{padding:'9px 12px',borderBottom:`1px solid ${BD}`,
            position:'sticky',top:0,background:BG,zIndex:10}}>
            <input value={busq} onChange={e=>setBusq(e.target.value)}
              placeholder="Buscar nombre científico..."
              style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                color:'#e8d5a3',padding:'6px 10px',borderRadius:6,
                fontSize:12,fontFamily:'Georgia,serif',boxSizing:'border-box' as any}}
            />
            <div style={{display:'flex',gap:12,marginTop:5,fontSize:11}}>
              <span style={{color:'#4caf50'}}>✓ {conFoto} con foto</span>
              <span style={{color:'#e53935'}}>✗ {espFiltradas.length-conFoto} sin foto</span>
              <span style={{color:'#6b5a2e'}}>{espFiltradas.length} total</span>
            </div>
          </div>
          {loading ? (
            <div style={{padding:30,textAlign:'center',color:'#6b5a2e',fontSize:12}}>⏳ Cargando...</div>
          ) : espFiltradas.map((e:any) => (
            <div key={e.id} onClick={() => seleccionar(e)} style={{
              padding:'8px 12px',cursor:'pointer',borderBottom:`1px solid ${BD}`,
              background:espSel?.id===e.id?'rgba(201,168,76,0.07)':'transparent',
              borderLeft:`3px solid ${espSel?.id===e.id?G:'transparent'}`,
              display:'flex',alignItems:'center',gap:10,
            }}>
              <div style={{width:38,height:38,borderRadius:5,flexShrink:0,
                background:'#000',border:`1px solid ${BD}`,overflow:'hidden',
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                {e.imagenes?.[0]
                  ? <img src={e.imagenes[0]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                  : <span style={{fontSize:14}}>📷</span>}
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:11,fontStyle:'italic',color:'#e8d5a3',
                  whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  {e.nombre||e.id}
                  {e.subespecie&&<span style={{color:'#8a7040'}}> {e.subespecie}</span>}
                </div>
                <div style={{fontSize:10,color:'#6b5a2e',marginTop:1}}>
                  {e.id} · ${e.precio} · {e.stock} uds
                  {e.imagenes?.filter(Boolean).length>0 &&
                    <span style={{color:'#4caf50',marginLeft:6}}>
                      📸{e.imagenes.filter(Boolean).length}
                    </span>
                  }
                  {e.videos?.filter(Boolean).length>0 &&
                    <span style={{color:'#2196f3',marginLeft:4}}>
                      🎬{e.videos.filter(Boolean).length}
                    </span>
                  }
                </div>
              </div>
              <div style={{width:6,height:6,borderRadius:'50%',flexShrink:0,
                background:e.imagenes?.[0]?'#4caf50':'#444'}}/>
            </div>
          ))}
        </div>

        {/* ══ EDITOR ════════════════════════════════════════════ */}
        <div style={{overflowY:'auto'}}>
          {!espSel ? (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',
              height:'60%',color:'#4a3a1a',fontSize:12,textAlign:'center',
              flexDirection:'column',gap:8}}>
              <span style={{fontSize:28}}>🔬</span>
              Selecciona una especie
            </div>
          ) : (
            <div style={{padding:16}}>

              {/* Nombre + acciones rápidas */}
              <div style={{marginBottom:12}}>
                <h2 style={{color:G,fontSize:15,fontStyle:'italic',margin:'0 0 2px'}}>
                  {espSel.nombre}{espSel.subespecie&&` ${espSel.subespecie}`}
                </h2>
                <div style={{fontSize:10,color:'#6b5a2e',marginBottom:8}}>
                  {espSel.id} · {espSel.familia}{espSel.subfamilia&&` / ${espSel.subfamilia}`}
                </div>
                {/* Acciones rápidas */}
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  <a href={`/catalogo/especimenes/${espSel.id}`} target="_blank"
                    style={{...btn('rgba(201,168,76,0.1)',G),textDecoration:'none'}}>
                    👁 Ver en catálogo
                  </a>
                  <button onClick={eliminarEspecie}
                    style={btn('rgba(229,57,53,0.15)','#e53935')}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>

              {/* Tabs del editor */}
              <div style={{display:'flex',gap:4,marginBottom:14,borderBottom:`1px solid ${BD}`,paddingBottom:8}}>
                {(['fotos','videos','datos','mover'] as const).map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding:'5px 10px',borderRadius:6,cursor:'pointer',fontSize:11,
                    fontFamily:'Georgia,serif',border:`1px solid ${tab===t?G:BD}`,
                    background:tab===t?'rgba(201,168,76,0.12)':'transparent',
                    color:tab===t?G:'#8a7040',
                  }}>
                    {t==='fotos'?'📸 Fotos':t==='videos'?'🎬 Videos':t==='datos'?'📋 Datos':'📦 Mover'}
                  </button>
                ))}
              </div>

              {/* ── TAB FOTOS ─────────────────────────────────── */}
              {tab==='fotos' && (
                <div>
                  {TABS_FOTO.map((label,i) => (
                    <div key={label} style={{marginBottom:14,background:BG2,
                      border:`1px solid ${BD}`,borderRadius:8,padding:12}}>
                      <div style={{display:'flex',justifyContent:'space-between',
                        alignItems:'center',marginBottom:8}}>
                        <span style={{fontSize:12,color:G,fontWeight:700}}>{label}</span>
                        <div style={{display:'flex',gap:6}}>
                          {imagenes[i] && (
                            <button onClick={() => eliminarFoto(i)}
                              style={btn('rgba(229,57,53,0.15)','#e53935')}>
                              🗑️ Eliminar
                            </button>
                          )}
                          <button onClick={() => fileRefs[i].current?.click()}
                            style={btn('rgba(201,168,76,0.15)',G)}
                            disabled={subiendo[`foto-${i}`]}>
                            {subiendo[`foto-${i}`]?'⏳ Subiendo...':'⬆️ Subir foto'}
                          </button>
                          <input ref={fileRefs[i]} type="file"
                            accept=".webp,.jpg,.jpeg,.png,.gif"
                            style={{display:'none'}}
                            onChange={e => {
                              const f = e.target.files?.[0]
                              if(f) subirFoto(f,i)
                              e.target.value=''
                            }}
                          />
                        </div>
                      </div>

                      {/* Preview o placeholder */}
                      {imagenes[i] ? (
                        <div style={{position:'relative'}}>
                          <img src={imagenes[i]} alt={label}
                            style={{width:'100%',aspectRatio:'1/1',objectFit:'contain',
                              background:'#000',borderRadius:6}}/>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileRefs[i].current?.click()}
                          style={{width:'100%',aspectRatio:'4/3',background:'#0a0600',
                            border:`2px dashed ${BD}`,borderRadius:6,display:'flex',
                            flexDirection:'column',alignItems:'center',justifyContent:'center',
                            cursor:'pointer',gap:6}}>
                          <span style={{fontSize:28}}>📷</span>
                          <span style={{fontSize:11,color:'#4a3a1a'}}>
                            Click para subir {label.toLowerCase()}
                          </span>
                          <span style={{fontSize:10,color:'#3a2a0a'}}>
                            WebP, JPG, PNG, GIF
                          </span>
                        </div>
                      )}

                      {/* URL manual */}
                      <div style={{marginTop:8}}>
                        <div style={{fontSize:10,color:'#4a3a1a',marginBottom:4}}>
                          O pega URL de Bunny.net:
                        </div>
                        <input
                          value={imagenes[i]||''}
                          onChange={e => {
                            const imgs = [...imagenes]
                            imgs[i] = e.target.value
                            setEditando((p:any) => ({...p,imagenes:imgs}))
                          }}
                          placeholder="https://...b-cdn.net/familia/nombre.webp"
                          style={{width:'100%',background:'#0a0600',border:`1px solid ${BD}`,
                            color:'#a08040',padding:'5px 8px',borderRadius:5,fontSize:10,
                            fontFamily:'monospace',boxSizing:'border-box' as any}}
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => guardar()} disabled={guardando}
                    style={{...btn(G,'#0d0800'),width:'100%',padding:'10px',fontSize:13}}>
                    {guardando?'Guardando...':'💾 Guardar Fotos'}
                  </button>
                </div>
              )}

              {/* ── TAB VIDEOS ────────────────────────────────── */}
              {tab==='videos' && (
                <div>
                  {TABS_VID.map((ext,i) => (
                    <div key={ext} style={{marginBottom:14,background:BG2,
                      border:`1px solid ${BD}`,borderRadius:8,padding:12}}>
                      <div style={{display:'flex',justifyContent:'space-between',
                        alignItems:'center',marginBottom:8}}>
                        <span style={{fontSize:12,color:G,fontWeight:700}}>Video {ext}</span>
                        <div style={{display:'flex',gap:6}}>
                          {videos[i] && (
                            <button onClick={() => eliminarVideo(i)}
                              style={btn('rgba(229,57,53,0.15)','#e53935')}>
                              🗑️ Eliminar
                            </button>
                          )}
                          <button onClick={() => vidRefs[i].current?.click()}
                            style={btn('rgba(201,168,76,0.15)',G)}
                            disabled={subiendo[`vid-${i}`]}>
                            {subiendo[`vid-${i}`]?'⏳ Subiendo...':'⬆️ Subir video'}
                          </button>
                          <input ref={vidRefs[i]} type="file"
                            accept={i===0?'.webm':'video/mp4,.mp4'}
                            style={{display:'none'}}
                            onChange={e => {
                              const f = e.target.files?.[0]
                              if(f) subirVideo(f,i)
                              e.target.value=''
                            }}
                          />
                        </div>
                      </div>

                      {videos[i] ? (
                        <video src={videos[i]} controls
                          style={{width:'100%',borderRadius:6,background:'#000'}}/>
                      ) : (
                        <div onClick={() => vidRefs[i].current?.click()}
                          style={{width:'100%',aspectRatio:'16/9',background:'#0a0600',
                            border:`2px dashed ${BD}`,borderRadius:6,display:'flex',
                            flexDirection:'column',alignItems:'center',justifyContent:'center',
                            cursor:'pointer',gap:6}}>
                          <span style={{fontSize:28}}>🎬</span>
                          <span style={{fontSize:11,color:'#4a3a1a'}}>Click para subir {ext}</span>
                        </div>
                      )}

                      <div style={{marginTop:8}}>
                        <div style={{fontSize:10,color:'#4a3a1a',marginBottom:4}}>
                          O pega URL de Bunny.net:
                        </div>
                        <input
                          value={videos[i]||''}
                          onChange={e => {
                            const vids = [...videos]
                            vids[i] = e.target.value
                            setEditando((p:any) => ({...p,videos:vids}))
                          }}
                          placeholder={`https://...b-cdn.net/familia/nombre.${ext.toLowerCase()}`}
                          style={{width:'100%',background:'#0a0600',border:`1px solid ${BD}`,
                            color:'#a08040',padding:'5px 8px',borderRadius:5,fontSize:10,
                            fontFamily:'monospace',boxSizing:'border-box' as any}}
                        />
                      </div>
                    </div>
                  ))}
                  <button onClick={() => guardar()} disabled={guardando}
                    style={{...btn(G,'#0d0800'),width:'100%',padding:'10px',fontSize:13}}>
                    {guardando?'Guardando...':'💾 Guardar Videos'}
                  </button>
                </div>
              )}

              {/* ── TAB DATOS ─────────────────────────────────── */}
              {tab==='datos' && (
                <div>
                  {/* Taxonomía (solo lectura) */}
                  <div style={{background:BG2,border:`1px solid ${BD}`,borderRadius:7,
                    padding:12,marginBottom:14}}>
                    <div style={{fontSize:10,color:'#4a3a1a',textTransform:'uppercase',
                      letterSpacing:1,marginBottom:8}}>Taxonomía</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:11}}>
                      {[['Orden',espSel.orden],['Suborden',espSel.suborden],
                        ['Familia',espSel.familia],['Subfamilia',espSel.subfamilia],
                        ['Especie',espSel.nombre],['Subespecie',espSel.subespecie],
                        ['ID',espSel.id],['Partida','9705.21.00.00'],
                      ].filter(([,v])=>v).map(([k,v])=>(
                        <div key={k as string}>
                          <span style={{color:'#4a3a1a'}}>{k}: </span>
                          <span style={{color:'#e8d5a3',fontStyle:'italic'}}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Precio, Stock, Calidad, Talla */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:12}}>
                    {[['Precio USD','precio','number'],['Stock (uds)','stock','number']].map(([label,field,type])=>(
                      <div key={field}>
                        <label style={{fontSize:11,color:'#6b5a2e',display:'block',marginBottom:4}}>{label}</label>
                        <input type={type as string}
                          value={editando[field as string]??espSel[field as string]}
                          onChange={e=>setEditando((p:any)=>({...p,[field as string]:parseFloat(e.target.value)}))}
                          style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                            color:G,padding:'7px 10px',borderRadius:6,fontSize:15,
                            fontFamily:'Georgia,serif',boxSizing:'border-box' as any}}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Calidad */}
                  <div style={{marginBottom:12}}>
                    <label style={{fontSize:11,color:'#6b5a2e',display:'block',marginBottom:6}}>Calidad</label>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {['A1','A1-','A2','A3','B'].map(q => (
                        <button key={q} onClick={()=>setEditando((p:any)=>({...p,calidad:q}))}
                          style={{padding:'5px 12px',borderRadius:6,cursor:'pointer',fontSize:12,
                            border:`1px solid ${(editando.calidad||espSel.calidad)===q?G:BD}`,
                            background:(editando.calidad||espSel.calidad)===q?'rgba(201,168,76,0.15)':'transparent',
                            color:(editando.calidad||espSel.calidad)===q?G:'#6b5a2e'}}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Talla */}
                  <div style={{marginBottom:12}}>
                    <label style={{fontSize:11,color:'#6b5a2e',display:'block',marginBottom:6}}>Talla</label>
                    <select value={editando.talla||espSel.talla||''}
                      onChange={e=>setEditando((p:any)=>({...p,talla:e.target.value}))}
                      style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                        color:'#e8d5a3',padding:'7px 10px',borderRadius:6,fontSize:12,
                        fontFamily:'Georgia,serif'}}>
                      <option value="">Sin especificar</option>
                      {['S (3-5cm)','M (5-8cm)','L (8-12cm)','XL (12-15cm)','XXL (15-20cm)','XXXL (20+cm)'].map(t=>(
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Descripción */}
                  <div style={{marginBottom:14}}>
                    <label style={{fontSize:11,color:'#6b5a2e',display:'block',marginBottom:6}}>Descripción</label>
                    <textarea
                      value={editando.desc||espSel.desc||''}
                      onChange={e=>setEditando((p:any)=>({...p,desc:e.target.value}))}
                      rows={4}
                      placeholder="Descripción del espécimen..."
                      style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                        color:'#e8d5a3',padding:'8px 10px',borderRadius:6,fontSize:12,
                        fontFamily:'Georgia,serif',resize:'vertical',boxSizing:'border-box' as any}}
                    />
                  </div>

                  {/* Estado activo */}
                  <div style={{marginBottom:14,display:'flex',alignItems:'center',gap:10}}>
                    <label style={{fontSize:12,color:'#6b5a2e'}}>Estado:</label>
                    <button onClick={()=>setEditando((p:any)=>({...p,activo:!(p.activo??espSel.activo??true)}))}
                      style={{...btn(
                        (editando.activo??espSel.activo??true)?'rgba(76,175,80,0.15)':'rgba(229,57,53,0.15)',
                        (editando.activo??espSel.activo??true)?'#4caf50':'#e53935'
                      )}}>
                      {(editando.activo??espSel.activo??true)?'✓ Activo':'✗ Inactivo'}
                    </button>
                  </div>

                  <button onClick={()=>guardar()} disabled={guardando}
                    style={{...btn(G,'#0d0800'),width:'100%',padding:'10px',fontSize:13}}>
                    {guardando?'Guardando...':'💾 Guardar Datos'}
                  </button>
                </div>
              )}

              {/* ── TAB MOVER ─────────────────────────────────── */}
              {tab==='mover' && (
                <div>
                  <div style={{background:BG2,border:`1px solid ${BD}`,borderRadius:8,
                    padding:14,marginBottom:14}}>
                    <div style={{fontSize:11,color:'#6b5a2e',marginBottom:10}}>
                      Mover a otra familia dentro de <strong style={{color:G}}>{rubroSel}</strong>:
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:6,maxHeight:200,overflowY:'auto'}}>
                      {familias.filter(f=>f.id!==espSel.familia).map((f:any) => (
                        <button key={f.id} onClick={()=>moverFamilia(f.id)}
                          style={{...btn('rgba(201,168,76,0.08)',G,{textAlign:'left',fontStyle:'italic'})}}>
                          → {f.id} ({f.total})
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{background:BG2,border:`1px solid ${BD}`,borderRadius:8,
                    padding:14,marginBottom:14}}>
                    <div style={{fontSize:11,color:'#6b5a2e',marginBottom:10}}>
                      Mover a otro rubro:
                    </div>
                    <div style={{display:'flex',flexDirection:'column',gap:6}}>
                      {RUBROS.filter(r=>r.id!==rubroSel).map(r => (
                        <button key={r.id} onClick={()=>moverFamilia(espSel.familia,r.id)}
                          style={{...btn('rgba(201,168,76,0.08)',G,{textAlign:'left'})}}>
                          → {r.icon} {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{background:'rgba(229,57,53,0.05)',border:'1px solid rgba(229,57,53,0.2)',
                    borderRadius:8,padding:14}}>
                    <div style={{fontSize:11,color:'#e53935',marginBottom:10}}>Zona peligrosa:</div>
                    <button onClick={eliminarEspecie}
                      style={{...btn('rgba(229,57,53,0.15)','#e53935'),width:'100%',padding:'8px'}}>
                      🗑️ Eliminar especie permanentemente
                    </button>
                  </div>
                </div>
              )}

              {/* Mensaje */}
              {msg && (
                <div style={{marginTop:12,padding:'8px 12px',borderRadius:6,
                  background:msg.startsWith('✅')?'rgba(76,175,80,0.1)':
                             msg.startsWith('🗑️')?'rgba(255,152,0,0.1)':'rgba(229,57,53,0.1)',
                  color:msg.startsWith('✅')?'#4caf50':
                        msg.startsWith('🗑️')?'#ff9800':'#e53935',fontSize:12}}>
                  {msg}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
