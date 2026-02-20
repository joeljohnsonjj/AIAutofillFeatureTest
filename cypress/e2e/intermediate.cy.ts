/**
 * Intermediate Tests - Comprehensive Test Suite
 * Tests complete flows using all intermediate functions (edit, delete, sort, search).
 */

import {
    createAgreementWithRandomData,
    navigateToFirstAgreementPreview,
    navigateBack,
} from '../Pages/basic.cy';
import {
    editAgreementWithRandomData,
    deleteAgreementWithConfirmation,
    deleteAgreementWithCancellation,
    openSortByDropdown,
    sortByAgreementName,
    sortByLastModified,
    sortByAgreementId,
    searchByExtractedName,
    searchByExtractedId,
    searchByExtractedDate,
    searchAgreements,
    clearSearch,
    getVisibleAgreementRows,
    extractAgreementNames,
    extractAgreementIds,
    extractLastModifiedDates,
    findCommonPrefix,
} from '../Pages/intermediate.cy';
import { sendValues } from '../utilities/allureReporting';

describe('Intermediate Tests - Comprehensive Flows', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-INT01: Complete CRUD flow with all intermediate functions', () => {
        sendValues(
            'Complete flow: Create → Edit → Sort → Search → Delete',
            'TC-INT01: Complete CRUD Flow',
            'High'
        );

        createAgreementWithRandomData();
        
        editAgreementWithRandomData();
        
        navigateBack();
        
        sortByAgreementName();
        
        searchByExtractedName();
        
        clearSearch();
        
        navigateToFirstAgreementPreview();
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('Complete CRUD flow with intermediate functions completed successfully');
    });

    it('TC-INT02: Multiple agreements with sorting and searching', () => {
        sendValues(
            'Create multiple agreements, sort, and search dynamically',
            'TC-INT02: Multiple Agreements Sort & Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 3);

        sortByAgreementName();

        sortByLastModified();

        sortByAgreementId();

        searchByExtractedId();

        clearSearch();

        searchByExtractedName();

        cy.log('Multiple agreements sort and search flow completed successfully');
    });

    it('TC-INT03: Edit, cancel delete, then confirm delete', () => {
        sendValues(
            'Create → Edit → Cancel Delete → Confirm Delete',
            'TC-INT03: Edit and Delete Scenarios',
            'High'
        );

        createAgreementWithRandomData();
        
        editAgreementWithRandomData();
        
        deleteAgreementWithCancellation();
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('Edit and delete scenarios completed successfully');
    });

    it('TC-INT04: Search with exact terms after creating specific agreements', () => {
        sendValues(
            'Create agreements and search with extracted exact terms',
            'TC-INT04: Precise Search Testing',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        searchByExtractedId();

        getVisibleAgreementRows().should('exist');

        clearSearch();

        searchByExtractedName();

        getVisibleAgreementRows().should('exist');

        cy.log('Precise search testing completed successfully');
    });

    it('TC-INT05: Sequential operations with navigation', () => {
        sendValues(
            'Test back button navigation between all operations',
            'TC-INT05: Navigation Flow Testing',
            'Medium'
        );

        createAgreementWithRandomData();
        
        editAgreementWithRandomData();
        
        navigateBack();
        
        navigateToFirstAgreementPreview();
        
        navigateBack();
        
        sortByAgreementName();
        
        searchAgreements('Agreement');
        
        clearSearch();

        cy.log('Navigation flow testing completed successfully');
    });
});

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
        
        navigateBack();
        
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
        
        editAgreementWithRandomData();
        
        editAgreementWithRandomData();
        
        cy.log('Multiple edits completed successfully');
    });
});

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
        
        navigateBack();
        
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
        
        navigateBack();
        
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
        
        deleteAgreementWithCancellation();
        
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
        
        deleteAgreementWithCancellation();
        
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

        createAgreementWithRandomData();
        
        editAgreementWithRandomData();
        
        deleteAgreementWithConfirmation();
        
        cy.url().should('include', '/agreements');
        cy.log('Edit then delete flow completed successfully');
    });
});

