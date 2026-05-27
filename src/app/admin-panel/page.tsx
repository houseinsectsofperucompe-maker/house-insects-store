'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const MODULOS = [
  { name: 'Web en Vivo', path: 'https://www.houseinsectsofperu.com', icon: '🌐', ext: true },
  { name: 'Alquiler Banners', path: '/admin-panel/banners', icon: '🖼️', ext: false },
  { name: 'Creador de Avisos', path: '/admin-panel/avisos', icon: '📢', ext: false },
  { name: 'Demografia', path: '/admin-panel/demografia', icon: '📊', ext: false },
  { name: 'Especimenes', path: '/admin-panel/especimenes', icon: '🦋', ext: false },
  { name: 'Fotos & Sellos', path: '/admin-panel/sellos', icon: '🛡️', ext: false },
  { name: 'Archivos', path: '/admin-panel/archivos', icon: '📁', ext: false },
  { name: 'Prospectos', path: '/admin-panel/prospectos', icon: '👥', ext: false },
  { name: 'Admin Operativo', path: '/admin', icon: '⚙️', ext: false },
  { name: 'Sanity Studio', path: 'https://houseinsectsofperu.sanity.studio', icon: '🗂️', ext: true },
  { name: 'Vercel', path: 'https://vercel.com', icon: '▲', ext: true },
  { name: 'Especimenes Secos', path: '/catalogo/especimenes', icon: '🦋', ext: false },
  { name: 'Coleoptera', path: '/catalogo/coleoptera', icon: '🪲', ext: false },
  { name: 'Pinturas', path: '/catalogo/pinturas', icon: '🖼️', ext: false },
  { name: 'Joyeria', path: '/catalogo/joyeria', icon: '💎', ext: false },
  { name: 'Herramientas', path: '/catalogo/herramientas', icon: '🔧', ext: false },
  { name: 'Minerales', path: '/catalogo/minerales', icon: '💎', ext: false },
  { name: 'Textiles', path: '/catalogo/textiles', icon: '🧵', ext: false },
  { name: 'Maderas', path: '/catalogo/maderas', icon: '🪵', ext: false },
  { name: 'Hongos', path: '/catalogo/hongos', icon: '🍄', ext: false },
  { name: 'Plantas Medicinales', path: '/catalogo/plantas', icon: '🌿', ext: false },
  { name: 'Condimentos', path: '/catalogo/condimentos', icon: '🌶️', ext: false },
  { name: 'Artesanias Plata', path: '/catalogo/artesanias-plata', icon: '🥈', ext: false },
  { name: 'Artesanias Bronce', path: '/catalogo/artesanias-bronce', icon: '🥉', ext: false },
  { name: 'Esculturas', path: '/catalogo/esculturas', icon: '🗿', ext: false },
  { name: 'Arte Digital', path: '/catalogo/arte-digital', icon: '🎨', ext: false },
  { name: 'Videos', path: '/catalogo/videos', icon: '🎥', ext: false },
  { name: 'Documentos', path: '/catalogo/documentos', icon: '📄', ext: false },
  { name: 'Google Analytics', path: 'https://analytics.google.com', icon: '📈', ext: true },
  { name: 'Especimenes Biologicos', path: '/catalogo/especimenes', icon: '🦋', ext: false },
  { name: 'Cuadros Mariposas Diurnas', path: '/catalogo/diurnas', icon: '🦋', ext: false },
  { name: 'Joyeria Natural', path: '/catalogo/joyeria', icon: '💎', ext: false },
  { name: 'Rarezas & Gynandromorphs', path: '/catalogo/rarezas', icon: '✨', ext: false },
  { name: 'Artesanias & Cupulas', path: '/catalogo/artesanias', icon: '🏺', ext: false },
  { name: 'Herramientas Biologicas', path: '/catalogo/herramientas', icon: '🔬', ext: false },
  { name: 'Cuadros Nocturnas', path: '/catalogo/nocturnas', icon: '🌙', ext: false },
  { name: 'Coleopteros & Artropodos', path: '/catalogo/coleoptera', icon: '🪲', ext: false },
  { name: 'Minerales & Piedras', path: '/catalogo/minerales', icon: '💎', ext: false },
  { name: 'Semillas & Plantas', path: '/catalogo/semillas', icon: '🌿', ext: false },
  { name: 'Frutas Exoticas', path: '/catalogo/frutas', icon: '🍍', ext: false },
  { name: 'Hongos & Naturales', path: '/catalogo/hongos', icon: '🍄', ext: false },
  { name: 'Textileria & Alpaca', path: '/catalogo/textileria', icon: '🧵', ext: false },
  { name: 'Alimentos Deshidratados', path: '/catalogo/alimentos', icon: '🌶️', ext: false },
  { name: 'Pinturas & Arte Rupestre', path: '/catalogo/pinturas', icon: '🎨', ext: false },
  { name: 'Maderas & Esculturas', path: '/catalogo/maderas', icon: '🪵', ext: false },
  { name: 'Esencias & Aceites', path: '/catalogo/esencias', icon: '🧴', ext: false },
  { name: 'Bunny.net', path: 'https://dash.bunny.net', icon: '🐰', ext: true },
]

