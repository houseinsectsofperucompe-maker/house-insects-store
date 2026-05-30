import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export async function getFamilias() {
  const data = await redis.get('catalogo:familias') as any[]
  if (!data) return []
  // Solo retornar familias con sus especies, sin filtrar
  return data
}
