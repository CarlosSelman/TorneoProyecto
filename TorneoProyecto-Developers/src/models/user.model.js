'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user: String,
    password:String,
    type:String,
    name:String,
    lastName:String,
    email:String,
    age:String,
    picture: String

    //poner muchos más datos personales para el usuario en general.
})

module.exports = mongoose.model('User', UserSchema);

