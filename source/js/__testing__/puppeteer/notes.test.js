const projectId = "testingProject";

describe("Test suites for notes page end-to-end tests", () => {
  beforeAll(async () => {
    await page.goto(
      `http://localhost:9000/pages/notes.html?projectId=${projectId}`,
    );
  });
  it("Test adding notes", async () => {
    const addNoteButton = await page.$("#create-note-button");
    await addNoteButton.click();
    await addNoteButton.click();

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteGrid = await page.$(".notes-grid");
    const noteTexts = await noteGrid.$$(".note-block > p");

    for (const text of noteTexts) {
      const textValue = await (await text.getProperty("innerText")).jsonValue();
      expect(textValue).toBe("New note");
    }

    for (const notes of curLocalStorage) {
      expect(notes.content).toBe("New note");
    }

    expect(noteTexts.length).toBe(2);
    expect(curLocalStorage.length).toBe(2);
  });
  it("Test add persistence", async () => {
    await page.reload();
    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteGrid = await page.$(".notes-grid");
    const noteTexts = await noteGrid.$$(".note-block > p");

    for (const text of noteTexts) {
      const textValue = await (await text.getProperty("innerText")).jsonValue();
      expect(textValue).toBe("New note");
    }

    for (const notes of curLocalStorage) {
      expect(notes.content).toBe("New note");
    }

    expect(noteTexts.length).toBe(2);
    expect(curLocalStorage.length).toBe(2);
  });
  it("Test editing a note", async () => {
    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");

    let i = 0;
    for (const block of noteBlocks) {
      const editButton = await block.$("button.edit");
      expect(editButton).toBeDefined();
      await editButton.click();

      const textInput = await block.$("input");
      await textInput.click();
      await textInput.type(`${i}`);

      const saveButton = await block.$("button.check");
      await saveButton.click();
      i++;
    }

    i = 0;
    for (const block of noteBlocks) {
      const textValue = await (
        await (await block.$("p")).getProperty("innerText")
      ).jsonValue();
      expect(textValue).toBe(`New note${i}`);
      i++;
    }

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const contents = curLocalStorage.map((note) => note.content);

    expect(contents).toStrictEqual(["New note0", "New note1"]);

    const noteTexts = await noteGrid.$$(".note-block > p");

    expect(noteTexts.length).toBe(2);
    expect(curLocalStorage.length).toBe(2);
  });
  it("Test edit persistence", async () => {
    await page.reload();
    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");
    let i = 0;
    for (const block of noteBlocks) {
      const textValue = await (
        await (await block.$("p")).getProperty("innerText")
      ).jsonValue();
      expect(textValue).toBe(`New note${i}`);
      i++;
    }

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const contents = curLocalStorage.map((note) => note.content);

    expect(contents).toStrictEqual(["New note0", "New note1"]);

    expect(curLocalStorage.length).toBe(2);
  });
  it("Test deleting a note", async () => {
    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");

    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    for (const block of noteBlocks) {
      const deleteButton = await block.$("button.delete");
      expect(deleteButton).toBeDefined();
      await deleteButton.click();
    }

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteTexts = await noteGrid.$$(".note-block > p");

    expect(noteTexts.length).toBe(0);
    expect(curLocalStorage.length).toBe(0);
  });
  it("Test delete persistence", async () => {
    await page.reload();
    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteGrid = await page.$(".notes-grid");
    const noteTexts = await noteGrid.$$(".note-block > p");

    expect(noteTexts.length).toBe(0);
    expect(curLocalStorage.length).toBe(0);
  });
});