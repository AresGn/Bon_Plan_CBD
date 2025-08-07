'use client'

import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Vérifier si nous sommes sur une page admin
  const isAdminPage = pathname?.startsWith('/admin')
  
  // Si c'est une page admin, ne pas afficher Header/Footer
  if (isAdminPage) {
    return <>{children}</>
  }
  
  // Pour toutes les autres pages, afficher le layout normal
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  )
}
