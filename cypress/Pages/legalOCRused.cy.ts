/**
 * Reusable page actions for basic agreement flows.
 * Use these in tests to perform full flows without duplicating steps.
 */

import { AgreementPage } from './ObjectRepository.cy';
import {
    randomAgreementName,
    randomAgreementDate,
    randomAgreementNotes,
    randomResponsibleParty,
    randomMaintenanceOwnerResponsibility,
    randomMaintenanceReasoning,
} from '../utilities/agreementTestData';

/**
 * Waits for the documents table, gets row count, then clicks the checkbox/cell for a randomly chosen document row.
 */
function selectRandomDocument(): void {
  cy.xpath(AgreementPage.documentsTable).should('be.visible');
  cy.xpath(AgreementPage.documentsTableRow)
    .its('length')
    .then((count) => {
        cy.log('Documents in table: ' + count);
        if (count === 0) throw new Error('No documents in table');
        const randomIndex = Math.floor(Math.random() * count);
        cy.xpath(AgreementPage.documentsTableRow).eq(randomIndex).click();
    });
}

/**
 * Creates a new agreement with random data, uses the 'AI Search' feature of the application and asserts it is displayed.
 * Can be called repeatedly in tests (e.g. to create multiple agreements).
 */
export function createAgreementWithRandomDataAndAISearch(): void {
    const agreementName = randomAgreementName();
    cy.xpath(AgreementPage.createAgreementButton).click();
    cy.xpath(AgreementPage.agreementNameInput).type(agreementName);
    cy.xpath(AgreementPage.agreementDateInput).type(randomAgreementDate());
    cy.xpath(AgreementPage.agreementNotesTextarea).type(randomAgreementNotes());

    selectRandomDocument();

    cy.xpath(AgreementPage.aiSearchInput).type('test bla bla');
    cy.xpath(AgreementPage.aiSearchButton).click();
    
    
    cy.log('Agreement Successfully Created');
}
