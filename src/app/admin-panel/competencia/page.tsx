'use client'
import { useState } from 'react'

const RUBROS = [
  {
    id:'mariposas',
    nm:'🦋 Mariposas & Especímenes',
    competidores:[
      {nm:'InsectNet', pais:'🇺🇸 USA', url:'insectnet.com', desde:'1995', fortaleza:'Mayor catálogo online', debilidad:'Sin certificación CITES propia', precio:'$2-500'},
      {nm:'Collector\'s Secret', pais:'🇺🇸 USA', url:'collectorssecret.com', desde:'2001', fortaleza:'Marketing digital fuerte', debilidad:'No produce, solo revende', precio:'$5-1000'},
      {nm:'Worldwide Butterflies', pais:'🇬🇧 UK', url:'wwb.co.uk', desde:'1961', fortaleza:'65 años de historia', debilidad:'Precios altos, poca variedad amazónica', precio:'$3-200'},
      {nm:'BioQuip', pais:'🇺🇸 USA', url:'bioquip.com', desde:'1947', fortaleza:'Equipos + especímenes', debilidad:'Enfocado en herramientas', precio:'$1-100'},
      {nm:'Entomologie Krefeld', pais:'🇩🇪 Alemania', url:'entomologie.de', desde:'1985', fortaleza:'Mercado europeo sólido', debilidad:'Solo Europa', precio:'€5-300'},
    ],
    mercados:['Museos', 'Universidades', 'Coleccionistas privados', 'Joyerías'],
    compradores:'Alemanes, japoneses, americanos, chinos',
    ventaja:'Somos productores directos en Tingo María — precio A1 sin intermediarios',
    tamano:'$2.3B mercado global coleccionismo entomológico',
  },
  {
    id:'joyeria',
    nm:'💍 Joyería Natural',
    competidores:[
      {nm:'Frozen In Time', pais:'🇺🇸 USA', url:'frozenintime.com', desde:'2005', fortaleza:'Diseño moderno', debilidad:'No usa oro real', precio:'$50-500'},
      {nm:'Insect Lab', pais:'🇬🇧 UK', url:'insectlab.co.uk', desde:'2004', fortaleza:'Viral en redes', debilidad:'Solo electroplatedo básico', precio:'$80-800'},
      {nm:'Gold Bug', pais:'🇺🇸 USA', url:'goldbug.com', desde:'1998', fortaleza:'Tienda física en Scottsdale', debilidad:'Sin certificación SERFOR', precio:'$100-2000'},
      {nm:'Etsy sellers', pais:'🌍 Global', url:'etsy.com', desde:'2005', fortaleza:'Masivo', debilidad:'Sin calidad garantizada', precio:'$20-300'},
    ],
    mercados:['Alta moda', 'Joyerías premium', 'Coleccionistas', 'Regalos corporativos'],
    compradores:'Europeas, japonesas, americanas, árabes',
    ventaja:'Oro 24k real + plata .950 + especímenes A1 certificados CITES',
    tamano:'$340B mercado joyería lujo global',
  },
  {
    id:'minerales',
    nm:'💎 Minerales & Cristales',
    competidores:[
      {nm:'Astro Gallery', pais:'🇺🇸 USA', url:'astrogallery.com', desde:'1981', fortaleza:'NYC flagship store', debilidad:'No tiene pirita peruana', precio:'$20-50,000'},
      {nm:'Crystal Mountain', pais:'🇦🇺 Australia', url:'crystalmountain.com.au', desde:'1990', fortaleza:'Australasia market', debilidad:'Sin certificaciones peruanas', precio:'$10-5000'},
      {nm:'Mineralogical Research', pais:'🇺🇸 USA', url:'minresco.com', desde:'1964', fortaleza:'Científico', debilidad:'No vende retail', precio:'$50-10,000'},
      {nm:'Inti Minerals', pais:'🇵🇪 Perú', url:'intiminerals.com', desde:'2010', fortaleza:'Conocen Peru', debilidad:'Pequeño, sin marketing', precio:'$5-500'},
    ],
    mercados:['Tiendas esotéricas', 'Decoración premium', 'Museos', 'Coleccionistas'],
    compradores:'Chinos, americanos, europeos, indios',
    ventaja:'Extracción directa en Perú + certificación minería + precio competitivo',
    tamano:'$22B mercado minerales y cristales global',
  },
  {
    id:'maderas',
    nm:'🪵 Maderas Finas',
    competidores:[
      {nm:'Rare Woods USA', pais:'🇺🇸 USA', url:'rarewoodsusa.com', desde:'2000', fortaleza:'Gran catálogo', debilidad:'No tiene amazónicas certificadas', precio:'$20-500/plank'},
      {nm:'Wood Vendors', pais:'🇺🇸 USA', url:'woodvendors.com', desde:'1995', fortaleza:'Online masivo', debilidad:'Sin SERFOR', precio:'$10-200'},
      {nm:'Coremark Metals', pais:'🇺🇸 USA', url:'coremark.com', desde:'1947', fortaleza:'Industrial', debilidad:'No fine wood', precio:'$50-1000'},
    ],
    mercados:['Ebanistería', 'Instrumentos musicales', 'Arte', 'Decoración'],
    compradores:'Alemanes, japoneses, americanos, chinos',
    ventaja:'SERFOR certificado + maderas únicas amazónicas + precio origen',
    tamano:'$600B mercado maderas global',
  },
  {
    id:'superalimentos',
    nm:'💊 Superalimentos & Agroindustria',
    competidores:[
      {nm:'Amazon Origins', pais:'🇵🇪 Perú', url:'amazonorigins.com', desde:'2012', fortaleza:'Branding moderno', debilidad:'Sin diversificación', precio:'$10-100'},
      {nm:'Navitas Organics', pais:'🇺🇸 USA', url:'navitasorganics.com', desde:'2003', fortaleza:'Distribución masiva', debilidad:'No origen directo Perú', precio:'$15-80'},
      {nm:'Terrasoul Superfoods', pais:'🇺🇸 USA', url:'terrasoul.com', desde:'2013', fortaleza:'Amazon marketplace', debilidad:'Genérico', precio:'$8-50'},
      {nm:'Rainforest Foods', pais:'🇬🇧 UK', url:'rainforestfoods.co.uk', desde:'2014', fortaleza:'UK market', debilidad:'Sin certificación SENASA', precio:'$12-60'},
    ],
    mercados:['Health stores', 'Restaurantes', 'Farmacias', 'Online'],
    compradores:'Americanos, europeos, australianos, japoneses',
    ventaja:'SENASA certificado + origen Tingo María + precios productor directo',
    tamano:'$214B mercado superalimentos global',
  },
  {
    id:'textileria',
    nm:'🧶 Textilería & Alpaca',
    competidores:[
      {nm:'Kuna', pais:'🇵🇪 Perú', url:'kuna.com.pe', desde:'1981', fortaleza:'Marca establecida', debilidad:'Precio alto retail', precio:'$50-500'},
      {nm:'Sol Alpaca', pais:'🇵🇪 Perú', url:'solalpaca.com', desde:'2000', fortaleza:'Lujo peruano', debilidad:'Solo alpaca fina', precio:'$100-2000'},
      {nm:'Novica', pais:'🇺🇸 USA', url:'novica.com', desde:'1999', fortaleza:'National Geographic partner', debilidad:'Comisión alta', precio:'$20-300'},
    ],
    mercados:['Moda', 'Hoteles', 'Regalos corporativos', 'Online'],
    compradores:'Americanos, europeos, japoneses',
    ventaja:'Textilería amazónica única + alpaca + precios productor directo',
    tamano:'$1.7T mercado textil global',
  },
  {
    id:'hongos',
    nm:'🍄 Hongos & Plantas Medicinales',
    competidores:[
      {nm:'Four Sigmatic', pais:'🇫🇮 Finlandia', url:'foursigmatic.com', desde:'2012', fortaleza:'Marketing viral', debilidad:'No amazónico', precio:'$30-80'},
      {nm:'Host Defense', pais:'🇺🇸 USA', url:'hostdefense.com', desde:'1999', fortaleza:'Científico', debilidad:'Solo hongos USA', precio:'$20-60'},
      {nm:'Real Mushrooms', pais:'🇨🇦 Canadá', url:'realmushrooms.com', desde:'2014', fortaleza:'Online fuerte', debilidad:'Sin SENASA', precio:'$25-70'},
    ],
    mercados:['Farmacias', 'Health stores', 'Restaurantes', 'Investigación'],
    compradores:'Americanos, europeos, chinos, japoneses',
    ventaja:'Hongos amazónicos únicos + SENASA + precio origen',
    tamano:'$69B mercado hongos medicinales global',
  },
]

