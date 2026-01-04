'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'

interface Task {
  id: string
  name: string
  description: string
  status: string
  statusColor: string
  priority: string
  createdAt: string
  updatedAt: string
  dueDate: string | null
  url: string
}

export default function ProjectsPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch('/api/portal/tasks')
        const data = await res.json()

        if (res.ok) {
          setTasks(data.tasks || [])
        } else {
          setError(data.error || 'Failed to load tasks')
        }
      } catch {
        setError('Network error. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const getStatusBadgeColor = (status: string, color: string) => {
    // Use ClickUp color if available, otherwise default
    if (color) {
      return {backgroundColor: color, color: '#fff'}
    }
    // Fallback based on status name
    const statusLower = status.toLowerCase()
    if (statusLower.includes('complete') || statusLower.includes('done')) {
      return {backgroundColor: '#4ade80', color: '#fff'}
    }
    if (statusLower.includes('progress') || statusLower.includes('doing')) {
      return {backgroundColor: '#3b82f6', color: '#fff'}
    }
    if (statusLower.includes('review')) {
      return {backgroundColor: '#f59e0b', color: '#fff'}
    }
    return {backgroundColor: '#9ca3af', color: '#fff'}
  }

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      urgent: 'bg-red-100 text-red-700',
      high: 'bg-orange-100 text-orange-700',
      normal: 'bg-gray-100 text-gray-700',
      low: 'bg-blue-100 text-blue-700',
    }
    return colors[priority] || colors.normal
  }

  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString))
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">
            Track the status of your requests and projects.
          </p>
        </div>
        <Link
          href="/portal/help"
          className="
            inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white
            bg-brand-primary hover:bg-brand-primary/90 transition-colors
          "
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Request
        </Link>
      </div>

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <svg className="w-8 h-8 animate-spin mx-auto text-brand-primary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500 mt-4">Loading your projects...</p>
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <p className="text-gray-700 font-medium mb-2">Failed to load projects</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-6">Submit your first help request to get started.</p>
          <Link
            href="/portal/help"
            className="
              inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white
              bg-brand-primary hover:bg-brand-primary/90 transition-colors
            "
          >
            Ask for Help
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{task.name}</div>
                      {task.description && (
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {task.description.slice(0, 100)}...
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                        style={getStatusBadgeColor(task.status, task.statusColor)}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(task.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={task.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-primary hover:text-brand-secondary text-sm font-medium"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
