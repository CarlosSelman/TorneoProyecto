'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TournamentSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    name: String,
    picture: String
});

module.exports = mongoose.model('Tournament', TournamentSchema);