const todoList = () => {
    const list = [];
    const addProject = (project) => {
        list.push(project);
    }
    /*
    const destroyProject = (project) => {
        delete project;
    } */
    return {
        list,
        addProject,
    }
}

export default todoList;