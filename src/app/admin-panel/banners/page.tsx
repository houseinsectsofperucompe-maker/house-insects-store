'use client'
import { useState } from 'react'
const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})
export default function BannersPage(){
  return(
    <div style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A',padding:24}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,paddingRight:320}}>
        <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>📢 Banners Publicitarios</h1>
        <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
      </div>
      <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:24,color:'rgba(201,168,76,0.5)',textAlign:'center'}}>
        Módulo de banners — próximamente
      </div>
    </div>
  )
}
