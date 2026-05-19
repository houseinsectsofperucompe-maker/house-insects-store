'use client'
import { useState } from 'react'
export default function NocturnasPage() {
  const [vista, setVista] = useState('frente')
  const [composicion, setComposicion] = useState('individual')
  const [marco, setMarco] = useState('rectangular')
  const [vidrio, setVidrio] = useState('normal')

  const precioExtra = vidrio==='uv'?20:vidrio==='resina'?35:0

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .opt-btn{transition:all 0.18s ease;cursor:pointer}
        .opt-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
        .wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}
        .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
      `}</style>
      <div className="pc" style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:16}}>← Inicio</a>

        <div style={{textAlign:'center',marginBottom:32}}>
          <img src="/logo-house-insects-peru.png" style={{width:72,height:72,marginBottom:12,objectFit:'contain'}}/>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · MÁS DE 40 AÑOS DE EXPERIENCIA</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>🦋 Cuadros de Mariposas Tropicales Naturales</h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Especímenes secos naturales de la Amazonía peruana montados en marcos de lujo. Personaliza tu cuadro — elige composición, formato del marco y tipo de protección. Certificado SERFOR + CITES.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA 9705.21.00.00 · SERFOR · CITES · RUC 20447397804
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>

          {/* CONFIGURADOR */}
          <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:16}}>🖼️ CONFIGURA TU CUADRO</div>

            {/* FOTOS TABS */}
            <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:10}}>
              {['frente','lado','reverso','video'].map(v=>(
                <button key={v} onClick={()=>setVista(v)} className="opt-btn" style={{
                  padding:'4px 10px',borderRadius:16,fontSize:'.65rem',fontFamily:'Georgia,serif',
                  background:vista===v?'#C9A84C':'rgba(201,168,76,0.08)',
                  color:vista===v?'#1A1209':'#C9A84C',
                  border:`1px solid ${vista===v?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                }}>{v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video'}</button>
              ))}
            </div>
            <div style={{width:'100%',height:200,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:16}}>
              <img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:'contain',opacity:.6,marginBottom:8}}/>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}>FOTO PRÓXIMAMENTE</p>
            </div>

            {/* COMPOSICION */}
            <div style={{marginBottom:14}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>1️⃣ COMPOSICIÓN</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {[{id:'individual',nm:'🦋 Individual'},{id:'mixto',nm:'🎨 Mixto/Combinado'}].map(o=>(
                  <button key={o.id} onClick={()=>setComposicion(o.id)} className="opt-btn" style={{
                    padding:'6px 14px',borderRadius:20,fontSize:'.75rem',fontFamily:'Georgia,serif',
                    background:composicion===o.id?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:composicion===o.id?'#1A1209':'#C9A84C',
                    border:`1px solid ${composicion===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{o.nm}</button>
                ))}
              </div>
            </div>

            {/* MARCO */}
            <div style={{marginBottom:14}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>2️⃣ FORMATO DEL MARCO</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[
                  {id:'rectangular',nm:'⬛ Rectangular'},
                  {id:'redondo',nm:'⭕ Redondo'},
                  {id:'triangular',nm:'🔺 Triangular'},
                  {id:'cubo',nm:'📦 Cubo 3D'},
                  {id:'cupula',nm:'🔮 Cúpula'},
                  {id:'reloj',nm:'🕐 Tipo Reloj'},
                ].map(o=>(
                  <button key={o.id} onClick={()=>setMarco(o.id)} className="opt-btn" style={{
                    padding:'5px 12px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif',
                    background:marco===o.id?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:marco===o.id?'#1A1209':'#C9A84C',
                    border:`1px solid ${marco===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{o.nm}</button>
                ))}
              </div>
            </div>

            {/* VIDRIO */}
            <div style={{marginBottom:16}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>3️⃣ TIPO DE PROTECCIÓN</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[
                  {id:'normal',nm:'🔲 Cristal Normal',extra:0},
                  {id:'uv',nm:'☀️ Cristal UV Premium',extra:20},
                  {id:'resina',nm:'💎 Resina Epóxica',extra:35},
                ].map(o=>(
                  <button key={o.id} onClick={()=>setVidrio(o.id)} className="opt-btn" style={{
                    padding:'5px 12px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif',
                    background:vidrio===o.id?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:vidrio===o.id?'#1A1209':'#C9A84C',
                    border:`1px solid ${vidrio===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{o.nm}{o.extra>0?` +$${o.extra}`:''}</button>
                ))}
              </div>
            </div>

            {/* RESUMEN */}
            <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:12,marginBottom:14}}>
              <div style={{color:'#C9A84C',fontSize:'.7rem',fontWeight:700,marginBottom:6}}>📋 TU CONFIGURACIÓN:</div>
              <div style={{color:'rgba(232,201,122,0.7)',fontSize:'.72rem',lineHeight:1.8}}>
                🦋 {composicion==='individual'?'Individual':'Mixto/Combinado'}<br/>
                🖼️ Marco {marco.charAt(0).toUpperCase()+marco.slice(1)}<br/>
                🛡️ {vidrio==='normal'?'Cristal Normal':vidrio==='uv'?'Cristal UV Premium':'Resina Epóxica'}
                {precioExtra>0&&<span style={{color:'#C9A84C'}}> (+${precioExtra} USD)</span>}
              </div>
            </div>

            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 940 699 405</a>
              <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 920 644 433</a>
            </div>
          </div>

          {/* INFO */}
          <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🌟 TIPOS DE CUADROS DISPONIBLES</div>
            {[
              {icon:'⬛',nm:'Rectangular & Cuadrado',desc:'Marco clásico de ebanistería · El más elegante · Para cualquier espacio'},
              {icon:'⭕',nm:'Redondo & Oval',desc:'Marcos curvos de lujo · Muy pedidos en Europa · Diseño exclusivo'},
              {icon:'🔺',nm:'Triangular',desc:'Diseño moderno geométrico · Arte contemporáneo · Vanguardia'},
              {icon:'📦',nm:'Cubo & Urna 3D',desc:'Caja de cristal · Vista 360° · Ver el insecto por todos lados'},
              {icon:'🔮',nm:'Cúpula & Campana',desc:'Domo de vidrio victoriano · Exhibición de museo · Lujo clásico'},
              {icon:'🕐',nm:'Tipo Reloj',desc:'Marco circular con reloj de alta gama integrado · Dubai · Lujo extremo'},
              {icon:'🦋',nm:'Composiciones Mixtas',desc:'Varias especies juntas · Arte cromático · Colores amazónicos'},
              {icon:'💎',nm:'Encapsulado en Resina',desc:'Eterno · Irrompible · Moderno · El más exclusivo del mundo'},
            ].map(p=>(
              <div key={p.nm} style={{display:'flex',gap:10,alignItems:'center',marginBottom:10,padding:'8px',borderRadius:6,background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.08)'}}>
                <span style={{fontSize:'1.4rem'}}>{p.icon}</span>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{p.nm}</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>{p.desc}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:12,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12}}>
              <p style={{color:'#C9A84C',fontSize:'.75rem',fontWeight:700}}>📦 Incluye:</p>
              <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',marginTop:4,lineHeight:1.8}}>
                ✅ Certificado SERFOR<br/>
                ✅ Certificado CITES<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Embalaje de arte premium<br/>
                ✅ Más de 40 años de experiencia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
