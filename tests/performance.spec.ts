import { test, expect } from '@playwright/test';

test.describe('Performance Tests - Assignment 2', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for main content to load
    await expect(page.locator('h1')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    console.log(`Homepage load time: ${loadTime}ms`);
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should load database page efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/prisma');
    
    // Wait for all key elements to load
    await expect(page.locator('h1')).toContainText('Database Integration');
    await expect(page.locator('input[value="prisma"]')).toBeVisible();
    await expect(page.locator('button:has-text("Generate")')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    console.log(`Database page load time: ${loadTime}ms`);
    
    expect(loadTime).toBeLessThan(2000);
  });

  test('should handle multiple concurrent requests', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext(),
      browser.newContext(),
      browser.newContext()
    ]);

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );

    const startTime = Date.now();

    // Load pages concurrently
    await Promise.all([
      pages[0].goto('/'),
      pages[1].goto('/prisma'),
      pages[2].goto('/about')
    ]);

    // Wait for all pages to load
    await Promise.all([
      expect(pages[0].locator('h1')).toBeVisible(),
      expect(pages[1].locator('h1')).toBeVisible(),
      expect(pages[2].locator('h1')).toBeVisible()
    ]);

    const totalTime = Date.now() - startTime;
    console.log(`Concurrent load time: ${totalTime}ms`);

    // Should handle concurrent requests efficiently
    expect(totalTime).toBeLessThan(5000);

    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });

  test('should execute git commands efficiently', async ({ page }) => {
    await page.goto('/prisma');
    
    const commandInput = page.locator('input[placeholder*="Enter git command"]');
    await commandInput.fill('git --version');
    
    const startTime = Date.now();
    await page.click('button:has-text("Execute")');
    
    // Wait for output
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible();
    
    const executionTime = Date.now() - startTime;
    console.log(`Git command execution time: ${executionTime}ms`);
    
    // Should execute within 5 seconds
    expect(executionTime).toBeLessThan(5000);
  });

  test('should handle database operations efficiently', async ({ page }) => {
    await page.goto('/prisma');
    
    // Execute and save a command
    await page.fill('input[placeholder*="Enter git command"]', 'git status');
    
    const executeStart = Date.now();
    await page.click('button:has-text("Execute")');
    await expect(page.locator('h3:has-text("Output:")')).toBeVisible();
    const executeTime = Date.now() - executeStart;
    
    const saveStart = Date.now();
    await page.click('button:has-text("Save")');
    await page.waitForTimeout(1000); // Wait for save to complete
    const saveTime = Date.now() - saveStart;
    
    const loadStart = Date.now();
    await page.click('button:has-text("Refresh")');
    await expect(page.locator('text=git status')).toBeVisible();
    const loadTime = Date.now() - loadStart;
    
    console.log(`Database operations - Execute: ${executeTime}ms, Save: ${saveTime}ms, Load: ${loadTime}ms`);
    
    // All operations should be reasonably fast
    expect(executeTime).toBeLessThan(3000);
    expect(saveTime).toBeLessThan(2000);
    expect(loadTime).toBeLessThan(2000);
  });

  test('should monitor application metrics', async ({ page }) => {
    // Navigate to metrics endpoint
    const response = await page.request.get('/api/metrics');
    expect(response.status()).toBe(200);
    
    const metrics = await response.json();
    
    // Verify metrics structure
    expect(metrics).toHaveProperty('timestamp');
    expect(metrics).toHaveProperty('memory');
    expect(metrics).toHaveProperty('uptime');
    expect(metrics).toHaveProperty('requests');
    expect(metrics).toHaveProperty('system');
    
    // Verify system metrics
    expect(metrics.system).toHaveProperty('nodeVersion');
    expect(metrics.system).toHaveProperty('platform');
    expect(metrics.system).toHaveProperty('pid');
    
    console.log('Application Metrics:', {
      uptime: metrics.uptime,
      memoryUsed: `${Math.round(metrics.memory.heapUsed / 1024 / 1024)} MB`,
      requests: metrics.requests,
      errors: metrics.errors
    });
  });

  test('should handle memory usage efficiently', async ({ page }) => {
    // Get initial metrics
    const initialResponse = await page.request.get('/api/metrics');
    const initialMetrics = await initialResponse.json();
    const initialMemory = initialMetrics.memory.heapUsed;
    
    // Perform multiple operations
    await page.goto('/prisma');
    
    for (let i = 0; i < 5; i++) {
      await page.fill('input[placeholder*="Enter git command"]', `git log --oneline -${i + 1}`);
      await page.click('button:has-text("Execute")');
      await expect(page.locator('h3:has-text("Output:")')).toBeVisible();
      await page.click('button:has-text("Save")');
      await page.waitForTimeout(500);
    }
    
    // Get final metrics
    const finalResponse = await page.request.get('/api/metrics');
    const finalMetrics = await finalResponse.json();
    const finalMemory = finalMetrics.memory.heapUsed;
    
    const memoryIncrease = finalMemory - initialMemory;
    const memoryIncreaseMB = memoryIncrease / 1024 / 1024;
    
    console.log(`Memory increase after operations: ${memoryIncreaseMB.toFixed(2)} MB`);
    
    // Memory increase should be reasonable (less than 50MB for these operations)
    expect(memoryIncreaseMB).toBeLessThan(50);
  });
});