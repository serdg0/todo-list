const project = (args) => {
  const { title } = args;
  const { description } = args;
  const  tasks  = [];
  const projectCompleted = () => {
    if (args.hasOwnProperty('completed')) {
      return args.completed
    } else {
      tasks.forEach(task => {
        if (task.completed === false) {
          args.completed = false;
        } else {
          args.completed = true;
        }
        
      })
    }
    return args.completed
}
  const addTask = (task) => {
     return tasks.push(task)
  }
  const taskTitles = () => {
    let titles = tasks.map(obj => ({
        title: obj.title()
    }));
    return JSON.stringify(titles);
  }

  const deleteTask = (index) => {
    return delete tasks[index];
  }
  
  return {
    title,
    description,
    tasks,
    addTask,
    taskTitles,
    deleteTask,
    projectCompleted,
  };
};

export default project;
