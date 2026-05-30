'use client'
import {useState,useEffect} from 'react'
import {Redis} from '@upstash/redis'

const G='#C9A84C',BD='rgba(201,168,76,0.35)',BG='#0a0a0a'
const r=new Redis({url:'https://topical-weasel-107403.upstash.io',token:'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA'})

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

type Espacio={id:string,nm:string,desc:string,precio:number,dim:string,paginas:string}
type Cliente={id:string,empresa:string,contacto:string,email:string,whatsapp:string,pais:string,idioma:string}
type BannerActivo={id:string,espacioId:string,clienteId:string,empresa:string,titulo:string,subtitulo:string,url:string,imagen:string,color:string,colorTexto:string,fechaInicio:string,fechaFin:string,activo:boolean,idiomas:string[]}

export default function BannersPanel(){
  const [tab,setTab]=useState<'espacios'|'clientes'|'activos'|'nuevo'>('espacios')
  const [espacios,setEspacios]=useState<Espacio[]>([])
  const [clientes,setClientes]=useState<Cliente[]>([])
  const [activos,setActivos]=useState<BannerActivo[]>([])
  const [loading,setLoading]=useState(true)

  // Form nuevo banner
  const [espacioSel,setEspacioSel]=useState('')
  const [empresa,setEmpresa]=useState('')
  const [contacto,setContacto]=useState('')
  const [email,setEmail]=useState('')
  const [whatsapp,setWhatsapp]=useState('')
  const [pais,setPais]=useState('')
  const [idiomaCliente,setIdiomaCliente]=useState('es')
  const [titulo,setTitulo]=useState('')
  const [subtitulo,setSubtitulo]=useState('')
  const [urlBanner,setUrlBanner]=useState('')
  const [imagenUrl,setImagenUrl]=useState('')
  const [colorFondo,setColorFondo]=useState('#1a1209')
  const [colorTexto,setColorTexto]=useState('#C9A84C')
  const [fechaInicio,setFechaInicio]=useState('')
  const [fechaFin,setFechaFin]=useState('')
  const [idiomasBanner,setIdiomasBanner]=useState<string[]>(['es','en'])
  const [guardando,setGuardando]=useState(false)
  const [dropIdioma,setDropIdioma]=useState(false)
  const [generando,setGenerando]=useState(false)
  const [textoGen,setTextoGen]=useState('')

  useEffect(()=>{
    Promise.all([
      r.get<Espacio[]>('banners:espacios'),
      r.get<Cliente[]>('banners:clientes'),
      r.get<BannerActivo[]>('banners:activos'),
    ]).then(([e,c,a])=>{
      setEspacios(e||[])
      setClientes(c||[])
      setActivos(a||[])
      setLoading(false)
    })
  },[])

  const toggleIdiomaBanner=(code:string)=>{
    setIdiomasBanner(prev=>prev.includes(code)?prev.filter(i=>i!==code):[...prev,code])
  }

  const generarTextoIA=async()=>{
    if(!empresa||!espacioSel)return
    setGenerando(true)
    const espacio=espacios.find(e=>e.id===espacioSel)
    const base=`${empresa} — Anúnciate en House Insects of Peru. ${espacio?.desc}. Contáctanos: houseinsectsofperu.com`
    setTitulo(empresa)
    setSubtitulo(base)
    setTextoGen(base)
    setGenerando(false)
  }

  const guardarBanner=async()=>{
    if(!espacioSel||!empresa||!titulo)return
    setGuardando(true)
    const clienteId='cli_'+Date.now()
    const bannerId='ban_'+Date.now()
    const nuevoCliente:Cliente={id:clienteId,empresa,contacto,email,whatsapp,pais,idioma:idiomaCliente}
    const nuevoBanner:BannerActivo={
      id:bannerId,espacioId:espacioSel,clienteId,empresa,
      titulo,subtitulo,url:urlBanner,imagen:imagenUrl,
      color:colorFondo,colorTexto,
      fechaInicio,fechaFin,activo:true,idiomas:idiomasBanner
    }
    const nuevosClientes=[...clientes,nuevoCliente]
    const nuevosActivos=[...activos,nuevoBanner]
    await r.set('banners:clientes',nuevosClientes)
    await r.set('banners:activos',nuevosActivos)
    setClientes(nuevosClientes)
    setActivos(nuevosActivos)
    // Reset
    setEmpresa('');setContacto('');setEmail('');setWhatsapp('');setPais('')
    setTitulo('');setSubtitulo('');setUrlBanner('');setImagenUrl('')
    setFechaInicio('');setFechaFin('')
    setGuardando(false)
    alert('✅ Banner guardado exitosamente')
    setTab('activos')
  }

  const toggleActivo=async(id:string)=>{
    const nuevos=activos.map(b=>b.id===id?{...b,activo:!b.activo}:b)
    await r.set('banners:activos',nuevos)
    setActivos(nuevos)
  }

  const eliminarBanner=async(id:string)=>{
    if(!confirm('¿Eliminar este banner?'))return
    const nuevos=activos.filter(b=>b.id!==id)
    await r.set('banners:activos',nuevos)
    setActivos(nuevos)
  }

  const contactarWhatsApp=(cliente:Cliente,banner:BannerActivo)=>{
    const espacio=espacios.find(e=>e.id===banner.espacioId)
    const msg=`Hola ${cliente.contacto}, confirmamos tu banner "${banner.titulo}" en el espacio ${espacio?.nm} ($${espacio?.precio}/mes) en houseinsectsofperu.com. Período: ${banner.fechaInicio} al ${banner.fechaFin}.`
    window.open(`https://wa.me/${cliente.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(msg)}`,'_blank')
  }

  if(loading) return(
    <div style={{minHeight:'100vh',background:BG,display:'flex',alignItems:'center',justifyContent:'center',color:G,fontFamily:'Georgia,serif'}}>
      Cargando sistema de banners...
    </div>
  )

  return(
    <div style={{minHeight:'100vh',background:BG,color:G,fontFamily:'Georgia,serif'}}>
      {/* Navbar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 24px',borderBottom:`1px solid ${BD}`,background:'rgba(10,10,10,0.97)'}}>
        <div style={{display:'flex',gap:8}}>
          <a href='/' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>🏠 Inicio</a>
          <a href='/admin-panel' style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:G,borderRadius:8,textDecoration:'none',fontSize:'.75rem'}}>← Admin Panel</a>
        </div>
        <div style={{textAlign:'center'}}>
          <h1 style={{fontSize:'1rem',letterSpacing:'0.1em',margin:0}}>📢 Sistema de Banners Publicitarios</h1>
          <p style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)',margin:0}}>7 espacios · 50 idiomas · Alquiler mensual</p>
        </div>
        <div style={{fontSize:'.8rem',color:G}}>
          {activos.filter(b=>b.activo).length} activos · {clientes.length} clientes
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:4,padding:'12px 24px',borderBottom:`1px solid ${BD}`}}>
        {([
          {id:'espacios',nm:'📐 Espacios'},
          {id:'activos',nm:'🟢 Banners Activos'},
          {id:'clientes',nm:'👥 Clientes'},
          {id:'nuevo',nm:'➕ Nuevo Banner'},
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

        {/* ESPACIOS */}
        {tab==='espacios'&&(
          <div>
            <p style={{fontSize:'.8rem',color:'rgba(201,168,76,0.6)',marginBottom:20}}>
              Espacios publicitarios disponibles en houseinsectsofperu.com
            </p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
              {espacios.map(e=>{
                const ocupado=activos.filter(b=>b.espacioId===e.id&&b.activo).length
                return(
                  <div key={e.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${ocupado>0?'#2ecc71':BD}`,borderRadius:12,padding:20}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                      <p style={{fontSize:'.9rem',fontWeight:'bold',margin:0}}>{e.nm}</p>
                      <span style={{fontSize:'.7rem',padding:'3px 10px',background:ocupado>0?'rgba(46,204,113,0.2)':'rgba(201,168,76,0.1)',
                        border:`1px solid ${ocupado>0?'#2ecc71':BD}`,borderRadius:20,color:ocupado>0?'#2ecc71':G}}>
                        {ocupado>0?`${ocupado} activo`:'Disponible'}
                      </span>
                    </div>
                    <p style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',margin:'0 0 8px'}}>{e.desc}</p>
                    <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',margin:'0 0 12px'}}>📐 {e.dim} · 📄 {e.paginas}</p>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <p style={{fontSize:'1.4rem',fontWeight:'bold',margin:0,color:G}}>${e.precio}<span style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)'}}>/mes</span></p>
                      <button onClick={()=>{setEspacioSel(e.id);setTab('nuevo')}}
                        style={{padding:'6px 14px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                          color:G,borderRadius:6,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem'}}>
                        Contratar
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{marginTop:24,padding:20,background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:12}}>
              <p style={{fontSize:'.85rem',fontWeight:'bold',margin:'0 0 8px'}}>💰 Ingresos potenciales mensuales</p>
              <p style={{fontSize:'1.4rem',color:G,margin:0,fontWeight:'bold'}}>
                ${espacios.reduce((sum,e)=>sum+e.precio,0)}/mes
                <span style={{fontSize:'.75rem',color:'rgba(201,168,76,0.5)',marginLeft:8}}>si todos están ocupados</span>
              </p>
            </div>
          </div>
        )}

        {/* BANNERS ACTIVOS */}
        {tab==='activos'&&(
          <div>
            {activos.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)'}}>No hay banners activos aún</p>
                <button onClick={()=>setTab('nuevo')}
                  style={{marginTop:12,padding:'8px 20px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                    color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem'}}>
                  + Agregar primer banner
                </button>
              </div>
            ):(
              <div style={{display:'flex',flexDirection:'column' as const,gap:16}}>
                {activos.map(b=>{
                  const espacio=espacios.find(e=>e.id===b.espacioId)
                  const cliente=clientes.find(c=>c.id===b.clienteId)
                  return(
                    <div key={b.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${b.activo?'#2ecc71':BD}`,borderRadius:12,padding:20}}>
                      {/* Preview del banner */}
                      <div style={{background:b.color,borderRadius:8,padding:'16px 24px',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        {b.imagen&&<img src={b.imagen} style={{height:50,objectFit:'contain',marginRight:16}} alt={b.empresa}/>}
                        <div style={{flex:1}}>
                          <p style={{color:b.colorTexto,fontSize:'.9rem',fontWeight:'bold',margin:0}}>{b.titulo}</p>
                          <p style={{color:b.colorTexto,fontSize:'.75rem',margin:0,opacity:.8}}>{b.subtitulo}</p>
                        </div>
                        {b.url&&<a href={b.url} target="_blank" rel="noreferrer"
                          style={{padding:'6px 14px',background:b.colorTexto,color:b.color,borderRadius:6,textDecoration:'none',fontSize:'.75rem',fontWeight:'bold'}}>
                          Ver más
                        </a>}
                      </div>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap' as const,gap:12}}>
                        <div>
                          <p style={{margin:'0 0 4px',fontSize:'.8rem'}}><strong>{b.empresa}</strong> — {espacio?.nm}</p>
                          <p style={{margin:'0 0 4px',fontSize:'.72rem',color:'rgba(201,168,76,0.6)'}}>📐 {espacio?.dim} · ${espacio?.precio}/mes</p>
                          <p style={{margin:'0 0 4px',fontSize:'.72rem',color:'rgba(201,168,76,0.6)'}}>📅 {b.fechaInicio} → {b.fechaFin}</p>
                          <div style={{display:'flex',gap:4,flexWrap:'wrap' as const,marginTop:6}}>
                            {b.idiomas.map(l=><span key={l} style={{fontSize:'.6rem',padding:'1px 6px',background:'rgba(201,168,76,0.1)',borderRadius:10}}>{IDIOMAS.find(i=>i.code===l)?.nm}</span>)}
                          </div>
                        </div>
                        <div style={{display:'flex',gap:8,flexWrap:'wrap' as const}}>
                          {cliente?.whatsapp&&(
                            <button onClick={()=>contactarWhatsApp(cliente,b)}
                              style={{padding:'6px 12px',background:'rgba(37,211,102,0.15)',border:'1px solid #25d366',
                                color:'#25d366',borderRadius:6,cursor:'pointer',fontSize:'.75rem'}}>
                              📱 WhatsApp
                            </button>
                          )}
                          <button onClick={()=>toggleActivo(b.id)}
                            style={{padding:'6px 12px',background:b.activo?'rgba(46,204,113,0.15)':'rgba(231,76,60,0.15)',
                              border:`1px solid ${b.activo?'#2ecc71':'#e74c3c'}`,
                              color:b.activo?'#2ecc71':'#e74c3c',borderRadius:6,cursor:'pointer',fontSize:'.75rem'}}>
                            {b.activo?'✅ Activo':'❌ Inactivo'}
                          </button>
                          <button onClick={()=>eliminarBanner(b.id)}
                            style={{padding:'6px 12px',background:'rgba(231,76,60,0.1)',border:'1px solid rgba(231,76,60,0.3)',
                              color:'#e74c3c',borderRadius:6,cursor:'pointer',fontSize:'.75rem'}}>
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* CLIENTES */}
        {tab==='clientes'&&(
          <div>
            {clientes.length===0?(
              <div style={{textAlign:'center',padding:40,border:`1px dashed ${BD}`,borderRadius:12}}>
                <p style={{color:'rgba(201,168,76,0.3)'}}>No hay clientes registrados aún</p>
              </div>
            ):(
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:12}}>
                {clientes.map(c=>(
                  <div key={c.id} style={{background:'rgba(201,168,76,0.04)',border:`1px solid ${BD}`,borderRadius:10,padding:16}}>
                    <p style={{fontSize:'.9rem',fontWeight:'bold',margin:'0 0 8px'}}>{c.empresa}</p>
                    <p style={{fontSize:'.75rem',color:'rgba(201,168,76,0.6)',margin:'0 0 4px'}}>👤 {c.contacto}</p>
                    {c.email&&<p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',margin:'0 0 4px'}}>✉️ {c.email}</p>}
                    {c.pais&&<p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',margin:'0 0 4px'}}>🌍 {c.pais}</p>}
                    <p style={{fontSize:'.72rem',color:'rgba(201,168,76,0.5)',margin:'0 0 8px'}}>🗣️ {IDIOMAS.find(i=>i.code===c.idioma)?.nm}</p>
                    <div style={{display:'flex',gap:8}}>
                      {c.whatsapp&&(
                        <a href={`https://wa.me/${c.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer"
                          style={{padding:'5px 12px',background:'rgba(37,211,102,0.15)',border:'1px solid #25d366',
                            color:'#25d366',borderRadius:6,textDecoration:'none',fontSize:'.72rem'}}>
                          📱 WhatsApp
                        </a>
                      )}
                      {c.email&&(
                        <a href={`mailto:${c.email}`}
                          style={{padding:'5px 12px',background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,
                            color:G,borderRadius:6,textDecoration:'none',fontSize:'.72rem'}}>
                          ✉️ Email
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NUEVO BANNER */}
        {tab==='nuevo'&&(
          <div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
              {/* Columna izquierda */}
              <div>
                <p style={{fontSize:'.8rem',fontWeight:'bold',color:G,marginBottom:16}}>DATOS DEL CLIENTE</p>

                <div style={{marginBottom:12}}>
                  <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>ESPACIO PUBLICITARIO</label>
                  <select value={espacioSel} onChange={e=>setEspacioSel(e.target.value)}
                    style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}>
                    <option value="" style={{background:'#0a0a0a'}}>Selecciona espacio...</option>
                    {espacios.map(e=><option key={e.id} value={e.id} style={{background:'#0a0a0a'}}>{e.nm} — ${e.precio}/mes</option>)}
                  </select>
                </div>

                {[
                  {label:'EMPRESA',val:empresa,set:setEmpresa,ph:'Nombre de la empresa'},
                  {label:'CONTACTO',val:contacto,set:setContacto,ph:'Nombre del contacto'},
                  {label:'EMAIL',val:email,set:setEmail,ph:'email@empresa.com'},
                  {label:'WHATSAPP',val:whatsapp,set:setWhatsapp,ph:'+51 999 999 999'},
                  {label:'PAÍS',val:pais,set:setPais,ph:'País de la empresa'},
                ].map(f=>(
                  <div key={f.label} style={{marginBottom:12}}>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{f.label}</label>
                    <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
                  </div>
                ))}

                <div style={{marginBottom:12}}>
                  <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>IDIOMA DEL CLIENTE</label>
                  <select value={idiomaCliente} onChange={e=>setIdiomaCliente(e.target.value)}
                    style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}>
                    {IDIOMAS.map(i=><option key={i.code} value={i.code} style={{background:'#0a0a0a'}}>{i.nm}</option>)}
                  </select>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                  <div>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>FECHA INICIO</label>
                    <input type="date" value={fechaInicio} onChange={e=>setFechaInicio(e.target.value)}
                      style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
                  </div>
                  <div>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>FECHA FIN</label>
                    <input type="date" value={fechaFin} onChange={e=>setFechaFin(e.target.value)}
                      style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
                  </div>
                </div>
              </div>

              {/* Columna derecha */}
              <div>
                <p style={{fontSize:'.8rem',fontWeight:'bold',color:G,marginBottom:16}}>CONTENIDO DEL BANNER</p>

                <button onClick={generarTextoIA} disabled={generando||!empresa}
                  style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.12)',border:`1px solid ${G}`,
                    color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.8rem',marginBottom:12}}>
                  {generando?'Generando...':'🤖 Generar texto con IA'}
                </button>

                {[
                  {label:'TÍTULO DEL BANNER',val:titulo,set:setTitulo,ph:'Ej: Empresa XYZ — Calidad Premium'},
                  {label:'SUBTÍTULO',val:subtitulo,set:setSubtitulo,ph:'Descripción corta del anuncio'},
                  {label:'URL DE DESTINO',val:urlBanner,set:setUrlBanner,ph:'https://empresa.com'},
                  {label:'URL DE IMAGEN (opcional)',val:imagenUrl,set:setImagenUrl,ph:'https://...imagen.jpg'},
                ].map(f=>(
                  <div key={f.label} style={{marginBottom:12}}>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{f.label}</label>
                    <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                      style={{width:'100%',padding:'10px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:8,fontFamily:'Georgia,serif',fontSize:'.85rem'}}/>
                  </div>
                ))}

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:12}}>
                  <div>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>COLOR FONDO</label>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <input type="color" value={colorFondo} onChange={e=>setColorFondo(e.target.value)}
                        style={{width:40,height:40,border:'none',borderRadius:6,cursor:'pointer',background:'none'}}/>
                      <input value={colorFondo} onChange={e=>setColorFondo(e.target.value)}
                        style={{flex:1,padding:'8px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.8rem'}}/>
                    </div>
                  </div>
                  <div>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>COLOR TEXTO</label>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <input type="color" value={colorTexto} onChange={e=>setColorTexto(e.target.value)}
                        style={{width:40,height:40,border:'none',borderRadius:6,cursor:'pointer',background:'none'}}/>
                      <input value={colorTexto} onChange={e=>setColorTexto(e.target.value)}
                        style={{flex:1,padding:'8px',background:'rgba(201,168,76,0.06)',border:`1px solid ${BD}`,color:G,borderRadius:6,fontSize:'.8rem'}}/>
                    </div>
                  </div>
                </div>

                {/* Idiomas del banner */}
                <div style={{marginBottom:16}}>
                  <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>MOSTRAR EN IDIOMAS ({idiomasBanner.length})</label>
                  <button onClick={()=>setDropIdioma(!dropIdioma)}
                    style={{padding:'7px 14px',background:'rgba(201,168,76,0.08)',border:`1px solid ${G}`,
                      color:G,borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'.75rem',marginBottom:6}}>
                    {dropIdioma?'▲':'▼'} Seleccionar idiomas
                  </button>
                  {dropIdioma&&(
                    <div style={{background:'#0a0a0a',border:`1px solid ${G}`,borderRadius:8,padding:8,
                      maxHeight:200,overflowY:'auto' as const,display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:4}}>
                      {IDIOMAS.map(i=>(
                        <button key={i.code} onClick={()=>toggleIdiomaBanner(i.code)}
                          style={{padding:'4px 8px',background:idiomasBanner.includes(i.code)?'rgba(201,168,76,0.2)':'transparent',
                            border:`1px solid ${idiomasBanner.includes(i.code)?G:BD}`,color:G,borderRadius:6,cursor:'pointer',
                            fontFamily:'Georgia,serif',fontSize:'.68rem',textAlign:'left' as const}}>
                          {i.nm}
                        </button>
                      ))}
                    </div>
                  )}
                  <div style={{display:'flex',flexWrap:'wrap' as const,gap:4,marginTop:6}}>
                    {idiomasBanner.map(code=>(
                      <span key={code} style={{padding:'2px 8px',background:'rgba(201,168,76,0.15)',border:`1px solid ${G}`,borderRadius:16,fontSize:'.65rem'}}>
                        {IDIOMAS.find(i=>i.code===code)?.nm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {titulo&&(
                  <div style={{marginBottom:16}}>
                    <label style={{fontSize:'.72rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:6}}>PREVIEW</label>
                    <div style={{background:colorFondo,borderRadius:8,padding:'16px 20px',display:'flex',alignItems:'center',gap:12}}>
                      {imagenUrl&&<img src={imagenUrl} style={{height:40,objectFit:'contain'}} alt={empresa}/>}
                      <div style={{flex:1}}>
                        <p style={{color:colorTexto,fontSize:'.85rem',fontWeight:'bold',margin:0}}>{titulo}</p>
                        <p style={{color:colorTexto,fontSize:'.72rem',margin:0,opacity:.8}}>{subtitulo}</p>
                      </div>
                      <span style={{padding:'4px 10px',background:colorTexto,color:colorFondo,borderRadius:4,fontSize:'.7rem',fontWeight:'bold'}}>Ver más</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button onClick={guardarBanner} disabled={guardando||!espacioSel||!empresa||!titulo}
              style={{width:'100%',padding:'14px',background:G,color:'#0a0a0a',border:'none',
                borderRadius:8,cursor:'pointer',fontFamily:'Georgia,serif',fontSize:'1rem',
                fontWeight:'bold',marginTop:8,opacity:!espacioSel||!empresa||!titulo?0.5:1}}>
              {guardando?'Guardando...':'💾 Guardar Banner'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
