const db = require("../config/dbConfig")
const hashedPassword = require("../utils/hashpassword")

const findTodoList =  (id,done)=>{
    //use filter method to find the user from json file
    db.user.findOne({ where: {id: id}}).then((result,err) =>{
        if(!result){
            return done(null,"Todolist not Found")
        }else{
            return done(null,result);
        }
    }).catch(err=>{
        console.log(err)
    })
}

const getTodoLists = (userId, limit, done) => {
    db.todo.findAll({
      where: { userId: userId },
      limit: limit
    }).then(todoLists => {
      done(undefined, todoLists);
    }).catch(err => {
      console.log(err);
      done('Error fetching todolists');
    });
  };

const createTodoList = (todoListData,done) =>{
    
    const newTodoList = new db.todo(todoListData)
    newTodoList.save().then((res)=>{
        done(undefined,res)
    }).catch(err=>{
        console.log(err)
        done("Error saving todo")
    })
        
  
}

const updateTodoList = (todoListData, done) => {
    const { todolist_name, userId, todolistId } = todoListData;
    db.todo.findOne({
      where: { id: todolistId, userId: userId }
    }).then(todoList => {
      if (!todoList) {
        done('Todolist not found or unauthorized');
      } else {
        return todoList.update({ todolist_name: todolist_name });
      }
    }).then(updatedTodoList => {
      done(undefined, updatedTodoList);
    }).catch(err => {
      console.log(err);
      done('Error updating todolist');
    });
  };
  
  const getTodoListById = (userId, todolistId, done) => {
    db.todo.findOne({
      where: { id: todolistId, userId: userId }
    }).then(todolist => {
      if (!todolist) {
        done('Todolist not found or unauthorized');
      } else {
        done(undefined, todolist);
      }
    }).catch(err => {
      console.log(err);
      done('Error getting todolist');
    });
  };

  const deleteTodoList = (userId, todolistId, done) => {
    db.todo.destroy({
      where: { id: todolistId, userId: userId }
    }).then(numRowsDeleted => {
      if (numRowsDeleted == 1) {
        done(undefined, 'Todolist deleted successfully');
      } else {
        done('Todolist not found or unauthorized');
      }
    }).catch(err => {
      console.log(err);
      done('Error deleting todolist');
    });
  };
   

module.exports = {
    findTodoList,createTodoList,updateTodoList,getTodoListById,getTodoLists,deleteTodoList
}