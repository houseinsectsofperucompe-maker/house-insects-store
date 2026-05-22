'use client'
import { useState } from 'react'

// ─── Tipos ────────────────────────────────────────────────────────────────────
type ItemCarrito = {
  n: string        // nombre especie
  p: number        // precio USD
  qty: number      // cantidad
  rubro: string    // categoría
}

type Courier = 'exportafacil' | 'ems' | 'dhl' | 'fedex' | ''
type Seguro = 'lloyds' | 'ship' | 'insurtech' | ''

// ─── Permisos por rubro ───────────────────────────────────────────────────────
function getPermisos(rubros: string[]): { serfor: boolean; fitosanitario: boolean; digesa: boolean } {
  const rubrosSet = new Set(rubros)
  const conSerfor = ['especimenes', 'cuadros', 'nocturnas', 'coleoptera', 'rarezas', 'maderas']
  const conFito = ['especimenes', 'cuadros', 'nocturnas', 'coleoptera', 'rarezas', 'semillas', 'hongos', 'frutas', 'alimentos', 'superalimentos']
  const conDigesa = ['semillas', 'hongos', 'frutas', 'alimentos', 'superalimentos', 'esencias']

  return {
    serfor: conSerfor.some(r => rubrosSet.has(r)),
    fitosanitario: conFito.some(r => rubrosSet.has(r)),
    digesa: conDigesa.some(r => rubrosSet.has(r)),
  }
}

// ─── Tiempos de courier ───────────────────────────────────────────────────────
const COURIER_INFO = {
  exportafacil: { nombre: 'Exporta Fácil (Serpost)', tiempo: '15-30 días', icono: '📦' },
  ems: { nombre: 'EMS Serpost', tiempo: '7-15 días', icono: '✈️' },
  dhl: { nombre: 'DHL Express', tiempo: '3-5 días', icono: '🚀' },
  fedex: { nombre: 'FedEx International', tiempo: '3-5 días', icono: '🚀' },
}

const SEGURO_INFO = {
  lloyds: { nombre: "Lloyd's London", icono: '🛡️' },
  ship: { nombre: 'Ship Insurance', icono: '🚢' },
  insurtech: { nombre: 'Insurtech Digital', icono: '📲' },
}

// ─── Componente principal ─────────────────────────────────────────────────────
interface CarritoProps {
  items: ItemCarrito[]
  onClose: () => void
  onPagar: (data: { items: ItemCarrito[]; total: number; courier: string; seguro: string; email: string }) => void
}

