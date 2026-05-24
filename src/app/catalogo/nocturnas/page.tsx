'use client'
import ST from '@/components/ST'
import { useState } from 'react'
export default function NocturnasPage() {
  const [vista, setVista] = useState('frente')
  const [tipo, setTipo] = useState('coleoptera')
  const [marco, setMarco] = useState('rectangular')
  const [vidrio, setVidrio] = useState('normal')
  const [tamano, setTamano] = useState('80mm')

  const precioExtra = vidrio==='uv'?20:vidrio==='resina'?35:0

  const FAMILIAS = [
    {id:'Arctiidae',nm:'Arctiidae',e:[]},
    {id:'Castnia',nm:'Castnia',e:[]},
    {id:'Hepalidae',nm:'Hepalidae',e:[]},
    {id:'Saturnidae',nm:'Saturnidae',e:[]},
    {id:'Sphingidae',nm:'Sphingidae',e:[]},
    {id:'Uranidae',nm:'Uranidae',e:[]},
    {id:'Geometridae',nm:'Geometridae',e:[]},
    {id:'Noctuidae',nm:'Noctuidae',e:[]},
    {id:'Erebidae',nm:'Erebidae',e:[]},
    {id:'Acontiinae',nm:'Acontiinae',e:[]},
    {id:'Acronictinae',nm:'Acronictinae',e:[]},
    {id:'Agaristinae',nm:'Agaristinae',e:[]},
    {id:'Amphipyrinae',nm:'Amphipyrinae',e:[]},
    {id:'Bagisarinae',nm:'Bagisarinae',e:[]},
    {id:'Balsinae',nm:'Balsinae',e:[]},
    {id:'Bryophilinae',nm:'Bryophilinae',e:[]},
    {id:'Calpinae',nm:'Calpinae',e:[]},
    {id:'Catocalinae',nm:'Catocalinae',e:[]},
    {id:'Cocytiinae',nm:'Cocytiinae',e:[]},
    {id:'Condicinae',nm:'Condicinae',e:[]},
  ]
  const [famSel,setFamSel]=useState('Arctiidae')
  const famActual=FAMILIAS.find(f=>f.id===famSel)||FAMILIAS[0]

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'32px 16px'}}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .pc{animation:fadeInUp 0.6s ease both}
        .opt-btn{transition:all 0.18s ease;cursor:pointer}
        .opt-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(201,168,76,0.2)}
        .wa-btn{transition:transform 0.18s ease,box-shadow 0.18s ease}
        .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 20px rgba(37,211,102,0.4)}
        .esp-card{background:rgba(201,168,76,0.04);border:1px solid rgba(201,168,76,0.08);border-radius:8px;padding:10px;margin-bottom:8px;display:flex;gap:10px;align-items:center;transition:all 0.18s ease}
        .esp-card:hover{background:rgba(201,168,76,0.08);transform:translateX(4px);border-color:rgba(201,168,76,0.25)}
      
  @media(max-width:768px){
    .wa-btn{padding:14px 20px!important;fontSize:1rem!important;width:100%!important;display:block!important;textAlign:center!important;marginBottom:8px!important}
    .pieza-card{flexDirection:column!important}
    h1{fontSize:1.4rem!important}
  }
