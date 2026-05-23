import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const CARPETAS = [
  'FHOTOS BRASSOLIDAE',
  'FOTO OPTIMIZADO DE FAMILIA DANAIDAE',
  'FOTO OPTIMIZADO DE FAMILIA DANAIDAE2',
  'FOTO OPTIMIZADO DE LA FAMILIA HELICONIDAE',
  'FOTO OPTIMIZADO DE LA FAMILIA LYCAENIDAE',
  'FOTOS OPTIMIZADO DE LA FAMILIA ITHOMIIDAE',
  'FOTOS OPTIMIZADO DE LA FAMILIA ITHOMIIDAE3',
  'FOTOS OPTIMIZADO DE LA FAMILIA MORPHIDAE',
  'FOTOS OPTIMIZADO DE LA FAMILIA MORPHIDAE3',
  'FOTOS OPTIMIZAFOS DE LA FAMILIA RIDINIDAE',
  'FOTOS OPTIMIZAFOS DE LA FAMILIA RIDINIDAE2',
  'Fotos Optimizado de famylia  Satrydae',
  'Fotos optimizados de butterflies specieal',
  'MARIPOSAS MIXTAS',
  'OPTIMIZADO  DE LA FAMILIA PAPILIONIDAE',
  'OPTIMIZADO DE LA FAMILIA PIERIDAE',
  'fotos-optimizadas-webp',
]

const EXTENSIONES = ['.jpg','.jpeg','.png','.bmp','.tiff','.tif','.JPG','.JPEG','.PNG','.webp']
let subidas = 0, errores = 0

async function subirFoto(ruta, archivo, carpeta) {
  const nombreLimpio = path.basename(archivo, path.extname(archivo)).toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
  try {
    await cloudinary.uploader.upload(ruta, { folder: 'house-insects/' + carpeta, public_id: nombreLimpio, overwrite: false, format: 'webp', transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }] })
    console.log('  ✅ ' + archivo)
    subidas++
  } catch(e) { console.log('  ❌ ' + archivo + ' — ' + e.message); errores++ }
}

for (const nombre of CARPETAS) {
  const base = path.join('/Users/housinsectsoffperu/Desktop', nombre)
  if (!fs.existsSync(base)) { console.log('\n⚠️  No encontrada: ' + nombre); continue }
  const carpeta = nombre.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
  console.log('\n📁 ' + nombre)
  for (const item of fs.readdirSync(base)) {
    const ruta = path.join(base, item)
    const stat = fs.statSync(ruta)
    if (stat.isDirectory()) {
      for (const foto of fs.readdirSync(ruta).filter(f => EXTENSIONES.includes(path.extname(f).toLowerCase()))) {
        await subirFoto(path.join(ruta, foto), foto, carpeta)
      }
    } else if (EXTENSIONES.includes(path.extname(item).toLowerCase())) {
      await subirFoto(ruta, item, carpeta)
    }
  }
}
console.log('\n✅ SUBIDAS: ' + subidas + ' | ❌ ERRORES: ' + errores)
