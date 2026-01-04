const hubspot = require('@hubspot/api-client');

exports.main = async (context) => {
  const { body } = context;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is required' })
    };
  }

  const { objectType, objectId, properties } = body;

  if (!objectType) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'objectType is required (contacts, companies, deals, tasks)' })
    };
  }

  if (!objectId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'objectId is required' })
    };
  }

  if (!properties || Object.keys(properties).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'properties object is required with at least one property' })
    };
  }

  const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

  try {
    let response;

    // Use the appropriate API based on object type
    switch (objectType.toLowerCase()) {
      case 'contacts':
      case 'contact':
        response = await hubspotClient.crm.contacts.basicApi.update(objectId, { properties });
        break;
      case 'companies':
      case 'company':
        response = await hubspotClient.crm.companies.basicApi.update(objectId, { properties });
        break;
      case 'deals':
      case 'deal':
        response = await hubspotClient.crm.deals.basicApi.update(objectId, { properties });
        break;
      case 'tasks':
      case 'task':
        response = await hubspotClient.crm.objects.basicApi.update('tasks', objectId, { properties });
        break;
      case 'tickets':
      case 'ticket':
        response = await hubspotClient.crm.tickets.basicApi.update(objectId, { properties });
        break;
      default:
        // Try generic objects API for custom objects
        response = await hubspotClient.crm.objects.basicApi.update(objectType, objectId, { properties });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        object: response,
        message: `${objectType} ${objectId} updated successfully`
      })
    };

  } catch (error) {
    console.error('Error updating CRM object:', error);
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({
        error: error.message,
        details: error.body || null
      })
    };
  }
};
