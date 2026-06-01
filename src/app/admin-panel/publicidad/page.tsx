'use client'
import { useState, useRef, useCallback } from 'react'

// ══════════════════════════════════════════════════════════════════
// MOTOR DE PUBLICIDAD MUNDIAL — House Insects of Peru
// 17 rubros · 50 idiomas · 6 continentes · todas las redes sociales
// ══════════════════════════════════════════════════════════════════

const G = '#C9A84C', BG = '#0d0800', BG2 = '#111005', BD = '#2a1f0a'

// ── CONTINENTES Y CULTURAS ────────────────────────────────────────
const CONTINENTES = [
  {
    id: 'asia-pacifico', nombre: 'Asia Pacífico', icono: '🌏',
    paises: [
      { id: 'china', nombre: 'China', idioma: 'zh', moneda: 'CNY', redes: ['WeChat','1688','Weibo','Taobao'], color: '#c41e3a', cultura: 'luxury_red' },
      { id: 'japon', nombre: 'Japón', idioma: 'ja', moneda: 'JPY', redes: ['Line','Twitter','Instagram'], color: '#bc002d', cultura: 'minimalist_zen' },
      { id: 'corea', nombre: 'Corea del Sur', idioma: 'ko', moneda: 'KRW', redes: ['KakaoTalk','Instagram','Naver'], color: '#003478', cultura: 'kpop_modern' },
      { id: 'tailandia', nombre: 'Tailandia', idioma: 'th', moneda: 'THB', redes: ['Line','Facebook','Instagram'], color: '#a51931', cultura: 'tropical_vibrant' },
      { id: 'vietnam', nombre: 'Vietnam', idioma: 'vi', moneda: 'VND', redes: ['Zalo','Facebook','TikTok'], color: '#da251d', cultura: 'tropical_vibrant' },
      { id: 'indonesia', nombre: 'Indonesia', idioma: 'id', moneda: 'IDR', redes: ['WhatsApp','Instagram','TikTok'], color: '#ce1126', cultura: 'tropical_vibrant' },
      { id: 'malaysia', nombre: 'Malaysia', idioma: 'ms', moneda: 'MYR', redes: ['WhatsApp','Instagram','Facebook'], color: '#cc0001', cultura: 'tropical_vibrant' },
      { id: 'australia', nombre: 'Australia', idioma: 'en', moneda: 'AUD', redes: ['Instagram','Facebook','Twitter'], color: '#00843d', cultura: 'natural_outdoor' },
    ]
  },
  {
    id: 'europa', nombre: 'Europa', icono: '🌍',
    paises: [
      { id: 'alemania', nombre: 'Alemania', idioma: 'de', moneda: 'EUR', redes: ['Instagram','Facebook','WhatsApp'], color: '#000000', cultura: 'premium_scientific' },
      { id: 'francia', nombre: 'Francia', idioma: 'fr', moneda: 'EUR', redes: ['Instagram','Facebook','Twitter'], color: '#002395', cultura: 'luxury_art' },
      { id: 'reino-unido', nombre: 'Reino Unido', idioma: 'en', moneda: 'GBP', redes: ['Instagram','Twitter','Facebook'], color: '#012169', cultura: 'heritage_classic' },
      { id: 'españa', nombre: 'España', idioma: 'es', moneda: 'EUR', redes: ['Instagram','WhatsApp','TikTok'], color: '#c60b1e', cultura: 'vibrant_mediterranean' },
      { id: 'italia', nombre: 'Italia', idioma: 'it', moneda: 'EUR', redes: ['Instagram','Facebook','WhatsApp'], color: '#009246', cultura: 'luxury_art' },
      { id: 'rusia', nombre: 'Rusia', idioma: 'ru', moneda: 'RUB', redes: ['VK','Telegram','Instagram'], color: '#d52b1e', cultura: 'heritage_classic' },
      { id: 'holanda', nombre: 'Holanda', idioma: 'nl', moneda: 'EUR', redes: ['Instagram','Facebook','WhatsApp'], color: '#ae1c28', cultura: 'natural_scientific' },
      { id: 'polonia', nombre: 'Polonia', idioma: 'pl', moneda: 'PLN', redes: ['Facebook','Instagram','WhatsApp'], color: '#dc143c', cultura: 'heritage_classic' },
    ]
  },
  {
    id: 'america-norte', nombre: 'América del Norte', icono: '🌎',
    paises: [
      { id: 'usa', nombre: 'Estados Unidos', idioma: 'en', moneda: 'USD', redes: ['Instagram','Facebook','TikTok','Twitter'], color: '#002868', cultura: 'commercial_bold' },
      { id: 'canada', nombre: 'Canadá', idioma: 'en', moneda: 'CAD', redes: ['Instagram','Facebook','Twitter'], color: '#ff0000', cultura: 'natural_outdoor' },
      { id: 'mexico', nombre: 'México', idioma: 'es', moneda: 'MXN', redes: ['WhatsApp','Facebook','Instagram','TikTok'], color: '#006847', cultura: 'vibrant_latin' },
    ]
  },
  {
    id: 'america-sur', nombre: 'América del Sur', icono: '🌎',
    paises: [
      { id: 'peru', nombre: 'Perú', idioma: 'es', moneda: 'PEN', redes: ['WhatsApp','Facebook','Instagram','TikTok'], color: '#d91023', cultura: 'amazon_heritage' },
      { id: 'brasil', nombre: 'Brasil', idioma: 'pt', moneda: 'BRL', redes: ['WhatsApp','Instagram','Facebook','TikTok'], color: '#009c3b', cultura: 'vibrant_tropical' },
      { id: 'argentina', nombre: 'Argentina', idioma: 'es', moneda: 'ARS', redes: ['WhatsApp','Instagram','Facebook'], color: '#74acdf', cultura: 'european_latin' },
      { id: 'colombia', nombre: 'Colombia', idioma: 'es', moneda: 'COP', redes: ['WhatsApp','Instagram','TikTok'], color: '#fcd116', cultura: 'vibrant_latin' },
      { id: 'chile', nombre: 'Chile', idioma: 'es', moneda: 'CLP', redes: ['WhatsApp','Instagram','Facebook'], color: '#d52b1e', cultura: 'european_latin' },
    ]
  },
  {
    id: 'medio-oriente', nombre: 'Medio Oriente', icono: '🌍',
    paises: [
      { id: 'emiratos', nombre: 'Emiratos Árabes', idioma: 'ar', moneda: 'AED', redes: ['Instagram','WhatsApp','Snapchat'], color: '#00732f', cultura: 'luxury_arabic' },
      { id: 'arabia', nombre: 'Arabia Saudita', idioma: 'ar', moneda: 'SAR', redes: ['Twitter','Snapchat','WhatsApp'], color: '#006c35', cultura: 'luxury_arabic' },
      { id: 'turquia', nombre: 'Turquía', idioma: 'tr', moneda: 'TRY', redes: ['Instagram','WhatsApp','Twitter'], color: '#e30a17', cultura: 'heritage_modern' },
      { id: 'iran', nombre: 'Irán', idioma: 'fa', moneda: 'IRR', redes: ['Instagram','Telegram','WhatsApp'], color: '#239f40', cultura: 'persian_heritage' },
    ]
  },
  {
    id: 'africa', nombre: 'África', icono: '🌍',
    paises: [
      { id: 'sudafrica', nombre: 'Sudáfrica', idioma: 'af', moneda: 'ZAR', redes: ['WhatsApp','Facebook','Instagram'], color: '#007a4d', cultura: 'natural_outdoor' },
      { id: 'nigeria', nombre: 'Nigeria', idioma: 'en', moneda: 'NGN', redes: ['WhatsApp','Facebook','Instagram'], color: '#008751', cultura: 'vibrant_african' },
      { id: 'kenya', nombre: 'Kenia', idioma: 'sw', moneda: 'KES', redes: ['WhatsApp','Facebook','Instagram'], color: '#006600', cultura: 'natural_safari' },
      { id: 'marruecos', nombre: 'Marruecos', idioma: 'ar', moneda: 'MAD', redes: ['WhatsApp','Facebook','Instagram'], color: '#c1272d', cultura: 'luxury_arabic' },
    ]
  },
]

