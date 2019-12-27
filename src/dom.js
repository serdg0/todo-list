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
  const container = document.getElementById(`add-task-form`);
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
  submitButton.onclick = () => {
    addTaskToProj(project, title, checkBox);
    displayInt();
    openProject(project);
    container.innerHTML = ' ';
  }
  container.appendChild(titleLabel);
  container.appendChild(title);
  container.appendChild(boxLabel);
  container.appendChild(checkBox);
  container.appendChild(submitButton);
  return container
}

const addProjectNav = () => {
  const nav = document.getElementById('add-project-div');
  nav.innerHTML = ' ';
  const newProject = document.createElement('button');
  newProject.setAttribute('class', 'project-button bg-primary text-white');
  newProject.innerHTML = 'New To-do';
  newProject.onclick = () => {
    document.getElementById('project-tasks').innerHTML = ' ';
    document.getElementById('project-add-task').innerHTML = ' ';
    projectForm();
  }
  nav.appendChild(newProject);
}

const projectForm = () => {
  const titleDiv = document.getElementById('project-head-div');
  titleDiv.innerHTML = ' ';
  const descDiv = document.getElementById('project-dec');
  descDiv.innerHTML = ' ';
  const title = document.createElement('input');
  title.setAttribute('class', 'input title');
  title.placeholder = 'Project Name';
  const description = document.createElement('textarea');
  description.setAttribute('rows', '4');
  description.setAttribute('class', 'input desc')
  description.placeholder = 'Project Description';
  const completed = document.createElement('input');
  completed.setAttribute('type', 'checkbox');
  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Add Project';
  submitButton.setAttribute('class', 'btn btn-primary');
  submitButton.onclick = () => {
    addProject(project({
      title: `${title.value}`,
      description: `${description.value}`,
      completed: completed.checked,
    }));
    displayInt();
  }

  titleDiv.appendChild(title);
  descDiv.appendChild(description);
  descDiv.appendChild(completed);
  descDiv.appendChild(submitButton);

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
    const taskTitle = document.createElement('span');
    const taskCompleted = document.createElement('span');
    const textTitle = document.createTextNode(`${task.title}`);
    const textCompleted = document.createElement('input');
    textCompleted.setAttribute('type', 'checkbox');
    textCompleted.setAttribute('id', `${task.title}`);
    textCompleted.checked = task.completed;
    if (task.completed) {
      container.setAttribute('class', 'task-div bg-success text-white');
    } else {
      container.setAttribute('class', 'task-div bg-warning text-dark');
    }
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
  project - dec
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

const listProject = () => {
  const hash = JSON.parse(JSON.stringify(localStorage));
  let projectArr = [];
  for (let key in hash) {
    const obj = JSON.parse(hash[key]);
    projectArr.push(printProjectList(obj, projectArr));
  }
  return projectArr;
}

const printProjectList = (obj) => {
  const projectButton = document.createElement('button');
  projectButton.setAttribute('id', `${obj.title}`);
  projectButton.setAttribute('class', 'project-button');
  projectButton.innerHTML = `${obj.title}`;
  projectButton.onclick = () => openProject(obj);
  index += 1;
  return projectButton;
}

const openProject = (obj) => {
  const projectHeadDiv = document.getElementById('project-head-div');
  projectHeadDiv.innerHTML = ' ';
  const projectHead = document.createElement('h2');
  projectHead.setAttribute('id', 'project-head');
  projectHead.innerHTML = `${obj.title}`;
  projectHeadDiv.appendChild(projectHead);
  const projectDesc = document.getElementById('project-dec');
  const projectText = document.createElement('p');
  projectText.textContent = `${obj.description}`;
  projectDesc.innerHTML = projectText.outerHTML;

  const tasksDivisions = taskDivs(obj);
  const projectTasks = document.getElementById('project-tasks');
  projectTasks.innerHTML = ' ';

  tasksDivisions.forEach(div => {
    projectTasks.appendChild(div);
  })
  document.getElementById('add-task-form').innerHTML = ' ';
  const addTaskButton = document.createElement('button');
  addTaskButton.innerHTML = 'Add a task';
  addTaskButton.onclick = () => addTaskForm(obj);
  const addTaskDiv = document.getElementById('project-add-task');
  addTaskDiv.innerHTML = ' ';
  addTaskDiv.appendChild(addTaskButton);
}

const displayInt = () => {
  index = 0;
  addProjectNav();
  const divs = listProject();
  const body = document.getElementsByTagName('body')[0];
  const projectListDiv = document.getElementById('project-list');
  projectListDiv.innerHTML = ' ';
  divs.forEach(project => {
    projectListDiv.appendChild(project);
  })
}

export { displayInt, addProject };