'use client'
import { useState } from 'react'

const NICHOS = [
  {id:'museos', nm:'🏛️ Museos Historia Natural', keywords:'natural history museum entomology biology'},
  {id:'galerias', nm:'🎨 Galerías Arte & Ciencia', keywords:'art gallery biological science specimens'},
  {id:'coleccionistas', nm:'💎 Coleccionistas Premium', keywords:'insect collector butterfly collection rare'},
  {id:'universidades', nm:'🎓 Universidades & Institutos', keywords:'entomology university institute research'},
  {id:'colegios', nm:'🏫 Colegios & Educación', keywords:'school education biology natural specimens'},
  {id:'ferias_intl', nm:'🌍 Ferias Internacionales', keywords:'international fair entomology biological exhibition'},
  {id:'ferias_locales', nm:'🎪 Ferias Locales', keywords:'local fair regional natural products peru amazon'},
  {id:'zoo', nm:'🦁 Zoológicos & Acuarios', keywords:'zoo aquarium natural collection biological'},
  {id:'joyeria', nm:'💍 Joyería Natural', keywords:'natural jewelry butterfly wings luxury gold'},
  {id:'decoracion', nm:'🏠 Decoración Premium', keywords:'luxury decoration natural art interior design'},
  {id:'restaurantes', nm:'🍽️ Restaurantes Gourmet', keywords:'gourmet restaurant exotic ingredients amazon'},
  {id:'chefs', nm:'👨‍🍳 Chefs & Gastronomía', keywords:'chef exotic food amazon ingredients natural'},
  {id:'arte', nm:'🖼️ Arte & Cultura', keywords:'art culture natural biological amazon peru'},
  {id:'textil_amazonica', nm:'🧶 Textilería Amazónica', keywords:'amazon textile peru handcraft artisan'},
  {id:'textil_sierra', nm:'🏔️ Textilería Sierra & Alpaca', keywords:'andean textile sierra peru alpaca wool'},
  {id:'textil_costa', nm:'🌊 Textilería Costa', keywords:'coastal peru textile cotton handmade'},
  {id:'insectos', nm:'🪲 Insectos Naturales', keywords:'natural insects collection entomology specimens'},
  {id:'flores', nm:'🌸 Flores & Plantas Secas', keywords:'dried flowers plants collection botanical'},
  {id:'semillas', nm:'🌱 Semillas & Herbarios', keywords:'seeds herbarium botanical collection plant'},
  {id:'hojas_plumas', nm:'🍃 Hojas & Plumas', keywords:'leaves feathers natural collection botanical'},
  {id:'hierbas', nm:'🌿 Hierbas Medicinales', keywords:'medicinal herbs natural amazon collection'},
  {id:'hongos', nm:'🍄 Hongos & Setas', keywords:'mushrooms fungi natural collection amazon'},
  {id:'maderas', nm:'🪵 Maderas Finas', keywords:'fine wood amazon tropical timber luxury'},
  {id:'piedras', nm:'💎 Piedras Preciosas', keywords:'precious stones minerals collection gems peru'},
  {id:'frutos', nm:'🍎 Frutos Exóticos', keywords:'exotic fruits amazon tropical dried natural'},
  {id:'alimentos_polvo', nm:'🌿 Alimentos en Polvo', keywords:'natural powder food supplement amazon'},
  {id:'superalimentos', nm:'💊 Superalimentos', keywords:'superfoods active natural supplement amazon'},
  {id:'alimentos_desh', nm:'🥜 Alimentos Deshidratados', keywords:'dehydrated food natural amazon condiments'},
  {id:'farmaceuticas', nm:'🔬 Farmacéuticas', keywords:'pharmaceutical biological research amazon'},
  {id:'spa_wellness', nm:'💆 Spa & Wellness', keywords:'spa wellness natural amazon essential oils'},
  {id:'hoteles', nm:'🏨 Hoteles de Lujo', keywords:'luxury hotel decoration natural art amazon'},
  {id:'tiendas_lujo', nm:'🛍️ Tiendas de Lujo', keywords:'luxury store natural exotic products'},
  {id:'china_asia', nm:'🇨🇳 Mercado Asiático', keywords:'china asia natural collection biological luxury'},
  {id:'africa', nm:'🌍 Mercado Africano', keywords:'africa natural collection biological art'},
  {id:'medio_oriente', nm:'🕌 Medio Oriente', keywords:'dubai luxury natural collection art'},
  {id:'europa', nm:'🇪🇺 Europa Premium', keywords:'europe luxury natural collection biological'},
  {id:'usa_canada', nm:'🇺🇸 USA & Canadá', keywords:'usa canada natural collection museum gallery'},
  {id:'japon_korea', nm:'🇯🇵 Japón & Corea', keywords:'japan korea natural collection biological luxury'},
]

