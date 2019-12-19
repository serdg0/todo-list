import project from './project'
import task from './task'
import {addProject} from './dom';
import {displayInt} from './dom';

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


addProject(newProj);
addProject(projectito);
newProj.addTask(newTask);
newProj.addTask(newTaskOn);
projectito.addTask(taskito);
newProj.addTask(task({
    title: 'COMMIT IT DUDE'
}))

displayInt();