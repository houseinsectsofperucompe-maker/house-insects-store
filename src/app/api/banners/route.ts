import {NextRequest,NextResponse} from 'next/server'
import {Redis} from '@upstash/redis'

const r=new Redis({url:'https://topical-weasel-107403.upstash.io',token:'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA'})

type Banner={id:string,espacioId:string,titulo:string,subtitulo:string,cta:string,url:string,imagen:string,color:string,colorTexto:string,activo:boolean,orden:number,rubros:string[],idiomas:string[]}

export async function GET(req:NextRequest){
  const espacio=req.nextUrl.searchParams.get('espacio')||''
  const rubro=req.nextUrl.searchParams.get('rubro')||'todos'
  
  const banners=await r.get<Banner[]>('banners:activos')
  if(!banners) return NextResponse.json({banner:null})
  
  if(espacio==='all') return NextResponse.json({todos:banners})

  const candidatos=banners
    .filter(b=>b.activo&&b.espacioId===espacio)
    .filter(b=>b.rubros?.includes('todos')||b.rubros?.includes(rubro))
    .sort((a,b)=>(a.orden||0)-(b.orden||0))

  // Si pide todos los banners del espacio
  const todosEspacio=req.nextUrl.searchParams.get('todos')
  if(todosEspacio) return NextResponse.json({banners:candidatos})
  
  return NextResponse.json({banner:candidatos[0]||null,banners:candidatos})
}

export async function POST(req:NextRequest){
  const body=await req.json()
  const {accion,banner,id,campo,valor}=body
  
  const banners=await r.get<Banner[]>('banners:activos')||[]
  
  if(accion==='crear'){
    const nuevo={...banner,id:'ban_'+Date.now(),orden:banners.length+1,activo:true}
    await r.set('banners:activos',[...banners,nuevo])
    return NextResponse.json({ok:true,banner:nuevo})
  }
  
  if(accion==='toggleActivo'){
    const nuevos=banners.map(b=>b.id===id?{...b,activo:!b.activo}:b)
    await r.set('banners:activos',nuevos)
    return NextResponse.json({ok:true})
  }
  
  if(accion==='eliminar'){
    await r.set('banners:activos',banners.filter(b=>b.id!==id))
    return NextResponse.json({ok:true})
  }
  
  if(accion==='subir'){
    const idx=banners.findIndex(b=>b.id===id)
    if(idx>0){
      const nuevos=[...banners]
      ;[nuevos[idx-1],nuevos[idx]]=[nuevos[idx],nuevos[idx-1]]
      nuevos.forEach((b,i)=>b.orden=i+1)
      await r.set('banners:activos',nuevos)
    }
    return NextResponse.json({ok:true})
  }
  
  if(accion==='bajar'){
    const idx=banners.findIndex(b=>b.id===id)
    if(idx<banners.length-1){
      const nuevos=[...banners]
      ;[nuevos[idx],nuevos[idx+1]]=[nuevos[idx+1],nuevos[idx]]
      nuevos.forEach((b,i)=>b.orden=i+1)
      await r.set('banners:activos',nuevos)
    }
    return NextResponse.json({ok:true})
  }
  
  if(accion==='moverEspacio'){
    const nuevos=banners.map(b=>b.id===id?{...b,espacioId:valor}:b)
    await r.set('banners:activos',nuevos)
    return NextResponse.json({ok:true})
  }
  
  if(accion==='cambiarRubros'){
    const nuevos=banners.map(b=>b.id===id?{...b,rubros:valor}:b)
    await r.set('banners:activos',nuevos)
    return NextResponse.json({ok:true})
  }
  
  if(accion==='actualizar'){
    const nuevos=banners.map(b=>b.id===id?{...b,[campo]:valor}:b)
    await r.set('banners:activos',nuevos)
    return NextResponse.json({ok:true})
  }
  
  return NextResponse.json({ok:false,error:'Acción no reconocida'})
}
