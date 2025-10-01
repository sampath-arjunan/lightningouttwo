# Lightning Out 2.0 Flow Integration

This project demonstrates how to embed a Salesforce Flow in an external website using Lightning Out 2.0. The implementation uses OAuth 2.0 for authentication and the Lightning Web Runtime (LWR) to display the flow.

## Prerequisites

Before you can use this integration, you need to:

1. Set up a Connected App in Salesforce
2. Create a Lightning Out 2.0 app in Salesforce Setup
3. Configure a Flow to be used with Lightning Out 2.0

## Setup Instructions

### 1. Create a Connected App in Salesforce

1. In Salesforce Setup, go to **App Manager** and click **New Connected App**
2. Fill in the basic information:
   - Connected App Name: `External Flow Integration`
   - API Name: `External_Flow_Integration`
   - Contact Email: Your email address
3. Enable OAuth Settings:
   - Check **Enable OAuth Settings**
   - Callback URL: `https://sampath-arjunan.github.io/oauth-callback.html`
   - Selected OAuth Scopes:
     - Access and manage your data (api)
     - Access custom permissions (custom_permissions)
     - Perform requests on your behalf at any time (refresh_token, offline_access)
4. Save the Connected App
5. After saving, note the **Consumer Key** (Client ID) and **Consumer Secret**

### 2. Create a Lightning Out 2.0 App

1. In Salesforce Setup, go to **Apps** > **Lightning Out 2.0 Apps**
2. Click **New Lightning Out 2.0 App**
3. Enter a name for your app (e.g., `ExternalFlowApp`)
4. Select the components you want to expose (including the Flow component)
5. Save the app
6. Note the Lightning Out 2.0 App Name

### 3. Configure Your Flow

1. Make sure your Flow is active and properly configured
2. Note the Flow API Name

### 4. Update Configuration in the HTML Files

1. Open `index.html` and update the following variables:
   ```javascript
   const sfInstanceUrl = 'https://your-instance.lightning.force.com';
   const clientId = 'YOUR_CONNECTED_APP_CLIENT_ID';
   const lightningOutAppName = 'YOUR_LIGHTNING_OUT_APP_NAME';
   const flowApiName = 'YOUR_FLOW_API_NAME';
   ```

2. For production use, you should implement a server-side component to handle the OAuth token exchange securely, rather than using the client-side approach shown in this demo.

## Deployment

1. Host these files on your GitHub Pages site at https://sampath-arjunan.github.io/
2. Make sure the files are in the root directory of your GitHub repository
3. The OAuth callback URL is already configured for your GitHub Pages domain
4. Access the index.html page to test the integration

## Security Considerations

- In a production environment, never include the client secret in client-side code
- Implement proper token storage and refresh mechanisms
- Use a server-side component to handle the OAuth flow securely
- Ensure your website uses HTTPS

## Communication Between Flow and External App

The implementation includes event handling for flow status changes. You can extend this to handle custom events from your flow:

```javascript
cmp.subscribe('flowstatuschange', function(event) {
    console.log('Flow status changed:', event.getParam('status'));
    if (event.getParam('status') === 'FINISHED') {
        console.log('Flow completed');
        // Handle flow completion
    }
});
```

## Troubleshooting

- Check browser console for errors
- Verify that your Connected App is properly configured
- Ensure your Lightning Out 2.0 App includes the necessary components
- Confirm that your Flow is active and properly configured
- Verify that the OAuth scopes are correctly set
