'use client'
import { useState } from 'react'

export default function CuadrosPage() {
  const [vista, setVista] = useState('frente')
  const [composicion, setComposicion] = useState('individual')
  const [marco, setMarco] = useState('rectangular')
  const [vidrio, setVidrio] = useState('normal')

  const precioExtra = vidrio === 'uv' ? 20 : vidrio === 'resina' ? 35 : 0

  const tiposCuadros = [
    { id: 'rectangular', icon: '⬛', nombre: 'Rectangular & Cuadrado', desc: 'Marco clásico de ebanistería · El más elegante · Para cualquier espacio' },
    { id: 'redondo',     icon: '⭕', nombre: 'Redondo & Oval',         desc: 'Marcos curvos de lujo · Muy pedidos en Europa · Diseño exclusivo' },
    { id: 'triangular',  icon: '🔺', nombre: 'Triangular',             desc: 'Diseño moderno geométrico · Arte contemporáneo · Vanguardia' },
    { id: 'cubo',        icon: '📦', nombre: 'Cubo & Urna 3D',         desc: 'Caja de cristal · Vista 360° · Ver el insecto por todos lados' },
    { id: 'cupula',      icon: '🔮', nombre: 'Cúpula & Campana',       desc: 'Domo de vidrio victoriano · Exhibición de museo · Lujo clásico' },
    { id: 'reloj',       icon: '🕐', nombre: 'Tipo Reloj',             desc: 'Marco circular con reloj de alta gama integrado · Dubai · Lujo extremo' },
    { id: 'mixto',       icon: '🦋', nombre: 'Composiciones Mixtas',   desc: 'Varias especies juntas · Arte cromático · Colores amazónicos' },
    { id: 'resina2',     icon: '💎', nombre: 'Encapsulado en Resina',  desc: 'Eterno · Irrompible · Moderno · El más exclusivo del mundo' },
  ]

  const msg = encodeURIComponent(
    `Hola House Insects of Peru 🦋\nQuiero cotizar un cuadro:\n• Composición: ${composicion === 'individual' ? 'Individual' : 'Mixto/Combinado'}\n• Marco: ${marco}\n• Protección: ${vidrio === 'normal' ? 'Cristal Normal' : vidrio === 'uv' ? 'Cristal UV Premium (+$20)' : 'Resina Epóxica (+$35)'}\n\n¿Pueden enviarme precios y disponibilidad? Gracias.`
  )

  return (
    <div style={{ minHeight: '100vh', background: '#1A1209', fontFamily: 'Georgia, serif', padding: '24px 16px' }}>
      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes float { 0%,100%{transform:translateY(0) rotate(-5deg)} 50%{transform:translateY(-12px) rotate(5deg)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-gold { 0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.3)} 50%{box-shadow:0 0 0 10px rgba(201,168,76,0)} }
        .fade-up { animation: fadeInUp 0.6s ease both }
        .butterfly-float { animation: float 4s ease-in-out infinite; display:inline-block }
        .logo-wrap { transition: all 0.3s ease; cursor: pointer }
        .logo-wrap:hover { animation: spin-slow 4s linear infinite }
        .logo-pulse { animation: pulse-gold 2s ease-in-out infinite }
        .card-hover { transition: all 0.2s ease; cursor: pointer }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(201,168,76,0.25) }
        .btn-opt { transition: all 0.18s ease; cursor: pointer; border: none; font-family: Georgia, serif }
        .btn-opt:hover { transform: translateY(-2px) }
        .wa-btn { transition: all 0.2s ease }
        .wa-btn:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 8px 24px rgba(37,211,102,0.45) }

        @media (max-width: 680px) {
          .layout-main { flex-direction: column !important }
          .col-right { width: 100% !important; flex-shrink: unset !important }
          .vista-tabs button { font-size: .68rem !important; padding: 5px 10px !important }
          .btn-opts-wrap { gap: 6px !important }
          .btn-opt { font-size: .72rem !important; padding: 6px 10px !important }
        }
      `}</style>

      <div className="fade-up" style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* BACK - BOTÓN VISIBLE */}
        <a href="/" style={{
          color: '#1A1209', textDecoration: 'none', display: 'inline-flex',
          alignItems: 'center', gap: 8, marginBottom: 20,
          background: 'linear-gradient(135deg,#C9A84C,#E8C97A)',
          padding: '10px 20px', borderRadius: 30,
          fontSize: '1rem', fontWeight: 700, fontFamily: 'Georgia, serif',
          boxShadow: '0 4px 16px rgba(201,168,76,0.4)',
          transition: 'all 0.2s ease',
        }}>
          ← Volver al Inicio
        </a>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          {/* LOGO RESPONSIVE - máx 140px en mobile */}
          <div className="logo-pulse" style={{
            width: 'min(140px, 38vw)', height: 'min(140px, 38vw)',
            margin: '0 auto 14px',
            borderRadius: '50%', border: '3px solid rgba(201,168,76,0.6)',
            overflow: 'hidden', boxShadow: '0 0 30px rgba(201,168,76,0.15)',
          }}>
            <img
              src="/logo-house-insects-peru.png"
              className="butterfly-float"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="House Insects of Peru - Morpho Rethenor Helena"
            />
          </div>

          <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: 'clamp(.55rem,.9vw,.65rem)', letterSpacing: '.15em', marginBottom: 8 }}>
            HOUSE INSECTS OF PERU · MÁS DE 40 AÑOS DE EXPERIENCIA
          </div>
          <h1 style={{ fontSize: 'clamp(1.1rem, 5vw, 2.1rem)', fontWeight: 700, color: '#E8C97A', marginBottom: 8, lineHeight: 1.3, padding: '0 8px' }}>
            🦋 Cuadros de Mariposas Tropicales Naturales
          </h1>
          <div style={{ height: 1, background: 'linear-gradient(to right,transparent,#C9A84C,transparent)', margin: '10px auto', maxWidth: 400 }} />
          <p style={{ color: 'rgba(232,201,122,0.6)', fontSize: 'clamp(.78rem,2.5vw,.88rem)', lineHeight: 1.9, maxWidth: 680, margin: '0 auto', padding: '0 8px' }}>
            Especímenes secos naturales de la Amazonía peruana montados en marcos de lujo.
            Personaliza tu cuadro — composición, formato y tipo de protección. Certificado SERFOR + CITES.
          </p>
          <div style={{ color: 'rgba(201,168,76,0.35)', fontSize: '.6rem', letterSpacing: '.1em', marginTop: 8 }}>
            PARTIDA 9705.21.00.00 · SERFOR · CITES · RUC 20447397804
          </div>
        </div>

        {/* LAYOUT */}
        <div className="layout-main" style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

          {/* IZQUIERDA - CONFIGURADOR */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#C9A84C', fontSize: '.68rem', letterSpacing: '.1em', marginBottom: 14 }}>🖼️ CONFIGURA TU CUADRO</div>

              {/* TABS VISTA - íconos SVG dorados */}
              <div className="vista-tabs" style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                {[
                  { id: 'frente', label: 'Frente', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg> },
                  { id: 'lado',   label: 'Lado',   svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l14 9-14 9V3z"/></svg> },
                  { id: 'reverso',label: 'Reverso', svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg> },
                  { id: 'video',  label: 'Video',  svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg> },
                ].map(v => (
                  <button key={v.id} onClick={() => setVista(v.id)} className="btn-opt" style={{
                    padding: '8px 16px', borderRadius: 20, fontSize: '.78rem',
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: vista === v.id ? 'linear-gradient(135deg,#C9A84C,#E8C97A)' : 'rgba(201,168,76,0.08)',
                    color: vista === v.id ? '#1A1209' : 'rgba(232,201,122,0.7)',
                    border: vista === v.id ? 'none' : '1px solid rgba(201,168,76,0.25)',
                    fontWeight: vista === v.id ? 700 : 400,
                  }}>
                    {v.svg} {v.label}
                  </button>
                ))}
              </div>

              {/* PREVIEW con logo real animado */}
              <div style={{
                width: '100%', aspectRatio: '4/3',
                background: 'rgba(201,168,76,0.04)',
                border: '1px solid rgba(201,168,76,0.15)', borderRadius: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16, overflow: 'hidden', gap: 10,
              }}>
                <div style={{
                  width: 'min(180px, 50%)', height: 'min(180px, 50%)',
                  borderRadius: '50%',
                  border: '3px solid rgba(201,168,76,0.5)',
                  overflow: 'hidden',
                  boxShadow: '0 0 24px rgba(201,168,76,0.2)',
                }}>
                  <img src="/logo-house-insects-peru.png"
                    className="butterfly-float"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    alt="Morpho Rethenor Helena"
                  />
                </div>
                <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.65rem', letterSpacing: '.1em' }}>
                  {vista === 'video' ? '▶ VIDEO PRÓXIMAMENTE' : 'FOTO PRÓXIMAMENTE'}
                </div>
              </div>

              {/* COMPOSICIÓN */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.62rem', letterSpacing: '.1em', marginBottom: 8 }}>🦋 COMPOSICIÓN</div>
                <div className="btn-opts-wrap" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[{ id: 'individual', label: '🦋 Individual' }, { id: 'mixto', label: '🎨 Mixto/Combinado' }].map(c => (
                    <button key={c.id} onClick={() => setComposicion(c.id)} className="btn-opt" style={{
                      padding: '8px 16px', borderRadius: 20, fontSize: '.78rem',
                      background: composicion === c.id ? 'linear-gradient(135deg,#C9A84C,#E8C97A)' : 'rgba(201,168,76,0.08)',
                      color: composicion === c.id ? '#1A1209' : 'rgba(232,201,122,0.7)',
                      border: composicion === c.id ? 'none' : '1px solid rgba(201,168,76,0.2)',
                      fontWeight: composicion === c.id ? 700 : 400,
                    }}>{c.label}</button>
                  ))}
                </div>
              </div>

              {/* FORMATO MARCO */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.62rem', letterSpacing: '.1em', marginBottom: 8 }}>🖼️ FORMATO DEL MARCO</div>
                <div className="btn-opts-wrap" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { id: 'rectangular', label: '⬛ Rectangular' },
                    { id: 'redondo',     label: '⭕ Redondo' },
                    { id: 'triangular',  label: '🔺 Triangular' },
                    { id: 'cubo',        label: '📦 Cubo 3D' },
                    { id: 'cupula',      label: '🔮 Cúpula' },
                    { id: 'reloj',       label: '🕐 Tipo Reloj' },
                  ].map(m => (
                    <button key={m.id} onClick={() => setMarco(m.id)} className="btn-opt" style={{
                      padding: '7px 12px', borderRadius: 20, fontSize: '.74rem',
                      background: marco === m.id ? 'linear-gradient(135deg,#C9A84C,#E8C97A)' : 'rgba(201,168,76,0.08)',
                      color: marco === m.id ? '#1A1209' : 'rgba(232,201,122,0.7)',
                      border: marco === m.id ? 'none' : '1px solid rgba(201,168,76,0.2)',
                      fontWeight: marco === m.id ? 700 : 400,
                    }}>{m.label}</button>
                  ))}
                </div>
              </div>

              {/* TIPO PROTECCIÓN */}
              <div style={{ marginBottom: 14 }}>
                <div style={{ color: 'rgba(201,168,76,0.5)', fontSize: '.62rem', letterSpacing: '.1em', marginBottom: 8 }}>💎 TIPO DE PROTECCIÓN</div>
                <div className="btn-opts-wrap" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[
                    { id: 'normal', label: '🪟 Cristal Normal' },
                    { id: 'uv',     label: '☀️ Cristal UV Premium +$20' },
                    { id: 'resina', label: '💎 Resina Epóxica +$35' },
                  ].map(p => (
                    <button key={p.id} onClick={() => setVidrio(p.id)} className="btn-opt" style={{
                      padding: '7px 12px', borderRadius: 20, fontSize: '.74rem',
                      background: vidrio === p.id ? 'linear-gradient(135deg,#C9A84C,#E8C97A)' : 'rgba(201,168,76,0.08)',
                      color: vidrio === p.id ? '#1A1209' : 'rgba(232,201,122,0.7)',
                      border: vidrio === p.id ? 'none' : '1px solid rgba(201,168,76,0.2)',
                      fontWeight: vidrio === p.id ? 700 : 400,
                    }}>{p.label}</button>
                  ))}
                </div>
              </div>

              {/* RESUMEN */}
              <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 10, padding: 14, marginBottom: 14 }}>
                <div style={{ color: '#C9A84C', fontSize: '.68rem', fontWeight: 700, marginBottom: 8 }}>📋 TU CONFIGURACIÓN:</div>
                <div style={{ color: 'rgba(232,201,122,0.7)', fontSize: '.75rem', lineHeight: 2 }}>
                  🦋 {composicion === 'individual' ? 'Individual' : 'Mixto/Combinado'}<br />
                  🖼️ Marco {marco.charAt(0).toUpperCase() + marco.slice(1)}<br />
                  💎 {vidrio === 'normal' ? 'Cristal Normal' : vidrio === 'uv' ? 'Cristal UV Premium' : 'Resina Epóxica'}
                  {precioExtra > 0 && <span style={{ color: '#E8C97A', marginLeft: 6, fontSize: '.7rem' }}>(+${precioExtra})</span>}
                </div>
              </div>

              {/* WHATSAPP */}
              <a href={`https://wa.me/51926639156?text=${msg}`} target="_blank" rel="noopener noreferrer" className="wa-btn" style={{
                display: 'block', textAlign: 'center', padding: '14px',
                borderRadius: 10, background: 'linear-gradient(135deg,#25D366,#128C7E)',
                color: '#fff', textDecoration: 'none', fontSize: '.85rem',
                fontWeight: 700, fontFamily: 'Georgia, serif',
              }}>
                💬 Cotizar por WhatsApp
              </a>
            </div>
          </div>

          {/* DERECHA - TIPOS DE CUADROS */}
          <div className="col-right" style={{ width: 320, flexShrink: 0 }}>
            <div style={{ color: '#C9A84C', fontSize: '.68rem', letterSpacing: '.1em', marginBottom: 10 }}>⭐ TIPOS DE CUADROS DISPONIBLES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tiposCuadros.map(t => (
                <div key={t.id} className="card-hover" onClick={() => { if (['rectangular','redondo','triangular','cubo','cupula','reloj'].includes(t.id)) setMarco(t.id) }}
                  style={{
                    background: marco === t.id ? 'rgba(201,168,76,0.12)' : 'rgba(201,168,76,0.04)',
                    border: `1px solid ${marco === t.id ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.1)'}`,
                    borderRadius: 10, padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                  <div style={{
                    fontSize: '1.5rem', flexShrink: 0,
                    display: 'inline-block',
                    animation: marco === t.id ? 'float 2s ease-in-out infinite' : 'none',
                  }}>{t.icon}</div>
                  <div>
                    <div style={{ color: '#E8C97A', fontSize: '.8rem', fontWeight: 700 }}>{t.nombre}</div>
                    <div style={{ color: 'rgba(232,201,122,0.4)', fontSize: '.63rem', marginTop: 2, lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* INCLUYE */}
            <div style={{ marginTop: 14, background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 10, padding: 14 }}>
              <div style={{ color: '#C9A84C', fontSize: '.72rem', fontWeight: 700, marginBottom: 8 }}>📦 Incluye:</div>
              <div style={{ color: 'rgba(232,201,122,0.5)', fontSize: '.7rem', lineHeight: 2 }}>
                ✅ Certificado SERFOR<br />
                ✅ Certificado CITES<br />
                ✅ Factura electrónica SUNAT<br />
                ✅ Embalaje de arte premium<br />
                ✅ Más de 40 años de experiencia
              </div>
            </div>

            {/* LOGO DECORATIVO ANIMADO */}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                border: '2px solid rgba(201,168,76,0.4)',
                overflow: 'hidden', margin: '0 auto',
                boxShadow: '0 0 16px rgba(201,168,76,0.12)',
              }}>
                <img src="/logo-house-insects-peru.png"
                  className="butterfly-float"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  alt=""
                />
              </div>
              <div style={{ color: 'rgba(201,168,76,0.3)', fontSize: '.58rem', letterSpacing: '.15em', marginTop: 8 }}>AMAZONÍA PERUANA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
