const express = require('express')
const taskController = require('../controllers/taskcontroller')
const userController = require('../controllers/usercontroller')
const {verifyUser} = require("../middleware/authMiddleware")
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');

//REGISTER A USER

router.get('/:userId/todo/:todoId/task/:taskId', verifyUser, (req, res) => {
    try {
      const taskId = parseInt(req.params.taskId)
      taskController.getTaskById(taskId, (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error getting tasks' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting tasks' })
    }
  })

  router.get('/:userId/task', verifyUser, (req, res) => {
    try {
      const userId = parseInt(req.params.userId)
      userController.getAllTasks(userId, (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error getting tasks' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting tasks' })
    }
  })

  router.get('/:userId/tasks/search', verifyUser, (req, res) => {
    
    try {
      const queryStr = req.query.search
      const userId = parseInt(req.params.userId)
      userController.searchTasks(userId,queryStr, (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error getting tasks' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting tasks' })
    }
  })

  router.post('/:userId/todo/:todoId/task',upload.single('file'), bodyParser.urlencoded({ extended: true }),verifyUser, (req, res) => {
    try {
      const todolistId = parseInt(req.params.todoId)
      const {description} = req.body

      req.body.todolistId = todolistId
      if(req.file){
        req.body.file = req.file.filename
      }
      taskController.createTask(req.body,  (err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error creating tasks' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while creating tasks' })
    }
  })

  router.post('/:userId/reorder/:todoId/task/:taskId', verifyUser, async (req, res) => {
    try {
      const todoId = parseInt(req.params.todoId)
      const taskId = parseInt(req.params.taskId)
      const {position} = req.body
      await taskController.reorderTask(todoId,taskId,position,(err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error reordering tasks' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while reordering tasks' })
    }
  })

// router.get('/:userId/todo/:todolistId', verifyUser, (req, res) => {
//     try {
//       const userId = parseInt(req.params.userId);
//       const todolistId = parseInt(req.params.todolistId);
      
//       todolistController.getTodoListById(userId, todolistId, (err, todolist) => {
//         if (err) {
//           return res.status(404).send({ error: 'Todolist not found' });
//         }
//         return res.status(200).send(todolist);
//       });
//     } catch (err) {
//       res.status(400).send({ error: 'Unexpected error while getting todolist' });
//     }
//   });
  

// router.post('/:userId/todoId',verifyUser,(req,res)=>{
//     try{
//         const {todolist_name,description} = req.body
//         const userId = parseInt(req.params.userId)
//         if(!(todolist_name)){
//             return res.status(400).send('Required inputs are missing')
//         }
        
//         const todoDetails = {
//             description: description || "",
//             todolist_name,
//             userId
//         }
//         todolistController.createTodoList(todoDetails,(err,result) =>{
//             if (err){
//                     return res.status(400).send({error: 'Error creating todolist'})
//             }else{
//                     return res.status(201).send(result)
//             }
//         })
//     }catch(err){
//             res.status(400).send({error:'Unexpected error while creating todo'})
//     }
// })

// router.post('/:userId/todolists/delete', verifyUser, (req, res) => {
//     const userId = parseInt(req.params.userId);
//     const { todolistIds } = req.body;
  
//     if (!todolistIds || !Array.isArray(todolistIds)) {
//       return res.status(400).send('Invalid todolist ids');
//     }
  
//     todolistController.deleteTodoLists(userId, todolistIds, (err, result) => {
//       if (err) {
//         return res.status(400).send({ error: 'Error deleting todolists' });
//       } else {
//         return res.status(200).send(result);
//       }
//     });
//   });

router.put('/:userId/todo/:todolistId/task/:taskId',upload.single('file'),bodyParser.urlencoded({ extended: true }), verifyUser, (req, res) => {
    try {
      const data = req.body;
      if (req.file){
        data.file = req.file.filename
      }
      const taskId = parseInt(req.params.taskId);
      if(!data.description && !("checked" in data) && !data.priority && !data.deadline && !data.file){
        return res.status(400).send("You need to have at least a description or checked property or priority or deadline or file to upload")
      }
      
      taskController.updateTask(data,taskId,(err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error updating task' });
        } else {
          return res.status(200).send(result);
        }
      });
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while updating task' });
    }
  });

  router.delete('/:userId/todo/:todolistId/task/:taskId', verifyUser, (req, res) => {
    try {
      const taskId = parseInt(req.params.taskId);
      taskController.deleteTask(taskId, (err, result) => {
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