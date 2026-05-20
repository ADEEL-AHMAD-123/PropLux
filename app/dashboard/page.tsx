'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Clock, MessageSquare, User, Send, Search, Bell, Settings } from 'lucide-react'
import { usePropertyStore } from '@/store/usePropertyStore'
import { properties } from '@/data/properties'
import { agents } from '@/data/agents'
import PropertyCard from '@/components/property/PropertyCard'
import EmptyState from '@/components/ui/EmptyState'
import { formatPrice, timeAgo } from '@/lib/utils'

const tabs = [
  { id: 'saved', label: 'Saved Properties', icon: Heart },
  { id: 'recent', label: 'Recently Viewed', icon: Clock },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'My Profile', icon: User },
]

const dummyConversations = [
  {
    id: 'conv-1',
    agentId: 'agent-001',
    propertyId: 'prop-001',
    lastMessage: 'Hi! I\'d love to schedule a showing for the Coral Gables property.',
    updatedAt: '2024-02-10T14:30:00Z',
    unread: 2,
  },
  {
    id: 'conv-2',
    agentId: 'agent-002',
    propertyId: 'prop-002',
    lastMessage: 'The property is still available. When would you like to visit?',
    updatedAt: '2024-02-09T10:00:00Z',
    unread: 0,
  },
  {
    id: 'conv-3',
    agentId: 'agent-003',
    propertyId: 'prop-011',
    lastMessage: 'Great news! The landlord has accepted your application.',
    updatedAt: '2024-02-08T16:20:00Z',
    unread: 1,
  },
]

const dummyMessages = [
  { id: 'm1', sender: 'agent', text: 'Hello! Thanks for your interest in the property.', time: '10:00 AM' },
  { id: 'm2', sender: 'user', text: 'Hi! I\'d love to schedule a showing for next weekend.', time: '10:05 AM' },
  { id: 'm3', sender: 'agent', text: 'I have Saturday at 2 PM available. Does that work for you?', time: '10:12 AM' },
  { id: 'm4', sender: 'user', text: 'Saturday at 2 PM works perfectly!', time: '10:15 AM' },
  { id: 'm5', sender: 'agent', text: 'Great! I\'ll send you the confirmation details shortly. Looking forward to meeting you!', time: '10:18 AM' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('saved')
  const [activeConv, setActiveConv] = useState(dummyConversations[0])
  const [newMessage, setNewMessage] = useState('')
  const { favorites, recentlyViewed } = usePropertyStore()

  const savedProperties = properties.filter((p) => favorites.includes(p.id))
  const recentProperties = recentlyViewed
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean) as typeof properties

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-playfair">My Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your saved properties and messages</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Saved Properties', value: savedProperties.length, icon: Heart, color: 'text-red-500 bg-red-50' },
            { label: 'Recently Viewed', value: recentProperties.length, icon: Clock, color: 'text-blue-500 bg-blue-50' },
            { label: 'Active Messages', value: dummyConversations.filter((c) => c.unread > 0).length, icon: MessageSquare, color: 'text-teal-500 bg-teal-50' },
            { label: 'Scheduled Tours', value: 2, icon: Search, color: 'text-amber-500 bg-amber-50' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-gray-100 mb-6 overflow-x-auto">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0
                ${activeTab === id ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Saved Properties */}
          {activeTab === 'saved' && (
            savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
            ) : (
              <EmptyState
                icon={<Heart className="w-8 h-8 text-gray-400" />}
                title="No saved properties yet"
                description="Start browsing and save properties you love by clicking the heart icon."
                action={
                  <Link href="/properties" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
                    Browse Properties
                  </Link>
                }
              />
            )
          )}

          {/* Recently Viewed */}
          {activeTab === 'recent' && (
            recentProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProperties.slice(0, 9).map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
            ) : (
              <EmptyState
                icon={<Clock className="w-8 h-8 text-gray-400" />}
                title="No recently viewed properties"
                description="Properties you visit will appear here for easy access."
                action={
                  <Link href="/properties" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors">
                    Browse Properties
                  </Link>
                }
              />
            )
          )}

          {/* Messages */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ height: '60vh' }}>
              <div className="flex h-full">
                {/* Conversations list */}
                <div className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">Messages</p>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {dummyConversations.map((conv) => {
                      const agent = agents.find((a) => a.id === conv.agentId)
                      const property = properties.find((p) => p.id === conv.propertyId)
                      return (
                        <button
                          key={conv.id}
                          onClick={() => setActiveConv(conv)}
                          className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50
                            ${activeConv.id === conv.id ? 'bg-blue-50 border-l-2 border-l-blue-600' : ''}`}
                        >
                          {agent && (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image src={agent.photo} alt={agent.name} fill className="object-cover" />
                              {conv.unread > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                  {conv.unread}
                                </span>
                              )}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <p className="text-sm font-semibold text-gray-900 truncate">{agent?.name}</p>
                              <p className="text-xs text-gray-400 flex-shrink-0 ml-1">{timeAgo(conv.updatedAt)}</p>
                            </div>
                            <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                            {property && (
                              <p className="text-xs text-blue-500 truncate mt-0.5">{property.address.city}, {property.address.state}</p>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Chat window */}
                <div className="flex-1 flex flex-col">
                  {/* Chat header */}
                  <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                    {agents.find((a) => a.id === activeConv.agentId) && (
                      <>
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={agents.find((a) => a.id === activeConv.agentId)!.photo}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {agents.find((a) => a.id === activeConv.agentId)!.name}
                          </p>
                          <p className="text-xs text-green-500">Online</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {dummyMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm
                            ${msg.sender === 'user'
                              ? 'bg-blue-600 text-white rounded-br-sm'
                              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                            }`}
                        >
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
                        onKeyDown={(e) => { if (e.key === 'Enter') setNewMessage('') }}
                      />
                      <button
                        onClick={() => setNewMessage('')}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-2xl">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  JD
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                  <p className="text-gray-500 text-sm">john.doe@email.com</p>
                  <span className="inline-flex mt-2 px-2.5 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200 font-medium">
                    Premium Member
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { label: 'Full Name', value: 'John Doe', type: 'text' },
                  { label: 'Email Address', value: 'john.doe@email.com', type: 'email' },
                  { label: 'Phone Number', value: '+1 (555) 000-0000', type: 'tel' },
                  { label: 'Location', value: 'New York, NY', type: 'text' },
                ].map(({ label, value, type }) => (
                  <div key={label}>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
                    <input
                      type={type}
                      defaultValue={value}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                ))}

                <div className="pt-4">
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
