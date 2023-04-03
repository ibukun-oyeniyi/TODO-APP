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
    userDao.getAllTasks(userId,done)
}


module.exports={
    findUser,registerUser,getAllTasks
}