'use client'

import {useState} from 'react'
import {stegaClean} from '@sanity/client/stega'
import {type PortableTextBlock} from 'next-sanity'
import PortableText from '@/app/components/PortableText'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type FAQAccordionProps = {
  block: ExtractPageBuilderType<'faqAccordion'>
  index: number
  pageType: string
  pageId: string
}

export default function FAQAccordion({block}: FAQAccordionProps) {
  const {
    heading,
    subheading,
    items = [],
    layout = 'single',
    expandFirst = true,
    allowMultiple = false,
    theme = 'light',
  } = block

  const cleanTheme = stegaClean(theme)
  const cleanLayout = stegaClean(layout)
  const isDark = cleanTheme === 'dark'

  const [openItems, setOpenItems] = useState<string[]>(
    expandFirst && items.length > 0 ? [items[0]._key] : []
  )

  const toggleItem = (key: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      )
    } else {
      setOpenItems((prev) => (prev.includes(key) ? [] : [key]))
    }
  }

  const isTwoColumn = cleanLayout === 'two-column'

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <div className="container">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {subheading}
            </p>
          )}
        </div>

        <div
          className={`max-w-4xl mx-auto ${isTwoColumn ? 'grid md:grid-cols-2 gap-6' : 'space-y-4'}`}
        >
          {items.map((item: any) => (
            <FAQItem
              key={item._key}
              item={item}
              isOpen={openItems.includes(item._key)}
              onToggle={() => toggleItem(item._key)}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  item,
  isOpen,
  onToggle,
  isDark,
}: {
  item: any
  isOpen: boolean
  onToggle: () => void
  isDark: boolean
}) {
  return (
    <div
      className={`border rounded-lg overflow-hidden transition-colors ${
        isDark
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-200 bg-white'
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 flex items-center justify-between text-left transition-colors ${
          isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
        }`}
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`px-6 pb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
        >
          {item.answer && (
            <PortableText
              value={item.answer as PortableTextBlock[]}
              className={isDark ? 'prose-invert' : ''}
            />
          )}
        </div>
      </div>
    </div>
  )
}
