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

  // PANTALLA DE DETALLE (CUANDO SE SELECCIONA UN CATÁLOGO)
  if (activo && cat) {
    return (
      <div style={{ minHeight:'100vh', background:'#000', position:'relative', overflow:'hidden', fontFamily:'Georgia, serif' }}>
        <video autoPlay loop muted playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:.65 }}>
          <source src={cat.video} type="video/mp4" />
        </video>
        <div style={{ position:'absolute', inset:0, background:`linear-gradient(to bottom, rgba(0,0,0,0.2), ${cat.colorFondo})` }} />
        <div style={{ position:'relative', zIndex:10, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'40px' }}>
          
          {/* Si no tienes la imagen /logo.png aún en tu carpeta public, usamos texto temporal elegante para que no rompa */}
          <div style={{ color: '#E8C97A', fontSize: '1.2rem', letterSpacing: '3px', marginBottom: '20px', fontWeight: 'bold' }}>
            HOUSE INSECTS OF PERU
          </div>
          
          <div style={{ fontSize:'5rem', marginBottom:16 }}>{cat.emoji}</div>
          <h1 style={{ fontSize:'clamp(1.8rem,5vw,3.5rem)', fontWeight:400, color:'#E8C97A', letterSpacing:'.08em', marginBottom:16, textShadow:'0 2px 12px rgba(0,0,0,0.8)' }}>{cat.nombre}</h1>
          <p style={{ fontSize:'clamp(.9rem,2vw,1.1rem)', color:'rgba(255,255,255,0.8)', marginBottom:40, maxWidth:500, lineHeight:1.8 }}>{cat.descripcion}</p>
          
          <a 
            href={`https://wa.me/51911491580?text=Hola,%20deseo%20información%20sobre%20el%20catálogo%20de%20${encodeURIComponent(cat.nombre)}`}
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display:'inline-block', background:cat.acento, color:'#1A1209', padding:'16px 40px', borderRadius:4, fontSize:'1rem', fontWeight:700, letterSpacing:'.06em', marginBottom:20, textDecoration:'none' }}
          >
            {cat.boton}
          </a>
          <br/>
          <button onClick={() => setActivo(null)} style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.3)', color:'rgba(255,255,255,0.6)', padding:'10px 24px', borderRadius:4, fontSize:'.8rem', cursor:'pointer', fontFamily:'Georgia, serif', marginTop:12 }}>← Volver al inicio</button>
        </div>
      </div>
    )
  }

  // PANTALLA PRINCIPAL (LA PORTADA DE LA TIENDA)
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#fff', fontFamily: 'Georgia, serif', padding: '60px 20px' }}>
      
      {/* CABECERA */}
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: '#E8C97A', fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '400', letterSpacing: '4px', margin: '0 0 10px 0' }}>
          HOUSE INSECTS OF PERU E.I.R.L.
        </h1>
        <p style={{ color: '#888', fontSize: '1.1rem', fontStyle: 'italic', margin: '0 0 15px 0' }}>
          Exposición y Exportación Internacional de Especímenes Biológicos
        </p>
        <div style={{ fontSize: '0.85rem', color: '#555', letterSpacing: '1px' }}>
          RUC: 20447397804 | Tingo María, Amazonía Peruana
        </div>
      </header>

      {/* RECUADRO DE PRESENTACIÓN */}
      <section style={{ maxWidth: '800px', margin: '0 auto 60px auto', textAlign: 'center', borderTop: '1px solid #222', borderBottom: '1px solid #222', padding: '30px 10px' }}>
        <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.8' }}>
          Con 45 años de experiencia en la selección de material biológico A1. Ofrecemos colecciones élite e investigación taxonómica para los mercados más exigentes del mundo.
        </p>
      </section>

      {/* GRILLA INTERACTIVA DE CATÁLOGOS */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {CATALOGOS.map((item) => (
          <div 
            key={item.id}
            onClick={() => setActivo(item.id)}
            style={{ 
              backgroundColor: '#121212', 
              border: '1px solid #222', 
              borderRadius: '8px', 
              padding: '40px 30px', 
              textAlign: 'center', 
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = item.acento;
              e.currentTarget.style.transform = 'translateY(-5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#222';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>{item.emoji}</div>
            <h3 style={{ color: '#E8C97A', fontSize: '1.4rem', fontWeight: '400', marginBottom: '10px', letterSpacing: '1px' }}>{item.nombre}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5', margin: '0' }}>{item.descripcion}</p>
          </div>
        ))}
      </main>

      {/* PIE DE PÁGINA */}
      <footer style={{ textAlign: 'center', marginTop: '80px', color: '#444', fontSize: '0.8rem', borderTop: '1px solid #1a1a1a', paddingTop: '40px' }}>
        © {new Date().getFullYear()} House Insects of Peru E.I.R.L. Todos los derechos reservados.
      </footer>

    </div>
  )
}