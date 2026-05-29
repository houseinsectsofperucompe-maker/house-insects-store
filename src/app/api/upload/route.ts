import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { Redis } from '@upstash/redis'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dv3mvukmq',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
})

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://topical-weasel-107403.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

const BUNNY_KEY = '51da13d3-4922-4e5c-8e4a03b36bb5-d3ec-4d2b'
const BUNNY_ZONE = 'housensectsperu'
const BUNNY_CDN = 'https://HouseInsects1967.b-cdn.net'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    const familia = form.get('familia') as string
    const especie = form.get('especie') as string
    const tipo = form.get('tipo') as string || 'foto'

    if (!file) return NextResponse.json({ok:false,error:'Sin archivo'})

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const nombre = especie.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')

    // Subir a Bunny.net (principal)
    const bunnyPath = `${familia.toLowerCase()}/${nombre}-${tipo}.webp`
    const bunnyRes = await fetch(`https://storage.bunnycdn.com/${BUNNY_ZONE}/${bunnyPath}`, {
      method: 'PUT',
      headers: {'AccessKey': BUNNY_KEY, 'Content-Type': 'image/webp'},
      body: buffer,
    })
    if (!bunnyRes.ok) return NextResponse.json({ok:false,error:'Error Bunny.net: '+bunnyRes.status})
    const url = `${BUNNY_CDN}/${bunnyPath}`

    // Subir a Cloudinary (respaldo, no bloquea)
    try {
      const public_id = `house-insects/${familia.toLowerCase()}/${nombre}-${tipo}`
      await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {public_id, format:'webp', quality:82, overwrite:true, width:800, height:800, crop:'pad', background:'black'},
          (err, res) => err ? reject(err) : resolve(res)
        ).end(buffer)
      })
    } catch(ce) { console.warn('Cloudinary backup falló:', ce) }

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

export async function DELETE(req: NextRequest) {
  try {
    const {familia, especie, tipo} = await req.json()
    if (!familia||!especie||!tipo) return NextResponse.json({ok:false,error:'Faltan datos'})

    const nombre = especie.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')

    // Eliminar de Bunny.net
    const bunnyPath = `${familia.toLowerCase()}/${nombre}-${tipo}.webp`
    await fetch(`https://storage.bunnycdn.com/${BUNNY_ZONE}/${bunnyPath}`, {
      method: 'DELETE',
      headers: {'AccessKey': BUNNY_KEY},
    })

    // Eliminar de Cloudinary (respaldo)
    try {
      const public_id = `house-insects/${familia.toLowerCase()}/${nombre}-${tipo}`
      await cloudinary.uploader.destroy(public_id)
    } catch(ce) { console.warn('Cloudinary delete falló:', ce) }

    // Limpiar URL en Upstash
    const data = await redis.get('catalogo:familias') as any[]
    const fam = data.find((f:any) => f.id === familia)
    if (fam) {
      const esp = fam.e.find((e:any) => e.n === especie)
      if (esp) {
        if (tipo === 'foto') esp.foto = ''
        else if (tipo === 'fotoLado') esp.fotoLado = ''
        else if (tipo === 'fotoReverso') esp.fotoReverso = ''
        else if (tipo === 'video') esp.video = ''
        await redis.set('catalogo:familias', data)
      }
    }

    return NextResponse.json({ok:true})
  } catch(e:any) {
    return NextResponse.json({ok:false, error:e.message}, {status:500})
  }
}
