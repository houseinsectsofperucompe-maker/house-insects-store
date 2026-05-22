'use client'
import { useState } from 'react'

type ItemCarrito = { n:string; p:number; qty:number; rubro:string }
type Courier = 'exportafacil'|'ems'|'dhl'|'fedex'|''
type Seguro = 'lloyds'|'ship'|'insurtech'|''

const COURIER_INFO = {
  exportafacil:{nombre:'Exporta Fácil',tiempo:'15-30 días',icono:'📦'},
  ems:{nombre:'EMS Serpost',tiempo:'7-15 días',icono:'✈️'},
  dhl:{nombre:'DHL Express',tiempo:'3-5 días',icono:'🚀'},
  fedex:{nombre:'FedEx Intl.',tiempo:'3-5 días',icono:'🚀'},
}
const SEGURO_INFO = {
  lloyds:{nombre:"Lloyd's London",icono:'🛡️'},
  ship:{nombre:'Ship Insurance',icono:'🚢'},
  insurtech:{nombre:'Insurtech Digital',icono:'📲'},
}
function getPermisos(rubros:string[]){
  const s=new Set(rubros)
  return {
    serfor:['especimenes','cuadros','nocturnas','coleoptera','rarezas','maderas'].some(r=>s.has(r)),
    fitosanitario:['especimenes','cuadros','nocturnas','coleoptera','rarezas','semillas','hongos','frutas','alimentos'].some(r=>s.has(r)),
    digesa:['semillas','hongos','frutas','alimentos','esencias'].some(r=>s.has(r)),
  }
}

interface Props {
  items:ItemCarrito[]
  onClose:()=>void
  onUpdateItems:(items:ItemCarrito[])=>void
  onPagar:(data:{items:ItemCarrito[];total:number;courier:string;seguro:string;email:string})=>void
}

