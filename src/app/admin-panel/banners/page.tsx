'use client'
import {useState,useEffect} from 'react'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'

const ESPACIOS_NM:Record<string,string>={
  hero:'Banner Hero',header:'Banner Header',footer:'Banner Footer',
  sidebar:'Banner Sidebar',
  'entre-productos':'Entre Productos',carrito:'Banner Carrito',especimen:'Banner Espécimen'
}

const RUBROS=[
  'todos','Especímenes Biológicos Secos','Cuadros Mariposas Diurnas','Joyería Natural',
  'Rarezas & Gynandromorphs','Artesanías & Cúpulas','Herramientas Biológicas',
  'Cuadros Mariposas Nocturnas','Cuadros Coleópteros & Artrópodos',
  'Minerales & Piedras Preciosas','Semillas & Plantas Medicinales',
  'Frutas Exóticas & Deshidratadas','Hongos & Productos Naturales',
  'Textilería & Alpaca','Alimentos Deshidratados','Pinturas & Arte Rupestre',
  'Maderas Finas & Esculturas','Esencias & Aceites Naturales'
]

type Banner={id:string,espacioId:string,empresa:string,titulo:string,subtitulo:string,cta:string,url:string,imagen:string,color:string,colorTexto:string,activo:boolean,orden:number,rubros:string[],idiomas:string[],fechaInicio:string,fechaFin:string}

