'use client'
import Link from 'next/link'
export default function AdminOperativoDashboard() {
  return (
    <div style={{padding:30,background:'#0f172a',color:'#fff',minHeight:'100vh',fontFamily:'sans-serif'}}>
      <header style={{borderBottom:'1px solid #334155',paddingBottom:20,marginBottom:30,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0}}>/admin — Gestión Operativa & Financiera</h1>
          <p style={{color:'#94a3b8',margin:'5px 0 0'}}>Módulo de Control Corporativo · RUC 20447397804</p>
        </div>
        <Link href="/admin-panel" style={{background:'#C9A84C',color:'#0A0A05',padding:'8px 16px',borderRadius:6,textDecoration:'none',fontWeight:'bold',fontSize:14}}>← Panel Principal</Link>
      </header>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
        <div style={{background:'#1e293b',padding:20,borderRadius:8,borderLeft:'4px solid #10b981'}}>
          <h3 style={{margin:'0 0 8px'}}>SUNAT & Tributación</h3>
          <p style={{color:'#94a3b8',fontSize:14,margin:0}}>Régimen MYPE Tributario integrado para facturación electrónica directa.</p>
        </div>
        <div style={{background:'#1e293b',padding:20,borderRadius:8,borderLeft:'4px solid #3b82f6'}}>
          <h3 style={{margin:'0 0 8px'}}>Logística de Despacho</h3>
          <p style={{color:'#94a3b8',fontSize:14,margin:0}}>Control de envíos internacionales y coordinación de stock local.</p>
        </div>
        <div style={{background:'#1e293b',padding:20,borderRadius:8,borderLeft:'4px solid #f59e0b'}}>
          <h3 style={{margin:'0 0 8px'}}>Pasarelas de Pago</h3>
          <p style={{color:'#94a3b8',fontSize:14,margin:0}}>Logs de transacciones internacionales (B2B, Asia, pasarelas integradas).</p>
        </div>
      </div>
      <div style={{marginTop:40,display:'flex',gap:15,flexWrap:'wrap'}}>
        <Link href="/admin/competencia" style={{background:'#334155',color:'#fff',padding:'12px 20px',borderRadius:6,textDecoration:'none'}}>📊 Analizar Competencia Internacional</Link>
        <Link href="/admin/upload" style={{background:'#2563eb',color:'#fff',padding:'12px 20px',borderRadius:6,textDecoration:'none'}}>📤 Subir Archivos Operativos</Link>
      </div>
    </div>
  )
}
