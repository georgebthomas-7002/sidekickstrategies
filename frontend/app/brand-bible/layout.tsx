import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brand Bible',
  description: 'Sidekick Strategies brand system documentation. Colors, typography, buttons, and hero presets.',
}

export default function BrandBibleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
