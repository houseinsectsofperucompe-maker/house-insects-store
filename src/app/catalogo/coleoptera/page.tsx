'use client'
import {useState,useEffect} from 'react'
import {Redis} from '@upstash/redis'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'
const r=new Redis({url:'https://topical-weasel-107403.upstash.io',token:'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA'})
const MARCOS=[
  'Negro Clasico','Negro Azul','Negro Mate','Caoba','Caoba Oscuro',
  'Bambu Natural','Bambu Dorado','Roble Natural','Cerezo','Nogal',
  'Dorado Antiguo','Dorado Brillante','Plateado Moderno','Plateado Mate',
  'Bronce','Cobre','Marfil','Blanco Perla','Rojo Borgoña','Verde Ingles'
]
const VIDRIOS=['Antirreflejo UV','Crystal Clear','Museum Glass']
type F={id:string,nm:string,orden:string,e:string[]}

export default function ColeopteraPage(){
  const [tab,setTab]=useState<'Coleoptera'|'Arthropoda'>('Coleoptera')
  const [col,setCol]=useState<F[]>([])
  const [art,setArt]=useState<F[]>([])
  const [loading,setLoading]=useState(true)
  const [paso,setPaso]=useState(1)
  const [famSel,setFamSel]=useState('')
  const [marco,setMarco]=useState(MARCOS[0])
  const [vidrio,setVidrio]=useState(VIDRIOS[0])

  useEffect(()=>{
    r.get<F[]>('catalogo:familias').then(d=>{
      if(!d)return
      const c=d.filter(f=>f.orden==='Coleoptera')
      const a=d.filter(f=>f.orden==='Arthropoda')
      setCol(c);setArt(a);setFamSel(c[0]?.id||'');setLoading(false)
    })
  },[])

  const fams=tab==='Coleoptera'?col:art
  const famAct=fams.find(f=>f.id===famSel)||fams[0]

  const handleTab=(t:'Coleoptera'|'Arthropoda')=>{
    setTab(t);setPaso(1)
    setFamSel(t==='Coleoptera'?col[0]?.id:art[0]?.id)
  }

  if(loading)return(
    <div style={{minHeight:'100vh',background:BG,display:'flex',alignItems:'center',justifyContent:'center',color:G,fontFamily:'Georgia,serif'}}>
      Cargando coleccion...
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif',padding:'2rem 1rem'}}>
      <h1 style={{textAlign:'center',fontSize:'1.4rem',letterSpacing:'0.12em',marginBottom:'0.3rem'}}>CUADROS DE INSECTOS</h1>
      <p style={{textAlign:'center',fontSize:'0.75rem',color:'rgba(201,168,76,0.6)',marginBottom:'1.5rem',letterSpacing:'0.08em'}}>COLECCION PREMIUM TROPICAL</p>

      <div style={{display:'flex',justifyContent:'center',gap:12,marginBottom:'2rem'}}>
        {(['Coleoptera','Arthropoda'] as const).map(t=>(
          <button key={t} onClick={()=>handleTab(t)}
            style={{padding:'10px 28px',background:tab===t?'rgba(201,168,76,0.18)':'transparent',
              border:`1px solid ${tab===t?G:BD}`,color:G,borderRadius:8,cursor:'pointer',
              fontFamily:'Georgia,serif',fontSize:'0.85rem',fontWeight:tab===t?'bold':'normal'}}>
            {t==='Coleoptera'?'🪲 Coleoptera':'🦂 Arthropoda'}
          </button>
        ))}
      </div>

      {paso===1&&(
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <p style={{textAlign:'center',marginBottom:'1rem',fontSize:'0.8rem',color:'rgba(201,168,76,0.7)'}}>
            Paso 1 — Selecciona la familia ({fams.length} familias)
          </p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:8,marginBottom:'1.5rem'}}>
            {fams.map(f=>(
              <button key={f.id} onClick={()=>setFamSel(f.id)}
                style={{padding:'10px 6px',background:famSel===f.id?'rgba(201,168,76,0.18)':'transparent',
                  border:`1px solid ${famSel===f.id?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                  fontFamily:'Georgia,serif',fontSize:'0.72rem',textAlign:'center',
                  fontWeight:famSel===f.id?'bold':'normal'}}>
                {f.nm}
              </button>
            ))}
          </div>
          <div style={{border:`1px solid ${BD}`,borderRadius:8,padding:'1rem',marginBottom:'1.5rem',minHeight:60}}>
            <p style={{fontSize:'0.7rem',color:'rgba(201,168,76,0.35)',fontStyle:'italic'}}>
              Especimenes en catalogacion — proximamente
            </p>
          </div>
          <div style={{textAlign:'center'}}>
            <button onClick={()=>setPaso(2)}
              style={{padding:'12px 32px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'0.85rem',letterSpacing:'0.08em'}}>
              Siguiente: Elegir Marco
            </button>
          </div>
        </div>
      )}

      {paso===2&&(
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <p style={{textAlign:'center',marginBottom:'1.5rem',fontSize:'0.8rem',color:'rgba(201,168,76,0.7)'}}>Paso 2 — Personaliza tu cuadro</p>
          <div style={{marginBottom:'1.5rem'}}>
            <p style={{fontSize:'0.75rem',marginBottom:'0.5rem'}}>Marco:</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {MARCOS.map(m=>(
                <button key={m} onClick={()=>setMarco(m)}
                  style={{padding:'8px 14px',background:marco===m?'rgba(201,168,76,0.2)':'transparent',
                    border:`1px solid ${marco===m?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                    fontFamily:'Georgia,serif',fontSize:'0.75rem'}}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:'2rem'}}>
            <p style={{fontSize:'0.75rem',marginBottom:'0.5rem'}}>Vidrio:</p>
            <div style={{display:'flex',gap:8}}>
              {VIDRIOS.map(v=>(
                <button key={v} onClick={()=>setVidrio(v)}
                  style={{padding:'8px 14px',background:vidrio===v?'rgba(201,168,76,0.2)':'transparent',
                    border:`1px solid ${vidrio===v?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                    fontFamily:'Georgia,serif',fontSize:'0.75rem'}}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center'}}>
            <button onClick={()=>setPaso(1)}
              style={{padding:'10px 24px',background:'transparent',border:`1px solid ${BD}`,color:G,
                borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'0.78rem'}}>
              Volver
            </button>
            <button onClick={()=>setPaso(3)}
              style={{padding:'10px 24px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'0.78rem'}}>
              Ver Resumen
            </button>
          </div>
        </div>
      )}

      {paso===3&&(
        <div style={{maxWidth:600,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:'0.8rem',color:'rgba(201,168,76,0.7)',marginBottom:'1.5rem'}}>Paso 3 — Tu cuadro personalizado</p>
          <div style={{border:`1px solid ${G}`,borderRadius:12,padding:'2rem',marginBottom:'1.5rem',background:'rgba(201,168,76,0.04)'}}>
            <p style={{fontSize:'1rem',marginBottom:'0.5rem'}}>{tab==='Coleoptera'?'🪲':'🦂'} {famAct?.nm}</p>
            <p style={{fontSize:'0.75rem',color:'rgba(201,168,76,0.7)',marginBottom:'0.3rem'}}>Orden: {tab}</p>
            <p style={{fontSize:'0.75rem',color:'rgba(201,168,76,0.7)',marginBottom:'0.3rem'}}>Marco: {marco}</p>
            <p style={{fontSize:'0.75rem',color:'rgba(201,168,76,0.7)'}}>Vidrio: {vidrio}</p>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center'}}>
            <button onClick={()=>setPaso(1)}
              style={{flex:1,padding:'10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
              Cambiar Insecto
            </button>
            <button onClick={()=>setPaso(2)}
              style={{flex:1,padding:'10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
              Cambiar Marco
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