// ── RUBROS ────────────────────────────────────────────────────────
const RUBROS = [
  { id: 'especimenes', nombre: 'Especímenes Biológicos Secos', icono: '🦋', categoria: 'natural' },
  { id: 'nocturnas', nombre: 'Moths Nocturnas', icono: '🌙', categoria: 'natural' },
  { id: 'coleoptera', nombre: 'Coleópteros', icono: '🪲', categoria: 'natural' },
  { id: 'arthropoda', nombre: 'Artrópodos', icono: '🕷️', categoria: 'natural' },
  { id: 'cuadros', nombre: 'Cuadros de Mariposas', icono: '🖼️', categoria: 'arte' },
  { id: 'rarezas', nombre: 'Rarezas & Gynandromorphs', icono: '⭐', categoria: 'premium' },
  { id: 'joyeria', nombre: 'Joyería Natural', icono: '💎', categoria: 'premium' },
  { id: 'artesanias', nombre: 'Artesanías & Cúpulas', icono: '🏺', categoria: 'arte' },
  { id: 'herramientas', nombre: 'Herramientas Biológicas', icono: '🔬', categoria: 'ciencia' },
  { id: 'minerales', nombre: 'Minerales & Piedras', icono: '💠', categoria: 'natural' },
  { id: 'semillas', nombre: 'Semillas & Plantas Medicinales', icono: '🌱', categoria: 'botanica' },
  { id: 'frutas', nombre: 'Frutas Exóticas Deshidratadas', icono: '🍍', categoria: 'alimentos' },
  { id: 'hongos', nombre: 'Hongos & Productos Naturales', icono: '🍄', categoria: 'botanica' },
  { id: 'textileria', nombre: 'Textilería & Alpaca', icono: '🧶', categoria: 'arte' },
  { id: 'alimentos', nombre: 'Alimentos Deshidratados', icono: '🌾', categoria: 'alimentos' },
  { id: 'pinturas', nombre: 'Pinturas & Arte Rupestre', icono: '🎨', categoria: 'arte' },
  { id: 'maderas', nombre: 'Maderas Finas & Esculturas', icono: '🪵', categoria: 'arte' },
]

// ── FORMATOS DE AVISO ─────────────────────────────────────────────
const FORMATOS = [
  { id: 'story', nombre: 'Story', dimensiones: '1080×1920', ratio: '9:16', redes: ['Instagram','Facebook','TikTok','WhatsApp'], icono: '📱' },
  { id: 'post', nombre: 'Post Cuadrado', dimensiones: '1080×1080', ratio: '1:1', redes: ['Instagram','Facebook','WeChat','1688'], icono: '🖼️' },
  { id: 'banner', nombre: 'Banner Web', dimensiones: '1200×628', ratio: '16:9', redes: ['Facebook Ads','Google Ads','Web'], icono: '🌐' },
  { id: 'triptico', nombre: 'Tríptico', dimensiones: 'A4 3 paneles', ratio: 'A4', redes: ['Impresión','PDF','Email'], icono: '📄' },
  { id: 'flyer', nombre: 'Flyer Producto', dimensiones: 'A5', ratio: 'A5', redes: ['WhatsApp','WeChat','Email','Impresión'], icono: '📋' },
  { id: 'wechat', nombre: 'WeChat/Alipay', dimensiones: '900×500', ratio: '16:9', redes: ['WeChat','Alipay','1688'], icono: '💬' },
  { id: 'tiktok', nombre: 'TikTok/Reels', dimensiones: '1080×1920', ratio: '9:16', redes: ['TikTok','Instagram Reels','YouTube Shorts'], icono: '🎬' },
  { id: 'catalogo', nombre: 'Catálogo Digital', dimensiones: 'A4 múltiples', ratio: 'A4', redes: ['Email','WhatsApp','Web'], icono: '📚' },
]

