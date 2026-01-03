'use client'

import {useState} from 'react'

type DownloadFormProps = {
  isGated: boolean
  fileUrl: string
  fileType?: string
  formHeading?: string
  formDescription?: string
}

export default function DownloadForm({
  isGated,
  fileUrl,
  fileType,
  formHeading,
  formDescription,
}: DownloadFormProps) {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission - replace with actual form handler (e.g., HubSpot, ConvertKit)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormSubmitted(true)
  }

  const showDownloadLink = !isGated || formSubmitted

  return (
    <div className="bg-gray-50 rounded-xl p-8">
      {showDownloadLink ? (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            {isGated ? 'Your download is ready!' : 'Download Now'}
          </h2>
          <p className="text-gray-600 mb-6">
            Click the button below to download your resource.
          </p>
          <a
            href={fileUrl}
            download
            className="inline-flex items-center gap-2 bg-accent-500 text-white rounded-full px-8 py-4 font-medium hover:bg-accent-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download {fileType?.toUpperCase() || 'File'}
          </a>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">
            {formHeading || 'Get Your Free Download'}
          </h2>
          {formDescription && (
            <p className="text-gray-600 mb-6">{formDescription}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent-500 text-white rounded-lg px-6 py-3 font-medium hover:bg-accent-600 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? 'Processing...' : 'Get Download'}
            </button>
            <p className="text-xs text-gray-500 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </>
      )}
    </div>
  )
}
