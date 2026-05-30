'use client'
import BannerSlot from '@/components/BannerSlot'
import ST from '@/components/ST'
import { useState } from 'react'
export default function PinturasPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const CATS = [
    {id:'todas',nm:'🎨 Todas'},
    {id:'fineart',nm:'🖼️ Fine Art & Canvas'},
    {id:'sacred',nm:'⛪ Sacred & Mystical Art'},
    {id:'sculptures',nm:'🏺 Sculptures & Sphinxes'},
    {id:'pottery',nm:'🪆 Ancestral Pottery'},
    {id:'bioart',nm:' Bio-Art 3D & 4D'},
  ]
  const COLECCIONES = {
    fineart:[
      {icon:'🎨',nm:'Pinturas Coloniales Originales',desc:'Óleo sobre lienzo · Arte colonial peruano · Hecho a mano · Colección'},
      {icon:'🌿',nm:'Arte Místico Amazónico',desc:'Iconografía ayahuasca · Visiones amazónicas · Tintes naturales · Lujo'},
      {icon:'🪨',nm:'Réplicas de Arte Rupestre',desc:'Técnica ancestral · Motivos precolombinos · Arte contemporáneo'},
      {icon:'🏔️',nm:'Pinturas Andinas Originales',desc:'Motivos altoandinos · Lienzo · Óleo · Arte de colección'},
      {icon:'🌺',nm:'Arte Amazónico Moderno',desc:'Selva peruana · Colores vibrantes · Artistas locales · Exportación'},
    ],
    sacred:[
      {icon:'⛪',nm:'Ángeles Arcabuceros',desc:'Arte colonial cuzqueño · Réplica contemporánea · Lujo · Colección'},
      {icon:'🕊️',nm:'Retablos Religiosos',desc:'Arte sacro · Madera tallada · Dorado · Arte de Ayacucho'},
      {icon:'🌟',nm:'Mosaicos Artísticos Religiosos',desc:'Partida 9701.91.00.00 · Colage · Iconografía sacra · Decoración'},
      {icon:'✨',nm:'Iconografía Sacra Peruana',desc:'Réplicas artísticas · Arte religioso · Para coleccionistas élite'},
    ],
    sculptures:[
      {icon:'🏺',nm:'Esfinges Decorativas de Madera',desc:'Partida 4420.11.00.00 · Madera tropical · Talladas a mano · Lujo'},
      {icon:'🗿',nm:'Esculturas de Pared 3D',desc:'Resina · Metal · Madera fina · Gran formato · Arte de vanguardia'},
      {icon:'',nm:'Esculturas de Mariposas en Pared',desc:'Partida 9703.10.00.00 · Resina · Efecto 3D · Coleccionistas'},
      {icon:'🪲',nm:'Esculturas de Coleoptera en Relieve',desc:'Escarabajos rinoceronte · Arte escultórico · Museos · Lujo'},
    ],
    pottery:[
      {icon:'🪆',nm:'Platos Decorativos Pintados a Mano',desc:'Partida 6913.90.00.00 · Cerámica · 3 regiones · Arte utilitario'},
      {icon:'🏺',nm:'Estatuillas de Cerámica',desc:'Artesanías de caza · Sierra alta · Costa · Selva · Colección'},
      {icon:'🎭',nm:'Artesanías Decorativas en Miniatura',desc:'Las 3 regiones · Cerámica fina · Pintadas a mano'},
    ],
    bioart:[
      {icon:'',nm:'Cuadros 3D — Morpho & Mariposas Raras',desc:'Relieve en resina · Alas elevadas del lienzo · Ultra lujo · Con video'},
      {icon:'🌈',nm:'Paneles Lenticulares 4D de Mariposas',desc:'Tecnología lenticular · Alas que se mueven · Efecto 4D · Dubai'},
      {icon:'🪲',nm:'Esculturas 3D de Coleoptera',desc:'Escarabajos rinoceronte · Resina · Gran formato · Museos élite'},
      {icon:'',nm:'Bio-Art de Gynandromorphs',desc:'Tributo artístico · Sin tocar espécimen real · Arte sostenible'},
    ],
  }
  const PARTIDAS: Record<string,{codigo:string,desc:string}> = {
    todas:{codigo:'9701.21.00.00',desc:'Pinturas Arte Sacro 3 Regiones · MINCUL · SUNAT'},
    fineart:{codigo:'9701.21.00.00',desc:'Pinturas y dibujos ejecutados totalmente a mano · SUNAT'},
    sacred:{codigo:'9701.91.00.00',desc:'Arte sacro mosaicos e iconografía religiosa · SUNAT'},
    sculptures:{codigo:'9703.10.00.00',desc:'Obras originales de estatuaria y escultura · SUNAT'},
    pottery:{codigo:'6913.90.00.00',desc:'Estatuillas y objetos de adorno de cerámica · SUNAT'},
    bioart:{codigo:'9701.21.00.00',desc:'Pinturas 3D y 4D con relieve ejecutadas a mano · SUNAT'},
  }
  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.fineart,...COLECCIONES.sacred,...COLECCIONES.sculptures,...COLECCIONES.pottery,...COLECCIONES.bioart]
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
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · GALERÍA DE ARTE</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><ST t="🎨 Pinturas, Arte Sacro & Expresiones de las 3 Regiones"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Nuestra colección Bio-Art rinde homenaje a las especies más raras de la Amazonía peruana. Arte colonial, místico amazónico, sacro, esculturas 3D y paneles lenticulares 4D para coleccionistas de élite en Dubai, Europa y Asia.
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
                }}>{v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video 3D'}</button>
              ))}
            </div>
            <div style={{width:'100%',height:240,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:16}}>
              <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:10}}/></a>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}>GALERÍA EN PREPARACIÓN</p>
              <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.62rem',marginTop:4}}>FOTO & VIDEO 3D PRÓXIMAMENTE</p>
            </div>
            <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:10,marginBottom:12,textAlign:'left'}}>
              <p style={{color:'#C9A84C',fontSize:'.72rem',fontWeight:700}}>✨ Lujo Sostenible & Arte de Vanguardia</p>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginTop:4,lineHeight:1.6}}>Cada pieza es única · Hecha a mano · Certificada MINCUL · Precio bajo consulta</p>
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
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🎨 COLECCIÓN DISPONIBLE</div>
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
                ✅ Certificado MINCUL<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Packing list especializado<br/>
                ✅ Embalaje de arte premium<br/>
                ✅ Precio bajo consulta
              </p>
            </div>
          </div>
        </div>
      </div>
    <BannerSlot espacio='entre-productos' rubro='pinturas' intervalo={7000}/>
    </div>
  )
}
