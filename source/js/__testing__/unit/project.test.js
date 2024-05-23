/**
 * @jest-environment jsdom
 */
import { isValidProjectName, createProjectItem, projects } from "../../project.js";

describe("Test suites for project page unit tests", () => {
  it("Test createProjectItem with valid input", () => {
    const testText = "Testing project";
    const project = createProjectItem(testText);

    const anchor = project.querySelector("a");

    expect(anchor.href).toBe(`http://localhost/notes.html?projectId=${encodeURI(testText)}`);
    expect(anchor.innerText).toBe(testText);
  });
  it("Test isValidProjectName with blank project name", () => {
    const testName = "";
    expect(() => {isValidProjectName(testName)}).toThrow(Error);
  });
  it("Test isValidProjectName with too long project name", () => {
    const testName = "this-name-is-longer-than-30-characters-oopsies";
    expect(() => {isValidProjectName(testName)}).toThrowError("Project name cannot exceed 30 characters");
  });
  it("Test isValidProjectName with duplicate project name", () => {
    const testName = "duplicateName";
    projects.push(testName);
    expect(() => {
        isValidProjectName(testName);
    }
    ).toThrowError(`${testName} is already in use!`);
  });
  it("Test isValidProjectName with reserved characters", () => {
    const testName = "?=";
    expect(() => {isValidProjectName(testName)}).toThrowError("Project names can only contain letters, numbers, spaces and '-', '.', '_', '~'");
  });
  it("Test isvalidProjectName with valid project name", () => {
    const testName = "validProject1-";
    expect(isValidProjectName(testName)).toBe(true);
  });
});