'use client'
import { useState, useEffect } from 'react'

const IDIOMAS = [
  {code:'es',flag:'🇵🇪',nm:'Español'},
  {code:'en',flag:'🇺🇸',nm:'English'},
  {code:'zh',flag:'🇨🇳',nm:'中文'},
  {code:'ja',flag:'🇯🇵',nm:'日本語'},
  {code:'ko',flag:'🇰🇷',nm:'한국어'},
  {code:'ar',flag:'🇸🇦',nm:'العربية'},
  {code:'de',flag:'🇩🇪',nm:'Deutsch'},
  {code:'fr',flag:'🇫🇷',nm:'Français'},
  {code:'pt',flag:'🇧🇷',nm:'Português'},
  {code:'it',flag:'🇮🇹',nm:'Italiano'},
  {code:'ru',flag:'🇷🇺',nm:'Русский'},
  {code:'tr',flag:'🇹🇷',nm:'Türkçe'},
  {code:'th',flag:'🇹🇭',nm:'ไทย'},
  {code:'vi',flag:'🇻🇳',nm:'Tiếng Việt'},
  {code:'id',flag:'🇮🇩',nm:'Bahasa'},
  {code:'nl',flag:'🇳🇱',nm:'Nederlands'},
  {code:'pl',flag:'🇵🇱',nm:'Polski'},
  {code:'sv',flag:'🇸🇪',nm:'Svenska'},
  {code:'da',flag:'🇩🇰',nm:'Dansk'},
  {code:'fi',flag:'🇫🇮',nm:'Suomi'},
  {code:'no',flag:'🇳🇴',nm:'Norsk'},
  {code:'he',flag:'🇮🇱',nm:'עברית'},
  {code:'hi',flag:'🇮🇳',nm:'हिन्दी'},
  {code:'fa',flag:'🇮🇷',nm:'فارسی'},
  {code:'ms',flag:'🇲🇾',nm:'Melayu'},
  {code:'uk',flag:'🇺🇦',nm:'Українська'},
  {code:'cs',flag:'🇨🇿',nm:'Čeština'},
  {code:'ro',flag:'🇷🇴',nm:'Română'},
  {code:'hu',flag:'🇭🇺',nm:'Magyar'},
  {code:'el',flag:'🇬🇷',nm:'Ελληνικά'},
  {code:'bg',flag:'🇧🇬',nm:'Български'},
  {code:'hr',flag:'🇭🇷',nm:'Hrvatski'},
  {code:'sk',flag:'🇸🇰',nm:'Slovenčina'},
  {code:'lt',flag:'🇱🇹',nm:'Lietuvių'},
  {code:'lv',flag:'🇱🇻',nm:'Latviešu'},
  {code:'et',flag:'🇪🇪',nm:'Eesti'},
  {code:'sl',flag:'🇸🇮',nm:'Slovenščina'},
  {code:'sr',flag:'🇷🇸',nm:'Српски'},
  {code:'af',flag:'🇿🇦',nm:'Afrikaans'},
  {code:'sw',flag:'🇰🇪',nm:'Kiswahili'},
  {code:'tl',flag:'🇵🇭',nm:'Filipino'},
  {code:'bn',flag:'🇧🇩',nm:'বাংলা'},
  {code:'ur',flag:'🇵🇰',nm:'اردو'},
  {code:'ta',flag:'🇮🇳',nm:'தமிழ்'},
  {code:'ms',flag:'🇸🇬',nm:'Singlish'},
  {code:'ca',flag:'🇪🇸',nm:'Català'},
  {code:'eu',flag:'🇪🇸',nm:'Euskera'},
  {code:'gl',flag:'🇪🇸',nm:'Galego'},
  {code:'is',flag:'🇮🇸',nm:'Íslenska'},
  {code:'mt',flag:'🇲🇹',nm:'Malti'},
]

export default function LangSelector() {
  const [idioma, setIdioma] = useState('es')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const saved = document.cookie.split(';').find(x=>x.trim().startsWith('lang='))?.split('=')[1]
    if (saved) setIdioma(saved)
  }, [])

  const select = (code: string) => {
    setIdioma(code)
    document.cookie = 'lang=' + code + ';path=/;max-age=31536000'
    setShow(false)
    window.location.reload()
  }

  const actual = IDIOMAS.find(i=>i.code===idioma)

  return (
    <div style={{position:'relative'}}>
      <button onClick={()=>setShow(s=>!s)}
        style={{background:'rgba(26,18,9,0.95)',border:'2px solid rgba(201,168,76,0.6)',color:'#C9A84C',padding:'10px 18px',borderRadius:24,cursor:'pointer',fontFamily:'Georgia,serif',display:'flex',alignItems:'center',gap:10,boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}>
        <span style={{fontSize:'1.8rem',lineHeight:1}}>{actual?.flag}</span>
        <span style={{fontSize:'1rem',fontWeight:600}}>{actual?.nm}</span>
        <span style={{fontSize:'.7rem',opacity:.7}}>▾</span>
      </button>
      {show&&(
        <div style={{position:'absolute',right:0,top:54,background:'rgba(15,10,5,0.98)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:16,padding:10,maxHeight:420,overflowY:'auto',minWidth:220,boxShadow:'0 12px 40px rgba(0,0,0,0.9)',zIndex:10000}}>
          {IDIOMAS.map(i=>(
            <button key={i.code} onClick={()=>select(i.code)}
              style={{display:'flex',alignItems:'center',gap:12,width:'100%',background:idioma===i.code?'rgba(201,168,76,0.2)':'transparent',border:'none',color:idioma===i.code?'#C9A84C':'rgba(232,201,122,0.8)',padding:'10px 16px',cursor:'pointer',fontSize:'1rem',textAlign:'left',fontFamily:'Georgia,serif',borderRadius:8,marginBottom:2,transition:'background 0.15s'}}>
              <span style={{fontSize:'1.6rem',lineHeight:1}}>{i.flag}</span>
              <span style={{fontWeight:idioma===i.code?700:400}}>{i.nm}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
