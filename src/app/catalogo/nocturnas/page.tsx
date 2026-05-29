'use client'
import {useState} from 'react'

const G='#C9A84C', BD='rgba(201,168,76,0.35)', BG='#0a0a0a'

type SubFam={id:string,nm:string,e:string[]}
type Fam={id:string,nm:string,e:string[],sub?:SubFam[]}

const NOCTURNAS:Fam[]=[
  {id:'Arctiidae',nm:'Arctiidae',e:[]},
  {id:'Castnia',nm:'Castnia',e:[]},
  {id:'Hepalidae',nm:'Hepalidae',e:[]},
  {id:'Saturnidae',nm:'Saturnidae',e:[]},
  {id:'Sphingidae',nm:'Sphingidae',e:[]},
  {id:'Uranidae',nm:'Uranidae',e:[]},
  {id:'Geometridae',nm:'Geometridae',e:[]},
  {id:'Noctuidae',nm:'Noctuidae',e:[]},
  {id:'Erebidae',nm:'Erebidae',e:[],sub:[
    {id:'Acontiinae',nm:'Acontiinae',e:[]},
    {id:'Acronictinae',nm:'Acronictinae',e:[]},
    {id:'Agaristinae',nm:'Agaristinae',e:[]},
    {id:'Amphipyrinae',nm:'Amphipyrinae',e:[]},
    {id:'Bagisarinae',nm:'Bagisarinae',e:[]},
    {id:'Balsinae',nm:'Balsinae',e:[]},
    {id:'Bryophilinae',nm:'Bryophilinae',e:[]},
    {id:'Calpinae',nm:'Calpinae',e:[]},
    {id:'Catocalinae',nm:'Catocalinae',e:[]},
    {id:'Cocytiinae',nm:'Cocytiinae',e:[]},
    {id:'Condicinae',nm:'Condicinae',e:[]},
    {id:'Cuculliinae',nm:'Cuculliinae',e:[]},
    {id:'Dilobinae',nm:'Dilobinae',e:[]},
    {id:'Eustrotiinae',nm:'Eustrotiinae',e:[]},
    {id:'Euteliinae',nm:'Euteliinae',e:[]},
    {id:'Hadeninae',nm:'Hadeninae',e:[]},
    {id:'Heliothinae',nm:'Heliothinae',e:[]},
    {id:'Herminiinae',nm:'Herminiinae',e:[]},
    {id:'Noctuinae',nm:'Noctuinae',e:[]},
    {id:'Ophiderinae',nm:'Ophiderinae',e:[]},
    {id:'Pantheinae',nm:'Pantheinae',e:[]},
    {id:'Plusiinae',nm:'Plusiinae',e:[]},
    {id:'Stictopterinae',nm:'Stictopterinae',e:[]},
    {id:'Stiriinae',nm:'Stiriinae',e:[]},
    {id:'Strepsimaninae',nm:'Strepsimaninae',e:[]},
    {id:'Xyleninae',nm:'Xyleninae',e:[]},
  ]},
]

const MARCOS=['Negro Clasico','Caoba','Bambu Natural','Dorado Antiguo','Plateado Moderno']
const VIDRIOS=['Antirreflejo UV','Crystal Clear','Museum Glass']

