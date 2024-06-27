const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Grades page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8080/add-grade");
    let body = await res.text();
    console.log(body); // Debugging: Output the page content
    assert.ok(body.includes("<h1>Add New Grade</h1>"));
  });

  test('Grade HTML form', async function() {
    let res = await fetch("http://localhost:8080/add-grade");
    let body = await res.text();
    console.log(body); // Debugging: Output the page content

    let subjectFieldFound = body.includes('<input id="subject" type="text" name="subject"/>');
    console.log('Subject Field Found:', subjectFieldFound); // Debugging: Check if the field is found
    assert.ok(subjectFieldFound, "Field 'subject' is missing");

    let valueFieldFound = body.includes('<input id="value" type="text" name="value"/>');
    console.log('Value Field Found:', valueFieldFound); // Debugging: Check if the field is found
    assert.ok(valueFieldFound, "Field 'value' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    console.log('Button Add Found:', buttonAddFound); // Debugging: Check if the button is found
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid grade', async function() {
    let res = await fetch(
      "http://localhost:8080/add-grade",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "subject=Physics&value=3.90"
      }
    );

    res = await fetch("http://localhost:8080/my-grades");
    let body = await res.text();
    console.log(body); // Debugging: Output the page content after adding a grade
    let gradesReturned = body.includes(
      "<li>English (5.50)</li><li>Math (4.50)</li><li>Programming Basics (6.00)</li><li>Physics (3.90)</li>"
    );
    assert.ok(gradesReturned, "Add grade failed");
  });

  test('Add invalid grade', async function() {
    let res = await fetch(
      "http://localhost:8080/add-grade",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "subject=&value=6.00"
      }
    );
    let body = await res.text();
    console.log(body); // Debugging: Output the page content after attempting to add an invalid grade
    let errMsg = body.includes("Cannot add grade. Subject and value fields are required!");
    assert.ok(errMsg, "Add invalid grade should display an error message");

    res = await fetch("http://localhost:8080/my-grades");
    body = await res.text();
    console.log(body); // Debugging: Output the page content after fetching grades
    let gradesCountCorrect = body.includes(
      "<li>English (5.50)</li><li>Math (4.50)</li><li>Programming Basics (6.00)</li>"
    );
    assert.ok(gradesCountCorrect, "Add invalid grade should not change the grades count");
  });
});
