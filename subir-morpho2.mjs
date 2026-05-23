import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const BASE = '/Users/housinsectsoffperu/Desktop/Morphidae WEBSITE'
const EXTENSIONES = ['.jpg','.jpeg','.png','.bmp','.tiff','.tif','.JPG','.JPEG','.PNG','.webp']

let subidas = 0
let errores = 0

function escanear(dir) {
  const items = fs.readdirSync(dir)
  for (const item of items) {
    const ruta = path.join(dir, item)
    const stat = fs.statSync(ruta)
    if (stat.isDirectory()) {
      escanear(ruta)
    } else if (EXTENSIONES.includes(path.extname(item).toLowerCase())) {
      subirFoto(ruta, item)
    }
  }
}

async function subirFoto(ruta, archivo) {
  const nombreLimpio = path.basename(archivo, path.extname(archivo))
    .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
  try {
    const res = await cloudinary.uploader.upload(ruta, {
      folder: 'house-insects/morphidae',
      public_id: nombreLimpio,
      overwrite: false,
      format: 'webp',
      transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]
    })
    console.log(`  ✅ ${archivo}`)
    subidas++
  } catch (e) {
    console.log(`  ❌ ${archivo} — ${e.message}`)
    errores++
  }
}

console.log('🦋 Subiendo Morphidae WEBSITE...')

const items = fs.readdirSync(BASE)
for (const item of items) {
  const ruta = path.join(BASE, item)
  const stat = fs.statSync(ruta)
  if (stat.isDirectory()) {
    console.log(`\n📁 ${item}`)
    const fotos = fs.readdirSync(ruta).filter(f => EXTENSIONES.includes(path.extname(f).toLowerCase()))
    for (const foto of fotos) {
      await subirFoto(path.join(ruta, foto), foto)
    }
  } else if (EXTENSIONES.includes(path.extname(item).toLowerCase())) {
    await subirFoto(ruta, item)
  }
}

console.log(`\n✅ SUBIDAS: ${subidas} | ❌ ERRORES: ${errores}`)
