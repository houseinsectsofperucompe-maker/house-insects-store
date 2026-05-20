'use client'
import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}

export function useTraduccion(texto: string, idioma: string) {
  const [traducido, setTraducido] = useState(texto)
  
  useEffect(() => {
    if (idioma === 'es') { setTraducido(texto); return }
    const key = idioma + ':' + texto.slice(0, 50)
    if (cache[key]) { setTraducido(cache[key]); return }
    
    fetch('/api/traducir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, idioma })
    })
    .then(r => r.json())
    .then(d => { cache[key] = d.traduccion; setTraducido(d.traduccion) })
    .catch(() => setTraducido(texto))
  }, [texto, idioma])
  
  return traducido
}
