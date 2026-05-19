export async function traducir(texto: string, idioma: string): Promise<string> {
  if (idioma === 'es' || !texto) return texto
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|${idioma}&de=houseinsectsofperu.com.pe@gmail.com`
    const res = await fetch(url)
    const data = await res.json()
    if (data.responseStatus === 200) return data.responseData.translatedText
    return texto
  } catch {
    return texto
  }
}

export async function traducirTodo(texto: string): Promise<Record<string,string>> {
  const idiomas = ['en','de','fr','pt','it','ja','zh','ar','th','ko','ru','nl','pl','sv','tr','vi','id','da','fi','no']
  const resultados: Record<string,string> = { es: texto }
  for (const lang of idiomas) {
    resultados[lang] = await traducir(texto, lang)
  }
  return resultados
}
