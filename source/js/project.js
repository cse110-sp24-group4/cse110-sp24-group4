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
   // Creating the new variables for the project item shown on webpage
   const newProject = document.createElement("li"); // List item
   const newLink = document.createElement("a"); // Link to project.html w/ project id
 
   const newDelete = document.createElement("button"); // Delete button
   newDelete.innerText = "Delete";
   newDelete.addEventListener("click", () => {
     deleteProject(projectId);
   });
 
   newLink.href = `./notes.html?projectId=${projectId}`; // Setting embedded url
   newLink.innerText = `${projectId}`; // Displayed name is the projectId
   newProject.id = projectId;
   newProject.appendChild(newLink); // Adding link to list item
   newProject.appendChild(newDelete); // Adding delete button to list item
 
   return newProject; // Returning the new project
 }
 
 /**
  * Creates a new project upon the new project button being pressed
  */
 function createProject() {
   // Gets value from textarea to be the projectId
   const newProjectName = document.getElementById("new-project-name").value.trim();
   
   if (newProjectName === "") {
     alert("Project name cannot be empty");
     return;
   }
 
   projects.push(newProjectName); // Pushes new projectId to projects array
 
   // Steps to make new project item
   const newProjectItem = createProjectItem(newProjectName);
   const projectList = document.getElementById("Project-List");
   projectList.appendChild(newProjectItem);
 
   localStorage.setItem("projects", JSON.stringify(projects)); // Saves the projects in local storage
 
   document.getElementById("new-project-name").value = ""; // Clear input field after adding project
 }
 
 /**
  * Removes the project from the website visually
  * @param {string} projectId string identifier of the project to be deleted
  */
 function deleteProject(projectId) {
   let parentId = document.getElementById(projectId);
   projects = projects.filter((project) => project !== projectId); // Removes project from projects array
 
   const projectList = document.getElementById("Project-List");
   projectList.removeChild(parentId); // Removing project visually from website
 
   localStorage.setItem("projects", JSON.stringify(projects)); // Saves the projects in local storage
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
 