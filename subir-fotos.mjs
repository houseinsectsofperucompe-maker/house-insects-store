import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const CARPETAS = [
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/FOTO OPTIMIZADA DE BRASSOLIDAE', cloudinary_folder: 'brassolidae' },
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/Fotos Optimizado Para mi pagina web de House insects of peru', cloudinary_folder: 'mariposas-diurnas' },
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/Fotos de Mariposa Nocturnas', cloudinary_folder: 'nocturnas' },
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/Fotos de mariposas en cuadros  firmado', cloudinary_folder: 'cuadros-mariposas' },
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/Heliconidae', cloudinary_folder: 'heliconidae' },
  { local: '/Volumes/TOSHIBA EXT/FHOTOS BRASSOLIDAE', cloudinary_folder: 'brassolidae' },
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
