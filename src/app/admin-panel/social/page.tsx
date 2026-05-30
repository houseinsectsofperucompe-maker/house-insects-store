'use client'
import {useState} from 'react'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'

const RUBROS=[
  {id:1,nm:'Especímenes Biológicos Secos',desc:'Mariposas diurnas · Calidad A1 · CITES'},
  {id:2,nm:'Cuadros Mariposas Diurnas',desc:'Especies diurnas · Raras · Amazónicas'},
  {id:3,nm:'Joyería Natural',desc:'Oro · Plata · Alas naturales · Artesanal'},
  {id:4,nm:'Rarezas & Gynandromorphs',desc:'Piezas únicas · Aberraciones · Élite'},
  {id:5,nm:'Artesanías & Cúpulas',desc:'Cuadros · Cúpulas · Resinas · Arte amazónico'},
  {id:6,nm:'Herramientas Biológicas',desc:'Sets disección · Lupas · Kits montaje'},
  {id:7,nm:'Cuadros Mariposas Nocturnas',desc:'Arctiidae · Saturnidae · Sphingidae'},
  {id:8,nm:'Cuadros Coleópteros & Artrópodos',desc:'Escarabajos · Arañas · Mantis · A1'},
  {id:9,nm:'Minerales & Piedras Preciosas',desc:'Minerales peruanos · Colección'},
  {id:10,nm:'Semillas & Plantas Medicinales',desc:'Flora amazónica · SENASA'},
  {id:11,nm:'Frutas Exóticas & Deshidratadas',desc:'Frutas amazónicas · Wild · SENASA'},
  {id:12,nm:'Hongos & Productos Naturales',desc:'Hongos amazónicos · Medicinales'},
  {id:13,nm:'Textilería & Alpaca',desc:'Alpaca · Textilería amazónica'},
  {id:14,nm:'Alimentos Deshidratados',desc:'Condimentos amazónicos · Naturales'},
  {id:15,nm:'Pinturas & Arte Rupestre',desc:'Arte amazónico · Pinturas naturales'},
  {id:16,nm:'Maderas Finas & Esculturas',desc:'Maderas amazónicas · SERFOR'},
  {id:17,nm:'Esencias & Aceites Naturales',desc:'Aceites esenciales · Amazónicos'},
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

const REDES=[
  {id:'facebook',nm:'Facebook',icon:'📘',color:'#1877f2'},
  {id:'instagram',nm:'Instagram',icon:'📸',color:'#e1306c'},
  {id:'tiktok',nm:'TikTok',icon:'🎵',color:'#010101'},
]

const PLANTILLAS=[
  {id:'nueva',nm:'🦋 Nueva Llegada',txt:'¡Nueva llegada! {rubro} de Perú — Calidad premium, certificación legal SERFOR/CITES. Disponible en houseinsectsofperu.com 🌿 #HouseInsectsofPeru #Peru #NaturalHistory'},
  {id:'oferta',nm:'🏷️ Oferta',txt:'¡Oferta especial en {rubro}! Envíos a todo el mundo con certificación legal. 📦 houseinsectsofperu.com #Coleccionismo #Peru'},
  {id:'educativo',nm:'📚 Educativo',txt:'¿Conoces nuestros {rubro}? Especímenes A1 del Perú amazónico con certificación CITES/SERFOR. Arte natural único. 🦋 #Entomologia #BiodiversidadPeru'},
  {id:'exportacion',nm:'✈️ Exportación',txt:'Exportamos {rubro} a todo el mundo 🌍 Permisos legales: SERFOR, CITES, Aduana. Calidad garantizada. houseinsectsofperu.com #ExportacionPeru'},
  {id:'premium',nm:'🏆 Premium',txt:'Colección premium de {rubro} peruanos. Calidad A1, montaje profesional, certificación internacional. El arte de la naturaleza. #LuxuryNature #Peru'},
]

type Post={id:string,rubro:string,idioma:string,texto:string,fecha:string,redes:string[]}
type CalEvent={fecha:string,rubro:string,idioma:string,texto:string,redes:string[]}

export default function SocialPanel(){
  const [tab,setTab]=useState<'generador'|'plantillas'|'calendario'|'historial'>('generador')
  const [rubroSel,setRubroSel]=useState(RUBROS[0])
  const [idiomasSel,setIdiomasSel]=useState<string[]>(['es'])
  const [redesSel,setRedesSel]=useState<string[]>(['facebook'])
  const [especie,setEspecie]=useState('')
  const [textos,setTextos]=useState<Record<string,string>>({})
  const [generando,setGenerando]=useState(false)
  const [historial,setHistorial]=useState<Post[]>([])
  const [calendario,setCalendario]=useState<CalEvent[]>([])
  const [fechaProg,setFechaProg]=useState('')
  const [idiomaVista,setIdiomaVista]=useState('es')
  const [dropIdioma,setDropIdioma]=useState(false)

  const toggleIdioma=(code:string)=>{
    setIdiomasSel(prev=>prev.includes(code)?prev.filter(i=>i!==code):[...prev,code])
  }
  const toggleRed=(id:string)=>{
    setRedesSel(prev=>prev.includes(id)?prev.filter(r=>r!==id):[...prev,id])
  }

  const generarConIA=async()=>{
    setGenerando(true)
    const baseEs=`🌿 ${rubroSel.nm} de Perú — ${rubroSel.desc}${especie?' · '+especie:''}. Calidad A1, certificación SERFOR/CITES. Disponible en houseinsectsofperu.com 🦋\n\n#HouseInsectsofPeru #Peru #NaturalHistory #${rubroSel.nm.replace(/[^a-zA-Z]/g,'')}`
    const nuevos:Record<string,string>={es:baseEs}

    await Promise.all(idiomasSel.filter(l=>l!=='es').map(async lang=>{
      try{
        const res=await fetch('/api/traducir-batch',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({textos:[baseEs],idioma:lang})
        })
        const d=await res.json()
        nuevos[lang]=d.traducciones?.[0]||baseEs
      }catch{nuevos[lang]=baseEs}
    }))
    setTextos(nuevos)
    setIdiomaVista(idiomasSel[0])
    setGenerando(false)
  }

  const publicar=(lang:string)=>{
    const txt=textos[lang]||''
    if(!txt)return
    const post:Post={id:Date.now().toString(),rubro:rubroSel.nm,idioma:lang,texto:txt,fecha:new Date().toISOString(),redes:redesSel}
    setHistorial(prev=>[post,...prev])
    navigator.clipboard?.writeText(txt)
    redesSel.forEach(red=>{
      if(red==='facebook') window.open('https://www.facebook.com/profile.php?id=61590682700134','_blank')
      if(red==='instagram') window.open('https://www.instagram.com/','_blank')
      if(red==='tiktok') window.open('https://www.tiktok.com/','_blank')
    })
    alert(`✅ Texto en ${IDIOMAS.find(i=>i.code===lang)?.nm} copiado. Pégalo en la red social.`)
  }

  const programar=()=>{
    if(!fechaProg||Object.keys(textos).length===0)return
    const lang=idiomaVista
    setCalendario(prev=>[...prev,{fecha:fechaProg,rubro:rubroSel.nm,idioma:lang,texto:textos[lang]||'',redes:redesSel}])
    alert(`✅ Post programado para ${fechaProg}`)
    setFechaProg('')
  }

  const usarPlantilla=(p:typeof PLANTILLAS[0])=>{
    const txt=p.txt.replace('{rubro}',rubroSel.nm).replace('{especie}',especie||rubroSel.nm)
    setTextos({es:txt})
    setIdiomaVista('es')
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
        <h1 style={{fontSize:'1rem',letterSpacing:'0.1em',margin:0}}>📢 Panel Avisos — Redes Sociales</h1>
        <div style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)'}}>17 Rubros · 50 Idiomas</div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,padding:'12px 24px',borderBottom:`1px solid ${BD}`}}>
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

      <div style={{maxWidth:1000,margin:'0 auto',padding:'24px'}}>

        {/* GENERADOR */}
        {tab==='generador'&&(
          <div>
            {/* Fila 1: Rubro */}
            <div style={{marginBottom:20}}>
              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>1. SELECCIONA EL RUBRO</label>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:6}}>
                {RUBROS.map(r=>(
                  <button key={r.id} onClick={()=>setRubroSel(r)}
                    style={{padding:'8px 12px',background:rubroSel.id===r.id?'rgba(201,168,76,0.2)':'rgba(201,168,76,0.04)',
                      border:`1px solid ${rubroSel.id===r.id?G:BD}`,color:G,borderRadius:8,cursor:'pointer',
                      fontFamily:'Georgia,serif',fontSize:'.72rem',textAlign:'left' as const}}>
                    <span style={{display:'block',fontWeight:rubroSel.id===r.id?'bold':'normal'}}>{r.nm}</span>
                    <span style={{display:'block',fontSize:'.6rem',color:'rgba(201,168,76,0.45)',marginTop:2}}>{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fila 2: Especie + Redes */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:20}}>
              <div>
                <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>2. ESPECIE O PRODUCTO (opcional)</label>
                <input value={especie} onChange={e=>setEspecie(e.target.value)}
                  placeholder={`ej: ${rubroSel.id<=8?'Morpho didius':'Aceite de copaiba'}`}
                  style={{width:'100%',padding:'10px 14px',background:'rgba(201,168,76,0.06)',
                    border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
              </div>
              <div>
                <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>3. REDES SOCIALES</label>
                <div style={{display:'flex',gap:8}}>
                  {REDES.map(r=>(
                    <button key={r.id} onClick={()=>toggleRed(r.id)}
                      style={{padding:'8px 14px',background:redesSel.includes(r.id)?r.color:'transparent',
                        border:`1px solid ${redesSel.includes(r.id)?r.color:BD}`,color:redesSel.includes(r.id)?'#fff':G,
                        borderRadius:8,cursor:'pointer',fontSize:'.8rem'}}>
                      {r.icon} {r.nm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Fila 3: Idiomas */}
            <div style={{marginBottom:20}}>
              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:8}}>4. MERCADOS / IDIOMAS ({idiomasSel.length} seleccionados)</label>
              <div style={{position:'relative' as const,marginBottom:8}}>
                <button onClick={()=>setDropIdioma(!dropIdioma)}
                  style={{padding:'8px 16px',background:'rgba(201,168,76,0.08)',border:`1px solid ${G}`,
                    color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
                  {dropIdioma?'▲':'▼'} Seleccionar idiomas
                </button>
                {dropIdioma&&(
                  <div style={{position:'absolute' as const,top:'100%',left:0,zIndex:50,
                    background:'#0a0a0a',border:`1px solid ${G}`,borderRadius:8,marginTop:4,
                    maxHeight:280,overflowY:'auto' as const,boxShadow:'0 8px 32px rgba(0,0,0,0.8)',
                    display:'grid',gridTemplateColumns:'repeat(3,1fr)',minWidth:600,padding:8,gap:4}}>
                    {IDIOMAS.map(i=>(
                      <button key={i.code} onClick={()=>toggleIdioma(i.code)}
                        style={{padding:'6px 10px',background:idiomasSel.includes(i.code)?'rgba(201,168,76,0.2)':'transparent',
                          border:`1px solid ${idiomasSel.includes(i.code)?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                          fontFamily:'Georgia,serif',fontSize:'.72rem',textAlign:'left' as const}}>
                        {i.nm}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div style={{display:'flex',flexWrap:'wrap' as const,gap:6}}>
                {idiomasSel.map(code=>(
                  <span key={code} style={{padding:'3px 10px',background:'rgba(201,168,76,0.15)',border:`1px solid ${G}`,
                    borderRadius:16,fontSize:'.7rem',color:G,display:'flex',alignItems:'center',gap:6}}>
                    {IDIOMAS.find(i=>i.code===code)?.nm}
                    <button onClick={()=>toggleIdioma(code)} style={{background:'none',border:'none',color:G,cursor:'pointer',fontSize:'.8rem',padding:0}}>×</button>
                  </span>
                ))}
              </div>
            </div>

            {/* Generar */}
            <button onClick={generarConIA} disabled={generando}
              style={{padding:'12px 32px',background:generando?'rgba(201,168,76,0.1)':G,color:generando?G:'#0a0a0a',
                border:`1px solid ${G}`,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',
                fontSize:'.9rem',fontWeight:'bold',marginBottom:24,width:'100%'}}>
              {generando?`⏳ Generando en ${idiomasSel.length} idiomas...`:`🤖 Generar avisos en ${idiomasSel.length} idioma${idiomasSel.length>1?'s':''}`}
            </button>

            {/* Resultados por idioma */}
            {Object.keys(textos).length>0&&(
              <div>
                <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap' as const}}>
                  {Object.keys(textos).map(code=>(
                    <button key={code} onClick={()=>setIdiomaVista(code)}
                      style={{padding:'6px 14px',background:idiomaVista===code?'rgba(201,168,76,0.2)':'transparent',
                        border:`1px solid ${idiomaVista===code?G:BD}`,color:G,borderRadius:20,cursor:'pointer',
                        fontFamily:'Georgia,serif',fontSize:'.72rem'}}>
                      {IDIOMAS.find(i=>i.code===code)?.nm}
                    </button>
                  ))}
                </div>

                {textos[idiomaVista]&&(
                  <div>
                    <textarea value={textos[idiomaVista]} onChange={e=>setTextos(prev=>({...prev,[idiomaVista]:e.target.value}))}
                      rows={6}
                      style={{width:'100%',padding:'12px 14px',background:'rgba(201,168,76,0.06)',
                        border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',
                        fontSize:'.85rem',resize:'vertical' as const,lineHeight:1.6,marginBottom:12}}/>
                    <div style={{display:'flex',gap:10,alignItems:'center',marginBottom:12}}>
                      <input type="datetime-local" value={fechaProg} onChange={e=>setFechaProg(e.target.value)}
                        style={{padding:'8px 12px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                          color:G,borderRadius:6,fontFamily:'Georgia,serif',fontSize:'.8rem'}}/>
                      <button onClick={programar}
                        style={{padding:'8px 16px',background:'transparent',border:`1px solid ${BD}`,
                          color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
                        📅 Programar
                      </button>
                      <button onClick={()=>publicar(idiomaVista)}
                        style={{flex:1,padding:'10px',background:G,color:'#0a0a0a',
                          border:'none',borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',
                          fontSize:'.9rem',fontWeight:'bold'}}>
                        🚀 Publicar en {redesSel.map(r=>REDES.find(x=>x.id===r)?.icon).join('')} — {IDIOMAS.find(i=>i.code===idiomaVista)?.nm}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* PLANTILLAS */}
        {tab==='plantillas'&&(
          <div>
            <div style={{marginBottom:16}}>
              <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>RUBRO PARA PLANTILLA</label>
              <select value={rubroSel.id} onChange={e=>setRubroSel(RUBROS.find(r=>r.id===+e.target.value)||RUBROS[0])}
                style={{padding:'8px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                  color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem',width:'100%'}}>
                {RUBROS.map(r=><option key={r.id} value={r.id} style={{background:'#0a0a0a'}}>{r.nm}</option>)}
              </select>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              {PLANTILLAS.map(p=>(
                <div key={p.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:10,padding:16}}>
                  <p style={{fontSize:'.85rem',fontWeight:'bold',margin:'0 0 8px'}}>{p.nm}</p>
                  <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',margin:'0 0 12px',lineHeight:1.5}}>
                    {p.txt.replace('{rubro}',rubroSel.nm).substring(0,120)}...
                  </p>
                  <button onClick={()=>usarPlantilla(p)}
                    style={{padding:'6px 16px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                      color:G,borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>
                    Usar plantilla
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CALENDARIO */}
        {tab==='calendario'&&(
          <div>
            {calendario.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)'}}>No hay posts programados</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:12}}>
                {calendario.sort((a,b)=>a.fecha.localeCompare(b.fecha)).map((ev,i)=>(
                  <div key={i} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:10,padding:16,display:'flex',gap:16}}>
                    <div style={{minWidth:120,textAlign:'center' as const,padding:8,background:'rgba(201,168,76,0.1)',borderRadius:8}}>
                      <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>FECHA</p>
                      <p style={{fontSize:'.75rem',margin:0}}>{new Date(ev.fecha).toLocaleDateString('es-PE')}</p>
                      <p style={{fontSize:'.7rem',margin:0}}>{new Date(ev.fecha).toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'})}</p>
                    </div>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'.75rem',color:G,margin:'0 0 4px',fontWeight:'bold'}}>{ev.rubro} — {IDIOMAS.find(i=>i.code===ev.idioma)?.nm}</p>
                      <p style={{fontSize:'.75rem',margin:'0 0 8px',lineHeight:1.4,color:'rgba(201,168,76,0.7)'}}>{ev.texto.substring(0,100)}...</p>
                      <div style={{display:'flex',gap:6}}>
                        {ev.redes.map(r=><span key={r} style={{fontSize:'.65rem',padding:'2px 8px',background:'rgba(201,168,76,0.1)',borderRadius:10}}>{REDES.find(x=>x.id===r)?.icon} {r}</span>)}
                      </div>
                    </div>
                    <button onClick={()=>setCalendario(prev=>prev.filter((_,j)=>j!==i))}
                      style={{background:'transparent',border:'none',color:'rgba(201,168,76,0.4)',cursor:'pointer'}}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HISTORIAL */}
        {tab==='historial'&&(
          <div>
            {historial.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)'}}>No hay posts publicados aún</p>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:12}}>
                {historial.map(p=>(
                  <div key={p.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:10,padding:16}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8,flexWrap:'wrap' as const,gap:8}}>
                      <div style={{display:'flex',gap:6,alignItems:'center'}}>
                        <span style={{fontSize:'.75rem',fontWeight:'bold',color:G}}>{p.rubro}</span>
                        <span style={{fontSize:'.65rem',padding:'2px 8px',background:'rgba(201,168,76,0.1)',borderRadius:10}}>{IDIOMAS.find(i=>i.code===p.idioma)?.nm}</span>
                        {p.redes.map(r=><span key={r} style={{fontSize:'.65rem',padding:'2px 8px',background:'rgba(201,168,76,0.1)',borderRadius:10}}>{REDES.find(x=>x.id===r)?.icon}</span>)}
                      </div>
                      <span style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>{new Date(p.fecha).toLocaleString('es-PE')}</span>
                    </div>
                    <p style={{fontSize:'.8rem',margin:0,lineHeight:1.5,color:'rgba(201,168,76,0.8)'}}>{p.texto}</p>
                    <button onClick={()=>{setRubroSel(RUBROS.find(r=>r.nm===p.rubro)||RUBROS[0]);setTextos({[p.idioma]:p.texto});setIdiomaVista(p.idioma);setTab('generador')}}
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
