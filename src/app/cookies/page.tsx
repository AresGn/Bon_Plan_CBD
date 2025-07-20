export default function CookiesPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Politique de Cookies</h1>
        
        <div className="mt-8 space-y-8 text-neutral-600">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone 
              lors de la visite d'un site internet. Il permet au site de reconnaître votre appareil 
              et de mémoriser certaines informations sur votre navigation.
            </p>
            <p className="mt-4">
              Les cookies ne peuvent pas endommager votre appareil et ne contiennent pas de virus. 
              Ils facilitent votre navigation et permettent d'améliorer nos services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">2. Types de cookies utilisés</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookies strictement nécessaires</h3>
                <p>
                  Ces cookies sont indispensables au fonctionnement du site. Ils permettent :
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>La gestion de votre panier d'achat</li>
                  <li>La mémorisation de vos préférences de navigation</li>
                  <li>L'authentification et la sécurité</li>
                  <li>Le bon fonctionnement des formulaires</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-500">
                  <strong>Durée de conservation :</strong> Session ou 30 jours maximum
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookies de performance</h3>
                <p>
                  Ces cookies nous aident à comprendre comment vous utilisez notre site :
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Pages les plus visitées</li>
                  <li>Temps passé sur le site</li>
                  <li>Parcours de navigation</li>
                  <li>Erreurs rencontrées</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-500">
                  <strong>Durée de conservation :</strong> 13 mois maximum
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookies de fonctionnalité</h3>
                <p>
                  Ces cookies améliorent votre expérience utilisateur :
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Mémorisation de vos préférences (langue, région)</li>
                  <li>Personnalisation du contenu</li>
                  <li>Fonctionnalités de partage social</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-500">
                  <strong>Durée de conservation :</strong> 12 mois maximum
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cookies publicitaires</h3>
                <p>
                  Ces cookies permettent de vous proposer des publicités pertinentes :
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1">
                  <li>Publicités ciblées selon vos centres d'intérêt</li>
                  <li>Limitation du nombre d'affichages</li>
                  <li>Mesure de l'efficacité des campagnes</li>
                </ul>
                <p className="mt-2 text-sm text-neutral-500">
                  <strong>Durée de conservation :</strong> 13 mois maximum
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">3. Cookies tiers</h2>
            <p>
              Nous utilisons des services tiers qui peuvent déposer leurs propres cookies :
            </p>
            
            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900">Google Analytics</h4>
                <p className="text-sm">
                  Service de mesure d'audience qui nous aide à analyser le trafic de notre site.
                  <br />
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                    Politique de confidentialité Google
                  </a>
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900">Réseaux sociaux</h4>
                <p className="text-sm">
                  Boutons de partage Facebook, Instagram, Twitter qui peuvent déposer des cookies.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900">Paiement sécurisé</h4>
                <p className="text-sm">
                  Nos prestataires de paiement (Stripe, PayPal) utilisent des cookies pour sécuriser les transactions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">4. Gestion de vos préférences</h2>
            <p>
              Vous pouvez à tout moment modifier vos préférences concernant les cookies :
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900">Via notre bandeau de cookies</h4>
                <p className="text-sm">
                  Lors de votre première visite, un bandeau vous permet de choisir les cookies que vous acceptez.
                  Vous pouvez modifier ces préférences à tout moment en cliquant sur le lien en bas de page.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-900">Via votre navigateur</h4>
                <p className="text-sm">
                  Vous pouvez configurer votre navigateur pour :
                </p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                  <li>Accepter ou refuser tous les cookies</li>
                  <li>Être alerté avant l'enregistrement d'un cookie</li>
                  <li>Supprimer les cookies déjà enregistrés</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-neutral-50 p-4 rounded-lg">
              <h4 className="font-semibold text-neutral-900 mb-2">Configuration par navigateur :</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <strong>Chrome :</strong> Menu → Paramètres → Confidentialité et sécurité → Cookies
                </li>
                <li>
                  <strong>Firefox :</strong> Menu → Options → Vie privée et sécurité → Cookies
                </li>
                <li>
                  <strong>Safari :</strong> Préférences → Confidentialité → Cookies
                </li>
                <li>
                  <strong>Edge :</strong> Menu → Paramètres → Cookies et autorisations de site
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">5. Conséquences du refus des cookies</h2>
            <p>
              Si vous refusez l'utilisation de cookies, certaines fonctionnalités du site 
              pourraient ne pas fonctionner correctement :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Impossibilité de mémoriser votre panier</li>
              <li>Perte de vos préférences de navigation</li>
              <li>Fonctionnalités de personnalisation indisponibles</li>
              <li>Difficultés lors du processus de commande</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">6. Cookies et données personnelles</h2>
            <p>
              Certains cookies peuvent contenir des données personnelles. Ces données sont traitées 
              conformément à notre <a href="/confidentialite" className="text-primary-600 hover:text-primary-700">politique de confidentialité</a> 
              et au RGPD.
            </p>
            <p className="mt-4">
              Vous disposez des mêmes droits sur ces données (accès, rectification, suppression, etc.) 
              que sur l'ensemble de vos données personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">7. Évolution de cette politique</h2>
            <p>
              Cette politique de cookies peut être modifiée à tout moment pour s'adapter aux 
              évolutions de notre site ou de la réglementation.
            </p>
            <p className="mt-4">
              <strong>Dernière mise à jour :</strong> Juillet 2025
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">8. Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies :
            </p>
            <p className="mt-4">
              <strong>Bon Plan Pro 76</strong><br />
              7 Rue Saint-Gervais, 76000 Rouen<br />
              <strong>Email :</strong> Bonplanpro76@gmail.com<br />
              <strong>Téléphone :</strong> 07 88 64 69 83
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
