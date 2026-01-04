'use client'

import {useEffect, useState} from 'react'
import {useSearchParams, useRouter} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided.')
      return
    }

    async function verify() {
      try {
        const res = await fetch(`/api/portal/auth/verify?token=${encodeURIComponent(token!)}`)
        const data = await res.json()

        if (res.ok) {
          setStatus('success')
          setMessage('Successfully verified! Redirecting...')
          // Redirect to dashboard after short delay
          setTimeout(() => {
            router.push('/portal/dashboard')
          }, 1500)
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed. Please try again.')
        }
      } catch {
        setStatus('error')
        setMessage('Network error. Please try again.')
      }
    }

    verify()
  }, [token, router])

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
      </div>

      {/* Verification Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        {status === 'verifying' && (
          <>
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-brand-primary animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying your link...</h2>
            <p className="text-gray-600">Please wait while we sign you in.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <Link
              href="/portal/login"
              className="
                inline-block py-3 px-6 rounded-lg font-medium text-white
                bg-brand-primary hover:bg-brand-primary/90
                transition-colors
              "
            >
              Try Again
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
