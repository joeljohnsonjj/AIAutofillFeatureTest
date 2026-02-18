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
    cy.xpath(AgreementPage.agreementNameInput).type(agreementName);
    cy.xpath(AgreementPage.agreementDateInput).type(randomAgreementDate());
    cy.xpath(AgreementPage.agreementNotesTextarea).type(randomAgreementNotes());
    cy.xpath(AgreementPage.responsiblePartyInput).type(randomResponsibleParty());
    cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInput).type(
        randomMaintenanceOwnerResponsibility()
    );
    cy.xpath(AgreementPage.maintenanceReasoningInput).type(
        randomMaintenanceReasoning()
    );
    cy.xpath(AgreementPage.saveAgreementButton).click();
    cy.xpath(AgreementPage.agreementNameDisplay).should(
        'have.text',
        agreementName
    );
    cy.log('Agreement Successfully Created');
}
