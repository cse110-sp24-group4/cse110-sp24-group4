window.addEventListener("load", () => init());

const projects =[];



function init(){

    const project_list = document.getElementById("Project-List");

    const new_project_btn = document.getElementById("add-new-project");
    //new_project_btn.addEventListener("click", () => createProject());
    loadProjects();
    generateProjectList();
    //window.addEventListener("load", () => generateProjectList());
}

function loadProjects(){ // <- yet to implement fully.
    let projectsStringified = json.stringify(projects);
    localStorage.setItem("projects", projectsStringified);
}
  
  
  // Stringify array and place it in localStorage <- yet to implement fully 
function saveProjects() {
    let projectsStringified = json.stringify(projects);
    localStorage.setItem("projects", projectsStringified);
}
  

function createProjectItem(projectId){
    //creating the new variables for the project item shown on webpage
    const new_project = document.createElement("li"); //list item
    const new_link = document.createElement("a"); //link to project.html w/ project id.
    const new_delete = document.createElement("button"); //delete button

    new_delete.innerText="Delete";
    
    new_link.href=`./pages/project.html?projectid=${projectId}`; //setting embedded url 
    new_link.innerText = `${projectId}`; //displayed name is the projectId.

    new_project.appendChild(new_link); //adding link to list item
    new_project.appendChild(new_delete); //adding delete button to list item.

    return new_project; //returning the new project.



}

function generateProjectList(){ //<- yet to implement fully.
    const projectList = document.getElementById("Project-List");
    for(const i = 0; i < projects.length; i++){
        const project = localStorage.getItem(projects[i]);
        projectList.appendChild(project);
    }

    /*for(const project in projects){
        document.write(project);
        let item = createProjectItem(project);
        projectList.appendChild(item);
    }*/
}

function createProject() {
    
    //gets value from textarea to be the projectId. 
    const newProjectName = document.getElementById("new-project-name").value; 

    projects.push(newProjectName); //pushes new projectId to projects array 

    //steps to make new project item.
    const newProjectItem = createProjectItem(newProjectName);
    const projectList = document.getElementById("Project-List");
    projectList.appendChild(newProjectItem);

    //saveProjects(); <- yet to implement fully.
}


/*function deleteProject(projectId){
    let parentId = document.getElementById(projectId);
    projects.remove(parentId);

    document.remove(parentId);
   // document.removeElementById(parentId); doesn't work.
}*/