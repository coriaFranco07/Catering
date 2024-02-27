const express= require('express');
// definimos el enroutador
const router = express.Router();


//requiero el authController
const authController=require('../controllers/authController');


//router para las vistas


router
    .get('/', authController.isAuthenticated, (req,res)=>{
            res.render('index', {user:req.user, alert: false});  //paso el user a index 
    })
    .get('/login', authController.logo)
    .get('/logout', authController.logout)
    .post('/login', authController.login)
    



module.exports=router
