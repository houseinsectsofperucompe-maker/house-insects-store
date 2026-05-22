'use client'
import { useState } from 'react'
type Item={n:string;p:number;qty:number;rubro:string}
type C='exportafacil'|'ems'|'dhl'|'fedex'|'ups'|'aramex'|''
type S='lloyds'|'ship'|'insurtech'|''
const CI={exportafacil:{n:'Exporta Fácil',s:'Serpost · Económico',t:'15-30 días',i:'📦'},ems:{n:'EMS Serpost',s:'Express Internacional',t:'7-15 días',i:'✈️'},dhl:{n:'DHL Express',s:'Premium Mundial',t:'3-5 días',i:'🚀'},fedex:{n:'FedEx Intl.',s:'Premium Mundial',t:'3-5 días',i:'🚀'},ups:{n:'UPS Worldwide',s:'Confiable Global',t:'3-7 días',i:'📮'},aramex:{n:'Aramex',s:'Medio Oriente & Asia',t:'5-10 días',i:'🌍'}}
const SI={lloyds:{n:"Lloyd's London",s:'Premium Internacional',i:'🛡️'},ship:{n:'Ship Insurance',s:'Marítimo & Carga',i:'🚢'},insurtech:{n:'Insurtech Digital',s:'Cobertura Digital',i:'📲'}}
function permisos(r:string[]){const s=new Set(r);return{serfor:['especimenes','cuadros','nocturnas','coleoptera','rarezas','maderas'].some(x=>s.has(x)),fito:['especimenes','cuadros','nocturnas','coleoptera','rarezas','semillas','hongos','frutas','alimentos'].some(x=>s.has(x)),digesa:['semillas','hongos','frutas','alimentos','esencias'].some(x=>s.has(x))}}
function desc(t:number){if(t>=2500)return 0.20;if(t>=1000)return 0.15;if(t>=500)return 0.10;if(t>=300)return 0.05;return 0}
interface P{items:Item[];onClose:()=>void;onUpdateItems:(i:Item[])=>void;onPagar:(d:any)=>void}
export default function CarritoCompras({items,onClose,onUpdateItems,onPagar}:P){
const [courier,setCourier]=useState<C>('')
const [seguro,setSeguro]=useState<S>('')
const [email,setEmail]=useState('')
const [nombre,setNombre]=useState('')
const [pais,setPais]=useState('')
const [ciudad,setCiudad]=useState('')
const [direccion,setDireccion]=useState('')
const [codigoPostal,setCodigoPostal]=useState('')
const [telefono,setTelefono]=useState('')
const [formToken,setFormToken]=useState('')
const [paso,setPaso]=useState<'carrito'|'orden'|'pago'>('carrito')
const [loading,setLoading]=useState(false)
const [error,setError]=useState('')
const upd=(idx:number,qty:number)=>{if(qty<=0)onUpdateItems(items.filter((_,i)=>i!==idx));else onUpdateItems(items.map((x,i)=>i===idx?{...x,qty}:x))}
const sub=items.reduce((a,i)=>a+i.p*i.qty,0)
const dp=desc(sub);const da=Math.round(sub*dp*100)/100
const sub2=sub-da
const pm=permisos([...new Set(items.map(i=>i.rubro))])
const ct=(pm.serfor?100:0)+(pm.fito?100:0)+(pm.digesa?80:0)
const cs=seguro?Math.round(sub2*0.02):0
const total=sub2+ct+cs
const piezas=items.reduce((a,i)=>a+i.qty,0)
const peso=(piezas*0.1+0.5).toFixed(1)
const G='#C9A84C',T='#E8C97A',BG='#1A1209'
const inp={width:'100%',padding:'12px 14px',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:8,color:T,fontSize:'.9rem',fontFamily:'Georgia,serif',outline:'none',boxSizing:'border-box' as const,marginBottom:10}
const pagar=async()=>{
if(!email||!nombre||!pais||!ciudad||!direccion||!telefono){setError('Completa todos los campos obligatorios (*)');return}
if(!courier){setError('Selecciona un courier');return}
setLoading(true);setError('')
try{const r=await fetch('/api/izipay/create-payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:total,customerEmail:email,customerName:nombre,currency:'USD'})})
const d=await r.json()
if(d.success)onPagar({items,total,courier,seguro,email})
else setError(d.error||'Error al procesar')}
catch{setError('Error de conexión')}finally{setLoading(false)}}
return(<>
<div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:299}}/>
<div style={{position:'fixed',top:0,right:0,bottom:0,width:'100%',maxWidth:460,background:'linear-gradient(160deg,#1A1209,#221800)',borderLeft:'1px solid rgba(201,168,76,0.3)',zIndex:300,display:'flex',flexDirection:'column',boxShadow:'-8px 0 48px rgba(0,0,0,0.7)',fontFamily:'Georgia,serif'}}>
<div style={{padding:'20px 24px 16px',borderBottom:'1px solid rgba(201,168,76,0.15)',flexShrink:0}}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
<div>
<div style={{color:T,fontWeight:700,fontSize:'1.2rem',marginBottom:2}}>{paso==='carrito'?'🛒 Mi Carrito':paso==='orden'?'📋 Mi Orden':'💳 Completar Compra'}</div>
<div style={{color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.06em'}}>HOUSE INSECTS OF PERU · RUC 20447397804</div>
</div>
<div style={{display:'flex',alignItems:'center',gap:12}}>
<div style={{display:'flex',gap:5}}>{(['carrito','orden','pago']).map((p,i)=><div key={p} style={{width:10,height:10,borderRadius:'50%',background:(['carrito','orden','pago']).indexOf(paso)>=i?G:'rgba(201,168,76,0.2)'}}/>)}</div>
<button onClick={onClose} style={{background:'none',border:'none',color:'rgba(232,201,122,0.5)',fontSize:'1.5rem',cursor:'pointer'}}>✕</button>
</div></div></div>
<div style={{flex:1,overflowY:'auto',padding:'20px 24px'}}>
{paso==='carrito'&&(<>
{items.length===0?(<div style={{textAlign:'center',padding:'60px 20px'}}><img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:"contain",marginBottom:16}} /><p style={{color:'rgba(232,201,122,0.4)',fontSize:'1rem'}}>Tu carrito está vacío</p></div>):(<>
{items.map((item,idx)=>(<div key={idx} style={{display:'flex',alignItems:'center',gap:12,padding:'14px 0',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
<div style={{flex:1,minWidth:0}}><div style={{color:T,fontSize:'.85rem',fontStyle:'italic',lineHeight:1.4,marginBottom:3}}>{item.n}</div><div style={{color:'rgba(232,201,122,0.45)',fontSize:'.72rem'}}>${item.p} USD c/u</div></div>
<div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
<button onClick={()=>upd(idx,item.qty-1)} style={{background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:6,width:32,height:32,color:G,cursor:'pointer',fontSize:'1.1rem',fontFamily:'Georgia,serif'}}>−</button>
<span style={{color:T,fontSize:'1rem',minWidth:24,textAlign:'center',fontWeight:700}}>{item.qty}</span>
<button onClick={()=>upd(idx,item.qty+1)} style={{background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:6,width:32,height:32,color:G,cursor:'pointer',fontSize:'1.1rem',fontFamily:'Georgia,serif'}}>+</button>
<span style={{color:G,fontWeight:700,fontSize:'.9rem',minWidth:60,textAlign:'right'}}>${(item.p*item.qty).toFixed(2)}</span>
</div></div>))}
<div style={{padding:'16px 0',borderTop:'1px solid rgba(201,168,76,0.15)',marginTop:8}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.85rem'}}>Subtotal ({piezas} piezas)</span><span style={{color:T,fontWeight:700,fontSize:'.95rem'}}>${sub.toFixed(2)} USD</span></div>
{dp>0&&<div style={{display:'flex',justifyContent:'space-between',background:'rgba(46,160,67,0.1)',border:'1px solid rgba(46,160,67,0.25)',borderRadius:6,padding:'8px 12px'}}><span style={{color:'#7ec87e',fontSize:'.82rem'}}>🎉 Descuento por volumen ({(dp*100).toFixed(0)}%)</span><span style={{color:'#7ec87e',fontWeight:700,fontSize:'.82rem'}}>−${da.toFixed(2)}</span></div>}
</div>
<div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'12px 14px',marginBottom:12}}>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>💰 DESCUENTOS POR VOLUMEN</div>
{[['$300-$499','5%'],['$500-$999','10%'],['$1,000-$2,499','15%'],['$2,500+','20%']].map(([r,d])=><div key={r} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:'1px solid rgba(201,168,76,0.06)'}}><span style={{color:'rgba(232,201,122,0.55)',fontSize:'.78rem'}}>{r}</span><span style={{color:G,fontSize:'.78rem',fontWeight:700}}>{d}</span></div>)}
</div>
{sub<300&&<div style={{background:'rgba(255,80,80,0.07)',border:'1px solid rgba(255,80,80,0.25)',borderRadius:8,padding:'12px 14px'}}><p style={{color:'#ff9090',fontSize:'.82rem',margin:0,lineHeight:1.6}}>⚠️ <strong>Pedido mínimo: $300 USD</strong><br/>Faltan <strong>${(300-sub).toFixed(2)}</strong></p></div>}
</>)}</>)}
{paso==='orden'&&(<>
<div style={{marginBottom:20}}><div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.08em',marginBottom:10}}>PRODUCTOS EN TU ORDEN</div>
{items.map((x,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.07)'}}><span style={{color:'rgba(232,201,122,0.7)',fontSize:'.8rem',fontStyle:'italic'}}>{x.qty}× {x.n}</span><span style={{color:G,fontSize:'.8rem',fontWeight:700}}>${(x.p*x.qty).toFixed(2)}</span></div>)}
{dp>0&&<div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',color:'#7ec87e'}}><span style={{fontSize:'.8rem'}}>🎉 Descuento {(dp*100).toFixed(0)}%</span><span style={{fontSize:'.8rem',fontWeight:700}}>−${da.toFixed(2)}</span></div>}
</div>
<div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:'14px 16px',marginBottom:20}}>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.08em',marginBottom:10}}>📋 TRÁMITES DE EXPORTACIÓN (OBLIGATORIOS)</div>
{pm.serfor&&<div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.08)'}}><div><div style={{color:T,fontSize:'.82rem'}}>🌿 SERFOR · Permiso CITES</div><div style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem'}}>Autorización exportación</div></div><span style={{color:G,fontSize:'.9rem',fontWeight:700}}>$100</span></div>}
{pm.fito&&<div style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(201,168,76,0.08)'}}><div><div style={{color:T,fontSize:'.82rem'}}>🔬 Fitosanitario SENASA</div><div style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem'}}>Certificado sanitario internacional</div></div><span style={{color:G,fontSize:'.9rem',fontWeight:700}}>$100</span></div>}
{pm.digesa&&<div style={{display:'flex',justifyContent:'space-between',padding:'6px 0'}}><div><div style={{color:T,fontSize:'.82rem'}}>📋 DIGESA</div><div style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem'}}>Autorización sanitaria</div></div><span style={{color:G,fontSize:'.9rem',fontWeight:700}}>$80</span></div>}
<div style={{color:'rgba(232,201,122,0.25)',fontSize:'.68rem',marginTop:8}}>⏱ Expedición: 5-9 días hábiles</div>
</div>
<div style={{marginBottom:20}}>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.08em',marginBottom:10}}>🚚 SELECCIONA TU COURIER *</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
{Object.entries(CI).map(([k,v])=><button key={k} onClick={()=>setCourier(k as C)} style={{background:courier===k?'rgba(201,168,76,0.15)':'rgba(201,168,76,0.04)',border:`2px solid ${courier===k?G:'rgba(201,168,76,0.15)'}`,borderRadius:8,padding:'10px 12px',cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif',transition:'all 0.15s'}}>
<div style={{fontSize:'1.3rem',marginBottom:4}}>{v.i}</div>
<div style={{color:courier===k?T:'rgba(232,201,122,0.6)',fontWeight:700,fontSize:'.82rem'}}>{v.n}</div>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',marginTop:2}}>{v.s}</div>
<div style={{color:courier===k?G:'rgba(232,201,122,0.3)',fontSize:'.7rem',marginTop:4}}>⏱ {v.t}</div>
</button>)}
</div>
<div style={{color:'rgba(232,201,122,0.25)',fontSize:'.68rem',marginTop:8,lineHeight:1.5}}>* Peso estimado: <strong style={{color:G}}>{peso} kg</strong> · Costo por WhatsApp según destino</div>
</div>
<div style={{marginBottom:20}}>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.08em',marginBottom:8}}>🛡️ SEGURO DE ENVÍO (OPCIONAL)</div>
<div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'10px 14px',marginBottom:10}}><p style={{color:'rgba(232,201,122,0.55)',fontSize:'.78rem',margin:0,lineHeight:1.6}}>Para mayor tranquilidad, te ofrecemos seguro internacional. Tu colección amazónica merece llegar perfecta. Cubre pérdida, daño y demora. <strong style={{color:G}}>Solo 2% del valor.</strong></p></div>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:6}}>
{Object.entries(SI).map(([k,v])=><button key={k} onClick={()=>setSeguro(seguro===k?'':k as S)} style={{background:seguro===k?'rgba(201,168,76,0.15)':'rgba(201,168,76,0.04)',border:`2px solid ${seguro===k?G:'rgba(201,168,76,0.12)'}`,borderRadius:8,padding:'10px 8px',cursor:'pointer',textAlign:'center',fontFamily:'Georgia,serif'}}>
<div style={{fontSize:'1.4rem',marginBottom:4}}>{v.i}</div>
<div style={{color:seguro===k?T:'rgba(232,201,122,0.5)',fontSize:'.68rem',fontWeight:700,lineHeight:1.3}}>{v.n}</div>
<div style={{color:'rgba(232,201,122,0.3)',fontSize:'.6rem',marginTop:2}}>{v.s}</div>
</button>)}
</div>
{seguro&&<div style={{color:'#7ec87e',fontSize:'.78rem',textAlign:'right',marginTop:6}}>✅ Seguro 2%: +${cs} USD</div>}
</div>
<div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:10,padding:'16px',marginBottom:12}}>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.08em',marginBottom:12}}>📊 RESUMEN DE TU ORDEN</div>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.82rem'}}>Productos</span><span style={{color:T,fontSize:'.82rem'}}>${sub.toFixed(2)}</span></div>
{dp>0&&<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'#7ec87e',fontSize:'.82rem'}}>Descuento {(dp*100).toFixed(0)}%</span><span style={{color:'#7ec87e',fontSize:'.82rem'}}>−${da.toFixed(2)}</span></div>}
<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.82rem'}}>Trámites exportación</span><span style={{color:T,fontSize:'.82rem'}}>${ct}</span></div>
{seguro&&<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.82rem'}}>Seguro de envío</span><span style={{color:T,fontSize:'.82rem'}}>${cs}</span></div>}
<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.8rem'}}>Courier</span><span style={{color:'rgba(232,201,122,0.35)',fontSize:'.75rem'}}>A cotizar por WhatsApp</span></div>
<div style={{borderTop:'1px solid rgba(201,168,76,0.2)',marginTop:10,paddingTop:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{color:T,fontWeight:700,fontSize:'1rem'}}>TOTAL A PAGAR HOY</span><span style={{color:G,fontWeight:700,fontSize:'1.3rem'}}>${total.toFixed(2)} USD</span></div>
<div style={{color:'rgba(232,201,122,0.2)',fontSize:'.62rem',marginTop:8,textAlign:'center'}}>Ley Amazónica N°27037 · Exonerado IGV · MYPE</div>
</div>
<div style={{textAlign:'center',marginBottom:8}}>
<div style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:6}}>FORMAS DE PAGO ACEPTADAS</div>
<div style={{display:'flex',gap:5,justifyContent:'center',flexWrap:'wrap'}}>
{['VISA','MASTERCARD','AMEX','DINERS','VISA DÉB.','MC DÉB.'].map(c=><span key={c} style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,padding:'3px 8px',color:'rgba(232,201,122,0.5)',fontSize:'.65rem'}}>{c}</span>)}
</div></div>
</>)}
{paso==='pago'&&(<>
<div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',letterSpacing:'.08em',marginBottom:12}}>DATOS DE CONTACTO Y ENVÍO</div>
<input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo *" style={inp}/>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Correo electrónico *" type="email" style={inp}/>
<input value={pais} onChange={e=>setPais(e.target.value)} placeholder="País de destino *" style={inp}/>
<input value={ciudad} onChange={e=>setCiudad(e.target.value)} placeholder="Ciudad *" style={inp}/>
<input value={direccion} onChange={e=>setDireccion(e.target.value)} placeholder="Dirección completa (calle, número, apto) *" style={inp}/>
<input value={codigoPostal} onChange={e=>setCodigoPostal(e.target.value)} placeholder="Código postal" style={inp}/>
<input value={telefono} onChange={e=>setTelefono(e.target.value)} placeholder="Teléfono con código de país (+1, +44...)" type="tel" style={inp}/>
{formToken&&<div id="kr-payment-form" style={{marginTop:8,marginBottom:8}}><div className="kr-smart-form" kr-form-token={formToken}></div></div>}
<div style={{background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:10,padding:'14px 16px',marginBottom:12}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem'}}>Total de tu compra</span><span style={{color:G,fontWeight:700,fontSize:'1.1rem'}}>${total.toFixed(2)} USD</span></div>
{courier&&<div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.8rem'}}>Courier</span><span style={{color:'rgba(232,201,122,0.5)',fontSize:'.78rem'}}>{CI[courier as keyof typeof CI]?.n}</span></div>}
</div>
{error&&<div style={{background:'rgba(255,80,80,0.08)',border:'1px solid rgba(255,80,80,0.25)',borderRadius:8,padding:'12px 14px',marginBottom:12}}><p style={{color:'#ff9090',fontSize:'.82rem',margin:0}}>⚠️ {error}</p></div>}
<div style={{textAlign:'center',marginBottom:8}}><div style={{color:'rgba(232,201,122,0.2)',fontSize:'.65rem'}}>🔒 Pago seguro · Izipay · VISA · MASTERCARD · AMEX · DINERS</div></div>
</>)}
</div>
<div style={{padding:'16px 24px 20px',borderTop:'1px solid rgba(201,168,76,0.15)',flexShrink:0}}>
{paso==='carrito'&&<>
<button onClick={()=>setPaso('orden')} disabled={sub<300||items.length===0} style={{width:'100%',padding:'14px',background:sub>=300&&items.length>0?G:'rgba(201,168,76,0.08)',color:sub>=300&&items.length>0?BG:'rgba(232,201,122,0.25)',border:'none',borderRadius:8,fontWeight:700,fontSize:'1rem',cursor:sub>=300&&items.length>0?'pointer':'not-allowed',fontFamily:'Georgia,serif',marginBottom:8}}>Actualizar lista de compras →</button>
<button onClick={onClose} style={{width:'100%',padding:'12px',background:'transparent',color:G,border:'1px solid rgba(201,168,76,0.3)',borderRadius:8,fontWeight:700,fontSize:'.9rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>Seguir comprando</button>
</>}
{paso==='orden'&&<>
<button onClick={()=>setPaso('pago')} disabled={!courier} style={{width:'100%',padding:'14px',background:courier?G:'rgba(201,168,76,0.08)',color:courier?BG:'rgba(232,201,122,0.25)',border:'none',borderRadius:8,fontWeight:700,fontSize:'1rem',cursor:courier?'pointer':'not-allowed',fontFamily:'Georgia,serif',marginBottom:8}}>Hacer compra completa →</button>
<button onClick={()=>setPaso('carrito')} style={{width:'100%',padding:'12px',background:'transparent',color:G,border:'1px solid rgba(201,168,76,0.3)',borderRadius:8,fontWeight:700,fontSize:'.9rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>← Volver al carrito</button>
</>}
{paso==='pago'&&<>
<button onClick={pagar} disabled={loading} style={{width:'100%',padding:'14px',background:loading?'rgba(201,168,76,0.3)':G,color:BG,border:'none',borderRadius:8,fontWeight:700,fontSize:'1rem',cursor:loading?'not-allowed':'pointer',fontFamily:'Georgia,serif',marginBottom:8}}>{loading?'⏳ Procesando...':'💳 Pagar $'+total.toFixed(2)+' USD'}</button>
<button onClick={()=>setPaso('orden')} style={{width:'100%',padding:'12px',background:'transparent',color:G,border:'1px solid rgba(201,168,76,0.3)',borderRadius:8,fontWeight:700,fontSize:'.9rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>← Volver a mi orden</button>
</>}
</div>
</div>
</>)}
