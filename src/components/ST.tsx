'use client'
import { useState, useEffect } from 'react'

const cache: Record<string, string> = {}

export default function ST({ t }: { t: string }) {
  const [out, setOut] = useState(t)

  useEffect(() => {
    const lang = document.cookie.split(';').find(c => c.trim().startsWith('lang='))?.split('=')[1] || 'es'
    if (lang === 'es') return
    const key = lang + ':' + t
    if (cache[key]) { setOut(cache[key]); return }
    const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(t) + '&langpair=es|' + lang
    fetch(url)
      .then(r => r.json())
      .then(d => {
        if (d.responseStatus === 200) {
          cache[key] = d.responseData.translatedText
          setOut(d.responseData.translatedText)
        }
      })
      .catch(() => {})
  }, [t])

  return <>{out}</>
}
