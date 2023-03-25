const userDao = require("../dao/user.Dao")

const findUser =  (email,done)=>{
    //call the userdao finduser method
    
    userDao.findUser(email,done)
}

const registerUser= (userData,done)=>{
    //call the userdao finduser method
    userDao.registerUser(userData,done)
}


module.exports={
    findUser,registerUser
}