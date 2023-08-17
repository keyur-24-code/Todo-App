// const Todo = require("../models/todoModel");

// const mongoose = require("mongoose");

// // get a single todo
// const getTodo = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such todo" });
//   }
//   const todo = await Todo.findById(id);
//   if (!todo) {
//     return res.status(400).json({ error: "No such todo" });
//   }
//   res.status(200).json(todo);
// };

// // get all todos
// const getTodos = async (req, res) => {
//   const todo = await Todo.find();
//   res.status(200).json(todo);
// };

// // create a new todo
// const createTodo = async (req, res) => {
//   const { work } = req.body;

//   let emptyFields = []

//   if (!work) {
//     emptyFields.push('work')
//   }
//   if (emptyFields.length > 0) {
//     return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
//   }

//   try {
//     const todo = await Todo.create({ work });
//     res.status(200).json(todo);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // delete a todo
// const deleteTodo = async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such todo" });
//   }
//   const todo = await Todo.findOneAndDelete(id-1);

//   if (!todo) {
//     return res.status(400).json({ error: "No such todo" });
//   }
//   res.status(200).json(todo);
// };

// // update a todo
// const updateTodo = async (req, res) => {
//   const { id } = req.params;
//   const {work} = req.body
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such todo" });
//   }
//   const todo = await Todo.findOneAndUpdate({_id: id}, {work});

//   if (!todo) {
//     return res.status(400).json({ error: "No such todo" });
//   }
//   res.status(200).json(todo);
// };

// module.exports = {
//     getTodo,
//     getTodos,
//     createTodo,
//     deleteTodo,
//     updateTodo
// }

const Todo = require('../models/todoModel')
const mongoose = require('mongoose')

// get all todos
const getTodos = async (req, res) => {
  const user_id = req.user._id

  const todos = await Todo.find({ user_id }).sort({createdAt: -1})

  res.status(200).json(todos)
}

// get a single todo
const getTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such todo'})
  }

  const todo = await Todo.findById(id)

  if (!todo) {
    return res.status(404).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

// create a new todo
const createTodo = async (req, res) => {
  const {work} = req.body

  let emptyFields = []

  if (!work) {
    emptyFields.push('work')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const user_id = req.user._id
    const todo = await Todo.create({ work, user_id })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such todo'})
  }

  const todo = await Todo.findOneAndDelete({_id: id})

  if(!todo) {
    return res.status(400).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

// update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such todo'})
  }

  const todo = await Todo.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!todo) {
    return res.status(400).json({error: 'No such todo'})
  }

  res.status(200).json(todo)
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  deleteTodo,
  updateTodo
}