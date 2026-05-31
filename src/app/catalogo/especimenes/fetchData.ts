import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export async function getFamilias() {
  let data = await redis.get('catalogo:diurnae') as any
  if (typeof data === 'string') data = JSON.parse(data)
  if (typeof data === 'string') data = JSON.parse(data)
  return data || []
}
