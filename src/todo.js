const todoList = () => {
  let list = window.localStorage;
  let index = 0;
  const addProject = (project) => {
    const projectText = JSON.stringify(project);
    list.setItem(`${index}`, `${projectText}`);
    index++;
  }

  const destroyProject = (project) => {
    list.removeItem(project);
  }
  return {
    list,
    addProject,
    destroyProject,
  }
}

export default todoList;