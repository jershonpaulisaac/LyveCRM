import { test, expect } from '@playwright/test';

/**
 * PLATFORM OWNER ARCHITECTURE AUDIT
 * This file handles the global oversight flow for Avery Chen.
 */
test.describe('Platform Owner - Full Lifecycle Audit', () => {

  test.beforeEach(async ({ page }) => {
    // Ensuring a fresh start on the landing page for every test
    await page.goto('http://localhost:3000/');
  });

  // --- 1. LANDING PAGE CONTENT & NAVIGATION ---
  test('Landing Page: Marketing & Branding Integrity', async ({ page }) => {
    console.log('Action: Verifying Landing Page branding and headings');
    await expect(page.getByRole('heading', { name: /Manage Customers/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('LyveCRM helps teams manage')).toBeVisible();
    
    console.log('Action: Checking Feature Components');
    await expect(page.getByRole('heading', { name: 'Everything you need to manage' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Customer Management' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Task Tracking' })).toBeVisible();

    console.log('Action: Testing Get Started redirection');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(page.getByText(/sign in to your isolated/i)).toBeVisible();
    
    console.log('Action: Returning to home via Back to Home button');
    await page.getByRole('button', { name: 'Back to home' }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
    console.log('Status: Landing page audit successful.');
  });

  // --- 2. AUTHENTICATION FLOW ---
  test('Auth: Platform Owner Sign-In', async ({ page }) => {
    console.log('Action: Navigating to login screen');
    await page.getByRole('link', { name: 'Login to Dashboard' }).click();

    console.log('Action: Selecting Platform Owner role and credentials');
    await page.getByRole('combobox').first().selectOption('platform_owner');
    await page.getByRole('combobox').nth(1).selectOption('owner@lyvecrm.app');
    
    console.log('Action: Filling demo password');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    
    console.log('Action: Submitting sign-in request');
    await Promise.all([
      page.waitForURL('**/platform', { timeout: 15000 }),
      page.getByRole('button', { name: 'Sign In to Dashboard' }).click(),
    ]);

    console.log('Verification: Dashboard Workspace label check');
    await expect(page.getByText('Platform owner workspace')).toBeVisible();
    console.log('Status: Authentication audit successful.');
  });

  // --- 3. DASHBOARD METRICS & IDENTITY ---
  test('Dashboard: Global Metrics and Identity Verification', async ({ page }) => {
    // Re-authentication for isolated test block
    await page.getByRole('link', { name: 'Login to Dashboard' }).click();
    await page.getByRole('combobox').first().selectOption('platform_owner');
    await page.getByRole('combobox').nth(1).selectOption('owner@lyvecrm.app');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

    console.log('Verification: System Status and SaaS Labels');
    await expect(page.getByRole('heading', { name: 'Global SaaS control center' })).toBeVisible();
    await expect(page.getByText('Multi-tenant CRM operations')).toBeVisible();
    
    console.log('Verification: Identity - Avery Chen Profile');
    await expect(page.getByText('Avery Chen')).toBeVisible();
    await expect(page.getByText('owner@lyvecrm.app')).toBeVisible();

    console.log('Verification: Global Analytics Counters');
    await expect(page.getByText('Total Companies')).toBeVisible();
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('Total Customers')).toBeVisible();
    await expect(page.getByText('Activity Count')).toBeVisible();
    console.log('Status: Metrics and Identity audit successful.');
  });

  // --- 4. DATA TABLES & ACTIVITY FEED ---
  test('Dashboard: Global Activity and Tenant Table Audit', async ({ page }) => {
    // Re-authentication
    await page.getByRole('link', { name: 'Login to Dashboard' }).click();
    await page.getByRole('combobox').first().selectOption('platform_owner');
    await page.getByRole('combobox').nth(1).selectOption('owner@lyvecrm.app');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

    console.log('Verification: Checking Company Management Table');
    await expect(page.getByTestId('company-table-title')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Global activity' })).toBeVisible();

    console.log('Action: Validating Recent Activity stream');
    await expect(page.locator('div').filter({ hasText: 'Leo Morgan' }).nth(4)).toBeVisible();
    console.log('Status: Table and Activity audit successful.');
  });

  // --- 5. EXIT FLOW ---
  test('Exit: Sign Out and Landing Redirection', async ({ page }) => {
    // Re-authentication
    await page.getByRole('link', { name: 'Login to Dashboard' }).click();
    await page.getByRole('combobox').first().selectOption('platform_owner');
    await page.getByRole('combobox').nth(1).selectOption('owner@lyvecrm.app');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

    console.log('Action: Triggering Sign Out');
    await page.getByRole('button', { name: 'Sign out' }).click({ force: true });

    console.log('Action: Clicking Back to Home');
    await page.getByRole('button', { name: 'Back to home' }).click();

    console.log('Verification: Checking final Landing Page state');
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('heading', { name: /Manage Customers/i })).toBeVisible();
    console.log('Status: Exit flow audit successful.');
  });

});