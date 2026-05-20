'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, CheckCircle2, ArrowRight, DollarSign, Home, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const steps = [
  { icon: Home, step: '01', title: 'List Your Property', description: 'Create a stunning listing with professional photos, detailed descriptions, and all the features buyers love.' },
  { icon: Users, step: '02', title: 'Connect with Buyers', description: 'Get matched with qualified buyers actively searching for properties like yours. Our smart algorithm does the heavy lifting.' },
  { icon: DollarSign, step: '03', title: 'Close with Confidence', description: 'Our expert agents and legal team guide you through offers, negotiations, and closing for a seamless experience.' },
]

const benefits = [
  'Maximum exposure on America\'s #1 luxury platform',
  'Professional photography and 3D virtual tours',
  'Targeted marketing to qualified high-net-worth buyers',
  'Expert pricing analysis and market reports',
  'Dedicated concierge agent through every step',
  'No hidden fees — transparent pricing always',
]

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm text-white/80 mb-6">
              <TrendingUp className="w-4 h-4" />
              Sellers average 8.2% above market value with PropLux
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-5 font-playfair">
              Sell Your Home<br />the Smart Way
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
              List your property on America&apos;s premier luxury real estate platform and connect with thousands of serious buyers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/list-property"
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                List My Property <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/agents"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white hover:bg-white/20 rounded-xl font-semibold text-lg transition-colors"
              >
                Talk to an Agent
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Properties Sold', value: '$4.2B+' },
              { label: 'Avg Days on Market', value: '18' },
              { label: 'Above Ask Price', value: '8.2%' },
              { label: 'Client Satisfaction', value: '98%' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-blue-600 mb-1">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 font-playfair">How It Works</h2>
          <p className="text-gray-500 mt-3">Sell your home in three simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon: Icon, step, title, description }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-blue-600 font-bold text-sm mb-2">Step {step}</p>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-playfair">Why Sell with PropLux?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300 text-sm">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/list-property"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors text-lg"
            >
              Get Started Today <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
