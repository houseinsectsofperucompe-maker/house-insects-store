'use client'
import ST from '@/components/ST'
import { useState } from 'react'

export default function TextileriaAmazonicaPage() {
  const [cat, setCat] = useState('todas')
  const CATEGORIAS = [
    { id:'todas', nm:'Toda la Coleccion' },
    { id:'shipibo', nm:'Shipibo-Conibo' },
    { id:'awajun', nm:'Awajun & Wampis' },
    { id:'ashaninka', nm:'Ashaninka' },
    { id:'bora', nm:'Bora & Huitoto' },
  ]
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <div style={{maxWidth:900,margin:'0 auto',textAlign:'center'}}>
        <a href="/"><img src="/logo-house-insects-peru.png" style={{width:120,height:120,objectFit:'contain',marginBottom:16}} onError={(e:any)=>{e.target.src='/logo.png'}}/></a>
        <h1 style={{color:'#C9A84C',fontSize:'clamp(1.8rem,5vw,2.8rem)',fontWeight:'normal',marginBottom:16}}>Textileria Amazonica</h1>
        <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.9rem',marginBottom:24}}>Tejidos ancestrales de comunidades nativas de la Amazonia peruana.</p>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:8,marginBottom:32}}>
          {CATEGORIAS.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)}
              style={{background:cat===c.id?'#C9A84C':'rgba(201,168,76,0.08)',color:cat===c.id?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,padding:'8px 16px',cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif'}}>
              <ST t={c.nm}/>
            </button>
          ))}
        </div>
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:'60px 20px'}}>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.9rem'}}><ST t="CATALOGO EN PREPARACION"/></p>
        </div>
        <a href="https://wa.me/51940699405" target="_blank" style={{display:'inline-block',marginTop:24,background:'#25D366',color:'white',padding:'14px 32px',borderRadius:8,textDecoration:'none',fontFamily:'Georgia,serif',fontWeight:'bold'}}>
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
