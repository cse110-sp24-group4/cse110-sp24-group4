window.addEventListener("load", () => init());

/**
 * The id for the project selected. Found from the search parameters of the URL with key "projectId"
 * @const {string}
 */
const projectId = new URL(window.location).searchParams.get("projectId");
let notes = [];

/**
 * Initialization function for after the DOM loads
 */
function init() {
  loadNotesFromStorage();
}

/**
 * Retrieves notes related to current project from localstorage
 */
function loadNotesFromStorage() {
  // if (projectId == null) return;
  notes = JSON.parse(localStorage.getItem(`${projectId}#notes`) ?? "[]") ?? [];
  console.log(notes);
  for (const note of notes) {
    genNoteElement(note);
  }
}

/**
 * Creates new blank note in localstorage as well as corresponding html element
 */
function createNote() {
  const rand = (Math.random() * 1000).toFixed(0).toString();
  const newNote = {
    id: `${projectId}#notes#${rand}`,
    content: "new note",
  };
  notes.push(newNote);
  localStorage.setItem(`${projectId}#notes`, JSON.stringify(notes));
  genNoteElement(newNote);
}

/**
 * Generates html element for the corresponding note object and attaches it to the note grid
 * @param {Object} noteObj Note object to generate element for
 */
function genNoteElement(noteObj) {
  const addButton = document.querySelector("#create-note-button");
  const notesGrid = document.querySelector(".notes-grid");
  const noteBlock = document.createElement("div");

  noteBlock.id = noteObj.id;
  noteBlock.className = "note-block";

  const noteText = document.createElement("p");
  noteText.innerText = noteObj.content;
  noteText.className = "note-text";
  noteBlock.appendChild(noteText);

  const noteEdit = createNoteButton("edit", () => editNote(noteObj.id));
  const noteDelete = createNoteButton("delete", () => deleteNote(noteObj.id));

  noteBlock.appendChild(noteDelete);
  noteBlock.appendChild(noteEdit);

  notesGrid.insertBefore(noteBlock, addButton);
}

/**
 * Callback for clicking buttons on the note blocks
 *
 * @callback onClickCallback
 * @param {string} noteId
 */

/**
 * Generates a button for the note html element
 * @param {string} iconName
 * @param {onClickCallback} onClick
 * @returns {Object} The html element for the button
 */
function createNoteButton(iconName, onClick) {
  const button = document.createElement("button");
  button.className = "note-button";
  button.onclick = onClick;

  const icon = document.createElement("i");
  icon.className = "material-icons";
  icon.innerText = iconName;
  button.appendChild(icon);
  return button;
}

/**
 * Changes the note text element to be an input and allow it to be edited
 * @param {string} noteId Id of the note to be changed
 */
function editNote(noteId) {
  const noteBlock = document.querySelector(`#${noteId}`);
  console.log(noteBlock.innerText);
}

/**
 * Deletes specified note from localstorage and the corresponding element
 * @param {string} noteId Id of the note to be deleted
 */
function deleteNote(noteId) {
  const notesGrid = document.querySelector(".notes-grid");
  const noteBlock = document.getElementById(`${noteId}`);
  notes = notes.filter((n) => n.id != noteId);
  notesGrid.removeChild(noteBlock);
  localStorage.setItem(`${projectId}#notes`, JSON.stringify(notes));
}
