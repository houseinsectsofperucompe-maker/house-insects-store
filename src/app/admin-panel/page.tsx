'use client'
import { useState, useRef, useEffect } from 'react'
import BannerUploader from './BannerUploader'

const PASSWORD = 'HouseInsects2026@'

const NICHOS = [
  {cat:'🦋 Entomología de Museo', id:'morpho', nm:'🦋 Mariposas Exóticas Amazonía', keywords:'exotic butterfly morpho amazon collector museum'},
  {cat:'🦋 Entomología de Museo', id:'coleopteros', nm:'🪲 Coleópteros & Insectos Gigantes', keywords:'giant beetles dynastes megasoma scientific collection'},
  {cat:'🦋 Entomología de Museo', id:'aberraciones', nm:'🔬 Aberraciones & Gynandromorphs', keywords:'rare aberration gynandromorph unique specimen collector'},
  {cat:'🦋 Entomología de Museo', id:'artropodos', nm:'🕷️ Artrópodos & Arácnidos', keywords:'scorpion tarantula arachnid preserved taxidermy amazon'},
  {cat:'🦋 Entomología de Museo', id:'cupulas', nm:'🔮 Cúpulas & Campanas Victorianas', keywords:'victorian dome glass display luxury entomology'},
  {cat:'🦋 Entomología de Museo', id:'cuadros_uv', nm:'🖼️ Cuadros con Cristal UV', keywords:'uv crystal frame butterfly specimen luxury art'},
  {cat:'🦋 Entomología de Museo', id:'resina', nm:'💎 Encapsulados en Resina Epóxica', keywords:'epoxy resin encapsulated specimen 360 luxury'},
  {cat:'💎 Arte Ultra Lujo', id:'bolas_resina', nm:'🔮 Bolas de Resina con Insectos', keywords:'resin sphere insect suspended luxury amulet'},
  {cat:'💎 Arte Ultra Lujo', id:'oro_24k', nm:'👑 Joyería Baño Oro 24k', keywords:'24k gold plated insect jewelry luxury fashion'},
  {cat:'💎 Arte Ultra Lujo', id:'plata_950', nm:'🥈 Joyería Plata Ley .950', keywords:'silver 950 jewelry insect peru luxury accessories'},
  {cat:'💎 Arte Ultra Lujo', id:'marcos_madera', nm:'🪵 Marcos Madera Fina', keywords:'fine wood frame luxury ebony certified amazon'},
  {cat:'⛰️ Minerales & Fósiles', id:'pirita', nm:'✨ Cristales de Pirita Peruana', keywords:'peruvian pyrite crystal quartz prosperity energy'},
  {cat:'⛰️ Minerales & Fósiles', id:'geodas', nm:'💠 Geodas & Cuarzos', keywords:'geode quartz mineral collection peru decorative'},
  {cat:'⛰️ Minerales & Fósiles', id:'fosiles', nm:'🦕 Fósiles & Paleontología', keywords:'fossil paleontology scientific collection peru'},
  {cat:'🌿 Agroindustria Natural', id:'souvenirs', nm:'🎁 Souvenirs & Decoración', keywords:'souvenir museum gift shop corporate decoration natural'},
  {cat:'🌿 Agroindustria Natural', id:'agroindustria', nm:'🌿 Agroindustria & Derivados', keywords:'botanical natural products tingo maria amazon sustainable'},
  {cat:'🌿 Agroindustria Natural', id:'investigacion', nm:'🔬 Material Científico & Universitario', keywords:'biological material research university scientific specimens'},
  {cat:'🏛️ Institucional', id:'museos', nm:'🏛️ Museos Historia Natural', keywords:'natural history museum entomology biology curator'},
  {cat:'🏛️ Institucional', id:'galerias', nm:'🎨 Galerías Arte & Ciencia', keywords:'art gallery biological science specimens luxury'},
  {cat:'🏛️ Institucional', id:'universidades', nm:'🎓 Universidades & Institutos', keywords:'entomology university institute research specimens'},
  {cat:'🏛️ Institucional', id:'ferias_intl', nm:'🌍 Ferias Internacionales', keywords:'international fair entomology biological exhibition'},
  {cat:'💰 Mercado Lujo', id:'dubai', nm:'🕌 Coleccionistas Dubai & Gulf', keywords:'dubai gulf luxury collector rare specimen'},
  {cat:'💰 Mercado Lujo', id:'hollywood', nm:'🎬 Hollywood & Entertainment', keywords:'hollywood entertainment luxury decoration natural art'},
  {cat:'💰 Mercado Lujo', id:'monaco', nm:'🎰 Mónaco & Riviera', keywords:'monaco riviera luxury collector art natural'},
  {cat:'💰 Mercado Lujo', id:'asia_lujo', nm:'🇨🇳 Coleccionistas Asia Premium', keywords:'china japan korea luxury collector natural specimen'},
  {cat:'💰 Mercado Lujo', id:'hoteles', nm:'🏨 Hoteles 5 Estrellas', keywords:'five star hotel luxury decoration natural art amazon'},
  {cat:'💰 Mercado Lujo', id:'spa', nm:'💆 Spa & Wellness Premium', keywords:'spa wellness luxury natural amazon essential oils'},
]

