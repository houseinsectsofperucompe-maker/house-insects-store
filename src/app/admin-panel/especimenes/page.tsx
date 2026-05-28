'use client'
import { useState, useEffect } from 'react'

type Especie = { _id:string; n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; familia:string; subfamilia?:string; activo:boolean; calidad?:string; sexo?:string; video?:string; descripcion?:string }
type Familia = { _id:string; nombre:string; orden:string; activo:boolean }
type Orden = { _id:string; nombre:string; icono:string; activo:boolean }

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  sidebar:{width:220,background:'#111008',borderRight:`1px solid ${BD}`,minHeight:'100vh',padding:'0',position:'fixed' as const,top:0,left:0,overflowY:'auto' as const,zIndex:100},
  main:{marginLeft:220,padding:24},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const RUBROS17=[
  {id:'especimenes',nm:'🦋 Especímenes Biológicos',sanity:true},
  {id:'diurnas',nm:'🦋 Cuadros Mariposas Diurnas',sanity:false},
  {id:'joyeria',nm:'💎 Joyería Natural',sanity:false},
  {id:'rarezas',nm:'✨ Rarezas & Gynandromorphs',sanity:false},
  {id:'artesanias',nm:'🏺 Artesanías & Cúpulas',sanity:false},
  {id:'herramientas',nm:'🔬 Herramientas Biológicas',sanity:false},
  {id:'nocturnas',nm:'🌙 Cuadros Nocturnas',sanity:false},
  {id:'coleoptera',nm:'🪲 Coleópteros & Artrópodos',sanity:false},
  {id:'minerales',nm:'💎 Minerales & Piedras',sanity:false},
  {id:'semillas',nm:'🌿 Semillas & Plantas',sanity:false},
  {id:'frutas',nm:'🍍 Frutas Exóticas',sanity:false},
  {id:'hongos',nm:'🍄 Hongos & Naturales',sanity:false},
  {id:'maderas',nm:'🪵 Maderas',sanity:false},
  {id:'textileria',nm:'🧵 Textilería',sanity:false},
  {id:'pinturas',nm:'🖼️ Pinturas',sanity:false},
  {id:'esencias',nm:'🌸 Esencias',sanity:false},
  {id:'superalimentos',nm:'⚡ Superalimentos',sanity:false},
]

