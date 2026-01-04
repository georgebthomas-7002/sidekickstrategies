const http = require('http');
const https = require('https');
const url = require('url');

// Your app's Client ID and Client Secret (get from HubSpot app settings)
const CLIENT_ID = '87ec5e6f-9ad1-40fe-8f39-9fcb387e0f5c';
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET || 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:3000/oauth-callback';

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/oauth-callback') {
    const code = parsedUrl.query.code;

    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h1>Error: No authorization code received</h1>');
      return;
    }

    console.log('\n📥 Received authorization code:', code.substring(0, 20) + '...');

    // Exchange code for access token
    const tokenData = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code: code
    });

    const tokenReq = https.request({
      hostname: 'api.hubapi.com',
      path: '/oauth/v1/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': tokenData.toString().length
      }
    }, (tokenRes) => {
      let data = '';
      tokenRes.on('data', chunk => data += chunk);
      tokenRes.on('end', () => {
        try {
          const tokens = JSON.parse(data);

          if (tokens.access_token) {
            console.log('\n✅ SUCCESS! Access token received:\n');
            console.log('═'.repeat(60));
            console.log('ACCESS TOKEN:');
            console.log(tokens.access_token);
            console.log('═'.repeat(60));
            console.log('\nREFRESH TOKEN:');
            console.log(tokens.refresh_token);
            console.log('═'.repeat(60));
            console.log('\nExpires in:', tokens.expires_in, 'seconds');

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
              <html>
              <head><title>HubSpot MCP Auth - Success!</title></head>
              <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
                <h1 style="color: #00a4bd;">✅ Authorization Successful!</h1>
                <p>Your access token has been printed in the terminal.</p>
                <h2>Next Steps:</h2>
                <ol>
                  <li>Copy the <strong>ACCESS TOKEN</strong> from the terminal</li>
                  <li>Use it to connect to the HubSpot MCP server at <code>https://mcp.hubspot.com/</code></li>
                </ol>
                <h3>Token Details:</h3>
                <pre style="background: #f5f5f5; padding: 15px; overflow-x: auto;">
Access Token: ${tokens.access_token.substring(0, 50)}...
Expires In: ${tokens.expires_in} seconds
                </pre>
                <p><em>You can close this window and stop the server (Ctrl+C in terminal).</em></p>
              </body>
              </html>
            `);
          } else {
            console.error('\n❌ Error getting token:', data);
            res.writeHead(400, { 'Content-Type': 'text/html' });
            res.end(`<h1>Error getting token</h1><pre>${data}</pre>`);
          }
        } catch (e) {
          console.error('Parse error:', e, data);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end(`<h1>Error parsing response</h1><pre>${data}</pre>`);
        }
      });
    });

    tokenReq.on('error', (e) => {
      console.error('Request error:', e);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h1>Request error</h1><pre>${e.message}</pre>`);
    });

    tokenReq.write(tokenData.toString());
    tokenReq.end();

  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
      <head><title>HubSpot MCP OAuth Server</title></head>
      <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px;">
        <h1>HubSpot MCP OAuth Server</h1>
        <p>This server is waiting for the OAuth callback.</p>
        <p><a href="https://app.hubspot.com/oauth/authorize/user?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=oauth%20crm.objects.contacts.read%20crm.objects.companies.read%20crm.objects.deals.read">Click here to start the OAuth flow</a></p>
      </body>
      </html>
    `);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         HubSpot MCP OAuth Server Running                   ║
╠════════════════════════════════════════════════════════════╣
║  Server: http://localhost:${PORT}                            ║
║                                                            ║
║  IMPORTANT: You need your app's Client Secret!             ║
║                                                            ║
║  1. Go to your app settings in HubSpot                     ║
║  2. Find the Client Secret under Auth settings             ║
║  3. Stop this server (Ctrl+C)                              ║
║  4. Run again with:                                        ║
║     HUBSPOT_CLIENT_SECRET=xxx node oauth-server.js         ║
║                                                            ║
║  Then visit the install URL to authorize.                  ║
╚════════════════════════════════════════════════════════════╝
`);
});
