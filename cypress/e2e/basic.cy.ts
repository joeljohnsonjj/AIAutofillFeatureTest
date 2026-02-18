import { createAgreementWithRandomData } from '../Pages/basic.cy';
import { sendValues } from '../utilities/allureReporting';

describe('Basic Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('Basic Agreement Creation', () => {
        sendValues('Basic Agreement Creation', 'Basic Agreement Creation without the usage of the AI model', 'Low');
        createAgreementWithRandomData();
    });
});