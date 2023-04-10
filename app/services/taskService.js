const taskDao = require("../dao/task.Dao")

const getTaskById = (taskId,done)=>{
    taskDao.getTaskById(taskId,done)
}

const deleteTask = (taskId,done)=>{
    taskDao.deleteTask(taskId,done)
}

const createTask= (taskData,done)=>{
    //call the taskdao findtask method
    taskDao.createTask(taskData,done)
}

const updateTask = (taskData,taskId,done)=>{
    //call the taskdao findtask method
    taskDao.updateTask(taskData,taskId,done)
}

const reorderTask = async (todoId, taskId,position,done)=>{
    //call the taskdao findtask method
    await taskDao.reorderTask(todoId, taskId,position,done)
}



module.exports={
    createTask,getTaskById,updateTask,deleteTask,reorderTask
}