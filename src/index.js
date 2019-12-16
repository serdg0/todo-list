import project from './project'
import task from './task'

const newProj = project({
    title: 'DUDE JUST OUTPUT THIS',
    description: 'COME ON!'
});

const newTask = task({
    title: 'TAAASK'
})

newProj.addTask(newTask)
console.log(newProj.taskTitles())