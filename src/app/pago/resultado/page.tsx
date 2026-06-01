'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005'

function ResultContent() {
  const params     = useSearchParams()
  const isSuccess  = params.get('status') === 'PAID'
  const orderId    = params.get('orderId')
  const amount     = params.get('amount')
  const email      = params.get('email') || ''
  const courier    = params.get('courier') || ''
  const [factura,  setFactura]  = useState<any>(null)
  const [emitiendo, setEmitiendo] = useState(false)

  useEffect(() => {
    if (isSuccess && orderId && !factura) {
      emitirFactura()
    }
  }, [isSuccess, orderId])

  const emitirFactura = async () => {
    setEmitiendo(true)
    try {
      const res = await fetch('/api/sunat/emitir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accion: 'emitir',
          tipo: 'boleta',
          ordenId: orderId,
          metodoPago: 'izipay',
          moneda: 'USD',
          cliente: {
            nombre: params.get('nombre') || 'Cliente',
            email,
            documento: '00000000',
            tipoDoc: '1',
            direccion: params.get('direccion') || '',

cat > src/app/pago/resultado/page.tsx << 'ENDOFFILE'
'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005'

function ResultContent() {
  const params     = useSearchParams()
  const isSuccess  = params.get('status') === 'PAID'
  const orderId    = params.get('orderId')
  const amount     = params.get('amount')
  const email      = params.get('email') || ''
  const courier    = params.get('courier') || ''
  const [factura,  setFactura]  = useState<any>(null)
  const [emitiendo, setEmitiendo] = useState(false)

  useEffect(() => {
    if (isSuccess && orderId && !factura) {
      emitirFactura()
    }
  }, [isSuccess, orderId])

  const emitirFactura = async () => {
    setEmitiendo(true)
    try {
      const res = await fetch('/api/sunat/emitir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accion: 'emitir',
          tipo: 'boleta',
          ordenId: orderId,
          metodoPago: 'izipay',
          moneda: 'USD',
          cliente: {
            nombre: params.get('nombre') || 'Cliente',
            email,
            documento: '00000000',
            tipoDoc: '1',
            direccion: params.get('direccion') || '',
            ciudad: params.get('ciudad') || '',
            pais: params.get('pais') || 'PE',
          },
          items: [{
            descripcion: 'Especímenes biológicos secos — House Insects of Peru',
            cantidad: 1,
            precioUnitario: parseFloat(amount || '0') / 1.18,
            subtotal: parseFloat(amount || '0') / 1.18,
          }]
        })
      })
      const d = await res.json()
      if (d.ok) setFactura(d)
    } catch {}
    setEmitiendo(false)
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia,serif',
      padding: 20 }}>
      <div style={{ background: BG2, border: `1px solid ${isSuccess ? G : '#e53935'}`,
        borderRadius: 16, padding: 40, maxWidth: 500, width: '100%', textAlign: 'center' }}>

        {/* Icono */}
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {isSuccess ? '✅' : '❌'}
        </div>

        {/* Título */}
        <h1 style={{ color: isSuccess ? G : '#e53935', fontSize: 24,
          margin: '0 0 8px', fontWeight: 700 }}>
          {isSuccess ? '¡Pago Exitoso!' : 'Pago no procesado'}
        </h1>

        <p style={{ color: '#8a7040', fontSize: 13, marginBottom: 24 }}>
          {isSuccess
            ? 'Tu pedido ha sido confirmado. Recibirás los detalles por email.'
            : 'Intenta nuevamente o contáctanos por WhatsApp.'}
        </p>

        {/* Orden */}
        {isSuccess && orderId && (
          <div style={{ background: 'rgba(201,168,76,0.08)', border: `1px solid ${G}`,
            borderRadius: 10, padding: 16, marginBottom: 20, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: '#4a3a1a', textTransform: 'uppercase',
              letterSpacing: 1, marginBottom: 10 }}>Resumen del pedido</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: '#8a7040', fontSize: 12 }}>Nº Orden</span>
              <span style={{ color: G, fontWeight: 700, fontSize: 12 }}>{orderId}</span>
            </div>
            {amount && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#8a7040', fontSize: 12 }}>Total pagado</span>
                <span style={{ color: G, fontWeight: 700, fontSize: 16 }}>
                  ${parseFloat(amount).toFixed(2)} USD
                </span>
              </div>
            )}
            {courier && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#8a7040', fontSize: 12 }}>Courier</span>
                <span style={{ color: '#e8d5a3', fontSize: 12 }}>{courier.toUpperCase()}</span>
              </div>
            )}
          </div>
        )}

        {/* Factura SUNAT */}
        {isSuccess && (
          <div style={{ background: 'rgba(201,168,76,0.05)', border: `1px solid ${G}`,
            borderRadius: 10, padding: 14, marginBottom: 20, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: '#4a3a1a', textTransform: 'uppercase',
              letterSpacing: 1, marginBottom: 8 }}>📄 Comprobante SUNAT</div>
            {emitiendo ? (
              <div style={{ color: '#8a7040', fontSize: 12 }}>⏳ Emitiendo comprobante...</div>
            ) : factura ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: '#8a7040', fontSize: 12 }}>Nº Comprobante</span>
                  <span style={{ color: G, fontWeight: 700, fontSize: 13 }}>{factura.numero}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: '#8a7040', fontSize: 12 }}>Estado SUNAT</span>
                  <span style={{ color: factura.sunatOk ? '#4caf50' : '#ff9800', fontSize: 12 }}>
                    {factura.sunatOk ? '✅ Enviado a SUNAT' : '⏳ En proceso'}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#4a3a1a' }}>
                  RUC Emisor: 20447397804 · House Insects of Peru E.I.R.L.
                </div>
              </div>
            ) : (
              <div style={{ color: '#8a7040', fontSize: 12 }}>
                Comprobante siendo procesado...
              </div>
            )}
          </div>
        )}

        {/* WhatsApp confirmación */}
        {isSuccess && (
          <a href={`https://wa.me/51940699405?text=Hola!+Acabo+de+realizar+mi+pago.+Orden:+${orderId}+Total:+$${parseFloat(amount||'0').toFixed(2)}+USD+Courier:+${courier}`}
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', width: '100%', padding: '12px',
              background: 'linear-gradient(135deg,#128C7E,#075E54)',
              color: '#fff', borderRadius: 8, textDecoration: 'none',
              fontWeight: 700, fontSize: 14, marginBottom: 12,
              textAlign: 'center' }}>
            💬 Confirmar pedido por WhatsApp
          </a>
        )}

        {/* Botones */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <Link href="/" style={{ background: G, color: BG, padding: '10px 20px',
            borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 13 }}>
            🏠 Inicio
          </Link>
          <Link href="/catalogo/especimenes" style={{ background: 'rgba(201,168,76,0.1)',
            color: G, padding: '10px 20px', borderRadius: 8,
            textDecoration: 'none', fontWeight: 700, fontSize: 13,
            border: `1px solid ${G}` }}>
            🦋 Ver catálogo
          </Link>
          {!isSuccess && (
            <Link href="/" style={{ background: 'rgba(229,57,53,0.15)', color: '#e53935',
              padding: '10px 20px', borderRadius: 8, textDecoration: 'none',
              fontWeight: 700, fontSize: 13, border: '1px solid rgba(229,57,53,0.3)' }}>
              Reintentar
            </Link>
          )}
        </div>

        <div style={{ marginTop: 20, fontSize: 10, color: '#4a3a1a' }}>
          House Insects of Peru E.I.R.L. · RUC 20447397804 · SERFOR · CITES
        </div>
      </div>
    </div>
  )
}

export default function ResultadoPagoPage() {
  return (
    <Suspense fallback={
      <div style={{ background: '#0d0800', minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: '#C9A84C',
        fontFamily: 'Georgia,serif' }}>
        ⏳ Procesando pago...
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
