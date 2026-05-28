import { NextResponse, NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

const BUNNY_KEY = process.env.BUNNY_API_KEY || ''
const BUNNY_ZONE = 'HouseInsects1967'
const BUNNY_CDN = 'https://HouseInsects1967.b-cdn.net'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    const familia = form.get('familia') as string
    const especie = form.get('especie') as string
    const tipo = form.get('tipo') as string || 'foto'
    const destino = form.get('destino') as string || 'cloudinary'

    if (!file) return NextResponse.json({ok:false,error:'Sin archivo'})

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const nombre = especie.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
    let url = ''

    if (destino === 'bunny') {
      // Subir a Bunny.net
      const path = `${familia.toLowerCase()}/${nombre}-${tipo}.webp`
      const res = await fetch(`https://storage.bunnycdn.com/${BUNNY_ZONE}/${path}`, {
        method: 'PUT',
        headers: {
          'AccessKey': BUNNY_KEY,
          'Content-Type': 'image/webp',
        },
        body: buffer,
      })
      if (!res.ok) return NextResponse.json({ok:false,error:'Error Bunny.net'})
      url = `${BUNNY_CDN}/${path}`
    } else {
      // Subir a Cloudinary
      const public_id = `house-insects/${familia.toLowerCase()}/${nombre}-${tipo}`
      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {public_id, format:'webp', quality:85, overwrite:true},
          (err, res) => err ? reject(err) : resolve(res)
        ).end(buffer)
      })
      url = result.secure_url
    }

    // Actualizar Upstash
    const data = await redis.get('catalogo:familias') as any[]
    const fam = data.find((f:any) => f.id === familia)
    if (fam) {
      const esp = fam.e.find((e:any) => e.n === especie)
      if (esp) {
        if (tipo === 'foto') esp.foto = url
        else if (tipo === 'fotoLado') esp.fotoLado = url
        else if (tipo === 'fotoReverso') esp.fotoReverso = url
        else if (tipo === 'video') esp.video = url
        await redis.set('catalogo:familias', data)
      }
    }

    return NextResponse.json({ok:true, url})
  } catch(e:any) {
    return NextResponse.json({ok:false, error:e.message}, {status:500})
  }
}
