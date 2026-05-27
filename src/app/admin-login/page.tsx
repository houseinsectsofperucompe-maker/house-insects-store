'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

export default function AdminLogin(){
  const [pw,setPw]=useState('')
  const [error,setError]=useState('')
  const router=useRouter()
  
  const login=async()=>{
    const res=await fetch('/api/admin-auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})})
    if(res.ok){
      router.push('/admin-panel')
    } else {
      setError('Contraseña incorrecta')
    }
  }

  const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'

  return(
    <main style={{minHeight:'100vh',background:BG,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif'}}>
      <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:12,padding:40,width:320,textAlign:'center'}}>
        <div style={{fontSize:'2.5rem',marginBottom:16}}>🦋</div>
        <h1 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:300,letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU</h1>
        <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.72rem',letterSpacing:'.1em',marginBottom:24}}>PANEL ADMINISTRATIVO</p>
        <input 
          type="password" 
          value={pw} 
          onChange={e=>setPw(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&login()}
          placeholder="Contraseña"
          style={{width:'100%',background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'10px 14px',borderRadius:6,fontSize:'.8rem',fontFamily:'Georgia,serif',boxSizing:'border-box',marginBottom:12,textAlign:'center'}}
        />
        {error&&<p style={{color:'#ff6464',fontSize:'.72rem',marginBottom:12}}>{error}</p>}
        <button onClick={login} style={{width:'100%',background:G,color:CARD,border:'none',padding:'12px',borderRadius:6,cursor:'pointer',fontSize:'.85rem',fontFamily:'Georgia,serif',fontWeight:700}}>
          Ingresar
        </button>
      </div>
    </main>
  )
}
