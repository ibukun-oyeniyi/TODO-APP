const userDao = require("../dao/user.Dao")

const findUser =  (email,done)=>{
    //call the userdao finduser method
    
    userDao.findUser(email,done)
}

const registerUser= (userData,done)=>{
    //call the userdao finduser method
    userDao.registerUser(userData,done)
}

const getAllTasks= (userId,done)=>{
    //call the userdao finduser method
    console.log("i reached here")
    userDao.getAllTasks(userId,(err,result)=>{
        if (err){
            return done(err)
        }
        const final = result.todos.flatMap((todo) => todo.tasks);
        done(final)
    })
}

const searchTasks= (userId,queryStr,done)=>{
    //call the userdao finduser method
    userDao.getAllTasks(userId,(err,result)=>{
        if (err){
            return done(err)
        }
        const final = result.todos.flatMap(todo => todo.tasks.filter(task => task.description.includes(queryStr)));
        done(undefined,final)
    })
}


module.exports={
    findUser,registerUser,getAllTasks,searchTasks
}