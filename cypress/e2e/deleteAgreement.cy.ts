/**
 * Delete Agreement Test Suite
 * Tests the complete flow of deleting agreements with both confirmation and cancellation paths.
 */

import {
    createAgreementWithRandomData,
    navigateToFirstAgreementPreview,
    deleteAgreementWithConfirmation,
    deleteAgreementWithCancellation,
} from '../Pages/basic.cy';
import { sendValues } from '../utilities/allureReporting';

describe('Delete Agreement Tests - Confirmation Path', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-DA01: Delete agreement with confirmation', () => {
        sendValues(
            'Delete an existing agreement by confirming the deletion popup',
            'TC-DA01: Delete with Confirmation',
            'High'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        navigateToFirstAgreementPreview();
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('Agreement deleted successfully with confirmation');
    });

    it('TC-DA02: Create and immediately delete agreement', () => {
        sendValues(
            'Create a new agreement and delete it immediately',
            'TC-DA02: Create and Delete Flow',
            'Medium'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('Create and delete flow completed successfully');
    });
});

describe('Delete Agreement Tests - Cancellation Path', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-DA03: Cancel agreement deletion', () => {
        sendValues(
            'Attempt to delete an agreement but cancel the action',
            'TC-DA03: Delete with Cancellation',
            'High'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        navigateToFirstAgreementPreview();
        
        deleteAgreementWithCancellation();
        
        cy.log('Agreement deletion cancelled successfully - agreement still exists');
    });

    it('TC-DA04: Multiple cancellation attempts', () => {
        sendValues(
            'Attempt to delete an agreement multiple times and cancel each time',
            'TC-DA04: Multiple Cancellations',
            'Medium'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        
        deleteAgreementWithCancellation();
        
        cy.wait(1500);
        
        deleteAgreementWithCancellation();
        
        cy.log('Multiple cancellation attempts completed - agreement still exists');
    });

    it('TC-DA05: Cancel then confirm deletion', () => {
        sendValues(
            'Cancel deletion first, then confirm deletion on second attempt',
            'TC-DA05: Cancel Then Confirm',
            'High'
        );

        createAgreementWithRandomData();
        
        cy.wait(1500);
        
        deleteAgreementWithCancellation();
        
        cy.wait(1500);
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('First cancelled, then confirmed deletion successfully');
    });
});

describe('Delete Agreement Tests - Combined Scenarios', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-DA06: Edit then delete agreement', () => {
        sendValues(
            'Edit an agreement and then delete it',
            'TC-DA06: Edit Then Delete',
            'High'
        );

        const { editAgreementWithRandomData } = require('../Pages/basic.cy');

        createAgreementWithRandomData();
        
        cy.wait(1500);
        
        editAgreementWithRandomData();
        
        cy.wait(1500);
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('Edit then delete flow completed successfully');
    });
});
