// lib/sku-sanity.ts
import { generarSKU } from "./sku-generator"

export async function generarYGuardarSKU(documentId: string, data: {
  rubro: string; familia: string; especie: string
  calidad: string; sexo?: string; esRareza?: boolean; tipoProducto?: string
}): Promise<string> {
  const sku = generarSKU(data)
  return sku
}

export function previewSKU(data: {
  rubro: string; familia: string; especie: string
  calidad: string; sexo?: string; esRareza?: boolean; tipoProducto?: string
}): string {
  return generarSKU(data)
}

export const BRASSOLIDAE_SKUS = [
  { especie:"Caligo idomeneus",  macho:"MS-BRA-IDO-A1M", hembra:"MS-BRA-IDO-A1H", cuadro:"CD-BRA-IDO-ROY" },
  { especie:"Caligo illioneus",  macho:"MS-BRA-ILL-A1M", hembra:"MS-BRA-ILL-A1H", cuadro:"CD-BRA-ILL-ROY" },
  { especie:"Caligo eurilochus", macho:"MS-BRA-EUR-A1M", hembra:"MS-BRA-EUR-A1H", cuadro:"CD-BRA-EUR-ROY" },
]

export const MORPHIDAE_SKUS = [
  { especie:"Morpho didius",    macho:"MS-MOR-DID-A1M", hembra:"MS-MOR-DID-A1H", cuadro:"CD-MOR-DID-ROY" },
  { especie:"Morpho achilles",  macho:"MS-MOR-ACH-A1M", hembra:"MS-MOR-ACH-A1H", cuadro:"CD-MOR-ACH-ROY" },
]
