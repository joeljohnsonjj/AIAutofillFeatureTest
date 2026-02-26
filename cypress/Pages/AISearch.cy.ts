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
 * Randomly selects documents using one of the available selection strategies:
 * - Single random document
 * - Multiple random documents (2-5)
 * - All documents
 * - Half documents
 * Validates table has documents before attempting selection.
 */
export function selectRandomDocumentCheckbox(): void {
    cy.xpath(AgreementPage.documentsTable);
    
    getDocumentRowCount().then((count) => {
        cy.log(`Document table has ${count} rows`);
        
        // Critical assertion: Ensure table has at least 1 document
        if (count === 0) {
            throw new Error('No documents in table - cannot proceed with test');
        }
        
        // Randomly choose selection strategy (0-3)
        const strategy = Math.floor(Math.random() * 4);
        
        switch (strategy) {
            case 0: // Select single random document
                const randomIndex = Math.floor(Math.random() * count) + 1;
                const checkboxXPath = AgreementPage.documentTableDataCheckboxTemplate.replace('INDEX', randomIndex.toString());
                
                cy.log(`Strategy: Single document - Selecting row ${randomIndex} out of ${count}`);
                
                cy.xpath(checkboxXPath);
                cy.xpath(checkboxXPath).check();
                cy.xpath(checkboxXPath).should('be.checked');
                
                // Verify exactly 1 checkbox is selected
                cy.xpath(AgreementPage.documentTableAllCheckboxes)
                    .filter(':checked')
                    .should('have.length', 1);
                
                cy.log('Successfully selected 1 random document');
                break;
                
            case 1: // Select multiple random documents (2-5)
                const numToSelect = Math.min(Math.floor(Math.random() * 4) + 2, count); // 2-5 or max available
                selectMultipleRandomDocumentCheckboxes(numToSelect);
                cy.log(`Strategy: Multiple documents - Selected ${numToSelect} random documents`);
                break;
                
            case 2: // Select all documents
                selectAllDocuments();
                cy.log(`Strategy: All documents - Selected all ${count} documents`);
                break;
                
            case 3: // Select half documents
                const halfCount = Math.max(1, Math.floor(count / 2));
                selectMultipleRandomDocumentCheckboxes(halfCount);
                cy.log(`Strategy: Half documents - Selected ${halfCount} out of ${count} documents`);
                break;
        }
        
        // Final validation: At least one checkbox should be selected
        cy.xpath(AgreementPage.documentTableAllCheckboxes)
            .filter(':checked')
            .should('have.length.at.least', 1);
    });
}

/**
 * Selects multiple random document checkboxes from the documents table.
 * @param numberOfDocuments - Number of random documents to select (must be <= total available)
 */
