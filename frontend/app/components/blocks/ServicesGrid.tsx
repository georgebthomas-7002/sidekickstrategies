'use client'

import Link from 'next/link'
import {stegaClean} from 'next-sanity'

// Brand colors
const COLORS = {
  navy950: '#0a1628',
  navy800: '#142d63',
  teal500: '#028393',
  teal600: '#026d7a',
  orange500: '#f65625',
  orange600: '#d9441a',
}

type ServiceItem = {
  _key?: string
  category?: string
  title?: string
  description?: string
  icon?: string
  ctaText?: string
  ctaLink?: string
}

type ServicesGridProps = {
  block: {
    _key: string
    _type: 'servicesGrid'
    heading?: string
    subheading?: string
    services?: ServiceItem[]
    layout?: 'grid-4' | 'grid-3' | 'grid-2' | 'categorized'
    showCategories?: boolean
    cardStyle?: 'elevated' | 'bordered' | 'minimal'
  }
  index: number
  pageType: string
  pageId: string
}

export default function ServicesGrid({block}: ServicesGridProps) {
  const {
    heading,
    subheading,
    services,
    layout = 'grid-4',
    showCategories = true,
    cardStyle = 'bordered',
  } = block

  const cleanLayout = stegaClean(layout)
  const cleanCardStyle = stegaClean(cardStyle)
  const cleanShowCategories = stegaClean(showCategories)

  // Group services by category
  const groupedServices = services?.reduce(
    (acc, service) => {
      const category = stegaClean(service.category) || 'Other Services'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(service)
      return acc
    },
    {} as Record<string, ServiceItem[]>
  )

  const gridClasses = {
    'grid-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    'grid-3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    categorized: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  const cardClasses = {
    elevated: 'bg-white rounded-xl shadow-md hover:shadow-lg',
    bordered: 'bg-white rounded-xl border border-gray-200 hover:border-gray-300',
    minimal: 'bg-gray-50 rounded-xl hover:bg-gray-100',
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12 lg:mb-16">
            {heading && (
              <h2
                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-4"
                style={{color: COLORS.navy800}}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Render by category if showCategories is true */}
        {cleanShowCategories && groupedServices ? (
          <div className="space-y-16">
            {Object.entries(groupedServices).map(([category, categoryServices]) => (
              <div key={category}>
                <h3
                  className="font-heading text-xl md:text-2xl font-semibold mb-8 pb-4 border-b-2"
                  style={{
                    color: COLORS.navy800,
                    borderColor: COLORS.teal500,
                  }}
                >
                  {category}
                </h3>
                <div className={`grid gap-6 ${gridClasses[cleanLayout]}`}>
                  {categoryServices.map((service, idx) => (
                    <ServiceCard
                      key={service._key || idx}
                      service={service}
                      cardStyle={cleanCardStyle}
                      cardClasses={cardClasses}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Flat grid without categories */
          <div className={`grid gap-6 ${gridClasses[cleanLayout]}`}>
            {services?.map((service, idx) => (
              <ServiceCard
                key={service._key || idx}
                service={service}
                cardStyle={cleanCardStyle}
                cardClasses={cardClasses}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  cardStyle,
  cardClasses,
}: {
  service: ServiceItem
  cardStyle: string
  cardClasses: Record<string, string>
}) {
  const title = stegaClean(service.title) || 'Service'
  const description = stegaClean(service.description)
  const ctaText = stegaClean(service.ctaText)
  const ctaLink = stegaClean(service.ctaLink)

  return (
    <div
      className={`p-6 transition-all duration-200 flex flex-col ${cardClasses[cardStyle] || cardClasses.bordered}`}
    >
      {/* Title */}
      <h4
        className="font-heading text-lg font-semibold mb-3"
        style={{color: COLORS.navy800}}
      >
        {title}
      </h4>

      {/* Description */}
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
          {description}
        </p>
      )}

      {/* CTA Button */}
      {ctaText && ctaLink && (
        <Link
          href={ctaLink}
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wide transition-colors duration-200 mt-auto"
          style={{color: COLORS.orange500}}
          onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.orange600)}
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.orange500)}
        >
          {ctaText}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      )}
    </div>
  )
}
