test("should be true", () => {
  expect(true).toBe(true);
});

test("should be false", () => {
  expect(false).toBe(false);
});

test("should be true 2", () => {
  expect(1 == 1).toBe(true);
});

test("should fail", () => {
  expect(false).toBe(false);
});
