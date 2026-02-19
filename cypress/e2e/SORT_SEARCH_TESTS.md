# Sort and Search Functionality Test Documentation

## Overview
Comprehensive test suites for validating sorting and search/filter functionality in the agreements management system.

---

## Test Files

### 1. `sortAgreements.cy.ts`
Tests for sorting agreements by different parameters (Agreement Name, Last Modified, Agreement ID).

### 2. `searchAgreements.cy.ts`
Tests for searching/filtering agreements by ID, Name, and Last Modified date.

---

## Sort Functionality Tests

### Sort By Options
The system provides three sorting options:
1. **Agreement Name** - Alphabetical sorting
2. **Last Modified** - Date-based sorting (newest/oldest)
3. **Agreement ID** - ID-based sorting

### Test Scenarios

#### TC-SORT01: Sort by Agreement Name
**Priority:** High  
**Flow:**
1. Create multiple agreements (minimum 2)
2. Navigate to agreements landing page
3. Click the "Sort By" button (XPath: `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/button`)
4. Click "Agreement Name" option (XPath: `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[2]`)
5. Verify agreements are sorted alphabetically

---

#### TC-SORT02: Sort by Last Modified
**Priority:** High  
**Flow:**
1. Create multiple agreements (minimum 2)
2. Navigate to agreements landing page
3. Click the "Sort By" button
4. Click "Last Modified" option (XPath: `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[1]`)
5. Verify agreements are sorted by modification date

---

#### TC-SORT03: Sort by Agreement ID
**Priority:** High  
**Flow:**
1. Create multiple agreements (minimum 2)
2. Navigate to agreements landing page
3. Click the "Sort By" button
4. Click "Agreement Id" option (XPath: `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[3]`)
5. Verify agreements are sorted by ID

---

#### TC-SORT04: Sequential Sort Testing
**Priority:** Medium  
**Flow:**
1. Create multiple agreements (minimum 3)
2. Test all sort options one after another
3. Verify each sort operation works correctly
4. Return to Agreement Name sort

---

#### TC-SORT05: Sort Dropdown Interaction
**Priority:** Low  
**Flow:**
1. Navigate to agreements landing page
2. Click "Sort By" button
3. Verify dropdown opens and displays all options
4. Verify dropdown closes after selection

---

## Search Functionality Tests

### Search Capabilities
The system supports searching/filtering by:
1. **Agreement ID** - e.g., "AGR0", "AGR001"
2. **Agreement Name** - e.g., "Untitled", "Agreement Name"
3. **Last Modified Date** - dd/mm/yyyy format

### Test Scenarios

#### Agreement ID Search Tests

##### TC-SEARCH01: Search by Agreement ID starting with "AGR0"
**Priority:** High  
**Flow:**
1. Create multiple agreements
2. Navigate to agreements landing page
3. Click search bar (XPath: `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[1]/input`)
4. Type "AGR0"
5. Verify agreements with IDs starting with "AGR0" are displayed
6. Observe filtering in action

**Expected Result:** Only agreements with IDs starting with "AGR0" are shown

---

##### TC-SEARCH02: Partial Agreement ID Search
**Priority:** Medium  
**Flow:**
1. Create agreement(s)
2. Search using partial ID "AGR"
3. Verify all agreements with "AGR" in their ID are displayed

---

#### Agreement Name Search Tests

##### TC-SEARCH03: Search by Agreement Name "Untitled"
**Priority:** High  
**Flow:**
1. Create multiple agreements
2. Navigate to agreements landing page
3. Click search bar
4. Type "Untitled"
5. Verify agreements with "Untitled" in their name are displayed
6. Observe filtering behavior

**Expected Result:** Only agreements with "Untitled" in the name are shown

---

##### TC-SEARCH04: Partial Agreement Name Search
**Priority:** Medium  
**Flow:**
1. Create agreement(s)
2. Search using partial name "Agreement"
3. Verify all agreements with "Agreement" in their name are displayed

---

#### Last Modified Date Search Tests

