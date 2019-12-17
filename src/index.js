import project from './project'
import task from './task'
import displayProjects from './dom';
import todoList from './todo';

const newProj = project({
    title: 'To-do list',
    description: 'A JS project'
});

const newTask = task({
    title: 'model'
})

const newTaskOn = task({
    title: 'start interface'
})
let app = todoList();
app.addProject(newProj);
console.log(newTask.completed)
newProj.addTask(newTask)
newProj.addTask(newTaskOn)
console.log(newProj.tasks);
console.log(newProj.projectCompleted())
console.log(newProj.tasks);
displayProjects(app);