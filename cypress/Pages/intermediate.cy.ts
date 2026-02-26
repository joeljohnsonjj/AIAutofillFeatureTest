/**
 * Intermediate page actions for edit, delete, sort, and search operations.
 * Use these in tests to perform advanced agreement management flows.
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
 * Navigates back using the back button.
 */
export function navigateBack(): void {
    cy.xpath(AgreementPage.backButton).click();
    
    cy.url().should('eq', 'http://localhost:3000/agreements');
    cy.xpath(AgreementPage.createAgreementButton).should('be.visible');
    cy.xpath(AgreementPage.searchBarInput).should('be.visible');
    cy.xpath(AgreementPage.sortByButton).should('be.visible');
    
    cy.log('Navigated back using back button');
}

/**
 * Edits an existing agreement with new random data.
 * Prerequisite: Must be on the agreements preview page.
 */
export function editAgreementWithRandomData(): void {
    const newAgreementName = randomAgreementName();
    const newAgreementDate = randomAgreementDate();
    const newAgreementNotes = randomAgreementNotes();
    const newResponsibleParty = randomResponsibleParty();
    const newMaintenanceOwnerResponsibility = randomMaintenanceOwnerResponsibility();
    const newMaintenanceReasoning = randomMaintenanceReasoning();

    cy.xpath(AgreementPage.editAgreementButton).click();
    cy.xpath(AgreementPage.agreementNameInput).clear().type(newAgreementName);
    cy.xpath(AgreementPage.agreementDateInput).clear().type(newAgreementDate);
    cy.xpath(AgreementPage.agreementNotesTextarea).clear().type(newAgreementNotes);
    cy.xpath(AgreementPage.responsiblePartyInput).clear().type(newResponsibleParty);
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInput).clear().type(newMaintenanceOwnerResponsibility);
    cy.xpath(AgreementPage.maintenanceReasoningInput).clear().type(newMaintenanceReasoning);
    cy.xpath(AgreementPage.saveAgreementButton).click();
    
    cy.xpath(AgreementPage.agreementNameDisplay).should(
        'have.text',
        newAgreementName
    );
    cy.xpath(AgreementPage.agreementDateDisplay).should(
        'have.text',
        newAgreementDate
    );
    cy.xpath(AgreementPage.agreementNotesDisplay).should(
        'have.text',
        newAgreementNotes
    );
    cy.xpath(AgreementPage.responsiblePartyDisplay).should(
        'have.text',
        newResponsibleParty
    );
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityDisplay).should(
        'have.text',
        newMaintenanceOwnerResponsibility
    );
    cy.xpath(AgreementPage.maintenanceReasoningDisplay).should(
        'have.text',
        newMaintenanceReasoning
    );

    cy.log('Agreement successfully edited and saved');
}

/**
 * Deletes an agreement and confirms the deletion.
 * Prerequisite: Must be on the agreements preview page.
 */
export function deleteAgreementWithConfirmation(agreementName: string): void {
    cy.xpath(AgreementPage.deleteAgreementButton).click();
    cy.xpath(AgreementPage.deleteConfirmationDeleteButton).click();
    extractAgreementNames().then((names) => {
        expect(names).to.not.include(agreementName);
        cy.log(`Verified "${agreementName}" was deleted`);
    });
}

/**
 * Deletes an agreement but cancels the deletion.
 * Prerequisite: Must be on the agreements preview page.
 */
export function deleteAgreementWithCancellation(): void {
    cy.xpath(AgreementPage.agreementNameDisplay).invoke('text').then((agreementName) => {
        cy.xpath(AgreementPage.deleteAgreementButton).click();
        
        cy.xpath(AgreementPage.deleteConfirmationCancelButton).click();
        cy.log('Cancelled agreement deletion');
        
        cy.xpath(AgreementPage.agreementNameDisplay).should('have.text', agreementName);
        cy.log('Verified agreement was not deleted');
    });
}

/**
 * Clicks the Sort By button to open the sort dropdown.
 */
export function openSortByDropdown(): void {
    cy.xpath(AgreementPage.sortByButton).click();
    cy.xpath(AgreementPage.sortByDropdown).should('be.visible');
}

/**
 * Sorts agreements by Agreement Name.
 */
