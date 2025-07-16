import Image from 'next/image'
import { MapPinIcon, ClockIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function StoreInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Venez nous rendre visite !
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Notre boutique à Rouen vous accueille dans une ambiance chaleureuse 
              pour vous conseiller et vous faire découvrir nos produits.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Adresse</h3>
                  <p className="mt-1 text-neutral-600">
                    123 Rue du Commerce<br />
                    76000 Rouen
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <ClockIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Horaires d'ouverture</h3>
                  <div className="mt-1 text-neutral-600">
                    <p>Mardi - Vendredi : 10h00 - 19h00</p>
                    <p>Samedi : 10h00 - 19h00</p>
                    <p>Dimanche - Lundi : Fermé</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Contact</h3>
                  <p className="mt-1 text-neutral-600">
                    Téléphone : 02 35 XX XX XX<br />
                    Email : contact@bonplancbd.fr
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                Voir sur Google Maps
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero.jpg"
                alt="Boutique Bon Plan CBD Rouen"
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-medium">Ambiance conviviale</p>
                <p className="text-xs mt-1 opacity-90">
                  Un espace dédié au bien-être et à la détente
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="card p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">100%</div>
                <p className="text-sm text-neutral-600">Clients satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
