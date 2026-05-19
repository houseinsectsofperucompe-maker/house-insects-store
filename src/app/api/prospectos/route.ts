import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { nicho, pais, cargo } = await req.json()
    
    const res = await fetch('https://api.apollo.io/v1/mixed_people/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.APOLLO_API_KEY || '',
      },
      body: JSON.stringify({
        q_keywords: nicho,
        person_titles: [cargo || 'curator', 'director', 'collector', 'buyer', 'procurement'],
        person_locations: [pais || 'worldwide'],
        page: 1,
        per_page: 25,
      })
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Error buscando prospectos' }, { status: 500 })
  }
}
