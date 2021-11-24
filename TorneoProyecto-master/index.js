'use strict'

const mongoose = require("mongoose")
const app = require('./app')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:root@torneoproyecto.0yht9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
  console.log('You are connected to the database in MongoDB');
 
  app.listen(process.env.PORT || 3000, function () {
    console.log('The server is running in the port: 3000');  
  })

}).catch(err => console.log(err))
