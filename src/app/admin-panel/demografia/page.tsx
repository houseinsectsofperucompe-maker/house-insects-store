'use client'
import {useState} from 'react'

const G='#C9A84C',BG='#0A0A05',CARD='#1A1209',BD='rgba(201,168,76,0.2)'

const PAISES=[
  {nm:'🇩🇪 Alemania',clientes:142,pedidos:89,total:4200},
  {nm:'🇯🇵 Japón',clientes:98,pedidos:67,total:8900},
  {nm:'🇺🇸 USA',clientes:87,pedidos:54,total:3200},
  {nm:'🇨🇳 China',clientes:76,pedidos:43,total:5600},
  {nm:'🇬🇧 UK',clientes:65,pedidos:38,total:2800},
  {nm:'🇫🇷 Francia',clientes:54,pedidos:32,total:1900},
  {nm:'🇦🇪 Dubai',clientes:43,pedidos:28,total:12000},
  {nm:'🇦🇺 Australia',clientes:38,pedidos:22,total:1800},
  {nm:'🇧🇷 Brasil',clientes:32,pedidos:18,total:900},
  {nm:'🇨🇦 Canadá',clientes:28,pedidos:15,total:1200},
]

const NICHOS=[
  {nm:'🏛️ Museos & Científicos',pct:32},
  {nm:'💎 Coleccionistas Lujo',pct:28},
  {nm:'🎨 Galerías Arte',pct:15},
  {nm:'💍 Joyería Alta Moda',pct:12},
  {nm:'🏨 Hoteles 5 Estrellas',pct:8},
  {nm:'🔬 Farmacéutica',pct:5},
]

export default function DemografiaPage(){
  const [busqueda,setBusqueda]=useState('')
  const [filtro,setFiltro]=useState('todos')

  const paisesFiltrados=PAISES.filter(p=>
    p.nm.toLowerCase().includes(busqueda.toLowerCase())
  )

  return(
    <main style={{minHeight:'100vh',background:BG,fontFamily:'Georgia,serif',padding:24,color:G}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:24}}>
          <a href="/admin-panel" style={{color:G,textDecoration:'none',fontSize:'.8rem'}}>← Admin Panel</a>
          <h1 style={{fontSize:'1.2rem',fontWeight:300,letterSpacing:'.2em',color:'#E8C97A',margin:0}}>DEMOGRAFÍA DE CLIENTES</h1>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:24}}>
          {[
            {label:'Total Clientes',valor:'663',icon:'👥'},
            {label:'Países',valor:'47',icon:'🌍'},
            {label:'Pedidos Totales',valor:'406',icon:'📦'},
            {label:'Ingresos USD',valor:'$42,500',icon:'💵'},
          ].map(({label,valor,icon})=>(
            <div key={label} style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:16,textAlign:'center'}}>
              <div style={{fontSize:'1.5rem',marginBottom:4}}>{icon}</div>
              <div style={{fontSize:'1.2rem',color:'#E8C97A',fontWeight:700}}>{valor}</div>
              <div style={{fontSize:'.65rem',color:'rgba(201,168,76,0.5)'}}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20,marginBottom:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:12,color:'#E8C97A'}}>🔍 BUSCAR CLIENTES POR PAÍS</h2>
          <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="Buscar país..."
            style={{width:'100%',background:'rgba(201,168,76,0.05)',border:`1px solid ${BD}`,color:'#E8C97A',padding:'10px 14px',borderRadius:6,fontSize:'.8rem',fontFamily:'Georgia,serif',boxSizing:'border-box',marginBottom:16}}/>
          <div style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.75rem'}}>
              <thead>
                <tr style={{borderBottom:`1px solid ${BD}`}}>
                  {['País','Clientes','Pedidos','Total USD','Promedio'].map(h=>(
                    <th key={h} style={{color:'rgba(201,168,76,0.6)',padding:'8px 12px',textAlign:'left',fontWeight:400,letterSpacing:'.1em'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paisesFiltrados.map(p=>(
                  <tr key={p.nm} style={{borderBottom:`1px solid rgba(201,168,76,0.06)`}}>
                    <td style={{padding:'10px 12px',color:'#E8C97A'}}>{p.nm}</td>
                    <td style={{padding:'10px 12px',color:G}}>{p.clientes}</td>
                    <td style={{padding:'10px 12px',color:G}}>{p.pedidos}</td>
                    <td style={{padding:'10px 12px',color:'#E8C97A',fontWeight:700}}>${p.total.toLocaleString()}</td>
                    <td style={{padding:'10px 12px',color:G}}>${Math.round(p.total/p.pedidos)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{background:CARD,border:`1px solid ${BD}`,borderRadius:10,padding:20}}>
          <h2 style={{fontSize:'.85rem',letterSpacing:'.15em',marginBottom:16,color:'#E8C97A'}}>🎯 NICHOS DE CLIENTES</h2>
          {NICHOS.map(n=>(
            <div key={n.nm} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4,fontSize:'.75rem'}}>
                <span style={{color:'#E8C97A'}}>{n.nm}</span>
                <span style={{color:G}}>{n.pct}%</span>
              </div>
              <div style={{background:'rgba(201,168,76,0.08)',borderRadius:4,height:8}}>
                <div style={{background:G,height:8,borderRadius:4,width:n.pct+'%'}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
