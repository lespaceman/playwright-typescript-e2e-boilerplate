# Playwright TypeScript E2E Boilerplate

A ready-to-use Playwright test automation framework with TypeScript and the Page Object Model pattern.

## Quick Start

```bash
git clone git@github.com:lespaceman/playwright-typescript-e2e-boilerplate.git
cd playwright-typescript-e2e-boilerplate
npm install
npx playwright install --with-deps chromium
cp .env.example .env   # add your credentials
npm test
```

## Authentication Setup

This boilerplate includes role-based authentication. Tests run with pre-saved sessions instead of logging in every time.

### Setup

1. Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

2. Customize the login selectors in `tests/auth.setup.ts` for your app's login form

3. Run tests — the `setup` project logs in first, then browser projects reuse the saved session:
   ```bash
   npm test
   ```

### How it works

- `tests/auth.setup.ts` logs in as `admin` and `installer`, saving cookies to `playwright/.auth/`
- Browser projects load these cookies via `storageState` in `playwright.config.ts`
- Credentials come from `.env` (gitignored) — see `.env.example` for the template
- Session files in `playwright/.auth/` are also gitignored

## Project Structure

```
├── .env.example           # Environment variable template for credentials
├── playwright.config.ts   # Playwright configuration (baseURL, browsers, reporters)
├── tsconfig.json          # TypeScript configuration with path aliases
├── fixtures/
│   └── index.ts           # Custom test fixtures — extend with your page objects
├── pages/
│   ├── BasePage.ts        # Base page class with common utilities
│   └── ExamplePage.ts    # Example page object (delete for your project)
├── tests/
│   ├── auth.setup.ts          # Authentication setup (login + save sessions)
│   ├── example-domains.spec.ts  # Example tests (delete for your project)
│   └── navigation.spec.ts      # Example tests (delete for your project)
└── utils/
    └── helpers.ts         # Utility functions (random data, cookie consent, scroll)
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
2. Copy `.env.example` to `.env` and add your credentials
3. Customize login selectors in `tests/auth.setup.ts`
4. Delete `pages/ExamplePage.ts` and `tests/*.spec.ts`
5. Add your page objects in `pages/`
6. Register them as fixtures in `fixtures/index.ts`
7. Write tests in `tests/`

## License

ISC
