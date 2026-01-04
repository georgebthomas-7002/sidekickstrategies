'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'

type Priority = 'low' | 'normal' | 'high' | 'urgent'
type Category = 'general' | 'technical' | 'training' | 'strategy' | 'billing'

export default function HelpPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'normal' as Priority,
    category: 'general' as Category,
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/portal/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: formData.subject,
          description: formData.description,
          priority: formData.priority,
          category: formData.category,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        // Redirect to projects after 2 seconds
        setTimeout(() => {
          router.push('/portal/projects')
        }, 2000)
      } else {
        setError(data.error || 'Failed to submit request. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your help request has been received. Our team will get back to you shortly.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your projects...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask for Help</h1>
        <p className="text-gray-600">
          Submit a request and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              id="subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Brief summary of what you need help with"
              className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
                placeholder:text-gray-400
              "
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value as Category})}
              className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
                bg-white
              "
            >
              <option value="general">General Question</option>
              <option value="technical">Technical Support</option>
              <option value="training">Training Request</option>
              <option value="strategy">Strategy Consultation</option>
              <option value="billing">Billing Question</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="grid grid-cols-4 gap-3">
              {(['low', 'normal', 'high', 'urgent'] as Priority[]).map((priority) => (
                <label
                  key={priority}
                  className={`
                    flex items-center justify-center px-4 py-2 rounded-lg border cursor-pointer transition-colors
                    ${formData.priority === priority
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as Priority})}
                    className="sr-only"
                  />
                  <span className="capitalize text-sm font-medium">{priority}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              rows={6}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Please describe what you need help with in detail. The more information you provide, the faster we can assist you."
              className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
                placeholder:text-gray-400
                resize-none
              "
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full py-3 px-4 rounded-lg font-medium text-white
              bg-brand-primary hover:bg-brand-primary/90
              focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Request'
            )}
          </button>
        </form>
      </div>

      {/* Help Text */}
      <p className="text-center text-sm text-gray-500 mt-6">
        For urgent issues, you can also reach us at{' '}
        <a href="mailto:hello@sidekickstrategies.com" className="text-brand-primary hover:text-brand-secondary">
          hello@sidekickstrategies.com
        </a>
      </p>
    </div>
  )
}
