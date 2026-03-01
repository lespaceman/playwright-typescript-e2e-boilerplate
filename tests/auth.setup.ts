import { test as setup, expect, type Page } from '@playwright/test';
import path from 'path';

const adminFile = path.join(__dirname, '../playwright/.auth/admin.json');
const installerFile = path.join(__dirname, '../playwright/.auth/installer.json');

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. See .env.example`);
  }
  return value;
}

/**
 * Reusable login helper. Customize the selectors below for your app's login form.
 */
async function login(page: Page, email: string, password: string) {
  await page.goto('/login');

  // --- Customize these selectors for your login form ---
  const emailInput = page.getByPlaceholder('Email');
  await emailInput.click();
  await emailInput.fill(email);

  // pressSequentially types character-by-character — more reliable than fill() for masked password inputs
  const passwordInput = page.getByPlaceholder('Password');
  await passwordInput.click();
  await passwordInput.pressSequentially(password, { delay: 50 });

  // Click login button and wait for navigation away from /login
  await page.getByRole('button', { name: /sign in/i }).click();
  await page.waitForURL((url) => url.pathname !== '/login', { timeout: 20000 });
}

setup('authenticate as admin', async ({ page }) => {
  await login(page, requireEnv('ADMIN_USERNAME'), requireEnv('ADMIN_PASSWORD'));
  await expect(page).not.toHaveURL(/\/login/);
  await page.context().storageState({ path: adminFile });
});

setup('authenticate as installer', async ({ page }) => {
  await login(page, requireEnv('INSTALLER_USERNAME'), requireEnv('INSTALLER_PASSWORD'));
  await expect(page).not.toHaveURL(/\/login/);
  await page.context().storageState({ path: installerFile });
});
