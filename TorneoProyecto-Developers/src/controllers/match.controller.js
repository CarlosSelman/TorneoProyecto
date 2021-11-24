'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const Teams = require('../models/team.model')
const Match = require('../models/match.model')

const pdf = require("html-pdf")


function pdfReporte(req,res){

    var idTournament = req.params.idTournament;
    Teams.find({tournament: idTournament},(err,teamsFound)=>{
        Match.find({tournament:idTournament},(err,matchFound)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de los equipos del Torneo' });
        if (!teamsFound) return res.status(500).send({ mensaje: 'Error al obtener los equipos' });
        
       const contenido = 
       `<!doctype html>
       <html>
       <head>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script><meta charset="utf-8">
       </head>
       <body style="text-align: center;">

       
       <h1>Torneo ${teamsFound[0].tournament.name}</h1>

       <div class="col" style="width:50%;margin-left:150px">
           
       <table class="table table-striped">
       <thead>
         <tr>
           <th scope="col">Equipo</th>
           <th scope="col">GP</th>
           <th scope="col">W</th>
           <th scope="col">D</th>
           <th scope="col">L</th>
           <th scope="col">GF</th>
           <th scope="col">GA</th>
           <th scope="col">GD</th>
           <th scope="col">Puntos</th>
         </tr>
       </thead>
       <tbody>
           <tr> ${teamsFound.map(lista =>`
           <td><img src="${lista.picture}" style="width:15PX" alt="">  ${lista.name}</td>
           <td>${lista.gamePlayed}</td>
           <td>${lista.wins}</td>
           <td>${lista.draws}</td>
           <td>${lista.loses}</td>
           <td>${lista.goalsFor}</td>
           <td>${lista.goalsAgainst}</td>
           <td>${lista.goalsDiference}</td>
           <td>${lista.points}</td>
         </tr>`).join('').replace(/['"{}']+/g, '')}
       </tbody>
     </table>
        </div>

        <br>
        <br>
      
         <div class="col" style="width:50%;margin-left:150px">
           
${matchFound.map(match =>`
<table style="height:max-content;width:max-content">
       <td>
         <li style="border:0;" class="list-group-item">  ${match.team1.name}</li>
       </td>
         <td>
           <div style="text-align:center">
         <img style="width:75PX" src=${match.team1.picture}  alt="Logo">
       </div>
         </td>
         <td>
           <li style="border:0;" class="list-group-item">${match.score1}</li>
         </td>
         <td>
           VS
         </td>
         <td>
           <li style="border:0;" class="list-group-item">${match.score2}</li>
         </td>
         <td>
           <div style="text-align:center">
         <img style="width:75PX" src=${match.team2.picture}  alt="Logo">
         </div>
         </td>
         <td>
           <li style="border:0;" class="list-group-item">${match.team2.name}</li>
         </td>
         <hr>
    </table>
    



 `).join('').replace(/['"{}']+/g, '')}


         </div>
        
         

        </body>
        </html>
        `
        pdf.create(contenido).toFile('./src/pdf/Reporte.pdf', function(err,listo){
            if (err){
                return  res.status(200).send(err)
              }else{
                 return res.status(200).send(listo)
              } 
        })
    
    }).populate('team1 team2').sort( { jornada: 1 } )
    }).populate('tournament').sort({ points: -1 })
}





function generateMatch(req,res){
   var idTournament = req.params.idTournament;


    




    
    var i = 0
    var team = []
    Teams.find({tournament:idTournament},(err,teamsFound)=>{
        teamsFound.forEach(
            element =>{
                
                team[i] = element._id
                i = i + 1; 
            }
        )
       
        
      for (let index = 0; index < team.length - 1; index++) {
          for (let alpha = 1; alpha < team.length; alpha++) {
              if(index != alpha){
                  if(index < alpha){
                    var matchModel = new Match();
                    matchModel.tournament = idTournament
                    matchModel.team1 = team[index]
                    matchModel.team2 = team[alpha] 
                    matchModel.save((err,matchSaved) => {
                     if(err) console.log(err)
                     if(matchSaved)  console.log(index, alpha)
                 })  
                  } 
              }   
          }
      }
      
       return res.status(200).send({report:'Match'})
       
    })

}


function jornada(req,res){
    var idMatch = req.params.idMatch;
    var jornada = req.params.jornada
    Match.findByIdAndUpdate(idMatch,{jornada:jornada},(err,matchE)=>{
        return res.status(200).send(matchE)
    })
}

function showMatch(req,res){
    var idTournament = req.params.idTournament
    Match.find({tournament:idTournament},(err,teamsShow)=>{
        return res.status(200).send(teamsShow)
}).populate('team1 team2').sort( { jornada: 1 } )
}

function simulateMatch(req,res){
    var idMatch = req.params.idMatch;

        var num1 = Math.round(Math.random()*5)
        var num2 = Math.round(Math.random()*5)
    Match.findByIdAndUpdate(idMatch,{score1:num1,score2:num2},{new:true},(err,matchFound)=>{
        var lose1 = 0
        var lose2 = 0
        var win1 = 0
        var win2 = 0
        var draw1 = 0
        var draw2 = 0
        var points1 = 0
        var points2 = 0
        if(num1<num2){  lose1 = 1
                        win2 = 1
                        points2 = 3}
        if(num1>num2){  win1 = 1
                        lose2 = 1,
                        points1 = 3}
        if(num1==num2){ draw1 = 1
                        draw2 = 1
                        points1 = 1
                        points2 = 1}
        Teams.findById(matchFound.team1,(err,teamOne)=>{
        Teams.findById(matchFound.team2,(err,teamTwo)=>{
            Teams.findByIdAndUpdate(matchFound.team1,{  
                gamePlayed:teamOne.gamePlayed + 1,
                wins:teamOne.wins + win1,
                loses:teamOne.loses + lose1,
                draws:teamOne.draws + draw1,
                goalsFor:teamOne.goalsFor + num1,
                goalsAgainst:teamOne.goalsAgainst + num2,
                goalsDiference: (teamOne.goalsFor + num1) - (teamOne.goalsAgainst + num2),
                points:teamOne.points + points1},(err,team1Update) =>{
                    Teams.findByIdAndUpdate(matchFound.team2,{  
                        gamePlayed:teamTwo.gamePlayed + 1,
                        wins:teamTwo.wins + win2,
                        loses:teamTwo.loses + lose2,
                        draws:teamTwo.draws + draw2,
                        goalsFor:teamTwo.goalsFor + num2,
                        goalsAgainst:teamTwo.goalsAgainst + num1,
                        goalsDiference: (teamTwo.goalsFor + num2) - (teamTwo.goalsAgainst + num1),
                        points:teamTwo.points + points2},(err,team1Update) =>{
                            return res.status(200).send(matchFound)
                                                                })
                                                        })
        })

        })
        
        
        
    })
    
}


module.exports = {
    generateMatch,
    showMatch,
    simulateMatch,
    jornada,
    pdfReporte
}