//const { Router } = require('express');
const express= require('express');

const validacion = require('../middleaware/contratacion/validarDatos')
// definimos el enroutador
const router = express.Router();
const contratacionesCtller = require('../controllers/contratacion')
const auth = require ('../controllers/authController')


router
    //.get('/',auth.isAuthenticated, auth.isAuthorizated(['admin']), contratacionesCtller.getAllContrataciones)
    .get('/',auth.isAuthenticated, contratacionesCtller.getAllContrataciones)
    .get('/create',auth.isAuthenticated, contratacionesCtller.addCtn)
    .get('/delete/:id_ctn', auth.isAuthenticated, contratacionesCtller.delContratacion)
    .get('/edit/:id_ctn', auth.isAuthenticated, contratacionesCtller.editCtn)
    .get('/:id_ctn', auth.isAuthenticated, contratacionesCtller.getIdContratacion)
    .post('/add', auth.isAuthenticated, validacion.validctns, contratacionesCtller.addContratacion)
    .post('/update', auth.isAuthenticated, contratacionesCtller.updateContratacion)
    .patch('/:id_ctn', auth.isAuthenticated, contratacionesCtller.updateContratacion)
    .delete('/:id_ctn', auth.isAuthenticated, contratacionesCtller.delContratacion)
    


module.exports = router;