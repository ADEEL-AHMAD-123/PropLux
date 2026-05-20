import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'PropLux — Premium Real Estate in the USA',
  description: 'Discover extraordinary properties across the United States. Buy, sell, or rent luxury homes, condos, and estates with PropLux — America\'s premier real estate platform.',
  keywords: 'luxury real estate, homes for sale, homes for rent, USA properties, PropLux',
  openGraph: {
    title: 'PropLux — Premium Real Estate',
    description: 'Discover extraordinary properties across the United States.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1F2937',
              color: '#F9FAFB',
              borderRadius: '10px',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
