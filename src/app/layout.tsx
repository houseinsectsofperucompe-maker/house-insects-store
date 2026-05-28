import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import LangSelector from '@/components/LangSelector'
import CurrencySelector from '@/components/CurrencySelector'
import { CarritoProvider } from '@/components/CarritoContext'
import CarritoBoton from '@/components/CarritoBoton'
import DivisionesMenu from '@/components/DivisionesMenu'
import ContactoFlotante from '@/components/ContactoFlotante'

export const metadata: Metadata = {
  icons: { icon: '/favicon.png', shortcut: '/favicon.png', apple: '/favicon.png' },
  title: 'House Insects of Peru E.I.R.L. | Amazonian Art & Bio-Trade',
  description: 'Exportacion de arte biologico premium, cuadros en pan de oro, artesanias de plata y bronce, textiles de alpaca, minerales de coleccion. CITES · SERFOR · RUC 20447397804',
  openGraph: {
    title: 'House Insects of Peru E.I.R.L.',
    description: 'Amazonian Art & Bio-Trade · Especimenes biologicos · Joyeria natural · Artesanias amazonicas',
    url: 'https://houseinsectsofperu.com',
    siteName: 'House Insects of Peru',
    images: [{ url: 'https://www.houseinsectsofperu.com/logo-house-insects-peru.png' }],
    locale: 'es_PE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com"/>
        <link rel="manifest" href="/manifest.json"/>
        <script src="https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js" kr-public-key={process.env.NEXT_PUBLIC_IZIPAY_PROD_PUBLIC_KEY} kr-language="es-PE"></script>
        <link rel="preconnect" href="https://api.qrserver.com"/>
        <link rel="dns-prefetch" href="https://tracker.metricool.com"/>
        <meta name="baidu-site-verification" content="house-insects-peru"/>
        <meta name="applicable-device" content="pc,mobile"/>
        <script defer dangerouslySetInnerHTML={{__html:`(function(){var d=document,s=d.createElement('script');s.src='https://tracker.metricool.com/resources/be.js';s.defer=true;s.onload=function(){beTracker.t({hash:'fa2c62a23e07cbf3fed9e83a12f22bd3'})};d.head.appendChild(s)})();`}}/>
      </head>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-1D8T2HQY14" strategy="afterInteractive"/>
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-1D8T2HQY14');
      `}</Script>
      <body style={{fontFamily:"Georgia,serif"}}>
        <CarritoProvider>
        <div style={{position:"fixed",top:12,right:12,zIndex:9999,display:"flex",gap:8,alignItems:"center"}}><CarritoBoton/><CurrencySelector/><LangSelector/></div>
        {children}
        <ContactoFlotante />
        </CarritoProvider>
      </body>
    </html>
  )
}
