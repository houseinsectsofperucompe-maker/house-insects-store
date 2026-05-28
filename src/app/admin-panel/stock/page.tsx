'use client'
import { useState, useEffect } from 'react'

type Especie = { _id:string; n:string; p:number; s:number; foto?:string; familia:string; activo:boolean; stockMinimo?:number }

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'
const s={
  page:{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',color:'#E8C97A'},
  inp:{background:'rgba(201,168,76,0.08)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'7px 10px',borderRadius:4,fontSize:'.8rem',fontFamily:'Georgia,serif',outline:'none',width:'100%',boxSizing:'border-box' as const},
  th:{color:'rgba(201,168,76,0.5)',fontSize:'.62rem',letterSpacing:'.08em',padding:'8px 10px',borderBottom:`1px solid ${BD}`,textAlign:'left' as const,fontWeight:400},
  td:{padding:'8px 10px',borderBottom:'1px solid rgba(201,168,76,0.06)',fontSize:'.75rem',color:'#E8C97A',verticalAlign:'middle' as const},
}
const btn=(bg:string,c:string,extra?:any)=>({background:bg,color:c,border:'none',padding:'6px 14px',borderRadius:4,cursor:'pointer',fontSize:'.75rem',fontWeight:700,fontFamily:'Georgia,serif',...extra})

export default function StockPage(){
  const [especies,setEspecies]=useState<Especie[]>([])
  const [loading,setLoading]=useState(true)
  const [busq,setBusq]=useState('')
  const [filtro,setFiltro]=useState('todos')
  const [famSel,setFamSel]=useState('Todas')
  const [editStock,setEditStock]=useState<Record<string,number>>({})
  const [guardando,setGuardando]=useState<Record<string,boolean>>({})
  const [msg,setMsg]=useState('')
  const [pag,setPag]=useState(1)
  const POR_PAG=30

  useEffect(()=>{cargar()},[])

  const cargar=async()=>{
    setLoading(true)
    try{
      const r=await fetch('/api/sanity-read')
      const d=await r.json()
      setEspecies(Array.isArray(d)?d:[])
    }catch(e){mostrar('❌ Error')}
    setLoading(false)
  }

  const mostrar=(m:string)=>{setMsg(m);setTimeout(()=>setMsg(''),3000)}

  const guardarStock=async(esp:Especie)=>{
    const nuevoStock=editStock[esp._id]
    if(nuevoStock===undefined)return
    setGuardando(p=>({...p,[esp._id]:true}))
    const r=await fetch('/api/sanity-write',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'update',data:{_id:esp._id,precio:esp.p,stock:nuevoStock,activo:esp.activo}})})
    const res=await r.json()
    if(res.ok){mostrar('✅ Stock actualizado');setEditStock(p=>{const n={...p};delete n[esp._id];return n});cargar()}
    else mostrar('❌ '+res.error)
    setGuardando(p=>({...p,[esp._id]:false}))
  }

  const famList=['Todas',...Array.from(new Set(especies.map(e=>e.familia))).sort()]
  const sinStock=especies.filter(e=>e.s===0)
  const stockBajo=especies.filter(e=>e.s>0&&e.s<=(e.stockMinimo||5))
  const conStock=especies.filter(e=>e.s>(e.stockMinimo||5))

  const filtrados=especies.filter(e=>{
    const enBusq=e.n.toLowerCase().includes(busq.toLowerCase())||e.familia.toLowerCase().includes(busq.toLowerCase())
    const enFam=famSel==='Todas'||e.familia===famSel
    const enFiltro=filtro==='todos'||(filtro==='sin_stock'&&e.s===0)||(filtro==='bajo'&&e.s>0&&e.s<=(e.stockMinimo||5))||(filtro==='ok'&&e.s>(e.stockMinimo||5))
    return enBusq&&enFam&&enFiltro
  })
  const totalPag=Math.ceil(filtrados.length/POR_PAG)
  const pagActual=filtrados.slice((pag-1)*POR_PAG,pag*POR_PAG)
  const totalUnidades=especies.reduce((a,e)=>a+e.s,0)
  const valorInventario=especies.reduce((a,e)=>a+e.s*e.p,0)

  return(
    <div style={s.page}>
      <div style={{padding:24}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,flexWrap:'wrap',gap:8,paddingRight:300}}>
          <div>
            <h1 style={{color:'#E8C97A',fontSize:'1.1rem',fontWeight:400,margin:0}}>📦 Control de Stock</h1>
            <p style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem',margin:'4px 0 0'}}>{especies.length} especies · {totalUnidades.toLocaleString()} unidades · Valor: <span style={{color:'#5DBB63'}}>${valorInventario.toLocaleString()}</span></p>
          </div>
          <div style={{display:'flex',gap:8}}>
            <a href="/admin-panel" style={{...btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`}),textDecoration:'none',padding:'6px 14px',borderRadius:4,fontSize:'.75rem'}}>← Panel</a>
            <button onClick={cargar} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`})}>🔄 Actualizar</button>
          </div>
        </div>

        {msg&&<div style={{background:'rgba(201,168,76,0.1)',border:`1px solid ${BD}`,borderRadius:6,padding:'10px 16px',marginBottom:16,color:G,fontSize:'.8rem'}}>{msg}</div>}

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:10,marginBottom:20}}>
          {[
            {label:'Total unidades',val:totalUnidades.toLocaleString(),c:G},
            {label:'Valor inventario',val:`$${Math.round(valorInventario).toLocaleString()}`,c:'#5DBB63'},
            {label:'Sin stock',val:sinStock.length,c:'#ff5050'},
            {label:'Stock bajo',val:stockBajo.length,c:'#ff9966'},
            {label:'Stock OK',val:conStock.length,c:'#5DBB63'},
          ].map(st=>(
            <div key={st.label} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'12px 14px'}}>
              <div style={{fontSize:'1.3rem',fontWeight:700,color:st.c}}>{st.val}</div>
              <div style={{fontSize:'.62rem',color:'rgba(201,168,76,0.4)',marginTop:2}}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* Alertas */}
        {sinStock.length>0&&(
          <div style={{background:'rgba(255,80,80,0.08)',border:'1px solid rgba(255,80,80,0.3)',borderRadius:8,padding:'12px 16px',marginBottom:12}}>
            <p style={{color:'#ff5050',fontSize:'.75rem',fontWeight:700,margin:'0 0 6px'}}>🚨 SIN STOCK ({sinStock.length} especies)</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {sinStock.slice(0,10).map(e=><span key={e._id} style={{background:'rgba(255,80,80,0.15)',color:'#ff5050',padding:'2px 8px',borderRadius:10,fontSize:'.62rem',fontStyle:'italic'}}>{e.n}</span>)}
              {sinStock.length>10&&<span style={{color:'rgba(255,80,80,0.5)',fontSize:'.62rem'}}>+{sinStock.length-10} más</span>}
            </div>
          </div>
        )}
        {stockBajo.length>0&&(
          <div style={{background:'rgba(255,153,0,0.08)',border:'1px solid rgba(255,153,0,0.3)',borderRadius:8,padding:'12px 16px',marginBottom:16}}>
            <p style={{color:'#ff9966',fontSize:'.75rem',fontWeight:700,margin:'0 0 6px'}}>⚠️ STOCK BAJO ({stockBajo.length} especies)</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
              {stockBajo.slice(0,10).map(e=><span key={e._id} style={{background:'rgba(255,153,0,0.15)',color:'#ff9966',padding:'2px 8px',borderRadius:10,fontSize:'.62rem',fontStyle:'italic'}}>{e.n} ({e.s})</span>)}
              {stockBajo.length>10&&<span style={{color:'rgba(255,153,0,0.5)',fontSize:'.62rem'}}>+{stockBajo.length-10} más</span>}
            </div>
          </div>
        )}

        {/* Filtros */}
        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,padding:'12px 16px',marginBottom:16,display:'flex',gap:10,flexWrap:'wrap',alignItems:'center'}}>
          <input value={busq} onChange={e=>{setBusq(e.target.value);setPag(1)}} placeholder="🔍 Buscar especie..." style={{...s.inp,width:240,flex:'none'}}/>
          <select value={famSel} onChange={e=>{setFamSel(e.target.value);setPag(1)}} style={{...s.inp,width:160,flex:'none'}}>
            {famList.map(f=><option key={f} value={f}>{f}</option>)}
          </select>
          <div style={{display:'flex',gap:4}}>
            {[{v:'todos',l:'Todos'},{v:'sin_stock',l:'🚨 Sin stock'},{v:'bajo',l:'⚠️ Bajo'},{v:'ok',l:'✅ OK'}].map(f=>(
              <button key={f.v} onClick={()=>{setFiltro(f.v);setPag(1)}} style={{...btn(filtro===f.v?G:'rgba(201,168,76,0.08)',filtro===f.v?CARD:G,{border:`1px solid ${filtro===f.v?G:BD}`,padding:'5px 10px',fontSize:'.65rem'})}}>
                {f.l}
              </button>
            ))}
          </div>
          <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.7rem'}}>{filtrados.length} especies</span>
        </div>

        {/* Tabla */}
        {loading?<div style={{color:G,padding:40,textAlign:'center'}}>⏳ Cargando...</div>:(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:8,overflow:'hidden',marginBottom:16}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead>
                <tr style={{background:'rgba(201,168,76,0.05)'}}>
                  <th style={s.th}>FOTO</th>
                  <th style={s.th}>ESPECIE</th>
                  <th style={s.th}>FAMILIA</th>
                  <th style={s.th}>PRECIO</th>
                  <th style={s.th}>STOCK ACTUAL</th>
                  <th style={s.th}>ESTADO</th>
                  <th style={s.th}>VALOR TOTAL</th>
                  <th style={s.th}>ACTUALIZAR</th>
                </tr>
              </thead>
              <tbody>
                {pagActual.map(esp=>{
                  const nuevoStock=editStock[esp._id]
                  const stockActual=nuevoStock!==undefined?nuevoStock:esp.s
                  const estado=esp.s===0?'sin_stock':esp.s<=(esp.stockMinimo||5)?'bajo':'ok'
                  return(
                    <tr key={esp._id} style={{background:estado==='sin_stock'?'rgba(255,80,80,0.04)':estado==='bajo'?'rgba(255,153,0,0.04)':'transparent'}}>
                      <td style={s.td}>{esp.foto?<img src={esp.foto} style={{width:40,height:30,objectFit:'cover',borderRadius:3}}/>:<div style={{width:40,height:30,background:'rgba(201,168,76,0.05)',borderRadius:3}}/>}</td>
                      <td style={{...s.td,fontStyle:'italic',maxWidth:200}}>{esp.n}</td>
                      <td style={{...s.td,color:'rgba(201,168,76,0.6)',fontSize:'.7rem'}}>{esp.familia}</td>
                      <td style={{...s.td,color:G,fontWeight:700}}>${esp.p}</td>
                      <td style={s.td}>
                        <input type="number" value={stockActual} onChange={e=>setEditStock(p=>({...p,[esp._id]:parseInt(e.target.value)||0}))}
                          style={{...s.inp,width:80,color:estado==='sin_stock'?'#ff5050':estado==='bajo'?'#ff9966':'#5DBB63',fontWeight:700}}/>
                      </td>
                      <td style={s.td}>
                        <span style={{background:estado==='sin_stock'?'rgba(255,80,80,0.2)':estado==='bajo'?'rgba(255,153,0,0.2)':'rgba(93,187,99,0.2)',color:estado==='sin_stock'?'#ff5050':estado==='bajo'?'#ff9966':'#5DBB63',padding:'3px 8px',borderRadius:10,fontSize:'.6rem',fontWeight:700}}>
                          {estado==='sin_stock'?'🚨 SIN STOCK':estado==='bajo'?'⚠️ BAJO':'✅ OK'}
                        </span>
                      </td>
                      <td style={{...s.td,color:'rgba(201,168,76,0.6)'}}>${(esp.s*esp.p).toFixed(0)}</td>
                      <td style={s.td}>
                        {nuevoStock!==undefined&&(
                          <button onClick={()=>guardarStock(esp)} disabled={guardando[esp._id]} style={btn('#25D366','#0A0A05',{padding:'4px 10px',fontSize:'.65rem',opacity:guardando[esp._id]?0.7:1})}>
                            {guardando[esp._id]?'...':'💾'}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {totalPag>1&&(
          <div style={{display:'flex',gap:6,alignItems:'center',justifyContent:'center'}}>
            <button onClick={()=>setPag(p=>Math.max(1,p-1))} disabled={pag===1} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===1?0.4:1})}>← Ant</button>
            <span style={{color:'rgba(201,168,76,0.4)',fontSize:'.65rem'}}>Página {pag} de {totalPag}</span>
            <button onClick={()=>setPag(p=>Math.min(totalPag,p+1))} disabled={pag===totalPag} style={btn('rgba(201,168,76,0.1)',G,{border:`1px solid ${BD}`,opacity:pag===totalPag?0.4:1})}>Sig →</button>
          </div>
        )}
      </div>
    </div>
  )
}
