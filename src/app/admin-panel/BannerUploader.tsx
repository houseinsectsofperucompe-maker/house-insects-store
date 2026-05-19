'use client'
import { useState, useRef } from 'react'

const CLOUD_NAME = 'dv3mvukmq'
const UPLOAD_PRESET = 'house_insects_banners'

const TIPOS_BANNER = [
  'Header Principal',
  'Catálogo', 
  'Sidebar',
  'Footer',
  'Popup Premium',
  'Pack Completo',
]

export default function BannerUploader() {
  const [archivo, setArchivo] = useState<File|null>(null)
  const [preview, setPreview] = useState<string|null>(null)
  const [subiendo, setSubiendo] = useState(false)
  const [progreso, setProgreso] = useState(0)
  const [urlFinal, setUrlFinal] = useState<string|null>(null)
  const [tipo, setTipo] = useState('Header Principal')
  const [cliente, setCliente] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const esVideo = archivo?.type.startsWith('video/')
  const esGif = archivo?.type === 'image/gif'

  const seleccionar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const maxMB = file.type.startsWith('video/') ? 50 : 10
    if (file.size > maxMB * 1024 * 1024) {
      setError(`El archivo es muy grande. Máximo ${maxMB}MB.`)
      return
    }
    setArchivo(file)
    setError('')
    setUrlFinal(null)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const subir = async () => {
    if (!archivo) return
    setSubiendo(true)
    setProgreso(0)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', archivo)
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('folder', 'banners')
      formData.append('tags', `banner,${tipo.toLowerCase().replace(/ /g,'-')},${cliente||'cliente'}`)

      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgreso(Math.round(e.loaded/e.total*100))
      }
      xhr.onload = () => {
        const data = JSON.parse(xhr.responseText)
        if (data.secure_url) {
          setUrlFinal(data.secure_url)
          setProgreso(100)
        } else {
          setError('Error al subir. Verifica el upload preset en Cloudinary.')
        }
        setSubiendo(false)
      }
      xhr.onerror = () => { setError('Error de conexión'); setSubiendo(false) }
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`)
      xhr.send(formData)
    } catch {
      setError('Error al subir')
      setSubiendo(false)
    }
  }

  const copiar = () => {
    if (urlFinal) navigator.clipboard.writeText(urlFinal)
  }

  const reset = () => {
    setArchivo(null)
    setPreview(null)
    setUrlFinal(null)
    setProgreso(0)
    setError('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:12,padding:24}}>
      <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:20}}>SUBIR BANNER</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
        <div>
          <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',marginBottom:6}}>CLIENTE</p>
          <input value={cliente} onChange={e=>setCliente(e.target.value)} placeholder="Nombre del cliente" style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif',boxSizing:'border-box'}}/>
        </div>
        <div>
          <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',marginBottom:6}}>TIPO DE BANNER</p>
          <select value={tipo} onChange={e=>setTipo(e.target.value)} style={{width:'100%',background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.2)',color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif',boxSizing:'border-box'}}>
            {TIPOS_BANNER.map(t=><option key={t} value={t} style={{background:'#1A1209'}}>{t}</option>)}
          </select>
        </div>
      </div>

      <div
        onClick={()=>inputRef.current?.click()}
        style={{border:'2px dashed rgba(201,168,76,0.25)',borderRadius:10,padding:32,textAlign:'center',cursor:'pointer',marginBottom:16,background:preview?'transparent':'rgba(201,168,76,0.02)',transition:'all 0.2s ease'}}
      >
        {preview ? (
          esVideo ? (
            <video src={preview} controls style={{maxWidth:'100%',maxHeight:200,borderRadius:6}}/>
          ) : (
            <img src={preview} style={{maxWidth:'100%',maxHeight:200,borderRadius:6,objectFit:'contain'}}/>
          )
        ) : (
          <>
            <p style={{fontSize:'2rem',marginBottom:8}}>📁</p>
            <p style={{color:'rgba(201,168,76,0.6)',fontSize:'.82rem'}}>Clic para seleccionar archivo</p>
            <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem',marginTop:4}}>JPG · PNG · WebP · GIF · MP4 · WebM · Max 50MB</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*,video/*,.gif,.webp,.webm" onChange={seleccionar} style={{display:'none'}}/>
      </div>

      {archivo && (
        <div style={{background:'rgba(201,168,76,0.06)',borderRadius:6,padding:'8px 12px',marginBottom:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <p style={{color:'#E8C97A',fontSize:'.75rem'}}>{archivo.name}</p>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>{(archivo.size/1024).toFixed(0)} KB · {archivo.type}</p>
          </div>
          <button onClick={reset} style={{background:'transparent',border:'none',color:'rgba(255,100,100,0.6)',cursor:'pointer',fontSize:'.75rem'}}>✕ Quitar</button>
        </div>
      )}

      {error && <p style={{color:'#ff6b6b',fontSize:'.75rem',marginBottom:12}}>{error}</p>}

      {subiendo && (
        <div style={{marginBottom:12}}>
          <div style={{background:'rgba(201,168,76,0.1)',borderRadius:10,height:8,overflow:'hidden'}}>
            <div style={{background:'linear-gradient(to right,#C9A84C,#E8C97A)',height:'100%',width:`${progreso}%`,transition:'width 0.3s ease',borderRadius:10}}/>
          </div>
          <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',marginTop:4,textAlign:'center'}}>Subiendo... {progreso}%</p>
        </div>
      )}

      {urlFinal && (
        <div style={{background:'rgba(37,211,102,0.08)',border:'1px solid rgba(37,211,102,0.2)',borderRadius:8,padding:16,marginBottom:12}}>
          <p style={{color:'#25D366',fontSize:'.75rem',marginBottom:8}}>✅ Subido exitosamente a Cloudinary</p>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.65rem',wordBreak:'break-all',marginBottom:8}}>{urlFinal}</p>
          <div style={{display:'flex',gap:8}}>
            <button onClick={copiar} style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.3)',color:'#C9A84C',padding:'6px 14px',borderRadius:4,fontSize:'.72rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>📋 Copiar URL</button>
            <button onClick={reset} style={{background:'transparent',border:'1px solid rgba(255,100,100,0.3)',color:'rgba(255,100,100,0.6)',padding:'6px 14px',borderRadius:4,fontSize:'.72rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>🗑️ Nuevo</button>
          </div>
        </div>
      )}

      {!subiendo && !urlFinal && archivo && (
        <button onClick={subir} style={{width:'100%',background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'12px',borderRadius:6,fontSize:'.85rem',fontWeight:700,cursor:'pointer',border:'none',fontFamily:'Georgia,serif'}}>
          ⬆️ Subir a Cloudinary
        </button>
      )}
    </div>
  )
}
