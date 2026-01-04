'use client'

import {useState, useEffect} from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed left-6 bottom-6 z-50 group transition-all duration-300"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          backgroundColor: '#142d63',
          boxShadow: '0 4px 14px rgba(20, 45, 99, 0.3)',
        }}
      >
        <svg
          className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </div>
    </button>
  )
}
