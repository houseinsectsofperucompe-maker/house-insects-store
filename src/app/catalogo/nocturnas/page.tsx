'use client'
import { useState } from 'react'
type E = { n:string; p:number; s:number; foto?:string; video?:string }
type F = { id:string; nm:string; e:E[] }

const FAM:F[] = [
  { id:'Arctiidae', nm:'Arctiidae', e:[] },
  { id:'Castnia', nm:'Castnia', e:[] },
  { id:'Hepalidae', nm:'Hepalidae', e:[] },
  { id:'Saturnidae', nm:'Saturnidae', e:[] },
  { id:'Sphingidae', nm:'Sphingidae', e:[] },
  { id:'Uranidae', nm:'Uranidae', e:[] },
  { id:'Geometridae', nm:'Geometridae', e:[] },
  { id:'Noctuidae', nm:'Noctuidae', e:[] },
  { id:'Erebidae', nm:'Erebidae', e:[] },
]

const POR_PAG = 20

const CSS = `
  @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeInDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse-gold{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0.4)}50%{box-shadow:0 0 0 14px rgba(201,168,76,0)}}
  .fade-up{animation:fadeInUp 0.5s ease both}
  .fade-down{animation:fadeInDown 0.5s ease both}
  .logo-pulse{animation:pulse-gold 2s ease-in-out infinite}
  .fam-btn{transition:all 0.18s ease;cursor:pointer}
  .fam-btn:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(201,168,76,0.3)!important}
  .esp-row{transition:background 0.15s ease}
  .esp-row:hover{background:rgba(201,168,76,0.07)!important}
  .pag-btn{transition:all 0.15s ease;cursor:pointer}
  .pag-btn:hover{background:rgba(201,168,76,0.15)!important}
  .wa-btn{transition:all 0.2s ease}
  .wa-btn:hover{transform:translateY(-3px) scale(1.05);box-shadow:0 8px 24px rgba(37,211,102,0.45)!important}
  .back-btn{transition:all 0.2s ease}
  .back-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(201,168,76,0.5)!important}
`

