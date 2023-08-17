// require("dotenv").config();

// const express = require("express");
// const todoRoutes = require("./routes/todos");
// const mongoose = require("mongoose");

// // express app
// const app = express();

// // middleware
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

// // routes
// app.use("/api/todos", todoRoutes);

// // connect to db
// mongoose
//   .connect(process.env.MONGODB)
//   .then(() => {
//     // listen for requests
//     app.listen(process.env.PORT, () => {
//       console.log("Connect to db & listening on port", process.env.PORT);
//     });
//   })
//   .catch((err) => {
//     console.log(error);
//   });

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/todos')
const userRoutes = require('./routes/user')
const cors = require ('cors')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/todos', todoRoutes)
app.use('/api/user', userRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 