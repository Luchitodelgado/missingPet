const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const multer = require ('multer');
const path=require('path')
const { check } =require('express-validator');
const userLoggedMiddleware= require('../middlewares/userMiddleware')
const guestMiddleware= require('../middlewares/guestMiddleware')




const validations=[
    check('nombre_usuario').notEmpty().isLength({min:3, max:15}).withMessage('minimo 3 caracteres, maximo 12.').bail(),
    check('nombre').notEmpty().isLength({min:3, max:20}).withMessage('minimo 3 caraceres, maximo 12.').bail(),
    check('apellido').notEmpty().isLength({min:3, max:40}).withMessage('minimo 3 caraceres, maximo 12.').bail(),
    check('email').notEmpty().isLength({min:3, max:50}).isEmail().withMessage('Ingrese un Email valido').bail(),
    check('telefono').notEmpty().isLength({min:8, max:16}).isInt().withMessage('ingrese su numero de telefono').bail(),
    check('domicilio').notEmpty().isLength({min:8, max:22}).withMessage('ingrese domicilio').bail(),
    check('password').notEmpty().isLength({min:7, max:16}).withMessage('ingrese una passowrd').bail(),
]


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/img-usuarios"));
    },
    filename: (req,file, cb) => {
        console.log(file);
        const newFilename = "fotoPerfil" + Date.now() + path.extname(file.originalname);
        cb (null, newFilename);
        req.session.newFileName = newFilename
    }
 
});

const upload = multer ({storage})


router.get('/register', userLoggedMiddleware,userController.register);
router.post('/register',upload.single('fotoPerfil'), validations,userController.procesarFormulario);
router.get('/userlist', userController.list);
router.get('/login', userLoggedMiddleware,userController.login);
router.post('/login',userController.verify);
router.get('/profile', userController.userProfile);
router.get('/logout', userController.logout)


module.exports=router;


