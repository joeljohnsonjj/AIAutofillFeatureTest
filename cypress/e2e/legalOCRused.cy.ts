import { 
    createAgreementWithAISearchAndValidation
} from '../Pages/legalOCRused.cy';
import { sendValues } from '../utilities/allureReporting';

const AI_SEARCH_KEYWORDS = [
    "Rent",
    "Base Rent",
    "Holdover Rent",
    "Prorated Rent",
    "Payment",
    "Security Deposit",
    "Tax",
    "Real Estate Taxes",
    "Personal Property Taxes",
    "Late fee",
    "Purchase Price",
    "Insurance Premium",
    "Maintenance",
    "Repair",
    "Replacement",
    "Restoration",
    "Utilities",
    "HVAC",
    "Water",
    "Gas",
    "Electricity",
    "Sewer",
    "Roof",
    "Obligation",
    "Indemnification",
    "Default",
    "Liability",
    "Hazardous Materials",
    "Remediation",
    "Premises",
    "Alterations",
    "Signs",
    "Closing",
    "Condemnation",
    "Broker Commissions",
    "Capital Expenditures",
    "ADA Compliance"
];

describe('AI-Powered Legal Document Search Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.url().should('include', '/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button')
            .should('be.visible')
            .should('be.enabled')
            .click();
    });

    it('TC-AI01: Complete agreement creation with random document and AI search', () => {
        sendValues(
            'Create complete agreement with random document selection and AI-powered search',
            'TC-AI01: Complete Agreement Creation with AI Search',
            'High'
        );
        
        // Execute complete agreement creation flow with validation
        const createdAgreementName = createAgreementWithAISearchAndValidation(AI_SEARCH_KEYWORDS);
        
        cy.log(`Test completed successfully. Created agreement: ${createdAgreementName}`);
    });
});
