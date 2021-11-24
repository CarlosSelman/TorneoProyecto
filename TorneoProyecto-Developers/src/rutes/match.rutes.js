'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const matchController = require("../controllers/match.controller");

var api = express.Router();

api.get('/createMatch/:idTournament', authenticated.ensureAuth, matchController.generateMatch);
api.get('/showMatch/:idTournament', authenticated.ensureAuth, matchController.showMatch)
api.get('/simulationMatch/:idMatch', authenticated.ensureAuth, matchController.simulateMatch)
api.get('/jornada/:idMatch/:jornada', authenticated.ensureAuth, matchController.jornada)
api.get('/pdfGenerate/:idTournament', authenticated.ensureAuth, matchController.pdfReporte)
module.exports = api;