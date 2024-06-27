const { test, expect } = require('@playwright/test');

test('Check add grades page', async ({ page }) => {
    await page.goto('http://localhost:8080/Add-Grade');

    // Check for the presence of the input fields and button
    const subjectInput = await page.$('input[name="subject"]');
    const valueInput = await page.$('input[name="value"]');
    const addButton = await page.$('button[type="submit"]');

    expect(subjectInput).toBeTruthy();
    expect(valueInput).toBeTruthy();
    expect(addButton).toBeTruthy();
});