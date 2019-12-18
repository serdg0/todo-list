import project from './project'
import task from './task'
import displayInt from './dom';
import todoList from './todo';

const newProj = project({
    title: 'NEW PROJECT',
    description: 'A JS project'
});

const newTask = task({
    title: 'model'
})

const newTaskOn = task({
    title: 'start interface'
})

const projectito = project({
    title: 'PROJECTITO',
    description: 'stringify'
})

const taskito = task({
    title: 'taskito'
})

let app = todoList();
app.addProject(newProj);
app.addProject(projectito);
newProj.addTask(newTask);
newProj.addTask(newTaskOn);
projectito.addTask(taskito);


displayInt(app);

//displayProjects(app);