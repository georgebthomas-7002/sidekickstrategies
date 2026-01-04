import {cn} from '@/lib/utils'

type DataAttribute = {
  key?: string | null
  value?: string | null
}

type SectionSettings = {
  containerWidth?: 'full' | 'wide' | 'default' | 'narrow' | null
  contentAlignment?: 'left' | 'center' | 'right' | null
  backgroundColor?:
    | 'transparent'
    | 'white'
    | 'gray-50'
    | 'gray-100'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'custom'
    | null
  customBackgroundColor?: {hex?: string | null} | null
  backgroundImage?: {asset?: {url?: string | null} | null} | null
  backgroundOverlay?: 'none' | 'light' | 'medium' | 'dark' | null
  paddingTop?: '0' | 'sm' | 'md' | 'lg' | 'xl' | null
  paddingBottom?: '0' | 'sm' | 'md' | 'lg' | 'xl' | null
  sectionId?: string | null
  customClasses?: string | null
  dataAttributes?: DataAttribute[] | null
}

type StylePreset = {
  name?: string | null
  settings?: SectionSettings | null
}

type SectionWrapperProps = {
  settings?: SectionSettings | null
  preset?: StylePreset | null
  children: React.ReactNode
  blockType: string
  blockKey: string
}

// Container width classes
const containerClasses: Record<string, string> = {
  full: 'max-w-none px-0',
  wide: 'max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8',
  default: 'max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8',
}

// Padding classes
const paddingTopClasses: Record<string, string> = {
  '0': 'pt-0',
  sm: 'pt-6 md:pt-8',
  md: 'pt-12 md:pt-16',
  lg: 'pt-16 md:pt-24',
  xl: 'pt-24 md:pt-32',
}

const paddingBottomClasses: Record<string, string> = {
  '0': 'pb-0',
  sm: 'pb-6 md:pb-8',
  md: 'pb-12 md:pb-16',
  lg: 'pb-16 md:pb-24',
  xl: 'pb-24 md:pb-32',
}

// Background color classes (using Tailwind 4 theme variables)
const bgClasses: Record<string, string> = {
  transparent: '',
  white: 'bg-white',
  'gray-50': 'bg-gray-50',
  'gray-100': 'bg-gray-100',
  primary: 'bg-brand-primary text-white',
  secondary: 'bg-brand-secondary text-white',
  accent: 'bg-brand-accent text-white',
}

// Content alignment classes
const alignmentClasses: Record<string, string> = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right ml-auto',
}

// Background overlay classes
const overlayClasses: Record<string, string> = {
  none: '',
  light: 'bg-black/20',
  medium: 'bg-black/50',
  dark: 'bg-black/80',
}

/**
 * Builds data attributes from the array of key-value pairs
 */
function buildDataAttributes(
  dataAttributes?: DataAttribute[] | null
): Record<string, string> {
  if (!dataAttributes || dataAttributes.length === 0) return {}

  return dataAttributes.reduce<Record<string, string>>((acc, attr) => {
    if (attr.key && attr.value) {
      acc[`data-${attr.key}`] = attr.value
    }
    return acc
  }, {})
}

/**
 * SectionWrapper component that wraps any page builder block with styling options.
 * Supports style presets that can be overridden by custom settings.
 */
export function SectionWrapper({
  settings,
  preset,
  children,
  blockType,
  blockKey,
}: SectionWrapperProps) {
  // Merge preset settings with override settings (custom settings take precedence)
  const presetSettings = preset?.settings || {}
  const mergedSettings: SectionSettings = {
    ...presetSettings,
    ...Object.fromEntries(
      Object.entries(settings || {}).filter(([, value]) => value != null)
    ),
  }

  // Get values with defaults
  const containerWidth = mergedSettings.containerWidth || 'default'
  const paddingTop = mergedSettings.paddingTop || 'md'
  const paddingBottom = mergedSettings.paddingBottom || 'md'
  const backgroundColor = mergedSettings.backgroundColor || 'transparent'
  const contentAlignment = mergedSettings.contentAlignment || 'left'
  const sectionId = mergedSettings.sectionId
  const customClasses = mergedSettings.customClasses
  const dataAttributes = mergedSettings.dataAttributes
  const backgroundImage = mergedSettings.backgroundImage
  const backgroundOverlay = mergedSettings.backgroundOverlay || 'none'
  const customBackgroundColor = mergedSettings.customBackgroundColor

  // Build custom style object for inline styles
  const customStyle: React.CSSProperties = {}

  // Custom background color
  if (backgroundColor === 'custom' && customBackgroundColor?.hex) {
    customStyle.backgroundColor = customBackgroundColor.hex
  }

  // Background image
  if (backgroundImage?.asset?.url) {
    customStyle.backgroundImage = `url(${backgroundImage.asset.url})`
    customStyle.backgroundSize = 'cover'
    customStyle.backgroundPosition = 'center'
  }

  // Build data attributes
  const dataAttrs = buildDataAttributes(dataAttributes)

  const hasBackgroundImage = Boolean(backgroundImage?.asset?.url)

  return (
    <section
      id={sectionId || undefined}
      data-block-type={blockType}
      data-block-key={blockKey}
      className={cn(
        'relative',
        paddingTopClasses[paddingTop],
        paddingBottomClasses[paddingBottom],
        backgroundColor !== 'custom' && bgClasses[backgroundColor],
        customClasses
      )}
      style={customStyle}
      {...dataAttrs}
    >
      {/* Background overlay for images */}
      {hasBackgroundImage && backgroundOverlay !== 'none' && (
        <div
          className={cn(
            'absolute inset-0 z-0',
            overlayClasses[backgroundOverlay]
          )}
          aria-hidden="true"
        />
      )}

      {/* Content container */}
      <div
        className={cn(
          'relative z-10',
          containerClasses[containerWidth],
          alignmentClasses[contentAlignment]
        )}
      >
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper
