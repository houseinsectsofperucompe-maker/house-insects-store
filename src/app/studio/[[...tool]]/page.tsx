'use client'
import Image from 'next/image'
import { useState } from 'react'

const CATALOGOS = [
  { id:1, nombre:'Especímenes Biológicos Secos', nombreCorto:'especimenes', emoji:'🦋', descripcion:'Mariposas diurnas · Calidad A1 · CITES certificado · Envío mundial', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/cazador_catlogo_mariposas_diurnas_vi%CC%81deo_mp__j2nfez.mp4', colorFondo:'rgba(10,30,10,0.85)', acento:'#4A8A4A', boton:'Ver Colección →' },
  { id:2, nombre:'Mariposas Nocturnas', nombreCorto:'nocturnas', emoji:'🌙', descripcion:'Especies nocturnas · Raras · Amazónicas · Colección única', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.26_dvuw9x.mp4', colorFondo:'rgba(10,10,30,0.85)', acento:'#6A6ACA', boton:'Ver Nocturnas →' },
  { id:3, nombre:'Joyería Natural', nombreCorto:'joyeria', emoji:'✨', descripcion:'Oro · Plata · Alas naturales · Artesanal · Pieza única', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.48_sg6ybr.mp4', colorFondo:'rgba(30,20,0,0.85)', acento:'#C9A84C', boton:'Ver Joyería →' },
  { id:4, nombre:'Rarezas & Gynandromorphs', nombreCorto:'rarezas', emoji:'💎', descripcion:'Piezas únicas · Aberraciones · Gynandromorphs · Colección élite', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778870094/house_insects_peru_intro_ujjmrv.mp4', colorFondo:'rgba(20,10,30,0.85)', acento:'#9A6ACA', boton:'Ver Rarezas →' },
  { id:5, nombre:'Artesanías & Resinas', nombreCorto:'artesanias', emoji:'🏺', descripcion:'Cuadros · Cúpulas · Resinas · Arte natural amazónico', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4', colorFondo:'rgba(30,15,5,0.85)', acento:'#CA8A4A', boton:'Ver Artesanías →' },
  { id:6, nombre:'Herramientas Biológicas', nombreCorto:'herramientas', emoji:'🔬', descripcion:'Sets disección · Lupas binoculares · Kits montaje · Profesional', video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.28_vobsdz.mp4', colorFondo:'rgba(5,15,30,0.85)', acento:'#4A8ACA', boton:'Ver Herramientas →' },
]

export default function Home() {
  const [activo, setActivo] = useState<number | null>(null)
  const cat = CATALOGOS.find(c => c.id === activo)

  if (activo && cat) {
    return (
      <div style={{ minHeight:'100vh', background:'#000', position:'relative', overflow:'hidden', fontFamily:'Georgia, serif' }}>
        <video autoPlay loop muted playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.65 }}>
          <source src={cat.video} type="video/mp4" />
        </video>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, rgba(0,0,0,0.2), ${cat.colorFondo})` }} />
        <div style={{ position:'relative', zIndex:10, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px' }}>
          <Image src="/logo.png" alt="House Insects of Peru" width={90} height={90} loading="eager" style={{ marginBottom:24, filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.8))' }} />
          <div style={{ fontSize:'5rem', marginBottom:16 }}>{cat.emoji}</div>
          <h1 style={{ fontSize:'clamp(1.8rem,5vw,3.5rem)', fontWeight:400, color:'#E8C97A', letterSpacing:'.08em', marginBottom:16, textShadow:'0 2px 12px rgba(0,0,0,0.8)' }}>{cat.nombre}</h1>
          <p style={{ fontSize:'clamp(.9rem,2vw,1.1rem)', color:'rgba(255,255,255,0.8)', marginBottom:40, maxWidth:500, lineHeight:1.8 }}>{cat.descripcion}</p>
          <div style={{ display:'inline-block', background:cat.acento, color:'#1A1209', padding:'16px 40px', borderRadius:4, fontSize:'1rem', fontWeight:700, letterSpacing:'.06em', marginBottom:20 }}>{cat.boton}</div>
          <br/>
          <button onClick={() => setActivo(null)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.3)', color:'rgba(255,255,255,0.6)', padding:'10px 24px', borderRadius:4, fontSize:'.8rem', cursor:'pointer', fontFamily:'Georgia, serif', marginTop:12 }}>← Volver al inicio</button>
        </div>
      </div>
    )
  }
