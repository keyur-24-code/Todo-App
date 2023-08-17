// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const todoSchema = new Schema(
//   {
//     work: {
//       type: String,
//       required: true,
//     },
//   }
// );
// todoSchema.set('timestamps', true)

// module.exports = mongoose.model("Todo", todoSchema);

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
  work: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)