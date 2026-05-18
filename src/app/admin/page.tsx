'use client'
import { useState } from 'react'

const COURIERS = [
  { id:'EXPORTAFACIL', nombre:'ExportaFácil / EMS', logo:'📬', color:'#2E7D32', desc:'Serpost · Económico · Perú' },
  { id:'DHL', nombre:'DHL Express', logo:'🟡', color:'#FFCC00', desc:'Premium · Mundial · 3-7 días' },
  { id:'FEDEX', nombre:'FedEx International', logo:'🟣', color:'#4D148C', desc:'USA/Canadá · 5-10 días' },
  { id:'UPS', nombre:'UPS Worldwide', logo:'🟤', color:'#8B4513', desc:'Corporativo · Mundial' },
  { id:'ARAMEX', nombre:'Aramex', logo:'🔴', color:'#CC0000', desc:'Medio Oriente · Asia · África' },
]

const RUBROS = [
  { id:'especimenes', nombre:'🦋 Especímenes Secos', licencias:['SERFOR','CITES'], partida:'9705.00.00.00' },
  { id:'nocturnas', nombre:'🌙 Mariposas Nocturnas', licencias:['SERFOR','CITES'], partida:'9705.00.00.00' },
  { id:'coleoptera', nombre:'🪲 Coleópteros', licencias:['SERFOR','CITES'], partida:'9705.00.00.00' },
  { id:'joyeria', nombre:'✨ Joyería Natural', licencias:['SUNAT'], partida:'7113.19.00.00' },
  { id:'artesanias', nombre:'🗿 Artesanías', licencias:['SUNAT','CITE'], partida:'9601.90.00.00' },
  { id:'frutas', nombre:'🍎 Frutas Exóticas', licencias:['SENASA'], partida:'0813.40.00.00' },
  { id:'semillas', nombre:'🌱 Semillas & Plantas', licencias:['SENASA','SERFOR'], partida:'1211.90.90.00' },
  { id:'alimentos', nombre:'🌶️ Alimentos', licencias:['SENASA','DIGESA'], partida:'2103.90.90.00' },
  { id:'superalimentos', nombre:'🫧 Superalimentos', licencias:['SENASA','DIGESA'], partida:'2106.90.99.00' },
  { id:'textileria', nombre:'🧶 Textilería & Alpaca', licencias:['SUNAT'], partida:'5112.19.00.00' },
  { id:'minerales', nombre:'💎 Minerales', licencias:['MEM','SUNAT'], partida:'2616.90.00.00' },
  { id:'hongos', nombre:'🍄 Hongos', licencias:['SENASA'], partida:'0712.30.00.00' },
  { id:'pinturas', nombre:'🎨 Pinturas & Arte', licencias:['SUNAT','MIN.CULTURA'], partida:'9701.10.00.00' },
  { id:'maderas', nombre:'🪵 Maderas Finas', licencias:['SERFOR'], partida:'4420.90.00.00' },
  { id:'herramientas', nombre:'🔬 Herramientas', licencias:['SUNAT'], partida:'9027.80.90.00' },
  { id:'esencias', nombre:'🌸 Esencias & Aceites', licencias:['SENASA','DIGESA'], partida:'3301.29.00.00' },
  { id:'rarezas', nombre:'🦋 Rarezas & Gynandro', licencias:['SERFOR','CITES'], partida:'9705.00.00.00' },
]

const SEGUROS = [
  { id:'NINGUNO', label:'Sin seguro', rango:'$0', color:'rgba(232,201,122,0.3)' },
  { id:'BASICO', label:'Básico', rango:'$1 - $500', color:'#7EC87E' },
  { id:'PREMIUM', label:'Premium', rango:'$500 - $10,000', color:'#C9A84C' },
  { id:'LLOYDS', label:"Lloyd's", rango:'$10,000 - $50,000', color:'#4A90D9' },
  { id:'CORPORATIVO', label:'Corporativo', rango:'$50,000+', color:'#9B59B6' },
]

