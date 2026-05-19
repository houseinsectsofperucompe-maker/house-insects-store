'use client'
import { useState, useRef, useEffect } from 'react'
import BannerUploader from './BannerUploader'

const PASSWORD = 'HouseInsects2026@'

const NICHOS = [
  {id:'museos', nm:'🏛️ Museos Historia Natural', keywords:'natural history museum entomology biology'},
  {id:'galerias', nm:'🎨 Galerías Arte & Ciencia', keywords:'art gallery biological science specimens'},
  {id:'coleccionistas', nm:'💎 Coleccionistas Premium', keywords:'insect collector butterfly collection rare'},
  {id:'universidades', nm:'🎓 Universidades & Institutos', keywords:'entomology university institute research'},
  {id:'colegios', nm:'🏫 Colegios & Educación', keywords:'school education biology natural specimens'},
  {id:'ferias_intl', nm:'🌍 Ferias Internacionales', keywords:'international fair entomology biological exhibition'},
  {id:'zoo', nm:'🦁 Zoológicos & Acuarios', keywords:'zoo aquarium natural collection biological'},
  {id:'joyeria', nm:'💍 Joyería Natural', keywords:'natural jewelry butterfly wings luxury gold'},
  {id:'decoracion', nm:'🏠 Decoración Premium', keywords:'luxury decoration natural art interior design'},
  {id:'restaurantes', nm:'🍽️ Restaurantes Gourmet', keywords:'gourmet restaurant exotic ingredients amazon'},
  {id:'chefs', nm:'👨‍🍳 Chefs & Gastronomía', keywords:'chef exotic food amazon ingredients natural'},
  {id:'arte', nm:'🖼️ Arte & Cultura', keywords:'art culture natural biological amazon peru'},
  {id:'textil_amazonica', nm:'🧶 Textilería Amazónica', keywords:'amazon textile peru handcraft artisan'},
  {id:'textil_sierra', nm:'🏔️ Textilería Sierra & Alpaca', keywords:'andean textile sierra peru alpaca wool'},
  {id:'insectos', nm:'🪲 Insectos Naturales', keywords:'natural insects collection entomology specimens'},
  {id:'flores', nm:'🌸 Flores & Plantas Secas', keywords:'dried flowers plants collection botanical'},
  {id:'semillas', nm:'🌱 Semillas & Herbarios', keywords:'seeds herbarium botanical collection plant'},
  {id:'hierbas', nm:'🌿 Hierbas Medicinales', keywords:'medicinal herbs natural amazon collection'},
  {id:'hongos', nm:'🍄 Hongos & Setas', keywords:'mushrooms fungi natural collection amazon'},
  {id:'maderas', nm:'🪵 Maderas Finas', keywords:'fine wood amazon tropical timber luxury'},
  {id:'piedras', nm:'💎 Piedras Preciosas', keywords:'precious stones minerals collection gems peru'},
  {id:'frutos', nm:'🍎 Frutos Exóticos', keywords:'exotic fruits amazon tropical dried natural'},
  {id:'superalimentos', nm:'💊 Superalimentos', keywords:'superfoods active natural supplement amazon'},
  {id:'farmaceuticas', nm:'🔬 Farmacéuticas', keywords:'pharmaceutical biological research amazon'},
  {id:'spa_wellness', nm:'💆 Spa & Wellness', keywords:'spa wellness natural amazon essential oils'},
  {id:'hoteles', nm:'🏨 Hoteles de Lujo', keywords:'luxury hotel decoration natural art amazon'},
  {id:'china_asia', nm:'🇨🇳 Mercado Asiático', keywords:'china asia natural collection biological luxury'},
  {id:'africa', nm:'🌍 Mercado Africano', keywords:'africa natural collection biological art'},
  {id:'medio_oriente', nm:'🕌 Medio Oriente', keywords:'dubai luxury natural collection art'},
  {id:'europa', nm:'🇪🇺 Europa Premium', keywords:'europe luxury natural collection biological'},
]

