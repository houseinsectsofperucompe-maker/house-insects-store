'use client'
import { useState, useEffect } from 'react'
import ST from '@/components/ST'

export default function PedidoPage({ params }: { params: { codigo: string } }) {
  const { codigo } = params

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <div style={{maxWidth:700,margin:'0 auto'}}>
        <img src='/logo-house-insects-peru.png' alt='Logo' style={{width:80,height:80,display:'block',margin:'0 auto 20px',borderRadius:'50%',border:'2px solid #C9A84C'}}/>
        <h1 style={{color:'#E8C97A',textAlign:'center',fontSize:'1.5rem',fontWeight:300,marginBottom:4}}><ST t='Expediente Digital'/></h1>
        <p style={{color:'rgba(232,201,122,0.4)',textAlign:'center',fontSize:'.8rem',marginBottom:30}}>HOUSE INSECTS OF PERU E.I.R.L. · RUC 20447397804</p>

        <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid #C9A84C',borderRadius:12,padding:20,marginBottom:20,textAlign:'center'}}>
          <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.7rem',marginBottom:4}}><ST t='Código de Pedido'/></p>
          <p style={{color:'#C9A84C',fontSize:'1.8rem',fontWeight:700,letterSpacing:'.1em'}}>{codigo}</p>
        </div>

        <div style={{display:'grid',gap:12}}>
          <a href={'https://exportafacil.serpost.com.pe/tracking?codigo='+codigo} target='_blank' rel='noreferrer'
            style={{background:'rgba(0,100,200,0.1)',border:'1px solid rgba(0,150,255,0.3)',borderRadius:10,padding:16,textDecoration:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#8AB4F8',fontWeight:700,margin:0}}>📦 ExportaFácil / SERPOST</p><p style={{color:'rgba(255,255,255,0.5)',fontSize:'.75rem',margin:'4px 0 0'}}><ST t='Rastrear envío'/></p></div>
            <span style={{color:'#C9A84C'}}>→</span>
          </a>
          <a href={'https://www.dhl.com/global-en/home/tracking.html?tracking-id='+codigo} target='_blank' rel='noreferrer'
            style={{background:'rgba(255,200,0,0.05)',border:'1px solid rgba(255,200,0,0.2)',borderRadius:10,padding:16,textDecoration:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#FFD700',fontWeight:700,margin:0}}>🚚 DHL Express</p><p style={{color:'rgba(255,255,255,0.5)',fontSize:'.75rem',margin:'4px 0 0'}}><ST t='Rastrear envío DHL'/></p></div>
            <span style={{color:'#C9A84C'}}>→</span>
          </a>
          <a href={'https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/jcrS00Alias?accion=consultar&nroRuc=20447397804'} target='_blank' rel='noreferrer'
            style={{background:'rgba(0,150,50,0.1)',border:'1px solid rgba(0,200,50,0.2)',borderRadius:10,padding:16,textDecoration:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#7EC87E',fontWeight:700,margin:0}}>🏛️ SUNAT</p><p style={{color:'rgba(255,255,255,0.5)',fontSize:'.75rem',margin:'4px 0 0'}}><ST t='Verificar RUC y factura electrónica'/></p></div>
            <span style={{color:'#C9A84C'}}>→</span>
          </a>
          <a href={'https://www.serfor.gob.pe'} target='_blank' rel='noreferrer'
            style={{background:'rgba(0,100,0,0.1)',border:'1px solid rgba(0,150,0,0.2)',borderRadius:10,padding:16,textDecoration:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#7EC87E',fontWeight:700,margin:0}}>🌿 SERFOR / CITES</p><p style={{color:'rgba(255,255,255,0.5)',fontSize:'.75rem',margin:'4px 0 0'}}><ST t='Verificar certificado forestal'/></p></div>
            <span style={{color:'#C9A84C'}}>→</span>
          </a>
          <a href={'https://www.lloyds.com'} target='_blank' rel='noreferrer'
            style={{background:'rgba(10,42,90,0.3)',border:'1px solid rgba(100,150,255,0.2)',borderRadius:10,padding:16,textDecoration:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div><p style={{color:'#8AB4F8',fontWeight:700,margin:0}}>🛡️ Seguro / Insurance</p><p style={{color:'rgba(255,255,255,0.5)',fontSize:'.75rem',margin:'4px 0 0'}}><ST t='Verificar póliza de seguro'/></p></div>
            <span style={{color:'#C9A84C'}}>→</span>
          </a>
        </div>

        <div style={{textAlign:'center',marginTop:30}}>
          <a href='https://wa.me/51940699405' target='_blank' rel='noreferrer' style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontWeight:700,textDecoration:'none',marginRight:8}}>💬 +51 940 699 405</a>
          <a href='https://wa.me/51920644433' target='_blank' rel='noreferrer' style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
        </div>

        <p style={{color:'rgba(232,201,122,0.2)',textAlign:'center',fontSize:'.6rem',marginTop:20}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARÍA, PERÚ</p>
      </div>
    </div>
  )
}