const FERIAS = [
  {nm:'Entomology World Congress', lugar:'🌍 Internacional', frecuencia:'Cada 4 años', tipo:'Científica', rubros:'Especímenes, material científico'},
  {nm:'Tucson Gem & Mineral Show', lugar:'🇺🇸 Arizona USA', frecuencia:'Febrero anual', tipo:'Minerales', rubros:'Minerales, cristales, fósiles'},
  {nm:'Munich Mineral Show', lugar:'🇩🇪 Alemania', frecuencia:'Octubre anual', tipo:'Minerales', rubros:'Minerales, geodas, cristales'},
  {nm:'Art Basel', lugar:'🇨🇭 Suiza / Miami / HK', frecuencia:'Junio anual', tipo:'Arte', rubros:'Bio-art, joyería, cuadros'},
  {nm:'Biofach', lugar:'🇩🇪 Núremberg', frecuencia:'Enero anual', tipo:'Orgánicos', rubros:'Superalimentos, hongos, plantas'},
  {nm:'Natural Products Expo', lugar:'🇺🇸 California', frecuencia:'Marzo anual', tipo:'Natural', rubros:'Superalimentos, aceites, plantas'},
  {nm:'Jewellery & Gem World HK', lugar:'🇭🇰 Hong Kong', frecuencia:'Septiembre anual', tipo:'Joyería', rubros:'Joyería, minerales, piedras'},
  {nm:'Expo CITES', lugar:'🌍 Internacional', frecuencia:'Cada 3 años', tipo:'Legal/Científica', rubros:'Todos los rubros CITES'},
  {nm:'PROMPERÚ Misiones Comerciales', lugar:'🇵🇪 Perú + mundo', frecuencia:'Todo el año', tipo:'Exportación', rubros:'Todos los rubros'},
  {nm:'Canton Fair', lugar:'🇨🇳 China', frecuencia:'Abril/Octubre', tipo:'Comercial', rubros:'Todos los productos'},
  {nm:'Dubai Expo & Trade', lugar:'🇦🇪 Dubai', frecuencia:'Anual', tipo:'Lujo/Comercial', rubros:'Lujo, minerales, arte'},
  {nm:'Tokyo International Gift Show', lugar:'🇯🇵 Japón', frecuencia:'Febrero/Septiembre', tipo:'Regalos', rubros:'Arte, joyería, souvenirs'},
]