export default function CarritoCompras({items,onClose,onUpdateItems,onPagar}:Props){
  const [courier,setCourier]=useState<Courier>('')
  const [seguro,setSeguro]=useState<Seguro>('')
  const [email,setEmail]=useState('')
  const [nombre,setNombre]=useState('')
  const [pais,setPais]=useState('')
  const [paso,setPaso]=useState<'carrito'|'liquidacion'|'pago'>('carrito')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')

  const actualizarQty=(idx:number,qty:number)=>{
    if(qty<=0) onUpdateItems(items.filter((_,i)=>i!==idx))
    else onUpdateItems(items.map((item,i)=>i===idx?{...item,qty}:item))
  }
  const subtotal=items.reduce((a,i)=>a+i.p*i.qty,0)
  const permisos=getPermisos([...new Set(items.map(i=>i.rubro))])
  const costoTramites=(permisos.serfor?100:0)+(permisos.fitosanitario?100:0)+(permisos.digesa?80:0)
  const costoSeguro=seguro?Math.round(subtotal*0.02):0
  const total=subtotal+costoTramites+costoSeguro
  const MINIMO=300

  const handlePagar=async()=>{
    if(!email||!nombre||!pais){setError('Completa todos los campos');return}
    if(!courier){setError('Selecciona un courier');return}
    setLoading(true);setError('')
    try{
      const res=await fetch('/api/izipay/create-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:total,customerEmail:email,customerName:nombre,currency:'USD'})})
      const data=await res.json()
      if(data.success) onPagar({items,total,courier,seguro,email})
      else setError(data.error||'Error al procesar')
    }catch{setError('Error de conexión')}
    finally{setLoading(false)}
  }

  const G='#C9A84C',T='#E8C97A',BG='#1A1209'
  const qBtn={background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:4,width:28,height:28,color:G,cursor:'pointer',fontSize:'1rem',display:'flex' as const,alignItems:'center' as const,justifyContent:'center' as const,fontFamily:'Georgia,serif',flexShrink:0 as const}
  const mainBtn=(ok=true)=>({background:ok?G:'rgba(201,168,76,0.08)',color:ok?BG:'rgba(232,201,122,0.3)',border:`1px solid ${ok?G:'rgba(201,168,76,0.15)'}`,borderRadius:6,padding:'11px 0',fontWeight:700,cursor:ok?'pointer':'not-allowed',fontSize:'.85rem',fontFamily:'Georgia,serif',width:'100%',marginBottom:6})
  const secBtn={background:'transparent',color:G,border:'1px solid rgba(201,168,76,0.3)',borderRadius:6,padding:'9px 0',fontWeight:700,cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif',width:'100%',marginBottom:6}
  const optBtn=(a:boolean)=>({background:a?'rgba(201,168,76,0.15)':'rgba(201,168,76,0.04)',border:`1px solid ${a?G:'rgba(201,168,76,0.15)'}`,borderRadius:6,padding:'8px 10px',cursor:'pointer',color:a?T:'rgba(232,201,122,0.4)',fontFamily:'Georgia,serif',fontSize:'.7rem',textAlign:'left' as const,transition:'all 0.15s'})
  const inp={width:'100%',padding:'9px 12px',background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:6,color:T,fontSize:'.82rem',fontFamily:'Georgia,serif',outline:'none',boxSizing:'border-box' as const,marginBottom:8}
  const lbl={color:'rgba(232,201,122,0.35)',fontSize:'.6rem',letterSpacing:'.08em',marginBottom:6,display:'block' as const}
  const row={display:'flex',justifyContent:'space-between',padding:'4px 0'}

  return(
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:299}}/>
      <div style={{position:'fixed',top:0,right:0,bottom:0,width:'100%',maxWidth:420,background:'linear-gradient(160deg,#1A1209 0%,#221800 100%)',borderLeft:'1px solid rgba(201,168,76,0.25)',zIndex:300,display:'flex',flexDirection:'column',boxShadow:'-8px 0 40px rgba(0,0,0,0.6)',fontFamily:'Georgia,serif'}}>
        {/* Header */}
        <div style={{padding:'18px 20px',borderBottom:'1px solid rgba(201,168,76,0.15)',display:'flex',justifyContent:'space-between',alignItems:'center',flexShrink:0}}>
          <div>
            <div style={{color:T,fontWeight:700,fontSize:'1rem'}}>
              {paso==='carrito'&&'🛒 Carrito'}{paso==='liquidacion'&&'📋 Liquidación'}{paso==='pago'&&'💳 Pago'}
            </div>
            <div style={{color:'rgba(232,201,122,0.3)',fontSize:'.58rem',marginTop:2}}>HOUSE INSECTS OF PERU · RUC 20447397804</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{display:'flex',gap:4}}>
              {['carrito','liquidacion','pago'].map((p,i)=>(
                <div key={p} style={{width:8,height:8,borderRadius:'50%',background:['carrito','liquidacion','pago'].indexOf(paso)>=i?G:'rgba(201,168,76,0.2)'}}/>
              ))}
            </div>
            <button onClick={onClose} style={{background:'none',border:'none',color:'rgba(232,201,122,0.4)',fontSize:'1.3rem',cursor:'pointer'}}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{flex:1,overflowY:'auto',padding:'16px 20px'}}>

          {paso==='carrito'&&(
            <>
              {items.length===0?(
                <div style={{textAlign:'center',padding:'40px 20px'}}>
                  <div style={{fontSize:'3rem',marginBottom:12}}>🦋</div>
                  <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.8rem'}}>Tu carrito está vacío</p>
                </div>
              ):(
                <>
                  {items.map((item,idx)=>(
                    <div key={idx} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid rgba(201,168,76,0.07)'}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{color:T,fontSize:'.72rem',fontStyle:'italic',lineHeight:1.3,marginBottom:2}}>{item.n}</div>
                        <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem'}}>${item.p} USD c/u</div>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:6,flexShrink:0}}>
                        <button style={qBtn} onClick={()=>actualizarQty(idx,item.qty-1)}>−</button>
                        <span style={{color:T,fontSize:'.85rem',minWidth:18,textAlign:'center',fontWeight:700}}>{item.qty}</span>
                        <button style={qBtn} onClick={()=>actualizarQty(idx,item.qty+1)}>+</button>
                        <span style={{color:G,fontWeight:700,fontSize:'.8rem',minWidth:52,textAlign:'right'}}>${(item.p*item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{padding:'12px 0',borderTop:'1px solid rgba(201,168,76,0.15)',marginTop:8}}>
                    <div style={{...row}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.75rem'}}>Subtotal</span><span style={{color:T,fontWeight:700}}>${subtotal.toFixed(2)} USD</span></div>
                  </div>
                  {subtotal<MINIMO&&(
                    <div style={{background:'rgba(255,80,80,0.07)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:6,padding:'10px 12px',marginTop:6}}>
                      <p style={{color:'#ff9090',fontSize:'.72rem',margin:0,lineHeight:1.5}}>⚠️ Mínimo exportación: <strong>$300 USD</strong><br/>Faltan <strong>${(MINIMO-subtotal).toFixed(2)}</strong></p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {paso==='liquidacion'&&(
            <>
              <div style={{marginBottom:14}}>
                <span style={lbl}>PRODUCTOS ({items.length})</span>
                {items.map((item,idx)=>(
                  <div key={idx} style={{...row}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.68rem',fontStyle:'italic'}}>{item.qty}× {item.n}</span><span style={{color:G,fontSize:'.68rem',fontWeight:700}}>${(item.p*item.qty).toFixed(2)}</span></div>
                ))}
              </div>
              <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'10px 12px',marginBottom:14}}>
                <span style={lbl}>TRÁMITES OBLIGATORIOS</span>
                {permisos.serfor&&<div style={{...row}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.72rem'}}>🌿 SERFOR · CITES</span><span style={{color:G,fontSize:'.72rem'}}>$100</span></div>}
                {permisos.fitosanitario&&<div style={{...row}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.72rem'}}>🔬 Fitosanitario SENASA</span><span style={{color:G,fontSize:'.72rem'}}>$100</span></div>}
                {permisos.digesa&&<div style={{...row}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.72rem'}}>📋 DIGESA</span><span style={{color:G,fontSize:'.72rem'}}>$80</span></div>}
                <div style={{color:'rgba(232,201,122,0.25)',fontSize:'.6rem',marginTop:6}}>⏱ Expedición: 5-9 días hábiles</div>
              </div>
              <div style={{marginBottom:14}}>
                <span style={lbl}>COURIER *</span>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                  {Object.entries(COURIER_INFO).map(([key,info])=>(
                    <button key={key} onClick={()=>setCourier(key as Courier)} style={optBtn(courier===key)}>
                      <div style={{fontSize:'1rem',marginBottom:2}}>{info.icono}</div>
                      <div style={{fontWeight:700,fontSize:'.68rem'}}>{info.nombre}</div>
                      <div style={{fontSize:'.58rem',opacity:0.6,marginTop:1}}>⏱ {info.tiempo}</div>
                    </button>
                  ))}
                </div>
                <div style={{color:'rgba(232,201,122,0.25)',fontSize:'.6rem',marginTop:5}}>* Costo por WhatsApp según peso/destino</div>
              </div>
              <div style={{marginBottom:14}}>
                <span style={lbl}>🛡️ SEGURO DE ENVÍO (OPCIONAL)</span>
                <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:6,padding:'8px 10px',marginBottom:8}}>
                  <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',margin:0,lineHeight:1.5}}>Para mayor tranquilidad, te ofrecemos seguro internacional. Tu colección amazónica merece llegar perfecta a su destino.</p>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:5}}>
                  {Object.entries(SEGURO_INFO).map(([key,info])=>(
                    <button key={key} onClick={()=>setSeguro(seguro===key?'':key as Seguro)} style={optBtn(seguro===key)}>
                      <div>{info.icono}</div>
                      <div style={{fontSize:'.6rem',fontWeight:700,marginTop:2}}>{info.nombre}</div>
                    </button>
                  ))}
                </div>
                {seguro&&<div style={{color:G,fontSize:'.68rem',textAlign:'right',marginTop:4}}>Seguro 2%: +${costoSeguro} USD</div>}
              </div>
              <div style={{background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:'12px 14px',marginBottom:8}}>
                <span style={lbl}>LIQUIDACIÓN DE COMPRA</span>
                <div style={{...row}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.72rem'}}>Productos</span><span style={{color:T,fontSize:'.72rem'}}>${subtotal.toFixed(2)}</span></div>
                <div style={{...row}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.72rem'}}>Trámites</span><span style={{color:T,fontSize:'.72rem'}}>${costoTramites}</span></div>
                {seguro&&<div style={{...row}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.72rem'}}>Seguro</span><span style={{color:T,fontSize:'.72rem'}}>${costoSeguro}</span></div>}
                <div style={{...row}}><span style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}>Courier</span><span style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem'}}>A cotizar</span></div>
                <div style={{borderTop:'1px solid rgba(201,168,76,0.2)',marginTop:8,paddingTop:8,display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:T,fontWeight:700,fontSize:'.85rem'}}>TOTAL HOY</span>
                  <span style={{color:G,fontWeight:700,fontSize:'1.1rem'}}>${total.toFixed(2)} USD</span>
                </div>
                <div style={{color:'rgba(232,201,122,0.2)',fontSize:'.58rem',marginTop:4}}>Ley Amazónica N°27037 · Exonerado IGV · MYPE</div>
              </div>
              <div style={{textAlign:'center',marginBottom:6}}>
                <div style={{color:'rgba(232,201,122,0.25)',fontSize:'.58rem',marginBottom:4}}>FORMAS DE PAGO</div>
                <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap'}}>
                  {['VISA','MASTERCARD','AMEX','DINERS','VISA DÉB','MC DÉB'].map(c=>(
                    <span key={c} style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:3,padding:'2px 6px',color:'rgba(232,201,122,0.5)',fontSize:'.55rem'}}>{c}</span>
                  ))}
                </div>
              </div>
            </>
          )}

          {paso==='pago'&&(
            <>
              <span style={lbl}>DATOS DE CONTACTO Y ENVÍO</span>
              <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo" style={inp}/>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Correo electrónico" type="email" style={inp}/>
              <input value={pais} onChange={e=>setPais(e.target.value)} placeholder="País de destino" style={inp}/>
              <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:'10px 12px',marginTop:8,marginBottom:12}}>
                <div style={{...row}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.72rem'}}>Total a pagar</span><span style={{color:G,fontWeight:700}}>${total.toFixed(2)} USD</span></div>
                {courier&&<div style={{...row}}><span style={{color:'rgba(232,201,122,0.4)',fontSize:'.68rem'}}>Courier</span><span style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem'}}>{COURIER_INFO[courier as keyof typeof COURIER_INFO]?.nombre}</span></div>}
              </div>
              {error&&<div style={{background:'rgba(255,80,80,0.07)',border:'1px solid rgba(255,80,80,0.2)',borderRadius:6,padding:'8px 12px',marginBottom:10}}><p style={{color:'#ff9090',fontSize:'.72rem',margin:0}}>⚠️ {error}</p></div>}
              <div style={{textAlign:'center',marginTop:8}}>
                <div style={{color:'rgba(232,201,122,0.2)',fontSize:'.58rem'}}>🔒 Pago seguro · Izipay · VISA · MC · AMEX · DINERS</div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{padding:'16px 20px',borderTop:'1px solid rgba(201,168,76,0.15)',flexShrink:0}}>
          {paso==='carrito'&&<>
            <button onClick={()=>setPaso('liquidacion')} disabled={subtotal<MINIMO||items.length===0} style={mainBtn(subtotal>=MINIMO&&items.length>0)}>Ver liquidación →</button>
            <button onClick={onClose} style={secBtn}>Seguir comprando</button>
          </>}
          {paso==='liquidacion'&&<>
            <button onClick={()=>setPaso('pago')} disabled={!courier} style={mainBtn(!!courier)}>Continuar al pago →</button>
            <button onClick={()=>setPaso('carrito')} style={secBtn}>← Volver al carrito</button>
          </>}
          {paso==='pago'&&<>
            <button onClick={handlePagar} disabled={loading} style={mainBtn(!loading)}>{loading?'Procesando...':`💳 Pagar $${total.toFixed(2)} USD`}</button>
            <button onClick={()=>setPaso('liquidacion')} style={secBtn}>← Volver</button>
          </>}
        </div>
      </div>
    </>
  )
}
