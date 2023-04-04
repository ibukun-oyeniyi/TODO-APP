const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const userService = require("../services/userService")

const getAllTasks =  (userId, done) => {
    userService.getAllTasks(userId,done);
      
}

const searchTasks =  (userId,queryStr, done) => {
    userService.searchTasks(userId,queryStr,done);
      
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

module.exports = { getAllTasks,searchTasks}