const PAISES = [
  {id:'all', nm:'🌍 Todo el Mundo'},
  {id:'us', nm:'🇺🇸 USA'},
  {id:'de', nm:'🇩🇪 Alemania'},
  {id:'jp', nm:'🇯🇵 Japón'},
  {id:'cn', nm:'🇨🇳 China'},
  {id:'gb', nm:'🇬🇧 Reino Unido'},
  {id:'fr', nm:'🇫🇷 Francia'},
  {id:'kr', nm:'🇰🇷 Corea'},
  {id:'au', nm:'🇦🇺 Australia'},
  {id:'br', nm:'🇧🇷 Brasil'},
  {id:'za', nm:'🇿🇦 Sudáfrica'},
  {id:'ae', nm:'🇦🇪 Dubai'},
  {id:'it', nm:'🇮🇹 Italia'},
  {id:'es', nm:'🇪🇸 España'},
  {id:'nl', nm:'🇳🇱 Holanda'},
  {id:'ch', nm:'🇨🇭 Suiza'},
  {id:'sg', nm:'🇸🇬 Singapur'},
  {id:'mx', nm:'🇲🇽 México'},
  {id:'ar', nm:'🇦🇷 Argentina'},
  {id:'ng', nm:'🇳🇬 Nigeria'},
  {id:'in', nm:'🇮🇳 India'},
  {id:'ru', nm:'🇷🇺 Rusia'},
  {id:'sa', nm:'🇸🇦 Arabia Saudita'},
  {id:'au', nm:'🇦🇺 Australia'},
  {id:'nz', nm:'🇳🇿 Nueva Zelanda'},
  {id:'pg', nm:'🇵🇬 Papua Nueva Guinea'},
  {id:'fj', nm:'🇫🇯 Fiji & Oceanía'},
  {id:'ph', nm:'🇵🇭 Filipinas'},
  {id:'th', nm:'🇹🇭 Tailandia'},
  {id:'vn', nm:'🇻🇳 Vietnam'},
  {id:'id', nm:'🇮🇩 Indonesia'},
  {id:'my', nm:'🇲🇾 Malasia'},
  {id:'ke', nm:'🇰🇪 Kenia'},
  {id:'gh', nm:'🇬🇭 Ghana'},
  {id:'ma', nm:'🇲🇦 Marruecos'},
  {id:'pe', nm:'🇵🇪 Perú Local'},
]

type Prospecto = {
  name: string
  title: string
  organization_name: string
  email: string
  country: string
  linkedin_url: string
}

