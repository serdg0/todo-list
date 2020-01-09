const project = (args) => {
  const { title } = args;
  const { description } = args;
  const tasks = [];

  const projectCompleted = () => {
    if (args.hasOwnProperty('completed')) {
      return args.completed;
    }
    tasks.forEach((task) => {
      if (task.completed === false) {
        args.completed = false;
      } else {
        args.completed = true;
      }
    });

    return args.completed;
  };

  const mySelf = () => {
    let thisProj;
    Array.from(localStorage).forEach((string) => {
      const obj = JSON.parse(string);
      if (obj.title === title) {
        thisProj = obj;
      }
    });
    return thisProj;
  };

  const myIndex = () => {
    const obj = mySelf();
    return Array.from(localStorage).indexOf(JSON.stringify(obj));
  };

  const addTask = (task) => {
    const index = myIndex();
    const object = mySelf();
    object.tasks.push(task);
    localStorage[index] = JSON.stringify(object);
  };


  const deleteTask = (index) => delete tasks[index];

  return {
    title,
    description,
    tasks,
    addTask,
    deleteTask,
    projectCompleted,
  };
};

export default project;
