import {NextRequest,NextResponse} from 'next/server'

const BUNNY_API_KEY=process.env.BUNNY_API_KEY||''
const BUNNY_ZONE=process.env.BUNNY_STORAGE_ZONE||'HouseInsects1967'
const CDN_URL='https://HouseInsects1967.b-cdn.net'

export async function POST(req:NextRequest){
  try{
    const formData=await req.formData()
    const file=formData.get('file') as File
    if(!file) return NextResponse.json({error:'No file'},{ status:400})

    const ext=file.name.split('.').pop()?.toLowerCase()||'jpg'
    const esVideo=['mp4','webm','mov'].includes(ext)
    const esImagen=['jpg','jpeg','png','gif','webp'].includes(ext)

    if(!esVideo&&!esImagen) return NextResponse.json({error:'Formato no soportado'},{status:400})

    const bytes=await file.arrayBuffer()
    const buffer=Buffer.from(bytes)

    // Nombre unico
    const nombre=`banners/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g,'_')}`

    // Subir a Bunny.net
    const res=await fetch(`https://storage.bunnycdn.com/${BUNNY_ZONE}/${nombre}`,{
      method:'PUT',
      headers:{
        'AccessKey':BUNNY_API_KEY,
        'Content-Type':file.type||'application/octet-stream',
      },
      body:buffer
    })

    if(!res.ok){
      const txt=await res.text()
      return NextResponse.json({error:'Bunny error: '+txt},{status:500})
    }

    const url=`${CDN_URL}/${nombre}`
    return NextResponse.json({ok:true,url,tipo:esVideo?'video':'imagen',ext})

  }catch(e){
    return NextResponse.json({error:'Error: '+String(e)},{status:500})
  }
}
