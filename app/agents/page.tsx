'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Phone, Mail, Award, MapPin } from 'lucide-react'
import { agents } from '@/data/agents'
import { properties } from '@/data/properties'

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-teal-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 font-playfair">
              Meet Our Expert Agents
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Our team of top-producing agents has decades of combined experience and deep local knowledge across the United States.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {agents.map((agent, i) => {
            const agentListings = properties.filter((p) => p.agentId === agent.id)
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Header with photo */}
                <div className="relative h-48 bg-gradient-to-br from-blue-50 to-teal-50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-800">{agent.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-5">
                    <h2 className="text-xl font-bold text-gray-900">{agent.name}</h2>
                    <p className="text-sm text-blue-600 font-medium mt-0.5">{agent.agency}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {agent.reviewCount} reviews · {agent.yearsExperience} years experience
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5 text-center">
                    {agent.bio}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-5 border-y border-gray-100 py-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{agentListings.length}</p>
                      <p className="text-xs text-gray-400">Active Listings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{agent.reviewCount}</p>
                      <p className="text-xs text-gray-400">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{agent.yearsExperience}yr</p>
                      <p className="text-xs text-gray-400">Experience</p>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {agent.specializations.map((s) => (
                      <span key={s} className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Contact */}
                  <div className="space-y-2 mb-5">
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <Phone className="w-4 h-4 text-blue-500" />
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4 text-blue-500" />
                      {agent.email}
                    </a>
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <span className="text-xs text-gray-400">Speaks:</span>
                    {agent.languages.map((l) => (
                      <span key={l} className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">{l}</span>
                    ))}
                  </div>

                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
                    Contact Agent
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-10 text-center"
        >
          <Award className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3 font-playfair">Join the PropLux Team</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Are you a top-performing agent looking for the best platform to grow your business? Join PropLux and access our exclusive clientele and cutting-edge tools.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
            Apply Now
          </button>
        </motion.div>
      </div>
    </div>
  )
}
