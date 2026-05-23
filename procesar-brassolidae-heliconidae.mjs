import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'

cloudinary.config({
  cloud_name: 'dv3mvukmq',
  api_key: '499812389115752',
  api_secret: 'aLqICg9H4_fYtcU1quAljjogtIo'
})

const CARPETAS = [
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/FOTO OPTIMIZADA DE BRASSOLIDAE', folder: 'brassolidae-final' },
  { local: '/Volumes/TOSHIBA EXT/CARPETAS HOUSEINSECTSOFPERU/Fotos Optimizado Para mi pagina web de House insects of peru', folder: 'heliconidae-final' },
  { local: '/Volumes/TOSHIBA EXT/FHOTOS BRASSOLIDAE', folder: 'brassolidae-final' },
]

const EXTENSIONES = ['.jpg','.jpeg','.png','.webp','.JPG','.JPEG','.PNG']
let ok = 0, err = 0

for (const c of CARPETAS) {
  if (!fs.existsSync(c.local)) { console.log('No existe: '+c.local); continue }
  const files = fs.readdirSync(c.local).filter(f => EXTENSIONES.includes(path.extname(f)))
  console.log(`\n📁 ${c.folder} — ${files.length} fotos`)
  for (const f of files) {
    const nombre = path.basename(f, path.extname(f)).toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
    try {
      await cloudinary.uploader.upload(path.join(c.local, f), {
        folder: `house-insects/${c.folder}`,
        public_id: nombre,
        overwrite: true,
        format: 'webp',
        transformation: [
          { width: 900, height: 800, crop: 'fit', quality: 'auto' },
          { overlay: { font_family: 'Arial', font_size: 18, text: '© House Insects of Peru · RUC 20447397804' }, color: 'white', opacity: 60, gravity: 'south_east', x: 10, y: 10 }
        ]
      })
      console.log('  ✅ ' + f)
      ok++
    } catch(e) { console.log('  ❌ ' + f + ' — ' + e.message); err++ }
  }
}
console.log(`\n✅ OK: ${ok} | ❌ ERR: ${err}`)
