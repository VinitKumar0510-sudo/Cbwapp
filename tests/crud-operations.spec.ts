import { test, expect } from '@playwright/test';

test.describe('CRUD Operations - Assignment 2', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/prisma');
  });

  test('should display database page with Prisma/Sequelize toggle', async ({ page }) => {
    // Check page title and student info
    await expect(page.locator('h1')).toContainText('Database Integration - Assignment 2');
    await expect(page.locator('text=Student: Vinit Kumar (21946017)')).toBeVisible();
    
    // Check database type selection
    await expect(page.locator('input[value="prisma"]')).toBeChecked();
    await expect(page.locator('input[value="sequelize"]')).not.toBeChecked();
  });

  test('should switch between Prisma and Sequelize', async ({ page }) => {
    // Switch to Sequelize
    await page.click('input[value="sequelize"]');
    await expect(page.locator('input[value="sequelize"]')).toBeChecked();
    await expect(page.locator('input[value="prisma"]')).not.toBeChecked();
    
    // Switch back to Prisma
    await page.click('input[value="prisma"]');
    await expect(page.locator('input[value="prisma"]')).toBeChecked();
  });

  test('should generate CRUD implementation', async ({ page }) => {
    // Click generate CRUD button
    const generateButton = page.locator('button:has-text("Generate PRISMA CRUD + Docker")');
    await expect(generateButton).toBeVisible();
    
    await generateButton.click();
    
    // Wait for generation to complete (this might take a while)
    await expect(page.locator('button:has-text("Generating...")')).toBeVisible();
    
    // Check for success message (with timeout)
    await expect(page.locator('text=✅ Generated and committed')).toBeVisible({ timeout: 30000 });
  });

  test('should execute git commands', async ({ page }) => {
    // Enter a git command
    const commandInput = page.locator('input[placeholder*="Enter git command"]');
    await commandInput.fill('git status');
    
    // Execute command
    await page.click('button:has-text("Execute")');
    
    // Check output appears
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('pre').first()).toBeVisible();
  });

  test('should save command to database', async ({ page }) => {
    // Execute a command first
    await page.fill('input[placeholder*="Enter git command"]', 'git --version');
    await page.click('button:has-text("Execute")');
    
    // Wait for output
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    
    // Save to database
    await page.click('button:has-text("Save")');
    
    // Refresh commands list
    await page.click('button:has-text("Refresh")');
    
    // Check command appears in saved list
    await expect(page.locator('text=git --version')).toBeVisible({ timeout: 5000 });
  });

  test('should perform CRUD operations on saved commands', async ({ page }) => {
    // First, save a command
    await page.fill('input[placeholder*="Enter git command"]', 'git log --oneline');
    await page.click('button:has-text("Execute")');
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Save")');
    await page.click('button:has-text("Refresh")');
    
    // Edit command
    const editButton = page.locator('button:has-text("Edit")').first();
    await editButton.click();
    
    // Update command text
    const editInput = page.locator('input[type="text"]').last();
    await editInput.clear();
    await editInput.fill('git log --oneline -5');
    
    // Save changes
    await page.click('button:has-text("Save")');
    
    // Verify update
    await expect(page.locator('text=git log --oneline -5')).toBeVisible();
    
    // Delete command
    await page.click('button:has-text("Delete")').first();
    
    // Confirm deletion
    page.on('dialog', dialog => dialog.accept());
    
    // Verify deletion (command should not be visible)
    await expect(page.locator('text=git log --oneline -5')).not.toBeVisible({ timeout: 5000 });
  });

  test('should handle database type switching with data persistence', async ({ page }) => {
    // Save command with Prisma
    await page.fill('input[placeholder*="Enter git command"]', 'prisma-test-command');
    await page.click('button:has-text("Execute")');
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Save")');
    
    // Switch to Sequelize
    await page.click('input[value="sequelize"]');
    await page.waitForTimeout(1000); // Wait for data to load
    
    // Save command with Sequelize
    await page.fill('input[placeholder*="Enter git command"]', 'sequelize-test-command');
    await page.click('button:has-text("Execute")');
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Save")');
    
    // Verify Sequelize command is saved
    await page.click('button:has-text("Refresh")');
    await expect(page.locator('text=sequelize-test-command')).toBeVisible();
    
    // Switch back to Prisma and verify data persistence
    await page.click('input[value="prisma"]');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Refresh")');
    await expect(page.locator('text=prisma-test-command')).toBeVisible();
  });

  test('should validate form inputs', async ({ page }) => {
    // Try to execute empty command
    const executeButton = page.locator('button:has-text("Execute")');
    await expect(executeButton).toBeDisabled();
    
    // Try to save without output
    const saveButton = page.locator('button:has-text("Save")');
    await expect(saveButton).toBeDisabled();
    
    // Fill command and check execute becomes enabled
    await page.fill('input[placeholder*="Enter git command"]', 'git status');
    await expect(executeButton).toBeEnabled();
  });

  test('should display loading states', async ({ page }) => {
    // Check CRUD generation loading state
    const generateButton = page.locator('button:has-text("Generate PRISMA CRUD + Docker")');
    await generateButton.click();
    
    // Should show loading state
    await expect(page.locator('button:has-text("Generating...")')).toBeVisible();
    await expect(generateButton).toBeDisabled();
  });
});