'use client'
import {useState,useEffect} from 'react'

type Banner={id:string,espacioId:string,empresa?:string,titulo:string,subtitulo:string,cta:string,url:string,imagen:string,video?:string,color:string,colorTexto:string,activo:boolean,orden:number,rubros:string[],idiomas:string[]}

export default function BannerSlot({espacio,rubro='todos',className=''}:{espacio:string,rubro?:string,className?:string}){
  const [banner,setBanner]=useState<Banner|null>(null)

  useEffect(()=>{
    fetch(`/api/banners?espacio=${espacio}&rubro=${rubro}`)
      .then(r=>r.json())
      .then(d=>{if(d.banner)setBanner(d.banner)})
      .catch(()=>{})
  },[espacio,rubro])

  if(!banner)return null

  // Banner video
  if(banner.video){
    return(
      <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
        <a href={banner.url||'#'} target="_blank" rel="noopener noreferrer"
          style={{display:'block',width:'100%',maxWidth:1200,textDecoration:'none',position:'relative' as const}}>
          <video autoPlay loop muted playsInline
            style={{width:'100%',height:'auto',display:'block',objectFit:'cover',borderRadius:6}}>
            <source src={banner.video} type={banner.video.endsWith('.webm')?'video/webm':'video/mp4'}/>
          </video>
          {banner.titulo&&(
            <div style={{position:'absolute' as const,inset:0,display:'flex',alignItems:'center',
              justifyContent:'center',background:'rgba(0,0,0,0.3)',borderRadius:6}}>
              <div style={{textAlign:'center' as const,padding:20}}>
                <p style={{color:'#fff',fontSize:'1.2rem',fontWeight:'bold',margin:'0 0 8px',
                  textShadow:'0 2px 8px rgba(0,0,0,0.8)',fontFamily:'Georgia,serif'}}>{banner.titulo}</p>
                {banner.subtitulo&&<p style={{color:'rgba(255,255,255,0.85)',fontSize:'.85rem',
                  margin:'0 0 12px',fontFamily:'Georgia,serif'}}>{banner.subtitulo}</p>}
                {banner.cta&&<span style={{padding:'8px 20px',background:banner.colorTexto||'#C9A84C',
                  color:banner.color||'#1a1209',borderRadius:6,fontWeight:'bold',fontSize:'.85rem',
                  fontFamily:'Georgia,serif'}}>{banner.cta}</span>}
              </div>
            </div>
          )}
        </a>
      </div>
    )
  }

  // Si tiene imagen y no tiene titulo — mostrar como banner imagen completa
  if(banner.imagen && !banner.titulo){
    return(
      <a href={banner.url||'#'} target="_blank" rel="noopener noreferrer" style={{display:'block',width:'100%',textDecoration:'none'}}>
        <img src={banner.imagen} alt={banner.empresa||'Banner'} style={{width:'100%',height:'auto',display:'block',objectFit:'cover'}}/>
      </a>
    )
  }

  const estilos:Record<string,React.CSSProperties>={
    hero:{width:'100%',minHeight:120,padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16},
    header:{width:'100%',height:60,maxWidth:460,padding:'0 16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,margin:'0 auto'},
    footer:{width:'100%',maxWidth:1200,padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,margin:'0 auto'},
    sidebar:{width:260,padding:'20px 16px',display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:12},
    'entre-productos':{width:'100%',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
    carrito:{width:'100%',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
    especimen:{width:'100%',padding:'14px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12},
  }

  const estilo=estilos[espacio]||estilos.header

  return(
    <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
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
    </div>
  )
}
