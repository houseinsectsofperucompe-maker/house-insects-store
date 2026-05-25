// lib/sku-sanity.ts
import { generarSKU } from "./sku-generator"
import { sanityClient } from "./sanity-client"

export async function generarYGuardarSKU(documentId, data) {
  const sku = generarSKU(data)
  await sanityClient.patch(documentId).set({ codigoSKU: sku }).commit()
  return sku
}

export function previewSKU(data) {
  return generarSKU(data)
}

export const BRASSOLIDAE_SKUS = [
  { especie:"Caligo idomeneus",  macho:"MS-BRA-IDO-A1M", hembra:"MS-BRA-IDO-A1H", cuadro:"CD-BRA-IDO-ROY" },
  { especie:"Caligo illioneus",  macho:"MS-BRA-ILL-A1M", hembra:"MS-BRA-ILL-A1H", cuadro:"CD-BRA-ILL-ROY" },
  { especie:"Caligo eurilochus", macho:"MS-BRA-EUR-A1M", hembra:"MS-BRA-EUR-A1H", cuadro:"CD-BRA-EUR-ROY" },
  { especie:"Caligo memnon",     macho:"MS-BRA-MEM-A1M", hembra:"MS-BRA-MEM-A1H", cuadro:"CD-BRA-MEM-ROY" },
  { especie:"Caligo atreus",     macho:"MS-BRA-ATR-A1M", hembra:"MS-BRA-ATR-A1H", cuadro:"CD-BRA-ATR-ROY" },
  { especie:"Opoptera syme",     macho:"MS-BRA-SYM-A1M", hembra:"MS-BRA-SYM-A1H", cuadro:"CD-BRA-SYM-ROY" },
  { especie:"Dynastor darius",   macho:"MS-BRA-DAR-A1M", hembra:"MS-BRA-DAR-A1H", cuadro:"CD-BRA-DAR-ROY" },
]

export const MORPHIDAE_SKUS = [
  { especie:"Morpho didius",     macho:"MS-MOR-DID-A1M", hembra:"MS-MOR-DID-A1H", cuadro:"CD-MOR-DID-ROY" },
  { especie:"Morpho helenor",    macho:"MS-MOR-HEL-A1M", hembra:"MS-MOR-HEL-A1H", cuadro:"CD-MOR-HEL-ROY" },
  { especie:"Morpho achilles",   macho:"MS-MOR-ACH-A1M", hembra:"MS-MOR-ACH-A1H", cuadro:"CD-MOR-ACH-ROY" },
  { especie:"Morpho menelaus",   macho:"MS-MOR-MEN-A1M", hembra:"MS-MOR-MEN-A1H", cuadro:"CD-MOR-MEN-ROY" },
  { especie:"Morpho rhetenor",   macho:"MS-MOR-RHE-A1M", hembra:"MS-MOR-RHE-A1H", cuadro:"CD-MOR-RHE-ROY" },
  { especie:"Morpho cisseis",    macho:"MS-MOR-CIS-A1M", hembra:"MS-MOR-CIS-A1H", cuadro:"CD-MOR-CIS-ROY" },
]
