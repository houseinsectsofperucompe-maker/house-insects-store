'use client'
import {useCarrito} from '@/components/CarritoContext'
import BannerSlot from '@/components/BannerSlot'
import {useState,useEffect} from 'react'
import {Redis} from '@upstash/redis'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#1A1209'
const r=new Redis({url:'https://topical-weasel-107403.upstash.io',token:'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA'})

const MARCOS=[
  { id:'negro-blanco', nm:'Marco Negro / Fondo Blanco', color:'#000', fondo:'#fff' },
  { id:'negro-rojo', nm:'Marco Negro / Fondo Rojo', color:'#000', fondo:'#c0392b' },
  { id:'negro-azul', nm:'Marco Negro / Fondo Azul', color:'#000', fondo:'#1a3a5c' },
  { id:'negro-azul-noche', nm:'Marco Negro / Fondo Azul Noche', color:'#000', fondo:'#0d1b2a' },
  { id:'negro-amarillo', nm:'Marco Negro / Fondo Amarillo', color:'#000', fondo:'#f1c40f' },
  { id:'negro-gris', nm:'Marco Negro / Fondo Gris', color:'#000', fondo:'#555' },
  { id:'negro-mate', nm:'Marco Negro Mate', color:'#111', fondo:'#1a1a1a' },
  { id:'blanco-blanco', nm:'Marco Blanco / Fondo Blanco', color:'#eee', fondo:'#fff' },
  { id:'gris-blanco', nm:'Marco Gris / Fondo Blanco', color:'#888', fondo:'#fff' },
  { id:'caoba', nm:'Marco Caoba', color:'#8B6914', fondo:'#fff' },
  { id:'caoba-oscuro', nm:'Marco Caoba Oscuro', color:'#3b1a08', fondo:'#fff' },
  { id:'bambu', nm:'Marco Bambu Natural', color:'#8B6914', fondo:'#d4c5a9' },
  { id:'bambu-dorado', nm:'Marco Bambu Dorado', color:'#c8a951', fondo:'#fdf6e3' },
  { id:'roble', nm:'Marco Roble Natural', color:'#a0522d', fondo:'#fff' },
  { id:'cerezo', nm:'Marco Cerezo', color:'#7a1f2e', fondo:'#fff' },
  { id:'nogal', nm:'Marco Nogal', color:'#4e2a04', fondo:'#f5f0e8' },
  { id:'dorado', nm:'Marco Dorado Antiguo', color:'#b8960c', fondo:'#fff' },
  { id:'dorado-brillante', nm:'Marco Dorado Brillante', color:'#ffd700', fondo:'#fff' },
  { id:'plateado', nm:'Marco Plateado Moderno', color:'#aaa', fondo:'#f8f8f8' },
  { id:'plateado-mate', nm:'Marco Plateado Mate', color:'#888', fondo:'#f8f8f8' },
  { id:'bronce', nm:'Marco Bronce', color:'#cd7f32', fondo:'#fff' },
  { id:'cobre', nm:'Marco Cobre', color:'#b87333', fondo:'#fdf5e6' },
  { id:'marfil', nm:'Marco Marfil', color:'#fffff0', fondo:'#fffff0' },
  { id:'rojo-borgona', nm:'Marco Rojo Borgona', color:'#800020', fondo:'#fff' },
  { id:'verde-ingles', nm:'Marco Verde Ingles', color:'#355e3b', fondo:'#f0fff0' },
  { id:'azul-marino', nm:'Marco Azul Marino', color:'#001f3f', fondo:'#fff' },
  { id:'azul-real', nm:'Marco Azul Real', color:'#4169e1', fondo:'#fff' },
  { id:'acrilico', nm:'Marco Acrilico Transparente', color:'#ccc', fondo:'#fff' },
  { id:'mixto', nm:'Cuadro Mixto (varias mariposas)', color:'#5a3e1b', fondo:'#fff' },
]

const MODELOS=[
  {id:'shadowbox', nm:'Shadow Box', desc:'Marco + Paspartu interior'},
  {id:'shadowbox2', nm:'Shadow Box Doble', desc:'Doble paspartu + etiqueta'},
  {id:'ovalo', nm:'Marco Ovalado', desc:'Forma oval clasica'},
  {id:'redondo', nm:'Marco Redondo', desc:'Forma circular'},
  {id:'triangulo', nm:'Marco Triangular', desc:'Forma triangular'},
  {id:'glass', nm:'Todo Vidrio', desc:'Transparente dos lados'},
]

