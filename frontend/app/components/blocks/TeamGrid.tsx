import Image from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import type {Person} from '@/sanity.types'

type TeamMemberItem = Person

type TeamGridProps = {
  block: ExtractPageBuilderType<'teamGrid'>
  index: number
  pageType: string
  pageId: string
}

export default function TeamGrid({block}: TeamGridProps) {
  const {
    heading,
    subheading,
    members,
    layout = 'grid-4',
  } = block

  const gridClasses = {
    'grid-4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    'grid-3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    'grid-2': 'grid-cols-1 md:grid-cols-2',
    list: 'grid-cols-1',
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
          )}
          {subheading && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        <div
          className={`grid gap-8 ${gridClasses[layout as keyof typeof gridClasses] || gridClasses['grid-4']}`}
        >
          {members?.map((member, idx) => (
            <TeamMemberCard key={idx} member={member as TeamMemberItem} layout={layout} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({member, layout}: {member: TeamMemberItem; layout: string | undefined}) {
  // Handle both expanded references and basic references
  const firstName = member.firstName || ''
  const lastName = member.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim() || 'Team Member'
  const picture = member.picture

  const isListLayout = layout === 'list'

  if (isListLayout) {
    return (
      <div className="flex items-center gap-6 p-6 bg-white rounded-lg border border-gray-200">
        {picture?.asset?._ref ? (
          <Image
            id={picture.asset._ref}
            alt={picture.alt || fullName}
            width={120}
            height={120}
            crop={picture.crop}
            mode="cover"
            className="w-24 h-24 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold">{fullName}</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center group">
      <div className="relative mb-4 overflow-hidden rounded-lg">
        {picture?.asset?._ref ? (
          <Image
            id={picture.asset._ref}
            alt={picture.alt || fullName}
            width={300}
            height={300}
            crop={picture.crop}
            mode="cover"
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold">{fullName}</h3>
    </div>
  )
}
