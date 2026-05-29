'use client'
import { useState, useEffect, useRef } from 'react'

type Especie = { _id:string; n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; familia:string; subfamilia?:string; activo:boolean; calidad?:string; sexo?:string; video?:string; descripcion?:string; ordenCategoria?:string; tamano?:string; montaje?:string; pesoGramos?:number; precioMayorista?:number; precioVIP?:number; stockMinimo?:number; codigoQR?:string; partidaArancelaria?:string }
type Familia = { _id:string; nombre:string; orden:string; activo:boolean }
type Orden = { _id:string; nombre:string; icono:string; activo:boolean }

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  sidebar:{width:200,background:'#111008',borderRight:`1px solid ${BD}`,minHeight:'100vh',padding:'0',position:'fixed' as const,top:0,left:0,overflowY:'auto' as const,zIndex:100},
  main:{marginLeft:200,padding:24},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const MODULOS=[
  {l:'🦋 Especímenes',p:'/admin-panel/especimenes'},
  {l:'🛒 Pedidos',p:'/admin-panel/pedidos'},
  {l:'👥 Clientes',p:'/admin-panel/clientes'},
  {l:'📦 Stock',p:'/admin-panel/stock'},
  {l:'🚚 Logística',p:'/admin-panel/logistica'},
  {l:'📦 Catálogo',p:'/admin-panel/catalogo'},
  {l:'🔍 SEO',p:'/admin-panel/seo'},
  {l:'🖼️ Imágenes',p:'/admin-panel/imagenes'},
]

const ORDENES_DEFAULT=['Lepidoptera Diurnae','Moths Nocturnas','Coleoptera','Arthropoda']
const CALIDADES=['A1','A1-','VGA2','A2']
const SEXOS=['M','F','P','EP','S','M or F']
const TALLAS=['S (3-5 cm)','M (5-8 cm)','L (8-12 cm)','XL (12-15 cm)','XXL (15-20 cm)','XXXL (20+ cm)']
const MONTAJES=['Sin montar / alas cerradas','Montado / alas abiertas','Enmarcado','Par enmarcado','Enmarcado fondo negro']

