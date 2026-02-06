import { test, expect } from '../fixtures';

/**
 * Navigation Tests - Browser navigation behavior tests
 * Tests focused on browser back/forward navigation functionality
 */
test.describe('Navigation - Browser History', () => {
  test.beforeEach(async ({ examplePage }) => {
    await examplePage.page.goto('https://example.com/');
  });

  test('TC-NAV-001: Back button returns to example.com after clicking More information link', async ({ examplePage }) => {
    // Arrange: Verify we start on example.com
    await expect(examplePage.page).toHaveURL('https://example.com/');
    await expect(examplePage.heading).toBeVisible();

    // Act: Click "More information..." link (labeled "Learn more" on the page)
    await examplePage.learnMoreLink.click();

    // Wait for navigation to complete by verifying URL change
    await expect(examplePage.page).not.toHaveURL('https://example.com/');

    // Act: Use browser back button to return
    await examplePage.page.goBack();

    // Assert: Verify we're back on example.com
    await expect(examplePage.page).toHaveURL('https://example.com/');
    await expect(examplePage.page).toHaveTitle('Example Domain');
    await expect(examplePage.heading).toBeVisible();
    await expect(examplePage.heading).toHaveText('Example Domain');
  });
});
