import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'sklfHrDIKRAM4FzHerAVfprMrhxYUfjuArRwMmhMRtgCb9Bwf6QfSqoLQ2kJwcj1s1awC86sXf6x7DdnZ',
  useCdn: false,
})

export async function getEspecimenesSanity() {
  try {
    const data = await sanityClient.fetch(`*[_type=="especie"]{
      "n": nombre,
      "p": precio,
      "s": stock,
      "foto": fotoFrente,
      "fotoLado": fotoLado,
      "fotoReverso": fotoReverso,
      familia,
      video,
      activo
    } | order(familia asc, nombre asc)`)
    return data
  } catch(e) {
    return []
  }
}
