/**
 * Edit Agreement Test Suite
 * Tests the complete flow of editing an existing agreement with new data.
 */

import {
    createAgreementWithRandomData,
    navigateToFirstAgreementPreview,
    editAgreementWithRandomData,
} from '../Pages/basic.cy';
import { sendValues } from '../utilities/allureReporting';

describe('Edit Agreement Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-EA01: Edit an existing agreement with new data', () => {
        sendValues(
            'Edit an existing agreement from preview page with different values',
            'TC-EA01: Edit Agreement Flow',
            'High'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        navigateToFirstAgreementPreview();
        
        editAgreementWithRandomData();
        
        cy.log('Agreement edit test completed successfully');
    });

    it('TC-EA02: Create and immediately edit agreement', () => {
        sendValues(
            'Create a new agreement and edit it immediately',
            'TC-EA02: Create and Edit Flow',
            'Medium'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        
        editAgreementWithRandomData();
        
        cy.log('Create and edit flow completed successfully');
    });

    it('TC-EA03: Multiple edits on same agreement', () => {
        sendValues(
            'Perform multiple consecutive edits on the same agreement',
            'TC-EA03: Multiple Edits Flow',
            'Medium'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        
        editAgreementWithRandomData();
        
        cy.wait(1500);
        
        editAgreementWithRandomData();
        
        cy.log('Multiple edits completed successfully');
    });
});
