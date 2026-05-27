import { NextRequest, NextResponse } from 'next/server';

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'El mensaje es requerido' }, { status: 400 });
    if (!PAGE_ID || !PAGE_ACCESS_TOKEN) return NextResponse.json({ error: 'Variables no configuradas' }, { status: 500 });
    const res = await fetch(`https://graph.facebook.com/v25.0/${PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, access_token: PAGE_ACCESS_TOKEN }),
    });
    const data = await res.json();
    if (!res.ok || data.error) return NextResponse.json({ error: data.error?.message || 'Error al publicar' }, { status: 400 });
    return NextResponse.json({ success: true, post_id: data.id });
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', page_id: PAGE_ID });
}
