'use client'
import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}

export default function T({ t }: { t: string }) {
  const [traducido, setTraducido] = useState(t)

  useEffect(() => {
    const idioma = localStorage.getItem('lang') || 'es'
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
  }, [t])

  return <>{traducido}</>
}
