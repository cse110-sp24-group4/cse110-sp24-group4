/**
 * @file This file handles notes page functionality including
 * - Creating, editing, deleting notes
 * - Saving/loading with localStorage
 */
window.addEventListener("load", () => init());

/**
 * The id for the project selected. Found from the search parameters of the URL with key "projectId"
 * @constant {string}
 */
const projectId = new URL(window.location).searchParams.get("projectId");

/**
 * @typedef {Object} Note
 * @property {string} id Unique ID for the note
 *  @property {string} timeFormatted The ISO string for when the note was created
 * @property {string} content The text contained in the note
 * @property {string} createdAt The time created listed in a way to be compared
 * @property {string} updatedAt The ISO string for when the note was last updated
 */
/**
 * @type {Array<Note>}
 */
let notes = [];

/**
 * Initialization function for after the DOM loads
 */
function init() {
  document
    .getElementById("create-note-button")
    .addEventListener("click", () => createNote());
    document
    .getElementById("sort-notes-button")
    .addEventListener("click", () => sortNotes());
  document.getElementById("project-title").innerText = projectId;
  loadNotesFromStorage();
}

/**
 * Sorts notes based on both most and least recently created
 */
function sortNotes(){
  let sortButton = document.getElementById("sort-notes-button");
  let notesGrid = document.querySelector(".notes-grid");
    notes = notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // sorts dates
    if (sortButton.innerText == "Sorted by most recent"){ // changes text based on how we sort
      notes.reverse();
      sortButton.innerText = "Sorted by least recent";
    } else {
      sortButton.innerText = "Sorted by most recent";
    }
    for (const note of notes){      // appends each note to end, giving us sorted list.
      let noteBlock = document.getElementById(`${note.id}`);
      notesGrid.appendChild(noteBlock);
    }
}

/**
 * Retrieves notes related to current project from localstorage
 */
function loadNotesFromStorage() {
  // if (projectId == null) return;
  notes = JSON.parse(localStorage.getItem(`${projectId}#notes`) ?? "[]") ?? [];
  for (const note of notes) {
    console.log(note.timeFormatted, note.updatedAt);
    genNoteElement(note);
  }
  sortNotes();
}

/**
 * Creates new blank note in localstorage as well as corresponding html element
 */
function createNote() {
  const rand = (Math.random() * 1000).toFixed(0).toString();
  const time = new Date();
  const curTime = time.toLocaleDateString() + " " + time.toLocaleTimeString();
  /**
   * @type {Note}
   */
  const newNote = {
    id: `${projectId}#notes#${rand}`,
    content: "New note",
    timeFormatted: curTime,
    createdAt: time,
    updatedAt: curTime,
  };
  notes.push(newNote);
  saveToLocalStorage(notes);
  genNoteElement(newNote);
}

/**
 * Generates html element for the corresponding note object and attaches it to the note grid
 * @param {Note} noteObj Note object to generate element for
 */
function genNoteElement(noteObj) {
  const notesGrid = document.querySelector(".notes-grid");
  const noteBlock = document.createElement("div");

  noteBlock.id = noteObj.id;
  noteBlock.className = "note-block";

  const noteText = createNoteText(noteObj.content);
  noteBlock.appendChild(noteText);

  const noteEdit = createNoteButton("edit", () => editNote(noteObj.id));
  const noteDelete = createNoteButton("delete", () => deleteNote(noteObj.id));
  const noteDate = document.createElement("p");
  noteDate.innerText = noteObj.timeFormatted;

  const buttonContainer = document.createElement("div");
  buttonContainer.classList = "button-container";
  buttonContainer.appendChild(noteEdit);
  buttonContainer.appendChild(noteDelete);
  noteBlock.appendChild(buttonContainer);
  noteBlock.appendChild(noteDate);

  notesGrid.appendChild(noteBlock);
}

/**
 * Changes the note text element to be an input and allow it to be edited
 * @param {string} noteId Id of the note to be changed
 */
function editNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  const noteText = noteBlock.querySelector("p");

  const editButton = noteBlock.querySelector("button.edit");
  editButton.classList.replace("edit", "check");
  editButton.onclick = () => saveNote(noteId);

  const editIcon = editButton.querySelector("i");
  editIcon.innerText = "check";

  const noteTextInput = document.createElement("input");
  noteTextInput.type = "text";
  noteTextInput.value = noteText.innerText;

  noteBlock.replaceChild(noteTextInput, noteText);
}

/**
 * Saves the edits made using the input element and converts it back to a text element
 * @param {string} noteId Id of the note to be saved
 */
function saveNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  const noteTextInput = noteBlock.querySelector("input");

  const saveButton = noteBlock.querySelector("button.check");
  saveButton.classList.replace("check", "edit");
  saveButton.onclick = () => editNote(noteId);

  const editIcon = saveButton.querySelector("i");
  editIcon.innerText = "edit";

  const noteText = createNoteText(noteTextInput.value);

  noteBlock.replaceChild(noteText, noteTextInput);
  notes.find((note) => note.id == noteId).content = noteTextInput.value;
  const curTime = new Date().toISOString();
  notes.find((note) => note.id == noteId).updatedAt = curTime;

  saveToLocalStorage(notes);
}

/**
 * Deletes specified note from localstorage and the corresponding element
 * @param {string} noteId Id of the note to be deleted
 */
function deleteNote(noteId) {
  if (
    window.confirm(
      "Are you sure you want to delete this note? (This action cannot be undone)",
    )
  ) {
    const notesGrid = document.querySelector(".notes-grid");
    const noteBlock = document.getElementById(`${noteId}`);
    notes = notes.filter((n) => n.id != noteId);
    notesGrid.removeChild(noteBlock);
    saveToLocalStorage(notes);
  } else {
    return;
  }
}

/**
 * Saves specified notes to localstorage
 * @param {Array<Note>} notes array of notes relating to project
 */
function saveToLocalStorage(notes) {
  localStorage.setItem(`${projectId}#notes`, JSON.stringify(notes));
}

/**
 * Generates a p element for the note html element
 * @param {string} content The content of the text element
 * @returns {HTMLElement} The html element for the text content
 */
export function createNoteText(content) {
  const noteText = document.createElement("p");
  noteText.innerText = content ?? "New note";
  noteText.className = "note-text";
  return noteText;
}

/**
 * Callback for clicking buttons on the note blocks
 *
 * @callback onClickCallback
 * @param {string} noteId
 */

/**
 * Generates a button for the note html element
 * @param {string} iconName The name of the icon for the button
 * @param {onClickCallback} onClick The callback to use when clicked
 * @returns {HTMLElement} The html element for the button
 */
export function createNoteButton(iconName, onClick) {
  const button = document.createElement("button");
  button.onclick = onClick ?? (() => console.log("Note button invalid"));
  button.classList.add("note-button");
  button.classList.add(iconName ?? "edit");

  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.innerText = iconName ?? "edit";
  button.appendChild(icon);
  return button;
}