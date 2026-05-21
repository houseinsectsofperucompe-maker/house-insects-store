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

function getLang() {
  return document.cookie.split(';').find(c => c.trim().startsWith('lang='))?.split('=')[1] || 'es'
}

async function translate(t: string, lang: string): Promise<string> {
  const key = 'tr:' + lang + ':' + t
  const cached = getCache(key)
  if (cached) return cached
  try {
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(t) + '&langpair=es|' + lang
    const d = await fetch(url).then(r => r.json())
    if (d.responseStatus === 200) {
      setCache(key, d.responseData.translatedText)
      return d.responseData.translatedText
    }
  } catch {}
  return t
}

export default function ST({ t }: { t: string }) {
  const [out, setOut] = useState(t)

  useEffect(() => {
    const lang = getLang()
    if (lang !== 'es') translate(t, lang).then(setOut)
  }, [t])

  return <span suppressHydrationWarning>{out}</span>
}
