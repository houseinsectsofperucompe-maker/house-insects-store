'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const MODULOS = [
  { name: 'Web en Vivo', path: 'https://www.houseinsectsofperu.com', icon: '🌐', ext: true },
  { name: 'Alquiler Banners', path: '/admin-panel/banners', icon: '🖼️', ext: false },
  { name: 'Creador de Avisos', path: '/admin-panel/avisos', icon: '📢', ext: false },
  { name: 'Demografia', path: '/admin-panel/demografia', icon: '📊', ext: false },
  { name: 'Especimenes', path: '/admin-panel/especimenes', icon: '🦋', ext: false },
  { name: 'Pedidos', path: '/admin-panel/pedidos', icon: '🛒', ext: false },
  { name: 'Clientes', path: '/admin-panel/clientes', icon: '👥', ext: false },
  { name: 'Stock', path: '/admin-panel/stock', icon: '📦', ext: false },
  { name: 'Logistica y Pagos', path: '/admin-panel/logistica', icon: '🚚', ext: false },
  { name: 'SEO', path: '/admin-panel/seo', icon: '🔍', ext: false },
  { name: 'Catalogo Estructura', path: '/admin-panel/catalogo', icon: '📦', ext: false },
  { name: 'Imagenes', path: '/admin-panel/imagenes', icon: '🖼️', ext: false },
  { name: 'Catalogo Estructura', path: '/admin-panel/catalogo', icon: '📦', ext: false },
  { name: 'Imagenes', path: '/admin-panel/imagenes', icon: '🖼️', ext: false },
  { name: 'Clientes', path: '/admin-panel/clientes', icon: '👥', ext: false },
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
  { name: 'Facebook Page', path: 'https://www.facebook.com/houseinsectsofperu', icon: '📘', ext: true },
  { name: 'Instagram', path: 'https://www.instagram.com/houseinsectsofperu', icon: '📸', ext: true },
  { name: 'TikTok', path: 'https://www.tiktok.com/@houseinsectsofperu', icon: '🎵', ext: true },
  { name: 'YouTube', path: 'https://www.youtube.com/@houseinsectsofperu', icon: '▶️', ext: true },
  { name: 'WeChat Business', path: 'https://work.weixin.qq.com', icon: '💬', ext: true },
  { name: 'WhatsApp 1', path: 'https://wa.me/51940699405', icon: '📱', ext: true },
  { name: 'WhatsApp 2', path: 'https://wa.me/51920644433', icon: '📱', ext: true },
  { name: 'Payoneer', path: 'https://www.payoneer.com/signin', icon: '💳', ext: true },
  { name: 'WorldFirst Bank', path: 'https://www.worldfirst.com/login', icon: '🏦', ext: true },
  { name: 'Metricool', path: 'https://app.metricool.com', icon: '📊', ext: true },
  { name: 'Katenos Business', path: 'https://katenos.com', icon: '🏪', ext: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/company/house-insects-of-peru', icon: '💼', ext: true },
  { name: 'Flickr', path: 'https://www.flickr.com/photos/houseinsectsofperu', icon: '📷', ext: true },
  { name: '1688 Alibaba', path: 'https://www.1688.com', icon: '🇨🇳', ext: true },
  { name: 'Alibaba Global', path: 'https://www.alibaba.com', icon: '🌏', ext: true },
  { name: 'Alipay', path: 'https://www.alipay.com', icon: '💰', ext: true },
  { name: 'Stripe', path: 'https://dashboard.stripe.com', icon: '💳', ext: true },
  { name: 'Izipay', path: 'https://micuentaweb.pe', icon: '💳', ext: true },
  { name: 'Lloyds Seguro', path: 'https://www.lloyds.com', icon: '🛡️', ext: true },
  { name: 'MAPFRE Seguro', path: 'https://www.mapfre.com.pe', icon: '🛡️', ext: true },
  { name: 'Rimac Seguro', path: 'https://www.rimac.com', icon: '🛡️', ext: true },
  { name: 'ExportaFacil SERPOST', path: 'https://exportafacil.serpost.com.pe', icon: '📦', ext: true },
  { name: 'SEMS Internacional', path: 'https://sems.gob.pe', icon: '📦', ext: true },
  { name: 'SERPOST', path: 'https://www.serpost.com.pe', icon: '📮', ext: true },
  { name: 'SUNAT', path: 'https://www.sunat.gob.pe', icon: '🏛️', ext: true },
  { name: 'SERFOR', path: 'https://www.serfor.gob.pe', icon: '🌳', ext: true },
  { name: 'SENASA', path: 'https://www.senasa.gob.pe', icon: '🌱', ext: true },
  { name: 'DIGESA', path: 'https://www.digesa.gob.pe', icon: '⚕️', ext: true },
  { name: 'DIGEMID', path: 'https://www.digemid.minsa.gob.pe', icon: '💊', ext: true },
  { name: 'CITES Peru', path: 'https://www.serfor.gob.pe/cites', icon: '🦋', ext: true },
  { name: 'DHL Express', path: 'https://www.dhl.com/pe-es/home.html', icon: '✈️', ext: true },
  { name: 'FedEx', path: 'https://www.fedex.com/es-pe', icon: '📦', ext: true },
  { name: 'UPS', path: 'https://www.ups.com/pe', icon: '📦', ext: true },
  { name: 'PromPeru', path: 'https://www.promperu.gob.pe', icon: '🇵🇪', ext: true },
  { name: 'Promex', path: 'https://www.promex.com.pe', icon: '🇵🇪', ext: true },
  { name: 'MINCETUR', path: 'https://www.mincetur.gob.pe', icon: '🏛️', ext: true },
  { name: 'ADEX', path: 'https://www.adexperu.org.pe', icon: '📊', ext: true },
  { name: 'COMEXPERU', path: 'https://www.comexperu.org.pe', icon: '📊', ext: true },
  { name: 'SIICEX', path: 'https://www.siicex.gob.pe', icon: '📈', ext: true },
  { name: 'VUCE', path: 'https://www.vuce.gob.pe', icon: '📋', ext: true },
  { name: 'PRODUCE', path: 'https://www.produce.gob.pe', icon: '🏭', ext: true },
  { name: 'MINCUL', path: 'https://www.cultura.gob.pe', icon: '🎭', ext: true },
  { name: 'SUNAT SOL', path: 'https://so  { nat.gob.pe', icon: '💰', ext: true },
  { name: 'Aduanas SUNAT', path: 'https://www.sunat.gob.pe/aduanas', icon: '🛃', ext: true },
  { name: 'Banco de la Nacion', path: 'https://www.bn.com.pe', icon: '🏦', ext: true },
  { name: 'BCRP', path: 'https://www.bcrp.gob.pe', icon: '🏦', ext: true },
  { name: 'Interbank', path: 'https://www.interbank.pe', icon: '🏦', ext: true },
  { name: 'BBVA Peru', path: 'https://www.bbva.pe', icon: '🏦', ext: true },
  { name: 'BCP', path: 'https://www.viabcp.com', icon: '🏦', ext: true },
  { name: 'Scotiabank', path: 'https://www.scotiabank.com.pe', icon: '🏦', ext: true },
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
