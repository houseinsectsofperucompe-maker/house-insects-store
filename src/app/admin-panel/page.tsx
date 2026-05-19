'use client'
import { useState } from 'react'
import BannerUploader from './BannerUploader'

const PASSWORD = 'HouseInsects2026@'

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  .fade-up{animation:fadeInUp 0.5s ease both}
  .tab-btn{transition:all 0.18s ease;cursor:pointer}
  .tab-btn:hover{transform:translateY(-2px)}
  .card{transition:all 0.2s ease}
  .card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(201,168,76,0.2)!important}
  .action-btn{transition:all 0.18s ease;cursor:pointer}
  .action-btn:hover{transform:translateY(-2px);opacity:0.85}
`

const SECCIONES = [
  {id:'dashboard',icon:'📊',nm:'Dashboard'},
  {id:'productos',icon:'🦋',nm:'Productos'},
  {id:'pedidos',icon:'📦',nm:'Pedidos'},
  {id:'banners',icon:'📢',nm:'Banners'},
  {id:'stock',icon:'📋',nm:'Stock'},
  {id:'estadisticas',icon:'📈',nm:'Estadísticas'},
]

const PEDIDOS_DEMO = [
  {id:1,cliente:'John Smith',pais:'🇺🇸 USA',producto:'Morpho rhetenor helena',precio:45,estado:'pendiente',fecha:'2026-05-19'},
  {id:2,cliente:'Hans Mueller',pais:'🇩🇪 Alemania',producto:'Caligo eurilochus',precio:4,estado:'enviado',fecha:'2026-05-18'},
  {id:3,cliente:'Yuki Tanaka',pais:'🇯🇵 Japón',producto:'Agrias pericles peruviana',precio:120,estado:'pagado',fecha:'2026-05-17'},
]

const BANNERS_DEMO = [
  {id:1,cliente:'BioCollect Ltd',banner:'Header Principal',plan:'12 Meses',precio:200,vence:'2027-05-19',estado:'activo'},
  {id:2,cliente:'Nature Museum Berlin',banner:'Popup Premium',plan:'6 Meses',precio:150,vence:'2026-11-19',estado:'activo'},
  {id:3,cliente:'Tokyo Insects',banner:'Sidebar',plan:'1 Mes',precio:10,vence:'2026-06-19',estado:'por vencer'},
]

export default function AdminPanel() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [seccion, setSeccion] = useState('dashboard')

  const login = () => {
    if (pass === PASSWORD) { setAuth(true); setError('') }
    else setError('Contraseña incorrecta')
  }

  if (!auth) return (
    <div style={{minHeight:'100vh',background:'#1A1209',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif'}}>
      <style>{CSS}</style>
      <div className="fade-up" style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:12,padding:40,maxWidth:380,width:'100%',textAlign:'center'}}>
        <img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:'contain',borderRadius:'50%',border:'2px solid rgba(201,168,76,0.4)',marginBottom:20}}/>
        <h1 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:4}}>Panel Administrativo</h1>
        <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginBottom:24}}>HOUSE INSECTS OF PERU E.I.R.L.</p>
        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={e=>setPass(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login()}
          style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'12px 16px',borderRadius:6,fontSize:'.85rem',fontFamily:'Georgia,serif',marginBottom:12,boxSizing:'border-box'}}
        />
        {error&&<p style={{color:'#ff6b6b',fontSize:'.75rem',marginBottom:12}}>{error}</p>}
        <button onClick={login} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'12px',borderRadius:6,fontSize:'.85rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif'}}>
          Entrar al Panel
        </button>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',display:'flex'}}>
      <style>{CSS}</style>

      {/* SIDEBAR */}
      <div style={{width:220,background:'rgba(0,0,0,0.4)',borderRight:'1px solid rgba(201,168,76,0.1)',padding:'24px 12px',flexShrink:0}}>
        <div style={{textAlign:'center',marginBottom:24,paddingBottom:20,borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
          <img src="/logo-house-insects-peru.png" style={{width:60,height:60,objectFit:'contain',borderRadius:'50%',border:'1px solid rgba(201,168,76,0.3)'}}/>
          <p style={{color:'#C9A84C',fontSize:'.7rem',marginTop:8}}>Admin Panel</p>
        </div>
        {SECCIONES.map(s=>(
          <button key={s.id} onClick={()=>setSeccion(s.id)} className="tab-btn" style={{
            display:'flex',alignItems:'center',gap:10,width:'100%',
            background:seccion===s.id?'rgba(201,168,76,0.15)':'transparent',
            border:`1px solid ${seccion===s.id?'rgba(201,168,76,0.3)':'transparent'}`,
            color:seccion===s.id?'#C9A84C':'rgba(232,201,122,0.5)',
            padding:'10px 12px',borderRadius:6,fontSize:'.78rem',textAlign:'left',
            fontFamily:'Georgia,serif',marginBottom:4
          }}>
            <span>{s.icon}</span><span>{s.nm}</span>
          </button>
        ))}
        <button onClick={()=>setAuth(false)} style={{display:'flex',alignItems:'center',gap:10,width:'100%',background:'transparent',border:'1px solid rgba(255,100,100,0.2)',color:'rgba(255,100,100,0.5)',padding:'10px 12px',borderRadius:6,fontSize:'.78rem',cursor:'pointer',fontFamily:'Georgia,serif',marginTop:20}}>
          🚪 Cerrar sesión
        </button>
      </div>

      {/* CONTENIDO */}
      <div style={{flex:1,padding:'24px',overflowY:'auto'}}>

        {/* DASHBOARD */}
        {seccion==='dashboard' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:24}}>📊 Dashboard</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:32}}>
              {[
                {nm:'Visitas Hoy',val:'--',icon:'👁️',color:'rgba(201,168,76,0.1)'},
                {nm:'Pedidos Pendientes',val:'1',icon:'📦',color:'rgba(10,30,10,0.3)'},
                {nm:'Banners Activos',val:'3',icon:'📢',color:'rgba(5,15,30,0.3)'},
                {nm:'Especies en Stock',val:'356+',icon:'🦋',color:'rgba(20,10,5,0.3)'},
              ].map(c=>(
                <div key={c.nm} className="card" style={{background:c.color,border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:20}}>
                  <div style={{fontSize:'1.8rem',marginBottom:8}}>{c.icon}</div>
                  <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.1em',marginBottom:4}}>{c.nm}</p>
                  <p style={{color:'#C9A84C',fontSize:'1.8rem',fontWeight:700}}>{c.val}</p>
                </div>
              ))}
            </div>
            <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:20}}>
              <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:16}}>ÚLTIMOS PEDIDOS</p>
              {PEDIDOS_DEMO.map(p=>(
                <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(201,168,76,0.06)',flexWrap:'wrap',gap:8}}>
                  <div>
                    <p style={{color:'#E8C97A',fontSize:'.8rem'}}>{p.cliente} {p.pais}</p>
                    <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.68rem',fontStyle:'italic'}}>{p.producto}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#C9A84C',fontSize:'.85rem',fontWeight:700}}>${p.precio}</p>
                    <span style={{background:p.estado==='enviado'?'rgba(37,211,102,0.15)':p.estado==='pagado'?'rgba(201,168,76,0.15)':'rgba(255,165,0,0.15)',color:p.estado==='enviado'?'#25D366':p.estado==='pagado'?'#C9A84C':'orange',padding:'2px 8px',borderRadius:10,fontSize:'.6rem'}}>{p.estado}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTOS */}
        {seccion==='productos' && (
          <div className="fade-up">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24,flexWrap:'wrap',gap:12}}>
              <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300}}>🦋 Productos</h2>
              <a href="/admin-panel/upload" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",padding:"10px 20px",borderRadius:6,fontSize:".78rem",fontWeight:700,textDecoration:"none",display:"inline-block",marginBottom:16}}>📤 Subir Fotos & Videos</a>
              <a href="/studio" target="_blank" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'10px 20px',borderRadius:6,fontSize:'.78rem',fontWeight:700,textDecoration:'none'}}>+ Agregar en Sanity</a>
            </div>
            <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:24,textAlign:'center'}}>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.85rem',marginBottom:16}}>Gestiona tus productos desde Sanity Studio</p>
              <a href="/admin-panel/upload" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",padding:"10px 20px",borderRadius:6,fontSize:".78rem",fontWeight:700,textDecoration:"none",display:"inline-block",marginBottom:16}}>📤 Subir Fotos & Videos</a>
              <a href="/studio" target="_blank" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'12px 28px',borderRadius:6,fontSize:'.82rem',fontWeight:700,textDecoration:'none',display:'inline-block'}}>Abrir Sanity Studio →</a>
            </div>
          </div>
        )}

        {/* PEDIDOS */}
        {seccion==='pedidos' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:24}}>📦 Pedidos</h2>
            {PEDIDOS_DEMO.map(p=>(
              <div key={p.id} className="card" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:20,marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
                  <div>
                    <p style={{color:'#E8C97A',fontSize:'.9rem',fontWeight:400}}>{p.cliente} · {p.pais}</p>
                    <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.75rem',fontStyle:'italic',marginTop:4}}>{p.producto}</p>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.68rem',marginTop:4}}>📅 {p.fecha}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700}}>${p.precio} USD</p>
                    <span style={{background:p.estado==='enviado'?'rgba(37,211,102,0.15)':p.estado==='pagado'?'rgba(201,168,76,0.15)':'rgba(255,165,0,0.15)',color:p.estado==='enviado'?'#25D366':p.estado==='pagado'?'#C9A84C':'orange',padding:'3px 10px',borderRadius:10,fontSize:'.65rem',marginTop:4,display:'inline-block'}}>{p.estado}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BANNERS */}
        {seccion==='banners' && (
          <div className="fade-up">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24,flexWrap:'wrap',gap:12}}>
              <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300}}>📢 Banners</h2>
              <a href="/banners" target="_blank" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'10px 20px',borderRadius:6,fontSize:'.78rem',fontWeight:700,textDecoration:'none'}}>Ver página pública</a>
            </div>
            {BANNERS_DEMO.map(b=>(
              <div key={b.id} className="card" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:20,marginBottom:12}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
                  <div>
                    <p style={{color:'#E8C97A',fontSize:'.9rem'}}>{b.cliente}</p>
                    <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.75rem',marginTop:4}}>{b.banner} · {b.plan}</p>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.68rem',marginTop:4}}>Vence: {b.vence}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700}}>${b.precio} USD</p>
                    <span style={{background:b.estado==='activo'?'rgba(37,211,102,0.15)':'rgba(255,165,0,0.15)',color:b.estado==='activo'?'#25D366':'orange',padding:'3px 10px',borderRadius:10,fontSize:'.65rem',display:'inline-block',marginTop:4}}>{b.estado}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STOCK */}
        {seccion==='stock' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:24}}>📋 Control de Stock</h2>
            <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:24,textAlign:'center'}}>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.85rem',marginBottom:16}}>Gestiona el stock desde Sanity Studio — cada especie tiene su campo de stock actualizable.</p>
              <a href="/admin-panel/upload" style={{background:"linear-gradient(135deg,#25D366,#128C7E)",color:"white",padding:"10px 20px",borderRadius:6,fontSize:".78rem",fontWeight:700,textDecoration:"none",display:"inline-block",marginBottom:16}}>📤 Subir Fotos & Videos</a>
              <a href="/studio" target="_blank" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'12px 28px',borderRadius:6,fontSize:'.82rem',fontWeight:700,textDecoration:'none',display:'inline-block'}}>Actualizar Stock en Sanity →</a>
            </div>
          </div>
        )}

        {/* ESTADISTICAS */}
        {seccion==='estadisticas' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:24}}>📈 Estadísticas</h2>
            <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:24,textAlign:'center',marginBottom:16}}>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.85rem',marginBottom:16}}>Las estadísticas de visitas están disponibles en Metricool.</p>
              <a href="https://app.metricool.com" target="_blank" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'12px 28px',borderRadius:6,fontSize:'.82rem',fontWeight:700,textDecoration:'none',display:'inline-block'}}>Ver en Metricool →</a>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
