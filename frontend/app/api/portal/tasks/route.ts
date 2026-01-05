import {NextRequest, NextResponse} from 'next/server'
import {getPortalSession} from '@/app/lib/portal/auth'

const CLICKUP_TOKEN = process.env.CLICKUP_API_TOKEN

// Priority mapping: portal priority -> ClickUp priority (1=urgent, 2=high, 3=normal, 4=low)
const priorityMap: Record<string, number> = {
  urgent: 1,
  high: 2,
  normal: 3,
  low: 4,
}

// Category to tag mapping
const categoryTags: Record<string, string> = {
  general: 'General',
  technical: 'Technical Support',
  training: 'Training',
  strategy: 'Strategy',
  billing: 'Billing',
}

/**
 * GET /api/portal/tasks - List tasks from client's ClickUp folder
 */
export async function GET() {
  try {
    const session = await getPortalSession()

    if (!session) {
      return NextResponse.json({error: 'Not authenticated'}, {status: 401})
    }

    if (!session.clickupListId) {
      return NextResponse.json({error: 'No ClickUp list configured for your company'}, {status: 400})
    }

    // Fetch tasks from ClickUp
    const res = await fetch(
      `https://api.clickup.com/api/v2/list/${session.clickupListId}/task?archived=false&include_closed=true`,
      {
        headers: {
          'Authorization': CLICKUP_TOKEN || '',
        },
      }
    )

    if (!res.ok) {
      console.error('ClickUp API error:', await res.text())
      return NextResponse.json({error: 'Failed to fetch tasks'}, {status: 500})
    }

    const data = await res.json()

    // Transform tasks for the portal
    const tasks = data.tasks.map((task: {
      id: string
      name: string
      description: string
      status: {status: string; color: string}
      priority: {priority: string} | null
      date_created: string
      date_updated: string
      due_date: string | null
      url: string
    }) => ({
      id: task.id,
      name: task.name,
      description: task.description || '',
      status: task.status.status,
      statusColor: task.status.color,
      priority: task.priority?.priority || 'normal',
      createdAt: task.date_created,
      updatedAt: task.date_updated,
      dueDate: task.due_date,
      url: task.url,
    }))

    return NextResponse.json({tasks})
  } catch (error) {
    console.error('Get tasks error:', error)
    return NextResponse.json({error: 'Failed to fetch tasks'}, {status: 500})
  }
}

/**
 * POST /api/portal/tasks - Create a new task (Ask for Help)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getPortalSession()

    if (!session) {
      return NextResponse.json({error: 'Not authenticated'}, {status: 401})
    }

    if (!session.clickupListId) {
      return NextResponse.json({error: 'No ClickUp list configured for your company'}, {status: 400})
    }

    const body = await request.json()
    const {name, description, priority = 'normal', category = 'general'} = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({error: 'Task name is required'}, {status: 400})
    }

    if (!description || typeof description !== 'string') {
      return NextResponse.json({error: 'Description is required'}, {status: 400})
    }

    // Build the task description with metadata
    const fullDescription = `
**Request from:** ${session.firstName} ${session.lastName} (${session.email})
**Company:** ${session.companyName}
**Category:** ${categoryTags[category] || 'General'}

---

${description}

---
*Submitted via Client Portal*
`.trim()

    // Create task in ClickUp
    const res = await fetch(
      `https://api.clickup.com/api/v2/list/${session.clickupListId}/task`,
      {
        method: 'POST',
        headers: {
          'Authorization': CLICKUP_TOKEN || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `[Portal] ${name}`,
          description: fullDescription,
          priority: priorityMap[priority] || 3,
          tags: [categoryTags[category] || 'General', 'Portal Request'],
          markdown_description: true,
        }),
      }
    )

    if (!res.ok) {
      const errorText = await res.text()
      console.error('ClickUp API error:', errorText)
      return NextResponse.json({error: 'Failed to create task'}, {status: 500})
    }

    const task = await res.json()

    return NextResponse.json({
      success: true,
      task: {
        id: task.id,
        name: task.name,
        url: task.url,
      },
    })
  } catch (error) {
    console.error('Create task error:', error)
    return NextResponse.json({error: 'Failed to create task'}, {status: 500})
  }
}
