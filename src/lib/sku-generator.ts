// lib/sku-generator.ts
// House Insects of Peru — Generador automático de SKU
// Formato: RUBRO-FAMILIA-ESPECIE-CALIDAD/SEXO

// ─── RUBROS ──────────────────────────────────────────────────────────────────
export const RUBROS_CODIGO: Record<string, string> = {
  mariposas_sueltas:       "MS",
  cuadros_mariposa:        "CD",
  cuadros_nocturnas:       "CN",
  cuadros_coleopteros:     "CC",
  joyeria_natural:         "JN",
  rarezas_gynandromorphs:  "RG",
  artesanias_cupulas:      "AC",
  herramientas_biologicas: "HB",
  minerales_piedras:       "MP",
  semillas_plantas:        "SP",
  frutas_exoticas:         "FE",
  hongos_naturales:        "HN",
  textileria_alpaca:       "TA",
  alimentos_deshidratados: "AD",
  pinturas_arte:           "PA",
  maderas_esculturas:      "ME",
  esencias_aceites:        "EA",
}

// ─── FAMILIAS BIOLOGICAS ─────────────────────────────────────────────────────
export const FAMILIAS_CODIGO: Record<string, string> = {
  // Lepidoptera Diurnae
  Brassolidae:    "BRA",
  Morphidae:      "MOR",
  Nymphalidae:    "NYM",
  Papilionidae:   "PAP",
  Pieridae:       "PIE",
  Lycaenidae:     "LYC",
  Hesperiidae:    "HES",
  Riodinidae:     "RIO",
  // Moths Nocturnas
  Saturniidae:    "SAT",
  Sphingidae:     "SPH",
  Arctiidae:      "ARC",
  Uranidae:       "URA",
  Geometridae:    "GEO",
  Noctuidae:      "NOC",
  // Coleoptera
  Cerambycidae:   "CER",
  Scarabaeidae:   "SCA",
  Buprestidae:    "BUP",
  Dynastinae:     "DYN",
  Lucanidae:      "LUC",
  // Arthropoda
  Mantidae:       "MAN",
  Phasmatidae:    "PHA",
  Tarantulidae:   "TAR",
  Scorpionidae:   "SCO",
}

// ─── CALIDAD Y SEXO ───────────────────────────────────────────────────────────
export const CALIDAD_CODIGO: Record<string, string> = {
  "A1-Macho":   "A1M",
  "A1-Hembra":  "A1H",
  "A1-Par":     "A1P",
  "A2-Macho":   "A2M",
  "A2-Hembra":  "A2H",
  "B-Macho":    "BM",
  "B-Hembra":   "BH",
  "Royal":      "ROY",
  "Gynandromorph": "GYN",
}

// ─── GENERADOR PRINCIPAL ─────────────────────────────────────────────────────
export interface SKUInput {
  rubro:          string   // ej: "mariposas_sueltas"
  familia:        string   // ej: "Brassolidae"
  especie:        string   // ej: "Caligo idomeneus"
  calidad:        string   // ej: "A1"
  sexo?:          string   // ej: "Macho", "Hembra", "Par"
  esRareza?:      boolean
  esCuadro?:      boolean
  tipoProducto?:  string   // ej: "Royal", "Cupula"
}

export function generarSKU(input: SKUInput): string {
  const { rubro, familia, especie, calidad, sexo, esRareza, tipoProducto } = input

  // 1. Codigo del rubro
  const codigoRubro = RUBROS_CODIGO[rubro] || rubro.substring(0,2).toUpperCase()

  // 2. Codigo de familia
  const codigoFamilia = FAMILIAS_CODIGO[familia] || familia.substring(0,3).toUpperCase()

  // 3. Codigo de especie (3 primeras letras del epiteto especifico)
  const partes = especie.trim().split(" ")
  const epitetoEspecifico = partes[1] || partes[0]
  const codigoEspecie = epitetoEspecifico.substring(0,3).toUpperCase()

  // 4. Codigo de calidad/sexo
  let codigoCalidad = calidad
  if (esRareza) {
    codigoCalidad = "GYN"
  } else if (tipoProducto === "Royal") {
    codigoCalidad = "ROY"
  } else if (sexo) {
    const key = `${calidad}-${sexo}`
    codigoCalidad = CALIDAD_CODIGO[key] || `${calidad}${sexo.substring(0,1).toUpperCase()}`
  }

  return `${codigoRubro}-${codigoFamilia}-${codigoEspecie}-${codigoCalidad}`
}

// ─── EJEMPLOS DE USO ─────────────────────────────────────────────────────────
//
// generarSKU({ rubro:"mariposas_sueltas", familia:"Brassolidae",
//   especie:"Caligo idomeneus", calidad:"A1", sexo:"Macho" })
// → "MS-BRA-IDO-A1M"
//
// generarSKU({ rubro:"cuadros_mariposa", familia:"Morphidae",
//   especie:"Morpho didius", calidad:"A1", tipoProducto:"Royal" })
// → "CD-MOR-DID-ROY"
//
// generarSKU({ rubro:"mariposas_sueltas", familia:"Brassolidae",
//   especie:"Caligo eurilochus", calidad:"A1", esRareza:true })
// → "MS-BRA-EUR-GYN"
