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
  const newNote = {
    id: "dslfsdff",
    content: "new note",
  };
  notes.push(newNote);
  localStorage.setItem(`${projectId}#notes`, notes);
}

function editNote(noteId) {}

function deleteNote(noteId) {}
