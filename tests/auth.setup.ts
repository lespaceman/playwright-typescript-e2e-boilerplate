import { test as setup, expect } from '@playwright/test';
import path from 'path';

const adminFile = path.join(__dirname, '../playwright/.auth/admin.json');
const installerFile = path.join(__dirname, '../playwright/.auth/installer.json');

/**
 * Reusable login helper. Customize the selectors below for your app's login form.
 */
async function login(page: import('@playwright/test').Page, email: string, password: string) {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  // --- Customize these selectors for your login form ---
  const emailInput = page.getByPlaceholder('Email');
  await emailInput.click();
  await emailInput.fill(email);

  // pressSequentially types character-by-character — more reliable than fill() for masked password inputs
  const passwordInput = page.getByPlaceholder('Password');
  await passwordInput.click();
  await passwordInput.pressSequentially(password, { delay: 50 });

  // Click login button and wait for navigation away from /login
  await Promise.all([
    page.waitForURL((url) => url.pathname !== '/login', { timeout: 20000 }),
    page.getByRole('button', { name: /sign in/i }).click(),
  ]);
  await page.waitForLoadState('networkidle');
}

setup('authenticate as admin', async ({ page }) => {
  await login(page, process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
  await page.context().storageState({ path: adminFile });
});

setup('authenticate as installer', async ({ page }) => {
  await login(page, process.env.INSTALLER_USERNAME!, process.env.INSTALLER_PASSWORD!);
  await page.context().storageState({ path: installerFile });
});
