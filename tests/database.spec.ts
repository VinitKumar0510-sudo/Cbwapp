import { test, expect } from '@playwright/test';

test.describe('Database Integration Tests', () => {
  test('should load prisma page', async ({ page }) => {
    await page.goto('/prisma');
    await expect(page.locator('h1')).toContainText('Database Integration');
  });

  test('should have radio buttons for database selection', async ({ page }) => {
    await page.goto('/prisma');
    
    // Check radio buttons exist
    await expect(page.locator('input[value="prisma"]')).toBeVisible();
    await expect(page.locator('input[value="sequelize"]')).toBeVisible();
  });
});