import {stegaClean} from '@sanity/client/stega'
import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type TestimonialProps = {
  block: ExtractPageBuilderType<'testimonial'>
  index: number
  pageType: string
  pageId: string
}

// Brand colors (inline for Tailwind v4 purge safety)
const COLORS = {
  navy800: '#142d63',
  navy900: '#0f2250',
  teal500: '#028393',
  orange500: '#f65625',
  peach: '#faaa68',
}

export default function Testimonial({block}: TestimonialProps) {
  const {
    quote,
    authorName,
    authorTitle,
    authorImage,
    companyLogo,
    rating,
    theme = 'light',
  } = block

  const cleanTheme = stegaClean(theme)
  const isDark = cleanTheme === 'dark' || cleanTheme === 'accent'

  return (
    <section
      className="py-16 lg:py-24"
      style={{
        backgroundColor: isDark ? COLORS.navy800 : '#ffffff',
      }}
    >
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {rating && (
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6"
                  style={{color: i < rating ? COLORS.peach : (isDark ? 'rgba(255,255,255,0.2)' : '#e5e7eb')}}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}

          {/* Quote icon */}
          <svg
            className="w-12 h-12 mx-auto mb-8"
            style={{color: isDark ? 'rgba(255,255,255,0.2)' : COLORS.teal500, opacity: isDark ? 1 : 0.3}}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {quote && (
            <blockquote
              className="font-serif text-xl md:text-2xl lg:text-3xl italic leading-relaxed mb-8"
              style={{color: isDark ? '#ffffff' : COLORS.navy800}}
            >
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          <div className="flex items-center justify-center gap-4">
            {authorImage?.asset?._ref && (
              <Image
                id={authorImage.asset._ref}
                alt={authorName || 'Author'}
                width={64}
                height={64}
                mode="cover"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-offset-2"
                style={{ringColor: COLORS.teal500}}
              />
            )}
            <div className="text-left">
              {authorName && (
                <div
                  className="font-heading font-semibold"
                  style={{color: isDark ? '#ffffff' : COLORS.navy800}}
                >
                  {authorName}
                </div>
              )}
              {authorTitle && (
                <div
                  className="text-sm font-sans"
                  style={{color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(20, 45, 99, 0.6)'}}
                >
                  {authorTitle}
                </div>
              )}
            </div>
            {companyLogo?.asset?._ref && (
              <div
                className="ml-4 pl-4 border-l"
                style={{borderColor: isDark ? 'rgba(255,255,255,0.2)' : '#e5e7eb'}}
              >
                <Image
                  id={companyLogo.asset._ref}
                  alt="Company logo"
                  width={120}
                  height={40}
                  mode="contain"
                  className="h-8 w-auto object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
