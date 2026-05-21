'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import CurrencySelector from '@/components/CurrencySelector'
import Image from 'next/image'
import ST from '@/components/ST'

const IDIOMAS = [
  {code:'es',flag:'🇵🇪',nm:'Español'},
  {code:'en',flag:'🇺🇸',nm:'English'},
  {code:'de',flag:'🇩🇪',nm:'Deutsch'},
  {code:'fr',flag:'🇫🇷',nm:'Français'},
  {code:'pt',flag:'🇧🇷',nm:'Português'},
  {code:'it',flag:'🇮🇹',nm:'Italiano'},
  {code:'ja',flag:'🇯🇵',nm:'日本語'},
  {code:'zh',flag:'🇨🇳',nm:'中文'},
  {code:'ar',flag:'🇸🇦',nm:'العربية'},
  {code:'th',flag:'🇹🇭',nm:'ไทย'},
  {code:'ko',flag:'🇰🇷',nm:'한국어'},
  {code:'ru',flag:'🇷🇺',nm:'Русский'},
  {code:'nl',flag:'🇳🇱',nm:'Nederlands'},
  {code:'pl',flag:'🇵🇱',nm:'Polski'},
  {code:'sv',flag:'🇸🇪',nm:'Svenska'},
  {code:'tr',flag:'🇹🇷',nm:'Türkçe'},
  {code:'vi',flag:'🇻🇳',nm:'Tiếng Việt'},
  {code:'id',flag:'🇮🇩',nm:'Bahasa'},
  {code:'da',flag:'🇩🇰',nm:'Dansk'},
  {code:'fi',flag:'🇫🇮',nm:'Suomi'},
  {code:'no',flag:'🇳🇴',nm:'Norsk'},
]

const TEXTOS: Record<string,{sel:string,ver:string}> = {
  es:{sel:'Selecciona un Catálogo',ver:'Ver colección →'},
  en:{sel:'Select a Catalog',ver:'View collection →'},
  de:{sel:'Katalog auswählen',ver:'Kollektion ansehen →'},
  fr:{sel:'Sélectionner un Catalogue',ver:'Voir la collection →'},
  pt:{sel:'Selecione um Catálogo',ver:'Ver coleção →'},
  it:{sel:'Seleziona un Catalogo',ver:'Vedi collezione →'},
  ja:{sel:'カタログを選択',ver:'コレクションを見る →'},
  zh:{sel:'选择目录',ver:'查看收藏 →'},
  ar:{sel:'اختر كتالوج',ver:'عرض المجموعة →'},
  th:{sel:'เลือกแคตาล็อก',ver:'ดูคอลเลกชัน →'},
  ko:{sel:'카탈로그 선택',ver:'컬렉션 보기 →'},
  ru:{sel:'Выберите каталог',ver:'Смотреть коллекцию →'},
  nl:{sel:'Selecteer een Catalogus',ver:'Collectie bekijken →'},
  pl:{sel:'Wybierz katalog',ver:'Zobacz kolekcję →'},
  sv:{sel:'Välj en katalog',ver:'Visa samling →'},
  tr:{sel:'Katalog Seçin',ver:'Koleksiyonu görüntüle →'},
  vi:{sel:'Chọn danh mục',ver:'Xem bộ sưu tập →'},
  id:{sel:'Pilih Katalog',ver:'Lihat koleksi →'},
  da:{sel:'Vælg et katalog',ver:'Se samling →'},
  fi:{sel:'Valitse luettelo',ver:'Katso kokoelma →'},
  no:{sel:'Velg en katalog',ver:'Se samling →'},
}

