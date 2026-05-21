'use client'
import { useState, useEffect } from 'react'

const mem: Record<string, string> = {}
const pending = new Set<string>()
let batchTimer: ReturnType<typeof setTimeout> | null = null
const subscribers: Record<string, Array<(v:string)=>void>> = {}

function getLang() {
  if (typeof document === 'undefined') return 'es'
  return document.cookie.split(';').find(c=>c.trim().startsWith('lang='))?.split('=')[1]||'es'
}

function getCache(k:string) {
  if (mem[k]) return mem[k]
  try { const v=localStorage.getItem(k); if(v){mem[k]=v;return v} } catch{}
  return null
}

function setCache(k:string,v:string) {
  mem[k]=v
  try{localStorage.setItem(k,v)}catch{}
}

async function runBatch(lang:string) {
  const texts = Array.from(pending)
  pending.clear()
  if (!texts.length) return
  try {
    const res = await fetch('/api/traducir-batch',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({textos:texts,idioma:lang})
    })
    const data = await res.json()
    texts.forEach((t,i)=>{
      const k = lang+':'+t
      const v = data.traducciones[i]||t
      setCache(k,v)
      subscribers[k]?.forEach(fn=>fn(v))
      delete subscribers[k]
    })
  } catch{}
}

function scheduleBatch(lang:string) {
  if (batchTimer) clearTimeout(batchTimer)
  batchTimer = setTimeout(()=>runBatch(lang), 50)
}

export default function ST({ t }: { t: string }) {
  const [out, setOut] = useState(t)

  useEffect(() => {
    const lang = getLang()
    if (lang==='es') return
    const k = lang+':'+t
    const cached = getCache(k)
    if (cached) { setOut(cached); return }
    if (!subscribers[k]) subscribers[k]=[]
    subscribers[k].push(setOut)
    pending.add(t)
    scheduleBatch(lang)
  }, [t])

  return <span suppressHydrationWarning>{out}</span>
}
