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
 * Gets the count of visible document rows in the table.
 * @returns Cypress chainable with the count number
 */
export function getDocumentRowCount(): Cypress.Chainable<number> {
    return cy.xpath(AgreementPage.documentsTableRow).its('length');
}

/**
 * Selects a random document checkbox from the documents table.
 * Validates table has documents before attempting selection.
 */
export function selectRandomDocumentCheckbox(): void {
    cy.xpath(AgreementPage.documentsTable).should('be.visible');
    
    getDocumentRowCount().then((count) => {
        cy.log(`Document table has ${count} rows`);
        
        if (count === 0) {
            throw new Error('No documents in table');
        }
        
        const randomIndex = Math.floor(Math.random() * count) + 1;
        const checkboxXPath = AgreementPage.documentTableDataCheckboxTemplate.replace('INDEX', randomIndex.toString());
        
        cy.log(`Selecting random document at index ${randomIndex} out of ${count}`);
        cy.xpath(checkboxXPath).should('be.visible');
        cy.xpath(checkboxXPath).check();
        cy.xpath(checkboxXPath).should('be.checked');
        
        cy.log(`Successfully selected document checkbox at row ${randomIndex}`);
    });
}

/**
 * Selects multiple random document checkboxes from the documents table.
 * @param numberOfDocuments - Number of random documents to select (must be <= total available)
 */
export function selectMultipleRandomDocumentCheckboxes(numberOfDocuments: number): void {
    cy.xpath(AgreementPage.documentsTable).should('be.visible');
    
    getDocumentRowCount().then((count) => {
        cy.log(`Document table has ${count} rows`);
        
        if (count === 0) {
            throw new Error('No documents in table');
        }
        
        if (numberOfDocuments > count) {
            throw new Error(`Cannot select ${numberOfDocuments} documents when only ${count} are available`);
        }
        
        const selectedIndices = new Set<number>();
        while (selectedIndices.size < numberOfDocuments) {
            const randomIndex = Math.floor(Math.random() * count) + 1;
            selectedIndices.add(randomIndex);
        }
        
        cy.log(`Selecting ${numberOfDocuments} random documents from ${count} available`);
        
        Array.from(selectedIndices).forEach((index) => {
            const checkboxXPath = AgreementPage.documentTableDataCheckboxTemplate.replace('INDEX', index.toString());
            cy.xpath(checkboxXPath).should('be.visible');
            cy.xpath(checkboxXPath).check();
            cy.xpath(checkboxXPath).should('be.checked');
            cy.log(`Selected document at row ${index}`);
        });
        
        cy.log(`Successfully selected ${numberOfDocuments} document checkboxes`);
    });
}

/**
 * Selects all documents using the header checkbox.
 */
export function selectAllDocuments(): void {
    cy.xpath(AgreementPage.documentsTable).should('be.visible');
    
    getDocumentRowCount().then((count) => {
        cy.log(`Document table has ${count} rows`);
        
        if (count === 0) {
            throw new Error('No documents in table');
        }
        
        cy.xpath(AgreementPage.documentTableHeaderCheckbox).should('be.visible');
        cy.xpath(AgreementPage.documentTableHeaderCheckbox).check();
        cy.xpath(AgreementPage.documentTableHeaderCheckbox).should('be.checked');
        
        cy.log(`Selected all ${count} documents using header checkbox`);
    });
}

/**
 * Performs AI search with the given keyword and validates UI elements.
 * @param keyword - The search keyword to use
 */
export function performAISearchWithValidation(keyword: string): void {
    cy.xpath(AgreementPage.aiSearchInput).should('be.visible');
    cy.xpath(AgreementPage.aiSearchInput).should('be.enabled');
    cy.xpath(AgreementPage.aiSearchInput).clear();
    cy.xpath(AgreementPage.aiSearchInput).type(keyword);
    
    cy.xpath(AgreementPage.aiSearchInput).should('have.value', keyword);
    
    cy.xpath(AgreementPage.aiSearchButton).should('be.visible');
    cy.xpath(AgreementPage.aiSearchButton).should('be.enabled');
    cy.xpath(AgreementPage.aiSearchButton).click();
    
    cy.xpath(AgreementPage.aiSearchSnippetsContainer).should('be.visible');
    
    cy.log(`AI search for "${keyword}" completed with UI validation`);
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

    selectRandomDocumentCheckbox();

    performAISearchWithValidation('test bla bla');
    
    cy.log('Agreement Successfully Created');
}
