'use client'
import { useState, useEffect } from 'react'

const mem: Record<string, string> = {}

function getCache(key: string) {
  if (mem[key]) return mem[key]
  try { const v = localStorage.getItem(key); if (v) { mem[key] = v; return v } } catch {}
  return null
}

function setCache(key: string, val: string) {
  mem[key] = val
  try { localStorage.setItem(key, val) } catch {}
}

export default function ST({ t }: { t: string }) {
  const [out, setOut] = useState(t)

  useEffect(() => {
    const lang = document.cookie.split(';').find(c => c.trim().startsWith('lang='))?.split('=')[1] || 'es'
    if (lang === 'es') return
    const key = 'tr:' + lang + ':' + t
    const cached = getCache(key)
    if (cached) { setOut(cached); return }
    fetch('/api/traducir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto: t, idioma: lang })
    })
    .then(r => r.json())
    .then(d => { setCache(key, d.traduccion); setOut(d.traduccion) })
    .catch(() => {})
  }, [t])

  return <span suppressHydrationWarning>{out}</span>
}
