
import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source:any) => builder.image(source)

export async function getEspecimenes() {
  return client.fetch(`*[_type=="especie" && activo==true]{
    nombre, familia, precio, stock,
    "fotoFrente": fotoFrente.asset->url,
    "fotoLado": fotoLado.asset->url,
    "fotoReverso": fotoReverso.asset->url,
    video, descripcion, calidad, sexo, tamano
  } | order(familia asc, nombre asc)`)
}

export async function getFamilias() {
  return client.fetch(`*[_type=="familia" && activo==true] | order(orden_display asc){nombre, "id": id.current, orden}`)
}
