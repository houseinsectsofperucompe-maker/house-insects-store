'use client'
import { useState, useEffect } from 'react'

const IDIOMAS = [
  {code:'es',flag:'🇵🇪',nm:'Español'},
  {code:'en',flag:'🇺🇸',nm:'English'},
  {code:'de',flag:'🇩🇪',nm:'Deutsch'},
  {code:'fr',flag:'🇫🇷',nm:'Français'},
  {code:'pt',flag:'🇧🇷',nm:'Português'},
  {code:'it',flag:'🇮🇹',nm:'Italiano'},
  {code:'ja',flag:'🇯🇵',nm:'日本語'},
  {code:'zh',flag:'🇨🇳',nm:'中文'},
  {code:'ar',flag:'🇸🇦',nm:'العربية'},
  {code:'th',flag:'🇹🇭',nm:'ไทย'},
  {code:'ko',flag:'🇰🇷',nm:'한국어'},
  {code:'ru',flag:'🇷🇺',nm:'Русский'},
  {code:'nl',flag:'🇳🇱',nm:'Nederlands'},
  {code:'pl',flag:'🇵🇱',nm:'Polski'},
  {code:'sv',flag:'🇸🇪',nm:'Svenska'},
  {code:'tr',flag:'🇹🇷',nm:'Türkçe'},
  {code:'vi',flag:'🇻🇳',nm:'Tiếng Việt'},
  {code:'id',flag:'🇮🇩',nm:'Bahasa'},
  {code:'da',flag:'🇩🇰',nm:'Dansk'},
  {code:'fi',flag:'🇫🇮',nm:'Suomi'},
  {code:'no',flag:'🇳🇴',nm:'Norsk'},
]

export default function LangSelector() {
  const [idioma, setIdioma] = useState('es')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const saved = document.cookie.split(';').find(c=>c.trim().startsWith('lang='))?.split('=')[1]
    if (saved) setIdioma(saved)
    else {
      const browser = navigator.language.slice(0,2)
      const found = IDIOMAS.find(i=>i.code===browser)
      if (found) setIdioma(found.code)
    }
  }, [])

  const select = (code: string) => {
    setIdioma(code)
    localStorage.setItem('lang', code)
    setShow(false)
    window.dispatchEvent(new CustomEvent('langChange', {detail: code}))
  }

  const actual = IDIOMAS.find(i=>i.code===idioma)

  return (
    <div style={{position:'fixed',top:12,right:12,zIndex:9999}}>
      <button onClick={()=>setShow(!show)} style={{background:'rgba(26,18,9,0.95)',border:'1px solid rgba(201,168,76,0.4)',color:'#C9A84C',padding:'6px 14px',borderRadius:20,cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif',display:'flex',alignItems:'center',gap:6}}>
        <span>{actual?.flag}</span><span>{actual?.nm}</span><span style={{fontSize:'.6rem'}}>▾</span>
      </button>
      {show && (
        <div style={{position:'absolute',right:0,top:40,background:'rgba(20,13,5,0.98)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:8,padding:6,maxHeight:320,overflowY:'auto',minWidth:170,boxShadow:'0 8px 32px rgba(0,0,0,0.6)'}}>
          {IDIOMAS.map(i=>(
            <button key={i.code} onClick={()=>select(i.code)} style={{display:'flex',alignItems:'center',gap:8,width:'100%',background:idioma===i.code?'rgba(201,168,76,0.12)':'transparent',border:'none',color:idioma===i.code?'#C9A84C':'rgba(232,201,122,0.55)',padding:'7px 12px',cursor:'pointer',fontSize:'.78rem',textAlign:'left',fontFamily:'Georgia,serif',borderRadius:4}}>
              <span>{i.flag}</span><span>{i.nm}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
