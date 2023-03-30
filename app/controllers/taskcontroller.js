const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const taskService = require("../services/taskService")

const createTask =  (taskDetails,done)=>{
    taskService.createTask(taskDetails,done)
}

// const updateTodoList = (todoListData,done)=>{
//     taskService.updateTask(todoListData,done)
// }

// const getTasks = (userId,limit,done)=>{
//     taskService.getTasks(userId,limit,done)
// }

const getTaskById = (todolistId,taskId,done)=>{
    taskService.getTaskById(todolistId,taskId,done)
}

// const deleteTodoLists = (todoData,done)=>{
//     todoService.deleteManyTodoList(todoData,done)
// }

// const deleteTodoList = (userId,todolistId,done)=>{
//     todoService.deleteTodoList(userId,todolistId,done)
// }

module.exports = { createTask,getTaskById}