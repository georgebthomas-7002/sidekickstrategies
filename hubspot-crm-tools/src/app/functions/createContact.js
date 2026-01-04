const hubspot = require('@hubspot/api-client');

exports.main = async (context) => {
  const { body } = context;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is required' })
    };
  }

  const { email, firstname, lastname, phone, company, jobtitle, lifecyclestage, associatedCompanyIds } = body;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'email is required' })
    };
  }

  const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

  try {
    const contactProperties = {
      email,
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(phone && { phone }),
      ...(company && { company }),
      ...(jobtitle && { jobtitle }),
      ...(lifecyclestage && { lifecyclestage })
    };

    const contactResponse = await hubspotClient.crm.contacts.basicApi.create({
      properties: contactProperties
    });

    const contactId = contactResponse.id;

    // Associate with companies if provided
    if (associatedCompanyIds && associatedCompanyIds.length > 0) {
      for (const companyId of associatedCompanyIds) {
        await hubspotClient.crm.contacts.associationsApi.create(
          contactId,
          'companies',
          companyId,
          [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 1 }]
        );
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        contact: contactResponse,
        message: `Contact "${email}" created successfully`
      })
    };

  } catch (error) {
    console.error('Error creating contact:', error);
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({
        error: error.message,
        details: error.body || null
      })
    };
  }
};
