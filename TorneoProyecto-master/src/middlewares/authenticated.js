'use strict'

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = '@bhgg18_TorneoProyecto';

exports.ensureAuth = function (req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({ report: 'is not authorized to do the action'});

    }

    var token = req.headers.authorization.replace(/['"']+/g,'');

    try{
        var payload = jwt.decode(token,secret);
        
        if(payload.exp <= moment().unix()){
            return res.status(200).send({ report: 'The token has expired'})
        }
    }catch(err){
        return res.status(404).send({ report: 'The token its not valid'});
    }

    req.user = payload;
    next();
}