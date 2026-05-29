'use client'
import ST from '@/components/ST'
import { useState, useEffect } from 'react'
import { useCarrito } from '@/components/CarritoContext'
import CarritoCompras from '@/components/CarritoCompras'

const MARCOS = [
  { id:'negro-blanco', nm:'Marco Negro / Fondo Blanco', color:'#000', fondo:'#fff' },
  { id:'negro-rojo', nm:'Marco Negro / Fondo Rojo', color:'#000', fondo:'#c0392b' },
  { id:'negro-azul', nm:'Marco Negro / Fondo Azul', color:'#000', fondo:'#1a3a6b' },
  { id:'negro-amarillo', nm:'Marco Negro / Fondo Amarillo', color:'#000', fondo:'#f1c40f' },
  { id:'negro-gris', nm:'Marco Negro / Fondo Gris', color:'#000', fondo:'#555' },
  { id:'blanco-blanco', nm:'Marco Blanco / Fondo Blanco', color:'#eee', fondo:'#fff' },
  { id:'gris-blanco', nm:'Marco Gris / Fondo Blanco', color:'#888', fondo:'#fff' },
  { id:'madera-blanco', nm:'Marco Madera / Fondo Blanco', color:'#8B6914', fondo:'#fff' },
  { id:'madera-lino', nm:'Marco Madera / Fondo Lino', color:'#8B6914', fondo:'#d4c5a9' },
  { id:'acrilico', nm:'Marco Acrilico Transparente', color:'#ccc', fondo:'#fff' },
  { id:'mixto', nm:'Cuadro Mixto (varias mariposas)', color:'#5a3e1b', fondo:'#fff' },
  { id:'negro-azul', nm:'Marco Negro / Fondo Azul Noche', color:'#000', fondo:'#0d1b2a' },
  { id:'negro-mate', nm:'Marco Negro Mate', color:'#111', fondo:'#1a1a1a' },
  { id:'caoba-oscuro', nm:'Marco Caoba Oscuro', color:'#3b1a08', fondo:'#fff' },
  { id:'bambu-dorado', nm:'Marco Bambu Dorado', color:'#c8a951', fondo:'#fdf6e3' },
  { id:'roble', nm:'Marco Roble Natural', color:'#a0522d', fondo:'#fff' },
  { id:'cerezo', nm:'Marco Cerezo', color:'#7a1f2e', fondo:'#fff' },
  { id:'nogal', nm:'Marco Nogal', color:'#4e2a04', fondo:'#f5f0e8' },
  { id:'dorado-brillante', nm:'Marco Dorado Brillante', color:'#ffd700', fondo:'#fff' },
  { id:'plateado-mate', nm:'Marco Plateado Mate', color:'#aaa', fondo:'#f8f8f8' },
  { id:'bronce', nm:'Marco Bronce', color:'#cd7f32', fondo:'#fff' },
  { id:'cobre', nm:'Marco Cobre', color:'#b87333', fondo:'#fdf5e6' },
  { id:'marfil', nm:'Marco Marfil', color:'#fffff0', fondo:'#fffff0' },
  { id:'rojo-borgona', nm:'Marco Rojo Borgona', color:'#800020', fondo:'#fff' },
  { id:'verde-ingles', nm:'Marco Verde Ingles', color:'#355e3b', fondo:'#f0fff0' },
  { id:'azul-marino', nm:'Marco Azul Marino', color:'#001f3f', fondo:'#fff' },
  { id:'azul-real', nm:'Marco Azul Real', color:'#4169e1', fondo:'#fff' },
]


const FAMILIAS = [
  'Brassolidae','Danaidae','Heliconidae','Ithomiidae','Hesperiidae',
  'Lycaenidae','Morphidae','Nymphalidae','Papilionidae','Pieridae',
  'Riodinidae','Satyridae'
]

