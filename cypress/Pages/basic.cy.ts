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
 * Creates a new agreement with random data and asserts it is displayed.
 * Can be called repeatedly in tests (e.g. to create multiple agreements).
 */
export function createAgreementWithRandomData(): void {
    const agreementName = randomAgreementName();
    cy.xpath(AgreementPage.createAgreementButton).click();
    cy.wait(1000);
    cy.xpath(AgreementPage.agreementNameInput).type(agreementName);
    cy.wait(800);
    cy.xpath(AgreementPage.agreementDateInput).type(randomAgreementDate());
    cy.wait(800);
    cy.xpath(AgreementPage.agreementNotesTextarea).type(randomAgreementNotes());
    cy.wait(800);
    cy.xpath(AgreementPage.responsiblePartyInput).type(randomResponsibleParty());
    cy.wait(800);
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInput).type(
        randomMaintenanceOwnerResponsibility()
    );
    cy.wait(800);
    cy.xpath(AgreementPage.maintenanceReasoningInput).type(
        randomMaintenanceReasoning()
    );
    cy.wait(1000);
    cy.xpath(AgreementPage.saveAgreementButton).click();
    cy.wait(1500);
    cy.xpath(AgreementPage.agreementNameDisplay).should(
        'have.text',
        agreementName
    );
    cy.log('Agreement Successfully Created');
}

/**
 * Navigates to the first agreement's preview page from the landing page.
 */
export function navigateToFirstAgreementPreview(): void {
    cy.wait(1000);
    cy.xpath(AgreementPage.firstAgreementCardFileName).click();
    cy.wait(1500);
    cy.log('Navigated to agreement preview page');
}

/**
 * Edits an existing agreement with new random data.
 * Prerequisite: Must be on the agreements preview page.
 */
export function editAgreementWithRandomData(): void {
    const newAgreementName = randomAgreementName();
    
    cy.xpath(AgreementPage.editAgreementButton).click();
    cy.wait(1500);
    cy.log('Clicked edit agreement button');
    
    cy.xpath(AgreementPage.agreementNameInput).clear().type(newAgreementName);
    cy.wait(800);
    cy.xpath(AgreementPage.agreementDateInput).clear().type(randomAgreementDate());
    cy.wait(800);
    cy.xpath(AgreementPage.agreementNotesTextarea).clear().type(randomAgreementNotes());
    cy.wait(800);
    cy.xpath(AgreementPage.responsiblePartyInput).clear().type(randomResponsibleParty());
    cy.wait(800);
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInput).clear().type(
        randomMaintenanceOwnerResponsibility()
    );
    cy.wait(800);
    cy.xpath(AgreementPage.maintenanceReasoningInput).clear().type(
        randomMaintenanceReasoning()
    );
    cy.wait(1000);
    
    cy.xpath(AgreementPage.saveAgreementButton).click();
    cy.wait(1500);
    cy.log('Agreement successfully edited and saved');
    
    cy.xpath(AgreementPage.agreementNameDisplay).should(
        'have.text',
        newAgreementName
    );
}

/**
 * Deletes an agreement and confirms the deletion.
 * Prerequisite: Must be on the agreements preview page.
 */
export function deleteAgreementWithConfirmation(): void {
    cy.xpath(AgreementPage.deleteAgreementButton).click();
    cy.wait(1000);
    cy.log('Clicked delete agreement button');
    
    cy.xpath(AgreementPage.deleteConfirmationDeleteButton).should('be.visible');
    cy.wait(1000);
    cy.xpath(AgreementPage.deleteConfirmationDeleteButton).click();
    cy.wait(1500);
    cy.log('Confirmed agreement deletion');
}

/**
 * Deletes an agreement but cancels the deletion.
 * Prerequisite: Must be on the agreements preview page.
 */
export function deleteAgreementWithCancellation(): void {
    cy.xpath(AgreementPage.deleteAgreementButton).click();
    cy.wait(1000);
    cy.log('Clicked delete agreement button');
    
    cy.xpath(AgreementPage.deleteConfirmationCancelButton).should('be.visible');
    cy.wait(1000);
    cy.xpath(AgreementPage.deleteConfirmationCancelButton).click();
    cy.wait(1000);
    cy.log('Cancelled agreement deletion');
    
    cy.xpath(AgreementPage.editAgreementButton).should('be.visible');
}

/**
 * Clicks the Sort By button to open the sort dropdown.
 */
export function openSortByDropdown(): void {
    cy.xpath(AgreementPage.sortByButton).click();
    cy.wait(800);
    cy.log('Opened sort by dropdown');
}

/**
 * Sorts agreements by Agreement Name.
 */
export function sortByAgreementName(): void {
    openSortByDropdown();
    cy.xpath(AgreementPage.sortByAgreementName).click();
    cy.wait(1500);
    cy.log('Sorted by Agreement Name');
}

/**
 * Sorts agreements by Last Modified date.
 */
export function sortByLastModified(): void {
    openSortByDropdown();
    cy.xpath(AgreementPage.sortByLastModified).click();
    cy.wait(1500);
    cy.log('Sorted by Last Modified');
}

