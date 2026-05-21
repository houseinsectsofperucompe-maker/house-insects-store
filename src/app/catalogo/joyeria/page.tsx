'use client'
import ST from '@/components/ST'
import { useState } from 'react'
export default function JoeriaPage() {
  const [vista, setVista] = useState('frente')
  const [cat, setCat] = useState('todas')
  const CATS = [
    {id:'todas',nm:'✨ Todas'},
    {id:'cadenas',nm:'📿 Cadenas'},
    {id:'aretes',nm:'💎 Aretes'},
    {id:'esclavas',nm:'⌚ Esclavas'},
    {id:'anillos',nm:'💍 Anillos'},
    {id:'collares',nm:'🪬 Collares'},
    {id:'mariposas',nm:' Cuadros con Mariposas Raras'},
    {id:'coleoptera',nm:'🪲 Cuadros con Coleoptera Grandes'},
  ]
  const PIEZAS = [
    {icon:'📿',nm:'Cadenas de Oro & Plata',desc:'Oro 18k · Plata 925 · Diseños amazónicos · Certificado'},
    {icon:'💎',nm:'Aretes',desc:'Oro · Plata · Con incrustaciones naturales · Artesanal'},
    {icon:'⌚',nm:'Esclavas',desc:'Oro 18k · Plata 925 · Grabados amazónicos · Lujo'},
    {icon:'💍',nm:'Anillos',desc:'Oro · Plata · Diseños únicos · Piedras naturales'},
    {icon:'🪬',nm:'Collares',desc:'Oro · Plata · Diseños ancestrales · Certificado'},
    {icon:'',nm:'Cuadros Oro & Plata con Mariposas Raras',desc:'Marco de oro 18k y plata 925 · Gynandromorphs · Freaks · Aberraciones · Colección élite'},
    {icon:'🪲',nm:'Cuadros Oro & Plata con Coleoptera Grandes',desc:'Marco de oro 18k y plata 925 · Escarabajos gigantes · Insectos raros · Museos y coleccionistas'},
  ]
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .cat-btn{transition:all 0.18s ease;cursor:pointer}
        .cat-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
        .wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}
        .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
      
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
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · JOYERÍA DE LUJO</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><ST t="✨ Joyería Natural & Orfebrería"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Joyería fina en oro 18k y plata 925. Cuadros exclusivos con mariposas raras e insectos Coleoptera gigantes en marcos de oro y plata para coleccionistas y museos de élite.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA 7113.19.00.00 · SUNAT · RUC 20447397804
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
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:24,textAlign:'center',marginBottom:24}}>
          <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:16}}>
            {['frente','lado','reverso','video'].map(v=>(
              <button key={v} onClick={()=>setVista(v)} style={{
                padding:'5px 12px',borderRadius:20,cursor:'pointer',fontSize:'.7rem',fontFamily:'Georgia,serif',
                background:vista===v?'#C9A84C':'rgba(201,168,76,0.08)',
                color:vista===v?'#1A1209':'#C9A84C',
                border:`1px solid ${vista===v?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                transition:'all 0.18s ease'
              }}>{v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video'}</button>
            ))}
          </div>
          <div style={{width:'100%',maxWidth:400,margin:'0 auto 16px',height:280,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:12}}/></a>
            <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',letterSpacing:'.1em'}}>COLECCIÓN EN PREPARACIÓN</p>
            <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.62rem',marginTop:4}}><ST t="FOTO PRÓXIMAMENTE"/></p>
          </div>
          <div style={{maxWidth:600,margin:'0 auto 20px',textAlign:'left',background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:16}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:8}}>💎 PIEZAS DISPONIBLES</div>
            {PIEZAS.map(p=>(
              <div key={p.nm} style={{display:'flex',gap:10,alignItems:'center',marginBottom:10,padding:'8px',borderRadius:6,background:'rgba(201,168,76,0.04)'}}>
                <span style={{fontSize:'1.3rem'}}>{p.icon}</span>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{<ST t={p.nm}/>}</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>{<ST t={p.desc}/>}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 940 699 405</a>
            <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 920 644 433</a>
          </div>
        </div>
      </div>
    </div>
  )
}
