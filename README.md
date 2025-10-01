# Lightning Out 2.0 Flow Integration

This project demonstrates how to embed a Salesforce Flow in an external website using Lightning Out 2.0. The implementation uses OAuth 2.0 for authentication and the Lightning Web Runtime (LWR) to display the flow through a custom Lightning Web Component.

## Prerequisites

Before you can use this integration, you need to:

1. Set up a Connected App in Salesforce
2. Create a Lightning Out 2.0 app in Salesforce Setup
3. Deploy the custom Lightning Web Component that embeds the "Lead_Enquiry_Form" flow

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

### 2. Deploy the Lightning Web Component

1. Deploy the `leadEnquiryFlowContainer` Lightning Web Component to your Salesforce org:
   ```bash
   sfdx force:source:deploy -p force-app/main/default/lwc/leadEnquiryFlowContainer
   ```

2. The component is designed to embed the "Lead_Enquiry_Form" flow and expose it through Lightning Out 2.0.

### 3. Create a Lightning Out 2.0 App

Since Lightning Out 2.0 is a new feature, we need to create the app through the Salesforce Setup UI:

1. In Salesforce Setup, go to **Apps** > **Lightning Out 2.0 Apps**
2. Click **New Lightning Out 2.0 App**
3. Enter the following details:
   - **Label**: `Lead Enquiry App`
   - **API Name**: `LeadEnquiryApp`
   - **Description**: `Lightning Out 2.0 app for Lead Enquiry Form`
4. In the Components section, click **Add Component**
5. Search for and select `leadEnquiryFlowContainer`
6. Click **Save**
7. After saving, you'll see a script snippet that includes the Lightning Out 2.0 App Name
8. Note the Lightning Out 2.0 App Name (should be `c:LeadEnquiryApp`)

### 4. Update Configuration in the HTML Files

1. The index.html file has been updated to use the Lightning Out 2.0 script and component tags according to the official Salesforce documentation:
   ```html
   <!-- Load the Lightning Out 2.0 script -->
   <script type="text/javascript" async src="https://ibm-1fc.my.salesforce.com/lightning/lightning.out.latest/index.iife.prod.js"></script>
   
   <!-- Lightning Out application with frontdoor URL for authentication -->
   <lightning-out-application
       components="c-lead-enquiry-flow-container"
       frontdoor-url="https://ibm-1fc.my.salesforce.com/secur/frontdoor.jsp?sid=YOUR_ACCESS_TOKEN">
   </lightning-out-application>
   
   <!-- The LWC component that embeds the flow -->
   <c-lead-enquiry-flow-container
       flow-api-name="Lead_Enquiry_Form"
       title="Lead Enquiry Form"
       subtitle="Please fill out the form below"
       show-header="true">
   </c-lead-enquiry-flow-container>
   ```

2. Update the following variables in the index.html file:
   ```javascript
   const sfInstanceUrl = 'https://ibm-1fc.my.salesforce.com';
   const clientId = 'YOUR_CONNECTED_APP_CLIENT_ID';
   ```

3. The implementation dynamically creates and configures the Lightning Out components after authentication, setting the frontdoor URL with the access token for secure authentication.

4. For production use, you should implement a server-side component to handle the OAuth token exchange securely, rather than using the client-side approach shown in this demo.

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

The implementation includes event handling for flow status changes and completion. The LWC component dispatches custom events that can be captured in the external app:

```javascript
// Listen for flow status change events
cmp.addEventListener('flowstatuschange', function(event) {
    console.log('Flow status changed:', event.detail.status);
    if (event.detail.status === 'FINISHED') {
        console.log('Flow completed');
        // Handle flow completion
    }
});

// Listen for flow complete event with output variables
cmp.addEventListener('flowcomplete', function(event) {
    console.log('Flow completed with output variables:', event.detail.outputVariables);
    // Handle flow output variables
});
```

## Customizing the LWC Component

The `leadEnquiryFlowContainer` component accepts several properties that can be set when creating the component:

```javascript
$Lightning.createComponent(
    'c:leadEnquiryFlowContainer',
    {
        flowApiName: 'Lead_Enquiry_Form',  // The API name of the flow to display
        title: 'Lead Enquiry Form',        // Title displayed in the header
        subtitle: 'Please fill out the form below', // Subtitle displayed in the header
        showHeader: true                   // Whether to show the header section
    },
    flowContainer,
    function(cmp) {
        // Component created successfully
        cmp.startFlow(); // Start the flow
    }
);
```

## Troubleshooting

- Check browser console for errors
- Verify that your Connected App is properly configured
- Ensure your Lightning Out 2.0 App includes the necessary components
- Confirm that your Flow is active and properly configured
- Verify that the OAuth scopes are correctly set
- Make sure the LWC component is properly deployed and accessible
