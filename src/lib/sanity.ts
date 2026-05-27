import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getEspecimenesSanity() {
  try {
    const data = await sanityClient.fetch(`*[_type=="especie" && activo==true]{
      "n": nombre,
      "p": precio,
      "s": stock,
      "foto": fotoFrente.asset->url,
      "fotoLado": fotoLado.asset->url,
      "fotoReverso": fotoReverso.asset->url,
      familia,
      video
    } | order(familia asc, nombre asc)`)
    return data
  } catch(e) {
    return []
  }
}
