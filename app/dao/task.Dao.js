const db = require("../config/dbConfig")
const hashedPassword = require("../utils/hashpassword")

// const findTodoList =  (id,done)=>{
//     //use filter method to find the user from json file
//     db.user.findOne({ where: {id: id}}).then((result,err) =>{
//         if(!result){
//             return done(null,"Todolist not Found")
//         }else{
//             return done(null,result);
//         }
//     }).catch(err=>{
//         console.log(err)
//     })
// }

// const getTodoLists = (userId, limit, done) => {
//     db.todo.findAll({
//       where: { userId: userId },
//       limit: limit
//     }).then(todoLists => {
//       done(undefined, todoLists);
//     }).catch(err => {
//       console.log(err);
//       done('Error fetching todolists');
//     });
//   };

const createTask = (taskData,done) =>{
  const newTask = new db.task(taskData)
  newTask.save().then((res)=>{
      done(undefined,res)
  }).catch(err=>{
      done("Error saving task")
  })
        
  
}

const updateTask = (taskData, taskId,done) => {
    db.task.findOne({
      where: { id: taskId}
    }).then(todoList => {
      if (!todoList) {
        done('Todolist not found or unauthorized');
      } else {
        return todoList.update(taskData);
      }
    }).then(updatedTask => {
      done(undefined, updatedTask);
    }).catch(err => {
      console.log(err);
      done('Error updating todolist');
    });
  };
  
  const getTaskById = (taskId,done) => {
    db.task.findOne({
      where: { id: taskId}
    }).then(task => {
      if (!task) {
        done('Task not found or unauthorized');
      } else {
        done(undefined, task);
      }
    }).catch(err => {
      done('Error getting todolist');
    });
  };

  // const deleteTodoList = (userId, todolistId, done) => {
  //   db.todo.destroy({
  //     where: { id: todolistId, userId: userId }
  //   }).then(numRowsDeleted => {
  //     if (numRowsDeleted == 1) {
  //       done(undefined, 'Todolist deleted successfully');
  //     } else {
  //       done('Todolist not found or unauthorized');
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //     done('Error deleting todolist');
  //   });
  // };
   
  // const deleteTodoLists = (userId, todolistIds, done) => {
  //   db.todo.destroy({
  //     where: {
  //       id: todolistIds,
  //       userId: userId,
  //     },
  //   })
  //     .then((result) => {
  //       done(undefined, result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       done('Error deleting todolists');
  //     });
  // };
module.exports = {
    createTask,getTaskById,updateTask
}