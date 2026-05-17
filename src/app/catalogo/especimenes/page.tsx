'use client'
import { useState } from 'react'

const FAMILIAS = [
  { id:'Brassolidae', nombre:'Brassolidae', especies:[] },
  { id:'Danaidae', nombre:'Danaidae', especies:[] },
  { id:'Heliconidae', nombre:'Heliconidae', especies:[] },
  { id:'Hesperiidae', nombre:'Hesperiidae', especies:[] },
  { id:'Ithomidae', nombre:'Ithomidae', especies:[] },
  { id:'Lycaenidae', nombre:'Lycaenidae', especies:[] },
  { id:'Morphidae', nombre:'Morphidae', especies:[
    { nombre:'Morpho absoloni', precio:45, stock:100, calidad:'A1', sexo:'M' },
    { nombre:'Morpho aurora aureola', precio:15, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho eugenia', precio:20, stock:50, calidad:'A1', sexo:'M' },
    { nombre:'Morpho lympharis selenarys', precio:15, stock:1000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho sulkowskyi descimokoenigi', precio:13, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho rhetenor cacica', precio:35, stock:500, calidad:'A1', sexo:'M' },
    { nombre:'Morpho rethenor helena', precio:45, stock:1000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho telemachus', precio:6, stock:500, calidad:'A1', sexo:'M' },
    { nombre:'Morpho zephritis', precio:14, stock:1000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho theseus juturna', precio:24, stock:500, calidad:'A1', sexo:'M' },
    { nombre:'Morpho menelaus assarpai', precio:12, stock:500, calidad:'A1', sexo:'M' },
    { nombre:'Morpho cisseis gahua', precio:15, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho cisseis phanademus', precio:18, stock:50, calidad:'A1', sexo:'M' },
    { nombre:'Morpho adonis huallaga', precio:12, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho amphitrion cinerous', precio:48, stock:100, calidad:'A1', sexo:'M' },
    { nombre:'Morpho deidamia marie', precio:7.5, stock:1000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho achilles helenor', precio:5.5, stock:1000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho didius', precio:6.5, stock:5000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho didius tingomaria', precio:6.5, stock:5000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho menelaus michaelus', precio:23, stock:20, calidad:'A1', sexo:'M' },
    { nombre:'Morpho menelaus pucallpensis', precio:21, stock:50, calidad:'A1', sexo:'M' },
    { nombre:'Morpho helenor amazonius', precio:7, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho mariosiajane', precio:50, stock:50, calidad:'A1', sexo:'M' },
    { nombre:'Morpho sulkowoskii nieva', precio:30, stock:50, calidad:'A1', sexo:'M' },
    { nombre:'Morpho sulkowoskii zachi', precio:45, stock:100, calidad:'A1', sexo:'M' },
    { nombre:'Morpho godartii julanthicus', precio:12, stock:500, calidad:'A1', sexo:'M' },
    { nombre:'Morpho menelaus zischkai', precio:13, stock:5000, calidad:'A1', sexo:'M' },
    { nombre:'Morpho rethenor mariosiojane small', precio:45, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho aurora isidorssoni', precio:18, stock:100, calidad:'A1', sexo:'M' },
    { nombre:'Morpho aurora lamasi', precio:16, stock:200, calidad:'A1', sexo:'M' },
    { nombre:'Morpho cisseis gahua ssp gahua', precio:120, stock:10, calidad:'A1', sexo:'M' },
  ]},
  { id:'Nymphalidae', nombre:'Nymphalidae', especies:[] },
  { id:'Papilionidae', nombre:'Papilionidae', especies:[] },
  { id:'Pieridae', nombre:'Pieridae', especies:[] },
  { id:'Riodinidae', nombre:'Riodinidae', especies:[] },
  { id:'Satyridae', nombre:'Satyridae', especies:[] },
]

export default function EspecimenesPage() {
  const [familiaId, setFamiliaId] = useState('Morphidae')
  const [sel, setSel] = useState<any>(null)
  const [buscar, setBuscar] = useState('')

  const familia = FAMILIAS.find(f => f.id === familiaId)!
  const filtrados = familia.especies.filter(p => p.nombre.toLowerCase().includes(buscar.toLowerCase()))

  if (sel) return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <button onClick={()=>setSel(null)} style={{color:'#C9A84C',fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:32,display:'block'}}>← Volver al catálogo</button>
      <div style={{maxWidth:600,margin:'0 auto',textAlign:'center'}}>
        <div style={{width:200,height:200,background:'rgba(201,168,76,0.08)',border:'2px solid #C9A84C',borderRadius:12,margin:'0 auto 24px',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <img src="/logo.png" alt={sel.nombre} style={{width:150,height:150,objectFit:'contain'}}/>
        </div>
        <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',marginBottom:4}}>Orden: Lepidoptera · Familia: {familiaId} · Amazonía Peruana</p>
        <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',fontStyle:'italic',marginBottom:24}}>{sel.nombre}</h1>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:24}}>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',marginBottom:4}}>PRECIO USD</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>${sel.precio}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',marginBottom:4}}>STOCK</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>{sel.stock}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',marginBottom:4}}>CALIDAD</div>
            <div style={{color:'#7EC87E',fontSize:'1rem',fontWeight:700}}>{sel.calidad}</div>
          </div>
        </div>
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:16,marginBottom:24,fontSize:'.8rem',color:'rgba(232,201,122,0.6)',lineHeight:1.8}}>
          ✅ SERFOR certificado · ✅ CITES · ✅ Envío mundial<br/>
          📦 ExportaFácil · DHL · FedEx · UPS · Aramex<br/>
          🏛️ RUC 20447397804 · Ley Amazónia N°27037
        </div>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
          <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${sel.nombre} USD $${sel.precio}`} target="_blank" style={{background:'#25D366',color:'white',padding:'14px 24px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.9rem'}}>💬 +51 940 699 405</a>
          <a href={`https://wa.me/51920644433?text=Hola, me interesa: ${sel.nombre} USD $${sel.precio}`} target="_blank" style={{background:'#25D366',color:'white',padding:'14px 24px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.9rem'}}>💬 +51 920 644 433</a>
        </div>
        <a href={`mailto:houseinsectsofperu.com.pe@gmail.com?subject=Consulta: ${sel.nombre}`} style={{display:'block',marginTop:8,color:'#C9A84C',fontSize:'.85rem',textDecoration:'none'}}>✉️ houseinsectsofperu.com.pe@gmail.com</a>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:24}}>← Volver al inicio</a>
      <div style={{maxWidth:1200,margin:'0 auto'}}>

        {/* HEADER */}
        <div style={{textAlign:'center',marginBottom:32}}>
          <img src="/logo.png" alt="House Insects of Peru" style={{width:90,height:90,marginBottom:12}}/>
          <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>Especímenes Biológicos Secos</h1>
          <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.8rem',letterSpacing:'.1em'}}>LEPIDOPTERA · BUTTERFLIES DIURNAE · AMAZONÍA PERUANA</p>
        </div>

        {/* FAMILIAS */}
        <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'center',marginBottom:24}}>
          {FAMILIAS.map(f => (
            <button key={f.id} onClick={()=>{setFamiliaId(f.id);setBuscar('');setSel(null)}}
              style={{padding:'8px 14px',background: familiaId===f.id ? '#C9A84C' : 'rgba(201,168,76,0.08)',color: familiaId===f.id ? '#1A1209' : '#C9A84C',border:'1px solid rgba(201,168,76,0.3)',borderRadius:20,fontSize:'.75rem',cursor:'pointer',fontFamily:'Georgia,serif',fontWeight: familiaId===f.id ? 700 : 400}}>
              {f.nombre} {f.especies.length > 0 ? `(${f.especies.length})` : ''}
            </button>
          ))}
        </div>

        {/* BUSCADOR */}
        <div style={{textAlign:'center',marginBottom:24}}>
          <input value={buscar} onChange={e=>setBuscar(e.target.value)} placeholder={`🔍 Buscar en ${familiaId}...`} style={{width:'100%',maxWidth:400,padding:'10px 16px',background:'#2A2010',color:'#E8C97A',border:'1px solid #C9A84C',borderRadius:8,fontSize:'.85rem',outline:'none'}}/>
        </div>

        {/* ESPECIES */}
        {filtrados.length > 0 ? (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:10}}>
            {filtrados.map((p,i) => (
              <button key={i} onClick={()=>setSel(p)} style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:10,padding:12,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif'}}>
                <div style={{width:'100%',height:90,background:'rgba(201,168,76,0.06)',borderRadius:6,marginBottom:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <img src="/logo.png" alt={p.nombre} style={{width:55,height:55,objectFit:'contain',opacity:.5}}/>
                </div>
                <div style={{fontSize:'.72rem',fontStyle:'italic',color:'#E8C97A',marginBottom:6,lineHeight:1.3}}>{p.nombre}</div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:'#C9A84C',fontWeight:700,fontSize:'.8rem'}}>${p.precio}</span>
                  <span style={{color:'rgba(232,201,122,0.35)',fontSize:'.62rem'}}>Stock: {p.stock}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div style={{textAlign:'center',padding:'60px 20px'}}>
            <p style={{color:'rgba(232,201,122,0.3)',fontSize:'1rem',marginBottom:8}}>
              {familia.especies.length === 0 ? `Próximamente especies de ${familiaId}` : 'No se encontraron especies'}
            </p>
            <p style={{color:'rgba(232,201,122,0.2)',fontSize:'.8rem'}}>Contáctanos por WhatsApp para consultar disponibilidad</p>
            <a href="https://wa.me/51940699405" target="_blank" style={{display:'inline-block',marginTop:16,background:'#25D366',color:'white',padding:'10px 24px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 Consultar disponibilidad</a>
          </div>
        )}
      </div>
    </div>
  )
}
