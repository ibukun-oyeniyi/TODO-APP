const bcrypt = require("bcryptjs")
const { request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")
const db = require("../config/dbConfig")
const { createError } = require("../utils/error")

const registerUser = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt)
        const info = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        }
        const userExists = await db.user.findOne({ where: {email: req.body.email}})
        if (userExists){
            return next(createError(404,"This User is already registered"))
        }
        const newUser = new db.user(info)
        await newUser.save()
            .then(() => {
                res.status(200).json("User has been Registered")
            }).catch (err => {
                res.status(500).json(err)
            })
    }catch(err){
        next(err)
    }
}

module.exports = { registerUser }