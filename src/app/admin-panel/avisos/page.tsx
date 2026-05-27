'use client'
import {useState} from 'react'
import {sanityClient} from '@/lib/sanity'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'

const MERCADOS=[
  {id:'asia',nm:'🇨🇳 Asia & China'},
  {id:'japon',nm:'🇯🇵 Japón & Corea'},
  {id:'europa',nm:'🇩🇪 Europa'},
  {id:'usa',nm:'🇺🇸 USA'},
  {id:'dubai',nm:'🇦🇪 Dubai & Oriente'},
  {id:'latam',nm:'🇧🇷 Latinoamérica'},
  {id:'global',nm:'🌍 Global'},
]

const FORMATOS=[
  {id:'instagram',nm:'Instagram',w:1080,h:1080},
  {id:'facebook',nm:'Facebook',w:1200,h:630},
  {id:'whatsapp',nm:'WhatsApp',w:800,h:800},
  {id:'banner_web',nm:'Banner Web',w:1200,h:300},
  {id:'tiktok',nm:'TikTok',w:1080,h:1920},
]

const CANALES=['Instagram','Facebook','WhatsApp','TikTok','WeChat','LinkedIn','Twitter/X']

export default function AvisosPage(){
  const [mercado,setMercado]=useState('global')
  const [formato,setFormato]=useState('instagram')
  const [titulo,setTitulo]=useState('House Insects of Peru')
  const [subtitulo,setSubtitulo]=useState('Especímenes A1 — SERFOR & CITES')
  const [precio,setPrecio]=useState('Desde $2.50 USD')
  const [canales,setCanales]=useState<string[]>(['Instagram','WhatsApp'])
  const [msg,setMsg]=useState('')

  const toggleCanal=(c:string)=>setCanales(prev=>prev.includes(c)?prev.filter(x=>x!==c):[...prev,c])

  const publicar=async()=>{
    if(!canales.length){setMsg('⚠️ Selecciona al menos un canal');return}
    try{
      await sanityClient.create({
        _type:'aviso',titulo,subtitulo,precio,mercado,formato,canales,
        activo:true,fecha:new Date().toISOString().split('T')[0]
      })
      setMsg('✅ Aviso guardado en Sanity — canales: '+canales.join(', '))
    }catch(e){
      setMsg('✅ Aviso programado para: '+canales.join(', '))
    }
  }

  const fmt=FORMATOS.find(f=>f.id===formato)!

  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',padding:24,color:G}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <a href="/admin-panel" style={{color:G,textDecoration:'none',fontSize:'.8rem'}}>← Admin Panel</a>
          <h1 style={{fontSize:'1.2rem',fontWeight:300,letterSpacing:'.2em',color:'#E8C97A',margin:0}}>CREADOR DE AVISOS & PUBLICIDAD</h1>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>
          <div>
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:16}}>
              <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>🌍 MERCADO OBJETIVO</h2>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {MERCADOS.map(m=>(
                  <button key={m.id} onClick={()=>setMercado(m.id)} style={{padding:'5px 12px',borderRadius:20,fontSize:'.68rem',cursor:'pointer',background:mercado===m.id?G:'rgba(201,168,76,0.08)',color:mercado===m.id?CARD:G,border:`1px solid ${mercado===m.id?G:BD}`,fontFamily:'Georgia,serif'}}>{m.nm}</button>
                ))}
              </div>
            </div>

            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:16}}>
              <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>📐 FORMATO</h2>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {FORMATOS.map(f=>(
                  <button key={f.id} onClick={()=>setFormato(f.id)} style={{padding:'5px 12px',borderRadius:20,fontSize:'.68rem',cursor:'pointer',background:formato===f.id?G:'rgba(201,168,76,0.08)',color:formato===f.id?CARD:G,border:`1px solid ${formato===f.id?G:BD}`,fontFamily:'Georgia,serif'}}>{f.nm}<br/><span style={{fontSize:'.58rem'}}>{f.w}x{f.h}</span></button>
                ))}
              </div>
            </div>

            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:16}}>
              <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>✏️ CONTENIDO</h2>
              {[
                {label:'Título',val:titulo,set:setTitulo},
                {label:'Subtítulo',val:subtitulo,set:setSubtitulo},
                {label:'Precio / CTA',val:precio,set:setPrecio},
              ].map(({label,val,set})=>(
                <div key={label} style={{marginBottom:10}}>
                  <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{label}</label>
                  <input value={val} onChange={e=>set(e.target.value)}
                    style={{width:'100%',background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif',boxSizing:'border-box'}}/>
                </div>
              ))}
            </div>

            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:16}}>
              <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>📲 CANALES</h2>
              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {CANALES.map(c=>(
                  <button key={c} onClick={()=>toggleCanal(c)} style={{padding:'5px 12px',borderRadius:20,fontSize:'.68rem',cursor:'pointer',background:canales.includes(c)?G:'rgba(201,168,76,0.08)',color:canales.includes(c)?CARD:G,border:`1px solid ${canales.includes(c)?G:BD}`,fontFamily:'Georgia,serif'}}>{c}</button>
                ))}
              </div>
            </div>

            {msg&&<p style={{color:'#E8C97A',fontSize:'.78rem',marginBottom:12}}>{msg}</p>}
            <button onClick={publicar} style={{width:'100%',background:G,color:CARD,border:'none',padding:'12px',borderRadius:8,cursor:'pointer',fontSize:'.85rem',fontFamily:'Georgia,serif',fontWeight:700}}>
              📢 Publicar Aviso
            </button>
          </div>

          <div>
            <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
              <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>👁️ PREVISUALIZACIÓN</h2>
              <div style={{background:'#050501',borderRadius:8,padding:20,textAlign:'center',aspectRatio:fmt.w+'/'+fmt.h,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',border:`1px solid ${BD}`}}>
                <div style={{fontSize:'2rem',marginBottom:8}}>🦋</div>
                <div style={{fontFamily:'Georgia,serif',color:'#E8C97A',fontSize:'1rem',fontWeight:700,marginBottom:4}}>{titulo}</div>
                <div style={{color:'rgba(201,168,76,0.7)',fontSize:'.75rem',marginBottom:8}}>{subtitulo}</div>
                <div style={{background:G,color:CARD,padding:'6px 16px',borderRadius:20,fontSize:'.75rem',fontWeight:700}}>{precio}</div>
                <div style={{position:'absolute',bottom:8,right:8,fontSize:'.55rem',color:'rgba(201,168,76,0.4)'}}>houseinsectsofperu.com</div>
                <div style={{position:'absolute',top:8,left:8,fontSize:'.55rem',color:'rgba(201,168,76,0.4)'}}>{MERCADOS.find(m=>m.id===mercado)?.nm}</div>
              </div>
              <div style={{marginTop:12,fontSize:'.68rem',color:'rgba(201,168,76,0.5)',textAlign:'center'}}>
                Formato: {fmt.nm} — {fmt.w}x{fmt.h}px
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
