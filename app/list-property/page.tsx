'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Upload, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ListPropertyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    title: '', type: 'house', listingType: 'sale', price: '',
    street: '', city: '', state: '', zip: '',
    bedrooms: '', bathrooms: '', sqft: '', description: '',
    name: '', email: '', phone: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success('Property submitted for review!')
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-lg shadow-xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3 font-playfair">Listing Submitted!</h2>
          <p className="text-gray-500 mb-8">Your property has been submitted for review. Our team will contact you within 24 hours to complete the listing process.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
          >
            Submit Another Property
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">List Your Property</h1>
          <p className="text-gray-500 mt-2">Reach thousands of serious buyers on America&apos;s premier luxury platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Property Details */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Property Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Stunning Waterfront Home in Miami"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Property Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    {['house', 'apartment', 'condo', 'townhouse', 'villa', 'studio', 'office', 'land', 'vacation'].map((t) => (
                      <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Listing Type</label>
                  <select
                    value={form.listingType}
                    onChange={(e) => setForm({ ...form, listingType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="short-term">Short-Term</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Price (USD)</label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder={form.listingType === 'sale' ? 'e.g. 1500000' : 'Monthly rent e.g. 4500'}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bedrooms</label>
                  <input type="number" min="0" max="20" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Bathrooms</label>
                  <input type="number" min="0" max="20" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Square Feet</label>
                  <input type="number" value={form.sqft} onChange={(e) => setForm({ ...form, sqft: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea
                  required
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your property in detail..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Property Address</h2>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Street Address"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="State"
                  maxLength={2}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  required
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Photos</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700 mb-1">Drop photos here or click to upload</p>
              <p className="text-xs text-gray-400">JPG, PNG up to 10MB each. Minimum 5 photos recommended.</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Your Contact Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-xl transition-colors shadow-sm shadow-blue-200"
          >
            Submit Property for Review
          </button>
        </form>
      </div>
    </div>
  )
}
