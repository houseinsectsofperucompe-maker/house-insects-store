import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export async function getFamilias() {
  let data = await redis.get('catalogo:familias') as any
  if (typeof data === 'string') data = JSON.parse(data)
  if (typeof data === 'string') data = JSON.parse(data)
  if (!data) return []
  // Solo especies con precio > 0 para reducir payload
  return data.map((f: any) => ({
    ...f,
    e: (f.e || []).filter((e: any) => e.p > 0)
  }))
}
