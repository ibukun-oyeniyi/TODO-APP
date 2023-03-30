const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const todoService = require("../services/todoService")

const createTodoList =  (todoListData,done)=>{
    todoService.createTodoList(todoListData,done)
}

const updateTodoList = (todoListData,done)=>{
    todoService.updateTodoList(todoListData,done)
}

const getTodoLists = (userId,limit,done)=>{
    todoService.getTodoLists(userId,limit,done)
}

const getTodoListById = (userId,todolistId,done)=>{
    todoService.getTodoListById(userId,todolistId,done)
}

const deleteTodoLists = (todoData,done)=>{
    todoService.deleteTodoLists(todoData,done)
}

const deleteTodoList = (userId,todolistId,done)=>{
    todoService.deleteTodoList(userId,todolistId,done)
}

module.exports = { createTodoList,updateTodoList,getTodoListById,getTodoLists,deleteTodoList,deleteTodoLists}