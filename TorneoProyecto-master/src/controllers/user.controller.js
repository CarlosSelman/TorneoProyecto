////////////////////////Selman//////////////////////////////////////////
'use strict'

const userModel = require("../models/user.model");
const User = require("../models/user.model");
const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const user = 'Usuario';
const admin = 'Administrador';

function createUserStaticAdmin(req,res) {
    var  userModel = new User(); 
    userModel.user = 'ADMIN';
    userModel.password = 'deportes123';
    userModel.type = admin
 
    User.find({ $or: [
     {user: userModel.user}
     ]}).exec((err, userFound)=>{
     if (err) return console.log('User request error')  
     
     if (userFound 
         && userFound.length >=1) {
         return console.log('User ADMIN already exists')
     }else{
         bcrypt.hash('deportes123',null,null,(err, passwordEncriptada)=>{
            userModel.password = passwordEncriptada; 
            userModel.save((err,userSave)=>{ 
                 if (err) return console.log('Error when saving user');
                     
                 if (userSave) {
                     return console.log(userSave)    
                 }else{
                     return console.log( 'Failed to register the user')
                 }
             })
         })
 
     }
    })
}

function Login(req,res){
    var params = req.body;
    
    userModel.findOne({ user : params.user }, (err, userFound)=>{
        if(err) return res.status(404).send({ report: 'Error at Login'});
        if(!userFound) return res.status(404).send({ report: 'user does not exist'});

        if(userFound){
            bcrypt.compare(params.password, userFound.password, (err,Valid)=>{
                if(err) return res.status(404).send({ report : 'Error in password'});
                if(Valid) {
                    return res.status(200).send({ token: jwt.createToken(userFound), userFound}  );
                }else {
                    return res.status(404).send({ report: 'The user is not valid'})   
                }
            })
        }
    })

}

function createUser(req,res){
    var params = req.body;
    var UserModel = new userModel();

    delete params.rol

    if(params.user && params.password){
        userModel.findOne({ user : params.user}).exec((err,userFound)=>{
            if(err) return res.status(404).send({report: 'Error in find user'});
            if(userFound){
                return res.status(202).send({report: 'user exist'});
            }else{
                UserModel.user = params.user;
                UserModel.lastName = params.lastName;
                UserModel.name = params.name;
                UserModel.age = params.age;
                UserModel.email = params.email;
                UserModel.picture = params.picture;
                UserModel.type = user;
                
                bcrypt.hash(params.password, null, null, (err, encryptedPassword)=>{
                    if(err) return res.status(404).send({report: 'password request error'});
                    if(!encryptedPassword) return res.status(202).send({report: 'password dont encrypted'})

                    UserModel.password = encryptedPassword;

                    UserModel.save((err, userSave)=>{
                        if(err) return res.status(404).send({report: 'user resquest error'});
                        if(!userSave) return res.status(202).send({report: 'user dont save'});
                            return res.status(200).send(userSave)
                    })
                })
            }

        })
    }else{
        return res.status(404).send({report: 'unfilled data'})
    }
}

function dropUser(req,res){
    const idUsuario = req.params.idUsuario;
    /*
    if(req.user.type != 'Administrador'){
        return res.status(500).send({ mensaje: 'You can not delete the user' })
    }
    */
    userModel.findByIdAndDelete(idUsuario, (err,UserDrop)=>{
        if(err) return res.status(404).send({report:'Failed to delete user'});
        if(!UserDrop) return res.status(402).send({report:'User does not exist'});
            return res.status(200).send(UserDrop);
    })
}

function editUser(req,res){
    var params = req.body;
    var user = req.user.sub;

    userModel.findByIdAndUpdate(user, params,{new: true, useFindAndModify:false} ,(err,userEdit)=>{
        if(err) return res.status(404).send({report:"Error in edit user"});
        if(!userEdit) return res.status(200).send({report:"User has not edit"});
            return res.status(200).send(userEdit)
    }) 
}

function editUserAdmin (req,res){
    var idUsuario = req.params.idUsuario;
    var params = req.body;

    userModel.findByIdAndUpdate(idUsuario,params, {new:true}, (err,userEdit)=>{
        if(err) return res.status(404).send({report:"Error in edit user"});
        if(!userEdit) return res.status(200).send({report:"User has not edit"});
            return res.status(200).send(userEdit)
    })
}

function findUserId(req,res){
    var idUsuario = req.params.idUsuario

    userModel.findById(idUsuario, (err,userFound)=>{
        if(err) return res.status(404).send({report:'Failed to search for the user'});
        if(!userFound) return res.status(200).send({report:'User dont exist'});
            return res.status(200).send(userFound);
    })
}

function showAllUsers(req,res){
    var validation = req.user.type;

    if(validation == admin){
        userModel.find((err,userFound)=>{
            if(err) return res.status(404).send({report: 'Failed to search for the users'});
            return res.status(200).send(userFound);
        })
    }else{
        return res.status(404).send({report:"You are not Admin"})
    }
}

module.exports = {
    Login,
    createUser,
    dropUser,
    editUser,
    editUserAdmin,
    findUserId,
    showAllUsers,
    createUserStaticAdmin
}