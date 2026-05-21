'use client'
export default function PartidasPage() {
  const PARTIDAS = [
    { rubro:' Especímenes Biológicos Secos', partida:'9705.00.00.00', entidad:'SERFOR + CITES', drawback:'Sí', senasa:'No' },
    { rubro:'🌙 Mariposas Nocturnas', partida:'9705.00.00.00', entidad:'SERFOR + CITES', drawback:'Sí', senasa:'No' },
    { rubro:'🪲 Coleópteros & Artrópodos', partida:'9705.00.00.00', entidad:'SERFOR + CITES', drawback:'Sí', senasa:'No' },
    { rubro:'✨ Joyería Natural & Orfebrería', partida:'7113.19.00.00', entidad:'SUNAT', drawback:'Sí', senasa:'No' },
    { rubro:'🗿 Artesanías & Resinas', partida:'9601.90.00.00', entidad:'SUNAT + CITE', drawback:'Sí', senasa:'No' },
    { rubro:'🍎 Frutas Exóticas Deshidratadas', partida:'0813.40.00.00', entidad:'SENASA', drawback:'Sí', senasa:'Sí' },
    { rubro:'🌱 Semillas & Plantas Medicinales', partida:'1211.90.90.00', entidad:'SENASA + SERFOR', drawback:'Sí', senasa:'Sí' },
    { rubro:'🌶️ Alimentos Deshidratados', partida:'2103.90.90.00', entidad:'SENASA + DIGESA', drawback:'Sí', senasa:'Sí' },
    { rubro:'🫧 Superalimentos en Polvo', partida:'2106.90.99.00', entidad:'SENASA + DIGESA', drawback:'Sí', senasa:'Sí' },
    { rubro:'🧶 Textilería & Alpaca', partida:'5112.19.00.00', entidad:'SUNAT', drawback:'Sí', senasa:'No' },
    { rubro:'🌿 Textilería Amazónica', partida:'5407.61.00.00', entidad:'SUNAT', drawback:'Sí', senasa:'No' },
    { rubro:'💎 Minerales & Piedras Preciosas', partida:'2616.90.00.00', entidad:'MEM + SUNAT', drawback:'Sí', senasa:'No' },
    { rubro:'🍄 Hongos & Productos Naturales', partida:'0712.30.00.00', entidad:'SENASA', drawback:'Sí', senasa:'Sí' },
    { rubro:'🎨 Pinturas & Arte Rupestre', partida:'9701.10.00.00', entidad:'SUNAT + MIN.CULTURA', drawback:'No', senasa:'No' },
    { rubro:'🪵 Maderas Finas & Esculturas', partida:'4420.90.00.00', entidad:'SERFOR', drawback:'Sí', senasa:'No' },
    { rubro:'🔬 Herramientas Biológicas', partida:'9027.80.90.00', entidad:'SUNAT', drawback:'Sí', senasa:'No' },
    { rubro:'🌸 Esencias & Aceites Naturales', partida:'3301.29.00.00', entidad:'SENASA + DIGESA', drawback:'Sí', senasa:'Sí' },
  ]
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',color:'#E8E0D0',fontFamily:'Georgia,serif',padding:'60px 20px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .page-content{animation:fadeInUp 0.8s ease both}
        .back-btn{transition:color 0.2s ease,transform 0.2s ease;display:inline-block}
        .back-btn:hover{color:#F5E6C8!important;transform:translateX(-4px)}
        .part-row{transition:background 0.15s ease,transform 0.15s ease;border-bottom:1px solid rgba(201,168,76,0.1);padding:12px 8px;display:grid;gridTemplateColumns:2fr 1.2fr 1.2fr 0.5fr 0.5fr;gap:8px;alignItems:center}
        .part-row:hover{background:rgba(201,168,76,0.06);transform:translateX(4px)}
      `}</style>
      <div className="page-content" style={{maxWidth:1100,margin:'0 auto'}}>
        <a href="/" className="back-btn" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:32}}>← Volver al inicio</a>
        <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>📋 Partidas Arancelarias</h1>
        <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',letterSpacing:'.1em',marginBottom:8}}>HOUSE INSECTS OF PERU E.I.R.L. · RUC 20447397804 · RÉGIMEN MYPE · LEY AMAZÓNICA N°27037</p>
        <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'16px 0 32px'}}/>
        <div style={{overflowX:'auto'}}>
          <div style={{display:'grid',gridTemplateColumns:'2fr 1.2fr 1.2fr 0.5fr 0.5fr',gap:8,padding:'8px',background:'rgba(201,168,76,0.1)',borderRadius:8,marginBottom:8,fontSize:'.7rem',color:'#C9A84C',letterSpacing:'.08em'}}>
            <span>RUBRO</span>
            <span>PARTIDA ARANCELARIA</span>
            <span>ENTIDAD REGULADORA</span>
            <span>DRAWBACK</span>
            <span>SENASA</span>
          </div>
          {PARTIDAS.map((p,i)=>(
            <div key={i} className="part-row">
              <span style={{fontSize:'.82rem',color:'#E8C97A'}}>{p.rubro}</span>
              <span style={{fontSize:'.78rem',color:'#C9A84C',fontFamily:'monospace'}}>{p.partida}</span>
              <span style={{fontSize:'.75rem',color:'rgba(232,201,122,0.6)'}}>{p.entidad}</span>
              <span style={{fontSize:'.75rem',color:p.drawback==='Sí'?'#7EC87E':'rgba(232,201,122,0.3)'}}>{p.drawback}</span>
              <span style={{fontSize:'.75rem',color:p.senasa==='Sí'?'#7EC87E':'rgba(232,201,122,0.3)'}}>{p.senasa}</span>
            </div>
          ))}
        </div>
        <div style={{marginTop:32,background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:20}}>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.8rem',lineHeight:1.8}}>
            ✅ <strong style={{color:'#C9A84C'}}>Drawback</strong> — Restitución de derechos arancelarios para exportadores<br/>
            ✅ <strong style={{color:'#C9A84C'}}>Régimen MYPE</strong> — Ley Amazónica N°27037 beneficios tributarios<br/>
            ✅ <strong style={{color:'#C9A84C'}}>INCOTERMS</strong> — FOB, CIF, EXW disponibles<br/>
            ✅ <strong style={{color:'#C9A84C'}}>Bienes</strong> — Código 200 · <strong style={{color:'#C9A84C'}}>Servicios</strong> — Código 300
          </p>
        </div>
        <div style={{textAlign:'center',marginTop:24,display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="https://wa.me/51940699405" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" target="_blank" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>💬 +51 920 644 433</a>
        </div>
      </div>
    </div>
  )
}
