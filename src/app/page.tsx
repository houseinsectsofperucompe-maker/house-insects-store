'use client'
import Image from 'next/image'
import { useState } from 'react'
const CATALOGOS = [
  { id:1, nombre:'Especímenes Biológicos Secos', descripcion:'Mariposas diurnas · Calidad A1 · CITES certificado', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/cazador_catlogo_mariposas_diurnas_vi%CC%81deo_mp__j2nfez.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/logo-house-insects-peru_pvmkud', colorFondo:'rgba(10,30,10,0.85)', ruta:'/catalogo/especimenes' },
  { id:2, nombre:'Cuadros de Mariposas Tropicales Naturales', descripcion:'Especies nocturnas · Raras · Amazónicas', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.26_dvuw9x.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/NOCTURNSA-LOG2_nqnnth', colorFondo:'rgba(10,10,30,0.85)', ruta:'/catalogo/nocturnas' },
  { id:3, nombre:'Joyería Natural', descripcion:'Oro · Plata · Alas naturales · Artesanal', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.48_sg6ybr.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/Joyerias_y_cuadros_en_oro_Y_PLATA_y67in5', colorFondo:'rgba(30,20,0,0.85)', ruta:'/catalogo/joyeria' },
  { id:4, nombre:'Rarezas & Gynandromorphs', descripcion:'Piezas únicas · Aberraciones · Colección élite', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778870094/house_insects_peru_intro_ujjmrv.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/rarezas_y_gyanadrmophos_yeno1o', colorFondo:'rgba(20,10,30,0.85)', ruta:'/catalogo/rarezas' },
  { id:5, nombre:'Artesanías & Cúpulas', descripcion:'Cuadros · Cúpulas · Resinas · Arte amazónico', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(30,15,5,0.85)', ruta:'/catalogo/artesanias' },
  { id:6, nombre:'Herramientas Biológicas', descripcion:'Sets disección · Lupas binoculares · Kits montaje', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.28_vobsdz.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/HERAMIENTAS_BIOLOGICAS_zhvrn2', colorFondo:'rgba(5,15,30,0.85)', ruta:'/catalogo/herramientas' },
  { id:7, nombre:'Cuadros de Mariposas Tropicales Naturales', descripcion:'Arctiidae · Saturnidae · Sphingidae · Uranidae · Amazónicas', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.26_dvuw9x.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/NOCTURNSA-LOG2_nqnnth', colorFondo:'rgba(10,10,30,0.85)', ruta:'/catalogo/nocturnas' },
  { id:8, nombre:'🪲 Coleópteros & Artrópodos', descripcion:'Escarabajos · Arañas · Mantis · Calidad A1 · SERFOR', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.28_vobsdz.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/HERAMIENTAS_BIOLOGICAS_zhvrn2', colorFondo:'rgba(20,10,5,0.85)', ruta:'/catalogo/coleoptera' },
  { id:9, nombre:'💎 Minerales & Piedras Preciosas', descripcion:'Minerales peruanos · Piedras preciosas · Colección', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(5,20,30,0.85)', ruta:'/catalogo/minerales' },
  { id:10, nombre:'🌱 Semillas & Plantas Medicinales', descripcion:'Flora amazónica · Medicinales · Orgánicas · SENASA', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(5,20,10,0.85)', ruta:'/catalogo/semillas' },
  { id:11, nombre:'🍎 Frutas Exóticas & Deshidratadas', descripcion:'Frutas amazónicas · Wild · Deshidratadas · SENASA', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(20,10,5,0.85)', ruta:'/catalogo/frutas' },
  { id:12, nombre:'🍄 Hongos & Productos Naturales', descripcion:'Hongos amazónicos · Medicinales · Deshidratados', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(10,20,5,0.85)', ruta:'/catalogo/hongos' },
  { id:13, nombre:'🧶 Textilería & Alpaca', descripcion:'Alpaca · Textilería amazónica · Artesanal', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(20,15,5,0.85)', ruta:'/catalogo/textileria' },
  { id:14, nombre:'🌶️ Alimentos Deshidratados', descripcion:'Condimentos amazónicos · Naturales · Sin preservantes', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(25,10,5,0.85)', ruta:'/catalogo/alimentos' },
  { id:15, nombre:'🎨 Pinturas & Arte Rupestre', descripcion:'Arte amazónico · Pinturas naturales · Colección', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(20,10,15,0.85)', ruta:'/catalogo/pinturas' },
  { id:16, nombre:'🪵 Maderas Finas & Esculturas', descripcion:'Maderas amazónicas · Esculturas · SERFOR certificado', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(15,10,5,0.85)', ruta:'/catalogo/maderas' },
  { id:17, nombre:'🌸 Esencias & Aceites Naturales', descripcion:'Aceites esenciales · Amazónicos · Medicinales', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(20,5,15,0.85)', ruta:'/catalogo/esencias' },
]

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  .home-logo{animation:fadeInDown 0.8s ease;transition:transform 0.4s ease,filter 0.3s ease}
  .home-logo:hover{transform:scale(1.1) rotate(5deg);filter:drop-shadow(0 0 20px rgba(201,168,76,0.7))}
  .home-title{animation:fadeInUp 0.7s ease 0.1s both}
  .home-sub{animation:fadeInUp 0.7s ease 0.2s both}
  .home-btn{transition:transform 0.18s ease,box-shadow 0.18s ease,opacity 0.18s ease}
  .home-btn:hover{transform:translateY(-3px) scale(1.06);box-shadow:0 8px 20px rgba(0,0,0,0.4);opacity:0.92}
  .home-btn-wa:hover{box-shadow:0 8px 20px rgba(37,211,102,0.5)!important}
  .home-btn-email:hover{box-shadow:0 8px 20px rgba(201,168,76,0.4)!important}
  .home-footer-link{transition:color 0.2s ease,transform 0.2s ease;display:inline-block}
  .home-footer-link:hover{color:#C9A84C!important;transform:translateY(-2px)}
  .cat-card{transition:transform 0.25s ease,box-shadow 0.25s ease;overflow:hidden;position:relative}
  .cat-card:hover{transform:scale(1.03);box-shadow:0 12px 40px rgba(0,0,0,0.7),0 0 0 2px rgba(201,168,76,0.4)}
  .cat-card:hover .cat-img{transform:scale(1.08);opacity:0.85}
  .cat-card:hover .cat-title{color:#fff!important}
  .cat-card:hover .cat-ver{color:rgba(201,168,76,0.9)!important;letter-spacing:0.12em}
  .cat-card:hover .cat-line{width:50px!important}
  .cat-img{transition:transform 0.4s ease,opacity 0.3s ease}
  .cat-title{transition:color 0.2s ease}
  .cat-ver{transition:color 0.2s ease,letter-spacing 0.2s ease}
  .cat-line{transition:width 0.3s ease}
  .video-logo{animation:pulse 3s infinite;transition:transform 0.3s ease}
  .video-logo:hover{transform:scale(1.15)!important;animation:none}
  .video-title{animation:fadeInUp 0.6s ease}
  .video-btn-catalogo{transition:transform 0.18s ease,box-shadow 0.18s ease}
  .video-btn-catalogo:hover{transform:translateY(-4px) scale(1.06);box-shadow:0 10px 30px rgba(201,168,76,0.5)!important}
  .video-btn-volver{transition:transform 0.18s ease,border-color 0.18s ease,color 0.18s ease}
  .video-btn-volver:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.6)!important;color:white!important}
`

export default function Home() {
  const [activo, setActivo] = useState<number|null>(null)
  const cat = CATALOGOS.find(c=>c.id===activo)

  if (activo && cat) {
    return (
      <div style={{minHeight:'100vh',background:'#000',position:'relative',overflow:'hidden',fontFamily:'Georgia,serif'}}>
        <style>{CSS}</style>
        <video autoPlay loop muted playsInline preload="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.65}}><source src={cat.video} type="video/mp4"/></video>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom,rgba(0,0,0,0.2),${cat.colorFondo})`}}/>
        <div style={{position:'relative',zIndex:10,minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px'}}>
          <img src={cat.imagen} alt={cat.nombre} className="video-logo" style={{width:150,height:150,borderRadius:'50%',border:'2px solid #C9A84C',objectFit:'cover',marginBottom:20}}/>
          <h1 className="video-title" style={{fontSize:'clamp(1.8rem,5vw,3.5rem)',fontWeight:400,color:'#E8C97A',marginBottom:12}}>{cat.nombre}</h1>
          <p style={{fontSize:'1.1rem',color:'rgba(255,255,255,0.8)',marginBottom:32,maxWidth:500,lineHeight:1.8}}>{cat.descripcion}</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginBottom:16}}>
            <a href="https://wa.me/51940699405" target="_blank" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
            <a href="https://wa.me/51920644433" target="_blank" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
          </div>
          <a href={cat.ruta} className="video-btn-catalogo" style={{background:'#C9A84C',color:'#1A1209',padding:'12px 32px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none',marginBottom:16,display:'inline-block'}}>🦋 Ver Catálogo Completo →</a>
          <button onClick={()=>setActivo(null)} className="video-btn-volver" style={{background:'transparent',border:'1px solid rgba(255,255,255,0.3)',color:'rgba(255,255,255,0.6)',padding:'10px 24px',borderRadius:4,fontSize:'.8rem',cursor:'pointer',marginTop:8}}>← Volver al inicio</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif'}}>
      <style>{CSS}</style>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'50px 20px 30px',textAlign:'center'}}>
        <Image src="/logo-house-insects-peru.png" alt="House Insects of Peru" width={160} height={160} loading="eager" className="home-logo" style={{marginBottom:20,filter:'drop-shadow(0 8px 24px rgba(201,168,76,0.4))'}} onError={(e)=>{(e.target as HTMLImageElement).src='/logo.png'}}/>
        <h1 className="home-title" style={{fontSize:'clamp(1.5rem,4vw,2.8rem)',fontWeight:300,color:'#E8C97A',letterSpacing:'.12em',marginBottom:6,textTransform:'uppercase'}}>House Insects of Peru</h1>
        <p className="home-sub" style={{fontSize:'.85rem',color:'rgba(232,201,122,0.45)',letterSpacing:'.15em',marginBottom:4}}>E.I.R.L. · BY JAVIER ZAVALA · EST. 1980</p>
        <p style={{fontSize:'.75rem',color:'rgba(232,201,122,0.3)',marginBottom:30}}>RUC 20447397804 · LEY AMAZÓNIA N°27037 · CITES · SERFOR</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:30}}>
          <a href="https://wa.me/51940699405" target="_blank" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" target="_blank" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
          <a href="mailto:houseinsectsofperu.com.pe@gmail.com" className="home-btn home-btn-email" style={{background:'#1A1209',color:'#C9A84C',border:'1px solid #C9A84C',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>✉️ Email 1</a>
          <a href="mailto:jzalopez02@gmail.com" className="home-btn home-btn-email" style={{background:'#1A1209',color:'#C9A84C',border:'1px solid #C9A84C',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>✉️ Email 2</a>
        </div>
        <div style={{width:200,height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',marginBottom:30}}/>
        <h2 style={{fontSize:'.9rem',color:'rgba(232,201,122,0.5)',letterSpacing:'.3em',textTransform:'uppercase',marginBottom:30}}>Selecciona un Catálogo</h2>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:3,maxWidth:1200,margin:'0 auto',padding:'0 3px 60px'}}>
        {CATALOGOS.map(c=>(
          <button key={c.id} onClick={()=>setActivo(c.id)} className="cat-card" style={{aspectRatio:'1/1',background:'#0A0A0A',border:'none',cursor:'pointer'}}>
            <img src={c.imagen} alt={c.nombre} className="cat-img" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.7}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.1) 60%)'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px',textAlign:'center'}}>
              <h3 className="cat-title" style={{color:'#E8C97A',fontSize:'clamp(.8rem,2vw,.95rem)',fontWeight:400,letterSpacing:'.06em',marginBottom:6}}>{c.nombre}</h3>
              <div className="cat-line" style={{width:25,height:1,background:'#C9A84C',margin:'0 auto 6px'}}/>
              <p className="cat-ver" style={{color:'rgba(255,255,255,0.5)',fontSize:'.68rem'}}>Ver colección →</p>
            </div>
          </button>
        ))}
      </div>
      <div style={{textAlign:'center',padding:'20px',borderTop:'1px solid rgba(201,168,76,0.15)'}}>
        <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <a href="/privacidad" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🔒 Privacidad</a>
          <a href="/terminos" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📋 Términos</a>
          <a href="/envios" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🚚 Envíos</a>
          <a href="/contacto" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📞 Contacto</a>
          <a href="/partidas" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📋 Partidas</a>
          <a href="/rastreo" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🔍 Rastreo</a>
        </div>
        <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.65rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARÍA, PERÚ · EXPORTACIÓN MUNDIAL</p>
      </div>
    </div>
  )
}
