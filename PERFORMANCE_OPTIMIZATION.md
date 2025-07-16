# 🚀 Guide d'Optimisation des Performances - Bon Plan CBD

## 📊 Problèmes Identifiés

1. **Chargement de polices multiples** - Inter et Poppins avec plusieurs poids
2. **Images non optimisées** - Chargement d'images volumineuses
3. **Composants lourds** - Swiper, Framer Motion, Chart.js chargés sur toutes les pages
4. **Pas de lazy loading** pour les composants non critiques
5. **Bundle JavaScript volumineux** - Next.js 15 avec beaucoup de dépendances

## ✅ Solutions d'Optimisation

### 1. **Optimisation des Images**

```tsx
// Utiliser next/image avec lazy loading
import Image from 'next/image'

// Dans vos composants
<Image
  src="/images/product.jpg"
  alt="Product"
  width={300}
  height={300}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  quality={85}
/>
```

### 2. **Lazy Loading des Composants**

Créez un fichier `src/components/home/LazyComponents.tsx`:

```tsx
import dynamic from 'next/dynamic'

// Chargement différé des composants lourds
export const FeaturedProducts = dynamic(
  () => import('./FeaturedProducts'),
  { 
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
    ssr: true 
  }
)

export const Testimonials = dynamic(
  () => import('./Testimonials'),
  { 
    loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
    ssr: false 
  }
)

export const StoreInfo = dynamic(
  () => import('./StoreInfo'),
  { ssr: false }
)
```

### 3. **Optimisation de la Page d'Accueil**

Modifiez `src/app/page.tsx`:

```tsx
import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import { FeaturedProducts, Testimonials, StoreInfo } from '@/components/home/LazyComponents'
import WhyChooseUs from '@/components/home/WhyChooseUs'

export default function HomePage() {
  return (
    <>
      {/* Composants critiques - chargés immédiatement */}
      <Hero />
      <Categories />
      
      {/* Composants secondaires - chargés après */}
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <StoreInfo />
    </>
  )
}
```

### 4. **Optimisation des Polices**

Modifiez `src/app/layout.tsx`:

```tsx
// Réduire le nombre de poids de police
const poppins = Poppins({ 
  weight: ['400', '600', '700'], // Seulement les poids nécessaires
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})
```

### 5. **Configuration Next.js Optimisée**

Mettez à jour `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'bon-plan-cbd.fr'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 1080, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react', 'framer-motion', 'swiper'],
  },
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
    return config
  },
}
```

### 6. **Optimisation du Hero Component**

Créez `src/components/home/HeroOptimized.tsx`:

```tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

// Préchargement des images critiques
const preloadImages = [
  '/images/hero-product-1.png',
  '/images/hero-bg.jpg',
]

export default function HeroOptimized() {
  useEffect(() => {
    // Précharger les images
    preloadImages.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Image de fond optimisée */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>
      
      {/* Contenu */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bon Plan CBD
          </h1>
          <p className="text-xl text-white/90 mb-8">
            La Qualité au Meilleur Prix
          </p>
          <Link
            href="/produits"
            className="inline-block px-8 py-4 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors"
          >
            Découvrir nos produits
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

### 7. **Mise en Cache et Headers**

Créez `src/middleware.ts`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Cache pour les assets statiques
  if (request.nextUrl.pathname.startsWith('/_next/static')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Cache pour les images
  if (request.nextUrl.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, must-revalidate')
  }
  
  return response
}
```

### 8. **Optimisation de la Base de Données**

Pour les requêtes lentes, ajoutez des index dans PostgreSQL:

```sql
-- Index pour accélérer les requêtes produits
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_category ON products(categoryId);
CREATE INDEX idx_products_slug ON products(slug);

-- Index pour les catégories
CREATE INDEX idx_categories_slug ON categories(slug);
```

### 9. **Monitoring des Performances**

Ajoutez un monitoring avec Web Vitals:

```tsx
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## 📈 Résultats Attendus

- **Réduction du First Contentful Paint (FCP)** de 50%
- **Amélioration du Time to Interactive (TTI)** de 40%
- **Score Lighthouse** > 90 sur toutes les métriques
- **Taille du bundle JS** réduite de 30%

## 🛠️ Mise en Œuvre

1. Commencez par les optimisations d'images (impact immédiat)
2. Implémentez le lazy loading des composants
3. Optimisez la configuration Next.js
4. Ajoutez la mise en cache
5. Testez avec Lighthouse après chaque étape

## 🔍 Outils de Test

- **Lighthouse** (Chrome DevTools)
- **WebPageTest** (webpagetest.org)
- **GTmetrix** (gtmetrix.com)
- **Bundle Analyzer** : `npm install @next/bundle-analyzer`
