/**
 * @file This file handles the to-do list functionality for the project page.
 * It includes:
 * - Adding new tasks
 * - Marking tasks as completed
 * - Deleting tasks
 * - Saving and loading tasks from localStorage
 */
window.addEventListener("load", () => initTodoList());

let tasks = [];

/**
 * Initializes the to-do list
 */
function initTodoList() {
  const projectId = new URL(window.location).searchParams.get("projectId");
  if (!projectId) {
    alert("No project ID provided");
    return;
  }

  document
    .getElementById("add-task-button")
    .addEventListener("click", () => addTask(projectId));
  loadTasksFromStorage(projectId);

  document.getElementById("toggle-sidebar-button").addEventListener("click", toggleSidebar);
}

/**
 * Adds a new task to the task list
 * @param {string} projectId The ID of the current project
 */
function addTask(projectId) {
  const newTaskName = document.getElementById("new-task-name").value.trim();

  if (newTaskName === "") {
    alert("Task name cannot be empty");
    return;
  }

  const newTask = {
    id: `${projectId}#task#${Date.now()}`,
    name: newTaskName,
    completed: false,
  };
  tasks.push(newTask);
  renderTasks(projectId);
  saveTasksToLocalStorage(projectId);

  document.getElementById("new-task-name").value = ""; // Clear input field after adding task
}

/**
 * Renders the task list on the page
 * @param {string} projectId The ID of the current project
 */
function renderTasks(projectId) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear existing tasks

  for (const task of tasks) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = task.completed;

    const taskName = document.createElement("span");
    taskName.innerText = task.name;

    // Checkbox event listener needs to be added after span element
    // Task needs to be marked completed in event listener or item will not update until tasks are re-rendered
    taskCheckbox.addEventListener("change", () => {
      task.completed = taskCheckbox.checked;
      if (task.completed) {
        taskName.classList.add("task-completed");
      } else {
        taskName.classList.remove("task-completed"); // Allows task to be unchecked
      }
      saveTasksToLocalStorage(projectId);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="material-icons">delete</i>';
    deleteButton.addEventListener("click", () => {
      deleteTask(task.id, projectId);
    });

    taskItem.appendChild(taskCheckbox);
    taskItem.appendChild(taskName);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  }
}

/**
 * Deletes a task from the task list
 * @param {string} taskId The ID of the task to be deleted
 * @param {string} projectId The ID of the current project
 */
function deleteTask(taskId, projectId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks(projectId);
  saveTasksToLocalStorage(projectId);
}

/**
 * Saves the tasks to localStorage
 * @param {string} projectId The ID of the current project
 */
function saveTasksToLocalStorage(projectId) {
  localStorage.setItem(`${projectId}#tasks`, JSON.stringify(tasks));
}

/**
 * Retrieves the tasks from localStorage
 * @param {string} projectId The ID of the current project
 */
function loadTasksFromStorage(projectId) {
  tasks = JSON.parse(localStorage.getItem(`${projectId}#tasks`)) || [];
  renderTasks(projectId);
}


/**
 * Toggles the ToDo sidebar when the button is pressed
 */
function toggleSidebar() {
  const todoList = document.getElementById("todo-list");
  const collapseButton = document.getElementById("toggle-sidebar-button");
  if (todoList.classList.replace("closed", "open")) {
    collapseButton.querySelector("i").innerText = "chevron_right";
  } else {
    todoList.classList.replace("open", "closed");
    collapseButton.querySelector("i").innerText = "chevron_left";
  }  
}