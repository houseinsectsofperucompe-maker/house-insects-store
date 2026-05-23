'use client'
import { useState } from 'react'

export default function ContactoFlotante() {
  const [abierto, setAbierto] = useState(false)
  return (
    <div style={{position:'fixed',left:0,top:160,zIndex:9999,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:8}}>
      {abierto && (
        <>
          <a href="https://wa.me/51940699405" target="_blank" rel="noreferrer"
            style={{display:'flex',alignItems:'center',gap:8,background:'#25D366',color:'white',padding:'10px 16px',borderRadius:50,fontWeight:700,fontSize:'.8rem',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.3)',whiteSpace:'nowrap'}}>
            💬 +51 940 699 405
          </a>
          <a href="https://wa.me/51920644433" target="_blank" rel="noreferrer"
            style={{display:'flex',alignItems:'center',gap:8,background:'#25D366',color:'white',padding:'10px 16px',borderRadius:50,fontWeight:700,fontSize:'.8rem',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.3)',whiteSpace:'nowrap'}}>
            💬 +51 920 644 433
          </a>
          <a href="mailto:houseinsectsofperu.com.pe@gmail.com"
            style={{display:'flex',alignItems:'center',gap:8,background:'#C9A84C',color:'white',padding:'10px 16px',borderRadius:50,fontWeight:700,fontSize:'.8rem',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.3)',whiteSpace:'nowrap'}}>
            ✉️ houseinsectsofperu.com.pe@gmail.com
          </a>
          <a href="mailto:jzalopez02@gmail.com"
            style={{display:'flex',alignItems:'center',gap:8,background:'#C9A84C',color:'white',padding:'10px 16px',borderRadius:50,fontWeight:700,fontSize:'.8rem',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.3)',whiteSpace:'nowrap'}}>
            ✉️ jzalopez02@gmail.com
          </a>
        </>
      )}
      <button onClick={() => setAbierto(!abierto)}
        style={{background:'#25D366',border:'none',borderRadius:'50%',width:56,height:56,fontSize:'1.6rem',cursor:'pointer',boxShadow:'0 2px 12px rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        {abierto ? '✕' : '💬'}
      </button>
    </div>
  )
}
