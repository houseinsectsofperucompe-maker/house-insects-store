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

const PAGOS_LIST=['izipay','stripe','worldfirst','katenos','alipay','wechat','unionpay','1688','xiongshu','kakaopay','naverpay','toss','promptpay','truemoney','linepay','payme_hk','fps_hk','wise','payoneer','western_union','moneygram','google_pay','ebay_payments']
const COURIERS_LIST=['DHL','FedEx','UPS','Aramex','EMS Internacional','Exporta Facil SERPOST','SERPOST Peru','SUNAT Digital']
const ASEG_LIST=["Ship Insurance","Insurtech Digital","IATA Cargo","Lloyd's of London"]

export default function LogisticaPage(){
  const [tab,setTab]=useState<'transportistas'|'aseguradoras'|'pagos'>('transportistas')
  const [items,setItems]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'nuevo'>('lista')
  const [edit,setEdit]=useState<any>({})
  const [guardando,setGuardando]=useState(false)
  const [msg,setMsg]=useState('')

  useEffect(()=>{cargar()},[tab])

  const cargar=async()=>{
    setLoading(true)
    try{
      const r=await fetch(`/api/sanity-read?type=${tab==='transportistas'?'transportista':tab==='aseguradoras'?'aseguradora':'pagoConfig'}`)
      const d=await r.json()
      setItems(Array.isArray(d)?d:[])
    }catch(e){}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const guardar=async()=>{
    setGuardando(true)
    const type=tab==='transportistas'?'transportista':tab==='aseguradoras'?'aseguradora':'pagoConfig'
    const action=edit._id?'updateLogistica':'createLogistica'
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data:{...edit,_type:type}})})
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

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8,paddingRight:300}}>
          <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>🚚 Logística & Pagos</h1>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={()=>{setEdit({activo:true});setVista('nuevo')}} style={btn(G,CARD)}>+ Nuevo</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        <div style={{display:'flex',gap:4,marginBottom:16,borderBottom:`1px solid ${BD}`,paddingBottom:8}}>
          {([['transportistas','🚚 Transportistas'],['aseguradoras','🛡️ Aseguradoras'],['pagos','💳 Métodos de Pago']] as const).map(([t,l])=>(
            <button key={t} onClick={()=>{setTab(t);setVista('lista')}} style={btn(tab===t?G:'transparent',tab===t?CARD:G,{border:`1px solid ${tab===t?G:BD}`,padding:'6px 16px'})}>
              {l} ({tab===t?items.length:'?'})
            </button>
          ))}
        </div>

        {vista==='lista'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'rgba(201,168,76,0.05)'}}>
                  <th style={s.th}>NOMBRE</th>
                  <th style={s.th}>{tab==='transportistas'?'CODIGO':tab==='aseguradoras'?'TIPO':'TIPO/REGION'}</th>
                  <th style={s.th}>{tab==='transportistas'?'TARIFA BASE':tab==='aseguradoras'?'COBERTURA':'COMISION %'}</th>
                  <th style={s.th}>ESTADO</th>
                  <th style={s.th}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {loading?<tr><td colSpan={5} style={{...s.td,textAlign:'center',padding:32,color:'rgba(201,168,76,0.3)'}}>⏳ Cargando...</td></tr>:
                items.map((it:any)=>(
                  <tr key={it._id}>
                    <td style={{...s.td,fontWeight:700}}>{it.nombre}</td>
                    <td style={{...s.td,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>{it.codigo||it.tipo||it.region||'—'}</td>
                    <td style={{...s.td,color:G}}>{tab==='transportistas'?`$${it.tarifaBase||0}`:tab==='aseguradoras'?`$${it.cobertura||0} (${it.porcentaje||0}%)`:`${it.comision||0}%`}</td>
                    <td style={s.td}><span style={{background:it.activo?'rgba(93,187,99,0.2)':'rgba(255,80,80,0.2)',color:it.activo?'#5DBB63':'#ff5050',padding:'3px 8px',borderRadius:10,fontSize:'.6rem',fontWeight:700}}>{it.activo?'ACTIVO':'INACTIVO'}</span></td>
                    <td style={s.td}>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>{setEdit({...it});setVista('nuevo')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.65rem'})}>✏️</button>
                        <button onClick={()=>eliminar(it._id,it.nombre)} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 8px',fontSize:'.65rem'})}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading&&items.length===0&&<tr><td colSpan={5} style={{...s.td,textAlign:'center',padding:32,color:'rgba(201,168,76,0.3)'}}>No hay registros — agrega el primero</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {vista==='nuevo'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:700}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>{edit._id?'✏️ Editar':'+ Nuevo'} {tab==='transportistas'?'Transportista':tab==='aseguradoras'?'Aseguradora':'Método de Pago'}</h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE *</label>
                <input value={edit.nombre||''} onChange={e=>setEdit((p:any)=>({...p,nombre:e.target.value}))} style={s.inp} placeholder="Nombre"/>

                {tab==='transportistas'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>CODIGO</label>
                  <input value={edit.codigo||''} onChange={e=>setEdit((p:any)=>({...p,codigo:e.target.value}))} style={s.inp} placeholder="DHL, FedEx..."/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>TARIFA BASE USD</label>
                  <input type="number" value={edit.tarifaBase||''} onChange={e=>setEdit((p:any)=>({...p,tarifaBase:parseFloat(e.target.value)||0}))} style={s.inp}/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>TIEMPO ENTREGA</label>
                  <input value={edit.tiempoEntrega||''} onChange={e=>setEdit((p:any)=>({...p,tiempoEntrega:e.target.value}))} style={s.inp} placeholder="3-5 días hábiles"/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>URL RASTREO</label>
                  <input value={edit.seguimiento||''} onChange={e=>setEdit((p:any)=>({...p,seguimiento:e.target.value}))} style={s.inp} placeholder="https://..."/>
                </>}

                {tab==='aseguradoras'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>TIPO</label>
                  <select value={edit.tipo||''} onChange={e=>setEdit((p:any)=>({...p,tipo:e.target.value}))} style={s.inp}>
                    <option value="">-- Selecciona --</option>
                    {['ship','insurtech','iata','lloyds'].map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>COBERTURA MAX USD</label>
                  <input type="number" value={edit.cobertura||''} onChange={e=>setEdit((p:any)=>({...p,cobertura:parseFloat(e.target.value)||0}))} style={s.inp}/>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>PORCENTAJE SOBRE VALOR %</label>
                  <input type="number" value={edit.porcentaje||''} onChange={e=>setEdit((p:any)=>({...p,porcentaje:parseFloat(e.target.value)||0}))} style={s.inp}/>
                </>}

                {tab==='pagos'&&<>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>TIPO</label>
                  <select value={edit.tipo||''} onChange={e=>setEdit((p:any)=>({...p,tipo:e.target.value}))} style={s.inp}>
                    <option value="">-- Selecciona --</option>
                    {PAGOS_LIST.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>REGION</label>
                  <select value={edit.region||''} onChange={e=>setEdit((p:any)=>({...p,region:e.target.value}))} style={s.inp}>
                    {['global','latam','china','korea','thailand','taiwan_hk','europa','usa','apac'].map(r=><option key={r} value={r}>{r}</option>)}
                  </select>
                  <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>COMISION %</label>
                  <input type="number" value={edit.comision||0} onChange={e=>setEdit((p:any)=>({...p,comision:parseFloat(e.target.value)||0}))} style={s.inp}/>
                </>}
              </div>

              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>INSTRUCCIONES / NOTAS</label>
                <textarea value={edit.instrucciones||edit.cuentaDatos||''} onChange={e=>setEdit((p:any)=>({...p,instrucciones:e.target.value,cuentaDatos:e.target.value}))} style={{...s.inp,height:120,resize:'vertical' as const}} placeholder="Instrucciones para el cliente..."/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>LOGO URL</label>
                <input value={edit.logo||edit.logoUrl||''} onChange={e=>setEdit((p:any)=>({...p,logo:e.target.value,logoUrl:e.target.value}))} style={s.inp} placeholder="https://..."/>
                {(edit.logo||edit.logoUrl)&&<img src={edit.logo||edit.logoUrl} style={{width:80,height:40,objectFit:'contain',marginTop:6,border:`1px solid ${BD}`,borderRadius:4,background:'#050501'}}/>}
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginTop:12}}>
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
