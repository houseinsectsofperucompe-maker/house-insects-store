'use client'
import { useState, useEffect } from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const RUBROS=['especimenes','diurnas','joyeria','rarezas','artesanias','herramientas','nocturnas','coleoptera','minerales','semillas','frutas','hongos','maderas','textileria','pinturas','esencias','superalimentos']
const TIPOS_ATRIB=['tamano','sexo','calidad','montaje','color','material','talla','peso','volumen','dimension','presentacion','variedad','tecnica']
const TALLAS_MARIPOSA=['S (3-5 cm)','M (5-8 cm)','L (8-12 cm)','XL (12-15 cm)','XXL (15-20 cm)','XXXL (20+ cm)']

type TabType='ordenes'|'subordendes'|'categorias'|'subcategorias'|'familias'|'subfamilias'|'especies'|'subespecies'|'atributos'|'combinaciones'

export default function CatalogoPage(){
  const [tab,setTab]=useState<TabType>('ordenes')
  const [items,setItems]=useState<any[]>([])
  const [especies,setEspecies]=useState<any[]>([])
  const [familias,setFamilias]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'nuevo'>('lista')
  const [edit,setEdit]=useState<any>({})
  const [guardando,setGuardando]=useState(false)
  const [msg,setMsg]=useState('')
  const [valorInput,setValorInput]=useState('')
  const [famSelDetalle,setFamSelDetalle]=useState('')
  const [filtroOrden,setFiltroOrden]=useState('Todas')
  const [filtroFamilia,setFiltroFamilia]=useState('Todas')
  const [especiesFam,setEspeciesFam]=useState<any[]>([])
  const [loadingFam,setLoadingFam]=useState(false)

  useEffect(()=>{cargar()},[tab])
  useEffect(()=>{
    fetch("/api/datos").then(r=>r.json()).then(d=>setEspecies(Array.isArray(d)?d:[]))
    fetch("/api/datos?tipo=resumen").then(r=>r.json()).then(d=>setFamilias(Array.isArray(d)?d:[]))
  },[])

  const typeMap:Record<TabType,string>={ordenes:'orden',subordendes:'suborden',categorias:'categoria',subcategorias:'subcategoria',familias:'familia',subfamilias:'subfamilia',especies:'especie',subespecies:'subespecie',atributos:'atributo',combinaciones:'combinacion'}

  const ordenesUnicos=['Todas',...Array.from(new Set(familias.map((f:any)=>f.orden||'Sin orden'))).sort()]
  const familiasUnicas=['Todas',...familias.map((f:any)=>f.nm||f.id)]
  const contarEspecies=(familia:string)=>{ const f=familias.find((f:any)=>f.id===familia); return f?.count||0 }
  const contarFamiliasPorOrden=(orden:string)=>familias.filter((f:any)=>f.orden===orden).length
  const contarEspeciesPorOrden=(orden:string)=>familias.filter((f:any)=>f.orden===orden).reduce((a:number,f:any)=>a+(f.count||0),0)
  const contarPorOrden=(orden:string)=>especies.filter((e:any)=>e.ordenCategoria===orden).length

  const cargarFamilia=async(famId:string)=>{
    if(!famId)return
    setLoadingFam(true)
    try{
      const r=await fetch(`/api/catalogo-web?familia=${famId}`)
      const d=await r.json()
      setEspeciesFam(d?.e||[])
    }catch(e){}
    setLoadingFam(false)
  }

  const cargar=async()=>{
    setLoading(true)
    try{
      const r=await fetch(`/api/sanity-read?type=${typeMap[tab]}`)
      const d=await r.json()
      setItems(Array.isArray(d)?d:[])
    }catch(e){}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const guardar=async()=>{
    setGuardando(true)
    const _type=typeMap[tab]
    const action=edit._id?'updateCatalogo':'createCatalogo'
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data:{...edit,_type}})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Guardado');setVista('lista');cargar()}
    else mostrar('❌ '+res.error)
    setGuardando(false)
  }

  const eliminar=async(id:string,n:string)=>{
    if(!confirm(`¿Eliminar "${n}"?`))return
    await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})
    mostrar('🗑️ Eliminado');cargar()
  }

  const addValor=()=>{
    if(!valorInput.trim())return
    setEdit((p:any)=>({...p,valores:[...(p.valores||[]),{valor:valorInput.trim(),codigo:valorInput.trim().toLowerCase().replace(/\s+/g,'-'),precioExtra:0}]}))
    setValorInput('')
  }

  const removeValor=(idx:number)=>setEdit((p:any)=>({...p,valores:(p.valores||[]).filter((_:any,i:number)=>i!==idx)}))

  const TABS:Array<{k:TabType,l:string}> = [
    {k:'ordenes',l:'📋 Órdenes'},
    {k:'subordendes',l:'📋 Subordendes'},
    {k:'categorias',l:'🗂️ Categorías'},
    {k:'subcategorias',l:'🗂️ Subcategorías'},
    {k:'familias',l:'📁 Familias'},
    {k:'subfamilias',l:'📁 Subfamilias'},
    {k:'especies',l:'🦋 Especies'},
    {k:'subespecies',l:'↳ Subespecies'},
    {k:'atributos',l:'🎨 Atributos'},
    {k:'combinaciones',l:'🔀 Combinaciones'},
  ]

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8,paddingRight:320}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>📦 Catálogo — Estructura</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>Órdenes → Categorías → Familias → Atributos → Combinaciones</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={()=>{setEdit({activo:true,valores:[]});setVista('nuevo')}} style={btn(G,CARD)}>+ Nuevo</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {/* Tabs */}
        <div style={{display:'flex',gap:4,marginBottom:16,borderBottom:`1px solid ${BD}`,paddingBottom:8,flexWrap:'wrap'}}>
          {TABS.map(t=>(
            <button key={t.k} onClick={()=>{setTab(t.k);setVista('lista')}} style={btn(tab===t.k?G:'transparent',tab===t.k?CARD:G,{border:`1px solid ${tab===t.k?G:BD}`,padding:'6px 14px'})}>
              {t.l} {tab===t.k?`(${items.length})`:''}
            </button>
          ))}
        </div>

        {/* TALLAS REFERENCIA */}
        {tab==='atributos'&&(
          <div style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:12}}>
            <p style={{color:G,fontSize:'.65rem',fontWeight:700,marginBottom:6}}>📏 TALLAS ESTÁNDAR MARIPOSAS</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {TALLAS_MARIPOSA.map(t=><span key={t} style={{background:'rgba(201,168,76,0.1)',color:G,padding:'3px 8px',borderRadius:10,fontSize:'.62rem'}}>{t}</span>)}
            </div>
          </div>
        )}

        {/* FILTROS */}
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'10px 14px',marginBottom:12,display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}>
          <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar..." style={{...s.inp,width:200,flex:'none'}}/>
          <select value={filtroRubro} onChange={e=>{setFiltroRubro(e.target.value);setPag(1)}} style={{...s.inp,width:150,flex:'none'}}>
            <option value="todos">Todos los rubros</option>
            {RUBROS.map(r=><option key={r} value={r}>{r}</option>)}
          </select>
          {(tab==='familias'||tab==='subfamilias'||tab==='especies'||tab==='subespecies'||tab==='subordendes')&&(
            <select value={filtroOrden} onChange={e=>{setFiltroOrden(e.target.value);setPag(1)}} style={{...s.inp,width:180,flex:'none'}}>
              <option value="Todas">Todas las órdenes</option>
              {['Lepidoptera Diurnae','Moths Nocturnas','Coleoptera','Arthropoda'].map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          )}
          {(tab==='especies'||tab==='subespecies'||tab==='subfamilias')&&(
            <select value={filtroFamilia} onChange={e=>{setFiltroFamilia(e.target.value);setPag(1)}} style={{...s.inp,width:160,flex:'none'}}>
              <option value="Todas">Todas las familias</option>
              {familias.map((f:any)=><option key={f._id||f.id} value={f.nm||f.nombre||f.id}>{f.nm||f.nombre||f.id} ({contarEspecies(f.id||f.nombre)})</option>)}
            </select>
          )}
          <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginLeft:'auto'}}>{filtrados.length} resultados · pestaña: {tab}</span>
        </div>

        {vista==='lista'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'rgba(201,168,76,0.05)'}}>
                  <th style={s.th}>NOMBRE</th>
                  {tab==='ordenes'&&<><th style={s.th}>ICONO</th><th style={s.th}>FAMILIAS</th><th style={s.th}>ESPECIES</th></>}
                  {tab==='categorias'&&<th style={s.th}>RUBRO</th>}
                  {tab==='familias'&&<><th style={s.th}>ORDEN</th><th style={s.th}>ESPECIES</th></>}
                  {tab==='atributos'&&<><th style={s.th}>TIPO</th><th style={s.th}>RUBRO</th><th style={s.th}>VALORES</th></>}
                  {tab==='combinaciones'&&<><th style={s.th}>SKU</th><th style={s.th}>PRECIO</th><th style={s.th}>STOCK</th></>}
                  <th style={s.th}>ESTADO</th>
                  <th style={s.th}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {loading?<tr><td colSpan={6} style={{...s.td,textAlign:'center',padding:32,color:'rgba(201,168,76,0.3)'}}>⏳ Cargando...</td></tr>:
                items.map((it:any)=>(
                  <tr key={it._id}>
                    <td style={{...s.td,fontWeight:700,fontStyle:tab==='combinaciones'?'normal':'italic'}}>{tab==='especies'?(it.n||'—'):(it.nombre||it.sku||'—')}</td>
                    {tab==='ordenes'&&<><td style={s.td}>{it.icono||'—'}</td><td style={{...s.td,color:'#64A5ED',fontWeight:700}}>{contarFamiliasPorOrden(it.nombre)}</td><td style={{...s.td,color:'#5DBB63',fontWeight:700}}>{contarEspeciesPorOrden(it.nombre)}</td></>}
                    {tab==='categorias'&&<td style={{...s.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.rubro||'—'}</td>}
                    {tab==='familias'&&<><td style={{...s.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.orden||'—'}</td><td style={{...s.td,color:'#5DBB63',fontWeight:700}}>{contarEspecies(it.nombre)}</td></>}
                    {tab==='atributos'&&<>
                      <td style={{...s.td,fontSize:'.7rem'}}>{it.tipo||'—'}</td>
                      <td style={{...s.td,fontSize:'.65rem',color:'rgba(201,168,76,0.6)'}}>{it.rubro||'todos'}</td>
                      <td style={{...s.td,fontSize:'.65rem'}}>{(it.valores||[]).slice(0,3).map((v:any)=>v.valor).join(', ')}{(it.valores||[]).length>3?'...':''}</td>
                    </>}
                    {tab==='combinaciones'&&<>
                      <td style={{...s.td,fontSize:'.7rem',fontFamily:'monospace'}}>{it.sku||'—'}</td>
                      <td style={{...s.td,color:G,fontWeight:700}}>${it.precio||0}</td>
                      <td style={{...s.td,color:it.stock>0?'#5DBB63':'#ff5050'}}>{it.stock||0}</td>
                    </>}
                    <td style={s.td}><span style={{background:it.activo?'rgba(93,187,99,0.2)':'rgba(255,80,80,0.2)',color:it.activo?'#5DBB63':'#ff5050',padding:'3px 8px',borderRadius:10,fontSize:'.6rem',fontWeight:700}}>{it.activo?'ACTIVO':'INACTIVO'}</span></td>
                    <td style={s.td}>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>{setEdit({...it,valores:it.valores||[]});setVista('nuevo')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.65rem'})}>✏️</button>
                        <button onClick={()=>eliminar(it._id,it.nombre||it.sku||'')} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 8px',fontSize:'.65rem'})}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading&&items.length===0&&<tr><td colSpan={6} style={{...s.td,textAlign:'center',padding:32,color:'rgba(201,168,76,0.3)'}}>No hay registros — agrega el primero</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {vista==='nuevo'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>
                {edit._id?'✏️ Editar':'+'} {tab==='ordenes'?'Orden':tab==='categorias'?'Categoría':tab==='familias'?'Familia':tab==='atributos'?'Atributo':'Combinación'}
              </h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                {/* ORDENES */}
                {tab==='ordenes'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
                  <input value={edit.nombre||''} onChange={e=>setEdit((p:any)=>({...p,nombre:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="Lepidoptera Diurnae"/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ICONO EMOJI</label>
                  <input value={edit.icono||''} onChange={e=>setEdit((p:any)=>({...p,icono:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="🦋"/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>DESCRIPCIÓN</label>
                  <textarea value={edit.descripcion||''} onChange={e=>setEdit((p:any)=>({...p,descripcion:e.target.value}))} style={{...s.inp,height:70,resize:'vertical' as const}}/>
                </>}

                {/* CATEGORIAS */}
                {tab==='categorias'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
                  <input value={edit.nombre||''} onChange={e=>setEdit((p:any)=>({...p,nombre:e.target.value}))} style={{...s.inp,marginBottom:10}}/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>RUBRO</label>
                  <select value={edit.rubro||''} onChange={e=>setEdit((p:any)=>({...p,rubro:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    <option value="">-- Selecciona rubro --</option>
                    {RUBROS.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>DESCRIPCIÓN</label>
                  <textarea value={edit.descripcion||''} onChange={e=>setEdit((p:any)=>({...p,descripcion:e.target.value}))} style={{...s.inp,height:70,resize:'vertical' as const}}/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>META TÍTULO SEO</label>
                  <input value={edit.metaTitulo||''} onChange={e=>setEdit((p:any)=>({...p,metaTitulo:e.target.value}))} style={s.inp}/>
                </>}

                {/* FAMILIAS */}
                {tab==='familias'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
                  <input value={edit.nombre||''} onChange={e=>setEdit((p:any)=>({...p,nombre:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="Brassolidae"/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ORDEN / CATEGORIA</label>
                  <select value={edit.orden||''} onChange={e=>setEdit((p:any)=>({...p,orden:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    <option value="">-- Selecciona --</option>
                    {['Lepidoptera Diurnae','Moths Nocturnas','Coleoptera','Arthropoda'].map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>DESCRIPCIÓN</label>
                  <textarea value={edit.descripcion||''} onChange={e=>setEdit((p:any)=>({...p,descripcion:e.target.value}))} style={{...s.inp,height:70,resize:'vertical' as const}}/>
                </>}

                {/* ATRIBUTOS */}
                {tab==='atributos'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
                  <input value={edit.nombre||''} onChange={e=>setEdit((p:any)=>({...p,nombre:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="Tamaño, Calidad, Montaje..."/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>TIPO</label>
                  <select value={edit.tipo||''} onChange={e=>setEdit((p:any)=>({...p,tipo:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    <option value="">-- Selecciona --</option>
                    {TIPOS_ATRIB.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>APLICA A RUBRO</label>
                  <select value={edit.rubro||'todos'} onChange={e=>setEdit((p:any)=>({...p,rubro:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    <option value="todos">Todos los rubros</option>
                    {RUBROS.map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>VALORES (presiona Enter o +)</label>
                  <div style={{display:'flex',gap:6,marginBottom:8}}>
                    <input value={valorInput} onChange={e=>setValorInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addValor()} style={{...s.inp,flex:1}} placeholder="S, M, L, XL, A1, Montado..."/>
                    <button onClick={addValor} style={btn(G,CARD,{padding:'6px 10px'})}>+</button>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:8}}>
                    {(edit.valores||[]).map((v:any,i:number)=>(
                      <span key={i} onClick={()=>removeValor(i)} style={{background:'rgba(201,168,76,0.12)',color:G,padding:'4px 10px',borderRadius:10,fontSize:'.65rem',cursor:'pointer',border:`1px solid ${BD}`}}>
                        {v.valor} ×
                      </span>
                    ))}
                  </div>
                  {edit.tipo==='tamano'&&(
                    <div style={{marginTop:8}}>
                      <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',marginBottom:4}}>Tallas rápidas mariposas:</p>
                      <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                        {TALLAS_MARIPOSA.map(t=>(
                          <button key={t} onClick={()=>setEdit((p:any)=>({...p,valores:[...(p.valores||[]),{valor:t,codigo:t.split(' ')[0],precioExtra:0}]}))}
                            style={btn('rgba(201,168,76,0.06)',G,{border:`1px solid ${BD}`,padding:'3px 8px',fontSize:'.6rem'})}>
                            + {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>}

                {/* COMBINACIONES */}
                {tab==='combinaciones'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ESPECIE / PRODUCTO</label>
                  <select value={edit.especieId||''} onChange={e=>setEdit((p:any)=>({...p,especieId:e.target.value}))} style={{...s.inp,marginBottom:10}}>
                    <option value="">-- Selecciona especie --</option>
                    {especies.map((e:any)=><option key={e._id} value={e._id}>{e.n} ({e.familia})</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>SKU ÚNICO</label>
                  <input value={edit.sku||''} onChange={e=>setEdit((p:any)=>({...p,sku:e.target.value}))} style={{...s.inp,marginBottom:10}} placeholder="HIP-MORPH-001-L-M"/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ATRIBUTOS DE ESTA COMBINACION</label>
                  <div style={{display:'flex',gap:6,marginBottom:8}}>
                    <input value={valorInput} onChange={e=>setValorInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&valorInput.includes(':')){const[a,v]=valorInput.split(':');setEdit((p:any)=>({...p,atributos:[...(p.atributos||[]),{atributo:a.trim(),valor:v.trim()}]}));setValorInput('')}}} style={{...s.inp,flex:1}} placeholder="atributo:valor (ej: talla:L)"/>
                    <button onClick={()=>{if(valorInput.includes(':')){const[a,v]=valorInput.split(':');setEdit((p:any)=>({...p,atributos:[...(p.atributos||[]),{atributo:a.trim(),valor:v.trim()}]}));setValorInput('')}}} style={btn(G,CARD,{padding:'6px 10px'})}>+</button>
                  </div>
                  <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:10}}>
                    {(edit.atributos||[]).map((a:any,i:number)=>(
                      <span key={i} onClick={()=>setEdit((p:any)=>({...p,atributos:(p.atributos||[]).filter((_:any,idx:number)=>idx!==i)}))}
                        style={{background:'rgba(201,168,76,0.12)',color:G,padding:'4px 10px',borderRadius:10,fontSize:'.65rem',cursor:'pointer',border:`1px solid ${BD}`}}>
                        {a.atributo}: {a.valor} ×
                      </span>
                    ))}
                  </div>
                </>}
              </div>

              <div>
                {/* Campos comunes */}
                {(tab==='ordenes'||tab==='categorias'||tab==='familias')&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>IMAGEN URL</label>
                  <input value={edit.imagen||''} onChange={e=>setEdit((p:any)=>({...p,imagen:e.target.value}))} style={{...s.inp,marginBottom:8}} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                  {edit.imagen&&<img src={edit.imagen} style={{width:'100%',height:100,objectFit:'contain',border:`1px solid ${BD}`,borderRadius:4,background:'#050501',marginBottom:10}}/>}
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ORDEN DISPLAY</label>
                  <input type="number" value={edit.ordenDisplay||0} onChange={e=>setEdit((p:any)=>({...p,ordenDisplay:parseInt(e.target.value)||0}))} style={{...s.inp,marginBottom:10}}/>
                </>}

                {tab==='combinaciones'&&<>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:10}}>
                    {[{l:'PRECIO USD *',k:'precio'},{l:'PRECIO MAYORISTA',k:'precioMayorista'},{l:'PRECIO VIP',k:'precioVIP'},{l:'STOCK *',k:'stock'},{l:'STOCK MÍNIMO',k:'stockMinimo'},{l:'PESO GRAMOS',k:'pesoGramos'}].map(f=>(
                      <div key={f.k}>
                        <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.l}</label>
                        <input type="number" value={(edit as any)[f.k]||''} onChange={e=>setEdit((p:any)=>({...p,[f.k]:parseFloat(e.target.value)||0}))} style={s.inp}/>
                      </div>
                    ))}
                  </div>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FOTO URL</label>
                  <input value={edit.foto||''} onChange={e=>setEdit((p:any)=>({...p,foto:e.target.value}))} style={{...s.inp,marginBottom:8}} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                  {edit.foto&&<img src={edit.foto} style={{width:'100%',height:80,objectFit:'contain',border:`1px solid ${BD}`,borderRadius:4,background:'#050501'}}/>}
                </>}

                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginTop:10}}>
                  <input type="checkbox" checked={edit.activo!==false} onChange={e=>setEdit((p:any)=>({...p,activo:e.target.checked}))}/>
                  <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.75rem'}}>Activo</span>
                </label>
              </div>
            </div>

            <div style={{marginTop:16,display:'flex',gap:10}}>
              <button onClick={guardar} disabled={guardando} style={btn(G,CARD,{padding:'10px 28px',fontSize:'.85rem',opacity:guardando?0.7:1})}>{guardando?'Guardando...':'💾 Guardar'}</button>
              <button onClick={()=>setVista('lista')} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'10px 20px'})}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
