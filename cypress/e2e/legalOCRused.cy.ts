import { 
    createAgreementWithAISearchAndValidation,
    createAgreementWithAISnippetAcceptance
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
            .click();
    });

    it('TC-AI01: Complete agreement creation with AI search - Manual entry (no snippet acceptance)', () => {
        sendValues(
            'Create agreement with AI search and manual field entry without accepting AI snippets',
            'TC-AI01: Agreement Creation - Manual Entry',
            'High'
        );
        
        // Execute complete agreement creation flow with manual entry
        const createdAgreementName = createAgreementWithAISearchAndValidation(AI_SEARCH_KEYWORDS);
        
        cy.log(`Test completed successfully. Created agreement with manual entry: ${createdAgreementName}`);
    });

    it('TC-AI02: Complete agreement creation with AI snippet navigation and acceptance', () => {
        sendValues(
            'Create agreement with AI search, navigate through snippets, view PDF evidence, and accept AI snippets',
            'TC-AI02: Agreement Creation - AI Snippet Acceptance',
            'High'
        );
        
        // Execute complete agreement creation flow with AI snippet acceptance
        const createdAgreementName = createAgreementWithAISnippetAcceptance(AI_SEARCH_KEYWORDS);
        
        cy.log(`Test completed successfully. Created agreement with AI snippet acceptance: ${createdAgreementName}`);
    });
});
