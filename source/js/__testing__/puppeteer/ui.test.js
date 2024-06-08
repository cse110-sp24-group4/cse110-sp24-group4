describe("Ensure puppeteer is setup correctly with a simple passing test", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:9000/");
  });

  it("Check link to projects", async () => {
    let link = await page.$("a");
    let text = await (await link.getProperty("innerText")).jsonValue();
    expect(text).toBe("Launch in Browser");
    console.log(text);
  });
});
