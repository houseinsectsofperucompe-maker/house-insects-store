import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'House Insects of Peru E.I.R.L. | Amazonian Art & Bio-Trade',
  description: 'Exportación de arte biológico premium, cuadros en pan de oro, artesanías de plata y bronce, especímenes biológicos secos, joyería natural amazónica. CITES · SERFOR · RUC 20447397804',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
