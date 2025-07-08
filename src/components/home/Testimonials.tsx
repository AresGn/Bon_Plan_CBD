import { ChatBubbleBottomCenterTextIcon, CheckBadgeIcon, UserIcon } from '@heroicons/react/24/outline'

const testimonials = [
  {
    name: 'Alice D.',
    role: 'Client Fidèle',
    testimonial: "Produits de qualité, livraison rapide et service client irréprochable. Je recommande Bon Plan CBD les yeux fermés !",
    icon: UserIcon,
  },
  {
    name: 'Marc J.',
    role: 'Passionné de CBD',
    testimonial: "Le meilleur shop CBD à Rouen. Enfin une boutique avec des analyses disponibles, ça rassure beaucoup.",
    icon: CheckBadgeIcon,
  },
  {
    name: 'Sophia L.',
    role: 'Nouvelle Cliente',
    testimonial: "Très satisfaite de ma première commande, les fleurs sont vraiment top niveau goût et effets.",
    icon: ChatBubbleBottomCenterTextIcon,
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Ils parlent de nous
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Vos avis sont précieux et nous aident à nous améliorer
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center h-full transition-transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-center justify-center mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-600 shadow-lg">
                  <testimonial.icon className="h-8 w-8 text-white" aria-hidden="true" />
                </div>
              </div>
              <blockquote className="mt-2 text-neutral-700 italic relative">
                <svg className="w-6 h-6 absolute -top-6 left-1/2 -translate-x-1/2 text-primary-200" fill="currentColor" viewBox="0 0 24 24"><path d="M7.17 6A5.001 5.001 0 002 11c0 2.21 1.79 4 4 4 .55 0 1 .45 1 1s-.45 1-1 1a6 6 0 110-12c.55 0 1 .45 1 1s-.45 1-1 1zm10 0A5.001 5.001 0 0012 11c0 2.21 1.79 4 4 4 .55 0 1 .45 1 1s-.45 1-1 1a6 6 0 110-12c.55 0 1 .45 1 1s-.45 1-1 1z" /></svg>
                <span className="block px-2">{testimonial.testimonial}</span>
              </blockquote>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary-700">{testimonial.name}</h3>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