export default function EspecimenesPage(){
  const [especies,setEspecies]=useState<Especie[]>([])
  const [familias,setFamilias]=useState<Familia[]>([])
  const [ordenes,setOrdenes]=useState<Orden[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'editar'>('lista')
  const [espEdit,setEspEdit]=useState<Partial<Especie>>({})
  const [busq,setBusq]=useState('')
  const [famSel,setFamSel]=useState('Todas')
  const [ordenSel,setOrdenSel]=useState('Todas')
  const [msg,setMsg]=useState('')
  const [guardando,setGuardando]=useState(false)
  const [pag,setPag]=useState(1)
  const [seleccionados,setSeleccionados]=useState<string[]>([])
  const [dragIdx,setDragIdx]=useState<number|null>(null)
  const [tab,setTab]=useState<'general'|'precios'|'fotos'|'seo'>('general')
  const POR_PAG=25

  useEffect(()=>{cargarTodo()},[])

  const cargarTodo=async()=>{
    setLoading(true)
    try{
      const fams = await fetch('/api/datos').then(r=>r.json())
      const famsList = Array.isArray(fams)?fams:[]
      // Aplanar todas las especies de todas las familias
      const especiesList = famsList.flatMap((fam:any)=>
        (fam.e||[]).map((e:any)=>({...e,familia:fam.id,_id:fam.id+'_'+e.n}))
      )
      setEspecies(especiesList)
      setFamilias(famsList.map((f:any)=>({_id:f.id,nombre:f.nm||f.id,orden:f.orden||'Lepidoptera Diurnae',activo:true})))
      setOrdenes([])
    }catch(e){mostrar('❌ Error cargando')}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),4000)}

  const famList=['Todas',...Array.from(new Set(especies.map(e=>e.familia))).sort()]
  const ordenList=['Todas',...(ordenes.length>0?ordenes.map(o=>o.nombre):ORDENES_DEFAULT)]
  
  const filtrados=especies.filter(e=>{
    const enBusq=e.n.toLowerCase().includes(busq.toLowerCase())||e.familia.toLowerCase().includes(busq.toLowerCase())
    const enFam=famSel==='Todas'||e.familia===famSel
    const enOrden=ordenSel==='Todas'||e.ordenCategoria===ordenSel
    return enBusq&&enFam&&enOrden
  })
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)
  const sinPrecio=especies.filter(e=>e.p===0).length

  const guardar=async()=>{
    if(!espEdit.n||!espEdit.familia){mostrar('❌ Nombre y familia obligatorios');return}
    setGuardando(true)
    const action=espEdit._id?'updateEspecie':'addEspecie'
    const data={
      n:espEdit.n,
      nOriginal:espEdit.n,
      p:espEdit.p||0,
      s:espEdit.s||0,
      foto:espEdit.foto||'',
      fotoLado:espEdit.fotoLado||'',
      fotoReverso:espEdit.fotoReverso||'',
      video:espEdit.video||'',
      familia:espEdit.familia,
      calidad:espEdit.calidad||'A1',
      sexo:espEdit.sexo||'M or F',
      tamano:espEdit.tamano||'',
      activo:espEdit.activo!==false,
      descripcion:espEdit.descripcion||'',
      metaTitulo:(espEdit as any).metaTitulo||'',
      metaDescripcion:(espEdit as any).metaDescripcion||'',
      descripcionEN:(espEdit as any).descripcionEN||'',
      descripcionZH:(espEdit as any).descripcionZH||'',
    }
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Guardado');setVista('lista');cargarTodo()}
    else mostrar('❌ '+res.error)
    setGuardando(false)
  }

  const duplicar=async(esp:Especie)=>{
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'create',data:{
      nombre:esp.n+' (copia)',
      familia:esp.familia,
      subfamilia:esp.subfamilia||'',
      ordenCategoria:esp.ordenCategoria||'Lepidoptera Diurnae',
      precio:esp.p,
      stock:esp.s,
      calidad:esp.calidad||'A1',
      sexo:esp.sexo||'M or F',
      activo:false,
    }})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Duplicado — edita la copia');cargarTodo()}
    else mostrar('❌ '+res.error)
  }

  const eliminar=async(id:string,n:string)=>{
    if(!confirm(`¿Eliminar "${n}"?`))return
    await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})
    mostrar('🗑️ Eliminado');cargarTodo()
  }

  const eliminarSeleccionados=async()=>{
    if(!seleccionados.length||!confirm(`¿Eliminar ${seleccionados.length} especies?`))return
    await Promise.all(seleccionados.map(id=>fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})))
    setSeleccionados([]);mostrar(`🗑️ ${seleccionados.length} eliminados`);cargarTodo()
  }

  const moverFamilia=async(ids:string[],nuevaFamilia:string,nuevaOrden:string)=>{
    await Promise.all(ids.map(id=>fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'updateEspecie',data:{_id:id,familia:nuevaFamilia,ordenCategoria:nuevaOrden,precio:0,stock:0,activo:true}})})))
    setSeleccionados([]);mostrar(`✅ ${ids.length} movidas a ${nuevaFamilia}`);cargarTodo()
  }

  const toggleSel=(id:string)=>setSeleccionados(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const toggleTodos=()=>setSeleccionados(p=>p.length===pagActual.length?[]:pagActual.map(e=>e._id))

  const [moverAFam,setMoverAFam]=useState('')
  const [moverAOrden,setMoverAOrden]=useState('')

  return(
    <div style={s.page}>
      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={{padding:'12px 10px',borderBottom:`1px solid ${BD}`}}>
          <a href="/admin-panel" style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',textDecoration:'none',display:'block',marginBottom:6}}>← Admin Panel</a>
          <div style={{color:G,fontSize:'.75rem',fontWeight:700}}>🦋 PANEL</div>
        </div>
        {MODULOS.map(m=>(
          <a key={m.p} href={m.p} style={{display:'block',padding:'9px 12px',color:m.p==='/admin-panel/especimenes'?'#E8C97A':'rgba(201,168,76,0.5)',textDecoration:'none',fontSize:'.72rem',fontFamily:'Georgia,serif',borderLeft:m.p==='/admin-panel/especimenes'?`3px solid ${G}`:'3px solid transparent',background:m.p==='/admin-panel/especimenes'?'rgba(201,168,76,0.08)':'transparent'}}>{m.l}</a>
        ))}
      </aside>

      {/* MAIN */}
      <main style={s.main}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>🦋 Gestor de Especímenes</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{especies.length} especies · {sinPrecio>0&&<span style={{color:'#ff9966'}}>{sinPrecio} sin precio · </span>}{familias.length} familias · {ordenes.length} órdenes</p>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginRight:280}}>
            <button onClick={cargarTodo} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄</button>
            <button onClick={()=>{setEspEdit({activo:true,calidad:'A1',sexo:'M or F',ordenCategoria:'Lepidoptera Diurnae',partidaArancelaria:'9705.00.00'});setTab('general');setVista('editar')}} style={btn(G,CARD)}>+ Nueva especie</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:12,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {vista==='lista'&&(
          <>
            {/* Filtros */}
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:12,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
              <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar especie o familia..." style={{...s.inp,width:220,flex:'none'}}/>
              <select value={ordenSel} onChange={e=>{setOrdenSel(e.target.value);setPag(1)}} style={{...s.inp,width:160,flex:'none'}}>
                {ordenList.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
              <select value={famSel} onChange={e=>{setFamSel(e.target.value);setPag(1)}} style={{...s.inp,width:140,flex:'none'}}>
                {famList.map(f=><option key={f} value={f}>{f}{f!=='Todas'?` (${especies.filter(e=>e.familia===f).length})`:''}</option>)}
              </select>
              <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>{filtrados.length} resultados</span>
            </div>

            {/* Acciones masivas */}
            {seleccionados.length>0&&(
              <div style={{background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:12,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
                <span style={{color:G,fontSize:'.75rem',fontWeight:700}}>{seleccionados.length} seleccionadas</span>
                <select value={moverAOrden} onChange={e=>setMoverAOrden(e.target.value)} style={{...s.inp,width:160,flex:'none'}}>
                  <option value="">Mover a orden...</option>
                  {(ordenes.length>0?ordenes.map(o=>o.nombre):ORDENES_DEFAULT).map(o=><option key={o} value={o}>{o}</option>)}
                </select>
                <select value={moverAFam} onChange={e=>setMoverAFam(e.target.value)} style={{...s.inp,width:140,flex:'none'}}>
                  <option value="">Mover a familia...</option>
                  {famList.filter(f=>f!=='Todas').map(f=><option key={f} value={f}>{f}</option>)}
                </select>
                <button onClick={()=>{if(moverAFam&&moverAOrden)moverFamilia(seleccionados,moverAFam,moverAOrden)}} disabled={!moverAFam||!moverAOrden} style={btn('rgba(100,149,237,0.2)','#64A5ED',{border:'1px solid rgba(100,149,237,0.4)',opacity:(!moverAFam||!moverAOrden)?0.4:1})}>📦 Mover</button>
                <button onClick={eliminarSeleccionados} style={btn('rgba(255,80,80,0.2)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)'})}>🗑️ Eliminar {seleccionados.length}</button>
                <button onClick={()=>setSeleccionados([])} style={btn('transparent',G,{border:`1px solid ${BD}`})}>✕ Cancelar</button>
              </div>
            )}

            {/* Tabla */}
            {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
              <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:12}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.05)'}}>
                      <th style={{...s.th,width:32}}><input type="checkbox" onChange={toggleTodos} checked={seleccionados.length===pagActual.length&&pagActual.length>0}/></th>
                      <th style={s.th}>FOTO</th>
                      <th style={s.th}>NOMBRE CIENTÍFICO</th>
                      <th style={s.th}>ORDEN</th>
                      <th style={s.th}>FAMILIA</th>
                      <th style={s.th}>PRECIO</th>
                      <th style={s.th}>MAYORISTA</th>
                      <th style={s.th}>STOCK</th>
                      <th style={s.th}>CALIDAD</th>
                      <th style={s.th}>TALLA</th>
                      <th style={s.th}>ESTADO</th>
                      <th style={s.th}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagActual.map((esp,idx)=>(
                      <tr key={esp._id}
                        draggable
                        onDragStart={()=>setDragIdx(idx)}
                        onDragOver={e=>e.preventDefault()}
                        onDrop={()=>{
                          if(dragIdx===null)return
                          const arr=[...filtrados]
                          const [moved]=arr.splice((pag-1)*POR_PAG+dragIdx,1)
                          arr.splice((pag-1)*POR_PAG+idx,0,moved)
                          setEspecies(arr)
                          setDragIdx(null)
                        }}
                        style={{background:seleccionados.includes(esp._id)?'rgba(201,168,76,0.06)':'transparent',cursor:'grab'}}>
                        <td style={s.td}><input type="checkbox" checked={seleccionados.includes(esp._id)} onChange={()=>toggleSel(esp._id)}/></td>
                        <td style={s.td}>{esp.foto?<img src={esp.foto} style={{width:48,height:36,objectFit:'cover',borderRadius:3,border:`1px solid ${BD}`}}/>:<div style={{width:48,height:36,background:'rgba(201,168,76,0.05)',borderRadius:3,border:`1px solid ${BD}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.55rem',color:'rgba(201,168,76,0.3)'}}>—</div>}</td>
                        <td style={{...s.td,fontStyle:'italic',maxWidth:180}}>{esp.n}</td>
                        <td style={{...s.td,fontSize:'.65rem',color:'rgba(201,168,76,0.5)'}}>{esp.ordenCategoria||'—'}</td>
                        <td style={{...s.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{esp.familia}</td>
                        <td style={{...s.td,color:esp.p>0?G:'#ff9966',fontWeight:700}}>${(esp.p||0).toFixed(2)}</td>
                        <td style={{...s.td,color:'rgba(201,168,76,0.5)',fontSize:'.7rem'}}>{esp.precioMayorista?`$${esp.precioMayorista}`:'—'}</td>
                        <td style={{...s.td,color:esp.s>0?'#5DBB63':'#ff5050'}}>{esp.s||0}</td>
                        <td style={{...s.td,fontSize:'.65rem'}}>{esp.calidad||'A1'}</td>
                        <td style={{...s.td,fontSize:'.62rem',color:'rgba(201,168,76,0.5)'}}>{esp.tamano||'—'}</td>
                        <td style={s.td}><span style={{background:esp.activo!==false?'rgba(93,187,99,0.2)':'rgba(255,80,80,0.2)',color:esp.activo!==false?'#5DBB63':'#ff5050',padding:'3px 7px',borderRadius:10,fontSize:'.6rem',fontWeight:700}}>{esp.activo!==false?'ACTIVO':'INACTIVO'}</span></td>
                        <td style={s.td}>
                          <div style={{display:'flex',gap:3}}>
                            <button onClick={()=>{setEspEdit({...esp});setTab('general');setVista('editar')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.62rem'})}>✏️</button>
                            <button onClick={()=>duplicar(esp)} style={btn('rgba(100,149,237,0.15)','#64A5ED',{border:'1px solid rgba(100,149,237,0.3)',padding:'4px 8px',fontSize:'.62rem'})}>⧉</button>
                            <button onClick={()=>eliminar(esp._id,esp.n)} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 7px',fontSize:'.62rem'})}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pagActual.length===0&&<tr><td colSpan={12} style={{...s.td,textAlign:'center',color:'rgba(201,168,76,0.3)',padding:32}}>No hay especies</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {/* Paginación */}
            {totalPag>1&&(
              <div style={{display:'flex',gap:6,alignItems:'center',justifyContent:'center'}}>
                <button onClick={()=>setPag(1)} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1,padding:'5px 8px'})}>««</button>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1})}>← Ant</button>
                {Array.from({length:Math.min(5,totalPag)},(_,i)=>{
                  const p=totalPag<=5?i+1:pag<=3?i+1:pag>=totalPag-2?totalPag-4+i:pag-2+i
                  return <button key={p} onClick={()=>setPag(p)} style={btn(pag===p?G:'rgba(201,168,76,0.08)',pag===p?CARD:G,{border:`1px solid ${pag===p?G:BD}`,padding:'5px 10px',minWidth:32})}>{p}</button>
                })}
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1})}>Sig →</button>
                <button onClick={()=>setPag(totalPag)} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1,padding:'5px 8px'})}>»»</button>
                <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>Pág {pag}/{totalPag} · {filtrados.length} total</span>
              </div>
            )}
          </>
        )}

        {/* FORMULARIO EDITAR / NUEVO */}
        {vista==='editar'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:900}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{espEdit._id?`✏️ ${espEdit.n}`:'+ Nueva Especie'}</h2>
              <div style={{display:'flex',gap:8}}>
                {espEdit._id&&<button onClick={()=>duplicar(espEdit as Especie)} style={btn('rgba(100,149,237,0.15)','#64A5ED',{border:'1px solid rgba(100,149,237,0.3)'})}>⧉ Duplicar</button>}
                <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
              </div>
            </div>

            {/* Pestañas */}
            <div style={{display:'flex',gap:4,marginBottom:16,borderBottom:`1px solid ${BD}`,paddingBottom:8}}>
              {([['general','📋 General'],['precios','💰 Precios & Stock'],['fotos','🖼️ Fotos & Video'],['seo','🔍 SEO']] as const).map(([t,l])=>(
                <button key={t} onClick={()=>setTab(t)} style={btn(tab===t?G:'transparent',tab===t?CARD:G,{border:`1px solid ${tab===t?G:BD}`,padding:'5px 12px',fontSize:'.72rem'})}>
                  {l}
                </button>
              ))}
            </div>

            {/* TAB GENERAL */}
            {tab==='general'&&(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <div>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE CIENTÍFICO *</label>
                  <input value={espEdit.n||''} onChange={e=>setEspEdit(p=>({...p,n:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="Morpho didius"/>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ORDEN / CATEGORÍA *</label>
                  <select value={espEdit.ordenCategoria||'Lepidoptera Diurnae'} onChange={e=>setEspEdit(p=>({...p,ordenCategoria:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    {(ordenes.length>0?ordenes.map(o=>o.nombre):ORDENES_DEFAULT).map(o=><option key={o} value={o}>{o}</option>)}
                  </select>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FAMILIA *</label>
                  <input value={espEdit.familia||''} onChange={e=>setEspEdit(p=>({...p,familia:e.target.value}))} style={{...s.inp,marginBottom:4}} list="fam-list" placeholder="Morphidae"/>
                  <datalist id="fam-list">{famList.filter(f=>f!=='Todas').map(f=><option key={f} value={f}/>)}</datalist>
                  <div style={{display:'flex',flexWrap:'wrap',gap:3,marginBottom:10}}>
                    {famList.filter(f=>f!=='Todas').slice(0,8).map(f=>(
                      <button key={f} onClick={()=>setEspEdit(p=>({...p,familia:f}))} style={btn(espEdit.familia===f?G:'rgba(201,168,76,0.06)',espEdit.familia===f?CARD:G,{border:`1px solid ${espEdit.familia===f?G:BD}`,padding:'3px 7px',fontSize:'.58rem'})}>
                        {f}
                      </button>
                    ))}
                  </div>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>SUBFAMILIA</label>
                  <input value={espEdit.subfamilia||''} onChange={e=>setEspEdit(p=>({...p,subfamilia:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="Opcional"/>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>CALIDAD</label>
                  <div style={{display:'flex',gap:4,marginBottom:10}}>
                    {CALIDADES.map(c=><button key={c} onClick={()=>setEspEdit(p=>({...p,calidad:c}))} style={btn(espEdit.calidad===c?G:'rgba(201,168,76,0.06)',espEdit.calidad===c?CARD:G,{border:`1px solid ${espEdit.calidad===c?G:BD}`,padding:'4px 10px',fontSize:'.7rem'})}>{c}</button>)}
                  </div>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>SEXO</label>
                  <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:10}}>
                    {SEXOS.map(sx=><button key={sx} onClick={()=>setEspEdit(p=>({...p,sexo:sx}))} style={btn(espEdit.sexo===sx?G:'rgba(201,168,76,0.06)',espEdit.sexo===sx?CARD:G,{border:`1px solid ${espEdit.sexo===sx?G:BD}`,padding:'4px 10px',fontSize:'.7rem'})}>{sx}</button>)}
                  </div>
                </div>
                <div>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>TALLA</label>
                  <div style={{display:'flex',gap:4,flexWrap:'wrap',marginBottom:10}}>
                    {TALLAS.map(t=><button key={t} onClick={()=>setEspEdit(p=>({...p,tamano:t}))} style={btn(espEdit.tamano===t?G:'rgba(201,168,76,0.06)',espEdit.tamano===t?CARD:G,{border:`1px solid ${espEdit.tamano===t?G:BD}`,padding:'4px 8px',fontSize:'.62rem'})}>{t.split(' ')[0]}</button>)}
                  </div>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>TIPO DE MONTAJE</label>
                  <select value={espEdit.montaje||''} onChange={e=>setEspEdit(p=>({...p,montaje:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    <option value="">-- Selecciona --</option>
                    {MONTAJES.map(m=><option key={m} value={m}>{m}</option>)}
                  </select>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>LOCALIDAD</label>
                  <input value={(espEdit as any).localidad||'Tingo Maria, Huanuco, Peru'} onChange={e=>setEspEdit(p=>({...p,localidad:e.target.value}))} style={{...s.inp,marginBottom:10}}/>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>SKU / CÓDIGO QR</label>
                  <input value={espEdit.codigoQR||''} onChange={e=>setEspEdit(p=>({...p,codigoQR:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="HIP-BRAS-001"/>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>PARTIDA ARANCELARIA</label>
                  <input value={espEdit.partidaArancelaria||'9705.00.00'} onChange={e=>setEspEdit(p=>({...p,partidaArancelaria:e.target.value}))} style={{...s.inp,marginBottom:10}}/>

                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>DESCRIPCIÓN</label>
                  <textarea value={espEdit.descripcion||''} onChange={e=>setEspEdit(p=>({...p,descripcion:e.target.value}))} style={{...s.inp,height:70,resize:'vertical' as const,marginBottom:10}}/>

                  <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                    <input type="checkbox" checked={espEdit.activo!==false} onChange={e=>setEspEdit(p=>({...p,activo:e.target.checked}))}/>
                    <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.75rem'}}>Activo en catálogo web</span>
                  </label>
                </div>
              </div>
            )}

            {/* TAB PRECIOS */}
            {tab==='precios'&&(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <div>
                  {[{l:'PRECIO USD *',k:'p',ph:'0.00'},{l:'PRECIO MAYORISTA (10-49)',k:'precioMayorista',ph:'0.00'},{l:'PRECIO VIP (100+)',k:'precioVIP',ph:'0.00'}].map(f=>(
                    <div key={f.k} style={{marginBottom:12}}>
                      <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.l}</label>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <button onClick={()=>setEspEdit(p=>({...p,[f.k]:Math.max(0,((p as any)[f.k]||0)-0.5)}))} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'6px 12px',fontSize:'1rem'})}>−</button>
                        <input type="number" value={(espEdit as any)[f.k]||''} onChange={e=>setEspEdit(p=>({...p,[f.k]:parseFloat(e.target.value)||0}))} style={{...s.inp,width:100,textAlign:'center'}} placeholder={f.ph}/>
                        <button onClick={()=>setEspEdit(p=>({...p,[f.k]:((p as any)[f.k]||0)+0.5}))} style={btn('rgba(93,187,99,0.15)','#5DBB63',{border:'1px solid rgba(93,187,99,0.3)',padding:'6px 12px',fontSize:'1rem'})}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  {[{l:'STOCK',k:'s'},{l:'STOCK MÍNIMO ALERTA',k:'stockMinimo'},{l:'PESO GRAMOS',k:'pesoGramos'}].map(f=>(
                    <div key={f.k} style={{marginBottom:12}}>
                      <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.l}</label>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <button onClick={()=>setEspEdit(p=>({...p,[f.k]:Math.max(0,((p as any)[f.k]||0)-1)}))} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'6px 12px',fontSize:'1rem'})}>−</button>
                        <input type="number" value={(espEdit as any)[f.k]||''} onChange={e=>setEspEdit(p=>({...p,[f.k]:parseInt(e.target.value)||0}))} style={{...s.inp,width:100,textAlign:'center'}}/>
                        <button onClick={()=>setEspEdit(p=>({...p,[f.k]:((p as any)[f.k]||0)+1}))} style={btn('rgba(93,187,99,0.15)','#5DBB63',{border:'1px solid rgba(93,187,99,0.3)',padding:'6px 12px',fontSize:'1rem'})}>+</button>
                      </div>
                    </div>
                  ))}
                  <div style={{marginTop:16,padding:12,background:'rgba(201,168,76,0.05)',borderRadius:6}}>
                    <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',marginBottom:4}}>RESUMEN DE PRECIOS</div>
                    <div style={{fontSize:'.8rem',color:G}}>Minorista: <strong>${espEdit.p||0}</strong></div>
                    <div style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)'}}>Mayorista: ${espEdit.precioMayorista||0} · VIP: ${espEdit.precioVIP||0}</div>
                    <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:4}}>Drawback 3%: ${((espEdit.p||0)*0.03).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB FOTOS */}
            {tab==='fotos'&&(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {[{l:'FOTO FRENTE',k:'foto'},{l:'FOTO LADO',k:'fotoLado'},{l:'FOTO REVERSO',k:'fotoReverso'}].map(f=>(
                  <div key={f.k}>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.l} (URL Bunny.net)</label>
                    <input value={(espEdit as any)[f.k]||''} onChange={e=>setEspEdit(p=>({...p,[f.k]:e.target.value}))} style={{...s.inp,marginBottom:6}} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                    {(espEdit as any)[f.k]&&(
                      <div style={{position:'relative',display:'inline-block'}}>
                        <img src={(espEdit as any)[f.k]} style={{width:'100%',maxHeight:150,objectFit:'contain',border:`1px solid ${BD}`,borderRadius:4,background:'#050501'}} onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
                        <button onClick={()=>setEspEdit(p=>({...p,[f.k]:''}))} style={{position:'absolute',top:4,right:4,...btn('rgba(255,80,80,0.8)','white',{padding:'2px 6px',fontSize:'.6rem'})}}>✕</button>
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>VIDEO URL</label>
                  <input value={espEdit.video||''} onChange={e=>setEspEdit(p=>({...p,video:e.target.value}))} style={{...s.inp,marginBottom:6}} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                  {espEdit.video&&<video src={espEdit.video} controls style={{width:'100%',maxHeight:150,border:`1px solid ${BD}`,borderRadius:4}}/>}
                  <div style={{marginTop:10,padding:10,background:'rgba(201,168,76,0.04)',borderRadius:6}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:6}}>📤 Subir foto directamente:</p>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {(['foto','fotoLado','fotoReverso','video'] as const).map(tipo=>{
                        const subirFoto=async(file:File)=>{
                          if(!file||!espEdit.familia||!espEdit.n)return
                          mostrar('⏳ Subiendo '+tipo+'...')
                          const fd=new FormData()
                          fd.append('file',file)
                          fd.append('familia',espEdit.familia||'')
                          fd.append('especie',espEdit.n||'')
                          fd.append('tipo',tipo)
                          fd.append('destino','bunny')
                          const r=await fetch('/api/upload',{method:'POST',body:fd})
                          const res=await r.json()
                          if(res.ok){setEspEdit((p:any)=>({...p,[tipo]:res.url}));mostrar('✅ '+tipo+' subido')}
                          else mostrar('❌ '+res.error)
                        }
                        return(
                          <label key={tipo} style={{cursor:'pointer'}} onClick={e=>{
                            const inp=document.createElement('input')
                            inp.type='file'
                            inp.accept='image/*,video/*'
                            inp.onchange=async(ev:any)=>{
                              const file=ev.target.files?.[0]
                              if(file) await subirFoto(file)
                            }
                            inp.click()
                          }}>
                            <span style={{background:'rgba(201,168,76,0.1)',color:G,border:`1px solid ${BD}`,padding:'4px 10px',borderRadius:4,fontSize:'.65rem',cursor:'pointer'}}>
                              📸 {tipo==='foto'?'Frente':tipo==='fotoLado'?'Lado':tipo==='fotoReverso'?'Reverso':'Video'}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB SEO */}
            {tab==='seo'&&(
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                <div>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>META TÍTULO</label>
                  <input value={(espEdit as any).metaTitulo||''} onChange={e=>setEspEdit(p=>({...p,metaTitulo:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="Morpho didius — Mariposa A1 Peru Export"/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>META DESCRIPCIÓN</label>
                  <textarea value={(espEdit as any).metaDescripcion||''} onChange={e=>setEspEdit(p=>({...p,metaDescripcion:e.target.value}))} style={{...s.inp,height:80,resize:'vertical' as const,marginBottom:10}}/>
                </div>
                <div>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>DESCRIPCIÓN EN INGLÉS</label>
                  <textarea value={(espEdit as any).descripcionEN||''} onChange={e=>setEspEdit(p=>({...p,descripcionEN:e.target.value}))} style={{...s.inp,height:80,resize:'vertical' as const,marginBottom:10}}/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>描述 CHINO</label>
                  <textarea value={(espEdit as any).descripcionZH||''} onChange={e=>setEspEdit(p=>({...p,descripcionZH:e.target.value}))} style={{...s.inp,height:80,resize:'vertical' as const}}/>
                </div>
              </div>
            )}

            <div style={{marginTop:20,display:'flex',gap:10,borderTop:`1px solid ${BD}`,paddingTop:16}}>
              <button onClick={guardar} disabled={guardando} style={btn(G,CARD,{padding:'10px 28px',fontSize:'.85rem',opacity:guardando?0.7:1})}>{guardando?'Guardando...':'💾 Guardar'}</button>
              {espEdit._id&&<button onClick={()=>eliminar(espEdit._id!,espEdit.n||'')} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'10px 20px'})}>🗑️ Eliminar</button>}
              <button onClick={()=>setVista('lista')} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'10px 20px'})}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
