const assert = require('assert');
const fetch = require('node-fetch');

suite('Home page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8080/");
    let body = await res.text();
    console.log(body); // Debugging: Output the page content
    assert.ok(body.includes("<h1>My Grades</h1>"));
  });

  test('Grades count', async function() {
    let res = await fetch("http://localhost:8080/");
    let body = await res.text();
    console.log(body); // Debugging: Output the page content
    // Check for the exact "Grades: <b>3</b>" text
    assert.ok(body.includes("Grades: <b>3</b>"), "Grades count should be 3");
  });
});
