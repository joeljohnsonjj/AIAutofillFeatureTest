import { AgreementPage } from '../Pages/ObjectRepository.cy';
import {
    randomAgreementName,
    randomAgreementDate,
    randomAgreementNotes,
    randomResponsibleParty,
    randomMaintenanceOwnerResponsibility,
    randomMaintenanceReasoning,
} from '../utilities/agreementTestData';

describe('Basic Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('Basic Agreement Creation', () => {
        const agreementName = randomAgreementName();
        cy.xpath(AgreementPage.createAgreementButton).click();
        cy.xpath(AgreementPage.agreementNameInput).type(agreementName);
        cy.xpath(AgreementPage.agreementDateInput).type(randomAgreementDate());
        cy.xpath(AgreementPage.agreementNotesTextarea).type(randomAgreementNotes());
        cy.xpath(AgreementPage.responsiblePartyInput).type(randomResponsibleParty());
        cy.xpath(AgreementPage.maintenanceOwnerResponsibilityInput).type(randomMaintenanceOwnerResponsibility());
        cy.xpath(AgreementPage.maintenanceReasoningInput).type(randomMaintenanceReasoning());
        cy.xpath(AgreementPage.saveAgreementButton).click();
        cy.xpath(AgreementPage.agreementNameDisplay).should('have.text', agreementName);
        cy.log('Agreement Successfully Created');
    });
});