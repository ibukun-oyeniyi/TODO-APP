const db = require("../config/dbConfig")
const hashedPassword = require("../utils/hashpassword")
const Sequelize = require("sequelize")
const { Op } = require('sequelize');

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

db.task.beforeCreate(async (task, options) => {
  const lastTask = await db.task.findOne({
    where: { todolistId: task.todolistId },
    order: [['position', 'DESC']]
  });

  if (lastTask) {
    task.position = lastTask.position + 1;
  }
});

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

  const reorderTask= async (todoId,taskId,newPosition,done)=>{
    
    try {
      // Find the task to be reordered
      const taskToReorder = await db.task.findByPk(taskId);
      console.log(newPosition)
    // Check if the task belongs to the specified todo
    
    // Find the task currently at the new position (if any)
    const taskAtNewPosition = await db.task.findOne({
      where: { position: newPosition, todolistId: todoId }
    });
    
      
      // Update the positions of affected tasks
      if (taskAtNewPosition) {
        if (taskToReorder.position < newPosition) {
          // Shift tasks down to make room for the reordered task
          await db.task.update(
            { position: Sequelize.literal('position - 1') },
            { where: { 
              todolistId: todoId,
              position: { [Op.between]: [taskToReorder.position + 1, newPosition] } 
            }}
          );
        } else {
          // Shift tasks up to make room for the reordered task
          await db.task.update(
            { position: Sequelize.literal('position + 1') },
            { where: { 
              todolistId: todoId,
              position: { [Op.between]: [taskToReorder.position + 1, newPosition] } 
            } }
          );
        }
        
        // Update the position of the task to be reordered
        taskToReorder.position = newPosition;
        await taskToReorder.save();
      } else {
        // No task at the new position, just update the position of the task to be reordered
        taskToReorder.position = newPosition;
        await taskToReorder.save();

      }
      done(undefined,taskToReorder)
    }
    catch (err) {
      // Handle any errors
      console.error(err);
      done(err)
    }
  }
  
  

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
   
  const deleteTask = (taskId, done) => {
    db.task.destroy({
      where: {
        id: taskId,
      },
    })
      .then((result) => {
        done(undefined, result);
      })
      .catch((err) => {
        console.log(err);
        done('Error deleting todolists');
      });
  };
module.exports = {
    createTask,getTaskById,updateTask,deleteTask,reorderTask
}