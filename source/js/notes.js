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
 * Set to 't' if date mode is active, should not have any other value
 * @constant {char}
 */
const dateView = new URL(window.location).searchParams.get("date");

/**
 * @typedef {Object} Note
 * @property {string} id Unique ID for the note
 * @property {string} content The text contained in the note
 * @property {string} title The title of the note
 * @property {string} createdAt The ISO string for when the note was created
 * @property {string} updatedAt The ISO string for when the note was last updated
 */
/**
 * @type {Array<Note>}
 */
let notes = [];

/**
 * @type {Set<string>}
 */
let filterSet = new Set();

/**
 * The default placeholder title of a new note
 * @type {string}
 */
const DEFAULT_NOTE_TITLE = "New note";

/**
 * The default placeholder content of a new note
 * @type {string}
 */
const DEFAULT_NOTE_CONTENT = "Put the contents of your note here!";

/**
 * Initialization function for after the DOM loads
 */
function init() {
  initializeServiceWorker();
  document
    .getElementById("create-note-button")
    .addEventListener("click", () => createNote());
  document
    .getElementById("sort-notes-button")
    .addEventListener("click", () => sortNotes());
  document.getElementById("project-title").innerText = projectId;
  document
    .getElementById("filter-select")
    .addEventListener("change", filterNotes);
  if (dateView == "t") {
    toggleDateView();
    document.getElementById("toggle-date-view").style.display = "none";
    document.getElementById("project-title").innerText = "Notes by Date";
  } else {
    loadNotesFromStorage("");
    document
      .getElementById("toggle-date-view")
      .addEventListener("click", () => toggleDateView());
  }
}

/**
 * Initializes service worker
 */
async function initializeServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const register = await navigator.serviceWorker.register("../sw.js");
      if (register.active) {
        // eslint-disable-next-line
        console.log("Service worker successfully registered");
      }
    } catch (err) {
      // eslint-disable-next-line
      console.error("Service worker failed to register", err);
    }
  }
}

/**
 * Sorts notes based on both most and least recently created
 */
function sortNotes() {
  let sortButton = document.getElementById("sort-notes-button");
  let notesGrid = document.querySelector(".notes-grid");
  notes = notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)); // sorts dates
  if (sortButton.innerText == "Sorted by most recent") {
    // changes text based on how we sort
    notes.reverse();
    sortButton.innerText = "Sorted by least recent";
  } else {
    sortButton.innerText = "Sorted by most recent";
  }
  for (const note of notes) {
    // appends each note to end, giving us sorted list.
    let noteBlock = document.getElementById(`${note.id}`);
    notesGrid.appendChild(noteBlock);
  }
}

/**
 * Retrieves notes related to current project from localstorage
 * @param {string} date Date of notes to be displayed, empty string displays project
 */
function loadNotesFromStorage(date) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  let notesGrid = document.querySelector(".notes-grid");
  notesGrid.innerHTML = "";

  if (date == "") {
    // if (projectId == null) return;
    notes =
      JSON.parse(localStorage.getItem(`${projectId}#notes`) ?? "[]") ?? [];
  } else {
    notes = [];
    for (let i = 0; i < projects.length; i++) {
      let projectNotes =
        JSON.parse(localStorage.getItem(`${projects[i]}#notes`) ?? "[]") ?? [];
      for (let j = 0; j < projectNotes.length; j++) {
        let noteDate = new Date(projectNotes[j].updatedAt);
        let formattedDate = localeToInputDate(noteDate);
        if (formattedDate == date) {
          notes.push(projectNotes[j]);
        }
      }
    }
  }
  for (const note of notes) {
    genNoteElement(note);
    const noteFilterList = note.filters || [];
    noteFilterList.forEach(function (filter) {
      filterSet.add(filter);
      updateFilterSelect();
    });
  }
  sortNotes();
}

/**
 * Creates new blank note in localstorage as well as corresponding html element
 */
