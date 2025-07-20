export default function ConfidentialitePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Politique de Confidentialité</h1>
        
        <div className="mt-8 space-y-8 text-neutral-600">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">1. Collecte des données personnelles</h2>
            <p>
              Bon Plan Pro 76 collecte vos données personnelles dans le cadre de la gestion de votre compte client, 
              du traitement de vos commandes et de l'amélioration de nos services.
            </p>
            <p className="mt-4">
              <strong>Données collectées :</strong>
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Nom, prénom, adresse email</li>
              <li>Adresse de livraison et de facturation</li>
              <li>Numéro de téléphone</li>
              <li>Historique des commandes</li>
              <li>Données de navigation (cookies)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">2. Finalités du traitement</h2>
            <p>Vos données personnelles sont utilisées pour :</p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Gérer votre compte client et vos commandes</li>
              <li>Assurer la livraison de vos produits</li>
              <li>Vous contacter concernant vos commandes</li>
              <li>Améliorer nos services et notre site web</li>
              <li>Respecter nos obligations légales</li>
              <li>Vous envoyer des informations commerciales (avec votre consentement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">3. Base légale du traitement</h2>
            <p>
              Le traitement de vos données personnelles repose sur :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><strong>L'exécution du contrat</strong> pour la gestion des commandes</li>
              <li><strong>L'intérêt légitime</strong> pour l'amélioration de nos services</li>
              <li><strong>Le consentement</strong> pour les communications marketing</li>
              <li><strong>L'obligation légale</strong> pour la conservation des factures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">4. Destinataires des données</h2>
            <p>
              Vos données personnelles peuvent être transmises à :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Nos prestataires de livraison</li>
              <li>Nos prestataires de paiement sécurisé</li>
              <li>Nos prestataires techniques (hébergement, maintenance)</li>
              <li>Les autorités compétentes en cas d'obligation légale</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">5. Durée de conservation</h2>
            <p>
              Nous conservons vos données personnelles pendant :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><strong>Données de compte :</strong> 3 ans après la dernière commande</li>
              <li><strong>Données de commande :</strong> 10 ans (obligation légale)</li>
              <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              <li><strong>Données marketing :</strong> 3 ans ou jusqu'à désinscription</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">6. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit d'effacement :</strong> supprimer vos données</li>
              <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
              <li><strong>Droit de limitation :</strong> limiter le traitement</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à : <strong>Bonplanpro76@gmail.com</strong>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">7. Sécurité des données</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
              protéger vos données personnelles contre la perte, l'utilisation abusive, l'accès 
              non autorisé, la divulgation, l'altération ou la destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">8. Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de navigation. 
              Vous pouvez configurer votre navigateur pour refuser les cookies, mais certaines 
              fonctionnalités du site pourraient ne pas fonctionner correctement.
            </p>
            <p className="mt-4">
              Pour plus d'informations, consultez notre <a href="/cookies" className="text-primary-600 hover:text-primary-700">politique de cookies</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">9. Transferts internationaux</h2>
            <p>
              Vos données personnelles peuvent être transférées vers des pays situés en dehors de 
              l'Union européenne uniquement dans le cadre de prestations techniques nécessaires 
              au fonctionnement du site, avec des garanties appropriées.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">10. Réclamations</h2>
            <p>
              Si vous estimez que le traitement de vos données personnelles constitue une violation 
              du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL 
              (Commission Nationale de l'Informatique et des Libertés).
            </p>
            <p className="mt-4">
              <strong>CNIL :</strong> 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07<br />
              <strong>Téléphone :</strong> 01 53 73 22 22<br />
              <strong>Site web :</strong> <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">www.cnil.fr</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">11. Modifications</h2>
            <p>
              Cette politique de confidentialité peut être modifiée à tout moment. 
              Les modifications prendront effet dès leur publication sur le site. 
              Nous vous encourageons à consulter régulièrement cette page.
            </p>
            <p className="mt-4">
              <strong>Dernière mise à jour :</strong> Juillet 2025
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">12. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité ou le traitement 
              de vos données personnelles, vous pouvez nous contacter :
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
