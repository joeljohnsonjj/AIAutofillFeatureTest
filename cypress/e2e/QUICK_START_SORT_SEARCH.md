# 🚀 Quick Start Guide - Sort & Search Tests

## Prerequisites
- ✅ Application running on `http://localhost:3000/agreements`
- ✅ Cypress installed and configured
- ✅ XPath plugin enabled

---

## 🏃 Run Tests Immediately

### Option 1: Run Everything (Recommended First Time)
```bash
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts,cypress/e2e/searchAgreements.cy.ts" --headed
```

### Option 2: Interactive Mode (Best for Learning)
```bash
npx cypress open
```
Then select:
- `sortAgreements.cy.ts` for sorting tests
- `searchAgreements.cy.ts` for search tests

### Option 3: Individual Suites
```bash
# Just sort tests
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts" --headed

# Just search tests
npx cypress run --spec "cypress/e2e/searchAgreements.cy.ts" --headed
```

---

## 📋 What You'll See

### Sort Tests (5 tests, ~2-3 minutes)
1. ✅ Sort by Agreement Name
2. ✅ Sort by Last Modified
3. ✅ Sort by Agreement ID
4. ✅ Sequential sorting
5. ✅ Dropdown interaction

### Search Tests (10 tests, ~4-5 minutes)
1. ✅ Search by "AGR0" (ID)
2. ✅ Partial ID search
3. ✅ Search by "Untitled" (Name)
4. ✅ Partial name search
5. ✅ Search by date (yesterday)
6. ✅ Search by date (today)
7. ✅ Multiple consecutive searches
8. ✅ Search and clear
9. ✅ No results search
10. ✅ Case sensitivity

---

## 🎯 Expected Results

All tests should **PASS** ✅ if:
- Application is running properly
- UI elements are accessible
- Sort functionality works
- Search/filter functionality works

---

## 📚 Need More Info?

### Documentation Files (in order of detail)
1. **`SORT_SEARCH_QUICK_REFERENCE.md`** ← Start here!
2. **`SORT_SEARCH_TESTS.md`** ← Detailed test info
3. **`COMPLETE_TEST_SUITE_SUMMARY.md`** ← Full overview
4. **`TEST_FLOW_DIAGRAMS.md`** ← Visual guide
5. **`WAIT_TIMES_DOCUMENTATION.md`** ← Timing details

---

## 🛠️ Customize Speed

### Make Tests Faster
Edit `cypress/Pages/basic.cy.ts` and reduce wait times:
```typescript
cy.wait(500);  // Instead of 1000
cy.wait(800);  // Instead of 1500
```

### Make Tests Slower
Edit `cypress/Pages/basic.cy.ts` and increase wait times:
```typescript
cy.wait(2000);  // Instead of 1000
cy.wait(3000);  // Instead of 1500
```

---

## 🎬 Demo Mode

For presentations or demos, use this command:
```bash
npx cypress run --spec "cypress/e2e/sortAgreements.cy.ts,cypress/e2e/searchAgreements.cy.ts" --headed --browser chrome
```

This will:
- Show the browser (--headed)
- Use Chrome for best visibility
- Run at perfect demo speed (wait times already set)

---

## 🐛 Troubleshooting

### Tests Won't Run
```bash
# Check if app is running
curl http://localhost:3000/agreements

# If not, start your app first
npm start  # or your app start command
```

### Tests Fail
1. Check browser console for errors
2. Verify XPaths are correct
3. Increase wait times
4. Run with `--headed` to see what's happening

### Tests Too Fast/Slow
- Edit wait times in `cypress/Pages/basic.cy.ts`
- See "Customize Speed" section above

---

## ✅ Success Checklist

After running tests, you should see:
- [ ] All tests passing (green checkmarks)
- [ ] Agreements being created
- [ ] Sort dropdown opening and closing
- [ ] Table reordering on sort
- [ ] Search bar filtering results
- [ ] Clear search restoring full list

---

## 📊 Test Reports

### View Results
After running tests:
```bash
# Results printed to console
# Screenshots saved to: cypress/screenshots/
# Videos saved to: cypress/videos/
```

### Allure Reports (if configured)
```bash
allure serve allure-results
```

---

## 🎓 Learn More

### Understanding the Code
```
cypress/
├── e2e/
│   ├── sortAgreements.cy.ts    ← Sort test file
│   └── searchAgreements.cy.ts  ← Search test file
├── Pages/
│   ├── basic.cy.ts              ← Reusable functions
│   └── ObjectRepository.cy.ts   ← XPath locators
└── utilities/
    └── agreementTestData.ts     ← Test data generators
```

### Key Functions to Know
```typescript
// In your tests, you can use:
sortByAgreementName()           // Sort alphabetically
sortByLastModified()            // Sort by date
sortByAgreementId()             // Sort by ID

searchAgreements("term")        // Search/filter
clearSearch()                   // Clear search
getVisibleAgreementRows()       // Get table rows
```

---

## 🚀 Next Steps

1. **Run the tests** (see "Run Tests Immediately" above)
2. **Watch what happens** (use --headed flag)
3. **Check the results** (all should pass)
4. **Read the docs** (start with Quick Reference)
5. **Customize if needed** (adjust wait times)

---

## 💡 Pro Tips

- 🎯 Run tests individually first to understand them
- 👀 Use `--headed` flag to see browser actions
- ⚡ Use interactive mode (`cypress open`) for debugging
- 📝 Check console logs if tests fail
- 🔄 Tests are independent - can run any order
- 🎨 Wait times are set for visibility - adjust as needed

---

## 📞 Quick Help

**Tests running too fast?**  
→ Increase wait times in `basic.cy.ts`

**Tests timing out?**  
→ Check app is running on localhost:3000

**XPath errors?**  
→ Check if UI changed, update `ObjectRepository.cy.ts`

**Need more detail?**  
→ Read `SORT_SEARCH_TESTS.md`

---

## ✨ You're Ready!

Run this now:
```bash
npx cypress open
```

Select `sortAgreements.cy.ts` and watch the magic! 🎉

---

*Created with ❤️ for comprehensive test coverage*