export default function GestorCatalogo(){
  const [rubro,setRubro]=useState('especimenes')
  const [vista,setVista]=useState<'lista'|'nuevo'|'editar'>('lista')
  const [especies,setEspecies]=useState<Especie[]>([])
  const [familias,setFamilias]=useState<Familia[]>([])
  const [ordenes,setOrdenes]=useState<Orden[]>([])
  const [loading,setLoading]=useState(true)
  const [famSel,setFamSel]=useState('Todas')
  const [busq,setBusq]=useState('')
  const [pag,setPag]=useState(1)
  const [msg,setMsg]=useState('')
  const [espEdit,setEspEdit]=useState<Partial<Especie>>({})
  const [guardando,setGuardando]=useState(false)
  const [seleccionados,setSeleccionados]=useState<string[]>([])
  const POR_PAG=25

  useEffect(()=>{cargar()},[])

  const cargar=async()=>{
    setLoading(true)
    try{
      const [e,f,o]=await Promise.all([
        fetch('/api/sanity-read').then(r=>r.json()),
        fetch('/api/sanity-read?type=familia').then(r=>r.json()),
        fetch('/api/sanity-read?type=orden').then(r=>r.json()),
      ])
      setEspecies(Array.isArray(e)?e:[])
      setFamilias(Array.isArray(f)?f:[])
      setOrdenes(Array.isArray(o)?o:[])
    }catch(e){mostrar('❌ Error cargando')}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),4000)}

  const filtrados=especies.filter(e=>{
    const enFam=famSel==='Todas'||e.familia===famSel
    const enBusq=e.n.toLowerCase().includes(busq.toLowerCase())||e.familia.toLowerCase().includes(busq.toLowerCase())
    return enFam&&enBusq
  })
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)
  const famList=['Todas',...Array.from(new Set(especies.map(e=>e.familia))).sort()]
  const sinPrecio=especies.filter(e=>e.p===0).length

  const guardar=async()=>{
    if(!espEdit.n||!espEdit.familia){mostrar('❌ Nombre y familia son obligatorios');return}
    setGuardando(true)
    const action=espEdit._id?'update':'create'
    const data=espEdit._id?{
      _id:espEdit._id,
      precio:espEdit.p||0,
      stock:espEdit.s||0,
      fotoFrente:espEdit.foto||'',
      fotoLado:espEdit.fotoLado||'',
      fotoReverso:espEdit.fotoReverso||'',
      activo:espEdit.activo!==false,
      calidad:espEdit.calidad||'A1',
      sexo:espEdit.sexo||'M or F',
    }:{
      nombre:espEdit.n,
      familia:espEdit.familia,
      subfamilia:espEdit.subfamilia||'',
      precio:espEdit.p||0,
      stock:espEdit.s||0,
      ordenCategoria:'Lepidoptera Diurnae',
    }
    const r=await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Guardado correctamente');setVista('lista');cargar()}
    else mostrar('❌ '+res.error)
    setGuardando(false)
  }

  const eliminar=async(id:string,n:string)=>{
    if(!confirm(`¿Eliminar "${n}"?`))return
    await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})
    mostrar('🗑️ Eliminado');cargar()
  }

  const eliminarSeleccionados=async()=>{
    if(!seleccionados.length)return
    if(!confirm(`¿Eliminar ${seleccionados.length} especies?`))return
    await Promise.all(seleccionados.map(id=>fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})))
    setSeleccionados([]);mostrar(`🗑️ ${seleccionados.length} eliminados`);cargar()
  }

  const toggleSel=(id:string)=>setSeleccionados(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id])
  const toggleTodos=()=>setSeleccionados(p=>p.length===pagActual.length?[]:pagActual.map(e=>e._id))

  const rubroActual=RUBROS17.find(r=>r.id===rubro)

  return(
    <div style={s.page}>
      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <div style={{padding:'16px 12px',borderBottom:`1px solid ${BD}`}}>
          <a href="/admin-panel" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none',display:'block',marginBottom:4}}>← Admin Panel</a>
          <div style={{color:G,fontSize:'.8rem',fontWeight:700,letterSpacing:'.1em'}}>🦋 CATÁLOGO</div>
        </div>
        <div style={{padding:'8px 0'}}>
          {RUBROS17.map(r=>(
            <button key={r.id} onClick={()=>{setRubro(r.id);setVista('lista');setBusq('');setFamSel('Todas');setPag(1)}}
              style={{width:'100%',textAlign:'left',padding:'9px 14px',background:rubro===r.id?'rgba(201,168,76,0.12)':'transparent',border:'none',borderLeft:rubro===r.id?`3px solid ${G}`:'3px solid transparent',color:rubro===r.id?'#E8C97A':'rgba(201,168,76,0.5)',cursor:'pointer',fontSize:'.72rem',fontFamily:'Georgia,serif',display:'block'}}>
              {r.nm}
              {r.id==='especimenes'&&<span style={{float:'right',background:'rgba(201,168,76,0.15)',borderRadius:10,padding:'1px 6px',fontSize:'.6rem'}}>{especies.length}</span>}
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN */}
      <main style={s.main}>
        {/* Header */}
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>{rubroActual?.nm}</h1>
            {rubro==='especimenes'&&<p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{especies.length} especies · {sinPrecio>0&&<span style={{color:'#ff9966'}}>{sinPrecio} sin precio · </span>}{familias.length} familias · {ordenes.length} órdenes</p>}
          </div>
          <div style={{display:'flex',gap:8,marginRight:280}}>
            <button onClick={cargar} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄 Actualizar</button>
            {rubro==='especimenes'&&<button onClick={()=>{setEspEdit({activo:true,calidad:'A1',sexo:'M or F'});setVista('nuevo')}} style={btn(G,CARD)}>+ Nueva especie</button>}
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {rubro!=='especimenes'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:40,textAlign:'center'}}>
            <div style={{fontSize:'3rem',marginBottom:12}}>{rubroActual?.nm.split(' ')[0]}</div>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.85rem',marginBottom:8}}>{rubroActual?.nm}</p>
            <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.75rem'}}>Gestión de este rubro próximamente</p>
          </div>
        )}

        {rubro==='especimenes'&&vista==='lista'&&(
          <>
            {/* Filtros */}
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'12px 16px',marginBottom:16,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar especie o familia..." style={{...s.inp,width:260,flex:'none'}}/>
              <select value={famSel} onChange={e=>{setFamSel(e.target.value);setPag(1)}} style={{...s.inp,width:180,flex:'none'}}>
                {famList.map(f=><option key={f} value={f}>{f}{f!=='Todas'?` (${especies.filter(e=>e.familia===f).length})`:''}</option>)}
              </select>
              <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>{filtrados.length} resultados</span>
              {seleccionados.length>0&&<button onClick={eliminarSeleccionados} style={btn('rgba(255,80,80,0.2)','#ff5050',{border:'1px solid rgba(255,80,80,0.3)',marginLeft:'auto'})}>🗑️ Eliminar {seleccionados.length} seleccionados</button>}
            </div>

            {/* Tabla */}
            {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
              <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:16}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.05)'}}>
                      <th style={{...s.th,width:32}}><input type="checkbox" onChange={toggleTodos} checked={seleccionados.length===pagActual.length&&pagActual.length>0}/></th>
                      <th style={s.th}>FOTO</th>
                      <th style={s.th}>NOMBRE CIENTÍFICO</th>
                      <th style={s.th}>FAMILIA</th>
                      <th style={s.th}>PRECIO USD</th>
                      <th style={s.th}>STOCK</th>
                      <th style={s.th}>CALIDAD</th>
                      <th style={s.th}>ESTADO</th>
                      <th style={s.th}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagActual.map(esp=>(
                      <tr key={esp._id} style={{background:seleccionados.includes(esp._id)?'rgba(201,168,76,0.06)':'transparent'}}>
                        <td style={s.td}><input type="checkbox" checked={seleccionados.includes(esp._id)} onChange={()=>toggleSel(esp._id)}/></td>
                        <td style={s.td}>{esp.foto?<img src={esp.foto} style={{width:48,height:36,objectFit:'cover',borderRadius:4,border:`1px solid ${BD}`}}/>:<div style={{width:48,height:36,background:'rgba(201,168,76,0.05)',borderRadius:4,border:`1px solid ${BD}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.6rem',color:'rgba(201,168,76,0.3)'}}>—</div>}</td>
                        <td style={{...s.td,fontStyle:'italic',maxWidth:220}}>{esp.n}</td>
                        <td style={{...s.td,color:'rgba(201,168,76,0.6)',fontSize:'.7rem'}}>{esp.familia}</td>
                        <td style={{...s.td,color:esp.p>0?G:'#ff9966',fontWeight:700}}>${esp.p?.toFixed(2)||'0.00'}</td>
                        <td style={{...s.td,color:esp.s>0?'#5DBB63':'#ff9966'}}>{esp.s||0}</td>
                        <td style={{...s.td,fontSize:'.65rem'}}>{esp.calidad||'A1'}</td>
                        <td style={s.td}><span style={{background:esp.activo?'rgba(93,187,99,0.2)':'rgba(255,80,80,0.2)',color:esp.activo?'#5DBB63':'#ff5050',padding:'3px 8px',borderRadius:10,fontSize:'.6rem',fontWeight:700}}>{esp.activo?'ACTIVO':'INACTIVO'}</span></td>
                        <td style={s.td}>
                          <div style={{display:'flex',gap:4}}>
                            <button onClick={()=>{setEspEdit({...esp});setVista('editar')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 10px',fontSize:'.65rem'})}>✏️ Editar</button>
                            <button onClick={()=>eliminar(esp._id,esp.n)} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 8px',fontSize:'.65rem'})}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Paginación */}
            {totalPag>1&&(
              <div style={{display:'flex',gap:6,alignItems:'center',justifyContent:'center'}}>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1})}>← Ant</button>
                {Array.from({length:Math.min(7,totalPag)},(_,i)=>{
                  const p=totalPag<=7?i+1:pag<=4?i+1:pag>=totalPag-3?totalPag-6+i:pag-3+i
                  return <button key={p} onClick={()=>setPag(p)} style={btn(pag===p?G:'rgba(201,168,76,0.08)',pag===p?CARD:G,{border:`1px solid ${pag===p?G:BD}`,padding:'6px 10px',minWidth:34})}>{p}</button>
                })}
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1})}>Sig →</button>
                <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>Página {pag} de {totalPag}</span>
              </div>
            )}
          </>
        )}

        {/* FORMULARIO NUEVO/EDITAR */}
        {rubro==='especimenes'&&(vista==='nuevo'||vista==='editar')&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{vista==='nuevo'?'+ Nueva Especie':'✏️ Editar Especie'}</h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver a lista</button>
            </div>

            {/* Pestañas tipo PrestaShop */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {/* Col 1 */}
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE CIENTÍFICO *</label>
                <input value={espEdit.n||''} onChange={e=>setEspEdit(p=>({...p,n:e.target.value}))} style={s.inp} placeholder="Ej: Morpho didius"/>

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:12}}>FAMILIA *</label>
                <input value={espEdit.familia||''} onChange={e=>setEspEdit(p=>({...p,familia:e.target.value}))} style={s.inp} placeholder="Ej: Morphidae" list="fam-list"/>
                <datalist id="fam-list">{familias.map(f=><option key={f._id} value={f.nombre}/>)}</datalist>

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:12}}>SUBFAMILIA</label>
                <input value={espEdit.subfamilia||''} onChange={e=>setEspEdit(p=>({...p,subfamilia:e.target.value}))} style={s.inp} placeholder="Opcional"/>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
                  <div>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>PRECIO USD *</label>
                    <input type="number" value={espEdit.p||''} onChange={e=>setEspEdit(p=>({...p,p:parseFloat(e.target.value)||0}))} style={s.inp} placeholder="0.00"/>
                  </div>
                  <div>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>STOCK</label>
                    <input type="number" value={espEdit.s||''} onChange={e=>setEspEdit(p=>({...p,s:parseInt(e.target.value)||0}))} style={s.inp} placeholder="0"/>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:12}}>
                  <div>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>CALIDAD</label>
                    <select value={espEdit.calidad||'A1'} onChange={e=>setEspEdit(p=>({...p,calidad:e.target.value}))} style={s.inp}>
                      <option value="A1">A1 — Perfecto</option>
                      <option value="A1-">A1- — Pequeños defectos</option>
                      <option value="VGA2">VGA2 — Segunda buena</option>
                      <option value="A2">A2 — Segunda</option>
                    </select>
                  </div>
                  <div>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>SEXO</label>
                    <select value={espEdit.sexo||'M or F'} onChange={e=>setEspEdit(p=>({...p,sexo:e.target.value}))} style={s.inp}>
                      <option value="M">M — Macho</option>
                      <option value="F">F — Hembra</option>
                      <option value="P">P — Par</option>
                      <option value="EP">EP — Ex-pupae</option>
                      <option value="M or F">M or F</option>
                    </select>
                  </div>
                </div>

                <div style={{marginTop:12}}>
                  <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
                    <input type="checkbox" checked={espEdit.activo!==false} onChange={e=>setEspEdit(p=>({...p,activo:e.target.checked}))}/>
                    <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.75rem'}}>Activo en catálogo web</span>
                  </label>
                </div>
              </div>

              {/* Col 2 - Fotos */}
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FOTO FRENTE (URL Bunny.net)</label>
                <input value={espEdit.foto||''} onChange={e=>setEspEdit(p=>({...p,foto:e.target.value}))} style={s.inp} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                {espEdit.foto&&<img src={espEdit.foto} style={{width:'100%',height:120,objectFit:'contain',marginTop:6,border:`1px solid ${BD}`,borderRadius:4,background:'#050501'}}/>}

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:12}}>FOTO LADO (URL Bunny.net)</label>
                <input value={espEdit.fotoLado||''} onChange={e=>setEspEdit(p=>({...p,fotoLado:e.target.value}))} style={s.inp} placeholder="https://HouseInsects1967.b-cdn.net/..."/>

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:12}}>FOTO REVERSO (URL Bunny.net)</label>
                <input value={espEdit.fotoReverso||''} onChange={e=>setEspEdit(p=>({...p,fotoReverso:e.target.value}))} style={s.inp} placeholder="https://HouseInsects1967.b-cdn.net/..."/>

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:12}}>VIDEO (URL)</label>
                <input value={espEdit.video||''} onChange={e=>setEspEdit(p=>({...p,video:e.target.value}))} style={s.inp} placeholder="https://..."/>

                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:12}}>DESCRIPCIÓN</label>
                <textarea value={espEdit.descripcion||''} onChange={e=>setEspEdit(p=>({...p,descripcion:e.target.value}))} style={{...s.inp,height:70,resize:'vertical' as const}} placeholder="Descripción opcional..."/>
              </div>
            </div>

            <div style={{marginTop:20,display:'flex',gap:10}}>
              <button onClick={guardar} disabled={guardando} style={btn(G,CARD,{padding:'10px 28px',fontSize:'.85rem',opacity:guardando?0.7:1})}>{guardando?'Guardando...':'💾 Guardar'}</button>
              <button onClick={()=>setVista('lista')} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'10px 20px'})}>Cancelar</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
