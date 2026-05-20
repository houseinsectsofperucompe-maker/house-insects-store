'use client'
import { useState } from 'react'
export default function SuperalimentosPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const [peso, setPeso] = useState('250g')
  const CATS = [
    {id:'todas',nm:'🫧 Todas'},
    {id:'polvos',nm:'💊 Polvos & Cápsulas'},
    {id:'andinos',nm:'🏔️ Superfoods Andinos'},
    {id:'amazonicos',nm:'🌿 Superfoods Amazónicos'},
    {id:'marinos',nm:'🌊 Superfoods Marinos'},
  ]
  const PESOS = ['100g','250g','500g','1kg','5kg']
  const COLECCIONES = {
    polvos:[
      {icon:'🫧',nm:'Maca en Polvo Premium',desc:'Partida 2106.90.99.90 · Energía · Fertilidad · Cápsulas o polvo'},
      {icon:'🫧',nm:'Camu Camu en Polvo',desc:'Vitamina C más alta del mundo · Amazónico · Superfood élite'},
      {icon:'🫧',nm:'Lúcuma en Polvo',desc:'Dulce natural · Sin azúcar · Repostería gourmet · Exportación'},
      {icon:'🫧',nm:'Quinua en Polvo',desc:'Proteína completa · Andina · Sin gluten · Alta nutrición'},
      {icon:'🫧',nm:'Cacao en Polvo Premium',desc:'Crudo · Amazónico · Sin procesar · Alta pureza · Gourmet'},
    ],
    andinos:[
      {icon:'🏔️',nm:'Maca Negra Andina',desc:'La más potente · Sierra · Energía extrema · Certificada'},
      {icon:'🌾',nm:'Quinua Real Boliviana-Peruana',desc:'Proteína completa · Andina · Orgánica · Exportación'},
      {icon:'🌿',nm:'Kiwicha en Polvo',desc:'Amaranto andino · Alta proteína · Sin gluten · Nutritivo'},
      {icon:'🌱',nm:'Chía Andina',desc:'Omega 3 · Fibra · Energía · Orgánica · Certificada SENASA'},
    ],
    amazonicos:[
      {icon:'🌺',nm:'Camu Camu Amazónico',desc:'60x más Vitamina C que naranja · Polvo puro · Premium'},
      {icon:'🍫',nm:'Cacao Crudo Amazónico',desc:'Antioxidante · Flavonoides · Pureza 100% · Selva peruana'},
      {icon:'🌿',nm:'Sacha Inchi en Polvo',desc:'Omega 3-6-9 · Proteína vegetal · Amazónico · Orgánico'},
      {icon:'🫐',nm:'Aguaymanto en Polvo',desc:'Vitaminas A·B·C · Antioxidante · Gourmet · Premium'},
    ],
    marinos:[
      {icon:'🌊',nm:'Spirulina de la Costa Peruana',desc:'Partida 2106.90.99.90 · Proteína 70% · Alga marina · Premium'},
      {icon:'💧',nm:'Chlorella Marina Peruana',desc:'Desintoxicante · Alga verde · Costa · Laboratorio certificado'},
      {icon:'🌊',nm:'Extracto de Algas Antioxidante',desc:'Costa peruana · Anti-edad · Asia · Europa · Cosmética'},
    ],
  }
  const PARTIDAS: Record<string,{codigo:string,desc:string}> = {
    todas:{codigo:'2106.90.99.90',desc:'Superalimentos en polvo y cápsulas · DIGESA · SENASA'},
    polvos:{codigo:'2106.90.99.90',desc:'Preparaciones alimenticias en polvo · DIGESA · SENASA'},
    andinos:{codigo:'2106.90.99.90',desc:'Superfoods andinos concentrados · DIGESA · SENASA'},
    amazonicos:{codigo:'2106.90.99.90',desc:'Superfoods amazónicos en polvo · DIGESA · SENASA'},
    marinos:{codigo:'2106.90.99.90',desc:'Algas y extractos marinos · DIGESA · SENASA'},
  }
  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.polvos,...COLECCIONES.andinos,...COLECCIONES.amazonicos,...COLECCIONES.marinos]
    : COLECCIONES[cat as keyof typeof COLECCIONES] || []
  const partida = PARTIDAS[cat] || PARTIDAS.todas
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
        <a href="/" style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700,textDecoration:'none',display:'block',marginBottom:20,padding:'10px 20px',background:'rgba(201,168,76,0.15)',borderRadius:8,border:'1px solid rgba(201,168,76,0.4)',display:'inline-block'}}>← Inicio</a>
        <div style={{textAlign:'center',marginBottom:32}}>
          <img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,marginBottom:12,objectFit:'contain'}}/>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · COSTA · SIERRA · SELVA · MAR</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>🫧 Superalimentos & Concentrados de las 3 Regiones</h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Maca, Camu Camu, Spirulina, Cacao crudo, Quinua y más. Superalimentos peruanos en polvo y cápsulas de las 3 regiones y el mar. Certificados DIGESA y SENASA para mercados de bienestar en todo el mundo.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA {partida.codigo} · {partida.desc}
          </div>
        </div>
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
          <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:20,textAlign:'center'}}>
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
            <div style={{width:'100%',height:220,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:14}}>
              <img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:10}}/>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}>FOTO PRÓXIMAMENTE</p>
            </div>
            <div style={{marginBottom:12,textAlign:'left'}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',letterSpacing:'.08em',marginBottom:8}}>⚖️ SELECCIONA PESO</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {PESOS.map(p=>(
                  <button key={p} onClick={()=>setPeso(p)} className="peso-btn" style={{
                    padding:'5px 10px',borderRadius:6,fontSize:'.72rem',fontFamily:'Georgia,serif',
                    background:peso===p?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:peso===p?'#1A1209':'#C9A84C',
                    border:`1px solid ${peso===p?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{p}</button>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:10,marginBottom:12,textAlign:'left'}}>
              <p style={{color:'#C9A84C',fontSize:'.72rem',fontWeight:700}}>📋 Partida Arancelaria:</p>
              <p style={{color:'#E8C97A',fontSize:'.78rem',fontFamily:'monospace',marginTop:2}}>{partida.codigo}</p>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginTop:2}}>{partida.desc}</p>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 940 699 405</a>
              <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 920 644 433</a>
            </div>
          </div>
          <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🫧 PRODUCTOS DISPONIBLES</div>
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
                ✅ Certificado DIGESA<br/>
                ✅ Certificado SENASA<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Packing list<br/>
                ✅ Venta por gramos o kilos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