export default function ProspectosPage() {
  const [nicho, setNicho] = useState('museos')
  const [pais, setPais] = useState('all')
  const [buscando, setBuscando] = useState(false)
  const [resultados, setResultados] = useState<Prospecto[]>([])
  const [error, setError] = useState('')
  const [enviados, setEnviados] = useState<string[]>([])
  const [busquedaCustom, setBusquedaCustom] = useState('')

  const buscar = async () => {
    setBuscando(true)
    setError('')
    setResultados([])
    try {
      const nichoData = NICHOS.find(n=>n.id===nicho)
      const res = await fetch('/api/prospectos', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          nicho: busquedaCustom || nichoData?.keywords,
          pais: pais === 'all' ? '' : pais,
          cargo: 'director curator buyer collector manager procurement'
        })
      })
      const data = await res.json()
      if (data.people) setResultados(data.people)
      else setError('No se encontraron resultados. Intenta con otro nicho o país.')
    } catch {
      setError('Error de conexión')
    }
    setBuscando(false)
  }

  const marcarEnviado = (email: string) => {
    setEnviados(prev => prev.includes(email) ? prev.filter(e=>e!==email) : [...prev, email])
  }

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'20px 16px'}}>
      <style>{`
        .nicho-btn{transition:all 0.18s ease;cursor:pointer}
        .nicho-btn:hover{transform:translateY(-2px)}
        .card{transition:all 0.2s ease}
        .card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(201,168,76,0.2)!important}
        .btn{transition:all 0.15s ease;cursor:pointer}
        .btn:hover{opacity:0.85}
      `}</style>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <a href="/admin-panel" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:20}}>← Panel Admin</a>
        <div style={{textAlign:'center',marginBottom:28}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:300,color:'#E8C97A',marginBottom:6}}>🌍 Prospección Global de Clientes</h1>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.72rem'}}>Apollo AI · 6 Continentes · 38 Nichos · Materias Primas del Perú</p>
        </div>
        <div style={{marginBottom:20}}>
          <input value={busquedaCustom} onChange={e=>setBusquedaCustom(e.target.value)} placeholder="🔍 Búsqueda personalizada..." style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'12px 16px',borderRadius:8,fontSize:'.82rem',fontFamily:'Georgia,serif',boxSizing:'border-box'}}/>
        </div>
        <div style={{marginBottom:20}}>
          <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:12}}>38 NICHOS</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:6}}>
            {NICHOS.map(n=>(
              <button key={n.id} onClick={()=>setNicho(n.id)} className="nicho-btn" style={{background:nicho===n.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:nicho===n.id?'#1A1209':'#C9A84C',border:`1px solid ${nicho===n.id?'transparent':'rgba(201,168,76,0.12)'}`,padding:'9px 12px',borderRadius:8,fontSize:'.72rem',fontFamily:'Georgia,serif',textAlign:'left'}}>
                {n.nm}
              </button>
            ))}
          </div>
        </div>
        <div style={{marginBottom:24}}>
          <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:12}}>MERCADO</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
            {PAISES.map(p=>(
              <button key={p.id} onClick={()=>setPais(p.id)} className="nicho-btn" style={{background:pais===p.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:pais===p.id?'#1A1209':'#C9A84C',border:`1px solid ${pais===p.id?'transparent':'rgba(201,168,76,0.12)'}`,padding:'6px 12px',borderRadius:20,fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                {p.nm}
              </button>
            ))}
          </div>
        </div>
        <button onClick={buscar} disabled={buscando} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'14px',borderRadius:8,fontSize:'1rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif',marginBottom:24}}>
          {buscando ? '🔍 Buscando en todo el mundo...' : '🔍 Buscar Clientes Ahora'}
        </button>
        {error && <div style={{background:'rgba(255,100,100,0.08)',border:'1px solid rgba(255,100,100,0.2)',borderRadius:8,padding:16,marginBottom:16}}><p style={{color:'rgba(255,100,100,0.7)',fontSize:'.8rem'}}>{error}</p></div>}
        {resultados.length > 0 && (
          <div>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:16}}>✅ {resultados.length} CLIENTES ENCONTRADOS</p>
            {resultados.map((p,i)=>(
              <div key={i} className="card" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,padding:16,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                      <p style={{color:'#E8C97A',fontSize:'.9rem'}}>{p.name}</p>
                      {enviados.includes(p.email) && <span style={{background:'rgba(37,211,102,0.15)',color:'#25D366',padding:'2px 8px',borderRadius:10,fontSize:'.6rem'}}>✅ Contactado</span>}
                    </div>
                    <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.75rem'}}>{p.title}</p>
                    <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem',marginTop:2}}>🏢 {p.organization_name} · 🌍 {p.country}</p>
                    {p.email && <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem',marginTop:2}}>✉️ {p.email}</p>}
                  </div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'flex-start'}}>
                    {p.email && <a href={`mailto:${p.email}?subject=House Insects of Peru - Exportación Materias Primas A1`} className="btn" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'6px 12px',borderRadius:4,fontSize:'.65rem',textDecoration:'none'}}>✉️ Email</a>}
                    {p.linkedin_url && <a href={p.linkedin_url} target="_blank" className="btn" style={{background:'rgba(0,119,181,0.15)',border:'1px solid rgba(0,119,181,0.3)',color:'#0077B5',padding:'6px 12px',borderRadius:4,fontSize:'.65rem',textDecoration:'none'}}>💼 LinkedIn</a>}
                    <a href="https://wa.me/51940699405" target="_blank" className="btn" style={{background:'rgba(37,211,102,0.15)',border:'1px solid rgba(37,211,102,0.2)',color:'#25D366',padding:'6px 12px',borderRadius:4,fontSize:'.65rem',textDecoration:'none'}}>💬 WhatsApp</a>
                    <button onClick={()=>marcarEnviado(p.email)} className="btn" style={{background:'transparent',border:'1px solid rgba(201,168,76,0.15)',color:'rgba(201,168,76,0.4)',padding:'6px 12px',borderRadius:4,fontSize:'.6rem',fontFamily:'Georgia,serif'}}>
                      {enviados.includes(p.email)?'↩️ Desmarcar':'✅ Marcar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{textAlign:'center',marginTop:24,paddingTop:16,borderTop:'1px solid rgba(201,168,76,0.1)'}}>
          <p style={{color:'rgba(201,168,76,0.2)',fontSize:'.62rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · Apollo AI · 6 Continentes</p>
        </div>
      </div>
    </div>
  )
}
