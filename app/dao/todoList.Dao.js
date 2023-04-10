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

const getTodoLists = async (userId, limit, done) => {
    db.todo.findAll({
      where: { userId: userId },
      order:[
        [{ model: db.task }, 'position', 'DESC'], 
        ['updatedAt','DESC']
      ],
      include: [
        {
          model: db.task,
        },

        {
          model: db.todolistTag,
          include: [{ model: db.tag}],
          
        }],
      
      through: {
        attributes: [] // Exclude the join table attributes from the result
      },
      limit: limit
    }).then(todoLists => {
      done(undefined, todoLists);
    }).catch(err => {
      console.log(err);
      done('Error fetching todolists');
    });
  //   try {
  //     const result = await db.sequelize.query(`
  //       SELECT todos.*
  //       INNER JOIN todos ON tasks.todolistId 
  //       INNER JOIN todolisttags ON tt.taskId = t.id
  //       INNER JOIN tags tag ON tt.tagId = tag.id
  //       WHERE tl.userId = :userId
  //       ORDER BY tl.position ASC, tt.position ASC
  //       LIMIT :limit
  //     `, {
  //       replacements: {
  //         userId: userId,
  //         limit: limit
  //       },
  //       type: QueryTypes.SELECT
  //     });
  
  //     // Process the result and transform it into the desired format
  //     // ...
  
  //     done(null, result);
  //   } catch (error) {
  //     console.log(error)
  //     done(error);
  //   }
  // };
}

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
      where: { id: todolistId, userId: userId },
      order:[
        [{ model: db.task }, 'position', 'DESC'], 
      ],
      include: [
        {model: db.task},
        { model: db.tag, 
          attributes: { exclude: [db.todolistTag,'id','createdAt','updatedAt'] },
          // include: [{ model: db.tag, attributes: ['name'] }]

        }],
      through: {
        attributes:  { exclude: ['todolistTag'] }, // Exclude the join table attributes from the result
      },
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
   
  const deleteTodoLists = (userId, todolistIds, done) => {
    db.todo.destroy({
      where: {
        id: todolistIds,
        userId: userId,
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
    createTodoList,updateTodoList,getTodoListById,getTodoLists,deleteTodoList,deleteTodoLists
}