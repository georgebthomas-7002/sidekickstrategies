import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Bible - Sidekick Strategies',
  description: 'Complete brand system documentation for Sidekick Strategies including colors, typography, hero presets, buttons, and iconography.',
  openGraph: {
    title: 'Brand Bible - Sidekick Strategies',
    description: 'Complete brand system documentation for Sidekick Strategies including colors, typography, hero presets, buttons, and iconography.',
    images: [
      {
        url: '/images/og-brand-bible.png',
        width: 1200,
        height: 630,
        alt: 'Sidekick Strategies Brand Bible',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Bible - Sidekick Strategies',
    description: 'Complete brand system documentation for Sidekick Strategies.',
    images: ['/images/og-brand-bible.png'],
  },
}

export default function BrandBibleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
