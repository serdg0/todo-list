import todoList from './todo';
import project from './project';
import task from './task';
//display all project, display tasks, add new project button, add delete button, project complete checkbox
//task complete checkbox, form for project, form for task.
const addTaskForm = (project) => {
  let container = document.getElementById('container');
  let title = document.createElement('input');
  const args = { title: `${title.value}` };
  let submit = addButton();
  submit.onclick = project.addTask(task(args));
  container.appendChild(title);
  container.appendChild(submit);
}

const addButton = (project) => {
  const addButton = document.createElement('button');
  addButton.innerHTML = 'New Task';
  addButton.onclick = addTaskForm(project)
  return addButton;
}

const deleteButton = (project, index) => {
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Delete Task';
  deleteButton.onclick = project.deleteTask(index);
  return deleteButton;
}

const taskDivs = (obj) => {
  let taskArr = [];
  obj.tasks.forEach(task => {
    const container = document.createElement('div');
    const taskTitle = document.createElement('div');
    const taskCompleted = document.createElement('div');
    const textTitle = document.createTextNode(`${task.title}`);
    const textCompleted = document.createElement('input');
    textCompleted.setAttribute('type', 'checkbox');
    textCompleted.setAttribute('id', `${task.title}`);
    textCompleted.checked = task.completed;
    //const textCompleted = document.createTextNode(`${task.completed}`);
    taskTitle.appendChild(textTitle);
    taskCompleted.appendChild(textCompleted);
    container.appendChild(taskTitle);
    container.appendChild(taskCompleted);
    taskArr.push(container);
  });
  return taskArr;
}

const projectDivs = (todoList) => {
  const hash = todoList.allProjects;
  let projectArr = [];
  for (let key in hash) {
    const obj = JSON.parse(hash[key]);
    const projectDiv = document.createElement('div');
    const projectTitle = document.createElement('div');
    const projectDescription = document.createElement('div');
    const textTitle = document.createTextNode(`TITLE: ${obj.title}`);
    const textDescription = document.createTextNode(`DESCRIPTION: ${obj.description}`);
    const tasksDivisions = taskDivs(obj);
    projectTitle.appendChild(textTitle);
    projectDescription.appendChild(textDescription);
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDescription);

    tasksDivisions.forEach(div => {
      projectDiv.appendChild(div);
    })
    const taskFormDiv = document.createElement('div');
    taskFormDiv.appendChild(addButton(obj));
    projectDiv.appendChild(taskFormDiv);

    projectArr.push(projectDiv);
  }
  return projectArr;
}

const displayInt = (todoList) => {
  const divs = projectDivs(todoList);
  const body = document.getElementsByTagName('body')[0];

  divs.forEach(project => {
    body.appendChild(project);
  })
}

export default displayInt;