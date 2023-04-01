const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const tagService = require("../services/tagService")

const createTag =  (tagDetails,done)=>{
    tagService.createTag(tagDetails,done)
}


// const getTasks = (userId,limit,done)=>{
//     taskService.getTasks(userId,limit,done)
// }


const deleteTag = (tagData,done)=>{
    tagService.deleteTag(tagData,done)
}

// const deleteTodoList = (userId,todolistId,done)=>{
//     todoService.deleteTodoList(userId,todolistId,done)
// }

module.exports = { createTag,deleteTag}