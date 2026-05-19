'use client'
import { useState } from 'react'
export default function MineralesPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const [peso, setPeso] = useState('mediano')
  const [regalo, setRegalo] = useState(false)

  const CATS = [
    {id:'todas',nm:'💎 Todas'},
    {id:'suerte',nm:'🍀 Suerte & Abundancia'},
    {id:'proteccion',nm:'🛡️ Protección Espiritual'},
    {id:'coleccion',nm:'🔬 Colección & Museos'},
    {id:'materia',nm:'⚙️ Materia Prima Industrial'},
  ]

  const PESOS = [
    {id:'pequeno',nm:'Pequeño 50-100g',extra:0},
    {id:'mediano',nm:'Mediano 150-300g',extra:15},
    {id:'grande',nm:'Grande 300-600g',extra:35},
    {id:'premium',nm:'Premium Exhibición 600g+',extra:80},
  ]

  const COLECCIONES = {
    suerte:[
      {icon:'✨',nm:'Pirita Peruana',desc:'El oro de los tontos · Amuleto #1 para atraer dinero · Abundancia en negocios'},
      {icon:'💚',nm:'Crisocola',desc:'Atractivo visual andino · Buena fortuna · Fluidez energética'},
      {icon:'🔵',nm:'Ópalo Peruano',desc:'Piedra de prosperidad andina · Colores únicos · Energía positiva'},
      {icon:'🟡',nm:'Ojo de Tigre',desc:'Cristal clásico de prosperidad · Confianza · Éxito'},
      {icon:'🟠',nm:'Citrino',desc:'Piedra de la abundancia · Atrae riqueza · Energía solar'},
    ],
    proteccion:[
      {icon:'⚫',nm:'Turmalina Negra',desc:'Reina de la protección · Escudo contra energías negativas · Hogar y negocios'},
      {icon:'💜',nm:'Amatista — Geodas & Puntas',desc:'Altares religiosos · Transmutación espiritual · Paz interior'},
      {icon:'⚪',nm:'Cuarzo Blanco & Hialino',desc:'Purificación y luz · Meditación · Oración · Espacios sagrados'},
    ],
    coleccion:[
      {icon:'🔷',nm:'Cristales en Bruto — Andes',desc:'Formaciones naturales raras · Perfectas geométricamente · Científicos'},
      {icon:'🟡',nm:'Piritas Cúbicas Perfectas',desc:'Rareza geológica · Cubos perfectos naturales · Museos mundiales'},
      {icon:'💎',nm:'Piezas Pesadas de Exhibición',desc:'600g+ · Gran formato · Museos · Universidades · Coleccionistas'},
    ],
    materia:[
      {icon:'⚙️',nm:'Pirita en Bruto — Industria',desc:'Para joyeros y orfebres · Materia prima · Por kilo disponible'},
      {icon:'🔩',nm:'Cuarzo Industrial',desc:'Laboratorios · Industria electrónica · Materia prima certificada'},
      {icon:'💎',nm:'Minerales para Orfebrería',desc:'Crisocola · Turquesa · Lapislázuli · Para joyeros artesanales'},
      {icon:'📦',nm:'Lotes por Kilo',desc:'Precios mayoreo · Exportación · Factura · Packing list incluido'},
    ],
  }

  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.suerte,...COLECCIONES.proteccion,...COLECCIONES.coleccion,...COLECCIONES.materia]
    : COLECCIONES[cat as keyof typeof COLECCIONES] || []

  const pesoActual = PESOS.find(p=>p.id===peso)

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .cat-btn,.peso-btn{transition:all 0.18s ease;cursor:pointer}
        .cat-btn:hover,.peso-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
        .wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}
        .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
        .pieza-card{background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.1);border-radius:8px;padding:10px;margin-bottom:8px;display:flex;gap:10px;align-items:center;transition:all 0.18s ease}
        .pieza-card:hover{background:rgba(201,168,76,0.08);transform:translateX(4px);border-color:rgba(201,168,76,0.25)}
      `}</style>
      <div className="pc" style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:16}}>← Inicio</a>

        <div style={{textAlign:'center',marginBottom:32}}>
          <img src="/logo-house-insects-peru.png" style={{width:160,height:160,marginBottom:12,objectFit:'contain'}}/>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · PIEDRAS PRECIOSAS</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>💎 Minerales & Piedras Preciosas</h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Piedras peruanas auténticas para suerte, protección espiritual, colección científica y materia prima industrial. Certificadas y exportadas con documentación completa.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA 2616.90.00.00 · MEM · SUNAT · RUC 20447397804
          </div>
        </div>

        {/* COLECCIONES */}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginBottom:24}}>
          {CATS.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} className="cat-btn" style={{
              padding:'7px 14px',borderRadius:20,fontSize:'.75rem',fontFamily:'Georgia,serif',
              background:cat===c.id?'#C9A84C':'rgba(201,168,76,0.08)',
              color:cat===c.id?'#1A1209':'#C9A84C',
              border:`1px solid ${cat===c.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
            }}>{c.nm}</button>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>

          {/* FOTOS TABS */}
          <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:20}}>
            <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:12}}>
              {['frente','lado','reverso','video'].map(v=>(
                <button key={v} onClick={()=>setVista(v)} style={{
                  padding:'4px 10px',borderRadius:20,cursor:'pointer',fontSize:'.65rem',fontFamily:'Georgia,serif',
                  background:vista===v?'#C9A84C':'rgba(201,168,76,0.08)',
                  color:vista===v?'#1A1209':'#C9A84C',
                  border:`1px solid ${vista===v?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  transition:'all 0.18s ease'
                }}>{v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video'}</button>
              ))}
            </div>
            <div style={{width:'100%',height:240,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:16}}>
              <img src="/logo-house-insects-peru.png" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:10}}/>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}>FOTO PRÓXIMAMENTE</p>
            </div>

            {/* SELECTOR PESO */}
            <div style={{marginBottom:12}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',letterSpacing:'.08em',marginBottom:8}}>⚖️ SELECCIONA PESO/TAMAÑO</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {PESOS.map(p=>(
                  <button key={p.id} onClick={()=>setPeso(p.id)} className="peso-btn" style={{
                    padding:'8px 12px',borderRadius:8,fontSize:'.75rem',fontFamily:'Georgia,serif',textAlign:'left',
                    background:peso===p.id?'rgba(201,168,76,0.15)':'rgba(201,168,76,0.04)',
                    color:peso===p.id?'#E8C97A':'rgba(232,201,122,0.5)',
                    border:`1px solid ${peso===p.id?'#C9A84C':'rgba(201,168,76,0.1)'}`,
                    display:'flex',justifyContent:'space-between'
                  }}>
                    <span>{p.nm}</span>
                    {p.extra>0&&<span style={{color:'#C9A84C',fontSize:'.65rem'}}>+${p.extra} USD</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* OPCION REGALO */}
            <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12,marginBottom:12}}>
              <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>setRegalo(!regalo)}>
                <div style={{width:20,height:20,borderRadius:4,border:'2px solid #C9A84C',background:regalo?'#C9A84C':'transparent',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.15s ease'}}>
                  {regalo&&<span style={{color:'#1A1209',fontSize:'.7rem',fontWeight:700}}>✓</span>}
                </div>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.78rem',fontWeight:700}}>🎁 ¿Es para un regalo espiritual?</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem'}}>Estuche de Madera Fina + Pergamino de significado místico · +$12 USD</div>
                </div>
              </div>
            </div>

            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 940 699 405</a>
              <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 920 644 433</a>
            </div>
          </div>

          {/* LISTA PIEZAS */}
          <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>
              {cat==='todas'?'💎 TODAS LAS PIEDRAS':
               cat==='suerte'?'🍀 SUERTE & ABUNDANCIA':
               cat==='proteccion'?'🛡️ PROTECCIÓN ESPIRITUAL':
               cat==='coleccion'?'🔬 COLECCIÓN & MUSEOS':'⚙️ MATERIA PRIMA INDUSTRIAL'}
            </div>
            {piezasActuales.map(p=>(
              <div key={p.nm} className="pieza-card">
                <span style={{fontSize:'1.4rem'}}>{p.icon}</span>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{p.nm}</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>{p.desc}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12}}>
              <p style={{color:'#C9A84C',fontSize:'.75rem',fontWeight:700}}>📦 Exportación completa:</p>
              <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',marginTop:4,lineHeight:1.8}}>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Packing list<br/>
                ✅ Certificado MEM<br/>
                ✅ Seguro de envío disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
