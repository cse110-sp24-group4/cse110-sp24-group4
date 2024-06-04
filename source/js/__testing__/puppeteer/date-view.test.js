//DISABLES CSS ANIMATIONS TO MAKE TESTS RUN FASTER, TESTS WILL FAIL WITHOUT THIS
page.on("load", () => {
  const content = `
  *,
  *::after,
  *::before {
      transition-delay: 0s !important;
      transition-duration: 0s !important;
      animation-delay: -0.0001s !important;
      animation-duration: 0s !important;
      animation-play-state: paused !important;
      caret-color: transparent !important;
  }`;

  page.addStyleTag({ content });
});

describe("Test the date view functionality of the notes page", () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:9000/pages/project.html`);
  });

  it("View notes from different projects, but same date", async () => {
    await page.type("#new-project-name", "Hello");
    await page.click("#project-create");
    await page.type("#new-project-name", "Goodbye");
    await page.click("#project-create");
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click("#Hello"),
    ]); // Clicking the link will indirectly cause a navigation
    await page.click("#create-note-button");

    await page.click(".edit");

    await page.type(".note-title", "Sun");
    await page.click(".check");
    await page.waitFor;
    await page.click(".back");

    await page.click("#project-create");
    await page.click("#Goodbye");
    await page.click("#create-note-button");
    await page.click(".edit");
    await page.type(".note-title", "Moon");
    await page.click(".check");
    await page.click(".back");

    await page.click("#date-view");
    const notes = await page.$$(".note-block");
    expect(notes.length).toBe(2);
  }, 100000);

  it("Changing date with date picker", async () => {
    await page.type(".date-selector", "19990104");
    const notes = await page.$$(".note-block");
    expect(notes.length).toBe(0);
  });
});
