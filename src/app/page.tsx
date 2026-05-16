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

  return (
    <div style={{ minHeight:'100vh', background:'#1A1209', fontFamily:'Georgia, serif' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', padding:'60px 20px 40px', textAlign:'center' }}>
        <Image src="/logo.png" alt="House Insects of Peru" width={180} height={180} loading="eager" style={{ marginBottom:24, filter:'drop-shadow(0 8px 24px rgba(201,168,76,0.4))' }} />
        <h1 style={{ fontSize:'clamp(1.5rem,4vw,2.8rem)', fontWeight:300, color:'#E8C97A', letterSpacing:'.12em', marginBottom:8, textTransform:'uppercase' }}>House Insects of Peru</h1>
        <p style={{ fontSize:'.85rem', color:'rgba(232,201,122,0.45)', letterSpacing:'.15em', marginBottom:4 }}>E.I.R.L. · BY JAVIER ZAVALA · EST. 1980</p>
        <p style={{ fontSize:'.8rem', color:'rgba(232,201,122,0.35)', letterSpacing:'.1em', marginBottom:48 }}>RUC 20447397804 · LEY AMAZÓNIA N°27037 · CITES · SERFOR</p>
        <div style={{ width:200, height:1, background:'linear-gradient(to right, transparent, #C9A84C, transparent)', marginBottom:48 }} />
        <h2 style={{ fontSize:'.9rem', color:'rgba(232,201,122,0.5)', letterSpacing:'.3em', textTransform:'uppercase', marginBottom:40 }}>Selecciona un Catálogo</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:2, maxWidth:1200, margin:'0 auto', padding:'0 2px 60px' }}>
        {CATALOGOS.map(c => (
          <button key={c.id} onClick={() => setActivo(c.id)}
            style={{ position:'relative', aspectRatio:'16/9', background:c.colorFondo, border:'none', cursor:'pointer', overflow:'hidden', fontFamily:'Georgia, serif' }}>
            <video muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.5 }}
              onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
              onMouseLeave={e => (e.currentTarget as HTMLVideoElement).pause()}>
              <source src={c.video} type="video/mp4" />
            </video>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))' }} />
            <div style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:'20px', textAlign:'center' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:8 }}>{c.emoji}</div>
              <h3 style={{ color:'#E8C97A', fontSize:'clamp(.85rem,2vw,1rem)', fontWeight:400, letterSpacing:'.08em', marginBottom:6 }}>{c.nombre}</h3>
              <div style={{ width:30, height:1, background:c.acento, margin:'0 auto 8px' }} />
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'.7rem' }}>Ver colección →</p>
            </div>
          </button>
        ))}
      </div>
      <div style={{ textAlign:'center', padding:'30px', borderTop:'1px solid rgba(201,168,76,0.15)' }}>
        <p style={{ color:'rgba(232,201,122,0.3)', fontSize:'.7rem', letterSpacing:'.1em' }}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARÍA, PERÚ · EXPORTACIÓN MUNDIAL</p>
      </div>
    </div>
  )
}
