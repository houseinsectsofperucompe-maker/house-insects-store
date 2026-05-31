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
  const familias: any[] = []

  // ── 1. Lepidoptera Diurna ──────────────────────────────────────
  const diurna = leerJSON('especimenes-biologicos-secos.json')
  if (diurna) {
    const fams = ['Brassolidae','Danidae','Heliconidae','Hesperiidae','Ithomiidae',
                  'Lycaenidae','Morphidae','Nymphalidae','Papilionidae','Pieridae',
                  'Riodinidae','Satyridae']
    for (const famId of fams) {
      const esp = diurna.especies.filter((e: any) => e.familia === famId)
      const sub = [...new Set(esp.map((e: any) => e.subfamilia).filter(Boolean))]
      familias.push({ id: famId, nm: famId, orden: 'Lepidoptera Diurnae',
        total: esp.length, e: esp,
        sub: sub.map((sf: any) => ({ id:sf, nm:sf, e: esp.filter((e:any)=>e.subfamilia===sf) }))
      })
    }
  }

  // ── 2. Moths Nocturnas ─────────────────────────────────────────
  const noc = leerJSON('especimenes-nocturnas.json')
  if (noc) {
    const fams = ['Saturniidae','Sphingidae','Erebidae','Geometridae','Noctuidae',
                  'Arctiidae','Castniidae','Hepalidae','Uranidae']
    for (const famId of fams) {
      const esp = noc.especies.filter((e: any) => e.familia === famId)
      const sub = [...new Set(esp.map((e: any) => e.subfamilia).filter(Boolean))]
      familias.push({ id: famId, nm: famId, orden: 'Moths Nocturnas',
        total: esp.length, e: esp,
        sub: sub.map((sf: any) => ({ id:sf, nm:sf, e: esp.filter((e:any)=>e.subfamilia===sf) }))
      })
    }
  }

  // ── 3. Coleoptera ─────────────────────────────────────────────
  const col = leerJSON('especimenes-coleopteros.json')
  if (col) {
    const fams = ['Buprestidae','Cerambycidae','Dynastidae','Cetonidae','Chrysomelidae',
                  'Scarabaeidae','Cicindelidae','Curculionidae','Elateridae','Lucanidae',
                  'Rutilidae','Euchiridae','Trictenotomidae']
    for (const famId of fams) {
      const esp = col.especies.filter((e: any) => e.familia === famId)
      const sub = [...new Set(esp.map((e: any) => e.subfamilia).filter(Boolean))]
      familias.push({ id: famId, nm: famId, orden: 'Coleoptera',
        total: esp.length, e: esp,
        sub: sub.map((sf: any) => ({ id:sf, nm:sf, e: esp.filter((e:any)=>e.subfamilia===sf) }))
      })
    }
  }

  // ── 4. Arthropoda — cada orden separado ───────────────────────
  const art = leerJSON('especimenes-artropodos.json')
  if (art) {
    const ORDENES_ART: Record<string, string[]> = {
      'Araneae':     ['Theraphosidae','Sparassidae','Nephilidae','Araneidae','Ctenidae','Trechaleidae','Lycosidae','Dipluridae'],
      'Scorpiones':  ['Buthidae','Chactidae','Scorpionidae','Bothriuridae','Diplocentridae'],
      'Chilopoda':   ['Scolopendridae','Scutigeridae','Lithobiidae','Geophilidae'],
      'Phasmatodea': ['Phasmatidae','Diapheromeridae','Pseudophasmatidae','Heteropterygidae','Phylliidae'],
      'Mantodea':    ['Mantidae'],
      'Orthoptera':  ['Tettigoniidae','Acrididae','Gryllidae'],
      'Homoptera':   ['Cicadidae','Fulgoridae'],
      'Hemiptera':   ['Reduviidae'],
      'Hymenoptera': ['Formicidae','Vespidae','Apidae'],
      'Decapoda':    ['Brachyuridae','Astacidae'],
      'Odonata':     ['Libellulidae','Coenagrionidae','Aeshnidae','Agrionidae'],
    }
    // Cada orden de Arthropoda es una "familia" en el tab
    // Sus familias reales son las subfamilias
    for (const [orden, fams] of Object.entries(ORDENES_ART)) {
      const espOrden = art.especies.filter((e: any) => e.orden === orden)
      if (espOrden.length === 0) continue
      // Las familias reales del orden van como subfamilias
      const subfams = fams
        .map((famId: string) => {
          const espFam = art.especies.filter((e: any) => e.familia === famId)
          if (espFam.length === 0) return null
          return { id: famId, nm: famId, e: espFam }
        })
        .filter(Boolean)
      familias.push({
        id: orden, nm: orden, orden: 'Arthropoda',
        total: espOrden.length, e: espOrden,
        sub: subfams,
      })
    }
  }

  return familias
}
