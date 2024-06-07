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
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await page.$$eval("#Project-List li button", (buttons) => {
      buttons.forEach((button) => button.click()); // Click delete button for each project
    });
  });

  it("View notes from different projects, but same date", async () => {
    await page.type("#new-project-name", "DateView1");
    await page.click("#project-create");
    await page.type("#new-project-name", "DateView2");
    await page.click("#project-create");
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click("#DateView1"),
    ]); // Clicking the link will indirectly cause a navigation
    await page.waitForSelector('#create-note-button');
    await page.click("#create-note-button");

    await page.click(".edit");

    await page.type(".note-title", "Sun");
    await page.click(".check");
    await page.click(".back");
    await page.waitForSelector('#DateView2');
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click("#DateView2"),
    ]); // Clicking the link will indirectly cause a navigation
    await page.click("#create-note-button");
    await page.click(".edit");
    await page.type(".note-title", "Moon");
    await page.click(".check");
    await page.click(".back");

    await page.click("#date-view");
    const notes = await page.$$(".note-block");
    console.log(notes);
    expect(notes.length).toBe(2);
  }, 100000);

  it("Changing date with date picker", async () => {
    await page.type(".date-selector", "19990104");
    const notes = await page.$$(".note-block");
    expect(notes.length).toBe(0);
  });
});
