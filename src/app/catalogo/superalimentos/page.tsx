'use client'
import { useState } from 'react'
export default function SuperalimentosPage() {
  const [vista, setVista] = useState('frente')
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .bb:hover{color:#F5E6C8!important;transform:translateX(-4px)}
        .wb:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
      `}</style>
      <div className="pc" style={{maxWidth:900,margin:'0 auto'}}>
        <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:16}}>← Inicio</a>
        <div style={{textAlign:'center',marginBottom:24}}>
          <img src="/logo-house-insects-peru.png" style={{width:72,height:72,marginBottom:10,objectFit:'contain'}}/>
          <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>🫧 Superalimentos en Polvo</h1>
          <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',letterSpacing:'.1em'}}>HOUSE INSECTS OF PERU · AMAZONIA · RUC 20447397804</p>
        </div>
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:24,textAlign:'center'}}>
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
            <img src="/logo-house-insects-peru.png" style={{width:100,height:100,objectFit:'contain',opacity:.6,marginBottom:12}}/>
            <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',letterSpacing:'.1em'}}>CATÁLOGO EN PREPARACIÓN</p>
            <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.62rem',marginTop:4}}>FOTO PRÓXIMAMENTE</p>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/51940699405" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 940 699 405</a>
            <a href="https://wa.me/51920644433" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 920 644 433</a>
          </div>
        </div>
      </div>
    </div>
  )
}