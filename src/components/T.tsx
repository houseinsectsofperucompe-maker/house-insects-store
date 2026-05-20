'use client'
import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}
const pending: Record<string, Promise<string>> = {}

async function traducirTexto(texto: string, idioma: string): Promise<string> {
  if (idioma === 'es') return texto
  const key = idioma + ':' + texto
  if (cache[key]) return cache[key]
  if (pending[key]) return pending[key]

  pending[key] = fetch('/api/traducir', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texto, idioma })
  })
  .then(r => r.json())
  .then(d => { cache[key] = d.traduccion; delete pending[key]; return d.traduccion })
  .catch(() => texto)

  return pending[key]
}

export default function T({ t }: { t: string }) {
  const [idioma, setIdioma] = useState('es')
  const [traducido, setTraducido] = useState(t)

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es'
    setIdioma(saved)
    const handler = (e: any) => setIdioma(e.detail)
    window.addEventListener('langChange', handler)
    return () => window.removeEventListener('langChange', handler)
  }, [])

  useEffect(() => {
    if (idioma === 'es') { setTraducido(t); return }
    traducirTexto(t, idioma).then(setTraducido)
  }, [idioma, t])

  return <>{traducido}</>
}
