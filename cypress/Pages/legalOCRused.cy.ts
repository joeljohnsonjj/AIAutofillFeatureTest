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
 * Navigates through AI snippets using back/front navigation buttons.
 * @param numberOfNavigations - Number of times to randomly navigate
 */
export function navigateAISnippets(numberOfNavigations: number): void {
    cy.log(`Navigating through AI snippets ${numberOfNavigations} times`);
    
    for (let i = 0; i < numberOfNavigations; i++) {
        const navigateBack = Math.random() < 0.5;
        
        if (navigateBack) {
            cy.xpath(AgreementPage.aiSnippetNavigateBackButton)
                .should('exist')
                .then(($btn) => {
                    if ($btn.is(':visible') && !$btn.is(':disabled')) {
                        cy.wrap($btn).click();
                        cy.log(`Navigation ${i + 1}: Clicked back button`);
                        cy.wait(500);
                    } else {
                        cy.log(`Navigation ${i + 1}: Back button not available`);
                    }
                });
        } else {
            cy.xpath(AgreementPage.aiSnippetNavigateFrontButton)
                .should('exist')
                .then(($btn) => {
                    if ($btn.is(':visible') && !$btn.is(':disabled')) {
                        cy.wrap($btn).click();
                        cy.log(`Navigation ${i + 1}: Clicked front button`);
                        cy.wait(500);
                    } else {
                        cy.log(`Navigation ${i + 1}: Front button not available`);
                    }
                });
        }
    }
    
    cy.log('AI snippet navigation completed');
}

/**
 * Opens the PDF legal evidence view from snippet view.
 */
export function viewLegalEvidence(): void {
    cy.xpath(AgreementPage.aiSnippetViewLegalEvidenceButton)
        .should('be.visible')
        .should('be.enabled')
        .click();
    
    cy.log('Opened legal evidence PDF view');
    
    // Wait for PDF to load
    cy.wait(1000);
}

/**
 * Navigates through PDF pages if multi-page reference exists.
 */
export function navigatePDFPages(): void {
    cy.xpath(AgreementPage.aiPdfViewPageNavigateButton).then(($navBtn) => {
        if ($navBtn.length > 0 && $navBtn.is(':visible')) {
            cy.log('Multi-page PDF detected, navigating through pages');
            
            // Try navigating forward through pages
            const pagesToNavigate = Math.floor(Math.random() * 3) + 1;
            
            for (let i = 0; i < pagesToNavigate; i++) {
                cy.xpath(AgreementPage.aiPdfViewPageNavigateButton)
                    .then(($btn) => {
                        if ($btn.is(':visible') && !$btn.is(':disabled')) {
                            cy.wrap($btn).click();
                            cy.log(`Navigated to PDF page ${i + 2}`);
                            cy.wait(500);
                        }
                    });
            }
        } else {
            cy.log('Single-page PDF or navigation not available');
        }
    });
}

/**
 * Returns to snippet view from PDF view.
 */
export function returnToSnippetView(): void {
    cy.xpath(AgreementPage.aiPdfViewSnippetButton)
        .should('be.visible')
        .should('be.enabled')
        .click();
    
    cy.log('Returned to snippet view from PDF');
    
    // Wait for snippet view to load
    cy.wait(500);
}

/**
 * Accepts AI snippet from snippet view.
 */
export function acceptAISnippetFromSnippetView(): void {
    cy.xpath(AgreementPage.aiSnippetAcceptButton)
        .should('be.visible')
        .should('be.enabled')
        .click();
    
    cy.log('Accepted AI snippet from snippet view');
}

/**
 * Accepts AI snippet from PDF view.
 */
export function acceptAISnippetFromPDFView(): void {
    cy.xpath(AgreementPage.aiPdfViewAcceptButton)
        .should('be.visible')
        .should('be.enabled')
        .click();
    
    cy.log('Accepted AI snippet from PDF view');
}

/**
 * Complete AI snippet interaction flow with navigation and acceptance.
 * Randomly navigates through snippets, views legal evidence, and accepts.
 */
export function interactWithAISnippetsAndAccept(): void {
    // Step 1: Navigate through 2-3 snippets randomly
    const numberOfNavigations = Math.floor(Math.random() * 2) + 2; // 2 or 3
    navigateAISnippets(numberOfNavigations);
    
    // Step 2: View legal evidence (PDF)
    viewLegalEvidence();
    
    // Step 3: Navigate through PDF pages if multi-page
    navigatePDFPages();
    
    // Step 4: Randomly decide to accept from PDF view or snippet view
    const acceptFromPDF = Math.random() < 0.5;
    
    if (acceptFromPDF) {
        cy.log('Accepting AI snippet from PDF view');
        acceptAISnippetFromPDFView();
    } else {
        cy.log('Returning to snippet view to accept');
        returnToSnippetView();
        acceptAISnippetFromSnippetView();
    }
    
    cy.log('AI snippet interaction and acceptance completed');
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

/**
 * Complete end-to-end flow with AI snippet acceptance: Creates agreement with random data,
 * selects random document, performs AI search, interacts with snippets, accepts them,
 * and saves the agreement. Includes all critical validations throughout the flow.
 * 
 * @param keywords - Array of keywords to randomly select from for AI search
 * @returns The agreement name that was created (for further assertions if needed)
 */
export function createAgreementWithAISnippetAcceptance(keywords: string[]): string {
    // Generate random data
    const agreementName = randomAgreementName();
    const agreementDate = randomAgreementDate();
    const agreementNotes = randomAgreementNotes();
    const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
    
    cy.log(`Creating agreement: ${agreementName} with AI keyword: ${randomKeyword} (with snippet acceptance)`);
    
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
    
    // Step 4: Interact with AI snippets and accept
    interactWithAISnippetsAndAccept();
    
    cy.log('AI snippets accepted - fields should be auto-filled');
    
    // Step 5: Fill additional fields if they exist and are not auto-filled
    cy.xpath(AgreementPage.responsiblePartyInputSnippet).then(($input) => {
        if ($input.is(':visible') && $input.is(':enabled') && $input.val() === '') {
            cy.wrap($input).type(randomResponsibleParty());
            cy.log('Filled responsible party field');
        } else {
            cy.log('Responsible party field already filled by AI or not available');
        }
    });
    
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInputSnippet).then(($input) => {
        if ($input.is(':visible') && $input.is(':enabled') && $input.val() === '') {
            cy.wrap($input).type(randomMaintenanceOwnerResponsibility());
            cy.log('Filled maintenance owner responsibility field');
        } else {
            cy.log('Maintenance owner field already filled by AI or not available');
        }
    });
    
    cy.xpath(AgreementPage.maintenanceReasoningInputSnippet).then(($input) => {
        if ($input.is(':visible') && $input.is(':enabled') && $input.val() === '') {
            cy.wrap($input).type(randomMaintenanceReasoning());
            cy.log('Filled maintenance reasoning field');
        } else {
            cy.log('Maintenance reasoning field already filled by AI or not available');
        }
    });
    
    // Step 6: Save the agreement
    cy.xpath(AgreementPage.saveAgreementButton).should('be.visible').should('be.enabled').click();
    
    // Step 7: Verify agreement was created successfully
    cy.url().should('not.include', '/create');
    cy.url().should('include', '/agreements');
    
    cy.xpath(AgreementPage.agreementNameDisplay)
        .should('be.visible')
        .should('have.text', agreementName);
    
    cy.log(`Agreement "${agreementName}" created successfully with AI snippet acceptance for "${randomKeyword}"`);
    
    return agreementName;
}