export function sortByAgreementName(): void {
    openSortByDropdown();
    cy.xpath(AgreementPage.sortByAgreementName).click();
    
    extractAgreementNames().then((names) => {
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).to.deep.equal(sortedNames);
        cy.log('Verified agreements are sorted by name');
    });
    
    cy.log('Sorted by Agreement Name');
}

/**
 * Sorts agreements by Last Modified date.
 */
export function sortByLastModified(): void {
    openSortByDropdown();
    cy.xpath(AgreementPage.sortByLastModified).click();
    
    extractLastModifiedDates().then((dates) => {
        cy.log(`Extracted dates: ${JSON.stringify(dates)}`);
        
        const sortedDates = [...dates].sort((a, b) => {
            const [monthA, dayA, yearA] = a.split('/').map(Number);
            const [monthB, dayB, yearB] = b.split('/').map(Number);
            
            const dateA = new Date(yearA, monthA - 1, dayA);
            const dateB = new Date(yearB, monthB - 1, dayB);
            
            return dateB.getTime() - dateA.getTime();
        });
        
        cy.log(`UI order: ${JSON.stringify(dates)}`);
        cy.log(`Expected order (newest first): ${JSON.stringify(sortedDates)}`);
        
        expect(dates).to.deep.equal(sortedDates);
        cy.log('Verified agreements are sorted by last modified date (newest first)');
    });
    
    cy.log('Sorted by Last Modified');
}

/**
 * Sorts agreements by Agreement ID.
 */
export function sortByAgreementId(): void {
    openSortByDropdown();
    cy.xpath(AgreementPage.sortByAgreementId).click();
    
    cy.xpath(AgreementPage.sortByButton).should('be.visible');
    
    extractAgreementIds().then((ids) => {
        const sortedIds = [...ids].sort((a, b) => a.localeCompare(b));
        expect(ids).to.deep.equal(sortedIds);
        cy.log('Verified agreements are sorted by ID');
    });
    
    cy.log('Sorted by Agreement ID');
}

/**
 * Searches for agreements using the search bar.
 * Asserts that when results exist, the first visible agreement row contains the search term
 * in its name, ID, or last modified date.
 * @param searchTerm - The term to search for
 */
export function searchAgreements(searchTerm: string): void {
    cy.xpath(AgreementPage.searchBarInput).clear();
    cy.xpath(AgreementPage.searchBarInput).type(searchTerm);
    cy.xpath(AgreementPage.agreementTableRows).should(($rows) => {
        if ($rows.length >= 1) {
            const first = $rows[0];
            const name = Cypress.$(first).find('td:nth-child(1) button').text().trim();
            const id = Cypress.$(first).find('td:nth-child(2)').text().trim();
            const date = Cypress.$(first).find('td:nth-child(5)').text().trim();
            const term = searchTerm.toLowerCase();
            const matches =
                name.toLowerCase().includes(term) ||
                id.toLowerCase().includes(term) ||
                date.toLowerCase().includes(term);
            expect(
                matches,
                `First result should contain "${searchTerm}" in name, ID, or date (got name="${name}", id="${id}", date="${date}")`
            ).to.be.true;
        }
    });
    cy.log(`Searched for: ${searchTerm} completed`);
}

/**
 * Clears the search bar.
 */
export function clearSearch(): void {
    cy.xpath(AgreementPage.searchBarInput).clear();
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
 * Assumes dates are in the fifth column of the table.
 * @returns Promise resolving to array of date strings
 */
export function extractLastModifiedDates(): Cypress.Chainable<string[]> {
    return cy.xpath(AgreementPage.agreementTableRows).then(($rows) => {
        const dates: string[] = [];
        $rows.each((index, row) => {
            const dateElement = Cypress.$(row).find('td:nth-child(5)');
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
            expect(searchTerm).to.not.be.empty;
            cy.log(`Extracted ${names.length} names, searching for common prefix: "${searchTerm}"`);
            searchAgreements(searchTerm);
            getVisibleAgreementRows().should('exist');
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
            expect(searchTerm).to.not.be.empty;
            cy.log(`Extracted ${ids.length} IDs, searching for common prefix: "${searchTerm}"`);
            searchAgreements(searchTerm);
            getVisibleAgreementRows().should('exist');
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
            expect(searchTerm).to.not.be.empty;
            cy.log(`Extracted ${dates.length} dates, searching for: "${searchTerm}"`);
            searchAgreements(searchTerm);
            getVisibleAgreementRows().should('exist');
        } else {
            cy.log('No dates found to extract');
        }
    });
}
