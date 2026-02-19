# Agreement Edit and Delete Test Scenarios

This document describes the Cypress test scenarios for editing and deleting agreements in the application.

## Test Files Overview

### 1. `editAgreement.cy.ts`
Tests for editing existing agreements with new data.

### 2. `deleteAgreement.cy.ts`
Tests for deleting agreements with both confirmation and cancellation paths.

## Test Scenarios

### Edit Agreement Tests

#### TC-EA01: Edit an existing agreement with new data
**Priority:** High  
**Flow:**
1. Create a new agreement with random data
2. Navigate to agreements landing page
3. Click on the first agreement card's file name
4. Reach the agreement preview page
5. Click the "Edit Agreement" button
6. Modify all fields with new random values
7. Click submit/save
8. Verify the updated agreement name is displayed

**XPaths Used:**
- Agreement card file name: `//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[1]/button`
- Edit button: `//*[@id="root"]/div/div[2]/div[1]/div/div[1]/button`

---

#### TC-EA02: Create and immediately edit agreement
**Priority:** Medium  
**Flow:**
1. Create a new agreement
2. Immediately edit it from the preview page (no navigation back to landing page)
3. Verify changes are saved

---

#### TC-EA03: Multiple edits on same agreement
**Priority:** Medium  
**Flow:**
1. Create a new agreement
2. Edit the agreement with new values
3. Edit the agreement again with different values
4. Verify all changes persist

---

### Delete Agreement Tests - Confirmation Path

#### TC-DA01: Delete agreement with confirmation
**Priority:** High  
**Flow:**
1. Create a new agreement
2. Navigate to agreements landing page
3. Click on the first agreement card's file name
4. Reach the agreement preview page
5. Click the "Delete Agreement" button
6. Popup overlay appears with cancel and delete options
7. Click the "Delete" button to confirm
8. Verify redirect to agreements landing page

**XPaths Used:**
- Agreement card file name: `//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[1]/button`
- Delete button: `//*[@id="root"]/div/div[2]/div[2]/div[2]/button`
- Delete confirmation button: `//*[@id="root"]/div/div[3]/div/div/button[2]`

---

#### TC-DA02: Create and immediately delete agreement
**Priority:** Medium  
**Flow:**
1. Create a new agreement
2. Immediately delete it from the preview page
3. Confirm the deletion
4. Verify redirect to agreements landing page

---

### Delete Agreement Tests - Cancellation Path

#### TC-DA03: Cancel agreement deletion
**Priority:** High  
**Flow:**
1. Create a new agreement
2. Navigate to agreements landing page
3. Click on the first agreement card's file name
4. Reach the agreement preview page
5. Click the "Delete Agreement" button
6. Popup overlay appears with cancel and delete options
7. Click the "Cancel" button
8. Verify the agreement preview page is still displayed
9. Verify the edit button is still visible (agreement wasn't deleted)

**XPaths Used:**
- Cancel button: `//*[@id="root"]/div/div[3]/div/div/button[1]`

---

#### TC-DA04: Multiple cancellation attempts
**Priority:** Medium  
**Flow:**
1. Create a new agreement
2. Attempt to delete and cancel
3. Attempt to delete again and cancel
4. Verify agreement still exists

---

#### TC-DA05: Cancel then confirm deletion
**Priority:** High  
**Flow:**
1. Create a new agreement
2. Attempt to delete and cancel
3. Attempt to delete again and confirm
4. Verify agreement is deleted and redirected to landing page

---

### Delete Agreement Tests - Combined Scenarios

#### TC-DA06: Edit then delete agreement
**Priority:** High  
**Flow:**
1. Create a new agreement
2. Edit the agreement with new values
3. Delete the agreement with confirmation
4. Verify redirect to agreements landing page

---

## Reusable Functions (Pages/basic.cy.ts)

The following reusable functions have been added:

### `navigateToFirstAgreementPreview()`
Navigates to the first agreement's preview page from the landing page.

### `editAgreementWithRandomData()`
Edits an existing agreement with new random data.
- **Prerequisite:** Must be on the agreements preview page
- Clears all input fields and enters new random values
- Saves the changes
- Verifies the updated agreement name

### `deleteAgreementWithConfirmation()`
Deletes an agreement and confirms the deletion.
- **Prerequisite:** Must be on the agreements preview page
- Clicks delete button
- Confirms deletion in the popup

### `deleteAgreementWithCancellation()`
Attempts to delete an agreement but cancels the action.
- **Prerequisite:** Must be on the agreements preview page
- Clicks delete button
- Cancels deletion in the popup
- Verifies agreement still exists (edit button is visible)

---

## Object Repository Updates (Pages/ObjectRepository.cy.ts)

The following XPath locators have been added:

```typescript
firstAgreementCardFileName: '//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr[1]/td[1]/button'
editAgreementButton: '//*[@id="root"]/div/div[2]/div[1]/div/div[1]/button'
deleteAgreementButton: '//*[@id="root"]/div/div[2]/div[2]/div[2]/button'
deleteConfirmationCancelButton: '//*[@id="root"]/div/div[3]/div/div/button[1]'
deleteConfirmationDeleteButton: '//*[@id="root"]/div/div[3]/div/div/button[2]'
```

---

## Running the Tests

### Run all edit tests:
```bash
npx cypress run --spec "cypress/e2e/editAgreement.cy.ts"
```

### Run all delete tests:
```bash
npx cypress run --spec "cypress/e2e/deleteAgreement.cy.ts"
```

### Run both edit and delete tests:
```bash
npx cypress run --spec "cypress/e2e/editAgreement.cy.ts,cypress/e2e/deleteAgreement.cy.ts"
```

### Open Cypress Test Runner:
```bash
npx cypress open
```

---

## Test Data Strategy

All tests use random data generators from `cypress/utilities/agreementTestData.ts`:
- `randomAgreementName()` - Generates unique agreement names
- `randomAgreementDate()` - Generates random dates in MM/DD/YY format
- `randomAgreementNotes()` - Generates random notes text
- `randomResponsibleParty()` - Generates random responsible party labels
- `randomMaintenanceOwnerResponsibility()` - Generates random maintenance owner responsibility text
- `randomMaintenanceReasoning()` - Generates random maintenance reasoning text

This ensures:
- No test data collisions
- Each test run is independent
- Tests can be run multiple times without cleanup

---

## Dependencies

- Cypress with XPath support
- Allure reporting utilities (for test metadata)
- Application running on `http://localhost:3000/agreements`

---

## Notes

- All tests start from the agreements landing page
- Tests use XPath locators for element selection
- Each test is independent and creates its own test data
- Delete tests cover both user paths (confirmation and cancellation)
- Tests include proper logging for debugging
- Allure reporting is integrated for test tracking and priority assignment
