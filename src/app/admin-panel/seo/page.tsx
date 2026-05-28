'use client'
import { useState, useEffect } from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

const RUBROS=['especimenes','diurnas','joyeria','rarezas','artesanias','herramientas','nocturnas','coleoptera','minerales','semillas','frutas','hongos','maderas','textileria','pinturas','esencias','superalimentos','home','catalogo','contacto','exportacion','envios']

export default function SeoPage(){
  const [items,setItems]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [vista,setVista]=useState<'lista'|'nuevo'>('lista')
  const [edit,setEdit]=useState<any>({})
  const [guardando,setGuardando]=useState(false)
  const [msg,setMsg]=useState('')
  const [kwInput,setKwInput]=useState('')

  useEffect(()=>{cargar()},[])

  const cargar=async()=>{
    setLoading(true)
    try{
      const r=await fetch('/api/datos?tipo=seoConfig')
      const d=await r.json()
      setItems(Array.isArray(d)?d:[])
    }catch(e){}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const guardar=async()=>{
    if(!edit.rubro){mostrar('❌ Rubro obligatorio');return}
    setGuardando(true)
    const action=edit._id?'updateSeo':'createSeo'
    const r=await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action,data:edit})})
    const res=await r.json()
    if(res.ok){mostrar('✅ SEO guardado');setVista('lista');cargar()}
    else mostrar('❌ '+res.error)
    setGuardando(false)
  }

  const eliminar=async(id:string,r:string)=>{
    if(!confirm(`¿Eliminar SEO de "${r}"?`))return
    await fetch('/api/datos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete',data:{_id:id}})})
    mostrar('🗑️ Eliminado');cargar()
  }

  const addKw=()=>{
    if(!kwInput.trim())return
    setEdit((p:any)=>({...p,keywords:[...(p.keywords||[]),kwInput.trim()]}))
    setKwInput('')
  }

  const removeKw=(kw:string)=>setEdit((p:any)=>({...p,keywords:(p.keywords||[]).filter((k:string)=>k!==kw)}))

  const tituloLen=(edit.titulo||'').length
  const descLen=(edit.descripcion||'').length

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8,paddingRight:300}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>🔍 SEO & Meta Tags</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{items.length} páginas configuradas de {RUBROS.length} total</p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={()=>{setEdit({robotsIndex:true,keywords:[]});setVista('nuevo')}} style={btn(G,CARD)}>+ Nueva config SEO</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {vista==='lista'&&(
          <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:6,marginBottom:16}}>
              {RUBROS.map(r=>{
                const cfg=items.find((it:any)=>it.rubro===r)
                return(
                  <div key={r} onClick={()=>{setEdit(cfg||{rubro:r,robotsIndex:true,keywords:[]});setVista('nuevo')}}
                    style={{background:cfg?'rgba(93,187,99,0.08)':CARD,border:`1px solid ${cfg?'rgba(93,187,99,0.3)':BD}`,borderRadius:6,padding:'10px 12px',cursor:'pointer',transition:'all 0.15s'}}>
                    <div style={{fontSize:'.7rem',color:cfg?'#5DBB63':'rgba(201,168,76,0.5)',fontWeight:cfg?700:400}}>{r}</div>
                    <div style={{fontSize:'.58rem',color:'rgba(201,168,76,0.3)',marginTop:2}}>{cfg?'✅ Configurado':'⚪ Sin config'}</div>
                  </div>
                )
              })}
            </div>

            {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
              <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'rgba(201,168,76,0.05)'}}>
                      <th style={s.th}>RUBRO / PÁGINA</th>
                      <th style={s.th}>META TÍTULO</th>
                      <th style={s.th}>KEYWORDS</th>
                      <th style={s.th}>INDEX</th>
                      <th style={s.th}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((it:any)=>(
                      <tr key={it._id}>
                        <td style={{...s.td,color:G,fontWeight:700}}>{it.rubro}</td>
                        <td style={{...s.td,fontSize:'.7rem',maxWidth:200}}>{it.titulo||'—'}</td>
                        <td style={{...s.td,fontSize:'.65rem'}}>{(it.keywords||[]).slice(0,3).join(', ')}{(it.keywords||[]).length>3?'...':''}</td>
                        <td style={s.td}><span style={{color:it.robotsIndex?'#5DBB63':'#ff5050',fontSize:'.65rem'}}>{it.robotsIndex?'✅ Sí':'❌ No'}</span></td>
                        <td style={s.td}>
                          <div style={{display:'flex',gap:4}}>
                            <button onClick={()=>{setEdit({...it});setVista('nuevo')}} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,padding:'4px 8px',fontSize:'.65rem'})}>✏️</button>
                            <button onClick={()=>eliminar(it._id,it.rubro)} style={btn('rgba(255,80,80,0.1)','#ff5050',{border:'1px solid rgba(255,80,80,0.2)',padding:'4px 8px',fontSize:'.65rem'})}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {vista==='nuevo'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:24,maxWidth:800}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <h2 style={{color:'#E8C97A',fontSize:'1rem',fontWeight:400,margin:0}}>🔍 SEO: {edit.rubro||'Nueva página'}</h2>
              <button onClick={()=>setVista('lista')} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>← Volver</button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>RUBRO / PÁGINA *</label>
                <select value={edit.rubro||''} onChange={e=>setEdit((p:any)=>({...p,rubro:e.target.value}))} style={s.inp}>
                  <option value="">-- Selecciona --</option>
                  {RUBROS.map(r=><option key={r} value={r}>{r}</option>)}
                </select>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>
                  META TÍTULO <span style={{color:tituloLen>60?'#ff5050':tituloLen>50?'#ff9966':'rgba(201,168,76,0.4)'}}>{tituloLen}/60</span>
                </label>
                <input value={edit.titulo||''} onChange={e=>setEdit((p:any)=>({...p,titulo:e.target.value}))} style={s.inp} placeholder="House Insects of Peru — Especímenes A1"/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>
                  META DESCRIPCIÓN <span style={{color:descLen>160?'#ff5050':descLen>140?'#ff9966':'rgba(201,168,76,0.4)'}}>{descLen}/160</span>
                </label>
                <textarea value={edit.descripcion||''} onChange={e=>setEdit((p:any)=>({...p,descripcion:e.target.value}))} style={{...s.inp,height:80,resize:'vertical' as const}} placeholder="Exportación de especímenes biológicos secos..."/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>URL SLUG</label>
                <input value={edit.slug||''} onChange={e=>setEdit((p:any)=>({...p,slug:e.target.value}))} style={s.inp} placeholder="/catalogo/especimenes"/>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>URL CANÓNICA</label>
                <input value={edit.canonicalUrl||''} onChange={e=>setEdit((p:any)=>({...p,canonicalUrl:e.target.value}))} style={s.inp} placeholder="https://houseinsectsofperu.com/..."/>
              </div>
              <div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>OG IMAGE URL</label>
                <input value={edit.ogImage||''} onChange={e=>setEdit((p:any)=>({...p,ogImage:e.target.value}))} style={s.inp} placeholder="https://HouseInsects1967.b-cdn.net/..."/>
                {edit.ogImage&&<img src={edit.ogImage} style={{width:'100%',height:80,objectFit:'cover',marginTop:6,borderRadius:4,border:`1px solid ${BD}`}}/>}
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4,marginTop:10}}>KEYWORDS</label>
                <div style={{display:'flex',gap:6,marginBottom:6}}>
                  <input value={kwInput} onChange={e=>setKwInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&addKw()} style={{...s.inp,flex:1}} placeholder="mariposas peru export..."/>
                  <button onClick={addKw} style={btn(G,CARD,{padding:'6px 10px'})}>+</button>
                </div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:10}}>
                  {(edit.keywords||[]).map((kw:string)=>(
                    <span key={kw} onClick={()=>removeKw(kw)} style={{background:'rgba(201,168,76,0.15)',color:G,padding:'3px 8px',borderRadius:10,fontSize:'.65rem',cursor:'pointer',border:`1px solid ${BD}`}}>
                      {kw} ×
                    </span>
                  ))}
                </div>
                <label style={{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',display:'block',marginBottom:4}}>SCHEMA.ORG JSON-LD</label>
                <textarea value={edit.schemaMarkup||''} onChange={e=>setEdit((p:any)=>({...p,schemaMarkup:e.target.value}))} style={{...s.inp,height:80,resize:'vertical' as const,fontFamily:'monospace',fontSize:'.65rem'}} placeholder='{"@context":"https://schema.org",...}'/>
                <label style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginTop:10}}>
                  <input type="checkbox" checked={edit.robotsIndex!==false} onChange={e=>setEdit((p:any)=>({...p,robotsIndex:e.target.checked}))}/>
                  <span style={{color:'rgba(201,168,76,0.6)',fontSize:'.75rem'}}>Indexar en Google (robots: index)</span>
                </label>
              </div>
            </div>
            <div style={{marginTop:16,display:'flex',gap:10}}>
              <button onClick={guardar} disabled={guardando} style={btn(G,CARD,{padding:'10px 28px',fontSize:'.85rem',opacity:guardando?0.7:1})}>{guardando?'Guardando...':'💾 Guardar SEO'}</button>
              <button onClick={()=>setVista('lista')} style={btn('transparent',G,{border:`1px solid ${BD}`,padding:'10px 20px'})}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
