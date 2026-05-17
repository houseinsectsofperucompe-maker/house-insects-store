import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'House Insects of Peru E.I.R.L. | Amazonian Art & Bio-Trade',
  description: 'Exportación de arte biológico premium, cuadros en pan de oro, artesanías de plata y bronce, textiles de alpaca, minerales de colección, hongos deshidratados, condimentos naturales disecados, plantas medicinales y esculturas en maderas finas. CITES · SERFOR · RUC 20447397804',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png',
  },
  openGraph: {
    title: 'House Insects of Peru E.I.R.L.',
    description: 'Amazonian Art & Bio-Trade · Especímenes biológicos · Joyería natural · Artesanías amazónicas',
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
      <body>{children}</body>
    </html>
  )
}
