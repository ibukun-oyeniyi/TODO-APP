const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const taskService = require("../services/taskService")

const createTask =  (taskDetails,done)=>{
    taskService.createTask(taskDetails,done)
}

const updateTask = (taskData,taskId,done)=>{
    taskService.updateTask(taskData,taskId,done)
}

// const getTasks = (userId,limit,done)=>{
//     taskService.getTasks(userId,limit,done)
// }

const getTaskById = (taskId,done)=>{
    taskService.getTaskById(taskId,done)
}

const deleteTask = (taskId,done)=>{
    taskService.deleteTask(taskId,done)
}

// const deleteTodoList = (userId,todolistId,done)=>{
//     todoService.deleteTodoList(userId,todolistId,done)
// }

module.exports = { createTask,getTaskById,updateTask,deleteTask}