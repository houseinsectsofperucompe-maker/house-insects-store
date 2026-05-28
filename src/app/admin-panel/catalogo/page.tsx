'use client'
import { useState, useEffect } from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const inp={background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const}
const th={color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400}
const td={padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const}
const btn=(bg:string,c:string,ex?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...ex})

type Tab='ordenes'|'categorias'|'familias'|'especies'|'atributos'

export default function CatalogoPage(){
  const [tab,setTab]=useState<Tab>('ordenes')
  const [ordenes,setOrdenes]=useState<any[]>([])
  const [categorias,setCategorias]=useState<any[]>([])
  const [familias,setFamilias]=useState<any[]>([])
  const [especies,setEspecies]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [msg,setMsg]=useState('')
  const [busq,setBusq]=useState('')
  const [selOrden,setSelOrden]=useState('Todas')
  const [selFamilia,setSelFamilia]=useState('Todas')
  const [famDetalle,setFamDetalle]=useState<any>(null)
  const [vista,setVista]=useState<'lista'|'nuevo'>('lista')
  const [edit,setEdit]=useState<any>({})
  const [guardando,setGuardando]=useState(false)
  const [pag,setPag]=useState(1)
  const POR_PAG=30

  useEffect(()=>{cargarTodo()},[])

  const cargarTodo=async()=>{
    setLoading(true)
    try{
      const [o,rb,f]=await Promise.all([
        fetch('/api/datos?tipo=ordenes').then(r=>r.json()),
        fetch('/api/datos?tipo=rubros').then(r=>r.json()),
        fetch('/api/datos').then(r=>r.json()),
      ])
      setOrdenes(Array.isArray(o)?o:[])
      setCategorias(Array.isArray(rb)?rb:[])
      setFamilias(Array.isArray(f)?f:[])
      const esp=Array.isArray(f)?f.flatMap((fm:any)=>(fm.e||[]).map((e:any)=>({...e,familia:fm.id,familianm:fm.nm||fm.id,orden:fm.orden}))):[]
      setEspecies(esp)
    }catch(e){}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const famsPorOrden=(o:string)=>familias.filter(f=>o==='Todas'||f.orden===o)
  const espPorOrden=(o:string)=>familias.filter(f=>o==='Todas'||f.orden===o).reduce((a:number,f:any)=>a+(f.e?.length||0),0)

  const guardar=async()=>{
    setGuardando(true)
    try{
      let action='',data:any={}
      if(tab==='familias'){
        action=edit._id?'updateFamilia':'addFamilia'
        data={id:edit.id||edit.nm,nm:edit.nm,orden:edit.orden||'Lepidoptera Diurnae',idOriginal:edit._id}
      } else if(tab==='especies'){
        action=edit._id?'updateEspecie':'addEspecie'
        data={n:edit.n,nOriginal:edit.nOriginal||edit.n,p:edit.p||0,s:edit.s||0,foto:edit.foto||'',familia:edit.familia}
      }
      if(!action){mostrar('✅ Demo');setVista('lista');setGuardando(false);return}
      const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
      const res=await r.json()
      if(res.ok){mostrar('✅ Guardado');setVista('lista');cargarTodo()}
      else mostrar('❌ '+res.error)
    }catch(e:any){mostrar('❌ '+e.message)}
    setGuardando(false)
  }

  const eliminar=async(it:any)=>{
    if(!confirm(`¿Eliminar "${it.nm||it.nombre||it.n}"?`))return
    let action='',data:any={}
    if(tab==='familias'){action='deleteFamilia';data={id:it.id}}
    else if(tab==='especies'){action='deleteEspecie';data={n:it.n,familia:it.familia}}
    if(!action){mostrar('Demo — no implementado');return}
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
    const res=await r.json()
    if(res.ok){mostrar('🗑️ Eliminado');cargarTodo()}
  }

  // Datos según tab
  const items=tab==='ordenes'?ordenes:tab==='categorias'?categorias:tab==='familias'?familias.filter(f=>selOrden==='Todas'||f.orden===selOrden):tab==='especies'?especies.filter(e=>(selOrden==='Todas'||e.orden===selOrden)&&(selFamilia==='Todas'||e.familia===selFamilia)):[]
  const filtrados=items.filter(it=>(it.nm||it.nombre||it.n||'').toLowerCase().includes(busq.toLowerCase()))
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)

  return(
    <div style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A',padding:24}}>
      {/* Header */}
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8,paddingRight:320}}>
        <div>
          <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>📦 Catálogo — Estructura</h1>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{familias.length} familias · {especies.length} especies · {categorias.length} rubros</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
          <button onClick={cargarTodo} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄</button>
          <button onClick={()=>{setEdit({activo:true});setVista('nuevo')}} style={btn(G,CARD)}>+ Nuevo</button>
        </div>
      </div>

      {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:12,color:G,fontSize:'.8rem'}}>{msg}</div>}

      {/* Resumen órdenes */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
        {ordenes.map((o:any)=>(
          <div key={o.id} onClick={()=>{setSelOrden(o.nombre||o.id);setTab('familias');setBusq('');setPag(1)}}
            style={{background:CARD,border:`1px solid ${selOrden===(o.nombre||o.id)?G:BD}`,borderRadius:8,padding:'10px 12px',cursor:'pointer'}}>
            <div style={{color:G,fontSize:'.75rem',fontWeight:700}}>{o.icono} {o.nombre}</div>
            <div style={{display:'flex',gap:12,marginTop:4}}>
              <div><span style={{color:'#64A5ED',fontWeight:700}}>{famsPorOrden(o.nombre||o.id).length}</span><div style={{color:'rgba(201,168,76,0.4)',fontSize:'.55rem'}}>familias</div></div>
              <div><span style={{color:'#5DBB63',fontWeight:700}}>{espPorOrden(o.nombre||o.id)}</span><div style={{color:'rgba(201,168,76,0.4)',fontSize:'.55rem'}}>especies</div></div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,marginBottom:12,borderBottom:`1px solid ${BD}`,paddingBottom:8,flexWrap:'wrap'}}>
        {([['ordenes','📋 Órdenes'],['categorias','🗂️ Categorías (17 rubros)'],['familias','📁 Familias'],['especies','🦋 Especies'],['atributos','🎨 Atributos']] as const).map(([k,l])=>(
          <button key={k} onClick={()=>{setTab(k);setVista('lista');setBusq('');setPag(1)}}
            style={btn(tab===k?G:'transparent',tab===k?CARD:'rgba(201,168,76,0.5)',{border:`1px solid ${tab===k?G:BD}`,padding:'5px 12px',fontSize:'.7rem'})}>
            {l} {tab===k?`(${items.length})`:''}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:12,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
        <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar..." style={{...inp,width:200,flex:'none'}}/>
        {(tab==='familias'||tab==='especies')&&(
          <select value={selOrden} onChange={e=>{setSelOrden(e.target.value);setSelFamilia('Todas');setPag(1)}} style={{...inp,width:200,flex:'none'}}>
            <option value="Todas">🌍 Todas las órdenes</option>
            {ordenes.map((o:any)=><option key={o.id} value={o.nombre||o.id}>{o.icono} {o.nombre}</option>)}
          </select>
        )}
        {tab==='especies'&&(
          <select value={selFamilia} onChange={e=>{setSelFamilia(e.target.value);setPag(1)}} style={{...inp,width:180,flex:'none'}}>
            <option value="Todas">📁 Todas las familias</option>
            {famsPorOrden(selOrden).map((f:any)=><option key={f.id} value={f.id}>{f.nm||f.id} ({f.e?.length||0})</option>)}
          </select>
        )}
        <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginLeft:'auto'}}>{filtrados.length} resultados</span>
      </div>

      {vista==='lista'&&(
        <>
          {/* Detalle familia al click */}
          {tab==='familias'&&famDetalle&&(
            <div style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${G}`,borderRadius:8,padding:14,marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <h3 style={{color:G,fontSize:'.85rem',margin:0}}>🦋 {famDetalle.nm||famDetalle.id} — {famDetalle.e?.length||0} especies</h3>
                <button onClick={()=>setFamDetalle(null)} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'3px 8px',fontSize:'.6rem'})}>✕</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:4}}>
                {(famDetalle.e||[]).map((e:any,i:number)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,borderRadius:4,padding:'5px 10px'}}>
                    <span style={{color:'#E8C97A',fontSize:'.7rem',fontStyle:'italic'}}>{e.n}</span>
                    <div style={{display:'flex',gap:8}}>
                      <span style={{color:G,fontSize:'.7rem',fontWeight:700}}>${e.p}</span>
                      <span style={{color:e.s>0?'#5DBB63':'#ff5050',fontSize:'.65rem'}}>S:{e.s}</span>
                    </div>
                  </div>
                ))}
                {(famDetalle.e||[]).length===0&&<p style={{color:'rgba(201,168,76,0.3)',fontSize:'.7rem'}}>Sin especies — agrega desde la pestaña Especies</p>}
              </div>
            </div>
          )}

          {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:12}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'rgba(201,168,76,0.05)'}}>
                    <th style={th}>NOMBRE</th>
                    {tab==='ordenes'&&<><th style={th}>ICONO</th><th style={th}>FAMILIAS</th><th style={th}>ESPECIES</th></>}
                    {tab==='categorias'&&<><th style={th}>ID</th><th style={th}>ACTIVO</th></>}
                    {tab==='familias'&&<><th style={th}>ORDEN</th><th style={th}>ESPECIES 🔍</th></>}
                    {tab==='especies'&&<><th style={th}>FAMILIA</th><th style={th}>ORDEN</th><th style={th}>PRECIO</th><th style={th}>STOCK</th></>}
                    <th style={th}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {pagActual.map((it:any,idx:number)=>(
                    <tr key={it.id||it._id||it.n||idx} style={{cursor:'pointer'}} onClick={tab==='familias'?()=>setFamDetalle(it):undefined}>
                      <td style={{...td,fontStyle:'italic',fontWeight:600}}>{it.nombre||it.nm||it.n||'—'}</td>
                      {tab==='ordenes'&&<>
                        <td style={td}>{it.icono||'—'}</td>
                        <td style={{...td,color:'#64A5ED',fontWeight:700}}>{famsPorOrden(it.nombre||it.id).length}</td>
                        <td style={{...td,color:'#5DBB63',fontWeight:700}}>{espPorOrden(it.nombre||it.id)}</td>
                      </>}
                      {tab==='categorias'&&<>
                        <td style={{...td,fontSize:'.7rem',color:'rgba(201,168,76,0.5)'}}>{it.id}</td>
                        <td style={td}><span style={{color:it.activo?'#5DBB63':'#ff5050',fontSize:'.65rem'}}>{it.activo?'✅':'❌'}</span></td>
                      </>}
                      {tab==='familias'&&<>
                        <td style={{...td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.orden||'—'}</td>
                        <td style={{...td,color:'#5DBB63',fontWeight:700}}>{it.e?.length||0} 🔍</td>
                      </>}
                      {tab==='especies'&&<>
                        <td style={{...td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.familianm||it.familia||'—'}</td>
                        <td style={{...td,fontSize:'.62rem',color:'rgba(201,168,76,0.4)'}}>{it.orden||'—'}</td>
                        <td style={{...td,color:G,fontWeight:700}}>${(it.p||0).toFixed(2)}</td>
                        <td style={{...td,color:(it.s||0)>0?'#5DBB63':'#ff5050'}}>{it.s||0}</td>
                      </>}
                      <td style={td} onClick={e=>e.stopPropagation()}>
                        <div style={{display:'flex',gap:3}}>
                          <button onClick={()=>{setEdit({...it,nOriginal:it.n});setVista('nuevo')}}
                            style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.62rem'})}>✏️</button>
                          <button onClick={()=>eliminar(it)}
                            style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 7px',fontSize:'.62rem'})}>🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {pagActual.length===0&&<tr><td colSpan={7} style={{...td,textAlign:'center',padding:32,color:'rgba(201,168,76,0.3)'}}>No hay registros</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {totalPag>1&&(
            <div style={{display:'flex',gap:6,alignItems:'center',justifyContent:'center'}}>
              <button onClick={()=>setPag(1)} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1,padding:'5px 8px'})}>««</button>
              <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1})}>←</button>
              <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>Pág {pag}/{totalPag}</span>
              <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1})}>→</button>
              <button onClick={()=>setPag(totalPag)} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1,padding:'5px 8px'})}>»»</button>
            </div>
          )}
        </>
      )}

      {vista==='nuevo'&&(
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:700}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{edit.id||edit._id?'✏️ Editar':'+'} {tab}</h2>
            <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div>
              <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
              <input value={edit.nm||edit.nombre||edit.n||''} onChange={e=>setEdit((p:any)=>({...p,nm:e.target.value,nombre:e.target.value,n:e.target.value}))} style={{...inp,marginBottom:10}}/>
              {tab==='familias'&&<>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ORDEN</label>
                <select value={edit.orden||'Lepidoptera Diurnae'} onChange={e=>setEdit((p:any)=>({...p,orden:e.target.value}))} style={{...inp,marginBottom:10}}>
                  {ordenes.map((o:any)=><option key={o.id} value={o.nombre||o.id}>{o.icono} {o.nombre}</option>)}
                </select>
              </>}
              {tab==='especies'&&<>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FAMILIA *</label>
                <select value={edit.familia||''} onChange={e=>setEdit((p:any)=>({...p,familia:e.target.value}))} style={{...inp,marginBottom:10}}>
                  <option value="">-- Selecciona --</option>
                  {familias.map((f:any)=><option key={f.id} value={f.id}>{f.nm||f.id} ({f.e?.length||0})</option>)}
                </select>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                  <div>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>PRECIO USD</label>
                    <div style={{display:'flex',gap:4}}>
                      <button onClick={()=>setEdit((p:any)=>({...p,p:Math.max(0,(p.p||0)-0.5)}))} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'5px 10px'})}>−</button>
                      <input type="number" value={edit.p||0} onChange={e=>setEdit((p:any)=>({...p,p:parseFloat(e.target.value)||0}))} style={{...inp,textAlign:'center'}}/>
                      <button onClick={()=>setEdit((p:any)=>({...p,p:(p.p||0)+0.5}))} style={btn('rgba(93,187,99,0.15)','#5DBB63',{border:'1px solid rgba(93,187,99,0.3)',padding:'5px 10px'})}>+</button>
                    </div>
                  </div>
                  <div>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>STOCK</label>
                    <div style={{display:'flex',gap:4}}>
                      <button onClick={()=>setEdit((p:any)=>({...p,s:Math.max(0,(p.s||0)-1)}))} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'5px 10px'})}>−</button>
                      <input type="number" value={edit.s||0} onChange={e=>setEdit((p:any)=>({...p,s:parseInt(e.target.value)||0}))} style={{...inp,textAlign:'center'}}/>
                      <button onClick={()=>setEdit((p:any)=>({...p,s:(p.s||0)+1}))} style={btn('rgba(93,187,99,0.15)','#5DBB63',{border:'1px solid rgba(93,187,99,0.3)',padding:'5px 10px'})}>+</button>
                    </div>
                  </div>
                </div>
              </>}
              <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>DESCRIPCIÓN</label>
              <textarea value={edit.descripcion||''} onChange={e=>setEdit((p:any)=>({...p,descripcion:e.target.value}))} style={{...inp,height:60,resize:'vertical' as const}}/>
            </div>
            <div>
              {tab==='especies'&&<>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FOTO URL</label>
                <input value={edit.foto||''} onChange={e=>setEdit((p:any)=>({...p,foto:e.target.value}))} style={{...inp,marginBottom:6}}/>
                {edit.foto&&<img src={edit.foto} style={{width:'100%',height:100,objectFit:'contain',border:`1px solid ${BD}`,borderRadius:4,background:'#050501'}} onError={(e:any)=>e.target.style.display='none'}/>}
              </>}
              <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginTop:10}}>
                <input type="checkbox" checked={edit.activo!==false} onChange={e=>setEdit((p:any)=>({...p,activo:e.target.checked}))}/>
                <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.75rem'}}>Activo</span>
              </label>
            </div>
          </div>
          <div style={{marginTop:16,display:'flex',gap:10,borderTop:`1px solid ${BD}`,paddingTop:16}}>
            <button onClick={guardar} disabled={guardando} style={btn(G,CARD,{padding:'10px 28px',fontSize:'.85rem',opacity:guardando?0.7:1})}>{guardando?'Guardando...':'💾 Guardar'}</button>
            <button onClick={()=>setVista('lista')} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'10px 20px'})}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  )
}
