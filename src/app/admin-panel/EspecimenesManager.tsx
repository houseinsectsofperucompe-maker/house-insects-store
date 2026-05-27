'use client'
import { useState, useEffect } from 'react'

type Orden = { _id:string; nombre:string; icono:string; activo:boolean }
type Familia = { _id:string; nombre:string; orden:string; activo:boolean }
type Especie = { _id:string; n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; familia:string; subfamilia?:string; activo:boolean; calidad?:string; sexo?:string }

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const inp={background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'6px 10px',borderRadius:4,fontSize:'.78rem',fontFamily:'Georgia,serif',outline:'none'}
const btn=(bg:string,c:string)=>({background:bg,color:c,border:'none',padding:'7px 14px',borderRadius:4,cursor:'pointer',fontSize:'.78rem',fontWeight:700,fontFamily:'Georgia,serif'})

const api=async(action:string,data:any)=>{
  const r=await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
  return r.json()
}

export default function EspecimenesManager(){
  const [tab,setTab]=useState<'ordenes'|'familias'|'especies'>('especies')
  const [ordenes,setOrdenes]=useState<Orden[]>([])
  const [familias,setFamilias]=useState<Familia[]>([])
  const [especies,setEspecies]=useState<Especie[]>([])
  const [loading,setLoading]=useState(true)
  const [ordenSel,setOrdenSel]=useState('')
  const [famSel,setFamSel]=useState('')
  const [busq,setBusq]=useState('')
  const [editando,setEditando]=useState<Record<string,any>>({})
  const [guardando,setGuardando]=useState<Record<string,boolean>>({})
  const [msg,setMsg]=useState('')
  const [expandido,setExpandido]=useState<Record<string,boolean>>({})

  // Formularios nuevos
  const [nOrden,setNOrden]=useState({nombre:'',icono:'🦋'})
  const [nFam,setNFam]=useState({nombre:'',orden:''})
  const [nEsp,setNEsp]=useState({nombre:'',familia:'',precio:'',stock:'',subfamilia:''})

  useEffect(()=>{cargarTodo()},[])

  const cargarTodo=async()=>{
    setLoading(true)
    try{
      const [e,f,o]=await Promise.all([
        fetch('/api/sanity-read').then(r=>r.json()),
        fetch('/api/sanity-read?type=familia').then(r=>r.json()),
        fetch('/api/sanity-read?type=orden').then(r=>r.json()),
      ])
      setEspecies(e||[])
      setFamilias(f||[])
      setOrdenes(o||[])
      if(e?.length>0&&!famSel) setFamSel(e[0].familia)
    }catch(err){setMsg('Error cargando')}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const guardarEsp=async(esp:Especie)=>{
    setGuardando(p=>({...p,[esp._id]:true}))
    const c=editando[esp._id]||{}
    const r=await api('update',{
      _id:esp._id,
      precio:c.p!==undefined?Number(c.p):esp.p,
      stock:c.s!==undefined?Number(c.s):esp.s,
      fotoFrente:c.foto!==undefined?c.foto:esp.foto,
      fotoLado:c.fotoLado!==undefined?c.fotoLado:esp.fotoLado,
      fotoReverso:c.fotoReverso!==undefined?c.fotoReverso:esp.fotoReverso,
      activo:c.activo!==undefined?c.activo:esp.activo,
      calidad:c.calidad!==undefined?c.calidad:esp.calidad,
      sexo:c.sexo!==undefined?c.sexo:esp.sexo,
    })
    if(r.ok){mostrar('✅ Guardado');setEditando(p=>{const n={...p};delete n[esp._id];return n});cargarTodo()}
    else mostrar('❌ '+r.error)
    setGuardando(p=>({...p,[esp._id]:false}))
  }

  const eliminarEsp=async(id:string,n:string)=>{
    if(!confirm(`¿Eliminar "${n}"?`))return
    await api('delete',{_id:id})
    mostrar('🗑️ Eliminado');cargarTodo()
  }

  const crearEsp=async()=>{
    if(!nEsp.nombre||!nEsp.familia)return
    await api('create',{nombre:nEsp.nombre,familia:nEsp.familia||famSel,subfamilia:nEsp.subfamilia,precio:parseFloat(nEsp.precio)||0,stock:parseInt(nEsp.stock)||0})
    setNEsp({nombre:'',familia:'',precio:'',stock:'',subfamilia:''})
    mostrar('✅ Especie creada');cargarTodo()
  }

  const crearFam=async()=>{
    if(!nFam.nombre)return
    await api('createFamilia',{nombre:nFam.nombre,orden:nFam.orden||ordenSel})
    setNFam({nombre:'',orden:''})
    mostrar('✅ Familia creada');cargarTodo()
  }

  const crearOrden=async()=>{
    if(!nOrden.nombre)return
    await api('createOrden',{nombre:nOrden.nombre,icono:nOrden.icono})
    setNOrden({nombre:'',icono:'🦋'})
    mostrar('✅ Orden creada');cargarTodo()
  }

  const ed=(id:string,campo:string,val:any)=>setEditando(p=>({...p,[id]:{...p[id],[campo]:val}}))
  const famList=Array.from(new Set(especies.map(e=>e.familia))).sort()
  const filtrados=especies.filter(e=>e.familia===famSel&&e.n.toLowerCase().includes(busq.toLowerCase()))
  const sinPrecio=especies.filter(e=>e.p===0).length

  if(loading)return<div style={{color:G,padding:40,textAlign:'center',fontFamily:'Georgia,serif'}}>⏳ Cargando desde Sanity...</div>

  return(
    <div style={{fontFamily:'Georgia,serif'}}>
      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
        <div>
          <h2 style={{color:'#E8C97A',fontSize:'1.2rem',fontWeight:300,margin:0}}>🦋 Gestor de Catálogo</h2>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{especies.length} especies · {familias.length} familias · {ordenes.length} órdenes · <span style={{color:sinPrecio>0?'#ff9966':'#5DBB63'}}>{sinPrecio} sin precio</span></p>
        </div>
        <button onClick={cargarTodo} style={{...btn('rgba(201,168,76,0.1)',G),border:`1px solid ${BD}`}}>🔄 Recargar</button>
      </div>

      {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'8px 14px',marginBottom:12,color:G,fontSize:'.8rem'}}>{msg}</div>}

      {/* Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:16,borderBottom:`1px solid ${BD}`,paddingBottom:8}}>
        {(['especies','familias','ordenes'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)} style={{...btn(tab===t?G:'transparent',tab===t?CARD:G),border:`1px solid ${tab===t?G:BD}`,textTransform:'capitalize',padding:'6px 16px'}}>
            {t==='especies'?`🦋 Especies (${especies.length})`:t==='familias'?`📁 Familias (${familias.length})`:`📋 Órdenes (${ordenes.length})`}
          </button>
        ))}
      </div>

      {/* TAB ORDENES */}
      {tab==='ordenes'&&(
        <div>
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:12,marginBottom:12}}>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginBottom:8}}>NUEVA ORDEN / CATEGORÍA</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <input value={nOrden.icono} onChange={e=>setNOrden(p=>({...p,icono:e.target.value}))} style={{...inp,width:50}} placeholder="🦋"/>
              <input value={nOrden.nombre} onChange={e=>setNOrden(p=>({...p,nombre:e.target.value}))} style={{...inp,flex:1,minWidth:150}} placeholder="Ej: Lepidoptera Diurnae"/>
              <button onClick={crearOrden} style={btn(G,CARD)}>+ Crear</button>
            </div>
          </div>
          {ordenes.map(o=>(
            <div key={o._id} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:6,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:'#E8C97A',fontSize:'.85rem'}}>{o.icono} {o.nombre}</span>
              <div style={{display:'flex',gap:6,alignItems:'center'}}>
                <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>{familias.filter(f=>f.orden===o.nombre).length} familias</span>
                <button onClick={()=>eliminarEsp(o._id,o.nombre)} style={{...btn('rgba(255,80,80,0.15)','#ff5050'),border:'1px solid rgba(255,80,80,0.3)',padding:'4px 8px',fontSize:'.65rem'}}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB FAMILIAS */}
      {tab==='familias'&&(
        <div>
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:12,marginBottom:12}}>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginBottom:8}}>NUEVA FAMILIA</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <input value={nFam.nombre} onChange={e=>setNFam(p=>({...p,nombre:e.target.value}))} style={{...inp,flex:1,minWidth:150}} placeholder="Nombre de la familia"/>
              <select value={nFam.orden} onChange={e=>setNFam(p=>({...p,orden:e.target.value}))} style={{...inp,minWidth:160}}>
                <option value="">-- Selecciona orden --</option>
                {ordenes.map(o=><option key={o._id} value={o.nombre}>{o.icono} {o.nombre}</option>)}
              </select>
              <button onClick={crearFam} style={btn(G,CARD)}>+ Crear</button>
            </div>
          </div>
          {ordenes.map(o=>(
            <div key={o._id} style={{marginBottom:16}}>
              <p style={{color:G,fontSize:'.75rem',fontWeight:700,marginBottom:6,letterSpacing:1}}>{o.icono} {o.nombre}</p>
              {familias.filter(f=>f.orden===o.nombre).map(f=>(
                <div key={f._id} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:6,padding:'8px 12px',marginBottom:4,display:'flex',justifyContent:'space-between',alignItems:'center',marginLeft:12}}>
                  <span style={{color:'#E8C97A',fontSize:'.8rem'}}>{f.nombre}</span>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>{especies.filter(e=>e.familia===f.nombre).length} especies</span>
                    <button onClick={()=>{setFamSel(f.nombre);setTab('especies')}} style={{...btn('rgba(201,168,76,0.1)',G),border:`1px solid ${BD}`,padding:'3px 8px',fontSize:'.65rem'}}>Ver especies</button>
                    <button onClick={()=>eliminarEsp(f._id,f.nombre)} style={{...btn('rgba(255,80,80,0.15)','#ff5050'),border:'1px solid rgba(255,80,80,0.3)',padding:'4px 8px',fontSize:'.65rem'}}>🗑️</button>
                  </div>
                </div>
              ))}
              {familias.filter(f=>f.orden===o.nombre).length===0&&<p style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem',marginLeft:12}}>Sin familias en esta orden</p>}
            </div>
          ))}
        </div>
      )}

      {/* TAB ESPECIES */}
      {tab==='especies'&&(
        <div>
          {/* Nueva especie */}
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:12,marginBottom:12}}>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginBottom:8}}>NUEVA ESPECIE</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <input value={nEsp.nombre} onChange={e=>setNEsp(p=>({...p,nombre:e.target.value}))} style={{...inp,flex:2,minWidth:180}} placeholder="Nombre científico *"/>
              <select value={nEsp.familia||famSel} onChange={e=>setNEsp(p=>({...p,familia:e.target.value}))} style={{...inp,minWidth:140}}>
                {famList.map(f=><option key={f} value={f}>{f}</option>)}
              </select>
              <input value={nEsp.subfamilia} onChange={e=>setNEsp(p=>({...p,subfamilia:e.target.value}))} style={{...inp,width:120}} placeholder="Subfamilia"/>
              <input value={nEsp.precio} onChange={e=>setNEsp(p=>({...p,precio:e.target.value}))} style={{...inp,width:80}} placeholder="Precio" type="number"/>
              <input value={nEsp.stock} onChange={e=>setNEsp(p=>({...p,stock:e.target.value}))} style={{...inp,width:70}} placeholder="Stock" type="number"/>
              <button onClick={crearEsp} style={btn(G,CARD)}>+ Agregar</button>
            </div>
          </div>

          {/* Filtros familias */}
          <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:10}}>
            {famList.map(f=>(
              <button key={f} onClick={()=>{setFamSel(f);setBusq('')}} style={{padding:'4px 10px',borderRadius:16,fontSize:'.62rem',cursor:'pointer',fontFamily:'Georgia,serif',border:`1px solid ${famSel===f?G:BD}`,background:famSel===f?G:'transparent',color:famSel===f?CARD:G}}>
                {f} ({especies.filter(e=>e.familia===f).length})
              </button>
            ))}
          </div>

          <input value={busq} onChange={e=>setBusq(e.target.value)} placeholder={`Buscar en ${famSel}...`} style={{...inp,width:'100%',marginBottom:10,boxSizing:'border-box' as const}}/>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',marginBottom:8}}>{filtrados.length} especies en {famSel}</p>

          {filtrados.map(esp=>{
            const c=editando[esp._id]||{}
            const mod=Object.keys(c).length>0
            const exp=expandido[esp._id]
            return(
              <div key={esp._id} style={{background:mod?'rgba(201,168,76,0.06)':CARD,border:`1px solid ${mod?G:BD}`,borderRadius:8,padding:'10px 12px',marginBottom:5}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:mod||exp?8:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:8,flex:1}}>
                    <button onClick={()=>setExpandido(p=>({...p,[esp._id]:!p[esp._id]}))} style={{background:'none',border:'none',color:'rgba(201,168,76,0.4)',cursor:'pointer',fontSize:'.7rem',padding:0}}>{exp?'▴':'▾'}</button>
                    <span style={{color:'#E8C97A',fontSize:'.78rem',fontStyle:'italic'}}>{esp.n}</span>
                    {!esp.activo&&<span style={{background:'rgba(255,80,80,0.2)',color:'#ff5050',fontSize:'.55rem',padding:'2px 6px',borderRadius:10}}>INACTIVO</span>}
                  </div>
                  <div style={{display:'flex',gap:4,alignItems:'center'}}>
                    <span style={{color:G,fontSize:'.78rem',fontWeight:700}}>${c.p!==undefined?c.p:esp.p}</span>
                    <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>· {c.s!==undefined?c.s:esp.s} ud</span>
                    {mod&&<button onClick={()=>guardarEsp(esp)} disabled={guardando[esp._id]} style={{...btn('#25D366','#0A0A05'),padding:'4px 10px',fontSize:'.7rem'}}>{guardando[esp._id]?'...':'💾'}</button>}
                    <button onClick={()=>eliminarEsp(esp._id,esp.n)} style={{...btn('rgba(255,80,80,0.1)','#ff5050'),border:'1px solid rgba(255,80,80,0.2)',padding:'4px 7px',fontSize:'.65rem'}}>🗑️</button>
                  </div>
                </div>
                {(mod||exp)&&(
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',paddingTop:8,borderTop:`1px solid rgba(201,168,76,0.1)`}}>
                    <div><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>PRECIO USD</span><input type="number" value={c.p!==undefined?c.p:esp.p} onChange={e=>ed(esp._id,'p',e.target.value)} style={{...inp,width:75}}/></div>
                    <div><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>STOCK</span><input type="number" value={c.s!==undefined?c.s:esp.s} onChange={e=>ed(esp._id,'s',e.target.value)} style={{...inp,width:75}}/></div>
                    <div><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>CALIDAD</span>
                      <select value={c.calidad!==undefined?c.calidad:esp.calidad||'A1'} onChange={e=>ed(esp._id,'calidad',e.target.value)} style={{...inp,width:90}}>
                        <option value="A1">A1</option><option value="A1-">A1-</option><option value="VGA2">VGA2</option><option value="A2">A2</option>
                      </select>
                    </div>
                    <div><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>SEXO</span>
                      <select value={c.sexo!==undefined?c.sexo:esp.sexo||'M or F'} onChange={e=>ed(esp._id,'sexo',e.target.value)} style={{...inp,width:90}}>
                        <option value="M">M</option><option value="F">F</option><option value="P">P</option><option value="EP">EP</option><option value="M or F">M or F</option>
                      </select>
                    </div>
                    <div style={{flex:1,minWidth:180}}><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>FOTO FRENTE</span><input value={c.foto!==undefined?c.foto:esp.foto||''} onChange={e=>ed(esp._id,'foto',e.target.value)} placeholder="URL Bunny.net..." style={{...inp,width:'100%',boxSizing:'border-box' as const}}/></div>
                    <div style={{flex:1,minWidth:180}}><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>FOTO LADO</span><input value={c.fotoLado!==undefined?c.fotoLado:esp.fotoLado||''} onChange={e=>ed(esp._id,'fotoLado',e.target.value)} placeholder="URL Bunny.net..." style={{...inp,width:'100%',boxSizing:'border-box' as const}}/></div>
                    <div style={{flex:1,minWidth:180}}><span style={{color:'rgba(201,168,76,0.5)',fontSize:'.58rem',display:'block',marginBottom:2}}>FOTO REVERSO</span><input value={c.fotoReverso!==undefined?c.fotoReverso:esp.fotoReverso||''} onChange={e=>ed(esp._id,'fotoReverso',e.target.value)} placeholder="URL Bunny.net..." style={{...inp,width:'100%',boxSizing:'border-box' as const}}/></div>
                    <div style={{display:'flex',alignItems:'center',gap:6,marginTop:4}}>
                      <label style={{display:'flex',alignItems:'center',gap:4,cursor:'pointer'}}>
                        <input type="checkbox" checked={c.activo!==undefined?c.activo:esp.activo} onChange={e=>ed(esp._id,'activo',e.target.checked)}/>
                        <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.65rem'}}>Activo en web</span>
                      </label>
                    </div>
                    <button onClick={()=>guardarEsp(esp)} disabled={guardando[esp._id]} style={{...btn('#25D366','#0A0A05'),alignSelf:'flex-end',padding:'7px 16px'}}>{guardando[esp._id]?'Guardando...':'💾 Guardar cambios'}</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
