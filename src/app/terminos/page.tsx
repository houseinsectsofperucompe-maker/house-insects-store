'use client'
import T from '@/components/T'
export default function TerminosPage() {
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',color:'#E8E0D0',fontFamily:'Georgia,serif',padding:'60px 20px'}}>
      <style>{`
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.page-content{animation:fadeInUp 0.8s ease both}
.back-btn{transition:color 0.2s ease,transform 0.2s ease;display:inline-block}
.back-btn:hover{color:#F5E6C8!important;transform:translateX(-4px)}
`}</style>
      <div className="page-content" style={{maxWidth:800,margin:'0 auto'}}>
        <a href="/" className="back-btn" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:32}}>← Volver al inicio</a>
        <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><T t="Terminos y Condiciones"/></h1>
        <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'16px 0 32px'}}/>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:24}}><strong>House Insects of Peru E.I.R.L.</strong> | RUC 20447397804 | Tingo Maria, Huanuco, Peru | Fundada 1980</p>

        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}><T t="1. Productos y Calidad"/></h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><T t="Todos nuestros especimenes son 100% legales, calidad A1, certificados SERFOR y CITES. Exportamos bajo Ley Amazonica N°27037."/></p>

        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}><T t="2. Precios"/></h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><T t="Precios en USD. Incluyen certificacion CITES y documentacion SERFOR. No incluyen envio internacional."/></p>

        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}><T t="3. Envios Internacionales"/></h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><T t="Exportamos via DHL, FedEx, UPS, Aramex, Exporta Facil, EMS Internacional y SERPOST. Tiempo estimado: 5-15 dias habiles. Incluimos documentacion aduanera completa."/></p>

        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}><T t="4. Pagos"/></h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><T t="Aceptamos los siguientes metodos de pago:"/></p>
        <p style={{fontSize:'.9rem',lineHeight:2,marginBottom:16}}>
          ✅ First Bank<br/>
          ✅ Izipay<br/>
          ✅ Google Pay<br/>
          ✅ Stripe Global Atlas<br/>
          ✅ Payoneer<br/>
          ✅ Wise<br/>
          ✅ Katenos Business<br/>
          ✅ Transferencia Bancaria Internacional (SWIFT)<br/>
          ✅ Western Union<br/>
          ✅ Money Gram<br/>
          ✅ Alipay<br/>
          ✅ WeChat Pay Business
        </p>

        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}><T t="5. Garantia"/></h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><T t="Garantizamos autenticidad y calidad A1. En caso de dano en transito, reemplazamos o reembolsamos previa documentacion fotografica."/></p>

        <h2 style={{fontSize:'1.1rem',color:'#C9A84C',marginTop:24,marginBottom:8}}><T t="6. Ley Aplicable"/></h2>
        <p style={{fontSize:'.9rem',lineHeight:1.9,marginBottom:16}}><T t="Estos terminos se rigen por las leyes de la Republica del Peru. Jurisdiccion: Tingo Maria, Huanuco."/></p>
      </div>
    </div>
  )
}
