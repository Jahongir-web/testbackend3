const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const authorRouter = require('./src/router/authorRouter')
const carRouter = require('./src/router/carRouter')

const app = express()

// middlewares
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
app.use('/author', authorRouter)
app.use('/car', carRouter)

mongoose.connect('mongodb://localhost:27017/ElonApp', {})
.then(()=> {
  app.listen(4001, () => console.log('localhost: 4001'))  
})
.catch(err => console.log(err))


