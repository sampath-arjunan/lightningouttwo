/**
 * Lightning Out 2.0 Integration Test Script
 * 
 * This script helps verify that your Lightning Out 2.0 integration is working correctly.
 * It checks for common configuration issues and provides guidance on fixing them.
 */

// Configuration validation
function validateConfig() {
    console.log('🔍 Validating Lightning Out 2.0 configuration...');
    
    // Check if configuration variables are properly set
    const sfInstanceUrl = document.querySelector('script').textContent.match(/const sfInstanceUrl = ['"]([^'"]+)['"]/)?.[1];
    const clientId = document.querySelector('script').textContent.match(/const clientId = ['"]([^'"]+)['"]/)?.[1];
    const lightningOutAppName = document.querySelector('script').textContent.match(/const lightningOutAppName = ['"]([^'"]+)['"]/)?.[1];
    const flowApiName = document.querySelector('script').textContent.match(/const flowApiName = ['"]([^'"]+)['"]/)?.[1];
    
    let configValid = true;
    
    if (!sfInstanceUrl || sfInstanceUrl === 'https://your-instance.lightning.force.com') {
        console.error('❌ Salesforce instance URL is not configured correctly');
        configValid = false;
    } else {
        console.log('✅ Salesforce instance URL is configured');
    }
    
    if (!clientId || clientId === 'YOUR_CONNECTED_APP_CLIENT_ID') {
        console.error('❌ Client ID is not configured correctly');
        configValid = false;
    } else {
        console.log('✅ Client ID is configured');
    }
    
    if (!lightningOutAppName || lightningOutAppName === 'YOUR_LIGHTNING_OUT_APP_NAME') {
        console.error('❌ Lightning Out 2.0 App Name is not configured correctly');
        configValid = false;
    } else {
        console.log('✅ Lightning Out 2.0 App Name is configured');
    }
    
    if (!flowApiName || flowApiName === 'YOUR_FLOW_API_NAME') {
        console.error('❌ Flow API Name is not configured correctly');
        configValid = false;
    } else {
        console.log('✅ Flow API Name is configured');
    }
    
    return configValid;
}

// Check for required DOM elements
function validateDOM() {
    console.log('🔍 Validating DOM elements...');
    
    let domValid = true;
    
    if (!document.getElementById('flowContainer')) {
        console.error('❌ Flow container element not found');
        domValid = false;
    } else {
        console.log('✅ Flow container element found');
    }
    
    if (!document.getElementById('loginButton')) {
        console.error('❌ Login button not found');
        domValid = false;
    } else {
        console.log('✅ Login button found');
    }
    
    return domValid;
}

// Check for OAuth callback page
function validateOAuthCallback() {
    console.log('🔍 Validating OAuth callback...');
    
    const redirectUri = document.querySelector('script').textContent.match(/const redirectUri = ['"]([^'"]+)['"]/)?.[1];
    
    if (!redirectUri) {
        console.error('❌ Redirect URI not found in configuration');
        return false;
    }
    
    // Extract the path from the redirect URI
    const redirectPath = new URL(redirectUri).pathname;
    
    // Create a test request to check if the callback page exists
    fetch(redirectPath, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ OAuth callback page exists');
            } else {
                console.error('❌ OAuth callback page not found');
            }
        })
        .catch(error => {
            console.error('❌ Error checking OAuth callback page:', error);
        });
    
    return true;
}

// Test Lightning Out script loading
function testLightningOutScript() {
    console.log('🔍 Testing Lightning Out script loading...');
    
    const sfInstanceUrl = document.querySelector('script').textContent.match(/const sfInstanceUrl = ['"]([^'"]+)['"]/)?.[1];
    
    if (!sfInstanceUrl || sfInstanceUrl === 'https://your-instance.lightning.force.com') {
        console.error('❌ Cannot test Lightning Out script: Salesforce instance URL not configured');
        return false;
    }
    
    const scriptUrl = `${sfInstanceUrl}/lightning/lightning.out.js`;
    
    // Create a test request to check if the script is accessible
    fetch(scriptUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ Lightning Out script is accessible');
            } else {
                console.error('❌ Lightning Out script is not accessible');
            }
        })
        .catch(error => {
            console.error('❌ Error checking Lightning Out script:', error);
        });
    
    return true;
}

// Run all tests
function runTests() {
    console.log('🧪 Running Lightning Out 2.0 integration tests...');
    
    const configValid = validateConfig();
    const domValid = validateDOM();
    const callbackValid = validateOAuthCallback();
    const scriptValid = testLightningOutScript();
    
    if (configValid && domValid && callbackValid && scriptValid) {
        console.log('✅ Basic configuration looks good. Try connecting to Salesforce to test the full integration.');
    } else {
        console.log('❌ Some tests failed. Please fix the issues before testing the integration.');
    }
}

// Add a test button to the page
function addTestButton() {
    const button = document.createElement('button');
    button.textContent = 'Test Integration';
    button.className = 'button';
    button.style.backgroundColor = '#4CAF50';
    button.style.marginLeft = '10px';
    button.onclick = runTests;
    
    const authStatus = document.getElementById('authStatus');
    if (authStatus) {
        authStatus.appendChild(button);
    }
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addTestButton();
});

// Made with Bob
