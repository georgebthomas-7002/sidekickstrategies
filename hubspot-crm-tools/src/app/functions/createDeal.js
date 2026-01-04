const hubspot = require('@hubspot/api-client');

exports.main = async (context) => {
  const { body } = context;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is required' })
    };
  }

  const { dealname, amount, pipeline, dealstage, closedate, associatedContactIds, associatedCompanyIds } = body;

  if (!dealname) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'dealname is required' })
    };
  }

  const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

  try {
    // Create the deal
    const dealProperties = {
      dealname,
      ...(amount && { amount: String(amount) }),
      ...(pipeline && { pipeline }),
      ...(dealstage && { dealstage }),
      ...(closedate && { closedate })
    };

    const dealResponse = await hubspotClient.crm.deals.basicApi.create({
      properties: dealProperties
    });

    const dealId = dealResponse.id;

    // Associate with contacts if provided
    if (associatedContactIds && associatedContactIds.length > 0) {
      for (const contactId of associatedContactIds) {
        await hubspotClient.crm.deals.associationsApi.create(
          dealId,
          'contacts',
          contactId,
          [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }]
        );
      }
    }

    // Associate with companies if provided
    if (associatedCompanyIds && associatedCompanyIds.length > 0) {
      for (const companyId of associatedCompanyIds) {
        await hubspotClient.crm.deals.associationsApi.create(
          dealId,
          'companies',
          companyId,
          [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 5 }]
        );
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        deal: dealResponse,
        message: `Deal "${dealname}" created successfully`
      })
    };

  } catch (error) {
    console.error('Error creating deal:', error);
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({
        error: error.message,
        details: error.body || null
      })
    };
  }
};
