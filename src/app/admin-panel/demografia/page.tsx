'use client'
import { useState } from 'react'

const SEGMENTOS = [
  {
    id:'museos',
    nombre:'🏛️ Museos de Historia Natural',
    paises:'USA, UK, Alemania, Japón, Francia, Australia',
    edad:'35-65 años',
    cargo:'Curator, Director, Procurement Manager',
    presupuesto:'$500 - $50,000 USD por colección',
    frecuencia:'2-4 compras al año',
    queCompran:['Especímenes A1', 'Aberraciones', 'Gynandromorphs', 'Material científico'],
    motivacion:'Investigación, exhibición permanente, educación pública',
    canales:'Email profesional, LinkedIn, congresos científicos',
    urgencia:'alta',
    volumen:'alto',
    color:'rgba(10,30,10,0.3)',
    icon:'🏛️'
  },
  {
    id:'coleccionistas',
    nombre:'💎 Coleccionistas Privados de Lujo',
    paises:'Dubai, Mónaco, USA, Japón, China, Suiza',
    edad:'40-70 años',
    cargo:'Coleccionista privado, HNWI',
    presupuesto:'$1,000 - $500,000 USD',
    frecuencia:'1-6 compras al año',
    queCompran:['Morpho rhetenor helena', 'Gynandromorphs', 'Joyería oro 24k', 'Rarezas únicas'],
    motivacion:'Status, inversión, pasión, decoración ultra premium',
    canales:'WhatsApp privado, referidos, ferias de lujo, Christie\'s',
    urgencia:'media',
    volumen:'muy alto',
    color:'rgba(30,20,0,0.3)',
    icon:'💎'
  },
  {
    id:'galerias',
    nombre:'🎨 Galerías de Arte & Diseño',
    paises:'NYC, Londres, París, Tokio, Berlín, Dubái',
    edad:'30-55 años',
    cargo:'Gallery Owner, Art Director, Curator',
    presupuesto:'$200 - $10,000 USD por pieza',
    frecuencia:'4-12 compras al año',
    queCompran:['Cuadros UV', 'Cúpulas victorianas', 'Encapsulados resina', 'Arte biológico'],
    motivacion:'Exhibición artística, venta a clientes premium, tendencia bio-art',
    canales:'Instagram, Art Basel, Frieze, email directo',
    urgencia:'media',
    volumen:'medio',
    color:'rgba(20,10,30,0.3)',
    icon:'🎨'
  },
  {
    id:'joyerias',
    nombre:'💍 Joyerías & Alta Moda',
    paises:'Italia, Francia, Japón, USA, Emiratos, Korea',
    edad:'28-50 años',
    cargo:'Designer, Buyer, Brand Manager',
    presupuesto:'$100 - $5,000 USD por pieza',
    frecuencia:'6-24 compras al año',
    queCompran:['Joyería oro 24k', 'Plata .950', 'Alas naturales', 'Insectos metalizados'],
    motivacion:'Colecciones únicas, diferenciación, tendencia natural-luxury',
    canales:'Instagram, trade shows, Vogue Business, contacto directo',
    urgencia:'alta',
    volumen:'alto',
    color:'rgba(30,5,15,0.3)',
    icon:'💍'
  },
  {
    id:'hoteles',
    nombre:'🏨 Hoteles 5 Estrellas & Resorts',
    paises:'Dubai, Maldivas, Bali, Singapur, Mónaco, Suiza',
    edad:'35-55 años',
    cargo:'Interior Designer, Procurement, GM',
    presupuesto:'$1,000 - $100,000 USD por proyecto',
    frecuencia:'1-2 proyectos al año',
    queCompran:['Cuadros grandes', 'Cúpulas decorativas', 'Geodas', 'Arte biológico'],
    motivacion:'Decoración única, experiencia huésped premium, identidad visual',
    canales:'Hospitality trade shows, LinkedIn, arquitectos de interiores',
    urgencia:'baja',
    volumen:'muy alto',
    color:'rgba(5,15,30,0.3)',
    icon:'🏨'
  },
  {
    id:'universidades',
    nombre:'🎓 Universidades & Centros de Investigación',
    paises:'USA, UK, Alemania, Japón, Australia, Brasil',
    edad:'30-60 años',
    cargo:'Professor, Researcher, Lab Director',
    presupuesto:'$100 - $10,000 USD',
    frecuencia:'2-8 compras al año',
    queCompran:['Material científico', 'Especímenes A1', 'Artrópodos', 'Fósiles'],
    motivacion:'Investigación, enseñanza, publicaciones científicas',
    canales:'ResearchGate, email universitario, congresos científicos',
    urgencia:'media',
    volumen:'medio',
    color:'rgba(5,20,10,0.3)',
    icon:'🎓'
  },
  {
    id:'minerales',
    nombre:'✨ Coleccionistas Minerales & Místico',
    paises:'USA, Alemania, Brasil, Australia, China, India',
    edad:'25-55 años',
    cargo:'Coleccionista, tienda esotérica, wellness',
    presupuesto:'$50 - $5,000 USD',
    frecuencia:'4-20 compras al año',
    queCompran:['Pirita peruana', 'Geodas', 'Cuarzos', 'Fósiles'],
    motivacion:'Energía, decoración, colección, meditación, inversión',
    canales:'Etsy, Instagram, ferias minerales, tiendas esotéricas',
    urgencia:'alta',
    volumen:'medio',
    color:'rgba(20,5,25,0.3)',
    icon:'✨'
  },
  {
    id:'farmaceuticas',
    nombre:'🔬 Farmacéuticas & Laboratorios',
    paises:'USA, Suiza, Alemania, Japón, UK',
    edad:'35-60 años',
    cargo:'R&D Manager, Procurement, Scientist',
    presupuesto:'$500 - $50,000 USD',
    frecuencia:'2-6 compras al año',
    queCompran:['Material biológico', 'Artrópodos', 'Plantas medicinales', 'Hongos'],
    motivacion:'Investigación farmacéutica, desarrollo de medicamentos',
    canales:'LinkedIn, congresos farmacéuticos, email directo',
    urgencia:'alta',
    volumen:'alto',
    color:'rgba(5,25,20,0.3)',
    icon:'🔬'
  },
  {
    id:'restaurantes',
    nombre:'🍽️ Restaurantes Gourmet & Chefs',
    paises:'Francia, Japón, USA, España, Perú, Australia',
    edad:'28-50 años',
    cargo:'Chef Ejecutivo, F&B Manager, Owner',
    presupuesto:'$200 - $5,000 USD',
    frecuencia:'6-24 pedidos al año',
    queCompran:['Frutos exóticos', 'Hongos', 'Hierbas medicinales', 'Condimentos amazónicos'],
    motivacion:'Ingredientes únicos, menú de temporada, experiencia gastronómica',
    canales:'Instagram, ferias gastronómicas, contacto directo, Michelin network',
    urgencia:'alta',
    volumen:'medio',
    color:'rgba(25,10,5,0.3)',
    icon:'🍽️'
  },
  {
    id:'spa',
    nombre:'💆 Spa & Wellness Premium',
    paises:'Bali, Tailandia, Maldivas, Dubai, USA, Suiza',
    edad:'30-55 años',
    cargo:'Spa Director, Wellness Manager, Owner',
    presupuesto:'$300 - $10,000 USD',
    frecuencia:'4-12 pedidos al año',
    queCompran:['Aceites esenciales', 'Plantas medicinales', 'Minerales', 'Decoración natural'],
    motivacion:'Productos únicos amazónicos, autenticidad, bienestar premium',
    canales:'Instagram, wellness fairs, LinkedIn, WhatsApp',
    urgencia:'media',
    volumen:'medio',
    color:'rgba(5,20,25,0.3)',
    icon:'💆'
  },
]

