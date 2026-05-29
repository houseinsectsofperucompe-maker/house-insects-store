'use client'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import { useState, useEffect, Suspense } from 'react'
import CarritoCompras from '@/components/CarritoCompras'
import { useSearchParams } from 'next/navigation'

type E = { n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; video?:string; activo?:boolean; familia?:string }
type F = { id:string; nm:string; e:E[] }
type Orden = { o:string; f:F[] }

const ORDENES_BASE:Orden[] = [
  { o:'Lepidoptera Diurnae', f:['Brassolidae','Danaidae','Heliconidae','Ithomiidae','Hesperiidae','Lycaenidae','Morphidae','Nymphalidae','Papilionidae','Pieridae','Riodinidae','Satyridae'].map(id=>({id,nm:id,e:[]})) },
  { o:'Moths Nocturnas', f:['Arctiidae','Castnia','Hepalidae','Saturnidae','Sphingidae','Uranidae','Geometridae','Noctuidae','Erebidae'].map(id=>({id,nm:id,e:[]})) },
  { o:'Coleoptera', f:['Buprestidae','Carabidae','Cerambycidae','Cicindelidae','Curculionidae','Dynastidae','Lampyridae','Lucanidae','Scarabaeidae','Staphylinidae'].map(id=>({id,nm:id,e:[]})) },
  { o:'Arthropoda', f:['Arachnida','Chilopoda','Diplopoda','Mantodea','Phasmatodea','Scorpiones','Solifugae','Tarantulas'].map(id=>({id,nm:id,e:[]})) },
]

