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
    style.innerHTML = '.kr-field-wrapper{background:#2A1A08!important;border:2px solid #C9A84C!important;border-radius:8px!important;margin-bottom:12px!important}.kr-field-wrapper input{color:#E8C97A!important;font-size:1rem!important;background:#2A1A08!important}.kr-label{background:#1A1209!important;color:#E8C97A!important;font-size:.8rem!important;font-weight:700!important;padding:4px 8px!important;border-radius:6px 6px 0 0!important}.kr-payment-button{background:#2E7D32!important;color:white!important;font-weight:700!important;border-radius:8px!important;font-size:1rem!important}'
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
    script.setAttribute('kr-theme', 'material')
    script.setAttribute('kr-theme-base-color', '#C9A84C')
    document.head.appendChild(script)
  }, [token, key])

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#8B6914,#6B4F10)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:16,fontFamily:'Georgia,serif'}}>
      <div style={{textAlign:'center',marginBottom:24}}>
        <img src="/logo-house-insects-peru.png" style={{width:90,height:90,objectFit:'contain',marginBottom:12,borderRadius:'50%',border:'3px solid #C9A84C'}}/>
        <h1 style={{color:'#1A1209',fontSize:'1.5rem',fontWeight:700,marginBottom:4}}>Completar Pago</h1>
        <p style={{color:'#5a4a2a',fontSize:'.8rem'}}>HOUSE INSECTS OF PERU · RUC 20447397804</p>
      </div>
      <div style={{background:'#F5EDD8',borderRadius:16,padding:28,width:'100%',maxWidth:460,boxShadow:'0 8px 40px rgba(0,0,0,0.3)',border:'1px solid #C9A84C'}}>
        <div style={{background:'#F0E6C8',border:'1px solid #C9A84C',borderRadius:10,padding:'16px 20px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{color:'#8B6914',fontSize:'.7rem',margin:0,fontWeight:700}}>TOTAL A PAGAR</p>
            <p style={{color:'#1A1209',fontWeight:700,fontSize:'1.6rem',margin:0}}>${parseFloat(total).toFixed(2)} USD</p>
          </div>
          <p style={{color:'#8B6914',fontSize:'.65rem',margin:0}}>🔒 Pago seguro</p>
        </div>
        <div className="kr-smart-form" kr-form-token={token}></div>
        <div style={{textAlign:'center',marginTop:20,paddingTop:16,borderTop:'1px solid #C9A84C'}}>
          <a href="/" style={{color:'#C9A84C',fontSize:'.85rem',textDecoration:'none',fontWeight:700,marginRight:16}}>← Inicio</a>
          <a href="/catalogo/especimenes" style={{color:'#C9A84C',fontSize:'.85rem',textDecoration:'none',fontWeight:700}}>Ver catálogo</a>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{background:'#FFFDF7',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#C9A84C',fontFamily:'Georgia,serif'}}>Preparando tu pago...</p></div>}>
      <CheckoutForm/>
    </Suspense>
  )
}
