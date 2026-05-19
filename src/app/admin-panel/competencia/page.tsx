'use client'
import { useState } from 'react'

const RUBROS = [
  {
    id:'mariposas',
    nm:'🦋 Mariposas & Especímenes',
    competidores:[
      {nm:'InsectNet', pais:'🇺🇸 USA', url:'insectnet.com', desde:'1995', fortaleza:'Mayor catálogo online', debilidad:'Sin certificación CITES propia', precio:'$2-500'},
      {nm:"Collector's Secret", pais:'🇺🇸 USA', url:'collectorssecret.com', desde:'2001', fortaleza:'Marketing digital fuerte', debilidad:'No produce, solo revende', precio:'$5-1000'},
      {nm:'Worldwide Butterflies', pais:'🇬🇧 UK', url:'wwb.co.uk', desde:'1961', fortaleza:'65 años de historia', debilidad:'Poca variedad amazónica', precio:'$3-200'},
      {nm:'BioQuip', pais:'🇺🇸 USA', url:'bioquip.com', desde:'1947', fortaleza:'Equipos y especímenes', debilidad:'Enfocado en herramientas', precio:'$1-100'},
      {nm:'Entomologie Krefeld', pais:'🇩🇪 Alemania', url:'entomologie.de', desde:'1985', fortaleza:'Mercado europeo sólido', debilidad:'Solo Europa', precio:'5-300 EUR'},
    ],
    compradores:'Alemanes, japoneses, americanos, chinos',
    ventaja:'Productores directos en Tingo María — precio A1 sin intermediarios',
    tamano:'$2.3B mercado global coleccionismo entomológico',
  },
  {
    id:'joyeria',
    nm:'💍 Joyería Natural',
    competidores:[
      {nm:'Frozen In Time', pais:'🇺🇸 USA', url:'frozenintime.com', desde:'2005', fortaleza:'Diseño moderno', debilidad:'No usa oro real', precio:'$50-500'},
      {nm:'Insect Lab', pais:'🇬🇧 UK', url:'insectlab.co.uk', desde:'2004', fortaleza:'Viral en redes sociales', debilidad:'Solo electroplatedo básico', precio:'$80-800'},
      {nm:'Gold Bug', pais:'🇺🇸 USA', url:'goldbug.com', desde:'1998', fortaleza:'Tienda física Scottsdale', debilidad:'Sin certificación SERFOR', precio:'$100-2000'},
    ],
    compradores:'Europeas, japonesas, americanas, árabes',
    ventaja:'Oro 24k real + plata .950 + especímenes A1 certificados CITES',
    tamano:'$340B mercado joyería lujo global',
  },
  {
    id:'minerales',
    nm:'💎 Minerales & Cristales',
    competidores:[
      {nm:'Astro Gallery', pais:'🇺🇸 USA', url:'astrogallery.com', desde:'1981', fortaleza:'NYC flagship store', debilidad:'Sin pirita peruana', precio:'$20-50,000'},
      {nm:'Crystal Mountain', pais:'🇦🇺 Australia', url:'crystalmountain.com.au', desde:'1990', fortaleza:'Australasia market', debilidad:'Sin certificaciones peruanas', precio:'$10-5000'},
      {nm:'Inti Minerals', pais:'🇵🇪 Perú', url:'intiminerals.com', desde:'2010', fortaleza:'Conocen Perú', debilidad:'Pequeño sin marketing', precio:'$5-500'},
    ],
    compradores:'Chinos, americanos, europeos, indios',
    ventaja:'Extracción directa Perú + certificación minería + precio competitivo',
    tamano:'$22B mercado minerales y cristales global',
  },
  {
    id:'superalimentos',
    nm:'💊 Superalimentos & Agroindustria',
    competidores:[
      {nm:'Navitas Organics', pais:'🇺🇸 USA', url:'navitasorganics.com', desde:'2003', fortaleza:'Distribución masiva', debilidad:'No origen directo Perú', precio:'$15-80'},
      {nm:'Rainforest Foods', pais:'🇬🇧 UK', url:'rainforestfoods.co.uk', desde:'2014', fortaleza:'UK market fuerte', debilidad:'Sin certificación SENASA', precio:'$12-60'},
      {nm:'Amazon Origins', pais:'🇵🇪 Perú', url:'amazonorigins.com', desde:'2012', fortaleza:'Branding moderno', debilidad:'Sin diversificación', precio:'$10-100'},
    ],
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
    compradores:'Americanos, europeos, chinos, japoneses',
    ventaja:'Hongos amazónicos únicos + SENASA + precio origen',
    tamano:'$69B mercado hongos medicinales global',
  },
  {
    id:'maderas',
    nm:'🪵 Maderas Finas',
    competidores:[
      {nm:'Rare Woods USA', pais:'🇺🇸 USA', url:'rarewoodsusa.com', desde:'2000', fortaleza:'Gran catálogo', debilidad:'Sin amazónicas certificadas', precio:'$20-500'},
      {nm:'Wood Vendors', pais:'🇺🇸 USA', url:'woodvendors.com', desde:'1995', fortaleza:'Online masivo', debilidad:'Sin SERFOR', precio:'$10-200'},
    ],
    compradores:'Alemanes, japoneses, americanos, chinos',
    ventaja:'SERFOR certificado + maderas únicas amazónicas + precio origen',
    tamano:'$600B mercado maderas global',
  },
]

