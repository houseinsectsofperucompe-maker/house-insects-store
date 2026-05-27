'use client'
import {useCarrito} from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'
import { useState } from 'react'

const BANNERS = [
  { id:1, nombre:'Header Principal', desc:'Posición premium en la página de inicio · Máxima visibilidad · 728x90px', precios:{mes:25,semestre:120,anual:200}, icon:'👑', color:'rgba(201,168,76,0.15)' },
  { id:2, nombre:'Catálogo', desc:'Entre productos del catálogo · Clientes compradores · 468x60px', precios:{mes:15,semestre:75,anual:130}, icon:'📦', color:'rgba(10,30,10,0.3)' },
  { id:3, nombre:'Sidebar', desc:'Banner lateral en todas las páginas · Siempre visible · 160x600px', precios:{mes:10,semestre:50,anual:90}, icon:'📌', color:'rgba(5,15,30,0.3)' },
  { id:4, nombre:'Footer', desc:'Pie de página · Presencia global · 728x90px', precios:{mes:8,semestre:40,anual:70}, icon:'📋', color:'rgba(20,10,5,0.3)' },
  { id:5, nombre:'Popup Premium', desc:'Aparece al entrar a la web · Impacto máximo · 400x300px', precios:{mes:30,semestre:150,anual:250}, icon:'⭐', color:'rgba(20,5,30,0.3)' },
  { id:6, nombre:'Pack Completo', desc:'Todos los espacios publicitarios · Máximo alcance · Precio especial', precios:{mes:70,semestre:350,anual:600}, icon:'💎', color:'rgba(30,15,5,0.3)' },
]

const PLANES = [
  { id:'mes', label:'1 Mes', ahorro:'' },
  { id:'semestre', label:'6 Meses', ahorro:'Ahorra 20%' },
  { id:'anual', label:'12 Meses', ahorro:'Ahorra 35%' },
]

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeInUp 0.6s ease both}
  .banner-card{transition:all 0.25s ease;cursor:pointer}
  .banner-card:hover{transform:translateY(-6px);box-shadow:0 12px 40px rgba(201,168,76,0.25)!important;border-color:rgba(201,168,76,0.5)!important}
  .plan-btn{transition:all 0.18s ease;cursor:pointer}
  .plan-btn:hover{transform:translateY(-2px)}
  .wa-btn{transition:all 0.2s ease}
  .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 24px rgba(37,211,102,0.45)!important}
  .back-btn{transition:all 0.2s ease;display:inline-block}
  .back-btn:hover{transform:translateX(-4px)}
