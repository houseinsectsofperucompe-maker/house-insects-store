'use client'
import { useState, useRef } from 'react'

const CLOUD_NAME = 'dv3mvukmq'
const UPLOAD_PRESET = 'house_Insects_banners'

export default function UploadPage() {
  const [archivos, setArchivos] = useState<File[]>([])
  const [subiendo, setSubiendo] = useState(false)
  const [resultados, setResultados] = useState<{nombre:string,url:string,tipo:string}[]>([])
  const [progreso, setProgreso] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const seleccionar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setArchivos(prev => [...prev, ...files])
  }

  const subirTodo = async () => {
    if (!archivos.length) return
    setSubiendo(true)
    const nuevos: {nombre:string,url:string,tipo:string}[] = []
    for (let i=0; i<archivos.length; i++) {
      const file = archivos[i]
      setProgreso(Math.round((i/archivos.length)*100))
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('folder', file.type.startsWith('video/') ? 'videos' : 'fotos')
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`, {method:'POST',body:formData})
      const data = await res.json()
      if (data.secure_url) nuevos.push({nombre:file.name,url:data.secure_url,tipo:file.type})
    }
    setResultados(prev=>[...prev,...nuevos])
    setArchivos([])
    setProgreso(100)
    setSubiendo(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  const copiar = (url: string) => navigator.clipboard.writeText(url)

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'20px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeInUp 0.5s ease both}
        .file-card{transition:all 0.2s ease}
        .file-card:hover{transform:translateY(-2px)}
        .copy-btn{transition:all 0.15s ease;cursor:pointer}
        .copy-btn:hover{background:rgba(201,168,76,0.2)!important}
        @media(max-width:600px){
          .grid-2{grid-template-columns:1fr!important}
          h1{font-size:1.3rem!important}
        }
      `}</style>

      <div style={{maxWidth:800,margin:'0 auto'}}>
        <a href="/admin-panel" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:20}}>← Panel Admin</a>

        <div className="fade-up" style={{textAlign:'center',marginBottom:28}}>
          <h1 style={{fontSize:'1.8rem',fontWeight:300,color:'#E8C97A',marginBottom:6}}>📤 Subir Fotos & Videos</h1>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.72rem'}}>iPhone · Android · iPad · Laptop · iMac — Cualquier dispositivo</p>
        </div>

        {/* ZONA DE SUBIDA */}
        <div
          onClick={()=>inputRef.current?.click()}
          style={{border:'2px dashed rgba(201,168,76,0.3)',borderRadius:16,padding:40,textAlign:'center',cursor:'pointer',marginBottom:20,background:'rgba(201,168,76,0.02)',transition:'all 0.2s ease'}}
        >
          <div style={{fontSize:'3rem',marginBottom:12}}>📁</div>
          <p style={{color:'rgba(201,168,76,0.7)',fontSize:'1rem',marginBottom:6}}>Toca aquí para seleccionar</p>
          <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.72rem'}}>JPG · PNG · WebP · GIF · MP4 · WebM · MOV · HEIC</p>
          <p style={{color:'rgba(201,168,76,0.2)',fontSize:'.65rem',marginTop:4}}>Múltiples archivos a la vez</p>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*,.gif,.webp,.webm,.heic" onChange={seleccionar} style={{display:'none'}} capture="environment"/>
        </div>

        {/* ARCHIVOS SELECCIONADOS */}
        {archivos.length > 0 && (
          <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:10,padding:16,marginBottom:16}}>
            <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.1em',marginBottom:12}}>{archivos.length} ARCHIVO(S) LISTO(S)</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:8,marginBottom:16}} className="grid-2">
              {archivos.map((f,i)=>(
                <div key={i} className="file-card" style={{background:'rgba(201,168,76,0.06)',borderRadius:8,padding:10,textAlign:'center'}}>
                  <div style={{fontSize:'1.5rem',marginBottom:4}}>{f.type.startsWith('video/')?'🎥':'📸'}</div>
                  <p style={{color:'#E8C97A',fontSize:'.65rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.name}</p>
                  <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem'}}>{(f.size/1024).toFixed(0)} KB</p>
                </div>
              ))}
            </div>
            {subiendo && (
              <div style={{marginBottom:12}}>
                <div style={{background:'rgba(201,168,76,0.1)',borderRadius:10,height:10,overflow:'hidden'}}>
                  <div style={{background:'linear-gradient(to right,#C9A84C,#E8C97A)',height:'100%',width:`${progreso}%`,transition:'width 0.3s ease',borderRadius:10}}/>
                </div>
                <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginTop:6,textAlign:'center'}}>Subiendo... {progreso}%</p>
              </div>
            )}
            {!subiendo && (
              <button onClick={subirTodo} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'14px',borderRadius:8,fontSize:'1rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif'}}>
                ⬆️ Subir Todo a Cloudinary
              </button>
            )}
          </div>
        )}

        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <div style={{background:'rgba(37,211,102,0.05)',border:'1px solid rgba(37,211,102,0.15)',borderRadius:10,padding:16}}>
            <p style={{color:'#25D366',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>✅ {resultados.length} ARCHIVO(S) SUBIDO(S)</p>
            {resultados.map((r,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(201,168,76,0.06)',gap:8,flexWrap:'wrap'}}>
                <div style={{flex:1,minWidth:0}}>
                  <p style={{color:'#E8C97A',fontSize:'.75rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.tipo.startsWith('video/')?'🎥':'📸'} {r.nombre}</p>
                  <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.6rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.url}</p>
                </div>
                <div style={{display:'flex',gap:6,flexShrink:0}}>
                  <button onClick={()=>copiar(r.url)} className="copy-btn" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'5px 10px',borderRadius:4,fontSize:'.65rem',fontFamily:'Georgia,serif'}}>📋 Copiar</button>
                  <a href={r.url} target="_blank" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'5px 10px',borderRadius:4,fontSize:'.65rem',textDecoration:'none'}}>👁️ Ver</a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{textAlign:'center',marginTop:24}}>
          <p style={{color:'rgba(201,168,76,0.2)',fontSize:'.62rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L.</p>
        </div>
      </div>
    </div>
  )
}
