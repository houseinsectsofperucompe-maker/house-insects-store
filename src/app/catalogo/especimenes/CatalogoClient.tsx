'use client'
import BannerSlot from '@/components/BannerSlot'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import { useState, useEffect, Suspense } from 'react'
import CarritoCompras from '@/components/CarritoCompras'
import { useSearchParams } from 'next/navigation'

type E = { n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; video?:string; activo?:boolean; familia?:string }
type F = { id:string; nm:string; e:E[]; sub?:any[] }
type Orden = { o:string; f:F[] }

const ORDENES_BASE:Orden[] = [
  {o:'Lepidoptera Diurnae',f:['Brassolidae','Danidae','Heliconidae','Hesperiidae','Ithomiidae','Lycaenidae','Morphidae','Nymphalidae','Papilionidae','Pieridae','Riodinidae','Satyridae'].map(id=>({id,nm:id,e:[]}))},
  {o:'Moths Nocturnas',f:['Saturniidae','Sphingidae','Erebidae','Geometridae','Noctuidae','Arctiidae','Castniidae','Hepalidae','Uranidae'].map(id=>({id,nm:id,e:[]}))},
  {o:'Coleoptera',f:['Buprestidae','Cerambycidae','Dynastidae','Cetonidae','Chrysomelidae','Scarabaeidae','Cicindelidae','Curculionidae','Elateridae','Lucanidae','Rutilidae','Euchiridae','Trictenotomidae'].map(id=>({id,nm:id,e:[]}))},
  {o:'Arthropoda',f:['Araneae','Scorpiones','Chilopoda','Phasmatodea','Mantodea','Orthoptera','Homoptera','Hemiptera','Hymenoptera','Decapoda','Odonata'].map(id=>({id,nm:id,e:[]}))},
]
function CatalogoInner({familias}:{familias:any[]}) {
  const searchParams = useSearchParams()
  const [ordenes, setOrdenes] = useState<Orden[]>(ORDENES_BASE)
  const [loading, setLoading] = useState(true)
  const { items: carrito, updateItems: setCarrito } = useCarrito()
  const [showCarrito, setShowCarrito] = useState(false)
  const [ord, setOrd] = useState('Lepidoptera Diurnae')
  const [famSel, setFamSel] = useState('Brassolidae')
  const [pag, setPag] = useState(1)
  const [busq, setBusq] = useState('')
  const [sel, setSel] = useState<E|null>(null)
  const [subSel, setSubSel] = useState('')
  const [vista, setVista] = useState<'foto'|'fotoLado'|'fotoReverso'|'video'>('foto')
  const POR_PAG = 20

  useEffect(()=>{
    if(familias&&familias.length){
      const ordenMap:Record<string,F[]>={}
      familias.forEach((f:any)=>{
        const o=f.orden||'Lepidoptera Diurnae'
        if(!ordenMap[o]) ordenMap[o]=[]
        ordenMap[o].push({id:f.id,nm:f.nm||f.id,e:f.e||[],sub:f.sub||[]})
      })
      const nuevosOrdenes=Object.entries(ordenMap).map(([o,f])=>({o,f}))
      setOrdenes(nuevosOrdenes)
      if(nuevosOrdenes.length>0) setOrd(nuevosOrdenes[0].o)
      if(nuevosOrdenes[0]?.f.length>0) setFamSel(nuevosOrdenes[0].f[0].id)
    }
    setLoading(false)
  },[familias])

  useEffect(()=>{
    const f=searchParams.get('familia')
    const o=searchParams.get('orden')
    if(f) setFamSel(f)
    if(o) setOrd(o)
  },[searchParams])

  const ordenActual = ordenes.find(o=>o.o===ord)
  const fams = ordenActual?.f.filter(f=>f.e.length>0)||[]
  const famActual = ordenActual?.f.find(f=>f.id===famSel)
  const hasSubs=(famActual?.sub?.length||0)>0
  const subActual=famActual?.sub?.find((s:any)=>s.id===subSel)
  const todasEsp=hasSubs?(famActual?.sub?.flatMap((s:any)=>s.e||[])||[]):(famActual?.e||[])
  const espFiltradas = (subSel&&subActual?subActual.e:todasEsp).filter((e:any)=>!busq||(e.nombre||e.n||'').toLowerCase().includes(busq.toLowerCase()))
  const totalPags = Math.ceil(espFiltradas.length/POR_PAG)
  const pagEsp = espFiltradas.slice((pag-1)*POR_PAG, pag*POR_PAG)

  const G='#C9A84C', BD='rgba(201,168,76,0.2)'

  if(loading) return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'40px 20px'}}>
      <div style={{textAlign:'center',marginBottom:32}}>
        <div style={{width:80,height:80,borderRadius:'50%',background:'rgba(201,168,76,0.1)',margin:'0 auto 10px'}}/>
        <div style={{width:200,height:24,background:'rgba(201,168,76,0.1)',borderRadius:4,margin:'0 auto 8px'}}/>
        <div style={{width:300,height:14,background:'rgba(201,168,76,0.06)',borderRadius:4,margin:'0 auto'}}/>
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:24,flexWrap:'wrap'}}>
        {[1,2,3,4].map(i=><div key={i} style={{width:120,height:32,background:'rgba(201,168,76,0.08)',borderRadius:6}}/>)}
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:6,marginBottom:24,flexWrap:'wrap'}}>
        {[1,2,3,4,5,6,7,8].map(i=><div key={i} style={{width:80,height:24,background:'rgba(201,168,76,0.06)',borderRadius:20}}/>)}
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
        {Array(21).fill(0).map((_,i)=>(
          <div key={i} style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.08)',borderRadius:9,padding:10}}>
            <div style={{width:'100%',height:160,background:'rgba(201,168,76,0.06)',borderRadius:6,marginBottom:8}}/>
            <div style={{width:'80%',height:12,background:'rgba(201,168,76,0.06)',borderRadius:4,marginBottom:6}}/>
            <div style={{width:'40%',height:12,background:'rgba(201,168,76,0.04)',borderRadius:4}}/>
          </div>
        ))}
      </div>
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

      {/* Navbar */}
      <div style={{position:'fixed',top:0,left:0,right:0,zIndex:100,background:'rgba(26,18,9,0.95)',borderBottom:'1px solid rgba(201,168,76,0.2)',backdropFilter:'blur(8px)',display:'flex',alignItems:'center',padding:'0 24px',height:56}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/logo-house-insects-peru.png" style={{width:36,height:36,objectFit:'contain'}} onError={(e:any)=>{e.target.src='/logo.png'}}/>
          <span style={{color:'#C9A84C',fontSize:'.85rem',fontFamily:'Georgia,serif'}}>House Insects of Peru</span>
        </a>
        <div style={{flex:1}}/>
        <button onClick={()=>setShowCarrito(true)} style={{background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',borderRadius:8,padding:'7px 16px',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem',display:'flex',alignItems:'center',gap:8}}>
          🛒 <span>Carrito</span>
          {carrito.length>0&&<span style={{background:'#C9A84C',color:'#1A1209',borderRadius:10,padding:'1px 7px',fontSize:'.72rem',fontWeight:'bold'}}>{carrito.length}</span>}
        </button>
      </div>
      <div style={{height:56}}/>
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
          <button key={f.id} className="fam-btn" onClick={()=>{setFamSel(f.id);setPag(1);setSubSel('')}}
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
          {hasSubs&&(
            <div style={{display:'flex',flexWrap:'wrap',gap:5,margin:'0 0 12px',justifyContent:'center',padding:'8px 12px',background:'rgba(201,168,76,0.04)',borderRadius:8,border:'1px solid rgba(201,168,76,0.15)'}}>
              <button onClick={()=>setSubSel('')}
                style={{background:!subSel?'rgba(201,168,76,0.2)':'transparent',color:'#C9A84C',
                  border:`1px solid ${!subSel?'#C9A84C':'rgba(201,168,76,0.2)'}`,borderRadius:16,padding:'3px 10px',
                  cursor:'pointer',fontSize:'.68rem',fontFamily:'Georgia,serif'}}>
                Todas ({todasEsp.length})
              </button>
              {famActual?.sub?.map((s:any)=>(
                <button key={s.id} onClick={()=>setSubSel(s.id)}
                  style={{background:subSel===s.id?'rgba(201,168,76,0.2)':'transparent',color:'#C9A84C',
                    border:`1px solid ${subSel===s.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,borderRadius:16,padding:'3px 10px',
                    cursor:'pointer',fontSize:'.68rem',fontFamily:'Georgia,serif'}}>
                  {s.nm}{s.e?.length>0&&` (${s.e.length})`}
                </button>
              ))}
            </div>
          )}
          <p style={{textAlign:'center',color:'rgba(201,168,76,0.4)',fontSize:'.72rem',marginBottom:16}}>
            Mostrando {(pag-1)*POR_PAG+1}–{Math.min(pag*POR_PAG,espFiltradas.length)} de {espFiltradas.length} especies · Página {pag} de {totalPags||1}
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
            {pagEsp.map((e:any,i:number)=>(
              <button key={i} onClick={()=>window.location.href=`/catalogo/especimenes/${e.id||e.n?.replace(/ /g,'_')}`} className="esp-card">
                <div style={{width:'100%',height:160,background:'#000',borderRadius:6,marginBottom:6,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {e.foto
                    ? <img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={ev=>{(ev.target as HTMLImageElement).style.display='none'}}/>
                    : <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
                        <img src="/logo-house-insects-peru.png" style={{width:44,height:44,objectFit:'contain',opacity:.5}} onError={ev=>{(ev.target as HTMLImageElement).src='/logo.png'}}/>
                        <span style={{color:'rgba(201,168,76,0.35)',fontSize:'.5rem',letterSpacing:'.1em',marginTop:6}}><ST t="FOTO PRÓXIMAMENTE"/></span>
                      </div>
                  }
                </div>
                <p style={{color:G,fontSize:'.72rem',margin:'0 0 4px',fontStyle:'italic'}}>{e.nombre||e.n||e.id}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{color:'#5DBB63',fontSize:'.75rem',fontWeight:'bold'}}>${e.p}</span>
                  <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem'}}>🇵🇪 {e.s} unid</span>
                </div>
              </button>
            ))}
          </div>
          <BannerSlot espacio='entre-productos'/>
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

export default function CatalogoClient({familias}:{familias:any[]}) {
  return <Suspense><CatalogoInner familias={familias}/></Suspense>
}