function createNote() {
  const rand = (Math.random() * 1000).toFixed(0).toString();
  const time = new Date();
  /**
   * @type {Note}
   */
  const newNote = {
    id: `${projectId}#notes#${rand}`,
    title: "",
    content: "",
    createdAt: time.toISOString(),
    updatedAt: time.toISOString(),
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
  noteBlock.classList.add("note-block");

  const noteHeader = document.createElement("h3");
  noteHeader.classList.add("note-header");

  const noteTitle = document.createElement("p");
  noteTitle.classList.add("note-text", "note-title");
  noteTitle.innerText =
    noteObj.title == "" ? DEFAULT_NOTE_TITLE : noteObj.title;

  const noteDate = document.createElement("i");

  const curTime = formatTime(noteObj.updatedAt);

  noteDate.innerText = curTime;
  noteDate.classList.add("note-date");

  noteHeader.appendChild(noteTitle);
  noteHeader.appendChild(noteDate);

  const noteText = createNoteText(
    noteObj.content == "" ? DEFAULT_NOTE_CONTENT : noteObj.content,
  );

  const noteEdit = createNoteButton("edit", () => editNote(noteObj.id));
  const noteDelete = createNoteButton("delete", () => deleteNote(noteObj.id));

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  buttonContainer.appendChild(noteEdit);
  buttonContainer.appendChild(noteDelete);

  const tagAndButtons = document.createElement("div");
  tagAndButtons.className = "tag-and-buttons";

  const tagList = generateTagList(noteObj.filters || []);

  tagAndButtons.appendChild(tagList);
  tagAndButtons.appendChild(buttonContainer);

  noteBlock.appendChild(noteHeader);
  noteBlock.appendChild(noteText);
  noteBlock.appendChild(tagAndButtons);

  const noteFilterList = noteObj.filters || [];
  noteFilterList.forEach(function (filter) {
    noteBlock.classList.add(`filter-${filter}`);
  });

  let sortButton = document.getElementById("sort-notes-button");
  if (sortButton.innerText == "Sorted by most recent") {
    notesGrid.prepend(noteBlock);
  } else {
    notesGrid.append(noteBlock);
  }
  processExpandButton(noteBlock);
}

/**
 * Changes the note text element to be an input and allow it to be edited
 * @param {string} noteId Id of the note to be changed
 */
function editNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  const noteTitle = noteBlock.querySelector(".note-title");
  const noteText = noteBlock.querySelector(".note-content");
  const tagList = noteBlock.querySelector(".tag-list");
  const tagAndButtons = noteBlock.querySelector(".tag-and-buttons");
  const buttonContainer = tagAndButtons.querySelector(".button-container");

  const editButton = noteBlock.querySelector("button.edit");
  editButton.classList.replace("edit", "check");
  editButton.onclick = () => saveNote(noteId);

  const editIcon = editButton.querySelector("i");
  editIcon.innerText = "check";

  const noteTextInput = document.createElement("textarea");
  noteTextInput.placeholder = DEFAULT_NOTE_CONTENT;
  if (noteText.innerText != DEFAULT_NOTE_CONTENT) {
    noteTextInput.value = noteText.innerText;
  }
  noteTextInput.classList.add("edit-note", "note-text");

  const noteTitleInput = document.createElement("input");
  noteTitleInput.placeholder = DEFAULT_NOTE_TITLE;
  if (noteTitle.innerText != DEFAULT_NOTE_TITLE) {
    noteTitleInput.value = noteTitle.innerText;
  }
  noteTitleInput.classList = noteTitle.classList;

  const tagListInput = document.createElement("input"); //Create tag input edit
  const noteTags = notes.find((note) => note.id == noteId).filters || []; //Get tag array
  const noteTagsString = noteTags.join(" ");
  tagListInput.value = noteTagsString;
  tagListInput.classList.add("tag-list");
  tagListInput.placeholder = "Keywords";

  const tagListInputInstructions = document.createElement("p");
  tagListInputInstructions.classList.add("instructions", "note-text");
  tagListInputInstructions.innerText = "Separate keywords with spaces";
  tagListInputInstructions.style = "font-size: 0.8em;";

  tagAndButtons.insertBefore(tagListInputInstructions, buttonContainer);

  noteTitle.replaceWith(noteTitleInput);
  noteBlock.replaceChild(noteTextInput, noteText);
  tagList.replaceWith(tagListInput);
  const expandButton = noteBlock.querySelector(".note-overflow-button");
  if (expandButton) {
    noteBlock.removeChild(expandButton);
  }
}

/**
 * Saves the edits made using the input element and converts it back to a text element
 * @param {string} noteId Id of the note to be saved
 */
function saveNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  const noteTitleInput = noteBlock.querySelector(".note-title");
  const noteTextInput = noteBlock.querySelector(".edit-note");
  const tagListInput = noteBlock.querySelector(".tag-list");
  const curTime = new Date().toISOString();
  const tagListInputInstructions = noteBlock.querySelector(".instructions");

  const saveButton = noteBlock.querySelector("button.check");
  saveButton.classList.replace("check", "edit");
  saveButton.onclick = () => editNote(noteId);

  const editIcon = saveButton.querySelector("i");
  editIcon.innerText = "edit";

  const noteText = createNoteText(
    noteTextInput.value == "" ? DEFAULT_NOTE_CONTENT : noteTextInput.value,
  );
  const noteDate = noteBlock.querySelector(".note-date");
  noteDate.innerText = formatTime(curTime);
  noteBlock.replaceChild(noteText, noteTextInput);

  const noteTitle = document.createElement("p");
  noteTitle.classList = noteTitleInput.classList;
  noteTitle.innerText =
    noteTitleInput.value == "" ? DEFAULT_NOTE_TITLE : noteTitleInput.value;
  noteTitleInput.replaceWith(noteTitle);

  const splitRegEx = /\s+/; // Looks for commas as delimiter and removes whitespace around split
  const tagListArray = tagListInput.value.split(splitRegEx).filter(Boolean);
  tagListArray.forEach(function (tag) {
    filterSet.add(tag);
    updateFilterSelect();
  });

  const tagListElement = generateTagList(tagListArray);

  noteBlock.setAttribute("class", "note-block");

  tagListArray.forEach(function (tagItem) {
    noteBlock.classList.add(`filter-${tagItem}`);
  });

  tagListInput.replaceWith(tagListElement);

  tagListInputInstructions.remove();

  processExpandButton(noteBlock);

  notes.find((note) => note.id == noteId).content = noteTextInput.value;
  notes.find((note) => note.id == noteId).title = noteTitleInput.value;
  notes.find((note) => note.id == noteId).updatedAt = curTime;
  notes.find((note) => note.id == noteId).filters = tagListArray;

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
    notes = notes.filter((n) => n.id != noteId);
    saveToLocalStorage(notes);
    const notesGrid = document.querySelector(".notes-grid");
    const noteBlock = document.getElementById(`${noteId}`);
    noteBlock.classList.add("delete-note");
    setTimeout(() => {
      notesGrid.removeChild(noteBlock);
    }, 800);
  } else {
    return;
  }
}

/**
 * Expands the given note's contents
 * @param {string} noteId Id of the note to expand
 */
function expandNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  noteBlock
    .querySelector(".note-content")
    .classList.replace("collapsed", "expanded");
  const expandButton = noteBlock.querySelector(".note-overflow-button");
  expandButton.classList.replace("note-expand", "note-collapse");
  expandButton.onclick = () => collapseNote(noteId);
  expandButton.innerText = "Less";
}

/**
 * Collapses the given note's contents
 * @param {string} noteId Id of the note to collapse
 */
function collapseNote(noteId) {
  const noteBlock = document.getElementById(`${noteId}`);
  noteBlock
    .querySelector(".note-content")
    .classList.replace("expanded", "collapsed");
  const collapseButton = noteBlock.querySelector(".note-overflow-button");
  collapseButton.classList.replace("note-collapse", "note-expand");
  collapseButton.onclick = () => expandNote(noteId);
  collapseButton.innerText = "More";
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
  noteText.innerText = content ?? DEFAULT_NOTE_TITLE;
  noteText.classList.add("note-content", "note-text", "collapsed");
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
  // eslint-disable-next-line no-console
  button.onclick = onClick ?? (() => console.log("Note button invalid"));
  button.classList.add("note-button");
  button.classList.add(iconName ?? "edit");

  const icon = document.createElement("i");
  icon.classList.add("material-icons");
  icon.innerText = iconName ?? "edit";
  button.appendChild(icon);
  return button;
}

/**
 * Creates an expand button for the note content
 *@param {string} noteId Id of the note to expand
 *@returns {HTMLElement} The html element for the button
 */
export function createExpandButton(noteId) {
  const expandButton = document.createElement("button");
  expandButton.innerText = "More";
  expandButton.classList.add(
    "note-text",
    "note-overflow-button",
    "note-expand",
  );
  expandButton.onclick = () => expandNote(noteId);
  return expandButton;
}

/**
 * Returns a formatted time string from a given ISO string
 * @param {string} timeString The ISO string to convert
 * @returns {string} The formatted version of the string
 */
export function formatTime(timeString) {
  const time = new Date(timeString);
  return time.toLocaleDateString() + " " + time.toLocaleTimeString();
}

/**
 * Generates the list element for displaying tags the user has added to the note
 *
 * @param {string} tagListArray - An array containing the list of tags for the note
 * @returns {HTMLLIElement} 'li' HTML element
 */
function generateTagList(tagListArray) {
  const tagListElement = document.createElement("ul");
  tagListElement.classList.add("tag-list");

  tagListArray.forEach(function (tagItem) {
    const listItem = document.createElement("li");
    listItem.classList.add("tag-item");
    listItem.innerText = tagItem;
    tagListElement.appendChild(listItem);
  });

  return tagListElement;
}

