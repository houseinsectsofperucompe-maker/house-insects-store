import { NextResponse } from 'next/server'
export async function GET() {
  return new Response('Acceso Restringido - House Insects of Peru', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  })
}