const PAISES = [
  {id:'all', nm:'🌍 Todo el Mundo'},{id:'us', nm:'🇺🇸 USA'},{id:'de', nm:'🇩🇪 Alemania'},
  {id:'jp', nm:'🇯🇵 Japón'},{id:'cn', nm:'🇨🇳 China'},{id:'gb', nm:'🇬🇧 Reino Unido'},
  {id:'fr', nm:'🇫🇷 Francia'},{id:'kr', nm:'🇰🇷 Corea'},{id:'au', nm:'🇦🇺 Australia'},
  {id:'nz', nm:'🇳🇿 Nueva Zelanda'},{id:'br', nm:'🇧🇷 Brasil'},{id:'za', nm:'🇿🇦 Sudáfrica'},
  {id:'ae', nm:'🇦🇪 Dubai'},{id:'it', nm:'🇮🇹 Italia'},{id:'es', nm:'🇪🇸 España'},
  {id:'nl', nm:'🇳🇱 Holanda'},{id:'ch', nm:'🇨🇭 Suiza'},{id:'sg', nm:'🇸🇬 Singapur'},
  {id:'mx', nm:'🇲🇽 México'},{id:'ar', nm:'🇦🇷 Argentina'},{id:'ng', nm:'🇳🇬 Nigeria'},
  {id:'in', nm:'🇮🇳 India'},{id:'sa', nm:'🇸🇦 Arabia Saudita'},{id:'pe', nm:'🇵🇪 Perú'},
]

const SECCIONES = [
  {id:'dashboard',icon:'📊',nm:'Dashboard'},
  {id:'prospectos',icon:'🌍',nm:'Prospectos'},
  {id:'productos',icon:'🦋',nm:'Productos'},
  {id:'pedidos',icon:'📦',nm:'Pedidos'},
  {id:'banners',icon:'📢',nm:'Banners'},
  {id:'archivos',icon:'🗂️',nm:'Archivos'},
  {id:'stock',icon:'📋',nm:'Stock'},
  {id:'estadisticas',icon:'📈',nm:'Estadísticas'},
]

const PEDIDOS = [
  {id:1,cliente:'John Smith',pais:'🇺🇸 USA',producto:'Morpho rhetenor helena',precio:45,estado:'pendiente',fecha:'2026-05-19'},
  {id:2,cliente:'Hans Mueller',pais:'🇩🇪 Alemania',producto:'Caligo eurilochus',precio:4,estado:'enviado',fecha:'2026-05-18'},
  {id:3,cliente:'Yuki Tanaka',pais:'🇯🇵 Japón',producto:'Agrias pericles peruviana',precio:120,estado:'pagado',fecha:'2026-05-17'},
]

const BANNERS_DATA = [
  {id:1,cliente:'BioCollect Ltd',banner:'Header Principal',plan:'12 Meses',precio:200,vence:'2027-05-19',estado:'activo'},
  {id:2,cliente:'Nature Museum Berlin',banner:'Popup Premium',plan:'6 Meses',precio:150,vence:'2026-11-19',estado:'activo'},
  {id:3,cliente:'Tokyo Insects',banner:'Sidebar',plan:'1 Mes',precio:10,vence:'2026-06-19',estado:'por vencer'},
]

type Prospecto = {name:string;title:string;organization_name:string;email:string;country:string;linkedin_url:string}
type Archivo = {public_id:string;secure_url:string;resource_type:string;format:string;bytes:number}

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.3)}50%{box-shadow:0 0 0 10px rgba(201,168,76,0)}}
  .fade-up{animation:fadeInUp 0.5s ease both}
  .tab-btn{transition:all 0.18s ease;cursor:pointer}
  .tab-btn:hover{transform:translateX(3px)}
  .card{transition:all 0.2s ease}
  .card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(201,168,76,0.15)!important}
  .btn{transition:all 0.15s ease;cursor:pointer}
  .btn:hover{opacity:0.85;transform:translateY(-1px)}
  .nicho-btn{transition:all 0.15s ease;cursor:pointer}
  .nicho-btn:hover{transform:translateY(-1px)}
  @media(max-width:700px){
    .sidebar{width:60px!important}
    .sidebar-nm{display:none}
    .main-content{padding:16px!important}
  }