/**
 * Updates the select element to contain all available tags
 */
function updateFilterSelect() {
  const filterSelect = document.getElementById("filter-select");
  filterSelect.innerHTML = "<option value='no-filter'>No Filter</option>";
  filterSet.forEach(function (filter) {
    const filterSelectItem = document.createElement("option");
    filterSelectItem.value = `filter-${filter}`;
    filterSelectItem.innerText = filter;
    filterSelect.appendChild(filterSelectItem);
  });
  filterNotes();
}

/**
 * Filters notes according to selected tag
 */
function filterNotes() {
  const selectedFilter = document.getElementById("filter-select").value;
  const noteBlocks = document.getElementsByClassName("note-block");
  Array.from(noteBlocks).forEach(function (noteBlock) {
    if (
      !noteBlock.classList.contains(selectedFilter) &&
      selectedFilter != "no-filter"
    ) {
      noteBlock.classList.remove("filtered-in");
      noteBlock.classList.add("filtered-out");
    } else {
      noteBlock.classList.remove("filtered-out");
      noteBlock.classList.add("filtered-in");
    }
  });
  // need to wait for grid to resize before checking
  Array.from(noteBlocks).forEach(function (noteBlock) {
    processExpandButton(noteBlock);
  });
}

/**
 * Checks and inserts or removes expand button when necessary
 * @param {HTMLElement} noteBlock The noteBlock to modify
 */
function processExpandButton(noteBlock) {
  const noteText = noteBlock.querySelector(".note-content");
  const expandButton = noteBlock.querySelector(".note-overflow-button");

  if (expandButton == null) {
    if (noteText.scrollHeight > noteText.clientHeight) {
      const newExpandButton = createExpandButton(noteBlock.id);
      const tagAndButtons = noteBlock.querySelector(".tag-and-buttons");
      noteBlock.insertBefore(newExpandButton, tagAndButtons);
    }
  } else {
    if (noteText.scrollHeight <= noteText.clientHeight) {
      noteBlock.removeChild(expandButton);
    }
  }
}

/**
 * Changes toggle button switching between date view and projects
 * Changes appropriate text, loads new notes
 * Creates date picker element
 */
function toggleDateView() {
  const dateButton = document.getElementById("toggle-date-view");
  //First clause for if leaving date view
  if (dateButton.innerText == "Go back to project") {
    dateButton.innerText = "Switch to date view";
    document.querySelector("header>input").remove();
    loadNotesFromStorage("");
    document.getElementById("project-title").innerText = projectId;
    document.getElementById("hide-edit").remove();
    // If going into date view
  } else {
    dateButton.innerText = "Go back to project";
    let dateSelector = document.createElement("input");
    dateSelector.type = "date";
    dateSelector.classList = "date-selector";
    let header = document.querySelector("header");
    header.insertBefore(dateSelector, dateButton);
    let today = new Date();

    dateSelector.value = localeToInputDate(today);
    dateSelector.addEventListener("input", () => updateDateNotes());
    loadNotesFromStorage(dateSelector.value);
    document.getElementById("project-title").innerText = "Notes by Date";

    let style = document.createElement("style");
    style.id = "hide-edit";
    style.innerHTML =
      ".edit, .delete, #create-note-button, #add-to-notes, .todo-grid, #todo-header  {display: none;}";
    document.head.appendChild(style);

  }
}

/**
 * Updates notes displayed whenever the date input is changed
 */
function updateDateNotes() {
  let dateSelector = document.querySelector("header>input");
  loadNotesFromStorage(dateSelector.value);
}

/**
 * Converts a date object into a date string in the format YYYY-MM-DD
 * @param {Date} date Input date ojbect
 * @returns {string} date output string
 */
function localeToInputDate(date) {
  let dateArr = date.toLocaleDateString().split("/");
  if (Number(dateArr[0]) < 10) {
    dateArr[0] = "0" + dateArr[0];
  }
  if (Number(dateArr[1]) < 10) {
    dateArr[1] = "0" + dateArr[1];
  }

  return dateArr[2] + "-" + dateArr[0] + "-" + dateArr[1];
}
/**
 * Creates and saves a note element with the given information of the task id and name
 * @param {string} taskId The id of the task we are adding
 * @param {string} taskName The name of the task we are adding
 */
export function createNoteFromTask(taskId, taskName) {
  /**
   * @type {Note}
   */
  const newNote = {
    id: taskId,
    title: taskName,
    content: "Put the contents of your finished task here!",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  notes.push(newNote);
  genNoteElement(newNote);
  saveToLocalStorage(notes);
}
