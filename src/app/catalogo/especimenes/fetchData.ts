import fs from 'fs'
import path from 'path'

function leerJSON(archivo: string) {
  try {
    const p = path.join(process.cwd(), 'public', 'data', 'rubros', archivo)
    if (!fs.existsSync(p)) return null
    return JSON.parse(fs.readFileSync(p, 'utf-8'))
  } catch { return null }
}

export async function getFamilias() {
  const fuentes = [
    { archivo: 'especimenes-biologicos-secos.json', orden: 'Lepidoptera Diurnae',
      familias: ['Brassolidae','Danidae','Heliconidae','Hesperiidae','Ithomiidae',
                 'Lycaenidae','Morphidae','Nymphalidae','Papilionidae','Pieridae',
                 'Riodinidae','Satyridae'] },
    { archivo: 'especimenes-nocturnas.json', orden: 'Moths Nocturnas',
      familias: ['Saturniidae','Sphingidae','Erebidae','Geometridae','Noctuidae',
                 'Arctiidae','Castniidae','Hepalidae','Uranidae'] },
    { archivo: 'especimenes-coleopteros.json', orden: 'Coleoptera',
      familias: ['Buprestidae','Cerambycidae','Dynastidae','Cetonidae','Chrysomelidae',
                 'Scarabaeidae','Cicindelidae','Curculionidae','Elateridae','Lucanidae',
                 'Rutilidae','Euchiridae','Trictenotomidae'] },
    { archivo: 'especimenes-artropodos.json', orden: 'Arthropoda',
      familias: ['Theraphosidae','Sparassidae','Nephilidae','Araneidae',
                 'Buthidae','Chactidae','Scorpionidae',
                 'Scolopendridae','Scutigeridae',
                 'Phasmatidae','Diapheromeridae'] },
  ]

  const familias: any[] = []

  for (const fuente of fuentes) {
    const data = leerJSON(fuente.archivo)
    if (!data) continue
    const especies = data.especies || []

    for (const famId of fuente.familias) {
      const espFam = especies.filter((e: any) => e.familia === famId)
      // Construir subfamilias si existen
      const subfamiliaSet = new Set(espFam.map((e: any) => e.subfamilia).filter(Boolean))
      const sub = Array.from(subfamiliaSet).map((sf: any) => ({
        id: sf,
        nm: sf,
        e:  espFam.filter((e: any) => e.subfamilia === sf),
      }))
      familias.push({
        id:    famId,
        nm:    famId,
        orden: fuente.orden,
        total: espFam.length,
        e:     espFam,
        sub:   sub,
      })
    }
  }

  return familias
}
