const express = require('express')
const todolistController = require('../controllers/todolistcontroller')
const {verifyUser} = require("../middleware/authMiddleware")
const router = express.Router()

//REGISTER A USER

router.get('/:userId/todos', verifyUser, (req, res) => {
    try {
      const userId = parseInt(req.params.userId)
      const limit = parseInt(req.query.limit) || 10 // default limit is 10
  
      todolistController.getTodoLists(userId, limit, (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error getting todolists' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting todolists' })
    }
  })

router.get('/:userId/todo/:todolistId', verifyUser, (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const todolistId = parseInt(req.params.todolistId);
      
      todolistController.getTodoListById(userId, todolistId, (err, todolist) => {
        if (err) {
          return res.status(404).send({ error: 'Todolist not found' });
        }
        return res.status(200).send(todolist);
      });
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting todolist' });
    }
  });
  

router.post('/:userId/todo',verifyUser,(req,res)=>{
    try{
        const {todolist_name} = req.body
        const userId = parseInt(req.params.userId)
        if(!(todolist_name)){
            return res.status(400).send('Required inputs are missing')
        }
        console.log(userId)
        const todoDetails = {
            todolist_name,
            userId
        }
        todolistController.createTodoList(todoDetails,(err,result) =>{
            if (err){
                    return res.status(400).send({error: 'Error creating todolist'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while creating todo'})
    }
})

router.put('/:userId/todo/:todolistId', verifyUser, (req, res) => {
    try {
      const { todolist_name } = req.body;
      const userId = parseInt(req.params.userId);
      const todolistId = parseInt(req.params.todolistId);
  
      if (!todolist_name) {
        return res.status(400).send('Required inputs are missing');
      }
  
      const todoDetails = {
        todolist_name,
        userId,
        todolistId
      };
      todolistController.updateTodoList(todoDetails, (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error updating todolist' });
        } else {
          return res.status(200).send(result);
        }
      });
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while updating todo' });
    }
  });

  router.delete('/:userId/todo/:todolistId', verifyUser, (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const todolistId = parseInt(req.params.todolistId);
      todolistController.deleteTodoList(userId, todolistId, (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error deleting todolist' });
        } else {
          return res.status(200).send({ message: 'Todolist deleted successfully' });
        }
      });
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while deleting todolist' });
    }
  });
// router.post("/login",(req,res)=>{
//     try{
//         //retrive email and password from req.body
//         const {email, password} = req.body
//         if(!(email && password)){
//                 return res.status(400).send('Required inputs are missing')
//         } 
//         //calling the authController login usermethod return the error or the result 
//         authController.loginUser({email,password},(err,result)=>{
//             if (err){
//                     return res.status(401).send({error: 'Invalid Credentials'})
//             }else{
//                     return res.status(200).send({STATUS:"OK",data:result})
//             }
//         })}catch(err){
//                 res.status(500).send({error:'Unexpected error while registering the user'})
//         }
// })


module.exports = router