describe('Sort By Functionality Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-SORT01: Sort by Agreement Name', () => {
        sendValues(
            'Verify sorting agreements by name works correctly',
            'TC-SORT01: Sort by Agreement Name',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        sortByAgreementName();

        getVisibleAgreementRows().should('be.visible');
        cy.log('Agreements sorted by name successfully');
    });

    it('TC-SORT02: Sort by Last Modified', () => {
        sendValues(
            'Verify sorting agreements by last modified date works correctly',
            'TC-SORT02: Sort by Last Modified',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        sortByLastModified();

        getVisibleAgreementRows().should('be.visible');
        cy.log('Agreements sorted by last modified successfully');
    });

    it('TC-SORT03: Sort by Agreement ID', () => {
        sendValues(
            'Verify sorting agreements by ID works correctly',
            'TC-SORT03: Sort by Agreement ID',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        sortByAgreementId();

        getVisibleAgreementRows().should('be.visible');
        cy.log('Agreements sorted by ID successfully');
    });

    it('TC-SORT04: Test all sort options sequentially', () => {
        sendValues(
            'Test all sorting options one after another',
            'TC-SORT04: Sequential Sort Testing',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 3);

        sortByAgreementName();

        sortByLastModified();

        sortByAgreementId();

        sortByAgreementName();

        cy.log('All sort options tested successfully');
    });

    it('TC-SORT05: Verify sort dropdown opens and closes', () => {
        sendValues(
            'Verify sort by dropdown opens correctly',
            'TC-SORT05: Sort Dropdown Interaction',
            'Low'
        );

        openSortByDropdown();

        cy.xpath('//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div')
            .should('be.visible');
        
        cy.log('Sort dropdown interaction verified');
    });
});

describe('Search Functionality Tests - Agreement ID', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-SEARCH01: Dynamic search by extracted Agreement ID prefix', () => {
        sendValues(
            'Dynamically extract Agreement IDs and search by common prefix',
            'TC-SEARCH01: Dynamic Agreement ID Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        extractAgreementIds().then((ids) => {
            cy.log(`Extracted IDs: ${ids.join(', ')}`);
            const prefix = findCommonPrefix(ids);
            cy.log(`Common prefix found: "${prefix}"`);
            
            searchAgreements(prefix);
            
            getVisibleAgreementRows().should('exist');
            cy.log(`Search by ID prefix "${prefix}" completed`);
        });
    });

    it('TC-SEARCH02: Search using first extracted Agreement ID', () => {
        sendValues(
            'Extract first Agreement ID and search for exact match',
            'TC-SEARCH02: Exact Agreement ID Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();

        extractAgreementIds().then((ids) => {
            if (ids.length > 0) {
                const searchTerm = ids[0];
                cy.log(`Searching for exact ID: "${searchTerm}"`);
                searchAgreements(searchTerm);
                
                getVisibleAgreementRows().should('have.length', 1);
                cy.log('Exact ID search completed');
            }
        });
    });

    it('TC-SEARCH03: Search by partial extracted Agreement ID', () => {
        sendValues(
            'Extract Agreement ID and search by partial match',
            'TC-SEARCH03: Partial Agreement ID Search',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        extractAgreementIds().then((ids) => {
            if (ids.length > 0) {
                const partialId = ids[0].substring(0, Math.min(4, ids[0].length));
                cy.log(`Searching for partial ID: "${partialId}"`);
                searchAgreements(partialId);
                
                getVisibleAgreementRows().should('exist');
            }
        });
    });
});

describe('Search Functionality Tests - Agreement Name', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-SEARCH04: Dynamic search by extracted Agreement Name prefix', () => {
        sendValues(
            'Dynamically extract Agreement Names and search by common prefix',
            'TC-SEARCH04: Dynamic Agreement Name Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        extractAgreementNames().then((names) => {
            cy.log(`Extracted Names: ${names.join(', ')}`);
            const prefix = findCommonPrefix(names);
            cy.log(`Common prefix found: "${prefix}"`);
            
            searchAgreements(prefix);
            
            getVisibleAgreementRows().should('exist');
            cy.log(`Search by name prefix "${prefix}" completed`);
        });
    });

    it('TC-SEARCH05: Search using first extracted Agreement Name', () => {
        sendValues(
            'Extract first Agreement Name and search for exact match',
            'TC-SEARCH05: Exact Agreement Name Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();

        extractAgreementNames().then((names) => {
            if (names.length > 0) {
                const searchTerm = names[0];
                cy.log(`Searching for exact name: "${searchTerm}"`);
                searchAgreements(searchTerm);
                
                getVisibleAgreementRows().should('have.length', 1);
                cy.log('Exact name search completed');
            }
        });
    });

    it('TC-SEARCH06: Search by partial extracted Agreement Name', () => {
        sendValues(
            'Extract Agreement Name and search by partial match',
            'TC-SEARCH06: Partial Agreement Name Search',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        extractAgreementNames().then((names) => {
            if (names.length > 0) {
                const partialName = names[0].substring(0, Math.min(8, names[0].length));
                cy.log(`Searching for partial name: "${partialName}"`);
                searchAgreements(partialName);
                
                getVisibleAgreementRows().should('exist');
            }
        });
    });
});

