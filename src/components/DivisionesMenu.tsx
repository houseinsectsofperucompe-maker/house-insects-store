'use client'
import { useState } from 'react'
const D=[{id:1,n:'🦋 Entomologia & Arte',r:[{n:'🦋 Especimenes',u:'/catalogo/especimenes'},{n:'🌙 Nocturnas',u:'/catalogo/nocturnas'},{n:'🪲 Coleopteros & Artropodos',u:'/catalogo/coleoptera'},{n:'✨ Joyeria Natural',u:'/catalogo/joyeria'},{n:'🗿 Artesanias & Resinas',u:'/catalogo/artesanias'},{n:'🔬 Herramientas Biologicas',u:'/catalogo/herramientas'},{n:'⭐ Rarezas',u:'/catalogo/rarezas'},{n:'🖼️ Cuadros & Cupulas',u:'/catalogo/cupulas'}]},{id:2,n:'🌿 Bio-Trade & Naturales',r:[{n:'🍎 Frutas Exoticas',u:'/catalogo/frutas'},{n:'🌱 Semillas & Plantas',u:'/catalogo/semillas'},{n:'🌶️ Alimentos',u:'/catalogo/alimentos'},{n:'🫧 Superalimentos',u:'/catalogo/superalimentos'},{n:'🍄 Hongos',u:'/catalogo/hongos'},{n:'🌸 Esencias & Aceites',u:'/catalogo/esencias'},{n:'💎 Minerales',u:'/catalogo/minerales'}]},{id:3,n:'🎨 Artesanias & Cultura',r:[{n:'🧶 Textileria & Alpaca',u:'/catalogo/textileria'},{n:'🌿 Textileria Amazonica',u:'/catalogo/textileria-amazonica'},{n:'🎨 Pinturas & Arte',u:'/catalogo/pinturas'},{n:'🪵 Maderas & Esculturas',u:'/catalogo/maderas'}]}]
export default function DivisionesMenu(){
const [a,setA]=useState<number|null>(null)
return(
<div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',margin:'24px 0'}}>
{D.map(d=>(
<div key={d.id} style={{position:'relative'}}>
<button onClick={()=>setA(a===d.id?null:d.id)} style={{background:'#1A1209',border:'1px solid #C9A84C',color:'#C9A84C',padding:'10px 20px',borderRadius:6,fontSize:'.8rem',fontWeight:700,cursor:'pointer',fontFamily:'Georgia,serif'}}>
{d.n} {a===d.id?'▲':'▼'}
</button>
{a===d.id&&(
<div style={{position:'absolute',top:'110%',left:0,background:'#1A1209',border:'1px solid #C9A84C',borderRadius:8,minWidth:240,zIndex:999,boxShadow:'0 8px 32px rgba(0,0,0,0.6)'}}>
{d.r.map(r=>(
<a key={r.u} href={r.u} style={{display:'block',padding:'10px 16px',color:'#E8C97A',textDecoration:'none',fontSize:'.8rem',fontFamily:'Georgia,serif',borderBottom:'1px solid rgba(201,168,76,0.1)'}}>
{r.n}
</a>
))}
</div>
)}
</div>
))}
</div>
)
}
