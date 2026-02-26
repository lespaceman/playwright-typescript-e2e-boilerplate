# Playwright TypeScript E2E Boilerplate

A ready-to-use Playwright test automation framework with TypeScript and the Page Object Model pattern.

## Quick Start

```bash
git clone git@github.com:lespaceman/playwright-typescript-e2e-boilerplate.git
cd playwright-typescript-e2e-boilerplate
npm install
npx playwright install --with-deps chromium
npm test
```

## Project Structure

```
├── playwright.config.ts    # Playwright configuration (baseURL, browsers, reporters)
├── tsconfig.json           # TypeScript configuration with path aliases
├── fixtures/
│   └── index.ts            # Custom test fixtures — extend with your page objects
├── pages/
│   ├── BasePage.ts         # Base page class with common utilities
│   └── ExamplePage.ts     # Example page object (delete for your project)
├── tests/
│   ├── example-domains.spec.ts  # Example tests (delete for your project)
│   └── navigation.spec.ts      # Example tests (delete for your project)
└── utils/
    └── helpers.ts          # Utility functions (random data, cookie consent, scroll)
```

## Conventions

- **Page Object Model**: Pages extend `BasePage`, define locators as `readonly` properties
- **Custom fixtures**: Import `test` and `expect` from `fixtures/` instead of `@playwright/test`
- **Semantic locators**: `getByRole` > `getByLabel` > `getByTestId` > text > CSS
- **No arbitrary waits**: Use Playwright's auto-wait and `expect()` assertions
- **AAA structure**: Arrange, Act, Assert in every test
- **TC-IDs in titles**: `test('TC-FEATURE-001: description', ...)`

## Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | Run with browser visible |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Run with debugger |
| `npm run test:chromium` | Run on Chromium only |
| `npm run report` | Open HTML report |
| `npm run typecheck` | TypeScript type checking |

## Included Utilities

`utils/helpers.ts` provides:

- `generateRandomString()` / `generateRandomEmail()` — test data generation
- `handleCookieConsent(page)` — dismiss cookie consent dialogs (iframe and non-iframe)
- `scrollToBottom()` / `scrollToTop()` — page scrolling

## Customizing for Your Project

1. Update `baseURL` in `playwright.config.ts`
2. Delete `pages/ExamplePage.ts` and `tests/*.spec.ts`
3. Add your page objects in `pages/`
4. Register them as fixtures in `fixtures/index.ts`
5. Write tests in `tests/`

## License

ISC
