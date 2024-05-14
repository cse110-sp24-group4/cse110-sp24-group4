window.addEventListener("load", () => init());

const url = new URL(window.location);
let projectId = url.searchParams.get("projectId");
let notes = [];

function init() {
  loadNotesFromStorage();
}

function loadNotesFromStorage() {
  if (projectId == null) return;
  notes = JSON.parse(localStorage.getItem(`${projectId}#notes`)) ?? [];
}

function createNote() {
  const rand = "dfsdf";
  const newNote = {
    id: `${projectId}#notes#${rand}`,
    content: "new note",
  };
  notes.push(newNote);
  localStorage.setItem(`${projectId}#notes`, notes);
  genNoteElement(newNote);
}

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

function editNote(noteId) {
  const noteBlock = document.querySelector(`${projectId}#notes#${noteId}`);
  console.log(noteBlock.innerText);
}

function deleteNote(noteId) {
  const notesGrid = document.querySelector(".notes-grid");
  const noteBlock = document.querySelector(`#${noteId}`);
  notes = notes.filter((n) => n.id != noteId);
  notesGrid.removeChild(noteBlock);
  localStorage.setItem(`${projectId}#notes`, notes);
}
