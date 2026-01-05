'use client'

import {useState, useEffect} from 'react'
import type {Deal} from '@/app/api/portal/deals/route'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return '-'
  }
}

export default function BillingContent() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDeals() {
      try {
        const res = await fetch('/api/portal/deals')
        if (!res.ok) {
          throw new Error('Failed to fetch deals')
        }
        const data = await res.json()
        setDeals(data.deals || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load billing data')
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  // Calculate totals
  const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0)
  const closedDeals = deals.filter(d =>
    d.stage === '978825826' || d.stage === 'closedwon'
  )
  const pendingDeals = deals.filter(d =>
    d.stage !== '978825826' && d.stage !== 'closedwon' && d.stage !== 'closedlost'
  )

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Summary cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
              <div className="h-8 bg-gray-200 rounded w-32" />
            </div>
          ))}
        </div>
        {/* Table skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Billing Data</h3>
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  if (deals.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Billing Records</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          You don&apos;t have any billing records yet. When you have deals or invoices, they&apos;ll appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Total Value</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Closed Deals</p>
          <p className="text-2xl font-bold text-green-600">{closedDeals.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{pendingDeals.length}</p>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Deals</h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left text-sm text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Deal Name</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created</th>
                <th className="px-6 py-3 font-medium">Close Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{deal.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {formatCurrency(deal.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${deal.stageColor.bg} ${deal.stageColor.text}`}>
                      {deal.stageLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {formatDate(deal.createDate)}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {formatDate(deal.closeDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-gray-100">
          {deals.map((deal) => (
            <div key={deal.id} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <span className="font-medium text-gray-900">{deal.name}</span>
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${deal.stageColor.bg} ${deal.stageColor.text}`}>
                  {deal.stageLabel}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium text-gray-900">{formatCurrency(deal.amount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-gray-600">Created</span>
                <span className="text-gray-500">{formatDate(deal.createDate)}</span>
              </div>
              {deal.closeDate && (
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600">Close Date</span>
                  <span className="text-gray-500">{formatDate(deal.closeDate)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
