const asyncHandler = require('express-async-handler')
// @desc Get todos
// @route GET /api/todos
// @access private
const getTodos = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get todos'})
})

// @desc create todos
// @route POST /api/todos
// @access private
const createTodo = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    } 
    res.status(200).json({message: 'Create todos'})
})

// @desc update todos
// @route PUT /api/todos/:id
// @access private
const updateTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Update todos'})
})

// @desc Delete todos
// @route DELETE /api/todos
// @access private
const deleteTodo = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Delete todos'})
})

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
}