const CATALOGOS = [
  { id:1,  nombre:'Especímenes Biológicos Secos',                     descripcion:'Mariposas diurnas · Calidad A1 · CITES certificado',             video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/cazador_catlogo_mariposas_diurnas_vídeo_mp__j2nfez.mp4',                       imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/logo-house-insects-peru_pvmkud',  colorFondo:'rgba(10,30,10,0.85)',  ruta:'/catalogo/especimenes' },
  { id:2,  nombre:'CUADROS DE MARIPOSA TROPICAL SECOS',               descripcion:'Especies nocturnas · Raras · Amazónicas',                        video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/Video_cuadros_Naturales_mariposas_diurnas__zl1n4f.mp4',                       imagen:'/categorias/Cuadros_butetrfly__diurne.png',                                         colorFondo:'rgba(10,10,30,0.85)',  ruta:'/catalogo/nocturnas' },
  { id:3,  nombre:'Joyería Natural',                                   descripcion:'Oro · Plata · Alas naturales · Artesanal',                       video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.48_sg6ybr.mp4',                              imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/Joyerias_y_cuadros_en_oro_Y_PLATA_y67in5', colorFondo:'rgba(30,20,0,0.85)',  ruta:'/catalogo/joyeria' },
  { id:4,  nombre:'Rarezas & Gynandromorphs',                         descripcion:'Piezas únicas · Aberraciones · Colección élite',                 video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778870094/house_insects_peru_intro_ujjmrv.mp4',                                             imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/rarezas_y_gyanadrmophos_yeno1o',  colorFondo:'rgba(20,10,30,0.85)',  ruta:'/catalogo/rarezas' },
  { id:5,  nombre:'Artesanías & Cúpulas',                             descripcion:'Cuadros · Cúpulas · Resinas · Arte amazónico',                   video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.39_wnlddk.mp4',                              imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/ARTEZANIAS_DE_COPULAS_vsiioa',    colorFondo:'rgba(30,15,5,0.85)',   ruta:'/catalogo/artesanias' },
  { id:6,  nombre:'Herramientas Biológicas',                          descripcion:'Sets disección · Lupas binoculares · Kits montaje',              video:'https://res.cloudinary.com/dv3mvukmq/video/upload/v1778854438/WhatsApp_Video_2026-05-15_at_08.40.28_vobsdz.mp4',                              imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/HERAMIENTAS_BIOLOGICAS_zhvrn2',   colorFondo:'rgba(5,15,30,0.85)',   ruta:'/catalogo/herramientas' },
  { id:7,  nombre:'CUADRO DE MARIPOSAS NOCTURNAS TROPICAL',           descripcion:'Arctiidae · Saturnidae · Sphingidae · Uranidae · Amazónicas',    video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/cuadros_de_amriposas_nocturna_lsjw74.mp4',                                imagen:'https://res.cloudinary.com/dv3mvukmq/image/upload/NOCTURNSA-LOG2_nqnnth',           colorFondo:'rgba(10,10,30,0.85)',  ruta:'/catalogo/nocturnas' },
  { id:8,  nombre:'Cuadros de Coleópteros & Artrópodos Tropicales',   descripcion:'Escarabajos · Arañas · Mantis · Calidad A1 · SERFOR',           video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/video__cuadros_de_insectos_tropical_khdqy6.mp4',                                  imagen:'/categorias/marcos_de_de_diferente_colores_pa_ta_insectos.png',                     colorFondo:'rgba(20,10,5,0.85)',   ruta:'/catalogo/coleoptera' },
  { id:9,  nombre:'Minerales & Piedras Preciosas',                    descripcion:'Minerales peruanos · Piedras preciosas · Colección',             video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/Video_Minerales_y_joyeria__1_didueo.mp4',                                  imagen:'/categorias/mineerales_joyas.png',                                                   colorFondo:'rgba(5,20,30,0.85)',   ruta:'/catalogo/minerales' },
  { id:10, nombre:'Semillas & Plantas Medicinales',                   descripcion:'Flora amazónica · Medicinales · Orgánicas · SENASA',             video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/_video_de_semillas_forestales__y_plantas_medcinales_seed1633955882_b00j0i.mp4',                                  imagen:'/categorias/Semillas_y_flores.png',                                                  colorFondo:'rgba(5,20,10,0.85)',   ruta:'/catalogo/semillas' },
  { id:11, nombre:'Frutas Exóticas & Deshidratadas',                  descripcion:'Frutas amazónicas · Wild · Deshidratadas · SENASA',             video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/_frutas_exotica__desidratdas_seed_jxppwt.mp4',                                          imagen:'/categorias/frutas__desidratdas.png',                                                colorFondo:'rgba(20,10,5,0.85)',   ruta:'/catalogo/frutas' },
  { id:12, nombre:'Hongos & Productos Naturales',                     descripcion:'Hongos amazónicos · Medicinales · Deshidratados',                video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/hongos_naturales_peru_xw47vq.mp4',                              imagen:'/categorias/Hongo__siolvester_wild.png',                                             colorFondo:'rgba(10,20,5,0.85)',   ruta:'/catalogo/hongos' },
  { id:13, nombre:'Textilería & Alpaca',                              descripcion:'Alpaca · Textilería amazónica · Artesanal',                      video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/_texteleria_de_alpaca_y_texteleria_amazonica_seed202240567_elwfiv.mp4',    imagen:'/categorias/Textrile_peruana_.png',                                                  colorFondo:'rgba(20,15,5,0.85)',   ruta:'/catalogo/textileria' },
  { id:14, nombre:'Alimentos Deshidratados',                          descripcion:'Condimentos amazónicos · Naturales · Sin preservantes',          video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/_video.__alimentos_en_polvo_y_desidratados_seed2321222942_ljdbcz.mp4',    imagen:'/categorias/comida_desidratda.png',                                                   colorFondo:'rgba(25,10,5,0.85)',   ruta:'/catalogo/alimentos' },
  { id:15, nombre:'Pinturas & Arte Rupestre',                         descripcion:'Arte amazónico · Pinturas naturales · Colección',                video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/video_de_Pinturas_artes__1_kxly4a.mp4',                                    imagen:'/categorias/pinturea_arteanias.png',                                                  colorFondo:'rgba(20,10,15,0.85)',  ruta:'/catalogo/pinturas' },
  { id:16, nombre:'Maderas Finas & Esculturas',                       descripcion:'Maderas amazónicas · Esculturas · SERFOR certificado',           video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/video_de_madera_finas__y_artes_de_tallado_de_madera_seed1050981746_knty93.mp4', imagen:'/categorias/Madera__fine.png',                                                     colorFondo:'rgba(15,10,5,0.85)',   ruta:'/catalogo/maderas' },
  { id:17, nombre:'Esencias & Aceites Naturales',                     descripcion:'Aceites esenciales · Amazónicos · Medicinales',                  video:'https://res.cloudinary.com/dv3mvukmq/video/upload/q_auto,f_auto/videos/aciete_y_yerbas_video_de_lqtqku.mp4',                                      imagen:'/categorias/Aceites__maderale.png',                                                  colorFondo:'rgba(20,5,15,0.85)',   ruta:'/catalogo/esencias' },
]

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  .home-logo{animation:fadeInDown 0.8s ease;transition:transform 0.4s ease,filter 0.3s ease}
  .home-logo:hover{transform:scale(1.1) rotate(5deg);filter:drop-shadow(0 0 20px rgba(201,168,76,0.7))}
  .home-title{animation:fadeInUp 0.7s ease 0.1s both}
  .home-sub{animation:fadeInUp 0.7s ease 0.2s both}
  .home-btn{transition:transform 0.18s ease,box-shadow 0.18s ease,opacity 0.18s ease}
  .home-btn:hover{transform:translateY(-3px) scale(1.06);box-shadow:0 8px 20px rgba(0,0,0,0.4);opacity:0.92}
  .home-btn-wa:hover{box-shadow:0 8px 20px rgba(37,211,102,0.5)!important}
  .home-btn-email:hover{box-shadow:0 8px 20px rgba(201,168,76,0.4)!important}
  .home-footer-link{transition:color 0.2s ease,transform 0.2s ease;display:inline-block}
  .home-footer-link:hover{color:#C9A84C!important;transform:translateY(-2px)}
  .cat-card{transition:transform 0.25s ease,box-shadow 0.25s ease;overflow:hidden;position:relative;display:block}
  .cat-card:hover{transform:scale(1.03);box-shadow:0 12px 40px rgba(0,0,0,0.7),0 0 0 2px rgba(201,168,76,0.4)}
  .cat-card:hover .cat-img{transform:scale(1.08);opacity:0.85}
  .cat-card:hover .cat-title{color:#fff!important}
  .cat-card:hover .cat-ver{color:rgba(201,168,76,0.9)!important;letter-spacing:0.12em}
  .cat-card:hover .cat-line{width:50px!important}
  .cat-img{transition:transform 0.4s ease,opacity 0.3s ease;position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.7}
  .cat-title{transition:color 0.2s ease}
  .cat-ver{transition:color 0.2s ease,letter-spacing 0.2s ease}
  .cat-line{transition:width 0.3s ease}
  .video-logo{animation:pulse 3s infinite;transition:transform 0.3s ease}
  .video-logo:hover{transform:scale(1.15)!important;animation:none}
  .video-title{animation:fadeInUp 0.6s ease}
  .video-btn-catalogo{transition:transform 0.18s ease,box-shadow 0.18s ease}
  .video-btn-catalogo:hover{transform:translateY(-4px) scale(1.06);box-shadow:0 10px 30px rgba(201,168,76,0.5)!important}
  .video-btn-volver{transition:transform 0.18s ease,border-color 0.18s ease,color 0.18s ease}
  .video-btn-volver:hover{transform:translateY(-2px);border-color:rgba(255,255,255,0.6)!important;color:white!important}
  .lang-btn{transition:all 0.15s ease}
  .lang-btn:hover{background:rgba(201,168,76,0.12)!important;color:#E8C97A!important}
  @keyframes scrollX{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  .scroll-track{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px;padding:8px 0;width:100%}.scroll-track:hover{}.scroll-wrapper{width:100%;display:flex;justify-content:center;padding:0 20px}
  .badge-card{transition:transform 0.3s ease,box-shadow 0.3s ease,filter 0.3s ease;display:inline-block}
  .badge-card:hover{transform:translateY(-8px) scale(1.08) rotate(2deg);box-shadow:0 12px 30px rgba(0,0,0,0.6),0 0 20px rgba(201,168,76,0.3);filter:brightness(1.2)}
`

// ── Vista de catálogo individual ──────────────────────────────────────────────
function VistaCatalogo({
  cat,
  t,
  onVolver,
}: {
  cat: typeof CATALOGOS[0]
  t: { sel: string; ver: string }
  onVolver: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    vid.currentTime = 0
    const play = async () => {
      try { await vid.play() } catch { /* autoplay bloqueado */ }
    }
    if (vid.readyState >= 3) {
      play()
    } else {
      vid.addEventListener('canplay', play, { once: true })
    }
    return () => {
      vid.pause()
      vid.removeEventListener('canplay', play)
    }
  }, [cat.id])

  return (
    <div style={{minHeight:'100vh',background:'#000',position:'relative',overflow:'hidden',fontFamily:'Georgia,serif'}}>
      <style>{CSS}</style>
      {/* UN solo video, sin loop, sin autoPlay declarativo */}
      <video
        ref={videoRef}
        src={cat.video}
        muted
        playsInline
        loop
        preload="auto"
        style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:.65}}
      />
      <div style={{position:'absolute',inset:0,background:`linear-gradient(to bottom,rgba(0,0,0,0.2),${cat.colorFondo})`}}/>
      <div style={{position:'relative',zIndex:10,minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'40px'}}>
        <img src={cat.imagen} alt={cat.nombre} className="video-logo" style={{width:150,height:150,borderRadius:'50%',border:'2px solid #C9A84C',objectFit:'cover',marginBottom:20}}/>
        <h1 className="video-title" style={{fontSize:'clamp(1.8rem,5vw,3.5rem)',fontWeight:400,color:'#E8C97A',marginBottom:12}}><ST t={cat.nombre}/></h1>
        <p style={{fontSize:'1.1rem',color:'rgba(255,255,255,0.8)',marginBottom:32,maxWidth:500,lineHeight:1.8}}><ST t={cat.descripcion}/></p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginBottom:16}}>
          <a href="https://wa.me/51940699405" target="_blank" rel="noreferrer" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" target="_blank" rel="noreferrer" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'12px 24px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
        </div>
        <a href={cat.ruta} className="video-btn-catalogo" style={{background:'#C9A84C',color:'#1A1209',padding:'12px 32px',borderRadius:4,fontSize:'.9rem',fontWeight:700,textDecoration:'none',marginBottom:16,display:'inline-block'}}>{t.ver}</a>
        <button onClick={onVolver} className="video-btn-volver" style={{background:'transparent',border:'1px solid rgba(255,255,255,0.3)',color:'rgba(255,255,255,0.6)',padding:'10px 24px',borderRadius:4,fontSize:'.8rem',cursor:'pointer',marginTop:8}}>← {t.sel}</button>
      </div>
    </div>
  )
}

// ── Página principal ──────────────────────────────────────────────────────────
export default function Home() {
  const [idioma, setIdioma] = useState('es')
  const [showIdiomas, setShowIdiomas] = useState(false)
  const [activo, setActivo] = useState<number|null>(null)
  const [geoProfile, setGeoProfile] = useState<any>(null)

  // FIX: setIdioma declarado antes de usarlo en useEffect
  useEffect(() => {
    fetch('/api/geoip')
      .then(r => r.json())
      .then(data => {
        fetch('/api/visita', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pais: data.country, pagina: 'home', producto: data.destacados?.[0] }),
        }).catch(() => {})
        setGeoProfile(data)
        if (data.idioma && data.idioma !== 'es') setIdioma(data.idioma)
      })
      .catch(() => {})
  }, [])

  const handleVolver = useCallback(() => setActivo(null), [])

  const t = TEXTOS[idioma] || TEXTOS['es']
  const idiomaActual = IDIOMAS.find(i => i.code === idioma)
  const cat = CATALOGOS.find(c => c.id === activo)

  if (activo && cat) {
    return <VistaCatalogo cat={cat} t={t} onVolver={handleVolver} />
  }

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif'}}>
      <style>{CSS}</style>

      {/* Selector de idioma */}
      <div style={{position:'fixed',top:12,right:12,zIndex:999,display:'flex',gap:8,alignItems:'center'}}>
        <CurrencySelector/>
        <button
          onClick={() => setShowIdiomas(s => !s)}
          style={{background:'rgba(26,18,9,0.95)',border:'1px solid rgba(201,168,76,0.4)',color:'#C9A84C',padding:'6px 14px',borderRadius:20,cursor:'pointer',fontSize:'.8rem',fontFamily:'Georgia,serif',display:'flex',alignItems:'center',gap:6}}
        >
          <span>{idiomaActual?.flag}</span><span>{idiomaActual?.nm}</span><span style={{fontSize:'.6rem'}}>▾</span>
        </button>
        {showIdiomas && (
          <div style={{position:'absolute',right:0,top:40,background:'rgba(20,13,5,0.98)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:8,padding:6,maxHeight:320,overflowY:'auto',minWidth:170,boxShadow:'0 8px 32px rgba(0,0,0,0.6)'}}>
            {IDIOMAS.map(i => (
              <button key={i.code} onClick={() => { setIdioma(i.code); setShowIdiomas(false) }} className="lang-btn"
                style={{display:'flex',alignItems:'center',gap:8,width:'100%',background:idioma===i.code?'rgba(201,168,76,0.12)':'transparent',border:'none',color:idioma===i.code?'#C9A84C':'rgba(232,201,122,0.55)',padding:'7px 12px',cursor:'pointer',fontSize:'.78rem',textAlign:'left',fontFamily:'Georgia,serif',borderRadius:4}}>
                <span>{i.flag}</span><span>{i.nm}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Header */}
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'50px 20px 30px',textAlign:'center'}}>
        <Image src="/logo-house-insects-peru.png" alt="House Insects of Peru" width={160} height={160} loading="eager" className="home-logo"
          style={{marginBottom:20,filter:'drop-shadow(0 8px 24px rgba(201,168,76,0.4))'}}
          onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png' }}
        />
        {geoProfile && (
          <div style={{background:`linear-gradient(135deg,${geoProfile.color2},rgba(0,0,0,0.5))`,border:`1px solid ${geoProfile.color1}40`,borderRadius:12,padding:'10px 20px',marginBottom:16,textAlign:'center',animation:'fadeInUp 0.8s ease'}}>
            <p style={{color:geoProfile.color1,fontSize:'.85rem',fontWeight:700,marginBottom:2}}>{geoProfile.saludo} — House Insects of Peru</p>
            <p style={{color:`${geoProfile.color1}99`,fontSize:'.7rem'}}>{geoProfile.mensaje}</p>
          </div>
        )}
        <h1 className="home-title" style={{fontSize:'clamp(1.5rem,4vw,2.8rem)',fontWeight:300,color:'#E8C97A',letterSpacing:'.12em',marginBottom:6,textTransform:'uppercase'}}>House Insects of Peru</h1>
        <p className="home-sub" style={{fontSize:'.85rem',color:'rgba(232,201,122,0.45)',letterSpacing:'.15em',marginBottom:4}}>E.I.R.L. · BY JAVIER ZAVALA · EST. 1980</p>
        <p style={{fontSize:'.75rem',color:'rgba(232,201,122,0.3)',marginBottom:30}}>RUC 20447397804 · LEY AMAZÓNIA N°27037 · CITES · SERFOR</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:30}}>
          <a href="https://wa.me/51940699405" target="_blank" rel="noreferrer" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>💬 +51 940 699 405</a>
          <a href="https://wa.me/51920644433" target="_blank" rel="noreferrer" className="home-btn home-btn-wa" style={{background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>💬 +51 920 644 433</a>
          <a href="mailto:houseinsectsofperu.com.pe@gmail.com" className="home-btn home-btn-email" style={{background:'#1A1209',color:'#C9A84C',border:'1px solid #C9A84C',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>✉️ Email 1</a>
          <a href="mailto:jzalopez02@gmail.com" className="home-btn home-btn-email" style={{background:'#1A1209',color:'#C9A84C',border:'1px solid #C9A84C',padding:'10px 20px',borderRadius:4,fontSize:'.8rem',fontWeight:700,textDecoration:'none'}}>✉️ Email 2</a>
        </div>
        <div style={{width:200,height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',marginBottom:30}}/>
        <h2 style={{fontSize:'.9rem',color:'rgba(232,201,122,0.5)',letterSpacing:'.3em',textTransform:'uppercase',marginBottom:30}}>{t.sel}</h2>
      </div>

      {/* Grid de catálogos — FIX: aspect-ratio en el wrapper, imagen absoluta dentro */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:3,maxWidth:1200,margin:'0 auto',padding:'0 3px 60px'}}>
        {CATALOGOS.map(c => (
          <div
            key={c.id}
            style={{position:'relative',aspectRatio:'1/1',background:'#0A0A0A',cursor:'pointer'}}
            className="cat-card"
            onClick={() => setActivo(c.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && setActivo(c.id)}
            aria-label={c.nombre}
          >
            {/* FIX: img con clase en lugar de style inline para evitar conflicto con position:absolute */}
            <img src={c.imagen} alt={c.nombre} className="cat-img" />
            <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.1) 60%)'}}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'20px',textAlign:'center'}}>
              <h3 className="cat-title" style={{color:'#E8C97A',fontSize:'clamp(.8rem,2vw,.95rem)',fontWeight:400,letterSpacing:'.06em',marginBottom:6}}><ST t={c.nombre}/></h3>
              <div className="cat-line" style={{width:25,height:1,background:'#C9A84C',margin:'0 auto 6px'}}/>
              <p className="cat-ver" style={{color:'rgba(255,255,255,0.5)',fontSize:'.68rem'}}>{t.ver}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{textAlign:'center',padding:'20px',borderTop:'1px solid rgba(201,168,76,0.15)'}}>
        <div style={{display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap',marginBottom:10}}>
          <a href="/privacidad" className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🔒 Privacidad</a>
          <a href="/terminos"   className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📋 Términos</a>
          <a href="/envios"     className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🚚 Envíos</a>
          <a href="/contacto"   className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📞 Contacto</a>
          <a href="/partidas"   className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📋 Partidas</a>
          <a href="/rastreo"    className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>🔍 Rastreo</a>
          <a href="/banners"    className="home-footer-link" style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',textDecoration:'none'}}>📢 Publicidad</a>
        </div>

      <div style={{background:"rgba(0,0,0,0.3)",borderTop:"1px solid rgba(201,168,76,0.15)",padding:"24px 20px",textAlign:"center"}}>
        <p style={{color:"rgba(201,168,76,0.4)",fontSize:".6rem",letterSpacing:".25em",textTransform:"uppercase",marginBottom:"16px"}}>Certificaciones Oficiales</p>
        <div className="scroll-wrapper"><div className="scroll-track">{[{l:"SERFOR",s:"Reg. Forestal",c:"#2d6a2d",url:"https://www.serfor.gob.pe"},{l:"CITES",s:"Comercio Int.",c:"#1a4a7a",url:"https://cites.org"},{l:"SENASA",s:"Sanidad Agr.",c:"#7a2d1a",url:"https://www.senasa.gob.pe"},{l:"SUNAT",s:"RUC 20447397804",c:"#4a2d7a",url:"https://e-consultaruc.sunat.gob.pe"},{l:"FITOSAN.",s:"Certificado",c:"#2d5a3a",url:"https://www.senasa.gob.pe"},{l:"PROMPEX",s:"Export. Peru",c:"#8a2d00",url:"https://www.promperu.gob.pe"}].map(x=>(
            <a key={x.l} href={x.url||"#"} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><div className="badge-card" style={{background:x.c+"99",border:"1px solid "+x.c,borderRadius:"8px",padding:"8px 14px",textAlign:"center",minWidth:"80px"}}><p style={{color:"#fff",fontSize:".7rem",fontWeight:700,margin:0}}>{x.l}</p><p style={{color:"rgba(255,255,255,0.6)",fontSize:".55rem",margin:"2px 0"}}>{x.s}</p><img src={"https://api.qrserver.com/v1/create-qr-code/?size=55x55&data="+encodeURIComponent(x.url||x.l)} alt="QR" style={{width:48,height:48,marginTop:4,borderRadius:4,display:"block",margin:"4px auto 0"}}/></div></a>
          ))}
        </div>
      </div>
      <div style={{background:"rgba(0,0,0,0.2)",borderTop:"1px solid rgba(201,168,76,0.1)",padding:"24px 20px",textAlign:"center"}}>
        <p style={{color:"rgba(201,168,76,0.4)",fontSize:".6rem",letterSpacing:".25em",textTransform:"uppercase",marginBottom:"16px"}}>Pagos y Aseguradoras</p>
        <div className="scroll-wrapper"><div className="scroll-track" style={{animationDuration:"40s"}}>{[{l:"FIRST BANK",s:"Transferencia",c:"#1a3a6a",i:"🏦",url:"https://www.firstbank.com.pe"},{l:"KATENOS",s:"Billetera",c:"#1a5a3a",i:"💳",url:"https://katenos.com"},{l:"IZIPAY",s:"Tarjetas",c:"#6a1a1a",i:"💰",url:"https://izipay.pe"},{l:"Google Pay",s:"G Pay",c:"#1a4a2a",i:"📱",url:"https://pay.google.com"},{l:"PAYONEER",s:"Internacional",c:"#c44a00",i:"🌐",url:"https://www.payoneer.com"},{l:"WISE",s:"Transfer.",c:"#163300",i:"💸"},{l:"LLOYDS",s:"London",c:"#0a2a5a",i:"🛡️",url:"https://www.lloyds.com"},{l:"SHIP INS.",s:"Maritimo",c:"#0a3a5a",i:"🚢",url:"https://shipinsurance.com"},{l:"INSURTECH",s:"Digital QR",c:"#2a0a5a",i:"📲",url:"https://insurtech.pe"},{l:"ALIPAY",s:"China Pay",c:"#1a6a8a",i:"💙",url:"https://global.alipay.com"},{l:"WECHAT PAY",s:"WeChat Biz",c:"#1a7a2a",i:"💚",url:"https://pay.weixin.qq.com"},{l:"PROMPERU",s:"Export. Peru",c:"#8a1a00",i:"🇵🇪",url:"https://www.promperu.gob.pe"}].map(x=>(<a key={x.l} href={x.url||"#"} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}><div style={{background:x.c+"99",border:"1px solid "+x.c+"99",borderRadius:"8px",padding:"8px 14px",textAlign:"center",minWidth:"80px"}}><p style={{fontSize:"1rem",margin:0}}>{x.i}</p><p style={{color:"#fff",fontSize:".7rem",fontWeight:700,margin:0}}>{x.l}</p><p style={{color:"rgba(255,255,255,0.6)",fontSize:".55rem",margin:"2px 0"}}>{x.s}</p>{x.url&&x.l!=="WISE"?<img src={"https://api.qrserver.com/v1/create-qr-code/?size=55x55&data="+encodeURIComponent(x.url)} alt="QR" style={{width:48,height:48,marginTop:4,borderRadius:4,display:"block",margin:"4px auto 0"}}/>:<p style={{color:"rgba(255,255,255,0.3)",fontSize:".5rem",margin:"4px 0"}}>disponible</p>}</div></a>))}
        </div></div>
      </div>
      </div>
        <p style={{color:'rgba(232,201,122,0.25)',fontSize:'.65rem'}}>© 2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARÍA, PERÚ · EXPORTACIÓN MUNDIAL</p>
      </div>
    </div>
  )
}