`}</style>
      <div className="pc" style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/" style={{color:'#C9A84C',fontSize:'1.2rem',fontWeight:700,textDecoration:'none',display:'inline-block',marginBottom:20,padding:'10px 20px',background:'rgba(201,168,76,0.15)',borderRadius:8,border:'1px solid rgba(201,168,76,0.4)'}}><ST t="← Inicio"/></a>

        <div style={{textAlign:'center',marginBottom:32}}>
          <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,marginBottom:12,objectFit:'contain'}}/></a>
          <div style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · MÁS DE 40 AÑOS DE EXPERIENCIA</div>
          <h1 style={{fontSize:'2rem',fontWeight:300,color:'#E8C97A',marginBottom:8}}><ST t="🪲 Cuadros de Mariposas Nocturnas Tropical"/></h1>
          <div style={{height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'12px auto',maxWidth:400}}/>
          <p style={{color:'rgba(232,201,122,0.6)',fontSize:'.85rem',lineHeight:1.9,maxWidth:700,margin:'0 auto'}}>
            Arctiidae · Saturnidae · Sphingidae, hércules, dinastidos metálicos, escorpiones, tarántulas y artrópodos amazónicos secos. Montados en marcos profundos, cúpulas y resina para coleccionistas y museos de élite. Certificado SERFOR + CITES.
          </p>
          <div style={{marginTop:12,color:'rgba(232,201,122,0.35)',fontSize:'.65rem',letterSpacing:'.15em'}}>
            PARTIDA 9705.21.00.00 · SERFOR · CITES · RUC 20447397804
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>

          {/* CONFIGURADOR */}
          <div style={{background:'rgba(201,168,76,0.05)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:14}}>🖼️ CONFIGURA TU CUADRO</div>

            <div style={{display:'flex',gap:6,justifyContent:'center',marginBottom:10}}>
              {['frente','lado','reverso','video'].map(v=>(
                <button key={v} onClick={()=>setVista(v)} className="opt-btn" style={{
                  padding:'4px 10px',borderRadius:16,fontSize:'.65rem',fontFamily:'Georgia,serif',
                  background:vista===v?'#C9A84C':'rgba(201,168,76,0.08)',
                  color:vista===v?'#1A1209':'#C9A84C',
                  border:`1px solid ${vista===v?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                }}>{v==='frente'?'📸 Frente':v==='lado'?'📸 Lado':v==='reverso'?'📸 Reverso':'🎥 Video'}</button>
              ))}
            </div>
            <div style={{width:'100%',height:180,background:'linear-gradient(135deg,#1A1209,#2A1A08)',border:'2px solid rgba(201,168,76,0.25)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',marginBottom:14}}>
              <a href="/" style={{display:"inline-block"}}><img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',opacity:.6,marginBottom:8}}/></a>
              <p style={{color:'rgba(232,201,122,0.4)',fontSize:'.7rem'}}><ST t="FOTO PRÓXIMAMENTE"/></p>
            </div>

            {/* TIPO */}
            <div style={{marginBottom:12}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>1️⃣ TIPO DE ESPECIE</div>
              <div style={{display:'flex',gap:8}}>
                {[{id:'coleoptera',nm:'🪲 Coleópteros'},{id:'artropodos',nm:'🦂 Artrópodos'}].map(o=>(
                  <button key={o.id} onClick={()=>setTipo(o.id)} className="opt-btn" style={{
                    padding:'6px 14px',borderRadius:20,fontSize:'.75rem',fontFamily:'Georgia,serif',
                    background:tipo===o.id?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:tipo===o.id?'#1A1209':'#C9A84C',
                    border:`1px solid ${tipo===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{<ST t={o.nm}/>}</button>
                ))}
              </div>
            </div>

            {/* TAMANO */}
            <div style={{marginBottom:12}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>📏 TAMAÑO (mm)</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {['40mm','60mm','80mm','100mm','120mm+'].map(t=>(
                  <button key={t} onClick={()=>setTamano(t)} className="opt-btn" style={{
                    padding:'5px 10px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif',
                    background:tamano===t?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:tamano===t?'#1A1209':'#C9A84C',
                    border:`1px solid ${tamano===t?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{t}</button>
                ))}
              </div>
            </div>

            {/* MARCO */}
            <div style={{marginBottom:12}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>2️⃣ FORMATO DE EXHIBICIÓN</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[
                  {id:'rectangular',nm:'⬛ Marco Profundo'},
                  {id:'cupula',nm:'🔮 Cúpula Victoriana'},
                  {id:'cubo',nm:'📦 Cubo Cristal'},
                  {id:'resina',nm:'💎 Resina Sólida'},
                ].map(o=>(
                  <button key={o.id} onClick={()=>setMarco(o.id)} className="opt-btn" style={{
                    padding:'5px 10px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif',
                    background:marco===o.id?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:marco===o.id?'#1A1209':'#C9A84C',
                    border:`1px solid ${marco===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{<ST t={o.nm}/>}</button>
                ))}
              </div>
            </div>

            {/* VIDRIO */}
            <div style={{marginBottom:14}}>
              <div style={{color:'rgba(232,201,122,0.5)',fontSize:'.65rem',letterSpacing:'.08em',marginBottom:8}}>3️⃣ TIPO DE PROTECCIÓN</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {[
                  {id:'normal',nm:'🔲 Cristal Normal',extra:0},
                  {id:'uv',nm:'☀️ Cristal UV Premium',extra:20},
                ].map(o=>(
                  <button key={o.id} onClick={()=>setVidrio(o.id)} className="opt-btn" style={{
                    padding:'5px 12px',borderRadius:16,fontSize:'.7rem',fontFamily:'Georgia,serif',
                    background:vidrio===o.id?'#C9A84C':'rgba(201,168,76,0.08)',
                    color:vidrio===o.id?'#1A1209':'#C9A84C',
                    border:`1px solid ${vidrio===o.id?'#C9A84C':'rgba(201,168,76,0.2)'}`,
                  }}>{<ST t={o.nm}/>}{o.extra>0?` +$${o.extra}`:''}</button>
                ))}
              </div>
            </div>

            {/* RESUMEN */}
            <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.2)',borderRadius:8,padding:12,marginBottom:14}}>
              <div style={{color:'#C9A84C',fontSize:'.7rem',fontWeight:700,marginBottom:6}}>📋 TU CONFIGURACIÓN:</div>
              <div style={{color:'rgba(232,201,122,0.7)',fontSize:'.72rem',lineHeight:1.8}}>
                {tipo==='coleoptera'?'🪲 Coleóptero':'🦂 Artrópodo'} · {tamano}<br/>
                🖼️ {marco==='rectangular'?'Marco Profundo':marco==='cupula'?'Cúpula Victoriana':marco==='cubo'?'Cubo Cristal':'Resina Sólida'}<br/>
                🛡️ {vidrio==='normal'?'Cristal Normal':'Cristal UV Premium'}
                {precioExtra>0&&<span style={{color:'#C9A84C'}}> (+${precioExtra} USD)</span>}
              </div>
            </div>

            <div style={{display:'flex',gap:8,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="https://wa.me/51940699405" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 940 699 405</a>
              <a href="https://wa.me/51920644433" target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'10px 16px',borderRadius:4,fontWeight:700,textDecoration:'none',fontSize:'.78rem'}}>💬 +51 920 644 433</a>
            </div>
          </div>

          {/* ESPECIES */}
          <div style={{background:'rgba(201,168,76,0.03)',border:'1px solid rgba(201,168,76,0.1)',borderRadius:12,padding:20}}>
            <div style={{color:'#C9A84C',fontSize:'.7rem',letterSpacing:'.1em',marginBottom:12}}>
              {tipo==='coleoptera'?'🪲 COLEÓPTEROS DISPONIBLES':'🦂 ARTRÓPODOS DISPONIBLES'}
            </div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
              {FAMILIAS.map(f=>(
                <button key={f.id} onClick={()=>setFamSel(f.id)} style={{padding:'4px 10px',background:famSel===f.id?'#C9A84C':'transparent',color:famSel===f.id?'#1A1209':'rgba(201,168,76,0.6)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:12,fontSize:'.65rem',cursor:'pointer',fontStyle:'italic'}}>{f.nm}</button>
              ))}
            </div>
            {famActual.e.length===0?<p style={{color:'rgba(201,168,76,0.3)',fontSize:'.7rem',fontStyle:'italic',textAlign:'center',padding:20}}>Proximamente</p>:famActual.e.map((p,i)=>(
              <div key={p.n} className="esp-card">
                <img src='https://res.cloudinary.com/dv3mvukmq/image/upload/v1779640351/specimens/logo-hip-correct.png' style={{width:40,height:40,objectFit:'contain',opacity:0.5}}/>
                <div>
                  <div style={{color:'#E8C97A',fontSize:'.82rem',fontWeight:700,fontStyle:'italic'}}>{p.n}</div>
                  <div style={{color:'rgba(232,201,122,0.4)',fontSize:'.65rem'}}>${p.p.toFixed(2)} USD</div>
                </div>
              </div>
            ))}
            <div style={{marginTop:12,background:'rgba(201,168,76,0.06)',border:'1px solid rgba(201,168,76,0.15)',borderRadius:8,padding:12}}>
              <p style={{color:'#C9A84C',fontSize:'.75rem',fontWeight:700}}>📦 Incluye:</p>
              <p style={{color:'rgba(232,201,122,0.5)',fontSize:'.68rem',marginTop:4,lineHeight:1.8}}>
                ✅ Certificado SERFOR<br/>
                ✅ Certificado CITES<br/>
                ✅ Medición en mm incluida<br/>
                ✅ Factura electrónica SUNAT<br/>
                ✅ Embalaje especializado<br/>
                ✅ Más de 40 años de experiencia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
