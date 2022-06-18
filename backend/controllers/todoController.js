const { request } = require("express");
const asyncHandler = require("express-async-handler");
const Todo = require("../models/todoModel");
const User = require("../models/userModel");

// @desc Get todos
// @route GET /api/todos
// @access private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

  res.status(200).json({ todos });
});

// @desc create todos
// @route POST /api/todos
// @access private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json({ todo });
});

// @desc update todos
// @route PUT /api/todos/:id
// @access private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized to update this todo.");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTodo);
});

// @desc Delete todos
// @route DELETE /api/todos
// @access private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("Not authorized to delete this todo.");
  }

  await todo.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
