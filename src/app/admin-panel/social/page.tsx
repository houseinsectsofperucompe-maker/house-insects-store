'use client'
import {useState,useEffect} from 'react'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'

const PLANTILLAS=[
  {id:'nueva-especie',nm:'🦋 Nueva Especie',texto:'¡Nueva especie disponible! {especie} — Especimen A1 certificado SERFOR/CITES. Disponible en nuestra tienda online. 🌿 #HouseInsectsofPeru #Entomologia #Mariposas #Peru'},
  {id:'oferta',nm:'🏷️ Oferta Especial',texto:'¡Oferta especial! {especie} con descuento especial esta semana. Envíos a todo el mundo con certificación legal. 📦 #Coleccionismo #InsectosPeru #Entomologia'},
  {id:'envio',nm:'📦 Confirmación Envío',texto:'Pedido enviado 🚀 {especie} en camino a su nuevo hogar. Empaque especial con certificados SERFOR y CITES originales. #HouseInsectsofPeru'},
  {id:'educativo',nm:'📚 Post Educativo',texto:'¿Sabías que {especie} es una de las especies más fascinantes del Perú? Aprende más en nuestra web. 🦋 #CienciaNatural #Entomologia #BiodiversidadPeru'},
  {id:'coleccion',nm:'🏆 Colección Premium',texto:'Colección premium de especímenes peruanos. {especie} — calidad A1, montaje profesional, certificación legal internacional. #LuxuryNature #EntomologyArt'},
  {id:'exportacion',nm:'✈️ Exportación',texto:'Exportamos a todo el mundo 🌍 {especie} con todos los permisos legales: SERFOR, CITES, Aduana. #ExportacionPeru #LegalButterflies'},
]

type Post={id:string,texto:string,fecha:string,redes:string[],estado:string,especie:string}
type CalEvent={fecha:string,texto:string,redes:string[]}

