import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const CARPETAS = [
  { local: '/Users/housinsectsoffperu/Desktop/Morphidae WEBSITE', cloudinary_folder: 'morphidae' },
  { local: '/Users/housinsectsoffperu/Desktop/morpho cacica', cloudinary_folder: 'morphidae' },
]

const EXTENSIONES = ['.jpg','.jpeg','.png','.bmp','.tiff','.tif','.JPG','.JPEG','.PNG']

let subidas = 0
let errores = 0

for (const carpeta of CARPETAS) {
  if (!fs.existsSync(carpeta.local)) continue
  const archivos = fs.readdirSync(carpeta.local).filter(f => EXTENSIONES.includes(path.extname(f)))
  console.log(`\n📁 ${carpeta.cloudinary_folder} — ${archivos.length} fotos`)

  for (const archivo of archivos) {
    const rutaCompleta = path.join(carpeta.local, archivo)
    const nombreLimpio = path.basename(archivo, path.extname(archivo))
      .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '')
    try {
      const res = await cloudinary.uploader.upload(rutaCompleta, {
        folder: `house-insects/${carpeta.cloudinary_folder}`,
        public_id: nombreLimpio,
        overwrite: false,
        format: 'webp',
        transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]
      })
      console.log(`  ✅ ${archivo} → ${res.secure_url}`)
      subidas++
    } catch (e) {
      console.log(`  ❌ ${archivo} — ${e.message}`)
      errores++
    }
  }
}

console.log(`\n✅ SUBIDAS: ${subidas} | ❌ ERRORES: ${errores}`)
