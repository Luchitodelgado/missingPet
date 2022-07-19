const express = require('express');
const path=require('path');
const methodOverride = require('method-override');
const mainRoute = require('./routes/mainRouter');
const userRoute = require('./routes/userRouter');



const app = express();
const session=require('express-session');
const petController= require('./routes/petRouter');

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(session({secret:'Fundacion mascotas'}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', mainRoute);
app.use('/', userRoute);
app.use('/', petController)


// RUTA PARA AGREGAR MASCOTAS
//ROUTER PARA MASCOTAS
//CONTROLLER MASCOTAS
//VISTA AGREGAR MASCOTAS
//VISTA PERFIL MASCOTAS
//VISTA ENCONTRE MASCOTA


app.listen(3000, () => {
    console.log("Servidor corriendo correctamente en http://localhost:3000/")
    
});