'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const teamController = require("../controllers/team.controller");

var api = express.Router();

api.post('/createTeam/:idTournament', authenticated.ensureAuth, teamController.createTeam);
api.get('/getTeams/:idTournament', authenticated.ensureAuth, teamController.getTeams);
api.get('/getTeamName/:idTournament', authenticated.ensureAuth, teamController.getTeamName);
api.get('/getTeamId/:idTeam', authenticated.ensureAuth, teamController.getTeamId);
api.put('/editTeam/:idTeam', authenticated.ensureAuth, teamController.editTeam);
api.delete('/deleteTeam/:idTeam', authenticated.ensureAuth, teamController.deleteTeam);


module.exports = api;