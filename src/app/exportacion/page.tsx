'use client'
import { useState } from 'react'

const MATRIZ = [
  { zona: '🌎 América del Norte', paises: 'USA, Canadá, México', serpost: '18-23', dhl: '10-12', aramex: '15-18' },
  { zona: '🌎 América del Sur', paises: 'Brasil, Argentina, Colombia, Ecuador...', serpost: '16-20', dhl: '10-11', aramex: '15-17' },
  { zona: '🌍 Europa', paises: 'España, Alemania, Francia, UK...', serpost: '20-26', dhl: '11-13', aramex: '13-16' },
  { zona: '🌏 Asia', paises: 'China, Japón, Corea, India...', serpost: '23-30', dhl: '12-14', aramex: '13-16' },
  { zona: '🌙 Medio Oriente', paises: 'UAE, Arabia Saudita, Qatar...', serpost: '26-33', dhl: '13-15', aramex: '12-14 ⭐' },
  { zona: '🌏 Oceanía / África', paises: 'Australia, NZ, Sudáfrica...', serpost: '28-38', dhl: '14-16', aramex: '15-18' },
]

const CERTS = [
  { icon: '🌿', nombre: 'SERFOR', desc: 'Permiso de exportación de fauna silvestre', tiempo: '3 días hábiles', url: 'https://serfor.gob.pe', color: '#2d6a4f' },
  { icon: '🦋', nombre: 'CITES', desc: 'Convención sobre el Comercio Internacional', tiempo: 'Incluido en SERFOR', url: 'https://cites.org', color: '#1d6fa4' },
  { icon: '🔬', nombre: 'SENASA', desc: 'Certificado Fitosanitario Internacional', tiempo: '5 días hábiles', url: 'https://senasa.gob.pe', color: '#e8a000' },
  { icon: '📋', nombre: 'DIGESA', desc: 'Autorización Sanitaria para alimentos/esencias', tiempo: '3-5 días hábiles', url: 'https://digesa.minsa.gob.pe', color: '#c8102e' },
  { icon: '🧾', nombre: 'SUNAT', desc: 'Factura electrónica con QR verificable', tiempo: 'Inmediato', url: 'https://sunat.gob.pe', color: '#6b21a8' },
  { icon: '📮', nombre: 'Exporta Fácil', desc: 'Declaración DEF para MYPE exportadores', tiempo: 'Inmediato online', url: 'https://exportafacil.sunat.gob.pe', color: '#1d4ed8' },
]

const COURIERS = [
  { icon: '📦', nombre: 'Exporta Fácil', sub: 'Serpost · Económico', tiempo: '15-30 días', color: '#2d6a4f', recomendado: false },
  { icon: '✈️', nombre: 'EMS Serpost', sub: 'Express Internacional', tiempo: '7-15 días', color: '#1d6fa4', recomendado: false },
  { icon: '🚀', nombre: 'DHL Express', sub: 'Premium Mundial', tiempo: '3-5 días', color: '#FFCC00', colorText: '#1A1209', recomendado: true },
  { icon: '🚀', nombre: 'FedEx Intl.', sub: 'Premium Mundial', tiempo: '3-5 días', color: '#4d148c', recomendado: true },
  { icon: '📮', nombre: 'UPS Worldwide', sub: 'Confiable Global', tiempo: '3-7 días', color: '#351c15', recomendado: false },
  { icon: '🌍', nombre: 'Aramex', sub: 'Especialista Oriente Medio & Asia', tiempo: '4-10 días', color: '#c8102e', recomendado: true },
]

const SEGUROS = [
  { icon: '🛡️', nombre: "Lloyd's of London", desc: 'La aseguradora más antigua del mundo. Cobertura premium para especímenes únicos.', costo: '2% del valor' },
  { icon: '🚢', nombre: 'Ship Insurance', desc: 'Especialista en carga marítima y aérea. Cubre pérdida, daño y demora.', costo: '2% del valor' },
  { icon: '📲', nombre: 'Insurtech Digital', desc: 'Cobertura digital instantánea. Reclamos en línea 24/7.', costo: '2% del valor' },
]

