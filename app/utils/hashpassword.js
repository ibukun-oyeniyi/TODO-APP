const bcrypt = require("bcryptjs")

function getUserDetails(userData){
    console.log(userData);
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(userData.password, salt)
    
    const info = {
        username: userData.name,
        email: userData.email,
        password: hashedPassword,
    }
    return info
}

module.exports={
    getUserDetails
  }