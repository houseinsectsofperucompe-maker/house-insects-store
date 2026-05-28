'use client'
import { useState, useEffect } from 'react'

type Cliente = { _id:string; nombre:string; email:string; telefono:string; whatsapp:string; instagram:string; wechat:string; pais:string; ciudad:string; direccion:string; grupo:string; descuento:number; totalCompras:number; numeroPedidos:number; ultimaCompra:string; notas:string; activo:boolean; fecha:string }

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})
const GRUPOS=['minorista','mayorista','mayoristaMas','vip','distribuidor','museo','investigador']
const GRUPO_COLOR:Record<string,string>={minorista:'rgba(201,168,76,0.2)',mayorista:'rgba(100,149,237,0.3)',mayoristaMas:'rgba(100,149,237,0.5)',vip:'rgba(212,175,55,0.5)',distribuidor:'rgba(93,187,99,0.3)',museo:'rgba(180,100,255,0.3)',investigador:'rgba(255,165,0,0.3)'}

export default function ClientesPage(){
  const [clientes,setClientes]=useState<Cliente[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'nuevo'>('lista')
  const [cliEdit,setCliEdit]=useState<Partial<Cliente>>({})
  const [busq,setBusq]=useState('')
  const [filtroGrupo,setFiltroGrupo]=useState('todos')
  const [msg,setMsg]=useState('')
  const [guardando,setGuardando]=useState(false)
  const [pag,setPag]=useState(1)
  const POR_PAG=25

  useEffect(()=>{cargar()},[])

  const cargar=async()=>{
    setLoading(true)
    try{
      const r=await fetch('/api/datos?tipo=cliente')
      const d=await r.json()
      setClientes(Array.isArray(d)?d:[])
    }catch(e){mostrar('❌ Error')}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),4000)}

  const guardar=async()=>{
    if(!cliEdit.nombre){mostrar('❌ Nombre obligatorio');return}
    setGuardando(true)
    const action=cliEdit._id?'updateCliente':'createCliente'
    const data={...cliEdit,fecha:cliEdit.fecha||new Date().toISOString(),activo:cliEdit.activo!==false}
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Guardado');setVista('lista');cargar()}
    else mostrar('❌ '+res.error)
    setGuardando(false)
  }

  const eliminar=async(id:string,n:string)=>{
    if(!confirm(`¿Eliminar cliente "${n}"?`))return
    await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})
    mostrar('🗑️ Eliminado');cargar()
  }

  const filtrados=clientes.filter(c=>{
    const enBusq=c.nombre?.toLowerCase().includes(busq.toLowerCase())||c.email?.toLowerCase().includes(busq.toLowerCase())||c.pais?.toLowerCase().includes(busq.toLowerCase())
    const enGrupo=filtroGrupo==='todos'||c.grupo===filtroGrupo
    return enBusq&&enGrupo
  })
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)
  const totalCompras=clientes.reduce((a,c)=>a+(c.totalCompras||0),0)
  const vips=clientes.filter(c=>c.grupo==='vip').length

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8,paddingRight:300}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>👥 Clientes</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{clientes.length} clientes · <span style={{color:'#5DBB63'}}>Total compras: ${totalCompras.toFixed(0)}</span> · {vips} VIP</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={cargar} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄</button>
            <button onClick={()=>{setCliEdit({grupo:'minorista',activo:true,descuento:0,totalCompras:0,numeroPedidos:0});setVista('nuevo')}} style={btn(G,CARD)}>+ Nuevo cliente</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {vista==='lista'&&(
          <>
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'12px 16px',marginBottom:16,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar nombre, email, país..." style={{...s.inp,width:260,flex:'none'}}/>
              <select value={filtroGrupo} onChange={e=>{setFiltroGrupo(e.target.value);setPag(1)}} style={{...s.inp,width:160,flex:'none'}}>
                <option value="todos">Todos los grupos</option>
                {GRUPOS.map(g=><option key={g} value={g}>{g}</option>)}
              </select>
              <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>{filtrados.length} resultados</span>
            </div>

            {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
              <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:16}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.05)'}}>
                      <th style={s.th}>NOMBRE</th>
                      <th style={s.th}>CONTACTO</th>
                      <th style={s.th}>PAIS</th>
                      <th style={s.th}>GRUPO</th>
                      <th style={s.th}>COMPRAS USD</th>
                      <th style={s.th}>PEDIDOS</th>
                      <th style={s.th}>DESCUENTO</th>
                      <th style={s.th}>ESTADO</th>
                      <th style={s.th}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagActual.map(c=>(
                      <tr key={c._id}>
                        <td style={s.td}>
                          <div style={{fontWeight:700}}>{c.nombre}</div>
                          {c.wechat&&<div style={{fontSize:'.6rem',color:'rgba(201,168,76,0.4)'}}>WeChat: {c.wechat}</div>}
                        </td>
                        <td style={s.td}>
                          <div style={{fontSize:'.7rem'}}>{c.email||'—'}</div>
                          <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>{c.whatsapp||c.telefono||''}</div>
                        </td>
                        <td style={s.td}>{c.pais||'—'}</td>
                        <td style={s.td}>
                          <span style={{background:GRUPO_COLOR[c.grupo]||'transparent',padding:'3px 8px',borderRadius:10,fontSize:'.62rem',fontWeight:700}}>{c.grupo}</span>
                        </td>
                        <td style={{...s.td,color:'#5DBB63',fontWeight:700}}>${(c.totalCompras||0).toFixed(0)}</td>
                        <td style={s.td}>{c.numeroPedidos||0}</td>
                        <td style={{...s.td,color:G}}>{c.descuento||0}%</td>
                        <td style={s.td}><span style={{background:c.activo?'rgba(93,187,99,0.2)':'rgba(255,80,80,0.2)',color:c.activo?'#5DBB63':'#ff5050',padding:'3px 8px',borderRadius:10,fontSize:'.6rem',fontWeight:700}}>{c.activo?'ACTIVO':'INACTIVO'}</span></td>
                        <td style={s.td}>
                          <div style={{display:'flex',gap:4}}>
                            <button onClick={()=>{setCliEdit({...c});setVista('nuevo')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.65rem'})}>✏️</button>
                            <button onClick={()=>eliminar(c._id,c.nombre)} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 8px',fontSize:'.65rem'})}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pagActual.length===0&&<tr><td colSpan={9} style={{...s.td,textAlign:'center',color:'rgba(201,168,76,0.3)',padding:32}}>No hay clientes</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
            {totalPag>1&&(
              <div style={{display:'flex',gap:6,alignItems:'center',justifyContent:'center'}}>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1})}>← Ant</button>
                <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>Página {pag} de {totalPag}</span>
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1})}>Sig →</button>
              </div>
            )}
          </>
        )}

        {vista==='nuevo'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{cliEdit._id?'✏️ Editar Cliente':'+ Nuevo Cliente'}</h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                {[{l:'NOMBRE *',k:'nombre',p:'Nombre completo'},{l:'EMAIL',k:'email',p:'email@ejemplo.com'},{l:'TELEFONO',k:'telefono',p:'+51...'},{l:'WHATSAPP',k:'whatsapp',p:'+1...'},{l:'INSTAGRAM',k:'instagram',p:'@usuario'},{l:'WECHAT ID',k:'wechat',p:'WeChat ID'}].map(f=>(
                  <div key={f.k} style={{marginBottom:10}}>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.l}</label>
                    <input value={(cliEdit as any)[f.k]||''} onChange={e=>setCliEdit(p=>({...p,[f.k]:e.target.value}))} style={s.inp} placeholder={f.p}/>
                  </div>
                ))}
              </div>
              <div>
                {[{l:'PAIS',k:'pais',p:'USA, China, Japan...'},{l:'CIUDAD',k:'ciudad',p:'Ciudad'},{l:'CODIGO POSTAL',k:'codigoPostal',p:''}].map(f=>(
                  <div key={f.k} style={{marginBottom:10}}>
                    <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.l}</label>
                    <input value={(cliEdit as any)[f.k]||''} onChange={e=>setCliEdit(p=>({...p,[f.k]:e.target.value}))} style={s.inp} placeholder={f.p}/>
                  </div>
                ))}
                <div style={{marginBottom:10}}>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>GRUPO</label>
                  <select value={cliEdit.grupo||'minorista'} onChange={e=>setCliEdit(p=>({...p,grupo:e.target.value}))} style={s.inp}>
                    {GRUPOS.map(g=><option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:10}}>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>DESCUENTO ESPECIAL %</label>
                  <input type="number" value={cliEdit.descuento||0} onChange={e=>setCliEdit(p=>({...p,descuento:parseFloat(e.target.value)||0}))} style={s.inp}/>
                </div>
                <div style={{marginBottom:10}}>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>TOTAL COMPRAS USD</label>
                  <input type="number" value={cliEdit.totalCompras||0} onChange={e=>setCliEdit(p=>({...p,totalCompras:parseFloat(e.target.value)||0}))} style={s.inp}/>
                </div>
                <div style={{marginBottom:10}}>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOTAS</label>
                  <textarea value={cliEdit.notas||''} onChange={e=>setCliEdit(p=>({...p,notas:e.target.value}))} style={{...s.inp,height:70,resize:'vertical' as const}}/>
                </div>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginTop:8}}>
                  <input type="checkbox" checked={cliEdit.activo!==false} onChange={e=>setCliEdit(p=>({...p,activo:e.target.checked}))}/>
                  <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.75rem'}}>Cliente activo</span>
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
