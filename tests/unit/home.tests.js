const assert = require('assert');
const fetch = require('node-fetch');

const initializeGrades = async () => {
  await fetch("http://localhost:8080/clear-grades", { method: 'POST' });
  await fetch(
    "http://localhost:8080/add-grade",
    {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "subject=English&value=5.50"
    }
  );
  await fetch(
    "http://localhost:8080/add-grade",
    {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "subject=Math&value=4.50"
    }
  );
  await fetch(
    "http://localhost:8080/add-grade",
    {
      method: 'POST',
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "subject=Programming Basics&value=6.00"
    }
  );
};

suite('Home page', function() {
  setup(async function() {
    await initializeGrades();
  });

  teardown(async function() {
    // Clear the grades after each test
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
