const { test, expect } = require('@playwright/test');

test('Check grades page', async ({ page }) => {
    await page.goto('http://localhost:8080/My-Grades');

    // Check for the presence of the list
    const list = await page.$('ul');
    expect(list).toBeTruthy();

    // Check for specific list items
    const grades = await page.$$eval('ul li', items => items.map(item => item.textContent.trim()));
    expect(grades).toContain('English (5.50)');
    expect(grades).toContain('Math (4.50)');
    expect(grades).toContain('Programming Basics (6.00)');
});

