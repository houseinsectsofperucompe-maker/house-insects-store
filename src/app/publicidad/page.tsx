'use client'
import {useState,useEffect} from 'react'
import {useCarrito} from '@/components/CarritoContext'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'

const ESPACIOS=[
  {id:'hero',nm:'Banner Hero',desc:'Página principal — posición más destacada',precio:150,dim:'1200x400px',paginas:'Inicio',icon:'🏆',popular:true},
  {id:'header',nm:'Banner Header',desc:'Barra superior en TODAS las páginas',precio:80,dim:'1200x60px',paginas:'Todas',icon:'📌'},
  {id:'footer',nm:'Banner Footer',desc:'Pie de página en TODAS las páginas',precio:50,dim:'1200x150px',paginas:'Todas',icon:'📋'},
  {id:'sidebar',nm:'Banner Sidebar',desc:'Costado derecho del catálogo',precio:60,dim:'300x600px',paginas:'Catálogo',icon:'📱'},
  {id:'entre-productos',nm:'Banner Entre Productos',desc:'Aparece cada 6 productos en catálogo',precio:70,dim:'800x200px',paginas:'Catálogo',icon:'🛍️'},
  {id:'carrito',nm:'Banner Carrito',desc:'Dentro del carrito de compras',precio:90,dim:'600x200px',paginas:'Carrito',icon:'🛒',popular:true},
  {id:'especimen',nm:'Banner Espécimen',desc:'En cada página de producto individual',precio:40,dim:'800x150px',paginas:'Productos',icon:'🦋'},
]

const PLANES=[
  {id:'mensual',nm:'Mensual',mult:1,desc:'Pago mensual',badge:''},
  {id:'trimestral',nm:'Trimestral',mult:3,desc:'3 meses — 10% descuento',badge:'10% OFF',pct:0.10},
  {id:'semestral',nm:'Semestral',mult:6,desc:'6 meses — 20% descuento',badge:'20% OFF',pct:0.20},
  {id:'anual',nm:'Anual',mult:12,desc:'12 meses — 30% descuento',badge:'30% OFF',pct:0.30},
]

