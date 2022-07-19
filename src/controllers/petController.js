const ubication = require('../../src/data/coords.js')

const controller = {
  
index: (req, res) => { 

   
    res.render('petsProfile')

},
    newPet: (req, res) => {
        res.render('petRegister')
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
        }

}
module.exports = controller;