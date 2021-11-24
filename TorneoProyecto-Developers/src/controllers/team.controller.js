'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");
const Team = require('../models/team.model');


////////////////////////Selman//////////////////////////////////////////

////////////////////////Angel//////////////////////////////////////////

////////////////////////Byron//////////////////////////////////////////
////////////////////////Jona//////////////////////////////////////////

function createTeam(req, res) {
    var teamModel = new Team();
    var idTournament = req.params.idTournament;
    var params = req.body;

    teamModel.tournament = idTournament;
    teamModel.name = params.name;
    teamModel.picture = params.picture;
    teamModel.gamePlayed = 0;
    teamModel.wins = 0;
    teamModel.draws = 0;
    teamModel.loses = 0;
    teamModel.goalsFor = 0;
    teamModel.goalsAgainst = 0
    teamModel.goalsDiference = 0;
    teamModel.points = 0;


    Team.find({
        $and: [
            { name: teamModel.name },
            { tournament: teamModel.tournament }
        ]
    }).exec((err, teamFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })


        if (teamFound && teamFound.length >= 1) {
            return res.status(500).send({ mensaje: 'El equipo ya existe' })
        } else {


            Team.find(

                { tournament: teamModel.tournament }

            ).exec((err, teamsFound) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

                if (teamsFound && teamsFound.length >= 10) {
                    return res.status(500).send({ mensaje: 'El limite de equipos es de 10' })
                } else {



                    teamModel.save((err, teamSaved) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el equipo' })

                        if (teamSaved) {
                            res.status(200).send(teamSaved)
                        } else {
                            res.status(404).send({ mensaje: 'No se a podido registrar a su equipo' })
                        }
                    })
                }
            })
        }
    })








}

function getTeams(req, res) {
    var idTournament = req.params.idTournament;
    var jornadas = []

    Team.find({ tournament: idTournament }, (err, teamsFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los equipos del Torneo' });
        if (!teamsFound) return res.status(500).send({ mensaje: 'Error al obtener los equipos' });

        for (let index = 0; index < teamsFound.length - 1; index++) {
            jornadas[index] = index + 1

        }
        return res.status(200).send({ teamsFound, jornadas });
    }).populate('tournament', 'name').sort({ points: -1 })

}

function getTeamName(req,res){
    var idTournament = req.params.idTournament;
    Team.find({tournament: idTournament},(err,teamsFound)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los equipos del Torneo' });
        if (!teamsFound) return res.status(500).send({ mensaje: 'Error al obtener los equipos' });
        return res.status(200).send( teamsFound );
    })
}

function getTeamId(req, res) {
    var idTeam = req.params.idTeam;

    Team.findById(idTeam).populate('tournament', 'name').exec((err, teamFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del equipo' });
        if (!teamFound) return res.status(500).send({ mensaje: 'Error al obtener el equipo' });
        return res.status(200).send({ teamFound });
    })

}

function editTeam(req, res) {
    var idTeam = req.params.idTeam;
    var params = req.body;

    Team.findByIdAndUpdate(idTeam, params, { new: true }, (err, teamUpdated) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!teamUpdated) return res.status(500).send({ mensaje: 'No se ha podido actualizar el equipo' });
        return res.status(200).send({ teamUpdated });
    })
}

function deleteTeam(req, res) {
    var idTeam = req.params.idTeam;

    Team.findByIdAndDelete(idTeam, (err, teamEliminated) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar' });
        if (!teamEliminated) return res.status(500).send({ mensaje: 'Error al eliminar el equipo' });
        return res.status(200).send({ teamEliminated });
    })
}

module.exports = {
    createTeam,
    getTeams,
    getTeamId,
    editTeam,
    deleteTeam,
    getTeamName
}