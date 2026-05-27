'use client'
import {useState,useEffect} from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'

export default function DemografiaPage(){
  const [paises,setPaises]=useState<{pais:string;usuarios:number;sesiones:number;vistas:number}[]>([])
  const [cargando,setCargando]=useState(true)
  const [busqueda,setBusqueda]=useState('')
  const [error,setError]=useState('')

  useEffect(()=>{
    fetch('/api/analytics')
      .then(r=>r.json())
      .then(data=>{
        if(data.ok) setPaises(data.paises)
        else setError(data.error||'Error al cargar')
        setCargando(false)
      })
      .catch(e=>{setError(e.message);setCargando(false)})
  },[])

  const paisesFiltrados=paises.filter(p=>p.pais.toLowerCase().includes(busqueda.toLowerCase()))
  const totalUsuarios=paises.reduce((a,p)=>a+p.usuarios,0)
  const totalSesiones=paises.reduce((a,p)=>a+p.sesiones,0)
  const totalVistas=paises.reduce((a,p)=>a+p.vistas,0)

  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',padding:24,color:G}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <a href="/admin-panel" style={{color:G,textDecoration:'none',fontSize:'.8rem'}}>← Admin Panel</a>
          <h1 style={{fontSize:'1.2rem',fontWeight:300,letterSpacing:'.2em',color:'#E8C97A',margin:0}}>DEMOGRAFÍA DE CLIENTES</h1>
          <span style={{fontSize:'.65rem',color:'rgba(201,168,76,0.4)',marginLeft:'auto'}}>Google Analytics · Últimos 30 días</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:24}}>
          {[
            {label:'Total Usuarios',valor:cargando?'..':totalUsuarios.toLocaleString(),icon:'👥'},
            {label:'Total Sesiones',valor:cargando?'..':totalSesiones.toLocaleString(),icon:'📊'},
            {label:'Total Vistas',valor:cargando?'..':totalVistas.toLocaleString(),icon:'👁️'},
          ].map(({label,valor,icon})=>(
            <div key={label} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:16,textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',marginBottom:4}}>{icon}</div>
              <div style={{fontSize:'1.2rem',color:'#E8C97A',fontWeight:700}}>{valor}</div>
              <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)'}}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>🌍 VISITANTES POR PAÍS</h2>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar país..."
            style={{width:'100%',background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'8px 12px',borderRadius:6,fontSize:'.78rem',fontFamily:'Georgia,serif',boxSizing:'border-box',marginBottom:16}}/>
          {cargando&&<p style={{color:G,fontSize:'.8rem',textAlign:'center'}}>⏳ Cargando datos reales...</p>}
          {error&&<p style={{color:'#ff6464',fontSize:'.75rem'}}>❌ {error}</p>}
          {!cargando&&!error&&(
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.75rem'}}>
                <thead>
                  <tr style={{borderBottom:`1px solid ${BD}`}}>
                    {['País','Usuarios','Sesiones','Vistas'].map(h=>(
                      <th key={h} style={{color:'rgba(201,168,76,0.6)',padding:'8px 12px',textAlign:'left',fontWeight:400,letterSpacing:'.1em'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paisesFiltrados.map(p=>(
                    <tr key={p.pais} style={{borderBottom:`1px solid rgba(201,168,76,0.06)`}}>
                      <td style={{padding:'10px 12px',color:'#E8C97A'}}>{p.pais}</td>
                      <td style={{padding:'10px 12px',color:G}}>{p.usuarios}</td>
                      <td style={{padding:'10px 12px',color:G}}>{p.sesiones}</td>
                      <td style={{padding:'10px 12px',color:G}}>{p.vistas}</td>
                    </tr>
                  ))}
                  {paisesFiltrados.length===0&&<tr><td colSpan={4} style={{padding:20,textAlign:'center',color:'rgba(201,168,76,0.4)',fontSize:'.75rem'}}>No hay datos disponibles aún</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}