# Cypress Framework

## Install dependencies

```bash
npm install
```

## Run Cypress

**Headless:**
```bash
npx cypress run
```

**Interactive (UI):**
```bash
npx cypress open
```

## View Allure Reports

1. Run tests so results are generated:
   ```bash
   npx cypress run
   ```

2. Generate and open the report:
   ```bash
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   ```

Install the Allure CLI if needed:
```bash
npm install -D allure-commandline
```
