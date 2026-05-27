
import {NextRequest,NextResponse} from 'next/server'

const PASSWORD='HouseInsects2026@'
const COOKIE='hip_admin_auth'

export async function POST(req:NextRequest){
  const {password}=await req.json()
  if(password===PASSWORD){
    const res=NextResponse.json({ok:true})
    res.cookies.set(COOKIE,PASSWORD,{httpOnly:true,secure:true,maxAge:60*60*24*7,path:'/'})
    return res
  }
  return NextResponse.json({ok:false},{status:401})
}
