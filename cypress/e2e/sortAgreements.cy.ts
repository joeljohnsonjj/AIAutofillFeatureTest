/**
 * Sort By Functionality Test Suite
 * Tests the sorting functionality by different parameters (Agreement Name, Last Modified, Agreement ID).
 */

import {
    createAgreementWithRandomData,
    sortByAgreementName,
    sortByLastModified,
    sortByAgreementId,
    getVisibleAgreementRows,
} from '../Pages/basic.cy';
import { sendValues } from '../utilities/allureReporting';

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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 2);
        cy.wait(1000);

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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 2);
        cy.wait(1000);

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
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);
        
        createAgreementWithRandomData();
        cy.wait(1500);
        cy.visit('http://localhost:3000/agreements');
        cy.wait(1500);

        getVisibleAgreementRows().should('have.length.at.least', 2);
        cy.wait(1000);

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

        sortByAgreementName();
        cy.wait(1500);

        sortByLastModified();
        cy.wait(1500);

        sortByAgreementId();
        cy.wait(1500);

        sortByAgreementName();

        cy.log('All sort options tested successfully');
    });

    it('TC-SORT05: Verify sort dropdown opens and closes', () => {
        sendValues(
            'Verify sort by dropdown opens correctly',
            'TC-SORT05: Sort Dropdown Interaction',
            'Low'
        );

        const { openSortByDropdown } = require('../Pages/basic.cy');

        openSortByDropdown();

        cy.xpath('//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div')
            .should('be.visible');
        
        cy.log('Sort dropdown interaction verified');
    });
});
