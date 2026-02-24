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
        
        // Critical assertion: Ensure table has at least 1 document
        if (count === 0) {
            throw new Error('No documents in table - cannot proceed with test');
        }
        
        const randomIndex = Math.floor(Math.random() * count) + 1;
        const checkboxXPath = AgreementPage.documentTableDataCheckboxTemplate.replace('INDEX', randomIndex.toString());
        
        cy.log(`Selecting random document at index ${randomIndex} out of ${count}`);
        
        // Pre-condition checks
        cy.xpath(checkboxXPath).should('be.visible');
        cy.xpath(checkboxXPath).should('be.enabled');
        
        // Action: Select checkbox
        cy.xpath(checkboxXPath).check();
        
        // Assertion: Verify checkbox is checked
        cy.xpath(checkboxXPath).should('be.checked');
        
        // Critical assertion: Count all checked checkboxes and verify exactly 1 is selected
        cy.xpath(AgreementPage.documentTableAllCheckboxes)
            .filter(':checked')
            .should('have.length', 1);
        
        cy.log(`Successfully selected and verified document checkbox at row ${randomIndex}`);
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
    // Pre-condition: Validate input field is ready
    cy.xpath(AgreementPage.aiSearchInput).should('be.visible');
    cy.xpath(AgreementPage.aiSearchInput).should('be.enabled');
    
    // Action: Clear and type keyword
    cy.xpath(AgreementPage.aiSearchInput).clear();
    cy.xpath(AgreementPage.aiSearchInput).type(keyword);
    
    // Assertion: Verify keyword was typed correctly
    cy.xpath(AgreementPage.aiSearchInput).should('have.value', keyword);
    
    // Pre-condition: Validate button is ready
    cy.xpath(AgreementPage.aiSearchButton).should('be.visible');
    cy.xpath(AgreementPage.aiSearchButton).should('be.enabled');
    
    // Action: Click AI Search button
    cy.xpath(AgreementPage.aiSearchButton).click();
    
    // Assertion: Verify results container appears (waits for search to complete)
    cy.xpath(AgreementPage.aiSearchSnippetsContainer).should('be.visible', { timeout: 15000 });
    
    cy.log(`AI search for "${keyword}" completed with full UI validation`);
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

/**
 * Complete end-to-end flow: Creates agreement with random data, selects random document,
 * performs AI search with random keyword from predefined list, and saves the agreement.
 * Includes all critical validations throughout the flow.
 * 
 * @param keywords - Array of keywords to randomly select from for AI search
 * @returns The agreement name that was created (for further assertions if needed)
 */
export function createAgreementWithAISearchAndValidation(keywords: string[]): string {
    // Generate random data
    const agreementName = randomAgreementName();
    const agreementDate = randomAgreementDate();
    const agreementNotes = randomAgreementNotes();
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    
    cy.log(`Creating agreement: ${agreementName} with AI keyword: ${randomKeyword}`);
    
    // Step 1: Fill basic agreement information
    cy.xpath(AgreementPage.agreementNameInput).should('be.visible').type(agreementName);
    cy.xpath(AgreementPage.agreementNameInput).should('have.value', agreementName);
    
    cy.xpath(AgreementPage.agreementDateInput).should('be.visible').type(agreementDate);
    cy.xpath(AgreementPage.agreementDateInput).should('have.value', agreementDate);
    
    cy.xpath(AgreementPage.agreementNotesTextarea).should('be.visible').type(agreementNotes);
    cy.xpath(AgreementPage.agreementNotesTextarea).should('have.value', agreementNotes);
    
    cy.log('Basic agreement information filled successfully');
    
    // Step 2: Select random document with validation
    selectRandomDocumentCheckbox();
    
    // Validate at least one checkbox is selected
    cy.xpath(AgreementPage.documentTableAllCheckboxes)
        .filter(':checked')
        .should('have.length.at.least', 1);
    
    cy.log('Random document selected and validated');
    
    // Step 3: Perform AI search with random keyword and full validation
    performAISearchWithValidation(randomKeyword);
    
    // Validate AI search results container has content
    cy.xpath(AgreementPage.aiSearchSnippetsContainer)
        .should('be.visible')
        .invoke('text')
        .should('not.be.empty');
    
    // Validate no error messages
    cy.xpath('//*[contains(@class, "error") or contains(@class, "Error")]')
        .should('not.exist');
    
    cy.log(`AI search completed successfully for keyword: ${randomKeyword}`);

    cy.xpath(AgreementPage.responsiblePartyInputSnippet).type(randomResponsibleParty());
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInputSnippet).type(
        randomMaintenanceOwnerResponsibility()
    );
    cy.xpath(AgreementPage.maintenanceReasoningInputSnippet).type(
        randomMaintenanceReasoning()
    );
    
    // Step 5: Save the agreement
    cy.xpath(AgreementPage.saveAgreementButton).should('be.visible').should('be.enabled').click();
    
    // Step 6: Verify agreement was created successfully
    cy.url().should('not.include', '/create');
    cy.url().should('include', '/agreements');
    
    cy.xpath(AgreementPage.agreementNameDisplay)
        .should('be.visible')
        .should('have.text', agreementName);
    cy.xpath(AgreementPage.agreementDateDisplay)
        .should('be.visible')
        .should('have.text', agreementDate);
    cy.xpath(AgreementPage.agreementNotesDisplay)
        .should('be.visible')
        .should('have.text', agreementNotes);
    
    cy.log(`Agreement "${agreementName}" created successfully with AI search for "${randomKeyword}"`);
    
    return agreementName;
}
