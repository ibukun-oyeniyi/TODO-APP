const express = require('express')
const todoTagController = require('../controllers/todoTagcontroller')
const {verifyUser} = require("../middleware/authMiddleware")
const router = express.Router()

//REGISTER A USER


  router.post('/:userId/todo/:todoId/tag/:tagId', verifyUser, (req, res) => {
    try {
      const todoId = parseInt(req.params.todoId);
      const tagId = parseInt(req.params.tagId);
      todoTagController.addTag(tagId,todoId,  (err, result) => {
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


  router.delete('/:userId/todo/:todoId/tag/:tagId', verifyUser, (req, res) => {
    try {
      const tagId = parseInt(req.params.tagId);
      const todoId = parseInt(req.params.todoId);
      todoTagController.deleteAddedTag(tagId,todoId, (err, result) => {
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

module.exports = router