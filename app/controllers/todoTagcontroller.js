const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const todoTagService = require("../services/todoTagService")

const addTag =  (tagId,todoId,done)=>{
    todoTagService.addTag(tagId,todoId, done)
}




const deleteAddedTag = (tagId,todoId,done)=>{
    todoTagService.deleteAddedTag(tagId,todoId,done)
}

// const deleteTodoList = (userId,todolistId,done)=>{
//     todoService.deleteTodoList(userId,todolistId,done)
// }

module.exports = { addTag,deleteAddedTag}