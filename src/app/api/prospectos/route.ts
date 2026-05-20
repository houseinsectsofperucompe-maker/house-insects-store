import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { nicho, pais, cargo } = await req.json()

    const must: any[] = []

    if (cargo) {
      must.push({ match: { job_title: cargo.split(' ')[0] } })
    }

    const body: any = { size: 25 }

    if (must.length > 0) {
      body.query = { bool: { must } }
    }

    if (pais && pais !== 'all') {
      body.query = body.query || { bool: { must: [] } }
      body.query.bool.must.push({ term: { location_country: pais } })
    }

    const res = await fetch('https://api.peopledatalabs.com/v5/person/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.PDL_API_KEY || '',
      },
      body: JSON.stringify(body)
    })

    const data = await res.json()

    if (data.data && data.data.length > 0) {
      const people = data.data.map((p: any) => ({
        name: `${p.first_name || ''} ${p.last_name || ''}`.trim(),
        title: p.job_title || '',
        organization_name: p.job_company_name || '',
        email: p.work_email || '',
        country: p.location_country || '',
        linkedin_url: p.linkedin_url ? `https://${p.linkedin_url}` : '',
      }))
      return NextResponse.json({ people, total: data.total })
    }

    // Si no hay resultados con pais, buscar globalmente
    const res2 = await fetch('https://api.peopledatalabs.com/v5/person/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.PDL_API_KEY || '',
      },
      body: JSON.stringify({
        query: { bool: { must: [{ match: { job_title: cargo?.split(' ')[0] || 'director' } }] } },
        size: 25
      })
    })
    const data2 = await res2.json()
    if (data2.data && data2.data.length > 0) {
      const people = data2.data.map((p: any) => ({
        name: `${p.first_name || ''} ${p.last_name || ''}`.trim(),
        title: p.job_title || '',
        organization_name: p.job_company_name || '',
        email: p.work_email || '',
        country: p.location_country || '',
        linkedin_url: p.linkedin_url ? `https://${p.linkedin_url}` : '',
      }))
      return NextResponse.json({ people, total: data2.total })
    }

    return NextResponse.json({ people: [], total: 0 })
  } catch(e) {
    return NextResponse.json({ error: 'Error buscando prospectos' }, { status: 500 })
  }
}
