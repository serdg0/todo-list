import project from './project';
import task from './task';

let index = 0;

const addProject = (project) => {
  if (project.title != '') {
    project.index = index;
    const projectText = JSON.stringify(project);
    localStorage.setItem(index, projectText);
    index += 1;
  } else {
    return false;
  }
};

const deleteProject = (project) => {
  localStorage.removeItem(project.index);
};

const addTaskForm = (project) => {
  const container = document.getElementById('add-task-form');
  container.innerHTML = '';
  const title = document.createElement('input');
  title.required = true;
  const titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'task-title');
  titleLabel.innerHTML = 'Task: ';
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.setAttribute('id', 'completed');
  const boxLabel = document.createElement('label');
  boxLabel.setAttribute('for', 'completed');
  boxLabel.innerHTML = 'Task done?';
  const dueDate = document.createElement('input');
  dueDate.setAttribute('id', 'datelab');
  const dateLabel = document.createElement('label');
  dateLabel.for = 'datelab';
  dueDate.type = 'date';
  dueDate.required = true;
  const description = document.createElement('input');
  const descriptionLabel = document.createElement('label');
  description.id = 'descr';
  descriptionLabel.for = 'descr';
  description.type = 'text';
  description.required = true;
  descriptionLabel.innerHTML = 'Describe: ';
  const priority = document.createElement('select');
  priority.name = 'priority';
  const high = document.createElement('option');
  const low = document.createElement('option');
  high.value = 'high';
  high.innerHTML = 'High';
  low.value = 'low';
  low.innerHTML = 'Low';
  priority.appendChild(high);
  priority.appendChild(low);


  const submitButton = document.createElement('button');
  submitButton.innerHTML = 'Add';
  submitButton.onclick = () => {
    console.log(dueDate);
    addTaskToProj(project, title, checkBox, dueDate.value, description.value, priority.value);
    displayInt();
    container.innerHTML = ' ';
    openProject(JSON.parse(localStorage[project.index]));
  };
  container.appendChild(titleLabel);
  container.appendChild(title);
  container.appendChild(boxLabel);
  container.appendChild(checkBox);
  container.appendChild(dateLabel);
  container.appendChild(dueDate);
  container.appendChild(descriptionLabel);
  container.appendChild(description);
  container.appendChild(priority);
  container.appendChild(submitButton);
  return container;
};

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
  };
  const clear = document.createElement('button');
  clear.setAttribute('class', 'clear-all');
  clear.innerHTML = 'Clear All';
  clear.onclick = () => {
    localStorage.clear();
    displayInt();
  };
  nav.appendChild(newProject);
  nav.appendChild(clear);
};

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
  description.setAttribute('class', 'input desc');
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
  };

  titleDiv.appendChild(title);
  descDiv.appendChild(description);
  descDiv.appendChild(completed);
  descDiv.appendChild(submitButton);
};

const addTaskToProj = (proj, input, checkbox, dueDate, description, priority) => {
  if (input.value != ""){
    project(proj).addTask(task({
      title: `${input.value}`,
      completed: checkbox.checked,
      dueDate: dueDate,
      description: description,
      priority: priority,
      }));
  } else {
    return false;
  }

}

const taskDivs = (obj) => {
  const taskArr = [];
  let counter = 0;
  obj.tasks.forEach((task) => {
    const container = document.createElement('div');
    const taskTitle = document.createElement('span');
    const taskCompleted = document.createElement('span');
    taskCompleted.setAttribute('id', 'task-func');
    const textTitle = document.createTextNode(`${task.title}`);
    const textCompleted = document.createElement('input');
    textCompleted.setAttribute('type', 'checkbox');
    textCompleted.setAttribute('id', `${task.title}`);
    textCompleted.checked = task.completed;
    if (textCompleted.checked) {
      container.setAttribute('class', 'task-div bg-success text-white');
    } else {
      container.setAttribute('class', 'task-div bg-warning text-dark');
    }
    textCompleted.onclick = () => {
      task.completed = !task.completed;
      localStorage.setItem(obj.index, JSON.stringify(obj));
      openProject(obj);
    };
    counter += 1;
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.onclick = () => {
      const index = obj.tasks.indexOf(task);
      obj.tasks.splice(index, 1);
      localStorage.setItem(obj.index, JSON.stringify(obj));
      openProject(obj);
    };
    const view = document.createElement('button');
    view.innerHTML = 'View';
    view.setAttribute('class', 'delete-button');
    view.onclick = () => {
      view.removeAttribute('onclick');
      const viewDiv = document.createElement('div');
      container.appendChild(viewDiv);
      const taskDispDesc = document.createElement('p');
      const taskDispDate = document.createElement('p');
      const taskDispPriority = document.createElement('p');
      taskDispDesc.innerHTML = `${task.description}`;
      taskDispDate.innerHTML = `${task.dueDate}`;
      taskDispPriority.innerHTML = `${task.priority}`;
      const clearButton = document.createElement('button');
      clearButton.innerHTML = 'Gotcha!';
      viewDiv.appendChild(taskDispDesc);
      viewDiv.appendChild(taskDispDate);
      viewDiv.appendChild(taskDispPriority);
      viewDiv.appendChild(clearButton);
      clearButton.onclick = () => {
        openProject(obj);
      }
    }
    taskTitle.appendChild(textTitle);
    taskCompleted.appendChild(textCompleted);
    taskCompleted.appendChild(deleteButton);
    taskCompleted.appendChild(view);
    container.appendChild(taskTitle);
    container.appendChild(taskCompleted);
    taskArr.push(container);
  });
  return taskArr;
};

const listProject = () => {
  const hash = JSON.parse(JSON.stringify(localStorage));
  const projectArr = [];
  for (const key in hash) {
    const obj = JSON.parse(hash[key]);
    projectArr.push(printProjectList(obj, projectArr));
  }
  return projectArr;
};

const printProjectList = (obj) => {
  const projectButton = document.createElement('button');
  projectButton.setAttribute('id', `${obj.title}`);
  projectButton.setAttribute('class', 'project-button');
  projectButton.innerHTML = `${obj.title}`;
  projectButton.onclick = () => openProject(obj);
  index += 1;
  return projectButton;
};

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

  tasksDivisions.forEach((div) => {
    projectTasks.appendChild(div);
  });
  document.getElementById('add-task-form').innerHTML = ' ';
  const addTaskButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete-button');
  deleteButton.innerHTML = `Delete ${obj.title}`;
  deleteButton.onclick = () => {
    deleteProject(obj);
    displayInt();
  };
  addTaskButton.innerHTML = 'Add a task';
  addTaskButton.onclick = () => addTaskForm(obj);
  const addTaskDiv = document.getElementById('project-add-task');
  addTaskDiv.innerHTML = ' ';
  addTaskDiv.appendChild(addTaskButton);
  projectHeadDiv.appendChild(deleteButton);
};

const displayInt = () => {
  index = 0;
  addProjectNav();
  const divs = listProject();
  const projectListDiv = document.getElementById('project-list');
  projectListDiv.innerHTML = ' ';
  divs.forEach((project) => {
    projectListDiv.appendChild(project);
  });
};

export { displayInt, addProject };
