export const LOCALES = ['es','en','zh','ja','ko','ar','de','fr','it','pt','ru','tr'] as const
export type Locale = typeof LOCALES[number]
export const DEFAULT_LOCALE: Locale = 'es'
export const RTL_LOCALES: Locale[] = ['ar']
export const LOCALE_NAMES: Record<Locale, string> = {
  es:'Español', en:'English', zh:'中文', ja:'日本語', ko:'한국어',
  ar:'عربي', de:'Deutsch', fr:'Français', it:'Italiano',
  pt:'Português', ru:'Русский', tr:'Türkçe',
}
export const UI_TEXT: Record<Locale, { selectCatalog:string; viewCollection:string; back:string }> = {
  es:{ selectCatalog:'Selecciona un Catálogo', viewCollection:'Ver colección →', back:'← Volver' },
  en:{ selectCatalog:'Select a Catalogue', viewCollection:'View collection →', back:'← Back' },
  zh:{ selectCatalog:'选择目录', viewCollection:'查看收藏 →', back:'← 返回' },
  ja:{ selectCatalog:'カタログを選択', viewCollection:'コレクションを見る →', back:'← 戻る' },
  ko:{ selectCatalog:'카탈로그 선택', viewCollection:'컬렉션 보기 →', back:'← 뒤로' },
  ar:{ selectCatalog:'اختر كتالوجاً', viewCollection:'عرض المجموعة →', back:'→ العودة' },
  de:{ selectCatalog:'Katalog auswählen', viewCollection:'Sammlung ansehen →', back:'← Zurück' },
  fr:{ selectCatalog:'Choisir un Catalogue', viewCollection:'Voir la collection →', back:'← Retour' },
  it:{ selectCatalog:'Seleziona un Catalogo', viewCollection:'Vedi la collezione →', back:'← Indietro' },
  pt:{ selectCatalog:'Selecionar Catálogo', viewCollection:'Ver coleção →', back:'← Voltar' },
  ru:{ selectCatalog:'Выбрать каталог', viewCollection:'Смотреть коллекцию →', back:'← Назад' },
  tr:{ selectCatalog:'Katalog Seçin', viewCollection:'Koleksiyonu Gör →', back:'← Geri' },
}
