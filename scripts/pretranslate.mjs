import fs from 'fs'

const IDIOMAS = ['en','de','fr','pt','it','ja','zh','ar','th','ko','ru','nl','pl','sv','tr','vi','id','da','fi','no']

const TEXTOS = {
  titulo: 'House Insects of Peru E.I.R.L.',
  subtitulo: 'Exportación Internacional de Especímenes Biológicos',
  experiencia: 'Más de 40 años de experiencia',
  selecciona: 'Selecciona un Catálogo',
  ver: 'Ver colección',
  contacto: 'Contáctanos por WhatsApp para más información y precios',
  certificado: 'Certificado SERFOR y CITES, Factura electrónica SUNAT, Embalaje premium',
  envio: 'Exportamos a todo el mundo con DHL, FedEx, UPS, Aramex, EMS y SERPOST',
  calidad: 'Calidad A1, especímenes seleccionados, 45 años de experiencia',
}

async function traducir(texto, idioma) {
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|${idioma}&de=houseinsectsofperu.com.pe@gmail.com`
    const res = await fetch(url)
    const data = await res.json()
    if (data.responseStatus === 200) return data.responseData.translatedText
    return texto
  } catch { return texto }
}

async function main() {
  for (const idioma of IDIOMAS) {
    console.log(`Traduciendo a ${idioma}...`)
    const resultado = {}
    for (const [clave, texto] of Object.entries(TEXTOS)) {
      resultado[clave] = await traducir(texto, idioma)
      console.log(`  ${clave}: ${resultado[clave].slice(0,40)}`)
      await new Promise(r => setTimeout(r, 500))
    }
    fs.writeFileSync(`messages/${idioma}.json`, JSON.stringify(resultado, null, 2), 'utf-8')
    console.log(`  Guardado messages/${idioma}.json`)
  }
  console.log('LISTO - todas las traducciones completadas')
}

main()
