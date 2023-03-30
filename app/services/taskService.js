const taskDao = require("../dao/task.Dao")

// const findtask =  (id,done)=>{
//     //call the taskdao findtask method
    
//     taskDao.findtask(id,done)
// }

// const getTasks = (userId,limit,done)=>{
//     taskDao.gettasks(userId,limit,done)
// }

const getTaskById = (todoId,taskId,done)=>{
    taskDao.getTaskById(todoId,taskId,done)
}

// const deletetask = (userId,taskId,done)=>{
//     taskDao.deletetask(userId,taskId,done)
// }

const createTask= (taskData,done)=>{
    //call the taskdao findtask method
    taskDao.createTask(taskData,done)
}

// const deletetasks=(taskDatas,done)=>{
//     taskDao.deleteManytask(taskDatas,done)
// }

// const updatetask = (taskData,done)=>{
//     //call the taskdao findtask method
//     taskDao.updatetask(taskData,done)
// }



module.exports={
    createTask,getTaskById
}