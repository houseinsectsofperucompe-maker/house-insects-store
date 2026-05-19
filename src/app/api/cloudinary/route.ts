import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression('folder:banners OR folder:fotos OR folder:videos')
      .sort_by('created_at', 'desc')
      .max_results(50)
      .execute()
    return NextResponse.json(result.resources)
  } catch (e) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { public_id } = await req.json()
    await cloudinary.uploader.destroy(public_id)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
