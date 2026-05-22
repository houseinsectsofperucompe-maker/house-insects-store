'use client'
import { useEffect, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function CheckoutForm() {
  const params = useSearchParams()
  const token = params.get('token') || ''
  const key = params.get('key') || ''
  const total = params.get('total') || '0'
  const courier = params.get('courier') || ''

  useEffect(() => {
    if (!token || !key) return
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

  const G = '#C9A84C', T = '#E8C97A'
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',display:'flex',alignItems:'center',justifyContent:'center',padding:16,fontFamily:'Georgia,serif'}}>
      <div style={{background:'linear-gradient(160deg,#1A1209,#221800)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:12,padding:32,width:'100%',maxWidth:480}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:'contain',marginBottom:12}}/>
          <h1 style={{color:T,fontSize:'1.3rem',fontWeight:400,marginBottom:4}}>Completar Pago</h1>
          <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem'}}>HOUSE INSECTS OF PERU · RUC 20447397804</p>
        </div>
        <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:'12px 16px',marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem'}}>Total a pagar</span>
          <span style={{color:G,fontWeight:700,fontSize:'1.2rem'}}>${parseFloat(total).toFixed(2)} USD</span>
        </div>
        <div className="kr-smart-form" kr-form-token={token}></div>
        <div style={{textAlign:'center',marginTop:16}}>
          <p style={{color:'rgba(232,201,122,0.2)',fontSize:'.62rem'}}>🔒 Pago seguro · Izipay · VISA · MASTERCARD · AMEX · DINERS</p>
          <a href="/catalogo/especimenes" style={{color:'rgba(232,201,122,0.3)',fontSize:'.7rem',textDecoration:'none',display:'block',marginTop:8}}>← Volver al catálogo</a>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return <Suspense fallback={<div style={{background:'#1A1209',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#C9A84C',fontFamily:'Georgia,serif'}}>Cargando...</div>}><CheckoutForm/></Suspense>
}
