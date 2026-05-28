'use client'
import { useState, useEffect } from 'react'

type Item = { nombre:string; sku:string; cantidad:number; precio:number; familia:string; atributos:string; foto:string; partida:string; pesoGramos:number }
type Pedido = { _id:string; numero:string; origen:string; cliente:string; email:string; telefono:string; whatsapp:string; pais:string; ciudad:string; direccion:string; items:Item[]; subtotal:number; costoEnvio:number; seguro:number; descuento:number; total:number; drawback:number; estado:string; metodoPago:string; courier:string; aseguradora:string; tracking:string; urlTracking:string; factura:string; notas:string; fecha:string }

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const ESTADOS = ['pendiente','confirmado','pagado','preparando','enviado','entregado','devuelto','cancelado']
const ESTADO_COLOR:Record<string,string> = {
  pendiente:'rgba(255,165,0,0.3)',confirmado:'rgba(93,187,99,0.3)',pagado:'rgba(93,187,99,0.5)',
  preparando:'rgba(100,149,237,0.3)',enviado:'rgba(100,149,237,0.5)',entregado:'rgba(93,187,99,0.7)',
  devuelto:'rgba(255,165,0,0.5)',cancelado:'rgba(255,80,80,0.3)'
}
const ESTADO_TEXT:Record<string,string> = {
  pendiente:'⏳ Pendiente',confirmado:'✅ Confirmado',pagado:'💳 Pagado',
  preparando:'📦 Preparando',enviado:'🚚 Enviado',entregado:'🎉 Entregado',
  devuelto:'↩️ Devuelto',cancelado:'❌ Cancelado'
}

