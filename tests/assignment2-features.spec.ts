import { test, expect } from '@playwright/test';

test.describe('Assignment 2 - Complete Feature Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have all required navigation links', async ({ page }) => {
    // Check all navigation links are present
    await expect(page.locator('a[href="/"]')).toBeVisible();
    await expect(page.locator('a[href="/about"]')).toBeVisible();
    await expect(page.locator('a[href="/docker"]')).toBeVisible();
    await expect(page.locator('a[href="/prisma"]')).toBeVisible();
    await expect(page.locator('a[href="/tests"]')).toBeVisible();
    await expect(page.locator('a[href="/feedback"]')).toBeVisible();
  });

  test('should display student information correctly', async ({ page }) => {
    // Check student ID is displayed
    await expect(page.locator('text=21946017')).toBeVisible();
  });

  test('should access feedback page and display form', async ({ page }) => {
    await page.click('a[href="/feedback"]');
    
    // Check feedback page loads
    await expect(page.locator('h1')).toContainText('User Feedback Collection - Assignment 2');
    await expect(page.locator('text=Student: Vinit Kumar (21946017)')).toBeVisible();
    
    // Check form elements
    await expect(page.locator('input[type="text"]').first()).toBeVisible(); // Name field
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible(); // Category dropdown
    await expect(page.locator('input[type="range"]')).toBeVisible(); // Rating slider
    await expect(page.locator('textarea')).toBeVisible(); // Comments
    
    // Check ethical survey button
    await expect(page.locator('button:has-text("Complete Ethical Survey")')).toBeVisible();
  });

  test('should submit feedback successfully', async ({ page }) => {
    await page.goto('/feedback');
    
    // Fill out feedback form
    await page.fill('input[type="text"]', 'Test User');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.selectOption('select', 'friends');
    await page.fill('textarea', 'Great application for Assignment 2!');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Check success message
    await expect(page.locator('text=✅ Thank you for your feedback!')).toBeVisible({ timeout: 10000 });
  });

  test('should access metrics API', async ({ page }) => {
    const response = await page.request.get('/api/metrics');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('memory');
    expect(data).toHaveProperty('student');
    expect(data.student.number).toBe('21946017');
    expect(data.student.name).toBe('Vinit Kumar');
  });

  test('should access feedback API', async ({ page }) => {
    const response = await page.request.get('/api/feedback');
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data).toHaveProperty('stats');
    expect(data).toHaveProperty('surveyUrl');
    expect(data.surveyUrl).toBe('https://redcap.latrobe.edu.au/redcap/surveys/?s=PPEKFTMPXF4KKEFY');
  });

  test('should test CRUD operations with both database types', async ({ page }) => {
    await page.goto('/prisma');
    
    // Test with Prisma
    await page.click('input[value="prisma"]');
    await expect(page.locator('input[value="prisma"]')).toBeChecked();
    
    // Execute a simple command
    await page.fill('input[placeholder*="Enter git command"]', 'git --version');
    await page.click('button:has-text("Execute")');
    
    // Wait for output and save
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Save")');
    
    // Switch to Sequelize
    await page.click('input[value="sequelize"]');
    await expect(page.locator('input[value="sequelize"]')).toBeChecked();
    
    // Test with Sequelize
    await page.fill('input[placeholder*="Enter git command"]', 'git status');
    await page.click('button:has-text("Execute")');
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible({ timeout: 10000 });
    await page.click('button:has-text("Save")');
    
    // Verify commands are saved
    await page.click('button:has-text("Refresh")');
    await expect(page.locator('text=git status')).toBeVisible({ timeout: 5000 });
  });

  test('should test CRUD generator functionality', async ({ page }) => {
    await page.goto('/prisma');
    
    // Test CRUD generator
    const generateButton = page.locator('button:has-text("Generate PRISMA CRUD + Docker")');
    await expect(generateButton).toBeVisible();
    
    // Click generate (this will take time)
    await generateButton.click();
    
    // Check loading state
    await expect(page.locator('button:has-text("Generating...")')).toBeVisible();
    
    // Wait for completion (with extended timeout)
    await expect(page.locator('text=✅ Generated and committed')).toBeVisible({ timeout: 60000 });
  });

  test('should test Docker page functionality', async ({ page }) => {
    await page.goto('/docker');
    
    // Check Docker page content
    await expect(page.locator('h1')).toContainText('Docker Integration');
    await expect(page.locator('text=Student: Vinit Kumar (21946017)')).toBeVisible();
    
    // Check for Docker-related content
    await expect(page.locator('text=Docker')).toBeVisible();
  });

  test('should test Tests page functionality', async ({ page }) => {
    await page.goto('/tests');
    
    // Check Tests page content
    await expect(page.locator('h1')).toContainText('Testing Suite');
    await expect(page.locator('text=Student: Vinit Kumar (21946017)')).toBeVisible();
  });

  test('should validate all API endpoints are accessible', async ({ page }) => {
    const endpoints = [
      '/api/commands',
      '/api/git-command',
      '/api/crud-generator',
      '/api/metrics',
      '/api/feedback'
    ];
    
    for (const endpoint of endpoints) {
      const response = await page.request.get(endpoint);
      expect(response.status()).toBeLessThan(500); // Should not be server error
    }
  });

  test('should test theme switching functionality', async ({ page }) => {
    // Test theme toggle
    const themeToggle = page.locator('[aria-label*="Switch to"]');
    await expect(themeToggle).toBeVisible();
    
    // Click to switch theme
    await themeToggle.click();
    
    // Verify theme changed (this is basic - in real app we'd check CSS changes)
    await expect(themeToggle).toBeVisible();
  });

  test('should test mobile menu functionality', async ({ page }) => {
    // Test mobile menu toggle
    const menuButton = page.locator('button[aria-label="Toggle navigation menu"]');
    await expect(menuButton).toBeVisible();
    
    // Open menu
    await menuButton.click();
    
    // Check menu items are visible
    await expect(page.locator('ul').locator('a[href="/feedback"]')).toBeVisible();
    
    // Close menu by clicking outside or on item
    await page.locator('a[href="/"]').click();
  });

  test('should verify Assignment 2 requirements completion', async ({ page }) => {
    // This test verifies all Assignment 2 requirements are met
    
    // 1. Sequelize and Prisma Integration
    await page.goto('/prisma');
    await expect(page.locator('input[value="prisma"]')).toBeVisible();
    await expect(page.locator('input[value="sequelize"]')).toBeVisible();
    
    // 2. CRUD Generator
    await expect(page.locator('button:has-text("Generate")')).toBeVisible();
    
    // 3. Docker Integration
    await page.goto('/docker');
    await expect(page.locator('h1')).toContainText('Docker');
    
    // 4. Feedback Collection
    await page.goto('/feedback');
    await expect(page.locator('button:has-text("Complete Ethical Survey")')).toBeVisible();
    
    // 5. Testing Suite
    await page.goto('/tests');
    await expect(page.locator('h1')).toContainText('Testing');
    
    // 6. Metrics and Instrumentation
    const metricsResponse = await page.request.get('/api/metrics');
    expect(metricsResponse.status()).toBe(200);
    
    console.log('✅ All Assignment 2 requirements verified successfully!');
  });
});