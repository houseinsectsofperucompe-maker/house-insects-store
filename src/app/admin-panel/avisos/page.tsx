'use client'
import {useState} from 'react'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'

const RUBROS=[
  {id:1,nm:'Especímenes Biológicos Secos',emoji:'🦋'},
  {id:2,nm:'Cuadros Mariposas Diurnas',emoji:'🖼️'},
  {id:3,nm:'Joyería Natural',emoji:'💍'},
  {id:4,nm:'Rarezas & Gynandromorphs',emoji:'⭐'},
  {id:5,nm:'Artesanías & Cúpulas',emoji:'🏺'},
  {id:6,nm:'Herramientas Biológicas',emoji:'🔬'},
  {id:7,nm:'Cuadros Mariposas Nocturnas',emoji:'🌙'},
  {id:8,nm:'Cuadros Coleópteros & Artrópodos',emoji:'🪲'},
  {id:9,nm:'Minerales & Piedras Preciosas',emoji:'💎'},
  {id:10,nm:'Semillas & Plantas Medicinales',emoji:'🌿'},
  {id:11,nm:'Frutas Exóticas & Deshidratadas',emoji:'🍍'},
  {id:12,nm:'Hongos & Productos Naturales',emoji:'🍄'},
  {id:13,nm:'Textilería & Alpaca',emoji:'🧵'},
  {id:14,nm:'Alimentos Deshidratados',emoji:'🌶️'},
  {id:15,nm:'Pinturas & Arte Rupestre',emoji:'🎨'},
  {id:16,nm:'Maderas Finas & Esculturas',emoji:'🪵'},
  {id:17,nm:'Esencias & Aceites Naturales',emoji:'🫧'},
]

const IDIOMAS=[
  {code:'es',nm:'Español 🇵🇪'},{code:'en',nm:'English 🇺🇸'},{code:'zh',nm:'中文 🇨🇳'},
  {code:'ja',nm:'日本語 🇯🇵'},{code:'ko',nm:'한국어 🇰🇷'},{code:'ar',nm:'العربية 🇸🇦'},
  {code:'de',nm:'Deutsch 🇩🇪'},{code:'fr',nm:'Français 🇫🇷'},{code:'pt',nm:'Português 🇧🇷'},
  {code:'it',nm:'Italiano 🇮🇹'},{code:'ru',nm:'Русский 🇷🇺'},{code:'tr',nm:'Türkçe 🇹🇷'},
  {code:'th',nm:'ไทย 🇹🇭'},{code:'vi',nm:'Tiếng Việt 🇻🇳'},{code:'id',nm:'Bahasa 🇮🇩'},
  {code:'nl',nm:'Nederlands 🇳🇱'},{code:'pl',nm:'Polski 🇵🇱'},{code:'sv',nm:'Svenska 🇸🇪'},
  {code:'da',nm:'Dansk 🇩🇰'},{code:'fi',nm:'Suomi 🇫🇮'},{code:'no',nm:'Norsk 🇳🇴'},
  {code:'he',nm:'עברית 🇮🇱'},{code:'hi',nm:'हिन्दी 🇮🇳'},{code:'fa',nm:'فارسی 🇮🇷'},
  {code:'ms',nm:'Melayu 🇲🇾'},{code:'uk',nm:'Українська 🇺🇦'},{code:'cs',nm:'Čeština 🇨🇿'},
  {code:'ro',nm:'Română 🇷🇴'},{code:'hu',nm:'Magyar 🇭🇺'},{code:'el',nm:'Ελληνικά 🇬🇷'},
  {code:'bg',nm:'Български 🇧🇬'},{code:'hr',nm:'Hrvatski 🇭🇷'},{code:'sk',nm:'Slovenčina 🇸🇰'},
  {code:'lt',nm:'Lietuvių 🇱🇹'},{code:'lv',nm:'Latviešu 🇱🇻'},{code:'et',nm:'Eesti 🇪🇪'},
  {code:'sr',nm:'Српски 🇷🇸'},{code:'af',nm:'Afrikaans 🇿🇦'},{code:'sw',nm:'Kiswahili 🇰🇪'},
  {code:'tl',nm:'Filipino 🇵🇭'},{code:'bn',nm:'বাংলা 🇧🇩'},{code:'ur',nm:'اردو 🇵🇰'},
  {code:'ta',nm:'தமிழ் 🇱🇰'},{code:'ca',nm:'Català 🇪🇸'},{code:'is',nm:'Íslenska 🇮🇸'},
  {code:'mt',nm:'Malti 🇲🇹'},{code:'sl',nm:'Slovenščina 🇸🇮'},{code:'mk',nm:'Македонски 🇲🇰'},
  {code:'sq',nm:'Shqip 🇦🇱'},{code:'az',nm:'Azərbaycan 🇦🇿'},
]