const PAGOS = [
  { icon: '💳', nombre: 'Izipay', desc: 'VISA · MASTERCARD · AMEX · DINERS', activo: true },
  { icon: '🌐', nombre: 'Stripe', desc: 'Tarjetas internacionales', activo: false },
  { icon: '🌍', nombre: 'WorldFirst', desc: 'Transferencias internacionales', activo: false },
  { icon: '💚', nombre: 'WeChat Pay', desc: 'Pagos desde China', activo: false },
  { icon: '🔵', nombre: 'Alipay', desc: 'Pagos desde China y Asia', activo: false },
  { icon: '💰', nombre: 'Wise', desc: 'Transferencias internacionales baratas', activo: false },
  { icon: '💵', nombre: 'Payoneer', desc: 'Pagos B2B internacionales', activo: false },
]

export default function ExportacionPage() {
  const [tabActiva, setTabActiva] = useState('logistica')
  const G = '#C9A84C', T = '#E8C97A', BG = '#1A1209'

  const tabs = [
    { id: 'logistica', label: '⏱ Tiempos' },
    { id: 'certificaciones', label: '📋 Certificaciones' },
    { id: 'couriers', label: '🚚 Couriers' },
    { id: 'seguros', label: '🛡️ Seguros' },
    { id: 'pagos', label: '💳 Pagos' },
    { id: 'legal', label: '📜 Legal' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: 'Georgia,serif', padding: '0 0 60px' }}>
      
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg,#221800,#1A1209)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '24px 20px', textAlign: 'center' }}>
        <a href="/" style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.75rem', textDecoration: 'none', display: 'block', marginBottom: 16 }}>← Volver al inicio</a>
        <img src="/logo-house-insects-peru.png" style={{ width: 80, height: 80, objectFit: 'contain', marginBottom: 12, borderRadius: '50%', border: '2px solid rgba(201,168,76,0.4)' }}/>
        <h1 style={{ color: T, fontSize: 'clamp(1.4rem,4vw,2.2rem)', fontWeight: 300, marginBottom: 6 }}>Exportación Internacional</h1>
        <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.8rem', marginBottom: 4 }}>HOUSE INSECTS OF PERU E.I.R.L. · RUC 20447397804</p>
        <p style={{ color: 'rgba(232,201,122,0.35)', fontSize: '.72rem' }}>Ley Amazónica N°27037 · CITES · SERFOR · SENASA · DIGESA</p>
      </div>

      {/* Aviso importante */}
      <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', margin: '16px', borderRadius: 10, padding: '14px 16px' }}>
        <p style={{ color: T, fontSize: '.85rem', margin: 0, lineHeight: 1.7, textAlign: 'center' }}>
          ⏱ <strong style={{color: G}}>Fase 1 — Origen Perú: 8 días hábiles fijos</strong><br/>
          <span style={{color:'rgba(232,201,122,0.6)',fontSize:'.75rem'}}>SERFOR 3 días + SENASA 5 días · Antes del despacho internacional</span>
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setTabActiva(tab.id)} style={{
            background: tabActiva === tab.id ? G : 'rgba(201,168,76,0.08)',
            color: tabActiva === tab.id ? BG : 'rgba(232,201,122,0.6)',
            border: `1px solid ${tabActiva === tab.id ? G : 'rgba(201,168,76,0.2)'}`,
            borderRadius: 20, padding: '8px 14px', cursor: 'pointer',
            fontFamily: 'Georgia,serif', fontSize: '.75rem', fontWeight: 700,
            whiteSpace: 'nowrap', transition: 'all 0.15s'
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 16px' }}>

        {/* TAB: LOGISTICA */}
        {tabActiva === 'logistica' && (
          <div>
            <h2 style={{ color: G, fontSize: '1rem', fontWeight: 400, marginBottom: 16, letterSpacing: '.06em' }}>✈️ MATRIZ GLOBAL DE TRAZABILIDAD</h2>
            <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.75rem', marginBottom: 16, lineHeight: 1.6 }}>
              Tiempo total estimado en días hábiles desde inicio de trámites en Perú hasta entrega al cliente final.
              Incluye <strong style={{color:G}}>8 días fijos de origen</strong> (SERFOR + SENASA).
            </p>
            
            {/* Tabla */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.78rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(201,168,76,0.15)' }}>
                    <th style={{ color: G, padding: '10px 8px', textAlign: 'left', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 700 }}>Destino</th>
                    <th style={{ color: G, padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 700 }}>📦 Serpost/EMS</th>
                    <th style={{ color: G, padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 700 }}>🚀 DHL/FedEx/UPS</th>
                    <th style={{ color: G, padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.2)', fontWeight: 700 }}>🌍 Aramex</th>
                  </tr>
                </thead>
                <tbody>
                  {MATRIZ.map((row, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? 'rgba(201,168,76,0.03)' : 'transparent' }}>
                      <td style={{ color: T, padding: '10px 8px', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                        <div style={{ fontWeight: 700, fontSize: '.8rem' }}>{row.zona}</div>
                        <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem', marginTop: 2 }}>{row.paises}</div>
                      </td>
                      <td style={{ color: 'rgba(232,201,122,0.6)', padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>{row.serpost} días</td>
                      <td style={{ color: '#7ec87e', padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.06)', fontWeight: 700 }}>{row.dhl} días</td>
                      <td style={{ color: G, padding: '10px 8px', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>{row.aramex} días</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.15)', borderRadius: 8, padding: '12px 14px', marginTop: 16 }}>
              <p style={{ color: 'rgba(232,201,122,0.6)', fontSize: '.72rem', margin: 0, lineHeight: 1.7 }}>
                ⚠️ <strong>Puntos críticos:</strong> Los tiempos asumen que la aduana de destino libera el paquete en forma ordinaria.
                En Asia y Medio Oriente, errores en la factura pueden retener el paquete 3-5 días adicionales.
                Siempre usa el código HTS correcto en la guía aérea.
              </p>
            </div>
          </div>
        )}

        {/* TAB: CERTIFICACIONES */}
        {tabActiva === 'certificaciones' && (
          <div>
            <h2 style={{ color: G, fontSize: '1rem', fontWeight: 400, marginBottom: 16, letterSpacing: '.06em' }}>📋 CERTIFICACIONES Y PERMISOS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CERTS.map((cert, i) => (
                <div key={i} style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 10, padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.8rem' }}>{cert.icon}</span>
                    <div>
                      <div style={{ color: T, fontWeight: 700, fontSize: '.9rem' }}>{cert.nombre}</div>
                      <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.65rem' }}>⏱ {cert.tiempo}</div>
                    </div>
                    <a href={cert.url} target="_blank" style={{ marginLeft: 'auto', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 4, padding: '4px 10px', color: G, fontSize: '.65rem', textDecoration: 'none' }}>Ver sitio →</a>
                  </div>
                  <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.75rem', margin: 0, lineHeight: 1.6 }}>{cert.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 8, padding: '12px 14px', marginTop: 16 }}>
              <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.72rem', margin: 0, lineHeight: 1.8 }}>
                📱 <strong style={{color:G}}>QR de verificación:</strong> Cada envío incluye QR verificable que las aduanas internacionales
                pueden escanear para verificar la autenticidad de los permisos SERFOR, CITES y SENASA en tiempo real.
              </p>
            </div>
          </div>
        )}

        {/* TAB: COURIERS */}
        {tabActiva === 'couriers' && (
          <div>
            <h2 style={{ color: G, fontSize: '1rem', fontWeight: 400, marginBottom: 16, letterSpacing: '.06em' }}>🚚 COURIERS INTERNACIONALES</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COURIERS.map((c, i) => (
                <div key={i} style={{ background: 'rgba(201,168,76,0.05)', border: `1px solid ${c.recomendado ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.12)'}`, borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{c.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: T, fontWeight: 700, fontSize: '.85rem' }}>{c.nombre}</span>
                      {c.recomendado && <span style={{ background: 'rgba(201,168,76,0.2)', color: G, fontSize: '.6rem', padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>⭐ RECOMENDADO</span>}
                    </div>
                    <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.7rem', marginTop: 2 }}>{c.sub}</div>
                  </div>
                  <div style={{ color: G, fontSize: '.8rem', fontWeight: 700, textAlign: 'right', flexShrink: 0 }}>⏱ {c.tiempo}</div>
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 8, padding: '12px 14px', marginTop: 16 }}>
              <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.72rem', margin: 0, lineHeight: 1.8 }}>
                💡 El costo exacto del courier se cotiza según peso y destino.
                Peso estimado: <strong style={{color:G}}>0.1 kg por espécimen</strong> + 0.5 kg embalaje especial (caja rígida + algodón + foam).
                Contáctanos por WhatsApp para cotización inmediata.
              </p>
            </div>
          </div>
        )}

        {/* TAB: SEGUROS */}
        {tabActiva === 'seguros' && (
          <div>
            <h2 style={{ color: G, fontSize: '1rem', fontWeight: 400, marginBottom: 16, letterSpacing: '.06em' }}>🛡️ SEGUROS DE ENVÍO INTERNACIONAL</h2>
            <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.78rem', marginBottom: 16, lineHeight: 1.7 }}>
              Tu colección amazónica merece llegar perfecta. Ofrecemos cobertura total contra pérdida, daño y demora en tránsito.
              <strong style={{color:G}}> Solo 2% del valor declarado.</strong>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {SEGUROS.map((s, i) => (
                <div key={i} style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 10, padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: T, fontWeight: 700, fontSize: '.9rem' }}>{s.nombre}</div>
                      <div style={{ color: G, fontSize: '.7rem', marginTop: 2 }}>{s.costo}</div>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.75rem', margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PAGOS */}
        {tabActiva === 'pagos' && (
          <div>
            <h2 style={{ color: G, fontSize: '1rem', fontWeight: 400, marginBottom: 16, letterSpacing: '.06em' }}>💳 FORMAS DE PAGO</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {PAGOS.map((p, i) => (
                <div key={i} style={{ background: p.activo ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.03)', border: `1px solid ${p.activo ? 'rgba(201,168,76,0.4)' : 'rgba(201,168,76,0.1)'}`, borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: 6 }}>{p.icon}</div>
                  <div style={{ color: p.activo ? T : 'rgba(232,201,122,0.4)', fontWeight: 700, fontSize: '.8rem', marginBottom: 4 }}>{p.nombre}</div>
                  <div style={{ color: 'rgba(232,201,122,0.35)', fontSize: '.65rem', marginBottom: 8 }}>{p.desc}</div>
                  <span style={{ background: p.activo ? 'rgba(46,125,50,0.2)' : 'rgba(201,168,76,0.08)', color: p.activo ? '#7ec87e' : 'rgba(232,201,122,0.3)', fontSize: '.6rem', padding: '3px 8px', borderRadius: 10, fontWeight: 700 }}>
                    {p.activo ? '✅ ACTIVO' : '⏳ PRÓXIMAMENTE'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: LEGAL */}
        {tabActiva === 'legal' && (
          <div>
            <h2 style={{ color: G, fontSize: '1rem', fontWeight: 400, marginBottom: 16, letterSpacing: '.06em' }}>📜 MARCO LEGAL</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { titulo: 'Ley Amazónica N°27037', desc: 'Exoneración de IGV para empresas ubicadas en la Amazonía peruana. House Insects of Peru E.I.R.L. opera desde Tingo María, Huánuco — zona beneficiada por esta ley.' },
                { titulo: 'MYPE — Micro y Pequeña Empresa', desc: 'Empresa formalmente registrada en SUNAT con régimen MYPE. Acceso a beneficios de exportación simplificada.' },
                { titulo: 'Exporta Fácil — SUNAT', desc: 'Mecanismo de exportación simplificado para MYPE. Permite exportar hasta USD 7,500 por envío sin agente aduanero.' },
                { titulo: 'CITES — Apéndice II', desc: 'Todos los especímenes se exportan bajo los permisos CITES correspondientes. Fauna criada y colectada legalmente en Perú.' },
                { titulo: 'Código HTS de Exportación', desc: 'Insectos secos: 0106.90.99. Uso correcto del código arancelario en todas las guías aéreas para evitar retención en aduanas.' },
                { titulo: 'Inspección Física en Aduana', desc: 'El canal de control aduanero para salida de fauna biológica seca requiere aforo físico previo. Programamos recolección el mismo día de emisión del fitosanitario.' },
              ].map((item, i) => (
                <div key={i} style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ color: G, fontWeight: 700, fontSize: '.82rem', marginBottom: 6 }}>📌 {item.titulo}</div>
                  <p style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.75rem', margin: 0, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '32px 16px 16px', borderTop: '1px solid rgba(201,168,76,0.1)', marginTop: 32 }}>
        <p style={{ color: 'rgba(232,201,122,0.25)', fontSize: '.65rem', lineHeight: 1.8 }}>
          © 2026 HOUSE INSECTS OF PERU E.I.R.L.<br/>
          TINGO MARÍA, HUÁNUCO, PERÚ · EXPORTACIÓN MUNDIAL<br/>
          RUC 20447397804 · CITES · SERFOR · SENASA · DIGESA
        </p>
      </div>
    </div>
  )
}
