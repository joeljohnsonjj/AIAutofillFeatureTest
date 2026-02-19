# Test Flow Diagrams

## Complete Test Suite Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    CYPRESS TEST SUITE                            │
│                  Agreement Management System                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ├─────────────────────────────────┐
                              │                                 │
                    ┌─────────▼────────┐              ┌────────▼────────┐
                    │   UI TESTS       │              │   API TESTS     │
                    │   (25 tests)     │              │   (30+ tests)   │
                    └─────────┬────────┘              └─────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
    │  CRUD   │         │  SORT   │         │ SEARCH  │
    │ (10)    │         │  (5)    │         │  (10)   │
    └────┬────┘         └─────────┘         └─────────┘
         │
    ┌────┼────┬────┬────┐
    │    │    │    │    │
┌───▼┐ ┌─▼─┐ ┌▼──┐ ┌──▼┐
│ C  │ │ R │ │ U │ │ D │
│(1) │ │(0)│ │(3)│ │(6)│
└────┘ └───┘ └───┘ └───┘
```

---

## CRUD Operations Flow

### Create Agreement Flow
```
START
  │
  ├─> Visit Landing Page
  │
  ├─> Click "Create Agreement" Button
  │      │
  │      └─> Wait 1000ms
  │
  ├─> Fill Form Fields (with 800ms between each)
  │      ├─> Agreement Name
  │      ├─> Agreement Date
  │      ├─> Notes
  │      ├─> Responsible Party
  │      ├─> Maintenance Owner Responsibility
  │      └─> Maintenance Reasoning
  │
  ├─> Click "Save" Button
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Verify Agreement Created
  │
END (Agreement Preview Page)
```

### Edit Agreement Flow
```
START (Landing Page)
  │
  ├─> Click Agreement Card
  │      │
  │      └─> Wait 1500ms
  │
  ├─> [Preview Page]
  │
  ├─> Click "Edit" Button
  │      │
  │      └─> Wait 1500ms
  │
  ├─> [Edit Page]
  │
  ├─> Clear & Update All Fields (with 800ms between each)
  │      ├─> Agreement Name (new value)
  │      ├─> Agreement Date (new value)
  │      ├─> Notes (new value)
  │      ├─> Responsible Party (new value)
  │      ├─> Maintenance Owner Responsibility (new value)
  │      └─> Maintenance Reasoning (new value)
  │
  ├─> Click "Save" Button
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Verify Updates Applied
  │
END (Agreement Preview Page)
```

### Delete Agreement Flow (Confirmation)
```
START (Preview Page)
  │
  ├─> Click "Delete" Button
  │      │
  │      └─> Wait 1000ms
  │
  ├─> [Delete Popup Appears]
  │      │
  │      └─> Wait 1000ms (user review)
  │
  ├─> Click "Confirm Delete" Button
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Agreement Deleted
  │
END (Landing Page)
```

### Delete Agreement Flow (Cancellation)
```
START (Preview Page)
  │
  ├─> Click "Delete" Button
  │      │
  │      └─> Wait 1000ms
  │
  ├─> [Delete Popup Appears]
  │      │
  │      └─> Wait 1000ms (user review)
  │
  ├─> Click "Cancel" Button
  │      │
  │      └─> Wait 1000ms
  │
  ├─> Popup Closes
  │
  ├─> Verify Still on Preview Page
  │
END (Agreement Still Exists)
```

---

## Sort Functionality Flow

```
START (Landing Page with Multiple Agreements)
  │
  ├─> Click "Sort By" Button
  │      │
  │      └─> Wait 800ms
  │
  ├─> [Dropdown Opens]
  │      │
  │      ├─> Option 1: Last Modified
  │      ├─> Option 2: Agreement Name
  │      └─> Option 3: Agreement ID
  │
  ├─> Click Desired Sort Option
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Table Reorders
  │
  ├─> Verify Sort Applied
  │