/**
 * Sorts agreements by Agreement ID.
 */
export function sortByAgreementId(): void {
    openSortByDropdown();
    cy.xpath(AgreementPage.sortByAgreementId).click();
    cy.wait(1500);
    cy.log('Sorted by Agreement ID');
}

/**
 * Searches for agreements using the search bar.
 * @param searchTerm - The term to search for
 */
export function searchAgreements(searchTerm: string): void {
    cy.xpath(AgreementPage.searchBarInput).clear();
    cy.wait(500);
    cy.xpath(AgreementPage.searchBarInput).type(searchTerm);
    cy.wait(1500);
    cy.log(`Searched for: ${searchTerm}`);
}

/**
 * Clears the search bar.
 */
export function clearSearch(): void {
    cy.xpath(AgreementPage.searchBarInput).clear();
    cy.wait(1000);
    cy.log('Cleared search');
}

/**
 * Gets the text content of all visible agreement table rows.
 * @returns Cypress chainable with array of row texts
 */
export function getVisibleAgreementRows(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.xpath(AgreementPage.agreementTableRows);
}

/**
 * Extracts agreement names from all visible cards on the landing page.
 * @returns Promise resolving to array of agreement names
 */
export function extractAgreementNames(): Cypress.Chainable<string[]> {
    return cy.xpath(AgreementPage.agreementTableRows).then(($rows) => {
        const names: string[] = [];
        $rows.each((index, row) => {
            const nameElement = Cypress.$(row).find('td:nth-child(1) button');
            if (nameElement.length > 0) {
                const name = nameElement.text().trim();
                if (name) {
                    names.push(name);
                }
            }
        });
        return names;
    });
}

/**
 * Extracts agreement IDs from all visible cards on the landing page.
 * Assumes IDs are in the second column of the table.
 * @returns Promise resolving to array of agreement IDs
 */
export function extractAgreementIds(): Cypress.Chainable<string[]> {
    return cy.xpath(AgreementPage.agreementTableRows).then(($rows) => {
        const ids: string[] = [];
        $rows.each((index, row) => {
            const idElement = Cypress.$(row).find('td:nth-child(2)');
            if (idElement.length > 0) {
                const id = idElement.text().trim();
                if (id) {
                    ids.push(id);
                }
            }
        });
        return ids;
    });
}

/**
 * Extracts last modified dates from all visible cards on the landing page.
 * Assumes dates are in the third column of the table.
 * @returns Promise resolving to array of date strings
 */
export function extractLastModifiedDates(): Cypress.Chainable<string[]> {
    return cy.xpath(AgreementPage.agreementTableRows).then(($rows) => {
        const dates: string[] = [];
        $rows.each((index, row) => {
            const dateElement = Cypress.$(row).find('td:nth-child(3)');
            if (dateElement.length > 0) {
                const date = dateElement.text().trim();
                if (date) {
                    dates.push(date);
                }
            }
        });
        return dates;
    });
}

/**
 * Finds common prefix from an array of strings (e.g., all names starting with "Agreement").
 * @param items - Array of strings to analyze
 * @returns Common prefix string or first 3 characters of first item
 */
export function findCommonPrefix(items: string[]): string {
    if (items.length === 0) return '';
    if (items.length === 1) return items[0].substring(0, Math.min(3, items[0].length));
    
    let prefix = items[0];
    for (let i = 1; i < items.length; i++) {
        while (items[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return items[0].substring(0, Math.min(3, items[0].length));
        }
    }
    
    return prefix || items[0].substring(0, Math.min(3, items[0].length));
}

/**
 * Dynamically searches agreements based on extracted data from landing page.
 * Extracts names, finds common prefix, and searches for it.
 */
export function searchByExtractedName(): void {
    extractAgreementNames().then((names) => {
        if (names.length > 0) {
            const searchTerm = findCommonPrefix(names);
            cy.log(`Extracted ${names.length} names, searching for common prefix: "${searchTerm}"`);
            searchAgreements(searchTerm);
        } else {
            cy.log('No agreement names found to extract');
        }
    });
}

/**
 * Dynamically searches agreements based on extracted IDs from landing page.
 * Extracts IDs, finds common prefix, and searches for it.
 */
export function searchByExtractedId(): void {
    extractAgreementIds().then((ids) => {
        if (ids.length > 0) {
            const searchTerm = findCommonPrefix(ids);
            cy.log(`Extracted ${ids.length} IDs, searching for common prefix: "${searchTerm}"`);
            searchAgreements(searchTerm);
        } else {
            cy.log('No agreement IDs found to extract');
        }
    });
}

/**
 * Dynamically searches agreements based on extracted dates from landing page.
 * Uses the most recent date found.
 */
export function searchByExtractedDate(): void {
    extractLastModifiedDates().then((dates) => {
        if (dates.length > 0) {
            const searchTerm = dates[0];
            cy.log(`Extracted ${dates.length} dates, searching for: "${searchTerm}"`);
            searchAgreements(searchTerm);
        } else {
            cy.log('No dates found to extract');
        }
    });
}
