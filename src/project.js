const project = (args) => {
  const { title } = args;
  const { description } = args;
  const  tasks  = [];
  const addTask = (task) => {
     return tasks.push(task)
  }
  const taskTitles = () => {
    let titles = tasks.map(obj => ({
        title: obj.title()
    }));
    return JSON.stringify(titles);
  }
  
  return {
    title,
    description,
    tasks,
    addTask,
    taskTitles,
  };
};

export default project;
