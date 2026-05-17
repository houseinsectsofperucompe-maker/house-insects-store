'use client'
import { useState } from 'react'
const PRODUCTOS = [
  { nombre:'Morpho absoloni', precio:45.0, stock:100, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho aurora aureola', precio:15.0, stock:200, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho eugenia', precio:20.0, stock:50, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho lympharis selenarys', precio:15.0, stock:1000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho sulkowskyi descimokoenigi', precio:13.0, stock:200, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho rhetenor cacica', precio:35.0, stock:500, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho rethenor helena', precio:45.0, stock:1000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho telemachus', precio:6.0, stock:500, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho zephritis', precio:14.0, stock:1000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho theseus juturna', precio:24.0, stock:500, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho menelaus assarpai', precio:12.0, stock:500, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho cisseis gahua', precio:15.0, stock:200, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho cisseis phanademus', precio:18.0, stock:50, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho adonis huallaga', precio:12.0, stock:200, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho amphitrion cinerous', precio:48.0, stock:100, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho deidamia marie', precio:7.5, stock:1000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho achilles helenor', precio:5.5, stock:1000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho didius', precio:6.5, stock:5000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho didius tingomaria', precio:6.5, stock:5000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho menelaus michaelus', precio:23.0, stock:20, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho menelaus pucallpensis', precio:21.0, stock:50, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho helenor amazonius', precio:7.0, stock:200, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho mariosiajane', precio:50.0, stock:50, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho sulkowoskii nieva', precio:30.0, stock:50, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho sulkowoskii zachi', precio:45.0, stock:100, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho godartii julanthicus', precio:12.0, stock:500, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
  { nombre:'Morpho menelaus zischkai', precio:13.0, stock:5000, familia:'Nymphalidae', calidad:'A1', cites:'No listada' },
]
export default function EspecimenesPage() {
  const [buscar, setBuscar] = useState('')
  const [sel, setSel] = useState<any>(null)
  const filtrados = PRODUCTOS.filter(p=>p.nombre.toLowerCase().includes(buscar.toLowerCase()))
  if (sel) return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <button onClick={()=>setSel(null)} style={{color:'#C9A84C',fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:32,display:'block'}}>← Volver al catálogo</button>
      <div style={{maxWidth:600,margin:'0 auto',textAlign:'center'}}>
        <div style={{width:180,height:180,background:'rgba(201,168,76,0.1)',border:'2px solid #C9A84C',borderRadius:12,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <img src="/logo.png" alt={sel.nombre} style={{width:140,height:140,objectFit:'contain'}}/>
        </div>
        <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',fontStyle:'italic',marginBottom:8}}>{sel.nombre}</h1>
        <p style={{color:'rgba(232,201,122,0.5)',marginBottom:24,fontSize:'.85rem'}}>Familia: {sel.familia} · Orden: Lepidoptera · Amazonia Peruana</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:24}}>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',marginBottom:4}}>PRECIO USD</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>${sel.precio.toFixed(2)}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',marginBottom:4}}>STOCK</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>{sel.stock}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',marginBottom:4}}>CALIDAD</div>
            <div style={{color:'#7EC87E',fontSize:'1rem',fontWeight:700}}>{sel.calidad}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem',marginBottom:4}}>CITES</div>
            <div style={{color:'#E8C97A',fontSize:'.85rem'}}>{sel.cites}</div>
          </div>
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${sel.nombre} USD $${sel.precio}`} target="_blank" style={{background:'#25D366',color:'white',padding:'14px 28px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.9rem'}}>💬 Comprar por WhatsApp</a>
          <a href={`mailto:houseinsectsofperu.com.pe@gmail.com?subject=Consulta: ${sel.nombre}`} style={{background:'transparent',color:'#C9A84C',border:'1px solid #C9A84C',padding:'14px 28px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.9rem'}}>✉️ Email</a>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:24}}>← Volver al inicio</a>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <img src="/logo.png" alt="House Insects of Peru" style={{width:100,height:100,marginBottom:16}}/>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}>Especímenes Biológicos Secos</h1>
          <p style={{color:'rgba(232,201,122,0.5)',marginBottom:8}}>Amazonia Peruana · Calidad A1 · SERFOR · CITES · RUC 20447397804</p>
          <p style={{color:'rgba(232,201,122,0.3)',fontSize:'.8rem',marginBottom:24}}>{PRODUCTOS.length} especies disponibles · Envío mundial · ExportaFácil · DHL · FedEx</p>
          <input value={buscar} onChange={e=>setBuscar(e.target.value)} placeholder="🔍 Buscar especie..." style={{width:'100%',maxWidth:400,padding:'12px 16px',background:'#2A2010',color:'#E8C97A',border:'1px solid #C9A84C',borderRadius:8,fontSize:'.9rem',outline:'none'}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10}}>
          {filtrados.map((p,i)=>(
            <button key={i} onClick={()=>setSel(p)} style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:10,padding:14,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif',transition:'all .2s'}}>
              <div style={{width:'100%',height:110,background:'rgba(201,168,76,0.06)',borderRadius:6,marginBottom:10,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <img src="/logo.png" alt={p.nombre} style={{width:70,height:70,objectFit:'contain',opacity:.5}}/>
              </div>
              <div style={{fontSize:'.78rem',fontStyle:'italic',color:'#E8C97A',marginBottom:6,lineHeight:1.3}}>{p.nombre}</div>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <span style={{color:'#C9A84C',fontWeight:700}}>${p.precio.toFixed(2)}</span>
                <span style={{color:'rgba(232,201,122,0.35)',fontSize:'.68rem'}}>Stock: {p.stock}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
