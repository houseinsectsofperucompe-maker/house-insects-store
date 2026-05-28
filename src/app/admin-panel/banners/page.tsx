'use client'
import {useState,useEffect} from 'react'
import {sanityClient} 

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'

const PLANES=[
  {id:'mensual',nm:'Mensual',precio:20,dias:30},
  {id:'trimestral',nm:'Trimestral',precio:50,dias:90},
  {id:'semestral',nm:'Semestral',precio:90,dias:180},
  {id:'anual',nm:'Anual',precio:150,dias:365},
]

const POSICIONES=[
  {id:'header',nm:'Header Principal',desc:'Arriba de toda la web'},
  {id:'catalogo',nm:'Catálogo',desc:'Dentro del catálogo'},
  {id:'sidebar',nm:'Sidebar',desc:'Panel lateral'},
  {id:'footer',nm:'Footer',desc:'Pie de página'},
]

type Banner={id:number;cliente:string;pais:string;email:string;posicion:string;plan:string;precio:number;vence:string;activo:boolean;url:string;imagen:string}

export default function BannersPage(){
  const [banners,setBanners]=useState<Banner[]>([
    {id:1,cliente:'BioCollect Ltd',pais:'🇬🇧 UK',email:'bio@collect.co.uk',posicion:'header',plan:'anual',precio:150,vence:'2027-05-26',activo:true,url:'https://biocollect.co.uk',imagen:''},
    {id:2,cliente:'Entomo Japan',pais:'🇯🇵 Japón',email:'info@entomo.jp',posicion:'catalogo',plan:'semestral',precio:90,vence:'2026-11-26',activo:true,url:'https://entomo.jp',imagen:''},
  ])
  const [form,setForm]=useState({cliente:'',pais:'',email:'',posicion:'header',plan:'mensual',url:'',imagen:''})
  const [msg,setMsg]=useState('')
  const [tab,setTab]=useState<'lista'|'nuevo'>('lista')
  const [guardando,setGuardando]=useState(false)
  
  useEffect(()=>{
    sanityClient.fetch('*[_type=="banner"] | order(_createdAt desc)').then((data:any[])=>{
      if(data&&data.length>0) setBanners(data.map(b=>({
        id:b._id,cliente:b.cliente,pais:b.pais||'',email:b.email||'',
        posicion:b.posicion||'header',plan:b.plan||'mensual',
        precio:b.precio||0,vence:b.vence||'',activo:b.activo,
        url:b.url||'',imagen:b.imagenUrl||''
      })))
    }).catch(()=>{})
  },[])

  const agregar=async()=>{
    if(!form.cliente||!form.email){setMsg('⚠️ Cliente y email son obligatorios');return}
    const plan=PLANES.find(p=>p.id===form.plan)!
    const vence=new Date(Date.now()+plan.dias*86400000).toISOString().split('T')[0]
    setGuardando(true)
    try{
      await sanityClient.create({
        _type:'banner',
        cliente:form.cliente,pais:form.pais,email:form.email,
        url:form.url,posicion:form.posicion,plan:form.plan,
        precio:plan.precio,vence,activo:true,imagenUrl:form.imagen
      })
    }catch(e){console.error(e)}
    setGuardando(false)
    setBanners(b=>[...b,{...form,id:Date.now(),precio:plan.precio,vence,activo:true}])
    setForm({cliente:'',pais:'',email:'',posicion:'header',plan:'mensual',url:'',imagen:''})
    setMsg(guardando?'Guardando...':'✅ Banner guardado en Sanity')
    setTab('lista')
  }

  const toggleActivo=(id:number)=>setBanners(b=>b.map(x=>x.id===id?{...x,activo:!x.activo}:x))
  const eliminar=(id:number)=>setBanners(b=>b.filter(x=>x.id!==id))

  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',padding:24,color:G}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <a href="/admin-panel" style={{color:G,textDecoration:'none',fontSize:'.8rem'}}>← Admin Panel</a>
          <h1 style={{fontSize:'1.2rem',fontWeight:300,letterSpacing:'.2em',color:'#E8C97A',margin:0}}>ALQUILER DE BANNERS</h1>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
          {PLANES.map(p=>(
            <div key={p.id} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:16,textAlign:'center'}}>
              <div style={{fontSize:'.7rem',color:'rgba(201,168,76,0.5)',letterSpacing:'.1em',marginBottom:6}}>{p.nm.toUpperCase()}</div>
              <div style={{fontSize:'1.4rem',color:'#E8C97A',fontWeight:700}}>${p.precio}</div>
              <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)'}}>{p.dias} días</div>
            </div>
          ))}
        </div>

        <div style={{display:'flex',gap:8,marginBottom:20}}>
          {(['lista','nuevo'] as const).map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{padding:'8px 20px',borderRadius:20,fontSize:'.75rem',cursor:'pointer',background:tab===t?G:'rgba(201,168,76,0.08)',color:tab===t?CARD:G,border:`1px solid ${tab===t?G:BD}`,fontFamily:'Georgia,serif',fontWeight:700}}>
              {t==='lista'?'📋 Banners Activos':'➕ Nuevo Banner'}
            </button>
          ))}
        </div>

        {tab==='lista'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
            <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>BANNERS ACTIVOS ({banners.filter(b=>b.activo).length})</h2>
            {banners.map(b=>(
              <div key={b.id} style={{border:`1px solid ${BD}`,borderRadius:8,padding:16,marginBottom:12,opacity:b.activo?1:0.5}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <div>
                    <span style={{color:'#E8C97A',fontWeight:700,fontSize:'.85rem'}}>{b.cliente}</span>
                    <span style={{color:'rgba(201,168,76,0.5)',fontSize:'.7rem',marginLeft:8}}>{b.pais}</span>
                  </div>
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>toggleActivo(b.id)} style={{fontSize:'.65rem',padding:'4px 10px',borderRadius:4,cursor:'pointer',background:b.activo?'rgba(37,211,102,0.1)':'rgba(255,100,100,0.1)',color:b.activo?'#25D366':'#ff6464',border:`1px solid ${b.activo?'#25D366':'#ff6464'}`,fontFamily:'Georgia,serif'}}>
                      {b.activo?'✅ Activo':'⏸ Pausado'}
                    </button>
                    <button onClick={()=>eliminar(b.id)} style={{fontSize:'.65rem',padding:'4px 10px',borderRadius:4,cursor:'pointer',background:'rgba(255,100,100,0.1)',color:'#ff6464',border:'1px solid #ff6464',fontFamily:'Georgia,serif'}}>🗑️</button>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,fontSize:'.68rem',color:'rgba(201,168,76,0.6)'}}>
                  <div>📍 {POSICIONES.find(p=>p.id===b.posicion)?.nm}</div>
                  <div>📅 Plan {b.plan}</div>
                  <div>💵 ${b.precio}</div>
                  <div>⏰ Vence {b.vence}</div>
                </div>
                <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginTop:6}}>✉️ {b.email} | 🔗 {b.url}</div>
              </div>
            ))}
          </div>
        )}

        {tab==='nuevo'&&(
          <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
            <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>NUEVO CLIENTE DE BANNER</h2>
            {msg&&<p style={{color:'#E8C97A',fontSize:'.75rem',marginBottom:12}}>{msg}</p>}
            {[
              {k:'cliente',label:'Empresa / Cliente',ph:'BioCollect Ltd'},
              {k:'pais',label:'País',ph:'🇩🇪 Alemania'},
              {k:'email',label:'Email',ph:'contact@empresa.com'},
              {k:'url',label:'URL destino',ph:'https://empresa.com'},
            ].map(({k,label,ph})=>(
              <div key={k} style={{marginBottom:12}}>
                <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>{label}</label>
                <input value={(form as any)[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))} placeholder={ph}
                  style={{width:'100%',background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif',boxSizing:'border-box'}}/>
              </div>
            ))}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              <div>
                <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>Posición</label>
                <select value={form.posicion} onChange={e=>setForm(f=>({...f,posicion:e.target.value}))}
                  style={{width:'100%',background:CARD,border:`1px solid ${BD}`,color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif'}}>
                  {POSICIONES.map(p=><option key={p.id} value={p.id}>{p.nm} — {p.desc}</option>)}
                </select>
              </div>
              <div>
                <label style={{fontSize:'.7rem',color:'rgba(201,168,76,0.6)',display:'block',marginBottom:4}}>Plan</label>
                <select value={form.plan} onChange={e=>setForm(f=>({...f,plan:e.target.value}))}
                  style={{width:'100%',background:CARD,border:`1px solid ${BD}`,color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif'}}>
                  {PLANES.map(p=><option key={p.id} value={p.id}>{p.nm} — ${p.precio}</option>)}
                </select>
              </div>
            </div>
            <button onClick={agregar} style={{width:'100%',background:G,color:CARD,border:'none',padding:'12px',borderRadius:8,cursor:'pointer',fontSize:'.85rem',fontFamily:'Georgia,serif',fontWeight:700}}>
              ➕ Agregar Banner
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