const INCOTERMS = ['FOB','CIF','EXW','CFR','DDP']

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.7}}
  .admin-card{background:rgba(201,168,76,0.05);border:1px solid rgba(201,168,76,0.15);border-radius:12px;padding:20px;transition:transform 0.2s ease,box-shadow 0.2s ease,border-color 0.2s ease}
  .admin-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(201,168,76,0.15);border-color:rgba(201,168,76,0.35)}
  .admin-btn{transition:transform 0.15s ease,box-shadow 0.15s ease,background 0.15s ease}
  .admin-btn:hover{transform:translateY(-2px) scale(1.04);box-shadow:0 6px 16px rgba(0,0,0,0.3)}
  .courier-card{border:2px solid rgba(201,168,76,0.1);border-radius:10px;padding:12px;cursor:pointer;transition:all 0.2s ease;text-align:center}
  .courier-card:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(0,0,0,0.3)}
  .courier-card.selected{border-color:#C9A84C;background:rgba(201,168,76,0.12)}
  .rubro-card{border:1px solid rgba(201,168,76,0.1);border-radius:8px;padding:10px;cursor:pointer;transition:all 0.18s ease}
  .rubro-card:hover{background:rgba(201,168,76,0.08);transform:translateX(4px)}
  .rubro-card.selected{border-color:#C9A84C;background:rgba(201,168,76,0.1)}
  .seguro-card{border:1px solid rgba(201,168,76,0.1);border-radius:8px;padding:10px;cursor:pointer;transition:all 0.18s ease;text-align:center}
  .seguro-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.2)}
  .seguro-card.selected{border-color:#C9A84C}
  .field-group{margin-bottom:18px}
  .field-label{color:rgba(232,201,122,0.6);fontSize:.72rem;letterSpacing:.08em;marginBottom:6px;display:block}
  .field-input{width:100%;padding:10px 14px;background:#2A2010;color:#E8C97A;border:1px solid rgba(201,168,76,0.2);border-radius:8px;font-size:.85rem;outline:none;font-family:Georgia,serif;transition:border-color 0.2s ease}
  .field-input:focus{border-color:#C9A84C}
  .tab-btn{padding:8px 16px;border-radius:20px;cursor:pointer;font-size:.75rem;font-family:Georgia,serif;border:1px solid rgba(201,168,76,0.2);transition:all 0.18s ease}
  .tab-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
  .tab-btn.active{background:#C9A84C;color:#1A1209;font-weight:700;border-color:#C9A84C}
  .tab-btn.inactive{background:rgba(201,168,76,0.06);color:#C9A84C}
  .licencia-badge{display:inline-block;padding:3px 10px;border-radius:12px;font-size:.65rem;letter-spacing:.06em;font-weight:700;margin:2px}
  .save-btn{background:linear-gradient(135deg,#C9A84C,#E8C97A);color:#1A1209;padding:14px 32px;border-radius:8px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;font-family:Georgia,serif;transition:transform 0.18s ease,box-shadow 0.18s ease;width:100%;margin-top:20px}
  .save-btn:hover{transform:translateY(-3px);box-shadow:0 10px 30px rgba(201,168,76,0.4)}
  .section-title{color:#E8C97A;font-size:.9rem;font-weight:700;letter-spacing:.1em;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid rgba(201,168,76,0.15)}
`

export default function AdminPage() {
  const [tab, setTab] = useState('especie')
  const [rubroSel, setRubroSel] = useState('especimenes')
  const [courierSel, setCourierSel] = useState('EXPORTAFACIL')
  const [seguroSel, setSeguroSel] = useState('BASICO')
  const [incoterm, setIncoterm] = useState('FOB')
  const [saved, setSaved] = useState(false)

  const rubroActual = RUBROS.find(r => r.id === rubroSel)!

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'0'}}>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={{background:'linear-gradient(135deg,#1A1209,#2A1A08)',borderBottom:'1px solid rgba(201,168,76,0.2)',padding:'16px 24px',display:'flex',alignItems:'center',gap:16,position:'sticky',top:0,zIndex:50}}>
        <img src="/logo-house-insects-peru.png" style={{width:44,height:44,objectFit:'contain'}} onError={(e)=>{(e.target as HTMLImageElement).src='/logo.png'}}/>
        <div>
          <div style={{color:'#E8C97A',fontSize:'1rem',fontWeight:700,letterSpacing:'.1em'}}>HOUSE INSECTS OF PERU</div>
          <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',letterSpacing:'.12em'}}>PANEL DE ADMINISTRACIÓN · RUC 20447397804</div>
        </div>
        <div style={{marginLeft:'auto',display:'flex',gap:8}}>
          <a href="/" className="admin-btn" style={{background:'rgba(201,168,76,0.1)',color:'#C9A84C',padding:'8px 16px',borderRadius:6,fontSize:'.75rem',textDecoration:'none',border:'1px solid rgba(201,168,76,0.2)'}}>← Web</a>
          <a href="https://houseinsectsofperu.sanity.studio" target="_blank" className="admin-btn" style={{background:'rgba(201,168,76,0.1)',color:'#C9A84C',padding:'8px 16px',borderRadius:6,fontSize:'.75rem',textDecoration:'none',border:'1px solid rgba(201,168,76,0.2)'}}>Studio ↗</a>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'24px 16px'}}>

        {/* TABS */}
        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24}}>
          {[
            {id:'especie',label:'🦋 Nueva Especie'},
            {id:'rubros',label:'📦 Rubros & Licencias'},
            {id:'logistica',label:'✈️ Logística'},
            {id:'precios',label:'💰 Precios & Drawback'},
            {id:'qr',label:'🔍 Códigos QR'},
            {id:'sunat',label:'📄 SUNAT & Docs'},
            {id:'pagos',label:'💳 Pagos & Bancos'},
            {id:'sunat',label:'📄 SUNAT & Docs'},
            {id:'pagos',label:'💳 Pagos & Bancos'},
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className={`tab-btn ${tab===t.id?'active':'inactive'}`}>{t.label}</button>
          ))}
        </div>

        {/* TAB: NUEVA ESPECIE */}
        {tab==='especie'&&(
          <div style={{animation:'fadeInUp 0.5s ease'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div className="admin-card">
                <div className="section-title">📝 IDENTIFICACIÓN</div>
                <div className="field-group">
                  <label className="field-label">NOMBRE CIENTÍFICO *</label>
                  <input className="field-input" placeholder="Ej: Morpho didius tingomaria"/>
                </div>
                <div className="field-group">
                  <label className="field-label">NOMBRE COMÚN</label>
                  <input className="field-input" placeholder="Ej: Morpho azul gigante"/>
                </div>
                <div className="field-group">
                  <label className="field-label">LOCALIDAD</label>
                  <input className="field-input" defaultValue="Tingo María, Perú"/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <div className="field-group">
                    <label className="field-label">FAMILIA</label>
                    <input className="field-input" placeholder="Morphidae"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">TAMAÑO (cm)</label>
                    <input className="field-input" placeholder="12-15"/>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="section-title">⭐ CALIDAD & SEXO</div>
                <div className="field-group">
                  <label className="field-label">CALIDAD</label>
                  <select className="field-input" style={{cursor:'pointer'}}>
                    <option value="A1">✅ A1 — Perfecto espécimen</option>
                    <option value="A1/A1-">⭐ A1/A1- — Casi perfecto</option>
                    <option value="A1-">🔸 A1- — Pequeños defectos</option>
                    <option value="VGA2">🔶 VGA2 — Segunda calidad buena</option>
                    <option value="A2">🔴 A2 — Segunda calidad</option>
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label">SEXO</label>
                  <select className="field-input" style={{cursor:'pointer'}}>
                    <option value="M">♂ M — Macho</option>
                    <option value="F">♀ F — Hembra</option>
                    <option value="P">⚥ P — Par (M+F)</option>
                    <option value="EP">🌱 EP — Ex-pupae criado</option>
                    <option value="S">🎁 S — Set con descuento</option>
                    <option value="M or F">♂♀ M or F — Ambos disponibles</option>
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label">ORDEN TAXONÓMICO</label>
                  <select className="field-input" style={{cursor:'pointer'}}>
                    <option>Lepidoptera Diurnae</option>
                    <option>Moths Nocturnas</option>
                    <option>Coleoptera</option>
                    <option>Arthropoda</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:16}}>
              <div className="admin-card">
                <div className="section-title">💵 PRECIOS USD</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                  <div className="field-group">
                    <label className="field-label">PRECIO RETAIL</label>
                    <input className="field-input" placeholder="$0.00" type="number"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">PRECIO MAYOREO</label>
                    <input className="field-input" placeholder="$0.00" type="number"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">PRECIO FOB</label>
                    <input className="field-input" placeholder="$0.00" type="number"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">PRECIO CIF</label>
                    <input className="field-input" placeholder="$0.00" type="number"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">STOCK</label>
                    <input className="field-input" placeholder="0" type="number"/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">CANT. MÍNIMA MAYOREO</label>
                    <input className="field-input" placeholder="10" type="number"/>
                  </div>
                </div>
              </div>

              <div className="admin-card">
                <div className="section-title">📸 FOTOS & VIDEO</div>
                {['Foto Frente','Foto Lado','Foto Reverso'].map(f=>(
                  <div key={f} style={{border:'1px dashed rgba(201,168,76,0.2)',borderRadius:8,padding:'12px',marginBottom:10,textAlign:'center',cursor:'pointer',transition:'all 0.2s ease'}}
                    onMouseOver={e=>{(e.currentTarget as HTMLElement).style.borderColor='#C9A84C';(e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.05)'}}
                    onMouseOut={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.2)';(e.currentTarget as HTMLElement).style.background='transparent'}}>
                    <div style={{fontSize:'1.5rem',marginBottom:4}}>📸</div>
                    <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.72rem'}}>{f}</div>
                    <div style={{color:'rgba(232,201,122,0.3)',fontSize:'.62rem'}}>Drag & drop o click</div>
                  </div>
                ))}
                <div className="field-group" style={{marginTop:8}}>
                  <label className="field-label">🎥 VIDEO URL (Cloudinary)</label>
                  <input className="field-input" placeholder="https://res.cloudinary.com/..."/>
                </div>
              </div>
            </div>

            <button className="save-btn" onClick={handleSave}>
              {saved ? '✅ ¡Guardado exitosamente!' : '💾 Guardar en Sanity Studio'}
            </button>
          </div>
        )}

        {/* TAB: RUBROS & LICENCIAS */}
        {tab==='rubros'&&(
          <div style={{animation:'fadeInUp 0.5s ease',display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="admin-card">
              <div className="section-title">📦 SELECCIONA EL RUBRO</div>
              <div style={{display:'flex',flexDirection:'column',gap:6,maxHeight:500,overflowY:'auto'}}>
                {RUBROS.map(r=>(
                  <div key={r.id} onClick={()=>setRubroSel(r.id)} className={`rubro-card ${rubroSel===r.id?'selected':''}`}>
                    <div style={{color:'#E8C97A',fontSize:'.82rem'}}>{r.nombre}</div>
                    <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem',marginTop:2}}>{r.partida}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-card">
              <div className="section-title">🏛️ LICENCIAS & PARTIDA ARANCELARIA</div>
              <div style={{marginBottom:16}}>
                <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.7rem',marginBottom:8}}>RUBRO SELECCIONADO</div>
                <div style={{color:'#E8C97A',fontSize:'1.1rem',marginBottom:12}}>{rubroActual.nombre}</div>
                <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.7rem',marginBottom:8}}>PARTIDA ARANCELARIA</div>
                <div style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:'12px',fontFamily:'monospace',color:'#C9A84C',fontSize:'1rem',marginBottom:16}}>{rubroActual.partida}</div>
                <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.7rem',marginBottom:8}}>LICENCIAS REQUERIDAS</div>
                <div>
                  {rubroActual.licencias.map(l=>(
                    <span key={l} className="licencia-badge" style={{
                      background: l==='SERFOR'?'rgba(46,125,50,0.2)':l==='CITES'?'rgba(74,144,217,0.2)':l==='SENASA'?'rgba(255,152,0,0.2)':'rgba(201,168,76,0.1)',
                      color: l==='SERFOR'?'#7EC87E':l==='CITES'?'#4A90D9':l==='SENASA'?'#FFA726':'#C9A84C',
                      border: `1px solid ${l==='SERFOR'?'rgba(46,125,50,0.4)':l==='CITES'?'rgba(74,144,217,0.4)':l==='SENASA'?'rgba(255,152,0,0.4)':'rgba(201,168,76,0.3)'}`
                    }}>{l}</span>
                  ))}
                </div>
                <div style={{marginTop:16,color:'rgba(232,201,122,0.5)',fontSize:'.7rem',marginBottom:8}}>INCOTERM</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {INCOTERMS.map(i=>(
                    <button key={i} onClick={()=>setIncoterm(i)} style={{
                      padding:'6px 14px',borderRadius:6,cursor:'pointer',fontSize:'.75rem',fontFamily:'Georgia,serif',
                      background:incoterm===i?'#C9A84C':'rgba(201,168,76,0.08)',
                      color:incoterm===i?'#1A1209':'#C9A84C',
                      border:`1px solid ${incoterm===i?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                      transition:'all 0.15s ease'
                    }}>{i}</button>
                  ))}
                </div>
                <div style={{marginTop:16,color:'rgba(232,201,122,0.5)',fontSize:'.7rem',marginBottom:8}}>DRAWBACK EXPORTACIÓN</div>
                <div style={{background:'rgba(126,200,126,0.1)',border:'1px solid rgba(126,200,126,0.3)',borderRadius:8,padding:'10px',color:'#7EC87E',fontSize:'.8rem'}}>
                  ✅ Aplica Drawback — Restitución arancelaria disponible
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: LOGÍSTICA */}
        {tab==='logistica'&&(
          <div style={{animation:'fadeInUp 0.5s ease'}}>
            <div className="admin-card" style={{marginBottom:16}}>
              <div className="section-title">✈️ SELECCIONA EL COURIER</div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:12}}>
                {COURIERS.map(c=>(
                  <div key={c.id} onClick={()=>setCourierSel(c.id)} className={`courier-card ${courierSel===c.id?'selected':''}`}
                    style={{background:courierSel===c.id?`${c.color}15`:'rgba(201,168,76,0.03)'}}>
                    <div style={{fontSize:'2rem',marginBottom:6}}>{c.logo}</div>
                    <div style={{color:'#E8C97A',fontSize:'.78rem',fontWeight:700,marginBottom:4}}>{c.nombre}</div>
                    <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.62rem'}}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div className="admin-card">
                <div className="section-title">🛡️ SEGURO DE ENVÍO</div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  {SEGUROS.map(s=>(
                    <div key={s.id} onClick={()=>setSeguroSel(s.id)} className={`seguro-card ${seguroSel===s.id?'selected':''}`}
                      style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderColor:seguroSel===s.id?s.color:'rgba(201,168,76,0.1)'}}>
                      <span style={{color:'#E8C97A',fontSize:'.8rem'}}>{s.label}</span>
                      <span style={{color:s.color,fontSize:'.75rem',fontWeight:700}}>{s.rango}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="admin-card">
                <div className="section-title">📦 EMBALAJE & ENVÍO</div>
                <div className="field-group">
                  <label className="field-label">PESO ESTIMADO (gramos)</label>
                  <input className="field-input" placeholder="0" type="number"/>
                </div>
                <div className="field-group">
                  <label className="field-label">DIMENSIONES (cm)</label>
                  <input className="field-input" placeholder="Largo x Ancho x Alto"/>
                </div>
                <div className="field-group">
                  <label className="field-label">TIPO DE EMBALAJE</label>
                  <select className="field-input" style={{cursor:'pointer'}}>
                    <option>Caja individual con espuma</option>
                    <option>Caja múltiple compartimentos</option>
                    <option>Tubo protector</option>
                    <option>Sobre reforzado</option>
                  </select>
                </div>
                <div className="field-group">
                  <label className="field-label">NOTAS DE ENVÍO</label>
                  <textarea className="field-input" rows={3} placeholder="Instrucciones especiales de manejo..."/>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PRECIOS & DRAWBACK */}
        {tab==='precios'&&(
          <div style={{animation:'fadeInUp 0.5s ease',display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="admin-card">
              <div className="section-title">💵 ESTRUCTURA DE PRECIOS</div>
              {[
                {label:'PRECIO RETAIL (USD)',placeholder:'$0.00',help:'Precio para clientes individuales'},
                {label:'PRECIO MAYOREO (USD)',placeholder:'$0.00',help:'Para pedidos de 10+ unidades'},
                {label:'PRECIO FOB (USD)',placeholder:'$0.00',help:'Free On Board — Puerto Callao'},
                {label:'PRECIO CIF (USD)',placeholder:'$0.00',help:'Cost Insurance Freight'},
                {label:'PRECIO EXW (USD)',placeholder:'$0.00',help:'Ex Works — Tingo María'},
              ].map(f=>(
                <div key={f.label} className="field-group">
                  <label className="field-label">{f.label}</label>
                  <input className="field-input" placeholder={f.placeholder} type="number"/>
                  <div style={{color:'rgba(232,201,122,0.3)',fontSize:'.62rem',marginTop:3}}>{f.help}</div>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <div className="section-title">💰 DRAWBACK & BENEFICIOS</div>
              <div style={{background:'rgba(126,200,126,0.08)',border:'1px solid rgba(126,200,126,0.2)',borderRadius:10,padding:16,marginBottom:16}}>
                <div style={{color:'#7EC87E',fontSize:'.85rem',fontWeight:700,marginBottom:8}}>✅ Régimen MYPE</div>
                <div style={{color:'rgba(232,201,122,0.6)',fontSize:'.78rem',lineHeight:1.7}}>
                  • Ley Amazónica N°27037<br/>
                  • Exoneración IGV en ventas locales<br/>
                  • Drawback 3% sobre valor FOB<br/>
                  • Beneficios tributarios amazónicos
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">TIPO DE BIEN/SERVICIO</label>
                <select className="field-input" style={{cursor:'pointer'}}>
                  <option value="200">Código 200 — Bienes tangibles</option>
                  <option value="300">Código 300 — Servicios</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">MONEDA DE FACTURACIÓN</label>
                <select className="field-input" style={{cursor:'pointer'}}>
                  <option>USD — Dólar americano</option>
                  <option>EUR — Euro</option>
                  <option>PEN — Sol peruano</option>
                  <option>CNY — Yuan chino</option>
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">FORMA DE PAGO</label>
                <select className="field-input" style={{cursor:'pointer'}}>
                  <option>Transferencia SWIFT</option>
                  <option>Payoneer Business</option>
                  <option>Wise</option>
                  <option>Western Union</option>
                  <option>MoneyGram</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CÓDIGOS QR */}
        {tab==='qr'&&(
          <div style={{animation:'fadeInUp 0.5s ease',display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="admin-card">
              <div className="section-title">🔍 TIPO DE CÓDIGO QR</div>
              {[
                {id:'ESPECIMEN',label:'QR Espécimen Individual',desc:'Identificación única por espécimen',icon:'🦋'},
                {id:'LOTE',label:'QR Lote / Batch',desc:'Para envíos de múltiples unidades',icon:'📦'},
                {id:'CITES',label:'QR Certificado CITES',desc:'Vinculado al permiso CITES',icon:'🏛️'},
                {id:'TRACKING',label:'QR Tracking de Envío',desc:'Rastreo en tiempo real del paquete',icon:'🔍'},
              ].map(q=>(
                <div key={q.id} className="rubro-card" style={{marginBottom:8,display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontSize:'1.5rem'}}>{q.icon}</span>
                  <div>
                    <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{q.label}</div>
                    <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.68rem'}}>{q.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <div className="section-title">🔢 GENERAR CÓDIGO QR</div>
              <div className="field-group">
                <label className="field-label">SKU / CÓDIGO ÚNICO</label>
                <input className="field-input" placeholder="HIP-2026-MORPH-001"/>
              </div>
              <div className="field-group">
                <label className="field-label">NÚMERO DE PERMISO SERFOR</label>
                <input className="field-input" placeholder="SRF-2026-XXXXX"/>
              </div>
              <div className="field-group">
                <label className="field-label">NÚMERO CITES</label>
                <input className="field-input" placeholder="CITES-PE-2026-XXXXX"/>
              </div>
              <div style={{background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:10,padding:20,textAlign:'center',marginTop:8}}>
                <div style={{fontSize:'4rem',marginBottom:8}}>📱</div>
                <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.75rem'}}>El QR se genera automáticamente al guardar</div>
                <div style={{color:'rgba(232,201,122,0.3)',fontSize:'.65rem',marginTop:4}}>Compatible con todos los dispositivos</div>
              </div>
            </div>
          </div>
        )}


        {tab==='sunat'&&(
          <div style={{animation:'fadeInUp 0.5s ease',display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="admin-card">
              <div className="section-title">🧾 DOCUMENTOS SUNAT</div>
              {[{icon:'🧾',doc:'Factura Electrónica',serie:'F001'},{icon:'🌍',doc:'Factura Exportación',serie:'E001'},{icon:'🚚',doc:'Guía de Remisión',serie:'T001'},{icon:'📦',doc:'Packing List',serie:'PL-2026'},{icon:'💰',doc:'Liquidación de Compra',serie:'LC001'}].map(d=>(
                <div key={d.doc} className="rubro-card" style={{marginBottom:8,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'flex',gap:10,alignItems:'center'}}><span style={{fontSize:'1.3rem'}}>{d.icon}</span><span style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700}}>{d.doc}</span></div>
                  <span style={{color:'#C9A84C',fontSize:'.7rem',fontFamily:'monospace'}}>{d.serie}</span>
                </div>
              ))}
              <div style={{marginTop:12,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12}}>
                <div style={{color:'#C9A84C',fontSize:'.9rem',fontWeight:700}}>RUC 20447397804</div>
                <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>HOUSE INSECTS OF PERU E.I.R.L.</div>
              </div>
            </div>
            <div className="admin-card">
              <div className="section-title">🏛️ CERTIFICACIONES</div>
              {[{icon:'🌿',cert:'SERFOR',color:'#7EC87E'},{icon:'🏛️',cert:'CITES',color:'#4A90D9'},{icon:'🌱',cert:'SENASA',color:'#FFA726'},{icon:'🔬',cert:'Fitosanitario',color:'#AB47BC'},{icon:'🐄',cert:'Zoosanitario',color:'#EF5350'},{icon:'📦',cert:'ExportaFácil Serpost',color:'#26C6DA'},{icon:'📮',cert:'Serpost Correo Común',color:'#1565C0'},{icon:'🏦',cert:'DHL/FedEx Aduanas',color:'#FFCC00'}].map(c=>(
                <div key={c.cert} className="rubro-card" style={{marginBottom:6,display:'flex',alignItems:'center',gap:10}}>
                  <span style={{fontSize:'1.2rem'}}>{c.icon}</span>
                  <span style={{color:'#E8C97A',fontSize:'.8rem',flex:1}}>{c.cert}</span>
                  <span style={{width:10,height:10,borderRadius:'50%',background:c.color,display:'inline-block'}}/>
                </div>
              ))}
              <div style={{marginTop:12,display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {[['N° SERFOR','SRF-2026'],['N° CITES','CITES-PE'],['N° SENASA','SEN-2026'],['N° FITOSANITARIO','FIT-2026']].map(([l,p])=>(
                  <div key={l} className="field-group"><label className="field-label">{l}</label><input className="field-input" placeholder={p}/></div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab==='pagos'&&(
          <div style={{animation:'fadeInUp 0.5s ease',display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="admin-card">
              <div className="section-title">🏦 BANCA INTERNACIONAL</div>
              {[{icon:'🏦',n:'First Bank',d:'WeChat·Alipay·Stripe Atlas',e:'En proceso'},{icon:'💼',n:'Kateno Business',d:'Recepción internacional',e:'En proceso'},{icon:'💳',n:'Stripe Atlas',d:'USA·Europa·Tarjetas',e:'Pendiente API'},{icon:'💼',n:'Payoneer Business',d:'B2B·Empresas·Museos',e:'Activo'},{icon:'💸',n:'Wise',d:'Transferencias internacionales',e:'Activo'},{icon:'💛',n:'Western Union',d:'Mundial',e:'Activo'},{icon:'💵',n:'MoneyGram',d:'Transferencias globales',e:'Activo'},{icon:'🏛️',n:'SWIFT Bancario',d:'Interbank·BBVA',e:'Activo'}].map(b=>(
                <div key={b.n} className="rubro-card" style={{marginBottom:7,display:'flex',alignItems:'center',gap:8,justifyContent:'space-between'}}>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}><span style={{fontSize:'1.2rem'}}>{b.icon}</span><div><div style={{color:'#E8C97A',fontSize:'.8rem',fontWeight:700}}>{b.n}</div><div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem'}}>{b.d}</div></div></div>
                  <span style={{fontSize:'.6rem',padding:'2px 7px',borderRadius:10,fontWeight:700,background:b.e==='Activo'?'rgba(126,200,126,0.15)':b.e==='En proceso'?'rgba(255,167,38,0.15)':'rgba(201,168,76,0.1)',color:b.e==='Activo'?'#7EC87E':b.e==='En proceso'?'#FFA726':'rgba(232,201,122,0.5)',whiteSpace:'nowrap'}}>{b.e}</span>
                </div>
              ))}
            </div>
            <div className="admin-card">
              <div className="section-title">📱 PAGOS DIGITALES</div>
              {[{icon:'🇵🇪',n:'Izipay',d:'Visa/Mastercard nacional',e:'Pendiente'},{icon:'🔵',n:'Google Pay',d:'Android/iOS mundial',e:'Pendiente'},{icon:'📱',n:'Yape',d:'Clientes peruanos BCP',e:'Activo'},{icon:'📲',n:'Plin',d:'BBVA/Interbank Perú',e:'Activo'},{icon:'🇨🇳',n:'Alipay',d:'China·Via First Bank',e:'En proceso'},{icon:'💚',n:'WeChat Pay',d:'China·API First Bank',e:'En proceso'}].map(p=>(
                <div key={p.n} className="rubro-card" style={{marginBottom:7,display:'flex',alignItems:'center',gap:8,justifyContent:'space-between'}}>
                  <div style={{display:'flex',gap:8,alignItems:'center'}}><span style={{fontSize:'1.2rem'}}>{p.icon}</span><div><div style={{color:'#E8C97A',fontSize:'.8rem',fontWeight:700}}>{p.n}</div><div style={{color:'rgba(232,201,122,0.4)',fontSize:'.6rem'}}>{p.d}</div></div></div>
                  <span style={{fontSize:'.6rem',padding:'2px 7px',borderRadius:10,fontWeight:700,background:p.e==='Activo'?'rgba(126,200,126,0.15)':p.e==='En proceso'?'rgba(255,167,38,0.15)':'rgba(201,168,76,0.1)',color:p.e==='Activo'?'#7EC87E':p.e==='En proceso'?'#FFA726':'rgba(232,201,122,0.5)',whiteSpace:'nowrap'}}>{p.e}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
