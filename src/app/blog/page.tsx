'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { 
  NewspaperIcon,
  CalendarIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

const blogPosts = [
  {
    id: 1,
    title: "Les bienfaits du CBD pour le sommeil",
    excerpt: "Découvrez comment le CBD peut vous aider à améliorer la qualité de votre sommeil et lutter contre l'insomnie.",
    image: "/images/blog/sommeil.jpg",
    date: "15 Juillet 2025",
    readTime: "5 min",
    category: "Bien-être"
  },
  {
    id: 2,
    title: "CBD et stress : une solution naturelle",
    excerpt: "Comment le CBD peut-il vous aider à gérer le stress et l'anxiété au quotidien ? Explications et conseils.",
    image: "/images/blog/stress.jpg",
    date: "10 Juillet 2025",
    readTime: "4 min",
    category: "Santé"
  },
  {
    id: 3,
    title: "Guide complet des fleurs CBD",
    excerpt: "Tout ce que vous devez savoir sur les fleurs de CBD : variétés, effets, modes de consommation.",
    image: "/images/blog/fleurs.jpg",
    date: "5 Juillet 2025",
    readTime: "7 min",
    category: "Produits"
  },
  {
    id: 4,
    title: "La législation du CBD en France",
    excerpt: "Point complet sur la réglementation française concernant le CBD : ce qui est autorisé et ce qui ne l'est pas.",
    image: "/images/blog/legal.jpg",
    date: "1 Juillet 2025",
    readTime: "6 min",
    category: "Légal"
  },
  {
    id: 5,
    title: "CBD vs THC : quelles différences ?",
    excerpt: "Comprendre les différences entre CBD et THC : effets, légalité, utilisations thérapeutiques.",
    image: "/images/blog/cbd-thc.jpg",
    date: "25 Juin 2025",
    readTime: "5 min",
    category: "Éducation"
  },
  {
    id: 6,
    title: "Comment choisir son huile de CBD ?",
    excerpt: "Guide pratique pour bien choisir votre huile de CBD : concentration, spectre, mode d'extraction.",
    image: "/images/blog/huile.jpg",
    date: "20 Juin 2025",
    readTime: "8 min",
    category: "Produits"
  }
]

const categories = [
  "Tous",
  "Bien-être",
  "Santé", 
  "Produits",
  "Légal",
  "Éducation"
]

export default function BlogPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <NewspaperIcon className="mx-auto h-16 w-16 text-primary-600 mb-6" />
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              <span className="block text-neutral-900">Blog</span>
              <span className="block text-gradient mt-2">CBD & Bien-être</span>
            </h1>
            <p className="mt-6 text-xl text-neutral-700 max-w-3xl mx-auto">
              Découvrez nos articles sur le CBD, ses bienfaits, les dernières actualités 
              et nos conseils pour votre bien-être au quotidien.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  index === 0 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  Lire la suite
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 transition-colors">
            Charger plus d'articles
          </button>
        </motion.div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Recevez nos derniers articles et actualités CBD directement dans votre boîte mail
            </p>
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-full text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-full hover:bg-neutral-100 transition-colors">
                S'abonner
              </button>
            </div>
            <p className="text-sm text-primary-200 mt-4">
              Pas de spam, désinscription possible à tout moment
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
