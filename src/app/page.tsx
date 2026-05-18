'use client'
import Image from 'next/image'
import { useState } from 'react'
const CATALOGOS = [
  { id:1, nombre:'Especímenes Biológicos Secos', descripcion:'Mariposas diurnas · Calidad A1 · CITES certificado', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/cazador_catlogo_mariposas_diurnas_vi%CC%81deo_mp__j2nfez.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/logo-house-insects-peru_pvmkud', colorFondo:'rgba(10,30,10,0.85)', ruta:'/catalogo/especimenes' },
  { id:2, nombre:'Mariposas Nocturnas', descripcion:'Especies nocturnas · Raras · Amazónicas', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.26_dvuw9x.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/NOCTURNSA-LOG2_nqnnth', colorFondo:'rgba(10,10,30,0.85)', ruta:'/catalogo/nocturnas' },
  { id:3, nombre:'Joyería Natural', descripcion:'Oro · Plata · Alas naturales · Artesanal', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.48_sg6ybr.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/Joyerias_y_cuadros_en_oro_Y_PLATA_y67in5', colorFondo:'rgba(30,20,0,0.85)', ruta:'/catalogo/joyeria' },
  { id:4, nombre:'Rarezas & Gynandromorphs', descripcion:'Piezas únicas · Aberraciones · Colección élite', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778870094/house_insects_peru_intro_ujjmrv.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/rarezas_y_gyanadrmophos_yeno1o', colorFondo:'rgba(20,10,30,0.85)', ruta:'/catalogo/rarezas' },
  { id:5, nombre:'Artesanías & Cúpulas', descripcion:'Cuadros · Cúpulas · Resinas · Arte amazónico', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa', colorFondo:'rgba(30,15,5,0.85)', ruta:'/catalogo/artesanias' },
  { id:6, nombre:'Herramientas Biológicas', descripcion:'Sets disección · Lupas binoculares · Kits montaje', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.28_vobsdz.mp4', imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/HERAMIENTAS_BIOLOGICAS_zhvrn2', colorFondo:'rgba(5,15,30,0.85)', ruta:'/catalogo/herramientas' },
]
export default function Home() {
  const [activo, setActivo] = useState<number|null>(null)
  const cat = CATALOGOS.find(c=>c.id===activo)
  if (activo && cat) {
    return (
      <div style={{minHeight:'100vh',background:'#000',position:'relative',overflow:'hidden',fontFamily:'Georgia,serif'}}>
        <video autoPlay loop muted playsInline preload="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.65}}><source src={cat.video} type="video/mp4"/></video>
        <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom,rgba(0,0,0,0.2),${cat.colorFondo})`}}/>
        <div style={{position:'relative',zIndex:10,minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px'}}>
          <img src={cat.imagen} alt={cat.nombre} style={{width:150,height:150,borderRadius:'50%',border:'2px solid #C9A84C',objectFit:'cover',marginBottom:20}}/>
          <h1 style={{fontSize:'clamp(1.8rem,5vw,3.5rem)',fontWeight:400,color:'#E8C97A',marginBottom:12}}>{cat.nombre}</h1>
          <p style={{fontSize:'1.1rem',color:'rgba(255,255,255,0.8)',marginBottom:32,maxWidth:500,lineHeight:1.8}}>{cat.descripcion}</p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginBottom:16}}>
            <a href="https://wa.me/51940699405" target="_blank" style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
            <a href="https://wa.me/51920644433" target="_blank" style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
          </div>
          <a href={cat.ruta} style={{background:'#C9A84C',color:'#1A1209',padding:'12px 32px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none',marginBottom:16,display:'inline-block'}}>🦋 Ver Catálogo Completo →</a>
          <button onClick={()=>setActivo(null)} style={{background:'transparent',border:'1px solid rgba(255,255,255,0.3)',color:'rgba(255,255,255,0.6)',padding:'10px 24px',borderRadius:4,fontSize:'.8rem',cursor:'pointer',marginTop:8}}>← Volver al inicio</button>
        </div>
      </div>
    )
  }
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'50px 20px 30px',textAlign:'center'}}>
        <Image src="/logo.png" alt="House Insects of Peru" width={160} height={160} loading="eager" style={{marginBottom:20,filter:'drop-shadow(0 8px 24px rgba(201,168,76,0.4))'}}/>
        <h1 style={{fontSize:'clamp(1.5rem,4vw,2.8rem)',fontWeight:300,color:'#E8C97A',letterSpacing:'.12em',marginBottom:6,textTransform:'uppercase'}}>House Insects of Peru</h1>
        <p style={{fontSize:'.85rem',color:'rgba(232,201,122,0.45)',letterSpacing:'.15em',marginBottom:4}}>E.I.R.L. · BY JAVIER ZAVALA · EST. 1980</p>
        <p style={{fontSize:'.75rem',color:'rgba(232,201,122,0.3)',marginBottom:30}}>RUC 20447397804 · LEY AMAZÓNIA N°27037 · CITES · SERFOR</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:30}}>
          <a href="https://wa.me/51940699405" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
          <a href="mailto:houseinsectsofperu.com.pe@gmail.com" style={{background:'#1A1209',color:'#C9A84C',border:'1px solid #C9A84C',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>✉️ Email 1</a>
          <a href="mailto:jzalopez02@gmail.com" style={{background:'#1A1209',color:'#C9A84C',border:'1px solid #C9A84C',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>✉️ Email 2</a>
        </div>
        <div style={{width:200,height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',marginBottom:30}}/>
        <h2 style={{fontSize:'.9rem',color:'rgba(232,201,122,0.5)',letterSpacing:'.3em',textTransform:'uppercase',marginBottom:30}}>Selecciona un Catálogo</h2>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:3,maxWidth:1200,margin:'0 auto',padding:'0 3px 60px'}}>
        {CATALOGOS.map(c=>(
          <button key={c.id} onClick={()=>setActivo(c.id)} style={{position:'relative',aspectRatio:'1/1',background:'#0A0A0A',border:'none',cursor:'pointer',overflow:'hidden'}}>
            <img src={c.imagen} alt={c.nombre} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.7}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.1) 60%)'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px',textAlign:'center'}}>
              <h3 style={{color:'#E8C97A',fontSize:'clamp(.8rem,2vw,.95rem)',fontWeight:400,letterSpacing:'.06em',marginBottom:6}}>{c.nombre}</h3>
              <div style={{width:25,height:1,background:'#C9A84C',margin:'0 auto 6px'}}/>
              <p style={{color:'rgba(255,255,255,0.5)',fontSize:'.68rem'}}>Ver colección →</p>
            </div>
          </button>
        ))}
      </div>
      <div style={{textAlign:'center',padding:'20px',borderTop:'1px solid rgba(201,168,76,0.15)'}}>
        <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <a href="/privacidad" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🔒 Privacidad</a>
          <a href="/terminos" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📋 Términos</a>
          <a href="/envios" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🚚 Envíos</a>
          <a href="/contacto" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📞 Contacto</a>
        </div>
        <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.65rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARÍA, PERÚ · EXPORTACIÓN MUNDIAL</p>
      </div>
    </div>
  )
}
