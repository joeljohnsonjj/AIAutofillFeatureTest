# Test Execution Speed Control

## Overview
All test files have been updated with `cy.wait()` commands to slow down execution and make each action clearly visible for demonstration and debugging purposes.

## Wait Times Applied

### Page Actions (basic.cy.ts)

#### `createAgreementWithRandomData()`
- **1000ms** - After clicking "Create Agreement" button (page load)
- **800ms** - After each form input (6 inputs total)
- **1000ms** - Before clicking "Save" button
- **1500ms** - After submission (processing time)

#### `navigateToFirstAgreementPreview()`
- **1000ms** - Before clicking agreement card
- **1500ms** - After clicking (page transition)

#### `editAgreementWithRandomData()`
- **1500ms** - After clicking "Edit" button (page load)
- **800ms** - After each form input clear and type (6 inputs)
- **1000ms** - Before clicking "Save" button
- **1500ms** - After submission (processing time)

#### `deleteAgreementWithConfirmation()`
- **1000ms** - After clicking "Delete" button (popup appears)
- **1000ms** - Before clicking "Confirm Delete" (user review time)
- **1500ms** - After confirmation (deletion processing)

#### `deleteAgreementWithCancellation()`
- **1000ms** - After clicking "Delete" button (popup appears)
- **1000ms** - Before clicking "Cancel" (user review time)
- **1000ms** - After cancellation (popup closes)

### Test Files

#### editAgreement.cy.ts
- **1500ms** - Between create and navigation
- **1500ms** - After visiting landing page
- **1500ms** - Between consecutive edits

#### deleteAgreement.cy.ts
- **1500ms** - Between create and navigation
- **1500ms** - After visiting landing page
- **1500ms** - Between consecutive delete attempts
- **1500ms** - Between edit and delete operations

## Total Approximate Execution Times

### Single Agreement Creation: ~8 seconds
- Button click + page load: 1s
- 6 form inputs: 4.8s
- Save button: 1s
- Processing: 1.5s

### Edit Agreement: ~9 seconds
- Edit button click: 1.5s
- 6 form inputs (clear + type): 4.8s
- Save button: 1s
- Processing: 1.5s

### Delete with Confirmation: ~3.5 seconds
- Delete button: 1s
- Review popup: 1s
- Processing: 1.5s

### Delete with Cancellation: ~3 seconds
- Delete button: 1s
- Review popup: 1s
- Cancel processing: 1s

## Full Test Scenarios

### TC-EA01 (Create → Navigate → Edit): ~20-22 seconds
### TC-EA02 (Create → Edit): ~18-20 seconds
### TC-EA03 (Create → Edit × 2): ~28-30 seconds
### TC-DA01 (Create → Navigate → Delete): ~14-16 seconds
### TC-DA03 (Create → Navigate → Cancel): ~13-15 seconds
### TC-DA05 (Create → Cancel → Confirm): ~16-18 seconds
### TC-DA06 (Create → Edit → Delete): ~22-24 seconds

## Adjusting Wait Times

To modify the speed, edit the values in `cypress/Pages/basic.cy.ts`:

```typescript
// Make tests faster (reduce wait times)
cy.wait(500);  // Instead of 1000

// Make tests slower (increase wait times)
cy.wait(2000); // Instead of 1000
```

## Benefits

✅ **Clear visibility** - Each action is clearly visible to observers
✅ **Better debugging** - Easier to spot issues during test execution
✅ **Demo-friendly** - Perfect for presentations and stakeholder reviews
✅ **User perspective** - Mimics actual user interaction speeds
✅ **Screenshot opportunities** - Time to capture states between actions

## Notes

- Wait times are in milliseconds (1000ms = 1 second)
- Longer waits after page transitions ensure full page load
- Shorter waits after form inputs provide smooth data entry visualization
- Popup interactions have adequate time for visual confirmation
- All waits are strategically placed to balance visibility with test efficiency
