const db = require("../config/dbConfig")
const hashedPassword = require("../utils/hashpassword")

const addTag = (tagId,todoId,done) =>{
  const newAddTag = new db.todolistTag({tagId,todoId})
  newAddTag.save().then((res)=>{
      done(undefined,res)
  }).catch(err=>{
      done("Error saving tag")
  })
}


  const deleteAddedTag = (tagId,todoId, done) => {
    db.todolistTag.destroy({
      where: { tagId: tagId,todoId: todoId}
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
    addTag,deleteAddedTag
}