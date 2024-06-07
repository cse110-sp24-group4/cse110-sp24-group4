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

const projectId = "testingProject";

describe("Task List Feature", () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:9000/pages/project.html`,
    ); // Update to your local server and path
  });

  test("should add a new task", async () => {
    await page.type("#new-project-name", projectId);
    await page.click("#project-create");
    await page.waitForSelector('.project-link');
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click(".project-link"),
    ]); // Clicking the link will indirectly cause a navigation
    await page.type("#new-task-name", "Test Task");
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
    await page.click('#task-list li input[type="checkbox"]');

    const taskCompleted = await page.$eval("#task-list li span", (el) =>
      el.classList.contains("task-completed"),
    );
    expect(taskCompleted).toBe(true);
  });

  test("should delete a task", async () => {
    await page.click("#task-list li button");

    const taskCount = await page.$$eval("#task-list li", (els) => els.length);
    expect(taskCount).toBe(0);
  });
});