const FERIAS = [
  {nm:'Entomology World Congress', lugar:'🌍 Internacional', frecuencia:'Cada 4 años', tipo:'Científica', rubros:'Especímenes, material científico'},
  {nm:'Tucson Gem & Mineral Show', lugar:'🇺🇸 Arizona USA', frecuencia:'Febrero anual', tipo:'Minerales', rubros:'Minerales, cristales, fósiles'},
  {nm:'Munich Mineral Show', lugar:'🇩🇪 Alemania', frecuencia:'Octubre anual', tipo:'Minerales', rubros:'Minerales, geodas, cristales'},
  {nm:'Art Basel', lugar:'🇨🇭 Suiza / Miami / HK', frecuencia:'Junio anual', tipo:'Arte', rubros:'Bio-art, joyería, cuadros'},
  {nm:'Biofach', lugar:'🇩🇪 Núremberg', frecuencia:'Enero anual', tipo:'Orgánicos', rubros:'Superalimentos, hongos, plantas'},
  {nm:'Natural Products Expo West', lugar:'🇺🇸 California', frecuencia:'Marzo anual', tipo:'Natural', rubros:'Superalimentos, aceites, plantas'},
  {nm:'Jewellery & Gem World HK', lugar:'🇭🇰 Hong Kong', frecuencia:'Septiembre anual', tipo:'Joyería', rubros:'Joyería, minerales, piedras'},
  {nm:'Canton Fair', lugar:'🇨🇳 China', frecuencia:'Abril y Octubre', tipo:'Comercial', rubros:'Todos los productos'},
  {nm:'Dubai Expo & Trade', lugar:'🇦🇪 Dubai', frecuencia:'Anual', tipo:'Lujo', rubros:'Lujo, minerales, arte'},
  {nm:'Tokyo International Gift Show', lugar:'🇯🇵 Japón', frecuencia:'Febrero y Septiembre', tipo:'Regalos', rubros:'Arte, joyería, souvenirs'},
  {nm:'PROMPERÚ Misiones Comerciales', lugar:'🇵🇪 Perú + mundo', frecuencia:'Todo el año', tipo:'Exportación', rubros:'Todos los rubros'},
  {nm:'Expo CITES', lugar:'🌍 Internacional', frecuencia:'Cada 3 años', tipo:'Legal', rubros:'Todos los rubros CITES'},
]

const PLATAFORMAS = [
  {nm:'eBay', tipo:'Marketplace', rubros:'Especímenes, minerales, joyería', comision:'10-15%', clientes:'Global masivo'},
  {nm:'Etsy', tipo:'Artesanía/Lujo', rubros:'Joyería, textilería, arte', comision:'6.5%', clientes:'USA, UK, Alemania'},
  {nm:'Amazon', tipo:'Marketplace masivo', rubros:'Superalimentos, hongos', comision:'15-20%', clientes:'Global'},
  {nm:'1stDibs', tipo:'Lujo premium', rubros:'Joyería, arte, colección', comision:'20%', clientes:'HNWI global'},
  {nm:'Catawiki', tipo:'Subastas', rubros:'Especímenes, minerales, rarezas', comision:'12.5%', clientes:'Europa'},
  {nm:'iNaturalist', tipo:'Científico', rubros:'Material científico', comision:'0%', clientes:'Universidades'},
  {nm:'Alibaba', tipo:'B2B masivo', rubros:'Materias primas, agroindustria', comision:'Variable', clientes:'China, Asia'},
  {nm:'Faire', tipo:'B2B wholesale', rubros:'Textilería, artesanías', comision:'15%', clientes:'USA, UK'},
  {nm:'WeChat Shop', tipo:'China social', rubros:'Todo lujo', comision:'Variable', clientes:'China premium'},
  {nm:'PROMPERÚ Sierra Exportadora', tipo:'Gubernamental', rubros:'Todos', comision:'0%', clientes:'Global institucional'},
]

