'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'

function CheckoutForm() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const key = params.get('key') || ''
  const total = params.get('total') || '0'

  useEffect(() => {
    if (!token || !key) return
    const style = document.createElement('style')
    style.innerHTML = \`
      .kr-field-wrapper { background: #f5f0e8 !important; border: 2px solid #C9A84C !important; border-radius: 8px !important; margin-bottom: 12px !important; padding: 4px 8px !important; }
      .kr-field-wrapper input { color: #1A1209 !important; font-size: 1rem !important; font-family: Georgia,serif !important; }
      .kr-label { color: #5a4a2a !important; font-size: .8rem !important; font-weight: 700 !important; }
      .kr-payment-button { background: #C9A84C !important; color: #1A1209 !important; font-weight: 700 !important; border-radius: 8px !important; font-size: 1rem !important; }
    \`
    document.head.appendChild(style)
    const link1 = document.createElement('link')
    link1.rel = 'stylesheet'
    link1.href = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/classic-reset.css'
    document.head.appendChild(link1)
    const link2 = document.createElement('link')
    link2.rel = 'stylesheet'
    link2.href = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/classic.css'
    document.head.appendChild(link2)
    const script = document.createElement('script')
    script.src = 'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js'
    script.setAttribute('kr-public-key', key)
    script.setAttribute('kr-language', 'es-PE')
    script.setAttribute('kr-post-url-success', '/pago/resultado')
    document.head.appendChild(script)
  }, [token, key])

  return (
    <div style={{minHeight:'100vh',background:'#FFFDF7',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16,fontFamily:'Georgia,serif'}}>
      
      {/* Header */}
      <div style={{textAlign:'center',marginBottom:24}}>
        <img src="/logo-house-insects-peru.png" style={{width:90,height:90,objectFit:'contain',marginBottom:12,borderRadius:'50%',border:'3px solid #C9A84C',boxShadow:'0 4px 20px rgba(201,168,76,0.3)'}}/>
        <h1 style={{color:'#1A1209',fontSize:'1.5rem',fontWeight:700,marginBottom:4}}>Completar Pago</h1>
        <p style={{color:'#5a4a2a',fontSize:'.8rem'}}>HOUSE INSECTS OF PERU · RUC 20447397804</p>
      </div>

      {/* Card */}
      <div style={{background:'white',borderRadius:16,padding:28,width:'100%',maxWidth:460,boxShadow:'0 8px 40px rgba(0,0,0,0.12)',border:'1px solid #e8dfc8'}}>
        
        {/* Total */}
        <div style={{background:'linear-gradient(135deg,#1A1209,#2A1F0A)',borderRadius:10,padding:'16px 20px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.7rem',letterSpacing:'.08em',margin:0}}>TOTAL A PAGAR</p>
            <p style={{color:'#C9A84C',fontWeight:700,fontSize:'1.6rem',margin:0}}>${parseFloat(total).toFixed(2)} USD</p>
          </div>
          <div style={{textAlign:'right'}}>
            <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',margin:0}}>🔒 Pago seguro</p>
            <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',margin:0}}>Izipay · SSL</p>
          </div>
        </div>

        {/* Formulario Izipay */}
        <div className="kr-smart-form" kr-form-token={token}></div>

        {/* Volver */}
        <div style={{textAlign:'center',marginTop:20,paddingTop:16,borderTop:'1px solid #e8dfc8'}}>
          <a href="/" style={{color:'#C9A84C',fontSize:'.85rem',textDecoration:'none',fontWeight:700,display:'inline-flex',alignItems:'center',gap:6}}>
            ← Volver al inicio
          </a>
          <span style={{color:'#ccc',margin:'0 12px'}}>|</span>
          <a href="/catalogo/especimenes" style={{color:'#C9A84C',fontSize:'.85rem',textDecoration:'none',fontWeight:700}}>
            Ver catálogo
          </a>
        </div>
      </div>

      {/* Sellos */}
      <div style={{display:'flex',gap:12,marginTop:20,flexWrap:'wrap',justifyContent:'center'}}>
        {['SERFOR','CITES','SENASA','RUC 20447397804'].map(s=>(
          <span key={s} style={{background:'#f0ebe0',border:'1px solid #C9A84C',borderRadius:4,padding:'4px 10px',color:'#5a4a2a',fontSize:'.65rem',fontWeight:700}}>{s}</span>
        ))}
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div style={{background:'#FFFDF7',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif'}}>
        <div style={{textAlign:'center'}}>
          <img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:'contain',marginBottom:16}}/>
          <p style={{color:'#C9A84C',fontSize:'1rem'}}>Preparando tu pago...</p>
        </div>
      </div>
    }>
      <CheckoutForm/>
    </Suspense>
  )
}