export default function CarritoCompras({ items: itemsIniciales, onClose, onPagar }: CarritoProps) {
  const [items, setItems] = useState<ItemCarrito[]>(itemsIniciales)
  const [courier, setCourier] = useState<Courier>('')
  const [seguro, setSeguro] = useState<Seguro>('')
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [pais, setPais] = useState('')
  const [paso, setPaso] = useState<'carrito' | 'liquidacion' | 'pago'>('carrito')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Cálculos
  const subtotalProductos = items.reduce((acc, i) => acc + i.p * i.qty, 0)
  const rubros = [...new Set(items.map(i => i.rubro))]
  const permisos = getPermisos(rubros)
  const costoSerfor = permisos.serfor ? 100 : 0
  const costoFito = permisos.fitosanitario ? 100 : 0
  const costoDigesa = permisos.digesa ? 80 : 0
  const costoTramites = costoSerfor + costoFito + costoDigesa
  const costoSeguro = seguro ? Math.round(subtotalProductos * 0.02) : 0
  const totalSinCourier = subtotalProductos + costoTramites + costoSeguro
  const MINIMO = 300

  const actualizarQty = (idx: number, qty: number) => {
    if (qty <= 0) {
      setItems(items.filter((_, i) => i !== idx))
    } else {
      setItems(items.map((item, i) => i === idx ? { ...item, qty } : item))
    }
  }

  const handlePagar = async () => {
    if (!email || !nombre || !pais) {
      setError('Por favor completa todos los campos')
      return
    }
    if (!courier) {
      setError('Por favor selecciona un courier')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/izipay/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalSinCourier,
          customerEmail: email,
          customerName: nombre,
          currency: 'USD',
          description: `HIP Export: ${items.length} items · ${courier.toUpperCase()}`,
        }),
      })
      const data = await res.json()
      if (data.success) {
        onPagar({ items, total: totalSinCourier, courier, seguro, email })
      } else {
        setError(data.error || 'Error al procesar el pago')
      }
    } catch {
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const S = {
    overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
    box: { background: 'linear-gradient(135deg, #1A1209 0%, #2A1F0A 100%)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' as const, fontFamily: 'Georgia,serif' },
    header: { padding: '20px 24px 16px', borderBottom: '1px solid rgba(201,168,76,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    title: { color: '#E8C97A', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '.04em' },
    body: { padding: '20px 24px' },
    label: { color: 'rgba(232,201,122,0.5)', fontSize: '.65rem', letterSpacing: '.08em', marginBottom: 4 },
    value: { color: '#E8C97A', fontSize: '.95rem', fontWeight: 700 },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(201,168,76,0.08)' },
    btn: { background: '#C9A84C', color: '#1A1209', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: '.9rem', fontFamily: 'Georgia,serif', width: '100%', marginTop: 12 },
    btnSecondary: { background: 'transparent', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: '.85rem', fontFamily: 'Georgia,serif', width: '100%', marginTop: 8 },
    input: { width: '100%', padding: '10px 14px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 6, color: '#E8C97A', fontSize: '.85rem', fontFamily: 'Georgia,serif', outline: 'none', boxSizing: 'border-box' as const, marginBottom: 10 },
    badge: { background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 4, padding: '4px 10px', color: '#C9A84C', fontSize: '.7rem', display: 'inline-block' },
    courierBtn: (active: boolean) => ({ background: active ? 'rgba(201,168,76,0.2)' : 'rgba(201,168,76,0.05)', border: `1px solid ${active ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`, borderRadius: 8, padding: '10px 14px', cursor: 'pointer', color: active ? '#E8C97A' : 'rgba(232,201,122,0.5)', fontFamily: 'Georgia,serif', fontSize: '.78rem', textAlign: 'left' as const, transition: 'all 0.15s' }),
  }

  if (items.length === 0) {
    return (
      <div style={S.overlay} onClick={onClose}>
        <div style={{ ...S.box, padding: 40, textAlign: 'center' }} onClick={e => e.stopPropagation()}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>🦋</div>
          <p style={{ color: '#E8C97A', marginBottom: 20 }}>Tu carrito está vacío</p>
          <button onClick={onClose} style={S.btn}>Explorar catálogo</button>
        </div>
      </div>
    )
  }

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.box} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={S.header}>
          <div>
            <div style={S.title}>
              {paso === 'carrito' && '🛒 Carrito de Compras'}
              {paso === 'liquidacion' && '📋 Liquidación de Compra'}
              {paso === 'pago' && '💳 Datos de Envío y Pago'}
            </div>
            <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', marginTop: 2 }}>HOUSE INSECTS OF PERU · RUC 20447397804</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(232,201,122,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>

        <div style={S.body}>

          {/* ─── PASO 1: CARRITO ─── */}
          {paso === 'carrito' && (
            <>
              {items.map((item, idx) => (
                <div key={idx} style={S.row}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#E8C97A', fontSize: '.78rem', fontStyle: 'italic', marginBottom: 2 }}>{item.n}</div>
                    <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.62rem' }}>${item.p} USD c/u</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button onClick={() => actualizarQty(idx, item.qty - 1)} style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4, width: 26, height: 26, color: '#C9A84C', cursor: 'pointer', fontSize: '.9rem' }}>−</button>
                    <span style={{ color: '#E8C97A', fontSize: '.85rem', minWidth: 20, textAlign: 'center' }}>{item.qty}</span>
                    <button onClick={() => actualizarQty(idx, item.qty + 1)} style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 4, width: 26, height: 26, color: '#C9A84C', cursor: 'pointer', fontSize: '.9rem' }}>+</button>
                    <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '.85rem', minWidth: 55, textAlign: 'right' }}>${(item.p * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: 16, padding: '12px 0', borderTop: '1px solid rgba(201,168,76,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.75rem' }}>Subtotal productos</span>
                  <span style={{ color: '#E8C97A', fontWeight: 700 }}>${subtotalProductos.toFixed(2)} USD</span>
                </div>

                {subtotalProductos < MINIMO && (
                  <div style={{ background: 'rgba(255,100,100,0.08)', border: '1px solid rgba(255,100,100,0.2)', borderRadius: 6, padding: '10px 14px', marginTop: 10 }}>
                    <p style={{ color: '#ff8080', fontSize: '.75rem', margin: 0 }}>
                      ⚠️ Pedido mínimo de exportación: <strong>$300 USD</strong><br />
                      Te faltan <strong>${(MINIMO - subtotalProductos).toFixed(2)}</strong> para continuar.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setPaso('liquidacion')}
                disabled={subtotalProductos < MINIMO}
                style={{ ...S.btn, opacity: subtotalProductos < MINIMO ? 0.4 : 1, cursor: subtotalProductos < MINIMO ? 'not-allowed' : 'pointer' }}
              >
                Ver liquidación de compra →
              </button>
              <button onClick={onClose} style={S.btnSecondary}>Seguir comprando</button>
            </>
          )}

          {/* ─── PASO 2: LIQUIDACIÓN ─── */}
          {paso === 'liquidacion' && (
            <>
              {/* Productos */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', letterSpacing: '.08em', marginBottom: 8 }}>PRODUCTOS SELECCIONADOS</div>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                    <span style={{ color: 'rgba(232,201,122,0.7)', fontSize: '.72rem', fontStyle: 'italic' }}>{item.qty}x {item.n}</span>
                    <span style={{ color: '#C9A84C', fontSize: '.72rem', fontWeight: 700 }}>${(item.p * item.qty).toFixed(2)}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8 }}>
                  <span style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.75rem' }}>Subtotal productos</span>
                  <span style={{ color: '#E8C97A', fontWeight: 700 }}>${subtotalProductos.toFixed(2)}</span>
                </div>
              </div>

              {/* Trámites obligatorios */}
              <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', letterSpacing: '.08em', marginBottom: 8 }}>TRÁMITES DE EXPORTACIÓN (OBLIGATORIOS)</div>
                {costoSerfor > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>🌿 SERFOR — Permiso CITES</span>
                    <span style={{ color: '#C9A84C', fontSize: '.75rem' }}>${costoSerfor}</span>
                  </div>
                )}
                {costoFito > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>🔬 Fitosanitario SENASA</span>
                    <span style={{ color: '#C9A84C', fontSize: '.75rem' }}>${costoFito}</span>
                  </div>
                )}
                {costoDigesa > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                    <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>📋 DIGESA</span>
                    <span style={{ color: '#C9A84C', fontSize: '.75rem' }}>${costoDigesa}</span>
                  </div>
                )}
                <div style={{ fontSize: '.62rem', color: 'rgba(232,201,122,0.3)', marginTop: 8, lineHeight: 1.5 }}>
                  Tiempo de expedición: 5-9 días hábiles
                </div>
              </div>

              {/* Courier */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', letterSpacing: '.08em', marginBottom: 8 }}>SELECCIONA TU COURIER</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {(Object.entries(COURIER_INFO) as [Courier, typeof COURIER_INFO[keyof typeof COURIER_INFO]][]).map(([key, info]) => (
                    <button key={key} onClick={() => setCourier(key)} style={S.courierBtn(courier === key)}>
                      <div style={{ fontSize: '1.1rem', marginBottom: 2 }}>{info.icono}</div>
                      <div style={{ fontWeight: 700, marginBottom: 2 }}>{info.nombre}</div>
                      <div style={{ fontSize: '.62rem', opacity: 0.7 }}>⏱ {info.tiempo}</div>
                    </button>
                  ))}
                </div>
                <div style={{ fontSize: '.62rem', color: 'rgba(232,201,122,0.3)', marginTop: 6 }}>
                  * El costo del courier se cotiza según peso y destino. Te contactaremos por WhatsApp para confirmar.
                </div>
              </div>

              {/* Seguro opcional */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', letterSpacing: '.08em', marginBottom: 6 }}>🛡️ PROTEGE TU PEDIDO (OPCIONAL)</div>
                <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: 8, padding: '10px 14px', marginBottom: 8 }}>
                  <p style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.72rem', margin: 0, lineHeight: 1.6 }}>
                    Para mayor tranquilidad, te ofrecemos seguro de envío internacional. Tu colección amazónica merece llegar perfecta a su destino. Cubre pérdida, daño o demora en tránsito.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 6 }}>
                  {(Object.entries(SEGURO_INFO) as [Seguro, typeof SEGURO_INFO[keyof typeof SEGURO_INFO]][]).map(([key, info]) => (
                    <button key={key} onClick={() => setSeguro(seguro === key ? '' : key)} style={S.courierBtn(seguro === key)}>
                      <div>{info.icono}</div>
                      <div style={{ fontSize: '.65rem', fontWeight: 700 }}>{info.nombre}</div>
                    </button>
                  ))}
                </div>
                {seguro && <div style={{ color: '#C9A84C', fontSize: '.72rem', textAlign: 'right' }}>Seguro 2%: +${costoSeguro} USD</div>}
              </div>

              {/* Total */}
              <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
                <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.62rem', letterSpacing: '.08em', marginBottom: 10 }}>RESUMEN DE LIQUIDACIÓN</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>Productos</span>
                  <span style={{ color: '#E8C97A', fontSize: '.75rem' }}>${subtotalProductos.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>Trámites exportación</span>
                  <span style={{ color: '#E8C97A', fontSize: '.75rem' }}>${costoTramites}</span>
                </div>
                {seguro && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>Seguro ({SEGURO_INFO[seguro as keyof typeof SEGURO_INFO]?.nombre})</span>
                    <span style={{ color: '#E8C97A', fontSize: '.75rem' }}>${costoSeguro}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.75rem' }}>Courier</span>
                  <span style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.72rem' }}>A cotizar por WhatsApp</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', marginTop: 8, paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#E8C97A', fontWeight: 700 }}>TOTAL A PAGAR HOY</span>
                  <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '1.1rem' }}>${totalSinCourier.toFixed(2)} USD</span>
                </div>
                <div style={{ fontSize: '.6rem', color: 'rgba(232,201,122,0.3)', marginTop: 6 }}>
                  Ley Amazónica N°27037 · Exonerado de IGV · MYPE · RUC 20447397804
                </div>
              </div>

              {/* Formas de pago */}
              <div style={{ marginBottom: 16, textAlign: 'center' }}>
                <div style={{ color: 'rgba(232,201,122,0.3)', fontSize: '.62rem', letterSpacing: '.08em', marginBottom: 6 }}>FORMAS DE PAGO ACEPTADAS</div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['VISA', 'MASTERCARD', 'AMEX', 'DINERS', 'VISA DÉBITO', 'MC DÉBITO'].map(card => (
                    <span key={card} style={S.badge}>{card}</span>
                  ))}
                </div>
              </div>

              <button onClick={() => setPaso('pago')} disabled={!courier} style={{ ...S.btn, opacity: !courier ? 0.4 : 1, cursor: !courier ? 'not-allowed' : 'pointer' }}>
                Continuar al pago →
              </button>
              <button onClick={() => setPaso('carrito')} style={S.btnSecondary}>← Volver al carrito</button>
            </>
          )}

          {/* ─── PASO 3: DATOS Y PAGO ─── */}
          {paso === 'pago' && (
            <>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', letterSpacing: '.08em', marginBottom: 10 }}>DATOS DE CONTACTO Y ENVÍO</div>
                <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" style={S.input} />
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" style={S.input} />
                <input value={pais} onChange={e => setPais(e.target.value)} placeholder="País de destino" style={S.input} />
              </div>

              {/* Resumen final */}
              <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.72rem' }}>{items.length} especie(s)</span>
                  <span style={{ color: '#C9A84C', fontSize: '.72rem', fontWeight: 700 }}>${subtotalProductos.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.72rem' }}>Trámites</span>
                  <span style={{ color: '#C9A84C', fontSize: '.72rem' }}>${costoTramites}</span>
                </div>
                {courier && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.72rem' }}>Courier</span>
                    <span style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.7rem' }}>{COURIER_INFO[courier as keyof typeof COURIER_INFO]?.nombre}</span>
                  </div>
                )}
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#E8C97A', fontWeight: 700, fontSize: '.85rem' }}>TOTAL</span>
                  <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '1.1rem' }}>${totalSinCourier.toFixed(2)} USD</span>
                </div>
              </div>

              {error && (
                <div style={{ background: 'rgba(255,80,80,0.08)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 6, padding: '10px 14px', marginBottom: 12 }}>
                  <p style={{ color: '#ff8080', fontSize: '.75rem', margin: 0 }}>⚠️ {error}</p>
                </div>
              )}

              <button onClick={handlePagar} disabled={loading} style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Procesando...' : `💳 Pagar $${totalSinCourier.toFixed(2)} USD`}
              </button>
              <button onClick={() => setPaso('liquidacion')} style={S.btnSecondary}>← Volver</button>

              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <div style={{ color: 'rgba(232,201,122,0.3)', fontSize: '.6rem' }}>🔒 Pago seguro · Izipay · VISA · MASTERCARD · AMEX · DINERS</div>
                <div style={{ color: 'rgba(232,201,122,0.2)', fontSize: '.58rem', marginTop: 4 }}>
                  SERFOR · CITES · SENASA · RUC 20447397804 · Ley Amazónica N°27037
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