const TENDENCIAS = [
  {nm:'Bio-Art & Natural Luxury', crecimiento:'+340%', desc:'Arte con especímenes naturales en galerías premium', color:'rgba(201,168,76,0.15)'},
  {nm:'Insect Jewelry', crecimiento:'+280%', desc:'Joyería con insectos reales en oro y plata', color:'rgba(30,20,0,0.2)'},
  {nm:'Mystical Minerals', crecimiento:'+220%', desc:'Cristales y minerales como inversión y bienestar', color:'rgba(20,5,25,0.2)'},
  {nm:'Scientific Collecting', crecimiento:'+180%', desc:'Coleccionismo científico en museos y universidades', color:'rgba(5,20,10,0.2)'},
  {nm:'Amazon Superfoods', crecimiento:'+160%', desc:'Superalimentos amazónicos en mercados premium', color:'rgba(25,10,5,0.2)'},
  {nm:'Luxury Taxidermy', crecimiento:'+150%', desc:'Taxidermia de lujo para decoración premium', color:'rgba(5,15,30,0.2)'},
]

export default function DemografiaPage() {
  const [seleccionado, setSeleccionado] = useState<string|null>(null)
  const seg = SEGMENTOS.find(s=>s.id===seleccionado)

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'20px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeInUp 0.5s ease both}
        .seg-card{transition:all 0.2s ease;cursor:pointer}
        .seg-card:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(201,168,76,0.2)!important;border-color:rgba(201,168,76,0.4)!important}
        .btn{transition:all 0.15s ease;cursor:pointer}
        .btn:hover{opacity:0.85}
      `}</style>

      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <a href="/admin-panel" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:20}}>← Panel Admin</a>

        <div className="fade-up" style={{textAlign:'center',marginBottom:32}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:300,color:'#E8C97A',marginBottom:6}}>📊 Análisis Demográfico Global</h1>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.72rem'}}>10 Segmentos · 6 Continentes · 17 Rubros · Tendencias 2026</p>
        </div>

        {/* TENDENCIAS */}
        <div style={{marginBottom:32}}>
          <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:14}}>📈 TENDENCIAS GLOBALES 2026</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
            {TENDENCIAS.map(t=>(
              <div key={t.nm} style={{background:t.color,border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:14}}>
                <p style={{color:'#25D366',fontSize:'1.1rem',fontWeight:700,marginBottom:4}}>{t.crecimiento}</p>
                <p style={{color:'#E8C97A',fontSize:'.78rem',fontWeight:400,marginBottom:4}}>{t.nm}</p>
                <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',lineHeight:1.5}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SEGMENTOS */}
        <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:14}}>🎯 SEGMENTOS DE CLIENTES POTENCIALES</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:12,marginBottom:24}}>
          {SEGMENTOS.map(s=>(
            <div key={s.id} onClick={()=>setSeleccionado(s.id===seleccionado?null:s.id)} className="seg-card" style={{background:seleccionado===s.id?'rgba(201,168,76,0.1)':s.color,border:`1px solid ${seleccionado===s.id?'rgba(201,168,76,0.5)':'rgba(201,168,76,0.1)'}`,borderRadius:12,padding:18}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                <span style={{fontSize:'1.8rem'}}>{s.icon}</span>
                <div style={{textAlign:'right'}}>
                  <span style={{background:s.volumen==='muy alto'?'rgba(37,211,102,0.15)':s.volumen==='alto'?'rgba(201,168,76,0.15)':'rgba(100,100,100,0.15)',color:s.volumen==='muy alto'?'#25D366':s.volumen==='alto'?'#C9A84C':'rgba(232,201,122,0.4)',padding:'2px 8px',borderRadius:8,fontSize:'.6rem'}}>{s.volumen}</span>
                </div>
              </div>
              <h3 style={{color:'#E8C97A',fontSize:'.85rem',fontWeight:400,marginBottom:6}}>{s.nombre}</h3>
              <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',marginBottom:4}}>🌍 {s.paises}</p>
              <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem',fontWeight:700}}>{s.presupuesto}</p>

              {seleccionado===s.id && (
                <div className="fade-up" style={{marginTop:14,paddingTop:14,borderTop:'1px solid rgba(201,168,76,0.15)'}}>
                  <div style={{marginBottom:10}}>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>EDAD & CARGO</p>
                    <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.72rem'}}>{s.edad} · {s.cargo}</p>
                  </div>
                  <div style={{marginBottom:10}}>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>QUÉ COMPRAN</p>
                    <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                      {s.queCompran.map(q=>(
                        <span key={q} style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',color:'#C9A84C',padding:'2px 8px',borderRadius:10,fontSize:'.6rem'}}>{q}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{marginBottom:10}}>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>MOTIVACIÓN</p>
                    <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',lineHeight:1.5}}>{s.motivacion}</p>
                  </div>
                  <div style={{marginBottom:10}}>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>CANALES DE CONTACTO</p>
                    <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem'}}>{s.canales}</p>
                  </div>
                  <div style={{marginBottom:12}}>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>FRECUENCIA DE COMPRA</p>
                    <p style={{color:'#C9A84C',fontSize:'.72rem',fontWeight:700}}>{s.frecuencia}</p>
                  </div>
                  <a href="/admin-panel" onClick={()=>localStorage.setItem('nicho_search', s.id)} style={{display:'block',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'8px',borderRadius:6,fontSize:'.72rem',fontWeight:700,textDecoration:'none',textAlign:'center'}}>
                    🔍 Buscar estos clientes en Apollo →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RESUMEN */}
        <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:12,padding:24,marginBottom:24}}>
          <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:16}}>💡 ESTRATEGIA RECOMENDADA PARA HOUSE INSECTS OF PERU</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:12}}>
            {[
              {nm:'🎯 Prioridad 1', desc:'Museos + Coleccionistas privados — mayor presupuesto y frecuencia', color:'rgba(37,211,102,0.08)'},
              {nm:'🎯 Prioridad 2', desc:'Galerías + Joyerías — mercado en crecimiento +280%', color:'rgba(201,168,76,0.08)'},
              {nm:'🎯 Prioridad 3', desc:'Hoteles 5★ + Spa Premium — ticket alto por proyecto', color:'rgba(5,15,30,0.2)'},
              {nm:'🎯 Prioridad 4', desc:'Farmacéuticas + Universidades — contratos recurrentes', color:'rgba(5,20,10,0.2)'},
            ].map(r=>(
              <div key={r.nm} style={{background:r.color,border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:14}}>
                <p style={{color:'#C9A84C',fontSize:'.78rem',fontWeight:700,marginBottom:6}}>{r.nm}</p>
                <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',lineHeight:1.5}}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center',paddingTop:16,borderTop:'1px solid rgba(201,168,76,0.1)'}}>
          <p style={{color:'rgba(201,168,76,0.2)',fontSize:'.62rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · Análisis Demográfico Global</p>
        </div>
      </div>
    </div>
  )
}
