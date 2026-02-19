/**
 * Search Functionality Test Suite
 * Tests the search/filter functionality for agreements by ID, Name, and Last Modified date.
 * Uses dynamic data extraction from landing page for realistic testing.
 */

import {
    createAgreementWithRandomData,
    searchAgreements,
    clearSearch,
    getVisibleAgreementRows,
    extractAgreementNames,
    extractAgreementIds,
    extractLastModifiedDates,
    findCommonPrefix,
    searchByExtractedName,
    searchByExtractedId,
    searchByExtractedDate,
} from '../Pages/basic.cy';
import { sendValues } from '../utilities/allureReporting';

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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 2);
        cy.wait(1000);

        extractAgreementIds().then((ids) => {
            cy.log(`Extracted IDs: ${ids.join(', ')}`);
            const prefix = findCommonPrefix(ids);
            cy.log(`Common prefix found: "${prefix}"`);
            
            searchAgreements(prefix);
            
            getVisibleAgreementRows().should('exist');
            cy.log(`Search by ID prefix "${prefix}" completed`);
        });
        
        cy.wait(2000);
    });

    it('TC-SEARCH02: Search using first extracted Agreement ID', () => {
        sendValues(
            'Extract first Agreement ID and search for exact match',
            'TC-SEARCH02: Exact Agreement ID Search',
            'High'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractAgreementIds().then((ids) => {
            if (ids.length > 0) {
                const searchTerm = ids[0];
                cy.log(`Searching for exact ID: "${searchTerm}"`);
                searchAgreements(searchTerm);
                
                getVisibleAgreementRows().should('have.length', 1);
                cy.log('Exact ID search completed');
            }
        });
        
        cy.wait(2000);
    });

    it('TC-SEARCH03: Search by partial extracted Agreement ID', () => {
        sendValues(
            'Extract Agreement ID and search by partial match',
            'TC-SEARCH03: Partial Agreement ID Search',
            'Medium'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractAgreementIds().then((ids) => {
            if (ids.length > 0) {
                const partialId = ids[0].substring(0, Math.min(4, ids[0].length));
                cy.log(`Searching for partial ID: "${partialId}"`);
                searchAgreements(partialId);
                
                getVisibleAgreementRows().should('exist');
            }
        });
        
        cy.wait(2000);
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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 2);
        cy.wait(1000);

        extractAgreementNames().then((names) => {
            cy.log(`Extracted Names: ${names.join(', ')}`);
            const prefix = findCommonPrefix(names);
            cy.log(`Common prefix found: "${prefix}"`);
            
            searchAgreements(prefix);
            
            getVisibleAgreementRows().should('exist');
            cy.log(`Search by name prefix "${prefix}" completed`);
        });

        cy.wait(2000);
    });

    it('TC-SEARCH05: Search using first extracted Agreement Name', () => {
        sendValues(
            'Extract first Agreement Name and search for exact match',
            'TC-SEARCH05: Exact Agreement Name Search',
            'High'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractAgreementNames().then((names) => {
            if (names.length > 0) {
                const searchTerm = names[0];
                cy.log(`Searching for exact name: "${searchTerm}"`);
                searchAgreements(searchTerm);
                
                getVisibleAgreementRows().should('have.length', 1);
                cy.log('Exact name search completed');
            }
        });
        
        cy.wait(2000);
    });

    it('TC-SEARCH06: Search by partial extracted Agreement Name', () => {
        sendValues(
            'Extract Agreement Name and search by partial match',
            'TC-SEARCH06: Partial Agreement Name Search',
            'Medium'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractAgreementNames().then((names) => {
            if (names.length > 0) {
                const partialName = names[0].substring(0, Math.min(8, names[0].length));
                cy.log(`Searching for partial name: "${partialName}"`);
                searchAgreements(partialName);
                
                getVisibleAgreementRows().should('exist');
            }
        });
        
        cy.wait(2000);
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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractLastModifiedDates().then((dates) => {
            if (dates.length > 0) {
                cy.log(`Extracted dates: ${dates.join(', ')}`);
                const searchTerm = dates[0];
                cy.log(`Searching for date: "${searchTerm}"`);
                
                searchAgreements(searchTerm);
                
                getVisibleAgreementRows().should('exist');
            }
        });

        cy.wait(2000);
    });

    it('TC-SEARCH08: Search by today\'s date (dynamic)', () => {
        sendValues(
            'Create agreement and search by today\'s date',
            'TC-SEARCH08: Today\'s Date Search',
            'High'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const dateString = `${day}/${month}/${year}`;

        cy.log(`Searching for today's date: ${dateString}`);
        searchAgreements(dateString);

        getVisibleAgreementRows().should('exist');
        
        cy.wait(2000);
    });

    it('TC-SEARCH09: Extract and search multiple dates', () => {
        sendValues(
            'Extract all unique dates and verify search for each',
            'TC-SEARCH09: Multiple Date Searches',
            'Medium'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractLastModifiedDates().then((dates) => {
            const uniqueDates = [...new Set(dates)];
            cy.log(`Found ${uniqueDates.length} unique date(s): ${uniqueDates.join(', ')}`);
            
            uniqueDates.forEach((date, index) => {
                cy.log(`Search ${index + 1}: ${date}`);
                searchAgreements(date);
                cy.wait(1500);
                
                getVisibleAgreementRows().should('exist');
                cy.wait(1000);
                
                if (index < uniqueDates.length - 1) {
                    clearSearch();
                    cy.wait(1000);
                }
            });
        });
        
        cy.wait(2000);
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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 2);
        cy.wait(1000);

        cy.log('=== Searching by extracted ID ===');
        searchByExtractedId();
        cy.wait(2000);

        clearSearch();
        cy.wait(1000);

        cy.log('=== Searching by extracted Name ===');
        searchByExtractedName();
        cy.wait(2000);

        clearSearch();
        cy.wait(1000);

        cy.log('=== Searching by extracted Date ===');
        searchByExtractedDate();
        cy.wait(2000);

        cy.log('Comprehensive dynamic search completed');
    });

    it('TC-SEARCH11: Search and verify filtered count', () => {
        sendValues(
            'Extract data, search, and verify filtered results count',
            'TC-SEARCH11: Filtered Count Verification',
            'High'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().then(($initialRows) => {
            const initialCount = $initialRows.length;
            cy.log(`Initial agreement count: ${initialCount}`);
            
            extractAgreementIds().then((ids) => {
                if (ids.length > 0) {
                    const exactId = ids[0];
                    cy.log(`Searching for exact ID: "${exactId}"`);
                    
                    searchAgreements(exactId);
                    cy.wait(1500);
                    
                    getVisibleAgreementRows().should('have.length', 1);
                    cy.log('Filtered to exactly 1 agreement');
                    
                    clearSearch();
                    cy.wait(1000);
                    
                    getVisibleAgreementRows().should('have.length', initialCount);
                    cy.log(`Restored to ${initialCount} agreements after clear`);
                }
            });
        });
        
        cy.wait(2000);
    });

    it('TC-SEARCH12: Search with no results using invalid data', () => {
        sendValues(
            'Test search with term that returns no results',
            'TC-SEARCH12: No Results Search',
            'Low'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        searchAgreements('NONEXISTENT_TERM_XYZ_12345');
        cy.wait(2000);

        cy.log('No results search completed');
    });

    it('TC-SEARCH13: Case sensitivity test with extracted data', () => {
        sendValues(
            'Extract data and test case-insensitive search',
            'TC-SEARCH13: Dynamic Case Sensitivity',
            'Medium'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        extractAgreementNames().then((names) => {
            if (names.length > 0) {
                const originalName = names[0];
                const lowercase = originalName.toLowerCase();
                const uppercase = originalName.toUpperCase();
                
                cy.log(`Original: "${originalName}"`);
                cy.log(`Testing lowercase: "${lowercase}"`);
                
                searchAgreements(lowercase);
                cy.wait(1500);
                getVisibleAgreementRows().then(($lowercaseResults) => {
                    const lowercaseCount = $lowercaseResults.length;
                    
                    clearSearch();
                    cy.wait(1000);
                    
                    cy.log(`Testing uppercase: "${uppercase}"`);
                    searchAgreements(uppercase);
                    cy.wait(1500);
                    
                    getVisibleAgreementRows().should('have.length', lowercaseCount);
                    cy.log('Case sensitivity test completed');
                });
            }
        });
        
        cy.wait(2000);
    });

    it('TC-SEARCH14: Sequential searches with different extracted criteria', () => {
        sendValues(
            'Perform sequential searches using different extracted data',
            'TC-SEARCH14: Sequential Dynamic Searches',
            'Medium'
        );

        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 3);
        cy.wait(1000);

        extractAgreementIds().then((ids) => {
            extractAgreementNames().then((names) => {
                if (ids.length >= 2 && names.length >= 2) {
                    cy.log(`Search 1: ID "${ids[0]}"`);
                    searchAgreements(ids[0]);
                    cy.wait(1500);
                    
                    cy.log(`Search 2: Name "${names[0]}"`);
                    searchAgreements(names[0]);
                    cy.wait(1500);
                    
                    cy.log(`Search 3: ID "${ids[1]}"`);
                    searchAgreements(ids[1]);
                    cy.wait(1500);
                    
                    cy.log('Sequential searches completed');
                }
            });
        });
        
        cy.wait(2000);
    });
});
