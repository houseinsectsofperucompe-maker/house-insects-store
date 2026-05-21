'use client'
export default function ContactoPage() {
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
        <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>📞 Contacto</h1>
        <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'16px 0 32px'}}/>
        <div className="contact-card" style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:12,padding:'24px',marginBottom:24}}>
          <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:0}}><strong style={{color:'#E8C97A'}}>House Insects of Peru E.I.R.L.</strong><br/>RUC: 20447397804<br/>Tingo María, Leoncio Prado, Huánuco, Perú<br/>Fundada: 1980 | By Javier Zavala</p>
        </div>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>WhatsApp</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>
          <a href="https://wa.me/51940699405" className="gold-link" style={{color:'#C9A84C',display:'block'}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" className="gold-link" style={{color:'#C9A84C',display:'block'}}>💬 +51 920 644 433</a>
        </p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Email</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>
          <a href="mailto:houseinsectsofperu.com.pe@gmail.com" className="gold-link" style={{color:'#C9A84C',display:'block'}}>houseinsectsofperu.com.pe@gmail.com</a>
          <a href="mailto:jzalopez02@gmail.com" className="gold-link" style={{color:'#C9A84C',display:'block'}}>jzalopez02@gmail.com</a>
        </p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Certificaciones</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>🏛️ SERFOR · CITES · Ley Amazónica N°27037<br/>📦 DHL · FedEx · UPS · Aramex · ExportaFacil</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Horario</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Lunes a Sábado: 8:00 AM - 6:00 PM (GMT-5)<br/>Respondemos WhatsApp en menos de 2 horas.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>Idiomas</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9}}>🇵🇪 Español · 🇺🇸 English · 🇩🇪 Deutsch · 🇫🇷 Français</p>
      </div>
    </div>
  )
}