import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const BASE = '/Users/housinsectsoffperu/Desktop/MARIPOSAS  DIURNA Y NOCTURNAS'
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

for (const item of fs.readdirSync(BASE)) {
  const ruta = path.join(BASE, item)
  if (fs.statSync(ruta).isDirectory()) {
    const carpeta = item.trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
    console.log('\n📁 ' + item)
    for (const foto of fs.readdirSync(ruta).filter(f => EXTENSIONES.includes(path.extname(f).toLowerCase()))) {
      await subirFoto(path.join(ruta, foto), foto, carpeta)
    }
  } else if (EXTENSIONES.includes(path.extname(item).toLowerCase())) {
    await subirFoto(ruta, item, 'mariposas-diurnas-nocturnas')
  }
}
console.log('\n✅ SUBIDAS: ' + subidas + ' | ❌ ERRORES: ' + errores)