// ── TIPOS DE AVISO ────────────────────────────────────────────────
const TIPOS_AVISO = [
  { id: 'producto', nombre: 'Aviso de Producto', desc: 'Mostrar espécimen/producto con precio' },
  { id: 'mayorista', nombre: 'Oferta Mayorista', desc: 'Precios al por mayor con descuentos' },
  { id: 'nueva-llegada', nombre: 'Nueva Llegada', desc: 'Anunciar nuevos especímenes llegados' },
  { id: 'coleccion', nombre: 'Colección Completa', desc: 'Mostrar toda una familia/rubro' },
  { id: 'certificado', nombre: 'Certificación', desc: 'Destacar SERFOR, CITES, legalidad' },
  { id: 'exportacion', nombre: 'Exportación Mundial', desc: 'Servicios de envío internacional' },
  { id: 'promocion', nombre: 'Promoción Especial', desc: 'Descuentos por temporada o cantidad' },
  { id: 'institucional', nombre: 'Institucional', desc: 'Presentar House Insects of Peru' },
]

// ── PALETAS CULTURALES ────────────────────────────────────────────
const PALETAS: Record<string, any> = {
  luxury_red: { bg: '#1a0000', accent: '#c41e3a', text: '#ffd700', secondary: '#8b0000' },
  minimalist_zen: { bg: '#fafafa', accent: '#1a1a1a', text: '#333', secondary: '#e8e8e8' },
  kpop_modern: { bg: '#0a0a1a', accent: '#7b2fff', text: '#fff', secondary: '#ff6b9d' },
  tropical_vibrant: { bg: '#1a3a1a', accent: '#ffd700', text: '#fff', secondary: '#00cc44' },
  premium_scientific: { bg: '#0a0a14', accent: '#4a9eff', text: '#fff', secondary: '#1a3a5c' },
  luxury_art: { bg: '#1a1000', accent: '#c9a84c', text: '#e8d5a3', secondary: '#4a3a1a' },
  heritage_classic: { bg: '#1a1a2e', accent: '#e8c84a', text: '#fff', secondary: '#2d2d4e' },
  vibrant_mediterranean: { bg: '#1a0a0a', accent: '#ff6b35', text: '#fff', secondary: '#c41e3a' },
  commercial_bold: { bg: '#000814', accent: '#ffd60a', text: '#fff', secondary: '#0077b6' },
  natural_outdoor: { bg: '#0a1a0a', accent: '#4caf50', text: '#fff', secondary: '#2d5a27' },
  vibrant_latin: { bg: '#1a0a00', accent: '#ff6b00', text: '#fff', secondary: '#ffd700' },
  amazon_heritage: { bg: '#0a1a0a', accent: '#c9a84c', text: '#e8d5a3', secondary: '#2d5a27' },
  vibrant_tropical: { bg: '#001a0a', accent: '#00cc44', text: '#fff', secondary: '#ffd700' },
  european_latin: { bg: '#0a0a1a', accent: '#4a9eff', text: '#fff', secondary: '#c9a84c' },
  luxury_arabic: { bg: '#0a0a00', accent: '#ffd700', text: '#fff', secondary: '#8b6914' },
  heritage_modern: { bg: '#1a0505', accent: '#e30a17', text: '#fff', secondary: '#c9a84c' },
  persian_heritage: { bg: '#0a1a0a', accent: '#239f40', text: '#fff', secondary: '#ffd700' },
  natural_safari: { bg: '#1a1000', accent: '#cc7722', text: '#fff', secondary: '#4a7c2d' },
  vibrant_african: { bg: '#0a1a00', accent: '#008751', text: '#fff', secondary: '#ffd700' },
  natural_scientific: { bg: '#0a0a1a', accent: '#00adef', text: '#fff', secondary: '#2d5a7c' },
}

