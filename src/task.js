const task = (args) => {
  const { title } = args;
  const completedFun = () => {
      return args.hasOwnProperty('completed') ? args.completed : false
    }
    // const checkboxCheck = () => {
    //     const textCompleted = document.getElementById(`${task.title}`);
    //     if (textCompleted.checked !== task.completed) {
    //         task.completed = textCompleted.checked;
    //       }
    // }

  const completed = completedFun();

  return {
    title,
    completed,
  }
}

export default task