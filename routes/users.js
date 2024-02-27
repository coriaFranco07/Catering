//const { Router } = require('express');
const express= require('express');

const validacion = require('../middleaware/users/valida')
// definimos el enroutador
const router = express.Router();
const userController = require('../controllers/users')
const auth = require ('../controllers/authController')



router
   /*  .get('/', userController.getAllUsers)
    .get('/create',  userController.create)
    .get('/active/:id',  userController.active)
    .get('/pass/:id',  userController.pass)
    .get('/role/:id', userController.allRoles)
    .get('/role/create/:id', userController.createRol)
    .get('/role/delete/:id_user/:id_rol', userController.delrol)
    .post('/add',  validacion.validate, userController.add)
    .post('/pass/updpass',  validacion.validatepass, userController.updpass)
    .post('/role/add', userController.addRolUser)  */
    
    .get('/',auth.isAuthenticated, auth.isAuthorizated(["Admin"]), userController.getAllUsers)
    .get('/create', auth.isAuthenticated, userController.create)
    .get('/active/:id', auth.isAuthenticated, userController.active)
    .get('/pass/:id', auth.isAuthenticated, userController.pass)
    .get('/role/:id', auth.isAuthenticated, userController.allRoles)
    .get('/change', auth.isAuthenticated, userController.passChange)///////
    .get('/role/create/:id', auth.isAuthenticated, userController.createRol)
    .get('/role/delete/:id_user/:id_rol',auth.isAuthenticated,  userController.delrol)
    .post('/add', auth.isAuthenticated, validacion.validate, userController.add)
    .post('/pass/updpass', auth.isAuthenticated, validacion.validatepass, userController.updpass)
    .post('/role/add', auth.isAuthenticated, userController.addRolUser)
    .post('/change', auth.isAuthenticated,validacion.validatepasschange, userController.updpassChange)

 
module.exports = router;