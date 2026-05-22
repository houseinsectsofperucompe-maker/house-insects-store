'use client'
import { useState } from 'react'

interface Props { precio: number; descripcion: string }

export default function BannerPago({ precio, descripcion }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [show, setShow] = useState(false)

  const pagar = async () => {
    if (!email || !nombre) { setError('Completa nombre y email'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/izipay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: precio, customerEmail: email, customerName: nombre, currency: 'USD', description: descripcion }),
      })
      const data = await res.json()
      if (data.success) alert('✅ Pago procesado. Te contactaremos pronto.')
      else setError(data.error || 'Error al procesar')
    } catch { setError('Error de conexión') }
    finally { setLoading(false) }
  }

  const G = '#C9A84C', T = '#E8C97A', BG = '#1A1209'
  const inp = { width:'100%', padding:'10px 14px', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.25)', borderRadius:6, color:T, fontSize:'.85rem', fontFamily:'Georgia,serif', outline:'none', boxSizing:'border-box' as const, marginBottom:8 }

  return (
    <div style={{ width:'100%', marginTop:12 }}>
      {!show ? (
        <button onClick={() => setShow(true)} style={{ background:G, color:BG, border:'none', borderRadius:6, padding:'12px 28px', fontWeight:700, cursor:'pointer', fontSize:'.9rem', fontFamily:'Georgia,serif', width:'100%' }}>
          💳 Pagar con Tarjeta — ${precio} USD
        </button>
      ) : (
        <div style={{ background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:8, padding:16, marginTop:8 }}>
          <div style={{ color:'rgba(232,201,122,0.4)', fontSize:'.65rem', letterSpacing:'.08em', marginBottom:10 }}>DATOS DE PAGO</div>
          <input value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Nombre completo *" style={inp}/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Correo electrónico *" type="email" style={inp}/>
          {error && <p style={{ color:'#ff8080', fontSize:'.75rem', marginBottom:8 }}>⚠️ {error}</p>}
          <button onClick={pagar} disabled={loading} style={{ background:loading?'rgba(201,168,76,0.3)':G, color:BG, border:'none', borderRadius:6, padding:'12px 0', fontWeight:700, cursor:loading?'not-allowed':'pointer', fontSize:'.9rem', fontFamily:'Georgia,serif', width:'100%', marginBottom:6 }}>
            {loading ? '⏳ Procesando...' : `💳 Pagar $${precio} USD`}
          </button>
          <button onClick={() => setShow(false)} style={{ background:'transparent', color:G, border:'1px solid rgba(201,168,76,0.3)', borderRadius:6, padding:'8px 0', fontWeight:700, cursor:'pointer', fontSize:'.8rem', fontFamily:'Georgia,serif', width:'100%' }}>
            Cancelar
          </button>
          <div style={{ color:'rgba(232,201,122,0.2)', fontSize:'.6rem', textAlign:'center', marginTop:8 }}>🔒 Pago seguro · Izipay · VISA · MASTERCARD · AMEX</div>
        </div>
      )}
    </div>
  )
}
