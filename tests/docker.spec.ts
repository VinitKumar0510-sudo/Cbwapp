import { test, expect } from '@playwright/test';

test.describe('Docker Integration Tests', () => {
  test('should display docker page', async ({ page }) => {
    await page.goto('/docker');
    
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have navigation working', async ({ page }) => {
    await page.goto('/');
    
    // Check home page loads
    await expect(page.locator('h1')).toBeVisible();
  });
});