export default function AdminPanelDashboard() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'ok') setAuthed(true)
  }, [])

  const login = () => {
    if (pass === 'HouseInsects2026@') {
      sessionStorage.setItem('admin_auth', 'ok')
      setAuthed(true)
    } else setError('Contraseña incorrecta')
  }

  if (!authed) return (
    <main style={{minHeight:'100vh',background:'#0A0A05',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif'}}>
      <div style={{background:'#1A1209',border:'1px solid rgba(201,168,76,0.3)',borderRadius:12,padding:40,width:340,textAlign:'center'}}>
        <div style={{fontSize:'3rem',marginBottom:8}}>🦋</div>
        <h1 style={{color:'#C9A84C',fontSize:'1rem',letterSpacing:'.2em',marginBottom:4}}>HOUSE INSECTS</h1>
        <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginBottom:24}}>Panel de Administración</p>
        <input type="password" placeholder="Contraseña" value={pass}
          onChange={e=>setPass(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login()}
          style={{width:'100%',padding:'10px 12px',background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',borderRadius:6,fontFamily:'Georgia,serif',fontSize:'.85rem',marginBottom:8,boxSizing:'border-box' as any}}/>
        {error&&<p style={{color:'#ff6464',fontSize:'.75rem',marginBottom:8}}>{error}</p>}
        <button onClick={login} style={{width:'100%',padding:'12px',background:'#C9A84C',color:'#0A0A05',border:'none',borderRadius:6,fontWeight:700,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.9rem'}}>Ingresar</button>
      </div>
    </main>
  )

  return (
    <div style={{padding:30,background:'#0A0A05',minHeight:'100vh',fontFamily:'Georgia,serif'}}>
      <header style={{marginBottom:30,borderBottom:'1px solid rgba(201,168,76,0.2)',paddingBottom:15,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <h1 style={{color:'#C9A84C',margin:0,fontSize:'1.3rem',letterSpacing:'.2em'}}>🦋 HOUSE INSECTS — PANEL DE CONTROL</h1>
          <p style={{color:'rgba(201,168,76,0.4)',margin:'5px 0 0',fontSize:'.75rem'}}>Ecosistema de Control Automatizado · E.I.R.L. · RUC 20447397804</p>
        </div>
        <button onClick={()=>{sessionStorage.removeItem('admin_auth');setAuthed(false)}}
          style={{background:'transparent',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'6px 16px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontFamily:'Georgia,serif'}}>Salir</button>
      </header>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:16}}>
        {MODULOS.map((m,i)=>(
          <a href={m.path} key={i} target={m.ext?'_blank':'_self'} rel="noopener noreferrer" style={{textDecoration:'none'}}>
            <div style={{background:'#1A1209',padding:20,borderRadius:10,border:'1px solid rgba(201,168,76,0.2)',cursor:'pointer',height:'100%'}}>
              <span style={{fontSize:'2rem',display:'block',marginBottom:10}}>{m.icon}</span>
              <h3 style={{color:'#E8C97A',margin:'0 0 6px',fontSize:'.85rem'}}>{m.name}</h3>
              <span style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem'}}>{m.ext?'Abrir externo →':'Abrir panel →'}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
