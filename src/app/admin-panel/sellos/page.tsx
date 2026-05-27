'use client'
import {useState} from 'react'

const CARPETAS=['brassolidae','morphidae','nymphalidae','papilionidae','danaidae','heliconidae','lycaenidae','pieridae','riodinidae','satyridae']
const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const BUNNY_BASE='https://HouseInsects1967.b-cdn.net'
const CLOUDINARY_BASE='https://res.cloudinary.com/dv3mvukmq/image/upload'

export default function SellosPage(){
  const [carpeta,setCarpeta]=useState('brassolidae')
  const [cdn,setCdn]=useState<'bunny'|'cloudinary'>('bunny')
  const [fotos,setFotos]=useState<{nombre:string;url:string}[]>([])
  const [cargando,setCargando]=useState(false)
  const [subiendo,setSubiendo]=useState(false)
  const [msg,setMsg]=useState('')
  const [preview,setPreview]=useState<string|null>(null)

  const cargarFotos=async()=>{
    setCargando(true)
    try{
      const res=await fetch('/api/bunny-list?folder='+carpeta)
      const data=await res.json()
      setFotos(data.files||[])
    }catch{setFotos([])}
    setCargando(false)
  }

  const subirFotos=async(ev:React.ChangeEvent<HTMLInputElement>)=>{
    const files=Array.from(ev.target.files||[])
    if(!files.length) return
    setSubiendo(true)
    setMsg('Subiendo '+files.length+' fotos a '+(cdn==='bunny'?'Bunny.net':'Cloudinary')+'...')
    let ok=0,fail=0

    if(cdn==='bunny'){
      for(const file of files){
        try{
          const nombre=file.name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9.-]/g,'')
          const res=await fetch('/api/bunny-upload',{method:'POST',headers:{'x-filename':nombre,'x-folder':carpeta},body:file})
          if(res.ok) ok++; else fail++
        }catch{fail++}
      }
    } else {
      for(const file of files){
        try{
          const fd=new FormData()
          fd.append('file',file)
          fd.append('upload_preset','house_insects_banners')
          fd.append('folder','specimens/'+carpeta)
          const res=await fetch('https://api.cloudinary.com/v1_1/dv3mvukmq/image/upload',{method:'POST',body:fd})
          if(res.ok) ok++; else fail++
        }catch{fail++}
      }
    }

    setSubiendo(false)
    setMsg(ok+' subidas ✅  '+fail+' errores ❌')
    if(cdn==='bunny') cargarFotos()
  }

  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',padding:24,color:G}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <a href="/admin-panel" style={{color:G,textDecoration:'none',fontSize:'.8rem'}}>← Admin Panel</a>
          <h1 style={{fontSize:'1.2rem',fontWeight:300,letterSpacing:'.2em',color:'#E8C97A',margin:0}}>GESTIÓN DE FOTOS & SELLOS</h1>
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>☁️ SELECCIONAR CDN</h2>
          <div style={{display:'flex',gap:12,marginBottom:16}}>
            <button onClick={()=>setCdn('bunny')} style={{padding:'8px 20px',borderRadius:20,fontSize:'.75rem',cursor:'pointer',background:cdn==='bunny'?G:'rgba(201,168,76,0.08)',color:cdn==='bunny'?CARD:G,border:`1px solid ${cdn==='bunny'?G:BD}`,fontFamily:'Georgia,serif',fontWeight:700}}>
              🐰 Bunny.net (Principal)
            </button>
            <button onClick={()=>setCdn('cloudinary')} style={{padding:'8px 20px',borderRadius:20,fontSize:'.75rem',cursor:'pointer',background:cdn==='cloudinary'?G:'rgba(201,168,76,0.08)',color:cdn==='cloudinary'?CARD:G,border:`1px solid ${cdn==='cloudinary'?G:BD}`,fontFamily:'Georgia,serif',fontWeight:700}}>
              ☁️ Cloudinary (Respaldo)
            </button>
          </div>
          <div style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)'}}>
            {cdn==='bunny'?'📍 '+BUNNY_BASE:'📍 '+CLOUDINARY_BASE}
          </div>
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>📁 SELECCIONAR FAMILIA</h2>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:16}}>
            {CARPETAS.map(c=>(
              <button key={c} onClick={()=>{setCarpeta(c);setFotos([])}} style={{
                padding:'6px 14px',borderRadius:20,fontSize:'.7rem',cursor:'pointer',
                background:carpeta===c?G:'rgba(201,168,76,0.08)',
                color:carpeta===c?CARD:G,
                border:`1px solid ${carpeta===c?G:BD}`,
                fontFamily:'Georgia,serif',textTransform:'capitalize'
              }}>{c}</button>
            ))}
          </div>
          {cdn==='bunny'&&<button onClick={cargarFotos} style={{background:G,color:CARD,border:'none',padding:'8px 20px',borderRadius:6,cursor:'pointer',fontSize:'.78rem',fontFamily:'Georgia,serif',fontWeight:700}}>
            {cargando?'Cargando...':'📋 Ver fotos en Bunny.net'}
          </button>}
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>⬆️ SUBIR FOTOS</h2>
          <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',marginBottom:12}}>
            Subiendo a <strong style={{color:G}}>{cdn==='bunny'?'Bunny.net':'Cloudinary'}</strong> — carpeta <strong style={{color:G}}>{carpeta}</strong>
          </p>
          <input type="file" accept="image/*" multiple onChange={subirFotos}
            style={{color:G,fontSize:'.75rem',cursor:'pointer',display:'block',marginBottom:12}}/>
          {subiendo&&<p style={{color:G,fontSize:'.75rem'}}>⏳ Subiendo...</p>}
          {msg&&<p style={{color:'#E8C97A',fontSize:'.75rem',marginTop:8}}>{msg}</p>}
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:8,color:'#E8C97A'}}>🔏 SELLOS ACTIVOS EN FOTOS</h2>
          <div style={{fontSize:'.72rem',color:'rgba(201,168,76,0.7)',lineHeight:2}}>
            <p>✅ <strong>Javier Zavala</strong> — centro de la imagen</p>
            <p>✅ <strong>Javier Zavala + Muestra Protegida / Módulo Web Virtual / Propiedad Intelectual</strong> — inferior derecha</p>
            <p>✅ <strong>Calidad A1 / SERFOR & CITES / Permisos Exportación / Customs Code 9705</strong> — inferior izquierda</p>
          </div>
        </div>

        {fotos.length>0&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
            <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>📸 {carpeta.toUpperCase()} — {fotos.length} fotos en Bunny.net</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:12}}>
              {fotos.map(f=>(
                <div key={f.nombre} style={{border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',cursor:'pointer'}} onClick={()=>setPreview(f.url)}>
                  <img src={f.url} alt={f.nombre} style={{width:'100%',height:120,objectFit:'cover'}} onError={e=>{(e.target as HTMLImageElement).style.display='none'}}/>
                  <div style={{padding:'6px 8px',fontSize:'.6rem',color:'rgba(201,168,76,0.6)',wordBreak:'break-all'}}>{f.nombre}</div>
                  <div style={{padding:'0 8px 8px'}}>
                    <button onClick={e=>{e.stopPropagation();navigator.clipboard.writeText(f.url)}} style={{fontSize:'.6rem',color:G,background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,borderRadius:4,padding:'3px 8px',cursor:'pointer',fontFamily:'Georgia,serif'}}>📋 Copiar URL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {preview&&(
          <div onClick={()=>setPreview(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.95)',zIndex:999,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={preview} style={{maxWidth:'90vw',maxHeight:'90vh',objectFit:'contain'}}/>
            <button onClick={()=>setPreview(null)} style={{position:'absolute',top:20,right:20,background:G,color:CARD,border:'none',borderRadius:'50%',width:40,height:40,cursor:'pointer',fontSize:'1.2rem'}}>✕</button>
          </div>
        )}
      </div>
    </main>
  )
}