export default function NocturnasPage() {
  const [fid, setFid] = useState<string|null>(null)
  const [pag, setPag] = useState(1)
  const [popup, setPopup] = useState<E|null>(null)

  const fam = FAM.find(f=>f.id===fid)
  const totalPag = fam ? Math.ceil(fam.e.length/POR_PAG) || 1 : 1
  const slice = fam ? fam.e.slice((pag-1)*POR_PAG, pag*POR_PAG) : []

  const msgGeneral = encodeURIComponent('Hola House Insects of Peru\nQuiero consultar sobre Mariposas Nocturnas.\nPueden enviarme informacion y precios? Gracias.')
  const msgEsp = popup ? encodeURIComponent(`Hola House Insects of Peru\nMe interesa: *${popup.n}*\nPrecio referencial: $${popup.p.toFixed(2)}\nEsta disponible? Gracias.`) : ''

  return (
    <div style={{minHeight:'100vh',background:'#1A1209',fontFamily:'Georgia,serif',padding:'24px 16px'}}>
      <style>{CSS}</style>

      {popup && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.85)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:16}} onClick={()=>setPopup(null)}>
          <div style={{background:'#1A1209',border:'1px solid rgba(201,168,76,0.3)',borderRadius:8,padding:28,maxWidth:420,width:'100%'}} onClick={e=>e.stopPropagation()}>
            <div style={{textAlign:'center',marginBottom:16}}>
              <div style={{width:80,height:80,borderRadius:'50%',border:'2px solid #C9A84C',margin:'0 auto 12px',overflow:'hidden',background:'rgba(201,168,76,0.05)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {popup.foto ? <img src={popup.foto} alt={popup.n} style={{width:'100%',height:'100%',objectFit:'cover'}}/> : <span style={{fontSize:'2rem'}}>*</span>}
              </div>
              <p style={{color:'rgba(201,168,76,0.5)',fontSize:'.65rem',letterSpacing:'.1em',marginBottom:4}}>ORDER: LEPIDOPTERA NOCTURNA · AMAZONIA PERUANA · SERFOR · CITES</p>
              <h2 style={{color:'#E8C97A',fontSize:'1.1rem',fontStyle:'italic',fontWeight:400,marginBottom:4}}>{popup.n}</h2>
              <p style={{color:'#C9A84C',fontSize:'1.4rem',fontWeight:700,marginBottom:4}}>${popup.p.toFixed(2)} <span style={{fontSize:'.8rem',color:'rgba(201,168,76,0.5)'}}>USD</span></p>
              <p style={{color:'rgba(255,255,255,0.4)',fontSize:'.7rem'}}>Stock: {popup.s.toLocaleString()} unidades</p>
            </div>
            <div style={{display:'flex',gap:8,flexDirection:'column'}}>
              <a href={`https://wa.me/51940699405?text=${msgEsp}`} target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'11px',borderRadius:4,fontSize:'.82rem',fontWeight:700,textDecoration:'none',textAlign:'center'}}>Cotizar por WhatsApp</a>
              <button onClick={()=>setPopup(null)} style={{background:'transparent',border:'1px solid rgba(201,168,76,0.2)',color:'rgba(201,168,76,0.5)',padding:'9px',borderRadius:4,fontSize:'.75rem',cursor:'pointer'}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <a href="/" className="back-btn" style={{color:'#1A1209',textDecoration:'none',display:'inline-flex',alignItems:'center',gap:8,marginBottom:20,background:'linear-gradient(135deg,#C9A84C,#E8C97A)',padding:'10px 20px',borderRadius:30,fontSize:'.9rem',fontWeight:700,boxShadow:'0 4px 16px rgba(201,168,76,0.4)'}}>
          Volver al Inicio
        </a>

        <div className="fade-down" style={{textAlign:'center',marginBottom:32}}>
          <img src="/logo-house-insects-peru.png" className="logo-pulse" style={{width:160,height:160,objectFit:'contain',marginBottom:14,borderRadius:'50%'}}/>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',letterSpacing:'.2em',marginBottom:8}}>HOUSE INSECTS OF PERU · MAS DE 40 ANOS DE EXPERIENCIA</p>
          <h1 style={{fontSize:'clamp(1.4rem,4vw,2.2rem)',fontWeight:400,color:'#E8C97A',letterSpacing:'.08em',marginBottom:8}}>Mariposas Nocturnas Tropicales</h1>
          <div style={{width:120,height:1,background:'linear-gradient(to right,transparent,#C9A84C,transparent)',margin:'0 auto 12px'}}/>
          <p style={{color:'rgba(255,255,255,0.5)',fontSize:'.8rem',maxWidth:500,margin:'0 auto',lineHeight:1.7}}>Arctiidae · Saturnidae · Sphingidae · Uranidae · Amazonicas</p>
          <p style={{color:'rgba(201,168,76,0.3)',fontSize:'.65rem',marginTop:8}}>PARTIDA 9705.21.00.00 · SERFOR · CITES · RUC 20447397804</p>
        </div>

        <div style={{marginBottom:28}}>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',letterSpacing:'.2em',textAlign:'center',marginBottom:14}}>SELECCIONA UNA FAMILIA</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center'}}>
            {FAM.map(f=>(
              <button key={f.id} onClick={()=>{setFid(f.id);setPag(1)}} className="fam-btn"
                style={{background:fid===f.id?'linear-gradient(135deg,#C9A84C,#E8C97A)':'rgba(201,168,76,0.06)',color:fid===f.id?'#1A1209':'#C9A84C',border:`1px solid ${fid===f.id?'transparent':'rgba(201,168,76,0.2)'}`,padding:'9px 16px',borderRadius:4,fontSize:'.75rem',fontFamily:'Georgia,serif'}}>
                {f.nm} <span style={{opacity:0.6,fontSize:'.65rem'}}>({f.e.length})</span>
              </button>
            ))}
          </div>
        </div>

        {fid && fam && (
          <>
            <div className="fade-up" style={{background:'rgba(201,168,76,0.04)',border:'1px solid rgba(201,168,76,0.12)',borderRadius:6,overflow:'hidden',marginBottom:16}}>
              <div style={{padding:'12px 16px',borderBottom:'1px solid rgba(201,168,76,0.1)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
                <p style={{color:'#E8C97A',fontSize:'.8rem',fontStyle:'italic'}}>{fam.nm}</p>
                <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>{fam.e.length} especies · Pag. {pag}/{totalPag}</p>
              </div>
              {fam.e.length > 0 ? (
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.08)'}}>
                      <th style={{padding:'8px 12px',color:'rgba(201,168,76,0.6)',fontSize:'.65rem',letterSpacing:'.1em',textAlign:'left',fontWeight:400}}>N</th>
                      <th style={{padding:'8px 12px',color:'rgba(201,168,76,0.6)',fontSize:'.65rem',letterSpacing:'.1em',textAlign:'left',fontWeight:400}}>ESPECIE</th>
                      <th style={{padding:'8px 12px',color:'rgba(201,168,76,0.6)',fontSize:'.65rem',letterSpacing:'.1em',textAlign:'center',fontWeight:400}}>PRECIO USD</th>
                      <th style={{padding:'8px 12px',color:'rgba(201,168,76,0.6)',fontSize:'.65rem',letterSpacing:'.1em',textAlign:'center',fontWeight:400}}>STOCK</th>
                      <th style={{padding:'8px 12px',color:'rgba(201,168,76,0.6)',fontSize:'.65rem',letterSpacing:'.1em',textAlign:'center',fontWeight:400}}>ACCION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slice.map((e,i)=>(
                      <tr key={i} className="esp-row" style={{borderBottom:'1px solid rgba(201,168,76,0.06)'}}>
                        <td style={{padding:'9px 12px',color:'rgba(201,168,76,0.3)',fontSize:'.68rem'}}>{(pag-1)*POR_PAG+i+1}</td>
                        <td style={{padding:'9px 12px',color:'#E8C97A',fontSize:'.78rem',fontStyle:'italic'}}>{e.n}</td>
                        <td style={{padding:'9px 12px',color:'#C9A84C',fontSize:'.8rem',fontWeight:700,textAlign:'center'}}>${e.p.toFixed(2)}</td>
                        <td style={{padding:'9px 12px',color:'rgba(255,255,255,0.4)',fontSize:'.7rem',textAlign:'center'}}>{e.s.toLocaleString()}</td>
                        <td style={{padding:'9px 12px',textAlign:'center'}}>
                          <button onClick={()=>setPopup(e)} style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.2)',color:'#C9A84C',padding:'4px 10px',borderRadius:3,fontSize:'.65rem',cursor:'pointer',fontFamily:'Georgia,serif'}}>Ver</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{textAlign:'center',padding:'40px 20px'}}>
                  <p style={{color:'rgba(232,201,122,0.3)',marginBottom:12}}>Proximamente especies de {fid}</p>
                  <a href="https://wa.me/51940699405" target="_blank" style={{display:'inline-block',background:'#25D366',color:'white',padding:'10px 20px',borderRadius:4,fontWeight:700,fontSize:'.8rem',textDecoration:'none'}}>Consultar disponibilidad</a>
                </div>
              )}
            </div>
            {totalPag > 1 && (
              <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:24,alignItems:'center'}}>
                <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} className="pag-btn" style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',color:pag===1?'rgba(201,168,76,0.25)':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:pag===1?'not-allowed':'pointer',fontSize:'.7rem'}}>Ant</button>
                {Array.from({length:totalPag},(_,i)=>i+1).map(n=>(
                  <button key={n} onClick={()=>setPag(n)} className="pag-btn" style={{padding:'5px 10px',background:pag===n?'#C9A84C':'rgba(201,168,76,0.08)',color:pag===n?'#1A1209':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:'pointer',fontSize:'.7rem',fontWeight:pag===n?700:400}}>{n}</button>
                ))}
                <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} className="pag-btn" style={{padding:'5px 10px',background:'rgba(201,168,76,0.08)',color:pag===totalPag?'rgba(201,168,76,0.25)':'#C9A84C',border:'1px solid rgba(201,168,76,0.2)',borderRadius:4,cursor:pag===totalPag?'not-allowed':'pointer',fontSize:'.7rem'}}>Sig</button>
              </div>
            )}
          </>
        )}

        <div style={{textAlign:'center',padding:'28px 16px',borderTop:'1px solid rgba(201,168,76,0.1)',marginTop:16}}>
          <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',letterSpacing:'.15em',marginBottom:16}}>NO ENCUENTRAS LO QUE BUSCAS? CONTACTANOS</p>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <a href={`https://wa.me/51940699405?text=${msgGeneral}`} target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'11px 22px',borderRadius:4,fontSize:'.82rem',fontWeight:700,textDecoration:'none'}}>+51 940 699 405</a>
            <a href={`https://wa.me/51920644433?text=${msgGeneral}`} target="_blank" className="wa-btn" style={{background:'#25D366',color:'white',padding:'11px 22px',borderRadius:4,fontSize:'.82rem',fontWeight:700,textDecoration:'none'}}>+51 920 644 433</a>
          </div>
          <p style={{color:'rgba(232,201,122,0.2)',fontSize:'.62rem',marginTop:20}}>2026 HOUSE INSECTS OF PERU E.I.R.L. · TINGO MARIA · EXPORTACION MUNDIAL</p>
        </div>
      </div>
    </div>
  )
}
