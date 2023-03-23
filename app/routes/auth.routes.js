const express = require('express')
const { registerUser} = require('../controllers/authcontroller')
const router = express.Router()

//REGISTER A USER
router.post("/register", registerUser)




module.exports = router