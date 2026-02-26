/**
 * Object Repository - Centralized locators (XPaths) for the Agreements page.
 * Use these variables in tests instead of hardcoding XPaths.
 */

export const AgreementPage = {
  createAgreementButton:
    '/html/body/div/div/div[2]/div[1]/div/div[1]/button',
  agreementNameInput:
    '/html/body/div/div/main/div/div[2]/div[1]/div/div[2]/div[1]/div/input',
  agreementDateInput:
    '/html/body/div/div/main/div/div[2]/div[1]/div/div[2]/div[2]/div/input',
  agreementNotesTextarea:
    '/html/body/div/div/main/div/div[2]/div[1]/div/div[3]/div/textarea',
  responsiblePartyInput:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/input',
  maintenanceOwnerResponsibilityInput:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[4]/div/input',
  maintenanceReasoningInput:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[5]/div/input',
  responsiblePartySnippet:
  "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[1]/div/div[1]/p[2]",
  responsibilitySnippet:
  "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[1]/div/div[2]/p[2]",
  reasoningSnippet:
  "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[1]/div/div[3]/div/p[2]/span[2]",
  responsiblePartyInputSnippet:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[4]/div/input',
  maintenanceOwnerResponsibilityInputSnippet:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[5]/div/input',
  maintenanceReasoningInputSnippet:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[6]/div/input',
  saveAgreementButton:
    '/html/body/div/div/main/div/div[3]/div/button[2]',
  agreementNameDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div[1]/p',
  agreementDateDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div[2]/p',
  agreementNotesDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[2]/p',
  responsiblePartyDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/div/div[1]/p',
  maintenanceOwnerResponsibilityDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/div/div[2]/p',
  maintenanceReasoningDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[2]/div/div[3]/p',
  aiSearchInput:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[2]/div/input',
  aiSearchButton:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[2]/button',
  aiSearchSnippetsContainer:
    "//*[@id='root']/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]",
  aiSnippetAcceptButton:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[2]/button",
  aiSnippetNavigateBackButton:
  "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[1]/div[2]/div/button[1]//*[local-name()='svg']",
  aiSnippetNavigateFrontButton:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[1]/div[2]/div/button[2]//*[local-name()='svg']",
  aiSnippetViewLegalEvidenceButton:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[1]/div[2]/button",
  aiPdfViewPageNavigateButton:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div/div[1]/div[2]/div/div/button[1]",
  aiPdfViewSnippetButton:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[1]/div[2]/button",
  aiPdfViewAcceptButton:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[2]/button",
  documentsTable:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[1]/div/table",
  documentsTableRow:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[1]/div/table/tbody/tr",
  documentTableHeaderCheckbox:
    "//*[@id='root']/div/main/div/div[2]/div[2]/div/div[2]/div[1]/div/table/thead/tr/th[1]/input",
  documentTableDataCheckboxTemplate:
    "//*[@id='root']/div/main/div/div[2]/div[2]/div/div[2]/div[1]/div/table/tbody/tr[INDEX]/td[1]/input",
  documentTableAllCheckboxes:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[1]/div/table/tbody/tr/td[1]/input",
  documentTableCheckedCheckboxes:
    "/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[1]/div/table/tbody/tr/td[1]/input[@type='checkbox' and @checked]",
  
  firstAgreementCardFileName:
    '//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[1]/button',
  editAgreementButton:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[1]/button',
  deleteAgreementButton:
    '//*[@id="root"]/div/div[2]/div[2]/div[2]/button',
  deleteConfirmationCancelButton:
    '//*[@id="root"]/div/div[3]/div/div/button[1]',
  deleteConfirmationDeleteButton:
    '//*[@id="root"]/div/div[3]/div/div/button[2]',
  
  searchBarInput:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[1]/input',
  sortByButton:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/button',
  sortByDropdown:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div',
  sortByAgreementName:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[2]',
  sortByLastModified:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[1]',
  sortByAgreementId:
    '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[3]',
  
  agreementTableRows:
    '//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr',
  
  backButton:
    '//*[@id="root"]/div/div/div/button',
} as const;

/** AI search keywords used for agreement creation with AI snippet acceptance. */
export const AI_SEARCH_KEYWORDS: string[] = [
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
  "ADA Compliance",
];