export default function NocturnasPage(){
  const [paso,setPaso]=useState(1)
  const [famSel,setFamSel]=useState('Arctiidae')
  const [subSel,setSubSel]=useState('')
  const [espSel,setEspSel]=useState('')
  const [marco,setMarco]=useState(MARCOS[0])
  const [vidrio,setVidrio]=useState(VIDRIOS[0])

  const famActual=NOCTURNAS.find(f=>f.id===famSel)||NOCTURNAS[0]

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif',padding:'2rem 1rem'}}>
      <h1 style={{textAlign:'center',fontSize:'1.4rem',letterSpacing:'0.12em',marginBottom:'0.3rem'}}>
        CUADROS DE MARIPOSAS NOCTURNAS
      </h1>
      <p style={{textAlign:'center',fontSize:'0.75rem',color:'rgba(201,168,76,0.6)',marginBottom:'2rem',letterSpacing:'0.08em'}}>
        MOTHS TROPICALES · COLECCION PREMIUM
      </p>

      {paso===1&&(
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <p style={{textAlign:'center',marginBottom:'1rem',fontSize:'0.8rem',color:'rgba(201,168,76,0.7)'}}>
            Paso 1 — Selecciona la familia
          </p>

          {/* 9 Familias principales */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))',gap:8,marginBottom:'1.5rem'}}>
            {NOCTURNAS.map(f=>(
              <button key={f.id} onClick={()=>{setFamSel(f.id);setSubSel('');setEspSel('')}}
                style={{padding:'10px 6px',background:famSel===f.id?'rgba(201,168,76,0.18)':'transparent',
                  border:`1px solid ${famSel===f.id?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                  fontFamily:'Georgia,serif',fontSize:'0.72rem',textAlign:'center',
                  fontWeight:famSel===f.id?'bold':'normal'}}>
                {f.nm}
                {f.sub&&<span style={{display:'block',fontSize:'0.6rem',color:'rgba(201,168,76,0.5)',marginTop:2}}>{f.sub.length} subfamilias</span>}
              </button>
            ))}
          </div>

          {/* Subfamilias si la familia tiene */}
          {famActual.sub&&(
            <div style={{border:`1px solid ${BD}`,borderRadius:8,padding:'1rem',marginBottom:'1rem'}}>
              <p style={{fontSize:'0.72rem',color:'rgba(201,168,76,0.6)',marginBottom:'0.75rem'}}>
                Subfamilias de {famActual.nm}:
              </p>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:6}}>
                {famActual.sub.map(s=>(
                  <button key={s.id} onClick={()=>setSubSel(s.id)}
                    style={{padding:'7px 8px',background:subSel===s.id?'rgba(201,168,76,0.15)':'transparent',
                      border:`1px solid ${subSel===s.id?G:BD}`,color:G,borderRadius:5,cursor:'pointer',
                      fontFamily:'Georgia,serif',fontSize:'0.68rem',textAlign:'center'}}>
                    {s.nm}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Especies */}
          <div style={{border:`1px solid ${BD}`,borderRadius:8,padding:'1rem',marginBottom:'1.5rem',minHeight:60}}>
            <p style={{fontSize:'0.7rem',color:'rgba(201,168,76,0.35)',fontStyle:'italic'}}>
              Especimenes en catalogacion — proximamente
            </p>
          </div>

          <div style={{textAlign:'center'}}>
            <button onClick={()=>setPaso(2)}
              style={{padding:'12px 32px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'0.85rem',
                letterSpacing:'0.08em'}}>
              Siguiente: Elegir Marco
            </button>
          </div>
        </div>
      )}

      {paso===2&&(
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <p style={{textAlign:'center',marginBottom:'1.5rem',fontSize:'0.8rem',color:'rgba(201,168,76,0.7)'}}>
            Paso 2 — Personaliza tu cuadro
          </p>
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
          <p style={{fontSize:'0.8rem',color:'rgba(201,168,76,0.7)',marginBottom:'1.5rem'}}>
            Paso 3 — Tu cuadro personalizado
          </p>
          <div style={{border:`1px solid ${G}`,borderRadius:12,padding:'2rem',marginBottom:'1.5rem',
            background:'rgba(201,168,76,0.04)'}}>
            <p style={{fontSize:'1rem',marginBottom:'0.5rem'}}>
              {famActual.nm}{subSel?' / '+subSel:''}
            </p>
            <p style={{fontSize:'0.75rem',color:'rgba(201,168,76,0.7)',marginBottom:'0.3rem'}}>Marco: {marco}</p>
            <p style={{fontSize:'0.75rem',color:'rgba(201,168,76,0.7)'}}>Vidrio: {vidrio}</p>
          </div>
          <div style={{display:'flex',gap:10,justifyContent:'center'}}>
            <button onClick={()=>setPaso(1)}
              style={{flex:1,padding:'10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.78rem'}}>
              Cambiar Mariposa
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
