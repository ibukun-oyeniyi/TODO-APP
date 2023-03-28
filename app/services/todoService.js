const todoListDao = require("../dao/todoList.Dao")

const findTodoList =  (id,done)=>{
    //call the todoListdao findtodoList method
    
    todoListDao.findTodoList(id,done)
}

const getTodoLists = (userId,limit,done)=>{
    todoListDao.getTodoLists(userId,limit,done)
}

const getTodoListById = (userId,todolistId,done)=>{
    todoListDao.getTodoListById(userId,todolistId,done)
}

const deleteTodoList = (userId,todolistId,done)=>{
    todoListDao.deleteTodoList(userId,todolistId,done)
}

const createTodoList= (todoListData,done)=>{
    //call the todoListdao findtodoList method
    todoListDao.createTodoList(todoListData,done)
}

const updateTodoList = (todoListData,done)=>{
    //call the todoListdao findtodoList method
    todoListDao.updateTodoList(todoListData,done)
}



module.exports={
    findTodoList,createTodoList,updateTodoList,getTodoListById,getTodoLists,deleteTodoList
}