export default function PublicidadPage(){
  const {addItem,cantidad}=useCarrito()
  const [plan,setPlan]=useState(PLANES[0])
  const [agregados,setAgregados]=useState<string[]>([])

  const precio=(e:typeof ESPACIOS[0])=>{
    const base=e.precio*plan.mult
    const desc=plan.pct||0
    return Math.round(base*(1-desc))
  }

  const agregar=(e:typeof ESPACIOS[0])=>{
    addItem({id: String(Date.now()), nombre: `Publicidad ${e.nm} — ${plan.nm}`, n: `Publicidad ${e.nm} — ${plan.nm}`, p: precio(e), rubro: 'publicidad', foto: '', familia: ''})
    setAgregados(prev=>[...prev,e.id])
  }

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      {/* Navbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:`1px solid ${BD}`,background:'rgba(10,10,10,0.97)',position:'sticky' as const,top:0,zIndex:100}}>
        <a href='/' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>🏠 Inicio</a>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:'1rem',letterSpacing:'0.1em',margin:0}}>📢 Espacios Publicitarios</h1>
          <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>houseinsectsofperu.com · +50,000 visitas/mes</p>
        </div>
        <a href='/carrito' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem',position:'relative' as const}}>
          🛒 Carrito
          {cantidad>0&&<span style={{position:'absolute' as const,top:-6,right:-6,background:'#e74c3c',color:'#fff',borderRadius:'50%',width:18,height:18,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.65rem',fontWeight:'bold'}}>{cantidad}</span>}
        </a>
      </div>

      {/* Hero */}
      <div style={{textAlign:'center',padding:'48px 24px 32px',borderBottom:`1px solid ${BD}`}}>
        <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.5)',letterSpacing:'.2em',marginBottom:12}}>ANÚNCIATE CON NOSOTROS</p>
        <h2 style={{fontSize:'2rem',fontWeight:300,letterSpacing:'.08em',marginBottom:12}}>
          Llega a coleccionistas de todo el mundo
        </h2>
        <p style={{fontSize:'.9rem',color:'rgba(201,168,76,0.6)',maxWidth:600,margin:'0 auto 24px'}}>
          House Insects of Peru recibe visitas de más de 50 países. Pon tu marca frente a coleccionistas, científicos y amantes de la naturaleza.
        </p>
        <div style={{display:'flex',gap:24,justifyContent:'center',flexWrap:'wrap' as const}}>
          {[
            {nm:'50+ países',desc:'Alcance global'},
            {nm:'50,000+',desc:'Visitas mensuales'},
            {nm:'8 idiomas',desc:'Audiencia multilingüe'},
            {nm:'7 espacios',desc:'Posiciones disponibles'},
          ].map(s=>(
            <div key={s.nm} style={{textAlign:'center' as const}}>
              <p style={{fontSize:'1.4rem',fontWeight:'bold',margin:0,color:G}}>{s.nm}</p>
              <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',margin:0}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>

        {/* Selector de plan */}
        <div style={{marginBottom:32}}>
          <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:12,textAlign:'center',letterSpacing:'.1em'}}>SELECCIONA TU PLAN</p>
          <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap' as const}}>
            {PLANES.map(p=>(
              <button key={p.id} onClick={()=>setPlan(p)}
                style={{padding:'10px 20px',background:plan.id===p.id?'rgba(201,168,76,0.2)':'transparent',
                  border:`1px solid ${plan.id===p.id?G:BD}`,color:G,borderRadius:8,cursor:'pointer',
                  fontFamily:'Georgia,serif',fontSize:'.8rem',position:'relative' as const}}>
                {p.nm}
                {p.badge&&<span style={{position:'absolute' as const,top:-8,right:-8,background:'#2ecc71',color:'#fff',
                  borderRadius:10,padding:'1px 6px',fontSize:'.6rem',fontWeight:'bold'}}>{p.badge}</span>}
                <span style={{display:'block',fontSize:'.65rem',color:'rgba(201,168,76,0.5)',marginTop:2}}>{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid de espacios */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:16,marginBottom:40}}>
          {ESPACIOS.map(e=>{
            const ya=agregados.includes(e.id)
            return(
              <div key={e.id} style={{background:'rgba(201,168,76,0.04)',
                border:`1px solid ${e.popular?G:BD}`,borderRadius:12,padding:20,
                position:'relative' as const}}>
                {e.popular&&(
                  <span style={{position:'absolute' as const,top:-10,left:20,background:G,color:'#0a0a0a',
                    borderRadius:10,padding:'2px 10px',fontSize:'.65rem',fontWeight:'bold'}}>
                    MÁS POPULAR
                  </span>
                )}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                  <div>
                    <p style={{fontSize:'1.1rem',margin:'0 0 4px'}}>{e.icon} {e.nm}</p>
                    <p style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',margin:0}}>{e.desc}</p>
                  </div>
                </div>
                <div style={{marginBottom:16}}>
                  <p style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)',margin:'0 0 4px'}}>📐 {e.dim}</p>
                  <p style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)',margin:0}}>📄 Páginas: {e.paginas}</p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                  <div>
                    <p style={{fontSize:'1.6rem',fontWeight:'bold',margin:0,color:G}}>
                      ${precio(e)}
                      <span style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)',fontWeight:'normal'}}>/{plan.nm.toLowerCase()}</span>
                    </p>
                    {plan.pct&&(
                      <p style={{fontSize:'.65rem',color:'#2ecc71',margin:0}}>
                        Ahorras ${Math.round(e.precio*plan.mult*plan.pct)} USD
                      </p>
                    )}
                  </div>
                </div>
                <button onClick={()=>!ya&&agregar(e)} disabled={ya}
                  style={{width:'100%',padding:'10px',
                    background:ya?'rgba(46,204,113,0.2)':G,
                    color:ya?'#2ecc71':'#0a0a0a',
                    border:ya?'1px solid #2ecc71':'none',
                    borderRadius:8,cursor:ya?'default':'pointer',
                    fontFamily:'Georgia,serif',fontSize:'.85rem',fontWeight:'bold'}}>
                  {ya?'✅ Agregado al carrito':'🛒 Contratar este espacio'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Paquete completo */}
        <div style={{background:'rgba(201,168,76,0.06)',border:`1px solid ${G}`,borderRadius:12,padding:24,marginBottom:40,textAlign:'center' as const}}>
          <p style={{fontSize:'1.1rem',fontWeight:'bold',marginBottom:8}}>🏆 Paquete Completo — Todos los espacios</p>
          <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:16}}>
            Máxima visibilidad en toda la web — Hero + Header + Footer + Sidebar + Entre Productos + Carrito + Espécimen
          </p>
          <p style={{fontSize:'2rem',fontWeight:'bold',margin:'0 0 4px',color:G}}>
            ${Math.round(ESPACIOS.reduce((s,e)=>s+precio(e),0)*0.80)}
            <span style={{fontSize:'.8rem',color:'rgba(201,168,76,0.5)',fontWeight:'normal'}}>/{plan.nm.toLowerCase()} — 20% extra OFF</span>
          </p>
          <button onClick={()=>ESPACIOS.forEach(e=>!agregados.includes(e.id)&&agregar(e))}
            style={{padding:'14px 40px',background:G,color:'#0a0a0a',border:'none',
              borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'1rem',fontWeight:'bold',marginTop:12}}>
            🛒 Contratar Paquete Completo
          </button>
        </div>

        {/* Info contacto */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:40}}>
          {[
            {icon:'📱',nm:'WhatsApp',desc:'+51 940 699 405',url:'https://wa.me/51940699405?text=Hola, quiero anunciarme en houseinsectsofperu.com'},
            {icon:'✉️',nm:'Email',desc:'houseinsectsperueirl@gmail.com',url:'mailto:houseinsectsperueirl@gmail.com'},
            {icon:'🌐',nm:'Web',desc:'houseinsectsofperu.com',url:'https://houseinsectsofperu.com'},
          ].map(c=>(
            <a key={c.nm} href={c.url} target="_blank" rel="noopener noreferrer"
              style={{display:'block',textAlign:'center' as const,padding:16,
                background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,
                borderRadius:10,textDecoration:'none',color:G}}>
              <p style={{fontSize:'1.5rem',margin:'0 0 6px'}}>{c.icon}</p>
              <p style={{fontSize:'.85rem',fontWeight:'bold',margin:'0 0 4px'}}>{c.nm}</p>
              <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',margin:0}}>{c.desc}</p>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div style={{borderTop:`1px solid ${BD}`,paddingTop:32}}>
          <p style={{fontSize:'.85rem',fontWeight:'bold',marginBottom:16,textAlign:'center' as const}}>Preguntas frecuentes</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            {[
              {q:'¿Qué formatos acepta?',a:'GIF, PNG, JPG, WebP, MP4, WebM. Videos 3D/4D bienvenidos.'},
              {q:'¿Cómo subo mi banner?',a:'Después de contratar, te enviamos acceso al panel para subir tu banner directamente.'},
              {q:'¿Cuándo aparece mi banner?',a:'En las primeras 24 horas después de confirmar el pago.'},
              {q:'¿Puedo cambiar mi banner?',a:'Sí, puedes actualizarlo cuando quieras desde el panel de cliente.'},
              {q:'¿Hay contrato mínimo?',a:'No, puedes empezar con un mes y renovar cuando quieras.'},
              {q:'¿Cómo pago?',a:'Izipay, WhatsApp, Wise, Payoneer, WeChat Pay, Alipay y más.'},
            ].map(f=>(
              <div key={f.q} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:8,padding:14}}>
                <p style={{fontSize:'.78rem',fontWeight:'bold',margin:'0 0 6px',color:G}}>{f.q}</p>
                <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',margin:0,lineHeight:1.5}}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