export default function CompetenciaPage() {
  const [rubro, setRubro] = useState('mariposas')
  const [vista, setVista] = useState<'competencia'|'ferias'|'plataformas'>('competencia')
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
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.72rem'}}>Competidores · Ferias · Plataformas · 7 Rubros Analizados</p>
        </div>

        <div style={{display:'flex',gap:8,marginBottom:24,justifyContent:'center',flexWrap:'wrap'}}>
          {[
            {id:'competencia',nm:'🏆 Competencia'},
            {id:'ferias',nm:'🌍 Ferias Internacionales'},
            {id:'plataformas',nm:'🛒 Donde Vender Online'},
          ].map(t=>(
            <button key={t.id} onClick={()=>setVista(t.id as any)} className="tab" style={{background:vista===t.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:vista===t.id?'#1A1209':'#C9A84C',border:`1px solid ${vista===t.id?'transparent':'rgba(201,168,76,0.2)'}`,padding:'8px 20px',borderRadius:20,fontSize:'.78rem',fontFamily:'Georgia,serif'}}>
              {t.nm}
            </button>
          ))}
        </div>

        {vista==='competencia' && (
          <div className="fade-up">
            <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
              {RUBROS.map(x=>(
                <button key={x.id} onClick={()=>setRubro(x.id)} className="tab" style={{background:rubro===x.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.05)',color:rubro===x.id?'#1A1209':'#C9A84C',border:`1px solid ${rubro===x.id?'transparent':'rgba(201,168,76,0.1)'}`,padding:'6px 12px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                  {x.nm}
                </button>
              ))}
            </div>
            {r && (
              <>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:10,marginBottom:20}}>
                  <div style={{background:'rgba(37,211,102,0.06)',border:'1px solid rgba(37,211,102,0.15)',borderRadius:8,padding:14}}>
                    <p style={{color:'rgba(37,211,102,0.5)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>TAMAÑO DE MERCADO</p>
                    <p style={{color:'#25D366',fontSize:'.88rem',fontWeight:700}}>{r.tamano}</p>
                  </div>
                  <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:8,padding:14}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>COMPRADORES</p>
                    <p style={{color:'#C9A84C',fontSize:'.78rem'}}>{r.compradores}</p>
                  </div>
                  <div style={{background:'rgba(5,15,30,0.3)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:14}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.6rem',letterSpacing:'.1em',marginBottom:4}}>NUESTRA VENTAJA</p>
                    <p style={{color:'#E8C97A',fontSize:'.72rem',lineHeight:1.5}}>{r.ventaja}</p>
                  </div>
                </div>
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:10}}>COMPETIDORES</p>
                {r.competidores.map((c,i)=>(
                  <div key={i} className="card" style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:10,padding:14,marginBottom:8}}>
                    <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8,marginBottom:8}}>
                      <div>
                        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:3,flexWrap:'wrap'}}>
                          <p style={{color:'#E8C97A',fontSize:'.85rem'}}>{c.nm}</p>
                          <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem'}}>{c.pais} · desde {c.desde}</span>
                        </div>
                        <a href={`https://${c.url}`} target="_blank" style={{color:'rgba(201,168,76,0.3)',fontSize:'.62rem',textDecoration:'none'}}>🌐 {c.url}</a>
                      </div>
                      <p style={{color:'#C9A84C',fontSize:'.8rem',fontWeight:700}}>{c.precio}</p>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6}}>
                      <div style={{background:'rgba(37,211,102,0.05)',borderRadius:6,padding:'6px 10px'}}>
                        <p style={{color:'rgba(37,211,102,0.5)',fontSize:'.58rem',marginBottom:2}}>✅ FORTALEZA</p>
                        <p style={{color:'rgba(232,201,122,0.55)',fontSize:'.65rem'}}>{c.fortaleza}</p>
                      </div>
                      <div style={{background:'rgba(255,100,100,0.05)',borderRadius:6,padding:'6px 10px'}}>
                        <p style={{color:'rgba(255,100,100,0.5)',fontSize:'.58rem',marginBottom:2}}>❌ DEBILIDAD</p>
                        <p style={{color:'rgba(232,201,122,0.55)',fontSize:'.65rem'}}>{c.debilidad}</p>
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
              <div key={i} className="card" style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:10,padding:14,marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                  <div style={{flex:1}}>
                    <p style={{color:'#E8C97A',fontSize:'.85rem',marginBottom:4}}>{f.nm}</p>
                    <p style={{color:'rgba(201,168,76,0.45)',fontSize:'.68rem',marginBottom:2}}>{f.lugar} · {f.frecuencia}</p>
                    <p style={{color:'rgba(232,201,122,0.35)',fontSize:'.62rem'}}>{f.rubros}</p>
                  </div>
                  <span style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',color:'#C9A84C',padding:'3px 10px',borderRadius:10,fontSize:'.6rem',height:'fit-content'}}>{f.tipo}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {vista==='plataformas' && (
          <div className="fade-up">
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.62rem',letterSpacing:'.1em',marginBottom:16}}>10 PLATAFORMAS ONLINE DONDE PUEDES VENDER</p>
            {PLATAFORMAS.map((p,i)=>(
              <div key={i} className="card" style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:10,padding:14,marginBottom:8}}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                      <p style={{color:'#E8C97A',fontSize:'.88rem',fontWeight:400}}>{p.nm}</p>
                      <span style={{background:'rgba(201,168,76,0.08)',color:'#C9A84C',padding:'2px 8px',borderRadius:8,fontSize:'.6rem'}}>{p.tipo}</span>
                    </div>
                    <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.68rem',marginBottom:2}}>{p.rubros}</p>
                    <p style={{color:'rgba(201,168,76,0.35)',fontSize:'.62rem'}}>Clientes: {p.clientes}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{color:'#C9A84C',fontSize:'.82rem',fontWeight:700}}>{p.comision}</p>
                    <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.58rem'}}>comisión</p>
                  </div>
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
