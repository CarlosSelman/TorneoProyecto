'use strict'

//VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const cors = require("cors")

// IMPORTACION RUTAS
const user_controller = require("./src/controllers/user.controller");
const user_rutes = require("./src/rutes/user.rutes");
const tournament_routes = require("./src/rutes/tournament.rutes");
const match_routes = require("./src/rutes/match.rutes")
const team_routes = require("./src/rutes/team.rutes")

// MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// CABECERAS
app.use(cors());

// CARGA DE RUTAS
app.use('/api', user_rutes, tournament_routes, team_routes, match_routes);


user_controller.createUserStaticAdmin();
//EXPORTAR
module.exports = app;