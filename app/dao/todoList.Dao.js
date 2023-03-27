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

const createTodoList = (todoListData,done) =>{
    
    const newTodoList = new db.todo(todoListData)
    newTodoList.save().then((res)=>{
        done(undefined,res)
    }).catch(err=>{
        done("Error saving todo")
    })
        
  
}
   

module.exports = {
    findTodoList,createTodoList
}