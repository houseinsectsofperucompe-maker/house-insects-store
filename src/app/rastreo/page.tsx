'use client'
import { useState } from "react"
export default function RastreoPage() {
  const [numero, setNumero] = useState("")
  const [courier, setCourier] = useState("exportafacil")
  const [url, setUrl] = useState("")
  const buscar = () => {
    const urls: Record<string, string> = {
      exportafacil: "https://exportafacil.serpost.com.pe/tracking?codigo=" + numero,
      ems: "https://www.serpost.com.pe/tracking?codigo=" + numero,
      dhl: "https://www.dhl.com/global-en/home/tracking.html?tracking-id=" + numero,
      fedex: "https://www.fedex.com/fedextrack/?trknbr=" + numero,
      ups: "https://www.ups.com/track?tracknum=" + numero,
      aramex: "https://www.aramex.com/track/results?ShipmentNumber=" + numero,
    }
    setUrl(urls[courier] || "")
  }
  return (
    <div style={{minHeight:"100vh",background:"#1A1209",fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px",textAlign:"center"}}>
      <a href="/" style={{color:"#C9A84C",fontSize:".8rem",textDecoration:"none",marginBottom:32,display:"block"}}>← Volver al inicio</a>
      <img src="/logo.png" alt="Logo" style={{width:100,height:100,marginBottom:20}}/>
      <h1 style={{fontSize:"2rem",fontWeight:300,color:"#E8C97A",marginBottom:8}}>Rastrear mi Pedido</h1>
      <p style={{color:"rgba(232,201,122,0.5)",marginBottom:32}}>Ingresa tu numero de seguimiento</p>
      <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center",marginBottom:16,width:"100%",maxWidth:500}}>
        <select value={courier} onChange={e=>setCourier(e.target.value)} style={{padding:"12px",background:"#2A2010",color:"#E8C97A",border:"1px solid #C9A84C",borderRadius:4}}>
          <option value="exportafacil">⭐ ExportaFácil / SUNAT</option>
          <option value="ems">EMS / SERPOST</option>
          <option value="dhl">DHL Express</option>
          <option value="fedex">FedEx</option>
          <option value="ups">UPS</option>
          <option value="aramex">Aramex</option>
        </select>
        <input value={numero} onChange={e=>setNumero(e.target.value)} placeholder="Numero de seguimiento" style={{flex:1,padding:"12px",background:"#2A2010",color:"#E8C97A",border:"1px solid #C9A84C",borderRadius:4,minWidth:200}}/>
        <button onClick={buscar} style={{background:"#C9A84C",color:"#1A1209",padding:"12px 24px",borderRadius:4,fontWeight:700,border:"none",cursor:"pointer"}}>🔍 Rastrear</button>
      </div>
      {url && <a href={url} target="_blank" style={{color:"#C9A84C",fontWeight:700,fontSize:"1rem",textDecoration:"none",marginTop:16,display:"block",padding:"14px 28px",background:"rgba(201,168,76,0.1)",border:"1px solid #C9A84C",borderRadius:8}}>📦 Ver estado del envío →</a>}
      <div style={{marginTop:40,padding:"16px 24px",background:"rgba(255,255,255,0.03)",borderRadius:8,border:"1px solid rgba(255,255,255,0.08)",maxWidth:500}}>
        <p style={{color:"rgba(232,201,122,0.4)",fontSize:".75rem",lineHeight:1.8}}>ExportaFácil es el servicio oficial de SERPOST integrado con SUNAT para exportaciones peruanas · CITES · SERFOR certificado</p>
      </div>
    </div>
  )
}