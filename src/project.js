const project = (args) => {
  const { title } = args;
  const { description } = args;
  var tasks = [];

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
    let index = myIndex();
    let object = mySelf();
    object.tasks.push(task);
    localStorage[index] = JSON.stringify(object);
  }

  const mySelf = () => {
    let thisProj;
    Array.from(localStorage).forEach(string => {
      let obj = JSON.parse(string);
      if (obj.title === title) {
        thisProj = obj;
      }
    })
    return thisProj;
  }

  const myIndex = () => {
    let obj = mySelf();
    return Array.from(localStorage).indexOf(JSON.stringify(obj));
  }

  const deleteTask = (index) => {
    return delete tasks[index];
  }

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