`

export default function AdminPanel() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [seccion, setSeccion] = useState('dashboard')
  
  // Prospectos
  const [nicho, setNicho] = useState('museos')
  const [pais, setPais] = useState('all')
  const [buscando, setBuscando] = useState(false)
  const [prospectos, setProspectos] = useState<Prospecto[]>([])
  const [errorProsp, setErrorProsp] = useState('')
  const [enviados, setEnviados] = useState<string[]>([])
  const [busquedaCustom, setBusquedaCustom] = useState('')

  // Archivos
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [cargandoArchivos, setCargandoArchivos] = useState(false)
  const [borrando, setBorrando] = useState<string|null>(null)
  const [filtroArchivos, setFiltroArchivos] = useState('todos')

  // Upload
  const [archivosUp, setArchivosUp] = useState<File[]>([])
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [urlsSubidas, setUrlsSubidas] = useState<{nombre:string,url:string}[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const login = () => {
    if (pass === PASSWORD) { setAuth(true); setError('') }
    else setError('Contraseña incorrecta')
  }

  const buscarProspectos = async () => {
    setBuscando(true)
    setErrorProsp('')
    setProspectos([])
    try {
      const nichoData = NICHOS.find(n=>n.id===nicho)
      const res = await fetch('/api/prospectos', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({nicho: busquedaCustom || nichoData?.keywords, pais: pais==='all'?'':pais, cargo:'director curator buyer collector'})
      })
      const data = await res.json()
      if (data.people) setProspectos(data.people)
      else setErrorProsp('No se encontraron resultados')
    } catch { setErrorProsp('Error de conexión') }
    setBuscando(false)
  }

  const cargarArchivos = async () => {
    setCargandoArchivos(true)
    const res = await fetch('/api/cloudinary')
    const data = await res.json()
    setArchivos(Array.isArray(data) ? data : [])
    setCargandoArchivos(false)
  }

  const borrarArchivo = async (public_id: string) => {
    if (!confirm('¿Borrar este archivo?')) return
    setBorrando(public_id)
    await fetch('/api/cloudinary', {method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({public_id})})
    setArchivos(prev=>prev.filter(a=>a.public_id!==public_id))
    setBorrando(null)
  }

  const seleccionarArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setArchivosUp(prev=>[...prev,...files])
  }

  const subirArchivos = async () => {
    if (!archivosUp.length) return
    setSubiendo(true)
    const nuevas: {nombre:string,url:string}[] = []
    for (let i=0; i<archivosUp.length; i++) {
      const file = archivosUp[i]
      setProgreso(Math.round((i/archivosUp.length)*100))
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'house_Insects_banners')
      formData.append('folder', file.type.startsWith('video/') ? 'videos' : 'fotos')
      const res = await fetch(`https://api.cloudinary.com/v1_1/dv3mvukmq/auto/upload`, {method:'POST',body:formData})
      const data = await res.json()
      if (data.secure_url) nuevas.push({nombre:file.name,url:data.secure_url})
    }
    setUrlsSubidas(prev=>[...prev,...nuevas])
    setArchivosUp([])
    setProgreso(100)
    setSubiendo(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  useEffect(() => {
    if (seccion === 'archivos' && archivos.length === 0) cargarArchivos()
  }, [seccion])

  if (!auth) return (
    <div style={{minHeight:'100vh',background:'#1A1209',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif'}}>
      <style>{CSS}</style>
      <div className="fade-up" style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:12,padding:40,maxWidth:380,width:'100%',textAlign:'center'}}>
        <img src="/logo-house-insects-peru.png" style={{width:90,height:90,objectFit:'contain',borderRadius:'50%',border:'2px solid rgba(201,168,76,0.4)',marginBottom:20,animation:'pulse-gold 2s infinite'}}/>
        <h1 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:4}}>Panel Administrativo</h1>
        <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginBottom:24}}>HOUSE INSECTS OF PERU E.I.R.L.</p>
        <input type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()} style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'12px 16px',borderRadius:6,fontSize:'.85rem',fontFamily:'Georgia,serif',marginBottom:12,boxSizing:'border-box'}}/>
        {error&&<p style={{color:'#ff6b6b',fontSize:'.75rem',marginBottom:12}}>{error}</p>}
        <button onClick={login} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'12px',borderRadius:6,fontSize:'.9rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif'}}>Entrar</button>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',display:'flex'}}>
      <style>{CSS}</style>

      {/* SIDEBAR */}
      <div className="sidebar" style={{width:220,background:'rgba(0,0,0,0.5)',borderRight:'1px solid rgba(201,168,76,0.1)',padding:'20px 10px',flexShrink:0,display:'flex',flexDirection:'column'}}>
        <div style={{textAlign:'center',marginBottom:20,paddingBottom:16,borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
          <img src="/logo-house-insects-peru.png" style={{width:55,height:55,objectFit:'contain',borderRadius:'50%',border:'1px solid rgba(201,168,76,0.3)'}}/>
          <p className="sidebar-nm" style={{color:'#C9A84C',fontSize:'.65rem',marginTop:6}}>Admin Panel</p>
        </div>
        {SECCIONES.map(s=>(
          <button key={s.id} onClick={()=>setSeccion(s.id)} className="tab-btn" style={{display:'flex',alignItems:'center',gap:10,width:'100%',background:seccion===s.id?'rgba(201,168,76,0.15)':'transparent',border:`1px solid ${seccion===s.id?'rgba(201,168,76,0.3)':'transparent'}`,color:seccion===s.id?'#C9A84C':'rgba(232,201,122,0.45)',padding:'10px 10px',borderRadius:6,fontSize:'.78rem',textAlign:'left',fontFamily:'Georgia,serif',marginBottom:3}}>
            <span style={{fontSize:'1rem'}}>{s.icon}</span><span className="sidebar-nm">{s.nm}</span>
          </button>
        ))}
        <div style={{marginTop:'auto',paddingTop:16}}>
          <button onClick={()=>setAuth(false)} style={{display:'flex',alignItems:'center',gap:8,width:'100%',background:'transparent',border:'1px solid rgba(255,100,100,0.2)',color:'rgba(255,100,100,0.5)',padding:'8px 10px',borderRadius:6,fontSize:'.72rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>
            <span>🚪</span><span className="sidebar-nm">Cerrar sesión</span>
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="main-content" style={{flex:1,padding:'24px',overflowY:'auto',maxHeight:'100vh'}}>

        {/* DASHBOARD */}
        {seccion==='dashboard' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:24}}>📊 Dashboard</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:12,marginBottom:28}}>
              {[
                {nm:'Visitas Hoy',val:'--',icon:'👁️',color:'rgba(201,168,76,0.08)'},
                {nm:'Pedidos',val:'3',icon:'📦',color:'rgba(10,30,10,0.3)'},
                {nm:'Banners Activos',val:'3',icon:'📢',color:'rgba(5,15,30,0.3)'},
                {nm:'Especies',val:'356+',icon:'🦋',color:'rgba(20,10,5,0.3)'},
                {nm:'Clientes Prospectados',val:prospectos.length.toString(),icon:'🌍',color:'rgba(20,5,30,0.3)'},
                {nm:'Archivos',val:archivos.length.toString(),icon:'🗂️',color:'rgba(5,20,10,0.3)'},
              ].map(c=>(
                <div key={c.nm} className="card" style={{background:c.color,border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:16}}>
                  <div style={{fontSize:'1.6rem',marginBottom:6}}>{c.icon}</div>
                  <p style={{color:'rgba(232,201,122,0.45)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>{c.nm}</p>
                  <p style={{color:'#C9A84C',fontSize:'1.6rem',fontWeight:700}}>{c.val}</p>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10}}>
              {[
                {nm:'🌍 Buscar Clientes',url:'prospectos',color:'rgba(201,168,76,0.1)'},
                {nm:'📤 Subir Archivos',url:'archivos',color:'rgba(10,30,10,0.2)'},
                {nm:'📢 Gestionar Banners',url:'banners',color:'rgba(5,15,30,0.2)'},
                {nm:'🦋 Sanity Studio',url:'/studio',color:'rgba(20,10,5,0.2)',ext:true},
                {nm:'📈 Metricool',url:'https://app.metricool.com',color:'rgba(20,5,30,0.2)',ext:true},
                {nm:'☁️ Cloudinary',url:'https://cloudinary.com',color:'rgba(5,20,10,0.2)',ext:true},
              ].map(a=>(
                a.ext ?
                <a key={a.nm} href={a.url} target="_blank" className="btn" style={{background:a.color,border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'14px',color:'#C9A84C',fontSize:'.78rem',textDecoration:'none',display:'block',textAlign:'center'}}>{a.nm}</a> :
                <button key={a.nm} onClick={()=>setSeccion(a.url)} className="btn" style={{background:a.color,border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:'14px',color:'#C9A84C',fontSize:'.78rem',fontFamily:'Georgia,serif'}}>{a.nm}</button>
              ))}
            </div>
          </div>
        )}

        {/* PROSPECTOS */}
        {seccion==='prospectos' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:20}}>🌍 Prospección Global — {NICHOS.length} Nichos · {PAISES.length} Países</h2>
            <input value={busquedaCustom} onChange={e=>setBusquedaCustom(e.target.value)} placeholder="🔍 Búsqueda personalizada..." style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'10px 14px',borderRadius:8,fontSize:'.8rem',fontFamily:'Georgia,serif',marginBottom:16,boxSizing:'border-box'}}/>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:8}}>NICHOS</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:5,marginBottom:16}}>
              {NICHOS.map(n=>(
                <button key={n.id} onClick={()=>setNicho(n.id)} className="nicho-btn" style={{background:nicho===n.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.05)',color:nicho===n.id?'#1A1209':'#C9A84C',border:`1px solid ${nicho===n.id?'transparent':'rgba(201,168,76,0.1)'}`,padding:'7px 10px',borderRadius:6,fontSize:'.68rem',fontFamily:'Georgia,serif',textAlign:'left'}}>
                  {n.nm}
                </button>
              ))}
            </div>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:8}}>MERCADO</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:16}}>
              {PAISES.map(p=>(
                <button key={p.id} onClick={()=>setPais(p.id)} className="nicho-btn" style={{background:pais===p.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.05)',color:pais===p.id?'#1A1209':'#C9A84C',border:`1px solid ${pais===p.id?'transparent':'rgba(201,168,76,0.1)'}`,padding:'5px 10px',borderRadius:16,fontSize:'.68rem',fontFamily:'Georgia,serif'}}>
                  {p.nm}
                </button>
              ))}
            </div>
            <button onClick={buscarProspectos} disabled={buscando} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'12px',borderRadius:8,fontSize:'.9rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif',marginBottom:16}}>
              {buscando?'🔍 Buscando en todo el mundo...':'🔍 Buscar Clientes Ahora'}
            </button>
            {errorProsp&&<p style={{color:'rgba(255,100,100,0.7)',fontSize:'.78rem',marginBottom:12}}>{errorProsp}</p>}
            {prospectos.length>0&&(
              <div>
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:12}}>✅ {prospectos.length} CLIENTES ENCONTRADOS</p>
                {prospectos.map((p,i)=>(
                  <div key={i} className="card" style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:8,padding:14,marginBottom:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3,flexWrap:'wrap'}}>
                          <p style={{color:'#E8C97A',fontSize:'.85rem'}}>{p.name}</p>
                          {enviados.includes(p.email)&&<span style={{background:'rgba(37,211,102,0.15)',color:'#25D366',padding:'1px 6px',borderRadius:8,fontSize:'.58rem'}}>✅ Contactado</span>}
                        </div>
                        <p style={{color:'rgba(232,201,122,0.45)',fontSize:'.72rem'}}>{p.title} · {p.organization_name}</p>
                        <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem',marginTop:2}}>🌍 {p.country} {p.email&&`· ✉️ ${p.email}`}</p>
                      </div>
                      <div style={{display:'flex',gap:5,flexWrap:'wrap',alignItems:'center'}}>
                        {p.email&&<a href={`mailto:${p.email}?subject=House Insects of Peru - Exportación A1`} className="btn" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',color:'#C9A84C',padding:'4px 8px',borderRadius:3,fontSize:'.6rem',textDecoration:'none'}}>✉️</a>}
                        {p.linkedin_url&&<a href={p.linkedin_url} target="_blank" className="btn" style={{background:'rgba(0,119,181,0.12)',border:'1px solid rgba(0,119,181,0.2)',color:'#0077B5',padding:'4px 8px',borderRadius:3,fontSize:'.6rem',textDecoration:'none'}}>💼</a>}
                        <a href="https://wa.me/51940699405" target="_blank" className="btn" style={{background:'rgba(37,211,102,0.12)',border:'1px solid rgba(37,211,102,0.2)',color:'#25D366',padding:'4px 8px',borderRadius:3,fontSize:'.6rem',textDecoration:'none'}}>💬</a>
                        <button onClick={()=>setEnviados(prev=>prev.includes(p.email)?prev.filter(e=>e!==p.email):[...prev,p.email])} className="btn" style={{background:'transparent',border:'1px solid rgba(201,168,76,0.12)',color:'rgba(201,168,76,0.35)',padding:'4px 8px',borderRadius:3,fontSize:'.58rem',fontFamily:'Georgia,serif'}}>
                          {enviados.includes(p.email)?'↩️':'✅'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PRODUCTOS */}
        {seccion==='productos' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:20}}>🦋 Productos</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10}}>
              <a href="/studio" target="_blank" className="btn" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:10,padding:20,color:'#C9A84C',textDecoration:'none',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>🦋</div>
                <p style={{fontSize:'.8rem',fontWeight:700}}>Sanity Studio</p>
                <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:4}}>Agregar · Editar · Eliminar especies</p>
              </a>
              <a href="/catalogo/especimenes" target="_blank" className="btn" style={{background:'rgba(10,30,10,0.2)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:20,color:'#C9A84C',textDecoration:'none',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>👁️</div>
                <p style={{fontSize:'.8rem',fontWeight:700}}>Ver Catálogo</p>
                <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:4}}>Como lo ve el cliente</p>
              </a>
            </div>
          </div>
        )}

        {/* PEDIDOS */}
        {seccion==='pedidos' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:20}}>📦 Pedidos</h2>
            {PEDIDOS.map(p=>(
              <div key={p.id} className="card" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:16,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                  <div>
                    <p style={{color:'#E8C97A',fontSize:'.88rem'}}>{p.cliente} · {p.pais}</p>
                    <p style={{color:'rgba(232,201,122,0.45)',fontSize:'.72rem',fontStyle:'italic',marginTop:3}}>{p.producto}</p>
                    <p style={{color:'rgba(201,168,76,0.35)',fontSize:'.65rem',marginTop:3}}>📅 {p.fecha}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700}}>${p.precio} USD</p>
                    <span style={{background:p.estado==='enviado'?'rgba(37,211,102,0.15)':p.estado==='pagado'?'rgba(201,168,76,0.15)':'rgba(255,165,0,0.15)',color:p.estado==='enviado'?'#25D366':p.estado==='pagado'?'#C9A84C':'orange',padding:'2px 8px',borderRadius:8,fontSize:'.62rem',display:'inline-block',marginTop:4}}>{p.estado}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* BANNERS */}
        {seccion==='banners' && (
          <div className="fade-up">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300}}>📢 Banners</h2>
              <a href="/banners" target="_blank" className="btn" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'8px 16px',borderRadius:6,fontSize:'.75rem',fontWeight:700,textDecoration:'none'}}>Ver página pública</a>
            </div>
            {BANNERS_DATA.map(b=>(
              <div key={b.id} className="card" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:16,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                  <div>
                    <p style={{color:'#E8C97A',fontSize:'.88rem'}}>{b.cliente}</p>
                    <p style={{color:'rgba(232,201,122,0.45)',fontSize:'.72rem',marginTop:3}}>{b.banner} · {b.plan}</p>
                    <p style={{color:'rgba(201,168,76,0.35)',fontSize:'.65rem',marginTop:3}}>Vence: {b.vence}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#C9A84C',fontSize:'1.1rem',fontWeight:700}}>${b.precio} USD</p>
                    <span style={{background:b.estado==='activo'?'rgba(37,211,102,0.15)':'rgba(255,165,0,0.15)',color:b.estado==='activo'?'#25D366':'orange',padding:'2px 8px',borderRadius:8,fontSize:'.62rem',display:'inline-block',marginTop:4}}>{b.estado}</span>
                  </div>
                </div>
              </div>
            ))}
            <div style={{marginTop:20}}>
              <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',letterSpacing:'.1em',marginBottom:12}}>SUBIR BANNER DE CLIENTE</p>
              <BannerUploader/>
            </div>
          </div>
        )}

        {/* ARCHIVOS */}
        {seccion==='archivos' && (
          <div className="fade-up">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:10}}>
              <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300}}>🗂️ Archivos — {archivos.length} en Cloudinary</h2>
              <button onClick={cargarArchivos} className="btn" style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',color:'#C9A84C',padding:'7px 14px',borderRadius:6,fontSize:'.72rem',fontFamily:'Georgia,serif'}}>🔄 Actualizar</button>
            </div>

            {/* SUBIR */}
            <div style={{background:'rgba(201,168,76,0.04)',border:'1px dashed rgba(201,168,76,0.2)',borderRadius:10,padding:16,marginBottom:20,cursor:'pointer',textAlign:'center'}} onClick={()=>inputRef.current?.click()}>
              <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.78rem',marginBottom:4}}>📤 Toca para subir fotos o videos</p>
              <p style={{color:'rgba(201,168,76,0.25)',fontSize:'.62rem'}}>JPG · PNG · WebP · GIF · MP4 · WebM · MOV</p>
              <input ref={inputRef} type="file" multiple accept="image/*,video/*" onChange={seleccionarArchivos} style={{display:'none'}} capture="environment"/>
            </div>

            {archivosUp.length>0&&(
              <div style={{marginBottom:16}}>
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',marginBottom:8}}>{archivosUp.length} archivo(s) seleccionado(s)</p>
                {subiendo&&(
                  <div style={{background:'rgba(201,168,76,0.08)',borderRadius:8,height:8,overflow:'hidden',marginBottom:8}}>
                    <div style={{background:'linear-gradient(to right,#C9A84C,#E8C97A)',height:'100%',width:`${progreso}%`,transition:'width 0.3s ease'}}/>
                  </div>
                )}
                {!subiendo&&<button onClick={subirArchivos} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'10px',borderRadius:6,fontSize:'.82rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif'}}>⬆️ Subir Todo</button>}
              </div>
            )}

            {urlsSubidas.length>0&&(
              <div style={{background:'rgba(37,211,102,0.06)',border:'1px solid rgba(37,211,102,0.15)',borderRadius:8,padding:12,marginBottom:16}}>
                <p style={{color:'#25D366',fontSize:'.7rem',marginBottom:8}}>✅ {urlsSubidas.length} subido(s)</p>
                {urlsSubidas.map((u,i)=>(
                  <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
                    <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.65rem',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{u.nombre}</p>
                    <button onClick={()=>navigator.clipboard.writeText(u.url)} className="btn" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'3px 8px',borderRadius:3,fontSize:'.6rem',fontFamily:'Georgia,serif',marginLeft:8}}>📋</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
              {['todos','fotos','videos'].map(f=>(
                <button key={f} onClick={()=>setFiltroArchivos(f)} className="btn" style={{background:filtroArchivos===f?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.05)',color:filtroArchivos===f?'#1A1209':'#C9A84C',border:`1px solid ${filtroArchivos===f?'transparent':'rgba(201,168,76,0.1)'}`,padding:'5px 12px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                  {f==='todos'?'🗂️ Todos':f==='fotos'?'📸 Fotos':'🎥 Videos'}
                </button>
              ))}
            </div>

            {cargandoArchivos ? (
              <p style={{color:'rgba(201,168,76,0.3)',textAlign:'center',padding:32}}>Cargando...</p>
            ) : (
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:10}}>
                {archivos.filter(a=>filtroArchivos==='todos'||(filtroArchivos==='fotos'&&a.resource_type==='image')||(filtroArchivos==='videos'&&a.resource_type==='video')).map(a=>(
                  <div key={a.public_id} className="card" style={{background:'rgba(0,0,0,0.3)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:8,overflow:'hidden'}}>
                    <div style={{height:110,overflow:'hidden',background:'rgba(0,0,0,0.4)'}}>
                      {a.resource_type==='video'?<video src={a.secure_url} style={{width:'100%',height:'100%',objectFit:'cover'}} muted/>:<img src={a.secure_url} style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
                    </div>
                    <div style={{padding:8}}>
                      <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.58rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:6}}>{a.public_id.split('/').pop()}</p>
                      <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.55rem',marginBottom:6}}>{(a.bytes/1024).toFixed(0)} KB</p>
                      <div style={{display:'flex',gap:4}}>
                        <button onClick={()=>navigator.clipboard.writeText(a.secure_url)} className="btn" style={{flex:1,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.12)',color:'#C9A84C',padding:'4px',borderRadius:3,fontSize:'.58rem',fontFamily:'Georgia,serif'}}>📋</button>
                        <a href={a.secure_url} target="_blank" className="btn" style={{flex:1,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.12)',color:'#C9A84C',padding:'4px',borderRadius:3,fontSize:'.58rem',textDecoration:'none',textAlign:'center'}}>👁️</a>
                        <button onClick={()=>borrarArchivo(a.public_id)} disabled={borrando===a.public_id} className="btn" style={{background:'rgba(255,100,100,0.08)',border:'1px solid rgba(255,100,100,0.15)',color:'rgba(255,100,100,0.6)',padding:'4px 6px',borderRadius:3,fontSize:'.58rem',fontFamily:'Georgia,serif'}}>{borrando===a.public_id?'...':'🗑️'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STOCK */}
        {seccion==='stock' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:20}}>📋 Control de Stock</h2>
            <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:24,textAlign:'center'}}>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.85rem',marginBottom:16}}>Gestiona el stock desde Sanity Studio</p>
              <a href="/studio" target="_blank" className="btn" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'12px 28px',borderRadius:6,fontSize:'.82rem',fontWeight:700,textDecoration:'none',display:'inline-block'}}>Abrir Sanity Studio →</a>
            </div>
          </div>
        )}

        {/* ESTADISTICAS */}
        {seccion==='estadisticas' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:20}}>📈 Estadísticas</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10}}>
              <a href="https://app.metricool.com" target="_blank" className="btn" style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:20,color:'#C9A84C',textDecoration:'none',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>📊</div>
                <p style={{fontSize:'.8rem',fontWeight:700}}>Metricool</p>
                <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:4}}>Visitas · Redes sociales</p>
              </a>
              <a href="https://vercel.com/dashboard" target="_blank" className="btn" style={{background:'rgba(5,15,30,0.3)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:20,color:'#C9A84C',textDecoration:'none',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>▲</div>
                <p style={{fontSize:'.8rem',fontWeight:700}}>Vercel</p>
                <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:4}}>Deploy · Performance</p>
              </a>
              <a href="https://cloudinary.com/console" target="_blank" className="btn" style={{background:'rgba(5,20,10,0.2)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:20,color:'#C9A84C',textDecoration:'none',textAlign:'center',display:'block'}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>☁️</div>
                <p style={{fontSize:'.8rem',fontWeight:700}}>Cloudinary</p>
                <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:4}}>Archivos · Ancho de banda</p>
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
