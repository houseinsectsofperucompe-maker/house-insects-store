'use client'
import {useState,useEffect} from 'react'

type Banner={id:string,espacioId:string,titulo:string,subtitulo:string,cta:string,url:string,imagen:string,color:string,colorTexto:string,activo:boolean,orden:number,rubros:string[],idiomas:string[]}

export default function BannerSlot({espacio,rubro='todos',className=''}:{espacio:string,rubro?:string,className?:string}){
  const [banner,setBanner]=useState<Banner|null>(null)

  useEffect(()=>{
    fetch(`/api/banners?espacio=${espacio}&rubro=${rubro}`)
      .then(r=>r.json())
      .then(d=>{if(d.banner)setBanner(d.banner)})
      .catch(()=>{})
  },[espacio,rubro])

  if(!banner)return null

  const estilos:Record<string,React.CSSProperties>={
    hero:{width:'100%',minHeight:120,padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16},
    header:{width:'100%',height:60,maxWidth:460,padding:'0 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,margin:'0 auto'},
    footer:{width:'100%',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
    sidebar:{width:260,padding:'20px 16px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:12},
    'entre-productos':{width:'100%',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
    carrito:{width:'100%',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
    especimen:{width:'100%',padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
  }

  const estilo=estilos[espacio]||estilos.header

  return(
    <div style={{background:banner.color,borderRadius:espacio==='sidebar'?12:6,...estilo}} className={className}>
      {banner.imagen&&(
        <img src={banner.imagen} alt={banner.titulo}
          style={{height:espacio==='hero'?60:40,objectFit:'contain',flexShrink:0}}/>
      )}
      <div style={{flex:1}}>
        <p style={{color:banner.colorTexto,fontWeight:'bold',margin:0,
          fontSize:espacio==='hero'?'1.1rem':espacio==='sidebar'?'.9rem':'.8rem',
          fontFamily:'Georgia,serif'}}>
          {banner.titulo}
        </p>
        {banner.subtitulo&&(
          <p style={{color:banner.colorTexto,margin:0,opacity:.8,
            fontSize:espacio==='hero'?'.8rem':'.7rem',fontFamily:'Georgia,serif'}}>
            {banner.subtitulo}
          </p>
        )}
      </div>
      {banner.url&&(
        <a href={banner.url} target="_blank" rel="noopener noreferrer"
          style={{padding:espacio==='sidebar'?'8px 16px':'6px 14px',
            background:banner.colorTexto,color:banner.color,
            borderRadius:6,textDecoration:'none',fontWeight:'bold',
            fontSize:'.75rem',fontFamily:'Georgia,serif',flexShrink:0,
            whiteSpace:'nowrap'}}>
          {banner.cta||'Ver más →'}
        </a>
      )}
    </div>
  )
}
