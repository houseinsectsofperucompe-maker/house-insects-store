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
  const archivos = [
    { archivo: 'especimenes-biologicos-secos.json', orden: 'Lepidoptera Diurnae' },
    { archivo: 'especimenes-nocturnas.json',        orden: 'Moths Nocturnas' },
    { archivo: 'especimenes-coleopteros.json',      orden: 'Coleoptera' },
    { archivo: 'especimenes-artropodos.json',       orden: 'Arthropoda' },
  ]

  const familias: any[] = []

  for (const { archivo, orden } of archivos) {
    const data = leerJSON(archivo)
    if (!data) continue

    const especies = data.especies || []
    const fams = data.familias || []

    for (const fam of fams) {
      const espFam = especies.filter((e: any) => e.familia === fam.id)
      familias.push({
        id:    fam.id,
        nm:    fam.nombre || fam.id,
        orden: orden,
        total: fam.total || espFam.length,
        e:     espFam,
        sub:   [],
      })
    }
  }

  return familias
}