export default function BannersAdmin(){
  const [tab,setTab]=useState<'activos'|'nuevo'|'espacios'>('activos')
  const [banners,setBanners]=useState<Banner[]>([])
  const [loading,setLoading]=useState(true)
  const [guardando,setGuardando]=useState(false)
  const [moviendo,setMoviendo]=useState<string|null>(null)
  const [editando,setEditando]=useState<string|null>(null)
  const [editData,setEditData]=useState<Record<string,string>>({})
  const [subiendoEdit,setSubiendoEdit]=useState(false)
  const [uploadMsgEdit,setUploadMsgEdit]=useState('')

  const subirArchivoEdit=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]
    if(!file)return
    setSubiendoEdit(true)
    setUploadMsgEdit('Subiendo...')
    const fd=new FormData()
    fd.append('file',file)
    try{
      const res=await fetch('/api/upload-banner',{method:'POST',body:fd})
      const d=await res.json()
      if(d.ok){
        if(d.tipo==='video') setEditData(prev=>({...prev,video:d.url}))
        else setEditData(prev=>({...prev,imagen:d.url}))
        setUploadMsgEdit('✅ '+d.url.split('/').pop())
      }else setUploadMsgEdit('❌ '+d.error)
    }catch{setUploadMsgEdit('❌ Error')}
    setSubiendoEdit(false)
  }

  const guardarEdicion=async(id:string)=>{
    for(const [campo,valor] of Object.entries(editData)){
      await accion({accion:'actualizar',id,campo,valor})
    }
    setBanners(prev=>prev.map(b=>b.id===id?{...b,...editData}:b))
    setEditando(null)
    setEditData({})
    setUploadMsgEdit('')
  }

  // Form nuevo
  const [espacioSel,setEspacioSel]=useState('hero')
  const [empresa,setEmpresa]=useState('')
  const [titulo,setTitulo]=useState('')
  const [subtitulo,setSubtitulo]=useState('')
  const [cta,setCta]=useState('Ver más →')
  const [url,setUrl]=useState('')
  const [imagen,setImagen]=useState('')
  const [video,setVideo]=useState('')
  const [subiendo,setSubiendo]=useState(false)
  const [uploadMsg,setUploadMsg]=useState('')

  const subirArchivo=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]
    if(!file)return
    setSubiendo(true)
    setUploadMsg('Subiendo...')
    const fd=new FormData()
    fd.append('file',file)
    try{
      const res=await fetch('/api/upload-banner',{method:'POST',body:fd})
      const d=await res.json()
      if(d.ok){
        if(d.tipo==='video') setVideo(d.url)
        else setImagen(d.url)
        setUploadMsg('✅ Subido: '+d.url.split('/').pop())
      }else{
        setUploadMsg('❌ Error: '+d.error)
      }
    }catch{setUploadMsg('❌ Error al subir')}
    setSubiendo(false)
  }
  const [colorFondo,setColorFondo]=useState('#1a1209')
  const [colorTexto,setColorTexto]=useState('#C9A84C')
  const [rubrosSel,setRubrosSel]=useState<string[]>(['todos'])
  const [fechaInicio,setFechaInicio]=useState('')
  const [fechaFin,setFechaFin]=useState('')

  useEffect(()=>{
    fetch('/api/banners?espacio=all')
      .then(r=>r.json())
      .then(d=>{
        if(d.todos) setBanners(d.todos)
        setLoading(false)
      })
      .catch(()=>setLoading(false))
  },[])

  const accion=async(body:object)=>{
    const res=await fetch('/api/banners',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    const d=await res.json()
    return d
  }

  const recargar=async()=>{
    const res=await fetch('/api/banners?espacio=all')
    const d=await res.json()
    if(d.todos) setBanners(d.todos)
  }

  const toggleActivo=async(id:string)=>{
    await accion({accion:'toggleActivo',id})
    setBanners(prev=>prev.map(b=>b.id===id?{...b,activo:!b.activo}:b))
  }

  const eliminar=async(id:string)=>{
    if(!confirm('¿Eliminar este banner?'))return
    await accion({accion:'eliminar',id})
    setBanners(prev=>prev.filter(b=>b.id!==id))
  }

  const subir=async(id:string)=>{
    await accion({accion:'subir',id})
    await recargar()
  }

  const bajar=async(id:string)=>{
    await accion({accion:'bajar',id})
    await recargar()
  }

  const moverEspacio=async(id:string,nuevoEspacio:string)=>{
    await accion({accion:'moverEspacio',id,valor:nuevoEspacio})
    setBanners(prev=>prev.map(b=>b.id===id?{...b,espacioId:nuevoEspacio}:b))
    setMoviendo(null)
  }

  const cambiarRubros=async(id:string,rubros:string[])=>{
    await accion({accion:'cambiarRubros',id,valor:rubros})
    setBanners(prev=>prev.map(b=>b.id===id?{...b,rubros}:b))
  }

  const guardarNuevo=async()=>{
    if(!empresa||!titulo||!espacioSel)return
    setGuardando(true)
    const res=await accion({
      accion:'crear',
      banner:{espacioId:espacioSel,empresa,titulo,subtitulo,cta,url,imagen,video,
        color:colorFondo,colorTexto,rubros:rubrosSel,idiomas:['es','en'],
        fechaInicio,fechaFin,orden:banners.length+1}
    })
    if(res.banner) setBanners(prev=>[...prev,res.banner])
    setEmpresa('');setTitulo('');setSubtitulo('');setUrl('');setImagen('')
    setGuardando(false)
    alert('✅ Banner creado')
    setTab('activos')
  }

  const toggleRubro=(r:string)=>setRubrosSel(prev=>
    prev.includes(r)?prev.filter(x=>x!==r):[...prev,r]
  )

  if(loading) return(
    <div style={{minHeight:'100vh',background:BG,display:'flex',alignItems:'center',justifyContent:'center',color:G,fontFamily:'Georgia,serif'}}>
      Cargando banners...
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      {/* Navbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:`1px solid ${BD}`,background:'rgba(10,10,10,0.97)'}}>
        <div style={{display:'flex',gap:8}}>
          <a href='/' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>🏠 Inicio</a>
          <a href='/admin-panel' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>← Admin</a>
        </div>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:'1rem',margin:0}}>📢 Gestión de Banners</h1>
          <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>{banners.filter(b=>b.activo).length} activos · {banners.length} total</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <a href='/admin-panel/avisos' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>📣 Avisos</a>
          <a href='/admin-panel/social' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>📱 Social</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,padding:'12px 24px',borderBottom:`1px solid ${BD}`}}>
        {([
          {id:'activos',nm:`🟢 Banners (${banners.length})`},
          {id:'nuevo',nm:'➕ Nuevo Banner'},
          {id:'espacios',nm:'📐 Espacios'},
        ] as const).map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{padding:'8px 18px',background:tab===t.id?'rgba(201,168,76,0.2)':'transparent',
              border:`1px solid ${tab===t.id?G:BD}`,color:G,borderRadius:8,cursor:'pointer',
              fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
            {t.nm}
          </button>
        ))}
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'24px'}}>

        {/* BANNERS ACTIVOS */}
        {tab==='activos'&&(
          <div>
            {banners.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)'}}>No hay banners — crea el primero</p>
                <button onClick={()=>setTab('nuevo')}
                  style={{marginTop:12,padding:'8px 20px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
                  + Nuevo Banner
                </button>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:12}}>
                {[...banners].sort((a,b)=>(a.orden||0)-(b.orden||0)).map((b,idx,arr)=>(
                  <div key={b.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${b.activo?'#2ecc71':BD}`,borderRadius:12,padding:16}}>
                    {/* Preview */}
                    <div style={{background:b.color,borderRadius:8,padding:'12px 20px',marginBottom:12,display:'flex',alignItems:'center',gap:12,justifyContent:'space-between'}}>
                      {b.imagen&&<img src={b.imagen} style={{height:36,objectFit:'contain',flexShrink:0}} alt={b.empresa}/>}
                      <div style={{flex:1}}>
                        <p style={{color:b.colorTexto,fontSize:'.85rem',fontWeight:'bold',margin:0}}>{b.titulo}</p>
                        {b.subtitulo&&<p style={{color:b.colorTexto,fontSize:'.72rem',margin:0,opacity:.8}}>{b.subtitulo}</p>}
                      </div>
                      <span style={{padding:'4px 12px',background:b.colorTexto,color:b.color,borderRadius:4,fontSize:'.72rem',fontWeight:'bold',flexShrink:0}}>{b.cta}</span>
                    </div>

                    {/* Info y controles */}
                    <div style={{display:'flex',gap:12,alignItems:'flex-start',flexWrap:'wrap' as const}}>
                      <div style={{flex:1,minWidth:200}}>
                        <p style={{margin:'0 0 4px',fontSize:'.8rem',fontWeight:'bold'}}>{b.empresa}</p>
                        <p style={{margin:'0 0 4px',fontSize:'.72rem',color:'rgba(201,168,76,0.6)'}}>
                          📐 {ESPACIOS_NM[b.espacioId]||b.espacioId} · Orden #{b.orden}
                        </p>
                        {b.fechaInicio&&<p style={{margin:'0 0 4px',fontSize:'.7rem',color:'rgba(201,168,76,0.5)'}}>📅 {b.fechaInicio} → {b.fechaFin}</p>}
                        <div style={{display:'flex',gap:4,flexWrap:'wrap' as const,marginTop:4}}>
                          {(b.rubros||[]).map(r=>(
                            <span key={r} style={{fontSize:'.6rem',padding:'1px 6px',background:'rgba(201,168,76,0.1)',borderRadius:10}}>{r}</span>
                          ))}
                        </div>
                      </div>

                      {/* Controles */}
                      <div style={{display:'flex',gap:6,flexWrap:'wrap' as const,alignItems:'center'}}>
                        {/* Subir/Bajar orden */}
                        <button onClick={()=>subir(b.id)} disabled={idx===0}
                          style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:idx===0?'rgba(201,168,76,0.3)':G,borderRadius:6,cursor:idx===0?'default':'pointer',fontSize:'.8rem'}}>
                          ▲
                        </button>
                        <button onClick={()=>bajar(b.id)} disabled={idx===arr.length-1}
                          style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:idx===arr.length-1?'rgba(201,168,76,0.3)':G,borderRadius:6,cursor:idx===arr.length-1?'default':'pointer',fontSize:'.8rem'}}>
                          ▼
                        </button>

                        {/* Mover de espacio */}
                        <div style={{position:'relative' as const}}>
                          <button onClick={()=>setMoviendo(moviendo===b.id?null:b.id)}
                            style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:6,cursor:'pointer',fontSize:'.72rem'}}>
                            📐 Mover
                          </button>
                          {moviendo===b.id&&(
                            <div style={{position:'absolute' as const,top:'100%',left:0,zIndex:50,background:'#0a0a0a',border:`1px solid ${G}`,borderRadius:8,padding:6,minWidth:180,boxShadow:'0 8px 24px rgba(0,0,0,0.8)'}}>
                              {Object.entries(ESPACIOS_NM).map(([id,nm])=>(
                                <button key={id} onClick={()=>moverEspacio(b.id,id)}
                                  style={{display:'block',width:'100%',padding:'6px 10px',background:b.espacioId===id?'rgba(201,168,76,0.2)':'transparent',
                                    border:'none',color:G,cursor:'pointer',fontSize:'.72rem',textAlign:'left' as const,borderRadius:4}}>
                                  {b.espacioId===id?'✅ ':''}{nm}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Editar */}
                        <button onClick={()=>{setEditando(editando===b.id?null:b.id);setEditData({});setUploadMsgEdit('')}}
                          style={{padding:'5px 10px',background:editando===b.id?'rgba(201,168,76,0.2)':'rgba(201,168,76,0.08)',
                            border:`1px solid ${editando===b.id?G:BD}`,color:G,borderRadius:6,cursor:'pointer',fontSize:'.72rem'}}>
                          ✏️ Editar
                        </button>
                        {/* Activar/Desactivar */}
                        <button onClick={()=>toggleActivo(b.id)}
                          style={{padding:'5px 12px',background:b.activo?'rgba(46,204,113,0.15)':'rgba(231,76,60,0.15)',
                            border:`1px solid ${b.activo?'#2ecc71':'#e74c3c'}`,
                            color:b.activo?'#2ecc71':'#e74c3c',borderRadius:6,cursor:'pointer',fontSize:'.72rem'}}>
                          {b.activo?'✅ Activo':'❌ Inactivo'}
                        </button>

                        {/* Eliminar */}
                        <button onClick={()=>eliminar(b.id)}
                          style={{padding:'5px 10px',background:'rgba(231,76,60,0.1)',border:'1px solid rgba(231,76,60,0.3)',
                            color:'#e74c3c',borderRadius:6,cursor:'pointer',fontSize:'.8rem'}}>
                          🗑️
                        </button>
                      </div>
                    </div>

                    {/* Panel edicion */}
                    {editando===b.id&&(
                      <div style={{marginTop:12,padding:16,background:'rgba(201,168,76,0.06)',borderRadius:8,border:`1px solid ${G}`}}>
                        <p style={{fontSize:'.75rem',fontWeight:'bold',marginBottom:12}}>✏️ Editar Banner</p>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                          {[
                            {l:'Título',k:'titulo',v:b.titulo},
                            {l:'Subtítulo',k:'subtitulo',v:b.subtitulo},
                            {l:'Botón CTA',k:'cta',v:b.cta},
                            {l:'URL destino',k:'url',v:b.url},
                          ].map(f=>(
                            <div key={f.k}>
                              <label style={{fontSize:'.68rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:3}}>{f.l}</label>
                              <input defaultValue={f.v} onChange={e=>setEditData(prev=>({...prev,[f.k]:e.target.value}))}
                                style={{width:'100%',padding:'7px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.78rem'}}/>
                            </div>
                          ))}
                        </div>
                        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                          <div>
                            <label style={{fontSize:'.68rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:3}}>Color fondo</label>
                            <div style={{display:'flex',gap:6}}>
                              <input type="color" defaultValue={b.color} onChange={e=>setEditData(prev=>({...prev,color:e.target.value}))} style={{width:34,height:34,border:'none',borderRadius:4,cursor:'pointer'}}/>
                              <input defaultValue={b.color} onChange={e=>setEditData(prev=>({...prev,color:e.target.value}))} style={{flex:1,padding:'7px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.72rem'}}/>
                            </div>
                          </div>
                          <div>
                            <label style={{fontSize:'.68rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:3}}>Color texto</label>
                            <div style={{display:'flex',gap:6}}>
                              <input type="color" defaultValue={b.colorTexto} onChange={e=>setEditData(prev=>({...prev,colorTexto:e.target.value}))} style={{width:34,height:34,border:'none',borderRadius:4,cursor:'pointer'}}/>
                              <input defaultValue={b.colorTexto} onChange={e=>setEditData(prev=>({...prev,colorTexto:e.target.value}))} style={{flex:1,padding:'7px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.72rem'}}/>
                            </div>
                          </div>
                        </div>
                        <div style={{marginBottom:12,padding:12,background:'rgba(201,168,76,0.04)',borderRadius:6,border:`1px solid ${BD}`}}>
                          <p style={{fontSize:'.68rem',color:'rgba(201,168,76,0.6)',marginBottom:6}}>📁 Subir imagen/video (GIF,PNG,JPG,WebP,MP4,WebM)</p>
                          <input type="file" accept=".gif,.png,.jpg,.jpeg,.webp,.mp4,.webm,.mov"
                            onChange={subirArchivoEdit} disabled={subiendoEdit}
                            style={{color:G,fontSize:'.75rem',cursor:'pointer'}}/>
                          {uploadMsgEdit&&<p style={{fontSize:'.7rem',marginTop:4,color:uploadMsgEdit.startsWith('✅')?'#2ecc71':'#e74c3c'}}>{uploadMsgEdit}</p>}
                        </div>
                        <div style={{display:'flex',gap:8}}>
                          <button onClick={()=>guardarEdicion(b.id)}
                            style={{flex:1,padding:'8px',background:G,color:'#0a0a0a',border:'none',borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem',fontWeight:'bold'}}>
                            💾 Guardar cambios
                          </button>
                          <button onClick={()=>{setEditando(null);setEditData({});setUploadMsgEdit('')}}
                            style={{padding:'8px 16px',background:'transparent',border:`1px solid ${BD}`,color:G,borderRadius:6,cursor:'pointer',fontSize:'.8rem'}}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Cambiar rubros */}
                    <div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${BD}`}}>
                      <p style={{fontSize:'.68rem',color:'rgba(201,168,76,0.5)',margin:'0 0 6px'}}>CATEGORÍAS/RUBROS:</p>
                      <div style={{display:'flex',flexWrap:'wrap' as const,gap:4}}>
                        {RUBROS.map(r=>(
                          <button key={r} onClick={()=>{
                            const curr=b.rubros||['todos']
                            const nuevo=curr.includes(r)?curr.filter(x=>x!==r):[...curr,r]
                            cambiarRubros(b.id,nuevo.length===0?['todos']:nuevo)
                          }}
                            style={{padding:'2px 8px',background:(b.rubros||['todos']).includes(r)?'rgba(201,168,76,0.2)':'transparent',
                              border:`1px solid ${(b.rubros||['todos']).includes(r)?G:BD}`,color:G,
                              borderRadius:16,cursor:'pointer',fontSize:'.62rem'}}>
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NUEVO BANNER */}
        {tab==='nuevo'&&(
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            <div>
              <p style={{fontSize:'.8rem',fontWeight:'bold',marginBottom:16}}>DATOS DEL BANNER</p>

              <div style={{marginBottom:12}}>
                <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>ESPACIO</label>
                <select value={espacioSel} onChange={e=>setEspacioSel(e.target.value)}
                  style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}>
                  {Object.entries(ESPACIOS_NM).map(([id,nm])=>(
                    <option key={id} value={id} style={{background:'#0a0a0a'}}>{nm}</option>
                  ))}
                </select>
              </div>

              {[
                {l:'EMPRESA',v:empresa,s:setEmpresa,p:'Nombre empresa o propio'},
                {l:'TÍTULO',v:titulo,s:setTitulo,p:'Título del banner'},
                {l:'SUBTÍTULO',v:subtitulo,s:setSubtitulo,p:'Descripción corta'},
                {l:'BOTÓN CTA',v:cta,s:setCta,p:'Ver más →'},
                {l:'URL DESTINO',v:url,s:setUrl,p:'https://...'},
                {l:'URL IMAGEN (WebP/JPG)',v:imagen,s:setImagen,p:'https://...imagen.webp'},
                {l:'URL VIDEO (WebM/MP4 — 3D/4D)',v:url,s:setUrl,p:'https://...video.webm'},
              ].map(f=>(
                <div key={f.l} style={{marginBottom:10}}>
                  <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{f.l}</label>
                  <input value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p}
                    style={{width:'100%',padding:'9px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
                </div>
              ))}

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                {[{l:'FONDO',v:colorFondo,s:setColorFondo},{l:'TEXTO',v:colorTexto,s:setColorTexto}].map(f=>(
                  <div key={f.l}>
                    <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{f.l}</label>
                    <div style={{display:'flex',gap:6,alignItems:'center'}}>
                      <input type="color" value={f.v} onChange={e=>f.s(e.target.value)} style={{width:34,height:34,border:'none',borderRadius:4,cursor:'pointer'}}/>
                      <input value={f.v} onChange={e=>f.s(e.target.value)} style={{flex:1,padding:'7px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.72rem'}}/>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
                <div>
                  <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>FECHA INICIO</label>
                  <input type="date" value={fechaInicio} onChange={e=>setFechaInicio(e.target.value)}
                    style={{width:'100%',padding:'8px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.8rem'}}/>
                </div>
                <div>
                  <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>FECHA FIN</label>
                  <input type="date" value={fechaFin} onChange={e=>setFechaFin(e.target.value)}
                    style={{width:'100%',padding:'8px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.8rem'}}/>
                </div>
              </div>
            </div>

            <div>
              <p style={{fontSize:'.8rem',fontWeight:'bold',marginBottom:16}}>CATEGORÍAS Y PREVIEW</p>

              <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',marginBottom:8}}>MOSTRAR EN RUBROS:</p>
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:4,marginBottom:16}}>
                {RUBROS.map(r=>(
                  <button key={r} onClick={()=>toggleRubro(r)}
                    style={{padding:'3px 8px',background:rubrosSel.includes(r)?'rgba(201,168,76,0.2)':'transparent',
                      border:`1px solid ${rubrosSel.includes(r)?G:BD}`,color:G,borderRadius:16,cursor:'pointer',fontSize:'.68rem'}}>
                    {r}
                  </button>
                ))}
              </div>

              {/* Preview */}
              {titulo&&(
                <div>
                  <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',marginBottom:8}}>PREVIEW:</p>
                  <div style={{background:colorFondo,borderRadius:8,padding:'16px 20px',display:'flex',alignItems:'center',gap:12,justifyContent:'space-between',marginBottom:12}}>
                    {imagen&&<img src={imagen} style={{height:40,objectFit:'contain',flexShrink:0}} alt={empresa}/>}
                    <div style={{flex:1}}>
                      <p style={{color:colorTexto,fontSize:'.9rem',fontWeight:'bold',margin:0}}>{titulo}</p>
                      {subtitulo&&<p style={{color:colorTexto,fontSize:'.75rem',margin:0,opacity:.8}}>{subtitulo}</p>}
                    </div>
                    <span style={{padding:'5px 12px',background:colorTexto,color:colorFondo,borderRadius:4,fontSize:'.72rem',fontWeight:'bold',flexShrink:0}}>{cta}</span>
                  </div>
                </div>
              )}

              {/* Uploader directo */}
              <div style={{marginBottom:16,padding:16,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.3)',borderRadius:8}}>
                <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',marginBottom:8}}>📁 SUBIR ARCHIVO (GIF, PNG, JPG, WebP, WebM, MP4)</p>
                <input type="file" accept=".gif,.png,.jpg,.jpeg,.webp,.mp4,.webm,.mov"
                  onChange={subirArchivo} disabled={subiendo}
                  style={{color:'#C9A84C',fontSize:'.8rem',cursor:'pointer'}}/>
                {uploadMsg&&<p style={{fontSize:'.72rem',marginTop:6,color:uploadMsg.startsWith('✅')?'#2ecc71':'#e74c3c'}}>{uploadMsg}</p>}
                {subiendo&&<p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',marginTop:4}}>⏳ Subiendo a Bunny.net...</p>}
              </div>
              <button onClick={guardarNuevo} disabled={guardando||!empresa||!titulo}
                style={{width:'100%',padding:'14px',background:G,color:'#0a0a0a',border:'none',
                  borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'1rem',
                  fontWeight:'bold',opacity:!empresa||!titulo?0.5:1}}>
                {guardando?'Guardando...':'💾 Crear Banner'}
              </button>
            </div>
          </div>
        )}

        {/* ESPACIOS */}
        {tab==='espacios'&&(
          <div>
            <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:20}}>Espacios publicitarios en houseinsectsofperu.com</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
              {Object.entries(ESPACIOS_NM).map(([id,nm])=>{
                const count=banners.filter(b=>b.espacioId===id&&b.activo).length
                return(
                  <div key={id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${count>0?'#2ecc71':BD}`,borderRadius:10,padding:16}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <p style={{fontSize:'.85rem',fontWeight:'bold',margin:0}}>{nm}</p>
                      <span style={{fontSize:'.65rem',padding:'2px 8px',background:count>0?'rgba(46,204,113,0.2)':'rgba(201,168,76,0.1)',
                        border:`1px solid ${count>0?'#2ecc71':BD}`,borderRadius:16,color:count>0?'#2ecc71':G}}>
                        {count>0?`${count} activo`:'Libre'}
                      </span>
                    </div>
                    <div style={{display:'flex',flexDirection:'column' as const,gap:4}}>
                      {banners.filter(b=>b.espacioId===id).map(b=>(
                        <div key={b.id} style={{fontSize:'.7rem',padding:'4px 8px',background:'rgba(201,168,76,0.08)',borderRadius:4,color:G}}>
                          {b.activo?'🟢':'🔴'} {b.empresa||b.titulo}
                        </div>
                      ))}
                    </div>
                    <button onClick={()=>{setEspacioSel(id);setTab('nuevo')}}
                      style={{marginTop:10,width:'100%',padding:'6px',background:'rgba(201,168,76,0.1)',border:`1px solid ${G}`,
                        color:G,borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.72rem'}}>
                      + Agregar banner aquí
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
