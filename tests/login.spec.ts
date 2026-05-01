import { test, expect } from '@playwright/test';

test('LyveCRM 2.0 - Platform Owner Flow', async ({ page }) => {
  // 1. Landing Page Verification
  await page.goto('http://localhost:3000/');
  await expect(page.getByRole('heading', { name: /Manage Customers/i })).toBeVisible();

  // 2. Test Login & Back Button Flow
  await page.getByRole('link', { name: 'Login to Dashboard' }).click();
  await expect(page.getByText('Sign in to your isolated')).toBeVisible();
  
  // Verify the new Back Button logic we added
  await page.getByRole('button', { name: 'Back to home' }).click();
  await expect(page).toHaveURL('http://localhost:3000/');
  
  // 3. Perform Login
  await page.getByRole('link', { name: 'Login to Dashboard' }).click();
  
  // Ensure we are on the login page by waiting for a specific element
  await expect(page.getByText('Sign in to your isolated')).toBeVisible();

  // Use more specific selectors to avoid ambiguity
  const roleSelect = page.getByRole('combobox').first();
  const emailSelect = page.getByRole('combobox').nth(1);

  // Wait for the dropdown to be attached and enabled before selecting
  await roleSelect.waitFor({ state: 'visible' });
  await roleSelect.selectOption({ value: 'platform_owner' });

  await emailSelect.waitFor({ state: 'visible' });
  await emailSelect.selectOption({ value: 'owner@lyvecrm.app' });

  await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
  await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

  // 4. Dashboard Assertions
  // Ensure the "System Active" badge we styled is visible
  // Use regex and ignore case to be more resilient
await expect(page.getByText(/system active/i)).toBeVisible({ timeout: 10000 });
  
  // Check for multi-tenant data isolation (Company list)
  await expect(page.getByText('Company A')).toBeVisible();
  await expect(page.getByText('Company B')).toBeVisible();

  // 5. Sign Out
  await page.getByRole('button', { name: 'Sign out' }).click();
  await expect(page.getByRole('button', { name: 'Back to home' })).toBeVisible();
});