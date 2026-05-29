import { Redis } from '@upstash/redis'
import RubroClient from './RubroClient'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export const revalidate = 3600

export async function generateStaticParams() {
  const rubros = await redis.get('catalogo:rubros') as any[]
  return (rubros||[]).map((r:any) => ({ id: r.id }))
}

export default async function Page({ params }: { params: { id: string } }) {
  const rubros = await redis.get('catalogo:rubros') as any[]
  const rubro = (rubros||[]).find((r:any) => r.id === params.id)
  return <RubroClient rubro={rubro||null}/>
}
