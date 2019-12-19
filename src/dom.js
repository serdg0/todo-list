import todoList from './todo';
import project from './project';
import task from './task';
//display all project, display tasks, add new project button, add delete button, project complete checkbox
//task complete checkbox, form for project, form for task.
const addTaskForm = (project) => {
  const container = document.getElementById(`${project.index}`);
  container.innerHTML = '';
  const title = document.createElement('input');
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'task-title');
  titleLabel.innerHTML = 'Task: ';
  const checkBox = document.createElement('input');
  checkBox.type = "checkbox";
  checkBox.setAttribute('id', 'completed');
  const boxLabel = document.createElement('label');
  boxLabel.setAttribute('for', 'completed');
  boxLabel.innerHTML = 'Task done?';
  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Add';
  submitButton.onclick = () => addTaskToProj(project, title, checkBox);
  container.appendChild(titleLabel);
  container.appendChild(title);
  container.appendChild(boxLabel);
  container.appendChild(checkBox);
  container.appendChild(submitButton);
  return container
}

const addTaskToProj = (proj, input, checkbox) => {
  project(proj).addTask(task({
    title: `${input.value}`,
    completed: checkbox.checked,
  }));
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
    taskTitle.appendChild(textTitle);
    taskCompleted.appendChild(textCompleted);
    container.appendChild(taskTitle);
    container.appendChild(taskCompleted);
    taskArr.push(container);
  });
  return taskArr;
}

const projectDivs = (todoList) => {
  const hash = JSON.parse(JSON.stringify(todoList.list));
  let projectArr = [];
  for (let key in hash) {
    const obj = JSON.parse(hash[key]);
    const projectDiv = document.createElement('div');
    const projectTitle = document.createElement('div');
    const projectDescription = document.createElement('div');
    const textTitle = document.createTextNode(`TITLE: ${obj.title}`);
    const textDescription = document.createTextNode(`DESCRIPTION: ${obj.description}`);
    const tasksDivisions = taskDivs(obj);
    const addTaskButton = document.createElement('button');
    addTaskButton.innerHTML = 'Add a task';
    addTaskButton.onclick = () => addTaskForm(obj);
    projectTitle.appendChild(textTitle);
    projectDescription.appendChild(textDescription);
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDescription);
   const formDiv = document.createElement('div');
   formDiv.setAttribute('id', `${obj.index}`)

    tasksDivisions.forEach(div => {
      projectDiv.appendChild(div);
    })


    projectDiv.appendChild(addTaskButton);
    projectDiv.appendChild(formDiv);
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