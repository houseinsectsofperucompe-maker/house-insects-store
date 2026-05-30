import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export async function getFamilias() {
  // Solo devolver índice sin especies - las especies se cargan lazy por familia
  const index = await redis.get('catalogo:familias:index') as any[]
  if (index && Array.isArray(index) && index.length > 0) {
    return index.map((f: any) => ({ ...f, e: [] }))
  }
  // fallback: devolver familias sin especies
  let data = await redis.get('catalogo:familias') as any
  if (typeof data === 'string') data = JSON.parse(data)
  if (typeof data === 'string') data = JSON.parse(data)
  return (data || []).map((f: any) => ({ ...f, e: [] }))
}
