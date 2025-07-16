import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import { FeaturedProducts, WhyChooseUs, Testimonials, StoreInfo } from '@/components/home/LazyComponents'

export default function HomePage() {
  return (
    <>
      {/* Composants critiques - chargés immédiatement */}
      <Hero />
      <Categories />
      
      {/* Composants secondaires - chargés en lazy loading */}
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <StoreInfo />
    </>
  )
}
