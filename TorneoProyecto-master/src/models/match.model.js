'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MatchSchema = Schema({
    tournament: {type: Schema.Types.ObjectId, ref:'Tournament'},
    team1: {type: Schema.Types.ObjectId, ref:'Team'},
    team2: {type: Schema.Types.ObjectId, ref:'Team'},
    score1: Number,
    score2: Number,
    jornada: Number
});

module.exports = mongoose.model('Match', MatchSchema);