import {NextRequest,NextResponse} from 'next/server'

export async function POST(req:NextRequest){
  try{
    const filename=req.headers.get('x-filename')||'foto.webp'
    const folder=req.headers.get('x-folder')||'general'
    const body=await req.arrayBuffer()
    const url='https://sg.storage.bunnycdn.com/housensectsperu/'+folder+'/'+filename
    const res=await fetch(url,{
      method:'PUT',
      headers:{'AccessKey':'51da13d3-4922-4e5c-8e4a03b36bb5-d3ec-4d2b','Content-Type':'application/octet-stream'},
      body:Buffer.from(body)
    })
    const data=await res.json()
    const cdnUrl='https://HouseInsects1967.b-cdn.net/'+folder+'/'+filename
    return NextResponse.json({ok:res.ok,url:cdnUrl,data})
  }catch(e:any){
    return NextResponse.json({ok:false,error:e.message},{status:500})
  }
}
