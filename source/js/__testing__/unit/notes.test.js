/**
 * @jest-environment jsdom
 */
import {
  createNoteText,
  createNoteButton,
  createExpandButton,
  formatTime,
} from "../../notes.js";

describe("Test suites for notes page unit tests", () => {
  it("Test createNoteText with valid input", () => {
    const testText = "Testing note";
    const text = createNoteText(testText);
    expect(text.tagName.toLowerCase()).toBe("p");
    expect(text.innerText).toBe("Testing note");
    expect(text.classList.toString()).toBe("note-content note-text");
  });

  it("Test createNoteText with invalid input", () => {
    const testText = null;
    const text = createNoteText(testText);
    expect(text.tagName.toLowerCase()).toBe("p");
    expect(text.innerText).toBe("New note");
    expect(text.classList.toString()).toBe("note-content note-text");
  });

  it("Test createNoteButton with valid input", () => {
    const testFunc = () => {
      return "TestOut";
    };
    const testIcon = "edit";
    const button = createNoteButton(testIcon, testFunc);
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button.classList.toString()).toBe("note-button edit");
    expect(button.children.length).toBe(1);
    expect(button.children[0].tagName.toLowerCase()).toBe("i");
    expect(button.children[0].innerText.toLowerCase()).toBe("edit");
    expect(button.onclick).toBeDefined();
  });

  it("Test createNoteButton with invalid input", () => {
    const testFunc = null;
    const testText = null;
    const button = createNoteButton(testText, testFunc);
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button.classList.toString()).toBe("note-button edit");
    expect(button.children.length).toBe(1);
    expect(button.children[0].tagName.toLowerCase()).toBe("i");
    expect(button.children[0].innerText.toLowerCase()).toBe("edit");
    expect(button.onclick).toBeDefined();
  });

  it("Test createExpandButton with valid input", () => {
    const testId = "Testing note";
    const button = createExpandButton(testId);
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button.innerText).toBe("More");
    expect(button.classList.toString()).toBe(
      "note-text note-overflow-button note-expand",
    );
    expect(button.onclick).toBeDefined();
  });

  it("Test createExpandButton with invalid input", () => {
    const testId = null;
    const button = createExpandButton(testId);
    expect(button.tagName.toLowerCase()).toBe("button");
    expect(button.innerText).toBe("More");
    expect(button.classList.toString()).toBe(
      "note-text note-overflow-button note-expand",
    );
    expect(button.onclick).toBeDefined();
  });

  it("Test formatTime with valid input", () => {
    const testInput = "May 26, 2024 17:30:00";
    const formattedTime = formatTime(testInput);
    expect(formattedTime).toBe("5/26/2024 5:30:00 PM");
  });

  it("Test formatTime with invalid input", () => {
    const testInput = "2342dfjalsdfjlas";
    const formattedTime = formatTime(testInput);
    expect(formattedTime).toBe("Invalid Date Invalid Date");
  });
});
