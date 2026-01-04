const hubspot = require('@hubspot/api-client');

exports.main = async (context) => {
  const { body } = context;

  if (!body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Request body is required' })
    };
  }

  const { name, domain, industry, phone, city, state, country, description, lifecyclestage } = body;

  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'name is required' })
    };
  }

  const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN });

  try {
    const companyProperties = {
      name,
      ...(domain && { domain }),
      ...(industry && { industry }),
      ...(phone && { phone }),
      ...(city && { city }),
      ...(state && { state }),
      ...(country && { country }),
      ...(description && { description }),
      ...(lifecyclestage && { lifecyclestage })
    };

    const companyResponse = await hubspotClient.crm.companies.basicApi.create({
      properties: companyProperties
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        company: companyResponse,
        message: `Company "${name}" created successfully`
      })
    };

  } catch (error) {
    console.error('Error creating company:', error);
    return {
      statusCode: error.code || 500,
      body: JSON.stringify({
        error: error.message,
        details: error.body || null
      })
    };
  }
};
