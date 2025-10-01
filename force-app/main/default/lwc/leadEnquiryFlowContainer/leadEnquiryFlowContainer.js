import { LightningElement, api } from 'lwc';

export default class LeadEnquiryFlowContainer extends LightningElement {
    @api flowApiName = 'Lead_Enquiry_Form';
    @api flowInputVariables = [];
    
    // Properties that can be set from the external app
    @api title = 'Lead Enquiry Form';
    @api subtitle = 'Please fill out the form below';
    @api showHeader = false;
    
    // Status tracking
    flowStarted = false;
    flowStatus = 'NOT_STARTED';
    
    // Flow interview
    flowInterview;
    
    // Handle flow status change
    handleStatusChange(event) {
        this.flowStatus = event.detail.status;
        
        // Dispatch custom event to notify parent container (including external app)
        this.dispatchEvent(new CustomEvent('flowstatuschange', {
            detail: {
                status: this.flowStatus,
                flowApiName: this.flowApiName
            },
            bubbles: true,
            composed: true
        }));
        
        // Handle flow completion
        if (this.flowStatus === 'FINISHED') {
            this.handleFlowComplete(event);
        }
    }
    
    // Handle flow completion
    handleFlowComplete(event) {
        const outputVariables = event.detail.outputVariables;
        
        // Dispatch custom event with flow output variables
        this.dispatchEvent(new CustomEvent('flowcomplete', {
            detail: {
                outputVariables: outputVariables,
                flowApiName: this.flowApiName
            },
            bubbles: true,
            composed: true
        }));
    }
    
    // Method that can be called from parent to start the flow
    @api
    startFlow() {
        this.flowStarted = true;
    }
    
    // Method that can be called from parent to restart the flow
    @api
    restartFlow() {
        this.flowStarted = false;
        setTimeout(() => {
            this.flowStarted = true;
        }, 100);
    }
    
    // Method to get the current flow status
    @api
    getFlowStatus() {
        return this.flowStatus;
    }
}

// Made with Bob
