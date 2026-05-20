'use client'
import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}

export default function T({ t }: { t: string }) {
  const [idioma, setIdioma] = useState('es')
  const [traducido, setTraducido] = useState(t)

  useEffect(() => {
    // Leer idioma inicial
    const saved = localStorage.getItem('lang') || 'es'
    setIdioma(saved)

    // Escuchar cambios de idioma
    const handler = (e: any) => setIdioma(e.detail)
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  useEffect(() => {
    if (idioma === 'es') { setTraducido(t); return }
    const key = idioma + ':' + t
    if (cache[key]) { setTraducido(cache[key]); return }

    fetch('/api/traducir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: t, idioma })
    })
    .then(r => r.json())
    .then(d => { cache[key] = d.traduccion; setTraducido(d.traduccion) })
    .catch(() => setTraducido(t))
  }, [idioma, t])

  return <>{traducido}</>
}
