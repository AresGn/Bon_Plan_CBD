import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import AgeGate from '@/components/AgeGate'
import PayGreenProvider from '@/components/providers/PayGreenProvider'
import { usePathname } from 'next/navigation'
import ConditionalLayout from '@/components/layout/ConditionalLayout'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const poppins = Poppins({ 
  weight: ['400', '600', '700'], // Réduit de 5 à 3 poids
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Bon Plan Pro 76 - La Qualité au Meilleur Prix | Rouen',
  description: 'Découvrez notre sélection premium de produits CBD : fleurs, résines, infusions. Magasin à Rouen avec conseils personnalisés.',
  keywords: 'CBD, Rouen, fleurs CBD, résine CBD, infusion CBD, cannabidiol, boutique CBD',
  openGraph: {
    title: 'Bon Plan Pro 76 - La Qualité au Meilleur Prix',
    description: 'Votre boutique CBD de confiance à Rouen',
    url: 'https://bonplancbd.fr',
    siteName: 'Bon Plan Pro 76',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'votre-code-verification-google',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col">
        <PayGreenProvider>
          <AgeGate>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </AgeGate>
        </PayGreenProvider>
      </body>
    </html>
  )
}
