'use client'
import { useState, useEffect } from 'react'

type Archivo = {
  public_id: string
  secure_url: string
  resource_type: string
  format: string
  bytes: number
  created_at: string
  width?: number
  height?: number
}

export default function ArchivosPage() {
  const [archivos, setArchivos] = useState<Archivo[]>([])
  const [cargando, setCargando] = useState(true)
  const [borrando, setBorrando] = useState<string|null>(null)
  const [filtro, setFiltro] = useState('todos')

  const cargar = async () => {
    setCargando(true)
    const res = await fetch('/api/cloudinary')
    const data = await res.json()
    setArchivos(Array.isArray(data) ? data : [])
    setCargando(false)
  }

  useEffect(() => { cargar() }, [])

  const borrar = async (public_id: string) => {
    if (!confirm('¿Seguro que quieres borrar este archivo?')) return
    setBorrando(public_id)
    await fetch('/api/cloudinary', {
      method: 'DELETE',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({public_id})
    })
    setArchivos(prev => prev.filter(a => a.public_id !== public_id))
    setBorrando(null)
  }

  const copiar = (url: string) => navigator.clipboard.writeText(url)

  const filtrados = archivos.filter(a => {
    if (filtro === 'todos') return true
    if (filtro === 'fotos') return a.resource_type === 'image'
    if (filtro === 'videos') return a.resource_type === 'video'
    return true
  })

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'20px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-up{animation:fadeInUp 0.5s ease both}
        .archivo-card{transition:all 0.2s ease}
        .archivo-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(201,168,76,0.2)!important}
        .btn{transition:all 0.15s ease;cursor:pointer}
        .btn:hover{opacity:0.8;transform:translateY(-1px)}
      `}</style>

      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/admin-panel" style={{color:'#C9A84C',fontSize:'.8rem',textDecoration:'none',display:'block',marginBottom:20}}>← Panel Admin</a>

        <div className="fade-up" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24,flexWrap:'wrap',gap:12}}>
          <div>
            <h1 style={{fontSize:'1.5rem',fontWeight:300,color:'#E8C97A',marginBottom:4}}>🗂️ Gestión de Archivos</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>{archivos.length} archivos en Cloudinary</p>
          </div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <a href="/admin-panel/upload" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'8px 16px',borderRadius:6,fontSize:'.75rem',fontWeight:700,textDecoration:'none'}}>📤 Subir Nuevo</a>
            <button onClick={cargar} className="btn" style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'8px 16px',borderRadius:6,fontSize:'.75rem',fontFamily:'Georgia,serif'}}>🔄 Actualizar</button>
          </div>
        </div>

        {/* FILTROS */}
        <div style={{display:'flex',gap:8,marginBottom:20,flexWrap:'wrap'}}>
          {['todos','fotos','videos'].map(f=>(
            <button key={f} onClick={()=>setFiltro(f)} className="btn" style={{background:filtro===f?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:filtro===f?'#1A1209':'#C9A84C',border:`1px solid ${filtro===f?'transparent':'rgba(201,168,76,0.2)'}`,padding:'6px 16px',borderRadius:20,fontSize:'.75rem',fontFamily:'Georgia,serif',textTransform:'capitalize'}}>
              {f==='todos'?'🗂️ Todos':f==='fotos'?'📸 Fotos':'🎥 Videos'}
            </button>
          ))}
        </div>

        {cargando ? (
          <div style={{textAlign:'center',padding:60}}>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.85rem'}}>Cargando archivos...</p>
          </div>
        ) : filtrados.length === 0 ? (
          <div style={{textAlign:'center',padding:60,background:'rgba(201,168,76,0.03)',borderRadius:12,border:'1px solid rgba(201,168,76,0.1)'}}>
            <p style={{fontSize:'3rem',marginBottom:12}}>📭</p>
            <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.85rem',marginBottom:16}}>No hay archivos todavía</p>
            <a href="/admin-panel/upload" style={{background:'linear-gradient(135deg,#C9A84C,#E8C97A)',color:'#1A1209',padding:'10px 24px',borderRadius:6,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>📤 Subir primer archivo</a>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:12}}>
            {filtrados.map(a=>(
              <div key={a.public_id} className="archivo-card" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:10,overflow:'hidden'}}>
                {/* PREVIEW */}
                <div style={{height:140,background:'rgba(0,0,0,0.3)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
                  {a.resource_type==='video' ? (
                    <video src={a.secure_url} style={{width:'100%',height:'100%',objectFit:'cover'}} muted/>
                  ) : (
                    <img src={a.secure_url} alt={a.public_id} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  )}
                </div>
                {/* INFO */}
                <div style={{padding:10}}>
                  <p style={{color:'#E8C97A',fontSize:'.65rem',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginBottom:4}}>{a.public_id.split('/').pop()}</p>
                  <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.6rem',marginBottom:8}}>{(a.bytes/1024).toFixed(0)} KB · {a.format.toUpperCase()}</p>
                  <div style={{display:'flex',gap:6}}>
                    <button onClick={()=>copiar(a.secure_url)} className="btn" style={{flex:1,background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'5px',borderRadius:4,fontSize:'.6rem',fontFamily:'Georgia,serif'}}>📋 Copiar</button>
                    <a href={a.secure_url} target="_blank" className="btn" style={{flex:1,background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'5px',borderRadius:4,fontSize:'.6rem',textDecoration:'none',textAlign:'center'}}>👁️ Ver</a>
                    <button onClick={()=>borrar(a.public_id)} disabled={borrando===a.public_id} className="btn" style={{background:'rgba(255,100,100,0.1)',border:'1px solid rgba(255,100,100,0.2)',color:'rgba(255,100,100,0.7)',padding:'5px 8px',borderRadius:4,fontSize:'.6rem',fontFamily:'Georgia,serif'}}>
                      {borrando===a.public_id?'...':'🗑️'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
