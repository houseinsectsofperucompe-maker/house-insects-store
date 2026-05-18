'use client'
import { useState } from 'react'

export default function AlimentosPage() {
  const [q, setQ] = useState('')
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .page-content{animation:fadeInUp 0.6s ease both}
        .back-btn{transition:color 0.2s ease,transform 0.2s ease;display:inline-block}
        .back-btn:hover{color:#F5E6C8!important;transform:translateX(-4px)}
        .wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}
        .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
        .coming-card{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:40px;text-align:center;transition:transform 0.2s ease,box-shadow 0.2s ease}
        .coming-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(201,168,76,0.15)}
      `}</style>
      <div className="page-content" style={{maxWidth:1200,margin:'0 auto'}}>
        <a href="/" className="back-btn" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:16}}>← Inicio</a>
        <div style={{textAlign:'center',marginBottom:32}}>
          <img src="/logo-house-insects-peru.png" style={{width:72,height:72,marginBottom:10,objectFit:'contain'}}/>
          <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>🌶️ Alimentos Deshidratados & Condimentos</h1>
          <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',letterSpacing:'.1em'}}>HOUSE INSECTS OF PERU · AMAZONIA · SERFOR · CITES · RUC 20447397804</p>
        </div>
        <div style={{textAlign:'center',marginBottom:20}}>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar productos..." style={{width:'100%',maxWidth:340,padding:'8px 14px',background:'#2A2010',color:'#E8C97A',border:'1px solid #C9A84C',borderRadius:8,fontSize:'.8rem',outline:'none'}}/>
        </div>
        <div className="coming-card">
          <img src="/logo-house-insects-peru.png" style={{width:100,height:100,objectFit:'contain',opacity:.6,marginBottom:16}}/>
          <div style={{width:60,height:1,background:'linear-gradient(to right,transparent,rgba(201,168,76,0.5),transparent)',margin:'0 auto 16px'}}/>
          <h2 style={{fontSize:'1.2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>Catálogo en preparación</h2>
          <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.8rem',marginBottom:24,letterSpacing:'.08em'}}>PRÓXIMAMENTE · Condimentos amazónicos · Naturales · Sin preservantes</p>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://wa.me/51940699405" className="wa-btn" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 940 699 405</a>
            <a href="https://wa.me/51920644433" className="wa-btn" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 920 644 433</a>
          </div>
        </div>
      </div>
    </div>
  )
}