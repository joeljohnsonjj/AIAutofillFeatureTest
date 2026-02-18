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
  saveAgreementButton:
    '/html/body/div/div/main/div/div[3]/div/button[2]',
  agreementNameDisplay:
    '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div/div[1]/div[1]/div[1]/p',
} as const;
