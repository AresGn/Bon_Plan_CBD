'use client'

import dynamic from 'next/dynamic'

// Chargement différé des composants lourds avec indicateurs de chargement
export const FeaturedProducts = dynamic(
  () => import('./FeaturedProducts'),
  { 
    loading: () => (
      <div className="py-24 bg-gradient-to-b from-neutral-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-neutral-200 rounded-lg w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-neutral-200 rounded-3xl aspect-[4/5]"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true 
  }
)

export const Testimonials = dynamic(
  () => import('./Testimonials'),
  { 
    loading: () => (
      <div className="py-16 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-neutral-200 rounded-lg w-64 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false 
  }
)

export const StoreInfo = dynamic(
  () => import('./StoreInfo'),
  { 
    loading: () => (
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse h-96 bg-neutral-100 rounded-xl"></div>
        </div>
      </div>
    ),
    ssr: false 
  }
)

export const WhyChooseUs = dynamic(
  () => import('./WhyChooseUs'),
  {
    loading: () => (
      <div className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-neutral-200 rounded-lg w-96 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-neutral-100 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: true
  }
)
