const todoTagDao = require("../dao/todoTagDao")

const addTag= (tagId,todoId, done)=>{
    //call the taskdao findtask method
    todoTagDao.addTag(tagId,todoId, done)
}

const deleteAddedTag=(tagId,todoId,done)=>{
    todoTagDao.deleteAddedTag(tagId,todoId,done)
}





module.exports={
    addTag,deleteAddedTag
}