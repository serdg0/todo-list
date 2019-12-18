const todoList = () => {
  let list = window.localStorage;
  let index = 0;
  const addProject = (project) => {
    const projectText = JSON.stringify(project);
    list.setItem(index, projectText);
    index++;
  }

  const findProject = () => {
    
  }

  const allProjects = JSON.parse(JSON.stringify(list));

  const destroyProject = (project) => {
    list.removeItem(project);
  }
  return {
    list,
    allProjects,
    addProject,
    destroyProject,
  }
}

export default todoList;