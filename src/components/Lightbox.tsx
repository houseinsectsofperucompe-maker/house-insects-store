'use client'
import { useState } from 'react'

type Vista = { label: string; url: string; tipo: 'img' | 'video' }

type Props = {
  open: boolean
  vistas: Vista[]
  nombre: string
  onClose: () => void
}

export default function Lightbox({ open, vistas, nombre, onClose }: Props) {
  const [cur, setCur] = useState(0)
  if (!open) return null

  const v = vistas[cur]

  return (
    <div
      onClick={(e) => { if ((e.target as HTMLElement).id === 'lb-bg') onClose() }}
      id="lb-bg"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lbFadeIn 0.2s ease'
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes lbZoom { from { opacity:0; transform:scale(0.2) translateY(80px) } to { opacity:1; transform:scale(1) translateY(0) } }
        .lb-inner { animation: lbZoom 0.4s cubic-bezier(0.34,1.56,0.64,1) }
      `}</style>
      <div className="lb-inner" style={{
        background: '#1A1209', border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: 14, width: 320, maxWidth: '92vw', padding: 14, position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 8, right: 8, width: 40, height: 40,
          background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.5)',
          borderRadius: '50%', cursor: 'pointer', fontSize: '1.3rem', fontWeight: 700,
          color: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Arial,sans-serif', lineHeight: 1, zIndex: 10
        }}>✕</button>

        <div style={{
          width: '100%', height: 260, background: '#0A0A05', borderRadius: 10,
          overflow: 'hidden', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {!v.url ? (
            <div style={{ color: 'rgba(201,168,76,0.3)', fontSize: '.65rem', fontFamily: 'Georgia,serif', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>📷</div>
              <div>{v.label.toUpperCase()} · PRÓXIMAMENTE</div>
            </div>
          ) : v.tipo === 'video' ? (
            <video src={v.url} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <img src={v.url} alt={v.label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <button onClick={() => setCur(c => Math.max(0, c - 1))} disabled={cur === 0} style={{
            width: 38, height: 38, borderRadius: '50%', background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)', cursor: 'pointer', fontSize: '1.1rem',
            color: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: cur === 0 ? 0.2 : 1
          }}>←</button>

          <div style={{ display: 'flex', gap: 3, flex: 1, justifyContent: 'center' }}>
            {vistas.map((vi, i) => (
              <button key={i} onClick={() => setCur(i)} style={{
                padding: '5px 7px', borderRadius: 14, fontSize: '.6rem', cursor: 'pointer',
                border: '1px solid rgba(201,168,76,0.2)', fontFamily: 'Georgia,serif',
                background: cur === i ? '#C9A84C' : 'transparent',
                color: cur === i ? '#1A1209' : 'rgba(201,168,76,0.4)'
              }}>{vi.label}</button>
            ))}
          </div>

          <button onClick={() => setCur(c => Math.min(vistas.length - 1, c + 1))} disabled={cur === vistas.length - 1} style={{
            width: 38, height: 38, borderRadius: '50%', background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.25)', cursor: 'pointer', fontSize: '1.1rem',
            color: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: cur === vistas.length - 1 ? 0.2 : 1
          }}>→</button>
        </div>

        <div style={{ textAlign: 'center', fontSize: '.75rem', fontStyle: 'italic', color: '#E8C97A', marginBottom: 2 }}>{nombre}</div>
        <div style={{ fontSize: '.55rem', color: 'rgba(201,168,76,0.2)', textAlign: 'center', marginTop: 6, fontFamily: 'Georgia,serif' }}>Toca fuera para cerrar</div>
      </div>
    </div>
  )
}
