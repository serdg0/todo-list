const task = (args) => {
    const title = () => {
        return args.title
    }
    const completed = () => {
        return args.hasOwnProperty('completed') ? args.completed : false
    }
    
    return {
        title,
        completed
    }
}

export default task

