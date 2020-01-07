import project from './project';
import task from './task';
import './css/style.css';
import { addProject, displayInt } from './dom';
import { format } from 'date-fns'
import { getPriority } from 'os';

const strengthRoutine = project({
    title: 'Workout',
    description: 'Workout plan for next 3 months',
})

addProject(strengthRoutine);

strengthRoutine.addTask(task({
    title: 'Always remember to breath',
    description: 'In for excercise mechanic, and out for return to initial position',
    dueDate: format(Date.now(), 'yyyy/MM/dd'),
    priority: 'high',
}))

strengthRoutine.addTask(task({
    title: '10 pushups',
    description: 'arms at shoulder level, legs spread for stability',
    dueDate: format(Date.now(), 'yyyy/MM/dd'),
    priority: 'high',
}))

strengthRoutine.addTask(task({
    title: '20 jumping jacks',
    description: 'try to do them as fast as possible',
    dueDate: format(Date.now(), 'yyyy/MM/dd'),
    priority: 'high',
}))

strengthRoutine.addTask(task({
    title: '60 secs of rope skip',
    description: 'remember that legs are not stretched',
    dueDate: format(Date.now(), 'yyyy/MM/dd'),
    priority: 'high',
}))

strengthRoutine.addTask(task({
    title: 'Rest and repeat',
    description: '3 times for beginners, 5 for advanced',
    dueDate: format(Date.now(), 'yyyy/MM/dd'),
    priority: 'high',
}))




displayInt();
