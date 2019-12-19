const todoList = () => {
  let list = window.localStorage;
  let index = 0;
  
  const addProject = (project) => {
    project.index = index;
    const projectText = JSON.stringify(project);
    list.setItem(index, projectText);
    index++;
  }

  const deleteProject = (index) => {
    list.removeItem(index);
  }

  return {
    list,
    addProject,
    deleteProject,
  }
}

export default todoList;