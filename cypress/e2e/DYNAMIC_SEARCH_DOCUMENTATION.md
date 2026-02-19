# Dynamic Search Testing Documentation

## Overview
The search tests have been upgraded to use **dynamic data extraction** instead of static/hardcoded search terms. Tests now intelligently extract agreement data from the landing page and use it for realistic search validation.

---

## 🔄 What Changed?

### Before (Static)
```typescript
// Hardcoded search terms
searchAgreements('AGR0');
searchAgreements('Untitled');
searchAgreements('Agreement');
```

### After (Dynamic)
```typescript
// Dynamically extracted from actual data
extractAgreementIds().then((ids) => {
    const prefix = findCommonPrefix(ids);
    searchAgreements(prefix);
});

extractAgreementNames().then((names) => {
    searchAgreements(names[0]);
});
```

---

## 🎯 Key Benefits

### 1. **Realistic Testing**
- Uses actual data from the application
- No assumptions about naming conventions
- Adapts to any data format

### 2. **Flexible**
- Works with any agreement names (not just "Untitled")
- Works with any ID format (not just "AGR0")
- Automatically finds common patterns

### 3. **Robust**
- Tests won't fail if naming changes
- No dependency on specific test data
- Self-contained and independent

### 4. **Comprehensive**
- Tests exact matches
- Tests partial matches
- Tests common prefixes
- Tests all data types (ID, Name, Date)

---

## 🔧 New Helper Functions

### Data Extraction Functions

#### `extractAgreementNames()`
Extracts all agreement names from visible cards on the landing page.

**Returns:** `Cypress.Chainable<string[]>`

**Example:**
```typescript
extractAgreementNames().then((names) => {
    cy.log(`Found names: ${names.join(', ')}`);
    // ["Agreement Name abc123", "Agreement Name xyz789", ...]
});
```

**How it works:**
- Finds all table rows
- Extracts text from first column (name column)
- Returns array of agreement names

---

#### `extractAgreementIds()`
Extracts all agreement IDs from visible cards on the landing page.

**Returns:** `Cypress.Chainable<string[]>`

**Example:**
```typescript
extractAgreementIds().then((ids) => {
    cy.log(`Found IDs: ${ids.join(', ')}`);
    // ["AGR001", "AGR002", "AGR003", ...]
});
```

**How it works:**
- Finds all table rows
- Extracts text from second column (ID column)
- Returns array of agreement IDs

---

#### `extractLastModifiedDates()`
Extracts all last modified dates from visible cards on the landing page.

**Returns:** `Cypress.Chainable<string[]>`

**Example:**
```typescript
extractLastModifiedDates().then((dates) => {
    cy.log(`Found dates: ${dates.join(', ')}`);
    // ["19/02/2026", "18/02/2026", ...]
});
```

**How it works:**
- Finds all table rows
- Extracts text from third column (date column)
- Returns array of date strings

---

### Pattern Analysis Function

#### `findCommonPrefix(items: string[])`
Finds the common prefix from an array of strings.

**Parameters:**
- `items` - Array of strings to analyze

**Returns:** `string` - Common prefix or first 3 characters

**Example:**
```typescript
const names = ["Agreement Name abc", "Agreement Name xyz"];
const prefix = findCommonPrefix(names);
// Returns: "Agreement Name "

const ids = ["AGR001", "AGR002", "AGR003"];
const prefix = findCommonPrefix(ids);
// Returns: "AGR"
```

**How it works:**
- Compares all strings character by character
- Finds longest common starting sequence
- Falls back to first 3 characters if no common prefix

---

### Convenience Functions

#### `searchByExtractedName()`
One-step function: Extract names, find prefix, and search.

**Example:**
```typescript
searchByExtractedName();
// Automatically extracts names, finds common prefix, and searches
```

**Flow:**
1. Extracts all agreement names
2. Finds common prefix
3. Searches using that prefix
4. Logs all steps

---

#### `searchByExtractedId()`
One-step function: Extract IDs, find prefix, and search.

**Example:**
```typescript
searchByExtractedId();
// Automatically extracts IDs, finds common prefix, and searches
```

**Flow:**
1. Extracts all agreement IDs
2. Finds common prefix
3. Searches using that prefix
4. Logs all steps

---

#### `searchByExtractedDate()`
One-step function: Extract dates and search by first date.

**Example:**
```typescript
searchByExtractedDate();
// Automatically extracts dates and searches by first one
```

**Flow:**
1. Extracts all last modified dates
2. Uses first date found
3. Searches using that date
4. Logs all steps

---

## 📋 Updated Test Cases

### Agreement ID Tests (3 tests)

#### TC-SEARCH01: Dynamic Agreement ID Search (High)
- Creates 2+ agreements
- Extracts all IDs from landing page
- Finds common prefix
- Searches using prefix
- Verifies results

