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
let notes = [];

/**
 * Initialization function for after the DOM loads
 */
function init() {
  document
    .getElementById("create-note-button")
    .addEventListener("click", () => createNote());
  loadNotesFromStorage();
}

/**
 * Retrieves notes related to current project from localstorage
 */
function loadNotesFromStorage() {
  // if (projectId == null) return;
  notes = JSON.parse(localStorage.getItem(`${projectId}#notes`) ?? "[]") ?? [];
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
  saveToLocalStorage(notes);
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

  const noteText = createNoteText(noteObj.content);
  noteBlock.appendChild(noteText);

  const noteEdit = createNoteButton("edit", () => editNote(noteObj.id));
  const noteDelete = createNoteButton("delete", () => deleteNote(noteObj.id));

  noteBlock.appendChild(noteEdit);
  noteBlock.appendChild(noteDelete);

  notesGrid.insertBefore(noteBlock, addButton);
}

/**
 * Generates a p element for the note html element
 * @param {string} content The content of the text element
 * @returns {Object} The html element for the text content
 */
function createNoteText(content) {
  const noteText = document.createElement("p");
  noteText.innerText = content;
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
 * @returns {Object} The html element for the button
 */
function createNoteButton(iconName, onClick) {
  const button = document.createElement("button");
  button.onclick = onClick;
  button.classList.add("note-button");
  button.classList.add(iconName);

  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.innerText = iconName;
  button.appendChild(icon);
  return button;
}

/**
 * Changes the note text element to be an input and allow it to be edited
 * @param {string} noteId Id of the note to be changed
 */
function editNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  const noteText = noteBlock.querySelector("p");

  const editButton = noteBlock.querySelector("button.edit");
  const editIcon = editButton.querySelector("i");
  editButton.onclick = () => saveNote(noteId);
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

  const editButton = noteBlock.querySelector("button.edit");
  const editIcon = editButton.querySelector("i");
  editButton.onclick = () => editNote(noteId);
  editIcon.innerText = "edit";

  const noteText = createNoteText(noteTextInput.value);

  noteBlock.replaceChild(noteText, noteTextInput);
  notes.find((note) => note.id == noteId).content = noteTextInput.value;

  saveToLocalStorage(notes);
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
  saveToLocalStorage(notes);
}

/**
 * Saves specified notes to localstorage
 * @param {Object[]} notes array of notes relating to project
 */
function saveToLocalStorage(notes) {
  localStorage.setItem(`${projectId}#notes`, JSON.stringify(notes));
}
/**
 * Adds a new task to the task list
 */
 function addTask() {
  const newTaskName = document.getElementById("new-task-name").value.trim();
  
  if (newTaskName === "") {
    alert("Task name cannot be empty");
    return;
  }

  tasks.push({ name: newTaskName, completed: false });
  renderTasks();
  saveTasksToLocalStorage();

  document.getElementById("new-task-name").value = ""; // Clear input field after adding task
}

/**
 * Renders the task list on the page
 */
function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks

  for (const task of tasks) {
    const taskItem = document.createElement("li");
    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener("change", () => {
      if (taskCheckbox.checked) {
        completeTask(task.name);
      }
    });

    taskItem.innerText = task.name;
    taskItem.prepend(taskCheckbox);
    taskList.appendChild(taskItem);
  }
}

/**
 * Marks a task as completed 
 * @param {string} taskName string name of the task to be completed
 */
function completeTask(taskName) {
  const taskIndex = tasks.findIndex((task) => task.name === taskName);
  if (taskIndex > -1) {
    notes.push(newNote);
    genNoteElement(newNote);
    saveNotesToLocalStorage(notes);
    
    saveTasksToLocalStorage();
  }
}

/**
 * Saves the tasks to localStorage
 */
function saveTasksToLocalStorage() {
  localStorage.setItem(`${projectId}#tasks`, JSON.stringify(tasks));
}

/**
 * Retrieves the tasks from localStorage
 */
function loadTasksFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem(`${projectId}#tasks`)) || [];
  tasks = storedTasks;
  renderTasks();
}
