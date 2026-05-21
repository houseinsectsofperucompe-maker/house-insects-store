'use client'
import { useState, useEffect } from 'react'
const cache: Record<string,string> = {}
export default function ST({ t }: { t: string }) {
  const [out, setOut] = useState(t)
  useEffect(() => {
    const lang = document.cookie.split(';').find(c=>c.trim().startsWith('lang='))?.split('=')[1]||'es'
    if (lang==='es') return
    const k = lang+':'+t
    if (cache[k]) { setOut(cache[k]); return }
    try { const v=localStorage.getItem('tr:'+k); if(v){cache[k]=v;setOut(v);return} } catch{}
    fetch('/api/traducir-batch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({textos:[t],idioma:lang})})
      .then(r=>r.json()).then(d=>{const v=d.traducciones?.[0]||t;cache[k]=v;try{localStorage.setItem('tr:'+k,v)}catch{};setOut(v)}).catch(()=>{})
  },[t])
  return <span suppressHydrationWarning>{out}</span>
}
