export default function Page() {
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',color:'#E8E0D0',fontFamily:'Georgia,serif',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px'}}>
      <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',marginBottom:32,display:'block'}}>← Volver al inicio</a>
      <img src="/logo.png" alt="House Insects of Peru" style={{width:140,height:140,marginBottom:24,filter:'drop-shadow(0 8px 24px rgba(201,168,76,0.4))'}}/>
      <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:16}}>Catálogo disponible próximamente</h1>
      <p style={{color:'rgba(232,201,122,0.5)',marginBottom:32,maxWidth:500}}>Contáctanos por WhatsApp para ver nuestros especímenes disponibles</p>
      <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center'}}>
        <a href="https://wa.me/51940699405" target="_blank" style={{background:'#25D366',color:'white',padding:'14px 28px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'1rem'}}>💬 +51 940 699 405</a>
        <a href="https://wa.me/51920644433" target="_blank" style={{background:'#25D366',color:'white',padding:'14px 28px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'1rem'}}>💬 +51 920 644 433</a>
      </div>
    </div>
  )
}
