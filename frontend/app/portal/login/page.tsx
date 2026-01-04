'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PortalLoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch('/api/portal/auth/request-magic-link', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Check your email for the login link.')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/">
          <Image
            src="/images/sidekick-logo-2026.png"
            alt="Sidekick Strategies"
            width={240}
            height={60}
            className="h-12 w-auto mx-auto mb-4"
          />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
        <p className="text-gray-600 mt-2">Sign in to access your dashboard</p>
      </div>

      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">
              We sent a magic link to <strong>{email}</strong>. Click the link to sign in.
            </p>
            <button
              onClick={() => {
                setStatus('idle')
                setEmail('')
              }}
              className="mt-6 text-brand-primary hover:text-brand-secondary text-sm font-medium"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="
                  w-full px-4 py-3 rounded-lg border border-gray-300
                  focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent
                  placeholder:text-gray-400
                  disabled:bg-gray-100 disabled:cursor-not-allowed
                "
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="
                w-full py-3 px-4 rounded-lg font-medium text-white
                bg-brand-primary hover:bg-brand-primary/90
                focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors
              "
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending magic link...
                </span>
              ) : (
                'Continue with Email'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Help text */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Having trouble?{' '}
        <a href="mailto:hello@sidekickstrategies.com" className="text-brand-primary hover:text-brand-secondary">
          Contact support
        </a>
      </p>

      {/* Back to main site */}
      <p className="text-center text-sm text-gray-400 mt-4">
        <Link href="/" className="hover:text-gray-600">
          &larr; Back to sidekickstrategies.com
        </Link>
      </p>
    </div>
  )
}
