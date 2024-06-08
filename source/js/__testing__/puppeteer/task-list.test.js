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

const projectId = "TaskListTestJs";

describe("Task List Feature", () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:9000/pages/project.html`); // Update to your local server and path
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await page.$$eval("#Project-List li button", (buttons) => {
      buttons.forEach((button) => button.click()); // Click delete button for each project
    });
  });

  test("should add a new task", async () => {
    await page.type("#new-project-name", projectId);
    await page.click("#project-create");
    await page.waitForSelector("#TaskListTestJs");
    await page;
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click("#TaskListTestJs"),
    ]); // Clicking the link will indirectly cause a navigation
    await page.waitForSelector("#new-task-name");
    await page.type("#new-task-name", "Test Task");
    await page.waitForSelector("button#add-task-button:not([disabled])");
    await new Promise((r) => setTimeout(r, 250));
    await page.click("#add-task-button");

    const taskText = await page.$eval(
      "#task-list li span",
      (el) => el.innerText,
    );
    expect(taskText).toBe("Test Task");
    // Added to make sure taskCount is updated
    const taskCount = await page.$$eval("#task-list li", (els) => els.length);
    expect(taskCount).toBe(1);
  });

  test("should mark a task as completed", async () => {
    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForSelector('#task-list li input[type="checkbox"]');
    await page.click('#task-list li input[type="checkbox"]');

    const taskCompleted = await page.$eval("#task-list li span", (el) =>
      el.classList.contains("task-completed"),
    );
    expect(taskCompleted).toBe(true);
  }, 10000);

  test("should delete a task", async () => {
    await new Promise((r) => setTimeout(r, 1000));
    await page.waitForSelector("#task-list li button");
    await page.click("#task-list li button");

    const taskCount = await page.$$eval("#task-list li", (els) => els.length);
    expect(taskCount).toBe(0);
  }, 10000);
});
