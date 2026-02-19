# Quick Reference: Sort & Search Tests

## Sort By Tests (sortAgreements.cy.ts)

### Available Sort Options
| Sort Option | XPath | Button Position |
|------------|-------|----------------|
| **Last Modified** | `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[1]` | Button 1 |
| **Agreement Name** | `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[2]` | Button 2 |
| **Agreement ID** | `//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/div[2]/div/button[3]` | Button 3 |

### Quick Test
```bash
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts" --headed
```

---

## Search Tests (searchAgreements.cy.ts)

### Search Criteria Examples
| Search Type | Example Input | What It Filters |
|------------|---------------|-----------------|
| **Agreement ID** | `AGR0` | IDs starting with "AGR0" |
| **Agreement ID** | `AGR` | All IDs containing "AGR" |
| **Agreement Name** | `Untitled` | Names containing "Untitled" |
| **Agreement Name** | `Agreement` | Names containing "Agreement" |
| **Last Modified** | `19/02/2026` | Modified on Feb 19, 2026 |
| **Last Modified** | `18/02/2026` | Modified on Feb 18, 2026 |

### Quick Test
```bash
npx cypress run --spec "cypress/e2e/searchAgreements.cy.ts" --headed
```

---

## Test Coverage

### Sort Tests: 5 Test Cases
- ✅ TC-SORT01: Sort by Agreement Name
- ✅ TC-SORT02: Sort by Last Modified
- ✅ TC-SORT03: Sort by Agreement ID
- ✅ TC-SORT04: Sequential Sort Testing
- ✅ TC-SORT05: Sort Dropdown Interaction

### Search Tests: 10 Test Cases
- ✅ TC-SEARCH01: Search by Agreement ID "AGR0"
- ✅ TC-SEARCH02: Partial Agreement ID Search
- ✅ TC-SEARCH03: Search by Agreement Name "Untitled"
- ✅ TC-SEARCH04: Partial Agreement Name Search
- ✅ TC-SEARCH05: Search by Last Modified Date
- ✅ TC-SEARCH06: Search by Today's Date
- ✅ TC-SEARCH07: Multiple Consecutive Searches
- ✅ TC-SEARCH08: Search and Clear Functionality
- ✅ TC-SEARCH09: No Results Search
- ✅ TC-SEARCH10: Case Sensitivity Test

---

## Reusable Functions

### Sort Functions
```typescript
sortByAgreementName()  // Sorts alphabetically
sortByLastModified()   // Sorts by date
sortByAgreementId()    // Sorts by ID
openSortByDropdown()   // Opens sort menu
```

### Search Functions
```typescript
searchAgreements(searchTerm)  // Search for term
clearSearch()                 // Clear search bar
getVisibleAgreementRows()     // Get all visible rows
```

---

## Running All Tests

### Individual Suites
```bash
# Sort tests only
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts"

# Search tests only
npx cypress run --spec "cypress/e2e/searchAgreements.cy.ts"
```

### Combined
```bash
# Both suites
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts,cypress/e2e/searchAgreements.cy.ts"
```

### All Agreement Tests
```bash
# All test files (including create, edit, delete, sort, search)
npx cypress run --spec "cypress/e2e/*.cy.ts"
```

---

## Key XPaths

```typescript
// Search Bar
searchBarInput: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[1]/input'

// Sort Button
sortByButton: '//*[@id="root"]/div/div[2]/div[1]/div/div[2]/div[2]/button'

// Sort Options
sortByLastModified: '.../button[1]'
sortByAgreementName: '.../button[2]'
sortByAgreementId: '.../button[3]'

// Table Rows
agreementTableRows: '//*[@id="root"]/div/div[2]/div[2]/div[1]/table/tbody/tr'
```

---

## Timing Summary

| Action | Wait Time | Purpose |
|--------|-----------|---------|
| Open sort dropdown | 800ms | Menu animation |
| After sort selection | 1500ms | Table reordering |
| After typing search | 1500ms | Filtering |
| Observe filtered results | 2000ms | Visual verification |
| Clear search | 1000ms | Restore view |
| Between operations | 1500ms | Separation clarity |

---

## Test Execution Time Estimates

| Test | Approx. Duration |
|------|------------------|
| TC-SORT01 | ~25-30 seconds |
| TC-SORT02 | ~25-30 seconds |
| TC-SORT03 | ~25-30 seconds |
| TC-SORT04 | ~40-45 seconds |
| TC-SORT05 | ~5-8 seconds |
| TC-SEARCH01 | ~25-30 seconds |
| TC-SEARCH03 | ~25-30 seconds |
| TC-SEARCH05 | ~20-25 seconds |
| TC-SEARCH07 | ~35-40 seconds |
| TC-SEARCH08 | ~30-35 seconds |

**Total Suite Runtime:**
- Sort Tests: ~2-3 minutes
- Search Tests: ~4-5 minutes
- Combined: ~6-8 minutes

---

## Tips

💡 **For Demos:** Use `--headed` flag to see browser
💡 **For CI/CD:** Use default headless mode
💡 **For Debugging:** Add more `cy.wait()` calls
💡 **For Speed:** Reduce wait times in basic.cy.ts

---

## Common Issues

**Issue:** Sort doesn't appear to work  
**Solution:** Ensure multiple agreements exist (minimum 2)

**Issue:** Search returns no results  
**Solution:** Check search term matches existing data

**Issue:** Tests run too fast  
**Solution:** Increase wait times in basic.cy.ts

**Issue:** XPath not found  
**Solution:** Verify app is running on localhost:3000

---

## Next Steps

After running these tests, consider:
1. 📊 Verify sort order is correct (ascending/descending)
2. 🔍 Test search with special characters
3. ⚡ Test performance with large datasets
4. 🎨 Test UI behavior during sort/search
5. 🐛 Test edge cases and error scenarios
