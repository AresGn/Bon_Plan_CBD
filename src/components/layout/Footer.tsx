import Link from 'next/link'
import Image from 'next/image'
import OptimizedImage from '@/components/ui/OptimizedImage'

const footerLinks = {
  produits: [
    { name: 'Fleurs CBD', href: '/produits/fleurs' },
    { name: 'Résines CBD', href: '/produits/resines' },
    { name: 'Infusions CBD', href: '/produits/infusions' },
  ],
  informations: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Livraison', href: '/livraison' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog CBD', href: '/blog' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'CGV', href: '/cgv' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
    { name: 'Cookies', href: '/cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Logo et description */}
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <OptimizedImage
                src="/images/logo.jpg"
                alt="Bon Plan CBD"
                width={40}
                height={40}
                className="h-10 w-auto"
                priority={false}
                quality={85}
                sizes="40px"
              />
              <div>
                <span className="text-xl font-bold">Bon Plan CBD</span>
                <p className="text-xs text-neutral-400">La Qualité au Meilleur Prix</p>
              </div>
            </Link>
            <p className="text-base text-neutral-400">
              Votre boutique CBD de confiance à Rouen. Produits certifiés,
              conseils personnalisés.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Liens */}
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold">Produits</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerLinks.produits.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-base text-neutral-400 hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-semibold">Informations</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerLinks.informations.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-base text-neutral-400 hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-base font-semibold">Légal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-base text-neutral-400 hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-base font-semibold">Contact</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="text-base text-neutral-400">
                    <strong>Adresse :</strong><br />
                    7 Rue Saint-Gervais<br />
                    76000 Rouen
                  </li>
                  <li className="text-base text-neutral-400">
                    <strong>Téléphone :</strong><br />
                    07 88 64 69 83
                  </li>
                  <li className="text-base text-neutral-400">
                    <strong>Email :</strong><br />
                    Bonplanpro76@gmail.com
                  </li>
                  <li className="text-base text-neutral-400">
                    <strong>Horaires :</strong><br />
                    Lundi-Dimanche : 11h00 – 21h00
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Paiements et certifications */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            <div className="flex items-center space-x-4">
              <OptimizedImage
                src="/images/logo.jpg"
                alt="Bon Plan Pro 76"
                width={32}
                height={32}
                className="h-8 w-auto"
                priority={false}
                quality={85}
                sizes="32px"
              />
              <div className="flex flex-col">
                <p className="text-base text-neutral-400">
                  © 2024 Bon Plan Pro 76. Tous droits réservés.
                </p>
                <Link href="/mentions-legales" className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
                  Mentions légales
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-neutral-400">Paiements sécurisés :</span>
              <div className="flex items-center space-x-2">
                <Image
                  src="/images/payments/visa.svg"
                  alt="Visa"
                  width={40}
                  height={25}
                  className="h-6 w-auto bg-white rounded px-1"
                />
                <Image
                  src="/images/payments/mastercard.svg"
                  alt="Mastercard"
                  width={40}
                  height={25}
                  className="h-6 w-auto bg-white rounded px-1"
                />
                <Image
                  src="/images/payments/cb.svg"
                  alt="CB"
                  width={40}
                  height={25}
                  className="h-6 w-auto bg-white rounded px-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
