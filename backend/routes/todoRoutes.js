const express = require('express')
const router = express.Router()
const { createTodo, deleteTodo, getTodos, updateTodo } = require('../controllers/todoController')

router.route('/').get(getTodos).post(createTodo)
router.route('/:id').delete(deleteTodo).put(updateTodo)

module.exports = router