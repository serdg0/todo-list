const todoList = () => {
    const list = window.localStorage;
    let index = 0;
    const addProject = (project) => {
        list.setItem('index', project);
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