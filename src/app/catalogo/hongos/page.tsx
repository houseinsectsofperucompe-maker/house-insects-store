'use client'
import ST from '@/components/ST'
import { useState } from 'react'
export default function HongosPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const CATS = [
    {id:'todas',nm:'🍄 Todas'},
    {id:'gourmet',nm:'👨‍🍳 Gourmet Mushrooms'},
    {id:'funcional',nm:'🧠 Functional Mycology'},
    {id:'superfoods',nm:'🌿 Peruvian Superfoods'},
  ]
  const COLECCIONES = {
    gourmet:[
      {icon:'🍄',nm:'Hongos de Porcón Deshidratados',desc:'Sierra peruana · Alta cocina · Chefs internacionales · Seleccionados a mano'},
      {icon:'🍄',nm:'Hongos de Marayhuaca',desc:'Cajamarca · Gastronomía gourmet · Restaurantes de lujo · Europa'},
      {icon:'🍄',nm:'Setas Silvestres Amazónicas',desc:'Selva peruana · Deshidratadas · Gourmet · Empaque hermético'},
      {icon:'🍄',nm:'Callampas de la Sierra',desc:'Deshidratadas · Alta cocina peruana · Exportación'},
    ],
    funcional:[
      {icon:'🧠',nm:'Melena de León',desc:'Concentración · Memoria · Sistema nervioso · Polvo o cápsulas'},
      {icon:'❤️',nm:'Reishi',desc:'Adaptógeno · Sistema inmunológico · Antiestrés · Longevidad'},
      {icon:'⚡',nm:'Cordyceps',desc:'Energía · Rendimiento · Deportistas · Extracto premium'},
      {icon:'🍄',nm:'Shii-take Medicinal',desc:'Inmunidad · Anticancerígeno · Polvo o deshidratado · Certificado'},
    ],
    superfoods:[
      {icon:'🌾',nm:'Maca de la Sierra',desc:'Harina de maca · Partida 1106.20.10.00 · Energía · Fertilidad · Sierra'},
      {icon:'🌿',nm:'Algarroba de la Costa',desc:'Harina de algarroba · Partida 1106.30.20.00 · Costa peruana · Orgánica'},
      {icon:'🍫',nm:'Cacao Orgánico de la Selva',desc:'Nibs de cacao · Partida 1801.00.19.00 · Crudo premium · Amazónico'},
      {icon:'🌱',nm:'Extractos Botánicos Naturales',desc:'Costa · Sierra · Selva · Superalimentos ancestrales peruanos'},
    ],
  }
  const PARTIDAS: Record<string,{codigo:string,desc:string}> = {
    todas:{codigo:'0712.39.00.00',desc:'Hongos y setas secos · DIGESA · SENASA'},
    gourmet:{codigo:'0712.39.00.00',desc:'Hongos silvestres deshidratados · DIGESA · SENASA'},
    funcional:{codigo:'1211.90.90.90',desc:'Hongos medicinales y adaptógenos · DIGESA · SENASA'},
    superfoods:{codigo:'2106.90.99.90',desc:'Superalimentos · Harinas especiales · DIGESA · SENASA'},
  }
  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.gourmet,...COLECCIONES.funcional,...COLECCIONES.superfoods]
    : COLECCIONES[cat as keyof typeof COLECCIONES] || []
  const partida = PARTIDAS[cat] || PARTIDAS.todas
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .cat-btn{transition:all 0.18s ease;cursor:pointer}
        .cat-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
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
        <a href="/" style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700,textDecoration:'none',display:'inline-block',marginBottom:20,padding:'10px 20px',background:'rgba(201,168,76,0.15)',borderRadius:8,border:'1px solid rgba(201,168,76,0.4)'}}><ST t="← Inicio"/></a>
        <div style={{textAlign:'center',marginBottom:32}}>
          <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,marginBottom:12,objectFit:'contain'}}/></a>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · COSTA · SIERRA · SELVA</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><ST t="🍄 Hongos, Insumos Botánicos & Productos Naturales"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Hongos gourmet de la sierra, adaptógenos medicinales y superalimentos de las 3 regiones del Perú. Certificados DIGESA y SENASA para mercados de bienestar en Europa, Asia y USA.
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
            <div style={{width:'100%',height:240,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:16}}>
              <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:10}}/></a>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}><ST t="FOTO PRÓXIMAMENTE"/></p>
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
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🍄 PRODUCTOS DISPONIBLES</div>
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
                ✅ Certificado DIGESA<br/>
                ✅ Certificado SENASA<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Packing list<br/>
                ✅ Venta individual o por lotes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
