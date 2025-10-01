#!/bin/bash

echo "Deploying Lightning Web Component to Salesforce..."

# Deploy the LWC component
echo "Deploying leadEnquiryFlowContainer LWC..."
sf deploy metadata -d force-app/main/default/lwc/leadEnquiryFlowContainer

echo "Deployment completed!"
echo ""
echo "Next steps:"
echo "1. Create the Lightning Out 2.0 app through the Salesforce Setup UI:"
echo "   - Go to Setup > Apps > Lightning Out 2.0 Apps"
echo "   - Click 'New Lightning Out 2.0 App'"
echo "   - Enter 'Lead Enquiry App' as the label"
echo "   - Add the 'leadEnquiryFlowContainer' component"
echo "   - Save the app"
echo "2. Update the index.html file with your Salesforce instance URL and Connected App client ID"
echo "3. Host the HTML files on your GitHub Pages site"

# Made with Bob
