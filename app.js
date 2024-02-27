const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require('cookie-parser');
const expressValidator = require('express-validator')
const auth = require ('./controllers/authController')




const app = express();

//seteamos motor de plantilla para pasar parametros de las vistas
app.set('view engine', 'ejs');

//seteamos recursos 
app.use(express.static('public'));

//como vamos a procesar datos y formularios confifuramos node
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//para poder trabajar con las cookies  hay que descomentar hasta que se usen, sino no carga paginas
//IMPORTANTE  cookieParser debe ir antes que  app.use('/', require('./routes/router'))
app.use(cookieParser());


//llamamos al router

app.use('/',  require('./routes/router'))
app.use('/users', require('./routes/users'))
app.use('/ctns', require('./routes/contratacion'))
app.use('/pvds', require('./routes/proveedor'))
app.use('/elts', require('./routes/elementos'))
app.use('/prds', require('./routes/prioridad'))
app.use('/ests', require('./routes/estados'))
app.use('/exptes', require('./routes/exptes'))
app.use('/volante', require('./routes/volante'))
app.use('/informes', require('./routes/informes'))
app.get('*', (req, res) => { res.render('urlnofound', ) })





//para eliminar el cache y que no se pueda volver con el boton de back luego de que hacemos un LOGOUT
app.use(function(req, res, next) {
    if (!req.user)
    res.header('Cache-Control', 'private, max-age=0, no-cache, no-store, must-revalidate');

    next();
});


app.listen(3000, ()=>{
    console.log ('Server port 3000');
})