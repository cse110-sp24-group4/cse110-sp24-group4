const projectId = "testingProject";

describe("Test for adding completed tasks to notes end-to-end tests", () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:9000/pages/project.html`,
    );
  });
  test("Testing adding to notes feature", async () => {
    // setting up test, one completed task one uncomplete, 2 notes
    await page.type("#new-project-name", projectId);
    await page.click("#project-create");
    await page.waitForSelector('.project-link');
    await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click("#testingProject"),
    ]); // Clicking the link will indirectly cause a navigation
    await page.type("#new-task-name", "Completed task");
    await page.click("#add-task-button");
    await page.click('#task-list li input[type="checkbox"]');
    await page.type("#new-task-name", "Uncomplete task");
    await page.click("#add-task-button");
    const addNoteButton = await page.$("#create-note-button");
    await addNoteButton.click();
    await addNoteButton.click();

    await page.click("#add-to-notes"); // start of test
    const taskCount = await page.$$eval("#task-list li", (els) => els.length);
    expect(taskCount).toBe(1);

    const taskText = await page.$eval(
      "#task-list li span",
      (el) => el.innerText,
    );
    expect(taskText).toBe("Uncomplete task");

    const notesGrid = await page.$(".notes-grid");
    const noteBlocks = await notesGrid.$$(".note-block");

    expect(noteBlocks.length).toBe(3);
    for (const block of noteBlocks) {
      const titleValue = await (
        await (await block.$(".note-title")).getProperty("innerText")
      ).jsonValue();
      const textValue = await (
        await (await block.$(".note-content")).getProperty("innerText")
      ).jsonValue();
      if (titleValue != "New note") {
        expect(titleValue).toBe("Completed task");
        expect(textValue).toBe("Put the contents of your finished task here!");
      } else {
        expect(textValue).toBe("Put the contents of your note here!");
      }
    }
    // Making sure changes saved to local storage
    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    /* Couldn't figure out how to access content in local storage */
    // for (const notes of curLocalStorage) {
    //   if (notes.title == "New note"){
    //     expect(notes.content).toBe("Put the contents of your note here!");
    //   } else {
    //     expect(notes.title).toBe("Completed task");
    //     expect(notes.content).toBe("Put the contents of your finished task here!");
    //   }
    // }
    expect(curLocalStorage.length).toBe(3);
  }, 10000);
});
