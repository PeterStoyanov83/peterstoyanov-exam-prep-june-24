const { test, expect } = require('@playwright/test');

test('Check header', async ({ page }) => {
    await page.goto('http://localhost:8080'); 

    // Select the "Home" link
    const homeLink = await page.$('a[href="/"]');
    const text = await homeLink.textContent();
    expect(text.trim()).toBe('Home');
});
