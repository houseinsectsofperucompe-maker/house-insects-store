'use client'
import { useState, useEffect } from 'react'
import { useCarrito } from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'

type Producto = { id?:string; n:string; p:number; s:number; foto?:string; fotoLado?:string; fotoReverso?:string; video?:string; descripcion?:string; calidad?:string; tamano?:string }

export default function RubroCatalogo({ rubroId }:{ rubroId:string }) {
  const { items: carrito, addItem, updateItems: setCarrito } = useCarrito()
  const [showCarrito, setShowCarrito] = useState(false)
  const [rubro, setRubro] = useState<any>(null)
  const [sel, setSel] = useState<Producto|null>(null)
  const [vista, setVista] = useState<'foto'|'fotoLado'|'fotoReverso'|'video'>('foto')
  const [qty, setQty] = useState(1)
  const [pag, setPag] = useState(1)
  const [busq, setBusq] = useState('')
  const POR_PAG = 21
  const G = '#C9A84C', BD = 'rgba(201,168,76,0.2)'

  useEffect(()=>{
    fetch('/api/datos?tipo=rubros')
      .then(r=>r.json())
      .then((data:any[])=>{
        const found = data.find(r=>r.id===rubroId)
        setRubro(found||null)
      })
  },[rubroId])

  const productos:Producto[] = rubro?.productos || []
  const filtrados = productos.filter(p=>!busq||p.n.toLowerCase().includes(busq.toLowerCase()))
  const totalPags = Math.ceil(filtrados.length/POR_PAG)
  const pagProds = filtrados.slice((pag-1)*POR_PAG, pag*POR_PAG)

  return (
    <div>
      {showCarrito && <CarritoCompras items={carrito} onClose={()=>setShowCarrito(false)} onUpdateItems={setCarrito} onPagar={()=>{}}/>}

      {/* Buscar */}
      <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="Buscar producto..."
        style={{width:'100%',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:'10px 16px',color:G,fontFamily:'Georgia,serif',fontSize:'.85rem',outline:'none',boxSizing:'border-box' as const,marginBottom:16}}/>

      {!rubro ? (
        <div style={{textAlign:'center',padding:'40px',color:'rgba(201,168,76,0.4)',fontFamily:'Georgia,serif'}}>⏳ Cargando...</div>
      ) : sel ? (
        <div>
          <button onClick={()=>setSel(null)} style={{color:G,fontSize:'.8rem',background:'none',border:'none',cursor:'pointer',marginBottom:20,fontFamily:'Georgia,serif'}}>← Volver</button>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
            <div>
              <div style={{display:'flex',gap:6,marginBottom:8}}>
                {(['foto','fotoLado','fotoReverso','video'] as const).filter(v=>v==='foto'||(sel as any)[v]).map(v=>(
                  <button key={v} onClick={()=>setVista(v)} style={{background:vista===v?G:'rgba(201,168,76,0.1)',color:vista===v?'#1A1209':G,border:`1px solid ${BD}`,borderRadius:4,padding:'4px 10px',cursor:'pointer',fontSize:'.65rem',fontFamily:'Georgia,serif'}}>
                    {v==='foto'?'Frente':v==='fotoLado'?'Lado':v==='fotoReverso'?'Reverso':'Video'}
                  </button>
                ))}
              </div>
              {vista==='video'&&sel.video
                ? <video src={sel.video} controls style={{width:'100%',borderRadius:12,border:`2px solid ${G}`}}/>
                : (sel as any)[vista]
                  ? <img src={(sel as any)[vista]} alt={sel.n} style={{width:'100%',height:320,objectFit:'contain',borderRadius:12,border:`2px solid ${G}`,background:'#000'}}/>
                  : <div style={{width:'100%',height:320,background:'rgba(201,168,76,0.05)',borderRadius:12,border:`2px solid ${BD}`,display:'flex',alignItems:'center',justifyContent:'center',color:'rgba(201,168,76,0.3)',fontSize:'.8rem'}}>Sin foto</div>
              }
            </div>
            <div>
              <h2 style={{color:G,fontStyle:'italic',margin:'0 0 16px',fontSize:'1.4rem'}}>{sel.n}</h2>
              {sel.descripcion&&<p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',marginBottom:16,lineHeight:1.6}}>{sel.descripcion}</p>}
              <div style={{background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:16,marginBottom:16}}>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>PRECIO</p>
                <p style={{color:G,fontSize:'2rem',margin:'0 0 4px'}}>${sel.p}</p>
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:0}}>USD · Exportación con CITES/SERFOR</p>
              </div>
              <p style={{color:'rgba(201,168,76,0.6)',fontSize:'.8rem',margin:'0 0 16px'}}>Stock: <strong style={{color:G}}>{sel.s} unid</strong></p>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{background:'rgba(255,80,80,0.15)',border:'1px solid rgba(255,80,80,0.3)',color:'#ff5050',borderRadius:6,width:36,height:36,cursor:'pointer',fontSize:'1.2rem'}}>−</button>
                <span style={{color:G,minWidth:32,textAlign:'center' as const}}>{qty}</span>
                <button onClick={()=>setQty(q=>q+1)} style={{background:'rgba(93,187,99,0.15)',border:'1px solid rgba(93,187,99,0.3)',color:'#5DBB63',borderRadius:6,width:36,height:36,cursor:'pointer',fontSize:'1.2rem'}}>+</button>
              </div>
              <button onClick={()=>addItem({id: String(Date.now()), nombre: sel.n, n: sel.n, p: sel.p, rubro: rubroId, foto: '', familia: ''})} style={{width:'100%',padding:'12px',background:G,color:'#1A1209',border:'none',borderRadius:8,fontWeight:700,fontSize:'1rem',cursor:'pointer',fontFamily:'Georgia,serif',marginBottom:8}}>
                🛒 Agregar al carrito
              </button>
              <a href={`https://wa.me/51940699405?text=Hola, me interesa: ${sel.n} $${sel.p}`} target="_blank"
                style={{display:'block',padding:'12px',background:'rgba(37,211,102,0.15)',color:'#25D366',border:'1px solid rgba(37,211,102,0.3)',borderRadius:8,textAlign:'center' as const,textDecoration:'none',fontSize:'.85rem',fontFamily:'Georgia,serif'}}>
                💬 Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      ) : productos.length===0 ? (
        <div style={{textAlign:'center',padding:'60px 20px',color:'rgba(201,168,76,0.4)',fontFamily:'Georgia,serif'}}>
          <p style={{fontSize:'1.5rem',marginBottom:8}}>🦋</p>
          <p style={{fontSize:'.9rem'}}>Productos próximamente</p>
        </div>
      ) : (
        <>
          <p style={{textAlign:'center',color:'rgba(201,168,76,0.4)',fontSize:'.72rem',marginBottom:16,fontFamily:'Georgia,serif'}}>
            {filtrados.length} productos disponibles
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
            {pagProds.map((p,i)=>(
              <button key={i} onClick={()=>{setSel(p);setVista('foto');setQty(1)}}
                style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:9,padding:10,cursor:'pointer',textAlign:'left' as const,fontFamily:'Georgia,serif'}}>
                <div style={{width:'100%',height:160,background:'#000',borderRadius:6,marginBottom:6,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {p.foto
                    ? <img src={p.foto} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(e:any)=>{e.target.style.display='none'}}/>
                    : <span style={{color:'rgba(201,168,76,0.3)',fontSize:'.6rem'}}>PRÓXIMAMENTE</span>
                  }
                </div>
                <p style={{color:G,fontSize:'.72rem',margin:'0 0 4px',fontStyle:'italic'}}>{p.n}</p>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <span style={{color:'#5DBB63',fontSize:'.75rem',fontWeight:'bold'}}>${p.p}</span>
                  <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem'}}>🇵🇪 {p.s} unid</span>
                </div>
              </button>
            ))}
          </div>
          {totalPags>1&&(
            <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:24}}>
              <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,color:G,padding:'8px 16px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',opacity:pag===1?0.4:1}}>←</button>
              <span style={{color:G,padding:'8px 16px',fontSize:'.8rem'}}>{pag}/{totalPags}</span>
              <button onClick={()=>setPag(p=>Math.min(totalPags,p+1))} disabled={pag===totalPags} style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,color:G,padding:'8px 16px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',opacity:pag===totalPags?0.4:1}}>→</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
