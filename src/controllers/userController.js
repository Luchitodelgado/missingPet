const db = require("../database/models")
const bcryptjs = require('bcryptjs')
const sequelize = db.sequelize;
const Humanos = db.Humano;
const { validationResult } = require('express-validator');
const controller = {
    register: (req, res) => {
        res.render('register')
    },
    procesarFormulario: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', { errors: resultValidation.mapped(), oldData: req.body }),
                console.log('hubo errores')
        }
        else
            Humanos.create({
                nombreUsuario: req.body.nombre_usuario,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                telefono: req.body.telefono,
                domicilio: req.body.domicilio,
                fotoPerfil: req.session.newFileName,
                password: bcryptjs.hashSync(req.body.password2, 10),
            });
        res.redirect('/');
    },
    list: (req, res) => {
        Humanos.findAll()
            .then(humanos => {
                res.render('userlist', { humanos })
            })
    },
    login: (req, res) => {
        res.render('login');
    },
    verify: (req, res) => {
        let emailVerify = req.body.email
        let password = req.body.password
        Humanos.findOne({
            where: {
                email: emailVerify,

            }

        })
            .then(function (usuario) {
                let dbPassword = usuario.password;
                let key = bcryptjs.compareSync(password, dbPassword);
                Humanos.findOne({
                    where: {
                        email: emailVerify,
                        password: key
                    }

                }).then(function () {
                    if (emailVerify === usuario.email && key == true) {
                        req.session.userLogged = usuario;
                        res.redirect('/profile')
                    }
                    else {
                        res.render('login', { oldData: req.body }, {
                            errors: {
                                email:{
                                    msg: 'No se encuentra este email'                                    
                                }
                            }
                        })
                    }
                })

            }).catch((err) => {
                res.render('login', { oldData: req.body },{
                    errors: {
                        email:{
                            msg: 'No se encuentra este email'                                    
                        }
                    }})

            });
    },
    userProfile: (req, res) => {

        res.render('user_profile', { usuario: req.session.userLogged });
    },
    storeUser: (req, res) => {
        if (!errores.isEmpty()) {
            return res.render('formularioRegistro',
                { mensajeDeError: errores.mapped() })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
};
module.exports = controller;

