import {createClient} from 'next-sanity'

export const sanityClient = createClient({
  projectId: 'lyty7d3g',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skhMd82U9n5Vf5FwJed24DkdCWUoLvffGbV6nfc0bDhPvjgj34v4n2lRPt5q1xJGqEQsr1UxOJt3TLPtmC2gh6UBtPjyKL343jEHOVbOqVfxGTAfuQ8qOEdywdn8xvzGF0U1Za907rHfhWzI8mzrq9SpPNhhpJnDx8CZT1Hi6sSHgv1Toofr',
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
