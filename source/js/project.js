/**
 * @file
 * This file handles functionality for the landing page including
 * - Loading projects
 * - Adding projects
 * - Saving projects to localStorage
 * - Navigating to the project page with proper project ID as a param
 */
window.addEventListener("load", () => init());

let projects = [];

/**
 * Initializes the page
 */
function init() {
  getProjectsFromLocalStorage();
  const createProjectButton = document.getElementById("project-create");
  createProjectButton.addEventListener("click", createProject);
}

/**
 * Takes the projectId and creates a project with it associated with its own project page as well as edit and delete buttons
 * @param {string} projectId string identifier for project which we are creating an element for
 * @returns {li} an HTML li element containing the name of the project, link to notes page, and delete button
 */
function createProjectItem(projectId) {
  //creating the new variables for the project item shown on webpage
  const newProject = document.createElement("li"); //list item
  const newLink = document.createElement("a"); //link to project.html w/ project id.

  const newDelete = document.createElement("button"); //delete button
  newDelete.innerText = "Delete";
  newDelete.addEventListener("click", () => {
    deleteProject(projectId);
  });

  newLink.href = `./notes.html?projectId=${projectId}`; //setting embedded url
  newLink.innerText = `${projectId}`; //displayed name is the projectId.
  newProject.id = projectId;
  newProject.appendChild(newLink); //adding link to list item
  newProject.appendChild(newDelete); //adding delete button to list item.

  return newProject; //returning the new project.
}

/**
 * Creates a new project upon the new project button being pressed
 */
function createProject() {
  //gets value from textarea to be the projectId.
  const newProjectName = document.getElementById("new-project-name").value;

  // Try block to catch exceptions thrown by name check
  try {
    const valid = isValidProjectName(newProjectName); // Will throw an exception if project name is invalid
    projects.push(newProjectName); //pushes new projectId to projects array

    //steps to make new project item.
    const newProjectItem = createProjectItem(newProjectName);
    const projectList = document.getElementById("Project-List");
    projectList.appendChild(newProjectItem);

    localStorage.setItem("projects", JSON.stringify(projects)); // saves the projects in local storage
    setNamingErrorMessage(false); // Hides naming error message
  } catch (error) {
    setNamingErrorMessage(true, error.message); // Displays naming error message under text area
  }
}

/**
 * Removes the project from the website visually and in local storage
 * Also removes associated notes from local storage
 * @param {string} projectId string identifier of the project to be deleted
 */
function deleteProject(projectId) {
  if (
    window.confirm(
      `Are you sure you want to delete ${projectId} and associated notes? (This action cannot be undone)`,
    )
  ) {
    let parentId = document.getElementById(projectId);
    projects = projects.filter((project) => project != projectId); // removes project from projects array

    const projectList = document.getElementById("Project-List");
    projectList.removeChild(parentId); // removing project visually from website

    localStorage.setItem("projects", JSON.stringify(projects)); // saves the projects in local storage

    localStorage.removeItem(`${projectId}#notes`); // removes associated notes from local storage
  } else {
    return;
  }
}

/**
 * When website is loaded, retrieve all of the projects from local storage
 */
function getProjectsFromLocalStorage() {
  const projectList = document.getElementById("Project-List");
  const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  for (const projectId of storedProjects) {
    let item = createProjectItem(projectId);
    projectList.appendChild(item);
  }

  projects = storedProjects;
}

/**
 * Verifies that project name is valid. Valid strings are structured as follows:
 * Contains only the following characters:
 * - Alphanumeric
 * - '-'
 * - '.'
 * - '_'
 * - '~'
 * The name cannot be blank and must not be longer than 30 characters
 * @param {string} name entered name of project
 * @throws {Error} Throws an error with a message corresponding to fail condition
 * @return {boolean} true if name is valid
 */
function isValidProjectName(name) {
  const validCharacters = /^[A-Za-z0-9\-._~ ]+$/

  if (name.length < 1) {
    throw new Error("Project name must not be blank."); // Disallow blank names
  } else if (name.length > 30) {
    throw new Error("Project name cannot exceed 30 characters"); // Names should be max 30 characters
  } else if (projects.includes(name)){
    throw new Error(`${name} is already in use!`); // Disallow duplicate project names
  } else if (!validCharacters.test(name)) {
    throw new Error("Project names can only contain letters, numbers, spaces and '-', '.', '_', '~'"); // Disallow reserved URI characters
  }

  return true; // Return true if all checks pass
}

/**
 * Sets project naming message to be displayed or hidden
 * @param {boolean} display True if message should be displayed, false if message should be hidden
 * @param {string} message Message to be displayed in case of error
 */
function setNamingErrorMessage(display, message = "Project naming error") {
  const errorMessage = document.getElementById("project-name-error-message"); // Get error message element
  if (display) {
    errorMessage.innerText = message; // Set specific error message 
    errorMessage.hidden = false; // Displays message
  } else {
    errorMessage.hidden = true; // Hides message
  }
}