'use client'
import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}

export default function T({ t }: { t: string }) {
  const [out, setOut] = useState<string | null>(null)

  useEffect(() => {
    const lang = document.cookie.split(';').find(c => c.trim().startsWith('lang='))?.split('=')[1] || 'es'
    if (lang === 'es') { setOut(t); return }
    const key = lang + ':' + t
    if (cache[key]) { setOut(cache[key]); return }
    fetch('/api/traducir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: t, idioma: lang })
    })
    .then(r => r.json())
    .then(d => { cache[key] = d.traduccion; setOut(d.traduccion) })
    .catch(() => setOut(t))
  }, [t])

  return <>{out ?? t}</>
}
