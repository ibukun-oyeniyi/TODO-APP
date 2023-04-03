const db = require("../config/dbConfig")
const hashedPassword = require("../utils/hashpassword")

const createTag = (tagData,done) =>{
  console.log(tagData)
  const newTag = new db.tag(tagData)
  newTag.save().then((res)=>{
      done(undefined,res)
  }).catch(err=>{
      done("Error saving tag")
  })
        
  
}


  
  const getTags = (done) => {
    db.tag.findOne({
      where: { id: taskId}
    }).then(task => {
      if (!task) {
        done('Task not found or unauthorized');
      } else {
        done(undefined, task);
      }
    }).catch(err => {
      done('Error getting tags');
    });
  };

  const deleteTag = (taskId, done) => {
    db.tag.destroy({
      where: { id: taskId}
    }).then((result) => {
        done(undefined, result);
    })
    .catch((err) => {
        console.log(err);
        done('Error deleting tags');
    });
  };
   
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
    createTag,deleteTag
}