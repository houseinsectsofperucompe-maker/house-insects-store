'use client'
import {useState,useEffect,useRef} from 'react'

type Banner={
  id:string,espacioId:string,empresa?:string,
  titulo?:string,subtitulo?:string,cta?:string,
  url?:string,imagen?:string,video?:string,
  color?:string,colorTexto?:string,
  activo:boolean,orden?:number,
  rubros?:string[],idiomas?:string[]
}

export default function BannerSlot({
  espacio,rubro='todos',intervalo=5000
}:{
  espacio:string,rubro?:string,intervalo?:number
}){
  const [banners,setBanners]=useState<Banner[]>([])
  const [idx,setIdx]=useState(0)
  const [prog,setProg]=useState(0)
  const timer=useRef<NodeJS.Timeout|null>(null)
  const progTimer=useRef<NodeJS.Timeout|null>(null)

  useEffect(()=>{
    fetch(`/api/banners?espacio=${espacio}&rubro=${rubro}&todos=1`)
      .then(r=>r.json())
      .then(d=>{
        const lista=(d.banners||[]).filter((b:Banner)=>b.activo)
        setBanners(lista)
      })
      .catch(()=>{})
  },[espacio,rubro])

  useEffect(()=>{
    if(banners.length<=1) return
    setProg(0)
    if(timer.current) clearInterval(timer.current)
    if(progTimer.current) clearInterval(progTimer.current)

    // Progreso
    const paso=100/(intervalo/100)
    progTimer.current=setInterval(()=>{
      setProg(p=>{
        if(p>=100) return 0
        return p+paso
      })
    },100)

    // Cambiar banner
    timer.current=setInterval(()=>{
      setIdx(i=>(i+1)%banners.length)
      setProg(0)
    },intervalo)

    return()=>{
      if(timer.current) clearInterval(timer.current)
      if(progTimer.current) clearInterval(progTimer.current)
    }
  },[banners,intervalo])

  if(banners.length===0) return null

  const b=banners[idx]
  if(!b) return null

  const color=b.color||'#1a1209'
  const colorTexto=b.colorTexto||'#C9A84C'

  const contenido=(
    <>
      {/* Barra de progreso */}
      {banners.length>1&&(
        <div style={{position:'absolute',top:0,left:0,height:3,background:'rgba(255,255,255,0.2)',width:'100%',zIndex:10}}>
          <div style={{height:'100%',background:colorTexto,width:`${prog}%`,transition:'width 0.1s linear'}}/>
        </div>
      )}
      {/* Indicadores */}
      {banners.length>1&&(
        <div style={{position:'absolute',bottom:8,left:'50%',transform:'translateX(-50%)',display:'flex',gap:6,zIndex:10}}>
          {banners.map((_,i)=>(
            <button key={i} onClick={()=>{setIdx(i);setProg(0)}}
              style={{width:i===idx?20:8,height:8,borderRadius:4,background:i===idx?colorTexto:'rgba(255,255,255,0.4)',
                border:'none',cursor:'pointer',padding:0,transition:'all 0.3s'}}/>
          ))}
        </div>
      )}
      {/* Contenido */}
      {b.video?(
        <video autoPlay loop muted playsInline
          style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}>
          <source src={b.video} type={b.video.endsWith('.webm')?'video/webm':'video/mp4'}/>
        </video>
      ):b.imagen&&!b.titulo?(
        <img src={b.imagen} alt={b.empresa||'Banner'}
          style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
      ):(
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
          padding:espacio==='sidebar'?'20px 16px':'12px 24px',height:'100%',gap:12}}>
          {b.imagen&&(
            <img src={b.imagen} alt={b.empresa||''}
              style={{height:espacio==='hero'?60:36,objectFit:'contain',flexShrink:0}}/>
          )}
          <div style={{flex:1}}>
            {b.titulo&&<p style={{color:colorTexto,fontWeight:'bold',margin:0,fontFamily:'Georgia,serif',
              fontSize:espacio==='hero'?'1.1rem':espacio==='sidebar'?'.9rem':'.8rem'}}>{b.titulo}</p>}
            {b.subtitulo&&<p style={{color:colorTexto,margin:0,opacity:.8,fontFamily:'Georgia,serif',
              fontSize:espacio==='hero'?'.8rem':'.7rem'}}>{b.subtitulo}</p>}
          </div>
          {b.cta&&b.url&&(
            <a href={b.url} target="_blank" rel="noopener noreferrer"
              style={{padding:'6px 14px',background:colorTexto,color,borderRadius:6,
                textDecoration:'none',fontWeight:'bold',fontSize:'.75rem',
                fontFamily:'Georgia,serif',flexShrink:0,whiteSpace:'nowrap' as const}}>
              {b.cta}
            </a>
          )}
        </div>
      )}
      {/* Overlay texto en video/imagen */}
      {(b.video||b.imagen)&&b.titulo&&(
        <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',
          justifyContent:'center',background:'rgba(0,0,0,0.35)'}}>
          <div style={{textAlign:'center' as const,padding:20}}>
            <p style={{color:'#fff',fontSize:'1.2rem',fontWeight:'bold',margin:'0 0 8px',
              textShadow:'0 2px 8px rgba(0,0,0,0.8)',fontFamily:'Georgia,serif'}}>{b.titulo}</p>
            {b.subtitulo&&<p style={{color:'rgba(255,255,255,0.85)',fontSize:'.85rem',
              margin:'0 0 12px',fontFamily:'Georgia,serif'}}>{b.subtitulo}</p>}
            {b.cta&&b.url&&(
              <a href={b.url} target="_blank" rel="noopener noreferrer"
                style={{padding:'8px 20px',background:colorTexto,color,borderRadius:6,
                  textDecoration:'none',fontWeight:'bold',fontSize:'.85rem',fontFamily:'Georgia,serif'}}>
                {b.cta}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )

  const alturas:Record<string,number>={
    hero:400,header:60,footer:120,sidebar:400,
    'entre-productos':150,carrito:150,especimen:120
  }
  const altura=alturas[espacio]||80

  return(
    <div style={{
      width:'100%',
      display:'flex',
      justifyContent:'center',
      background:'transparent',
    }}>
      <div style={{
        width:'100%',
        maxWidth:espacio==='sidebar'?280:1400,
        height:altura,
        background:color,
        position:'relative' as const,
        overflow:'hidden',
        borderRadius:espacio==='sidebar'?12:0,
        cursor:b.url?'pointer':'default',
      }}
        onClick={()=>{if(b.url&&!b.video&&!b.titulo) window.open(b.url,'_blank')}}>
        {contenido}
      </div>
    </div>
  )
}
