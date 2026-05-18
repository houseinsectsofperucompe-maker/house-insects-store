'use client'
export default function TerminosPage() {
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
        <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>📋 Términos y Condiciones</h1>
        <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'16px 0 32px'}}/>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><strong>House Insects of Peru E.I.R.L.</strong> | RUC 20447397804 | Tingo María, Huánuco, Perú | Fundada 1980</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>1. Productos y Calidad</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Todos nuestros especímenes son 100% legales, calidad A1, certificados SERFOR y CITES. Exportamos bajo Ley Amazónica N°27037.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>2. Precios</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Precios en USD. Incluyen certificación CITES y documentación SERFOR. No incluyen envío internacional.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>3. Envíos Internacionales</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Exportamos vía DHL, FedEx, UPS y Aramex. Tiempo estimado: 5-15 días hábiles. Incluimos documentación aduanera completa.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>4. Pagos</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Aceptamos transferencia bancaria internacional (SWIFT), Western Union y PayPal para clientes verificados.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>5. Garantía</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}>Garantizamos autenticidad y calidad A1. En caso de daño en tránsito, reemplazamos o reembolsamos previa documentación fotográfica.</p>
        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}>6. Ley Aplicable</h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9}}>Estos términos se rigen por las leyes de la República del Perú. Jurisdicción: Tingo María, Huánuco.</p>
      </div>
    </div>
  )
}