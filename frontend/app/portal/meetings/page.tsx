import {redirect} from 'next/navigation'
import Link from 'next/link'
import {getPortalSession} from '@/app/lib/portal/auth'

export default async function MeetingsPage() {
  const session = await getPortalSession()

  if (!session) {
    redirect('/portal/login')
  }

  // HubSpot meeting link - replace with actual link
  const meetingLink = 'https://meetings.hubspot.com/george2740'

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule a Meeting</h1>
        <p className="text-gray-600">
          Book time with the Sidekick Strategies team.
        </p>
      </div>

      {/* Meeting Scheduler */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Book a Call</h2>
          <p className="text-gray-600 text-sm">
            Select a time that works for you and we&apos;ll confirm the meeting.
          </p>
        </div>

        <div className="aspect-[4/3] md:aspect-[16/9]">
          <iframe
            src={meetingLink}
            className="w-full h-full"
            style={{minHeight: '600px'}}
            title="Schedule Meeting"
          />
        </div>
      </div>

      {/* Alternative Contact */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-2">Prefer to email?</h3>
        <p className="text-gray-600 text-sm mb-4">
          If you&apos;d prefer to schedule via email or have specific availability requirements,
          feel free to reach out directly.
        </p>
        <a
          href={`mailto:hello@sidekickstrategies.com?subject=Meeting Request - ${session.companyName}`}
          className="text-brand-primary hover:text-brand-secondary font-medium text-sm"
        >
          hello@sidekickstrategies.com
        </a>
      </div>
    </div>
  )
}
