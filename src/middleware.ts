
import {NextRequest,NextResponse} from 'next/server'

const PASSWORD='HouseInsects2026@'
const COOKIE='hip_admin_auth'

export function middleware(req:NextRequest){
  const path=req.nextUrl.pathname
  
  if(!path.startsWith('/admin-panel')&&!path.startsWith('/admin')) return NextResponse.next()
  
  const cookie=req.cookies.get(COOKIE)
  if(cookie?.value===PASSWORD) return NextResponse.next()
  
  const url=req.nextUrl.clone()
  url.pathname='/admin-login'
  return NextResponse.redirect(url)
}

export const config={matcher:['/admin-panel/:path*','/admin/:path*']}