export default function DiurnasPage() {
  const { items: carrito, updateItems: setCarrito } = useCarrito()
  const [showCarrito, setShowCarrito] = useState(false)
  const [familias, setFamilias] = useState<any[]>([])
  const [famSel, setFamSel] = useState('Morphidae')
  const [mariposa, setMariposa] = useState<any>(null)
  const [marco, setMarco] = useState(MARCOS[0])
  const [modelo, setModelo] = useState('shadowbox')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const MODELOS=[
    {id:'shadowbox', nm:'Shadow Box', desc:'Marco + Paspartu interior'},
    {id:'ovalo', nm:'Marco Ovalado', desc:'Forma oval clasica'},
    {id:'redondo', nm:'Marco Redondo', desc:'Forma circular'},
    {id:'triangulo', nm:'Marco Triangular', desc:'Forma triangular'},
    {id:'glass', nm:'Todo Vidrio', desc:'Transparente dos lados'},
  ]
  const [paso, setPaso] = useState<1|2|3>(1)
  const [loading, setLoading] = useState(true)

  const G = '#C9A84C', BD = 'rgba(201,168,76,0.2)'

  useEffect(()=>{
    fetch('/api/datos')
      .then(r=>r.json())
      .then((data:any[])=>{
        const diurnas = data.filter(f=>FAMILIAS.includes(f.id))
        setFamilias(diurnas)
        setLoading(false)
      })
  },[])

  const famActual = familias.find(f=>f.id===famSel)
  const especies = famActual?.e || []

  const marcoSel = MARCOS.find(m=>m.id===marco.id)||MARCOS[0]

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'0'}}>
      {showCarrito && <CarritoCompras items={carrito} onClose={()=>setShowCarrito(false)} onUpdateItems={setCarrito} onPagar={()=>{}}/>}

      {/* Navbar */}
      <div style={{position:'sticky',top:0,zIndex:100,background:'rgba(26,18,9,0.97)',borderBottom:`1px solid ${BD}`,display:'flex',alignItems:'center',padding:'0 24px',height:56}}>
        <a href="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <img src="/logo-house-insects-peru.png" style={{width:36,height:36,objectFit:'contain'}} onError={(e:any)=>{e.target.src='/logo.png'}}/>
          <span style={{color:G,fontSize:'.85rem'}}>House Insects of Peru</span>
        </a>
        <div style={{flex:1}}/>
        <button onClick={()=>setShowCarrito(true)} style={{background:'rgba(201,168,76,0.12)',border:`1px solid ${BD}`,color:G,borderRadius:8,padding:'7px 16px',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
          Carrito {carrito.length>0&&<span style={{background:G,color:'#1A1209',borderRadius:10,padding:'1px 7px',fontSize:'.72rem',fontWeight:'bold',marginLeft:6}}>{carrito.length}</span>}
        </button>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 20px'}}>
        <div style={{textAlign:'center',marginBottom:32}}>
          <h1 style={{color:G,fontSize:'clamp(1.6rem,4vw,2.4rem)',fontWeight:'normal',margin:'0 0 8px'}}>Cuadros Mariposas Diurnas</h1>
          <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.85rem',margin:0}}>Especimenes A1 enmarcados - Shadow Box 3D - Exportacion CITES/SERFOR</p>
        </div>

        {/* Pasos */}
        <div style={{display:'flex',justifyContent:'center',gap:0,marginBottom:32}}>
          {[{n:1,t:'Escoge tu Mariposa'},{n:2,t:'Escoge tu Marco'},{n:3,t:'Tu Cuadro'}].map((p,i)=>(
            <div key={p.n} style={{display:'flex',alignItems:'center'}}>
              <div onClick={()=>{ if(p.n<=paso) setPaso(p.n as 1|2|3) }}
                style={{display:'flex',flexDirection:'column',alignItems:'center',cursor:p.n<=paso?'pointer':'default',padding:'0 16px'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:paso>=p.n?G:'rgba(201,168,76,0.15)',color:paso>=p.n?'#1A1209':G,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'.9rem',marginBottom:4}}>
                  {p.n}
                </div>
                <span style={{color:paso>=p.n?G:'rgba(201,168,76,0.4)',fontSize:'.65rem',textAlign:'center',maxWidth:80}}>{p.t}</span>
              </div>
              {i<2&&<div style={{width:40,height:1,background:paso>p.n?G:'rgba(201,168,76,0.2)',marginBottom:20}}/>}
            </div>
          ))}
        </div>

        {/* PASO 1: Seleccionar mariposa */}
        {paso===1&&(
          <div>
            {loading ? (
              <div style={{textAlign:'center',color:G,padding:40}}>Cargando familias...</div>
            ) : (
              <>
                <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:6,marginBottom:24}}>
                  {familias.map(f=>(
                    <button key={f.id} onClick={()=>setFamSel(f.id)}
                      style={{background:famSel===f.id?G:'rgba(201,168,76,0.08)',color:famSel===f.id?'#1A1209':G,border:`1px solid ${famSel===f.id?G:BD}`,borderRadius:20,padding:'6px 14px',cursor:'pointer',fontSize:'.75rem',fontFamily:'Georgia,serif'}}>
                      {f.id} ({f.e?.length||0})
                    </button>
                  ))}
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:8}}>
                  {especies.map((e:any,i:number)=>(
                    <button key={i} onClick={()=>{setMariposa(e);setPaso(2)}}
                      style={{background:mariposa?.n===e.n?'rgba(201,168,76,0.15)':'rgba(201,168,76,0.04)',border:`1px solid ${mariposa?.n===e.n?G:BD}`,borderRadius:9,padding:10,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif',transition:'all 0.15s'}}>
                      <div style={{width:'100%',height:140,background:'#000',borderRadius:6,marginBottom:6,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {e.foto
                          ? <img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}} onError={(ev:any)=>{ev.target.style.display='none'}}/>
                          : <span style={{color:'rgba(201,168,76,0.3)',fontSize:'.6rem'}}>SIN FOTO</span>
                        }
                      </div>
                      <p style={{color:G,fontSize:'.7rem',margin:'0 0 2px',fontStyle:'italic'}}>{e.n}</p>
                      <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:0}}>${e.p} USD</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* PASO 2: Seleccionar marco */}
        {paso===2&&(
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24,padding:16,background:'rgba(201,168,76,0.06)',borderRadius:8,border:`1px solid ${BD}`}}>
              {mariposa?.foto&&<img src={mariposa.foto} style={{width:60,height:60,objectFit:'cover',borderRadius:6,background:'#000'}}/>}
              <div>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 2px'}}>MARIPOSA SELECCIONADA</p>
                <p style={{color:G,fontSize:'.85rem',fontStyle:'italic',margin:'0 0 2px'}}>{mariposa?.n}</p>
                <p style={{color:'#5DBB63',fontSize:'.8rem',margin:0}}>${mariposa?.p} USD</p>
              </div>
              <button onClick={()=>setPaso(1)} style={{marginLeft:'auto',background:'none',border:`1px solid ${BD}`,color:G,borderRadius:6,padding:'4px 12px',cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.72rem'}}>Cambiar</button>
            </div>

            <h3 style={{color:G,fontWeight:'normal',marginBottom:16,fontSize:'1.1rem'}}>Selecciona tu Marco</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:10,marginBottom:24}}>
              {MARCOS.map(m=>(
                <button key={m.id} onClick={()=>setMarco(m)}
                  style={{background:marco.id===m.id?'rgba(201,168,76,0.12)':'rgba(201,168,76,0.04)',border:`2px solid ${marco.id===m.id?G:BD}`,borderRadius:10,padding:12,cursor:'pointer',textAlign:'left',fontFamily:'Georgia,serif',transition:'all 0.15s'}}>
                  <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
                    <div style={{width:32,height:32,borderRadius:4,background:m.color,border:'3px solid '+m.fondo,boxShadow:'0 0 0 1px rgba(201,168,76,0.3)'}}/>
                    <div style={{width:20,height:20,borderRadius:3,background:m.fondo,border:'1px solid rgba(201,168,76,0.2)'}}/>
                  </div>
                  <p style={{color:G,fontSize:'.72rem',margin:'0 0 4px'}}>{m.nm}</p>
                  {m.id==='mixto'&&<p style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',margin:0}}>Varias mariposas</p>}
                </button>
              ))}
            </div>
            <button onClick={()=>setPaso(3)} disabled={!marco}
              style={{width:'100%',padding:'14px',background:G,color:'#1A1209',border:'none',borderRadius:8,fontWeight:700,fontSize:'1rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>
              Ver mi Cuadro
            </button>
          </div>
        )}

        {/* PASO 3: Vista previa del cuadro */}
        {paso===3&&mariposa&&(
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32}}>
            <div>
              <h3 style={{color:G,fontWeight:'normal',marginBottom:16}}>Vista Previa</h3>
              <div style={{padding:20,background:'#f5f5f5',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',minHeight:350}}>
                <div style={{
                  width:340,height:340,
                  background:modelo==='glass'?'transparent':marcoSel.color,
                  padding:modelo==='glass'?8:40,
                  borderRadius:modelo==='ovalo'?'50%':modelo==='redondo'?'50%':modelo==='triangulo'?'0':6,
                  boxShadow:modelo==='glass'?'0 4px 24px rgba(0,0,0,0.15)':'0 12px 40px rgba(0,0,0,0.6),inset 0 2px 8px rgba(0,0,0,0.3)',
                  border:modelo==='glass'?'3px solid rgba(200,220,255,0.5)':'none',
                  clipPath:modelo==='triangulo'?'polygon(50% 0%, 0% 100%, 100% 100%)':'none',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  position:'relative' as const,
                  backdropFilter:modelo==='glass'?'blur(2px)':'none',
                }}>
                  {modelo==='shadowbox'&&(
                    <div style={{position:'absolute',inset:12,border:'6px solid rgba(240,230,200,0.6)',borderRadius:2,pointerEvents:'none',zIndex:1}}/>
                  )}
                  <div style={{
                    width:'100%',height:'100%',
                    background:modelo==='glass'?'rgba(255,255,255,0.15)':marcoSel.fondo,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    borderRadius:modelo==='ovalo'||modelo==='redondo'?'50%':2,
                    clipPath:modelo==='triangulo'?'polygon(50% 0%, 0% 100%, 100% 100%)':'none',
                  }}>
                    {mariposa.foto
                      ? <img src={mariposa.foto} style={{width:'85%',height:'85%',objectFit:'contain'}}/>
                      : <span style={{color:'#999',fontSize:'.8rem'}}>Sin foto</span>
                    }
                  </div>
                </div>
                {/* Selector de modelos */}
                <div style={{marginTop:16,width:'100%'}}>
                  <p style={{color:G,fontSize:'.72rem',marginBottom:8,textAlign:'center',letterSpacing:'0.06em'}}>MODELO DE CUADRO</p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap',justifyContent:'center'}}>
                    {MODELOS.map(m=>(
                      <button key={m.id} onClick={()=>setModelo(m.id)}
                        style={{padding:'6px 14px',background:modelo===m.id?'rgba(201,168,76,0.2)':'transparent',
                          border:`1px solid ${modelo===m.id?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                          fontFamily:'Georgia,serif',fontSize:'.7rem',textAlign:'center'}}>
                        {m.nm}
                        <span style={{display:'block',fontSize:'.58rem',color:'rgba(201,168,76,0.5)'}}>{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{display:'flex',gap:8,marginTop:12,flexWrap:'wrap'}}>
                {MARCOS.map(m=>(
                  <button key={m.id} onClick={()=>setMarco(m)}
                    style={{width:28,height:28,borderRadius:4,background:m.color,border:marco.id===m.id?'3px solid '+G:'2px solid rgba(201,168,76,0.3)',cursor:'pointer',padding:0}}
                    title={m.nm}/>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{color:G,fontWeight:'normal',marginBottom:16}}>Resumen de tu Cuadro</h3>
              <div style={{background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:20,marginBottom:16}}>
                <div style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BD}`}}>
                  <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>MARIPOSA</p>
                  <p style={{color:G,fontSize:'.85rem',fontStyle:'italic',margin:0}}>{mariposa.n}</p>
                  <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem',margin:'2px 0 0'}}>Familia: {famSel}</p>
                </div>
                <div style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BD}`}}>
                  <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>MARCO</p>
                  <p style={{color:G,fontSize:'.85rem',margin:0}}>{marcoSel.nm}</p>
                </div>
                <div>
                  <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>PRECIO</p>
                  <p style={{color:G,fontSize:'1.8rem',margin:0,fontWeight:'bold'}}>Consultar</p>
                  <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>Precio segun especie y marco seleccionado</p>
                </div>
              </div>
              <div style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:8,padding:16,marginBottom:16}}>
                <p style={{color:G,fontSize:'.75rem',fontWeight:'bold',margin:'0 0 8px'}}>Incluye:</p>
                <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.72rem',margin:'0 0 4px',lineHeight:1.6}}>
                  Especimen A1 calidad museo<br/>
                  Shadow Box 3D con vidrio<br/>
                  Certificado CITES/SERFOR<br/>
                  Factura electronica SUNAT<br/>
                  Empaque especial exportacion
                </p>
              </div>
              <a href={`https://wa.me/51940699405?text=Hola, quiero un cuadro de ${mariposa.n} con ${marcoSel.nm}. Consulto precio.`}
                target="_blank"
                style={{display:'block',width:'100%',padding:'14px',background:'#25D366',color:'white',border:'none',borderRadius:8,fontWeight:700,fontSize:'1rem',textAlign:'center',textDecoration:'none',fontFamily:'Georgia,serif',marginBottom:8,boxSizing:'border-box' as const}}>
                Consultar Precio por WhatsApp
              </a>
              <div style={{display:'flex',gap:8}}>
                <button onClick={()=>setPaso(1)} style={{flex:1,padding:'10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
                  Cambiar Mariposa
                </button>
                <button onClick={()=>setPaso(2)} style={{flex:1,padding:'10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
                  Cambiar Marco
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
