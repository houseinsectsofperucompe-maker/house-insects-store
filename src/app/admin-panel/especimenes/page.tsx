'use client'
import { useState, useEffect } from 'react'

// Carga directo desde /public/data/rubros/*.json — sin API, sin payload

const RUBROS = [
  { id: 'especimenes-biologicos-secos', label: 'Lepidoptera Diurna', icon: '🦋' },
  { id: 'especimenes-nocturnas',        label: 'Moths Nocturnas',    icon: '🌙' },
  { id: 'especimenes-coleopteros',      label: 'Coleoptera',         icon: '🪲' },
  { id: 'especimenes-artropodos',       label: 'Arthropoda',         icon: '🕷️' },
]

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005', BD = '#2a1f0a'

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

  useEffect(() => {
    async function cargar() {
      setLoading(true)
      setEspSel(null)
      setFamSel('')
      setEspecies([])
      setFamilias([])
      try {
        // Fetch directo al JSON estático — Vercel lo sirve desde CDN sin límites
        const res = await fetch(`/data/rubros/${rubroSel}.json`)
        const data = await res.json()
        setFamilias(data.familias || [])
        setEspecies(data.especies || [])
        if (data.familias?.length > 0) setFamSel(data.familias[0].id)
      } catch { setMsg('❌ Error cargando datos') }
      setLoading(false)
    }
    cargar()
  }, [rubroSel])

  const espFam = famSel ? especies.filter((e:any) => e.familia === famSel) : especies
  const espFiltradas = busq
    ? espFam.filter((e:any) => (e.nombre||e.id).toLowerCase().includes(busq.toLowerCase()))
    : espFam

  const conFoto = espFiltradas.filter((e:any) => e.imagenes?.[0]).length
  const sinFoto = espFiltradas.length - conFoto

  const seleccionar = (e: any) => { setEspSel(e); setEditando({...e}) }

  const setImg = (i: number, val: string) => {
    const imgs = [...(editando.imagenes || espSel?.imagenes || [])]
    imgs[i] = val
    setEditando((p:any) => ({...p, imagenes: imgs}))
  }

  const setVid = (i: number, val: string) => {
    const vids = [...(editando.videos || espSel?.videos || [])]
    vids[i] = val
    setEditando((p:any) => ({...p, videos: vids}))
  }

  const guardar = async () => {
    if (!espSel) return
    setGuardando(true)
    try {
      const res = await fetch('/api/admin/especie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rubroId: rubroSel, especie: {...espSel, ...editando} })
      })
      if (res.ok) {
        setMsg('✅ Guardado')
        setEspecies((prev:any[]) => prev.map(e => e.id === espSel.id ? {...e, ...editando} : e))
        setEspSel((prev:any) => ({...prev, ...editando}))
      } else setMsg('❌ Error al guardar')
    } catch { setMsg('❌ Error conexión') }
    setGuardando(false)
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div style={{background:BG,minHeight:'100vh',color:'#e8d5a3',fontFamily:'Georgia,serif'}}>

      {/* HEADER */}
      <div style={{background:BG2,borderBottom:`1px solid ${BD}`,padding:'14px 24px',
        display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0,color:G,fontSize:20}}>🔬 Gestor de Especímenes</h1>
          <p style={{margin:0,color:'#6b5a2e',fontSize:12}}>House Insects of Peru · RUC 20447397804</p>
        </div>
        <a href="/admin-panel" style={{color:G,fontSize:13,textDecoration:'none',
          border:`1px solid ${BD}`,padding:'6px 14px',borderRadius:6}}>← Panel</a>
      </div>

      {/* TABS RUBROS */}
      <div style={{display:'flex',gap:8,padding:'12px 24px',borderBottom:`1px solid ${BD}`,flexWrap:'wrap'}}>
        {RUBROS.map(r => (
          <button key={r.id} onClick={() => setRubroSel(r.id)} style={{
            padding:'7px 14px',borderRadius:8,cursor:'pointer',fontSize:13,
            fontFamily:'Georgia,serif',fontWeight:rubroSel===r.id?700:400,
            border:`1px solid ${rubroSel===r.id?G:BD}`,
            background:rubroSel===r.id?'rgba(201,168,76,0.12)':'transparent',
            color:rubroSel===r.id?G:'#8a7040',
          }}>{r.icon} {r.label}</button>
        ))}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'200px 1fr 380px',height:'calc(100vh - 120px)'}}>

        {/* FAMILIAS */}
        <div style={{borderRight:`1px solid ${BD}`,overflowY:'auto'}}>
          <div style={{padding:'8px 14px',color:'#4a3a1a',fontSize:10,
            textTransform:'uppercase',letterSpacing:1,borderBottom:`1px solid ${BD}`}}>
            {loading ? '⏳ Cargando...' : `${familias.length} familias`}
          </div>
          {familias.map((f:any) => (
            <button key={f.id} onClick={() => {setFamSel(f.id); setEspSel(null)}} style={{
              width:'100%',textAlign:'left',padding:'9px 14px',
              background:famSel===f.id?'rgba(201,168,76,0.08)':'transparent',
              borderLeft:`3px solid ${famSel===f.id?G:'transparent'}`,
              border:'none',borderBottom:`1px solid ${BD}`,
              color:famSel===f.id?G:'#8a7040',
              cursor:'pointer',fontSize:12,fontFamily:'Georgia,serif',
              display:'flex',justifyContent:'space-between',
            }}>
              <span style={{fontStyle:'italic'}}>{f.id}</span>
              <span style={{fontSize:10,color:'#4a3a1a'}}>{f.total||0}</span>
            </button>
          ))}
        </div>

        {/* LISTA ESPECIES */}
        <div style={{borderRight:`1px solid ${BD}`,overflowY:'auto'}}>
          <div style={{padding:'10px 14px',borderBottom:`1px solid ${BD}`,
            position:'sticky',top:0,background:BG,zIndex:10}}>
            <input value={busq} onChange={e => setBusq(e.target.value)}
              placeholder="Buscar nombre científico..."
              style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                color:'#e8d5a3',padding:'7px 10px',borderRadius:6,
                fontSize:12,fontFamily:'Georgia,serif',boxSizing:'border-box' as any}}
            />
            <div style={{display:'flex',gap:12,marginTop:6,fontSize:11}}>
              <span style={{color:'#4caf50'}}>✓ {conFoto} con foto</span>
              <span style={{color:'#e53935'}}>✗ {sinFoto} sin foto</span>
              <span style={{color:'#6b5a2e'}}>Total: {espFiltradas.length}</span>
            </div>
          </div>

          {loading ? (
            <div style={{padding:40,textAlign:'center',color:'#6b5a2e',fontSize:13}}>
              ⏳ Cargando especies...
            </div>
          ) : espFiltradas.map((e:any) => (
            <div key={e.id} onClick={() => seleccionar(e)} style={{
              padding:'9px 14px',cursor:'pointer',borderBottom:`1px solid ${BD}`,
              background:espSel?.id===e.id?'rgba(201,168,76,0.07)':'transparent',
              borderLeft:`3px solid ${espSel?.id===e.id?G:'transparent'}`,
              display:'flex',alignItems:'center',gap:10,
            }}>
              <div style={{width:42,height:42,borderRadius:5,flexShrink:0,
                background:'#000',border:`1px solid ${BD}`,overflow:'hidden',
                display:'flex',alignItems:'center',justifyContent:'center'}}>
                {e.imagenes?.[0]
                  ? <img src={e.imagenes[0]} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                  : <span style={{fontSize:16}}>📷</span>
                }
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontStyle:'italic',color:'#e8d5a3',
                  whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                  {e.nombre||e.id}
                  {e.subespecie&&<span style={{color:'#8a7040'}}> {e.subespecie}</span>}
                </div>
                <div style={{fontSize:10,color:'#6b5a2e',marginTop:2}}>
                  {e.subfamilia&&`${e.subfamilia} · `}
                  {e.id} · ${e.precio} · {e.stock} uds
                </div>
              </div>
              <div style={{width:7,height:7,borderRadius:'50%',flexShrink:0,
                background:e.imagenes?.[0]?'#4caf50':'#444'}}/>
            </div>
          ))}
        </div>

        {/* EDITOR */}
        <div style={{overflowY:'auto',padding:18}}>
          {!espSel ? (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',
              height:'60%',color:'#4a3a1a',fontSize:13,textAlign:'center',
              flexDirection:'column',gap:8}}>
              <span style={{fontSize:32}}>🔬</span>
              Selecciona una especie<br/>para editar fotos y datos
            </div>
          ) : (
            <>
              <h2 style={{color:G,fontSize:16,fontStyle:'italic',margin:'0 0 3px'}}>
                {espSel.nombre}{espSel.subespecie&&` ${espSel.subespecie}`}
              </h2>
              <div style={{fontSize:11,color:'#6b5a2e',marginBottom:14}}>
                {espSel.id} · {espSel.familia}
                {espSel.subfamilia&&` / ${espSel.subfamilia}`}
              </div>

              {/* Taxonomía */}
              <div style={{background:BG2,border:`1px solid ${BD}`,borderRadius:7,
                padding:12,marginBottom:14}}>
                <div style={{fontSize:10,color:'#4a3a1a',textTransform:'uppercase',
                  letterSpacing:1,marginBottom:8}}>Taxonomía Completa</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,fontSize:11}}>
                  {[['Orden',espSel.orden],['Suborden',espSel.suborden],
                    ['Familia',espSel.familia],['Subfamilia',espSel.subfamilia],
                    ['Especie',espSel.nombre],['Subespecie',espSel.subespecie],
                  ].filter(([,v])=>v).map(([k,v])=>(
                    <div key={k as string}>
                      <span style={{color:'#4a3a1a'}}>{k}: </span>
                      <span style={{color:'#e8d5a3',fontStyle:'italic'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precio y Stock */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:14}}>
                {[['Precio USD','precio'],['Stock (uds)','stock']].map(([label,field])=>(
                  <div key={field}>
                    <label style={{fontSize:11,color:'#6b5a2e',display:'block',marginBottom:5}}>{label}</label>
                    <input type="number"
                      value={editando[field]??espSel[field]}
                      onChange={e=>setEditando((p:any)=>({...p,[field]:parseFloat(e.target.value)}))}
                      style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                        color:G,padding:'7px 10px',borderRadius:6,fontSize:15,
                        fontFamily:'Georgia,serif',boxSizing:'border-box' as any}}
                    />
                  </div>
                ))}
              </div>

              {/* Fotos WebP Bunny.net */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:'#6b5a2e',marginBottom:8,
                  display:'flex',justifyContent:'space-between'}}>
                  <span>📸 Fotos WebP — Bunny.net</span>
                  <span style={{color:'#4a3a1a'}}>
                    {(editando.imagenes||espSel.imagenes||[]).filter(Boolean).length}/4
                  </span>
                </div>
                {['Frente','Lado','Reverso','Detalle'].map((tab,i)=>(
                  <div key={tab} style={{marginBottom:7}}>
                    <div style={{fontSize:10,color:'#4a3a1a',marginBottom:3}}>{tab}</div>
                    <input
                      value={(editando.imagenes||espSel.imagenes||[])[i]||''}
                      onChange={e=>setImg(i,e.target.value)}
                      placeholder="https://...b-cdn.net/brassolidae/caligo.webp"
                      style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                        color:'#a08040',padding:'6px 8px',borderRadius:5,fontSize:10,
                        fontFamily:'monospace',boxSizing:'border-box' as any}}
                    />
                  </div>
                ))}
              </div>

              {/* Videos */}
              <div style={{marginBottom:14}}>
                <div style={{fontSize:11,color:'#6b5a2e',marginBottom:8}}>🎬 Videos WebM / MP4</div>
                {['WebM','MP4'].map((ext,i)=>(
                  <div key={ext} style={{marginBottom:7}}>
                    <div style={{fontSize:10,color:'#4a3a1a',marginBottom:3}}>{ext}</div>
                    <input
                      value={(editando.videos||espSel.videos||[])[i]||''}
                      onChange={e=>setVid(i,e.target.value)}
                      placeholder={`https://...b-cdn.net/brassolidae/caligo.${ext.toLowerCase()}`}
                      style={{width:'100%',background:BG2,border:`1px solid ${BD}`,
                        color:'#a08040',padding:'6px 8px',borderRadius:5,fontSize:10,
                        fontFamily:'monospace',boxSizing:'border-box' as any}}
                    />
                  </div>
                ))}
              </div>

              {/* Preview foto */}
              {(editando.imagenes?.[0]||espSel.imagenes?.[0])&&(
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,color:'#6b5a2e',marginBottom:6}}>Preview Frente</div>
                  <div style={{background:'#000',borderRadius:7,overflow:'hidden',
                    border:`1px solid ${BD}`,aspectRatio:'1/1'}}>
                    <img src={editando.imagenes?.[0]||espSel.imagenes?.[0]}
                      alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                  </div>
                </div>
              )}

              {msg&&(
                <div style={{padding:'8px 12px',borderRadius:6,marginBottom:10,
                  background:msg.startsWith('✅')?'rgba(76,175,80,0.1)':'rgba(229,57,53,0.1)',
                  color:msg.startsWith('✅')?'#4caf50':'#e53935',fontSize:12}}>
                  {msg}
                </div>
              )}

              <button onClick={guardar} disabled={guardando} style={{
                width:'100%',padding:'11px 0',borderRadius:8,
                background:guardando?'#2a1f0a':G,color:'#0d0800',
                border:'none',fontWeight:700,fontSize:14,cursor:'pointer',
                fontFamily:'Georgia,serif',marginBottom:10,
              }}>
                {guardando?'Guardando...':'💾 Guardar Cambios'}
              </button>

              <a href={`/catalogo/especimenes/${espSel.id}`} target="_blank"
                style={{display:'block',textAlign:'center',color:'#6b5a2e',
                  fontSize:11,textDecoration:'none'}}>
                👁 Ver en catálogo →
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