type Esp={n:string,foto?:string,p?:number,s?:number,calidad?:string,activo?:boolean}
type SubFam={id:string,nm:string,padre?:string,orden?:string,e:Esp[],sub?:SubFam[]}
type Fam={id:string,nm:string,orden?:string,e:Esp[],sub:SubFam[]}

export default function NocturnasPage(){
  const {addItem}=useCarrito()
  const [paso,setPaso]=useState(1)
  const [familias,setFamilias]=useState<Fam[]>([])
  const [loading,setLoading]=useState(true)
  const [famSel,setFamSel]=useState('')
  const [subSel,setSubSel]=useState('')
  const [mariposa,setMariposa]=useState<Esp|null>(null)
  const [marco,setMarco]=useState(MARCOS[0])
  const [modelo,setModelo]=useState('shadowbox')
  const [dropdownOpen,setDropdownOpen]=useState(false)
  const marcoSel=MARCOS.find(m=>m.id===marco.id)||MARCOS[0]

  useEffect(()=>{
    r.get<SubFam[]>('catalogo:familias').then(d=>{
      if(!d)return
      const noc=d.filter(f=>f.orden==='Moths Nocturnas')
      const resultado:Fam[]=noc.map(f=>({
        ...f,
        sub:f.sub||[]
      }))
      setFamilias(resultado)
      if(resultado.length>0)setFamSel(resultado[0].id)
      setLoading(false)
    })
  },[])

  const famActual=familias.find(f=>f.id===famSel)||familias[0]
  const subActual=famActual?.sub.find(s=>s.id===subSel)
  const especies=subSel?subActual?.e||[]:famActual?.e||[]

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      {/* Navbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:'1px solid rgba(201,168,76,0.2)',background:'rgba(26,18,9,0.97)'}}>
        <div style={{display:'flex',gap:8}}>
          <a href='/' style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.3)',color:G,borderRadius:8,textDecoration:'none',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>
            🏠 Inicio
          </a>
          <a href='/catalogo/nocturnas' style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.3)',color:G,borderRadius:8,textDecoration:'none',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>
            ← Catálogo
          </a>
        </div>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:'1.1rem',letterSpacing:'0.1em',margin:0,color:G}}>Cuadros Mariposas Nocturnas</h1>
          <p style={{fontSize:'0.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>Moths Tropicales - Shadow Box 3D - CITES/SERFOR</p>
        </div>
        <a href='/carrito' style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.3)',color:G,borderRadius:8,textDecoration:'none',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>
          🛒 Carrito
        </a>
      </div>

      {/* Steps */}
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:16,padding:'1rem',marginBottom:'1rem'}}>
        {[{n:1,nm:'Escoge tu Moth'},{n:2,nm:'Escoge tu Marco'},{n:3,nm:'Tu Cuadro'}].map((p,i)=>(
          <div key={p.n} style={{display:'flex',alignItems:'center',gap:16}}>
            <div style={{textAlign:'center'}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:paso>=p.n?G:'rgba(201,168,76,0.15)',
                color:paso>=p.n?'#1A1209':G,display:'flex',alignItems:'center',justifyContent:'center',
                fontWeight:'bold',fontSize:'.9rem',margin:'0 auto 4px'}}>
                {p.n}
              </div>
              <p style={{fontSize:'.65rem',color:paso>=p.n?G:'rgba(201,168,76,0.4)',margin:0,maxWidth:70,textAlign:'center'}}>{p.nm}</p>
            </div>
            {i<2&&<div style={{width:60,height:1,background:BD}}/>}
          </div>
        ))}
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 1rem 2rem'}}>

        {/* PASO 1 */}
        {paso===1&&(
          <div>
            {loading?(
              <p style={{textAlign:'center',color:'rgba(201,168,76,0.5)'}}>Cargando familias...</p>
            ):(
              <>
                {/* Familias */}
                <div style={{display:'flex',flexWrap:'wrap' as const,gap:8,marginBottom:16,justifyContent:'center'}}>
                  {familias.map(f=>(
                    <button key={f.id} onClick={()=>{setFamSel(f.id);setSubSel('');setMariposa(null)}}
                      style={{background:famSel===f.id?G:'rgba(201,168,76,0.08)',color:famSel===f.id?'#1A1209':G,
                        border:`1px solid ${famSel===f.id?G:BD}`,borderRadius:20,padding:'6px 14px',
                        cursor:'pointer',fontSize:'.75rem',fontFamily:'Georgia,serif'}}>
                      {f.id} {f.sub.length>0&&`(${f.sub.length} subfamilias)`}
                    </button>
                  ))}
                </div>
                {/* Subfamilias */}
                {famActual?.sub.length>0&&(
                  <div style={{display:'flex',flexWrap:'wrap' as const,gap:6,marginBottom:16,justifyContent:'center',padding:'12px',background:'rgba(201,168,76,0.04)',borderRadius:8,border:`1px solid ${BD}`}}>
                    <button onClick={()=>setSubSel('')}
                      style={{background:!subSel?'rgba(201,168,76,0.2)':'transparent',color:G,
                        border:`1px solid ${!subSel?G:BD}`,borderRadius:16,padding:'4px 12px',
                        cursor:'pointer',fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                      Todas
                    </button>
                    {famActual.sub.map(s=>(
                      <button key={s.id} onClick={()=>setSubSel(s.id)}
                        style={{background:subSel===s.id?'rgba(201,168,76,0.2)':'transparent',color:G,
                          border:`1px solid ${subSel===s.id?G:BD}`,borderRadius:16,padding:'4px 12px',
                          cursor:'pointer',fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                        {s.nm}
                      </button>
                    ))}
                  </div>
                )}
                {/* Especies */}
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:8,marginBottom:20}}>
                  {especies.length>0?especies.map((e,i)=>(
                    <button key={i} onClick={()=>setMariposa(e)}
                      style={{background:mariposa?.n===e.n?'rgba(201,168,76,0.15)':'rgba(201,168,76,0.04)',
                        border:`1px solid ${mariposa?.n===e.n?G:BD}`,borderRadius:9,padding:10,
                        cursor:'pointer',textAlign:'left' as const,fontFamily:'Georgia,serif',transition:'all 0.15s'}}>
                      <div style={{width:'100%',height:100,background:'#000',borderRadius:6,marginBottom:6,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                        {e.foto?<img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                          :<span style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem'}}>Sin foto</span>}
                      </div>
                      <p style={{color:G,fontSize:'.72rem',fontStyle:'italic',margin:'0 0 2px'}}>{e.n}</p>
                      {e.p&&<p style={{color:'rgba(201,168,76,0.6)',fontSize:'.65rem',margin:0}}>${e.p} USD</p>}
                    </button>
                  )):(
                    <p style={{color:'rgba(201,168,76,0.35)',fontStyle:'italic',fontSize:'.75rem',gridColumn:'1/-1',textAlign:'center'}}>
                      Especimenes en catalogacion — proximamente
                    </p>
                  )}
                </div>
                {mariposa&&(
                  <div style={{textAlign:'center'}}>
                    <button onClick={()=>setPaso(2)}
                      style={{padding:'12px 32px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                        color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.85rem',letterSpacing:'0.08em'}}>
                      Continuar con {mariposa.n} →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* PASO 2 */}
        {paso===2&&mariposa&&(
          <div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24,padding:16,
              background:'rgba(201,168,76,0.06)',borderRadius:8,border:`1px solid ${BD}`}}>
              <div>
                <p style={{color:G,fontStyle:'italic',margin:0,fontSize:'.9rem'}}>{mariposa.n}</p>
                {mariposa.p&&<p style={{color:'rgba(201,168,76,0.6)',margin:0,fontSize:'.75rem'}}>${mariposa.p} USD</p>}
              </div>
              <button onClick={()=>setPaso(1)} style={{marginLeft:'auto',background:'none',
                border:`1px solid ${BD}`,color:G,borderRadius:6,padding:'4px 12px',
                cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.72rem'}}>Cambiar</button>
            </div>
            <p style={{marginBottom:12,fontSize:'.8rem',color:'rgba(201,168,76,0.7)'}}>Selecciona tu Marco:</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:8,marginBottom:24}}>
              {MARCOS.map(m=>(
                <button key={m.id} onClick={()=>setMarco(m)}
                  style={{background:marco.id===m.id?'rgba(201,168,76,0.12)':'rgba(201,168,76,0.04)',
                    border:`2px solid ${marco.id===m.id?G:BD}`,borderRadius:10,padding:12,
                    cursor:'pointer',textAlign:'left' as const,fontFamily:'Georgia,serif',transition:'all 0.15s'}}>
                  <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:4}}>
                    <span style={{width:20,height:20,borderRadius:3,background:m.color,border:'1px solid rgba(255,255,255,0.2)',flexShrink:0}}/>
                    <span style={{width:20,height:20,borderRadius:3,background:m.fondo,border:'1px solid rgba(255,255,255,0.2)',flexShrink:0}}/>
                  </div>
                  <p style={{color:G,fontSize:'.72rem',margin:0,lineHeight:1.3}}>{m.nm}</p>
                </button>
              ))}
            </div>
            <div style={{textAlign:'center'}}>
              <button onClick={()=>setPaso(3)}
                style={{padding:'12px 32px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                  color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.85rem',letterSpacing:'0.08em'}}>
                Ver mi Cuadro →
              </button>
            </div>
          </div>
        )}

        {/* PASO 3 */}
        {paso===3&&mariposa&&(
          <div>
            <div style={{display:'flex',gap:32,alignItems:'flex-start',justifyContent:'center',flexWrap:'wrap' as const}}>
              {/* Cuadro grande */}
              <div style={{background:'#111',borderRadius:12,padding:24,display:'flex',flexDirection:'column' as const,alignItems:'center'}}>
                <div style={{
                  width:500,height:500,
                  background:modelo==='glass'?'transparent':marcoSel.color,
                  padding:modelo==='glass'?8:70,
                  borderRadius:modelo==='ovalo'||modelo==='redondo'?'50%':modelo==='triangulo'?'0':8,
                  boxShadow:modelo==='glass'?'0 4px 24px rgba(0,0,0,0.3)':'0 16px 48px rgba(0,0,0,0.8),inset 0 3px 12px rgba(0,0,0,0.5)',
                  border:modelo==='glass'?'3px solid rgba(200,220,255,0.4)':'none',
                  clipPath:modelo==='triangulo'?'polygon(50% 0%, 0% 100%, 100% 100%)':'none',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  position:'relative' as const,
                }}>
                  {modelo==='shadowbox'&&(
                    <div style={{position:'absolute',inset:14,border:'8px solid rgba(240,230,200,0.45)',borderRadius:2,pointerEvents:'none',zIndex:1}}/>
                  )}
                  <div style={{
                    width:'100%',height:'100%',
                    background:modelo==='glass'?'rgba(255,255,255,0.1)':marcoSel.fondo,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    borderRadius:modelo==='ovalo'||modelo==='redondo'?'50%':2,
                    clipPath:modelo==='triangulo'?'polygon(50% 0%, 0% 100%, 100% 100%)':'none',
                    flexDirection:'column' as const,
                    padding:modelo==='shadowbox2'?'12px':'0',
                  }}>
                    {modelo==='shadowbox2'?(
                      <div style={{flex:1,width:'100%',background:'#f8f8f8',display:'flex',alignItems:'center',justifyContent:'center',padding:16,position:'relative' as const}}>
                        <div style={{width:'100%',height:'100%',border:'10px solid #e8dcc8',background:'#fff',display:'flex',flexDirection:'column' as const,alignItems:'center',justifyContent:'center',position:'relative' as const,padding:8}}>
                          <div style={{flex:1,width:'100%',background:'#ffffff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                            {mariposa.foto?<img src={mariposa.foto} style={{width:'85%',height:'85%',objectFit:'contain'}}/>:<span style={{color:'#999',fontSize:'.8rem'}}>Sin foto</span>}
                          </div>
                          <div style={{textAlign:'center' as const,padding:'6px 0 2px'}}>
                            <p style={{fontSize:'.55rem',fontStyle:'italic',color:'#333',margin:0}}>{mariposa.n}</p>
                            <p style={{fontSize:'.5rem',color:'#666',margin:0}}>House Insects of Peru · CITES/SERFOR</p>
                          </div>
                        </div>
                      </div>
                    ):(
                      <>
                        {mariposa.foto?<img src={mariposa.foto} style={{width:'85%',height:'85%',objectFit:'contain'}}/>:<span style={{color:'#999',fontSize:'.8rem'}}>Sin foto</span>}
                      </>
                    )}
                  </div>
                </div>
                {/* Modelos */}
                <div style={{marginTop:20,width:'100%'}}>
                  <p style={{color:'rgba(201,168,76,0.6)',fontSize:'.7rem',letterSpacing:'0.08em',marginBottom:10,textAlign:'center'}}>MODELO DE CUADRO</p>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap' as const,justifyContent:'center'}}>
                    {MODELOS.map(m=>(
                      <button key={m.id} onClick={()=>setModelo(m.id)}
                        style={{padding:'8px 14px',background:modelo===m.id?'rgba(201,168,76,0.2)':'transparent',
                          border:`1px solid ${modelo===m.id?G:BD}`,color:G,borderRadius:8,cursor:'pointer',
                          fontFamily:'Georgia,serif',fontSize:'.72rem',textAlign:'center' as const}}>
                        {m.nm}
                        <span style={{display:'block',fontSize:'.58rem',color:'rgba(201,168,76,0.45)',marginTop:2}}>{m.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Panel derecho */}
              <div style={{minWidth:260,maxWidth:320}}>
                {/* Dropdown marcos */}
                <div style={{position:'relative' as const,marginBottom:24}}>
                  <p style={{color:'rgba(201,168,76,0.6)',fontSize:'.7rem',letterSpacing:'0.08em',marginBottom:8}}>COLOR DE MARCO</p>
                  <button onClick={()=>setDropdownOpen(!dropdownOpen)}
                    style={{width:'100%',padding:'10px 14px',background:'rgba(201,168,76,0.08)',
                      border:`1px solid ${G}`,color:G,borderRadius:8,cursor:'pointer',
                      fontFamily:'Georgia,serif',fontSize:'.78rem',display:'flex',alignItems:'center',gap:10,justifyContent:'space-between'}}>
                    <span style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{width:18,height:18,borderRadius:3,background:marcoSel.color,display:'inline-block',border:'1px solid rgba(255,255,255,0.2)'}}/>
                      {marcoSel.nm}
                    </span>
                    <span>{dropdownOpen?'▲':'▼'}</span>
                  </button>
                  {dropdownOpen&&(
                    <div style={{position:'absolute' as const,top:'100%',left:0,right:0,zIndex:50,
                      background:'#1a1209',border:`1px solid ${G}`,borderRadius:8,marginTop:4,
                      maxHeight:300,overflowY:'auto' as const,boxShadow:'0 8px 32px rgba(0,0,0,0.7)'}}>
                      {MARCOS.map(m=>(
                        <button key={m.id} onClick={()=>{setMarco(m);setDropdownOpen(false)}}
                          style={{width:'100%',padding:'8px 14px',background:marco.id===m.id?'rgba(201,168,76,0.15)':'transparent',
                            border:'none',borderBottom:`1px solid rgba(201,168,76,0.1)`,color:G,cursor:'pointer',
                            fontFamily:'Georgia,serif',fontSize:'.75rem',display:'flex',alignItems:'center',gap:10,textAlign:'left' as const}}>
                          <span style={{width:16,height:16,borderRadius:2,background:m.color,flexShrink:0,border:'1px solid rgba(255,255,255,0.2)'}}/>
                          <span style={{width:16,height:16,borderRadius:2,background:m.fondo,flexShrink:0,border:'1px solid rgba(255,255,255,0.2)'}}/>
                          {m.nm}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Resumen */}
                <div style={{background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,borderRadius:8,padding:20,marginBottom:16}}>
                  <div style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BD}`}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>MARIPOSA</p>
                    <p style={{color:G,fontSize:'.85rem',fontStyle:'italic',margin:0}}>{mariposa.n}</p>
                  </div>
                  <div style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BD}`}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>MARCO</p>
                    <p style={{color:G,fontSize:'.85rem',margin:0}}>{marcoSel.nm}</p>
                  </div>
                  <div style={{marginBottom:12,paddingBottom:12,borderBottom:`1px solid ${BD}`}}>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>MODELO</p>
                    <p style={{color:G,fontSize:'.85rem',margin:0}}>{MODELOS.find(m=>m.id===modelo)?.nm}</p>
                  </div>
                  <div>
                    <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',margin:'0 0 4px'}}>PRECIO</p>
                    <p style={{color:G,fontSize:'1.8rem',margin:0,fontWeight:'bold'}}>Consultar</p>
                  </div>
                </div>
                <button onClick={()=>addItem({
                    n:`Cuadro ${mariposa.n} - ${marcoSel.nm} - ${modelo}`,
                    p:0,rubro:'cuadros',
                    foto:mariposa.foto||'',
                    marco:marcoSel.nm,
                    modelo:modelo
                  })}
                  style={{width:'100%',padding:'14px',background:'#2ecc71',color:'#fff',
                    border:'none',borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',
                    fontSize:'.9rem',fontWeight:'bold',marginBottom:8}}>
                  🛒 Agregar al Carrito
                </button>
                <a href={`https://wa.me/51940699405?text=Hola, quiero un cuadro de ${mariposa.n} con ${marcoSel.nm} modelo ${modelo}. Consulto precio.`}
                  target="_blank" rel="noopener noreferrer"
                  style={{display:'block',width:'100%',padding:'14px',background:G,color:'#1A1209',
                    borderRadius:8,textAlign:'center' as const,textDecoration:'none',
                    fontFamily:'Georgia,serif',fontSize:'.9rem',fontWeight:'bold',marginBottom:12}}>
                  Consultar por WhatsApp
                </a>
                <button onClick={()=>setPaso(1)}
                  style={{width:'100%',padding:'10px',background:'transparent',border:`1px solid ${BD}`,
                    color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
                  ← Cambiar Mariposa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    <BannerSlot espacio='entre-productos' rubro='nocturnas' intervalo={7000}/>
    </div>
  )
}
