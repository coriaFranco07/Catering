const express= require('express')
const route = express.Router()
const controllerEstados = require('../controllers/estados')
const validEstado = require('../middleaware/estados/validarDatos')
const validMovEstados = require('../middleaware/movestados/valida')
const auth = require ('../controllers/authController')
const validMovEstCtns = require('../middleaware/movestadosctns/valida')


route
    .get('/', auth.isAuthenticated, controllerEstados.getAllEstados)
    .get('/create', auth.isAuthenticated, controllerEstados.createEst)
    .get('/delete/:id', auth.isAuthenticated, controllerEstados.delEstados)
    .get('/edit/:id', auth.isAuthenticated, controllerEstados.getIdEstado)
    .get('/movests', auth.isAuthenticated, controllerEstados.getAllMovEst)
    .get('/movests/create', auth.isAuthenticated, controllerEstados.createMovEst)    
    .get('/movests/edit/:id', auth.isAuthenticated, controllerEstados.editMovEst)
    .get('/movests/delete/:id', auth.isAuthenticated, controllerEstados.deleteMovEst)
    .get('/movests/ctns', auth.isAuthenticated, controllerEstados.estMovCtns)
    .get('/movests/delete/ctns/:id_cont/:id_est', auth.isAuthenticated, controllerEstados.delMovEstCtns)
    .get('/movests/ctns/create', auth.isAuthenticated, controllerEstados.createMovEstCtns)
    .post('/movests/addmovest', auth.isAuthenticated, validMovEstados.validate,controllerEstados.addMovEst)
    .post('/add', auth.isAuthenticated, validEstado.validests, controllerEstados.addEstado)
    .post('/update', auth.isAuthenticated, controllerEstados.updateEst)
    .post('/movests/ctns/addmovest', auth.isAuthenticated,validMovEstCtns.validate, controllerEstados.addMovEstCtns)

    


module.exports= route