`

export default function BannersPage() {
  const [plan, setPlan] = useState('mes')
  const {items:carrito,addItem,updateItems:setCarrito}=useCarrito()
  const [showCarrito,setShowCarrito]=useState(false)
  const [ok,setOk]=useState(false)
  const [seleccionado, setSeleccionado] = useState<number|null>(null)
  const banner = BANNERS.find(b=>b.id===seleccionado)
  const precio = banner ? banner.precios[plan as keyof typeof banner.precios] : 0
  const msg = banner ? encodeURIComponent(`Hola House Insects of Peru!\nQuiero alquilar el banner: *${banner.nombre}*\nPlan: ${PLANES.find(p=>p.id===plan)?.label}\nPrecio: $${precio} USD\nGracias.`) : ''

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{CSS}</style>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/" className="back-btn" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:24}}>← Volver al inicio</a>
        <div className="fade-up" style={{textAlign:'center',marginBottom:40}}>
          <img src="/logo-house-insects-peru.png" style={{width:100,height:100,objectFit:'contain',marginBottom:16,borderRadius:'50%',border:'2px solid rgba(201,168,76,0.4)'}}/>
          <h1 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:300,color:'#E8C97A',marginBottom:8}}>Espacios Publicitarios</h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',maxWidth:600,margin:'0 auto',lineHeight:1.8}}>Alquila un espacio en <strong style={{color:'#C9A84C'}}>houseinsectsofperu.com</strong> y llega a coleccionistas, museos y científicos de todo el mundo.</p>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginTop:8}}>Renovación automática · Pago en USD · RUC 20447397804</p>
        </div>
        <div style={{display:'flex',gap:10,justifyContent:'center',marginBottom:36,flexWrap:'wrap'}}>
          {PLANES.map(p=>(
            <button key={p.id} onClick={()=>setPlan(p.id)} className="plan-btn" style={{background:plan===p.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:plan===p.id?'#1A1209':'#C9A84C',border:`1px solid ${plan===p.id?'transparent':'rgba(201,168,76,0.2)'}`,padding:'10px 24px',borderRadius:30,fontSize:'.82rem',fontFamily:'Georgia,serif',fontWeight:plan===p.id?700:400}}>
              {p.label}{p.ahorro&&<span style={{fontSize:'.65rem',opacity:.8}}> · {p.ahorro}</span>}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16,marginBottom:40}}>
          {BANNERS.map(b=>(
            <div key={b.id} onClick={()=>setSeleccionado(b.id===seleccionado?null:b.id)} className="banner-card" style={{background:seleccionado===b.id?'rgba(201,168,76,0.12)':b.color,border:`1px solid ${seleccionado===b.id?'rgba(201,168,76,0.6)':'rgba(201,168,76,0.12)'}`,borderRadius:12,padding:24}}>
              <div style={{fontSize:'2rem',marginBottom:12}}>{b.icon}</div>
              <h3 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,marginBottom:8}}>{b.nombre}</h3>
              <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.72rem',lineHeight:1.7,marginBottom:16}}>{b.desc}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:6}}>
                <span style={{color:'#C9A84C',fontSize:'1.8rem',fontWeight:700}}>${b.precios[plan as keyof typeof b.precios]}</span>
                <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>USD / {PLANES.find(p=>p.id===plan)?.label}</span>
              </div>
              {seleccionado===b.id&&<div style={{marginTop:16,padding:'8px 12px',background:'rgba(201,168,76,0.1)',borderRadius:6,border:'1px solid rgba(201,168,76,0.2)'}}><p style={{color:'#C9A84C',fontSize:'.72rem'}}>✅ Seleccionado</p></div>}
            </div>
          ))}
        </div>
        {seleccionado&&banner&&(
          <div className="fade-up" style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:12,padding:24,textAlign:'center',marginBottom:32}}>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:8}}>TU SELECCIÓN</p>
            <h3 style={{color:'#E8C97A',fontSize:'1.2rem',fontWeight:400,marginBottom:4}}>{banner.icon} {banner.nombre}</h3>
            <p style={{color:'#C9A84C',fontSize:'2rem',fontWeight:700,marginBottom:4}}>${precio} USD</p>
            <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',marginBottom:20}}>{PLANES.find(p=>p.id===plan)?.label} · Renovable automáticamente</p>
            <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
              <button onClick={()=>{if(banner){addItem({n:banner.nombre+' (Banner '+PLANES.find(p=>p.id===plan)?.label+')',p:precio,rubro:'Publicidad'});setOk(true);setShowCarrito(true);setTimeout(()=>setOk(false),2000)}}} style={{background:ok?'#5DBB63':'#C9A84C',color:'#1A1209',padding:'12px 28px',borderRadius:4,fontWeight:700,fontSize:'.85rem',border:'none',cursor:'pointer',marginBottom:8,display:'block',width:'100%'}}>{ok?'✅ Agregado':'🛒 Agregar al carrito'}</button>
              <a href={`https://wa.me/51940699405?text=${msg}`} target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'12px 28px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 940 699 405</a>
              <a href={`https://wa.me/51920644433?text=${msg}`} target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'12px 28px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 920 644 433</a>
              <button onClick={()=>{if(banner){addItem({n:banner.nombre+' Banner '+plan,p:precio,rubro:'Publicidad'});setShowCarrito(true)}}} style={{background:'#C9A84C',color:'#1A1209',padding:'12px 28px',borderRadius:4,fontWeight:700,fontSize:'.85rem',border:'none',cursor:'pointer',width:'100%',marginTop:8}}>🛒 Agregar al carrito</button>
            </div>
          </div>
        )}
        <div style={{textAlign:'center',padding:'20px',borderTop:'1px solid rgba(201,168,76,0.1)'}}>
          <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.65rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARÍA, PERÚ · EXPORTACIÓN MUNDIAL</p>
        </div>
      </div>
    </div>
  )
}
