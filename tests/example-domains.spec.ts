import { test, expect } from '../fixtures';

test.describe('Example Domain', () => {
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.page.goto('https://example.com/');
  });

  test('TC-TITLE-001: Page title matches expected value', async ({ examplePage }) => {
    await expect(examplePage.page).toHaveTitle('Example Domain');
  });

  test('TC-TITLE-002: Page displays correct heading and description', async ({ examplePage }) => {
    await expect(examplePage.heading).toBeVisible();
    await expect(examplePage.heading).toHaveText('Example Domain');

    await expect(examplePage.description).toBeVisible();
    await expect(examplePage.description).toContainText('This domain is for use in documentation examples without needing permission.');
  });

  test('TC-TITLE-003: Learn more link navigates to IANA example domains page', async ({ examplePage }) => {
    await expect(examplePage.learnMoreLink).toBeVisible();

    await examplePage.learnMoreLink.click();

    await expect(examplePage.page).toHaveURL('https://www.iana.org/help/example-domains');
    await expect(examplePage.page).toHaveTitle('Example Domains');
  });

  test('TC-LINK-001: Learn more link opens in same tab (no target="_blank")', async ({ examplePage }) => {
    // Verify the link does not have target="_blank" attribute
    const target = await examplePage.learnMoreLink.getAttribute('target');
    expect(target).toBeNull();
  });

  test('TC-SCROLL-001: No scrollable content exists on the page', async ({ examplePage }) => {
    // Verify the page content fits within the viewport without scrolling
    const scrollInfo = await examplePage.page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      // Get the total scrollable height of the document
      const scrollHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      // Get the viewport height
      const viewportHeight = window.innerHeight;

      return {
        scrollHeight,
        viewportHeight,
        isScrollable: scrollHeight > viewportHeight,
      };
    });

    // Assert that the page is not scrollable (content fits in viewport)
    expect(scrollInfo.isScrollable).toBe(false);
  });

  test('TC-NAVIGATION-001: Back button returns to example.com after clicking Learn more', async ({ examplePage }) => {
    // Arrange: Verify we start on example.com
    await expect(examplePage.page).toHaveURL('https://example.com/');
    await expect(examplePage.heading).toBeVisible();

    // Act: Click "Learn more" link to navigate away
    await examplePage.learnMoreLink.click();
    await expect(examplePage.page).toHaveURL('https://www.iana.org/help/example-domains');

    // Act: Use browser back button to return
    await examplePage.page.goBack();

    // Assert: Verify we're back on example.com
    await expect(examplePage.page).toHaveURL('https://example.com/');
    await expect(examplePage.page).toHaveTitle('Example Domain');
    await expect(examplePage.heading).toBeVisible();
    await expect(examplePage.heading).toHaveText('Example Domain');
  });
});