##### TC-SEARCH05: Search by Last Modified Date
**Priority:** High  
**Flow:**
1. Create agreement(s)
2. Navigate to agreements landing page
3. Click search bar
4. Type date in dd/mm/yyyy format (yesterday's date)
5. Verify agreements modified on that date are displayed

**Date Format:** dd/mm/yyyy (e.g., "15/02/2026")

**Expected Result:** Agreements modified on the specified date are shown

---

##### TC-SEARCH06: Search by Today's Date
**Priority:** Medium  
**Flow:**
1. Create agreement(s)
2. Search using today's date in dd/mm/yyyy format
3. Verify recently created/modified agreements are displayed

---

#### Combined Search Scenarios

##### TC-SEARCH07: Multiple Consecutive Searches
**Priority:** Medium  
**Flow:**
1. Create multiple agreements
2. Search by "AGR0" → observe results
3. Search by "Untitled" → observe results
4. Search by "Agreement" → observe results
5. Verify each search filters correctly

---

##### TC-SEARCH08: Search and Clear Functionality
**Priority:** High  
**Flow:**
1. Create multiple agreements
2. Note initial count of agreements
3. Perform search (e.g., "AGR0")
4. Observe filtered results
5. Clear search bar
6. Verify all agreements are displayed again

**Expected Result:** Clearing search restores full list

---

##### TC-SEARCH09: No Results Search
**Priority:** Low  
**Flow:**
1. Create agreement(s)
2. Search using non-existent term "NONEXISTENT_TERM_12345"
3. Verify appropriate "no results" behavior

**Expected Result:** Empty results or "no agreements found" message

---

##### TC-SEARCH10: Case Sensitivity Test
**Priority:** Low  
**Flow:**
1. Create agreement(s)
2. Search "untitled" (lowercase)
3. Observe results
4. Clear search
5. Search "UNTITLED" (uppercase)
6. Verify case-insensitive behavior

**Expected Result:** Both searches should return same results

---

## Reusable Functions (Pages/basic.cy.ts)

### Sort Functions

#### `openSortByDropdown()`
Opens the sort by dropdown menu.

#### `sortByAgreementName()`
Sorts agreements alphabetically by name.

#### `sortByLastModified()`
Sorts agreements by last modified date.

#### `sortByAgreementId()`
Sorts agreements by ID.

### Search Functions

#### `searchAgreements(searchTerm: string)`
Types a search term in the search bar and waits for filtering.
- **Parameter:** `searchTerm` - The text to search for

#### `clearSearch()`
Clears the search bar to show all agreements.

#### `getVisibleAgreementRows()`
Returns Cypress chainable for all visible agreement table rows.
- **Returns:** Cypress.Chainable<JQuery<HTMLElement>>

---

## Object Repository Updates (Pages/ObjectRepository.cy.ts)

### New Locators Added

```typescript
searchBarInput: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[1]/input'
sortByButton: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/button'
sortByAgreementName: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[2]'
sortByLastModified: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[1]'
sortByAgreementId: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[3]'
agreementTableRows: '//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr'
```

---

## Wait Times Applied

### Sort Operations
- **800ms** - After opening sort dropdown
- **1500ms** - After selecting sort option (allows reordering)
- **1000ms** - Before sorting (to see initial state)
- **1500ms** - Between consecutive sort operations

### Search Operations
- **500ms** - After clearing search bar
- **1500ms** - After typing search term (allows filtering)
- **2000ms** - After search completes (observe filtered results)
- **1000ms** - After clearing search (restore full list)

### Test Setup
- **1500ms** - Between creating agreements
- **1500ms** - After visiting landing page
- **1000ms** - Before starting sort/search operations

---

## Running the Tests

### Run sort tests only:
```bash
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts"
```

### Run search tests only:
```bash
npx cypress run --spec "cypress/e2e/searchAgreements.cy.ts"
```

### Run both sort and search tests:
```bash
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts,cypress/e2e/searchAgreements.cy.ts"
```

### Open Cypress Test Runner:
```bash
npx cypress open
```

---

## Test Data Strategy

### For Sort Tests
- Creates 2-3 agreements with random data
- Ensures sufficient data to observe sorting behavior
- Each sort test is independent

### For Search Tests
- Creates agreements with random names
- Uses dynamic date generation for date searches
- Tests partial and exact matches
- Tests case sensitivity
- Tests edge cases (no results)

---

## Expected Behaviors

### Sorting
- ✅ Dropdown opens smoothly
- ✅ Table reorders visibly after selection
- ✅ Sort persists until changed
- ✅ Multiple sort operations work consecutively

### Searching
- ✅ Filtering happens as you type (or on submit)
- ✅ Results update immediately
- ✅ Case-insensitive matching
- ✅ Partial matches work
- ✅ Clearing search restores full list
- ✅ No results handled gracefully

---

## Integration with Allure Reporting

All tests include Allure metadata:
- Test name
- Test description
- Priority level (High/Medium/Low)

Example:
```typescript
sendValues(
    'Filter agreements by Agreement ID starting with AGR0',
    'TC-SEARCH01: Search by Agreement ID',
    'High'
);
```

---

## Dependencies

- Cypress with XPath support
- Allure reporting utilities
- Application running on `http://localhost:3000/agreements`
- Random test data generators

---

## Notes

- All tests create fresh data to ensure independence
- Wait times allow clear observation of UI changes
- Tests verify both functionality and visual behavior
- Search tests cover multiple search criteria types
- Sort tests verify all available sort options
- Both suites include edge case testing
- Perfect for demos and regression testing
