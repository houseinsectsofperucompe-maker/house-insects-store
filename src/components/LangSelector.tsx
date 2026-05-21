'use client'
import { useState, useEffect } from 'react'
import 'flag-icons/css/flag-icons.min.css'

const IDIOMAS = [
  {code:'es',iso:'pe',nm:'Español'},
  {code:'en',iso:'us',nm:'English'},
  {code:'zh',iso:'cn',nm:'中文'},
  {code:'ja',iso:'jp',nm:'日本語'},
  {code:'ko',iso:'kr',nm:'한국어'},
  {code:'ar',iso:'sa',nm:'العربية'},
  {code:'de',iso:'de',nm:'Deutsch'},
  {code:'fr',iso:'fr',nm:'Français'},
  {code:'pt',iso:'br',nm:'Português'},
  {code:'it',iso:'it',nm:'Italiano'},
  {code:'ru',iso:'ru',nm:'Русский'},
  {code:'tr',iso:'tr',nm:'Türkçe'},
  {code:'th',iso:'th',nm:'ไทย'},
  {code:'vi',iso:'vn',nm:'Tiếng Việt'},
  {code:'id',iso:'id',nm:'Bahasa'},
  {code:'nl',iso:'nl',nm:'Nederlands'},
  {code:'pl',iso:'pl',nm:'Polski'},
  {code:'sv',iso:'se',nm:'Svenska'},
  {code:'da',iso:'dk',nm:'Dansk'},
  {code:'fi',iso:'fi',nm:'Suomi'},
  {code:'no',iso:'no',nm:'Norsk'},
  {code:'he',iso:'il',nm:'עברית'},
  {code:'hi',iso:'in',nm:'हिन्दी'},
  {code:'fa',iso:'ir',nm:'فارسی'},
  {code:'ms',iso:'my',nm:'Melayu'},
  {code:'uk',iso:'ua',nm:'Українська'},
  {code:'cs',iso:'cz',nm:'Čeština'},
  {code:'ro',iso:'ro',nm:'Română'},
  {code:'hu',iso:'hu',nm:'Magyar'},
  {code:'el',iso:'gr',nm:'Ελληνικά'},
  {code:'bg',iso:'bg',nm:'Български'},
  {code:'hr',iso:'hr',nm:'Hrvatski'},
  {code:'sk',iso:'sk',nm:'Slovenčina'},
  {code:'lt',iso:'lt',nm:'Lietuvių'},
  {code:'lv',iso:'lv',nm:'Latviešu'},
  {code:'et',iso:'ee',nm:'Eesti'},
  {code:'sr',iso:'rs',nm:'Српски'},
  {code:'af',iso:'za',nm:'Afrikaans'},
  {code:'sw',iso:'ke',nm:'Kiswahili'},
  {code:'tl',iso:'ph',nm:'Filipino'},
  {code:'bn',iso:'bd',nm:'বাংলা'},
  {code:'ur',iso:'pk',nm:'اردو'},
  {code:'ta',iso:'lk',nm:'தமிழ்'},
  {code:'ca',iso:'es',nm:'Català'},
  {code:'is',iso:'is',nm:'Íslenska'},
  {code:'mt',iso:'mt',nm:'Malti'},
  {code:'sl',iso:'si',nm:'Slovenščina'},
  {code:'mk',iso:'mk',nm:'Македонски'},
  {code:'sq',iso:'al',nm:'Shqip'},
  {code:'az',iso:'az',nm:'Azərbaycan'},
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
        style={{background:'rgba(26,18,9,0.95)',border:'2px solid rgba(201,168,76,0.6)',color:'#C9A84C',padding:'8px 16px',borderRadius:24,cursor:'pointer',fontFamily:'Georgia,serif',display:'flex',alignItems:'center',gap:10,boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}>
        <span className={`fi fi-${actual?.iso}`} style={{width:28,height:20,borderRadius:3,display:'inline-block'}}></span>
        <span style={{fontSize:'1rem',fontWeight:600}}>{actual?.nm}</span>
        <span style={{fontSize:'.7rem',opacity:.7}}>▾</span>
      </button>
      {show&&(
        <div style={{position:'absolute',right:0,top:52,background:'rgba(15,10,5,0.98)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:16,padding:10,maxHeight:420,overflowY:'auto',minWidth:220,boxShadow:'0 12px 40px rgba(0,0,0,0.9)',zIndex:10000}}>
          {IDIOMAS.map(i=>(
            <button key={i.code} onClick={()=>select(i.code)}
              style={{display:'flex',alignItems:'center',gap:12,width:'100%',background:idioma===i.code?'rgba(201,168,76,0.2)':'transparent',border:'none',color:idioma===i.code?'#C9A84C':'rgba(232,201,122,0.8)',padding:'10px 16px',cursor:'pointer',fontSize:'1rem',textAlign:'left',fontFamily:'Georgia,serif',borderRadius:8,marginBottom:2}}>
              <span className={`fi fi-${i.iso}`} style={{width:28,height:20,borderRadius:3,flexShrink:0,display:'inline-block'}}></span>
              <span style={{fontWeight:idioma===i.code?700:400}}>{i.nm}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
