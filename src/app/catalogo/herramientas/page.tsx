'use client'
import T from '@/components/T'
import { useState } from 'react'
export default function HerramientasPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const CATS = [
    {id:'todas',nm:'🔬 Todas'},
    {id:'biologicas',nm:'🔬 Herramientas Biológicas'},
    {id:'taxidermia',nm:'🐍 Taxidermia & Fauna'},
    {id:'reptiles',nm:'🦎 Reptiles & Anfibios'},
    {id:'marina',nm:'🐟 Fauna Marina & Amazónica'},
  ]
  const COLECCIONES = {
    biologicas:[
      {icon:'🔬',nm:'Sets de Disección Premium',desc:'Partida 9027.89.00.00 · Bisturís · Pinzas · Kits completos'},
      {icon:'🔭',nm:'Lupas Binoculares',desc:'Aumento 10x-40x · Entomología · Coleccionistas · Certificado'},
      {icon:'📦',nm:'Kits de Montaje de Especímenes',desc:'Alfileres · Espumas · Cajas · Todo para montaje profesional'},
      {icon:'🧪',nm:'Reactivos y Conservantes',desc:'Formol · Alcohol · Conservación · Laboratorio'},
      {icon:'📐',nm:'Material de Laboratorio Biológico',desc:'Cajas entomológicas · Etiquetas · Equipos de campo'},
    ],
    taxidermia:[
      {icon:'',nm:'Especímenes en Cúpulas de Vidrio',desc:'Mariposas montadas · Marco de lujo · Colección · Dubai'},
      {icon:'🪲',nm:'Coleoptera en Display Premium',desc:'Escarabajos · Marco dorado · Museos · Coleccionistas élite'},
      {icon:'🦎',nm:'Taxidermia de Fauna Silvestre Legal',desc:'SERFOR + CITES obligatorio · Precio bajo consulta'},
    ],
    reptiles:[
      {icon:'🐍',nm:'Cuero de Serpiente Legal (Boa)',desc:'Partida 4103.20.00.00 · SERFOR · Seco/Salado · Certificado'},
      {icon:'🦴',nm:'Huesos y Dientes Animales Legales',desc:'Partida 0507.90.40.00 · SERFOR · CITES · Coleccionistas'},
      {icon:'🦎',nm:'Especímenes de Anfibios Secos',desc:'Colección científica · SERFOR + CITES · Museos · Legal'},
    ],
    marina:[
      {icon:'🐟',nm:'Pirañas Disecadas Amazónicas',desc:'Partida 0511.91.90.00 · PRODUCE · Souvenir de lujo · Legal'},
      {icon:'🐠',nm:'Escamas de Paiche para Artesanía',desc:'PRODUCE · SANIPES · Artesanía amazónica · Exportación'},
      {icon:'🦈',nm:'Mandíbulas de Peces Amazónicos',desc:'Partida 9705.21.00.00 · PRODUCE · Colección científica'},
    ],
  }
  const PARTIDAS: Record<string,{codigo:string,desc:string}> = {
    todas:{codigo:'9027.89.00.00',desc:'Herramientas biológicas y taxidermia · SERFOR · SUNAT'},
    biologicas:{codigo:'9027.89.00.00',desc:'Herramientas análisis físico y biológico · SUNAT'},
    taxidermia:{codigo:'9705.21.00.00',desc:'Especímenes colección científica · SERFOR · CITES'},
    reptiles:{codigo:'4103.20.00.00',desc:'Pieles reptiles y huesos fauna silvestre · SERFOR · CITES'},
    marina:{codigo:'0511.91.90.00',desc:'Productos fauna marina amazónica · PRODUCE · SANIPES'},
  }
  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.biologicas,...COLECCIONES.taxidermia,...COLECCIONES.reptiles,...COLECCIONES.marina]
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
        <a href="/" style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700,textDecoration:'none',display:'inline-block',marginBottom:20,padding:'10px 20px',background:'rgba(201,168,76,0.15)',borderRadius:8,border:'1px solid rgba(201,168,76,0.4)'}}>← Inicio</a>
        <div style={{textAlign:'center',marginBottom:32}}>
          <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,marginBottom:12,objectFit:'contain'}}/></a>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · CIENCIA & FAUNA SILVESTRE LEGAL</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><T t="🔬 Herramientas Biológicas & Taxidermia de Fauna Silvestre"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Herramientas científicas de precisión, especímenes en display de lujo, taxidermia legal de fauna silvestre amazónica certificada por SERFOR, CITES y PRODUCE.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA {partida.codigo} · {<T t={partida.desc}/>}
          </div>
        </div>



        <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center',marginBottom:24}}>
          {CATS.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)} className="cat-btn" style={{
              padding:'7px 14px',borderRadius:20,fontSize:'.75rem',fontFamily:'Georgia,serif',
              background:cat===c.id?'#C9A84C':'rgba(201,168,76,0.08)',
              color:cat===c.id?'#1A1209':'#C9A84C',
              border:`1px solid ${cat===c.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
            }}>{<T t={c.nm}/>}</button>
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
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}>FOTO PRÓXIMAMENTE</p>
            </div>
            <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:10,marginBottom:12,textAlign:'left'}}>
              <p style={{color:'#C9A84C',fontSize:'.72rem',fontWeight:700}}>📋 Partida Arancelaria:</p>
              <p style={{color:'#E8C97A',fontSize:'.78rem',fontFamily:'monospace',marginTop:2}}>{partida.codigo}</p>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem',marginTop:2}}>{<T t={partida.desc}/>}</p>
            </div>
            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 940 699 405</a>
              <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 920 644 433</a>
            </div>
          </div>
          <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🔬 PRODUCTOS DISPONIBLES</div>
            {piezasActuales.map(p=>(
              <div key={p.nm} className="pieza-card">
                <span style={{fontSize:'1.4rem'}}>{p.icon}</span>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{<T t={p.nm}/>}</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>{<T t={p.desc}/>}</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12}}>
              <p style={{color:'#C9A84C',fontSize:'.75rem',fontWeight:700}}>📦 Documentación requerida:</p>
              <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',marginTop:4,lineHeight:1.8}}>
                ✅ Permiso SERFOR (fauna terrestre)<br/>
                ✅ Certificado CITES (especies protegidas)<br/>
                ✅ PRODUCE + SANIPES (fauna marina)<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Guía de transporte forestal
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
