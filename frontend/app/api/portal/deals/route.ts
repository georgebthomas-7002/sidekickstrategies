import {NextResponse} from 'next/server'
import {getPortalSession} from '@/app/lib/portal/auth'

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN

// Deal stage labels for display
const stageLabels: Record<string, string> = {
  '978825825': 'Pending',
  '1073811210': 'Sent',
  '978825826': 'Closed',
  'closedwon': 'Closed Won',
  'closedlost': 'Closed Lost',
}

// Status colors for UI
const stageColors: Record<string, {bg: string; text: string}> = {
  '978825825': {bg: 'bg-yellow-100', text: 'text-yellow-800'},
  '1073811210': {bg: 'bg-blue-100', text: 'text-blue-800'},
  '978825826': {bg: 'bg-green-100', text: 'text-green-800'},
  'closedwon': {bg: 'bg-green-100', text: 'text-green-800'},
  'closedlost': {bg: 'bg-red-100', text: 'text-red-800'},
}

export interface Deal {
  id: string
  name: string
  amount: number
  stage: string
  stageLabel: string
  stageColor: {bg: string; text: string}
  closeDate: string | null
  createDate: string
  pipeline: string
}

/**
 * GET /api/portal/deals - Get deals for the client's company
 */
export async function GET() {
  try {
    const session = await getPortalSession()

    if (!session) {
      return NextResponse.json({error: 'Not authenticated'}, {status: 401})
    }

    if (!HUBSPOT_TOKEN) {
      return NextResponse.json({error: 'HubSpot not configured'}, {status: 500})
    }

    // Search for deals associated with the company
    const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'associations.company',
                operator: 'EQ',
                value: session.companyId,
              },
            ],
          },
        ],
        properties: [
          'dealname',
          'amount',
          'dealstage',
          'closedate',
          'createdate',
          'pipeline',
          'hs_lastmodifieddate',
        ],
        sorts: [{propertyName: 'createdate', direction: 'DESCENDING'}],
        limit: 50,
      }),
    })

    if (!searchRes.ok) {
      // If search by association fails, try getting deals via company associations
      const assocRes = await fetch(
        `https://api.hubapi.com/crm/v4/objects/companies/${session.companyId}/associations/deals`,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          },
        }
      )

      if (!assocRes.ok) {
        console.error('Failed to fetch deal associations:', await assocRes.text())
        return NextResponse.json({deals: []})
      }

      const assocData = await assocRes.json()
      const dealIds = assocData.results?.map((r: {toObjectId: string}) => r.toObjectId) || []

      if (dealIds.length === 0) {
        return NextResponse.json({deals: []})
      }

      // Fetch each deal's details
      const dealPromises = dealIds.slice(0, 20).map(async (dealId: string) => {
        const res = await fetch(
          `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?properties=dealname,amount,dealstage,closedate,createdate,pipeline`,
          {
            headers: {
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
          }
        )
        if (res.ok) {
          return res.json()
        }
        return null
      })

      const dealResults = await Promise.all(dealPromises)
      const deals: Deal[] = dealResults
        .filter((d): d is NonNullable<typeof d> => d !== null)
        .map((deal) => ({
          id: deal.id,
          name: deal.properties.dealname || 'Unnamed Deal',
          amount: parseFloat(deal.properties.amount) || 0,
          stage: deal.properties.dealstage || '',
          stageLabel: stageLabels[deal.properties.dealstage] || deal.properties.dealstage || 'Unknown',
          stageColor: stageColors[deal.properties.dealstage] || {bg: 'bg-gray-100', text: 'text-gray-800'},
          closeDate: deal.properties.closedate || null,
          createDate: deal.properties.createdate,
          pipeline: deal.properties.pipeline || '',
        }))

      return NextResponse.json({deals})
    }

    const data = await searchRes.json()
    const deals: Deal[] = (data.results || []).map((deal: {
      id: string
      properties: {
        dealname?: string
        amount?: string
        dealstage?: string
        closedate?: string
        createdate?: string
        pipeline?: string
      }
    }) => ({
      id: deal.id,
      name: deal.properties.dealname || 'Unnamed Deal',
      amount: parseFloat(deal.properties.amount || '0') || 0,
      stage: deal.properties.dealstage || '',
      stageLabel: stageLabels[deal.properties.dealstage || ''] || deal.properties.dealstage || 'Unknown',
      stageColor: stageColors[deal.properties.dealstage || ''] || {bg: 'bg-gray-100', text: 'text-gray-800'},
      closeDate: deal.properties.closedate || null,
      createDate: deal.properties.createdate || '',
      pipeline: deal.properties.pipeline || '',
    }))

    return NextResponse.json({deals})
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json({error: 'Failed to fetch deals'}, {status: 500})
  }
}
