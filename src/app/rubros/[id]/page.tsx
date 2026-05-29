import { Redis } from '@upstash/redis'
import RubroClient from './RubroClient'

const redis = new Redis({
  url: 'https://topical-weasel-107403.upstash.io',
  token: 'gQAAAAAAAaOLAAIgcDExZGYyODVjMzY1Mjc0OTY1YjcyYjZiMzIzZjhmYTgxOA',
})

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { id: string } }) {
  console.log('params.id:', params.id)
  const rubros = await redis.get('catalogo:rubros') as any[]
  const rubro = (rubros||[]).find((r:any) => r.id === params.id)
  console.log('rubro encontrado:', rubro?.id, 'total:', rubros?.length)
  return <RubroClient rubro={rubro||null}/>
}
