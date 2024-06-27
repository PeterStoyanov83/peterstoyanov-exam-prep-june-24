const { test, expect } = require('@playwright/test');

test('Check about page', async ({ page }) => {
  await page.goto('http://localhost:8080/About');

  // Check the heading
  const heading = await page.$('h1');
  const headingText = await heading.textContent();
  expect(headingText.trim()).toBe('About');

  // Check the paragraph text
  const paragraph = await page.$('p');
  const paragraphText = await paragraph.textContent();
  expect(paragraphText.trim()).toBe('This is the Regular exam for Software Engineering and DevOps course @ SoftUni');
});
test('Check about page test', async ({ page }) => {
  await page.goto('http://localhost:8080/about');

  // Check the paragraph text
  const paragraph = await page.$('p');
  const paragraphText = await paragraph.textContent();
  expect(paragraphText.trim()).toBe('This is the Regular exam for Software Engineering and DevOps course @ SoftUni');
});
