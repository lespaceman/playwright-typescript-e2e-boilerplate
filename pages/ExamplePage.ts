import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ExamplePage extends BasePage {
  readonly heading: Locator;
  readonly description: Locator;
  readonly learnMoreLink: Locator;

  constructor(page: import('@playwright/test').Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: 'Example Domain' });
    this.description = page.getByText('This domain is for use in documentation examples without needing permission.');
    this.learnMoreLink = page.getByRole('link', { name: 'Learn more' });
  }
}
