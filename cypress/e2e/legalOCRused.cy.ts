import { 
    createAgreementWithRandomDataAndAISearch,
    selectRandomDocumentCheckbox,
    selectMultipleRandomDocumentCheckboxes,
    selectAllDocuments,
    getDocumentRowCount,
    performAISearchWithValidation
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

function getRandomSearchKeyword(): string {
    const randomIndex = Math.floor(Math.random() * AI_SEARCH_KEYWORDS.length);
    return AI_SEARCH_KEYWORDS[randomIndex];
}

function getMultipleRandomKeywords(count: number): string[] {
    const selectedKeywords = new Set<string>();
    while (selectedKeywords.size < Math.min(count, AI_SEARCH_KEYWORDS.length)) {
        selectedKeywords.add(getRandomSearchKeyword());
    }
    return Array.from(selectedKeywords);
}

describe('AI-Powered Agreement Creation Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
    });

    it('TC-AI01: Basic Agreement Creation with AI Search', () => {
        sendValues(
            'Create agreement using AI search feature with random document selection',
            'TC-AI01: Basic AI Agreement Creation',
            'High'
        );
        
        createAgreementWithRandomDataAndAISearch();
        
        cy.log('AI-powered agreement creation completed successfully');
    });
});

describe('Document Selection Tests - Single Document with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS01: Single random document with random keyword search', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select single random document and search for: ${keyword}`,
            'TC-DS01: Single Document - Random Keyword',
            'High'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        selectRandomDocumentCheckbox();
        
        performAISearchWithValidation(keyword);
        
        cy.log(`Single document search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - Multiple Documents (2) with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS02: Multiple documents (2) with random keyword', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select 2 random documents and search for: ${keyword}`,
            'TC-DS02: Multiple Documents (2) - Random Keyword',
            'High'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        getDocumentRowCount().then((count) => {
            const numberOfDocumentsToSelect = Math.min(2, count);
            
            selectMultipleRandomDocumentCheckboxes(numberOfDocumentsToSelect);
            
            performAISearchWithValidation(keyword);
        });
        
        cy.log(`Multiple documents (2) search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - Multiple Documents (3) with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS03: Multiple documents (3) with random keyword', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select 3 random documents and search for: ${keyword}`,
            'TC-DS03: Multiple Documents (3) - Random Keyword',
            'High'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        getDocumentRowCount().then((count) => {
            const numberOfDocumentsToSelect = Math.min(3, count);
            
            selectMultipleRandomDocumentCheckboxes(numberOfDocumentsToSelect);
            
            performAISearchWithValidation(keyword);
        });
        
        cy.log(`Multiple documents (3) search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - Multiple Documents (4) with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS04: Multiple documents (4) with random keyword', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select 4 random documents and search for: ${keyword}`,
            'TC-DS04: Multiple Documents (4) - Random Keyword',
            'High'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        getDocumentRowCount().then((count) => {
            const numberOfDocumentsToSelect = Math.min(4, count);
            
            selectMultipleRandomDocumentCheckboxes(numberOfDocumentsToSelect);
            
            performAISearchWithValidation(keyword);
        });
        
        cy.log(`Multiple documents (4) search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - Multiple Documents (5) with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS05: Multiple documents (5) with random keyword', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select 5 random documents and search for: ${keyword}`,
            'TC-DS05: Multiple Documents (5) - Random Keyword',
            'High'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        getDocumentRowCount().then((count) => {
            const numberOfDocumentsToSelect = Math.min(5, count);
            
            selectMultipleRandomDocumentCheckboxes(numberOfDocumentsToSelect);
            
            performAISearchWithValidation(keyword);
        });
        
        cy.log(`Multiple documents (5) search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - All Documents with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS06: All documents with random keyword', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select all documents and search for: ${keyword}`,
            'TC-DS06: All Documents - Random Keyword',
            'High'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        selectAllDocuments();
        
        performAISearchWithValidation(keyword);
        
        cy.log(`All documents search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - Half Documents with Random Keyword', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS07: Half documents with random keyword', () => {
        const keyword = getRandomSearchKeyword();
        
        sendValues(
            `Select half of documents and search for: ${keyword}`,
            'TC-DS07: Half Documents - Random Keyword',
            'Medium'
        );
        
        cy.log(`Using random keyword: ${keyword}`);
        
        getDocumentRowCount().then((count) => {
            const halfCount = Math.max(1, Math.floor(count / 2));
            
            selectMultipleRandomDocumentCheckboxes(halfCount);
            
            performAISearchWithValidation(keyword);
        });
        
        cy.log(`Half documents search for ${keyword} completed`);
    });
});

describe('Document Selection Tests - Combined Multiple Keywords', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/agreements');
        cy.xpath('/html/body/div/div/div[2]/div[1]/div/div[1]/button').click();
    });

    it('TC-DS08: Single document with 2 combined random keywords', () => {
        const keywords = getMultipleRandomKeywords(2);
        const combinedQuery = keywords.join(' and ');
        
        sendValues(
            `Select single document and search with combined keywords: ${combinedQuery}`,
            'TC-DS08: Single Document - 2 Combined Keywords',
            'High'
        );
        
        cy.log(`Using random keywords: ${combinedQuery}`);
        
        selectRandomDocumentCheckbox();
        
        performAISearchWithValidation(combinedQuery);
        
        cy.log(`Single document search with combined keywords completed`);
    });

    it('TC-DS09: Multiple documents (3) with 2 combined random keywords', () => {
        const keywords = getMultipleRandomKeywords(2);
        const combinedQuery = keywords.join(' and ');
        
        sendValues(
            `Select 3 documents and search with combined keywords: ${combinedQuery}`,
            'TC-DS09: Multiple Documents (3) - 2 Combined Keywords',
            'Medium'
        );
        
        cy.log(`Using random keywords: ${combinedQuery}`);
        
        getDocumentRowCount().then((count) => {
            const numberOfDocumentsToSelect = Math.min(3, count);
            
            selectMultipleRandomDocumentCheckboxes(numberOfDocumentsToSelect);
            
            performAISearchWithValidation(combinedQuery);
        });
        
        cy.log(`Multiple documents search with combined keywords completed`);
    });

    it('TC-DS10: All documents with 3 combined random keywords', () => {
        const keywords = getMultipleRandomKeywords(3);
        const combinedQuery = keywords.join(', ');
        
        sendValues(
            `Select all documents and search with combined keywords: ${combinedQuery}`,
            'TC-DS10: All Documents - 3 Combined Keywords',
            'High'
        );
        
        cy.log(`Using random keywords: ${combinedQuery}`);
        
        selectAllDocuments();
        
        performAISearchWithValidation(combinedQuery);
        
        cy.log(`All documents search with combined keywords completed`);
    });

    it('TC-DS11: Half documents with 3 combined random keywords', () => {
        const keywords = getMultipleRandomKeywords(3);
        const combinedQuery = keywords.join(', ');
        
        sendValues(
            `Select half documents and search with combined keywords: ${combinedQuery}`,
            'TC-DS11: Half Documents - 3 Combined Keywords',
            'Medium'
        );
        
        cy.log(`Using random keywords: ${combinedQuery}`);
        
        getDocumentRowCount().then((count) => {
            const halfCount = Math.max(1, Math.floor(count / 2));
            
            selectMultipleRandomDocumentCheckboxes(halfCount);
            
            performAISearchWithValidation(combinedQuery);
        });
        
        cy.log(`Half documents search with combined keywords completed`);
    });

    it('TC-DS12: Multiple documents (4) with 4 combined random keywords', () => {
        const keywords = getMultipleRandomKeywords(4);
        const combinedQuery = keywords.join(', ');
        
        sendValues(
            `Select 4 documents and search with combined keywords: ${combinedQuery}`,
            'TC-DS12: Multiple Documents (4) - 4 Combined Keywords',
            'High'
        );
        
        cy.log(`Using random keywords: ${combinedQuery}`);
        
        getDocumentRowCount().then((count) => {
            const numberOfDocumentsToSelect = Math.min(4, count);
            
            selectMultipleRandomDocumentCheckboxes(numberOfDocumentsToSelect);
            
            performAISearchWithValidation(combinedQuery);
        });
        
        cy.log(`Multiple documents search with combined keywords completed`);
    });
});
