'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamSchema = Schema({
    tournament: {type: Schema.Types.ObjectId, ref:'Tournament'},
    name: String,
    picture: String,
    gamePlayed: Number,
    wins: Number,
    draws: Number,
    loses: Number,
    goalsFor: Number,
    goalsAgainst: Number,
    goalsDiference: Number,
    points: Number
});

module.exports = mongoose.model('Team', TeamSchema);