END (Sorted View)
```

---

## Search Functionality Flow

### Search by Agreement ID
```
START (Landing Page)
  │
  ├─> Click Search Bar
  │      │
  │      └─> Wait 500ms
  │
  ├─> Type "AGR0"
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Table Filters
  │      │
  │      └─> Shows only matching IDs
  │
  ├─> Observe Results (Wait 2000ms)
  │
END (Filtered View)
```

### Search by Agreement Name
```
START (Landing Page)
  │
  ├─> Click Search Bar
  │      │
  │      └─> Wait 500ms
  │
  ├─> Type "Untitled"
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Table Filters
  │      │
  │      └─> Shows only matching names
  │
  ├─> Observe Results (Wait 2000ms)
  │
END (Filtered View)
```

### Search by Date
```
START (Landing Page)
  │
  ├─> Click Search Bar
  │      │
  │      └─> Wait 500ms
  │
  ├─> Type "dd/mm/yyyy"
  │      │
  │      └─> Wait 1500ms
  │
  ├─> Table Filters
  │      │
  │      └─> Shows agreements from that date
  │
  ├─> Observe Results (Wait 2000ms)
  │
END (Filtered View)
```

### Clear Search
```
START (Filtered View)
  │
  ├─> Clear Search Bar
  │      │
  │      └─> Wait 1000ms
  │
  ├─> Table Restores
  │      │
  │      └─> Shows all agreements
  │
  ├─> Verify Full List
  │
END (Unfiltered View)
```

---

## Test Execution Flow

### Single Test Execution
```
┌─────────────────────────────────┐
│  Test File (.cy.ts)             │
└────────────┬────────────────────┘
             │
   ┌─────────▼─────────┐
   │   beforeEach()    │
   │   cy.visit(...)   │
   └─────────┬─────────┘
             │
   ┌─────────▼─────────┐
   │   it('test 1')    │
   │   - Arrange       │
   │   - Act           │
   │   - Assert        │
   └─────────┬─────────┘
             │
   ┌─────────▼─────────┐
   │   beforeEach()    │  (runs again)
   │   cy.visit(...)   │
   └─────────┬─────────┘
             │
   ┌─────────▼─────────┐
   │   it('test 2')    │
   │   - Arrange       │
   │   - Act           │
   │   - Assert        │
   └─────────┬─────────┘
             │
            ...
             │
   ┌─────────▼─────────┐
   │   Test Complete   │
   │   Report Results  │
   └───────────────────┘
```

---

## Data Flow Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    TEST EXECUTION                        │
└────────────────────────┬─────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   ┌────▼─────┐    ┌────▼─────┐    ┌────▼─────┐
   │  Test    │    │  Page    │    │  Object  │
   │  Files   │───▶│ Actions  │───▶│   Repo   │
   │ (.cy.ts) │    │(basic.cy)│    │  (XPaths)│
   └──────────┘    └────┬─────┘    └──────────┘
                        │
                   ┌────▼─────┐
                   │   Test   │
                   │   Data   │
                   │(random)  │
                   └────┬─────┘
                        │
                   ┌────▼─────┐
                   │ Allure   │
                   │ Reporting│
                   └──────────┘
```

---

## Wait Time Distribution

```
Action Timeline (typical edit test):

0s    ─┬─ START
       │
1s    ─┼─ Button Click (1000ms wait)
       │
1.8s  ─┼─ First Input (800ms wait)
       │
2.6s  ─┼─ Second Input (800ms wait)
       │
3.4s  ─┼─ Third Input (800ms wait)
       │
4.2s  ─┼─ Fourth Input (800ms wait)
       │
5.0s  ─┼─ Fifth Input (800ms wait)
       │
5.8s  ─┼─ Sixth Input (800ms wait)
       │
6.8s  ─┼─ Before Submit (1000ms wait)
       │
8.3s  ─┼─ After Submit (1500ms wait)
       │
8.3s  ─┴─ VERIFY & END

Total: ~8-9 seconds per edit
```

---

## Test Priority Matrix

