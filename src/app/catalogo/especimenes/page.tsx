import { getFamilias } from './fetchData'
import CatalogoClient from './CatalogoClient'

export const revalidate = 3600

export default async function Page() {
  const familias = await getFamilias()
  return <CatalogoClient familias={familias}/>
}