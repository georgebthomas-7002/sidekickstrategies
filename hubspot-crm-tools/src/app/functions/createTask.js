const hubspot = require('@hubspot/api-client');

exports.main = async (context) => {
  const { body } = context;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is required' })
    };
  }

  const {
    subject,
    body: taskBody,
    status,
    priority,
    dueDate,
    ownerId,
    associatedContactIds,
    associatedCompanyIds,
    associatedDealIds
  } = body;

  if (!subject) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'subject is required' })
    };
  }

  const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

  try {
    // Build task properties
    const taskProperties = {
      hs_task_subject: subject,
      hs_task_body: taskBody || '',
      hs_task_status: status || 'NOT_STARTED',
      hs_task_priority: priority || 'MEDIUM'
    };

    // Add due date if provided (timestamp in milliseconds)
    if (dueDate) {
      taskProperties.hs_timestamp = new Date(dueDate).getTime();
    }

    // Add owner if provided
    if (ownerId) {
      taskProperties.hubspot_owner_id = ownerId;
    }

    // Build associations array
    const associations = [];

    if (associatedContactIds && associatedContactIds.length > 0) {
      for (const contactId of associatedContactIds) {
        associations.push({
          to: { id: contactId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 204 }]
        });
      }
    }

    if (associatedCompanyIds && associatedCompanyIds.length > 0) {
      for (const companyId of associatedCompanyIds) {
        associations.push({
          to: { id: companyId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 192 }]
        });
      }
    }

    if (associatedDealIds && associatedDealIds.length > 0) {
      for (const dealId of associatedDealIds) {
        associations.push({
          to: { id: dealId },
          types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 216 }]
        });
      }
    }

    // Create the task
    const taskInput = {
      properties: taskProperties,
      ...(associations.length > 0 && { associations })
    };

    const taskResponse = await hubspotClient.crm.objects.basicApi.create('tasks', taskInput);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        task: taskResponse,
        message: `Task "${subject}" created successfully`
      })
    };

  } catch (error) {
    console.error('Error creating task:', error);
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({
        error: error.message,
        details: error.body || null
      })
    };
  }
};
