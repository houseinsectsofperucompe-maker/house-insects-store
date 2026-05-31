'use client'
import {useState,useEffect} from 'react'
import {useCarrito} from '@/components/CarritoContext'
import BannerSlot from '@/components/BannerSlot'
import {Redis} from '@upstash/redis'

const r=new Redis({url:'https://topical-weasel-107403.upstash.io',token:'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA'})
const G='#C9A84C',BD='rgba(201,168,76,0.25)',BG='#0A0A05'

type Esp={n:string,foto?:string,p?:number,stock?:number,desc?:string}
type Sub={id:string,nm:string,e:Esp[]}
type Fam={id:string,nm:string,e:Esp[],sub:Sub[]}

export default function NocturnasPage(){
  const {addItem}=useCarrito()
  const [familias,setFamilias]=useState<Fam[]>([])
  const [loading,setLoading]=useState(true)
  const [famSel,setFamSel]=useState('')
  const [subSel,setSubSel]=useState('')
  const [busqueda,setBusqueda]=useState('')

  useEffect(()=>{
    r.get('catalogo:nocturnas').then(d=>{
      if(!d)return
      const noc=d
      const fams:Fam[]=noc.map(f=>({
        id:f.id, nm:f.nm||f.id,
        e:f.e||[],
        sub:(f.sub||[]).map((s:any)=>({id:s.id,nm:s.nm||s.id,e:s.e||[]}))
      }))
      setFamilias(fams)
      if(fams.length>0)setFamSel(fams[0].id)
      setLoading(false)
    }).catch(()=>setLoading(false))
  },[])

  const fam=familias.find(f=>f.id===famSel)
  const sub=fam?.sub?.find(s=>s.id===subSel)
  const hasSubs=(fam?.sub?.length||0)>0
  const todasEspecies=hasSubs ? (fam?.sub?.flatMap(s=>s.e)||[]) : (fam?.e||[])
  const especiesFiltradas=(subSel&&sub ? sub.e : todasEspecies)
    .filter(e=>!busqueda||e.n.toLowerCase().includes(busqueda.toLowerCase()))

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      {/* Navbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',
        borderBottom:`1px solid ${BD}`,background:'rgba(26,18,9,0.97)',position:'sticky' as const,top:0,zIndex:100}}>
        <a href='/catalogo/especimenes' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',
          border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>← Especímenes</a>
        <h1 style={{fontSize:'.9rem',letterSpacing:'0.1em',margin:0}}>🦋 Moths Nocturnas</h1>
        <a href='/' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',
          border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>🏠 Inicio</a>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'24px 16px'}}>
        <div style={{textAlign:'center' as const,marginBottom:24}}>
          <h2 style={{fontSize:'1.8rem',fontWeight:300,letterSpacing:'.1em',marginBottom:4}}>Especimenes Biologicos Secos</h2>
          <p style={{fontSize:'.75rem',color:'rgba(201,168,76,0.5)',letterSpacing:'.15em'}}>
            HOUSE INSECTS OF PERU · AMAZONIA · SERFOR · CITES · RUC 20447397804
          </p>
        </div>

        {loading?(
          <p style={{textAlign:'center' as const,color:'rgba(201,168,76,0.5)'}}>⏳ Cargando...</p>
        ):(
          <>
            {/* TABS FAMILIAS */}
            <div style={{display:'flex',flexWrap:'wrap' as const,gap:8,marginBottom:16,justifyContent:'center'}}>
              {familias.map(f=>(
                <button key={f.id} onClick={()=>{setFamSel(f.id);setSubSel('');setBusqueda('')}}
                  style={{background:famSel===f.id?G:'rgba(201,168,76,0.08)',
                    color:famSel===f.id?'#1A1209':G,
                    border:`1px solid ${famSel===f.id?G:BD}`,
                    borderRadius:20,padding:'6px 14px',cursor:'pointer',
                    fontSize:'.75rem',fontFamily:'Georgia,serif'}}>
                  {f.id}
                  {(f.sub?.length||0)>0&&(
                    <span style={{fontSize:'.6rem',opacity:.7,marginLeft:4}}>
                      ({f.sub.length} sub)
                    </span>
                  )}
                  {(f.e?.length||0)+(f.sub?.flatMap(s=>s.e)||[]).length>0&&(
                    <span style={{fontSize:'.6rem',opacity:.5,marginLeft:2}}>
                      · {(f.sub?.length||0)>0?(f.sub?.flatMap(s=>s.e)||[]).length:f.e?.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* TABS SUBFAMILIAS */}
            {hasSubs&&(
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:6,marginBottom:16,
                justifyContent:'center',padding:'10px 12px',
                background:'rgba(201,168,76,0.04)',borderRadius:8,border:`1px solid ${BD}`}}>
                <button onClick={()=>setSubSel('')}
                  style={{background:!subSel?'rgba(201,168,76,0.2)':'transparent',color:G,
                    border:`1px solid ${!subSel?G:BD}`,borderRadius:16,padding:'4px 12px',
                    cursor:'pointer',fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                  Todas ({(fam?.sub?.flatMap(s=>s.e)||[]).length})
                </button>
                {fam?.sub?.map(s=>(
                  <button key={s.id} onClick={()=>setSubSel(s.id)}
                    style={{background:subSel===s.id?'rgba(201,168,76,0.2)':'transparent',color:G,
                      border:`1px solid ${subSel===s.id?G:BD}`,borderRadius:16,padding:'4px 12px',
                      cursor:'pointer',fontSize:'.7rem',fontFamily:'Georgia,serif'}}>
                    {s.nm}
                    {s.e.length>0&&<span style={{fontSize:'.6rem',opacity:.6,marginLeft:3}}>({s.e.length})</span>}
                  </button>
                ))}
              </div>
            )}

            {/* BUSQUEDA */}
            <div style={{maxWidth:500,margin:'0 auto 20px'}}>
              <input value={busqueda} onChange={e=>setBusqueda(e.target.value)}
                placeholder='Buscar especie...'
                style={{width:'100%',padding:'10px 16px',background:'rgba(201,168,76,0.06)',
                  border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',
                  fontSize:'.85rem',outline:'none',boxSizing:'border-box' as const}}/>
            </div>

            {/* CONTEO */}
            <p style={{textAlign:'center' as const,fontSize:'.72rem',color:'rgba(201,168,76,0.4)',marginBottom:16}}>
              Mostrando {especiesFiltradas.length} especies
              {subSel&&` · ${subSel}`}
            </p>

            {/* GRID ESPECIES */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12,marginBottom:32}}>
              {especiesFiltradas.length>0?especiesFiltradas.map((e,i)=>(
                <div key={i} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,
                  borderRadius:10,padding:12,fontFamily:'Georgia,serif'}}>
                  <div style={{width:'100%',height:140,background:'#000',borderRadius:7,
                    marginBottom:8,overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {e.foto
                      ?<img src={e.foto} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                      :<span style={{color:'rgba(201,168,76,0.25)',fontSize:'.65rem',textAlign:'center' as const,padding:8}}>
                        FOTO PRÓXIMAMENTE
                      </span>}
                  </div>
                  <p style={{color:G,fontSize:'.75rem',fontStyle:'italic',margin:'0 0 4px',lineHeight:1.3}}>{e.n}</p>
                  {e.desc&&<p style={{color:'rgba(201,168,76,0.45)',fontSize:'.6rem',margin:'0 0 6px',lineHeight:1.4}}>{e.desc}</p>}
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:6}}>
                    <span style={{color:e.p?G:'rgba(201,168,76,0.4)',fontSize:'.8rem',fontWeight:e.p?700:400}}>
                      {e.p?`$${e.p} USD`:'Consultar'}
                    </span>
                    <button onClick={()=>addItem({n:e.n,p:e.p||0,rubro:'nocturnas',foto:e.foto||''})}
                      style={{padding:'5px 10px',background:G,color:'#0a0a0a',border:'none',
                        borderRadius:6,cursor:'pointer',fontSize:'.65rem',fontWeight:700,fontFamily:'Georgia,serif'}}>
                      🛒
                    </button>
                  </div>
                </div>
              )):(
                <p style={{color:'rgba(201,168,76,0.35)',fontStyle:'italic',fontSize:'.75rem',
                  gridColumn:'1/-1',textAlign:'center' as const,padding:'40px 0'}}>
                  Especimenes en catalogacion — proximamente
                </p>
              )}
            </div>

            <BannerSlot espacio='entre-productos' rubro='nocturnas' intervalo={7000}/>
          </>
        )}
      </div>
    </div>
  )
}
