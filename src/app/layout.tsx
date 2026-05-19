 import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  title: 'House Insects of Peru E.I.R.L. | Amazonian Art & Bio-Trade',
  description: 'Exportacion de arte biologico premium, cuadros en pan de oro, artesanias de plata y bronce, textiles de alpaca, minerales de coleccion, hongos deshidratados, condimentos naturales disecados, plantas medicinales y esculturas en maderas finas. CITES · SERFOR · RUC 20447397804',
  openGraph: {
    title: 'House Insects of Peru E.I.R.L.',
    description: 'Amazonian Art & Bio-Trade · Especimenes biologicos · Joyeria natural · Artesanias amazonicas',
    url: 'https://houseinsectsofperu.com',
    siteName: 'House Insects of Peru',
    images: [{ url: 'https://res.cloudinary.com/dv3mvukmq/image/upload/logo-house-insects-peru_pvmkud' }],
    locale: 'es_PE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script async src="https://tracking.metricool.com/micro.js"/>
      </head>
      <body style={{fontFamily:"Georgia,serif"}}>{children}</body>
    </html>
  )
}