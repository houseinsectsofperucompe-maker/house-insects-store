'use client'
export default function EnviosPage() {
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',color:'#E8E0D0',fontFamily:'Georgia,serif',padding:'60px 20px'}}>
      <style>{`
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.page-content{animation:fadeInUp 0.8s ease both}
.back-btn{transition:color 0.2s ease,transform 0.2s ease;display:inline-block}
.back-btn:hover{color:#F5E6C8!important;transform:translateX(-4px)}
.courier-card{transition:transform 0.2s ease,box-shadow 0.2s ease,border-color 0.2s ease;border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:12px 16px;margin-bottom:10px}
.courier-card:hover{transform:scale(1.03);box-shadow:0 6px 24px rgba(201,168,76,0.2);border-color:rgba(201,168,76,0.5)}
.contact-card{transition:box-shadow 0.3s ease}
.contact-card:hover{box-shadow:0 0 40px rgba(201,168,76,0.15)}
.gold-link{transition:color 0.2s ease,letter-spacing 0.2s ease}
.gold-link:hover{color:#F5E6C8!important;letter-spacing:0.03em}
`}</style>
      <div className="page-content" style={{maxWidth:800,margin:'0 auto'}}>
        <a href="/" className="back-btn" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:32}}>← Volver al inicio</a>
        <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>🚚 Política de Envíos</h1>
        <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'16px 0 32px'}}/>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:24}}><strong>House Insects of Peru E.I.R.L.</strong> exporta especímenes biológicos a todo el mundo con documentación legal completa.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:16}}>Couriers Internacionales</h2>
        <div className="courier-card">✈️ <strong>DHL Express</strong> — Europa, Asia, Medio Oriente (3-7 días)</div>
        <div className="courier-card">✈️ <strong>FedEx International</strong> — USA, Canadá, Australia (5-10 días)</div>
        <div className="courier-card">✈️ <strong>UPS Worldwide</strong> — Todo el mundo (5-12 días)</div>
        <div className="courier-card">✈️ <strong>Aramex</strong> — Medio Oriente, Asia, África (7-15 días)
        </div>
        <div className="courier-card">✈️ <strong>Exporta Fácil</strong> — SERPOST · Hasta 30kg · Económico</div>
        <div className="courier-card">✈️ <strong>EMS Internacional</strong> — Express Mail Service · Todo el mundo</div>
        <div className="courier-card">✈️ <strong>SERPOST</strong> — Correo oficial del Perú · Envíos internacionales
              {nm:"Exporta Fácil",desc:"Servicio postal internacional · SERPOST · Hasta 30kg · Económico"},
              {nm:"EMS Internacional",desc:"Express Mail Service · SERPOST · Prioritario · Todo el mundo"},
              {nm:"SERPOST",desc:"Correo oficial del Perú · Envíos postales internacionales · Económico"}</div>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Documentación Incluida</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>✅ Certificado CITES<br/>✅ Permiso SERFOR<br/>✅ Factura comercial en inglés/español<br/>✅ Declaración aduanera internacional<br/>✅ Partida arancelaria correcta</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Embalaje</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Cada espécimen es embalado individualmente con materiales especializados para garantizar su integridad durante el transporte internacional.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Exportación Legal</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Operamos bajo Ley Amazónica N°27037. Todos nuestros envíos cumplen con la normativa CITES Apéndice II y III.</p>
        <p style={{fontSize:'.9rem',lineHeight:1.9}}>📞 WhatsApp: +51 940 699 405 | +51 920 644 433<br/>✉️ houseinsectsofperu.com.pe@gmail.com</p>
      </div>
    </div>
  )
}