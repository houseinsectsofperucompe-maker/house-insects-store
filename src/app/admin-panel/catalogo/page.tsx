'use client'
import { useState, useEffect } from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const ss={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const RUBROS=['especimenes','diurnas','joyeria','rarezas','artesanias','herramientas','nocturnas','coleoptera','minerales','semillas','frutas','hongos','maderas','textileria','pinturas','esencias','superalimentos']
const ORDENES_LIST=['Lepidoptera Diurnae','Moths Nocturnas','Coleoptera','Arthropoda']
const TALLAS=['S (3-5 cm)','M (5-8 cm)','L (8-12 cm)','XL (12-15 cm)','XXL (15-20 cm)','XXXL (20+ cm)']

type TabType='ordenes'|'subordendes'|'categorias'|'subcategorias'|'familias'|'subfamilias'|'especies'|'subespecies'|'atributos'|'combinaciones'

const TABS:Array<{k:TabType,l:string}> = [
  {k:'ordenes',l:'📋 Órdenes'},
  {k:'subordendes',l:'↳ Subordendes'},
  {k:'categorias',l:'🗂️ Categorías'},
  {k:'subcategorias',l:'↳ Subcategorías'},
  {k:'familias',l:'📁 Familias'},
  {k:'subfamilias',l:'↳ Subfamilias'},
  {k:'especies',l:'🦋 Especies'},
  {k:'subespecies',l:'↳ Subespecies'},
  {k:'atributos',l:'🎨 Atributos'},
  {k:'combinaciones',l:'🔀 Combinaciones'},
]

export default function CatalogoPage(){
  const [tab,setTab]=useState<TabType>('ordenes')
  const [items,setItems]=useState<any[]>([])
  const [familias,setFamilias]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'nuevo'>('lista')
  const [edit,setEdit]=useState<any>({activo:true,valores:[]})
  const [guardando,setGuardando]=useState(false)
  const [msg,setMsg]=useState('')
  const [busq,setBusq]=useState('')
  const [filtroRubro,setFiltroRubro]=useState('todos')
  const [filtroOrden,setFiltroOrden]=useState('Todas')
  const [filtroFamilia,setFiltroFamilia]=useState('Todas')
  const [pag,setPag]=useState(1)
  const [valorInput,setValorInput]=useState('')
  const [famDetalle,setFamDetalle]=useState('')
  const [especiesFam,setEspeciesFam]=useState<any[]>([])
  const POR_PAG=30

  useEffect(()=>{ cargarFamilias(); cargarOrdenes() },[])
  useEffect(()=>{ cargar() },[tab])

  const [ordenesList,setOrdenesList]=useState<any[]>([])
  const [rubrosList,setRubrosList]=useState<any[]>([])

  const cargarOrdenes=async()=>{
    const [o,rb]=await Promise.all([
      fetch('/api/datos?tipo=ordenes').then(r=>r.json()),
      fetch('/api/datos?tipo=rubros').then(r=>r.json()),
    ])
    if(Array.isArray(o)) setOrdenesList(o)
    if(Array.isArray(rb)) setRubrosList(rb)
  }

  const cargarFamilias=async()=>{
    const r=await fetch('/api/datos').catch(()=>null)
    if(!r)return
    const d=await r.json()
    if(Array.isArray(d)) setFamilias(d)
  }

  const cargar=async()=>{
    setLoading(true)
    setBusq('');setFiltroOrden('Todas');setFiltroFamilia('Todas');setPag(1)
    try{
      if(tab==='familias'){
        const r=await fetch('/api/datos')
        const d=await r.json()
        setItems(Array.isArray(d)?d:[])
      } else if(tab==='especies'){
        const r=await fetch('/api/datos')
        const d=await r.json()
        const flat=Array.isArray(d)?d.flatMap((f:any)=>(f.e||[]).map((e:any)=>({...e,familia:f.id,familiaName:f.nm||f.id}))):[]
        setItems(flat)
      } else {
        const typeMap:Record<string,string>={
          ordenes:'orden',subordendes:'suborden',categorias:'categoria',
          subcategorias:'subcategoria',subfamilias:'subfamilia',
          subespecies:'subespecie',atributos:'atributo',combinaciones:'combinacion'
        }
        setItems([])
      }
    }catch(e){}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const contarEspecies=(famId:string)=>{
    const f=familias.find((x:any)=>x.id===famId||x.nm===famId)
    return f?.e?.length||0
  }

  const verFamilia=async(famId:string)=>{
    setFamDetalle(famId)
    const r=await fetch(`/api/datos?familia=${famId}`)
    const d=await r.json()
    setEspeciesFam(d?.e||[])
  }

  const guardar=async()=>{
    if(!edit.nombre&&!edit.n&&!edit.nm){mostrar('❌ Nombre obligatorio');return}
    setGuardando(true)
    try{
      if(tab==='familias'){
        const action=edit._id?'updateFamilia':'addFamilia'
        const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({action,data:{id:edit.id||edit.nm||edit.nombre,nm:edit.nm||edit.nombre,idOriginal:edit._id}})})
        const res=await r.json()
        if(res.ok){mostrar('✅ Guardado');setVista('lista');cargar();cargarFamilias()}
        else mostrar('❌ '+res.error)
      } else if(tab==='especies'){
        const action=edit._id?'updateEspecie':'addEspecie'
        const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},
          body:JSON.stringify({action,data:{n:edit.n,nOriginal:edit.nOriginal||edit.n,p:edit.p||0,s:edit.s||0,foto:edit.foto||'',familia:edit.familia}})})
        const res=await r.json()
        if(res.ok){mostrar('✅ Guardado');setVista('lista');cargar()}
        else mostrar('❌ '+res.error)
      } else {
        mostrar('✅ Guardado (demo)')
        setVista('lista')
      }
    }catch(e:any){mostrar('❌ '+e.message)}
    setGuardando(false)
  }

  const eliminar=async(it:any)=>{
    if(!confirm(`¿Eliminar "${it.nm||it.nombre||it.n}"?`))return
    if(tab==='familias'){
      const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'deleteFamilia',data:{id:it.id}})})
      const res=await r.json()
      if(res.ok){mostrar('🗑️ Eliminado');cargar();cargarFamilias()}
    } else if(tab==='especies'){
      const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'deleteEspecie',data:{n:it.n,familia:it.familia}})})
      const res=await r.json()
      if(res.ok){mostrar('🗑️ Eliminado');cargar()}
    }
  }

  const addValor=()=>{
    if(!valorInput.trim())return
    setEdit((p:any)=>({...p,valores:[...(p.valores||[]),{valor:valorInput.trim(),codigo:valorInput.trim().toLowerCase().replace(/\s+/g,'-'),precioExtra:0}]}))
    setValorInput('')
  }

  const filtrados=items.filter((it:any)=>{
    const nombre=(it.nm||it.nombre||it.n||it.familiaName||'').toLowerCase()
    const enBusq=nombre.includes(busq.toLowerCase())
    const enOrden=filtroOrden==='Todas'||it.orden===filtroOrden||it.ordenCategoria===filtroOrden||tab==='ordenes'||tab==='categorias'||tab==='subcategorias'||tab==='subordendes'
    const enFam=filtroFamilia==='Todas'||it.familia===filtroFamilia||it.id===filtroFamilia
    const enRubro=filtroRubro==='todos'||it.rubro===filtroRubro||['ordenes','familias','especies','subfamilias','subespecies','subordendes'].includes(tab)
    return enBusq&&enOrden&&enFam&&enRubro
  })
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)

  return(
    <div style={ss.page}>
      <div style={{padding:24}}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,flexWrap:'wrap',gap:8,paddingRight:320}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>📦 Catálogo — Estructura</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>
              {familias.length} familias · {familias.reduce((a:number,f:any)=>a+(f.e?.length||0),0)} especies · 17 rubros
            </p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={cargar} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄</button>
            <button onClick={()=>{setEdit({activo:true,valores:[],orden:'Lepidoptera Diurnae'});setVista('nuevo')}} style={btn(G,CARD)}>+ Nuevo</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:12,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {/* Resumen órdenes */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:16}}>
          {ORDENES_LIST.map(o=>{
            const famsDeOrden=familias.filter((f:any)=>f.orden===o)
            const especiesDeOrden=famsDeOrden.reduce((a:number,f:any)=>a+(f.e?.length||0),0)
            return(
              <div key={o} onClick={()=>{setFiltroOrden(o);setTab('familias')}}
                style={{background:CARD,border:`1px solid ${filtroOrden===o?G:BD}`,borderRadius:8,padding:'10px 12px',cursor:'pointer'}}>
                <div style={{color:G,fontSize:'.7rem',fontWeight:700,marginBottom:4}}>{o}</div>
                <div style={{display:'flex',gap:10}}>
                  <div><span style={{color:'#64A5ED',fontWeight:700,fontSize:'.9rem'}}>{famsDeOrden.length}</span><div style={{color:'rgba(201,168,76,0.4)',fontSize:'.55rem'}}>familias</div></div>
                  <div><span style={{color:'#5DBB63',fontWeight:700,fontSize:'.9rem'}}>{especiesDeOrden}</span><div style={{color:'rgba(201,168,76,0.4)',fontSize:'.55rem'}}>especies</div></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:3,marginBottom:12,flexWrap:'wrap',borderBottom:`1px solid ${BD}`,paddingBottom:8}}>
          {TABS.map(t=>(
            <button key={t.k} onClick={()=>{setTab(t.k);setVista('lista')}}
              style={btn(tab===t.k?G:'transparent',tab===t.k?CARD:'rgba(201,168,76,0.5)',{border:`1px solid ${tab===t.k?G:BD}`,padding:'5px 10px',fontSize:'.65rem'})}>
              {t.l} {tab===t.k?`(${items.length})`:''}
            </button>
          ))}
        </div>

        {/* Filtros */}
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:12,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          {(tab==='categorias'||tab==='subcategorias')&&(
          <select value={filtroRubro} onChange={e=>{setFiltroRubro(e.target.value);setPag(1)}} style={{...ss.inp,width:150,flex:'none'}}>
            <option value="todos">📦 Todos los rubros</option>
            {RUBROS.map(r=><option key={r} value={r}>{r}</option>)}
          </select>)}

          <select value={filtroOrden} onChange={e=>{setFiltroOrden(e.target.value);setPag(1)}} style={{...ss.inp,width:180,flex:'none'}}>
            <option value="Todas">🌍 Todas las órdenes</option>
            {ORDENES_LIST.map(o=><option key={o} value={o}>{o}</option>)}
          </select>
          {(tab==='especies'||tab==='subespecies'||tab==='subfamilias')&&(
            <select value={filtroFamilia} onChange={e=>{setFiltroFamilia(e.target.value);setPag(1)}} style={{...ss.inp,width:180,flex:'none'}}>
              <option value="Todas">📁 Todas las familias</option>
              {familias.map((f:any)=><option key={f.id} value={f.id}>{f.nm||f.id} ({f.e?.length||0})</option>)}
            </select>
          )}
          <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginLeft:'auto'}}>{filtrados.length} resultados</span>
        </div>

        {vista==='lista'&&(
          <>


            {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
              <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:12}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.05)'}}>
                      <th style={ss.th}>NOMBRE</th>
                      {tab==='ordenes'&&<><th style={ss.th}>ICONO</th><th style={ss.th}>FAMILIAS</th><th style={ss.th}>ESPECIES</th></>}
                      {tab==='subordendes'&&<th style={ss.th}>ORDEN PADRE</th>}
                      {tab==='categorias'&&<><th style={ss.th}>RUBRO</th><th style={ss.th}>DESCRIPCIÓN</th></>}
                      {tab==='subcategorias'&&<th style={ss.th}>CATEGORÍA PADRE</th>}
                      {tab==='familias'&&<><th style={ss.th}>ORDEN</th><th style={ss.th}>ESPECIES</th></>}
                      {tab==='subfamilias'&&<><th style={ss.th}>FAMILIA PADRE</th><th style={ss.th}>ORDEN</th></>}
                      {tab==='especies'&&<><th style={ss.th}>FAMILIA</th><th style={ss.th}>PRECIO</th><th style={ss.th}>STOCK</th></>}
                      {tab==='subespecies'&&<><th style={ss.th}>ESPECIE PADRE</th><th style={ss.th}>PRECIO</th><th style={ss.th}>STOCK</th></>}
                      {tab==='atributos'&&<><th style={ss.th}>TIPO</th><th style={ss.th}>RUBRO</th><th style={ss.th}>VALORES</th></>}
                      {tab==='combinaciones'&&<><th style={ss.th}>SKU</th><th style={ss.th}>PRECIO</th><th style={ss.th}>STOCK</th></>}
                      <th style={ss.th}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagActual.map((it:any,idx:number)=>(
                      <tr key={it._id||it.id||idx}>
                        <td style={{...ss.td,fontStyle:'italic',fontWeight:600}}>{it.nombre||it.nm||it.n||'—'}</td>
                        {tab==='ordenes'&&<>
                          <td style={ss.td}>{it.icono||'—'}</td>
                          <td style={{...ss.td,color:'#64A5ED',fontWeight:700}}>{familias.filter((f:any)=>f.orden===it.nombre).length}</td>
                          <td style={{...ss.td,color:'#5DBB63',fontWeight:700}}>{familias.filter((f:any)=>f.orden===it.nombre).reduce((a:number,f:any)=>a+(f.e?.length||0),0)}</td>
                        </>}
                        {tab==='subordendes'&&<td style={{...ss.td,color:'rgba(201,168,76,0.6)',fontSize:'.7rem'}}>{it.orden||'—'}</td>}
                        {tab==='categorias'&&<>
                          <td style={{...ss.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.rubro||'—'}</td>
                          <td style={{...ss.td,fontSize:'.65rem'}}>{it.descripcion||'—'}</td>
                        </>}
                        {tab==='subcategorias'&&<td style={{...ss.td,color:'rgba(201,168,76,0.6)',fontSize:'.7rem'}}>{it.categoria||'—'}</td>}
                        {tab==='familias'&&<>
                          <td style={{...ss.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.orden||'—'}</td>
                          <td style={{...ss.td,color:'#5DBB63',fontWeight:700,cursor:'pointer'}} onClick={()=>verFamilia(it.id||it.nombre)}>
                            {it.e?.length||contarEspecies(it.id||it.nombre)} 🔍
                          </td>
                        </>}
                        {tab==='subfamilias'&&<>
                          <td style={{...ss.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.familia||'—'}</td>
                          <td style={{...ss.td,fontSize:'.65rem'}}>{it.orden||'—'}</td>
                        </>}
                        {tab==='especies'&&<>
                          <td style={{...ss.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.familiaName||it.familia||'—'}</td>
                          <td style={{...ss.td,color:G,fontWeight:700}}>${(it.p||0).toFixed(2)}</td>
                          <td style={{...ss.td,color:(it.s||0)>0?'#5DBB63':'#ff5050'}}>{it.s||0}</td>
                        </>}
                        {tab==='subespecies'&&<>
                          <td style={{...ss.td,color:'rgba(201,168,76,0.6)',fontSize:'.7rem'}}>{it.especie||'—'}</td>
                          <td style={{...ss.td,color:G,fontWeight:700}}>${(it.precio||0).toFixed(2)}</td>
                          <td style={{...ss.td,color:(it.stock||0)>0?'#5DBB63':'#ff5050'}}>{it.stock||0}</td>
                        </>}
                        {tab==='atributos'&&<>
                          <td style={{...ss.td,fontSize:'.7rem'}}>{it.tipo||'—'}</td>
                          <td style={{...ss.td,fontSize:'.65rem',color:'rgba(201,168,76,0.6)'}}>{it.rubro||'todos'}</td>
                          <td style={{...ss.td,fontSize:'.62rem'}}>{(it.valores||[]).slice(0,3).map((v:any)=>v.valor).join(', ')}</td>
                        </>}
                        {tab==='combinaciones'&&<>
                          <td style={{...ss.td,fontFamily:'monospace',fontSize:'.7rem'}}>{it.sku||'—'}</td>
                          <td style={{...ss.td,color:G,fontWeight:700}}>${it.precio||0}</td>
                          <td style={{...ss.td,color:(it.stock||0)>0?'#5DBB63':'#ff5050'}}>{it.stock||0}</td>
                        </>}
                        <td style={ss.td}>
                          <div style={{display:'flex',gap:3}}>
                            <button onClick={()=>{setEdit({...it,nOriginal:it.n,valores:it.valores||[]});setVista('nuevo')}}
                              style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.62rem'})}>✏️</button>
                            <button onClick={()=>eliminar(it)}
                              style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 7px',fontSize:'.62rem'})}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pagActual.length===0&&<tr><td colSpan={6} style={{...ss.td,textAlign:'center',padding:32,color:'rgba(201,168,76,0.3)'}}>No hay registros</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {totalPag>1&&(
              <div style={{display:'flex',gap:6,alignItems:'center',justifyContent:'center',marginBottom:16}}>
                <button onClick={()=>setPag(1)} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1,padding:'5px 8px'})}>««</button>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1})}>←</button>
                <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>Pág {pag}/{totalPag} · {filtrados.length} total</span>
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1})}>→</button>
                <button onClick={()=>setPag(totalPag)} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1,padding:'5px 8px'})}>»»</button>
              </div>
            )}
          </>
        )}

        {vista==='nuevo'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{edit._id||edit.id?'✏️ Editar':'+'} {TABS.find(t=>t.k===tab)?.l}</h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
                <input value={edit.nm||edit.nombre||edit.n||''} onChange={e=>setEdit((p:any)=>({...p,nm:e.target.value,nombre:e.target.value,n:e.target.value}))} style={{...ss.inp,marginBottom:10}}/>

                {(tab==='familias'||tab==='subfamilias'||tab==='subordendes')&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ORDEN</label>
                  <select value={edit.orden||'Lepidoptera Diurnae'} onChange={e=>setEdit((p:any)=>({...p,orden:e.target.value}))} style={{...ss.inp,marginBottom:10}}>
                    {ORDENES_LIST.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                </>}

                {(tab==='categorias'||tab==='subcategorias')&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>RUBRO</label>
                  <select value={edit.rubro||'todos'} onChange={e=>setEdit((p:any)=>({...p,rubro:e.target.value}))} style={{...ss.inp,marginBottom:10}}>
                    <option value="todos">Todos</option>
                    {RUBROS.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                </>}

                {tab==='especies'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FAMILIA *</label>
                  <select value={edit.familia||''} onChange={e=>setEdit((p:any)=>({...p,familia:e.target.value}))} style={{...ss.inp,marginBottom:10}}>
                    <option value="">-- Selecciona --</option>
                    {familias.map((f:any)=><option key={f.id} value={f.id}>{f.nm||f.id} ({f.e?.length||0})</option>)}
                  </select>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                    <div>
                      <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>PRECIO USD</label>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>setEdit((p:any)=>({...p,p:Math.max(0,(p.p||0)-0.5)}))} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'5px 10px'})}>−</button>
                        <input type="number" value={edit.p||0} onChange={e=>setEdit((p:any)=>({...p,p:parseFloat(e.target.value)||0}))} style={{...ss.inp,textAlign:'center'}}/>
                        <button onClick={()=>setEdit((p:any)=>({...p,p:(p.p||0)+0.5}))} style={btn('rgba(93,187,99,0.15)','#5DBB63',{border:'1px solid rgba(93,187,99,0.3)',padding:'5px 10px'})}>+</button>
                      </div>
                    </div>
                    <div>
                      <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>STOCK</label>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>setEdit((p:any)=>({...p,s:Math.max(0,(p.s||0)-1)}))} style={btn('rgba(255,80,80,0.15)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',padding:'5px 10px'})}>−</button>
                        <input type="number" value={edit.s||0} onChange={e=>setEdit((p:any)=>({...p,s:parseInt(e.target.value)||0}))} style={{...ss.inp,textAlign:'center'}}/>
                        <button onClick={()=>setEdit((p:any)=>({...p,s:(p.s||0)+1}))} style={btn('rgba(93,187,99,0.15)','#5DBB63',{border:'1px solid rgba(93,187,99,0.3)',padding:'5px 10px'})}>+</button>
                      </div>
                    </div>
                  </div>
                </>}

                {tab==='atributos'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>TIPO</label>
                  <select value={edit.tipo||''} onChange={e=>setEdit((p:any)=>({...p,tipo:e.target.value}))} style={{...ss.inp,marginBottom:10}}>
                    {['tamano','sexo','calidad','montaje','color','material','talla','peso'].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>VALORES</label>
                  <div style={{display:'flex',gap:6,marginBottom:6}}>
                    <input value={valorInput} onChange={e=>setValorInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addValor()} style={{...ss.inp,flex:1}} placeholder="A1, M, L..."/>
                    <button onClick={addValor} style={btn(G,CARD,{padding:'6px 10px'})}>+</button>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:8}}>
                    {(edit.valores||[]).map((v:any,i:number)=>(
                      <span key={i} onClick={()=>setEdit((p:any)=>({...p,valores:(p.valores||[]).filter((_:any,idx:number)=>idx!==i)}))}
                        style={{background:'rgba(201,168,76,0.12)',color:G,padding:'3px 8px',borderRadius:10,fontSize:'.65rem',cursor:'pointer'}}>
                        {v.valor} ×
                      </span>
                    ))}
                  </div>
                  {edit.tipo==='tamano'&&(
                    <div style={{display:'flex',flexWrap:'wrap',gap:3}}>
                      {TALLAS.map(t=>(
                        <button key={t} onClick={()=>setEdit((p:any)=>({...p,valores:[...(p.valores||[]),{valor:t,codigo:t.split(' ')[0],precioExtra:0}]}))}
                          style={btn('rgba(201,168,76,0.06)',G,{border:`1px solid ${BD}`,padding:'3px 7px',fontSize:'.58rem'})}>
                          +{t.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  )}
                </>}

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>DESCRIPCIÓN</label>
                <textarea value={edit.descripcion||''} onChange={e=>setEdit((p:any)=>({...p,descripcion:e.target.value}))} style={{...ss.inp,height:60,resize:'vertical' as const}}/>
              </div>
              <div>
                {tab==='especies'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FOTO URL (Bunny.net)</label>
                  <input value={edit.foto||''} onChange={e=>setEdit((p:any)=>({...p,foto:e.target.value}))} style={{...ss.inp,marginBottom:6}} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                  {edit.foto&&<img src={edit.foto} style={{width:'100%',height:120,objectFit:'contain',border:`1px solid ${BD}`,borderRadius:4,background:'#050501',marginBottom:10}} onError={(e:any)=>e.target.style.display='none'}/>}
                </>}
                {(tab==='familias'||tab==='categorias'||tab==='ordenes')&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>IMAGEN URL</label>
                  <input value={edit.imagen||''} onChange={e=>setEdit((p:any)=>({...p,imagen:e.target.value}))} style={{...ss.inp,marginBottom:6}}/>
                  {edit.imagen&&<img src={edit.imagen} style={{width:'100%',height:100,objectFit:'contain',border:`1px solid ${BD}`,borderRadius:4,background:'#050501'}} onError={(e:any)=>e.target.style.display='none'}/>}
                </>}
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>ORDEN DISPLAY</label>
                <input type="number" value={edit.ordenDisplay||0} onChange={e=>setEdit((p:any)=>({...p,ordenDisplay:parseInt(e.target.value)||0}))} style={{...ss.inp,marginBottom:10}}/>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginTop:6}}>
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
    </div>
  )
}
