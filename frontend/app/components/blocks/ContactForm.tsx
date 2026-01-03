'use client'

import {useState} from 'react'
import {stegaClean} from '@sanity/client/stega'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type ContactFormProps = {
  block: ExtractPageBuilderType<'contactForm'>
  index: number
  pageType: string
  pageId: string
}

export default function ContactForm({block}: ContactFormProps) {
  const {
    heading,
    subheading,
    formType = 'contact',
    submitButtonText = 'Send Message',
    successMessage = "Thanks for reaching out! We'll get back to you soon.",
    showContactInfo,
    contactEmail,
    contactPhone,
    contactAddress,
    theme = 'light',
  } = block

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cleanTheme = stegaClean(theme)
  const cleanFormType = stegaClean(formType)
  const isDark = cleanTheme === 'dark'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission - replace with actual form handler
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const renderForm = () => {
    if (cleanFormType === 'newsletter') {
      return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-black text-white rounded-lg font-mono text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label htmlFor="lastName" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {cleanFormType === 'consultation' && (
          <div>
            <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        )}
        <div>
          <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-black text-white rounded-lg font-mono text-sm hover:bg-gray-800 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Sending...' : submitButtonText}
        </button>
      </form>
    )
  }

  return (
    <section className={`py-16 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="container">
        <div className={`grid gap-12 ${showContactInfo ? 'lg:grid-cols-2' : ''}`}>
          <div>
            <div className={`${showContactInfo ? '' : 'text-center'} mb-8`}>
              {heading && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
              )}
              {subheading && (
                <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {subheading}
                </p>
              )}
            </div>

            {isSubmitted ? (
              <div className={`text-center p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border border-green-200`}>
                <svg
                  className="w-16 h-16 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-lg">{successMessage}</p>
              </div>
            ) : (
              renderForm()
            )}
          </div>

          {showContactInfo && (
            <div className={`p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactEmail && (
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email</div>
                      <a href={`mailto:${contactEmail}`} className="hover:underline">{contactEmail}</a>
                    </div>
                  </div>
                )}
                {contactPhone && (
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Phone</div>
                      <a href={`tel:${contactPhone}`} className="hover:underline">{contactPhone}</a>
                    </div>
                  </div>
                )}
                {contactAddress && (
                  <div className="flex items-start gap-4">
                    <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Address</div>
                      <div className="whitespace-pre-line">{contactAddress}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
