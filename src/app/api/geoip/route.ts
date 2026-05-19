import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const country = req.headers.get('x-vercel-ip-country') || 
                  req.headers.get('cf-ipcountry') || 'US'
  
  const profiles: Record<string, any> = {
    // ASIA - Amuletos, fortuna, simetría perfecta
    CN: { region:'asia', tema:'dorado-rojo', destacados:['minerales','coleopteros','rarezas','joyeria'], saludo:'欢迎', color1:'#C9A84C', color2:'#8B0000', mensaje:'Amuletos de Prosperidad · Colección Exclusiva', idioma:'zh' },
    TW: { region:'asia', tema:'dorado-rojo', destacados:['minerales','coleopteros','rarezas','joyeria'], saludo:'歡迎', color1:'#C9A84C', color2:'#8B0000', mensaje:'Amuletos de Prosperidad · Colección Exclusiva', idioma:'zh' },
    HK: { region:'asia', tema:'dorado-rojo', destacados:['minerales','coleopteros','rarezas','joyeria'], saludo:'歡迎', color1:'#C9A84C', color2:'#8B0000', mensaje:'Luxury Natural Collection', idioma:'zh' },
    JP: { region:'asia', tema:'elegancia-zen', destacados:['mariposas','rarezas','joyeria','cuadros'], saludo:'いらっしゃいませ', color1:'#C9A84C', color2:'#2C1810', mensaje:'完璧な標本 · 最高品質', idioma:'ja' },
    KR: { region:'asia', tema:'elegancia-zen', destacados:['mariposas','joyeria','minerales','rarezas'], saludo:'환영합니다', color1:'#C9A84C', color2:'#1A1A2E', mensaje:'희귀 표본 · 럭셔리 컬렉션', idioma:'ko' },
    SG: { region:'asia', tema:'dorado-rojo', destacados:['joyeria','minerales','mariposas','rarezas'], saludo:'Welcome', color1:'#C9A84C', color2:'#1A0A00', mensaje:'Premium Natural Collection', idioma:'en' },
    TH: { region:'asia', tema:'dorado-rojo', destacados:['minerales','joyeria','mariposas'], saludo:'ยินดีต้อนรับ', color1:'#C9A84C', color2:'#1A0A00', mensaje:'คอลเลกชันธรรมชาติระดับพรีเมียม', idioma:'th' },
    // EUROPA - Minimalismo, arte, certificaciones
    DE: { region:'europa', tema:'museo-elegante', destacados:['especimenes','cuadros','rarezas','maderas'], saludo:'Willkommen', color1:'#C9A84C', color2:'#0A0A0A', mensaje:'SERFOR · CITES · Wissenschaftliche Sammlung', idioma:'de' },
    GB: { region:'europa', tema:'museo-elegante', destacados:['especimenes','cuadros','rarezas','joyeria'], saludo:'Welcome', color1:'#C9A84C', color2:'#0A0A0A', mensaje:'Museum Quality · CITES Certified', idioma:'en' },
    FR: { region:'europa', tema:'museo-elegante', destacados:['joyeria','cuadros','rarezas','especimenes'], saludo:'Bienvenue', color1:'#C9A84C', color2:'#0A1A0A', mensaje:'Collection Entomologique · Art Biologique', idioma:'fr' },
    IT: { region:'europa', tema:'museo-elegante', destacados:['joyeria','cuadros','maderas','especimenes'], saludo:'Benvenuto', color1:'#C9A84C', color2:'#0A0A1A', mensaje:'Arte Biologico · Collezione Premium', idioma:'it' },
    CH: { region:'europa', tema:'museo-elegante', destacados:['rarezas','joyeria','minerales','especimenes'], saludo:'Willkommen', color1:'#C9A84C', color2:'#0A0A0A', mensaje:'Schweizer Qualität · CITES Zertifiziert', idioma:'de' },
    NL: { region:'europa', tema:'museo-elegante', destacados:['especimenes','cuadros','rarezas'], saludo:'Welkom', color1:'#C9A84C', color2:'#0A0A0A', mensaje:'Wetenschappelijke Collectie · CITES', idioma:'nl' },
    // NORDICOS - Colores tropicales vibrantes
    SE: { region:'nordico', tema:'tropical-vibrante', destacados:['mariposas','joyeria','especimenes','minerales'], saludo:'Välkommen', color1:'#00CED1', color2:'#0A1A0A', mensaje:'Tropiska Fjärilar · Amazonas Skatter', idioma:'sv' },
    NO: { region:'nordico', tema:'tropical-vibrante', destacados:['mariposas','joyeria','especimenes'], saludo:'Velkommen', color1:'#00CED1', color2:'#0A1A0A', mensaje:'Tropiske Sommerfugler · Amazonas', idioma:'no' },
    DK: { region:'nordico', tema:'tropical-vibrante', destacados:['mariposas','joyeria','especimenes'], saludo:'Velkommen', color1:'#00CED1', color2:'#0A1A0A', mensaje:'Tropiske Sommerfugle · Amazonas', idioma:'da' },
    FI: { region:'nordico', tema:'tropical-vibrante', destacados:['mariposas','joyeria','especimenes'], saludo:'Tervetuloa', color1:'#00CED1', color2:'#0A1A0A', mensaje:'Trooppiset Perhoset · Amazonas', idioma:'fi' },
    IS: { region:'nordico', tema:'tropical-vibrante', destacados:['mariposas','joyeria','minerales'], saludo:'Velkomin', color1:'#00CED1', color2:'#0A1A0A', mensaje:'Tropical Butterflies · Amazon', idioma:'en' },
    // USA/CANADA - Exclusividad, lujo moderno, velocidad
    US: { region:'america', tema:'lujo-moderno', destacados:['rarezas','joyeria','especimenes','minerales'], saludo:'Welcome', color1:'#C9A84C', color2:'#0A0A1A', mensaje:'Ultra Luxury · Exclusive Amazon Collection', idioma:'en' },
    CA: { region:'america', tema:'lujo-moderno', destacados:['rarezas','joyeria','especimenes'], saludo:'Welcome', color1:'#C9A84C', color2:'#0A0A1A', mensaje:'Premium Collection · CITES Certified', idioma:'en' },
    // MEDIO ORIENTE - Ultra lujo, dorado, exclusividad
    AE: { region:'oriente', tema:'ultra-lujo', destacados:['joyeria','rarezas','minerales','especimenes'], saludo:'أهلاً وسهلاً', color1:'#FFD700', color2:'#1A0A00', mensaje:'مجموعة فاخرة حصرية · ذهب 24 قيراط', idioma:'ar' },
    SA: { region:'oriente', tema:'ultra-lujo', destacados:['joyeria','rarezas','minerales'], saludo:'أهلاً', color1:'#FFD700', color2:'#1A0A00', mensaje:'مجموعة فاخرة · أمازون', idioma:'ar' },
    QA: { region:'oriente', tema:'ultra-lujo', destacados:['joyeria','rarezas','minerales'], saludo:'أهلاً', color1:'#FFD700', color2:'#1A0A00', mensaje:'مجموعة حصرية فاخرة', idioma:'ar' },
    // LATAM
    BR: { region:'latam', tema:'natural-vibrante', destacados:['mariposas','especimenes','superalimentos','hongos'], saludo:'Bem-vindo', color1:'#C9A84C', color2:'#0A1A0A', mensaje:'Coleção Amazônica Premium · CITES', idioma:'pt' },
    MX: { region:'latam', tema:'natural-vibrante', destacados:['mariposas','joyeria','minerales'], saludo:'Bienvenido', color1:'#C9A84C', color2:'#0A1A0A', mensaje:'Colección Amazónica Premium', idioma:'es' },
    AR: { region:'latam', tema:'natural-vibrante', destacados:['mariposas','especimenes','minerales'], saludo:'Bienvenido', color1:'#C9A84C', color2:'#0A1A0A', mensaje:'Colección Natural Premium', idioma:'es' },
  }

  const profile = profiles[country] || {
    region:'global', tema:'lujo-moderno',
    destacados:['mariposas','joyeria','rarezas','minerales'],
    saludo:'Welcome', color1:'#C9A84C', color2:'#1A1209',
    mensaje:'Premium Amazonian Collection · CITES · SERFOR',
    idioma:'en'
  }

  return NextResponse.json({ country, ...profile })
}
