import { test as base } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { ExamplePage } from '../pages/ExamplePage';

/**
 * Custom test fixtures that extend Playwright's base test.
 * Add your page objects and custom fixtures here.
 */
type Fixtures = {
  basePage: BasePage;
  examplePage: ExamplePage;
};

export const test = base.extend<Fixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page);
    await use(examplePage);
  },
});

export { expect } from '@playwright/test';