export default function SocialPanel(){
  const [tab,setTab]=useState<'generador'|'plantillas'|'calendario'|'historial'>('generador')
  const [texto,setTexto]=useState('')
  const [especie,setEspecie]=useState('')
  const [redesSel,setRedesSel]=useState<string[]>(['facebook'])
  const [generando,setGenerando]=useState(false)
  const [historial,setHistorial]=useState<Post[]>([])
  const [calendario,setCalendario]=useState<CalEvent[]>([])
  const [fechaProg,setFechaProg]=useState('')
  const [plantillaSel,setPlantillaSel]=useState('')

  const REDES=[
    {id:'facebook',nm:'Facebook',icon:'📘',color:'#1877f2'},
    {id:'instagram',nm:'Instagram',icon:'📸',color:'#e1306c'},
    {id:'tiktok',nm:'TikTok',icon:'🎵',color:'#010101'},
  ]

  const toggleRed=(id:string)=>{
    setRedesSel(prev=>prev.includes(id)?prev.filter(r=>r!==id):[...prev,id])
  }

  const generarConIA=async()=>{
    if(!texto&&!especie)return
    setGenerando(true)
    try{
      const res=await fetch('/api/generar-post',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({texto,especie,redes:redesSel})
      })
      const d=await res.json()
      setTexto(d.post||texto)
    }catch{
      // fallback
      setTexto(`🦋 ${especie||'Espécimen premium'} de Perú — Calidad A1, certificado SERFOR/CITES. Disponible en houseinsectsofperu.com 🌿\n\n#HouseInsectsofPeru #Entomologia #Mariposas #Peru #NaturalHistory`)
    }
    setGenerando(false)
  }

  const publicar=()=>{
    const post:Post={
      id:Date.now().toString(),
      texto,especie,
      fecha:new Date().toISOString(),
      redes:redesSel,
      estado:'publicado'
    }
    setHistorial(prev=>[post,...prev])
    // Abrir redes
    redesSel.forEach(red=>{
      const txt=encodeURIComponent(texto)
      if(red==='facebook') window.open(`https://www.facebook.com/profile.php?id=61590682700134`,'_blank')
      if(red==='instagram') window.open('https://www.instagram.com/','_blank')
      if(red==='tiktok') window.open('https://www.tiktok.com/','_blank')
    })
    // Copiar al portapapeles
    navigator.clipboard?.writeText(texto)
    alert('✅ Texto copiado al portapapeles. Pégalo en cada red social.')
  }

  const programar=()=>{
    if(!fechaProg||!texto)return
    setCalendario(prev=>[...prev,{fecha:fechaProg,texto,redes:redesSel}])
    alert(`✅ Post programado para ${fechaProg}`)
    setFechaProg('')
  }

  const usarPlantilla=(p:typeof PLANTILLAS[0])=>{
    setTexto(p.texto.replace('{especie}',especie||'[especie]'))
    setPlantillaSel(p.id)
    setTab('generador')
  }

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      {/* Navbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:`1px solid ${BD}`,background:'rgba(10,10,10,0.97)'}}>
        <div style={{display:'flex',gap:8}}>
          <a href='/' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>🏠 Inicio</a>
          <a href='/admin-panel' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>← Admin Panel</a>
        </div>
        <h1 style={{fontSize:'1rem',letterSpacing:'0.1em',margin:0}}>📢 Panel de Redes Sociales</h1>
        <div style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)'}}>House Insects of Peru</div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,padding:'16px 24px',borderBottom:`1px solid ${BD}`}}>
        {([
          {id:'generador',nm:'✍️ Generador'},
          {id:'plantillas',nm:'📋 Plantillas'},
          {id:'calendario',nm:'📅 Calendario'},
          {id:'historial',nm:'📜 Historial'},
        ] as const).map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{padding:'8px 18px',background:tab===t.id?'rgba(201,168,76,0.2)':'transparent',
              border:`1px solid ${tab===t.id?G:BD}`,color:G,borderRadius:8,cursor:'pointer',
              fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
            {t.nm}
          </button>
        ))}
      </div>

      <div style={{maxWidth:900,margin:'0 auto',padding:'24px'}}>

        {/* GENERADOR */}
        {tab==='generador'&&(
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
              <div>
                <label style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>ESPECIE</label>
                <input value={especie} onChange={e=>setEspecie(e.target.value)}
                  placeholder="ej: Morpho didius, Caligo eurilochus..."
                  style={{width:'100%',padding:'10px 14px',background:'rgba(201,168,76,0.06)',
                    border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
              </div>
              <div>
                <label style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>REDES SOCIALES</label>
                <div style={{display:'flex',gap:8}}>
                  {REDES.map(r=>(
                    <button key={r.id} onClick={()=>toggleRed(r.id)}
                      style={{padding:'8px 14px',background:redesSel.includes(r.id)?r.color:'transparent',
                        border:`1px solid ${redesSel.includes(r.id)?r.color:BD}`,color:'#fff',
                        borderRadius:8,cursor:'pointer',fontSize:'.8rem'}}>
                      {r.icon} {r.nm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{marginBottom:16}}>
              <label style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>TEXTO DEL POST</label>
              <textarea value={texto} onChange={e=>setTexto(e.target.value)}
                placeholder="Escribe tu post o usa IA para generarlo..."
                rows={6}
                style={{width:'100%',padding:'12px 14px',background:'rgba(201,168,76,0.06)',
                  border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',
                  fontSize:'.85rem',resize:'vertical' as const,lineHeight:1.6}}/>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
                <span style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>{texto.length} caracteres</span>
                {texto.length>280&&<span style={{fontSize:'.65rem',color:'#e74c3c'}}>⚠️ Muy largo para Twitter</span>}
              </div>
            </div>

            <div style={{display:'flex',gap:12,marginBottom:24}}>
              <button onClick={generarConIA} disabled={generando}
                style={{padding:'10px 24px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                  color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.85rem'}}>
                {generando?'Generando...':'🤖 Generar con IA'}
              </button>
              <button onClick={()=>setTexto('')}
                style={{padding:'10px 16px',background:'transparent',border:`1px solid ${BD}`,
                  color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.85rem'}}>
                🗑️ Limpiar
              </button>
            </div>

            {/* Preview */}
            {texto&&(
              <div style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:12,padding:20,marginBottom:20}}>
                <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',marginBottom:8}}>PREVIEW</p>
                <p style={{fontSize:'.9rem',lineHeight:1.7,margin:0,whiteSpace:'pre-wrap'}}>{texto}</p>
              </div>
            )}

            {/* Programar */}
            <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:20,padding:16,background:'rgba(201,168,76,0.04)',borderRadius:8,border:`1px solid ${BD}`}}>
              <div style={{flex:1}}>
                <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>PROGRAMAR PARA</label>
                <input type="datetime-local" value={fechaProg} onChange={e=>setFechaProg(e.target.value)}
                  style={{padding:'8px 12px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                    color:G,borderRadius:6,fontFamily:'Georgia,serif',fontSize:'.8rem'}}/>
              </div>
              <button onClick={programar}
                style={{padding:'10px 20px',background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,
                  color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem',marginTop:20}}>
                📅 Programar
              </button>
            </div>

            {/* Publicar */}
            <button onClick={publicar} disabled={!texto||redesSel.length===0}
              style={{width:'100%',padding:'14px',background:G,color:'#0a0a0a',
                borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'1rem',
                fontWeight:'bold',border:'none',opacity:!texto||redesSel.length===0?0.5:1}}>
              🚀 Publicar en {redesSel.map(r=>REDES.find(x=>x.id===r)?.nm).join(' + ')}
            </button>
          </div>
        )}

        {/* PLANTILLAS */}
        {tab==='plantillas'&&(
          <div>
            <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:20}}>
              Selecciona una plantilla y personalízala con tu especie.
            </p>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>ESPECIE PARA PLANTILLA</label>
              <input value={especie} onChange={e=>setEspecie(e.target.value)}
                placeholder="ej: Morpho didius..."
                style={{width:'100%',padding:'10px 14px',background:'rgba(201,168,76,0.06)',
                  border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {PLANTILLAS.map(p=>(
                <div key={p.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${plantillaSel===p.id?G:BD}`,borderRadius:10,padding:16}}>
                  <p style={{fontSize:'.85rem',fontWeight:'bold',margin:'0 0 8px'}}>{p.nm}</p>
                  <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',margin:'0 0 12px',lineHeight:1.5}}>
                    {p.texto.replace('{especie}',especie||'[especie]').substring(0,100)}...
                  </p>
                  <button onClick={()=>usarPlantilla(p)}
                    style={{padding:'6px 16px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                      color:G,borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>
                    Usar esta plantilla
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDARIO */}
        {tab==='calendario'&&(
          <div>
            <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:20}}>Posts programados</p>
            {calendario.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.85rem'}}>No hay posts programados</p>
                <p style={{color:'rgba(201,168,76,0.2)',fontSize:'.75rem'}}>Ve al Generador y programa un post</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:12}}>
                {calendario.sort((a,b)=>a.fecha.localeCompare(b.fecha)).map((ev,i)=>(
                  <div key={i} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:10,padding:16,display:'flex',gap:16,alignItems:'flex-start'}}>
                    <div style={{minWidth:120,textAlign:'center' as const,padding:'8px',background:'rgba(201,168,76,0.1)',borderRadius:8}}>
                      <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>FECHA</p>
                      <p style={{fontSize:'.8rem',color:G,margin:0}}>{new Date(ev.fecha).toLocaleDateString('es-PE')}</p>
                      <p style={{fontSize:'.75rem',color:G,margin:0}}>{new Date(ev.fecha).toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'})}</p>
                    </div>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'.8rem',margin:'0 0 6px',lineHeight:1.5}}>{ev.texto.substring(0,120)}...</p>
                      <div style={{display:'flex',gap:6}}>
                        {ev.redes.map(r=>(
                          <span key={r} style={{fontSize:'.65rem',padding:'2px 8px',background:'rgba(201,168,76,0.1)',borderRadius:10,color:G}}>
                            {REDES.find(x=>x.id===r)?.icon} {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button onClick={()=>setCalendario(prev=>prev.filter((_,j)=>j!==i))}
                      style={{background:'transparent',border:'none',color:'rgba(201,168,76,0.4)',cursor:'pointer',fontSize:'1rem'}}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORIAL */}
        {tab==='historial'&&(
          <div>
            <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:20}}>Posts publicados en esta sesión</p>
            {historial.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.85rem'}}>No hay posts publicados aún</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:12}}>
                {historial.map(p=>(
                  <div key={p.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:10,padding:16}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <div style={{display:'flex',gap:6}}>
                        {p.redes.map(r=>(
                          <span key={r} style={{fontSize:'.65rem',padding:'2px 8px',background:'rgba(201,168,76,0.1)',borderRadius:10}}>
                            {REDES.find(x=>x.id===r)?.icon} {r}
                          </span>
                        ))}
                      </div>
                      <span style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>
                        {new Date(p.fecha).toLocaleString('es-PE')}
                      </span>
                    </div>
                    <p style={{fontSize:'.8rem',margin:0,lineHeight:1.5,color:'rgba(201,168,76,0.8)'}}>{p.texto}</p>
                    <button onClick={()=>{setTexto(p.texto);setEspecie(p.especie);setTab('generador')}}
                      style={{marginTop:10,padding:'4px 12px',background:'transparent',border:`1px solid ${BD}`,
                        color:G,borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.72rem'}}>
                      Reutilizar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
