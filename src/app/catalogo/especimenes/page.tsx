'use client'
import { useState } from 'react'
type E = { nombre:string; precio:number; stock:number; calidad:string; foto?:string; video?:string }
type F = { id:string; nombre:string; especies:E[] }
const CATALOGOS = [
  { orden:'🦋 LEPIDOPTERA — Butterflies Diurnae', familias:[
    { id:'Brassolidae', nombre:'Brassolidae', especies:[] as E[] },
    { id:'Danaidae', nombre:'Danaidae', especies:[] as E[] },
    { id:'Heliconidae', nombre:'Heliconidae', especies:[] as E[] },
    { id:'Hesperiidae', nombre:'Hesperiidae', especies:[] as E[] },
    { id:'Ithomidae', nombre:'Ithomidae', especies:[] as E[] },
    { id:'Lycaenidae', nombre:'Lycaenidae', especies:[] as E[] },
    { id:'Morphidae', nombre:'Morphidae', especies:[
      {nombre:'Morpho absoloni',precio:45,stock:100,calidad:'A1'},
      {nombre:'Morpho aurora aureola',precio:15,stock:200,calidad:'A1'},
      {nombre:'Morpho eugenia',precio:20,stock:50,calidad:'A1'},
      {nombre:'Morpho lympharis selenarys',precio:15,stock:1000,calidad:'A1'},
      {nombre:'Morpho sulkowskyi descimokoenigi',precio:13,stock:200,calidad:'A1'},
      {nombre:'Morpho rhetenor cacica',precio:35,stock:500,calidad:'A1'},
      {nombre:'Morpho rethenor helena',precio:45,stock:1000,calidad:'A1'},
      {nombre:'Morpho telemachus',precio:6,stock:500,calidad:'A1'},
      {nombre:'Morpho zephritis',precio:14,stock:1000,calidad:'A1'},
      {nombre:'Morpho theseus juturna',precio:24,stock:500,calidad:'A1'},
      {nombre:'Morpho menelaus assarpai',precio:12,stock:500,calidad:'A1'},
      {nombre:'Morpho cisseis gahua',precio:15,stock:200,calidad:'A1'},
      {nombre:'Morpho cisseis phanademus',precio:18,stock:50,calidad:'A1'},
      {nombre:'Morpho adonis huallaga',precio:12,stock:200,calidad:'A1'},
      {nombre:'Morpho amphitrion cinerous',precio:48,stock:100,calidad:'A1'},
      {nombre:'Morpho deidamia marie',precio:7.5,stock:1000,calidad:'A1'},
      {nombre:'Morpho achilles helenor',precio:5.5,stock:1000,calidad:'A1'},
      {nombre:'Morpho didius',precio:6.5,stock:5000,calidad:'A1'},
      {nombre:'Morpho didius tingomaria',precio:6.5,stock:5000,calidad:'A1'},
      {nombre:'Morpho menelaus michaelus',precio:23,stock:20,calidad:'A1'},
      {nombre:'Morpho menelaus pucallpensis',precio:21,stock:50,calidad:'A1'},
      {nombre:'Morpho helenor amazonius',precio:7,stock:200,calidad:'A1'},
      {nombre:'Morpho mariosiajane',precio:50,stock:50,calidad:'A1'},
      {nombre:'Morpho sulkowoskii nieva',precio:30,stock:50,calidad:'A1'},
      {nombre:'Morpho sulkowoskii zachi',precio:45,stock:100,calidad:'A1'},
      {nombre:'Morpho godartii julanthicus',precio:12,stock:500,calidad:'A1'},
      {nombre:'Morpho menelaus zischkai',precio:13,stock:5000,calidad:'A1'},
      {nombre:'Morpho rethenor mariosiojane small',precio:45,stock:200,calidad:'A1'},
      {nombre:'Morpho aurora isidorssoni',precio:18,stock:100,calidad:'A1'},
      {nombre:'Morpho aurora lamasi',precio:16,stock:200,calidad:'A1'},
      {nombre:'Morpho cisseis gahua ssp gahua',precio:120,stock:10,calidad:'A1'},
    ] as E[]},
    { id:'Nymphalidae', nombre:'Nymphalidae', especies:[] as E[] },
    { id:'Papilionidae', nombre:'Papilionidae', especies:[] as E[] },
    { id:'Pieridae', nombre:'Pieridae', especies:[] as E[] },
    { id:'Riodinidae', nombre:'Riodinidae', especies:[] as E[] },
    { id:'Satyridae', nombre:'Satyridae', especies:[] as E[] },
  ] as F[]},
  { orden:'🌙 MOTHS — Lepidoptera Nocturnas', familias:[
    { id:'Arctiidae', nombre:'Arctiidae', especies:[] as E[] },
    { id:'Castnia', nombre:'Castnia', especies:[] as E[] },
    { id:'Hepalidae', nombre:'Hepalidae', especies:[] as E[] },
    { id:'Noctuidae', nombre:'Noctuidae', especies:[] as E[] },
    { id:'Saturnidae', nombre:'Saturnidae', especies:[] as E[] },
    { id:'Sphingidae', nombre:'Sphingidae', especies:[] as E[] },
    { id:'Uranidae', nombre:'Uranidae', especies:[] as E[] },
    { id:'Geometridae', nombre:'Geometridae', especies:[] as E[] },
    { id:'Eribidae', nombre:'Eribidae', especies:[] as E[] },
  ] as F[]},
  { orden:'🪲 COLEOPTERA — Insectos', familias:[
    { id:'Buprestidae', nombre:'Buprestidae', especies:[] as E[] },
    { id:'Cerambycidae', nombre:'Cerambycidae', especies:[] as E[] },
    { id:'Cetonidae', nombre:'Cetonidae', especies:[] as E[] },
    { id:'Chrysomelidae', nombre:'Chrysomelidae', especies:[] as E[] },
    { id:'Cicindelidae', nombre:'Cicindelidae', especies:[] as E[] },
    { id:'Curculionidae', nombre:'Curculionidae', especies:[] as E[] },
    { id:'Dynastidae', nombre:'Dynastidae', especies:[] as E[] },
    { id:'Elateridae', nombre:'Elateridae', especies:[] as E[] },
    { id:'Euchiridae', nombre:'Euchiridae', especies:[] as E[] },
    { id:'Rutilidae', nombre:'Rutilidae', especies:[] as E[] },
    { id:'Lucanidae', nombre:'Lucanidae', especies:[] as E[] },
    { id:'Scarabaeidae', nombre:'Scarabaeidae', especies:[] as E[] },
    { id:'Trictenotomidae', nombre:'Trictenotomidae', especies:[] as E[] },
  ] as F[]},
  { orden:'🕷️ ARTHROPODA — Artrópodos', familias:[
    { id:'Spider', nombre:'Spider (Araneae)', especies:[] as E[] },
    { id:'Homoptera', nombre:'Homoptera (Cicada)', especies:[] as E[] },
    { id:'Phasmidae', nombre:'Phasmidae', especies:[] as E[] },
    { id:'Phylliidae', nombre:'Phylliidae', especies:[] as E[] },
    { id:'Mantidae', nombre:'Mantidae (Mantis)', especies:[] as E[] },
    { id:'Orthoptera', nombre:'Orthoptera (Grillidae)', especies:[] as E[] },
    { id:'Hemiptera', nombre:'Hemiptera', especies:[] as E[] },
    { id:'Hymenoptera', nombre:'Hymenoptera', especies:[] as E[] },
    { id:'Escorpion', nombre:'Escorpión', especies:[] as E[] },
    { id:'Odonata', nombre:'Odonata', especies:[] as E[] },
  ] as F[]},
]
const todasFamilias = CATALOGOS.flatMap(c=>c.familias)
export default function EspecimenesPage() {
  const [ordenActivo, setOrdenActivo] = useState('🦋 LEPIDOPTERA — Butterflies Diurnae')
  const [familiaId, setFamiliaId] = useState('Morphidae')
  const [sel, setSel] = useState<E|null>(null)
  const [buscar, setBuscar] = useState('')
  const [fotoIdx, setFotoIdx] = useState(0)
  const catalogoActivo = CATALOGOS.find(c=>c.orden===ordenActivo)!
  const familia = todasFamilias.find(f=>f.id===familiaId)||catalogoActivo.familias[0]
  const filtrados = familia.especies.filter(p=>p.nombre.toLowerCase().includes(buscar.toLowerCase()))
  if (sel) return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <button onClick={()=>setSel(null)} style={{color:'#C9A84C',fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:32,display:'block'}}>← Volver al catálogo</button>
      <div style={{maxWidth:640,margin:'0 auto',textAlign:'center'}}>
        {sel.video ? (
          <video autoPlay loop muted playsInline style={{width:'100%',maxWidth:400,borderRadius:12,border:'2px solid #C9A84C',marginBottom:16}}>
            <source src={sel.video} type="video/mp4"/>
          </video>
        ) : (
          <div style={{width:220,height:220,background:'rgba(201,168,76,0.08)',border:'2px solid #C9A84C',borderRadius:12,margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src="/logo.png" alt={sel.nombre} style={{width:160,height:160,objectFit:'contain'}}/>
          </div>
        )}
        <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',marginBottom:4}}>Familia: {familiaId} · Orden: Lepidoptera · Amazonía Peruana</p>
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
        <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:14,marginBottom:20,fontSize:'.78rem',color:'rgba(232,201,122,0.6)',lineHeight:1.9}}>
          ✅ SERFOR · ✅ CITES · ✅ Envío mundial · 📦 ExportaFácil · DHL · FedEx · UPS · Aramex<br/>
          🏛️ House Insects of Peru E.I.R.L. · RUC 20447397804 · Ley Amazónia N°27037
        </div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${sel.nombre} USD $${sel.precio}`} target="_blank" style={{background:'#25D366',color:'white',padding:'12px 22px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 940 699 405</a>
          <a href={`https://wa.me/51920644433?text=Hola, me interesa: ${sel.nombre} USD $${sel.precio}`} target="_blank" style={{background:'#25D366',color:'white',padding:'12px 22px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.85rem'}}>💬 +51 920 644 433</a>
        </div>
        <a href={`mailto:houseinsectsofperu.com.pe@gmail.com?subject=Consulta: ${sel.nombre}`} style={{display:'block',marginTop:8,color:'#C9A84C',fontSize:'.82rem',textDecoration:'none'}}>✉️ houseinsectsofperu.com.pe@gmail.com</a>
      </div>
    </div>
  )
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:20}}>← Volver al inicio</a>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <img src="/logo.png" alt="House Insects of Peru" style={{width:80,height:80,marginBottom:10}}/>
          <h1 style={{fontSize:'1.7rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>Especímenes Biológicos Secos</h1>
          <p style={{color:'rgba(232,201,122,0.35)',fontSize:'.72rem',letterSpacing:'.12em'}}>HOUSE INSECTS OF PERU · AMAZONÍA PERUANA · SERFOR · CITES · RUC 20447397804</p>
        </div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap',justifyContent:'center',marginBottom:14}}>
          {CATALOGOS.map(c=>(
            <button key={c.orden} onClick={()=>{setOrdenActivo(c.orden);setFamiliaId(c.familias[0].id);setBuscar('');setSel(null)}}
              style={{padding:'7px 14px',background:ordenActivo===c.orden?'#C9A84C':'rgba(201,168,76,0.08)',color:ordenActivo===c.orden?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.3)',borderRadius:4,fontSize:'.72rem',cursor:'pointer',fontFamily:'Georgia,serif',fontWeight:ordenActivo===c.orden?700:400}}>
              {c.orden}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:4,flexWrap:'wrap',justifyContent:'center',marginBottom:18,padding:'10px',background:'rgba(201,168,76,0.03)',borderRadius:8,border:'1px solid rgba(201,168,76,0.08)'}}>
          {catalogoActivo.familias.map(f=>(
            <button key={f.id} onClick={()=>{setFamiliaId(f.id);setBuscar('');setSel(null)}}
              style={{padding:'5px 11px',background:familiaId===f.id?'#C9A84C':'transparent',color:familiaId===f.id?'#1A1209':'rgba(201,168,76,0.65)',border:'1px solid rgba(201,168,76,0.18)',borderRadius:14,fontSize:'.68rem',cursor:'pointer',fontFamily:'Georgia,serif',fontStyle:'italic',fontWeight:familiaId===f.id?700:400}}>
              {f.nombre}{f.especies.length>0?` (${f.especies.length})`:''}
            </button>
          ))}
        </div>
        <div style={{textAlign:'center',marginBottom:18}}>
          <input value={buscar} onChange={e=>setBuscar(e.target.value)} placeholder={`🔍 Buscar en ${familiaId}...`} style={{width:'100%',maxWidth:360,padding:'9px 14px',background:'#2A2010',color:'#E8C97A',border:'1px solid #C9A84C',borderRadius:8,fontSize:'.82rem',outline:'none'}}/>
        </div>
        {filtrados.length>0?(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:8}}>
            {filtrados.map((p,i)=>(
              <button key={i} onClick={()=>setSel(p)} style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.14)',borderRadius:10,padding:11,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif'}}>
                <div style={{width:'100%',height:80,background:'rgba(201,168,76,0.06)',borderRadius:6,marginBottom:7,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                  {p.foto ? <img src={p.foto} alt={p.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <img src="/logo.png" alt={p.nombre} style={{width:48,height:48,objectFit:'contain',opacity:.45}}/>}
                </div>
                <div style={{fontSize:'.7rem',fontStyle:'italic',color:'#E8C97A',marginBottom:5,lineHeight:1.3}}>{p.nombre}</div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:'#C9A84C',fontWeight:700,fontSize:'.78rem'}}>${p.precio}</span>
                  <span style={{color:'rgba(232,201,122,0.3)',fontSize:'.6rem'}}>Stock: {p.stock}</span>
                </div>
              </button>
            ))}
          </div>
        ):(
          <div style={{textAlign:'center',padding:'50px 20px'}}>
            <p style={{color:'rgba(232,201,122,0.3)',marginBottom:8}}>{familia.especies.length===0?`Próximamente especies de ${familiaId}`:'No se encontraron especies'}</p>
            <a href="https://wa.me/51940699405" target="_blank" style={{display:'inline-block',marginTop:12,background:'#25D366',color:'white',padding:'10px 22px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.82rem'}}>💬 Consultar disponibilidad</a>
          </div>
        )}
      </div>
    </div>
  )
}
