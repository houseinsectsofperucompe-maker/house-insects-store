'use client'
import ST from '@/components/ST'
export default function ReembolsosPage() {
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <a href='/' style={{color:'#C9A84C',fontSize:'1rem',textDecoration:'none',display:'inline-block',marginBottom:30,padding:'10px 20px',background:'rgba(201,168,76,0.15)',borderRadius:8,border:'1px solid rgba(201,168,76,0.4)'}}>← <ST t='Inicio'/></a>
        <h1 style={{color:'#E8C97A',fontSize:'2rem',fontWeight:300,marginBottom:8}}><ST t='Política de Reembolsos y Seguros'/></h1>
        <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',marginBottom:40}}>HOUSE INSECTS OF PERU E.I.R.L. · RUC 20447397804</p>
        <div style={{background:'rgba(201,168,76,0.08)',border:'2px solid #C9A84C',borderRadius:12,padding:24,marginBottom:24}}>
          <p style={{color:'#C9A84C',fontWeight:700,marginBottom:12}}>⚠️ <ST t='Aviso Importante'/></p>
          <p style={{color:'rgba(232,201,122,0.8)',lineHeight:1.9}}><ST t='House Insects of Peru E.I.R.L. NO cubre reembolsos por pérdida, daño o demora. Los reembolsos son responsabilidad exclusiva de la aseguradora contratada por el cliente al momento de la compra.'/></p>
        </div>
        <div style={{background:'rgba(0,100,0,0.1)',border:'1px solid rgba(0,200,0,0.2)',borderRadius:12,padding:24,marginBottom:24}}>
          <h2 style={{color:'#7EC87E',fontSize:'1.1rem',fontWeight:400,marginBottom:12}}>✅ <ST t='Seguro de Envío Opcional'/></h2>
          <p style={{color:'rgba(232,201,122,0.8)',lineHeight:1.9}}><ST t='Al momento de su compra puede incluir seguro internacional que cubre pérdida, daño, robo y demora excesiva.'/></p>
        </div>
        <div style={{background:'rgba(0,50,100,0.15)',border:'1px solid rgba(100,150,255,0.2)',borderRadius:12,padding:24,marginBottom:24}}>
          <h2 style={{color:'#8AB4F8',fontSize:'1.1rem',fontWeight:400,marginBottom:16}}>🛡️ <ST t='Aseguradoras Autorizadas'/></h2>
          <div style={{background:'rgba(10,42,90,0.6)',borderRadius:8,padding:'12px 16px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#fff',fontWeight:700,margin:0}}>LLOYDS OF LONDON</p><p style={{color:'rgba(255,255,255,0.6)',fontSize:'.8rem',margin:'4px 0 0'}}><ST t='Seguro marítimo internacional premium'/></p></div>
            <a href='https://www.lloyds.com' target='_blank' rel='noreferrer' style={{color:'#C9A84C',fontSize:'.75rem',textDecoration:'none',border:'1px solid #C9A84C',padding:'4px 10px',borderRadius:4}}><ST t='Ver'/></a>
          </div>
          <div style={{background:'rgba(10,58,90,0.6)',borderRadius:8,padding:'12px 16px',marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#fff',fontWeight:700,margin:0}}>SHIP INSURANCE</p><p style={{color:'rgba(255,255,255,0.6)',fontSize:'.8rem',margin:'4px 0 0'}}><ST t='Seguro especializado en envíos internacionales'/></p></div>
            <a href='https://shipinsurance.com' target='_blank' rel='noreferrer' style={{color:'#C9A84C',fontSize:'.75rem',textDecoration:'none',border:'1px solid #C9A84C',padding:'4px 10px',borderRadius:4}}><ST t='Ver'/></a>
          </div>
          <div style={{background:'rgba(42,10,90,0.6)',borderRadius:8,padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#fff',fontWeight:700,margin:0}}>INSURTECH PERU</p><p style={{color:'rgba(255,255,255,0.6)',fontSize:'.8rem',margin:'4px 0 0'}}><ST t='Seguro digital con QR de verificación'/></p></div>
            <a href='https://insurtech.pe' target='_blank' rel='noreferrer' style={{color:'#C9A84C',fontSize:'.75rem',textDecoration:'none',border:'1px solid #C9A84C',padding:'4px 10px',borderRadius:4}}><ST t='Ver'/></a>
          </div>
        </div>
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:24,marginBottom:24}}>
          <h2 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,marginBottom:16}}>📋 <ST t='Proceso de Reclamo'/></h2>
          <div style={{display:'flex',gap:12,marginBottom:10}}><span style={{background:'#C9A84C',color:'#1A1209',borderRadius:'50%',width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,fontSize:'.85rem'}}>1</span><p style={{color:'rgba(232,201,122,0.8)',margin:0,lineHeight:1.8}}><ST t='Debe haber contratado el seguro al momento de la compra'/></p></div>
          <div style={{display:'flex',gap:12,marginBottom:10}}><span style={{background:'#C9A84C',color:'#1A1209',borderRadius:'50%',width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,fontSize:'.85rem'}}>2</span><p style={{color:'rgba(232,201,122,0.8)',margin:0,lineHeight:1.8}}><ST t='Contactar directamente a la aseguradora con su número de póliza'/></p></div>
          <div style={{display:'flex',gap:12,marginBottom:10}}><span style={{background:'#C9A84C',color:'#1A1209',borderRadius:'50%',width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,fontSize:'.85rem'}}>3</span><p style={{color:'rgba(232,201,122,0.8)',margin:0,lineHeight:1.8}}><ST t='Presentar factura SUNAT y documentos de envío'/></p></div>
          <div style={{display:'flex',gap:12}}><span style={{background:'#C9A84C',color:'#1A1209',borderRadius:'50%',width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,fontSize:'.85rem'}}>4</span><p style={{color:'rgba(232,201,122,0.8)',margin:0,lineHeight:1.8}}><ST t='La aseguradora procesará el reembolso según sus términos'/></p></div>
        </div>
        <div style={{background:'rgba(150,0,0,0.1)',border:'1px solid rgba(255,0,0,0.2)',borderRadius:12,padding:24,marginBottom:24}}>
          <h2 style={{color:'#ff6b6b',fontSize:'1rem',fontWeight:400,marginBottom:12}}>❌ <ST t='Sin Seguro Contratado'/></h2>
          <p style={{color:'rgba(232,201,122,0.7)',lineHeight:1.9}}><ST t='Si el cliente no contrató seguro, House Insects of Peru E.I.R.L. no tiene obligación legal de emitir reembolso por pérdida o daño del envío.'/></p>
        </div>
        <div style={{textAlign:'center',padding:'20px 0'}}>
          <a href='https://wa.me/51940699405' target='_blank' rel='noreferrer' style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontWeight:700,textDecoration:'none',marginRight:10}}>💬 +51 940 699 405</a>
          <a href='https://wa.me/51920644433' target='_blank' rel='noreferrer' style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
        </div>
      </div>
    </div>
  )
}
