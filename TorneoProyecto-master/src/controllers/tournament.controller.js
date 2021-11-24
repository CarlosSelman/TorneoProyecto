'use strict'

var Tournament = require('../models/tournament.model');
const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const user = 'Usuario';
const admin = 'Administrador';

////////////////////////Selman//////////////////////////////////////////

////////////////////////Angel//////////////////////////////////////////
function createTournament(req, res) {
    var params = req.body;
    var tournamentModel = new Tournament();

    if (params.name) {
        tournamentModel.name = params.name;
        tournamentModel.user = req.user.sub;
        tournamentModel.picture = params.picture;

        Tournament.find({
            $and: [
                { name: tournamentModel.name },
                { user: tournamentModel.user }
            ]
        }).exec((err, tournamenFound) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la petición' })

            if (tournamenFound && tournamenFound.length >= 1) {
                return res.status(500).send({ mensaje: 'El torneo ya existe' })
            } else {
                tournamentModel.save((err, tournamentSaved) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion del torneo' });
                    if (!tournamentSaved) return res.status(500).send({ mensaje: 'Error al agregar el torneo' });

                    return res.status(200).send({ tournamentSaved });
                })
            }
        }
        )
    } else {
        res.status(500).send({ mensaje: 'Rellene los datos necesarios para crear el torneo' });
    }
}

function getTournaments(req, res) {
    //Encuesta.find({ titulo: { $regex: 'encuesta', $options: 'i' } }, { listaComentarios: 0})
    if (req.user.type === admin) {
        Tournament.find((err, tournamentsFound) => {

            return res.status(200).send({ tournamentsFound });
        })
    } else if (req.user.type === user) {
        Tournament.find({ user: req.user.sub }, (err, tournamentsFound) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de torneos' });
            if (!tournamentsFound) return res.status(500).send({ mensaje: 'Error al obtener los torneos' });
            return res.status(200).send({ tournamentsFound });
        });
    }

}

function getTournamentId(req, res) {
    var idTournament = req.params.idTournament;

    Tournament.findById(idTournament, (err, tournamentFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición del torne' })
        if (!tournamentFound) return res.status(500).send({ mensaje: 'Error en obtener los datos' })
        return res.status(200).send({ tournamentFound })
    })
}

function editTournament(req, res) {
    var idTournament = req.params.idTournament;
    var params = req.body;

    Tournament.findById(idTournament, (err, tournamentFound) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la petición del torne' })
        if (!tournamentFound) return res.status(500).send({ mensaje: 'Error en obtener los datos' })

        if (params.name == tournamentFound.name) {
            delete params.name
            Tournament.findByIdAndUpdate(idTournament, params, { new: true }, (err, tournamentEdited) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!tournamentEdited) return res.status(500).send({ mensaje: 'No se ha podido actualizar la liga' })
                return res.status(200).send({ tournamentEdited })
            })
        } else {
            if (params.name) {
                Tournament.find({
                    $and: [
                        { name: params.name },
                        { user: req.user.sub }
                    ]
                }).exec((err, tournamenFound) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la petición' })

                    if (tournamenFound && tournamenFound.length >= 1) {
                        return res.status(500).send({ mensaje: 'El torneo ya existe' })
                    } else {
                        Tournament.findByIdAndUpdate(idTournament, params, { new: true }, (err, tournamentEdited) => {
                            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                            if (!tournamentEdited) return res.status(500).send({ mensaje: 'No se ha podido actualizar la liga' })
                            return res.status(200).send({ tournamentEdited })
                        })

                    }
                })
            }
        }


    })


}

function deleteTournament(req, res) {
    let idTournament = req.params.idTournament;

    Tournament.findByIdAndRemove(idTournament, (err, tournamentDeleted) => {
        if (err) {
            return res.status(500).send({ message: 'Error general' })
        } else if (tournamentDeleted) {
            return res.send({ message: 'Torneo eliminado', torneoDrop: tournamentDeleted })
        } else {
            return res.status(404).send({ message: 'Torneo no encontrado o ya eliminado' })
        }
    })
}


////////////////////////Byron//////////////////////////////////////////

////////////////////////Jona//////////////////////////////////////////


module.exports = {
    createTournament,
    getTournaments,
    getTournamentId,
    editTournament,
    deleteTournament
}