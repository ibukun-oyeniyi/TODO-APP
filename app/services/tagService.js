const tagDao = require("../dao/tagDao")

// const findtask =  (id,done)=>{
//     //call the taskdao findtask method
    
//     taskDao.findtask(id,done)
// }

// const getTasks = (userId,limit,done)=>{
//     taskDao.gettasks(userId,limit,done)
// }



// const deletetask = (userId,taskId,done)=>{
//     taskDao.deletetask(userId,taskId,done)
// }

const createTag= (tagData,done)=>{
    tagDao.createTag(tagData,done)
}

const deleteTag=(tagId,done)=>{
    tagDao.deleteTag(tagId,done)
}





module.exports={
    createTag,deleteTag
}