function CatalogoInner() {
  const searchParams = useSearchParams()
  const [ordenes, setOrdenes] = useState<Orden[]>(ORDENES_BASE)
  const [loading, setLoading] = useState(true)
  const [carrito, setCarrito] = useState<any[]>([])
  const [showCarrito, setShowCarrito] = useState(false)
  const [ord, setOrd] = useState('Lepidoptera Diurnae')
  const [famSel, setFamSel] = useState('Brassolidae')
  const [pag, setPag] = useState(1)
  const [busq, setBusq] = useState('')
  const [sel, setSel] = useState<E|null>(null)
  const [vista, setVista] = useState<'foto'|'fotoLado'|'fotoReverso'|'video'>('foto')
  const POR_PAG = 21

  useEffect(()=>{
    fetch('/api/datos')
      .then(r=>r.json())
      .then((data:any[])=>{
        if(data&&data.length){
          const ordenMap:Record<string,F[]>={}
          data.forEach((f:any)=>{
            const o=f.orden||'Lepidoptera Diurnae'
            if(!ordenMap[o]) ordenMap[o]=[]
            ordenMap[o].push({id:f.id,nm:f.nm||f.id,e:f.e||[]})
          })
          const nuevosOrdenes=Object.entries(ordenMap).map(([o,f])=>({o,f}))
          setOrdenes(nuevosOrdenes)
          if(nuevosOrdenes.length>0) setOrd(nuevosOrdenes[0].o)
          if(nuevosOrdenes[0]?.f.length>0) setFamSel(nuevosOrdenes[0].f[0].id)
        }
        setLoading(false)
      })
      .catch(()=>setLoading(false))
  },[])

  useEffect(()=>{
    const f=searchParams.get('familia')
    const o=searchParams.get('orden')
    if(f) setFamSel(f)
    if(o) setOrd(o)
  },[searchParams])

  const ordenActual = ordenes.find(o=>o.o===ord)
  const fams = ordenActual?.f.filter(f=>f.e.length>0)||[]
  const famActual = ordenActual?.f.find(f=>f.id===famSel)
  const espFiltradas = (famActual?.e||[]).filter(e=>!busq||e.n.toLowerCase().includes(busq.toLowerCase()))
  const totalPags = Math.ceil(espFiltradas.length/POR_PAG)
  const pagEsp = espFiltradas.slice((pag-1)*POR_PAG, pag*POR_PAG)

  const G='#C9A84C', BD='rgba(201,168,76,0.2)'

  if(loading) return (
    <div style={{minHeight:'100vh',background:'#1A1209',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif',color:G}}>
      ⏳ Cargando catálogo...
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      {showCarrito && <CarritoCompras items={carrito} onClose={()=>setShowCarrito(false)} onUpdateItems={setCarrito} onPagar={()=>{}}/>}
      <style>{`
        .esp-card{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.12);border-radius:9px;padding:10px;cursor:pointer;text-align:left;font-family:Georgia,serif;transition:transform 0.18s ease,border-color 0.18s ease,background 0.18s ease,box-shadow 0.18s ease}
        .esp-card:hover{transform:translateY(-5px) scale(1.04);border-color:rgba(201,168,76,0.55);background:rgba(201,168,76,0.11);box-shadow:0 10px 28px rgba(0,0,0,0.45)}
        .fam-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,background 0.15s ease,color 0.15s ease}
        .fam-btn:hover{transform:translateY(-3px) scale(1.08);box-shadow:0 6px 18px rgba(201,168,76,0.25)}
        .pag-btn{transition:transform 0.15s ease,box-shadow 0.15s ease}
        .pag-btn:hover:not(:disabled){transform:translateY(-2px) scale(1.1);box-shadow:0 4px 12px rgba(201,168,76,0.3)}
      `}</style>

      <div style={{position:'fixed',top:16,right:16,zIndex:50}}>
        <button onClick={()=>setShowCarrito(true)} style={{background:'rgba(201,168,76,0.15)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',borderRadius:8,padding:'8px 16px',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
          🛒 Mi Carrito {carrito.length>0?`(${carrito.length})`:''}
        </button>
      </div>
      {/* Header */}
      <div style={{textAlign:'center',marginBottom:32}}>
        <a href="/"><img src="/logo-house-insects-peru.png" style={{width:80,height:80,objectFit:'contain',marginBottom:10}} onError={e=>{(e.target as HTMLImageElement).src='/logo.png'}}/></a>
        <h1 style={{color:G,fontSize:'clamp(1.4rem,4vw,2rem)',fontWeight:'normal',letterSpacing:'.05em',margin:'0 0 6px'}}>Especimenes Biologicos Secos</h1>
        <p style={{color:'rgba(201,168,76,0.45)',fontSize:'.65rem',letterSpacing:'.15em',margin:0}}>HOUSE INSECTS OF PERU · AMAZONIA · SERFOR · CITES · RUC 20447397804</p>
      </div>

      {/* Ordenes */}
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:24,flexWrap:'wrap'}}>
        {ordenes.map(o=>(
          <button key={o.o} onClick={()=>{setOrd(o.o);setFamSel(o.f.find(f=>f.e.length>0)?.id||o.f[0]?.id||'');setPag(1)}}
            style={{background:ord===o.o?G:'rgba(201,168,76,0.08)',color:ord===o.o?'#1A1209':G,border:`1px solid ${BD}`,borderRadius:6,padding:'8px 18px',cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif'}}>
            {o.o}
          </button>
        ))}
      </div>

      {/* Familias */}
      <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:24,flexWrap:'wrap'}}>
        {ordenActual?.f.map(f=>(
          <button key={f.id} className="fam-btn" onClick={()=>{setFamSel(f.id);setPag(1)}}
            style={{background:famSel===f.id?'rgba(201,168,76,0.2)':'transparent',color:famSel===f.id?G:'rgba(201,168,76,0.5)',border:`1px solid ${famSel===f.id?G:'rgba(201,168,76,0.2)'}`,borderRadius:20,padding:'4px 12px',cursor:'pointer',fontSize:'.72rem',fontFamily:'Georgia,serif'}}>
            {f.nm}{f.e.length>0?` (${f.e.length})`:''}
          </button>
        ))}
      </div>

      {/* Buscar */}
      <div style={{maxWidth:500,margin:'0 auto 20px'}}>
        <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}}
          placeholder="Buscar..."
          style={{width:'100%',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:'10px 16px',color:G,fontFamily:'Georgia,serif',fontSize:'.85rem',outline:'none',boxSizing:'border-box'}}/>
      </div>

      {/* Vista detalle */}
      {sel ? (
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <button onClick={()=>setSel(null)} style={{color:G,fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:20}}>← Volver al catálogo</button>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            <div>
              <div style={{display:'flex',gap:6,marginBottom:8}}>
                {(['foto','fotoLado','fotoReverso','video'] as const).map(v=>(
                  <button key={v} onClick={()=>setVista(v)}
                    style={{background:vista===v?G:'rgba(201,168,76,0.1)',color:vista===v?'#1A1209':G,border:`1px solid ${BD}`,borderRadius:4,padding:'4px 10px',cursor:'pointer',fontSize:'.65rem',fontFamily:'Georgia,serif'}}>
                    {v==='foto'?'Frente':v==='fotoLado'?'Lado':v==='fotoReverso'?'Reverso':'Video'}
                  </button>
                ))}
              </div>
              {vista==='video'&&sel.video
                ? <video autoPlay loop muted playsInline style={{width:'100%',borderRadius:12,border:`2px solid ${G}`}}><source src={sel.video} type="video/mp4"/></video>
                : (sel as any)[vista]
                  ? <img src={(sel as any)[vista]} alt={sel.n} style={{width:'100%',height:300,objectFit:'contain',borderRadius:12,border:`2px solid ${G}`,background:'#000'}}/>
                  : <div style={{width:'100%',height:300,background:'rgba(201,168,76,0.05)',borderRadius:12,border:`2px solid ${BD}`,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(201,168,76,0.3)',fontSize:'.8rem'}}>Sin foto</div>
              }
            </div>
            <div>
              <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem',margin:'0 0 4px'}}>{sel.familia||famSel}</p>
              <h2 style={{color:G,fontStyle:'italic',margin:'0 0 20px',fontSize:'1.4rem'}}>{sel.n}</h2>
              <div style={{background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:16,marginBottom:16}}>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>PRECIO</p>
                <p style={{color:G,fontSize:'2rem',margin:'0 0 4px'}}>${sel.p}</p>
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:0}}>USD · Exportación con CITES/SERFOR</p>
              </div>
              <p style={{color:'rgba(201,168,76,0.6)',fontSize:'.8rem',margin:'0 0 16px'}}>Stock: <strong style={{color:G}}>{sel.s} unid</strong></p>
              <a href={`https://wa.me/51924286609?text=Hola, me interesa: ${sel.n} $${sel.p}`} target="_blank"
                style={{display:'block',background:'#25D366',color:'white',textAlign:'center',padding:'12px',borderRadius:8,textDecoration:'none',fontSize:'.85rem',fontFamily:'Georgia,serif'}}>
                💬 Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <p style={{textAlign:'center',color:'rgba(201,168,76,0.4)',fontSize:'.72rem',marginBottom:16}}>
            Mostrando {(pag-1)*POR_PAG+1}–{Math.min(pag*POR_PAG,espFiltradas.length)} de {espFiltradas.length} especies · Página {pag} de {totalPags||1}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
            {pagEsp.map((e,i)=>(
              <button key={i} onClick={()=>{setSel(e);setVista('foto')}} className="esp-card">
                <div style={{width:'100%',height:160,background:'#000',borderRadius:6,marginBottom:6,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {e.foto
                    ? <img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={ev=>{(ev.target as HTMLImageElement).style.display='none'}}/>
                    : <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
                        <img src="/logo-house-insects-peru.png" style={{width:44,height:44,objectFit:'contain',opacity:.5}} onError={ev=>{(ev.target as HTMLImageElement).src='/logo.png'}}/>
                        <span style={{color:'rgba(201,168,76,0.35)',fontSize:'.5rem',letterSpacing:'.1em',marginTop:6}}><ST t="FOTO PRÓXIMAMENTE"/></span>
                      </div>
                  }
                </div>
                <p style={{color:G,fontSize:'.72rem',margin:'0 0 4px',fontStyle:'italic'}}>{e.n}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{color:'#5DBB63',fontSize:'.75rem',fontWeight:'bold'}}>${e.p}</span>
                  <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem'}}>🇵🇪 {e.s} unid</span>
                </div>
              </button>
            ))}
          </div>
          {totalPags>1&&(
            <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:24}}>
              <button className="pag-btn" onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1}
                style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,color:G,padding:'8px 16px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',opacity:pag===1?0.4:1}}>←</button>
              <span style={{color:G,padding:'8px 16px',fontSize:'.8rem'}}>{pag} / {totalPags}</span>
              <button className="pag-btn" onClick={()=>setPag(p=>Math.min(totalPags,p+1))} disabled={pag===totalPags}
                style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,color:G,padding:'8px 16px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',opacity:pag===totalPags?0.4:1}}>→</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Page() {
  return <Suspense><CatalogoInner/></Suspense>
}
