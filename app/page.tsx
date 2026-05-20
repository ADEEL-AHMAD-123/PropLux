'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Building2, TrendingUp, Users, Award, ArrowRight, Star, ChevronRight, Home, Landmark, Layers, Trees, Briefcase, Quote } from 'lucide-react'
import HeroSearch from '@/components/search/HeroSearch'
import PropertyCard from '@/components/property/PropertyCard'
import { properties } from '@/data/properties'
import { agents } from '@/data/agents'
import { formatNumber } from '@/lib/utils'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (inView) motionValue.set(target)
  }, [inView, target, motionValue])

  useEffect(() => {
    springValue.on('change', (v) => setDisplay(formatNumber(Math.floor(v))))
  }, [springValue])

  return <span ref={ref}>{display}{suffix}</span>
}

const stats = [
  { icon: Building2, label: 'Properties Listed', value: 10000, suffix: '+' },
  { icon: Users, label: 'Happy Clients', value: 5000, suffix: '+' },
  { icon: Award, label: 'Expert Agents', value: 500, suffix: '+' },
  { icon: TrendingUp, label: 'Years Experience', value: 15, suffix: '+' },
]

const categories = [
  { label: 'Houses', icon: Home, count: 1240, type: 'house', color: 'bg-blue-50 text-blue-600' },
  { label: 'Apartments', icon: Building2, count: 3450, type: 'apartment', color: 'bg-purple-50 text-purple-600' },
  { label: 'Condos', icon: Layers, count: 890, type: 'condo', color: 'bg-teal-50 text-teal-600' },
  { label: 'Villas', icon: Landmark, count: 240, type: 'villa', color: 'bg-amber-50 text-amber-600' },
  { label: 'Offices', icon: Briefcase, count: 410, type: 'office', color: 'bg-green-50 text-green-600' },
  { label: 'Land', icon: Trees, count: 180, type: 'land', color: 'bg-rose-50 text-rose-600' },
]

const steps = [
  {
    step: '01',
    title: 'Search & Discover',
    description: 'Browse thousands of premium listings with advanced filters. Find properties that match your exact criteria.',
    color: 'bg-blue-600',
  },
  {
    step: '02',
    title: 'Connect with Agents',
    description: 'Get matched with top-rated local agents who know your target neighborhood inside and out.',
    color: 'bg-teal-600',
  },
  {
    step: '03',
    title: 'Close the Deal',
    description: 'From offer to close, we guide you through every step of the process with expert support.',
    color: 'bg-amber-500',
  },
]

const testimonials = [
  {
    name: 'Jennifer Hartley',
    location: 'Miami, FL',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format',
    rating: 5,
    text: 'PropLux made our home search an absolute pleasure. We found our dream waterfront home in just three weeks. Sarah was incredible throughout the entire process.',
  },
  {
    name: 'Marcus Johnson',
    location: 'New York, NY',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format',
    rating: 5,
    text: 'As an investor, I\'ve used many platforms, but PropLux is truly best-in-class. The data, the agent network, and the overall experience are unmatched.',
  },
  {
    name: 'Sofia Reyes',
    location: 'Los Angeles, CA',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format',
    rating: 5,
    text: 'We sold our Beverly Hills home $200K over asking price in 5 days. James at PropLux was a true professional who delivered beyond our expectations.',
  },
]

const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 6)
const topAgents = agents.slice(0, 3)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&auto=format"
            alt="Luxury home"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/90 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              30 new listings this week
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 font-playfair">
              Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                Dream Home
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Discover extraordinary properties across the United States. From luxury estates to
              city condos — your perfect home is waiting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroSearch />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-8 mt-10 text-white/70 text-sm"
          >
            {['Miami', 'New York', 'Los Angeles', 'Chicago', 'Austin', 'Seattle'].map((city) => (
              <Link key={city} href={`/properties?city=${city}`} className="hover:text-white transition-colors hidden sm:block">
                {city}
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                  <AnimatedCounter target={value} suffix={suffix} />
                </p>
                <p className="text-sm text-gray-500">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Handpicked for You</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1 font-playfair">
                Featured Properties
              </h2>
            </div>
            <Link
              href="/properties"
              className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-blue-200"
            >
              Browse All Properties
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Explore</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1 font-playfair">Browse by Property Type</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(({ label, icon: Icon, count, type, color }, i) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  href={`/properties?type=${type}`}
                  className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group text-center"
                >
                  <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatNumber(count)} listings</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-playfair">How It Works</h2>
            <p className="text-blue-100 mt-3 max-w-xl mx-auto">
              We&apos;ve simplified the real estate experience into three straightforward steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-white/20" />

            {steps.map(({ step, title, description, color }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/20"
              >
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <span className="text-white font-bold text-lg">{step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP AGENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Expert Team</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1 font-playfair">Top Agents</h2>
            </div>
            <Link
              href="/agents"
              className="hidden sm:flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topAgents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-blue-100 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500">{agent.agency}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-gray-700">{agent.rating}</span>
                      <span className="text-xs text-gray-400">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{agent.bio}</p>
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{agent.listingsCount}</p>
                    <p className="text-xs text-gray-400">Listings</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{agent.yearsExperience}yr</p>
                    <p className="text-xs text-gray-400">Experience</p>
                  </div>
                  <Link
                    href={`/agents`}
                    className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-medium transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-1 font-playfair">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <Quote className="w-8 h-8 text-blue-100 mb-4" />
                <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-700 rounded-3xl p-10 lg:p-16 text-center"
          >
            {/* Background dots */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-8 right-8 w-32 h-32 bg-white rounded-full" />
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-white rounded-full" />
            </div>

            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4 font-playfair">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                Join over 5,000 happy clients who found their dream home with PropLux.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/properties"
                  className="flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition-colors shadow-lg"
                >
                  Browse Properties
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/agents"
                  className="flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl font-semibold transition-colors"
                >
                  Talk to an Agent
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
