'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Bed, Bath, Square, MapPin, Heart, Share2, Calendar, Car,
  Star, Phone, Mail, CheckCircle2, ArrowLeft, ChevronLeft, ChevronRight, X
} from 'lucide-react'
import { properties } from '@/data/properties'
import { agents } from '@/data/agents'
import { formatPrice, formatNumber, formatSqft, getPropertyTypeLabel } from '@/lib/utils'
import { usePropertyStore } from '@/store/usePropertyStore'
import Badge from '@/components/ui/Badge'
import MortgageCalculator from '@/components/calculator/MortgageCalculator'
import PropertyCard from '@/components/property/PropertyCard'
import toast from 'react-hot-toast'

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params.id as string
  const property = properties.find((p) => p.id === id)
  const { toggleFavorite, isFavorite, addRecentlyViewed } = usePropertyStore()

  const [activeImg, setActiveImg] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [msgForm, setMsgForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (property) addRecentlyViewed(property.id)
  }, [property, addRecentlyViewed])

  if (!property) return notFound()

  const agent = agents.find((a) => a.id === property.agentId)
  const favorite = isFavorite(property.id)
  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.address.city === property.address.city))
    .slice(0, 3)

  const listingBadgeVariant = property.listingType === 'sale' ? 'sale' : property.listingType === 'rent' ? 'rent' : 'short-term'
  const listingLabel = property.listingType === 'sale' ? 'For Sale' : property.listingType === 'rent' ? 'For Rent' : 'Short-Term'

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent! The agent will contact you shortly.')
    setMsgForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/properties" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-80 sm:h-96 lg:h-[480px] mb-8 rounded-2xl overflow-hidden">
          <div
            className="col-span-4 sm:col-span-3 row-span-2 relative cursor-pointer group"
            onClick={() => { setActiveImg(0); setLightboxOpen(true) }}
          >
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          {property.images.slice(1, 5).map((img, i) => (
            <div
              key={i}
              className="hidden sm:block relative cursor-pointer group"
              onClick={() => { setActiveImg(i + 1); setLightboxOpen(true) }}
            >
              <Image src={img} alt={`${property.title} ${i + 2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              {i === 3 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">+{property.images.length - 4} more</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* Title & Basics */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={listingBadgeVariant}>{listingLabel.toUpperCase()}</Badge>
                <Badge variant="muted">{getPropertyTypeLabel(property.type)}</Badge>
                {property.isFeatured && <Badge variant="featured">FEATURED</Badge>}
                {property.isNew && <Badge variant="new">NEW</Badge>}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-playfair mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-gray-500">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm">{property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}</span>
              </div>

              {/* Specs chips */}
              <div className="flex flex-wrap gap-3 mt-5">
                {property.specs.bedrooms > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                    <Bed className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">{property.specs.bedrooms}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                  <Bath className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">{property.specs.bathrooms}</span>
                  <span className="text-sm text-gray-500">Bathrooms</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                  <Square className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">{formatNumber(property.specs.sqft)}</span>
                  <span className="text-sm text-gray-500">sqft</span>
                </div>
                {property.specs.garage > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-800">{property.specs.garage}</span>
                    <span className="text-sm text-gray-500">Garage</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-xl">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-gray-800">{property.specs.yearBuilt}</span>
                  <span className="text-sm text-gray-500">Built</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About This Property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>

              {property.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {property.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
              {property.features.length > 0 && (
                <>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 border-t border-gray-100 pt-4">Special Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {property.features.map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span className="text-sm text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
              <p className="text-sm text-gray-600 mb-4">
                {property.address.street}, {property.address.city}, {property.address.state} {property.address.zip}
              </p>
              <div className="h-48 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{property.address.city}, {property.address.state}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — Sticky */}
          <div className="lg:w-[380px] flex-shrink-0 space-y-5">
            <div className="lg:sticky lg:top-24 space-y-5">
              {/* Price Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatPrice(property.price, property.listingType)}
                    </p>
                    {property.pricePerSqft && (
                      <p className="text-sm text-gray-400 mt-1">${property.pricePerSqft}/sqft</p>
                    )}
                  </div>
                  <Badge variant={listingBadgeVariant}>{listingLabel.toUpperCase()}</Badge>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { toggleFavorite(property.id); toast(favorite ? 'Removed from saved' : 'Saved!', { icon: favorite ? '💔' : '❤️' }) }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-medium transition-colors
                      ${favorite ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                  >
                    <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
                    {favorite ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              {/* Agent Contact Card */}
              {agent && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Listed by</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{agent.name}</p>
                      <p className="text-xs text-gray-500">{agent.agency}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-gray-700">{agent.rating}</span>
                        <span className="text-xs text-gray-400">({agent.reviewCount})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <Phone className="w-4 h-4 text-blue-500" />
                      {agent.phone}
                    </a>
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <Mail className="w-4 h-4 text-blue-500" />
                      {agent.email}
                    </a>
                  </div>

                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors mb-3">
                    Schedule a Viewing
                  </button>

                  {/* Send Message Form */}
                  <form onSubmit={handleContact} className="space-y-3 border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-600">Send a Message</p>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={msgForm.name}
                      onChange={(e) => setMsgForm({ ...msgForm, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      value={msgForm.email}
                      onChange={(e) => setMsgForm({ ...msgForm, email: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                    />
                    <textarea
                      placeholder={`I'm interested in ${property.title}...`}
                      rows={3}
                      value={msgForm.message}
                      onChange={(e) => setMsgForm({ ...msgForm, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                    <button type="submit" className="w-full py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold rounded-xl transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
              )}

              {/* Mortgage Calculator */}
              {property.listingType === 'sale' && (
                <MortgageCalculator defaultPrice={property.price} />
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 font-playfair">Similar Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        {/* Agent Full Profile */}
        {agent && (
          <section className="mt-12 bg-white rounded-2xl border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">About the Agent</h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{agent.agency}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(agent.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                      <span className="text-sm font-semibold text-gray-700">{agent.rating}</span>
                      <span className="text-sm text-gray-400">({agent.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{agent.listingsCount}</p>
                      <p className="text-xs text-gray-400">Listings</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{agent.yearsExperience}+</p>
                      <p className="text-xs text-gray-400">Years Exp.</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{agent.reviewCount}</p>
                      <p className="text-xs text-gray-400">Reviews</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-4">{agent.bio}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {agent.specializations.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                      {s}
                    </span>
                  ))}
                  {agent.languages.map((l) => (
                    <span key={l} className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                      🌐 {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveImg((prev) => (prev - 1 + property.images.length) % property.images.length)}
            className="absolute left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setActiveImg((prev) => (prev + 1) % property.images.length)}
            className="absolute right-16 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[70vh] px-16">
            <Image
              src={property.images[activeImg]}
              alt={property.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 flex gap-2">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === activeImg ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
