const task = (args) => {
  const { title } = args;
  const completedFun = () => (args.hasOwnProperty('completed') ? args.completed : false);

  const completed = completedFun();

  return {
    title,
    completed,
  };
};

export default task;