export default function CreadorPublicidad() {
  const [paso, setPaso] = useState(1)
  const [rubro, setRubro] = useState<any>(null)
  const [continente, setContinente] = useState<any>(null)
  const [pais, setPais] = useState<any>(null)
  const [formato, setFormato] = useState<any>(null)
  const [tipoAviso, setTipoAviso] = useState<any>(null)
  const [redSocial, setRedSocial] = useState('')
  const [generando, setGenerando] = useState(false)
  const [aviso, setAviso] = useState<any>(null)
  const [imagenUrl, setImagenUrl] = useState('')
  const [nombreEspecie, setNombreEspecie] = useState('')
  const [precioMinorista, setPrecioMinorista] = useState('')
  const [precioMayorista, setPrecioMayorista] = useState('')
  const [oferta, setOferta] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const paleta = pais ? (PALETAS[pais.cultura] || PALETAS.luxury_art) : PALETAS.luxury_art

  // ── Generar aviso con IA ──────────────────────────────────────
  const generarAviso = async () => {
    if (!rubro || !pais || !formato || !tipoAviso) return
    setGenerando(true)
    setAviso(null)

    try {
      const prompt = `Eres un experto en marketing internacional especializado en productos naturales de lujo del Perú amazónico.

Crea un aviso publicitario para:
- PRODUCTO: ${rubro.nombre} de House Insects of Peru E.I.R.L.
- PAÍS/CULTURA: ${pais.nombre} (${continente?.nombre})
- IDIOMA: ${pais.idioma}
- FORMATO: ${formato.nombre} para ${redSocial || formato.redes[0]}
- TIPO: ${tipoAviso.nombre}
- ESPECIE/PRODUCTO: ${nombreEspecie || rubro.nombre}
${precioMinorista ? `- PRECIO MINORISTA: ${precioMinorista} USD` : ''}
${precioMayorista ? `- PRECIO MAYORISTA: ${precioMayorista} USD` : ''}
${oferta ? `- OFERTA ESPECIAL: ${oferta}` : ''}

CONTEXTO CULTURAL de ${pais.nombre}:
- Adapta el mensaje a los valores culturales locales
- Usa referencias que resuenen con esta audiencia
- Tono apropiado para la red social ${redSocial || formato.redes[0]}
- Considera las costumbres de compra y comunicación del país
- Para países asiáticos: énfasis en rareza, colección, estatus
- Para Europa: énfasis en ciencia, calidad, certificaciones
- Para América Latina: énfasis en origen amazónico, naturaleza
- Para Medio Oriente: énfasis en exclusividad, lujo, regalo
- Para África: énfasis en naturaleza, conservación, origen

Responde SOLO en JSON con esta estructura exacta:
{
  "titular": "título principal impactante en ${pais.idioma}",
  "subtitulo": "subtítulo descriptivo en ${pais.idioma}",
  "cuerpo": "texto principal del aviso en ${pais.idioma} (2-3 oraciones)",
  "cta": "llamada a la acción en ${pais.idioma}",
  "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5"],
  "emojis": "emojis relevantes para esta cultura",
  "mensaje_whatsapp": "mensaje corto para WhatsApp/WeChat en ${pais.idioma}",
  "keywords_seo": ["keyword1", "keyword2", "keyword3"],
  "angulo_cultural": "explicación breve de por qué este ángulo cultural funciona en ${pais.nombre}",
  "titular_es": "titular traducido al español",
  "cuerpo_es": "cuerpo traducido al español"
}`

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })

      const data = await res.json()
      const texto = data.content?.[0]?.text || ''
      const jsonMatch = texto.match(/\{[\s\S]+\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        setAviso(parsed)
      }
    } catch (err) {
      console.error(err)
    }
    setGenerando(false)
  }

  const copiar = (texto: string) => {
    navigator.clipboard.writeText(texto)
  }

  const TOTAL_PASOS = 5

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#e8d5a3', fontFamily: 'Georgia,serif' }}>

      {/* HEADER */}
      <div style={{ background: BG2, borderBottom: `1px solid ${BD}`, padding: '14px 24px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, color: G, fontSize: 20 }}>
            🌍 Motor de Publicidad Mundial
          </h1>
          <p style={{ margin: 0, color: '#6b5a2e', fontSize: 12 }}>
            House Insects of Peru · 17 rubros · 50 idiomas · 6 continentes
          </p>
        </div>
        <a href="/admin-panel" style={{ color: G, fontSize: 12, textDecoration: 'none',
          border: `1px solid ${BD}`, padding: '6px 14px', borderRadius: 6 }}>← Panel</a>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ padding: '12px 24px', borderBottom: `1px solid ${BD}` }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {['Rubro','Mercado','Formato','Contenido','Generar'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div onClick={() => i < paso && setPaso(i+1)}
                style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                  background: paso > i+1 ? G : paso === i+1 ? 'rgba(201,168,76,0.3)' : 'transparent',
                  border: `2px solid ${paso >= i+1 ? G : BD}`,
                  color: paso > i+1 ? '#0d0800' : G,
                  cursor: i < paso-1 ? 'pointer' : 'default' }}>
                {paso > i+1 ? '✓' : i+1}
              </div>
              <span style={{ fontSize: 11, color: paso === i+1 ? G : '#4a3a1a' }}>{s}</span>
              {i < 4 && <div style={{ width: 30, height: 1, background: paso > i+1 ? G : BD }}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>

        {/* ══ PASO 1: RUBRO ═════════════════════════════════════════ */}
        {paso === 1 && (
          <div>
            <h2 style={{ color: G, marginBottom: 6 }}>1. ¿Qué quieres promocionar?</h2>
            <p style={{ color: '#6b5a2e', fontSize: 13, marginBottom: 20 }}>
              Selecciona el rubro de tu catálogo
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {RUBROS.map(r => (
                <div key={r.id} onClick={() => { setRubro(r); setPaso(2) }}
                  style={{ background: rubro?.id === r.id ? 'rgba(201,168,76,0.15)' : BG2,
                    border: `1px solid ${rubro?.id === r.id ? G : BD}`,
                    borderRadius: 10, padding: 16, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 12,
                    transition: 'all 0.2s' }}>
                  <span style={{ fontSize: 28 }}>{r.icono}</span>
                  <div>
                    <div style={{ fontSize: 13, color: rubro?.id === r.id ? G : '#e8d5a3', fontWeight: 700 }}>
                      {r.nombre}
                    </div>
                    <div style={{ fontSize: 10, color: '#4a3a1a', marginTop: 2 }}>{r.categoria}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ PASO 2: MERCADO ═══════════════════════════════════════ */}
        {paso === 2 && (
          <div>
            <h2 style={{ color: G, marginBottom: 6 }}>2. ¿A qué mercado va dirigido?</h2>
            <p style={{ color: '#6b5a2e', fontSize: 13, marginBottom: 20 }}>
              Selecciona el continente y país para adaptar culturalmente el aviso
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
              {/* Continentes */}
              <div>
                <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Continente
                </div>
                {CONTINENTES.map(c => (
                  <button key={c.id} onClick={() => { setContinente(c); setPais(null) }}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 14px', marginBottom: 6,
                      background: continente?.id === c.id ? 'rgba(201,168,76,0.15)' : BG2,
                      border: `1px solid ${continente?.id === c.id ? G : BD}`,
                      borderRadius: 8, color: continente?.id === c.id ? G : '#8a7040',
                      cursor: 'pointer', fontSize: 13, fontFamily: 'Georgia,serif',
                      display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{c.icono}</span>
                    <span>{c.nombre}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 10, color: '#4a3a1a' }}>
                      {c.paises.length} países
                    </span>
                  </button>
                ))}
              </div>

              {/* Países */}
              <div>
                {continente ? (
                  <>
                    <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                      País — {continente.nombre}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 10 }}>
                      {continente.paises.map((p: any) => {
                        const pal = PALETAS[p.cultura] || PALETAS.luxury_art
                        return (
                          <div key={p.id} onClick={() => { setPais(p); setPaso(3) }}
                            style={{ background: pais?.id === p.id ? 'rgba(201,168,76,0.15)' : BG2,
                              border: `2px solid ${pais?.id === p.id ? G : BD}`,
                              borderRadius: 10, padding: 14, cursor: 'pointer' }}>
                            {/* Preview cultural */}
                            <div style={{ height: 40, borderRadius: 6, marginBottom: 8,
                              background: `linear-gradient(135deg, ${pal.bg}, ${pal.accent})`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <span style={{ color: pal.text, fontSize: 10, fontWeight: 700 }}>
                                {p.nombre}
                              </span>
                            </div>
                            <div style={{ fontSize: 12, color: pais?.id === p.id ? G : '#e8d5a3', fontWeight: 700 }}>
                              {p.nombre}
                            </div>
                            <div style={{ fontSize: 10, color: '#4a3a1a', marginTop: 4 }}>
                              💬 {p.idioma.toUpperCase()} · 💰 {p.moneda}
                            </div>
                            <div style={{ fontSize: 10, color: '#4a3a1a', marginTop: 2 }}>
                              📱 {p.redes.slice(0,2).join(', ')}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: '100%', color: '#4a3a1a', fontSize: 13 }}>
                    ← Selecciona un continente
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ PASO 3: FORMATO ═══════════════════════════════════════ */}
        {paso === 3 && (
          <div>
            <h2 style={{ color: G, marginBottom: 6 }}>3. Formato y red social</h2>
            <p style={{ color: '#6b5a2e', fontSize: 13, marginBottom: 20 }}>
              Para {pais?.nombre} — Redes recomendadas: {pais?.redes.join(', ')}
            </p>

            {/* Tipo de aviso */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#6b5a2e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                Tipo de Aviso
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: 10 }}>
                {TIPOS_AVISO.map(t => (
                  <div key={t.id} onClick={() => setTipoAviso(t)}
                    style={{ background: tipoAviso?.id === t.id ? 'rgba(201,168,76,0.15)' : BG2,
                      border: `1px solid ${tipoAviso?.id === t.id ? G : BD}`,
                      borderRadius: 8, padding: 12, cursor: 'pointer' }}>
                    <div style={{ fontSize: 12, color: tipoAviso?.id === t.id ? G : '#e8d5a3', fontWeight: 700, marginBottom: 4 }}>
                      {t.nombre}
                    </div>
                    <div style={{ fontSize: 10, color: '#4a3a1a' }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formato */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: '#6b5a2e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                Formato del Aviso
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 10 }}>
                {FORMATOS.map(f => (
                  <div key={f.id} onClick={() => { setFormato(f); setRedSocial(f.redes[0]) }}
                    style={{ background: formato?.id === f.id ? 'rgba(201,168,76,0.15)' : BG2,
                      border: `1px solid ${formato?.id === f.id ? G : BD}`,
                      borderRadius: 8, padding: 12, cursor: 'pointer' }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{f.icono}</div>
                    <div style={{ fontSize: 12, color: formato?.id === f.id ? G : '#e8d5a3', fontWeight: 700 }}>
                      {f.nombre}
                    </div>
                    <div style={{ fontSize: 10, color: '#4a3a1a', marginTop: 4 }}>{f.dimensiones}</div>
                    <div style={{ fontSize: 10, color: '#4a3a1a' }}>{f.redes.slice(0,2).join(' · ')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Red social específica */}
            {formato && (
              <div>
                <div style={{ fontSize: 12, color: '#6b5a2e', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Red Social Específica
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {[...new Set([...pais?.redes||[], ...formato.redes])].map((r: string) => (
                    <button key={r} onClick={() => setRedSocial(r)}
                      style={{ padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12,
                        border: `1px solid ${redSocial === r ? G : BD}`,
                        background: redSocial === r ? 'rgba(201,168,76,0.15)' : 'transparent',
                        color: redSocial === r ? G : '#8a7040', fontFamily: 'Georgia,serif' }}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tipoAviso && formato && (
              <button onClick={() => setPaso(4)}
                style={{ marginTop: 20, padding: '10px 24px', borderRadius: 8, cursor: 'pointer',
                  background: G, color: '#0d0800', border: 'none', fontWeight: 700, fontSize: 14,
                  fontFamily: 'Georgia,serif' }}>
                Continuar →
              </button>
            )}
          </div>
        )}

        {/* ══ PASO 4: CONTENIDO ═════════════════════════════════════ */}
        {paso === 4 && (
          <div>
            <h2 style={{ color: G, marginBottom: 6 }}>4. Contenido del aviso</h2>
            <p style={{ color: '#6b5a2e', fontSize: 13, marginBottom: 20 }}>
              Información del producto para {pais?.nombre} — {formato?.nombre}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Imagen del producto */}
                <div>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                    📸 URL de imagen del producto (Bunny.net)
                  </label>
                  <input value={imagenUrl} onChange={e => setImagenUrl(e.target.value)}
                    placeholder="https://HouseInsects1967.b-cdn.net/brassolidae/..."
                    style={{ width: '100%', background: BG2, border: `1px solid ${BD}`,
                      color: '#e8d5a3', padding: '8px 10px', borderRadius: 6, fontSize: 12,
                      fontFamily: 'monospace', boxSizing: 'border-box' as any }}
                  />
                </div>

                {/* Nombre especie/producto */}
                <div>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                    🦋 Nombre del espécimen/producto
                  </label>
                  <input value={nombreEspecie} onChange={e => setNombreEspecie(e.target.value)}
                    placeholder="ej: Morpho didius, Dynastes hercules..."
                    style={{ width: '100%', background: BG2, border: `1px solid ${BD}`,
                      color: '#e8d5a3', padding: '8px 10px', borderRadius: 6, fontSize: 13,
                      fontFamily: 'Georgia,serif', boxSizing: 'border-box' as any }}
                  />
                </div>

                {/* Precios */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[['precioMinorista', setPrecioMinorista, '💰 Precio minorista (USD)', precioMinorista],
                    ['precioMayorista', setPrecioMayorista, '📦 Precio mayorista (USD)', precioMayorista]].map(([id, set, label, val]) => (
                    <div key={id as string}>
                      <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>{label as string}</label>
                      <input value={val as string} onChange={e => (set as any)(e.target.value)}
                        placeholder="ej: 45"
                        style={{ width: '100%', background: BG2, border: `1px solid ${BD}`,
                          color: G, padding: '8px 10px', borderRadius: 6, fontSize: 14,
                          fontFamily: 'Georgia,serif', boxSizing: 'border-box' as any }}
                      />
                    </div>
                  ))}
                </div>

                {/* Oferta especial */}
                <div>
                  <label style={{ fontSize: 11, color: '#6b5a2e', display: 'block', marginBottom: 6 }}>
                    🎯 Oferta especial (opcional)
                  </label>
                  <input value={oferta} onChange={e => setOferta(e.target.value)}
                    placeholder="ej: 20% descuento en pedidos +10 unidades"
                    style={{ width: '100%', background: BG2, border: `1px solid ${BD}`,
                      color: '#e8d5a3', padding: '8px 10px', borderRadius: 6, fontSize: 12,
                      fontFamily: 'Georgia,serif', boxSizing: 'border-box' as any }}
                  />
                </div>

                {/* Resumen de configuración */}
                <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 8, padding: 14 }}>
                  <div style={{ fontSize: 11, color: '#4a3a1a', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Resumen
                  </div>
                  <div style={{ fontSize: 12, color: '#8a7040', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div>📦 {rubro?.nombre}</div>
                    <div>🌍 {pais?.nombre} — {pais?.idioma.toUpperCase()}</div>
                    <div>📱 {formato?.nombre} para {redSocial}</div>
                    <div>📋 {tipoAviso?.nombre}</div>
                  </div>
                </div>
              </div>

              {/* Preview cultural */}
              <div>
                <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 10 }}>
                  🎨 Preview de paleta cultural — {pais?.nombre}
                </div>
                <div style={{ background: paleta.bg, borderRadius: 12, overflow: 'hidden',
                  border: `1px solid ${BD}`, aspectRatio: '1/1', display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 }}>
                  {imagenUrl && (
                    <img src={imagenUrl} alt="" style={{ width: '60%', aspectRatio: '1/1',
                      objectFit: 'contain', borderRadius: 8 }}/>
                  )}
                  <div style={{ color: paleta.text, fontSize: 18, fontWeight: 700, textAlign: 'center',
                    fontStyle: 'italic' }}>
                    {nombreEspecie || rubro?.nombre}
                  </div>
                  {precioMinorista && (
                    <div style={{ color: paleta.accent, fontSize: 22, fontWeight: 700 }}>
                      ${precioMinorista} USD
                    </div>
                  )}
                  <div style={{ background: paleta.accent, color: paleta.bg||'#000',
                    padding: '8px 20px', borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
                    House Insects of Peru
                  </div>
                  <div style={{ color: paleta.text, fontSize: 10, opacity: 0.6, textAlign: 'center' }}>
                    SERFOR · CITES · RUC 20447397804
                  </div>
                </div>
              </div>
            </div>

            <button onClick={() => setPaso(5)}
              style={{ marginTop: 20, padding: '10px 24px', borderRadius: 8, cursor: 'pointer',
                background: G, color: '#0d0800', border: 'none', fontWeight: 700, fontSize: 14,
                fontFamily: 'Georgia,serif' }}>
              Generar Aviso con IA →
            </button>
          </div>
        )}

        {/* ══ PASO 5: GENERAR ═══════════════════════════════════════ */}
        {paso === 5 && (
          <div>
            <h2 style={{ color: G, marginBottom: 6 }}>5. Aviso generado con IA</h2>
            <p style={{ color: '#6b5a2e', fontSize: 13, marginBottom: 20 }}>
              {rubro?.nombre} · {pais?.nombre} · {formato?.nombre} · {redSocial}
            </p>

            {!aviso && !generando && (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🌍</div>
                <p style={{ color: '#6b5a2e', marginBottom: 20 }}>
                  La IA generará el aviso culturalmente adaptado para {pais?.nombre} en {pais?.idioma.toUpperCase()}
                </p>
                <button onClick={generarAviso}
                  style={{ padding: '14px 32px', borderRadius: 10, cursor: 'pointer',
                    background: G, color: '#0d0800', border: 'none', fontWeight: 700, fontSize: 16,
                    fontFamily: 'Georgia,serif' }}>
                  🚀 Generar Aviso con IA
                </button>
              </div>
            )}

            {generando && (
              <div style={{ textAlign: 'center', padding: 60 }}>
                <div style={{ fontSize: 48, marginBottom: 16, animation: 'spin 2s linear infinite' }}>⚙️</div>
                <p style={{ color: G, fontSize: 16 }}>Generando aviso para {pais?.nombre}...</p>
                <p style={{ color: '#6b5a2e', fontSize: 12 }}>
                  Adaptando culturalmente para {continente?.nombre}
                </p>
              </div>
            )}

            {aviso && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>

                {/* Contenido generado */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                  {/* Titular */}
                  <div style={{ background: BG2, border: `1px solid ${G}`, borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                      Titular principal ({pais?.idioma.toUpperCase()})
                    </div>
                    <div style={{ fontSize: 20, color: G, fontWeight: 700, marginBottom: 4 }}>
                      {aviso.titular}
                    </div>
                    <div style={{ fontSize: 13, color: '#8a7040', marginBottom: 8 }}>
                      ES: {aviso.titular_es}
                    </div>
                    <button onClick={() => copiar(aviso.titular)}
                      style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                        background: 'rgba(201,168,76,0.1)', color: G, border: `1px solid ${BD}` }}>
                      📋 Copiar
                    </button>
                  </div>

                  {/* Subtítulo */}
                  <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Subtítulo</div>
                    <div style={{ fontSize: 14, color: '#e8d5a3', marginBottom: 8 }}>{aviso.subtitulo}</div>
                    <button onClick={() => copiar(aviso.subtitulo)}
                      style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                        background: 'rgba(201,168,76,0.1)', color: G, border: `1px solid ${BD}` }}>
                      📋 Copiar
                    </button>
                  </div>

                  {/* Cuerpo */}
                  <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Texto principal</div>
                    <div style={{ fontSize: 13, color: '#e8d5a3', lineHeight: 1.7, marginBottom: 4 }}>{aviso.cuerpo}</div>
                    <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 8, fontStyle: 'italic' }}>ES: {aviso.cuerpo_es}</div>
                    <button onClick={() => copiar(aviso.cuerpo)}
                      style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                        background: 'rgba(201,168,76,0.1)', color: G, border: `1px solid ${BD}` }}>
                      📋 Copiar
                    </button>
                  </div>

                  {/* CTA + Hashtags */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Botón CTA</div>
                      <div style={{ display: 'inline-block', background: paleta.accent, color: paleta.bg||'#000',
                        padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                        {aviso.cta}
                      </div>
                      <br/>
                      <button onClick={() => copiar(aviso.cta)}
                        style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                          background: 'rgba(201,168,76,0.1)', color: G, border: `1px solid ${BD}` }}>
                        📋 Copiar
                      </button>
                    </div>
                    <div style={{ background: BG2, border: `1px solid ${BD}`, borderRadius: 10, padding: 14 }}>
                      <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Hashtags</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                        {aviso.hashtags?.map((h: string) => (
                          <span key={h} style={{ fontSize: 11, color: paleta.accent, background: 'rgba(201,168,76,0.08)',
                            padding: '3px 8px', borderRadius: 4 }}>{h}</span>
                        ))}
                      </div>
                      <button onClick={() => copiar(aviso.hashtags?.join(' '))}
                        style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                          background: 'rgba(201,168,76,0.1)', color: G, border: `1px solid ${BD}` }}>
                        📋 Copiar todos
                      </button>
                    </div>
                  </div>

                  {/* Mensaje WhatsApp/WeChat */}
                  <div style={{ background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.2)',
                    borderRadius: 10, padding: 16 }}>
                    <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                      💬 Mensaje WhatsApp / WeChat
                    </div>
                    <div style={{ fontSize: 13, color: '#e8d5a3', lineHeight: 1.7, marginBottom: 8 }}>
                      {aviso.mensaje_whatsapp}
                    </div>
                    <button onClick={() => copiar(aviso.mensaje_whatsapp)}
                      style={{ fontSize: 11, padding: '4px 10px', borderRadius: 5, cursor: 'pointer',
                        background: 'rgba(37,211,102,0.15)', color: '#25d366', border: '1px solid rgba(37,211,102,0.3)' }}>
                      📋 Copiar mensaje
                    </button>
                  </div>

                  {/* Ángulo cultural */}
                  <div style={{ background: 'rgba(201,168,76,0.05)', border: `1px solid ${BD}`,
                    borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 10, color: '#4a3a1a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
                      🧠 Ángulo cultural — por qué funciona en {pais?.nombre}
                    </div>
                    <div style={{ fontSize: 12, color: '#8a7040', lineHeight: 1.6 }}>
                      {aviso.angulo_cultural}
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div style={{ background: BG2, border: `1px solid ${G}`, borderRadius: 10, padding: 14, marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: G, fontWeight: 700, marginBottom: 10 }}>🚀 Publicar este aviso</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <button onClick={async () => {
                        const res = await fetch('/api/banners', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ accion: 'crear', empresa: 'House Insects of Peru',
                            titulo: aviso.titular, subtitulo: aviso.subtitulo, cta: aviso.cta,
                            url: 'https://houseinsectsofperu.com/catalogo/especimenes',
                            imagen: imagenUrl, color: paleta.bg, colorTexto: paleta.accent,
                            espacioId: 'hero', rubros: [rubro?.id || 'todos'],
                            idiomas: [pais?.idioma || 'es'], activo: true }) })
                        const d = await res.json()
                        if (d.ok) { alert('Banner publicado en website') } else { alert('Error: ' + d.error) }
                      }} style={{ width:'100%', padding:'10px', borderRadius:8, cursor:'pointer',
                        background:'rgba(76,175,80,0.15)', color:'#4caf50', border:'1px solid rgba(76,175,80,0.3)',
                        fontWeight:700, fontSize:13, fontFamily:'Georgia,serif', textAlign:'left' }}>
                        🌐 Publicar como Banner en Website
                      </button>
                      <button onClick={async () => {
                        const res = await fetch('/api/publicaciones', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ accion: 'guardar', titular: aviso.titular, cuerpo: aviso.cuerpo,
                            imagen: imagenUrl, hashtags: aviso.hashtags, cta: aviso.cta,
                            url: 'https://houseinsectsofperu.com/catalogo/especimenes',
                            plataformas: pais?.redes || [], rubroId: rubro?.id || '',
                            paisId: pais?.id || '', idioma: pais?.idioma || 'es', formato: formato?.id || 'post' }) })
                        const d = await res.json()
                        if (d.ok) { alert('Guardado en publicaciones') } else { alert('Error') }
                      }} style={{ width:'100%', padding:'10px', borderRadius:8, cursor:'pointer',
                        background:'rgba(33,150,243,0.15)', color:'#2196f3', border:'1px solid rgba(33,150,243,0.3)',
                        fontWeight:700, fontSize:13, fontFamily:'Georgia,serif', textAlign:'left' }}>
                        📡 Guardar en Panel de Publicaciones
                      </button>
                      <div style={{ background:'#0a0600', border:`1px solid ${BD}`, borderRadius:6, padding:10 }}>
                        <div style={{ fontSize:10, color:'#4a3a1a', marginBottom:6 }}>🔗 Link automático:</div>
                        <div style={{ display:'flex', gap:6 }}>
                          <input readOnly value={nombreEspecie ? `https://houseinsectsofperu.com/catalogo/especimenes?busq=${encodeURIComponent(nombreEspecie)}` : 'https://houseinsectsofperu.com/catalogo/especimenes'}
                            style={{ flex:1, background:'transparent', border:'none', color:'#a08040', fontSize:10, fontFamily:'monospace' }}/>
                          <button onClick={() => navigator.clipboard.writeText(nombreEspecie ? `https://houseinsectsofperu.com/catalogo/especimenes?busq=${encodeURIComponent(nombreEspecie)}` : 'https://houseinsectsofperu.com/catalogo/especimenes')}
                            style={{ padding:'4px 8px', borderRadius:4, cursor:'pointer', background:'rgba(201,168,76,0.1)', color:'#C9A84C', border:'1px solid #2a1f0a', fontSize:10 }}>
                            📋
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={generarAviso}
                      style={{ flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                        background: 'rgba(201,168,76,0.15)', color: G, border: `1px solid ${G}`,
                        fontWeight: 700, fontSize: 13, fontFamily: 'Georgia,serif' }}>
                      🔄 Regenerar
                    </button>
                    <button onClick={() => {
                      const todo = `${aviso.titular}\n\n${aviso.subtitulo}\n\n${aviso.cuerpo}\n\n${aviso.cta}\n\n${aviso.hashtags?.join(' ')}\n\n---\nMensaje WhatsApp:\n${aviso.mensaje_whatsapp}`
                      copiar(todo)
                    }} style={{ flex: 1, padding: '10px', borderRadius: 8, cursor: 'pointer',
                        background: G, color: '#0d0800', border: 'none',
                        fontWeight: 700, fontSize: 13, fontFamily: 'Georgia,serif' }}>
                      📋 Copiar todo
                    </button>
                  </div>
                </div>

                {/* Preview del aviso */}
                <div>
                  <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 10 }}>
                    👁 Preview — {formato?.nombre}
                  </div>
                  <div style={{ background: paleta.bg, borderRadius: 12, overflow: 'hidden',
                    border: `2px solid ${paleta.accent}`, padding: 20,
                    minHeight: formato?.id === 'story' ? 400 : 250 }}>
                    {imagenUrl && (
                      <img src={imagenUrl} alt="" style={{ width: '100%', maxHeight: 180,
                        objectFit: 'contain', borderRadius: 8, marginBottom: 12 }}/>
                    )}
                    <div style={{ color: paleta.accent, fontSize: 10, textTransform: 'uppercase',
                      letterSpacing: 2, marginBottom: 6 }}>
                      House Insects of Peru · {continente?.icono} {pais?.nombre}
                    </div>
                    <div style={{ color: paleta.text, fontSize: 18, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>
                      {aviso.titular}
                    </div>
                    <div style={{ color: paleta.text, fontSize: 12, opacity: 0.8, marginBottom: 8, lineHeight: 1.5 }}>
                      {aviso.subtitulo}
                    </div>
                    {precioMinorista && (
                      <div style={{ color: paleta.accent, fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                        ${precioMinorista} USD
                      </div>
                    )}
                    <div style={{ display: 'inline-block', background: paleta.accent,
                      color: paleta.bg||'#000', padding: '8px 20px', borderRadius: 6,
                      fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                      {aviso.cta}
                    </div>
                    <div style={{ fontSize: 10, color: paleta.text, opacity: 0.5, marginBottom: 6 }}>
                      {aviso.emojis}
                    </div>
                    <div style={{ fontSize: 9, color: paleta.accent, opacity: 0.7 }}>
                      SERFOR · CITES · RUC 20447397804 · houseinsectsofperu.com
                    </div>
                  </div>

                  {/* Generar para otros países */}
                  <div style={{ marginTop: 16, background: BG2, border: `1px solid ${BD}`,
                    borderRadius: 10, padding: 14 }}>
                    <div style={{ fontSize: 11, color: '#6b5a2e', marginBottom: 10 }}>
                      🌍 Generar para otro país (mismo rubro/formato)
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {CONTINENTES.flatMap(c => c.paises).filter(p => p.id !== pais?.id).slice(0,8).map((p: any) => (
                        <button key={p.id} onClick={() => { setPais(p); setContinente(CONTINENTES.find(c=>c.paises.find((pp:any)=>pp.id===p.id))); setAviso(null); generarAviso() }}
                          style={{ padding: '4px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 10,
                            border: `1px solid ${BD}`, background: 'transparent', color: '#6b5a2e',
                            fontFamily: 'Georgia,serif' }}>
                          {p.nombre}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navegación */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30,
          paddingTop: 20, borderTop: `1px solid ${BD}` }}>
          {paso > 1 && (
            <button onClick={() => setPaso(paso-1)}
              style={{ padding: '8px 20px', borderRadius: 8, cursor: 'pointer',
                background: 'transparent', color: G, border: `1px solid ${BD}`,
                fontFamily: 'Georgia,serif', fontSize: 13 }}>
              ← Anterior
            </button>
          )}
          <div style={{ marginLeft: 'auto', fontSize: 11, color: '#4a3a1a', display: 'flex', alignItems: 'center' }}>
            {rubro && <span style={{ marginRight: 12 }}>📦 {rubro.icono} {rubro.nombre}</span>}
            {pais && <span style={{ marginRight: 12 }}>🌍 {pais.nombre}</span>}
            {formato && <span>📱 {formato.nombre}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
