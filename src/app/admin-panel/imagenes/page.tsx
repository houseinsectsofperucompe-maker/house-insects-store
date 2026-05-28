'use client'
import { useState, useEffect } from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const FAMILIAS=['brassolidae','danaidae','heliconidae','ithomiidae','hesperiidae','lycaenidae','morphidae','nymphalidae','papilionidae','pieridae','riodinidae','satyridae','diurnas','nocturnas','coleoptera','minerales','joyeria','artesanias','otros']

export default function ImagenesPage(){
  const [familia,setFamilia]=useState('brassolidae')
  const [especie,setEspecie]=useState('')
  const [tipo,setTipo]=useState('frente')
  const [urlManual,setUrlManual]=useState('')
  const [preview,setPreview]=useState('')
  const [msg,setMsg]=useState('')
  const [copiado,setCopiado]=useState(false)
  const [historial,setHistorial]=useState<{url:string;esp:string;tipo:string;fecha:string}[]>([])

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),4000)}

  const generarNombre=()=>{
    const esp=especie.toLowerCase().replace(/[^a-z0-9]/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')
    const nombres:Record<string,string>={
      frente:`${familia}/${familia}-${esp}-a.webp`,
      lado:`${familia}/${familia}-${esp}-lado.webp`,
      reverso:`${familia}/${familia}-${esp}-reverso-v.webp`,
      video:`${familia}/${familia}-${esp}.mp4`,
    }
    return nombres[tipo]||`${familia}/${familia}-${esp}-${tipo}.webp`
  }

  const urlBase=`https://HouseInsects1967.b-cdn.net/${generarNombre()}`

  const copiar=(url:string)=>{
    navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(()=>setCopiado(false),2000)
    mostrar('✅ URL copiada al portapapeles')
    if(url&&especie){
      setHistorial(p=>[{url,esp:especie,tipo,fecha:new Date().toLocaleString('es-PE')},...p.slice(0,19)])
    }
  }

  const verificarUrl=async(url:string)=>{
    setPreview('')
    try{
      setPreview(url)
    }catch(e){}
  }

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>🖼️ Gestor de Imágenes</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>Genera URLs para Bunny.net · Sube desde FileZilla o panel Bunny</p>
          </div>
          <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          {/* Generador URL */}
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
            <h2 style={{color:G,fontSize:'.85rem',fontWeight:700,marginBottom:16,letterSpacing:'.1em'}}>GENERADOR DE URL BUNNY.NET</h2>

            <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>FAMILIA / CARPETA</label>
            <select value={familia} onChange={e=>setFamilia(e.target.value)} style={{...s.inp,marginBottom:12}}>
              {FAMILIAS.map(f=><option key={f} value={f}>{f}</option>)}
            </select>

            <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>NOMBRE ESPECIE</label>
            <input value={especie} onChange={e=>setEspecie(e.target.value)} style={{...s.inp,marginBottom:12}} placeholder="caligo eurilochus livius"/>

            <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>TIPO DE FOTO</label>
            <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
              {['frente','lado','reverso','video','detalle','packshot'].map(t=>(
                <button key={t} onClick={()=>setTipo(t)} style={btn(tipo===t?G:'rgba(201,168,76,0.08)',tipo===t?CARD:G,{border:`1px solid ${tipo===t?G:BD}`,padding:'5px 10px',fontSize:'.65rem'})}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,borderRadius:6,padding:12,marginBottom:12}}>
              <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.58rem',marginBottom:4}}>URL GENERADA:</p>
              <p style={{color:'#E8C97A',fontSize:'.72rem',wordBreak:'break-all',margin:0,fontFamily:'monospace'}}>{urlBase}</p>
            </div>

            <div style={{display:'flex',gap:8}}>
              <button onClick={()=>copiar(urlBase)} style={btn(copiado?'#25D366':G,CARD,{flex:1,padding:'10px'})}>
                {copiado?'✅ Copiado':'📋 Copiar URL'}
              </button>
              <button onClick={()=>verificarUrl(urlBase)} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'10px 14px'})}>
                👁️ Ver
              </button>
            </div>

            {preview&&(
              <div style={{marginTop:12,border:`1px solid ${BD}`,borderRadius:6,overflow:'hidden',background:'#050501'}}>
                <img src={preview} alt="preview" style={{width:'100%',maxHeight:200,objectFit:'contain'}}
                  onError={()=>{setPreview('');mostrar('⚠️ Imagen no encontrada en Bunny.net — súbela primero')}}/>
              </div>
            )}
          </div>

          {/* URL Manual + Instrucciones */}
          <div>
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:12}}>
              <h2 style={{color:G,fontSize:'.85rem',fontWeight:700,marginBottom:12,letterSpacing:'.1em'}}>URL MANUAL</h2>
              <input value={urlManual} onChange={e=>{setUrlManual(e.target.value);setPreview(e.target.value)}} style={{...s.inp,marginBottom:8}} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
              <div style={{display:'flex',gap:6}}>
                <button onClick={()=>copiar(urlManual)} style={btn(G,CARD,{flex:1})}>📋 Copiar</button>
                <button onClick={()=>window.open('https://panel.bunny.net','_blank')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🐰 Bunny Panel</button>
              </div>
              {urlManual&&(
                <div style={{marginTop:10,border:`1px solid ${BD}`,borderRadius:6,overflow:'hidden',background:'#050501'}}>
                  <img src={urlManual} style={{width:'100%',maxHeight:150,objectFit:'contain'}} onError={()=>setUrlManual('')}/>
                </div>
              )}
            </div>

            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
              <h2 style={{color:G,fontSize:'.85rem',fontWeight:700,marginBottom:12,letterSpacing:'.1em'}}>📋 CÓMO SUBIR FOTOS</h2>
              {[
                {n:'1',t:'Bunny.net Panel',d:'panel.bunny.net → Storage → HouseInsects1967 → Carpeta familia → Upload'},
                {n:'2',t:'Formato recomendado',d:'WebP o JPG · Máx 2MB · Fondo blanco o negro · 800x600px mínimo'},
                {n:'3',t:'Nombre del archivo',d:'familia-nombre-especie-tipo.webp (sin tildes, sin espacios)'},
                {n:'4',t:'Estructura de carpetas',d:'brassolidae/ morphidae/ nymphalidae/ papilionidae/ etc.'},
              ].map(s=>(
                <div key={s.n} style={{display:'flex',gap:10,padding:'8px 0',borderBottom:'1px solid rgba(201,168,76,0.08)'}}>
                  <span style={{background:'rgba(201,168,76,0.15)',color:G,width:22,height:22,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.65rem',fontWeight:700,flexShrink:0}}>{s.n}</span>
                  <div>
                    <div style={{color:'#E8C97A',fontSize:'.75rem',fontWeight:700}}>{s.t}</div>
                    <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginTop:2}}>{s.d}</div>
                  </div>
                </div>
              ))}
              <button onClick={()=>window.open('https://panel.bunny.net','_blank')} style={{...btn(G,CARD,{width:'100%',padding:'10px',marginTop:12,fontSize:'.8rem'})}}>
                🐰 Abrir Bunny.net Panel
              </button>
            </div>
          </div>
        </div>

        {/* Historial */}
        {historial.length>0&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginTop:16}}>
            <h2 style={{color:G,fontSize:'.85rem',fontWeight:700,marginBottom:12,letterSpacing:'.1em'}}>🕐 HISTORIAL DE URLs COPIADAS</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:8}}>
              {historial.map((h,i)=>(
                <div key={i} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:6,padding:'8px 10px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div>
                    <div style={{color:'#E8C97A',fontSize:'.7rem',fontStyle:'italic'}}>{h.esp} — {h.tipo}</div>
                    <div style={{color:'rgba(201,168,76,0.4)',fontSize:'.58rem',fontFamily:'monospace',marginTop:2}}>{h.url.slice(0,50)}...</div>
                    <div style={{color:'rgba(201,168,76,0.3)',fontSize:'.55rem',marginTop:1}}>{h.fecha}</div>
                  </div>
                  <button onClick={()=>copiar(h.url)} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.6rem'})}>📋</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
