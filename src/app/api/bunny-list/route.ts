
import {NextRequest,NextResponse} from 'next/server'
export async function GET(req:NextRequest){
  const folder=req.nextUrl.searchParams.get('folder')||'brassolidae'
  try{
    const res=await fetch(`https://sg.storage.bunnycdn.com/housensectsperu/${folder}/`,{
      headers:{'AccessKey':'51da13d3-4922-4e5c-8e4a03b36bb5-d3ec-4d2b'}
    })
    const data=await res.json()
    const files=(data||[]).map((f:any)=>({
      nombre:f.ObjectName,
      url:`https://HouseInsects1967.b-cdn.net/${folder}/${f.ObjectName}`,
      tamano:f.Length
    }))
    return NextResponse.json({files})
  }catch(e:any){
    return NextResponse.json({files:[],error:e.message})
  }
}
