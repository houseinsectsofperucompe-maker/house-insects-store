import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { nicho, pais, cargo } = await req.json()

    const query: any = {
      query: {
        bool: {
          must: [
            { match: { job_title: cargo || 'director curator buyer collector' } },
          ]
        }
      },
      size: 25,
      pretty: true
    }

    if (pais) {
      query.query.bool.must.push({ term: { 'location_country': pais } })
    }

    if (nicho) {
      query.query.bool.must.push({ match: { 'job_company_industry': nicho } })
    }

    const res = await fetch('https://api.peopledatalabs.com/v5/person/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.PDL_API_KEY || '',
      },
      body: JSON.stringify(query)
    })

    const data = await res.json()

    if (data.data && data.data.length > 0) {
      const people = data.data.map((p: any) => ({
        name: `${p.first_name || ''} ${p.last_name || ''}`.trim(),
        title: p.job_title || '',
        organization_name: p.job_company_name || '',
        email: p.work_email || p.personal_emails?.[0] || '',
        country: p.location_country || '',
        linkedin_url: p.linkedin_url || '',
      }))
      return NextResponse.json({ people })
    }

    return NextResponse.json({ people: [], total: data.total || 0 })
  } catch(e) {
    return NextResponse.json({ error: 'Error buscando prospectos' }, { status: 500 })
  }
}
