const assert = require('assert');
const fetch = require('node-fetch');

suite('Home page', function() {
  setup(async function() {
    // Clear the grades before each test
    await fetch("http://localhost:8080/clear-grades", { method: 'POST' });
  });

  test('Page title', async function() {
    let res = await fetch("http://localhost:8080/");
    let body = await res.text();
    assert.ok(body.includes("<h1>My Grades</h1>"));
  });

  test('Grades count', async function() {
    let res = await fetch("http://localhost:8080/");
    let body = await res.text();
    let gradeCount = (body.match(/<li>/g) || []).length;
    assert.strictEqual(gradeCount, 3, "Grades count should be 3");
  });
});
