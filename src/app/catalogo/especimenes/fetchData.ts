import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export async function getFamilias() {
  // Cargar index (solo IDs, sin especies)
  const index = await redis.get('catalogo:familias:index') as any[]
  if (!index || !index.length) {
    // fallback al método anterior
    const data = await redis.get('catalogo:familias') as any[]
    return data || []
  }
  // Cargar especies de cada familia en paralelo
  const keys = index.map((f: any) => `catalogo:familia:${f.id}`)
  const resultados = await Promise.all(keys.map((k: string) => redis.get(k)))
  return index.map((f: any, i: number) => ({
    ...f,
    e: (resultados[i] as any[]) || []
  }))
}
