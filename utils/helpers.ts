import { Page } from '@playwright/test';

/**
 * Generate a random string of specified length
 * @param length - The length of the string to generate
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email address
 */
export function generateRandomEmail(): string {
  return `test_${generateRandomString(8)}@example.com`;
}

/**
 * Wait for a specific amount of time (use sparingly)
 * @param ms - Milliseconds to wait
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format date to YYYY-MM-DD string
 * @param date - Date object to format
 */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayDate(): string {
  return formatDate(new Date());
}

/**
 * Scroll to bottom of page
 * @param page - Playwright page object
 */
export async function scrollToBottom(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

/**
 * Scroll to top of page
 * @param page - Playwright page object
 */
export async function scrollToTop(page: Page): Promise<void> {
  await page.evaluate(() => window.scrollTo(0, 0));
}

/**
 * Handle cookie consent dialogs that appear in iframes
 * Works with common consent frameworks (e.g., SourcePoint, OneTrust)
 * @param page - Playwright page object
 * @param options - Configuration options
 */
export async function handleCookieConsent(
  page: Page,
  options: {
    timeout?: number;
    action?: 'accept' | 'reject' | 'manage';
  } = {}
): Promise<boolean> {
  const { timeout = 5000, action = 'accept' } = options;

  try {
    // Common iframe selectors for consent dialogs
    const iframeSelectors = [
      'iframe[title*="Privacy"]',
      'iframe[title*="Consent"]',
      'iframe[title*="Cookie"]',
      'iframe[id*="sp_message"]',
    ];

    const iframeLocator = page.locator(iframeSelectors.join(', ')).first();
    const isIframeVisible = await iframeLocator.isVisible({ timeout }).catch(() => false);

    if (isIframeVisible) {
      const frame = page.frameLocator(iframeSelectors.join(', ')).first();

      const buttonName = action === 'accept' ? /accept.*all|agree|allow/i :
                         action === 'reject' ? /reject.*all|decline|deny/i :
                         /manage|settings|preferences/i;

      const button = frame.getByRole('button', { name: buttonName });
      await button.click({ timeout });

      // Wait for iframe to disappear
      await iframeLocator.waitFor({ state: 'hidden', timeout }).catch(() => {});
      return true;
    }

    // Fallback: Check for non-iframe consent dialogs
    const acceptButton = page.getByRole('button', { name: /accept.*all|agree|allow.*cookies/i });
    const isButtonVisible = await acceptButton.isVisible({ timeout: 1000 }).catch(() => false);

    if (isButtonVisible) {
      await acceptButton.click();
      return true;
    }

    return false; // No consent dialog found
  } catch {
    return false; // Consent dialog may not appear
  }
}
