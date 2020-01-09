const task = (args) => {
  const { title } = args;
  const completedFun = () => (args.hasOwnProperty('completed') ? args.completed : false);

  const completed = completedFun();
  const { description } = args;
  const { dueDate } = args;
  const { priority } = args;

  return {
    title,
    completed,
    description,
    dueDate,
    priority
  };
};

export default task;
