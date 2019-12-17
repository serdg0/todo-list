import todoList from './todo';
import project from './project';
import task from './task';
//display all project, display tasks, add new project button, add delete button, project complete checkbox
//task complete checkbox, form for project, form for task.
const addTaskForm = (project) => {
    let newTask = task({});
    let container = document.getElementById('container');
    let title = document.createElement('input');
    newTask.title = title.value;
    let submit = addButton(project);
    container.appendChild(title);
    container.appendChild(submit);
}

const displayProjects = (todoList) => {
    const container = document.createElement("div");
    const body = document.getElementsByTagName('body')[0];
    container.setAttribute('id', 'container');
    todoList.list.forEach(project => {
        let index = 0;
        let projectDiv = document.createElement('div');
        let title = document.createTextNode(`${project.title}`);
        let description = document.createTextNode(`${project.description}`);
        let taskContainer = document.createElement('div');
        const taskForm = addTaskForm(project); 
        project.tasks.forEach(task => {
            let taskTitle = document.createTextNode(`${task.title()}`);
            let taskCheckbox = document.createElement('input');
            let destroyButton = deleteButton(project, index);
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.checked = task.completed;
            if (taskCheckbox.checked == true){
                task.completed = true;
              } else {
                task.completed = false;
              }
            taskContainer.appendChild(taskTitle);
            taskContainer.appendChild(taskCheckbox);
            taskContainer.appendChild(destroyButton);
            index++;
        })
        projectDiv.appendChild(title);
        projectDiv.appendChild(description);
        projectDiv.appendChild(taskContainer);
        projectDiv.appendChild(taskForm);
        container.appendChild(projectDiv);
    })
    body.appendChild(container);
    
}

const deleteButton = (project, index) => {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete Task';
    deleteButton.onclick = project.deleteTask(index);
    return deleteButton;
}

const addButton = (project) => {
    const addButton = document.createElement('button');
    addButton.innerHTML = 'New Task';
    addButton.onclick = project.addTask(task);
}


export default displayProjects;