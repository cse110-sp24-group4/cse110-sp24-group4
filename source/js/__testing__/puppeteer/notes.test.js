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

const projectId = "NotesTestJs";

describe("Test suites for notes page end-to-end tests", () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:9000/pages/project.html`);
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
    await page.$$eval("#Project-List li button", (buttons) => {
      buttons.forEach((button) => button.click()); // Click delete button for each project
    });
  });
  it("Test adding notes", async () => {
    await page.type("#new-project-name", "NotesTestJs");
    await page.click("#project-create");
    await page.click("#NotesTestJs");
    const addNoteButton = await page.$("#create-note-button");
    await addNoteButton.click();
    await addNoteButton.click();

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");

    for (const block of noteBlocks) {
      const textValue = await (
        await (await block.$(".note-content")).getProperty("innerText")
      ).jsonValue();
      expect(textValue).toBe("Put the contents of your note here!");
      const titleValue = await (
        await (await block.$(".note-title")).getProperty("innerText")
      ).jsonValue();
      expect(titleValue).toBe("New note");
    }

    for (const notes of curLocalStorage) {
      expect(notes.content).toBe("");
      expect(notes.title).toBe("");
    }

    expect(noteBlocks.length).toBe(2);
    expect(curLocalStorage.length).toBe(2);
  });
  it("Test add persistence", async () => {
    await page.reload();
    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");

    for (const block of noteBlocks) {
      const textValue = await (
        await (await block.$(".note-content")).getProperty("innerText")
      ).jsonValue();
      expect(textValue).toBe("Put the contents of your note here!");
      const titleValue = await (
        await (await block.$(".note-title")).getProperty("innerText")
      ).jsonValue();
      expect(titleValue).toBe("New note");
    }

    for (const notes of curLocalStorage) {
      expect(notes.content).toBe("");
      expect(notes.title).toBe("");
    }

    expect(noteBlocks.length).toBe(2);
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

      const textInput = await block.$("textarea");
      await textInput.click();
      await textInput.evaluate((input) => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }); // This ensures text is appended to end of content
      await textInput.type(`${i}`);

      const titleInput = await block.$(".note-title");
      await titleInput.click();
      await titleInput.evaluate((input) => {
        input.selectionStart = input.selectionEnd = input.value.length;
      }); // This ensures text is appended to end of content
      await titleInput.type(`${i}`);

      const tagInput = await block.$(".tag-list");
      await tagInput.click();
      await tagInput.type(`test${i}`);

      const saveButton = await block.$("button.check");
      await saveButton.click();
      i++;
    }

    i = 0;
    for (const block of noteBlocks) {
      const textValue = await (
        await (await block.$("p.note-content")).getProperty("innerText")
      ).jsonValue();
      expect(textValue).toBe(`${i}`);
      const titleValue = await (
        await (await block.$("p.note-title")).getProperty("innerText")
      ).jsonValue();
      expect(titleValue).toBe(`${i}`);

      const tagValue = await (
        await (
          await block.$("div.tag-and-buttons > ul > li.tag-item")
        ).getProperty("innerText")
      ).jsonValue();
      expect(tagValue).toBe(`test${i}`);

      i++;
    }

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const contents = curLocalStorage.map((note) => note.content);

    expect(contents).toStrictEqual(["0", "1"]);

    const noteTexts = await noteGrid.$$(".note-block > p.note-content");

    expect(noteTexts.length).toBe(2);
    expect(curLocalStorage.length).toBe(2);
  });
  it("Test edit persistence", async () => {
    await page.reload();
    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");
    let i = 1;
    for (const block of noteBlocks) {
      const textValue = await (
        await (await block.$("p.note-content")).getProperty("innerText")
      ).jsonValue();
      expect(textValue).toBe(`${i}`);
      const titleValue = await (
        await (await block.$("p.note-title")).getProperty("innerText")
      ).jsonValue();
      expect(titleValue).toBe(`${i}`);
      i--;
    }

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const contents = curLocalStorage.map((note) => note.content);

    expect(contents).toStrictEqual(["0", "1"]);

    expect(curLocalStorage.length).toBe(2);
  });
  it("Test deleting a note", async () => {
    const noteGrid = await page.$(".notes-grid");
    const noteBlocks = await noteGrid.$$(".note-block");

    for (const block of noteBlocks) {
      await page.evaluate(async () => {
        await new Promise((func) => setTimeout(func, 1000));
      });
      const deleteButton = await block.$("button.delete");
      expect(deleteButton).toBeDefined();
      await deleteButton.click();
      await page.evaluate(async () => {
        await new Promise((func) => setTimeout(func, 1000));
      });
    }

    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteTexts = await noteGrid.$$(".note-block > p.note-content");

    expect(curLocalStorage.length).toBe(0);
    expect(noteTexts.length).toBe(0);
  }, 20000);
  it("Test delete persistence", async () => {
    await page.reload();
    const curLocalStorage = await page.evaluate((projId) => {
      return JSON.parse(localStorage.getItem(`${projId}#notes`));
    }, projectId);

    const noteGrid = await page.$(".notes-grid");
    const noteTexts = await noteGrid.$$(".note-block > p.note-content");

    expect(curLocalStorage.length).toBe(0);
    expect(noteTexts.length).toBe(0);
  });
});
