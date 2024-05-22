import { describe, it, expect, beforeAll } from "@jest/globals";

beforeAll(async () => {
  await page.goto("http://localhost:9000/");
});

describe("Test suites for notes page end-to-end tests", () => {
  it("Test adding a note", () => {
    expect("placeholder").toBe("placeholder");
  });
  it("Test add persistence", () => {
    expect("placeholder").toBe("placeholder");
  });
  it("Test editing a note", () => {
    expect("placeholder").toBe("placeholder");
  });
  it("Test edit persistence", () => {
    expect(text.tagName.toLowerCase()).toBe("p");
  });
  it("Test deleting a note", () => {
    expect("placeholder").toBe("placeholder");
  });
  it("Test delete persistence", () => {
    expect("placeholder").toBe("placeholder");
  });
});
