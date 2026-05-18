'use client'
import { useState } from 'react'
type E = { n:string; p:number; s:number; foto?:string; video?:string }
type F = { id:string; nm:string; e:E[] }
const FAM:F[] = [
  { id:'Brassolidae', nm:'Brassolidae', e:[] },
  { id:'Danaidae', nm:'Danaidae', e:[] },
  { id:'Heliconidae', nm:'Heliconidae', e:[] },
  { id:'Lycaenidae', nm:'Lycaenidae', e:[] },
  { id:'Morphidae', nm:'Morphidae', e:[{n:'Morpho absoloni',p:45,s:100},{n:'Morpho aurora aureola',p:15,s:200},{n:'Morpho eugenia',p:20,s:50},{n:'Morpho lympharis selenarys',p:15,s:1000},{n:'Morpho sulkowskyi descimokoenigi',p:13,s:200},{n:'Morpho rhetenor cacica',p:35,s:500},{n:'Morpho rethenor helena',p:45,s:1000},{n:'Morpho telemachus',p:6,s:500},{n:'Morpho zephritis',p:14,s:1000},{n:'Morpho theseus juturna',p:24,s:500},{n:'Morpho menelaus assarpai',p:12,s:500},{n:'Morpho cisseis gahua',p:15,s:200},{n:'Morpho adonis huallaga',p:12,s:200},{n:'Morpho amphitrion cinerous',p:48,s:100},{n:'Morpho deidamia marie',p:7.5,s:1000},{n:'Morpho achilles helenor',p:5.5,s:1000},{n:'Morpho didius',p:6.5,s:5000},{n:'Morpho didius tingomaria',p:6.5,s:5000},{n:'Morpho menelaus michaelus',p:23,s:20},{n:'Morpho menelaus pucallpensis',p:21,s:50},{n:'Morpho helenor amazonius',p:7,s:200},{n:'Morpho mariosiajane',p:50,s:50},{n:'Morpho sulkowoskii nieva',p:30,s:50},{n:'Morpho sulkowoskii zachi',p:45,s:100},{n:'Morpho godartii julanthicus',p:12,s:500},{n:'Morpho menelaus zischkai',p:13,s:5000},{n:'Morpho rethenor mariosiojane small',p:45,s:200},{n:'Morpho aurora isidorssoni',p:18,s:100},{n:'Morpho aurora lamasi',p:16,s:200},{n:'Morpho cisseis gahua ssp gahua',p:120,s:10}] },
  { id:'Nymphalidae', nm:'Nymphalidae', e:[] },
  { id:'Papilionidae', nm:'Papilionidae', e:[] },
  { id:'Pieridae', nm:'Pieridae', e:[] },
  { id:'Riodinidae', nm:'Riodinidae', e:[] },
  { id:'Satyridae', nm:'Satyridae', e:[] }
]
const ORDS = [
  { o:'Lepidoptera Diurnae', f:FAM },
  { o:'Moths Nocturnas', f:[
    { id:'Arctiidae', nm:'Arctiidae', e:[] as E[] },
    { id:'Saturnidae', nm:'Saturnidae', e:[] as E[] },
    { id:'Sphingidae', nm:'Sphingidae', e:[] as E[] },
    { id:'Uranidae', nm:'Uranidae', e:[] as E[] },
    { id:'Geometridae', nm:'Geometridae', e:[] as E[] },
    { id:'Noctuidae', nm:'Noctuidae', e:[] as E[] },
  ] as F[] },
  { o:'Coleoptera', f:[
    { id:'Buprestidae', nm:'Buprestidae', e:[] as E[] },
    { id:'Cerambycidae', nm:'Cerambycidae', e:[] as E[] },
    { id:'Dynastidae', nm:'Dynastidae', e:[] as E[] },
    { id:'Lucanidae', nm:'Lucanidae', e:[] as E[] },
    { id:'Scarabaeidae', nm:'Scarabaeidae', e:[] as E[] },
  ] as F[] },
  { o:'Arthropoda', f:[
    { id:'Spider', nm:'Spider (Araneae)', e:[] as E[] },
    { id:'Mantidae', nm:'Mantidae (Mantis)', e:[] as E[] },
    { id:'Escorpion', nm:'Escorpion', e:[] as E[] },
    { id:'Odonata', nm:'Odonata', e:[] as E[] },
  ] as F[] },
]
const POR_PAG = 20
export default function Page() {
  const [ord, setOrd] = useState('Lepidoptera Diurnae')
  const [fid, setFid] = useState('Morphidae')
  const [sel, setSel] = useState<E|null>(null)
  const [q, setQ] = useState('')
  const [pag, setPag] = useState(1)
  const catAct = ORDS.find(c=>c.o===ord)!
  const fam = catAct.f.find(f=>f.id===fid)||catAct.f[0]
  const filtrados = fam.e.filter(e=>e.n.toLowerCase().includes(q.toLowerCase()))
  const totalPag = Math.ceil(filtrados.length/POR_PAG)
  const pagEsp = filtrados.slice((pag-1)*POR_PAG, pag*POR_PAG)
  if(sel) return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <button onClick={()=>setSel(null)} style={{color:'#C9A84C',fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:32,display:'block'}}>← Volver</button>
      <div style={{maxWidth:640,margin:'0 auto',textAlign:'center'}}>
        {sel.video&&<video autoPlay loop muted playsInline style={{width:'100%',maxWidth:400,borderRadius:12,border:'2px solid #C9A84C',marginBottom:16}}><source src={sel.video} type="video/mp4"/></video>}
        {!sel.video&&sel.foto&&<img src={sel.foto} alt={sel.n} style={{width:'100%',maxWidth:400,height:280,objectFit:'cover',borderRadius:12,border:'2px solid #C9A84C',marginBottom:16}}/>}
        {!sel.video&&!sel.foto&&<div style={{width:200,height:200,background:'rgba(201,168,76,0.08)',border:'2px solid #C9A84C',borderRadius:12,margin:'0 auto 16px',display:'flex',alignItems:'center',justifyContent:'center'}}><img src="/logo.png" style={{width:150,height:150,objectFit:'contain'}}/></div>}
        <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.75rem',marginBottom:4}}>Familia: {fid} · Amazonia Peruana · SERFOR · CITES</p>
        <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',fontStyle:'italic',marginBottom:20}}>{sel.n}</h1>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:20}}>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:14}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem',marginBottom:4}}>PRECIO USD</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>${sel.p}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:14}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem',marginBottom:4}}>STOCK</div>
            <div style={{color:'#E8C97A',fontSize:'1.5rem',fontWeight:700}}>{sel.s}</div>
          </div>
          <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:14}}>
            <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem',marginBottom:4}}>CALIDAD</div>
            <div style={{color:'#7EC87E',fontSize:'1rem',fontWeight:700}}>A1</div>
          </div>
        </div>
        <div style={{fontSize:'.75rem',color:'rgba(232,201,122,0.5)',marginBottom:20,lineHeight:1.8}}>SERFOR · CITES · ExportaFacil · DHL · FedEx · UPS · Aramex · RUC 20447397804</div>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <a href={`https://wa.me/51940699405?text=Me interesa: ${sel.n} USD $${sel.p}`} target="_blank" style={{background:'#25D366',color:'white',padding:'12px 22px',borderRadius:4,fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
          <a href={`https://wa.me/51920644433?text=Me interesa: ${sel.n} USD $${sel.p}`} target="_blank" style={{background:'#25D366',color:'white',padding:'12px 22px',borderRadius:4,fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
        </div>
      </div>
    </div>
  )
  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <a href="/" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:16}}>← Inicio</a>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:20}}>
          <img src="/logo.png" style={{width:72,height:72,marginBottom:10}}/>
          <h1 style={{fontSize:'1.6rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>Especimenes Biologicos Secos</h1>
          <p style={{color:'rgba(232,201,122,0.3)',fontSize:'.7rem'}}>HOUSE INSECTS OF PERU · AMAZONIA · SERFOR · CITES · RUC 20447397804</p>
        </div>
        <div style={{display:'flex',gap:4,flexWrap:'wrap',justifyContent:'center',marginBottom:12}}>
          {ORDS.map(c=>(
            <button key={c.o} onClick={()=>{setOrd(c.o);setFid(c.f[0].id);setQ('');setPag(1)}} style={{padding:'6px 12px',background:ord===c.o?'#C9A84C':'rgba(201,168,76,0.08)',color:ord===c.o?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.25)',borderRadius:4,fontSize:'.7rem',cursor:'pointer',fontWeight:ord===c.o?700:400}}>
              {c.o}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:3,flexWrap:'wrap',justifyContent:'center',marginBottom:14,padding:'8px',background:'rgba(201,168,76,0.03)',borderRadius:8,border:'1px solid rgba(201,168,76,0.08)'}}>
          {catAct.f.map(f=>(
            <button key={f.id} onClick={()=>{setFid(f.id);setQ('');setPag(1)}} style={{padding:'4px 10px',background:fid===f.id?'#C9A84C':'transparent',color:fid===f.id?'#1A1209':'rgba(201,168,76,0.6)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,fontSize:'.65rem',cursor:'pointer',fontStyle:'italic',fontWeight:fid===f.id?700:400}}>
              {f.nm}{f.e.length>0?` (${f.e.length})`:''}
            </button>
          ))}
        </div>
        <div style={{textAlign:'center',marginBottom:14}}>
          <input value={q} onChange={e=>{setQ(e.target.value);setPag(1)}} placeholder={`Buscar en ${fid}...`} style={{width:'100%',maxWidth:340,padding:'8px 14px',background:'#2A2010',color:'#E8C97A',border:'1px solid #C9A84C',borderRadius:8,fontSize:'.8rem',outline:'none'}}/>
        </div>
        {filtrados.length>0?(
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:7}}>
              {pagEsp.map((e,i)=>(
                <button key={i} onClick={()=>setSel(e)} style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:9,padding:10,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif'}}>
                  <div style={{width:'100%',height:75,background:'rgba(201,168,76,0.06)',borderRadius:5,marginBottom:6,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                    {e.foto?<img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}}/>:<img src="/logo.png" style={{width:44,height:44,objectFit:'contain',opacity:.4}}/>}
                  </div>
                  <div style={{fontSize:'.68rem',fontStyle:'italic',color:'#E8C97A',marginBottom:4,lineHeight:1.3}}>{e.n}</div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <span style={{color:'#C9A84C',fontWeight:700,fontSize:'.75rem'}}>${e.p}</span>
                    <span style={{color:'rgba(232,201,122,0.3)',fontSize:'.58rem'}}>{e.s}</span>
                  </div>
                </button>
              ))}
            </div>
            {totalPag>1&&(
              <div style={{display:'flex',gap:5,justifyContent:'center',flexWrap:'wrap',marginTop:20,paddingTop:14,borderTop:'1px solid rgba(201,168,76,0.12)'}}>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',color:pag===1?'rgba(201,168,76,0.25)':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:pag===1?'not-allowed':'pointer',fontSize:'.7rem'}}>← Ant</button>
                {Array.from({length:Math.min(totalPag,10)},(_,i)=>i+1).map(n=>(
                  <button key={n} onClick={()=>setPag(n)} style={{padding:'5px 9px',background:pag===n?'#C9A84C':'rgba(201,168,76,0.08)',color:pag===n?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:'pointer',fontSize:'.7rem',fontWeight:pag===n?700:400,minWidth:28}}>{n}</button>
                ))}
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',color:pag===totalPag?'rgba(201,168,76,0.25)':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:pag===totalPag?'not-allowed':'pointer',fontSize:'.7rem'}}>Sig →</button>
              </div>
            )}
          </>
        ):(
          <div style={{textAlign:'center',padding:'40px 20px'}}>
            <p style={{color:'rgba(232,201,122,0.3)',marginBottom:12}}>{fam.e.length===0?`Proximamente especies de ${fid}`:'No se encontraron'}</p>
            <a href="https://wa.me/51940699405" target="_blank" style={{display:'inline-block',background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.8rem'}}>Consultar disponibilidad</a>
          </div>
        )}
      </div>
    </div>
  )
}
