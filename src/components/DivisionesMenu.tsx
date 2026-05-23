'use client'
import { useState } from 'react'
import React from 'react'
const D=[
{id:1,img:'https://res.cloudinary.com/dv3mvukmq/image/upload/w_40,h_40,c_fill,r_max/v1779509553/house-insects/morphidae-male/machilles.webp',n:'Entomologia & Arte',r:[
{n:'Especimenes Biologicos Secos',u:'/catalogo/especimenes'},
{n:'Cuadros de Mariposa Tropical',u:'/catalogo/artesanias'},
{n:'Joyeria Natural',u:'/catalogo/joyeria'},
{n:'Rarezas & Gynandromorphs',u:'/catalogo/rarezas'},
{n:'Artesanias & Cupulas',u:'/catalogo/cupulas'},
{n:'Herramientas Biologicas',u:'/catalogo/herramientas'}
]},
{id:2,img:'https://res.cloudinary.com/dv3mvukmq/image/upload/w_40,h_40,c_fill,r_max/v1779529284/house-insects/referencias/bio-trade-natural.webp',n:'Bio-Trade & Naturales',r:[
{n:'Semillas & Plantas Medicinales',u:'/catalogo/semillas'},
{n:'Frutas Exoticas & Deshidratadas',u:'/catalogo/frutas'},
{n:'Hongos & Productos Naturales',u:'/catalogo/hongos'},
{n:'Alimentos Deshidratados',u:'/catalogo/alimentos'},
{n:'Esencias & Aceites Naturales',u:'/catalogo/esencias'},
{n:'Minerales & Piedras Preciosas',u:'/catalogo/minerales'},
{n:'Superalimentos',u:'/catalogo/superalimentos'}
]},
{id:3,img:'https://res.cloudinary.com/dv3mvukmq/image/upload/w_40,h_40,c_fill,r_max/v1779528922/house-insects/cuadros/cuadro-arte-amazonia.webp',n:'Artesanias & Cultura',r:[
{n:'Textileria & Alpaca',u:'/catalogo/textileria'},
{n:'Textileria Amazonica',u:'/catalogo/textileria-amazonica'},
{n:'Pinturas & Arte Rupestre',u:'/catalogo/pinturas'},
{n:'Maderas Finas & Esculturas',u:'/catalogo/maderas'}
]}
]
export default function DivisionesMenu(){
const [w,setW]=React.useState(typeof window!=='undefined'?window.innerWidth:1200)
React.useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener('resize',h);return()=>window.removeEventListener('resize',h)},[])
const mobile=w<640
const [a,setA]=useState<number|null>(null)
return(
<div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',margin:'24px 0'}}>
{D.map(d=>(
<div key={d.id} style={{position:'relative'}}>
<button onClick={()=>setA(a===d.id?null:d.id)} style={{background:'#1A1209',border:'1px solid #C9A84C',color:'#C9A84C',padding:'10px 20px',borderRadius:6,fontSize:'.8rem',fontWeight:700,cursor:'pointer',fontFamily:'Georgia,serif',display:'flex',alignItems:'center',gap:8}}>
<img src={d.img} style={{width:28,height:28,borderRadius:'50%',objectFit:'cover',border:'1px solid #C9A84C'}}/>{d.n} {a===d.id?'▲':'▼'}
</button>
{a===d.id&&(
<div style={{position:'absolute',top:'110%',left:0,background:'#1A1209',border:'1px solid #C9A84C',borderRadius:8,minWidth:260,zIndex:999,boxShadow:'0 8px 32px rgba(0,0,0,0.6)'}}>
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