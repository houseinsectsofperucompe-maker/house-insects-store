'use client'
import ST from '@/components/ST'
import { useState } from 'react'
export default function TextileriaPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const [talla, setTalla] = useState('M')
  const CATS = [
    {id:'todas',nm:'🧶 Todas'},
    {id:'andean',nm:'🏔️ Andean Heritage'},
    {id:'amazonian',nm:'🌿 Amazonian Mysticism'},
    {id:'coastal',nm:'🌊 Coastal Cotton Premium'},
  ]
  const TALLAS = ['XS','S','M','L','XL','XXL']
  const COLECCIONES = {
    andean:[
      {icon:'🧶',nm:'Chalinas Baby Alpaca',desc:'Ultra suave · Térmica · Invierno Europa · París · Milán'},
      {icon:'🪬',nm:'Ponchos de Alpaca',desc:'Diseños andinos · Baby Alpaca · Premium · Nueva York · Dubai'},
      {icon:'🧣',nm:'Mantas Térmicas de Alpaca',desc:'Alta densidad · Calidez extrema · Colección invierno'},
      {icon:'🧥',nm:'Chompas de Baby Alpaca',desc:'Alta costura · Punto artesanal · Diseños ancestrales'},
      {icon:'🦙',nm:'Prendas de Vicuña',desc:'La fibra más fina del mundo · Precio bajo consulta · Lujo extremo'},
    ],
    amazonian:[
      {icon:'🎨',nm:'Telas Kené Shipibo-Conibo',desc:'Arte geométrico amazónico · Tintes naturales · Colección cultural'},
      {icon:'👗',nm:'Vestidos con Bordados Amazónicos',desc:'Algodón nativo · Diseños ancestrales · Arte textil de colección'},
      {icon:'🖼️',nm:'Tapices Bordados a Mano',desc:'Iconografía amazónica · Tintes de corteza · Decoración de lujo'},
      {icon:'👕',nm:'Camisas de Algodón con Arte Amazónico',desc:'Tintes sostenibles · Diseño Shipibo · Exportación cultural'},
    ],
    coastal:[
      {icon:'👔',nm:'Camisas de Algodón Pima',desc:'100% Pima peruano · La más suave del mundo · Lujo ligero'},
      {icon:'👕',nm:'Polos Premium Pima',desc:'Ultra suave · Fresco · Verano · Nueva York · Europa · Asia'},
      {icon:'🛌',nm:'Ropa de Cama Pima',desc:'Alta densidad · Suavidad extrema · Hoteles de lujo · 5 estrellas'},
      {icon:'👗',nm:'Prendas Tangüis Premium',desc:'Algodón Tangüis · Costa peruana · Transpirable · Verano'},
    ],
  }
  const PARTIDAS: Record<string,{codigo:string,desc:string}> = {
    todas:{codigo:'5112.19.00.00',desc:'Textilería premium peruana · SUNAT · PROMPERÚ'},
    andean:{codigo:'6101.90.10.00',desc:'Prendas de alpaca y lana fina · SUNAT · PROMPERÚ'},
    amazonian:{codigo:'6204.42.00.00',desc:'Prendas de algodón con diseños tradicionales · SUNAT'},
    coastal:{codigo:'6109.10.00.31',desc:'Prendas de algodón Pima 100% peruano · SUNAT'},
  }
  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.andean,...COLECCIONES.amazonian,...COLECCIONES.coastal]
    : COLECCIONES[cat as keyof typeof COLECCIONES] || []
  const partida = PARTIDAS[cat] || PARTIDAS.todas
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .cat-btn,.talla-btn{transition:all 0.18s ease;cursor:pointer}
        .cat-btn:hover,.talla-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
        .wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}
        .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
        .pieza-card{background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.1);border-radius:8px;padding:10px;margin-bottom:8px;display:flex;gap:10px;align-items:center;transition:all 0.18s ease}
        .pieza-card:hover{background:rgba(201,168,76,0.08);transform:translateX(4px);border-color:rgba(201,168,76,0.25)}
      
  @media(max-width:768px){
    .wa-btn{padding:14px 20px!important;fontSize:1rem!important;width:100%!important;display:block!important;textAlign:center!important;marginBottom:8px!important}
    .pieza-card{flexDirection:column!important}
    h1{fontSize:1.4rem!important}
  }
`}</style>
      <div className="pc" style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/" style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700,textDecoration:'none',display:'inline-block',marginBottom:20,padding:'10px 20px',background:'rgba(201,168,76,0.15)',borderRadius:8,border:'1px solid rgba(201,168,76,0.4)'}}>← Inicio / Home</a>
        <div style={{textAlign:'center',marginBottom:32}}>
          <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,marginBottom:12,objectFit:'contain'}}/></a>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · TEXTILERÍA DE LUJO</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><ST t="🧶 Textilería Premium: Línea Amazónica, Andina & Costa"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Baby Alpaca andina, arte textil Shipibo-Conibo amazónico y algodón Pima de la costa. Patrimonio textil peruano para mercados de lujo en París, Milán, Nueva York y Dubai.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA {partida.codigo} · {<ST t={partida.desc}/>}
          </div>
        </div>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginBottom:24}}>
          {CATS.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} className="cat-btn" style={{
              padding:'7px 14px',borderRadius:20,fontSize:'.75rem',fontFamily:'Georgia,serif',
              background:cat===c.id?'#C9A84C':'rgba(201,168,76,0.08)',
              color:cat===c.id?'#1A1209':'#C9A84C',
              border:`1px solid ${cat===c.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
            }}>{<ST t={c.nm}/>}</button>
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
              <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:10}}/></a>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}><ST t="FOTO PRÓXIMAMENTE"/></p>
            </div>
            <div style={{marginBottom:12,textAlign:'left'}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',letterSpacing:'.08em',marginBottom:8}}>👕 SELECCIONA TALLA</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {TALLAS.map(t=>(
                  <button key={t} onClick={()=>setTalla(t)} className="talla-btn" style={{
                    padding:'5px 12px',borderRadius:6,fontSize:'.75rem',fontFamily:'Georgia,serif',
                    background:talla===t?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:talla===t?'#1A1209':'#C9A84C',
                    border:`1px solid ${talla===t?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:10,marginBottom:12,textAlign:'left'}}>
              <p style={{color:'#C9A84C',fontSize:'.72rem',fontWeight:700}}>📋 Partida Arancelaria:</p>
              <p style={{color:'#E8C97A',fontSize:'.78rem',fontFamily:'monospace',marginTop:2}}>{partida.codigo}</p>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginTop:2}}>{<ST t={partida.desc}/>}</p>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 940 699 405</a>
              <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 920 644 433</a>
            </div>
          </div>
          <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🧶 COLECCIÓN DISPONIBLE</div>
            {piezasActuales.map(p=>(
              <div key={p.nm} className="pieza-card">
                <span style={{fontSize:'1.4rem'}}>{p.icon}</span>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{<ST t={p.nm}/>}</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>{<ST t={p.desc}/>}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12}}>
              <p style={{color:'#C9A84C',fontSize:'.75rem',fontWeight:700}}>📦 Exportación completa:</p>
              <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',marginTop:4,lineHeight:1.8}}>
                ✅ Certificado PROMPERÚ<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Packing list<br/>
                ✅ Tallas S/M/L/XL disponibles<br/>
                ✅ Pedidos por mayor disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