**Example output:**
```
Extracted IDs: AGR001, AGR002, AGR003
Common prefix found: "AGR"
Search by ID prefix "AGR" completed
```

---

#### TC-SEARCH02: Exact Agreement ID Search (High)
- Creates agreement
- Extracts first ID
- Searches for exact match
- Verifies exactly 1 result

**Example output:**
```
Searching for exact ID: "AGR001"
Exact ID search completed
✓ Filtered to exactly 1 agreement
```

---

#### TC-SEARCH03: Partial Agreement ID Search (Medium)
- Creates 2+ agreements
- Extracts ID and takes first 4 characters
- Searches using partial ID
- Verifies results

**Example output:**
```
Searching for partial ID: "AGR0"
Partial ID search completed
```

---

### Agreement Name Tests (3 tests)

#### TC-SEARCH04: Dynamic Agreement Name Search (High)
- Creates 2+ agreements
- Extracts all names
- Finds common prefix
- Searches using prefix
- Verifies results

**Example output:**
```
Extracted Names: Agreement Name abc123, Agreement Name xyz789
Common prefix found: "Agreement Name "
Search by name prefix "Agreement Name " completed
```

---

#### TC-SEARCH05: Exact Agreement Name Search (High)
- Creates agreement
- Extracts first name
- Searches for exact match
- Verifies exactly 1 result

---

#### TC-SEARCH06: Partial Agreement Name Search (Medium)
- Creates 2+ agreements
- Extracts name and takes first 8 characters
- Searches using partial name
- Verifies results

---

### Date Tests (3 tests)

#### TC-SEARCH07: Dynamic Date Search (High)
- Creates agreement
- Extracts all dates
- Searches using first date
- Verifies results

---

