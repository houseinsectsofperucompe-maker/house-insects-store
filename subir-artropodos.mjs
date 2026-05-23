import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const BASE = '/Users/housinsectsoffperu/Desktop/FOTOS DE INSECTOS PARA PONER WEBSITE'
const EXTENSIONES = ['.jpg','.jpeg','.png','.bmp','.tiff','.tif','.JPG','.JPEG','.PNG','.webp']

let subidas = 0
let errores = 0

const items = fs.readdirSync(BASE)
for (const item of items) {
  const ruta = path.join(BASE, item)
  const stat = fs.statSync(ruta)
  if (stat.isFile() && EXTENSIONES.includes(path.extname(item).toLowerCase())) {
    const nombreLimpio = path.basename(item, path.extname(item))
      .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
    try {
      const res = await cloudinary.uploader.upload(ruta, {
        folder: 'house-insects/artropodos',
        public_id: nombreLimpio,
        overwrite: false,
        format: 'webp',
        transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]
      })
      console.log(`  ✅ ${item}`)
      subidas++
    } catch (e) {
      console.log(`  ❌ ${item} — ${e.message}`)
      errores++
    }
  }
}

console.log(`\n✅ SUBIDAS: ${subidas} | ❌ ERRORES: ${errores}`)
