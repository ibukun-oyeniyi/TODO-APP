const express = require('express')
const authController = require('../controllers/authcontroller')
const router = express.Router()

//REGISTER A USER
router.post('/register',(req,res)=>{
    try{
        const {name , email, password} = req.body
        if(!(name && email && password)){
            return res.status(400).send('Required inputs are missing')
        }

        const userDetails = {
            name,email,password 
        }
        authController.registerUser(userDetails,(err,result) =>{
            if (err){
                    return res.status(400).send({error: 'User Already Exists 2'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while registering the user'})
    }
})

router.post("/login",authController.loginUser)


module.exports = router