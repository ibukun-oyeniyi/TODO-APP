const db = require("../config/dbConfig")
const hashedPassword = require("../utils/hashpassword")

const findUser =  (email,done)=>{
    //use filter method to find the user from json file
    db.user.findOne({ where: {email: email}}).then((result,err) =>{
        
        if(!result){
            return done(null,"User not Found")
        }else{
            return done(null,result);
        }
    }).catch(err=>{
        console.log(err)
    })
}

const registerUser = (userData,done) =>{
    db.user.findOne({ where: {email: userData.email}}).
    then(result =>{
        if(result){
            return done("User Exists")
        }else{
            const userObj = hashedPassword.getUserDetails(userData)
            const newUser = new db.user(userObj)
            newUser.save().then((res)=>{
                done(undefined,res)
            }).catch(err=>{
                done("Error saving user")
            })
        }
    }).catch(err=>{
        done("this didnt work 2")
    })
}
   

module.exports = {
    findUser,registerUser
}