const bcrypt = require("bcryptjs")
const { request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")
const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const userService = require("../services/userService")
const authService = require("../services/authService")

const registerUser =  (userData,done)=>{
    userService.findUser(userData.email,(err,userFound)=>{
      if(err){
        console.log(err,"here 1")
        done(err)
      }else{
        if (userFound !== "User not Found"){
          console.log(userFound)
          done(userFound)
        }else{
            userService.registerUser(userData,done)
        }
      }
    })
}


const loginUser = async (req,res,next)=>{
    try{
        userService.findUser(userData.email,(err,userFound)=>{
            if(err){
              done(err)
            }else{
              if (userFound){
                done(userFound)
              }else{
                userService.registerUser(userData,done)
              }
            }
          })
        
    }catch(err){
        next(err)
    }
}



module.exports = { registerUser,loginUser }