const ESPACIOS=[
  {id:'hero',nm:'Banner Hero — Página principal'},
  {id:'header',nm:'Banner Header — Todas las páginas'},
  {id:'footer',nm:'Banner Footer — Pie de página'},
  {id:'sidebar',nm:'Banner Sidebar — Catálogo'},
  {id:'entre-productos',nm:'Banner Entre Productos'},
  {id:'carrito',nm:'Banner Carrito'},
  {id:'especimen',nm:'Banner Espécimen'},
]

const TIPOS=[
  {id:'oferta',nm:'🏷️ Oferta Especial'},
  {id:'nuevo',nm:'🆕 Nuevo Producto'},
  {id:'exportacion',nm:'✈️ Exportación Mundial'},
  {id:'certificacion',nm:'📜 Certificación Legal'},
  {id:'coleccion',nm:'🏆 Colección Premium'},
  {id:'web',nm:'🌐 Promoción Web'},
  {id:'temporada',nm:'📅 Temporada'},
]

type Aviso={id:string,rubro:string,tipo:string,titulo:string,subtitulo:string,cta:string,colorFondo:string,colorTexto:string,espacios:string[],idiomas:string[],textos:Record<string,string[]>,fecha:string}

export default function AvisosPanel(){
  const [tab,setTab]=useState<'crear'|'historial'>('crear')
  const [rubroSel,setRubroSel]=useState(RUBROS[0])
  const [tipoSel,setTipoSel]=useState(TIPOS[0])
  const [titulo,setTitulo]=useState('')
  const [subtitulo,setSubtitulo]=useState('')
  const [cta,setCta]=useState('Ver más →')
  const [colorFondo,setColorFondo]=useState('#1a1209')
  const [colorTexto,setColorTexto]=useState('#C9A84C')
  const [espaciosSel,setEspaciosSel]=useState<string[]>(['hero'])
  const [idiomasSel,setIdiomasSel]=useState<string[]>(['es','en','zh'])
  const [idiomaVista,setIdiomaVista]=useState('es')
  const [textos,setTextos]=useState<Record<string,string[]>>({})
  const [generando,setGenerando]=useState(false)
  const [avisos,setAvisos]=useState<Aviso[]>([])
  const [dropIdioma,setDropIdioma]=useState(false)

  const toggleEspacio=(id:string)=>setEspaciosSel(p=>p.includes(id)?p.filter(e=>e!==id):[...p,id])
  const toggleIdioma=(code:string)=>setIdiomasSel(p=>p.includes(code)?p.filter(i=>i!==code):[...p,code])

  const autoGenerar=()=>{
    const plantillas:Record<string,string[]>={
      oferta:[`🏷️ Oferta — ${rubroSel.emoji} ${rubroSel.nm}`,'Descuento especial · houseinsectsofperu.com','Ver oferta →'],
      nuevo:[`${rubroSel.emoji} Nueva llegada — ${rubroSel.nm}`,'Especímenes A1 · CITES/SERFOR · Perú','Ver ahora →'],
      exportacion:[`✈️ Exportamos ${rubroSel.nm} al mundo`,'SERFOR · CITES · Aduana · Legal garantizado','Consultar →'],
      certificacion:[`📜 ${rubroSel.nm} certificados`,'SERFOR · CITES · SENASA · Exportación legal','Ver certificaciones →'],
      coleccion:[`🏆 Colección premium — ${rubroSel.nm}`,'Calidad A1 · Montaje profesional · Certificación','Ver colección →'],
      web:['🌐 houseinsectsofperu.com',`${rubroSel.emoji} ${rubroSel.nm} · Tingo María, Perú`,'Visitar web →'],
      temporada:[`⏰ Oferta temporada — ${rubroSel.nm}`,'Por tiempo limitado · Envíos mundiales','Aprovechar →'],
    }
    const p=plantillas[tipoSel.id]||plantillas.nuevo
    setTitulo(p[0]);setSubtitulo(p[1]);setCta(p[2])
  }

  const generarTraduciones=async()=>{
    if(!titulo)return
    setGenerando(true)
    const nuevos:Record<string,string[]>={es:[titulo,subtitulo,cta]}
    await Promise.all(idiomasSel.filter(l=>l!=='es').map(async lang=>{
      try{
        const res=await fetch('/api/traducir-batch',{method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({textos:[titulo,subtitulo,cta],idioma:lang})})
        const d=await res.json()
        nuevos[lang]=d.traducciones||[titulo,subtitulo,cta]
      }catch{nuevos[lang]=[titulo,subtitulo,cta]}
    }))
    setTextos(nuevos)
    setIdiomaVista(idiomasSel[0])
    setGenerando(false)
  }

  const guardar=()=>{
    if(!titulo)return
    setAvisos(p=>[{
      id:'av_'+Date.now(),rubro:rubroSel.nm,tipo:tipoSel.nm,
      titulo,subtitulo,cta,colorFondo,colorTexto,
      espacios:espaciosSel,idiomas:idiomasSel,textos,
      fecha:new Date().toISOString()
    },...p])
    alert('✅ Aviso guardado')
    setTab('historial')
  }

  const t=textos[idiomaVista]||[titulo,subtitulo,cta]

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:`1px solid ${BD}`,background:'rgba(10,10,10,0.97)'}}>
        <div style={{display:'flex',gap:8}}>
          <a href='/' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>🏠 Inicio</a>
          <a href='/admin-panel' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>← Admin</a>
        </div>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:'1rem',margin:0}}>📣 Creador de Avisos Publicitarios</h1>
          <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>17 rubros · 50 idiomas · 7 espacios</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <a href='/admin-panel/banners' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>📢 Banners</a>
          <a href='/admin-panel/social' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>📱 Social</a>
        </div>
      </div>

      <div style={{display:'flex',gap:4,padding:'12px 24px',borderBottom:`1px solid ${BD}`}}>
        {([{id:'crear',nm:'✍️ Crear Aviso'},{id:'historial',nm:`📜 Historial (${avisos.length})`}] as const).map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{padding:'8px 18px',background:tab===t.id?'rgba(201,168,76,0.2)':'transparent',
              border:`1px solid ${tab===t.id?G:BD}`,color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
            {t.nm}
          </button>
        ))}
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'24px'}}>
        {tab==='crear'&&(
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
            <div>
              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>1. RUBRO</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,maxHeight:200,overflowY:'auto' as const,marginBottom:16}}>
                {RUBROS.map(r=>(
                  <button key={r.id} onClick={()=>setRubroSel(r)}
                    style={{padding:'6px 8px',background:rubroSel.id===r.id?'rgba(201,168,76,0.2)':'rgba(201,168,76,0.04)',
                      border:`1px solid ${rubroSel.id===r.id?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                      fontFamily:'Georgia,serif',fontSize:'.68rem',textAlign:'left' as const}}>
                    {r.emoji} {r.nm}
                  </button>
                ))}
              </div>

              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>2. TIPO DE AVISO</label>
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:6,marginBottom:16}}>
                {TIPOS.map(t=>(
                  <button key={t.id} onClick={()=>setTipoSel(t)}
                    style={{padding:'5px 10px',background:tipoSel.id===t.id?'rgba(201,168,76,0.2)':'transparent',
                      border:`1px solid ${tipoSel.id===t.id?G:BD}`,color:G,borderRadius:20,cursor:'pointer',fontSize:'.7rem'}}>
                    {t.nm}
                  </button>
                ))}
              </div>

              <button onClick={autoGenerar}
                style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.1)',border:`1px solid ${G}`,
                  color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem',marginBottom:16}}>
                ⚡ Auto-generar texto
              </button>

              {[{l:'TÍTULO',v:titulo,s:setTitulo,p:'Título del aviso'},
                {l:'SUBTÍTULO',v:subtitulo,s:setSubtitulo,p:'Descripción'},
                {l:'BOTÓN CTA',v:cta,s:setCta,p:'Ver más →'}].map(f=>(
                <div key={f.l} style={{marginBottom:10}}>
                  <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{f.l}</label>
                  <input value={f.v} onChange={e=>f.s(e.target.value)} placeholder={f.p}
                    style={{width:'100%',padding:'9px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,
                      color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
                </div>
              ))}

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
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

              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>3. ESPACIOS BANNER</label>
              <div style={{display:'flex',flexDirection:'column' as const,gap:4,marginBottom:16}}>
                {ESPACIOS.map(e=>(
                  <button key={e.id} onClick={()=>toggleEspacio(e.id)}
                    style={{padding:'6px 10px',background:espaciosSel.includes(e.id)?'rgba(201,168,76,0.15)':'transparent',
                      border:`1px solid ${espaciosSel.includes(e.id)?G:BD}`,color:G,borderRadius:6,cursor:'pointer',fontSize:'.7rem',textAlign:'left' as const}}>
                    {espaciosSel.includes(e.id)?'✅':'⬜'} {e.nm}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>4. IDIOMAS ({idiomasSel.length})</label>
              <button onClick={()=>setDropIdioma(!dropIdioma)}
                style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${G}`,
                  color:G,borderRadius:8,cursor:'pointer',fontSize:'.75rem',marginBottom:8}}>
                {dropIdioma?'▲':'▼'} Seleccionar idiomas
              </button>
              {dropIdioma&&(
                <div style={{background:'#0a0a0a',border:`1px solid ${G}`,borderRadius:8,padding:8,
                  maxHeight:200,overflowY:'auto' as const,display:'grid',gridTemplateColumns:'1fr 1fr',gap:4,marginBottom:8}}>
                  {IDIOMAS.map(i=>(
                    <button key={i.code} onClick={()=>toggleIdioma(i.code)}
                      style={{padding:'4px 8px',background:idiomasSel.includes(i.code)?'rgba(201,168,76,0.2)':'transparent',
                        border:`1px solid ${idiomasSel.includes(i.code)?G:BD}`,color:G,borderRadius:6,cursor:'pointer',fontSize:'.65rem',textAlign:'left' as const}}>
                      {i.nm}
                    </button>
                  ))}
                </div>
              )}
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:4,marginBottom:16}}>
                {idiomasSel.map(code=>(
                  <span key={code} style={{padding:'2px 8px',background:'rgba(201,168,76,0.15)',border:`1px solid ${G}`,borderRadius:16,fontSize:'.63rem',display:'flex',alignItems:'center',gap:4}}>
                    {IDIOMAS.find(i=>i.code===code)?.nm}
                    <button onClick={()=>toggleIdioma(code)} style={{background:'none',border:'none',color:G,cursor:'pointer',padding:0}}>×</button>
                  </span>
                ))}
              </div>

              <button onClick={generarTraduciones} disabled={generando||!titulo}
                style={{width:'100%',padding:'12px',background:generando?'rgba(201,168,76,0.1)':G,
                  color:generando?G:'#0a0a0a',border:`1px solid ${G}`,borderRadius:8,cursor:'pointer',
                  fontFamily:'Georgia,serif',fontSize:'.9rem',fontWeight:'bold',marginBottom:20}}>
                {generando?`⏳ Traduciendo...`:`🌐 Traducir a ${idiomasSel.length} idiomas`}
              </button>

              {titulo&&(
                <div>
                  <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>PREVIEW</label>
                  {Object.keys(textos).length>0&&(
                    <div style={{display:'flex',gap:4,flexWrap:'wrap' as const,marginBottom:10}}>
                      {Object.keys(textos).map(code=>(
                        <button key={code} onClick={()=>setIdiomaVista(code)}
                          style={{padding:'3px 9px',background:idiomaVista===code?'rgba(201,168,76,0.2)':'transparent',
                            border:`1px solid ${idiomaVista===code?G:BD}`,color:G,borderRadius:16,cursor:'pointer',fontSize:'.65rem'}}>
                          {IDIOMAS.find(i=>i.code===code)?.nm}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Hero preview */}
                  <p style={{fontSize:'.63rem',color:'rgba(201,168,76,0.4)',marginBottom:4}}>HERO (1200x400)</p>
                  <div style={{background:colorFondo,borderRadius:8,padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                    <div>
                      <p style={{color:colorTexto,fontSize:'1rem',fontWeight:'bold',margin:'0 0 4px'}}>{t[0]||titulo}</p>
                      <p style={{color:colorTexto,fontSize:'.75rem',margin:0,opacity:.8}}>{t[1]||subtitulo}</p>
                    </div>
                    <button style={{padding:'8px 16px',background:colorTexto,color:colorFondo,border:'none',borderRadius:6,fontWeight:'bold',fontSize:'.75rem',cursor:'pointer',whiteSpace:'nowrap' as const}}>
                      {t[2]||cta}
                    </button>
                  </div>

                  {/* Header preview */}
                  <p style={{fontSize:'.63rem',color:'rgba(201,168,76,0.4)',marginBottom:4}}>HEADER (1200x90)</p>
                  <div style={{background:colorFondo,borderRadius:6,padding:'8px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
                    <p style={{color:colorTexto,fontSize:'.78rem',fontWeight:'bold',margin:0}}>{t[0]||titulo}</p>
                    <button style={{padding:'4px 12px',background:colorTexto,color:colorFondo,border:'none',borderRadius:4,fontWeight:'bold',fontSize:'.68rem',cursor:'pointer'}}>
                      {t[2]||cta}
                    </button>
                  </div>

                  {/* Sidebar preview */}
                  <p style={{fontSize:'.63rem',color:'rgba(201,168,76,0.4)',marginBottom:4}}>SIDEBAR (300x250)</p>
                  <div style={{background:colorFondo,borderRadius:8,padding:'16px',textAlign:'center' as const,maxWidth:180,marginBottom:16}}>
                    <p style={{color:colorTexto,fontSize:'.8rem',fontWeight:'bold',margin:'0 0 6px'}}>{t[0]||titulo}</p>
                    <p style={{color:colorTexto,fontSize:'.68rem',margin:'0 0 12px',opacity:.8}}>{t[1]||subtitulo}</p>
                    <button style={{width:'100%',padding:'6px',background:colorTexto,color:colorFondo,border:'none',borderRadius:4,fontWeight:'bold',fontSize:'.68rem',cursor:'pointer'}}>
                      {t[2]||cta}
                    </button>
                  </div>

                  <button onClick={guardar}
                    style={{width:'100%',padding:'12px',background:G,color:'#0a0a0a',border:'none',
                      borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.9rem',fontWeight:'bold'}}>
                    💾 Guardar Aviso
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {tab==='historial'&&(
          <div>
            {avisos.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)'}}>No hay avisos creados aún</p>
                <button onClick={()=>setTab('crear')}
                  style={{marginTop:12,padding:'8px 20px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                    color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
                  + Crear primer aviso
                </button>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:16}}>
                {avisos.map(a=>(
                  <div key={a.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:12,padding:20}}>
                    <div style={{background:a.colorFondo,borderRadius:8,padding:'14px 20px',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div>
                        <p style={{color:a.colorTexto,fontSize:'.9rem',fontWeight:'bold',margin:0}}>{a.titulo}</p>
                        <p style={{color:a.colorTexto,fontSize:'.72rem',margin:0,opacity:.8}}>{a.subtitulo}</p>
                      </div>
                      <button style={{padding:'5px 12px',background:a.colorTexto,color:a.colorFondo,border:'none',borderRadius:4,fontWeight:'bold',fontSize:'.72rem'}}>{a.cta}</button>
                    </div>
                    <div style={{display:'flex',gap:8,flexWrap:'wrap' as const,fontSize:'.7rem',color:'rgba(201,168,76,0.6)'}}>
                      <span>{a.rubro}</span>
                      <span>·</span><span>{a.tipo}</span>
                      <span>·</span><span>{a.idiomas.length} idiomas</span>
                      <span>·</span><span>{a.espacios.length} espacios</span>
                      <span style={{marginLeft:'auto'}}>{new Date(a.fecha).toLocaleDateString('es-PE')}</span>
                    </div>
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