export default function PedidosPage(){
  const [pedidos,setPedidos]=useState<Pedido[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'nuevo'|'ver'>('lista')
  const [pedEdit,setPedEdit]=useState<Partial<Pedido>>({})
  const [pedVer,setPedVer]=useState<Pedido|null>(null)
  const [busq,setBusq]=useState('')
  const [filtroEstado,setFiltroEstado]=useState('todos')
  const [msg,setMsg]=useState('')
  const [guardando,setGuardando]=useState(false)
  const [pag,setPag]=useState(1)
  const POR_PAG=20

  useEffect(()=>{cargar()},[])

  const cargar=async()=>{
    setLoading(true)
    try{
      const r=await fetch('/api/sanity-read?type=pedido')
      const d=await r.json()
      setPedidos(Array.isArray(d)?d:[])
    }catch(e){mostrar('❌ Error cargando')}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),4000)}

  const guardar=async()=>{
    if(!pedEdit.cliente){mostrar('❌ Cliente obligatorio');return}
    setGuardando(true)
    const numero=pedEdit.numero||`HIP-${Date.now().toString().slice(-6)}`
    const total=(pedEdit.subtotal||0)+(pedEdit.costoEnvio||0)+(pedEdit.seguro||0)-(pedEdit.descuento||0)
    const drawback=total*0.03
    const data={...pedEdit,numero,total,drawback,fecha:pedEdit.fecha||new Date().toISOString(),estado:pedEdit.estado||'pendiente'}
    const action=pedEdit._id?'updatePedido':'createPedido'
    const r=await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Guardado');setVista('lista');cargar()}
    else mostrar('❌ '+res.error)
    setGuardando(false)
  }

  const cambiarEstado=async(id:string,estado:string)=>{
    await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'updateEstadoPedido',data:{_id:id,estado}})})
    mostrar('✅ Estado actualizado');cargar()
  }

  const eliminar=async(id:string,n:string)=>{
    if(!confirm(`¿Eliminar pedido "${n}"?`))return
    await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})
    mostrar('🗑️ Eliminado');cargar()
  }

  const filtrados=pedidos.filter(p=>{
    const enBusq=p.cliente?.toLowerCase().includes(busq.toLowerCase())||p.numero?.includes(busq)||p.email?.toLowerCase().includes(busq.toLowerCase())
    const enEstado=filtroEstado==='todos'||p.estado===filtroEstado
    return enBusq&&enEstado
  })
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)
  const totalVentas=pedidos.filter(p=>p.estado!=='cancelado').reduce((a,p)=>a+(p.total||0),0)
  const pendientes=pedidos.filter(p=>p.estado==='pendiente').length
  const enviados=pedidos.filter(p=>p.estado==='enviado').length

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>🛒 Pedidos</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{pedidos.length} pedidos · <span style={{color:'#5DBB63'}}>Total ventas: ${totalVentas.toFixed(2)}</span> · {pendientes} pendientes · {enviados} enviados</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={cargar} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄</button>
            <button onClick={()=>{setPedEdit({estado:'pendiente',items:[],fecha:new Date().toISOString()});setVista('nuevo')}} style={btn(G,CARD)}>+ Nuevo pedido</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:10,marginBottom:20}}>
          {[
            {label:'Total ventas',val:`$${totalVentas.toFixed(0)}`,c:'#5DBB63'},
            {label:'Pedidos',val:pedidos.length,c:G},
            {label:'Pendientes',val:pendientes,c:'#ff9966'},
            {label:'Enviados',val:enviados,c:'#64A5ED'},
            {label:'Drawback 3%',val:`$${(totalVentas*0.03).toFixed(0)}`,c:'#C9A84C'},
          ].map(s=>(
            <div key={s.label} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'12px 14px'}}>
              <div style={{fontSize:'1.3rem',fontWeight:700,color:s.c}}>{s.val}</div>
              <div style={{fontSize:'.62rem',color:'rgba(201,168,76,0.4)',marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>

        {vista==='lista'&&(
          <>
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'12px 16px',marginBottom:16,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
              <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar cliente, # pedido, email..." style={{...s.inp,width:260,flex:'none'}}/>
              <select value={filtroEstado} onChange={e=>{setFiltroEstado(e.target.value);setPag(1)}} style={{...s.inp,width:160,flex:'none'}}>
                <option value="todos">Todos los estados</option>
                {ESTADOS.map(e=><option key={e} value={e}>{ESTADO_TEXT[e]}</option>)}
              </select>
              <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>{filtrados.length} resultados</span>
            </div>

            {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
              <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:16}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.05)'}}>
                      <th style={s.th}># PEDIDO</th>
                      <th style={s.th}>CLIENTE</th>
                      <th style={s.th}>PAIS</th>
                      <th style={s.th}>TOTAL</th>
                      <th style={s.th}>PAGO</th>
                      <th style={s.th}>COURIER</th>
                      <th style={s.th}>ESTADO</th>
                      <th style={s.th}>FECHA</th>
                      <th style={s.th}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagActual.map(p=>(
                      <tr key={p._id}>
                        <td style={{...s.td,color:G,fontWeight:700}}>{p.numero||'—'}</td>
                        <td style={s.td}>
                          <div>{p.cliente}</div>
                          <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>{p.email}</div>
                        </td>
                        <td style={s.td}>{p.pais||'—'}</td>
                        <td style={{...s.td,color:'#5DBB63',fontWeight:700}}>${(p.total||0).toFixed(2)}</td>
                        <td style={{...s.td,fontSize:'.65rem'}}>{p.metodoPago||'—'}</td>
                        <td style={{...s.td,fontSize:'.65rem'}}>{p.courier||'—'}</td>
                        <td style={s.td}>
                          <select value={p.estado||'pendiente'} onChange={e=>cambiarEstado(p._id,e.target.value)}
                            style={{background:ESTADO_COLOR[p.estado]||'transparent',color:'#E8C97A',border:`1px solid ${BD}`,borderRadius:4,padding:'3px 6px',fontSize:'.65rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>
                            {ESTADOS.map(e=><option key={e} value={e}>{ESTADO_TEXT[e]}</option>)}
                          </select>
                        </td>
                        <td style={{...s.td,fontSize:'.65rem'}}>{p.fecha?new Date(p.fecha).toLocaleDateString('es-PE'):'-'}</td>
                        <td style={s.td}>
                          <div style={{display:'flex',gap:4}}>
                            <button onClick={()=>{setPedVer(p);setVista('ver')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.65rem'})}>👁️</button>
                            <button onClick={()=>{setPedEdit({...p});setVista('nuevo')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.65rem'})}>✏️</button>
                            <button onClick={()=>eliminar(p._id,p.numero||p.cliente)} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 8px',fontSize:'.65rem'})}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pagActual.length===0&&<tr><td colSpan={9} style={{...s.td,textAlign:'center',color:'rgba(201,168,76,0.3)',padding:32}}>No hay pedidos</td></tr>}
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

        {vista==='ver'&&pedVer&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>Pedido {pedVer.numero}</h2>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>{setPedEdit({...pedVer});setVista('nuevo')}} style={btn(G,CARD)}>✏️ Editar</button>
                <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>CLIENTE</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.cliente}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>EMAIL</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.email||'—'}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>WHATSAPP</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.whatsapp||'—'}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>PAIS / CIUDAD</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.pais} {pedVer.ciudad?`/ ${pedVer.ciudad}`:''}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>DIRECCION</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px',fontSize:'.8rem'}}>{pedVer.direccion||'—'}</p>
              </div>
              <div>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>ESTADO</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{ESTADO_TEXT[pedVer.estado]||pedVer.estado}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>PAGO</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.metodoPago||'—'}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>COURIER / TRACKING</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.courier||'—'} {pedVer.tracking?`#${pedVer.tracking}`:''}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>ASEGURADORA</p>
                <p style={{color:'#E8C97A',margin:'0 0 12px'}}>{pedVer.aseguradora||'—'}</p>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:4}}>DRAWBACK 3% MYPE</p>
                <p style={{color:'#5DBB63',margin:'0 0 12px',fontWeight:700}}>${(pedVer.drawback||pedVer.total*0.03||0).toFixed(2)}</p>
              </div>
            </div>
            <div style={{background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,borderRadius:8,padding:12,marginTop:8}}>
              <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',marginBottom:8}}>PRODUCTOS</p>
              {(pedVer.items||[]).map((it,i)=>(
                <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem'}}>
                  <span style={{color:'#E8C97A',fontStyle:'italic'}}>{it.nombre} {it.atributos?`(${it.atributos})`:''}</span>
                  <span style={{color:G}}>{it.cantidad}x ${it.precio} = ${(it.cantidad*it.precio).toFixed(2)}</span>
                </div>
              ))}
              <div style={{marginTop:8,textAlign:'right',fontSize:'.8rem'}}>
                <div style={{color:'rgba(201,168,76,0.5)'}}>Subtotal: ${(pedVer.subtotal||0).toFixed(2)}</div>
                <div style={{color:'rgba(201,168,76,0.5)'}}>Envío: ${(pedVer.costoEnvio||0).toFixed(2)}</div>
                <div style={{color:'rgba(201,168,76,0.5)'}}>Seguro: ${(pedVer.seguro||0).toFixed(2)}</div>
                {(pedVer.descuento||0)>0&&<div style={{color:'#ff9966'}}>Descuento: -${(pedVer.descuento||0).toFixed(2)}</div>}
                <div style={{color:'#5DBB63',fontWeight:700,fontSize:'1rem',marginTop:4}}>TOTAL: ${(pedVer.total||0).toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {(vista==='nuevo')&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:900}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{pedEdit._id?'✏️ Editar Pedido':'+ Nuevo Pedido'}</h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>CLIENTE *</label>
                <input value={pedEdit.cliente||''} onChange={e=>setPedEdit(p=>({...p,cliente:e.target.value}))} style={s.inp} placeholder="Nombre completo"/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>EMAIL</label>
                <input value={pedEdit.email||''} onChange={e=>setPedEdit(p=>({...p,email:e.target.value}))} style={s.inp} placeholder="email@ejemplo.com"/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>WHATSAPP</label>
                <input value={pedEdit.whatsapp||''} onChange={e=>setPedEdit(p=>({...p,whatsapp:e.target.value}))} style={s.inp} placeholder="+1234567890"/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>PAIS</label>
                <input value={pedEdit.pais||''} onChange={e=>setPedEdit(p=>({...p,pais:e.target.value}))} style={s.inp} placeholder="USA, China, Japan..."/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>CIUDAD</label>
                <input value={pedEdit.ciudad||''} onChange={e=>setPedEdit(p=>({...p,ciudad:e.target.value}))} style={s.inp}/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>DIRECCION</label>
                <textarea value={pedEdit.direccion||''} onChange={e=>setPedEdit(p=>({...p,direccion:e.target.value}))} style={{...s.inp,height:60,resize:'vertical' as const}}/>
              </div>
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>ESTADO</label>
                <select value={pedEdit.estado||'pendiente'} onChange={e=>setPedEdit(p=>({...p,estado:e.target.value}))} style={s.inp}>
                  {ESTADOS.map(e=><option key={e} value={e}>{ESTADO_TEXT[e]}</option>)}
                </select>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>ORIGEN</label>
                <select value={pedEdit.origen||'manual'} onChange={e=>setPedEdit(p=>({...p,origen:e.target.value}))} style={s.inp}>
                  {['web','whatsapp','instagram','facebook','tiktok','1688','ebay','xiongshu','email','manual'].map(o=><option key={o} value={o}>{o}</option>)}
                </select>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>METODO DE PAGO</label>
                <select value={pedEdit.metodoPago||''} onChange={e=>setPedEdit(p=>({...p,metodoPago:e.target.value}))} style={s.inp}>
                  <option value="">-- Selecciona --</option>
                  {['izipay','stripe','worldfirst','katenos','alipay','wechat','wise','payoneer','western_union','moneygram','google_pay','transferencia'].map(m=><option key={m} value={m}>{m}</option>)}
                </select>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>COURIER</label>
                <select value={pedEdit.courier||''} onChange={e=>setPedEdit(p=>({...p,courier:e.target.value}))} style={s.inp}>
                  <option value="">-- Selecciona --</option>
                  {['DHL','FedEx','UPS','Aramex','EMS Internacional','Exporta Facil SERPOST','SERPOST Peru'].map(c=><option key={c} value={c}>{c}</option>)}
                </select>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>ASEGURADORA</label>
                <select value={pedEdit.aseguradora||''} onChange={e=>setPedEdit(p=>({...p,aseguradora:e.target.value}))} style={s.inp}>
                  <option value="">-- Selecciona --</option>
                  {["Ship Insurance","Insurtech Digital","IATA Cargo","Lloyd's of London"].map(a=><option key={a} value={a}>{a}</option>)}
                </select>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>TRACKING #</label>
                <input value={pedEdit.tracking||''} onChange={e=>setPedEdit(p=>({...p,tracking:e.target.value}))} style={s.inp}/>
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginTop:16}}>
              {[
                {label:'SUBTOTAL USD',key:'subtotal'},
                {label:'ENVIO USD',key:'costoEnvio'},
                {label:'SEGURO USD',key:'seguro'},
                {label:'DESCUENTO USD',key:'descuento'},
              ].map(f=>(
                <div key={f.key}>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>{f.label}</label>
                  <input type="number" value={(pedEdit as any)[f.key]||''} onChange={e=>setPedEdit(p=>({...p,[f.key]:parseFloat(e.target.value)||0}))} style={s.inp}/>
                </div>
              ))}
            </div>
            <div style={{marginTop:10,padding:10,background:'rgba(201,168,76,0.05)',borderRadius:6,display:'flex',gap:20,fontSize:'.8rem'}}>
              <span style={{color:'rgba(201,168,76,0.5)'}}>Total: <span style={{color:'#5DBB63',fontWeight:700}}>${((pedEdit.subtotal||0)+(pedEdit.costoEnvio||0)+(pedEdit.seguro||0)-(pedEdit.descuento||0)).toFixed(2)}</span></span>
              <span style={{color:'rgba(201,168,76,0.5)'}}>Drawback 3%: <span style={{color:G,fontWeight:700}}>${(((pedEdit.subtotal||0)+(pedEdit.costoEnvio||0))*0.03).toFixed(2)}</span></span>
            </div>
            <div style={{marginTop:10}}>
              <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOTAS INTERNAS</label>
              <textarea value={pedEdit.notas||''} onChange={e=>setPedEdit(p=>({...p,notas:e.target.value}))} style={{...s.inp,height:60,resize:'vertical' as const}}/>
            </div>
            <div style={{marginTop:16,display:'flex',gap:10}}>
              <button onClick={guardar} disabled={guardando} style={btn(G,CARD,{padding:'10px 28px',fontSize:'.85rem',opacity:guardando?0.7:1})}>{guardando?'Guardando...':'💾 Guardar pedido'}</button>
              <button onClick={()=>setVista('lista')} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'10px 20px'})}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