#### TC-SEARCH08: Today's Date Search (High)
- Creates agreement (gets today's date)
- Generates today's date dynamically
- Searches for it
- Verifies results

---

#### TC-SEARCH09: Multiple Date Searches (Medium)
- Creates 2+ agreements
- Extracts all unique dates
- Searches for each date sequentially
- Clears between searches
- Verifies each result

---

### Combined Tests (5 tests)

#### TC-SEARCH10: Comprehensive Dynamic Search (High)
- Creates 2+ agreements
- Searches by extracted ID
- Clears and searches by extracted Name
- Clears and searches by extracted Date
- Verifies all three work

**This is the most comprehensive test!**

---

#### TC-SEARCH11: Filtered Count Verification (High)
- Creates 2+ agreements
- Stores initial count
- Searches for exact ID
- Verifies filtered to 1
- Clears search
- Verifies restored to initial count

**Example output:**
```
Initial agreement count: 5
Searching for exact ID: "AGR003"
✓ Filtered to exactly 1 agreement
✓ Restored to 5 agreements after clear
```

---

#### TC-SEARCH12: No Results Search (Low)
- Creates agreement
- Searches for non-existent term
- Verifies no results behavior

---

#### TC-SEARCH13: Dynamic Case Sensitivity (Medium)
- Creates agreement
- Extracts name
- Searches lowercase version
- Counts results
- Searches uppercase version
- Verifies same count (case-insensitive)

**Example output:**
```
Original: "Agreement Name abc123"
Testing lowercase: "agreement name abc123"
Testing uppercase: "AGREEMENT NAME ABC123"
✓ Both searches return same count
```

---

#### TC-SEARCH14: Sequential Dynamic Searches (Medium)
- Creates 3+ agreements
- Extracts IDs and Names
- Performs sequential searches:
  - Search ID[0]
  - Search Name[0]
  - Search ID[1]
- Verifies each

---

## 🎬 How Dynamic Tests Run

### Typical Flow

```
1. Create Agreements
   ↓
2. Visit Landing Page
   ↓
3. Extract Data (cy.xpath → find table → parse columns)
   │
   ├─> Names: ["Agreement Name abc", "Agreement Name xyz"]
   ├─> IDs: ["AGR001", "AGR002"]
   └─> Dates: ["19/02/2026", "19/02/2026"]
   ↓
4. Process Data
   │
   ├─> Find Common Prefix: "Agreement Name "
   ├─> Find Common Prefix: "AGR"
   └─> Get First Date: "19/02/2026"
   ↓
5. Search Using Extracted Data
   ↓
6. Verify Results
   ↓
7. Log Everything
```

---

## 🔍 Example Test Execution

### Before (Static):
```typescript
it('Search by ID', () => {
    createAgreementWithRandomData();
    searchAgreements('AGR0');  // ❌ Assumes IDs start with AGR0
    // What if IDs are "AGMT001", "AGMT002"? Test fails!
});
```

### After (Dynamic):
```typescript
it('Dynamic ID Search', () => {
    createAgreementWithRandomData();
    extractAgreementIds().then((ids) => {
        const prefix = findCommonPrefix(ids);  // ✅ Finds "AGMT"
        searchAgreements(prefix);  // ✅ Works with any format!
    });
});
```

---

## 📊 Test Data Examples

### Scenario 1: Default Names
```
Extracted Names: ["Agreement Name abc123", "Agreement Name xyz789"]
Common Prefix: "Agreement Name "
Search: "Agreement Name " → ✅ Finds both
```

### Scenario 2: Custom Names
```
Extracted Names: ["Contract A", "Contract B", "Contract C"]
Common Prefix: "Contract "
Search: "Contract " → ✅ Finds all three
```

### Scenario 3: No Common Prefix
```
Extracted Names: ["Alpha", "Beta", "Gamma"]
Common Prefix: "Alp" (first 3 chars of first item)
Search: "Alp" → ✅ Finds "Alpha"
```

### Scenario 4: IDs with Different Formats
```
Extracted IDs: ["AGR001", "AGR002", "AGR003"]
Common Prefix: "AGR"
Search: "AGR" → ✅ Finds all

Extracted IDs: ["AGMT-2024-001", "AGMT-2024-002"]
Common Prefix: "AGMT-2024-"
Search: "AGMT-2024-" → ✅ Finds both
```

---

## 🎯 Assertions and Validations

### Count Validations
```typescript
// Before search
getVisibleAgreementRows().should('have.length.at.least', 2);

// After exact search
getVisibleAgreementRows().should('have.length', 1);

// After clear
getVisibleAgreementRows().should('have.length', initialCount);
```

### Existence Validations
```typescript
getVisibleAgreementRows().should('exist');
getVisibleAgreementRows().should('be.visible');
```

---

## ⚠️ Important Notes

### Table Structure Assumptions
The extraction functions assume this table structure:
- **Column 1:** Agreement Name
- **Column 2:** Agreement ID
- **Column 3:** Last Modified Date

If your table structure is different, update the column indices in:
- `extractAgreementNames()` - `td:nth-child(1)`
- `extractAgreementIds()` - `td:nth-child(2)`
- `extractLastModifiedDates()` - `td:nth-child(3)`

### Empty Results Handling
All extraction functions handle empty results gracefully:
```typescript
if (names.length > 0) {
    // Proceed with search
} else {
    cy.log('No agreement names found to extract');
}
```

---

## 🚀 Running Dynamic Tests

```bash
# Run all dynamic search tests
npx cypress run --spec "cypress/e2e/searchAgreements.cy.ts" --headed

# Run specific test
npx cypress run --spec "cypress/e2e/searchAgreements.cy.ts" --headed --grep "TC-SEARCH10"

# Interactive mode (recommended for seeing extraction)
npx cypress open
```

---

## 📈 Test Statistics

### Total Search Tests: 14
- **Agreement ID:** 3 tests
- **Agreement Name:** 3 tests  
- **Last Modified Date:** 3 tests
- **Combined Scenarios:** 5 tests

### Priority Distribution:
- **High:** 8 tests
- **Medium:** 4 tests
- **Low:** 2 tests

### Dynamic vs Static:
- **Dynamic (new):** 14 tests (100%)
- **Static (old):** 0 tests (removed)

---

## 🎓 Best Practices

### When Using Dynamic Extraction

1. **Always create multiple agreements** for prefix testing
   ```typescript
   createAgreementWithRandomData();
   cy.wait(1500);
   cy.visit('http://localhost:3000/agreements');
   createAgreementWithRandomData();
   ```

2. **Log extracted data** for debugging
   ```typescript
   extractAgreementIds().then((ids) => {
       cy.log(`Extracted IDs: ${ids.join(', ')}`);
   });
   ```

3. **Handle empty results**
   ```typescript
   if (ids.length > 0) {
       // Proceed
   }
   ```

4. **Clear between searches** to avoid conflicts
   ```typescript
   searchAgreements(term1);
   clearSearch();
   searchAgreements(term2);
   ```

---

## 💡 Pro Tips

- ✅ Tests adapt to any naming convention
- ✅ No maintenance needed when data format changes
- ✅ More realistic than hardcoded values
- ✅ Self-documenting (logs show what was extracted)
- ✅ Perfect for demos (shows actual data)

---

## 🔮 Future Enhancements

Possible additions:
- Extract and test by more columns (status, owner, etc.)
- Pattern matching validation (regex)
- Multi-criteria search (ID + Name + Date)
- Performance testing with large datasets
- Search result ordering validation

---

**Status:** ✅ Fully Dynamic, Production Ready!