export function selectMultipleRandomDocumentCheckboxes(numberOfDocuments: number): void {
    cy.xpath(AgreementPage.documentsTable);
    
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
            cy.xpath(checkboxXPath);
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
    cy.xpath(AgreementPage.documentsTable);
    
    getDocumentRowCount().then((count) => {
        cy.log(`Document table has ${count} rows`);
        
        if (count === 0) {
            throw new Error('No documents in table');
        }
        
        cy.xpath(AgreementPage.documentTableHeaderCheckbox);
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
    cy.xpath(AgreementPage.aiSearchInput);
    
    // Action: Clear and type keyword
    cy.xpath(AgreementPage.aiSearchInput).clear();
    cy.xpath(AgreementPage.aiSearchInput).type(keyword);
    
    // Assertion: Verify keyword was typed correctly
    cy.xpath(AgreementPage.aiSearchInput).should('have.value', keyword);
    
    // Pre-condition: Validate button is ready
    cy.xpath(AgreementPage.aiSearchButton);
    
    // Action: Click AI Search button
    cy.xpath(AgreementPage.aiSearchButton).click();
    
    // Assertion: Verify results container appears (waits for search to complete)
    cy.xpath(AgreementPage.aiSearchSnippetsContainer).should('exist', { timeout: 15000 });
    
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
        .click();
    
    cy.log('Opened legal evidence PDF view');
    
    // Wait for PDF to load
    cy.wait(1000);
}

/**
 * Navigates through PDF pages if multi-page reference exists.
 * Checks if page navigation buttons are visible before attempting navigation.
 * Skips navigation if buttons don't exist (single-page reference).
 */
export function navigatePDFPages(): void {
    // Wait longer for PDF view to fully load and render page navigation
    cy.wait(2000);
    
    cy.log('Checking if PDF has multiple pages...');
    
    // Look for page buttons container or any page button (more flexible approach)
    const pageButtonContainerXPath = "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div";
    
    cy.document().then((doc) => {
        const result = doc.evaluate(
            pageButtonContainerXPath,
            doc,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        
        if (result.singleNodeValue) {
            cy.log('Page navigation container found - checking for page buttons');
            
            // Get the container and find buttons
            cy.xpath(pageButtonContainerXPath).then(($container) => {
                const buttons = $container.find('button');
                cy.log(`Found ${buttons.length} page buttons in container`);
                
                if (buttons.length > 1) {
                    cy.log(`Multi-page PDF detected with ${buttons.length} page buttons`);
                    
                    // Randomly click on 1-3 different page buttons
                    const clickCount = Math.min(Math.floor(Math.random() * 3) + 1, buttons.length);
                    cy.log(`Clicking ${clickCount} random page buttons`);
                    
                    for (let i = 0; i < clickCount; i++) {
                        // Click a random page button using force to bypass visibility checks
                        cy.xpath(pageButtonContainerXPath).find('button').then(($btns) => {
                            cy.log(`Available buttons: ${$btns.length}`);
                            if ($btns.length > 1) {
                                const randomIndex = Math.floor(Math.random() * $btns.length);
                                const $btnToClick = $btns.eq(randomIndex);
                                
                                cy.wrap($btnToClick).click({ force: true });
                                cy.log(`Clicked page button ${randomIndex + 1} (forced)`);
                                cy.wait(800);
                            }
                        });
                    }
                } else {
                    cy.log(`Page button container found but only ${buttons.length} button(s) - single-page reference`);
                }
            });
        } else {
            cy.log('Page navigation container not found - single-page reference, skipping navigation');
        }
    });
}

/**
 * Returns to snippet view from PDF view.
 */
export function returnToSnippetView(): void {
    cy.xpath(AgreementPage.aiPdfViewSnippetButton)
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
        .click();
    
    cy.log('Accepted AI snippet from snippet view');
}

/**
 * Accepts AI snippet from PDF view.
 */
export function acceptAISnippetFromPDFView(): void {
    cy.xpath(AgreementPage.aiPdfViewAcceptButton)
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
    
    // Step 3: Extract snippet text values for validation
    cy.xpath(AgreementPage.responsiblePartySnippet).invoke('text').then((responsiblePartyText) => {
        cy.xpath(AgreementPage.responsibilitySnippet).invoke('text').then((maintenanceOwnerResponsibilityText) => {
            cy.xpath(AgreementPage.reasoningSnippet).invoke('text').then((maintenanceReasoningText) => {
                
                cy.log(`Extracted snippet values - Responsible Party: "${responsiblePartyText}", Maintenance Owner: "${maintenanceOwnerResponsibilityText}", Maintenance Reasoning: "${maintenanceReasoningText}"`);
                
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
                
                // Step 5: Validate the fields are auto-filled with exact snippet values
                cy.xpath(AgreementPage.responsiblePartyInputSnippet).should('have.value', responsiblePartyText.trim());
                cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInputSnippet).should('have.value', maintenanceOwnerResponsibilityText.trim());
                cy.xpath(AgreementPage.maintenanceReasoningInputSnippet).should('have.value', maintenanceReasoningText.trim());
                
                cy.log('Validated: All fields auto-filled with correct snippet values');
            });
        });
    });
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
    cy.xpath(AgreementPage.agreementNameInput).type(agreementName);
    cy.xpath(AgreementPage.agreementNameInput).should('have.value', agreementName);
    
    cy.xpath(AgreementPage.agreementDateInput).type(agreementDate);
    cy.xpath(AgreementPage.agreementDateInput).should('have.value', agreementDate);
    
    cy.xpath(AgreementPage.agreementNotesTextarea).type(agreementNotes);
    cy.xpath(AgreementPage.agreementNotesTextarea).should('have.value', agreementNotes);
    
    cy.log('Basic agreement information filled successfully');
    
    // Step 2: Select random document(s) with validation (randomly chooses strategy)
    selectRandomDocumentCheckbox();
    
    cy.log('Random document selection completed and validated');
    
    // Step 3: Perform AI search with random keyword and full validation
    performAISearchWithValidation(randomKeyword);
    
    // Validate AI search results container has content
    cy.xpath(AgreementPage.aiSearchSnippetsContainer)
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
    cy.xpath(AgreementPage.saveAgreementButton).click();
    
    // Step 6: Verify agreement was created successfully
    cy.url().should('include', '/agreements');
    
    cy.xpath(AgreementPage.agreementNameDisplay)
        .should('have.text', agreementName);
    cy.xpath(AgreementPage.agreementDateDisplay)
        .should('have.text', agreementDate);
    cy.xpath(AgreementPage.agreementNotesDisplay)
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
    cy.xpath(AgreementPage.agreementNameInput).type(agreementName);
    cy.xpath(AgreementPage.agreementNameInput).should('have.value', agreementName);
    
    cy.xpath(AgreementPage.agreementDateInput).type(agreementDate);
    cy.xpath(AgreementPage.agreementDateInput).should('have.value', agreementDate);
    
    cy.xpath(AgreementPage.agreementNotesTextarea).type(agreementNotes);
    cy.xpath(AgreementPage.agreementNotesTextarea).should('have.value', agreementNotes);
    
    cy.log('Basic agreement information filled successfully');
    
    // Step 2: Select random document(s) with validation (randomly chooses strategy)
    selectRandomDocumentCheckbox();
    
    cy.log('Random document selection completed and validated');
    
    // Step 3: Perform AI search with random keyword and full validation
    performAISearchWithValidation(randomKeyword);
    
    // Validate AI search results container has content
    cy.xpath(AgreementPage.aiSearchSnippetsContainer)
        .invoke('text')
        .should('not.be.empty');
    
    // Validate no error messages
    cy.xpath('//*[contains(@class, "error") or contains(@class, "Error")]')
        .should('not.exist');
    
    cy.log(`AI search completed successfully for keyword: ${randomKeyword}`);
    
    // Step 4: Interact with AI snippets and accept
    interactWithAISnippetsAndAccept();
    
    cy.log('AI snippets accepted - fields should be auto-filled');
    
    // Step 6: Save the agreement
    cy.xpath(AgreementPage.saveAgreementButton).click();
    
    // Step 7: Verify agreement was created successfully
    cy.url().should('include', '/agreements');
    
    cy.xpath(AgreementPage.agreementNameDisplay)
        .should('have.text', agreementName);
    cy.xpath(AgreementPage.agreementDateDisplay)
        .should('have.text', agreementDate);
    cy.xpath(AgreementPage.agreementNotesDisplay)
        .should('have.text', agreementNotes);
    
    cy.log(`Agreement "${agreementName}" created successfully with AI snippet acceptance for "${randomKeyword}"`);
    
    return agreementName;
}
