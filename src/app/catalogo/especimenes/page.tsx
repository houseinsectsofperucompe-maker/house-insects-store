import { getFamilias } from './fetchData'
import CatalogoClient from './CatalogoClient'

export const revalidate = 0

export default async function Page() {
  const familias = await getFamilias()
  return <CatalogoClient familias={familias}/>
}