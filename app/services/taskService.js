const taskDao = require("../dao/task.Dao")

// const findtask =  (id,done)=>{
//     //call the taskdao findtask method
    
//     taskDao.findtask(id,done)
// }

// const getTasks = (userId,limit,done)=>{
//     taskDao.gettasks(userId,limit,done)
// }

const getTaskById = (taskId,done)=>{
    taskDao.getTaskById(taskId,done)
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

const updateTask = (taskData,taskId,done)=>{
    //call the taskdao findtask method
    taskDao.updateTask(taskData,taskId,done)
}



module.exports={
    createTask,getTaskById,updateTask
}