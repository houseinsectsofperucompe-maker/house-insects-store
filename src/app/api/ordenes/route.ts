import { NextResponse } from 'next/server'
import ordenes from '@/data/ordenes.json'

export const revalidate = 3600

export async function GET() {
  return NextResponse.json(ordenes, {
    headers: {'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'}
  })
}
