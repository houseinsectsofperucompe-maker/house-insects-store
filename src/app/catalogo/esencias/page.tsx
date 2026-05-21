'use client'
import ST from '@/components/ST'
import { useState } from 'react'
export default function EsenciasPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const [ml, setMl] = useState('30ml')
  const CATS = [
    {id:'todas',nm:'🌸 Todas'},
    {id:'aromatherapy',nm:'🌿 Amazonian Aromatherapy'},
    {id:'cosmetic',nm:'💆 Organic Elixirs & Cosmetic'},
    {id:'marine',nm:'🌊 Marine & Coastal Botanicals'},
  ]
  const MLS = ['10ml','30ml','50ml','100ml','250ml','500ml']
  const COLECCIONES = {
    aromatherapy:[
      {icon:'🪵',nm:'Aceite Esencial de Palo Santo',desc:'Partida 3301.29.90.00 · Destilado puro · Meditación · Lujo'},
      {icon:'🌿',nm:'Aceite de Muña Andina',desc:'Sierra peruana · Aromaterapia · Bienestar · Puro'},
      {icon:'🌱',nm:'Aceite de Eucalipto Amazónico',desc:'Destilado puro · Respiratorio · Difusores · Premium'},
      {icon:'🌸',nm:'Aceite de Flores Silvestres Amazónicas',desc:'Destilado · Aromaterapia mística · Colección única'},
      {icon:'🪵',nm:'Aceite de Maderas Finas de la Selva',desc:'Cedro · Caoba · Ishpingo · Destilado · Ultra lujo'},
    ],
    cosmetic:[
      {icon:'🥜',nm:'Aceite de Sacha Inchi',desc:'Partida 1515.90.00.00 · Prensado en frío · Omega 3-6-9 · Selva'},
      {icon:'🍊',nm:'Aceite de Semilla de Maracuyá',desc:'Costa peruana · Cosmética · Piel · Antioxidante · Premium'},
      {icon:'🌱',nm:'Aceite de Semilla de Maca',desc:'Sierra · Prensado en frío · Cabello y piel · Nutritivo'},
      {icon:'🥥',nm:'Aceite de Jojoba Peruano',desc:'Costa · Cosmética de lujo · Hidratante · Anti-edad'},
      {icon:'✨',nm:'Elixires Orgánicos de Ultra Lujo',desc:'Mezclas premium · Certificadas · Para pieles delicadas'},
    ],
    marine:[
      {icon:'🌊',nm:'Extracto de Algas Marinas Peruanas',desc:'Partida 1302.19.90.00 · Costa · Antienvejecimiento · Asia'},
      {icon:'🐚',nm:'Esencias de Plantas Litorales',desc:'Costa peruana · Extractos · Farmacéutico · Cosmético'},
      {icon:'💧',nm:'Extractos Antioxidantes Marinos',desc:'Laboratorios cosméticos · Europa · Asia · Certificados'},
    ],
  }
  const PARTIDAS: Record<string,{codigo:string,desc:string}> = {
    todas:{codigo:'3301.29.90.00',desc:'Esencias aceites destilados 3 regiones · DIGESA · SENASA'},
    aromatherapy:{codigo:'3301.29.90.00',desc:'Aceites esenciales puros destilados · DIGESA · DIGEMID'},
    cosmetic:{codigo:'1515.90.00.00',desc:'Aceites vegetales fijos prensados en frío · DIGESA'},
    marine:{codigo:'1302.19.90.00',desc:'Extractos botánicos y marinos · DIGESA · SENASA'},
  }
  const piezasActuales = cat==='todas'
    ? [...COLECCIONES.aromatherapy,...COLECCIONES.cosmetic,...COLECCIONES.marine]
    : COLECCIONES[cat as keyof typeof COLECCIONES] || []
  const partida = PARTIDAS[cat] || PARTIDAS.todas
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .cat-btn,.ml-btn{transition:all 0.18s ease;cursor:pointer}
        .cat-btn:hover,.ml-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
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
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · COSTA · SIERRA · SELVA · MAR</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><ST t="🌸 Esencias, Aceites Naturales & Destilados de las 3 Regiones & Mar"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Aceites esenciales puros de Palo Santo, Muña y flores amazónicas. Aceites cosméticos de Sacha Inchi y Jojoba. Extractos marinos antienvejecimiento de la costa peruana. Certificados DIGESA.
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
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',letterSpacing:'.08em',marginBottom:8}}>💧 SELECCIONA VOLUMEN</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {MLS.map(m=>(
                  <button key={m} onClick={()=>setMl(m)} className="ml-btn" style={{
                    padding:'5px 10px',borderRadius:6,fontSize:'.72rem',fontFamily:'Georgia,serif',
                    background:ml===m?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:ml===m?'#1A1209':'#C9A84C',
                    border:`1px solid ${ml===m?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{m}</button>
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
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>🌸 COLECCIÓN DISPONIBLE</div>
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
                ✅ Certificado DIGEMID<br/>
                ✅ Certificado SENASA<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Venta por ml o lotes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
