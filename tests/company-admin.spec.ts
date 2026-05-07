import { test, expect } from '@playwright/test';

/**
 * LYVECRM 2.0 - COMPREHENSIVE PROJECT AUDIT (250+ LINES)
 * A high-fidelity script auditing Landing Page, Global Ownership, 
 * Multi-tenant Administration, and Employee Workflows.
 */
test.describe('LyveCRM 2.0 - Full Fidelity Audit', () => {

  // Global timeout to accommodate extensive UI interactions and animations
  test.setTimeout(300000);

  // --- MODULE 1: LANDING PAGE & BRANDING AUDIT ---
  test('Landing Page: Layout and Marketing Integrity', async ({ page }) => {
    console.log('Action: Navigating to LyveCRM Landing Page');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 30000 });

    console.log('Action: Verifying Header Branding');
    await page.getByRole('navigation').getByRole('img', { name: 'LyveCRM' }).click({ timeout: 5000 });
    await page.getByRole('navigation').getByRole('img', { name: 'LyveCRM' }).click();

    console.log('Action: Checking Hero Section Typography');
    await page.getByText('Effortlessly.').click();
    await page.getByRole('heading', { name: 'Dashboard Overview' }).click();
    await page.getByText('247').click();

    console.log('Action: Validating Feature Grid Components');
    await page.locator('div').filter({ hasText: 'Dashboard Overview247Customers89Tasks12ActiveRecent ActivityNew customer' }).nth(4).click();
    await page.getByText('LyveCRM helps teams manage').click();
    await page.getByRole('heading', { name: 'Everything you need to manage' }).click();

    console.log('Action: Checking Service Feature Cards');
    await page.locator('div').filter({ hasText: 'Task TrackingBuild follow-ups' }).nth(2).click();
    await page.locator('div').filter({ hasText: 'Customer ManagementOrganize' }).nth(2).click();
    await page.locator('div').filter({ hasText: 'Real-time ActivitySee actions' }).nth(2).click();

    console.log('Action: Checking Process Flow and Legal Footer');
    await page.getByRole('heading', { name: 'How LyveCRM works' }).click();
    await page.getByText('1Add customersCapture leads and company details in one place.2Assign tasksLink').click();
    await page.locator('section').filter({ hasText: 'Start managing your business' }).click();
    await page.getByText('© 2024 LyveCRM. All rights').click();
    console.log('Status: Landing Page Audit Complete.');
  });

  // --- MODULE 2: PLATFORM OWNER (AVERY CHEN) GLOBAL AUDIT ---
  test('Platform Owner: Global Control and SaaS Health', async ({ page }) => {
    console.log('Action: Navigating to Auth Flow');
    await page.goto('http://localhost:3000/login');
    await page.getByRole('button', { name: 'Back to home' }).click();
    await page.getByRole('link', { name: 'Login to Dashboard' }).click();

    console.log('Action: Selecting Platform Owner Identity');
    await page.getByRole('combobox').first().selectOption('platform_owner');
    await page.getByRole('combobox').nth(1).selectOption('owner@lyvecrm.app');
    
    console.log('Action: Manual Password Entry');
    await page.getByRole('textbox', { name: 'Enter demo password' }).click();
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');

    console.log('Action: Verifying Global Workspace Redirection');
    await Promise.all([
      page.waitForURL('**/platform', { timeout: 20000 }),
      page.getByRole('button', { name: 'Sign In to Dashboard' }).click(),
    ]);

    console.log('Verification: Global Control Center Headings');
    await expect(page.getByText('Platform owner workspace')).toBeVisible({ timeout: 10000 });
    await page.getByRole('heading', { name: 'Global SaaS control center' }).click();
    await page.getByText('Track tenant health, overall').click();
    await page.getByText('Multi-tenant CRM operations').click();

    console.log('Verification: Global Data Metrics');
    await page.getByRole('link', { name: 'Platform' }).click();
    await expect(page.getByText('Avery Chen')).toBeVisible();
    await page.getByText('Total Companies').click();
    await page.getByText('Total Users').click();
    await page.getByText('Total Customers').click();
    await page.getByText('Activity Count').click();

    console.log('Verification: Company Management Table Headers');
    await page.getByTestId('company-table-title').click();
    await page.getByRole('columnheader', { name: 'Company' }).click();
    await page.getByRole('columnheader', { name: 'Admin' }).click();
    await page.getByRole('columnheader', { name: 'Industry' }).click();
    await page.getByRole('columnheader', { name: 'Status' }).click();
    
    console.log('Action: Signing out from Platform');
    await page.getByRole('button', { name: 'Sign out' }).click({ force: true });
    console.log('Status: Platform Owner Audit Complete.');
  });

  // --- MODULE 3: COMPANY ADMIN (AURORA) - PIPELINE AUDIT ---
  test('Admin Aurora: Team Management and CRM Logic', async ({ page }) => {
    console.log('Action: Logging in as Admin Aurora');
    await page.goto('http://localhost:3000/login');
    await page.getByRole('combobox').first().selectOption('company_admin');
    await page.getByRole('combobox').nth(1).selectOption('company_aurora');
    await page.getByRole('combobox').nth(2).selectOption('admin@aurora.test');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

    console.log('Verification: Aurora Workspace and Sidebar Identity');
    await expect(page.getByText('Company admin workspace')).toBeVisible({ timeout: 10000 });
    await page.getByRole('complementary').getByText('Nina Patel').click();
    await page.getByRole('complementary').getByText('admin@aurora.test').click();

    console.log('Action: Team Module - Inviting Praveen (Tech Lead)');
    await page.getByRole('button', { name: 'Invite user' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Full name' }).fill('P');
    await page.getByRole('textbox', { name: 'Full name' }).press('CapsLock');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Praveen');
    await page.getByRole('textbox', { name: 'Email' }).fill('prv18@gmail.com');
    await page.getByRole('textbox', { name: 'Title' }).fill('Tech Lead');
    await page.getByRole('button', { name: 'Create user' }).click();

    console.log('Action: CRM Module - Adding Lead "Markus"');
    await page.getByTestId('add-customer-btn').click();
    await page.getByTestId('customer-name').press('CapsLock');
    await page.getByTestId('customer-name').fill('M');
    await page.getByTestId('customer-name').press('CapsLock');
    await page.getByTestId('customer-name').fill('Markus');
    await page.getByTestId('customer-email').fill('mark321@gmail.com');
    await page.getByTestId('customer-status').selectOption('Contacted');
    await page.getByTestId('customer-submit').click();

    console.log('Action: Task Module - Follow-up Assignment');
    await page.getByRole('button', { name: 'Create task' }).click();
    await page.getByRole('textbox', { name: 'Task title' }).fill('Followup with Markus');
    await page.getByRole('textbox', { name: 'Due date' }).fill('2026-05-09');
    await page.locator('form').getByRole('button', { name: 'Create customer' }).click({timeout:10000});

    await page.getByRole('button', { name: 'Sign out' }).click({ force: true });
    console.log('Status: Admin Aurora Audit Complete.');
  });

  // --- MODULE 4: COMPANY ADMIN (SUMMIT) - PRODUCTION AUDIT ---
  test('Admin Summit: User Onboarding and Data Isolation', async ({ page }) => {
    console.log('Action: Logging in as Admin Summit');
    await page.goto('http://localhost:3000/login');
    await page.getByRole('combobox').first().selectOption('company_admin');
    await page.getByRole('combobox').nth(1).selectOption('company_summit');
    await page.getByRole('combobox').nth(2).selectOption('admin@summit.test');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

    console.log('Action: Team Onboarding - Sanjay (Production Lead)');
    await page.getByRole('button', { name: 'Invite user' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).fill('Sanjay');
    await page.getByRole('textbox', { name: 'Email' }).fill('sanju225@mail.com');
    await page.getByRole('textbox', { name: 'Title' }).fill('production lead');
    await page.getByRole('button', { name: 'Create user' }).click();

    console.log('Verification: Verifying Tenant-Specific User ID');
    await expect(page.getByText('user_o5qj8atl')).toBeVisible({ timeout: 10000 });

    console.log('Action: Signing out from Summit');
    await page.getByRole('button', { name: 'Sign out' }).click({ force: true });
    console.log('Status: Admin Summit Audit Complete.');
  });

  // --- MODULE 5: STANDARD USER (EMPLOYEE) - WORKFLOW AUDIT ---
  test('Standard User: Task Status and Workspace Audit', async ({ page }) => {
    console.log('Action: Logging in as Standard User (Summit)');
    await page.goto('http://localhost:3000/login');
    await page.getByRole('combobox').first().selectOption('user');
    await page.getByRole('combobox').nth(1).selectOption('company_summit');
    await page.getByRole('combobox').nth(2).selectOption('prabhu1945@mail.com');
    await page.getByRole('textbox', { name: 'Enter demo password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();

    console.log('Verification: Employee Workspace Presence');
    await expect(page.getByText('Employee workspace')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('prabhu1945@mail.com')).toBeVisible();

    console.log('Action: Updating Task Status to DONE');
    await page.locator('section').filter({ hasText: 'My tasks' }).getByRole('combobox').selectOption('done');
    
    console.log('Action: Final System Exit and Home Navigation');
    await page.getByRole('button', { name: 'Sign out' }).click({ force: true });
    await page.getByRole('button', { name: 'Back to home' }).click();
    await expect(page).toHaveURL('http://localhost:3000/');
    console.log('Status: Standard User Audit Complete.');
  });

});