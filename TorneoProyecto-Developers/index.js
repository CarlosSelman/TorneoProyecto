'use strict'

const mongoose = require("mongoose")
const app = require('./app')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TorneoProyectoDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log('You are connected to the database in MongoDB');
 
  app.listen(3000, function () {
    console.log('The server is running in the port: 3000');  
  })

}).catch(err => console.log(err))
