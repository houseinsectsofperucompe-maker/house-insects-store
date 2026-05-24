'use client'
import { useState } from 'react'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import { useParams, useRouter } from 'next/navigation'

type Vista = 'frente' | 'lado' | 'reverso' | 'video'

const VISTAS: Vista[] = ['frente', 'lado', 'reverso', 'video']

type Espécimen = {
  n: string
  p: number
  s: number
  foto?: string
  fotoLado?: string
  fotoReverso?: string
  video?: string
  familia?: string
}

const ESPECIMENES: Record<string, Espécimen> = {
  'morpho-didius': { n: 'Morpho didius', p: 7.0, s: 5000, familia: 'Morphidae' },
  'morpho-didius-tingomaria': { n: 'Morpho didius tingomaria', p: 7.0, s: 5000, familia: 'Morphidae' },
  'caligo-eurilochus': { n: 'Caligo eurilochus livius', p: 4.0, s: 800, familia: 'Brassolidae' },
}

export default function EspecimenPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCarrito()
  const id = params?.id as string
  const esp = ESPECIMENES[id]

  const [vista, setVista] = useState<Vista>('frente')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [lbOpen, setLbOpen] = useState(false)

  if (!esp) return (
    <div style={{background:'#1A1209',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif'}}>
      <div style={{textAlign:'center',color:'#E8C97A'}}>
        <div style={{fontSize:'3rem',marginBottom:16}}>🦋</div>
        <h1 style={{fontSize:'1.2rem',marginBottom:16}}>Espécimen no encontrado</h1>
        <button onClick={()=>router.push('/catalogo/especimenes')} style={{background:'#C9A84C',color:'#1A1209',border:'none',padding:'10px 24px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontWeight:700}}>← Volver al Catálogo</button>
      </div>
    </div>
  )

  const getFoto = () => {
    if (vista === 'frente') return esp.foto
    if (vista === 'lado') return esp.fotoLado
    if (vista === 'reverso') return esp.fotoReverso
    return null
  }

  const handleAdd = () => {
    addItem({ id, name: esp.n, price: esp.p, quantity: qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{background:'#1A1209',minHeight:'100vh',fontFamily:'Georgia,serif',color:'#E8C97A'}}>
      <style>{`
        @keyframes lbZoom{from{opacity:0;transform:scale(0.2) translateY(80px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyndef lbFade{from{opacity:0}to{opacity:1}}
        .lb-anim{animation:lbZoom 0.4s cubic-bezier(0.34,1.56,0.64,1)}
        .vista-btn{transition:all 0.18s;cursor:pointer}
        .vista-btn:hover{transform:translateY(-2px)}
        .lb-close-btn:hover{background:#C9A84C!important;color:#1A1209!important}
        .add-btn:hover{opacity:0.9;transform:translateY(-2px)}
        .back-btn:hover{color:#E8C97A!important}
      `}</style>

      {/* HEADER */}
      <div style={{background:'linear-gradient(135deg,#1A1209,#2A1A08)',borderBottom:'1px solid rgba(201,168,76,0.2)',padding:'12px 20px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <button onClick={()=>router.push('/catalogo/especimenes')} className="back-btn" style={{background:'transparent',border:'none',color:'rgba(201,168,76,0.5)',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
          ← <ST t="Catálogo"/>
        </button>
        <img src="/logo-house-insects-peru.png" style={{width:40,height:40,objectFit:'contain'}} alt="logo"/>
        <button onClick={()=>router.push('/')} className="back-btn" style={{background:'transparent',border:'none',color:'rgba(201,168,76,0.5)',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
          <ST t="Inicio"/>
        </button>
      </div>

      <div style={{maxWidth:500,margin:'0 auto',padding:'20px 16px'}}>

        {/* FOTO PRINCIPAL */}
        <div
          onClick={()=>setLbOpen(true)}
          style={{width:'100%',height:320,background:'#0A0A05',borderRadius:12,overflow:'hidden',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'center',cursor:'zoom-in',border:'1px solid rgba(201,168,76,0.2)',position:'relative'}}
        >
          {vista === 'video' && esp.video ? (
            <video src={esp.video} autoPlay loop muted playsInline style={{width:'100%',height:'100%',objectFit:'contain'}}/>
          ) : getFoto() ? (
            <img src={getFoto()} alt={esp.n} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
          ) : (
            <div style={{textAlign:'center',color:'rgba(201,168,76,0.3)'}}>
              <img src="/logo-house-insects-peru.png" style={{width:100,height:100,objectFit:'contain',opacity:.4,marginBottom:8}} alt=""/>
              <div style={{fontSize:'.7rem',fontFamily:'Georgia,serif'}}><ST t="Foto próximamente"/></div>
            </div>
          )}
          <div style={{position:'absolute',bottom:8,right:8,background:'rgba(0,0,0,0.5)',borderRadius:20,padding:'4px 10px',fontSize:'.6rem',color:'rgba(201,168,76,0.6)'}}>
            🔍 <ST t="Toca para ampliar"/>
          </div>
        </div>

        {/* BOTONES DE VISTA */}
        <div style={{display:'flex',gap:6,marginBottom:16,justifyContent:'center'}}>
          {VISTAS.map(v => (
            <button key={v} onClick={()=>setVista(v)} className="vista-btn" style={{
              padding:'6px 12px',borderRadius:20,fontSize:'.65rem',
              background:vista===v?'#C9A84C':'rgba(201,168,76,0.08)',
              color:vista===v?'#1A1209':'rgba(201,168,76,0.5)',
              border:`1px solid ${vista===v?'#C9A84C':'rgba(201,168,76,0.2)'}`,
              fontFamily:'Georgia,serif',fontWeight:vista===v?700:400
            }}>
              {v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video'}
            </button>
          ))}
        </div>

        {/* INFO */}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',letterSpacing:'.1em',marginBottom:4}}>{esp.familia}</div>
          <h1 style={{fontSize:'1.4rem',fontWeight:400,fontStyle:'italic',marginBottom:8,lineHeight:1.3}}>{esp.n}</h1>
          <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:12}}>
            <span style={{fontSize:'1.6rem',fontWeight:700,color:'#C9A84C'}}>${esp.p.toFixed(2)}</span>
            <span style={{fontSize:'.7rem',color:'rgba(201,168,76,0.4)'}}>USD · <ST t="Stock"/>: {esp.s.toLocaleString()}</span>
          </div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
            {['CITES','SERFOR','SENASA'].map(c=>(
              <span key={c} style={{background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:20,padding:'3px 10px',fontSize:'.6rem',color:'#25D366'}}>✓ {c}</span>
            ))}
          </div>
        </div>

        {/* CANTIDAD Y CARRITO */}
        <div style={{display:'flex',gap:8,marginBottom:12,alignItems:'center'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:'6px 12px'}}>
            <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{background:'transparent',border:'none',color:'#C9A84C',cursor:'pointer',fontSize:'1.1rem',fontWeight:700}}>−</button>
            <span style={{color:'#E8C97A',minWidth:24,textAlign:'center'}}>{qty}</span>
            <button onClick={()=>setQty(q=>Math.min(esp.s,q+1))} style={{background:'transparent',border:'none',color:'#C9A84C',cursor:'pointer',fontSize:'1.1rem',fontWeight:700}}>+</button>
          </div>
          <button onClick={handleAdd} className="add-btn" style={{
            flex:1,background:added?'#25D366':'#C9A84C',color:'#1A1209',border:'none',
            borderRadius:8,padding:'12px',fontSize:'.85rem',fontWeight:700,
            cursor:'pointer',fontFamily:'Georgia,serif',transition:'all 0.2s'
          }}>
            {added?'✓ Agregado':'🛒 Agregar al Carrito'}
          </button>
        </div>

        <a href={`https://wa.me/51940699405?text=Hola, quiero información sobre ${esp.n}`} target="_blank" style={{display:'block',textAlign:'center',background:'rgba(37,211,102,0.1)',border:'1px solid rgba(37,211,102,0.3)',borderRadius:8,padding:'10px',color:'#25D366',textDecoration:'none',fontSize:'.8rem',marginBottom:20}}>
          💬 <ST t="Consultar por WhatsApp"/>
        </a>

        <button onClick={()=>router.push('/catalogo/especimenes')} style={{width:'100%',background:'transparent',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:'10px',color:'rgba(201,168,76,0.4)',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
          ← <ST t="Volver al Catálogo"/>
        </button>
      </div>

      {/* LIGHTBOX */}
      {lbOpen && (
        <div
          onClick={(e)=>{if((e.target as HTMLElement).id==='lb-bg')setLbOpen(false)}}
          id="lb-bg"
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.93)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <div className="lb-anim" style={{background:'#1A1209',border:'1px solid rgba(201,168,76,0.35)',borderRadius:14,width:340,maxWidth:'94vw',padding:16,position:'relative'}}>
            <button
              onClick={()=>setLbOpen(false)}
              className="lb-close-btn"
              style={{position:'absolute',top:8,right:8,width:42,height:42,background:'rgba(201,168,76,0.15)',border:'2px solid rgba(201,168,76,0.5)',borderRadius:'50%',cursor:'pointer',fontSize:'1.4rem',fontWeight:700,color:'#C9A84C',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Arial,sans-serif',zIndex:10,transition:'all 0.2s'}}
            >✕</button>

            <div style={{width:'100%',height:280,background:'#0A0A05',borderRadius:10,overflow:'hidden',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'center'}}>
              {vista==='video'&&esp.video?(
                <video src={esp.video} autoPlay loop muted playsInline style={{width:'100%',height:'100%',objectFit:'contain'}}/>
              ):getFoto()?(
                <img src={getFoto()} alt={esp.n} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
              ):(
                <div style={{textAlign:'center',color:'rgba(201,168,76,0.3)',fontSize:'.65rem',fontFamily:'Georgia,serif'}}>
                  <div style={{fontSize:'2.5rem',marginBottom:8}}>📷</div>
                  <div>{vista.toUpperCase()} · PRÓXIMAMENTE</div>
                </div>
              )}
            </div>

            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
              <button onClick={()=>setVista(v=>{const i=VISTAS.indexOf(v);return VISTAS[Math.max(0,i-1)]})} disabled={vista===VISTAS[0]} style={{width:38,height:38,borderRadius:'50%',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.25)',cursor:'pointer',color:'#C9A84C',fontSize:'1.1rem',opacity:vista===VISTAS[0]?0.2:1,display:'flex',alignItems:'center',justifyContent:'center'}}>←</button>
              <div style={{display:'flex',gap:4,flex:1,justifyContent:'center'}}>
                {VISTAS.map(v=>(
                  <button key={v} onClick={()=>setVista(v)} style={{padding:'5px 8px',borderRadius:14,fontSize:'.6rem',cursor:'pointer',border:'1px solid rgba(201,168,76,0.2)',background:vista===v?'#C9A84C':'transparent',color:vista===v?'#1A1209':'rgba(201,168,76,0.4)',fontFamily:'Georgia,serif'}}>
                    {v==='frente'?'Frente':v==='lado'?'Lado':v==='reverso'?'Reverso':'Video'}
                  </button>
                ))}
              </div>
              <button onClick={()=>setVista(v=>{const i=VISTAS.indexOf(v);return VISTAS[Math.min(VISTAS.length-1,i+1)]})} disabled={vista===VISTAS[VISTAS.length-1]} style={{width:38,height:38,borderRadius:'50%',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.25)',cursor:'pointer',color:'#C9A84C',fontSize:'1.1rem',opacity:vista===VISTAS[VISTAS.length-1]?0.2:1,display:'flex',alignItems:'center',justifyContent:'center'}}>→</button>
            </div>

            <div style={{textAlign:'center',fontSize:'.75rem',fontStyle:'italic',color:'#E8C97A',marginBottom:4}}>{esp.n}</div>
            <div style={{fontSize:'.55rem',color:'rgba(201,168,76,0.2)',textAlign:'center',fontFamily:'Georgia,serif'}}>Toca fuera para cerrar</div>
          </div>
        </div>
      )}
    </div>
  )
}
