import project from './project';
import task from './task';
//display all project, display tasks, add new project button, add delete button, project complete checkbox
//task complete checkbox, form for project, form for task.
var index = 0;

const addProject = (project) => {
  project.index = index;
  const projectText = JSON.stringify(project);
  localStorage.setItem(index, projectText);
  index += 1;
}

const addTaskForm = (project) => {
  const container = document.getElementById(`${project.title}`);
  //container.innerHTML = '';
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

const addProjectNav = () => {
  const nav = document.getElementById('nav');
  const newProject = document.createElement('button');
  newProject.innerHTML = 'New To-do';
  newProject.onclick = () => projectForm();
  nav.appendChild(newProject);
}

const projectForm = () => {
  const nav = document.getElementById('nav');
  const formDiv = document.createElement('div');
  nav.appendChild(formDiv);
  const title = document.createElement('input');
  const completed = document.createElement('input');
  completed.setAttribute('type', 'checkbox');
  const description = document.createElement('input');
  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Submit';
  submitButton.onclick = () => addProject(project({
    title: `${title.value}`,
    description: `${description.value}`,
    completed: completed.checked,
  }));

  formDiv.appendChild(title)
  formDiv.appendChild(description);
  formDiv.appendChild(completed);
  formDiv.appendChild(submitButton);

}

const addTaskToProj = (proj, input, checkbox) => {
  project(proj).addTask(task({
    title: `${input.value}`,
    completed: checkbox.checked,
  }));
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

const printProject = (obj) => {
  const projectDiv = document.createElement('div');
  projectDiv.setAttribute('id', `${obj.title}`)
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

  index += 1;
  projectDiv.appendChild(addTaskButton);
  projectDiv.appendChild(formDiv);
  return projectDiv;
}

const projectDivs = () => {
  const hash = JSON.parse(JSON.stringify(localStorage));
  let projectArr = [];
  for (let key in hash) {
    const obj = JSON.parse(hash[key]);
    projectArr.push(printProject(obj, projectArr));
  }
  return projectArr;
}

const displayInt = () => {
  addProjectNav();
  const divs = projectDivs();
  const body = document.getElementsByTagName('body')[0];

  divs.forEach(project => {
    body.appendChild(project);
  })
}

export { displayInt, addProject };