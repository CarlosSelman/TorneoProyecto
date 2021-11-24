'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const tournamentController = require("../controllers/tournament.controller");

var api = express.Router();

api.post('/createTournament', authenticated.ensureAuth, tournamentController.createTournament);
api.get('/getTournaments', authenticated.ensureAuth, tournamentController.getTournaments);
api.get('/getTournamentId/:idTournament', authenticated.ensureAuth, tournamentController.getTournamentId);
api.put('/editTournament/:idTournament', authenticated.ensureAuth, tournamentController.editTournament);
api.delete('/deleteTournament/:idTournament', authenticated.ensureAuth, tournamentController.deleteTournament);

module.exports = api;