export default function CompetenciaPage() {
  const [rubro, setRubro] = useState('mariposas')
  const [vista, setVista] = useState<'competencia'|'ferias'>('competencia')
  const r = RUBROS.find(x=>x.id===rubro)

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'20px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeInUp 0.5s ease both}
        .tab{transition:all 0.18s ease;cursor:pointer}
        .tab:hover{transform:translateY(-2px)}
        .card{transition:all 0.2s ease}
        .card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(201,168,76,0.15)!important}
      `}</style>

      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <a href="/admin-panel" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:20}}>← Panel Admin</a>

        <div style={{textAlign:'center',marginBottom:28}}>
          <h1 style={{fontSize:'1.5rem',fontWeight:300,color:'#E8C97A',marginBottom:6}}>🔍 Inteligencia Competitiva & Mercados</h1>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.72rem'}}>Competidores · Ferias Internacionales · Donde Vender · 17 Rubros</p>
        </div>

        {/* TABS */}
        <div style={{display:'flex',gap:8,marginBottom:24,justifyContent:'center'}}>
          <button onClick={()=>setVista('competencia')} className="tab" style={{background:vista==='competencia'?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:vista==='competencia'?'#1A1209':'#C9A84C',border:`1px solid ${vista==='competencia'?'transparent':'rgba(201,168,76,0.2)'}`,padding:'8px 24px',borderRadius:20,fontSize:'.8rem',fontFamily:'Georgia,serif'}}>🏆 Competencia</button>
          <button onClick={()=>setVista('ferias')} className="tab" style={{background:vista==='ferias'?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:vista==='ferias'?'#1A1209':'#C9A84C',border:`1px solid ${vista==='ferias'?'transparent':'rgba(201,168,76,0.2)'}`,padding:'8px 24px',borderRadius:20,fontSize:'.8rem',fontFamily:'Georgia,serif'}}>🌍 Ferias & Donde Vender</button>
        </div>

        {vista==='competencia' && (
          <div className="fade-up">
            {/* SELECTOR RUBRO */}
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:24}}>
              {RUBROS.map(x=>(
                <button key={x.id} onClick={()=>setRubro(x.id)} className="tab" style={{background:rubro===x.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.05)',color:rubro===x.id?'#1A1209':'#C9A84C',border:`1px solid ${rubro===x.id?'transparent':'rgba(201,168,76,0.1)'}`,padding:'6px 14px',borderRadius:20,fontSize:'.72rem',fontFamily:'Georgia,serif'}}>
                  {x.nm}
                </button>
              ))}
            </div>

            {r && (
              <>
                {/* MERCADO */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10,marginBottom:20}}>
                  <div style={{background:'rgba(37,211,102,0.06)',border:'1px solid rgba(37,211,102,0.15)',borderRadius:8,padding:14}}>
                    <p style={{color:'rgba(37,211,102,0.6)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>TAMAÑO DE MERCADO</p>
                    <p style={{color:'#25D366',fontSize:'.9rem',fontWeight:700}}>{r.tamano}</p>
                  </div>
                  <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:14}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>COMPRADORES ACTIVOS</p>
                    <p style={{color:'#C9A84C',fontSize:'.82rem'}}>{r.compradores}</p>
                  </div>
                  <div style={{background:'rgba(5,15,30,0.3)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:14}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>NUESTRA VENTAJA</p>
                    <p style={{color:'#E8C97A',fontSize:'.75rem',lineHeight:1.5}}>{r.ventaja}</p>
                  </div>
                </div>

                {/* COMPETIDORES */}
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:12}}>COMPETIDORES PRINCIPALES</p>
                {r.competidores.map((c,i)=>(
                  <div key={i} className="card" style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:10,padding:16,marginBottom:10}}>
                    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10,marginBottom:10}}>
                      <div>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                          <p style={{color:'#E8C97A',fontSize:'.9rem',fontWeight:400}}>{c.nm}</p>
                          <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>{c.pais}</span>
                          <span style={{color:'rgba(201,168,76,0.3)',fontSize:'.6rem'}}>desde {c.desde}</span>
                        </div>
                        <a href={`https://${c.url}`} target="_blank" style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem',textDecoration:'none'}}>🌐 {c.url}</a>
                      </div>
                      <p style={{color:'#C9A84C',fontSize:'.8rem',fontWeight:700}}>{c.precio}</p>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                      <div style={{background:'rgba(37,211,102,0.06)',borderRadius:6,padding:'8px 10px'}}>
                        <p style={{color:'rgba(37,211,102,0.5)',fontSize:'.58rem',letterSpacing:'.08em',marginBottom:3}}>FORTALEZA</p>
                        <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.68rem'}}>{c.fortaleza}</p>
                      </div>
                      <div style={{background:'rgba(255,100,100,0.06)',borderRadius:6,padding:'8px 10px'}}>
                        <p style={{color:'rgba(255,100,100,0.5)',fontSize:'.58rem',letterSpacing:'.08em',marginBottom:3}}>DEBILIDAD</p>
                        <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.68rem'}}>{c.debilidad}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {vista==='ferias' && (
          <div className="fade-up">
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:16}}>12 FERIAS INTERNACIONALES DONDE PUEDES VENDER</p>
            {FERIAS.map((f,i)=>(
              <div key={i} className="card" style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:10,padding:16,marginBottom:10}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:10}}>
                  <div style={{flex:1}}>
                    <p style={{color:'#E8C97A',fontSize:'.88rem',marginBottom:4}}>{f.nm}</p>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem',marginBottom:3}}>{f.lugar} · {f.frecuencia}</p>
                    <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>{f.rubros}</p>
                  </div>
                  <span style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'4px 10px',borderRadius:10,fontSize:'.62rem',height:'fit-content'}}>{f.tipo}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{textAlign:'center',marginTop:24,paddingTop:16,borderTop:'1px solid rgba(201,168,76,0.1)'}}>
          <p style={{color:'rgba(201,168,76,0.2)',fontSize:'.62rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · Inteligencia Competitiva Global</p>
        </div>
      </div>
    </div>
  )
}
