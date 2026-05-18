import { NextRequest, NextResponse } from 'next/server'

const AIRTABLE_TOKEN = process.env.AIRTABLE_API_KEY!
const BASE_ID = process.env.AIRTABLE_BASE_ID!
const TABLE_ID = process.env.AIRTABLE_TABLE_ID!

export async function GET() {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}?maxRecords=100`,
      { headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` } }
    )
    const data = await res.json()
    return NextResponse.json({ ok: true, total: data.records?.length || 0, records: data.records })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: body })
      }
    )
    const data = await res.json()
    return NextResponse.json({ ok: true, record: data })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) })
  }
}
