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
  '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div/div[2]/p',
  agreementNotesDisplay:
  '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[2]/p',
  aiSearchInput:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[2]/div/input',
  aiSearchButton:
    '/html/body/div/div/main/div/div[2]/div[2]/div/div[2]/div[2]/button',
  aiSearchSnippetsContainer:
    "//*[@id='root']/div/main/div/div[2]/div[2]/div/div[2]/div[3]/div/div[2]/div[1]",
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
} as const;