const PAISES = [
  {id:'all', nm:'🌍 Todo el Mundo'},
  {id:'us', nm:'🇺🇸 USA / Hollywood'},
  {id:'ca', nm:'🇨🇦 Canadá'},
  {id:'mx', nm:'🇲🇽 México'},
  {id:'br', nm:'🇧🇷 Brasil'},
  {id:'ar', nm:'🇦🇷 Argentina'},
  {id:'cl', nm:'🇨🇱 Chile'},
  {id:'co', nm:'🇨🇴 Colombia'},
  {id:'pe', nm:'🇵🇪 Perú'},
  {id:'ec', nm:'🇪🇨 Ecuador'},
  {id:'uy', nm:'🇺🇾 Uruguay'},
  {id:'py', nm:'🇵🇾 Paraguay'},
  {id:'bo', nm:'🇧🇴 Bolivia'},
  {id:'ve', nm:'🇻🇪 Venezuela'},
  {id:'gb', nm:'🇬🇧 Reino Unido'},
  {id:'de', nm:'🇩🇪 Alemania'},
  {id:'fr', nm:'🇫🇷 Francia'},
  {id:'it', nm:'🇮🇹 Italia'},
  {id:'es', nm:'🇪🇸 España'},
  {id:'nl', nm:'🇳🇱 Holanda'},
  {id:'ch', nm:'🇨🇭 Suiza'},
  {id:'at', nm:'🇦🇹 Austria'},
  {id:'be', nm:'🇧🇪 Bélgica'},
  {id:'se', nm:'🇸🇪 Suecia'},
  {id:'no', nm:'🇳🇴 Noruega'},
  {id:'dk', nm:'🇩🇰 Dinamarca'},
  {id:'fi', nm:'🇫🇮 Finlandia'},
  {id:'pl', nm:'🇵🇱 Polonia'},
  {id:'pt', nm:'🇵🇹 Portugal'},
  {id:'gr', nm:'🇬🇷 Grecia'},
  {id:'lu', nm:'🇱🇺 Luxemburgo'},
  {id:'mc', nm:'🇲🇨 Mónaco'},
  {id:'ie', nm:'🇮🇪 Irlanda'},
  {id:'cz', nm:'🇨🇿 República Checa'},
  {id:'hu', nm:'🇭🇺 Hungría'},
  {id:'ro', nm:'🇷🇴 Rumanía'},
  {id:'ru', nm:'🇷🇺 Rusia'},
  {id:'ua', nm:'🇺🇦 Ucrania'},
  {id:'tr', nm:'🇹🇷 Turquía'},
  {id:'il', nm:'🇮🇱 Israel'},
  {id:'ae', nm:'🇦🇪 Dubai / Emiratos Árabes'},
  {id:'sa', nm:'🇸🇦 Arabia Saudita'},
  {id:'qa', nm:'🇶🇦 Qatar'},
  {id:'kw', nm:'🇰🇼 Kuwait'},
  {id:'bh', nm:'🇧🇭 Bahréin'},
  {id:'om', nm:'🇴🇲 Omán'},
  {id:'jo', nm:'🇯🇴 Jordania'},
  {id:'lb', nm:'🇱🇧 Líbano'},
  {id:'jp', nm:'🇯🇵 Japón'},
  {id:'cn', nm:'🇨🇳 China'},
  {id:'kr', nm:'🇰🇷 Corea del Sur'},
  {id:'tw', nm:'🇹🇼 Taiwán'},
  {id:'hk', nm:'🇭🇰 Hong Kong'},
  {id:'sg', nm:'🇸🇬 Singapur'},
  {id:'th', nm:'🇹🇭 Tailandia'},
  {id:'vn', nm:'🇻🇳 Vietnam'},
  {id:'id', nm:'🇮🇩 Indonesia'},
  {id:'my', nm:'🇲🇾 Malasia'},
  {id:'ph', nm:'🇵🇭 Filipinas'},
  {id:'in', nm:'🇮🇳 India'},
  {id:'pk', nm:'🇵🇰 Pakistán'},
  {id:'bd', nm:'🇧🇩 Bangladesh'},
  {id:'lk', nm:'🇱🇰 Sri Lanka'},
  {id:'mm', nm:'🇲🇲 Myanmar'},
  {id:'kh', nm:'🇰🇭 Camboya'},
  {id:'mn', nm:'🇲🇳 Mongolia'},
  {id:'au', nm:'🇦🇺 Australia'},
  {id:'nz', nm:'🇳🇿 Nueva Zelanda'},
  {id:'pg', nm:'🇵🇬 Papua Nueva Guinea'},
  {id:'fj', nm:'🇫🇯 Fiji & Oceanía'},
  {id:'eg', nm:'🇪🇬 Egipto'},
  {id:'za', nm:'🇿🇦 Sudáfrica'},
  {id:'ng', nm:'🇳🇬 Nigeria'},
  {id:'ke', nm:'🇰🇪 Kenia'},
  {id:'ma', nm:'🇲🇦 Marruecos'},
  {id:'gh', nm:'🇬🇭 Ghana'},
  {id:'et', nm:'🇪🇹 Etiopía'},
  {id:'tz', nm:'🇹🇿 Tanzania'},
  {id:'ug', nm:'🇺🇬 Uganda'},
  {id:'ci', nm:'🇨🇮 Costa de Marfil'},
  {id:'cm', nm:'🇨🇲 Camerún'},
  {id:'sn', nm:'🇸🇳 Senegal'},
  {id:'tn', nm:'🇹🇳 Túnez'},
  {id:'dz', nm:'🇩🇿 Argelia'},
  {id:'zm', nm:'🇿🇲 Zambia'},
  {id:'zw', nm:'🇿🇼 Zimbabwe'},
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
  {id:'demografia',icon:'📊',nm:'Demografía'},
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

  useEffect(() => {
    const saved = localStorage.getItem('nicho_search')
    if (saved) {
      setNicho(saved)
      localStorage.removeItem('nicho_search')
      setSeccion('prospectos')
    }
  }, [])

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
        {seccion==='demografia' && (
          <div className="fade-up">
            <h2 style={{color:'#E8C97A',fontSize:'1.3rem',fontWeight:300,marginBottom:8}}>📊 Análisis Demográfico Global</h2>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginBottom:20}}>27 segmentos · 6 continentes · Clic en cualquier segmento para buscar clientes</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8,marginBottom:24}}>
              {[
                {nm:'🏛️ Museos Historia Natural',pais:'USA, UK, Alemania, Japón, Francia',presupuesto:'$500-$50,000',vol:'alto',keywords:'natural history museum entomology',color:'rgba(10,30,10,0.3)'},
                {nm:'💎 Coleccionistas Lujo',pais:'Dubai, Mónaco, USA, Japón, China',presupuesto:'$1,000-$500,000',vol:'muy alto',keywords:'luxury insect collector rare specimen',color:'rgba(30,20,0,0.3)'},
                {nm:'🎨 Galerías Arte & Ciencia',pais:'NYC, Londres, París, Tokio, Berlín',presupuesto:'$200-$10,000',vol:'medio',keywords:'art gallery biological science specimens',color:'rgba(20,10,30,0.3)'},
                {nm:'💍 Joyerías & Alta Moda',pais:'Italia, Francia, Japón, UAE, Korea',presupuesto:'$100-$5,000',vol:'alto',keywords:'natural jewelry luxury fashion insect gold',color:'rgba(30,5,15,0.3)'},
                {nm:'🏨 Hoteles 5 Estrellas',pais:'Dubai, Maldivas, Singapur, Mónaco',presupuesto:'$1,000-$100,000',vol:'muy alto',keywords:'luxury hotel decoration natural art amazon',color:'rgba(5,15,30,0.3)'},
                {nm:'🎓 Universidades & Institutos',pais:'USA, UK, Alemania, Japón, Australia',presupuesto:'$100-$10,000',vol:'medio',keywords:'entomology university research specimens',color:'rgba(5,20,10,0.3)'},
                {nm:'🏫 Colegios & Educación',pais:'USA, UK, Alemania, Australia',presupuesto:'$50-$2,000',vol:'medio',keywords:'school education biology natural collection',color:'rgba(8,20,8,0.3)'},
                {nm:'✨ Minerales & Cristales',pais:'USA, Alemania, Brasil, China, India',presupuesto:'$50-$5,000',vol:'medio',keywords:'peruvian pyrite crystal quartz minerals',color:'rgba(20,5,25,0.3)'},
                {nm:'🔬 Farmacéuticas',pais:'USA, Suiza, Alemania, Japón, UK',presupuesto:'$500-$50,000',vol:'alto',keywords:'pharmaceutical biological research amazon',color:'rgba(5,25,20,0.3)'},
                {nm:'🍽️ Restaurantes Gourmet',pais:'Francia, Japón, USA, España, Perú',presupuesto:'$200-$5,000',vol:'medio',keywords:'gourmet restaurant exotic amazon ingredients',color:'rgba(25,10,5,0.3)'},
                {nm:'💆 Spa & Wellness',pais:'Bali, Tailandia, Dubai, Suiza, USA',presupuesto:'$300-$10,000',vol:'medio',keywords:'spa wellness natural amazon essential oils',color:'rgba(5,20,25,0.3)'},
                {nm:'🦁 Zoológicos & Acuarios',pais:'USA, UK, Alemania, Japón, China',presupuesto:'$500-$20,000',vol:'medio',keywords:'zoo aquarium natural collection biological',color:'rgba(15,20,5,0.3)'},
                {nm:'🎪 Ferias Internacionales',pais:'Alemania, USA, China, UAE, UK',presupuesto:'$1,000-$50,000',vol:'alto',keywords:'international fair entomology exhibition',color:'rgba(20,15,0,0.3)'},
                {nm:'🧶 Textilería & Alpaca',pais:'USA, Europa, Japón, Australia',presupuesto:'$100-$3,000',vol:'medio',keywords:'amazon textile alpaca peru handcraft',color:'rgba(25,5,10,0.3)'},
                {nm:'🌿 Hierbas Medicinales',pais:'USA, Alemania, Japón, China, India',presupuesto:'$50-$2,000',vol:'alto',keywords:'medicinal herbs natural amazon collection',color:'rgba(5,25,5,0.3)'},
                {nm:'🍄 Hongos & Setas',pais:'USA, Japón, Alemania, China',presupuesto:'$100-$3,000',vol:'alto',keywords:'mushrooms fungi natural collection amazon',color:'rgba(20,10,0,0.3)'},
                {nm:'🪵 Maderas Finas',pais:'Alemania, Japón, USA, China, Italia',presupuesto:'$200-$10,000',vol:'medio',keywords:'fine wood amazon tropical timber certified',color:'rgba(25,15,0,0.3)'},
                {nm:'🌸 Flores & Plantas Secas',pais:'Francia, Japón, USA, Holanda',presupuesto:'$50-$2,000',vol:'medio',keywords:'dried flowers plants botanical collection',color:'rgba(25,5,20,0.3)'},
                {nm:'🌱 Semillas & Herbarios',pais:'USA, UK, Alemania, Australia',presupuesto:'$50-$1,000',vol:'bajo',keywords:'seeds herbarium botanical collection plant',color:'rgba(5,25,10,0.3)'},
                {nm:'🍃 Hojas & Plumas',pais:'USA, Francia, Japón, UK',presupuesto:'$50-$1,500',vol:'bajo',keywords:'leaves feathers natural botanical collection',color:'rgba(10,20,5,0.3)'},
                {nm:'💊 Superalimentos',pais:'USA, UK, Alemania, Australia, Japón',presupuesto:'$100-$5,000',vol:'alto',keywords:'superfoods natural supplement amazon active',color:'rgba(10,25,5,0.3)'},
                {nm:'🥜 Alimentos Deshidratados',pais:'USA, Europa, Japón, Australia',presupuesto:'$100-$3,000',vol:'medio',keywords:'dehydrated food natural amazon condiments',color:'rgba(20,15,5,0.3)'},
                {nm:'🔮 Encapsulados Resina',pais:'USA, Japón, UK, Alemania, China',presupuesto:'$50-$2,000',vol:'medio',keywords:'epoxy resin encapsulated specimen luxury',color:'rgba(15,5,25,0.3)'},
                {nm:'🕌 Coleccionistas Dubai & Gulf',pais:'UAE, Qatar, Kuwait, Arabia Saudita',presupuesto:'$5,000-$500,000',vol:'muy alto',keywords:'dubai gulf luxury collector rare specimen',color:'rgba(25,20,0,0.3)'},
                {nm:'🎬 Hollywood & Entertainment',pais:'USA - Los Angeles, New York',presupuesto:'$1,000-$100,000',vol:'alto',keywords:'hollywood entertainment luxury decoration natural',color:'rgba(20,5,5,0.3)'},
                {nm:'🇨🇳 Mercado Asiático Premium',pais:'China, Taiwán, Hong Kong, Singapur',presupuesto:'$500-$50,000',vol:'muy alto',keywords:'china asia luxury natural collection biological',color:'rgba(20,5,5,0.3)'},
                {nm:'🛍️ Tiendas Lujo & Souvenirs',pais:'Global - aeropuertos y duty free',presupuesto:'$200-$10,000',vol:'alto',keywords:'luxury store souvenir natural exotic products',color:'rgba(15,10,20,0.3)'},
              ].map((s,i)=>(
                <div key={i} className="card" style={{background:s.color,border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:14,cursor:'pointer'}} onClick={()=>{setBusquedaCustom(s.keywords);setSeccion('prospectos')}}>
                  <h3 style={{color:'#E8C97A',fontSize:'.78rem',fontWeight:400,marginBottom:4}}>{s.nm}</h3>
                  <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',marginBottom:4}}>🌍 {s.pais}</p>
                  <p style={{color:'#C9A84C',fontSize:'.72rem',fontWeight:700,marginBottom:6}}>{s.presupuesto}</p>
                  <span style={{background:s.vol==='muy alto'?'rgba(37,211,102,0.15)':s.vol==='alto'?'rgba(201,168,76,0.15)':'rgba(100,100,100,0.15)',color:s.vol==='muy alto'?'#25D366':s.vol==='alto'?'#C9A84C':'rgba(232,201,122,0.4)',padding:'2px 6px',borderRadius:6,fontSize:'.58rem'}}>{s.vol}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