describe('Search Functionality Tests - Last Modified Date', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-SEARCH07: Dynamic search by extracted Last Modified date', () => {
        sendValues(
            'Dynamically extract Last Modified dates and search by first date',
            'TC-SEARCH07: Dynamic Date Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();

        extractLastModifiedDates().then((dates) => {
            if (dates.length > 0) {
                cy.log(`Extracted dates: ${dates.join(', ')}`);
                const searchTerm = dates[0];
                cy.log(`Searching for date: "${searchTerm}"`);
                
                searchAgreements(searchTerm);
                
                getVisibleAgreementRows().should('exist');
            }
        });
    });

    it('TC-SEARCH08: Search by today\'s date (dynamic)', () => {
        sendValues(
            'Create agreement and search by today\'s date',
            'TC-SEARCH08: Today\'s Date Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();

        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const dateString = `${month}/${day}/${year}`;

        cy.log(`Searching for today's date: ${dateString}`);
        searchAgreements(dateString);

        getVisibleAgreementRows().should('exist');
    });

    it('TC-SEARCH09: Extract and search multiple dates', () => {
        sendValues(
            'Extract all unique dates and verify search for each',
            'TC-SEARCH09: Multiple Date Searches',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        extractLastModifiedDates().then((dates) => {
            const uniqueDates = Array.from(new Set(dates));
            cy.log(`Found ${uniqueDates.length} unique date(s): ${uniqueDates.join(', ')}`);
            
            uniqueDates.forEach((date, index) => {
                cy.log(`Search ${index + 1}: ${date}`);
                searchAgreements(date);
                
                getVisibleAgreementRows().should('exist');
                
                if (index < uniqueDates.length - 1) {
                    clearSearch();
                }
            });
        });
    });
});

describe('Search Functionality Tests - Combined Scenarios', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-SEARCH10: Dynamic search all extracted data types', () => {
        sendValues(
            'Extract and search by ID, Name, and Date dynamically',
            'TC-SEARCH10: Comprehensive Dynamic Search',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 2);

        cy.log('=== Searching by extracted ID ===');
        searchByExtractedId();

        clearSearch();

        cy.log('=== Searching by extracted Name ===');
        searchByExtractedName();

        clearSearch();

        cy.log('=== Searching by extracted Date ===');
        searchByExtractedDate();

        cy.log('Comprehensive dynamic search completed');
    });

    it('TC-SEARCH11: Search and verify filtered count', () => {
        sendValues(
            'Extract data, search, and verify filtered results count',
            'TC-SEARCH11: Filtered Count Verification',
            'High'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().then(($initialRows) => {
            const initialCount = $initialRows.length;
            cy.log(`Initial agreement count: ${initialCount}`);
            
            extractAgreementIds().then((ids) => {
                if (ids.length > 0) {
                    const exactId = ids[0];
                    cy.log(`Searching for exact ID: "${exactId}"`);
                    
                    searchAgreements(exactId);
                    
                    getVisibleAgreementRows().should('have.length', 1);
                    cy.log('Filtered to exactly 1 agreement');
                    
                    clearSearch();
                    
                    getVisibleAgreementRows().should('have.length', initialCount);
                    cy.log(`Restored to ${initialCount} agreements after clear`);
                }
            });
        });
    });

    it('TC-SEARCH12: Search with no results using invalid data', () => {
        sendValues(
            'Test search with term that returns no results',
            'TC-SEARCH12: No Results Search',
            'Low'
        );

        createAgreementWithRandomData();
        navigateBack();

        searchAgreements('NONEXISTENT_TERM_XYZ_12345');

        cy.log('No results search completed');
    });

    it('TC-SEARCH13: Case sensitivity test with extracted data', () => {
        sendValues(
            'Extract data and test case-insensitive search',
            'TC-SEARCH13: Dynamic Case Sensitivity',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();

        extractAgreementNames().then((names) => {
            if (names.length > 0) {
                const originalName = names[0];
                const lowercase = originalName.toLowerCase();
                const uppercase = originalName.toUpperCase();
                
                cy.log(`Original: "${originalName}"`);
                cy.log(`Testing lowercase: "${lowercase}"`);
                
                searchAgreements(lowercase);
                getVisibleAgreementRows().then(($lowercaseResults) => {
                    const lowercaseCount = $lowercaseResults.length;
                    
                    clearSearch();
                    
                    cy.log(`Testing uppercase: "${uppercase}"`);
                    searchAgreements(uppercase);
                    
                    getVisibleAgreementRows().should('have.length', lowercaseCount);
                    cy.log('Case sensitivity test completed');
                });
            }
        });
    });

    it('TC-SEARCH14: Sequential searches with different extracted criteria', () => {
        sendValues(
            'Perform sequential searches using different extracted data',
            'TC-SEARCH14: Sequential Dynamic Searches',
            'Medium'
        );

        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();
        
        createAgreementWithRandomData();
        navigateBack();

        getVisibleAgreementRows().should('have.length.at.least', 3);

        extractAgreementIds().then((ids) => {
            extractAgreementNames().then((names) => {
                if (ids.length >= 2 && names.length >= 2) {
                    cy.log(`Search 1: ID "${ids[0]}"`);
                    searchAgreements(ids[0]);
                    
                    cy.log(`Search 2: Name "${names[0]}"`);
                    searchAgreements(names[0]);
                    
                    cy.log(`Search 3: ID "${ids[1]}"`);
                    searchAgreements(ids[1]);
                    
                    cy.log('Sequential searches completed');
                }
            });
        });
    });
});