```
             HIGH PRIORITY
         ┌─────────────────────┐
         │  Create Agreement   │
         │  Edit Main Flow     │
         │  Delete & Confirm   │
         │  Sort All Options   │
         │  Search ID/Name     │
         └─────────────────────┘
                   │
                   │
         MEDIUM PRIORITY
         ┌─────────────────────┐
         │  Multiple Edits     │
         │  Delete Cancel      │
         │  Partial Search     │
         │  Sequential Ops     │
         └─────────────────────┘
                   │
                   │
          LOW PRIORITY
         ┌─────────────────────┐
         │  Edge Cases         │
         │  UI Interactions    │
         │  Error Scenarios    │
         └─────────────────────┘
```

---

## File Dependencies

```
editAgreement.cy.ts
     │
     ├─> basic.cy.ts
     │      ├─> ObjectRepository.cy.ts
     │      └─> agreementTestData.ts
     │
     └─> allureReporting.ts

deleteAgreement.cy.ts
     │
     ├─> basic.cy.ts
     │      ├─> ObjectRepository.cy.ts
     │      └─> agreementTestData.ts
     │
     └─> allureReporting.ts

sortAgreements.cy.ts
     │
     ├─> basic.cy.ts
     │      ├─> ObjectRepository.cy.ts
     │      └─> agreementTestData.ts
     │
     └─> allureReporting.ts

searchAgreements.cy.ts
     │
     ├─> basic.cy.ts
     │      ├─> ObjectRepository.cy.ts
     │      └─> agreementTestData.ts
     │
     └─> allureReporting.ts
```

---

## XPath Location Map

```
Landing Page Layout:
┌────────────────────────────────────────────┐
│ Header                                     │
│ ┌────────┐  ┌──────────┐  ┌────────────┐ │
│ │ Create │  │  Search  │  │  Sort By ▼ │ │
│ └────────┘  └──────────┘  └────────────┘ │
├────────────────────────────────────────────┤
│ Agreements Table                           │
│ ┌──────────────────────────────────────┐  │
│ │ Name    │ ID    │ Modified │ Actions│  │
│ ├──────────────────────────────────────┤  │
│ │ Agr 1   │ AGR01 │ Today    │  ...   │  │
│ │ Agr 2   │ AGR02 │ Today    │  ...   │  │
│ │ Agr 3   │ AGR03 │ Today    │  ...   │  │
│ └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘

Preview Page Layout:
┌────────────────────────────────────────────┐
│ ┌──────┐  ┌────────┐                      │
│ │ Edit │  │ Delete │                      │
│ └──────┘  └────────┘                      │
├────────────────────────────────────────────┤
│ Agreement Details                          │
│ ┌──────────────────────────────────────┐  │
│ │ Name: Agreement Name 1               │  │
│ │ Date: 01/01/24                       │  │
│ │ Notes: ...                           │  │
│ │ Responsible Party: ...               │  │
│ └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘

Delete Popup:
┌────────────────────────────────┐
│  Delete Agreement?             │
│                                │
│  Are you sure?                 │
│                                │
│  ┌────────┐    ┌────────┐     │
│  │ Cancel │    │ Delete │     │
│  └────────┘    └────────┘     │
└────────────────────────────────┘
```

---

## Success Indicators

```
✅ CREATE
    └─> Agreement appears in list
    └─> Preview page shows data
    └─> Name matches input

✅ EDIT
    └─> Changes saved
    └─> Preview shows updates
    └─> Old data replaced

✅ DELETE (Confirm)
    └─> Agreement removed
    └─> Redirects to landing
    └─> No longer in list

✅ DELETE (Cancel)
    └─> Still on preview page
    └─> Agreement exists
    └─> Edit button visible

✅ SORT
    └─> Table reorders
    └─> Correct parameter used
    └─> Dropdown closes

✅ SEARCH
    └─> Table filters
    └─> Matching results shown
    └─> Non-matching hidden
```

This visual guide helps understand the complete test flow! 🎯
