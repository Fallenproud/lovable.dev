import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('should load home page and navigate to pricing', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Build something Lovable/);
    
    await page.click('text=Pricing');
    await expect(page).toHaveURL('/pricing');
    await expect(page).toHaveTitle(/Pricing/);
  });

  test('should navigate to docs and blog', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Docs');
    await expect(page).toHaveURL('/docs');
    
    await page.goto('/');
    await page.click('text=Blog');
    await expect(page).toHaveURL('/blog');
  });

  test('should redirect unauthenticated users from app routes', async ({ page }) => {
    await page.goto('/app');
    await expect(page).toHaveURL('/login');
  });

  test('should allow authenticated users to access app routes', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('lovable_auth', 'true');
    });
    
    await page.goto('/app');
    await expect(page).toHaveURL('/app');
    await expect(page).toHaveTitle(/Dashboard/);
  });

  test('should navigate within app after authentication', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('lovable_auth', 'true');
    });
    
    await page.goto('/app');
    
    // Navigate to playground
    await page.click('text=Playground');
    await expect(page).toHaveURL('/app/playground');
    
    // Navigate to projects
    await page.click('text=Projects');
    await expect(page).toHaveURL('/app/projects');
  });

  test('should handle organization routes', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('lovable_auth', 'true');
    });
    
    // Valid org should work
    await page.goto('/orgs/personal');
    await expect(page).toHaveURL('/orgs/personal');
    
    // Invalid org should redirect to app
    await page.goto('/orgs/invalid-org');
    await expect(page).toHaveURL('/app');
  });

  test('should handle 404 pages', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Page not found')).toBeVisible();
  });
});
