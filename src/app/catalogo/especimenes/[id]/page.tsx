'use client'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import ST from '@/components/ST'
import { useCarrito } from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'

export default function EspecimenPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const { items: carrito, addItem, updateItems: setCarrito } = useCarrito()
  const [showCarrito, setShowCarrito] = useState(false)
  const [especie, setEspecie] = useState<any>(null)
  const [familia, setFamilia] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [vista, setVista] = useState<'frente'|'lado'|'reverso'|'video'>('frente')
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!id) return
    // id format: FamiliaId-index (e.g. Brassolidae-2)
    const parts = id.split('-')
    const idx = parseInt(parts[parts.length - 1])
    const famId = parts.slice(0, parts.length - 1).join('-')
    
    fetch(`/api/datos?familia=${famId}`)
      .then(r => r.json())
      .then(fam => {
        if (!fam || !fam.e) { setLoading(false); return }
        setFamilia(fam)
        const esp = fam.e[idx]
        if (esp) setEspecie({...esp, familia: famId, familianm: fam.nm || famId})
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div style={{minHeight:'100vh',background:'#0A0A05',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif',color:'#C9A84C'}}>
      ⏳ Cargando...
    </div>
  )

  if (!especie) return (
    <div style={{minHeight:'100vh',background:'#0A0A05',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Georgia,serif',color:'#C9A84C',flexDirection:'column',gap:16}}>
      <p>Espécimen no encontrado</p>
      <button onClick={() => router.push('/catalogo/especimenes')} style={{background:'#C9A84C',color:'#0A0A05',border:'none',padding:'10px 20px',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif'}}>
        ← Volver al catálogo
      </button>
    </div>
  )

  const foto = vista === 'frente' ? especie.foto :
               vista === 'lado' ? especie.fotoLado :
               vista === 'reverso' ? especie.fotoReverso : null

  return (
    <div style={{minHeight:'100vh',background:'#0A0A05',fontFamily:'Georgia,serif',color:'#E8C97A'}}>
      {showCarrito && <CarritoCompras items={carrito} onClose={() => setShowCarrito(false)} onUpdateItems={setCarrito} onPagar={() => {}}/>}
      
      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 20px'}}>
        <button onClick={() => router.push('/catalogo/especimenes')} style={{background:'none',border:'none',color:'#C9A84C',cursor:'pointer',fontSize:'.85rem',marginBottom:24,fontFamily:'Georgia,serif'}}>
          ← <ST t="Volver al catálogo"/>
        </button>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
          {/* Fotos */}
          <div>
            <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,overflow:'hidden',aspectRatio:'1',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:12}}>
              {vista === 'video' && especie.video ? (
                <video src={especie.video} controls style={{width:'100%',height:'100%',objectFit:'contain'}}/>
              ) : foto ? (
                <img src={foto} alt={especie.n} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={(e:any)=>{const cl=`https://res.cloudinary.com/dv3mvukmq/image/upload/house-insects/${especie.familia}/${especie.n.toLowerCase().replace(/ /g,'-')}.webp`;e.target.src=cl}}/>
              ) : (
                <div style={{textAlign:'center',color:'rgba(201,168,76,0.3)'}}>
                  <div style={{fontSize:3+'rem'}}>🦋</div>
                  <p style={{fontSize:'.8rem'}}>FOTO PRÓXIMAMENTE</p>
                </div>
              )}
            </div>
            <div style={{display:'flex',gap:8}}>
              {[['frente','🔍 Frente'],['lado','↔️ Lado'],['reverso','🔄 Reverso'],['video','🎬 Video']].map(([v,l]) => (
                <button key={v} onClick={() => setVista(v as any)}
                  style={{flex:1,padding:'6px',background:vista===v?'rgba(201,168,76,0.2)':'rgba(201,168,76,0.05)',border:`1px solid ${vista===v?'rgba(201,168,76,0.5)':'rgba(201,168,76,0.15)'}`,borderRadius:6,color:vista===v?'#E8C97A':'rgba(201,168,76,0.5)',cursor:'pointer',fontSize:'.65rem',fontFamily:'Georgia,serif'}}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.75rem',marginBottom:4}}>{especie.familianm}</p>
            <h1 style={{fontSize:'1.6rem',fontWeight:400,fontStyle:'italic',color:'#E8C97A',marginBottom:16,lineHeight:1.3}}>{especie.n}</h1>
            
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}>
              {[
                {l:'Calidad',v:especie.calidad||'A1'},
                {l:'Sexo',v:especie.sexo||'M or F'},
                {l:'Tamaño',v:especie.tamano||'—'},
                {l:'Stock',v:`${especie.s||0} unid`,c:(especie.s||0)>0?'#5DBB63':'#ff5050'},
              ].map(f=>(
                <div key={f.l} style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:6,padding:'8px 12px'}}>
                  <div style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',marginBottom:2}}>{f.l}</div>
                  <div style={{color:(f as any).c||'#E8C97A',fontSize:'.85rem',fontWeight:600}}>{f.v}</div>
                </div>
              ))}
            </div>

            <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:16,marginBottom:20}}>
              <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginBottom:4}}>PRECIO</div>
              <div style={{color:'#C9A84C',fontSize:'2rem',fontWeight:700}}>${especie.p||0}</div>
              <div style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>USD · Exportación con CITES/SERFOR</div>
            </div>

            <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:16}}>
              <button onClick={()=>setQty(q=>Math.max(1,q-1))} style={{background:'rgba(255,80,80,0.15)',border:'1px solid rgba(255,80,80,0.3)',color:'#ff5050',padding:'8px 14px',borderRadius:6,cursor:'pointer',fontSize:'1rem'}}>−</button>
              <span style={{color:'#E8C97A',fontSize:'1rem',minWidth:40,textAlign:'center'}}>{qty}</span>
              <button onClick={()=>setQty(q=>Math.min(especie.s||99,q+1))} style={{background:'rgba(93,187,99,0.15)',border:'1px solid rgba(93,187,99,0.3)',color:'#5DBB63',padding:'8px 14px',borderRadius:6,cursor:'pointer',fontSize:'1rem'}}>+</button>
            </div>

            <button
              onClick={()=>{
                for(let i=0;i<qty;i++) addItem({n:especie.n,p:especie.p,rubro:'especimenes'})
                setShowCarrito(true)
              }}
              disabled={(especie.s||0)===0}
              style={{width:'100%',padding:'14px',background:(especie.s||0)>0?'#C9A84C':'rgba(201,168,76,0.2)',color:(especie.s||0)>0?'#0A0A05':'rgba(201,168,76,0.4)',border:'none',borderRadius:8,cursor:(especie.s||0)>0?'pointer':'default',fontSize:'1rem',fontWeight:700,fontFamily:'Georgia,serif',marginBottom:12}}>
              {(especie.s||0)>0?'🛒 Agregar al carrito':'Sin stock'}
            </button>

            <a href={`https://wa.me/51999999999?text=Hola,%20me%20interesa%20${encodeURIComponent(especie.n)}%20a%20$${especie.p}`}
              target="_blank" rel="noopener noreferrer"
              style={{display:'block',width:'100%',padding:'12px',background:'rgba(37,211,102,0.15)',color:'#25D366',border:'1px solid rgba(37,211,102,0.3)',borderRadius:8,textAlign:'center',textDecoration:'none',fontSize:'.85rem',fontFamily:'Georgia,serif'}}>
              💬 Consultar por WhatsApp
            </a>
          </div>
        </div>

        {especie.descripcion && (
          <div style={{marginTop:32,background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:8,padding:20}}>
            <h3 style={{color:'#C9A84C',fontSize:'.85rem',fontWeight:400,marginBottom:8}}>Descripción</h3>
            <p style={{color:'rgba(232,201,122,0.7)',fontSize:'.85rem',lineHeight:1.6}}>{especie.descripcion}</p>
          </div>
        )}

        {/* Otras especies de la misma familia */}
        {familia && familia.e && familia.e.length > 1 && (
          <div style={{marginTop:32}}>
            <h3 style={{color:'#C9A84C',fontSize:'.85rem',fontWeight:400,marginBottom:12}}>Más de {familia.nm}</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:8}}>
              {familia.e.slice(0,8).map((e:any,i:number)=>(
                <button key={i} onClick={()=>router.push(`/catalogo/especimenes/${familia.id}-${i}`)}
                  style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:8,padding:8,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif'}}>
                  {e.foto && <img src={e.foto} style={{width:'100%',height:80,objectFit:'contain',marginBottom:4}} onError={(ev:any)=>ev.target.style.display='none'}/>}
                  <p style={{color:'#E8C97A',fontSize:'.65rem',fontStyle:'italic',margin:0}}>{e.n}</p>
                  <p style={{color:'#C9A84C',fontSize:'.75rem',fontWeight:700,margin:'2px 0 0'}}>${e.p}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
